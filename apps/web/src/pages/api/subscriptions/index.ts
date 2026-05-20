import type { APIRoute } from "astro";
import { ZodError } from "zod";
import { subscribe } from "@/server/subscriptions/service";
import { checkRateLimit } from "@/server/utils/rate-limit";

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!checkRateLimit(`sub:${clientAddress}`, 10, 60_000)) {
    return new Response(JSON.stringify({ ok: false, error: "rate_limited" }), { status: 429 });
  }

  try {
    const body = await request.json();
    const userAgent = request.headers.get("user-agent") ?? "unknown";
    await subscribe(body, { ip: clientAddress, userAgent });

    return new Response(JSON.stringify({ ok: true, state: "verification_sent" }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_payload" }), { status: 400 });
    }
    return new Response(JSON.stringify({ ok: true, state: "verification_sent" }), { status: 200 });
  }
};
