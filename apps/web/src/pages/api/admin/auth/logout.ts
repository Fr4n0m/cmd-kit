import type { APIRoute } from "astro";
import { ADMIN_SESSION_COOKIE } from "../auth";

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete(ADMIN_SESSION_COOKIE, { path: "/" });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

