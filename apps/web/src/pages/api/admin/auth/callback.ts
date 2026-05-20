import type { APIRoute } from "astro";
import { env } from "@/server/env";
import { supabasePublic } from "@/server/supabase-public";
import { ADMIN_SESSION_COOKIE } from "../auth";

export const prerender = false;

const ALLOWED_OTP_TYPES = new Set(["magiclink", "email", "recovery", "invite", "email_change"]);

function sanitizeNextPath(value: string) {
  if (!value.startsWith("/")) return "/admin";
  if (value.startsWith("//")) return "/admin";
  if (value !== "/admin") return "/admin";
  return "/admin";
}

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const next = sanitizeNextPath(url.searchParams.get("next") ?? "/admin");

  let accessToken = "";

  if (code) {
    const { data, error } = await supabasePublic.auth.exchangeCodeForSession(code);
    if (error || !data.session?.access_token) {
      return redirect("/admin?error=auth_callback_failed", 302);
    }
    accessToken = data.session.access_token;
  } else if (tokenHash && type && ALLOWED_OTP_TYPES.has(type)) {
    const { data, error } = await supabasePublic.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as "magiclink" | "email" | "recovery" | "invite" | "email_change"
    });
    if (error || !data.session?.access_token) {
      return redirect("/admin?error=auth_callback_failed", 302);
    }
    accessToken = data.session.access_token;
  } else {
    return redirect("/admin?error=missing_auth_token", 302);
  }

  const { data, error } = await supabasePublic.auth.getUser(accessToken);
  const email = data.user?.email?.toLowerCase();
  if (error || !email || !env.adminAllowedEmails.includes(email)) {
    return redirect("/admin?error=unauthorized", 302);
  }

  cookies.set(ADMIN_SESSION_COOKIE, accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return redirect(next, 302);
};
