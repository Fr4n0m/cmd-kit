const fallbackProductionSiteUrl = "https://cmd-kit.vercel.app";
const rawSiteUrl =
  import.meta.env.PUBLIC_SITE_URL?.trim() ||
  import.meta.env.SITE?.toString().trim() ||
  fallbackProductionSiteUrl;

export const siteUrl = rawSiteUrl.endsWith("/")
  ? rawSiteUrl.slice(0, -1)
  : rawSiteUrl;

export const hasSiteUrl = siteUrl.length > 0;

export const siteOrigin = siteUrl ? new URL(siteUrl) : null;

export function createSiteUrl(pathname: string) {
  if (!siteOrigin) {
    return null;
  }

  return new URL(pathname, siteOrigin).toString();
}
