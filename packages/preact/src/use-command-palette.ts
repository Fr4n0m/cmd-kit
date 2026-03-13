import {
  createCommandSnapshot,
  createResolvedConfig,
  dispatchCommandExecution,
  loadCommandSource,
  recordRecentCommand,
  resolveRecentCommands,
  type CommandItem,
  type CommandItemRecord,
  type CommandMessages,
  type CommandSection,
  type CommandSource,
  type CommandTheme
} from "@cmd-kit/core";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState
} from "preact/compat";

interface NavigationState {
  sections: CommandSection[];
  title: string;
}

export interface UseCommandPaletteOptions {
  items?: CommandItem[];
  sections?: CommandSection[];
  source?: CommandSource;
  messages?: Partial<CommandMessages>;
  theme?: CommandTheme;
  title?: string;
  shortcut?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  recents?: boolean | { limit?: number; sectionTitle?: string };
}

export function useCommandPalette({
  items,
  sections,
  source,
  messages,
  theme,
  title = "Command menu",
  shortcut = "mod+k",
  open,
  defaultOpen = false,
  onOpenChange,
  recents = false
}: UseCommandPaletteOptions) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [navigationStack, setNavigationStack] = useState<NavigationState[]>([]);
  const [loadedItems, setLoadedItems] = useState<CommandItem[] | undefined>();
  const [loadedSections, setLoadedSections] = useState<
    CommandSection[] | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [recentRecords, setRecentRecords] = useState<CommandItemRecord[]>([]);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const resolvedOpen = open ?? internalOpen;
  const rootItems = loadedItems ?? items;
  const rootSections = loadedSections ?? sections;
  const activeSections = navigationStack.at(-1)?.sections ?? rootSections;
  const activeTitle = navigationStack.at(-1)?.title ?? title;
  const rootResolvedConfig = useMemo(
    () =>
      createResolvedConfig({
        items: rootItems,
        sections: rootSections,
        messages,
        theme,
        shortcut
      }),
    [messages, rootItems, rootSections, shortcut, theme]
  );
  const recentItems = useMemo(() => {
    if (!recents) {
      return [];
    }

    return resolveRecentCommands(rootResolvedConfig.items, recentRecords);
  }, [recentRecords, recents, rootResolvedConfig.items]);
  const resolvedConfig = useMemo(
    () =>
      createResolvedConfig({
        items: navigationStack.length ? undefined : rootItems,
        sections: withRecentSection(
          activeSections,
          recentItems,
          recents,
          rootItems
        ),
        messages,
        theme,
        shortcut
      }),
    [
      activeSections,
      messages,
      navigationStack.length,
      recentItems,
      recents,
      rootItems,
      shortcut,
      theme
    ]
  );
  const snapshot = useMemo(
    () => createCommandSnapshot(resolvedConfig, query),
    [query, resolvedConfig]
  );
  const flatItems = snapshot.items.filter((item) => !item.disabled);

  useEffect(() => {
    let active = true;

    async function hydrateSource() {
      if (!source) {
        setLoadedItems(undefined);
        setLoadedSections(undefined);
        return;
      }

      setIsLoading(true);

      try {
        const payload = await loadCommandSource({
          items,
          sections,
          source
        });

        if (!active) {
          return;
        }

        setLoadedItems(payload.items);
        setLoadedSections(payload.sections);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void hydrateSource();

    return () => {
      active = false;
    };
  }, [items, sections, source]);

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
    if (nextOpen && !resolvedOpen) {
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    }

    if (open === undefined) {
      setInternalOpen(nextOpen);
    }

    if (!nextOpen) {
      setQuery("");
      setActiveIndex(0);
      setNavigationStack([]);
      restoreFocus(previousFocusRef.current);
    }

    onOpenChange?.(nextOpen);
  }

  async function runItem(item: CommandItem | undefined) {
    await dispatchCommandExecution({
      item,
      port: {
        navigate: ({ sections, title }) => {
          setNavigationStack((current) => [
            ...current,
            {
              title,
              sections
            }
          ]);
          setQuery("");
          setActiveIndex(0);
        },
        runCallback: async ({ callback }) => {
          trackRecentItem(item, recents, setRecentRecords);
          await callback();
          setOpenState(false);
        },
        openHref: ({ href }) => {
          trackRecentItem(item, recents, setRecentRecords);
          window.location.assign(href);
          setOpenState(false);
        }
      }
    });
  }

  function goBack() {
    setNavigationStack((current) => current.slice(0, -1));
    setQuery("");
    setActiveIndex(0);
  }

  function resetNavigation() {
    setNavigationStack([]);
    setQuery("");
    setActiveIndex(0);
  }

  function navigateToSections(sections: CommandSection[], nextTitle: string) {
    setNavigationStack((current) => [
      ...current,
      {
        sections,
        title: nextTitle
      }
    ]);
    setQuery("");
    setActiveIndex(0);
  }

  function openRoot(nextOpen = true) {
    if (nextOpen) {
      resetNavigation();
    }

    setOpenState(nextOpen);
  }

  async function reloadSource() {
    if (!source) {
      return;
    }

    setIsLoading(true);

    try {
      const payload = await loadCommandSource({
        items,
        sections,
        source
      });

      setLoadedItems(payload.items);
      setLoadedSections(payload.sections);
    } finally {
      setIsLoading(false);
    }
  }

  function moveNext() {
    if (flatItems.length) {
      setActiveIndex((index) => (index + 1) % flatItems.length);
    }
  }

  function movePrevious() {
    if (flatItems.length) {
      setActiveIndex(
        (index) => (index - 1 + flatItems.length) % flatItems.length
      );
    }
  }

  return {
    activeIndex,
    activeTitle,
    canGoBack: navigationStack.length > 0,
    flatItems,
    isLoading,
    query,
    recentItems,
    resolvedConfig,
    resolvedOpen,
    reloadSource,
    snapshot,
    setActiveIndex,
    setOpenState,
    setQuery,
    runItem,
    goBack,
    navigateToSections,
    moveNext,
    movePrevious,
    openRoot,
    resetNavigation
  };
}

function withRecentSection(
  sections: CommandSection[] | undefined,
  recentItems: CommandItem[],
  recents: UseCommandPaletteOptions["recents"],
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

function trackRecentItem(
  item: CommandItem | undefined,
  recents: UseCommandPaletteOptions["recents"],
  setRecentRecords: Dispatch<SetStateAction<CommandItemRecord[]>>
) {
  if (!item || !recents) {
    return;
  }

  const limit = typeof recents === "object" ? recents.limit : undefined;

  setRecentRecords((current) =>
    recordRecentCommand({
      current,
      itemId: item.id,
      limit
    })
  );
}

function toSections(
  items: CommandItem[] | undefined
): CommandSection[] | undefined {
  if (!items?.length) {
    return undefined;
  }

  const groupedItems = new Map<string, CommandItem[]>();

  for (const item of items) {
    const title = item.section ?? "Commands";
    const groupItems = groupedItems.get(title) ?? [];
    groupItems.push(item);
    groupedItems.set(title, groupItems);
  }

  return Array.from(groupedItems.entries()).map(
    ([sectionTitle, sectionItems]) => ({
      id: sectionTitle.toLowerCase().replace(/\s+/g, "-"),
      title: sectionTitle,
      items: sectionItems
    })
  );
}

function restoreFocus(element: HTMLElement | null) {
  if (!element) {
    return;
  }

  window.setTimeout(() => {
    element.focus();
  }, 0);
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
