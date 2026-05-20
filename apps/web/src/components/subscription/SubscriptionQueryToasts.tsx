import { useEffect } from "react";
import { sileo } from "sileo";

export function SubscriptionQueryToasts() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const state = url.searchParams.get("subscription");
    if (!state) {
      return;
    }

    if (state === "confirmed") {
      sileo.success({ title: "Confirmada", description: "Suscripción activada correctamente." });
    } else if (state === "unsubscribed") {
      sileo.success({ title: "Baja hecha", description: "Ya no recibirás más avisos." });
    } else if (state === "error") {
      sileo.error({ title: "Error suscripción", description: "No se pudo completar la operación." });
    }

    url.searchParams.delete("subscription");
    window.history.replaceState({}, "", url.toString());
  }, []);

  return null;
}
