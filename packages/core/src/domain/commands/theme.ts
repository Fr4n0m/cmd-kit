import type { CommandTheme } from "./types";

export const defaultTheme: Required<CommandTheme> = {
  accentColor: "#3b82f6",
  backgroundColor: "#0f172a",
  textColor: "#e2e8f0",
  mutedColor: "#94a3b8",
  borderColor: "rgba(148, 163, 184, 0.25)",
  overlayColor: "rgba(15, 23, 42, 0.65)",
  radius: "24px",
  shadow: "0 30px 80px rgba(15, 23, 42, 0.35)"
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
