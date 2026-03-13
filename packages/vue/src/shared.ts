import {
  recordRecentCommand,
  resolveRecentCommands,
  type CommandItem,
  type CommandItemRecord,
  type CommandSection
} from "@cmd-kit/core";
import type { Ref } from "vue";

export interface RecentOptions {
  limit?: number;
  sectionTitle?: string;
}

export function withRecentSection(
  sections: CommandSection[] | undefined,
  recentItems: CommandItem[],
  recents: boolean | RecentOptions,
  items?: CommandItem[]
): CommandSection[] | undefined {
  if (!recentItems.length || !recents) {
    return sections ?? toSections(items);
  }

  const baseSections = sections ?? toSections(items);

  if (!baseSections?.length) {
    return undefined;
  }

  return [
    {
      id: "recent",
      title:
        typeof recents === "object" && recents.sectionTitle
          ? recents.sectionTitle
          : "Recent",
      items: recentItems.map((item) => ({
        ...item,
        section: undefined
      }))
    },
    ...baseSections
  ];
}

export function toSections(
  items: CommandItem[] | undefined
): CommandSection[] | undefined {
  if (!items?.length) {
    return undefined;
  }

  const groupedItems = new Map<string, CommandItem[]>();

  for (const item of items) {
    const title = item.section ?? "Commands";
    const sectionItems = groupedItems.get(title) ?? [];
    sectionItems.push(item);
    groupedItems.set(title, sectionItems);
  }

  return Array.from(groupedItems.entries()).map(
    ([sectionTitle, sectionItems]) => ({
      id: sectionTitle.toLowerCase().replace(/\s+/g, "-"),
      title: sectionTitle,
      items: sectionItems
    })
  );
}

export function trackRecentItem(
  item: CommandItem | undefined,
  recents: boolean | RecentOptions,
  recentRecords: Ref<CommandItemRecord[]>
) {
  if (!item || !recents) {
    return;
  }

  recentRecords.value = recordRecentCommand({
    current: recentRecords.value,
    itemId: item.id,
    limit: typeof recents === "object" ? recents.limit : undefined
  });
}

export function resolveRecentItems(
  items: CommandItem[],
  recentRecords: CommandItemRecord[],
  recents: boolean | RecentOptions
) {
  if (!recents) {
    return [];
  }

  return resolveRecentCommands(items, recentRecords);
}

export function matchesShortcut(
  event: KeyboardEvent,
  shortcut: string
): boolean {
  const tokens = shortcut
    .toLowerCase()
    .split("+")
    .map((token) => token.trim());
  const key = tokens.at(-1);

  if (!key || event.key.toLowerCase() !== key) {
    return false;
  }

  const expectsMod = tokens.includes("mod");
  const expectsCtrl = tokens.includes("ctrl");
  const expectsShift = tokens.includes("shift");
  const expectsAlt = tokens.includes("alt");
  const isMac = navigator.userAgent.includes("Mac");
  const modPressed = isMac ? event.metaKey : event.ctrlKey;

  return (
    (!expectsMod || modPressed) &&
    (!expectsCtrl || event.ctrlKey) &&
    (!expectsShift || event.shiftKey) &&
    (!expectsAlt || event.altKey)
  );
}

export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();
  return (
    tagName === "input" ||
    tagName === "textarea" ||
    target.isContentEditable ||
    target.getAttribute("role") === "textbox"
  );
}

export function restoreFocus(element: HTMLElement | null) {
  if (!element) {
    return;
  }

  window.setTimeout(() => {
    element.focus();
  }, 0);
}
