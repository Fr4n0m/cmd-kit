import type { CommandSection } from "@cmd-kit/core";

import type { PlaygroundConfig } from "./config";

export function buildReactSnippet(config: PlaygroundConfig): string {
  return buildReactLikeSnippet("@cmd-kit/react", config);
}

export function buildVueSnippet(config: PlaygroundConfig): string {
  const scriptLines = [
    '<script setup lang="ts">',
    'import { CommandPalette } from "@cmd-kit/vue";',
    "",
    `const sections = ${toJsonSnippet(config.sections)};`,
    `const recents = ${toJsonSnippet(toRecentsValue(config))};`,
    `const messages = ${toJsonSnippet(toMessagesValue(config))};`,
    `const theme = ${toJsonSnippet(toThemeModesValue(config))};`
  ];

  const sourceSnippet = toSourceSnippet(config);
  if (sourceSnippet) {
    scriptLines.push("", sourceSnippet);
  }

  scriptLines.push("</script>", "", "<template>");

  const templateLines = [
    "  <CommandPalette",
    '    :messages="messages"',
    '    :recents="recents"',
    '    :theme="theme"',
    `    shortcut="${escapeString(config.shortcut)}"`,
    `    title="${escapeString(config.title)}"`
  ];

  if (config.sourceMode === "static") {
    templateLines.push('    :sections="sections"');
  } else {
    templateLines.push('    :source="source"');
  }

  if (config.defaultOpen) {
    templateLines.push('    :default-open="true"');
  }

  templateLines.push("  />");

  return [...scriptLines, ...templateLines, "</template>"].join("\n");
}

export function buildPreactSnippet(config: PlaygroundConfig): string {
  return buildReactLikeSnippet("@cmd-kit/preact", config);
}

export function buildAstroSnippet(config: PlaygroundConfig): string {
  const frontmatter = [
    "---",
    'import CommandPalette from "@cmd-kit/astro/component";',
    "",
    `const sections = ${toSectionsSnippet(config.sections)};`,
    `const recents = ${toObjectLiteralSnippet(toRecentsValue(config))};`,
    `const messages = ${toObjectLiteralSnippet(toMessagesValue(config))};`,
    `const theme = ${toObjectLiteralSnippet(toThemeModesValue(config))};`
  ];

  if (config.sourceMode === "async") {
    frontmatter.push("", "const source = {", "  sections", "};");
  }

  frontmatter.push("---", "", "<CommandPalette");

  const componentLines = [
    "  messages={messages}",
    "  recents={recents}",
    `  shortcut="${escapeString(config.shortcut)}"`,
    "  theme={theme}",
    `  title="${escapeString(config.title)}"`
  ];

  if (config.sourceMode === "static") {
    componentLines.push("  sections={sections}");
  } else {
    componentLines.push("  source={source}");
  }

  if (config.defaultOpen) {
    componentLines.push("  defaultOpen");
  }

  componentLines.push("/>");

  return [...frontmatter, ...componentLines].join("\n");
}

export function buildVanillaSnippet(config: PlaygroundConfig): string {
  const lines = ['import { createCommandPalette } from "@cmd-kit/core";', ""];

  if (config.sourceMode === "static") {
    lines.push(`const sections = ${toJsonSnippet(config.sections)};`);
  } else {
    lines.push(
      "const source = async () => {",
      `  await new Promise((resolve) => setTimeout(resolve, ${config.sourceDelayMs}));`,
      "",
      `  return ${toJsonSnippet({ sections: config.sections })};`,
      "};"
    );
  }

  lines.push(
    "",
    `const theme = ${toJsonSnippet(toThemeModesValue(config))};`,
    "",
    "",
    "const palette = createCommandPalette({",
    `  defaultOpen: ${config.defaultOpen},`,
    `  messages: ${toJsonSnippet(toMessagesValue(config))},`,
    `  recents: ${toJsonSnippet(toRecentsValue(config))},`,
    `  shortcut: "${escapeString(config.shortcut)}",`,
    "  theme,",
    `  title: "${escapeString(config.title)}",`
  );

  if (config.sourceMode === "static") {
    lines.push("  sections");
  } else {
    lines.push("  source");
  }

  lines.push("});", "", "window.addEventListener('beforeunload', () => palette.destroy());");

  return lines.join("\n");
}

export function buildCssSnippet(config: PlaygroundConfig): string {
  return `import { createThemeCssText } from "@cmd-kit/core";

const themes = ${toJsonSnippet(toThemeModesValue(config))};
const darkCss = createThemeCssText(themes.dark);
const lightCss = createThemeCssText(themes.light);

const themeBlock = \`:root {
\${darkCss}
}

html[data-theme="light"] {
\${lightCss}
}\`;`;
}

