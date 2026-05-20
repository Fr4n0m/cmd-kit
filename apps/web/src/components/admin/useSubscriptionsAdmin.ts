import { useCallback, useState } from "react";
import { sileo } from "sileo";
import type { AuthHeaders, SubscriptionItem, SubscriptionStatus } from "./types";

export function useSubscriptionsAdmin(authHeaders: AuthHeaders | null) {
  const [items, setItems] = useState<SubscriptionItem[]>([]);

  const loadItems = useCallback(async () => {
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
  }, [authHeaders]);

  const updateStatus = useCallback(
    async (emailValue: string, status: SubscriptionStatus) => {
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
    },
    [authHeaders, loadItems]
  );

  const removeSubscription = useCallback(
    async (emailValue: string) => {
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
    },
    [authHeaders, loadItems]
  );

  function clearItems() {
    setItems([]);
  }

  return { items, loadItems, updateStatus, removeSubscription, clearItems };
}
