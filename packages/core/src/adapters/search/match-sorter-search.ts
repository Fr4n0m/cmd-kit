import { matchSorter } from "match-sorter";

import type { CommandItem } from "../../domain/commands/types";
import type { SearchPort } from "../../ports/search/search-port";

export class MatchSorterSearchAdapter implements SearchPort {
  filter(items: CommandItem[], query: string): CommandItem[] {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return items;
    }

    return matchSorter(items, trimmedQuery, {
      keys: [
        "title",
        "subtitle",
        "icon",
        (item) => item.keywords ?? [],
        (item) => item.section ?? ""
      ]
    });
  }
}

export const defaultSearchAdapter = new MatchSorterSearchAdapter();
