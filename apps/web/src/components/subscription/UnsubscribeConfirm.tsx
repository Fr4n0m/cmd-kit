import { useState } from "react";
import { sileo } from "sileo";

type Props = { token: string; locale: "en" | "es" };

const BellOffIcon = () => (
  <svg className="unsubscribe-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    <path d="M18.63 13A17.89 17.89 0 0 1 18 8"/>
    <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"/>
    <path d="M18 8a6 6 0 0 0-9.33-5"/>
    <line x1="2" y1="2" x2="22" y2="22"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="unsubscribe-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

export function UnsubscribeConfirm({ token, locale }: Props) {
  const copy = locale === "es"
    ? {
        button: "Confirmar baja",
        back: "Volver al inicio",
        loadingTitle: "Procesando",
        loadingDescription: "Tramitando la baja...",
        successTitle: "Baja completada",
        successDescription: "Tu suscripción se canceló correctamente.",
        errorTitle: "Error",
        errorDescription: "No se pudo completar la baja. Inténtalo de nuevo."
      }
    : {
        button: "Confirm unsubscribe",
        back: "Back to home",
        loadingTitle: "Processing",
        loadingDescription: "Handling unsubscribe...",
        successTitle: "Unsubscribed",
        successDescription: "Your subscription was canceled successfully.",
        errorTitle: "Error",
        errorDescription: "Could not complete. Please try again."
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
      <button
        className="subscription-submit"
        type="button"
        onClick={onConfirm}
        disabled={loading}
        style={{ opacity: loading ? 0.6 : undefined }}
      >
        <BellOffIcon />
        {loading ? "..." : copy.button}
      </button>
      <a className="ghost-button compact-button" href={locale === "es" ? "/es" : "/"}>
        <ArrowLeftIcon />
        {copy.back}
      </a>
    </div>
  );
}
