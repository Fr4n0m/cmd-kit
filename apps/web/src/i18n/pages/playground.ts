import type { PlaygroundPageCopy } from "./shared";
import type { Locale } from "@/i18n/site";
import { playgroundEn } from "./playground/en";
import { playgroundEs } from "./playground/es";

export const playgroundPages: Record<Locale, PlaygroundPageCopy> = {
  en: playgroundEn,
  es: playgroundEs
};


