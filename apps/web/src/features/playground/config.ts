import type { CommandSection, CommandTheme } from "@cmd-kit/core";
import { getPlaygroundCopy } from "./ui";

export type Language = "en" | "es";

export interface PlaygroundConfig {
  language: Language;
  title: string;
  description: string;
  defaultOpen: boolean;
  sourceMode: "static" | "async";
  sourceDelayMs: number;
  recentsEnabled: boolean;
  recentsLimit: number;
  recentsTitle: string;
  placeholder: string;
  noResults: string;
  closeLabel: string;
  activeThemeMode: "light" | "dark";
  themeEditorMode: "light" | "dark";
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  titleColor: string;
  descriptionColor: string;
  mutedColor: string;
  sectionTitleColor: string;
  itemTitleColor: string;
  itemSubtitleColor: string;
  shortcutColor: string;
  borderColor: string;
  overlayColor: string;
  radius: string;
  shadow: string;
  darkAccentColor: string;
  darkBackgroundColor: string;
  darkTextColor: string;
  darkTitleColor: string;
  darkDescriptionColor: string;
  darkMutedColor: string;
  darkSectionTitleColor: string;
  darkItemTitleColor: string;
  darkItemSubtitleColor: string;
  darkShortcutColor: string;
  darkBorderColor: string;
  darkOverlayColor: string;
  darkRadius: string;
  darkShadow: string;
  shortcut: string;
  layout: "centered" | "wide";
  sections: CommandSection[];
}

const packageDefaultLightTheme: CommandTheme = {
  accentColor: "#0fa6d8",
  backgroundColor: "#ffffff",
  textColor: "#0e1720",
  titleColor: "rgba(14, 23, 32, 0.78)",
  descriptionColor: "#5f7388",
  mutedColor: "rgba(49, 68, 84, 0.78)",
  sectionTitleColor: "rgba(49, 68, 84, 0.58)",
  itemTitleColor: "rgba(47, 84, 107, 0.86)",
  itemSubtitleColor: "#5f7388",
  shortcutColor: "#5f7388",
  borderColor: "rgba(83, 112, 136, 0.16)",
  overlayColor: "rgba(232, 241, 248, 0.7)",
  radius: "22px",
  shadow: "0 20px 44px rgba(40, 64, 81, 0.14)"
};

const packageDefaultDarkTheme: CommandTheme = {
  accentColor: "#35d7ff",
  backgroundColor: "#0b1116",
  textColor: "#eff7fb",
  titleColor: "#eff7fb",
  descriptionColor: "#94a3b8",
  mutedColor: "rgba(172, 192, 207, 0.74)",
  sectionTitleColor: "rgba(172, 192, 207, 0.74)",
  itemTitleColor: "#eff7fb",
  itemSubtitleColor: "#94a3b8",
  shortcutColor: "#94a3b8",
  borderColor: "rgba(129, 155, 174, 0.16)",
  overlayColor: "rgba(6, 10, 14, 0.74)",
  radius: "22px",
  shadow: "0 24px 80px rgba(0, 0, 0, 0.42)"
};

export function getDefaultSections(language: Language): CommandSection[] {
  return [
    {
      id: "commands",
      title: language === "es" ? "Comandos" : "Commands",
      items: [
        {
          id: "toggle-theme",
          title: language === "es" ? "Cambiar tema" : "Toggle theme",
          subtitle:
            language === "es"
              ? "Alternar entre modo claro y oscuro"
              : "Switch between light and dark mode",
          shortcut: "mod+t"
        },
        {
          id: "search-workspace",
          title:
            language === "es"
              ? "Buscar en el espacio de trabajo"
              : "Search workspace",
          subtitle:
            language === "es"
              ? "Buscar en todo el espacio de trabajo"
              : "Search across the workspace",
          shortcut: "mod+p"
        }
      ]
    }
  ];
}

