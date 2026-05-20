import { Heading, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout, { buildSiteBaseUrl, card, eyebrow, plainCta } from "./EmailLayout";
import { isSpanishEmailLocale } from "../locale";

type Resource = { id: string; title: string; url: string; summary?: string };
type Props = {
  resources: Resource[];
  locale: string;
  unsubscribeUrl: string;
  recipientEmail: string;
};

export default function NewResourcesDigestEmail({ resources, locale, unsubscribeUrl, recipientEmail }: Props) {
  const isEs = isSpanishEmailLocale(locale);
  const firstUrl = resources[0]?.url ?? "https://cmd-kit.vercel.app";
  const siteBaseUrl = buildSiteBaseUrl(firstUrl);
  const copy = isEs
    ? {
        preview: `Nuevas versiones npm (${resources.length})`,
        label: "NPM digest",
        heading: "Nuevas versiones publicadas en npm",
        cta: "Ver en npm",
        unsub: "Cancelar suscripción",
        footer: "Fran · Cmd+kit",
        footerNote: `Este mensaje se envió a ${recipientEmail} por un sistema automático.`
      }
    : {
        preview: `New npm releases (${resources.length})`,
        label: "NPM digest",
        heading: "New versions published on npm",
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
        {resources.map((resource) => (
          <Section key={resource.id} style={resourceCard}>
            <Text style={resourceTitle}>{resource.title}</Text>
            {resource.summary ? <Text style={resourceSummary}>{resource.summary}</Text> : null}
            <Link href={resource.url} style={plainCta}>
              {copy.cta}
            </Link>
          </Section>
        ))}
      </Section>
    </EmailLayout>
  );
}

const heading: React.CSSProperties = { color: "#f3f4f6", fontSize: "32px", margin: "0 0 12px" };
const resourceCard: React.CSSProperties = { borderTop: "1px solid #25272b", paddingTop: "12px", marginTop: "12px" };
const resourceTitle: React.CSSProperties = { color: "#e5e7eb", fontSize: "17px", fontWeight: "700", margin: "0 0 6px" };
const resourceSummary: React.CSSProperties = { color: "#b9bec7", fontSize: "13px", lineHeight: "1.5", margin: "0 0 10px" };
