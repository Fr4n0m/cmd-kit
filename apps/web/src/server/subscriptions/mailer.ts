import nodemailer from "nodemailer";
import { env, hasSmtpConfig } from "../env";
import type { Locale } from "./schemas";

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function t(locale: Locale, es: string, en: string) {
  return locale === "es" ? es : en;
}

const transporter = hasSmtpConfig()
  ? nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: false,
      auth: { user: env.smtpUser, pass: env.smtpPass }
    })
  : null;

async function sendMail(to: string, subject: string, html: string) {
  if (!transporter || !env.smtpFrom) {
    console.warn("[subscriptions] SMTP not configured. Skipping email", { to, subject });
    return;
  }

  await transporter.sendMail({
    from: env.smtpFrom,
    to,
    subject,
    html
  });
}

export async function sendVerificationEmail(params: { email: string; locale: Locale; verifyUrl: string }) {
  const { email, locale, verifyUrl } = params;
  const subject = t(locale, "Confirma tu suscripción", "Confirm your subscription");
  const cta = t(locale, "Confirmar suscripción", "Confirm subscription");
  const intro = t(
    locale,
    "Gracias por suscribirte. Confirma tu email para activar avisos.",
    "Thanks for subscribing. Confirm your email to activate updates."
  );

  await sendMail(
    email,
    subject,
    `<div><h2>Cmd+kit</h2><p>${escapeHtml(intro)}</p><p><a href="${verifyUrl}">${escapeHtml(cta)}</a></p></div>`
  );
}

export async function sendWelcomeEmail(params: { email: string; locale: Locale; unsubscribeUrl: string }) {
  const { email, locale, unsubscribeUrl } = params;
  const subject = t(locale, "Suscripción confirmada", "Subscription confirmed");
  const body = t(locale, "Tu suscripción ya está activa.", "Your subscription is now active.");
  const unsub = t(locale, "Cancelar suscripción", "Unsubscribe");

  await sendMail(
    email,
    subject,
    `<div><h2>Cmd+kit</h2><p>${escapeHtml(body)}</p><p><a href="${unsubscribeUrl}">${escapeHtml(unsub)}</a></p></div>`
  );
}

export async function sendResourcePublishedEmail(params: {
  email: string;
  locale: Locale;
  unsubscribeUrl: string;
  title: string;
  url: string;
  summary?: string;
}) {
  const { email, locale, unsubscribeUrl, title, url, summary } = params;
  const subject = t(locale, `Nuevo recurso: ${title}`, `New resource: ${title}`);
  const cta = t(locale, "Ver recurso", "Open resource");
  const unsub = t(locale, "Cancelar suscripción", "Unsubscribe");

  await sendMail(
    email,
    subject,
    `<div><h2>Cmd+kit</h2><p>${escapeHtml(title)}</p>${summary ? `<p>${escapeHtml(summary)}</p>` : ""}<p><a href="${url}">${escapeHtml(cta)}</a></p><p><a href="${unsubscribeUrl}">${escapeHtml(unsub)}</a></p></div>`
  );
}
