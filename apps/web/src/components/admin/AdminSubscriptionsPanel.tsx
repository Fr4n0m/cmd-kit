import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import { sileo } from "sileo";

type SubscriptionStatus = "pending" | "active" | "unsubscribed";

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

  useEffect(() => {
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
          window.location.assign("/admin/subscriptions");
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
      Promise.resolve().then(async () => {
        if (!supabase) {
          throw new Error("missing_public_supabase_env");
        }
      }).then(() =>
      fetch("/api/admin/auth/request-link", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email })
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error("auth_failed");
        }
        return response.json();
      })),
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
    const id = window.prompt("Resource ID");
    const title = window.prompt("Resource title");
    const url = window.prompt("Resource URL");
    if (!id || !title || !url) {
      return;
    }

    await sileo.promise(
      fetch("/api/admin/subscriptions/notify", {
        method: "POST",
        headers: authHeaders ?? { "content-type": "application/json" },
        body: JSON.stringify({ id, title, url })
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
  }

  async function signOut() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    if (supabase) {
      await supabase.auth.signOut();
    }
    setItems([]);
    sileo.success({ title: "Sesión cerrada" });
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
        <button className="primary-button compact-button" type="button" onClick={sendNotify}>
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
    </section>
  );
}
