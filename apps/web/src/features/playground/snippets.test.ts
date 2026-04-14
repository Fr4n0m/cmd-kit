import { describe, expect, it } from "vitest";

import { defaultConfig } from "./config";
import {
  buildAstroSnippet,
  buildCssSnippet,
  buildPreactSnippet,
  buildReactSnippet,
  buildTailwindSnippet,
  buildVanillaSnippet,
  buildVueSnippet
} from "./snippets";

describe("playground snippet builders", () => {
  it("builds a React snippet that maps the selected shortcut and sections", () => {
    const snippet = buildReactSnippet(defaultConfig);

    expect(snippet).toContain('import { CommandPalette } from "@cmd-kit/react";');
    expect(snippet).toContain('shortcut="mod+k"');
    expect(snippet).toContain("const sections = [");
    expect(snippet).toContain("<CommandPalette");
    expect(snippet).toContain("id: 'open-dashboard'");
    expect(snippet).toContain('closeLabel: "Close command palette"');
    expect(snippet).toContain("recents={false}");
    expect(snippet).toContain("href: '/dashboard'");
  });

  it("builds async source and defaultOpen into React snippets when enabled", () => {
    const snippet = buildReactSnippet({
      ...defaultConfig,
      defaultOpen: true,
      sourceDelayMs: 900,
      sourceMode: "async"
    });

    expect(snippet).toContain("const source = async () => {");
    expect(snippet).toContain("setTimeout(resolve, 900)");
    expect(snippet).toContain("source={source}");
    expect(snippet).toContain("defaultOpen");
    expect(snippet).not.toContain("sections={sections}");
  });

  it("builds CSS variables for the theme tokens", () => {
    const snippet = buildCssSnippet(defaultConfig);

    expect(snippet).toContain('import { createThemeCssText } from "@cmd-kit/core";');
    expect(snippet).toContain('accentColor: "#35d7ff"');
    expect(snippet).toContain("const themeBlock = `:root {");
  });

  it("builds a Tailwind-oriented wrapper snippet", () => {
    const snippet = buildTailwindSnippet(defaultConfig);

    expect(snippet).toContain("CommandPalette");
    expect(snippet).toContain("sections={sections}");
  });

  it("builds a Vue snippet with async source bindings when selected", () => {
    const snippet = buildVueSnippet({
      ...defaultConfig,
      defaultOpen: true,
      sourceMode: "async"
    });

    expect(snippet).toContain('const source = async () => {');
    expect(snippet).toContain(':source="source"');
    expect(snippet).toContain(':default-open="true"');
    expect(snippet).not.toContain(':sections="sections"');
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

  it("builds an Astro snippet that uses the official component export", () => {
    const snippet = buildAstroSnippet(defaultConfig);

    expect(snippet).toContain('import CommandPalette from "@cmd-kit/astro/component";');
    expect(snippet).toContain("const sections = [");
    expect(snippet).toContain("<CommandPalette");
    expect(snippet).toContain("sections={sections}");
    expect(snippet).toContain('shortcut="mod+k"');
  });

  it("builds a vanilla snippet from the same command config", () => {
    const snippet = buildVanillaSnippet(defaultConfig);

    expect(snippet).toContain('from "@cmd-kit/core"');
    expect(snippet).toContain("createCommandPalette");
    expect(snippet).toContain("const palette = createCommandPalette({");
    expect(snippet).toContain("window.addEventListener('beforeunload'");
  });

  it("builds source-based snippets when async mode is enabled", () => {
    const vanillaSnippet = buildVanillaSnippet({
      ...defaultConfig,
      defaultOpen: true,
      sourceDelayMs: 320,
      sourceMode: "async"
    });
    const astroSnippet = buildAstroSnippet({
      ...defaultConfig,
      sourceMode: "async"
    });

    expect(vanillaSnippet).toContain("const source = async () => {");
    expect(vanillaSnippet).toContain("setTimeout(resolve, 320)");
    expect(vanillaSnippet).toContain("source");
    expect(astroSnippet).toContain("const source = {");
    expect(astroSnippet).toContain("source={source}");
    expect(astroSnippet).not.toContain("sections={sections}");
  });
});
