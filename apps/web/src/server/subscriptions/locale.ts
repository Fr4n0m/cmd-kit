export function normalizeEmailLocale(locale: string): string {
  return String(locale || "").trim().toLowerCase();
}

export function isSpanishEmailLocale(locale: string): boolean {
  const normalized = normalizeEmailLocale(locale);
  return normalized === "es" || normalized === "es-mx";
}
