import type { APIRoute } from "astro";
import { ADMIN_SESSION_COOKIE } from "../auth";

export const prerender = false;

function clearAdminSessionCookie(cookies: { set: (...args: any[]) => void; delete: (...args: any[]) => void }) {
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
}

export const POST: APIRoute = async ({ cookies }) => {
  clearAdminSessionCookie(cookies);
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

export const GET: APIRoute = async ({ cookies, redirect }) => {
  clearAdminSessionCookie(cookies);
  return redirect("/admin?t=logout", 302);
};
