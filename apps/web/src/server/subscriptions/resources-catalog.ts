import type { Locale } from "@/i18n/site";

export type CatalogResource = {
  id: string;
  title: string;
  url: string;
  summary: string;
};

const trackedPackages = [
  "@cmd-kit/core",
  "@cmd-kit/react",
  "@cmd-kit/vue",
  "@cmd-kit/preact",
  "@cmd-kit/astro"
] as const;

export const TRACKED_NPM_PACKAGE_IDS = new Set(trackedPackages.map((pkg) => `npm:${pkg}`));

const versionCache = new Map<string, { version: string; expiresAt: number }>();
const VERSION_TTL_MS = 10 * 60 * 1000;

async function fetchNpmVersion(pkg: string): Promise<string> {
  const now = Date.now();
  const cached = versionCache.get(pkg);
  if (cached && cached.expiresAt > now) {
    return cached.version;
  }

  try {
    const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`, {
      headers: { accept: "application/json" }
    });
    if (!response.ok) {
      throw new Error("npm_lookup_failed");
    }
    const payload = (await response.json()) as { version?: string };
    const version = payload.version ?? "unknown";
    versionCache.set(pkg, { version, expiresAt: now + VERSION_TTL_MS });
    return version;
  } catch {
    return cached?.version ?? "unknown";
  }
}

export async function getResourcesCatalog(locale: Locale): Promise<CatalogResource[]> {
  const versions = await Promise.all(trackedPackages.map((pkg) => fetchNpmVersion(pkg)));
  return trackedPackages.map((pkg, index) => ({
    id: `npm:${pkg}`,
    title: `${pkg} v${versions[index]}`,
    url: `https://www.npmjs.com/package/${encodeURIComponent(pkg)}`,
    summary: locale === "es" ? "Nueva versión publicada en npm." : "New version published on npm."
  }));
}

export async function searchResources(query: string, locale: Locale): Promise<CatalogResource[]> {
  const normalized = query.trim().toLowerCase();
  const items = await getResourcesCatalog(locale);
  if (!normalized) return items.slice(0, 12);

  return items
    .filter((item) => {
      const haystack = `${item.id} ${item.title} ${item.summary} ${item.url}`.toLowerCase();
      return haystack.includes(normalized);
    })
    .slice(0, 20);
}
