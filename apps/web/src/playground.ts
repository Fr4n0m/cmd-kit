import type { CommandItem, CommandTheme } from "@cmd-kit/react";

export type Language = "en" | "es";

export interface PlaygroundConfig {
  language: Language;
  title: string;
  description: string;
  placeholder: string;
  noResults: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  radius: string;
  shortcut: string;
  layout: "centered" | "wide";
}

export const baseItems: CommandItem[] = [
  {
    id: "home",
    title: "Go to dashboard",
    subtitle: "Open the main application view",
    section: "Navigation",
    icon: "⌂",
    shortcut: "G D"
  },
  {
    id: "search",
    title: "Search everything",
    subtitle: "Jump across the whole workspace",
    section: "Actions",
    icon: "⌕",
    shortcut: "S"
  },
  {
    id: "theme",
    title: "Switch theme",
    subtitle: "Preview alternate visual presets",
    section: "Preferences",
    icon: "◐",
    shortcut: "T"
  }
];

export const defaultConfig: PlaygroundConfig = {
  language: "en",
  title: "Build your command palette live",
  description:
    "Tune colors, copy code, and preview the exact experience your users will get.",
  placeholder: "Search commands...",
  noResults: "No results found.",
  accentColor: "#ff6b35",
  backgroundColor: "#101828",
  textColor: "#f8fafc",
  borderColor: "#334155",
  radius: "26px",
  shortcut: "mod+k",
  layout: "centered"
};

export function toTheme(config: PlaygroundConfig): CommandTheme {
  return {
    accentColor: config.accentColor,
    backgroundColor: config.backgroundColor,
    textColor: config.textColor,
    borderColor: config.borderColor,
    radius: config.radius,
    mutedColor: "rgba(226, 232, 240, 0.72)",
    overlayColor: "rgba(10, 15, 28, 0.72)"
  };
}

export function buildReactSnippet(config: PlaygroundConfig): string {
  return `import { CommandPalette } from "@cmd-kit/react";

const items = [
  { id: "home", title: "Go to dashboard", section: "Navigation", icon: "⌂" },
  { id: "search", title: "Search everything", section: "Actions", icon: "⌕" },
  { id: "theme", title: "Switch theme", section: "Preferences", icon: "◐" }
];

export function Demo() {
  return (
    <CommandPalette
      items={items}
      shortcut="${escapeString(config.shortcut)}"
      title="${escapeString(config.title)}"
      messages={{
        searchPlaceholder: "${escapeString(config.placeholder)}",
        noResults: "${escapeString(config.noResults)}"
      }}
      theme={{
        accentColor: "${config.accentColor}",
        backgroundColor: "${config.backgroundColor}",
        textColor: "${config.textColor}",
        borderColor: "${config.borderColor}",
        radius: "${config.radius}"
      }}
    />
  );
}`;
}

export function buildCssSnippet(config: PlaygroundConfig): string {
  return `:root {
  --cmdkit-accent: ${config.accentColor};
  --cmdkit-surface: ${config.backgroundColor};
  --cmdkit-text: ${config.textColor};
  --cmdkit-border: ${config.borderColor};
  --cmdkit-radius: ${config.radius};
}`;
}

export function buildTailwindSnippet(config: PlaygroundConfig): string {
  return `import { CommandPalette } from "@cmd-kit/react";

<div className="rounded-[${config.radius}] border bg-[${config.backgroundColor}] text-[${config.textColor}]">
  <CommandPalette items={items} shortcut="${config.shortcut}" />
</div>`;
}

function escapeString(value: string): string {
  return value.replace(/"/g, '\\"');
}
