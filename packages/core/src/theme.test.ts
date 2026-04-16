import { describe, expect, it } from "vitest";

import {
  createThemeCssText,
  createThemeCssVariables,
  defaultTheme,
  resolveThemeMode,
  resolveTheme
} from "./theme";

describe("theme helpers", () => {
  it("resolves partial themes against defaults", () => {
    expect(
      resolveTheme({
        accentColor: "#ff6b35"
      })
    ).toEqual({
      ...defaultTheme,
      accentColor: "#ff6b35"
    });
  });

  it("creates css variable maps from the resolved theme", () => {
    expect(
      createThemeCssVariables({
        accentColor: "#ff6b35",
        radius: "32px"
      })
    ).toEqual({
      "--cmdkit-accent": "#ff6b35",
      "--cmdkit-surface": defaultTheme.backgroundColor,
      "--cmdkit-text": defaultTheme.textColor,
      "--cmdkit-title": defaultTheme.titleColor,
      "--cmdkit-description": defaultTheme.descriptionColor,
      "--cmdkit-muted": defaultTheme.mutedColor,
      "--cmdkit-section-title": defaultTheme.sectionTitleColor,
      "--cmdkit-item-title": defaultTheme.itemTitleColor,
      "--cmdkit-item-subtitle": defaultTheme.itemSubtitleColor,
      "--cmdkit-shortcut": defaultTheme.shortcutColor,
      "--cmdkit-border": defaultTheme.borderColor,
      "--cmdkit-overlay": defaultTheme.overlayColor,
      "--cmdkit-radius": "32px",
      "--cmdkit-shadow": defaultTheme.shadow
    });
  });

  it("creates css text with a custom prefix", () => {
    expect(
      createThemeCssText(
        {
          accentColor: "#ff6b35"
        },
        "--palette"
      )
    ).toContain("--palette-accent: #ff6b35;");
  });

  it("resolves theme modes by explicit mode", () => {
    expect(
      resolveTheme(
        {
          light: { accentColor: "#0fa6d8" },
          dark: { accentColor: "#35d7ff" }
        },
        "light"
      ).accentColor
    ).toBe("#0fa6d8");

    expect(
      resolveTheme(
        {
          light: { accentColor: "#0fa6d8" },
          dark: { accentColor: "#35d7ff" }
        },
        "dark"
      ).accentColor
    ).toBe("#35d7ff");
  });

  it("resolves dark mode by default when no browser runtime exists", () => {
    expect(resolveThemeMode()).toBe("dark");
  });
});
