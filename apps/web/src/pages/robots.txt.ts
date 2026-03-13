import type { APIRoute } from "astro";

import { createSiteUrl } from "../config/site";

export const GET: APIRoute = () => {
  const lines = ["User-agent: *", "Allow: /"];
  const sitemapUrl = createSiteUrl("/sitemap.xml");

  if (sitemapUrl) {
    lines.push(`Sitemap: ${sitemapUrl}`);
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};
