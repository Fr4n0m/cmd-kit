import type { CommandItem } from "../../domain/commands/types";
import { defaultSearchAdapter } from "../../adapters/search/match-sorter-search";
import type { SearchPort } from "../../ports/search/search-port";

export function filterCommandItems(
  items: CommandItem[],
  query: string,
  search: SearchPort = defaultSearchAdapter
): CommandItem[] {
  return search.filter(items, query);
}

