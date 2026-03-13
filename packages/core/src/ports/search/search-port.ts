import type { CommandItem } from "../../domain/commands/types";

export interface SearchPort {
  filter(items: CommandItem[], query: string): CommandItem[];
}
