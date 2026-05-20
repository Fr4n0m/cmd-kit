import { z } from "zod";

const envSchema = z.object({
  APP_BASE_URL: z.string().url().optional(),
  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().min(1).optional(),
  SMTP_PASS: z.string().min(1).optional(),
  SMTP_FROM: z.string().min(1).optional(),
  SUBSCRIPTION_TOKEN_SECRET: z.string().min(16).default("dev-subscription-token-secret"),
  ADMIN_API_KEY: z.string().min(16).optional()
});

const parsed = envSchema.parse(process.env);

export const env = {
  appBaseUrl: parsed.APP_BASE_URL ?? "http://localhost:4321",
  smtpHost: parsed.SMTP_HOST,
  smtpPort: parsed.SMTP_PORT ?? 587,
  smtpUser: parsed.SMTP_USER,
  smtpPass: parsed.SMTP_PASS,
  smtpFrom: parsed.SMTP_FROM,
  tokenSecret: parsed.SUBSCRIPTION_TOKEN_SECRET,
  adminApiKey: parsed.ADMIN_API_KEY
};

export function hasSmtpConfig() {
  return Boolean(env.smtpHost && env.smtpUser && env.smtpPass && env.smtpFrom);
}
