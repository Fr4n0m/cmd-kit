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
} from "react";

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

const defaultLightTheme: CommandTheme = {
  accentColor: "#0fa6d8",
  backgroundColor: "#ffffff",
  textColor: "#0e1720",
  titleColor: "rgba(14, 23, 32, 0.78)",
  descriptionColor: "#5f7388",
  mutedColor: "rgba(49, 68, 84, 0.78)",
  sectionTitleColor: "rgba(49, 68, 84, 0.58)",
  itemTitleColor: "rgba(47, 84, 107, 0.86)",
  itemSubtitleColor: "#5f7388",
  shortcutColor: "#5f7388",
  borderColor: "rgba(83, 112, 136, 0.16)",
  overlayColor: "rgba(232, 241, 248, 0.7)",
  radius: "22px",
  shadow: "0 20px 44px rgba(40, 64, 81, 0.14)"
};

const defaultDarkTheme: CommandTheme = {
  accentColor: "#35d7ff",
  backgroundColor: "#0b1116",
  textColor: "#eff7fb",
  titleColor: "#eff7fb",
  descriptionColor: "#94a3b8",
  mutedColor: "rgba(172, 192, 207, 0.74)",
  sectionTitleColor: "rgba(172, 192, 207, 0.74)",
  itemTitleColor: "#eff7fb",
  itemSubtitleColor: "#94a3b8",
  shortcutColor: "#94a3b8",
  borderColor: "rgba(129, 155, 174, 0.16)",
  overlayColor: "rgba(6, 10, 14, 0.74)",
  radius: "22px",
  shadow: "0 24px 80px rgba(0, 0, 0, 0.42)"
};

const defaultDemoSections: CommandSection[] = [
  {
    id: "workspace",
    title: "Workspace",
    items: [
      {
        id: "demo-overview",
        title: "Overview",
        subtitle: "Open the workspace overview",
        shortcut: "mod+o"
      },
      {
        id: "demo-projects",
        title: "Projects",
        subtitle: "Jump to your active projects",
        shortcut: "mod+p"
      },
      {
        id: "demo-resources",
        title: "Resources",
        subtitle: "Guides and references for the team",
        children: [
          {
            id: "demo-resources-sections",
            title: "Resources",
            items: [
              {
                id: "demo-guides",
                title: "Guides",
                subtitle: "Implementation walkthroughs"
              },
              {
                id: "demo-api-reference",
                title: "API reference",
                subtitle: "Props, events, and renderers"
              },
              {
                id: "demo-release-notes",
                title: "Release notes",
                subtitle: "Recent updates and breaking changes"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "commands",
    title: "Commands",
    items: [
      {
        id: "demo-open-search",
        title: "Search across project",
        subtitle: "Open the global search flow",
        shortcut: "mod+shift+p"
      },
      {
        id: "demo-create-command",
        title: "Create command",
        subtitle: "Create a new command entry",
        shortcut: "mod+n"
      },
      {
        id: "demo-toggle-theme",
        title: "Toggle theme",
        subtitle: "Switch between light and dark mode",
        shortcut: "mod+j"
      },
      {
        id: "demo-settings",
        title: "Settings",
        subtitle: "Open workspace settings",
        children: [
          {
            id: "demo-settings-sections",
            title: "Settings",
            items: [
              {
                id: "demo-profile-settings",
                title: "Profile",
                subtitle: "Update account details and preferences"
              },
              {
                id: "demo-keyboard-settings",
                title: "Keyboard shortcuts",
                subtitle: "Customize command shortcuts"
              }
            ]
          }
        ]
      }
    ]
  }
];

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
  const shouldUseDefaultDemoData =
    items === undefined && sections === undefined && source === undefined;
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
  const [autoTheme, setAutoTheme] = useState<CommandTheme>(() =>
    resolveAdaptiveTheme()
  );
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const resolvedTheme = theme ?? autoTheme;

  const resolvedOpen = open ?? internalOpen;
  const rootItems = loadedItems ?? items;
  const rootSections =
    loadedSections ?? sections ?? (shouldUseDefaultDemoData ? defaultDemoSections : undefined);
  const activeSections = navigationStack.at(-1)?.sections ?? rootSections;
  const activeTitle = navigationStack.at(-1)?.title ?? title;
  const breadcrumbs = [title, ...navigationStack.map((entry) => entry.title)];
  const rootResolvedConfig = useMemo(
    () =>
      createResolvedConfig({
        items: rootItems,
        sections: rootSections,
        messages,
        theme: resolvedTheme,
        shortcut
      }),
    [messages, resolvedTheme, rootItems, rootSections, shortcut]
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
        theme: resolvedTheme,
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
      resolvedTheme
    ]
  );

  useEffect(() => {
    if (theme) {
      return;
    }

    const handleThemeUpdate = () => {
      setAutoTheme(resolveAdaptiveTheme());
    };

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const observer = new MutationObserver(handleThemeUpdate);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    media.addEventListener("change", handleThemeUpdate);
    window.addEventListener("cmd-kit-theme-change", handleThemeUpdate);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", handleThemeUpdate);
      window.removeEventListener("cmd-kit-theme-change", handleThemeUpdate);
    };
  }, [theme]);
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
      if (isTypingTarget(event.target)) {
        return;
      }

      const shortcutItem = findMatchingShortcutItem(
        resolvedOpen ? resolvedConfig.items : rootResolvedConfig.items,
        event
      );

      if (shortcutItem) {
        event.preventDefault();

        if (!resolvedOpen) {
          setOpenState(true);
        }

        void runItem(shortcutItem);
        return;
      }

      if (!matchesShortcut(event, shortcut)) {
        return;
      }

      event.preventDefault();
      setOpenState(!resolvedOpen);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resolvedConfig.items, resolvedOpen, rootResolvedConfig.items, shortcut]);

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
    breadcrumbs,
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

  const recentIds = new Set(recentItems.map((item) => item.id));
  const filteredSections = baseSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => !recentIds.has(item.id))
    }))
    .filter((section) => section.items.length > 0);

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
    ...filteredSections
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
  const normalizedShortcut = shortcut.trim();

  if (!normalizedShortcut) {
    return false;
  }

  const tokens = normalizedShortcut
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

function findMatchingShortcutItem(
  items: CommandItem[],
  event: globalThis.KeyboardEvent
): CommandItem | undefined {
  return items.find((item) => {
    if (item.disabled || !item.shortcut?.trim()) {
      return false;
    }

    return matchesShortcut(event, item.shortcut);
  });
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

function resolveAdaptiveTheme(): CommandTheme {
  if (typeof window === "undefined") {
    return defaultDarkTheme;
  }

  const themeFromRoot = document.documentElement.dataset.theme;
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const isLight = themeFromRoot === "light" || (!themeFromRoot && prefersLight);
  return isLight ? defaultLightTheme : defaultDarkTheme;
}
