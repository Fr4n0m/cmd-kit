import { matchSorter } from "match-sorter";

import type { CommandGroup, CommandItem } from "./types";

export function filterCommandItems(
  items: CommandItem[],
  query: string
): CommandItem[] {
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

export function groupCommandItems(items: CommandItem[]): CommandGroup[] {
  const groups = new Map<string, CommandGroup>();

  for (const item of items) {
    const title = item.section ?? "General";
    const id = slugify(title);
    const group = groups.get(id);

    if (group) {
      group.items.push(item);
      continue;
    }

    groups.set(id, {
      id,
      title,
      items: [item]
    });
  }

  return Array.from(groups.values());
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

