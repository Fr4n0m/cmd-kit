import type { CommandMessages } from "./types";

export const defaultMessages: CommandMessages = {
  searchPlaceholder: "Search commands...",
  noResults: "No results found.",
  closeLabel: "Close command palette"
};

export function resolveMessages(
  messages?: Partial<CommandMessages>
): CommandMessages {
  return {
    ...defaultMessages,
    ...messages
  };
}

