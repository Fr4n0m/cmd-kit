import type { PlaygroundConfig } from "./config";

export function buildReactSnippet(config: PlaygroundConfig): string {
  return buildReactLikeSnippet("@cmd-kit/react", config);
}

export function buildVueSnippet(config: PlaygroundConfig): string {
  const scriptLines = [
    '<script setup lang="ts">',
    'import { CommandPalette } from "@cmd-kit/vue";',
    "",
    `const sections = ${toObjectLiteralSnippet(config.sections)};`,
    `const recents = ${toObjectLiteralSnippet(toRecentsValue(config))};`,
    `const messages = ${toObjectLiteralSnippet(toMessagesValue(config))};`,
    `const theme = ${toObjectLiteralSnippet(toThemeModesValue(config))};`
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
    `    size="${config.size}"`,
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
    `const sections = ${toObjectLiteralSnippet(config.sections)};`,
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
    `  size="${config.size}"`,
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
    lines.push(`const sections = ${toObjectLiteralSnippet(config.sections)};`);
  } else {
    lines.push(
      "const source = async () => {",
      `  await new Promise((resolve) => setTimeout(resolve, ${config.sourceDelayMs}));`,
      "",
      `  return ${toObjectLiteralSnippet({ sections: config.sections })};`,
      "};"
    );
  }

  lines.push(
    "",
    `const theme = ${toObjectLiteralSnippet(toThemeModesValue(config))};`,
    "",
    "",
    "const palette = createCommandPalette({",
    `  defaultOpen: ${config.defaultOpen},`,
    ...toObjectPropertyLines("messages", toObjectLiteralSnippet(toMessagesValue(config)), "  "),
    ...toObjectPropertyLines("recents", toObjectLiteralSnippet(toRecentsValue(config)), "  "),
    `  size: "${config.size}",`,
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

function buildReactLikeSnippet(packageName: string, config: PlaygroundConfig): string {
  const lines = [
    `import { CommandPalette } from "${packageName}";`,
    "",
    `const sections = ${toObjectLiteralSnippet(config.sections)};`,
    `const theme = ${toObjectLiteralSnippet(toThemeModesValue(config))};`
  ];

  const sourceSnippet = toSourceSnippet(config);
  if (sourceSnippet) {
    lines.push("", sourceSnippet);
  }

  lines.push("", "export function Demo() {", "  return (", "    <CommandPalette");

  const propLines = [
    ...toJsxExpressionPropLines("recents", toRecentsSnippet(config), "      "),
    `      shortcut="${escapeString(config.shortcut)}"`,
    `      size="${config.size}"`,
    `      title="${escapeString(config.title)}"`,
    ...toJsxExpressionPropLines("messages", toMessagesSnippet(config), "      "),
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

function toJsxExpressionPropLines(
  name: string,
  expression: string,
  indent: string
): string[] {
  if (!expression.includes("\n")) {
    return [`${indent}${name}={${expression}}`];
  }

  const lines = expression.split("\n");
  if (lines.length < 2) {
    return [`${indent}${name}={${expression}}`];
  }

  return [
    `${indent}${name}={${lines[0]}`,
    ...lines.slice(1, -1).map((line) => `${indent}${line}`),
    `${indent}${lines.at(-1)!}}`
  ];
}

function toObjectPropertyLines(name: string, expression: string, indent: string): string[] {
  if (!expression.includes("\n")) {
    return [`${indent}${name}: ${expression},`];
  }

  const lines = expression.split("\n");
  return [
    `${indent}${name}: ${lines[0]}`,
    ...lines.slice(1, -1).map((line) => `${indent}${line}`),
    `${indent}${lines.at(-1)!},`
  ];
}
