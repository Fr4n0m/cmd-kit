export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export interface LayoutCopy {
  core: string;
  docs: string;
  footerCoffee: string;
  footerCommunity: string;
  footerDescription: string;
  footerGithub: string;
  footerLegal: string;
  footerPrivacy: string;
  footerTerms: string;
  footerStudio: string;
  launch: string;
  launchPlayground: string;
  playground: string;
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
    core: "Core",
    docs: "Docs",
    footerCoffee: "Buy me a coffee",
    footerCommunity: "Community",
    footerDescription:
      "Cmd+kit is an open source command palette system for shipping searchable, configurable command flows.",
    footerGithub: "GitHub",
    footerLegal: "Legal",
    footerPrivacy: "Privacy",
    footerTerms: "Terms",
    footerStudio: "Fr4n0m",
    launch: "Launch",
    launchPlayground: "Open playground",
    playground: "Playground",
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
    core: "Core",
    docs: "Docs",
    footerCoffee: "Buy me a coffee",
    footerCommunity: "Comunidad",
    footerDescription:
      "Cmd+kit es un sistema open source de command palette para crear flujos de comandos configurables y fáciles de buscar.",
    footerGithub: "GitHub",
    footerLegal: "Legal",
    footerPrivacy: "Privacidad",
    footerTerms: "Términos",
    footerStudio: "Fr4n0m",
    launch: "Abrir",
    launchPlayground: "Abrir playground",
    playground: "Playground",
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

export function getDocsNavigation(locale: Locale): DocsNavItem[] {
  if (locale === "es") {
    return [
      { href: "/docs/getting-started", label: "Primeros pasos" },
      { href: "/docs/react", label: "React" },
      { href: "/docs/vue", label: "Vue" },
      { href: "/docs/preact", label: "Preact" },
      { href: "/docs/astro", label: "Astro" },
      { href: "/docs/core", label: "Core" },
      { href: "/docs/customization", label: "Personalización" },
      { href: "/docs/playground", label: "Playground" }
    ];
  }

  return [
    { href: "/docs/getting-started", label: "Getting Started" },
    { href: "/docs/react", label: "React" },
    { href: "/docs/vue", label: "Vue" },
    { href: "/docs/preact", label: "Preact" },
    { href: "/docs/astro", label: "Astro" },
    { href: "/docs/core", label: "Core" },
    { href: "/docs/customization", label: "Customization" },
    { href: "/docs/playground", label: "Playground" }
  ];
}

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
