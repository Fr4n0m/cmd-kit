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
  type CSSProperties,
  type PropType
} from "vue";

import { useCommandPalette } from "./use-command-palette";

type SlotName =
  | "overlay"
  | "dialog"
  | "header"
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
          style: overlayStyle(palette.resolvedConfig.value.theme.overlayColor)
        },
        [
          h(
            "div",
            {
              "aria-labelledby": titleId,
              "aria-modal": "true",
              class: joinClassNames(props.className, props.classNames?.dialog),
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
                            canGoBack: palette.canGoBack.value,
                            shortcut: props.shortcut
                          })
                        : palette.activeTitle.value
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
                      palette.canGoBack.value
                        ? h(
                            "button",
                            {
                              class: joinClassNames(
                                props.classNames?.closeButton,
                                props.classNames?.backButton
                              ),
                              onClick: palette.goBack,
                              style: closeButtonStyle(
                                palette.resolvedConfig.value.theme
                              ),
                              type: "button"
                            },
                            "Back"
                          )
                        : null,
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
                        "Esc"
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
                  class: props.classNames?.list,
                  id: listboxId,
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
                          h(
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
                          ),
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
                                  : defaultItem(item, isActive)
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

function defaultItem(item: CommandItem, isActive: boolean) {
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
            style: iconStyle(isActive)
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

function paletteStyle(theme: Required<CommandTheme>): CSSProperties {
  return {
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
  };
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
  return {
    borderRadius: "999px",
    border: `1px solid ${theme.borderColor}`,
    background: "transparent",
    color: theme.mutedColor,
    padding: "0.4rem 0.7rem"
  };
}

function inputStyle(theme: Required<CommandTheme>): CSSProperties {
  return {
    width: "100%",
    borderRadius: "18px",
    border: `1px solid ${theme.borderColor}`,
    background: "rgba(15, 23, 42, 0.35)",
    color: theme.textColor,
    padding: "1rem 1.1rem",
    fontSize: "1rem",
    outline: "none"
  };
}

function itemStyle(
  theme: Required<CommandTheme>,
  active: boolean,
  disabled?: boolean
): CSSProperties {
  return {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    textAlign: "left",
    border: "none",
    borderRadius: "18px",
    padding: "0.9rem 1rem",
    background: active ? "rgba(59, 130, 246, 0.15)" : "transparent",
    color: disabled ? theme.mutedColor : theme.textColor,
    opacity: disabled ? 0.55 : 1
  };
}

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  alignItems: "start"
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

const captionStyle: CSSProperties = {
  margin: "0.35rem 0 0",
  color: "#94a3b8",
  fontSize: "0.92rem"
};

const listStyle: CSSProperties = {
  overflow: "auto",
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
  return {
    borderRadius: "18px",
    border: `1px dashed ${theme.borderColor}`,
    color: theme.mutedColor,
    textAlign: "center",
    padding: "2rem"
  };
}

const itemLeadingStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.8rem"
};

function iconStyle(active: boolean): CSSProperties {
  return {
    width: "2rem",
    height: "2rem",
    borderRadius: "12px",
    display: "grid",
    placeItems: "center",
    background: active
      ? "rgba(59, 130, 246, 0.25)"
      : "rgba(148, 163, 184, 0.12)"
  };
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
