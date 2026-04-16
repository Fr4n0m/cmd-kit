import {
  createCommandSnapshot,
  createResolvedConfig,
  dispatchCommandExecution,
  isThemeModes,
  loadCommandSource,
  resolveTheme,
  type CommandItem,
  type CommandItemRecord,
  type CommandMessages,
  type CommandSection,
  type CommandSource,
  type CommandTheme,
  type CommandThemeInput
} from "@cmd-kit/core";
import { computed, onBeforeUnmount, onMounted, ref, toValue, watch } from "vue";
import type { MaybeRefOrGetter, Ref } from "vue";

import {
  isTypingTarget,
  findMatchingShortcutItem,
  matchesShortcut,
  restoreFocus,
  resolveRecentItems,
  trackRecentItem,
  type RecentOptions,
  withRecentSection
} from "./shared";

interface NavigationState {
  sections: CommandSection[];
  title: string;
}

export interface UseCommandPaletteOptions {
  items?: MaybeRefOrGetter<CommandItem[] | undefined>;
  sections?: MaybeRefOrGetter<CommandSection[] | undefined>;
  source?: MaybeRefOrGetter<CommandSource | undefined>;
  messages?: MaybeRefOrGetter<Partial<CommandMessages> | undefined>;
  theme?: MaybeRefOrGetter<CommandThemeInput | undefined>;
  title?: MaybeRefOrGetter<string | undefined>;
  shortcut?: MaybeRefOrGetter<string | undefined>;
  reducedMotion?: MaybeRefOrGetter<boolean | undefined>;
  open?: MaybeRefOrGetter<boolean | undefined>;
  defaultOpen?: MaybeRefOrGetter<boolean | undefined>;
  onOpenChange?: (open: boolean) => void;
  recents?: MaybeRefOrGetter<boolean | RecentOptions | undefined>;
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

export function useCommandPalette(options: UseCommandPaletteOptions) {
  const shouldUseDefaultDemoData = computed(
    () =>
      toValue(options.items) === undefined &&
      toValue(options.sections) === undefined &&
      toValue(options.source) === undefined
  );
  const internalOpen = ref(toValue(options.defaultOpen) ?? false);
  const query = ref("");
  const activeIndex = ref(0);
  const navigationStack = ref<NavigationState[]>([]);
  const loadedItems = ref<CommandItem[]>();
  const loadedSections = ref<CommandSection[]>();
  const isLoading = ref(false);
  const recentRecords = ref<CommandItemRecord[]>([]);
  const autoTheme = ref<CommandTheme>(resolveAdaptiveTheme());
  const previousFocus = ref<HTMLElement | null>(null);
  const effectiveTheme = computed(() => {
    const theme = toValue(options.theme);

    if (!theme) {
      return autoTheme.value;
    }

    if (!isThemeModes(theme)) {
      return theme;
    }

    const mode = autoTheme.value === defaultLightTheme ? "light" : "dark";
    return resolveTheme(theme, mode);
  });

  const resolvedOpen = computed(
    () => toValue(options.open) ?? internalOpen.value
  );
  const resolvedTitle = computed(
    () => toValue(options.title) ?? "Command menu"
  );
  const resolvedShortcut = computed(() => toValue(options.shortcut) ?? "mod+k");
  const reducedMotion = computed(() => toValue(options.reducedMotion) ?? false);
  const rootItems = computed(() => loadedItems.value ?? toValue(options.items));
  const rootSections = computed(
    () =>
      loadedSections.value ??
      toValue(options.sections) ??
      (shouldUseDefaultDemoData.value ? defaultDemoSections : undefined)
  );
  const activeSections = computed(
    () => navigationStack.value.at(-1)?.sections ?? rootSections.value
  );
  const activeTitle = computed(
    () => navigationStack.value.at(-1)?.title ?? resolvedTitle.value
  );
  const breadcrumbs = computed(() => [
    resolvedTitle.value,
    ...navigationStack.value.map((entry) => entry.title)
  ]);
  const rootResolvedConfig = computed(() =>
    createResolvedConfig({
      items: rootItems.value,
      sections: rootSections.value,
      messages: toValue(options.messages),
      theme: effectiveTheme.value,
      shortcut: resolvedShortcut.value,
      reducedMotion: reducedMotion.value
    })
  );
  const recentItems = computed(() =>
    resolveRecentItems(
      rootResolvedConfig.value.items,
      recentRecords.value,
      toValue(options.recents) ?? false
    )
  );
  const resolvedConfig = computed(() =>
    createResolvedConfig({
      items: navigationStack.value.length ? undefined : rootItems.value,
      sections: withRecentSection(
        activeSections.value,
        recentItems.value,
        toValue(options.recents) ?? false,
        rootItems.value
      ),
      messages: toValue(options.messages),
      theme: effectiveTheme.value,
      shortcut: resolvedShortcut.value,
      reducedMotion: reducedMotion.value
    })
  );
  const snapshot = computed(() =>
    createCommandSnapshot(resolvedConfig.value, query.value)
  );
  const flatItems = computed(() =>
    snapshot.value.items.filter((item) => !item.disabled)
  );
  const canGoBack = computed(() => navigationStack.value.length > 0);
  let cleanupThemeWatchers: (() => void) | undefined;

  watch(flatItems, (nextItems) => {
    if (!nextItems.length || activeIndex.value >= nextItems.length) {
      activeIndex.value = 0;
    }
  });

  watch(
    () => [
      toValue(options.items),
      toValue(options.sections),
      toValue(options.source)
    ],
    async () => {
      const source = toValue(options.source);

      if (!source) {
        loadedItems.value = undefined;
        loadedSections.value = undefined;
        return;
      }

      isLoading.value = true;

      try {
        const payload = await loadCommandSource({
          items: toValue(options.items),
          sections: toValue(options.sections),
          source
        });

        loadedItems.value = payload.items;
        loadedSections.value = payload.sections;
      } finally {
        isLoading.value = false;
      }
    },
    { immediate: true }
  );

  function setOpenState(nextOpen: boolean) {
    if (typeof document !== "undefined" && nextOpen && !resolvedOpen.value) {
      previousFocus.value =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    }

    if (toValue(options.open) === undefined) {
      internalOpen.value = nextOpen;
    }

    if (!nextOpen) {
      query.value = "";
      activeIndex.value = 0;
      navigationStack.value = [];

      if (typeof window !== "undefined") {
        restoreFocus(previousFocus.value);
      }
    }

    options.onOpenChange?.(nextOpen);
  }

  async function runItem(item: CommandItem | undefined) {
    await dispatchCommandExecution({
      item,
      port: {
        navigate: ({ sections, title }) => {
          navigationStack.value = [
            ...navigationStack.value,
            {
              title,
              sections
            }
          ];
          query.value = "";
          activeIndex.value = 0;
        },
        runCallback: async ({ callback }) => {
          trackRecentItem(
            item,
            toValue(options.recents) ?? false,
            recentRecords as Ref<CommandItemRecord[]>
          );
          await callback();
          setOpenState(false);
        },
        openHref: ({ href }) => {
          trackRecentItem(
            item,
            toValue(options.recents) ?? false,
            recentRecords as Ref<CommandItemRecord[]>
          );
          window.location.assign(href);
          setOpenState(false);
        }
      }
    });
  }

  function goBack() {
    navigationStack.value = navigationStack.value.slice(0, -1);
    query.value = "";
    activeIndex.value = 0;
  }

  function resetNavigation() {
    navigationStack.value = [];
    query.value = "";
    activeIndex.value = 0;
  }

  function navigateToSections(sections: CommandSection[], nextTitle: string) {
    navigationStack.value = [
      ...navigationStack.value,
      {
        sections,
        title: nextTitle
      }
    ];
    query.value = "";
    activeIndex.value = 0;
  }

  function openRoot(nextOpen = true) {
    if (nextOpen) {
      resetNavigation();
    }

    setOpenState(nextOpen);
  }

  async function reloadSource() {
    const source = toValue(options.source);

    if (!source) {
      return;
    }

    isLoading.value = true;

    try {
      const payload = await loadCommandSource({
        items: toValue(options.items),
        sections: toValue(options.sections),
        source
      });

      loadedItems.value = payload.items;
      loadedSections.value = payload.sections;
    } finally {
      isLoading.value = false;
    }
  }

  function moveNext() {
    if (flatItems.value.length) {
      activeIndex.value = (activeIndex.value + 1) % flatItems.value.length;
    }
  }

  function movePrevious() {
    if (flatItems.value.length) {
      activeIndex.value =
        (activeIndex.value - 1 + flatItems.value.length) %
        flatItems.value.length;
    }
  }

  function handleWindowKeyDown(event: KeyboardEvent) {
    if (isTypingTarget(event.target)) {
      return;
    }

    const shortcutItem = findMatchingShortcutItem(
      resolvedOpen.value ? resolvedConfig.value.items : rootResolvedConfig.value.items,
      event
    );

    if (shortcutItem) {
      event.preventDefault();

      if (!resolvedOpen.value) {
        setOpenState(true);
      }

      void runItem(shortcutItem);
      return;
    }

    if (!matchesShortcut(event, resolvedShortcut.value)) {
      return;
    }

    event.preventDefault();
    setOpenState(!resolvedOpen.value);
  }

  onMounted(() => {
    window.addEventListener("keydown", handleWindowKeyDown);

    const providedTheme = toValue(options.theme);
    if (providedTheme !== undefined && !isThemeModes(providedTheme)) {
      return;
    }

    const handleThemeUpdate = () => {
      autoTheme.value = resolveAdaptiveTheme();
    };

    const media =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-color-scheme: light)")
        : null;
    const observer = new MutationObserver(handleThemeUpdate);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    media?.addEventListener("change", handleThemeUpdate);
    window.addEventListener("cmd-kit-theme-change", handleThemeUpdate);
    cleanupThemeWatchers = () => {
      observer.disconnect();
      media?.removeEventListener("change", handleThemeUpdate);
      window.removeEventListener("cmd-kit-theme-change", handleThemeUpdate);
    };
  });

  onBeforeUnmount(() => {
    cleanupThemeWatchers?.();
    window.removeEventListener("keydown", handleWindowKeyDown);
  });

  return {
    activeIndex,
    activeTitle,
    breadcrumbs,
    canGoBack,
    flatItems,
    isLoading,
    query,
    recentItems,
    reloadSource,
    resolvedConfig,
    resolvedOpen,
    runItem,
    setActiveIndex: (index: number) => {
      activeIndex.value = index;
    },
    setOpenState,
    setQuery: (nextQuery: string) => {
      query.value = nextQuery;
    },
    snapshot,
    goBack,
    moveNext,
    movePrevious,
    navigateToSections,
    openRoot,
    resetNavigation,
    source: computed(() => toValue(options.source)),
    recents: computed(() => toValue(options.recents) ?? false)
  };
}

function resolveAdaptiveTheme(): CommandTheme {
  if (typeof window === "undefined") {
    return defaultDarkTheme;
  }

  const themeFromRoot = document.documentElement.dataset.theme;
  const prefersLight =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  const isLight = themeFromRoot === "light" || (!themeFromRoot && prefersLight);
  return isLight ? defaultLightTheme : defaultDarkTheme;
}
