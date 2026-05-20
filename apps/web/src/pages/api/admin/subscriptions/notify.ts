import type { APIRoute } from "astro";
import { ZodError } from "zod";
import { notifyPublishedResource } from "@/server/subscriptions/service";
import { guardAdmin, unauthorized } from "../auth";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!(await guardAdmin(request))) {
    return unauthorized();
  }

  try {
    const body = await request.json();
    const result = await notifyPublishedResource(body);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_payload" }), { status: 400 });
    }
    return new Response(JSON.stringify({ ok: false, error: "unknown_error" }), { status: 500 });
  }
};

