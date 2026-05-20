import { env } from "@/server/env";
import { supabaseAdmin } from "@/server/supabase";

export const ADMIN_SESSION_COOKIE = "cmdkit_admin_session";

function readCookieToken(request: Request) {
  const raw = request.headers.get("cookie") ?? "";
  const parts = raw.split(";").map((part) => part.trim());
  const match = parts.find((part) => part.startsWith(`${ADMIN_SESSION_COOKIE}=`));
  if (!match) {
    return "";
  }
  return decodeURIComponent(match.slice(`${ADMIN_SESSION_COOKIE}=`.length));
}

export async function guardAdmin(request: Request) {
  const auth = request.headers.get("authorization") ?? "";
  const bearerToken = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const cookieToken = readCookieToken(request);
  const token = bearerToken || cookieToken;

  if (!token) {
    return false;
  }

  if (env.adminApiKey && token === env.adminApiKey) {
    return true;
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user?.email) {
    return false;
  }

  const email = data.user.email.toLowerCase();
  return env.adminAllowedEmails.includes(email);
}

export const unauthorized = () =>
  new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
    status: 401,
    headers: { "content-type": "application/json" }
  });
