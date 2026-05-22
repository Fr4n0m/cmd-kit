import { useState, type FormEvent } from "react";
import { sileo } from "sileo";

type Props = {
  locale: "en" | "es";
  source?: "hero" | "footer" | "banner" | "modal" | "other";
};

export function SubscriptionForm({ locale, source = "other" }: Props) {
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const copy = locale === "es"
    ? {
        email: "Tu email",
        terms: "Acepto política de privacidad y términos",
        submit: "Recibir novedades",
        loadingTitle: "Enviando",
        loadingDescription: "Preparando email de verificación...",
        successTitle: "Revisa email",
        successDescription: "Confirma la suscripción desde tu bandeja de entrada.",
        errorTitle: "Error envío",
        errorDescription: "No se pudo completar la suscripción."
      }
    : {
        email: "Your email",
        terms: "I accept privacy policy and terms",
        submit: "Get updates",
        loadingTitle: "Sending",
        loadingDescription: "Preparing verification email...",
        successTitle: "Check inbox",
        successDescription: "Confirm your subscription from your inbox.",
        errorTitle: "Send error",
        errorDescription: "Could not complete the subscription."
      };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await sileo.promise(
      fetch("https://codebyfran.es/api/projects/cmd-kit/subscribe", {
        method: "POST",
        credentials: "omit",
        mode: "cors",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          locale,
          source,
          acceptTerms,
          consentVersion: "2026-05-v1"
        })
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

    setEmail("");
    setAcceptTerms(false);
  }

  return (
    <form className="subscription-form" onSubmit={onSubmit}>
      <input
        required
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={copy.email}
        className="subscription-input"
      />
      <label className="subscription-terms">
        <input
          required
          type="checkbox"
          checked={acceptTerms}
          onChange={(event) => setAcceptTerms(event.target.checked)}
        />
        <span>{copy.terms}</span>
      </label>
      <button type="submit" className="subscription-submit">{copy.submit}</button>
    </form>
  );
}
