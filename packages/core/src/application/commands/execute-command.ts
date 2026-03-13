import type {
  CommandExecutionResult,
  CommandItem
} from "../../domain/commands/types";

export function executeCommand(
  item: CommandItem | undefined
): CommandExecutionResult {
  if (!item || item.disabled) {
    return { type: "noop" };
  }

  if (item.children?.length) {
    return {
      type: "navigate",
      sections: item.children,
      title: item.title
    };
  }

  if (item.onSelect) {
    return {
      type: "callback",
      callback: item.onSelect
    };
  }

  if (item.href) {
    return {
      type: "href",
      href: item.href
    };
  }

  return { type: "noop" };
}
