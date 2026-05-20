import { env } from "../env";
import {
  adminUpdateSubscriptionSchema,
  publishResourceSchema,
  subscribeInputSchema,
  type SubscribeInput,
  unsubscribeInputSchema,
  verifyInputSchema
} from "./schemas";
import { normalizeEmail, createRawToken, hashToken } from "./tokens";
import * as repo from "./repository";
import {
  sendResourcePublishedEmail,
  sendVerificationEmail,
  sendWelcomeEmail
} from "./subscriptions";

function nowIso() {
  return new Date().toISOString();
}

function buildVerifyUrl(rawToken: string) {
  return `${env.appBaseUrl}/api/subscriptions/verify?token=${encodeURIComponent(rawToken)}`;
}

function buildUnsubscribeUrl(rawToken: string) {
  return `${env.appBaseUrl}/unsubscribe?token=${encodeURIComponent(rawToken)}`;
}

export async function subscribe(input: unknown, meta: { ip: string; userAgent: string }) {
  const payload = subscribeInputSchema.parse(input);
  const email = normalizeEmail(payload.email);
  const current = await repo.findByEmail(email);

  const verifyRaw = createRawToken();
  const unsubscribeRaw = createRawToken();
  const verifyHash = hashToken(verifyRaw, env.tokenSecret);
  const unsubscribeHash = hashToken(unsubscribeRaw, env.tokenSecret);
  const timestamp = nowIso();

  const next = {
    email,
    status: "pending" as const,
    locale: payload.locale,
    source: payload.source,
    verifyTokenHash: verifyHash,
    unsubscribeTokenHash: unsubscribeHash,
    createdAt: current?.createdAt ?? timestamp,
    updatedAt: timestamp,
    acceptedAt: timestamp,
    acceptedIp: meta.ip,
    acceptedUserAgent: meta.userAgent,
    consentVersion: payload.consentVersion,
    verifiedAt: undefined,
    unsubscribedAt: undefined,
    lastNotifiedResourceId: current?.lastNotifiedResourceId
  };

  await repo.upsert(next);
  await sendVerificationEmail({
    email,
    locale: payload.locale,
    verifyUrl: buildVerifyUrl(verifyRaw),
    unsubscribeUrl: buildUnsubscribeUrl(unsubscribeRaw)
  });

  return { ok: true };
}

export async function verifySubscription(input: unknown) {
  const payload = verifyInputSchema.parse(input);
  const tokenHash = hashToken(payload.token, env.tokenSecret);
  const current = await repo.findByVerifyTokenHash(tokenHash);
  if (!current) {
    return { ok: false as const };
  }

  if (current.status === "active") {
    return { ok: true as const, alreadyActive: true };
  }

  const updated = {
    ...current,
    status: "active" as const,
    verifiedAt: nowIso(),
    updatedAt: nowIso()
  };

  await repo.upsert(updated);
  await sendWelcomeEmail({
    email: updated.email,
    locale: updated.locale,
    unsubscribeUrl: buildUnsubscribeUrl(payload.token)
  });

  return { ok: true as const, alreadyActive: false };
}

export async function getUnsubscribePreview(input: unknown) {
  const payload = unsubscribeInputSchema.parse(input);
  const tokenHash = hashToken(payload.token, env.tokenSecret);
  const current = await repo.findByUnsubscribeTokenHash(tokenHash);
  return { exists: Boolean(current), email: current?.email ?? null };
}

export async function unsubscribe(input: unknown) {
  const payload = unsubscribeInputSchema.parse(input);
  const tokenHash = hashToken(payload.token, env.tokenSecret);
  const current = await repo.findByUnsubscribeTokenHash(tokenHash);
  if (!current) {
    return { ok: false as const };
  }

  await repo.upsert({
    ...current,
    status: "unsubscribed",
    unsubscribedAt: nowIso(),
    updatedAt: nowIso()
  });

  return { ok: true as const };
}

export async function listSubscriptions() {
  return repo.listAll();
}

export async function adminUpdateStatus(input: unknown) {
  const payload = adminUpdateSubscriptionSchema.parse(input);
  const email = normalizeEmail(payload.email);
  const current = await repo.findByEmail(email);
  if (!current) {
    return { ok: false as const };
  }

  await repo.upsert({ ...current, status: payload.status, updatedAt: nowIso() });
  return { ok: true as const };
}

export async function adminDelete(email: string) {
  await repo.remove(normalizeEmail(email));
  return { ok: true as const };
}

export async function notifyPublishedResource(input: unknown) {
  const payload = publishResourceSchema.parse(input);
  const active = (await repo.listAll()).filter((entry) => entry.status === "active");

  let sent = 0;
  for (const subscription of active) {
    if (subscription.lastNotifiedResourceId === payload.id) {
      continue;
    }

    const rawUnsubscribeToken = createRawToken();
    const unsubscribeTokenHash = hashToken(rawUnsubscribeToken, env.tokenSecret);

    await sendResourcePublishedEmail({
      email: subscription.email,
      locale: subscription.locale,
      title: payload.title,
      summary: payload.summary,
      url: payload.url,
      unsubscribeUrl: buildUnsubscribeUrl(rawUnsubscribeToken)
    });

    await repo.upsert({
      ...subscription,
      unsubscribeTokenHash,
      lastNotifiedResourceId: payload.id,
      updatedAt: nowIso()
    });
    sent += 1;
  }

  return { ok: true as const, sent };
}

export function parseSubscribeBody(raw: unknown): SubscribeInput {
  return subscribeInputSchema.parse(raw);
}
