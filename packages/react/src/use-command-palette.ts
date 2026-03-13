import {
  createCommandSnapshot,
  createResolvedConfig,
  executeCommand,
  type CommandItem,
  type CommandMessages,
  type CommandSection,
  type CommandTheme
} from "@cmd-kit/core";
import { useEffect, useMemo, useState } from "react";

interface NavigationState {
  sections: CommandSection[];
  title: string;
}

export interface UseCommandPaletteOptions {
  items?: CommandItem[];
  sections?: CommandSection[];
  messages?: Partial<CommandMessages>;
  theme?: CommandTheme;
  title?: string;
  shortcut?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useCommandPalette({
  items,
  sections,
  messages,
  theme,
  title = "Command menu",
  shortcut = "mod+k",
  open,
  defaultOpen = false,
  onOpenChange
}: UseCommandPaletteOptions) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [navigationStack, setNavigationStack] = useState<NavigationState[]>([]);

  const resolvedOpen = open ?? internalOpen;
  const activeSections = navigationStack.at(-1)?.sections ?? sections;
  const activeTitle = navigationStack.at(-1)?.title ?? title;
  const resolvedConfig = useMemo(
    () =>
      createResolvedConfig({
        items,
        sections: activeSections,
        messages,
        theme,
        shortcut
      }),
    [activeSections, items, messages, shortcut, theme]
  );
  const snapshot = useMemo(
    () => createCommandSnapshot(resolvedConfig, query),
    [query, resolvedConfig]
  );
  const flatItems = snapshot.items.filter((item) => !item.disabled);

  useEffect(() => {
    if (!flatItems.length) {
      setActiveIndex(0);
      return;
    }

    if (activeIndex >= flatItems.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, flatItems]);

  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (!matchesShortcut(event, shortcut) || isTypingTarget(event.target)) {
        return;
      }

      event.preventDefault();
      setOpenState(!resolvedOpen);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resolvedOpen, shortcut]);

  function setOpenState(nextOpen: boolean) {
    if (open === undefined) {
      setInternalOpen(nextOpen);
    }

    if (!nextOpen) {
      setQuery("");
      setActiveIndex(0);
      setNavigationStack([]);
    }

    onOpenChange?.(nextOpen);
  }

  async function runItem(item: CommandItem | undefined) {
    const result = executeCommand(item);

    if (result.type === "navigate") {
      setNavigationStack((current) => [
        ...current,
        {
          title: result.title,
          sections: result.sections
        }
      ]);
      setQuery("");
      setActiveIndex(0);
      return;
    }

    if (result.type === "callback") {
      await result.callback();
      setOpenState(false);
      return;
    }

    if (result.type === "href") {
      window.location.assign(result.href);
      setOpenState(false);
    }
  }

  function goBack() {
    setNavigationStack((current) => current.slice(0, -1));
    setQuery("");
    setActiveIndex(0);
  }

  function moveNext() {
    if (flatItems.length) {
      setActiveIndex((index) => (index + 1) % flatItems.length);
    }
  }

  function movePrevious() {
    if (flatItems.length) {
      setActiveIndex((index) => (index - 1 + flatItems.length) % flatItems.length);
    }
  }

  return {
    activeIndex,
    activeTitle,
    canGoBack: navigationStack.length > 0,
    flatItems,
    query,
    resolvedConfig,
    resolvedOpen,
    snapshot,
    setActiveIndex,
    setOpenState,
    setQuery,
    runItem,
    goBack,
    moveNext,
    movePrevious
  };
}

export function matchesShortcut(
  event: globalThis.KeyboardEvent,
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
