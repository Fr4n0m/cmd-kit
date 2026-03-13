import type {
  CommandItem,
  CommandItemRecord
} from "../../domain/commands/types";

export function resolveRecentCommands(
  items: CommandItem[],
  records: CommandItemRecord[]
): CommandItem[] {
  const itemMap = new Map(items.map((item) => [item.id, item]));

  return records
    .map((record) => itemMap.get(record.itemId))
    .filter((item): item is CommandItem => Boolean(item));
}
