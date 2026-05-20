import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import { sileo } from "sileo";
import {
  IconBellRinging,
  IconLogout,
  IconMail,
  IconPlus,
  IconRefresh,
  IconSend2,
  IconTrash,
  IconX
} from "@tabler/icons-react";

type SubscriptionStatus = "pending" | "active" | "unsubscribed";
type NotifyResource = { id: string; title: string; url: string; summary: string };
type CatalogResource = NotifyResource;

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
  const [resources, setResources] = useState<NotifyResource[]>([]);
  const [resourceQuery, setResourceQuery] = useState("");
  const [resourceLocale, setResourceLocale] = useState<"en" | "es">("en");
  const [resourceResults, setResourceResults] = useState<CatalogResource[]>([]);
  const [resourceSearchBusy, setResourceSearchBusy] = useState(false);

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
    setResources([]);
    setResourceQuery("");
    setResourceResults([]);
  }
  function removeResourceRow(index: number) {
    setResources((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  }

  function addResourceFromSearch(item: CatalogResource) {
    setResources((prev) => (prev.some((resource) => resource.id === item.id) ? prev : [...prev, item]));
  }

  useEffect(() => {
    if (!isNotifyModalOpen) {
      return;
    }

    const controller = new AbortController();
    setResourceSearchBusy(true);
    fetch(`/api/admin/resources?locale=${resourceLocale}&query=${encodeURIComponent(resourceQuery)}`, {
      signal: controller.signal
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("search_failed");
        }
        return response.json();
      })
      .then((payload: { ok: boolean; items: CatalogResource[] }) => {
        setResourceResults(payload.items ?? []);
      })
      .catch(() => {
        setResourceResults([]);
      })
      .finally(() => {
        setResourceSearchBusy(false);
      });

    return () => controller.abort();
  }, [isNotifyModalOpen, resourceLocale, resourceQuery]);

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
          <IconMail size={16} />
          Send access link
        </button>
        {mode === "full" && (
          <>
        <button className="ghost-button compact-button" type="button" onClick={loadItems}>
          <IconRefresh size={16} />
          Refresh list
        </button>
        <button className="primary-button compact-button" type="button" onClick={() => setIsNotifyModalOpen(true)}>
          <IconBellRinging size={16} />
          Send notify
        </button>
        <button className="ghost-button compact-button" type="button" onClick={signOut}>
          <IconLogout size={16} />
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
                    <IconTrash size={16} />
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
              <button className="ghost-button compact-button icon-only-button" type="button" onClick={() => setIsNotifyModalOpen(false)} aria-label="Close">
                <IconX size={16} />
              </button>
            </div>
            <p className="content-paragraph">Add one or multiple resources. Subscribers receive one email per send.</p>
            <div className="admin-modal-search">
              <select
                className="admin-panel-key"
                value={resourceLocale}
                onChange={(event) => setResourceLocale(event.target.value as "en" | "es")}
              >
                <option value="en">Catalog EN</option>
                <option value="es">Catalog ES</option>
              </select>
              <input
                className="admin-panel-key"
                type="text"
                placeholder="Search resources..."
                value={resourceQuery}
                onChange={(event) => setResourceQuery(event.target.value)}
              />
            </div>
            <div className="admin-search-results">
              {resourceSearchBusy ? <p className="content-paragraph">Searching...</p> : null}
              {!resourceSearchBusy && resourceResults.length === 0 ? (
                <p className="content-paragraph">No resources found.</p>
              ) : null}
              {!resourceSearchBusy &&
                resourceResults.map((item) => (
                  <div className="admin-search-item" key={item.id}>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.summary}</p>
                    </div>
                    <button className="ghost-button compact-button" type="button" onClick={() => addResourceFromSearch(item)}>
                      <IconPlus size={16} />
                      Add
                    </button>
                  </div>
                ))}
            </div>
            <div className="admin-modal-list">
              {resources.map((resource, index) => (
                <div key={`resource-${index}`} className="admin-resource-item">
                  <strong>{resource.title}</strong>
                  <p>{resource.summary}</p>
                  <code>{resource.url}</code>
                  <button className="ghost-button compact-button" type="button" onClick={() => removeResourceRow(index)}>
                    <IconTrash size={16} />
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="admin-modal-actions">
              <span className="content-paragraph">{resources.length} selected</span>
              <button className="primary-button compact-button" type="button" onClick={sendNotify}>
                <IconSend2 size={16} />
                Send now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
