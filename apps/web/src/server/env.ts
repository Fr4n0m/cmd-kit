import { z } from "zod";

const envSchema = z.object({
  APP_BASE_URL: z.string().url().optional(),
  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().min(1).optional(),
  SMTP_PASS: z.string().min(1).optional(),
  SMTP_FROM: z.string().min(1).optional(),
  SUBSCRIPTION_TOKEN_SECRET: z.string().min(16).default("dev-subscription-token-secret"),
  ADMIN_API_KEY: z.string().min(16).optional(),
  ADMIN_ALLOWED_EMAILS: z.string().optional(),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1).optional(),
  SUPABASE_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  PUBLIC_SUPABASE_URL: z.string().url().optional(),
  PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional()
});

const runtimeEnv = {
  ...process.env,
  ...import.meta.env
};

const parsed = envSchema.parse(runtimeEnv);
const resolvedSupabaseAnonKey = parsed.SUPABASE_ANON_KEY ?? parsed.SUPABASE_KEY;
if (!resolvedSupabaseAnonKey) {
  throw new Error("Missing SUPABASE_ANON_KEY (or SUPABASE_KEY alias).");
}
const adminAllowedEmails = (parsed.ADMIN_ALLOWED_EMAILS ?? "")
  .split(",")
  .map((entry) => entry.trim().toLowerCase())
  .filter(Boolean);

export const env = {
  appBaseUrl: parsed.APP_BASE_URL ?? "http://localhost:4321",
  smtpHost: parsed.SMTP_HOST,
  smtpPort: parsed.SMTP_PORT ?? 587,
  smtpUser: parsed.SMTP_USER,
  smtpPass: parsed.SMTP_PASS,
  smtpFrom: parsed.SMTP_FROM,
  tokenSecret: parsed.SUBSCRIPTION_TOKEN_SECRET,
  adminApiKey: parsed.ADMIN_API_KEY,
  adminAllowedEmails,
  supabaseUrl: parsed.SUPABASE_URL,
  supabaseAnonKey: resolvedSupabaseAnonKey,
  supabaseServiceRoleKey: parsed.SUPABASE_SERVICE_ROLE_KEY,
  publicSupabaseUrl: parsed.PUBLIC_SUPABASE_URL ?? parsed.SUPABASE_URL,
  publicSupabaseAnonKey: parsed.PUBLIC_SUPABASE_ANON_KEY ?? resolvedSupabaseAnonKey
};

export function hasSmtpConfig() {
  return Boolean(env.smtpHost && env.smtpUser && env.smtpPass && env.smtpFrom);
}
