import { sileo } from "sileo";

type Props = { token: string; locale: "en" | "es" };

export function UnsubscribeConfirm({ token, locale }: Props) {
  const copy = locale === "es"
    ? {
        button: "Confirmar baja",
        loadingTitle: "Procesando",
        loadingDescription: "Tramitando la baja...",
        successTitle: "Baja hecha",
        successDescription: "Tu suscripción se canceló.",
        errorTitle: "Error baja",
        errorDescription: "No se pudo completar."
      }
    : {
        button: "Confirm unsubscribe",
        loadingTitle: "Processing",
        loadingDescription: "Handling unsubscribe...",
        successTitle: "Unsubscribed",
        successDescription: "Your subscription was canceled.",
        errorTitle: "Unsubscribe error",
        errorDescription: "Could not complete."
      };

  async function onConfirm() {
    await sileo.promise(
      fetch("/api/subscriptions/unsubscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token })
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error(copy.errorDescription);
        }
        return response.json();
      }),
      {
        loading: { title: copy.loadingTitle, description: copy.loadingDescription },
        success: { title: copy.successTitle, description: copy.successDescription },
        error: () => ({ title: copy.errorTitle, description: copy.errorDescription })
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
