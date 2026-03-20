import {
  type CommandItem,
  type CommandMessages,
  type CommandSection,
  type CommandSource,
  type CommandTheme
} from "@cmd-kit/core";
import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  watch,
  type CSSProperties,
  type PropType
} from "vue";

import { useCommandPalette } from "./use-command-palette";

type SlotName =
  | "overlay"
  | "dialog"
  | "header"
  | "breadcrumbs"
  | "title"
  | "caption"
  | "headerActions"
  | "closeButton"
  | "backButton"
  | "input"
  | "list"
  | "section"
  | "sectionTitle"
  | "sectionItems"
  | "item"
  | "emptyState";

export type CommandPaletteClassNames = Partial<Record<SlotName, string>>;

export const CommandPalette = defineComponent({
  name: "CommandPalette",
  props: {
    items: Array as PropType<CommandItem[]>,
    sections: Array as PropType<CommandSection[]>,
    source: [Object, Function] as PropType<CommandSource>,
    messages: Object as PropType<Partial<CommandMessages>>,
    theme: Object as PropType<CommandTheme>,
    title: {
      type: String,
      default: "Command menu"
    },
    shortcut: {
      type: String,
      default: "mod+k"
    },
    open: {
      type: Boolean,
      default: undefined
    },
    defaultOpen: {
      type: Boolean,
      default: false
    },
    className: String,
    classNames: Object as PropType<CommandPaletteClassNames>,
    recents: {
      type: [Boolean, Object] as PropType<
        boolean | { limit?: number; sectionTitle?: string }
      >,
      default: false
    }
  },
  emits: ["update:open", "open-change"],
  setup(props, { emit, slots }) {
    const titleId = `cmd-kit-title-${Math.random().toString(36).slice(2)}`;
    const listboxId = `cmd-kit-listbox-${Math.random().toString(36).slice(2)}`;

    const palette = useCommandPalette({
      items: computed(() => props.items),
      sections: computed(() => props.sections),
      source: computed(() => props.source),
      messages: computed(() => props.messages),
      theme: computed(() => props.theme),
      title: computed(() => props.title),
      shortcut: computed(() => props.shortcut),
      open: computed(() => props.open),
      defaultOpen: computed(() => props.defaultOpen),
      recents: computed(() => props.recents),
      onOpenChange: (open) => {
        emit("update:open", open);
        emit("open-change", open);
      }
    });

    const listRef = ref<HTMLElement | null>(null);
    let detachListScroll: (() => void) | undefined;

    const syncListMask = () => {
      const list = listRef.value;
      if (!list) {
        return;
      }

      const scrollable = list.scrollHeight > list.clientHeight + 1;
      const hasTop = list.scrollTop > 0;
      const hasBottom = list.scrollTop + list.clientHeight < list.scrollHeight - 1;

      if (!scrollable) {
        list.style.maskImage = "none";
        list.style.webkitMaskImage = "none";
        return;
      }

      if (hasTop && hasBottom) {
        const gradient =
          "linear-gradient(to bottom, transparent 0, #000 14px, #000 calc(100% - 14px), transparent 100%)";
        list.style.maskImage = gradient;
        list.style.webkitMaskImage = gradient;
        return;
      }

      if (!hasTop && hasBottom) {
        const gradient =
          "linear-gradient(to bottom, #000 0, #000 calc(100% - 14px), transparent 100%)";
        list.style.maskImage = gradient;
        list.style.webkitMaskImage = gradient;
        return;
      }

      if (hasTop && !hasBottom) {
        const gradient =
          "linear-gradient(to bottom, transparent 0, #000 14px, #000 100%)";
        list.style.maskImage = gradient;
        list.style.webkitMaskImage = gradient;
        return;
      }

      list.style.maskImage = "none";
      list.style.webkitMaskImage = "none";
    };

    onMounted(() => {
      const styleId = "cmdkit-vue-scrollbar-style";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = ".cmdkit-vue-list::-webkit-scrollbar{width:0;height:0}";
        document.head.append(style);
      }

      window.addEventListener("resize", syncListMask);
    });

    watch(listRef, (element) => {
      detachListScroll?.();

      if (!element) {
        return;
      }

      const onScroll = () => syncListMask();
      element.addEventListener("scroll", onScroll, { passive: true });
      detachListScroll = () => element.removeEventListener("scroll", onScroll);
      syncListMask();
    });

    onUpdated(() => {
      syncListMask();
    });

    onBeforeUnmount(() => {
      detachListScroll?.();
      window.removeEventListener("resize", syncListMask);
    });

    function handleInputKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (palette.canGoBack.value) {
          palette.goBack();
        } else {
          palette.setOpenState(false);
        }
        return;
      }

      if (
        event.key === "Backspace" &&
        !palette.query.value &&
        palette.canGoBack.value
      ) {
        event.preventDefault();
        palette.goBack();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        palette.moveNext();
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        palette.movePrevious();
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        void palette.runItem(
          palette.flatItems.value[palette.activeIndex.value]
        );
      }
    }

    return () => {
      if (!palette.resolvedOpen.value) {
        return null;
      }

      return h(
        "div",
        {
          class: props.classNames?.overlay,
          onMousedown: (event: MouseEvent) => {
            if (event.target === event.currentTarget) {
              palette.setOpenState(false);
            }
          },
          style: overlayStyle(palette.resolvedConfig.value.theme.overlayColor)
        },
        [
          h(
            "div",
            {
              "aria-labelledby": titleId,
              "aria-modal": "true",
              class: joinClassNames(props.className, props.classNames?.dialog),
              onMousedown: (event: MouseEvent) => {
                event.stopPropagation();
              },
              role: "dialog",
              style: paletteStyle(palette.resolvedConfig.value.theme)
            },
            [
              h(
                "div",
                {
                  class: props.classNames?.header,
                  style: headerStyle
                },
                [
                  h("div", [
                    palette.breadcrumbs.value.length > 1
                      ? h(
                          "p",
                          {
                            class: props.classNames?.breadcrumbs,
                            style: breadcrumbsStyle
                          },
                          palette.breadcrumbs.value.join(" / ")
                        )
                      : null,
                    h(
                      "p",
                      {
                        class: props.classNames?.title,
                        id: titleId,
                        style: titleStyle
                      },
                      slots.title
                        ? slots.title({
                          activeTitle: palette.activeTitle.value,
                          breadcrumbs: palette.breadcrumbs.value,
                          canGoBack: palette.canGoBack.value,
                          shortcut: props.shortcut
                        })
                        : renderDefaultTitle({
                          activeTitle: palette.activeTitle.value,
                          canGoBack: palette.canGoBack.value,
                          classNames: props.classNames,
                          onGoBack: palette.goBack,
                          theme: palette.resolvedConfig.value.theme
                        })
                    ),
                    h(
                      "p",
                      {
                        class: props.classNames?.caption,
                        style: captionStyle
                      },
                      `Press ${prettyShortcut(props.shortcut)} to toggle.`
                    )
                  ]),
                  h(
                    "div",
                    {
                      class: props.classNames?.headerActions,
                      style: headerActionsStyle
                    },
                    [
                      h(
                        "button",
                        {
                          "aria-label":
                            palette.resolvedConfig.value.messages.closeLabel,
                          class: props.classNames?.closeButton,
                          onClick: () => palette.setOpenState(false),
                          style: closeButtonStyle(
                            palette.resolvedConfig.value.theme
                          ),
                          type: "button"
                        },
                        "×"
                      )
                    ]
                  )
                ]
              ),
              h("input", {
                "aria-activedescendant": palette.flatItems.value[
                  palette.activeIndex.value
                ]
                  ? `${listboxId}-${palette.flatItems.value[palette.activeIndex.value].id}`
                  : undefined,
                "aria-autocomplete": "list",
                "aria-controls": listboxId,
                "aria-expanded": palette.resolvedOpen.value,
                "aria-label":
                  palette.resolvedConfig.value.messages.searchPlaceholder,
                autoCapitalize: "off",
                autoComplete: "off",
                autoCorrect: "off",
                autofocus: true,
                class: props.classNames?.input,
                onInput: (event: Event) => {
                  palette.setQuery((event.target as HTMLInputElement).value);
                },
                onKeydown: handleInputKeyDown,
                placeholder:
                  palette.resolvedConfig.value.messages.searchPlaceholder,
                role: "combobox",
                style: inputStyle(palette.resolvedConfig.value.theme),
                value: palette.query.value
              }),
              h(
                "div",
                {
                  "aria-labelledby": titleId,
                  class: joinClassNames("cmdkit-vue-list", props.classNames?.list),
                  id: listboxId,
                  ref: listRef,
                  role: "listbox",
                  style: listStyle
                },
                palette.snapshot.value.groups.length
                  ? palette.snapshot.value.groups.map((group) =>
                      h(
                        "div",
                        {
                          "aria-labelledby": `${listboxId}-${group.id}-label`,
                          class: props.classNames?.section,
                          key: group.id,
                          role: "group",
                          style: sectionStyle
                        },
                        [
                          !(palette.snapshot.value.groups.length === 1 &&
                            group.title === palette.activeTitle.value)
                            ? h(
                                "p",
                                {
                                  class: props.classNames?.sectionTitle,
                                  id: `${listboxId}-${group.id}-label`,
                                  style: sectionTitleStyle(
                                    palette.resolvedConfig.value.theme
                                  )
                                },
                                slots["section-title"]
                                  ? slots["section-title"]({ title: group.title })
                                  : group.title
                              )
                            : null,
                          h(
                            "div",
                            {
                              class: props.classNames?.sectionItems,
                              style: sectionItemsStyle
                            },
                            group.items.map((item) => {
                              const itemIndex =
                                palette.flatItems.value.findIndex(
                                  (entry) => entry.id === item.id
                                );
                              const isActive =
                                itemIndex === palette.activeIndex.value;

                              return h(
                                "button",
                                {
                                  "aria-selected": isActive,
                                  class: props.classNames?.item,
                                  disabled: item.disabled,
                                  id: `${listboxId}-${item.id}`,
                                  key: item.id,
                                  onClick: () => void palette.runItem(item),
                                  onMouseenter: () => {
                                    if (itemIndex >= 0) {
                                      palette.setActiveIndex(itemIndex);
                                    }
                                  },
                                  role: "option",
                                  style: itemStyle(
                                    palette.resolvedConfig.value.theme,
                                    isActive,
                                    item.disabled
                                  ),
                                  type: "button"
                                },
                                slots.item
                                  ? slots.item({ item, active: isActive })
                                  : defaultItem(
                                      item,
                                      isActive,
                                      palette.resolvedConfig.value.theme
                                    )
                              );
                            })
                          )
                        ]
                      )
                    )
                  : [
                      h(
                        "div",
                        {
                          class: props.classNames?.emptyState,
                          style: emptyStateStyle(
                            palette.resolvedConfig.value.theme
                          )
                        },
                        slots["empty-state"]
                          ? slots["empty-state"]({ query: palette.query.value })
                          : palette.resolvedConfig.value.messages.noResults
                      )
                    ]
              )
            ]
          )
        ]
      );
    };
  }
});

