export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const secondaryLocales = locales.filter(
  (locale): locale is Exclude<Locale, typeof defaultLocale> => locale !== defaultLocale
);

export interface LayoutCopy {
  brandAlt: string;
  brandTitle: string;
  brandSubtitle: string;
  core: string;
  docs: string;
  docsNavigationLabel: string;
  footerCoffee: string;
  footerCommunity: string;
  footerDescription: string;
  footerGithub: string;
  footerLegal: string;
  footerNavLabel: string;
  footerPrivacy: string;
  footerTerms: string;
  footerStudio: string;
  launch: string;
  launchPlayground: string;
  localeEnglish: string;
  localeSpanish: string;
  menuToggleLabel: string;
  playground: string;
  primaryNavigationLabel: string;
  productLabel: string;
  react: string;
  selectLanguage: string;
  skipToContent: string;
  themeDark: string;
  themeLight: string;
  toggleTheme: string;
  switchLanguage: string;
}

export interface DocsNavItem {
  href: string;
  label: string;
}

export const layoutCopy: Record<Locale, LayoutCopy> = {
  en: {
    brandAlt: "Cmd+kit",
    brandTitle: "+ Kit",
    brandSubtitle: "command palette system",
    core: "Core",
    docs: "Docs",
    docsNavigationLabel: "Documentation navigation",
    footerCoffee: "Buy me a coffee",
    footerCommunity: "Community",
    footerDescription:
      "Cmd+kit is an open source command palette system for shipping searchable, configurable command flows.",
    footerGithub: "GitHub",
    footerLegal: "Legal",
    footerNavLabel: "Footer",
    footerPrivacy: "Privacy",
    footerTerms: "Terms",
    footerStudio: "Fr4n0m",
    launch: "Launch",
    launchPlayground: "Open playground",
    localeEnglish: "English",
    localeSpanish: "Español",
    menuToggleLabel: "Open menu",
    playground: "Playground",
    primaryNavigationLabel: "Primary",
    productLabel: "command palette system",
    react: "React",
    selectLanguage: "Select language",
    skipToContent: "Skip to main content",
    themeDark: "Dark",
    themeLight: "Light",
    toggleTheme: "Toggle theme",
    switchLanguage: "ES"
  },
  es: {
    brandAlt: "Cmd+kit",
    brandTitle: "+ Kit",
    brandSubtitle: "command palette system",
    core: "Core",
    docs: "Docs",
    docsNavigationLabel: "Navegación de documentación",
    footerCoffee: "Buy me a coffee",
    footerCommunity: "Comunidad",
    footerDescription:
      "Cmd+kit es un sistema open source de command palette para crear flujos de comandos configurables y fáciles de buscar.",
    footerGithub: "GitHub",
    footerLegal: "Legal",
    footerNavLabel: "Footer",
    footerPrivacy: "Privacidad",
    footerTerms: "Términos",
    footerStudio: "Fr4n0m",
    launch: "Abrir",
    launchPlayground: "Abrir playground",
    localeEnglish: "English",
    localeSpanish: "Español",
    menuToggleLabel: "Abrir menú",
    playground: "Playground",
    primaryNavigationLabel: "Principal",
    productLabel: "command palette system",
    react: "React",
    selectLanguage: "Seleccionar idioma",
    skipToContent: "Saltar al contenido principal",
    themeDark: "Oscuro",
    themeLight: "Claro",
    toggleTheme: "Cambiar tema",
    switchLanguage: "EN"
  }
};

export function localizedPath(locale: Locale, pathname: string) {
  if (locale === defaultLocale) {
    return pathname === "/"
      ? "/"
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;
  }

  if (pathname === "/") {
    return "/es";
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/es${normalizedPath}`;
}

export function swapLocalePath(pathname: string, targetLocale: Locale) {
  const currentPath =
    pathname === "/es"
      ? "/"
      : pathname.startsWith("/es/")
        ? pathname.slice(3)
        : pathname;

  return localizedPath(targetLocale, currentPath || "/");
}
