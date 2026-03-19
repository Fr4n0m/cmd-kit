import type { Locale } from "../site";
import { docsEn } from "./en";
import { docsEs } from "./es";
import {
  docsSlugs,
  type DocBlock,
  type DocPageData,
  type DocsNavItem,
  type DocsSectionItem,
  type DocSection,
  type DocSlug,
  type InstallSelectorCopy
} from "./shared";

export type {
  DocBlock,
  DocPageData,
  DocsNavItem,
  DocsSectionItem,
  DocSection,
  DocSlug,
  InstallSelectorCopy
} from "./shared";

const docsByLocale = {
  en: docsEn,
  es: docsEs
} satisfies Record<Locale, Record<DocSlug, DocPageData>>;

export function getDocPage(locale: Locale, slug: DocSlug) {
  return docsByLocale[locale][slug];
}

export function getDocSlugs() {
  return docsSlugs;
}

export function getDocHeadings(locale: Locale, slug: DocSlug): DocsSectionItem[] {
  return docsByLocale[locale][slug].sections.map((section) => ({
    id: section.id,
    label: section.label
  }));
}

export function getDocsNavigation(locale: Locale): DocsNavItem[] {
  return docsSlugs.map((slug) => ({
    href: `/docs/${slug}`,
    label: docsByLocale[locale][slug].navLabel
  }));
}

export function getInstallSelectorCopy(locale: Locale): InstallSelectorCopy {
  if (locale === "es") {
    return {
      codeLabel: "bash",
      installerLabel: "Gestor de paquetes",
      packageHint: "Ver documentación del adaptador",
      techLabel: "Tecnología",
      technologies: { astro: "Astro", core: "Core", preact: "Preact", react: "React", vue: "Vue" }
    };
  }

  return {
    codeLabel: "bash",
    installerLabel: "Package manager",
    packageHint: "Open adapter documentation",
    techLabel: "Technology",
    technologies: { astro: "Astro", core: "Core", preact: "Preact", react: "React", vue: "Vue" }
  };
}
