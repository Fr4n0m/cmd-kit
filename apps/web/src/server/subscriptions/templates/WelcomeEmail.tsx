import { Heading, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout, { buildSiteBaseUrl, card, eyebrow, plainCta } from "./EmailLayout";
import { isSpanishEmailLocale } from "../locale";

type Props = {
  locale: string;
  unsubscribeUrl: string;
  siteUrl: string;
  recipientEmail: string;
};

export default function WelcomeEmail({ locale, unsubscribeUrl, siteUrl, recipientEmail }: Props) {
  const isEs = isSpanishEmailLocale(locale);
  const siteBaseUrl = buildSiteBaseUrl(String(siteUrl || "").trim());
  const docsUrl = `${siteBaseUrl}/${isEs ? "es" : "en"}/docs`;
  const copy = isEs
    ? {
        preview: "Suscripción confirmada en Cmd+kit",
        heading: "Suscripción confirmada",
        subheading: "Ya formas parte de las novedades de Cmd+kit.",
        body: "Recibirás lanzamientos nuevos con contexto técnico y enlaces directos.",
        cta: "Ver documentación",
        unsub: "Cancelar suscripción",
        freq: "Solo lanzamientos",
        footer: "Fran · Cmd+kit",
        footerNote: `Este mensaje se envió a ${recipientEmail} por un sistema automático.`
      }
    : {
        preview: "Subscription confirmed on Cmd+kit",
        heading: "Subscription confirmed",
        subheading: "You are now subscribed to Cmd+kit updates.",
        body: "You will receive new releases with technical context and direct links.",
        cta: "Open docs",
        unsub: "Unsubscribe",
        freq: "Releases only",
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
        <Text style={eyebrow}>cmd+kit</Text>
        <Heading style={heading}>{copy.heading}</Heading>
        <Text style={subheading}>{copy.subheading}</Text>
        <Text style={body}>{copy.body}</Text>
        <Link href={docsUrl} style={plainCta}>
          {copy.cta}
        </Link>
        <Text style={metaLabel}>{isEs ? "Frecuencia" : "Frequency"}</Text>
        <Text style={metaValue}>{copy.freq}</Text>
      </Section>
    </EmailLayout>
  );
}

const heading: React.CSSProperties = {
  color: "#f3f4f6",
  fontSize: "36px",
  fontWeight: "700",
  margin: "0 0 12px"
};
const subheading: React.CSSProperties = { color: "#d1d5db", fontSize: "15px", margin: "0 0 8px" };
const body: React.CSSProperties = { color: "#b9bec7", fontSize: "15px", lineHeight: "1.6", margin: "0 0 22px" };
const metaLabel: React.CSSProperties = {
  color: "#8b9099",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  margin: "8px 0 0"
};
const metaValue: React.CSSProperties = { color: "#d1d5db", fontSize: "12px", margin: "4px 0 0" };
