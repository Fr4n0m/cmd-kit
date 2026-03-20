import type { LegalPageCopy } from "./shared";
import type { Locale } from "../site";
import { legalEn } from "./legal/en";
import { legalEs } from "./legal/es";

export const legalPages: Record<Locale, Record<"privacy" | "terms", LegalPageCopy>> = {
  en: legalEn,
  es: legalEs
};