export function createDefaultConfig(language: Language): PlaygroundConfig {
  const resolvedThemeMode = resolvePackageDefaultThemeMode();
  const isEs = language === "es";

  return {
    language,
    title: isEs ? "Menú de comandos" : "Command menu",
    description: isEs
      ? "Empieza con una configuración mínima y ajusta solo lo que necesites."
      : "Start from a minimal setup and customize only what you need.",
    defaultOpen: false,
    sourceMode: "static",
    sourceDelayMs: 450,
    recentsEnabled: false,
    recentsLimit: 8,
    recentsTitle: isEs ? "Recientes" : "Recent",
    placeholder: isEs ? "Buscar comandos..." : "Search commands...",
    noResults: isEs ? "No se han encontrado resultados." : "No results found.",
    closeLabel: isEs ? "Cerrar menú de comandos" : "Close command palette",
    activeThemeMode: resolvedThemeMode,
    themeEditorMode: resolvedThemeMode,
    accentColor: packageDefaultLightTheme.accentColor!,
    backgroundColor: packageDefaultLightTheme.backgroundColor!,
    textColor: packageDefaultLightTheme.textColor!,
    titleColor: packageDefaultLightTheme.titleColor!,
    descriptionColor: packageDefaultLightTheme.descriptionColor!,
    mutedColor: packageDefaultLightTheme.mutedColor!,
    sectionTitleColor: packageDefaultLightTheme.sectionTitleColor!,
    itemTitleColor: packageDefaultLightTheme.itemTitleColor!,
    itemSubtitleColor: packageDefaultLightTheme.itemSubtitleColor!,
    shortcutColor: packageDefaultLightTheme.shortcutColor!,
    borderColor: packageDefaultLightTheme.borderColor!,
    overlayColor: packageDefaultLightTheme.overlayColor!,
    radius: packageDefaultLightTheme.radius!,
    shadow: packageDefaultLightTheme.shadow!,
    darkAccentColor: packageDefaultDarkTheme.accentColor!,
    darkBackgroundColor: packageDefaultDarkTheme.backgroundColor!,
    darkTextColor: packageDefaultDarkTheme.textColor!,
    darkTitleColor: packageDefaultDarkTheme.titleColor!,
    darkDescriptionColor: packageDefaultDarkTheme.descriptionColor!,
    darkMutedColor: packageDefaultDarkTheme.mutedColor!,
    darkSectionTitleColor: packageDefaultDarkTheme.sectionTitleColor!,
    darkItemTitleColor: packageDefaultDarkTheme.itemTitleColor!,
    darkItemSubtitleColor: packageDefaultDarkTheme.itemSubtitleColor!,
    darkShortcutColor: packageDefaultDarkTheme.shortcutColor!,
    darkBorderColor: packageDefaultDarkTheme.borderColor!,
    darkOverlayColor: packageDefaultDarkTheme.overlayColor!,
    darkRadius: packageDefaultDarkTheme.radius!,
    darkShadow: packageDefaultDarkTheme.shadow!,
    shortcut: "mod+k",
    layout: "centered",
    sections: getDefaultSections(language)
  };
}

export const defaultConfig: PlaygroundConfig = createDefaultConfig("en");

export function getThemeForMode(
  config: PlaygroundConfig,
  mode: "light" | "dark"
): CommandTheme {
  if (mode === "dark") {
    return {
      accentColor: config.darkAccentColor,
      backgroundColor: config.darkBackgroundColor,
      textColor: config.darkTextColor,
      titleColor: config.darkTitleColor,
      descriptionColor: config.darkDescriptionColor,
      mutedColor: config.darkMutedColor,
      sectionTitleColor: config.darkSectionTitleColor,
      itemTitleColor: config.darkItemTitleColor,
      itemSubtitleColor: config.darkItemSubtitleColor,
      shortcutColor: config.darkShortcutColor,
      borderColor: config.darkBorderColor,
      overlayColor: config.darkOverlayColor,
      radius: config.darkRadius,
      shadow: config.darkShadow
    };
  }

  return {
    accentColor: config.accentColor,
    backgroundColor: config.backgroundColor,
    textColor: config.textColor,
    titleColor: config.titleColor,
    descriptionColor: config.descriptionColor,
    mutedColor: config.mutedColor,
    sectionTitleColor: config.sectionTitleColor,
    itemTitleColor: config.itemTitleColor,
    itemSubtitleColor: config.itemSubtitleColor,
    shortcutColor: config.shortcutColor,
    borderColor: config.borderColor,
    overlayColor: config.overlayColor,
    radius: config.radius,
    shadow: config.shadow
  };
}

export function toTheme(config: PlaygroundConfig): CommandTheme {
  return getThemeForMode(config, config.activeThemeMode);
}

export function createSection(language: Language): CommandSection {
  const { defaults } = getPlaygroundCopy(language);
  return {
    id: createId("section"),
    title: defaults.newSectionTitle,
    items: [createItem(language)]
  };
}

export function createChildSection(language: Language): CommandSection {
  const { defaults } = getPlaygroundCopy(language);
  return {
    id: createId("child-section"),
    title: defaults.newNestedSectionTitle,
    items: [createItem(language)]
  };
}

export function createItem(language: Language) {
  const { defaults } = getPlaygroundCopy(language);
  return {
    id: createId("item"),
    title: defaults.newItemTitle,
    subtitle: defaults.previewDescription,
    shortcut: "",
    href: "",
    keywords: [],
    disabled: false
  };
}

function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function resolvePackageDefaultThemeMode(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "dark";
  }

  const themeFromRoot = document.documentElement.dataset.theme;
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  return themeFromRoot === "light" || (!themeFromRoot && prefersLight)
    ? "light"
    : "dark";
}
