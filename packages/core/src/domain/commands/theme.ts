import type { CommandTheme, CommandThemeInput, CommandThemeModes } from "./types";

export const defaultTheme: Required<CommandTheme> = {
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

const themeVariableMap = {
  accentColor: "accent",
  backgroundColor: "surface",
  textColor: "text",
  titleColor: "title",
  descriptionColor: "description",
  mutedColor: "muted",
  sectionTitleColor: "section-title",
  itemTitleColor: "item-title",
  itemSubtitleColor: "item-subtitle",
  shortcutColor: "shortcut",
  borderColor: "border",
  overlayColor: "overlay",
  radius: "radius",
  shadow: "shadow"
} as const;

export type CommandThemeVariableKey = keyof typeof themeVariableMap;

export function resolveThemeMode(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "dark";
  }

  const rootTheme = document.documentElement.dataset.theme;
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  return rootTheme === "light" || (!rootTheme && prefersLight) ? "light" : "dark";
}

export function resolveTheme(
  theme?: CommandThemeInput,
  mode: "light" | "dark" = resolveThemeMode()
): Required<CommandTheme> {
  const selectedTheme = isThemeModes(theme) ? theme[mode] : theme;
  return {
    ...defaultTheme,
    ...selectedTheme
  };
}

export function createThemeCssVariables(
  theme?: CommandThemeInput,
  prefix = "--cmdkit"
): Record<string, string> {
  const resolvedTheme = resolveTheme(theme);

  return Object.fromEntries(
    Object.entries(themeVariableMap).map(([themeKey, token]) => [
      `${prefix}-${token}`,
      resolvedTheme[themeKey as CommandThemeVariableKey]
    ])
  );
}

export function createThemeCssText(
  theme?: CommandThemeInput,
  prefix = "--cmdkit"
): string {
  return Object.entries(createThemeCssVariables(theme, prefix))
    .map(([name, value]) => `${name}: ${value};`)
    .join("\n");
}

export function isThemeModes(
  theme: CommandThemeInput | undefined
): theme is CommandThemeModes {
  if (!theme || typeof theme !== "object" || Array.isArray(theme)) {
    return false;
  }

  return "light" in theme && "dark" in theme;
}
