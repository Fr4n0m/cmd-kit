import type { APIRoute } from "astro";
import { ADMIN_SESSION_COOKIE } from "../auth";

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  cookies.delete(ADMIN_SESSION_COOKIE, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/"
  });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
