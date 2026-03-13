import {
  createCommandSnapshot,
  createResolvedConfig,
  dispatchCommandExecution,
  loadCommandSource,
  type CommandItem,
  type CommandItemRecord,
  type CommandMessages,
  type CommandSection,
  type CommandSource,
  type CommandTheme
} from "@cmd-kit/core";
import { computed, onBeforeUnmount, onMounted, ref, toValue, watch } from "vue";
import type { MaybeRefOrGetter, Ref } from "vue";

import {
  isTypingTarget,
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
  theme?: MaybeRefOrGetter<CommandTheme | undefined>;
  title?: MaybeRefOrGetter<string | undefined>;
  shortcut?: MaybeRefOrGetter<string | undefined>;
  open?: MaybeRefOrGetter<boolean | undefined>;
  defaultOpen?: MaybeRefOrGetter<boolean | undefined>;
  onOpenChange?: (open: boolean) => void;
  recents?: MaybeRefOrGetter<boolean | RecentOptions | undefined>;
}

export function useCommandPalette(options: UseCommandPaletteOptions) {
  const internalOpen = ref(toValue(options.defaultOpen) ?? false);
  const query = ref("");
  const activeIndex = ref(0);
  const navigationStack = ref<NavigationState[]>([]);
  const loadedItems = ref<CommandItem[]>();
  const loadedSections = ref<CommandSection[]>();
  const isLoading = ref(false);
  const recentRecords = ref<CommandItemRecord[]>([]);
  const previousFocus = ref<HTMLElement | null>(null);

  const resolvedOpen = computed(
    () => toValue(options.open) ?? internalOpen.value
  );
  const resolvedTitle = computed(
    () => toValue(options.title) ?? "Command menu"
  );
  const resolvedShortcut = computed(() => toValue(options.shortcut) ?? "mod+k");
  const rootItems = computed(() => loadedItems.value ?? toValue(options.items));
  const rootSections = computed(
    () => loadedSections.value ?? toValue(options.sections)
  );
  const activeSections = computed(
    () => navigationStack.value.at(-1)?.sections ?? rootSections.value
  );
  const activeTitle = computed(
    () => navigationStack.value.at(-1)?.title ?? resolvedTitle.value
  );
  const rootResolvedConfig = computed(() =>
    createResolvedConfig({
      items: rootItems.value,
      sections: rootSections.value,
      messages: toValue(options.messages),
      theme: toValue(options.theme),
      shortcut: resolvedShortcut.value
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
      theme: toValue(options.theme),
      shortcut: resolvedShortcut.value
    })
  );
  const snapshot = computed(() =>
    createCommandSnapshot(resolvedConfig.value, query.value)
  );
  const flatItems = computed(() =>
    snapshot.value.items.filter((item) => !item.disabled)
  );
  const canGoBack = computed(() => navigationStack.value.length > 0);

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
    if (
      !matchesShortcut(event, resolvedShortcut.value) ||
      isTypingTarget(event.target)
    ) {
      return;
    }

    event.preventDefault();
    setOpenState(!resolvedOpen.value);
  }

  onMounted(() => {
    window.addEventListener("keydown", handleWindowKeyDown);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleWindowKeyDown);
  });

  return {
    activeIndex,
    activeTitle,
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
