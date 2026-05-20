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
        loading: "Enviando verificación...",
        success: "Revisa tu email para confirmar",
        error: "No se pudo completar"
      }
    : {
        email: "Your email",
        terms: "I accept privacy policy and terms",
        submit: "Get updates",
        loading: "Sending verification...",
        success: "Check your inbox to confirm",
        error: "Could not complete request"
      };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await sileo.promise(
      fetch("/api/subscriptions", {
        method: "POST",
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
