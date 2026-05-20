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
      sileo.success({ title: "Subscription confirmed" });
    } else if (state === "unsubscribed") {
      sileo.success({ title: "Unsubscribed successfully" });
    } else if (state === "error") {
      sileo.error({ title: "Subscription error" });
    }

    url.searchParams.delete("subscription");
    window.history.replaceState({}, "", url.toString());
  }, []);

  return null;
}
