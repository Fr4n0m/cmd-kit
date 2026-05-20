import crypto from "node:crypto";

export function createRawToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashToken(rawToken: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(rawToken).digest("hex");
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}
