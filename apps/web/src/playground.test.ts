import { describe, expect, it } from "vitest";

import {
  buildCssSnippet,
  buildReactSnippet,
  buildTailwindSnippet,
  defaultConfig
} from "./playground";

describe("playground snippet builders", () => {
  it("builds a React snippet that maps the selected shortcut", () => {
    expect(buildReactSnippet(defaultConfig)).toContain('shortcut="mod+k"');
  });

  it("builds CSS variables for the theme tokens", () => {
    expect(buildCssSnippet(defaultConfig)).toContain("--cmdkit-accent: #ff6b35;");
  });

  it("builds a Tailwind-oriented wrapper snippet", () => {
    expect(buildTailwindSnippet(defaultConfig)).toContain("CommandPalette");
  });
});
