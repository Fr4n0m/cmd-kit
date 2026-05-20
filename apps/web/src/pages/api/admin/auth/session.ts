import type { APIRoute } from "astro";
import { z } from "zod";
import { env } from "@/server/env";
import { supabaseAdmin } from "@/server/supabase";
import { ADMIN_SESSION_COOKIE } from "../auth";

const payloadSchema = z.object({
  accessToken: z.string().min(20)
});

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = payloadSchema.parse(await request.json());
    const { data, error } = await supabaseAdmin.auth.getUser(body.accessToken);
    if (error || !data.user?.email) {
      return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), { status: 401 });
    }

    const email = data.user.email.toLowerCase();
    if (!env.adminAllowedEmails.includes(email)) {
      return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), { status: 401 });
    }

    cookies.set(ADMIN_SESSION_COOKIE, body.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_payload" }), { status: 400 });
  }
};

