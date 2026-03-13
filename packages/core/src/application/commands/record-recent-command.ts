import type { CommandItemRecord } from "../../domain/commands/types";

export interface RecordRecentCommandOptions {
  current?: CommandItemRecord[];
  itemId: string;
  limit?: number;
  now?: number;
}

export function recordRecentCommand({
  current = [],
  itemId,
  limit = 5,
  now = Date.now()
}: RecordRecentCommandOptions): CommandItemRecord[] {
  const nextRecords = [
    {
      itemId,
      timestamp: now
    },
    ...current.filter((entry) => entry.itemId !== itemId)
  ];

  return nextRecords.slice(0, limit);
}