function defaultItem(
  item: CommandItem,
  isActive: boolean,
  theme: Required<CommandTheme>
) {
  return [
    h(
      "div",
      {
        style: itemLeadingStyle
      },
      [
        h(
          "span",
          {
            style: iconStyle(theme, isActive)
          },
          item.icon ?? "⌘"
        ),
        h("div", [
          h(
            "span",
            {
              style: itemTitleStyle
            },
            item.title
          ),
          item.subtitle
            ? h(
                "span",
                {
                  style: itemSubtitleStyle
                },
                item.subtitle
              )
            : null
        ])
      ]
    ),
    item.shortcut
      ? h(
          "span",
          {
            style: shortcutStyle
          },
          item.shortcut
        )
      : item.children?.length
        ? h(
            "span",
            {
              style: shortcutStyle
            },
            "Enter"
          )
        : null
  ];
}

function prettyShortcut(shortcut: string): string {
  if (typeof navigator === "undefined") {
    return shortcut
      .split("+")
      .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
      .join(" + ");
  }

  return shortcut
    .split("+")
    .map((token) => {
      if (token === "mod") {
        return navigator.userAgent.includes("Mac") ? "Cmd" : "Ctrl";
      }

      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join(" + ");
}

function joinClassNames(
  ...values: Array<string | undefined>
): string | undefined {
  const nextValue = values.filter(Boolean).join(" ");
  return nextValue || undefined;
}

function renderDefaultTitle({
  activeTitle,
  canGoBack,
  classNames,
  onGoBack,
  theme
}: {
  activeTitle: string;
  canGoBack: boolean;
  classNames: CommandPaletteClassNames | undefined;
  onGoBack: () => void;
  theme: Required<CommandTheme>;
}) {
  return h(
    "span",
    {
      style: titleRowStyle
    },
    [
      canGoBack
        ? h(
            "button",
            {
              "aria-label": "Go back",
              class: classNames?.backButton,
              onClick: onGoBack,
              style: backButtonStyle(theme),
              title: "Go back",
              type: "button"
            },
            "←"
          )
        : null,
      h("span", activeTitle)
    ]
  );
}

function withSquircle(styles: CSSProperties): CSSProperties {
  return styles;
}

function paletteStyle(theme: Required<CommandTheme>): CSSProperties {
  return withSquircle({
    width: "min(680px, calc(100vw - 2rem))",
    maxHeight: "min(720px, calc(100vh - 2rem))",
    overflow: "hidden",
    borderRadius: theme.radius,
    border: `1px solid ${theme.borderColor}`,
    background: theme.backgroundColor,
    color: theme.textColor,
    boxShadow: theme.shadow,
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  });
}

function overlayStyle(color: string): CSSProperties {
  return {
    position: "fixed",
    inset: 0,
    background: color,
    display: "grid",
    placeItems: "center",
    padding: "1rem",
    zIndex: 9999,
    backdropFilter: "blur(14px)"
  };
}

function closeButtonStyle(theme: Required<CommandTheme>): CSSProperties {
  const light = isLightTheme(theme);
  return withSquircle({
    borderRadius: "999px",
    border: light
      ? `1px solid ${theme.borderColor}`
      : "1px solid rgba(146, 173, 194, 0.22)",
    background: light ? "rgba(15, 166, 216, 0.05)" : "rgba(166, 191, 212, 0.08)",
    color: light ? theme.mutedColor : "rgba(216, 232, 244, 0.92)",
    appearance: "none",
    width: "2.25rem",
    height: "2.25rem",
    minWidth: "2.25rem",
    minHeight: "2.25rem",
    padding: "0",
    display: "inline-grid",
    placeItems: "center",
    lineHeight: "1",
    fontSize: "1.1rem",
    fontWeight: 700,
    textAlign: "center",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
  });
}

function backButtonStyle(theme: Required<CommandTheme>): CSSProperties {
  const light = isLightTheme(theme);
  return withSquircle({
    borderRadius: "0.65rem",
    border: `1px solid ${theme.borderColor}`,
    background: light ? "rgba(15, 166, 216, 0.08)" : "rgba(255, 255, 255, 0.03)",
    color: theme.mutedColor,
    width: "1.65rem",
    height: "1.65rem",
    padding: 0,
    display: "inline-grid",
    placeItems: "center",
    lineHeight: 1,
    fontSize: "0.95rem",
    fontWeight: 600
  });
}

function inputStyle(theme: Required<CommandTheme>): CSSProperties {
  const light = isLightTheme(theme);
  return withSquircle({
    width: "100%",
    borderRadius: "18px",
    border: `1px solid ${theme.borderColor}`,
    background: light ? "rgba(171, 189, 205, 0.16)" : "rgba(255, 255, 255, 0.03)",
    color: theme.textColor,
    padding: "1rem 1.1rem",
    fontSize: "1rem",
    outline: "none"
  });
}

function itemStyle(
  theme: Required<CommandTheme>,
  active: boolean,
  disabled?: boolean
): CSSProperties {
  const light = isLightTheme(theme);
  return withSquircle({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    textAlign: "left",
    border: active
      ? `1px solid ${light ? "rgba(15, 166, 216, 0.22)" : "rgba(53, 215, 255, 0.26)"}`
      : "1px solid transparent",
    borderRadius: "18px",
    padding: "0.9rem 1rem",
    background: active
      ? light
        ? "rgba(15, 166, 216, 0.13)"
        : "rgba(53, 215, 255, 0.14)"
      : "transparent",
    color: disabled ? theme.mutedColor : theme.textColor,
    opacity: disabled ? 0.55 : 1
  });
}

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  alignItems: "start"
};

const breadcrumbsStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.35rem",
  marginBottom: "0.45rem",
  color: "#94a3b8",
  fontSize: "0.78rem"
};

