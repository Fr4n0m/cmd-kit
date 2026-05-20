import { z } from "zod";

const sourceSchema = z.enum(["hero", "footer", "banner", "modal", "other"]);
const localeSchema = z.enum(["es", "en"]);
const subscriptionStatusSchema = z.enum(["pending", "active", "unsubscribed"]);

export const subscribeInputSchema = z.object({
  email: z.string().email(),
  locale: localeSchema.default("en"),
  source: sourceSchema.default("other"),
  acceptTerms: z.literal(true),
  consentVersion: z.string().min(1).max(64)
});

export const verifyInputSchema = z.object({
  token: z.string().min(24).max(256)
});

export const unsubscribeInputSchema = z.object({
  token: z.string().min(24).max(256)
});

export const adminUpdateSubscriptionSchema = z.object({
  email: z.string().email(),
  status: subscriptionStatusSchema
});

export const publishResourceSchema = z.object({
  id: z.string().min(1).max(128),
  title: z.string().min(1).max(200),
  url: z.string().url(),
  summary: z.string().max(800).optional()
});

export const notifyResourcesSchema = z.object({
  resources: z.array(publishResourceSchema).min(1).max(20)
});

export type Source = z.infer<typeof sourceSchema>;
export type Locale = z.infer<typeof localeSchema>;
export type SubscriptionStatus = z.infer<typeof subscriptionStatusSchema>;
export type SubscribeInput = z.infer<typeof subscribeInputSchema>;
export type VerifyInput = z.infer<typeof verifyInputSchema>;
export type UnsubscribeInput = z.infer<typeof unsubscribeInputSchema>;
export type AdminUpdateSubscriptionInput = z.infer<typeof adminUpdateSubscriptionSchema>;
export type PublishResourceInput = z.infer<typeof publishResourceSchema>;
export type NotifyResourcesInput = z.infer<typeof notifyResourcesSchema>;
