import type { CommandSection } from "@cmd-kit/react";

import type { PlaygroundConfig } from "./config";

export function buildReactSnippet(config: PlaygroundConfig): string {
  const sectionsSnippet = toSectionsSnippet(config.sections);
  const recentsSnippet = toRecentsSnippet(config);
  const messagesSnippet = toMessagesSnippet(config);
  const themeSnippet = toThemeSnippet(config);

  return `import { CommandPalette } from "@cmd-kit/react";

const sections = ${sectionsSnippet};

export function Demo() {
  return (
    <CommandPalette
      recents={${recentsSnippet}}
      sections={sections}
      shortcut="${escapeString(config.shortcut)}"
      title="${escapeString(config.title)}"
      messages={${messagesSnippet}}
      theme={${themeSnippet}}
    />
  );
}`;
}

export function buildVueSnippet(config: PlaygroundConfig): string {
  const sectionsSnippet = toJsonSnippet(config.sections);
  const recentsSnippet = toJsonSnippet(toRecentsValue(config));
  const messagesSnippet = toJsonSnippet(toMessagesValue(config));
  const themeSnippet = toJsonSnippet(toThemeValue(config));

  return `<script setup lang="ts">
import { CommandPalette } from "@cmd-kit/vue";

const sections = ${sectionsSnippet};
const recents = ${recentsSnippet};
const messages = ${messagesSnippet};
const theme = ${themeSnippet};
</script>

<template>
  <CommandPalette
    :messages="messages"
    :recents="recents"
    :sections="sections"
    :theme="theme"
    shortcut="${escapeString(config.shortcut)}"
    title="${escapeString(config.title)}"
  />
</template>`;
}

export function buildPreactSnippet(config: PlaygroundConfig): string {
  const sectionsSnippet = toSectionsSnippet(config.sections);
  const recentsSnippet = toRecentsSnippet(config);
  const messagesSnippet = toMessagesSnippet(config);
  const themeSnippet = toThemeSnippet(config);

  return `import { CommandPalette } from "@cmd-kit/preact";

const sections = ${sectionsSnippet};

export function Demo() {
  return (
    <CommandPalette
      recents={${recentsSnippet}}
      sections={sections}
      shortcut="${escapeString(config.shortcut)}"
      title="${escapeString(config.title)}"
      messages={${messagesSnippet}}
      theme={${themeSnippet}}
    />
  );
}`;
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
  return `import { CommandPalette } from "@cmd-kit/react";

const sections = ${toSectionsSnippet(config.sections)};

<div className="rounded-[${config.radius}] border bg-[${config.backgroundColor}] text-[${config.textColor}]">
  <CommandPalette
    recents={
      ${toRecentsSnippet(config)}
    }
    sections={sections}
    shortcut="${config.shortcut}"
  />
</div>`;
}

export function buildJsonSnippet(config: PlaygroundConfig): string {
  return JSON.stringify(toPortableConfig(config), null, 2);
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
