import type { APIRoute } from "astro";

import { createSiteUrl, hasSiteUrl } from "@/config/site";

const localizedRoutePairs = [
  { en: "/", es: "/es" },
  { en: "/playground", es: "/es/playground" },
  { en: "/legal/privacy", es: "/es/legal/privacy" },
  { en: "/legal/terms", es: "/es/legal/terms" },
  { en: "/docs/getting-started", es: "/es/docs/getting-started" },
  { en: "/docs/react", es: "/es/docs/react" },
  { en: "/docs/vue", es: "/es/docs/vue" },
  { en: "/docs/preact", es: "/es/docs/preact" },
  { en: "/docs/astro", es: "/es/docs/astro" },
  { en: "/docs/core", es: "/es/docs/core" },
  { en: "/docs/playground", es: "/es/docs/playground" },
  { en: "/docs/customization", es: "/es/docs/customization" }
];

export const GET: APIRoute = () => {
  if (!hasSiteUrl) {
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow"
        }
      }
    );
  }

  const lastMod = new Date().toISOString();
  const urls = localizedRoutePairs
    .flatMap((pair) => {
      const enUrl = createSiteUrl(pair.en);
      const esUrl = createSiteUrl(pair.es);

      if (!enUrl || !esUrl) {
        return [];
      }

      return [
        { loc: enUrl, en: enUrl, es: esUrl },
        { loc: esUrl, en: enUrl, es: esUrl }
      ];
    })
    .map(
      ({ loc, en, es }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastMod}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${en}" />
    <xhtml:link rel="alternate" hreflang="es" href="${es}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}" />
  </url>`
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};

