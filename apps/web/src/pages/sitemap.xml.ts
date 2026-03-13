import type { APIRoute } from "astro";

import { createSiteUrl, siteOrigin } from "../config/site";

const routes = [
  "/",
  "/docs/getting-started",
  "/docs/react",
  "/docs/vue",
  "/docs/preact",
  "/docs/astro",
  "/docs/customization"
];

export const GET: APIRoute = () => {
  const body = siteOrigin
    ? `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const url = createSiteUrl(route);
    return url ? `  <url><loc>${url}</loc></url>` : "";
  })
  .filter(Boolean)
  .join("\n")}
</urlset>`
    : `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
