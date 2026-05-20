import fs from "node:fs";
import path from "node:path";
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

interface SubscriptionDb {
  subscriptions: SubscriptionRecord[];
}

const DATA_DIR = path.resolve(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "subscriptions.json");

function readDb(): SubscriptionDb {
  if (!fs.existsSync(DATA_FILE)) {
    return { subscriptions: [] };
  }

  const raw = fs.readFileSync(DATA_FILE, "utf8");
  const parsed = JSON.parse(raw) as SubscriptionDb;
  return parsed;
}

function writeDb(db: SubscriptionDb) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf8");
}

export function findByEmail(email: string) {
  const db = readDb();
  return db.subscriptions.find((entry) => entry.email === email) ?? null;
}

export function findByVerifyTokenHash(verifyTokenHash: string) {
  const db = readDb();
  return db.subscriptions.find((entry) => entry.verifyTokenHash === verifyTokenHash) ?? null;
}

export function findByUnsubscribeTokenHash(unsubscribeTokenHash: string) {
  const db = readDb();
  return (
    db.subscriptions.find((entry) => entry.unsubscribeTokenHash === unsubscribeTokenHash) ?? null
  );
}

export function upsert(record: SubscriptionRecord) {
  const db = readDb();
  const index = db.subscriptions.findIndex((entry) => entry.email === record.email);
  if (index === -1) {
    db.subscriptions.push(record);
  } else {
    db.subscriptions[index] = record;
  }
  writeDb(db);
  return record;
}

export function listAll() {
  const db = readDb();
  return db.subscriptions.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function remove(email: string) {
  const db = readDb();
  const next = db.subscriptions.filter((entry) => entry.email !== email);
  db.subscriptions = next;
  writeDb(db);
}
