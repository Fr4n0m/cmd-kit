export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export interface LayoutCopy {
  core: string;
  docs: string;
  launch: string;
  launchPlayground: string;
  playground: string;
  productLabel: string;
  react: string;
  skipToContent: string;
  themeDark: string;
  themeLight: string;
  toggleTheme: string;
  switchLanguage: string;
}

export const layoutCopy: Record<Locale, LayoutCopy> = {
  en: {
    core: "Core",
    docs: "Docs",
    launch: "Launch",
    launchPlayground: "Open playground",
    playground: "Playground",
    productLabel: "command palette system",
    react: "React",
    skipToContent: "Skip to main content",
    themeDark: "Dark",
    themeLight: "Light",
    toggleTheme: "Toggle theme",
    switchLanguage: "ES"
  },
  es: {
    core: "Core",
    docs: "Docs",
    launch: "Abrir",
    launchPlayground: "Abrir playground",
    playground: "Playground",
    productLabel: "sistema de command palette",
    react: "React",
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
    pathname === "/es" ? "/" : pathname.startsWith("/es/") ? pathname.slice(3) : pathname;

  return localizedPath(targetLocale, currentPath || "/");
}
