import { env } from "@/server/env";
import { supabaseAdmin } from "@/server/supabase";

export async function guardAdmin(request: Request) {
  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

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
