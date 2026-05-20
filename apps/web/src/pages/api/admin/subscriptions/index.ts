import type { APIRoute } from "astro";
import { ZodError } from "zod";
import { adminDelete, adminUpdateStatus, listSubscriptions } from "@/server/subscriptions/service";
import { guardAdmin, unauthorized } from "../auth";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  if (!(await guardAdmin(request))) {
    return unauthorized();
  }

  return new Response(JSON.stringify({ ok: true, items: await listSubscriptions() }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
};

export const PUT: APIRoute = async ({ request }) => {
  if (!(await guardAdmin(request))) {
    return unauthorized();
  }

  try {
    const body = await request.json();
    const result = await adminUpdateStatus(body);
    if (!result.ok) {
      return new Response(JSON.stringify({ ok: false, error: "not_found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_payload" }), { status: 400 });
    }
    return new Response(JSON.stringify({ ok: false, error: "unknown_error" }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  if (!(await guardAdmin(request))) {
    return unauthorized();
  }

  const url = new URL(request.url);
  const email = url.searchParams.get("email") ?? "";
  if (!email) {
    return new Response(JSON.stringify({ ok: false, error: "missing_email" }), { status: 400 });
  }

  await adminDelete(email);
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};


