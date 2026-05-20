import { sileo } from "sileo";

type Props = { token: string; locale: "en" | "es" };

export function UnsubscribeConfirm({ token, locale }: Props) {
  const copy = locale === "es"
    ? { button: "Confirmar baja", loading: "Procesando baja...", success: "Suscripción cancelada", error: "No se pudo completar" }
    : { button: "Confirm unsubscribe", loading: "Processing unsubscribe...", success: "Subscription canceled", error: "Could not complete" };

  async function onConfirm() {
    await sileo.promise(
      fetch("/api/subscriptions/unsubscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token })
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error(copy.error);
        }
        return response.json();
      }),
      {
        loading: { title: copy.loading },
        success: { title: copy.success },
        error: () => ({ title: copy.error })
      }
    );

    window.location.href = "/?subscription=unsubscribed";
  }

  return (
    <button className="subscription-submit" type="button" onClick={onConfirm}>
      {copy.button}
    </button>
  );
}
