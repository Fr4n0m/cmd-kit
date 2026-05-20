import { defineMiddleware } from "astro:middleware";
import { guardAdmin } from "@/pages/api/admin/auth";

const ADMIN_ENTRY_PATH = "/admin";
const ADMIN_PREFIX = "/admin/";
const ADMIN_API_PREFIX = "/api/admin/";
const PUBLIC_ADMIN_API_PREFIXES = [
  "/api/admin/auth/request-link",
  "/api/admin/auth/callback",
  "/api/admin/auth/session",
  "/api/admin/auth/logout"
];

function isPublicAdminApi(pathname: string) {
  return PUBLIC_ADMIN_API_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function applyAdminHeaders(response: Response) {
  response.headers.set("cache-control", "no-store, private, max-age=0");
  response.headers.set("x-robots-tag", "noindex, nofollow, noarchive");
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  if (pathname.startsWith(ADMIN_API_PREFIX) && !isPublicAdminApi(pathname)) {
    if (!(await guardAdmin(context.request))) {
      return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
        status: 401,
        headers: {
          "content-type": "application/json",
          "cache-control": "no-store, private, max-age=0"
        }
      });
    }
    const response = await next();
    applyAdminHeaders(response);
    return response;
  }

  if (pathname === ADMIN_ENTRY_PATH) {
    const response = await next();
    applyAdminHeaders(response);
    return response;
  }

  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (!(await guardAdmin(context.request))) {
      const redirectResponse = context.redirect("/admin", 302);
      applyAdminHeaders(redirectResponse);
      return redirectResponse;
    }
    const response = await next();
    applyAdminHeaders(response);
    return response;
  }

  return next();
});