const headerActionsStyle: CSSProperties = {
  display: "flex",
  gap: "0.5rem"
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.1rem",
  fontWeight: 700
};

const titleRowStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.45rem",
  minWidth: 0
};

const captionStyle: CSSProperties = {
  margin: "0.35rem 0 0",
  color: "#94a3b8",
  fontSize: "0.92rem"
};

const listStyle: CSSProperties = {
  overflow: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
};

const sectionStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.55rem"
};

function sectionTitleStyle(theme: Required<CommandTheme>): CSSProperties {
  return {
    margin: 0,
    color: theme.mutedColor,
    fontSize: "0.78rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em"
  };
}

const sectionItemsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem"
};

function emptyStateStyle(theme: Required<CommandTheme>): CSSProperties {
  return withSquircle({
    borderRadius: "18px",
    border: `1px dashed ${theme.borderColor}`,
    color: theme.mutedColor,
    textAlign: "center",
    padding: "2rem"
  });
}

const itemLeadingStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.8rem"
};

function iconStyle(theme: Required<CommandTheme>, active: boolean): CSSProperties {
  const light = isLightTheme(theme);
  return withSquircle({
    width: "2rem",
    height: "2rem",
    borderRadius: "0.78rem",
    display: "grid",
    placeItems: "center",
    color: active
      ? light
        ? "#0b607f"
        : "#eaf8ff"
      : light
        ? "#2f546b"
        : "rgba(188, 208, 223, 0.88)",
    border: active
      ? `1px solid ${light ? "rgba(15, 166, 216, 0.28)" : "rgba(53, 215, 255, 0.3)"}`
      : `1px solid ${light ? "rgba(83, 112, 136, 0.18)" : "rgba(129, 155, 174, 0.18)"}`,
    background: active
      ? light
        ? "rgba(15, 166, 216, 0.2)"
        : "rgba(53, 215, 255, 0.24)"
      : light
        ? "rgba(83, 112, 136, 0.1)"
        : "rgba(180, 205, 221, 0.12)"
  });
}

