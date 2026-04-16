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

  const normalizedHref = item.href?.trim();

  if (normalizedHref) {
    return {
      type: "href",
      href: normalizedHref
    };
  }

  return { type: "noop" };
}
