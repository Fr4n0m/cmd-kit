import { getDocPage, getDocSlugs } from "@/i18n/docs";
import type { Locale } from "@/i18n/site";
import { localizedPath } from "@/i18n/site";

export type CatalogResource = {
  id: string;
  title: string;
  url: string;
  summary: string;
};

export function getResourcesCatalog(locale: Locale): CatalogResource[] {
  return getDocSlugs().map((slug) => {
    const page = getDocPage(locale, slug);
    return {
      id: `docs:${slug}`,
      title: page.heading,
      url: localizedPath(locale, `/docs/${slug}`),
      summary: page.description
    };
  });
}

export function searchResources(query: string, locale: Locale): CatalogResource[] {
  const normalized = query.trim().toLowerCase();
  const items = getResourcesCatalog(locale);
  if (!normalized) return items.slice(0, 12);

  return items
    .filter((item) => {
      const haystack = `${item.id} ${item.title} ${item.summary} ${item.url}`.toLowerCase();
      return haystack.includes(normalized);
    })
    .slice(0, 20);
}
