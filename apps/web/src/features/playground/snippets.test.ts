import { describe, expect, it } from "vitest";

import { defaultConfig } from "./config";
import {
  buildCssSnippet,
  buildJsonSnippet,
  buildPreactSnippet,
  buildReactSnippet,
  buildTailwindSnippet,
  buildVanillaSnippet,
  buildVueSnippet
} from "./snippets";

describe("playground snippet builders", () => {
  it("builds a React snippet that maps the selected shortcut and sections", () => {
    const snippet = buildReactSnippet(defaultConfig);

    expect(snippet).toContain('shortcut="mod+k"');
    expect(snippet).toContain("const sections = [");
    expect(snippet).toContain("<CommandPalette");
    expect(snippet).toContain("href: '/dashboard'");
    expect(snippet).toContain('closeLabel: "Close command palette"');
    expect(snippet).toContain("limit: 5");
    expect(snippet).toContain("children:");
  });

  it("builds CSS variables for the theme tokens", () => {
    const snippet = buildCssSnippet(defaultConfig);

    expect(snippet).toContain('import { createThemeCssText } from "@cmd-kit/core";');
    expect(snippet).toContain('accentColor: "#ff6b35"');
    expect(snippet).toContain("const themeBlock = `:root {");
  });

  it("builds a Tailwind-oriented wrapper snippet", () => {
    const snippet = buildTailwindSnippet(defaultConfig);

    expect(snippet).toContain("CommandPalette");
    expect(snippet).toContain("sections={sections}");
  });

  it("builds a Vue snippet from the same command config", () => {
    const snippet = buildVueSnippet(defaultConfig);

    expect(snippet).toContain('import { CommandPalette } from "@cmd-kit/vue";');
    expect(snippet).toContain("const sections = [");
    expect(snippet).toContain(':sections="sections"');
  });

  it("builds a Preact snippet from the same command config", () => {
    const snippet = buildPreactSnippet(defaultConfig);

    expect(snippet).toContain('import { CommandPalette } from "@cmd-kit/preact";');
    expect(snippet).toContain("const sections = [");
    expect(snippet).toContain("<CommandPalette");
  });

  it("builds a vanilla snippet from the same command config", () => {
    const snippet = buildVanillaSnippet(defaultConfig);

    expect(snippet).toContain('from "@cmd-kit/core"');
    expect(snippet).toContain("createCommandSnapshot");
    expect(snippet).toContain("dispatchCommandExecution");
  });

  it("builds a JSON snippet for portable configuration export", () => {
    const snippet = buildJsonSnippet(defaultConfig);

    expect(snippet).toContain('"shortcut": "mod+k"');
    expect(snippet).toContain('"sections": [');
    expect(snippet).toContain('"sectionTitle": "Recent"');
  });
});
