import { useState, type FormEvent } from "react";
import { sileo } from "sileo";

type Props = {
  locale: "en" | "es";
  source?: "hero" | "footer" | "banner" | "modal" | "other";
};

type SubmitState = "idle" | "already-active";

export function SubscriptionForm({ locale, source = "other" }: Props) {
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [state, setState] = useState<SubmitState>("idle");

  const copy = locale === "es"
    ? {
        email: "Tu email",
        terms: "Acepto política de privacidad y términos",
        submit: "Recibir novedades",
        loadingTitle: "Enviando",
        loadingDescription: "Preparando email de verificación...",
        successTitle: "Revisa email",
        successDescription: "Confirma la suscripción desde tu bandeja de entrada.",
        alreadyPendingTitle: "Revisa email",
        alreadyPendingDescription: "Ya te enviamos un email de confirmación. Revísalo y confirma.",
        alreadyActiveTitle: "Ya estás suscrito",
        alreadyActiveDescription: "Este email ya recibe notificaciones de nuevas versiones.",
        errorTitle: "Error envío",
        errorDescription: "No se pudo completar la suscripción.",
      }
    : {
        email: "Your email",
        terms: "I accept privacy policy and terms",
        submit: "Get updates",
        loadingTitle: "Sending",
        loadingDescription: "Preparing verification email...",
        successTitle: "Check inbox",
        successDescription: "Confirm your subscription from your inbox.",
        alreadyPendingTitle: "Check inbox",
        alreadyPendingDescription: "We already sent you a confirmation email. Check your inbox and confirm.",
        alreadyActiveTitle: "Already subscribed",
        alreadyActiveDescription: "This email is already receiving release notifications.",
        errorTitle: "Send error",
        errorDescription: "Could not complete the subscription.",
      };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await sileo.promise(
      fetch("https://codebyfran.es/api/projects/cmd-kit/subscribe", {
        method: "POST",
        credentials: "omit",
        mode: "cors",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, locale, source, acceptTerms, consentVersion: "2026-05-v1" }),
      }).then(async (res) => {
        if (!res.ok) throw new Error(copy.errorDescription);
        return res.json();
      }),
      {
        loading: { title: copy.loadingTitle, description: copy.loadingDescription },
        success: (data: { alreadyActive?: boolean; alreadyPending?: boolean }) => {
          if (data.alreadyActive) {
            setState("already-active");
            return { title: copy.alreadyActiveTitle, description: copy.alreadyActiveDescription };
          }
          if (data.alreadyPending) {
            return { title: copy.alreadyPendingTitle, description: copy.alreadyPendingDescription };
          }
          return { title: copy.successTitle, description: copy.successDescription };
        },
        error: () => ({ title: copy.errorTitle, description: copy.errorDescription }),
      }
    );

    setEmail("");
    setAcceptTerms(false);
  }

  if (state === "already-active") {
    return (
      <p className="subscription-feedback">
        <strong>{copy.alreadyActiveTitle}</strong> {copy.alreadyActiveDescription}
      </p>
    );
  }

  return (
    <form className="subscription-form" onSubmit={onSubmit}>
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={copy.email}
        className="subscription-input"
      />
      <label className="subscription-terms">
        <input
          required
          type="checkbox"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
        />
        <span>{copy.terms}</span>
      </label>
      <button type="submit" className="subscription-submit">{copy.submit}</button>
    </form>
  );
}
