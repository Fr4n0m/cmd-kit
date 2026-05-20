import type { Locale } from "@/i18n/site";
import { readFileSync } from "node:fs";

export type CatalogResource = {
  id: string;
  title: string;
  url: string;
  summary: string;
};

type PackageMeta = {
  pkg: string;
  version: string;
};

function readPackageMeta(relativePath: string, pkg: string): PackageMeta {
  try {
    const raw = readFileSync(new URL(relativePath, import.meta.url), "utf8");
    const parsed = JSON.parse(raw) as { version?: string };
    return { pkg, version: parsed.version ?? "latest" };
  } catch {
    return { pkg, version: "latest" };
  }
}

const packageMeta = [
  readPackageMeta("../../../../../packages/core/package.json", "@cmd-kit/core"),
  readPackageMeta("../../../../../packages/react/package.json", "@cmd-kit/react"),
  readPackageMeta("../../../../../packages/vue/package.json", "@cmd-kit/vue"),
  readPackageMeta("../../../../../packages/preact/package.json", "@cmd-kit/preact"),
  readPackageMeta("../../../../../packages/astro/package.json", "@cmd-kit/astro")
];

export const TRACKED_NPM_PACKAGE_IDS = new Set(packageMeta.map((item) => `npm:${item.pkg}`));

const resourcesByLocale: Record<Locale, CatalogResource[]> = {
  es: packageMeta.map((item) => ({
    id: `npm:${item.pkg}`,
    title: `${item.pkg} v${item.version}`,
    url: `https://www.npmjs.com/package/${encodeURIComponent(item.pkg)}`,
    summary: "Nueva versión publicada en npm."
  })),
  en: packageMeta.map((item) => ({
    id: `npm:${item.pkg}`,
    title: `${item.pkg} v${item.version}`,
    url: `https://www.npmjs.com/package/${encodeURIComponent(item.pkg)}`,
    summary: "New version published on npm."
  }))
};

export function getResourcesCatalog(locale: Locale): CatalogResource[] {
  return resourcesByLocale[locale];
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
