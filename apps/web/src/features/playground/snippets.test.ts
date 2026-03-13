import { describe, expect, it } from "vitest";

import { defaultConfig } from "./config";
import {
  buildCssSnippet,
  buildReactSnippet,
  buildTailwindSnippet
} from "./snippets";

describe("playground snippet builders", () => {
  it("builds a React snippet that maps the selected shortcut and sections", () => {
    const snippet = buildReactSnippet(defaultConfig);

    expect(snippet).toContain('shortcut="mod+k"');
    expect(snippet).toContain("const sections = [");
    expect(snippet).toContain("<CommandPalette");
    expect(snippet).toContain("href: '/dashboard'");
    expect(snippet).toContain('closeLabel: "Close command palette"');
  });

  it("builds CSS variables for the theme tokens", () => {
    const snippet = buildCssSnippet(defaultConfig);

    expect(snippet).toContain("--cmdkit-accent: #ff6b35;");
    expect(snippet).toContain("--cmdkit-overlay: rgba(10, 15, 28, 0.72);");
    expect(snippet).toContain(
      "--cmdkit-shadow: 0 32px 120px rgba(0, 0, 0, 0.35);"
    );
  });

  it("builds a Tailwind-oriented wrapper snippet", () => {
    const snippet = buildTailwindSnippet(defaultConfig);

    expect(snippet).toContain("CommandPalette");
    expect(snippet).toContain("sections={sections}");
  });
});
