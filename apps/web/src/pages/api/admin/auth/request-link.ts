import type { APIRoute } from "astro";
import { z } from "zod";
import { env } from "@/server/env";
import { supabasePublic } from "@/server/supabase-public";

const payloadSchema = z.object({ email: z.string().email() });

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = payloadSchema.parse(await request.json());
    const email = body.email.trim().toLowerCase();

    if (!env.adminAllowedEmails.includes(email)) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    const { error } = await supabasePublic.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${env.appBaseUrl}/admin/subscriptions`
      }
    });

    if (error) {
      return new Response(JSON.stringify({ ok: false, error: "auth_email_failed" }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_payload" }), { status: 400 });
  }
};
