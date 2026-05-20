import { supabaseAdmin } from "../supabase";
import type { Locale, Source, SubscriptionStatus } from "./schemas";

export interface SubscriptionRecord {
  email: string;
  status: SubscriptionStatus;
  locale: Locale;
  source: Source;
  verifyTokenHash: string;
  unsubscribeTokenHash: string;
  createdAt: string;
  updatedAt: string;
  verifiedAt?: string;
  unsubscribedAt?: string;
  acceptedAt: string;
  acceptedIp: string;
  acceptedUserAgent: string;
  consentVersion: string;
  lastNotifiedResourceId?: string;
}

type SubscriptionRow = {
  email: string;
  status: SubscriptionStatus;
  locale: Locale;
  source: Source;
  verify_token_hash: string;
  unsubscribe_token_hash: string;
  created_at: string;
  updated_at: string;
  verified_at: string | null;
  unsubscribed_at: string | null;
  accepted_at: string;
  accepted_ip: string;
  accepted_user_agent: string;
  consent_version: string;
  last_notified_resource_id: string | null;
};

function toRecord(row: SubscriptionRow): SubscriptionRecord {
  return {
    email: row.email,
    status: row.status,
    locale: row.locale,
    source: row.source,
    verifyTokenHash: row.verify_token_hash,
    unsubscribeTokenHash: row.unsubscribe_token_hash,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    verifiedAt: row.verified_at ?? undefined,
    unsubscribedAt: row.unsubscribed_at ?? undefined,
    acceptedAt: row.accepted_at,
    acceptedIp: row.accepted_ip,
    acceptedUserAgent: row.accepted_user_agent,
    consentVersion: row.consent_version,
    lastNotifiedResourceId: row.last_notified_resource_id ?? undefined
  };
}

function toRow(record: SubscriptionRecord) {
  return {
    email: record.email,
    status: record.status,
    locale: record.locale,
    source: record.source,
    verify_token_hash: record.verifyTokenHash,
    unsubscribe_token_hash: record.unsubscribeTokenHash,
    created_at: record.createdAt,
    updated_at: record.updatedAt,
    verified_at: record.verifiedAt ?? null,
    unsubscribed_at: record.unsubscribedAt ?? null,
    accepted_at: record.acceptedAt,
    accepted_ip: record.acceptedIp,
    accepted_user_agent: record.acceptedUserAgent,
    consent_version: record.consentVersion,
    last_notified_resource_id: record.lastNotifiedResourceId ?? null
  };
}

export async function findByEmail(email: string) {
  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("email", email)
    .maybeSingle<SubscriptionRow>();

  if (error) {
    throw error;
  }

  return data ? toRecord(data) : null;
}

export async function findByVerifyTokenHash(verifyTokenHash: string) {
  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("verify_token_hash", verifyTokenHash)
    .maybeSingle<SubscriptionRow>();

  if (error) {
    throw error;
  }

  return data ? toRecord(data) : null;
}

export async function findByUnsubscribeTokenHash(unsubscribeTokenHash: string) {
  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("unsubscribe_token_hash", unsubscribeTokenHash)
    .maybeSingle<SubscriptionRow>();

  if (error) {
    throw error;
  }

  return data ? toRecord(data) : null;
}

export async function upsert(record: SubscriptionRecord) {
  const payload = toRow(record);

  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .upsert(payload, { onConflict: "email" })
    .select("*")
    .single<SubscriptionRow>();

  if (error) {
    throw error;
  }

  return toRecord(data);
}

export async function listAll() {
  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .order("updated_at", { ascending: false })
    .returns<SubscriptionRow[]>();

  if (error) {
    throw error;
  }

  return (data ?? []).map(toRecord);
}

export async function remove(email: string) {
  const { error } = await supabaseAdmin.from("subscriptions").delete().eq("email", email);
  if (error) {
    throw error;
  }
}
