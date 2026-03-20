import type { CommandTheme } from "./types";

export const defaultTheme: Required<CommandTheme> = {
  accentColor: "#35d7ff",
  backgroundColor: "#0b1116",
  textColor: "#eff7fb",
  mutedColor: "rgba(172, 192, 207, 0.74)",
  borderColor: "rgba(129, 155, 174, 0.16)",
  overlayColor: "rgba(6, 10, 14, 0.74)",
  radius: "22px",
  shadow: "0 24px 80px rgba(0, 0, 0, 0.42)"
};

const themeVariableMap = {
  accentColor: "accent",
  backgroundColor: "surface",
  textColor: "text",
  mutedColor: "muted",
  borderColor: "border",
  overlayColor: "overlay",
  radius: "radius",
  shadow: "shadow"
} as const;

export type CommandThemeVariableKey = keyof typeof themeVariableMap;

export function resolveTheme(theme?: CommandTheme): Required<CommandTheme> {
  return {
    ...defaultTheme,
    ...theme
  };
}

export function createThemeCssVariables(
  theme?: CommandTheme,
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
  theme?: CommandTheme,
  prefix = "--cmdkit"
): string {
  return Object.entries(createThemeCssVariables(theme, prefix))
    .map(([name, value]) => `${name}: ${value};`)
    .join("\n");
}
