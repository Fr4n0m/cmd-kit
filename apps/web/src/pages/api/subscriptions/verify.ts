import type { APIRoute } from "astro";
import { verifySubscription } from "@/server/subscriptions/service";
import { checkRateLimit } from "@/server/utils/rate-limit";

export const prerender = false;

export const GET: APIRoute = async ({ request, redirect, clientAddress }) => {
  if (!checkRateLimit(`verify:${clientAddress}`, 30, 60_000)) {
    return redirect("/?subscription=error", 302);
  }

  const token = new URL(request.url).searchParams.get("token") ?? "";
  const result = await verifySubscription({ token });

  if (!result.ok) {
    return redirect("/?subscription=error", 302);
  }

  return redirect("/?subscription=confirmed", 302);
};
