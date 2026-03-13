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

export function buildCssSnippet(config: PlaygroundConfig): string {
  return `:root {
  --cmdkit-accent: ${config.accentColor};
  --cmdkit-surface: ${config.backgroundColor};
  --cmdkit-text: ${config.textColor};
  --cmdkit-muted: ${config.mutedColor};
  --cmdkit-border: ${config.borderColor};
  --cmdkit-overlay: ${config.overlayColor};
  --cmdkit-radius: ${config.radius};
  --cmdkit-shadow: ${config.shadow};
}`;
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