export function buildTailwindSnippet(config: PlaygroundConfig): string {
  const sourceSnippet = toSourceSnippet(config);
  const darkTheme = toThemeModeValue(config, "dark");
  const componentLines = [
    "<div",
    `  className="rounded-[${darkTheme.radius}] border border-[${darkTheme.borderColor}] bg-[${darkTheme.backgroundColor}] text-[${darkTheme.textColor}] shadow-[${darkTheme.shadow}]"`,
    ">",
    "  <CommandPalette",
    `    recents={${toRecentsSnippet(config)}}`,
    `    shortcut="${escapeString(config.shortcut)}"`,
    `    title="${escapeString(config.title)}"`,
    "    theme={theme}"
  ];

  if (config.sourceMode === "static") {
    componentLines.push("    sections={sections}");
  } else {
    componentLines.push("    source={source}");
  }

  if (config.defaultOpen) {
    componentLines.push("    defaultOpen");
  }

  componentLines.push("  />", "</div>");

  return `import { CommandPalette } from "@cmd-kit/react";

const sections = ${toSectionsSnippet(config.sections)};
const theme = ${toObjectLiteralSnippet(toThemeModesValue(config))};
${sourceSnippet ? `\n${sourceSnippet}` : ""}

${componentLines.join("\n")}`;
}

function buildReactLikeSnippet(packageName: string, config: PlaygroundConfig): string {
  const lines = [
    `import { CommandPalette } from "${packageName}";`,
    "",
    `const sections = ${toSectionsSnippet(config.sections)};`,
    `const theme = ${toObjectLiteralSnippet(toThemeModesValue(config))};`
  ];

  const sourceSnippet = toSourceSnippet(config);
  if (sourceSnippet) {
    lines.push("", sourceSnippet);
  }

  lines.push("", "export function Demo() {", "  return (", "    <CommandPalette");

  const propLines = [
    `      recents={${toRecentsSnippet(config)}}`,
    `      shortcut="${escapeString(config.shortcut)}"`,
    `      title="${escapeString(config.title)}"`,
    `      messages={${toMessagesSnippet(config)}}`,
      "      theme={theme}"
  ];

  if (config.sourceMode === "static") {
    propLines.splice(1, 0, "      sections={sections}");
  } else {
    propLines.splice(1, 0, "      source={source}");
  }

  if (config.defaultOpen) {
    propLines.push("      defaultOpen");
  }

  lines.push(...propLines, "    />", "  );", "}");

  return lines.join("\n");
}

function toSectionsSnippet(sections: CommandSection[]): string {
  return JSON.stringify(sections, null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/"/g, "'");
}

function escapeString(value: string): string {
  return value.replace(/"/g, '\\"');
}

function toRecentsSnippet(config: PlaygroundConfig): string {
  return toObjectLiteralSnippet(toRecentsValue(config));
}

function toMessagesSnippet(config: PlaygroundConfig): string {
  return toObjectLiteralSnippet(toMessagesValue(config));
}

function toMessagesValue(config: PlaygroundConfig) {
  return {
    searchPlaceholder: config.placeholder,
    noResults: config.noResults,
    closeLabel: config.closeLabel
  };
}

function toThemeModeValue(config: PlaygroundConfig, mode: "light" | "dark") {
  const isDark = mode === "dark";
  return {
    accentColor: isDark ? config.darkAccentColor : config.accentColor,
    backgroundColor: isDark ? config.darkBackgroundColor : config.backgroundColor,
    textColor: isDark ? config.darkTextColor : config.textColor,
    titleColor: isDark ? config.darkTitleColor : config.titleColor,
    descriptionColor: isDark ? config.darkDescriptionColor : config.descriptionColor,
    mutedColor: isDark ? config.darkMutedColor : config.mutedColor,
    sectionTitleColor: isDark ? config.darkSectionTitleColor : config.sectionTitleColor,
    itemTitleColor: isDark ? config.darkItemTitleColor : config.itemTitleColor,
    itemSubtitleColor: isDark ? config.darkItemSubtitleColor : config.itemSubtitleColor,
    shortcutColor: isDark ? config.darkShortcutColor : config.shortcutColor,
    borderColor: isDark ? config.darkBorderColor : config.borderColor,
    overlayColor: isDark ? config.darkOverlayColor : config.overlayColor,
    radius: isDark ? config.darkRadius : config.radius,
    shadow: isDark ? config.darkShadow : config.shadow
  };
}

function toThemeModesValue(config: PlaygroundConfig) {
  return {
    dark: toThemeModeValue(config, "dark"),
    light: toThemeModeValue(config, "light")
  };
}

function toRecentsValue(config: PlaygroundConfig) {
  if (!config.recentsEnabled) {
    return false;
  }

  return {
    limit: config.recentsLimit,
    sectionTitle: config.recentsTitle
  };
}

function toObjectLiteralSnippet(value: unknown): string {
  return JSON.stringify(value, null, 2).replace(/"([^"]+)":/g, "$1:");
}

function toJsonSnippet(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function toSourceSnippet(config: PlaygroundConfig): string {
  if (config.sourceMode !== "async") {
    return "";
  }

  return `const source = async () => {
  await new Promise((resolve) => setTimeout(resolve, ${config.sourceDelayMs}));

  return {
    sections
  };
};`;
}
