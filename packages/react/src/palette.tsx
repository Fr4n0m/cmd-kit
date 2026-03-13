import {
  type CommandItem,
  type CommandMessages,
  type CommandSection,
  type CommandSource,
  type CommandTheme
} from "@cmd-kit/core";
import {
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  useId,
  useRef
} from "react";

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

export interface CommandPaletteRenderContext {
  activeTitle: string;
  canGoBack: boolean;
  close: () => void;
  goBack: () => void;
  shortcut: string;
}

export interface CommandPaletteItemRenderContext {
  active: boolean;
}

export interface CommandPaletteSectionRenderContext {
  title: string;
}

export interface CommandPaletteEmptyStateRenderContext {
  query: string;
}

export interface CommandPaletteRenderers {
  emptyState?: (context: CommandPaletteEmptyStateRenderContext) => ReactNode;
  item?: (
    item: CommandItem,
    context: CommandPaletteItemRenderContext
  ) => ReactNode;
  sectionTitle?: (context: CommandPaletteSectionRenderContext) => ReactNode;
  title?: (context: CommandPaletteRenderContext) => ReactNode;
}

export interface CommandPaletteProps {
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
  className?: string;
  renderItem?: (item: CommandItem, active: boolean) => ReactNode;
  classNames?: CommandPaletteClassNames;
  renderers?: CommandPaletteRenderers;
  recents?: boolean | { limit?: number; sectionTitle?: string };
}

export function CommandPalette({
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
  className,
  renderItem,
  classNames,
  renderers,
  recents
}: CommandPaletteProps) {
  const titleId = useId();
  const captionId = useId();
  const listboxId = useId();
  const inputId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const {
    activeIndex,
    activeTitle,
    canGoBack,
    flatItems,
    isLoading,
    query,
    resolvedConfig,
    resolvedOpen,
    runItem,
    setActiveIndex,
    setOpenState,
    setQuery,
    snapshot,
    goBack,
    moveNext,
    movePrevious
  } = useCommandPalette({
    items,
    sections,
    source,
    messages,
    theme,
    title,
    shortcut,
    open,
    defaultOpen,
    onOpenChange,
    recents
  });
  const renderContext: CommandPaletteRenderContext = {
    activeTitle,
    canGoBack,
    close: () => setOpenState(false),
    goBack,
    shortcut
  };

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      if (canGoBack) {
        goBack();
      } else {
        setOpenState(false);
      }
      return;
    }

    if (event.key === "Backspace" && !query && canGoBack) {
      event.preventDefault();
      goBack();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveNext();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      movePrevious();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      void runItem(flatItems[activeIndex]);
    }
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements?.length) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  if (!resolvedOpen) {
    return null;
  }

  return (
    <div
      className={classNames?.overlay}
      style={overlayStyle(resolvedConfig.theme.overlayColor)}
    >
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className={joinClassNames(className, classNames?.dialog)}
        onKeyDown={handleDialogKeyDown}
        ref={dialogRef}
        role="dialog"
        style={paletteStyle(resolvedConfig.theme)}
      >
        <div className={classNames?.header} style={headerStyle}>
          <div>
            <p className={classNames?.title} id={titleId} style={titleStyle}>
              {renderers?.title ? renderers.title(renderContext) : activeTitle}
            </p>
            <p
              className={classNames?.caption}
              id={captionId}
              style={captionStyle}
            >
              Press {prettyShortcut(shortcut)} to toggle.
            </p>
          </div>
          <div className={classNames?.headerActions} style={headerActionsStyle}>
            {canGoBack ? (
              <button
                className={joinClassNames(
                  classNames?.closeButton,
                  classNames?.backButton
                )}
                onClick={goBack}
                style={closeButtonStyle(resolvedConfig.theme)}
                type="button"
              >
                Back
              </button>
            ) : null}
            <button
              aria-label={resolvedConfig.messages.closeLabel}
              className={classNames?.closeButton}
              onClick={() => setOpenState(false)}
              style={closeButtonStyle(resolvedConfig.theme)}
              type="button"
            >
              Esc
            </button>
          </div>
        </div>

        <input
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={resolvedOpen}
          aria-label={resolvedConfig.messages.searchPlaceholder}
          aria-activedescendant={
            flatItems[activeIndex]
              ? `${listboxId}-${flatItems[activeIndex].id}`
              : undefined
          }
          aria-describedby={captionId}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          autoFocus
          className={classNames?.input}
          id={inputId}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder={resolvedConfig.messages.searchPlaceholder}
          role="combobox"
          style={inputStyle(resolvedConfig.theme)}
          value={query}
        />

        <div
          aria-busy={isLoading}
          aria-labelledby={titleId}
          className={classNames?.list}
          id={listboxId}
          role="listbox"
          style={listStyle}
        >
          {snapshot.groups.length ? (
            snapshot.groups.map((group) => (
              <div
                aria-labelledby={`${listboxId}-${group.id}-label`}
                className={classNames?.section}
                key={group.id}
                role="group"
                style={sectionStyle}
              >
                <p
                  className={classNames?.sectionTitle}
                  id={`${listboxId}-${group.id}-label`}
                  style={sectionTitleStyle(resolvedConfig.theme)}
                >
                  {renderers?.sectionTitle
                    ? renderers.sectionTitle({ title: group.title })
                    : group.title}
                </p>
                <div
                  className={classNames?.sectionItems}
                  style={sectionItemsStyle}
                >
                  {group.items.map((item) => {
                    const itemIndex = flatItems.findIndex(
                      (entry) => entry.id === item.id
                    );
                    const isActive = itemIndex === activeIndex;

                    return (
                      <button
                        aria-selected={isActive}
                        className={classNames?.item}
                        disabled={item.disabled}
                        id={`${listboxId}-${item.id}`}
                        key={item.id}
                        onClick={() => void runItem(item)}
                        onMouseEnter={() => {
                          if (itemIndex >= 0) {
                            setActiveIndex(itemIndex);
                          }
                        }}
                        role="option"
                        style={itemStyle(
                          resolvedConfig.theme,
                          isActive,
                          item.disabled
                        )}
                        type="button"
                      >
                        {renderItem ? (
                          renderItem(item, isActive)
                        ) : renderers?.item ? (
                          renderers.item(item, { active: isActive })
                        ) : (
                          <DefaultItem item={item} isActive={isActive} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div
              className={classNames?.emptyState}
              style={emptyStateStyle(resolvedConfig.theme)}
            >
              {renderers?.emptyState
                ? renderers.emptyState({ query })
                : resolvedConfig.messages.noResults}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DefaultItem({
  item,
  isActive
}: {
  item: CommandItem;
  isActive: boolean;
}) {
  return (
    <>
      <div style={itemLeadingStyle}>
        <span style={iconStyle(isActive)}>{item.icon ?? "⌘"}</span>
        <div>
          <span style={itemTitleStyle}>{item.title}</span>
          {item.subtitle ? (
            <span style={itemSubtitleStyle}>{item.subtitle}</span>
          ) : null}
        </div>
      </div>
      {item.shortcut ? (
        <span style={shortcutStyle}>{item.shortcut}</span>
      ) : null}
      {!item.shortcut && item.children?.length ? (
        <span style={shortcutStyle}>Enter</span>
      ) : null}
    </>
  );
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
