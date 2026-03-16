import type { CommandSection } from "@cmd-kit/react";

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
    `const theme = ${toJsonSnippet(toThemeValue(config))};`
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

export function buildVanillaSnippet(config: PlaygroundConfig): string {
  return `import {
  createCommandSnapshot,
  createResolvedConfig,
  dispatchCommandExecution
} from "@cmd-kit/core";

const sections = ${toJsonSnippet(config.sections)};
const config = createResolvedConfig({
  messages: ${toJsonSnippet(toMessagesValue(config))},
  recents: ${toJsonSnippet(toRecentsValue(config))},
  sections,
  shortcut: "${escapeString(config.shortcut)}",
  theme: ${toJsonSnippet(toThemeValue(config))}
});

let query = "";
let activeIndex = 0;

function render() {
  const snapshot = createCommandSnapshot(config, query);
  const activeItem = snapshot.items[activeIndex];

  console.log(snapshot.groups, activeItem);
}

async function runActiveItem() {
  const snapshot = createCommandSnapshot(config, query);

  await dispatchCommandExecution({
    item: snapshot.items[activeIndex],
    port: {
      navigate: ({ sections, title }) => console.log("navigate", title, sections),
      openHref: ({ href }) => window.location.assign(href),
      runCallback: async ({ callback }) => callback()
    }
  });
}

render();`;
}

export function buildCssSnippet(config: PlaygroundConfig): string {
  return `import { createThemeCssText } from "@cmd-kit/core";

const css = createThemeCssText(${toThemeSnippet(config)});

const themeBlock = \`:root {
\${css}
}\`;`;
}

export function buildTailwindSnippet(config: PlaygroundConfig): string {
  const sourceSnippet = toSourceSnippet(config);
  const componentLines = [
    "<div",
    `  className="rounded-[${config.radius}] border border-[${config.borderColor}] bg-[${config.backgroundColor}] text-[${config.textColor}] shadow-[${config.shadow}]"`,
    ">",
    "  <CommandPalette",
    `    recents={${toRecentsSnippet(config)}}`,
    `    shortcut="${escapeString(config.shortcut)}"`,
    `    title="${escapeString(config.title)}"`
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
${sourceSnippet ? `\n${sourceSnippet}` : ""}

${componentLines.join("\n")}`;
}

export function buildJsonSnippet(config: PlaygroundConfig): string {
  return JSON.stringify(toPortableConfig(config), null, 2);
}

function buildReactLikeSnippet(packageName: string, config: PlaygroundConfig): string {
  const lines = [
    `import { CommandPalette } from "${packageName}";`,
    "",
    `const sections = ${toSectionsSnippet(config.sections)};`
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
    `      theme={${toThemeSnippet(config)}}`
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

function toThemeSnippet(config: PlaygroundConfig): string {
  return toObjectLiteralSnippet(toThemeValue(config));
}

function toMessagesValue(config: PlaygroundConfig) {
  return {
    searchPlaceholder: config.placeholder,
    noResults: config.noResults,
    closeLabel: config.closeLabel
  };
}

function toThemeValue(config: PlaygroundConfig) {
  return {
    accentColor: config.accentColor,
    backgroundColor: config.backgroundColor,
    textColor: config.textColor,
    mutedColor: config.mutedColor,
    borderColor: config.borderColor,
    overlayColor: config.overlayColor,
    radius: config.radius,
    shadow: config.shadow
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

function toPortableConfig(config: PlaygroundConfig) {
  return {
    title: config.title,
    description: config.description,
    shortcut: config.shortcut,
    defaultOpen: config.defaultOpen,
    sourceMode: config.sourceMode,
    sourceDelayMs: config.sourceDelayMs,
    layout: config.layout,
    recents: toRecentsValue(config),
    messages: toMessagesValue(config),
    theme: toThemeValue(config),
    sections: config.sections
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
