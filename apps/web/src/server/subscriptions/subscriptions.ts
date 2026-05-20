import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import * as React from "react";
import { env } from "../env";
import type { Locale } from "./schemas";
import NewResourceEmail from "./templates/NewResourceEmail";
import NewResourcesDigestEmail from "./templates/NewResourcesDigestEmail";
import VerifyEmail from "./templates/VerifyEmail";
import WelcomeEmail from "./templates/WelcomeEmail";
import { isSpanishEmailLocale } from "./locale";

function createTransporter() {
  if (!env.smtpHost || !env.smtpUser || !env.smtpPass || !env.smtpFrom) {
    throw new Error("SMTP config missing: SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM");
  }

  const fromMatch = env.smtpFrom.match(/<([^>]+)>/);
  const fromEmail = fromMatch?.[1]?.trim() || env.smtpFrom.trim();
  return {
    from: `Cmd+kit <${fromEmail}>`,
    transporter: nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpPort === 465,
      auth: { user: env.smtpUser, pass: env.smtpPass }
    })
  };
}

async function sendMail(params: { to: string; subject: string; html: string }) {
  const { transporter, from } = createTransporter();
  await transporter.sendMail({ from, to: params.to, subject: params.subject, html: params.html });
}

export async function sendVerificationEmail(params: { email: string; locale: Locale; verifyUrl: string; unsubscribeUrl: string }) {
  const isEs = isSpanishEmailLocale(params.locale);
  const subject = isEs ? "Confirma tu suscripción · Cmd+kit" : "Confirm your subscription · Cmd+kit";
  const html = await render(
    React.createElement(VerifyEmail, {
      locale: params.locale,
      verifyUrl: params.verifyUrl,
      unsubscribeUrl: params.unsubscribeUrl,
      siteUrl: env.appBaseUrl,
      recipientEmail: params.email
    })
  );
  await sendMail({ to: params.email, subject, html });
}

export async function sendWelcomeEmail(params: { email: string; locale: Locale; unsubscribeUrl: string }) {
  const isEs = isSpanishEmailLocale(params.locale);
  const subject = isEs ? "Suscripción confirmada · Cmd+kit" : "Subscription confirmed · Cmd+kit";
  const html = await render(
    React.createElement(WelcomeEmail, {
      locale: params.locale,
      unsubscribeUrl: params.unsubscribeUrl,
      siteUrl: env.appBaseUrl,
      recipientEmail: params.email
    })
  );
  await sendMail({ to: params.email, subject, html });
}

export async function sendResourcePublishedEmail(params: {
  email: string;
  locale: Locale;
  unsubscribeUrl: string;
  title: string;
  url: string;
  summary?: string;
}) {
  const isEs = isSpanishEmailLocale(params.locale);
  const subject = isEs ? `Nuevo recurso: ${params.title}` : `New resource: ${params.title}`;
  const html = await render(
    React.createElement(NewResourceEmail, {
      resourceTitle: params.title,
      resourceDescription: params.summary,
      resourceUrl: params.url,
      locale: params.locale,
      unsubscribeUrl: params.unsubscribeUrl,
      recipientEmail: params.email
    })
  );
  await sendMail({ to: params.email, subject, html });
}

export async function sendResourcesDigestEmail(params: {
  email: string;
  locale: Locale;
  unsubscribeUrl: string;
  resources: Array<{ id: string; title: string; url: string; summary?: string }>;
}) {
  const isEs = isSpanishEmailLocale(params.locale);
  const subject = isEs
    ? `Nuevos recursos (${params.resources.length})`
    : `New resources (${params.resources.length})`;
  const html = await render(
    React.createElement(NewResourcesDigestEmail, {
      resources: params.resources,
      locale: params.locale,
      unsubscribeUrl: params.unsubscribeUrl,
      recipientEmail: params.email
    })
  );
  await sendMail({ to: params.email, subject, html });
}
