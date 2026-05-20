import type { APIRoute } from "astro";
import { env, hasSmtpConfig } from "@/server/env";
import { guardAdmin, unauthorized } from "../auth";

export const prerender = false;

type Check = {
  key: string;
  ok: boolean;
  detail: string;
};

export const GET: APIRoute = async ({ request }) => {
  if (!(await guardAdmin(request))) {
    return unauthorized();
  }

  const checks: Check[] = [
    {
      key: "admin_allowed_emails",
      ok: env.adminAllowedEmails.length > 0,
      detail:
        env.adminAllowedEmails.length > 0
          ? `${env.adminAllowedEmails.length} configured`
          : "No allowlisted admin emails"
    },
    {
      key: "supabase_url",
      ok: Boolean(env.supabaseUrl),
      detail: env.supabaseUrl ? "Configured" : "Missing"
    },
    {
      key: "supabase_service_role_key",
      ok: Boolean(env.supabaseServiceRoleKey),
      detail: env.supabaseServiceRoleKey ? "Configured" : "Missing"
    },
    {
      key: "supabase_public_key",
      ok: Boolean(env.supabaseAnonKey),
      detail: env.supabaseAnonKey ? "Configured" : "Missing"
    },
    {
      key: "token_secret",
      ok: env.tokenSecret.length >= 16,
      detail: env.tokenSecret.length >= 16 ? "Configured" : "Too short or missing"
    },
    {
      key: "smtp",
      ok: hasSmtpConfig(),
      detail: hasSmtpConfig() ? "Configured" : "Missing host/user/pass/from"
    },
    {
      key: "app_base_url",
      ok: Boolean(env.appBaseUrl),
      detail: env.appBaseUrl || "Missing"
    }
  ];

  return new Response(
    JSON.stringify({
      ok: true,
      healthy: checks.every((item) => item.ok),
      checks
    }),
    {
      status: 200,
      headers: { "content-type": "application/json", "cache-control": "no-store" }
    }
  );
};
