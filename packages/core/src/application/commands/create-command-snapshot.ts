import { groupCommandItems } from "./group-command-items";
import { filterCommandItems } from "./filter-command-items";
import { resolveCommandItems } from "./resolve-command-items";
import { resolveMessages } from "../../domain/commands/messages";
import { resolveTheme } from "../../domain/commands/theme";
import type { CommandKitConfig, CommandSnapshot } from "../../domain/commands/types";

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

