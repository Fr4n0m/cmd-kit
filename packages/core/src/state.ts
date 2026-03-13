import { filterCommandItems, groupCommandItems } from "./filter";
import { resolveMessages } from "./messages";
import { resolveTheme } from "./theme";
import type { CommandGroup, CommandItem, CommandKitConfig } from "./types";

export interface CommandSnapshot {
  items: CommandItem[];
  groups: CommandGroup[];
}

export function createCommandSnapshot(
  config: CommandKitConfig,
  query = ""
): CommandSnapshot {
  const filteredItems = filterCommandItems(config.items, query);

  return {
    items: filteredItems,
    groups: groupCommandItems(filteredItems)
  };
}

export function createResolvedConfig(config: CommandKitConfig) {
  return {
    ...config,
    messages: resolveMessages(config.messages),
    theme: resolveTheme(config.theme),
    shortcut: config.shortcut ?? "mod+k"
  };
}

