import { describe, expect, it } from "vitest";

import {
  createThemeCssText,
  createThemeCssVariables,
  defaultTheme,
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
      "--cmdkit-muted": defaultTheme.mutedColor,
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
});
