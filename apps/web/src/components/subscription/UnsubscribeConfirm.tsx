import { useState } from "react";
import { sileo } from "sileo";

type Props = { token: string; locale: "en" | "es" };

export function UnsubscribeConfirm({ token, locale }: Props) {
  const copy = locale === "es"
    ? {
        button: "Confirmar baja",
        back: "Volver al inicio",
        loadingTitle: "Procesando",
        loadingDescription: "Tramitando la baja...",
        successTitle: "Baja hecha",
        successDescription: "Tu suscripción se canceló.",
        errorTitle: "Error baja",
        errorDescription: "No se pudo completar."
      }
    : {
        button: "Confirm unsubscribe",
        back: "Back to home",
        loadingTitle: "Processing",
        loadingDescription: "Handling unsubscribe...",
        successTitle: "Unsubscribed",
        successDescription: "Your subscription was canceled.",
        errorTitle: "Unsubscribe error",
        errorDescription: "Could not complete."
      };

  const [loading, setLoading] = useState(false);

  async function onConfirm() {
    if (loading) return;
    setLoading(true);
    try {
      await sileo.promise(
        fetch("https://codebyfran.es/api/projects/cmd-kit/unsubscribe", {
          method: "POST",
          credentials: "omit",
          mode: "cors",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token })
        }).then(async (response) => {
          const data = await response.json().catch(() => ({}));
          console.debug("[unsubscribe] token:", token, "status:", response.status, "body:", data);
          if (!response.ok) throw new Error(`${response.status}: ${(data as any).message ?? (data as any).error ?? "unknown"}`);
          return data;
        }),
        {
          loading: { title: copy.loadingTitle, description: copy.loadingDescription },
          success: { title: copy.successTitle, description: copy.successDescription },
          error: (err: unknown) => ({ title: copy.errorTitle, description: err instanceof Error ? err.message : copy.errorDescription })
        }
      );
      window.location.href = "/?subscription=unsubscribed";
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="unsubscribe-actions">
      <button className="subscription-submit" type="button" onClick={onConfirm} disabled={loading} style={{ opacity: loading ? 0.6 : undefined }}>
        {copy.button}
      </button>
      <a className="ghost-button compact-button" href={locale === "es" ? "/es" : "/"}>
        {copy.back}
      </a>
    </div>
  );
}
