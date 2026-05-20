import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text
} from "@react-email/components";
import * as React from "react";

const GRAVATAR_PROFILE = "https://gravatar.com/fr4n0m";
const GRAVATAR_AVATAR =
  "https://0.gravatar.com/avatar/45f9e6ff5a1ed8b109f19dc13f59c26e7d39fceb75f9344ac30ea6db18f6fbde?s=80&d=mp";

type Props = {
  locale: string;
  preview: string;
  siteBaseUrl: string;
  unsubscribeUrl: string;
  footerNote: string;
  unsubLabel: string;
  sigName: string;
  children: React.ReactNode;
};

export function buildSiteBaseUrl(raw: string): string {
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const parsed = new URL(withProtocol);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return "https://cmd-kit.vercel.app";
  }
}

export default function EmailLayout({
  locale,
  preview,
  siteBaseUrl,
  unsubscribeUrl,
  footerNote,
  unsubLabel,
  sigName,
  children
}: Props) {
  const brandIcon = `${siteBaseUrl}/favicon-96x96.png`;
  const avatarUrl = GRAVATAR_AVATAR;

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={bodyStyle}>
        <Container style={container}>
          <Section style={brandSection}>
            <Img src={brandIcon} width={56} height={56} alt="Cmd+kit" style={brandIconStyle} />
            <Text style={brandText}>Cmd+kit</Text>
          </Section>
          {children}
          <Hr style={hr} />
          <Section style={sigSection}>
            <Link href={GRAVATAR_PROFILE} style={{ display: "inline-block" }}>
              <Img src={avatarUrl} width={40} height={40} alt="Fran" style={avatarStyle} />
            </Link>
            <Text style={sigNameStyle}>{sigName}</Text>
          </Section>
          <Section style={footerSection}>
            <Text style={footerNoteStyle}>{footerNote}</Text>
            <Link href={unsubscribeUrl} style={unsubLink}>
              {unsubLabel}
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export const bodyStyle: React.CSSProperties = {
  backgroundColor: "#000000",
  fontFamily: "'Inter','SF Pro Display','Segoe UI',system-ui,sans-serif",
  margin: 0,
  padding: "32px 0"
};

export const container: React.CSSProperties = {
  maxWidth: "680px",
  margin: "0 auto",
  backgroundColor: "#000000",
  padding: "0 16px 24px"
};

export const brandSection: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "24px"
};

export const brandText: React.CSSProperties = {
  color: "#e5e7eb",
  fontSize: "18px",
  fontWeight: "700",
  letterSpacing: "-0.02em",
  margin: "0"
};

export const brandIconStyle: React.CSSProperties = {
  display: "block",
  margin: "0 auto 14px"
};

export const hr: React.CSSProperties = {
  borderColor: "#262930",
  margin: "24px 0"
};

export const sigSection: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "16px"
};

export const avatarStyle: React.CSSProperties = {
  borderRadius: "50%",
  border: "2px solid #2c2f36"
};

export const sigNameStyle: React.CSSProperties = {
  color: "#8b9099",
  fontSize: "13px",
  margin: 0
};

export const footerSection: React.CSSProperties = { textAlign: "center" };

export const footerNoteStyle: React.CSSProperties = {
  color: "#7c828c",
  fontSize: "12px",
  margin: "0 0 8px"
};

export const unsubLink: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "12px",
  textDecoration: "underline",
  display: "inline-block"
};

export const card: React.CSSProperties = {
  backgroundColor: "#000000",
  padding: "32px",
  border: "1px solid #25272b"
};

export const eyebrow: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "12px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  margin: "0 0 8px"
};

export const plainCta: React.CSSProperties = {
  display: "block",
  color: "#f3f4f6",
  fontSize: "15px",
  fontWeight: "700",
  textDecoration: "underline",
  margin: "0 0 10px"
};
