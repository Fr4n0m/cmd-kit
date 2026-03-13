export const siteUrl = import.meta.env.PUBLIC_SITE_URL?.trim() || "";

export const siteOrigin = siteUrl ? new URL(siteUrl) : null;

export function createSiteUrl(pathname: string) {
  if (!siteOrigin) {
    return null;
  }

  return new URL(pathname, siteOrigin).toString();
}
