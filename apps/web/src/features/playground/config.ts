import type { CommandSection, CommandTheme } from "@cmd-kit/react";
import { getPlaygroundCopy } from "./ui";

export type Language = "en" | "es";

export interface PlaygroundConfig {
  language: Language;
  title: string;
  description: string;
  defaultOpen: boolean;
  sourceMode: "static" | "async";
  sourceDelayMs: number;
  recentsEnabled: boolean;
  recentsLimit: number;
  recentsTitle: string;
  placeholder: string;
  noResults: string;
  closeLabel: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  mutedColor: string;
  borderColor: string;
  overlayColor: string;
  radius: string;
  shadow: string;
  shortcut: string;
  layout: "centered" | "wide";
  sections: CommandSection[];
}

export function getDefaultSections(language: Language): CommandSection[] {
  const { defaults } = getPlaygroundCopy(language);

  return [
    {
      id: "navigation",
      title: defaults.sectionNavigation,
      items: [
        {
        id: "home",
          title: defaults.dashboardTitle,
          subtitle: defaults.dashboardSubtitle,
          icon: "⌂",
          shortcut: "G D",
          href: "/dashboard",
          keywords: defaults.dashboardKeywords
        }
      ]
    },
    {
      id: "actions",
      title: defaults.actionsSection,
      items: [
        {
          id: "search",
          title: defaults.searchTitle,
          subtitle: defaults.searchSubtitle,
          icon: "⌕",
          shortcut: "S",
          keywords: defaults.searchKeywords,
          children: [
            {
              id: "search-scope",
              title: defaults.childScope,
              items: [
                { id: "docs", title: defaults.childDocs, icon: "D" },
                { id: "components", title: defaults.childComponents, icon: "C" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "preferences",
      title: defaults.preferencesSection,
      items: [
        {
          id: "theme",
          title: defaults.switchThemeTitle,
          subtitle: defaults.switchThemeSubtitle,
          icon: "◐",
          shortcut: "T",
          disabled: false
        }
      ]
    }
  ];
}

export function createDefaultConfig(language: Language): PlaygroundConfig {
  const { defaults } = getPlaygroundCopy(language);

  return {
    language,
    title: defaults.commandTitle,
    description: defaults.commandDescription,
    defaultOpen: false,
    sourceMode: "static",
    sourceDelayMs: 450,
    recentsEnabled: true,
    recentsLimit: 5,
    recentsTitle: defaults.recentTitle,
    placeholder: defaults.placeholder,
    noResults: defaults.noResults,
    closeLabel: defaults.closeLabel,
    accentColor: "#ff6b35",
    backgroundColor: "#101828",
    textColor: "#f8fafc",
    mutedColor: "rgba(226, 232, 240, 0.72)",
    borderColor: "#334155",
    overlayColor: "rgba(10, 15, 28, 0.72)",
    radius: "26px",
    shadow: "0 32px 120px rgba(0, 0, 0, 0.35)",
    shortcut: "mod+k",
    layout: "centered",
    sections: getDefaultSections(language)
  };
}

export const defaultConfig: PlaygroundConfig = createDefaultConfig("en");

export function toTheme(config: PlaygroundConfig): CommandTheme {
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

export function createSection(language: Language): CommandSection {
  const { defaults } = getPlaygroundCopy(language);
  return {
    id: createId("section"),
    title: defaults.newSectionTitle,
    items: [createItem(language)]
  };
}

export function createChildSection(language: Language): CommandSection {
  const { defaults } = getPlaygroundCopy(language);
  return {
    id: createId("child-section"),
    title: defaults.newNestedSectionTitle,
    items: [createItem(language)]
  };
}

export function createItem(language: Language) {
  const { defaults } = getPlaygroundCopy(language);
  return {
    id: createId("item"),
    title: defaults.newItemTitle,
    subtitle: defaults.previewDescription,
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
