import { env } from "@/server/env";

export function guardAdmin(request: Request) {
  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  return Boolean(env.adminApiKey && token && token === env.adminApiKey);
}

export const unauthorized = () =>
  new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
    status: 401,
    headers: { "content-type": "application/json" }
  });
