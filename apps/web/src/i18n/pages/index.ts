import type { Locale } from "../site";
import { homePages } from "./home";
import { legalPages } from "./legal";
import { playgroundPages } from "./playground";

export type { HomePageCopy, LegalPageCopy, PlaygroundPageCopy } from "./shared";

export function getHomePage(locale: Locale) {
  return homePages[locale];
}

export function getPlaygroundPage(locale: Locale) {
  return playgroundPages[locale];
}

export function getLegalPage(locale: Locale, slug: "privacy" | "terms") {
  return legalPages[locale][slug];
}
