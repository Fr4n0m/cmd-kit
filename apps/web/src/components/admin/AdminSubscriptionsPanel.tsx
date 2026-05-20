import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import { sileo } from "sileo";

type SubscriptionStatus = "pending" | "active" | "unsubscribed";
type NotifyResource = { id: string; title: string; url: string; summary: string };

type SubscriptionItem = {
  email: string;
  status: SubscriptionStatus;
  locale: "es" | "en";
  source: "hero" | "footer" | "banner" | "modal" | "other";
  updatedAt: string;
  createdAt: string;
};
type AdminPanelMode = "gate" | "full";

const publicSupabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const publicSupabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;
const supabase =
  publicSupabaseUrl && publicSupabaseAnonKey
    ? createClient(publicSupabaseUrl, publicSupabaseAnonKey)
    : null;

export function AdminSubscriptionsPanel({ mode = "full" }: { mode?: AdminPanelMode }) {
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [items, setItems] = useState<SubscriptionItem[]>([]);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [resources, setResources] = useState<NotifyResource[]>([
    { id: "", title: "", url: "", summary: "" }
  ]);

  useEffect(() => {
    const hash = window.location.hash.startsWith("#")
      ? new URLSearchParams(window.location.hash.slice(1))
      : null;
    const tokenFromHash = hash?.get("access_token");
    if (tokenFromHash) {
      setAccessToken(tokenFromHash);
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setAccessToken(data.session?.access_token ?? null);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccessToken(session?.access_token ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    fetch("/api/admin/auth/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ accessToken })
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("session_failed");
        }

        if (window.location.pathname === "/admin") {
          window.location.assign("/admin");
        }
      })
      .catch(() => {
        sileo.error({ title: "Sesión", description: "Acceso admin denegado." });
      });
  }, [accessToken]);

  const authHeaders = useMemo(() => {
    if (!accessToken) {
      return null;
    }
    return {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json"
    };
  }, [accessToken]);

  useEffect(() => {
    if (mode === "full") {
      void loadItems();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  async function requestMagicLink() {
    await sileo.promise(
      fetch("/api/admin/auth/request-link", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email })
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error("auth_failed");
        }
        return response.json();
      }),
      {
        loading: { title: "Enviando", description: "Generando enlace de acceso..." },
        success: { title: "Revisa email", description: "Abre el magic link para entrar al panel." },
        error: () => ({
          title: "Error enlace",
          description: "No se pudo enviar el enlace de acceso. Inténtalo de nuevo en unos minutos."
        })
      }
    );
  }

  async function loadItems() {
    await sileo.promise(
      fetch("/api/admin/subscriptions", { headers: authHeaders ?? undefined }).then(async (response) => {
        if (!response.ok) {
          throw new Error("Unauthorized");
        }
        const payload = (await response.json()) as { ok: boolean; items: SubscriptionItem[] };
        setItems(payload.items);
        return payload;
      }),
      {
        loading: { title: "Cargando", description: "Obteniendo suscriptores..." },
        success: { title: "Lista lista", description: "Suscriptores actualizados." },
        error: () => ({ title: "Error carga", description: "No se pudo cargar la lista." })
      }
    );
  }

  async function updateStatus(emailValue: string, status: SubscriptionStatus) {
    await sileo.promise(
      fetch("/api/admin/subscriptions", {
        method: "PUT",
        headers: authHeaders ?? { "content-type": "application/json" },
        body: JSON.stringify({ email: emailValue, status })
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error("Update failed");
        }
        await loadItems();
      }),
      {
        loading: { title: "Actualizando", description: "Guardando estado..." },
        success: { title: "Estado ok", description: "Estado actualizado." },
        error: () => ({ title: "Error estado", description: "No se pudo actualizar." })
      }
    );
  }

  async function removeSubscription(emailValue: string) {
    await sileo.promise(
      fetch(`/api/admin/subscriptions?email=${encodeURIComponent(emailValue)}`, {
        method: "DELETE",
        headers: authHeaders ?? undefined
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error("Delete failed");
        }
        await loadItems();
      }),
      {
        loading: { title: "Eliminando", description: "Quitando suscriptor..." },
        success: { title: "Borrado ok", description: "Suscriptor eliminado." },
        error: () => ({ title: "Error borrar", description: "No se pudo eliminar." })
      }
    );
  }

  async function sendNotify() {
    const cleanResources = resources
      .map((entry) => ({
        id: entry.id.trim(),
        title: entry.title.trim(),
        url: entry.url.trim(),
        summary: entry.summary.trim()
      }))
      .filter((entry) => entry.id && entry.title && entry.url)
      .map((entry) => ({
        ...entry,
        summary: entry.summary || undefined
      }));
    if (!cleanResources.length) {
      sileo.error({ title: "Error envío", description: "Añade al menos un recurso válido." });
      return;
    }
    await sileo.promise(
      fetch("/api/admin/subscriptions/notify", {
        method: "POST",
        headers: authHeaders ?? { "content-type": "application/json" },
        body: JSON.stringify({ resources: cleanResources })
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error("Notify failed");
        }
        return response.json();
      }),
      {
        loading: { title: "Enviando", description: "Lanzando notificaciones..." },
        success: { title: "Envío ok", description: "Notificaciones enviadas." },
        error: () => ({ title: "Error envío", description: "No se pudieron enviar." })
      }
    );
    setIsNotifyModalOpen(false);
    setResources([{ id: "", title: "", url: "", summary: "" }]);
  }

  function updateResource(index: number, key: keyof NotifyResource, value: string) {
    setResources((prev) => prev.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)));
  }

  function addResourceRow() {
    setResources((prev) => [...prev, { id: "", title: "", url: "", summary: "" }]);
  }

  function removeResourceRow(index: number) {
    setResources((prev) => (prev.length === 1 ? prev : prev.filter((_, itemIndex) => itemIndex !== index)));
  }

  async function signOut() {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
    } finally {
      setAccessToken(null);
      setItems([]);
      window.location.assign(`/api/admin/auth/logout?t=${Date.now()}`);
    }
  }

  return (
    <section className="admin-panel-wrap">
      <div className="admin-panel-toolbar">
        <input
          className="admin-panel-key"
          type="email"
          placeholder="admin@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button className="primary-button compact-button" type="button" onClick={requestMagicLink}>
          Send access link
        </button>
        {mode === "full" && (
          <>
        <button className="ghost-button compact-button" type="button" onClick={loadItems}>
          Refresh list
        </button>
        <button className="primary-button compact-button" type="button" onClick={() => setIsNotifyModalOpen(true)}>
          Send notify
        </button>
        <button className="ghost-button compact-button" type="button" onClick={signOut}>
          Sign out
        </button>
          </>
        )}
      </div>
      {mode === "gate" && (
        <p className="content-paragraph">Magic link required. Direct access to subscriptions is blocked.</p>
      )}
      {mode === "full" && (
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Status</th>
              <th>Locale</th>
              <th>Source</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.email}>
                <td>{item.email}</td>
                <td>
                  <select
                    value={item.status}
                    onChange={(event) => updateStatus(item.email, event.target.value as SubscriptionStatus)}
                  >
                    <option value="pending">pending</option>
                    <option value="active">active</option>
                    <option value="unsubscribed">unsubscribed</option>
                  </select>
                </td>
                <td>{item.locale}</td>
                <td>{item.source}</td>
                <td>{new Date(item.updatedAt).toLocaleString()}</td>
                <td>
                  <button className="ghost-button compact-button" type="button" onClick={() => removeSubscription(item.email)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      {isNotifyModalOpen && (
        <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h2>Send notification</h2>
              <button className="ghost-button compact-button" type="button" onClick={() => setIsNotifyModalOpen(false)}>
                Close
              </button>
            </div>
            <p className="content-paragraph">Add one or multiple resources. Subscribers receive one email per send.</p>
            <div className="admin-modal-list">
              {resources.map((resource, index) => (
                <div key={`resource-${index}`} className="admin-resource-item">
                  <input
                    className="admin-panel-key"
                    type="text"
                    placeholder="Resource ID"
                    value={resource.id}
                    onChange={(event) => updateResource(index, "id", event.target.value)}
                  />
                  <input
                    className="admin-panel-key"
                    type="text"
                    placeholder="Resource title"
                    value={resource.title}
                    onChange={(event) => updateResource(index, "title", event.target.value)}
                  />
                  <input
                    className="admin-panel-key"
                    type="url"
                    placeholder="https://..."
                    value={resource.url}
                    onChange={(event) => updateResource(index, "url", event.target.value)}
                  />
                  <textarea
                    className="admin-panel-key"
                    placeholder="Summary (optional)"
                    value={resource.summary}
                    onChange={(event) => updateResource(index, "summary", event.target.value)}
                  />
                  <button className="ghost-button compact-button" type="button" onClick={() => removeResourceRow(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="admin-modal-actions">
              <button className="ghost-button compact-button" type="button" onClick={addResourceRow}>
                Add resource
              </button>
              <button className="primary-button compact-button" type="button" onClick={sendNotify}>
                Send now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
