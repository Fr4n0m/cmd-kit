import type { CommandTheme } from "@cmd-kit/core";

export type SiteThemeMode = "dark" | "light";

export function resolveSitePaletteTheme(mode: SiteThemeMode): CommandTheme {
  if (mode === "light") {
    return {
      accentColor: "#0fa6d8",
      backgroundColor: "#ffffff",
      textColor: "#0e1720",
      mutedColor: "rgba(49, 68, 84, 0.78)",
      borderColor: "rgba(83, 112, 136, 0.16)",
      overlayColor: "rgba(232, 241, 248, 0.7)",
      radius: "22px",
      shadow: "0 20px 44px rgba(40, 64, 81, 0.14)"
    };
  }

  return {
    accentColor: "#35d7ff",
    backgroundColor: "#0b1116",
    textColor: "#eff7fb",
    mutedColor: "rgba(172, 192, 207, 0.74)",
    borderColor: "rgba(129, 155, 174, 0.16)",
    overlayColor: "rgba(6, 10, 14, 0.74)",
    radius: "22px",
    shadow: "0 24px 80px rgba(0, 0, 0, 0.42)"
  };
}
