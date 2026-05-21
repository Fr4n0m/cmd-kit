import type { APIRoute } from "astro";
import { z } from "zod";
import { env } from "@/server/env";
import { sendResourcePublishedEmail } from "@/server/subscriptions/subscriptions";
import { getResourcesCatalog } from "@/server/subscriptions/resources-catalog";
import { guardAdmin, unauthorized } from "../auth";

export const prerender = false;

const payloadSchema = z.object({
  locale: z.enum(["en", "es"]).default("en"),
  email: z.string().email().optional()
});

export const POST: APIRoute = async ({ request }) => {
  if (!(await guardAdmin(request))) {
    return unauthorized();
  }

  try {
    const body = payloadSchema.parse(await request.json().catch(() => ({})));
    const locale = body.locale;
    const fallbackEmail = env.adminAllowedEmails[0];
    const targetEmail = (body.email ?? fallbackEmail ?? "").trim().toLowerCase();

    if (!targetEmail || !env.adminAllowedEmails.includes(targetEmail)) {
      return new Response(JSON.stringify({ ok: false, error: "unauthorized_target_email" }), {
        status: 403,
        headers: { "content-type": "application/json" }
      });
    }

    const catalog = await getResourcesCatalog(locale);
    const first = catalog[0];

    await sendResourcePublishedEmail({
      email: targetEmail,
      locale,
      title: first?.title ?? "@cmd-kit/core vunknown",
      summary:
        locale === "es"
          ? "Correo de prueba SMTP del panel admin."
          : "Admin panel SMTP test email.",
      url: first?.url ?? "https://www.npmjs.com/package/@cmd-kit/core",
      unsubscribeUrl: `${env.appBaseUrl}${locale === "es" ? "/es/unsubscribe" : "/unsubscribe"}`,
      releaseScope: "single"
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_payload" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
};