const itemTitleStyle: CSSProperties = {
  display: "block",
  fontWeight: 600
};

const itemSubtitleStyle: CSSProperties = {
  display: "block",
  fontSize: "0.88rem",
  color: "#94a3b8",
  marginTop: "0.15rem"
};

const shortcutStyle: CSSProperties = {
  color: "#94a3b8",
  fontSize: "0.82rem"
};

function isLightTheme(theme: Required<CommandTheme>): boolean {
  const rgb = parseColorToRgb(theme.backgroundColor);
  if (!rgb) {
    return false;
  }

  const [r, g, b] = rgb;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.72;
}

function parseColorToRgb(color: string): [number, number, number] | null {
  const value = color.trim();

  if (value.startsWith("#")) {
    const hex = value.slice(1);

    if (hex.length === 3) {
      return [
        Number.parseInt(hex[0] + hex[0], 16),
        Number.parseInt(hex[1] + hex[1], 16),
        Number.parseInt(hex[2] + hex[2], 16)
      ];
    }

    if (hex.length >= 6) {
      return [
        Number.parseInt(hex.slice(0, 2), 16),
        Number.parseInt(hex.slice(2, 4), 16),
        Number.parseInt(hex.slice(4, 6), 16)
      ];
    }
  }

  const rgbMatch = value.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return [
      Number.parseInt(rgbMatch[1], 10),
      Number.parseInt(rgbMatch[2], 10),
      Number.parseInt(rgbMatch[3], 10)
    ];
  }

  return null;
}
