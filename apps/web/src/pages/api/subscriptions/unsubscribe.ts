import type { APIRoute } from "astro";
import { ZodError } from "zod";
import { unsubscribe } from "@/server/subscriptions/service";
import { checkRateLimit } from "@/server/utils/rate-limit";

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!checkRateLimit(`unsub:${clientAddress}`, 15, 60_000)) {
    return new Response(JSON.stringify({ ok: false, error: "rate_limited" }), { status: 429 });
  }

  try {
    const body = await request.json();
    const result = await unsubscribe(body);
    if (!result.ok) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_token" }), { status: 400 });
    }

    return new Response(JSON.stringify({ ok: true, state: "unsubscribed" }), {
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

