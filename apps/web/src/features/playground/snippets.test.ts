import { describe, expect, it } from "vitest";

import { defaultConfig } from "./config";
import { buildCssSnippet, buildReactSnippet, buildTailwindSnippet } from "./snippets";

describe("playground snippet builders", () => {
  it("builds a React snippet that maps the selected shortcut and sections", () => {
    const snippet = buildReactSnippet(defaultConfig);

    expect(snippet).toContain('shortcut="mod+k"');
    expect(snippet).toContain("const sections = [");
    expect(snippet).toContain("<CommandPalette");
    expect(snippet).toContain("href: '/dashboard'");
  });

  it("builds CSS variables for the theme tokens", () => {
    expect(buildCssSnippet(defaultConfig)).toContain("--cmdkit-accent: #ff6b35;");
  });

  it("builds a Tailwind-oriented wrapper snippet", () => {
    const snippet = buildTailwindSnippet(defaultConfig);

    expect(snippet).toContain("CommandPalette");
    expect(snippet).toContain("sections={sections}");
  });
});
