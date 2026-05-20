import type { APIRoute } from "astro";
import { z } from "zod";
import { env } from "@/server/env";
import { supabasePublic } from "@/server/supabase-public";
import { checkRateLimit } from "@/server/utils/rate-limit";

const payloadSchema = z.object({ email: z.string().email() });

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const body = payloadSchema.parse(await request.json());
    const email = body.email.trim().toLowerCase();

    if (!checkRateLimit(`admin-link:ip:${clientAddress}`, 5, 5 * 60_000)) {
      return new Response(JSON.stringify({ ok: false, error: "rate_limited" }), { status: 429 });
    }

    if (!checkRateLimit(`admin-link:email:${email}`, 3, 10 * 60_000)) {
      return new Response(JSON.stringify({ ok: false, error: "rate_limited" }), { status: 429 });
    }

    if (!env.adminAllowedEmails.includes(email)) {
      return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), { status: 403 });
    }

    const requestUrl = new URL(request.url);
    const redirectBase = env.appBaseUrl || requestUrl.origin;

    const callbackUrl = new URL("/api/admin/auth/callback", redirectBase);
    callbackUrl.searchParams.set("next", "/admin");

    const { error } = await supabasePublic.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: callbackUrl.toString()
      }
    });

    if (error) {
      console.error("[admin-auth] magic link failed", {
        message: error.message,
        code: error.code,
        status: error.status,
        configuredBaseUrl: env.appBaseUrl,
        requestOrigin: redirectBase
      });
      return new Response(JSON.stringify({ ok: false, error: "auth_email_failed" }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_payload" }), { status: 400 });
    }
    console.error("[admin-auth] request-link failed", error);
    return new Response(JSON.stringify({ ok: false, error: "invalid_payload" }), { status: 400 });
  }
};
