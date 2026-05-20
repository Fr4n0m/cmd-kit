import { Heading, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout, { buildSiteBaseUrl, card, eyebrow, plainCta } from "./EmailLayout";
import { isSpanishEmailLocale } from "../locale";

type Props = {
  resourceTitle: string;
  resourceDescription?: string;
  resourceUrl: string;
  locale: string;
  unsubscribeUrl: string;
  recipientEmail: string;
};

export default function NewResourceEmail({
  resourceTitle,
  resourceDescription,
  resourceUrl,
  locale,
  unsubscribeUrl,
  recipientEmail
}: Props) {
  const isEs = isSpanishEmailLocale(locale);
  const siteBaseUrl = buildSiteBaseUrl(resourceUrl);
  const copy = isEs
    ? {
        preview: `Nueva versión npm: ${resourceTitle}`,
        label: "NPM release",
        heading: "Nueva versión publicada en npm",
        cta: "Ver en npm",
        unsub: "Cancelar suscripción",
        footer: "Fran · Cmd+kit",
        footerNote: `Este mensaje se envió a ${recipientEmail} por un sistema automático.`
      }
    : {
        preview: `New npm release: ${resourceTitle}`,
        label: "NPM release",
        heading: "New version published on npm",
        cta: "View on npm",
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
        <Text style={eyebrow}>{copy.label}</Text>
        <Heading style={heading}>{copy.heading}</Heading>
        <Text style={titleStyle}>{resourceTitle}</Text>
        {resourceDescription ? <Text style={descStyle}>{resourceDescription}</Text> : null}
        <Link href={resourceUrl} style={plainCta}>
          {copy.cta}
        </Link>
      </Section>
    </EmailLayout>
  );
}

const heading: React.CSSProperties = { color: "#f3f4f6", fontSize: "34px", margin: "0 0 10px" };
const titleStyle: React.CSSProperties = { color: "#e5e7eb", fontSize: "19px", fontWeight: "700", margin: "0 0 8px" };
const descStyle: React.CSSProperties = { color: "#b9bec7", fontSize: "14px", lineHeight: "1.55", margin: "0 0 16px" };
