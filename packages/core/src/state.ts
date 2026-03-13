import { filterCommandItems, groupCommandItems } from "./filter";
import { resolveMessages } from "./messages";
import { resolveTheme } from "./theme";
import type {
  CommandGroup,
  CommandItem,
  CommandKitConfig,
  CommandSection
} from "./types";

export interface CommandSnapshot {
  items: CommandItem[];
  groups: CommandGroup[];
}

export function createCommandSnapshot(
  config: CommandKitConfig,
  query = ""
): CommandSnapshot {
  const filteredItems = filterCommandItems(resolveCommandItems(config), query);

  return {
    items: filteredItems,
    groups: groupCommandItems(filteredItems)
  };
}

export function createResolvedConfig(config: CommandKitConfig) {
  return {
    ...config,
    items: resolveCommandItems(config),
    messages: resolveMessages(config.messages),
    theme: resolveTheme(config.theme),
    shortcut: config.shortcut ?? "mod+k"
  };
}

export function resolveCommandItems(config: CommandKitConfig): CommandItem[] {
  if (config.sections?.length) {
    return flattenSections(config.sections);
  }

  return config.items ?? [];
}

export function flattenSections(sections: CommandSection[]): CommandItem[] {
  return sections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section: item.section ?? section.title
    }))
  );
}
