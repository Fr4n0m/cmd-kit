import type { HomePageCopy } from "./shared";
import type { Locale } from "@/i18n/site";
import { homeEn } from "./home/en";
import { homeEs } from "./home/es";

export const homePages: Record<Locale, HomePageCopy> = {
  en: homeEn,
  es: homeEs
};

