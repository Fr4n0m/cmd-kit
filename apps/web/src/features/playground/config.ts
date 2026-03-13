import type { CommandSection, CommandTheme } from "@cmd-kit/react";

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
  sections: CommandSection[];
}

export const defaultSections: CommandSection[] = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      {
        id: "home",
        title: "Go to dashboard",
        subtitle: "Open the main application view",
        icon: "⌂",
        shortcut: "G D",
        href: "/dashboard",
        keywords: ["home", "overview"]
      }
    ]
  },
  {
    id: "actions",
    title: "Actions",
    items: [
      {
        id: "search",
        title: "Search everything",
        subtitle: "Jump across the whole workspace",
        icon: "⌕",
        shortcut: "S",
        keywords: ["finder", "jump"],
        children: [
          {
            id: "search-scope",
            title: "Search scope",
            items: [
              { id: "docs", title: "Documentation", icon: "D" },
              { id: "components", title: "Components", icon: "C" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "preferences",
    title: "Preferences",
    items: [
      {
        id: "theme",
        title: "Switch theme",
        subtitle: "Preview alternate visual presets",
        icon: "◐",
        shortcut: "T",
        disabled: false
      }
    ]
  }
];

export const defaultConfig: PlaygroundConfig = {
  language: "en",
  title: "Build your command palette live",
  description:
    "Tune colors, sections, and commands while exporting the exact code your project needs.",
  placeholder: "Search commands...",
  noResults: "No results found.",
  accentColor: "#ff6b35",
  backgroundColor: "#101828",
  textColor: "#f8fafc",
  borderColor: "#334155",
  radius: "26px",
  shortcut: "mod+k",
  layout: "centered",
  sections: defaultSections
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

export function createSection(): CommandSection {
  return {
    id: createId("section"),
    title: "New section",
    items: [createItem()]
  };
}

export function createItem() {
  return {
    id: createId("item"),
    title: "New item",
    subtitle: "Describe this command",
    icon: "•",
    shortcut: "",
    href: "",
    keywords: [],
    disabled: false
  };
}

function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
