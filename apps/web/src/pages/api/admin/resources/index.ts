import type { APIRoute } from "astro";
import { guardAdmin, unauthorized } from "../auth";
import { searchResources } from "@/server/subscriptions/resources-catalog";

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  if (!(await guardAdmin(request))) {
    return unauthorized();
  }

  const query = url.searchParams.get("query") ?? "";
  const localeParam = (url.searchParams.get("locale") ?? "en").toLowerCase();
  const locale = localeParam === "es" ? "es" : "en";
  const items = await searchResources(query, locale);

  return new Response(JSON.stringify({ ok: true, items }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
};
