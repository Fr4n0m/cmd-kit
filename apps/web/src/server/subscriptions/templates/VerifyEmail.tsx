import { Heading, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout, { buildSiteBaseUrl, card, eyebrow, plainCta } from "./EmailLayout";
import { isSpanishEmailLocale } from "../locale";

type Props = {
  locale: string;
  verifyUrl: string;
  unsubscribeUrl: string;
  siteUrl: string;
  recipientEmail: string;
};

export default function VerifyEmail({ locale, verifyUrl, unsubscribeUrl, siteUrl, recipientEmail }: Props) {
  const isEs = isSpanishEmailLocale(locale);
  const siteBaseUrl = buildSiteBaseUrl(String(siteUrl || "").trim());
  const copy = isEs
    ? {
        preview: "Confirma tu suscripción a Cmd+kit",
        heading: "Confirma tu suscripción",
        body: "Necesitas confirmar el email para activar avisos.",
        cta: "Confirmar suscripción",
        unsub: "Cancelar suscripción",
        footer: "Fran · Cmd+kit",
        footerNote: `Este mensaje se envió a ${recipientEmail} por un sistema automático.`
      }
    : {
        preview: "Confirm your Cmd+kit subscription",
        heading: "Confirm your subscription",
        body: "You need to confirm your email before updates are enabled.",
        cta: "Confirm subscription",
        unsub: "Unsubscribe",
        footer: "Fran · Cmd+kit",
        footerNote: `This message was sent to ${recipientEmail} by an automated system.`
      };

  return (
    <EmailLayout
      locale={locale}
      preview={copy.preview}
      siteBaseUrl={siteBaseUrl}
      unsubscribeUrl={unsubscribeUrl}
      footerNote={copy.footerNote}
      unsubLabel={copy.unsub}
      sigName={copy.footer}
    >
      <Section style={card}>
        <Text style={eyebrow}>cmd+kit updates</Text>
        <Heading style={heading}>{copy.heading}</Heading>
        <Text style={body}>{copy.body}</Text>
        <Link href={verifyUrl} style={plainCta}>
          {copy.cta}
        </Link>
      </Section>
    </EmailLayout>
  );
}

const heading: React.CSSProperties = { color: "#f3f4f6", fontSize: "34px", margin: "0 0 10px" };
const body: React.CSSProperties = { color: "#b9bec7", fontSize: "14px", lineHeight: "1.55", margin: "0 0 16px" };
