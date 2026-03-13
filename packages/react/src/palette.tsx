import {
  createCommandSnapshot,
  createResolvedConfig,
  executeCommand,
  type CommandItem,
  type CommandMessages,
  type CommandSection,
  type CommandTheme
} from "@cmd-kit/core";
import {
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useState
} from "react";

interface NavigationState {
  sections: CommandSection[];
  title: string;
}

export interface CommandPaletteProps {
  items?: CommandItem[];
  sections?: CommandSection[];
  messages?: Partial<CommandMessages>;
  theme?: CommandTheme;
  title?: string;
  shortcut?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  renderItem?: (item: CommandItem, active: boolean) => ReactNode;
}

export function CommandPalette({
  items,
  sections,
  messages,
  theme,
  title = "Command menu",
  shortcut = "mod+k",
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  renderItem
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [navigationStack, setNavigationStack] = useState<NavigationState[]>([]);
  const titleId = useId();

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

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      if (navigationStack.length) {
        setNavigationStack((current) => current.slice(0, -1));
        setQuery("");
        setActiveIndex(0);
      } else {
        setOpenState(false);
      }
      return;
    }

    if (event.key === "Backspace" && !query && navigationStack.length) {
      event.preventDefault();
      setNavigationStack((current) => current.slice(0, -1));
      setActiveIndex(0);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (flatItems.length) {
        setActiveIndex((index) => (index + 1) % flatItems.length);
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (flatItems.length) {
        setActiveIndex((index) => (index - 1 + flatItems.length) % flatItems.length);
      }
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      void runItem(flatItems[activeIndex]);
    }
  }

  if (!resolvedOpen) {
    return null;
  }

  return (
    <div style={overlayStyle(resolvedConfig.theme.overlayColor)}>
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className={className}
        role="dialog"
        style={paletteStyle(resolvedConfig.theme)}
      >
        <div style={headerStyle}>
          <div>
            <p id={titleId} style={titleStyle}>
              {activeTitle}
            </p>
            <p style={captionStyle}>Press {prettyShortcut(shortcut)} to toggle.</p>
          </div>
          <div style={headerActionsStyle}>
            {navigationStack.length ? (
              <button
                onClick={() => {
                  setNavigationStack((current) => current.slice(0, -1));
                  setQuery("");
                  setActiveIndex(0);
                }}
                style={closeButtonStyle(resolvedConfig.theme)}
                type="button"
              >
                Back
              </button>
            ) : null}
            <button
              aria-label={resolvedConfig.messages.closeLabel}
              onClick={() => setOpenState(false)}
              style={closeButtonStyle(resolvedConfig.theme)}
              type="button"
            >
              Esc
            </button>
          </div>
        </div>

        <input
          autoFocus
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder={resolvedConfig.messages.searchPlaceholder}
          style={inputStyle(resolvedConfig.theme)}
          value={query}
        />

        <div role="listbox" style={listStyle}>
          {snapshot.groups.length ? (
            snapshot.groups.map((group) => (
              <section key={group.id} style={sectionStyle}>
                <p style={sectionTitleStyle(resolvedConfig.theme)}>{group.title}</p>
                <div style={sectionItemsStyle}>
                  {group.items.map((item) => {
                    const itemIndex = flatItems.findIndex((entry) => entry.id === item.id);
                    const isActive = itemIndex === activeIndex;

                    return (
                      <button
                        aria-selected={isActive}
                        disabled={item.disabled}
                        key={item.id}
                        onClick={() => void runItem(item)}
                        onMouseEnter={() => {
                          if (itemIndex >= 0) {
                            setActiveIndex(itemIndex);
                          }
                        }}
                        role="option"
                        style={itemStyle(resolvedConfig.theme, isActive, item.disabled)}
                        type="button"
                      >
                        {renderItem ? renderItem(item, isActive) : <DefaultItem item={item} isActive={isActive} />}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))
          ) : (
            <div style={emptyStateStyle(resolvedConfig.theme)}>
              {resolvedConfig.messages.noResults}
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
          {item.subtitle ? <span style={itemSubtitleStyle}>{item.subtitle}</span> : null}
        </div>
      </div>
      {item.shortcut ? <span style={shortcutStyle}>{item.shortcut}</span> : null}
      {!item.shortcut && item.children?.length ? <span style={shortcutStyle}>Enter</span> : null}
    </>
  );
}

function matchesShortcut(event: globalThis.KeyboardEvent, shortcut: string): boolean {
  const tokens = shortcut.toLowerCase().split("+").map((token) => token.trim());
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

function prettyShortcut(shortcut: string): string {
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

function isTypingTarget(target: EventTarget | null): boolean {
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
    background: active ? "rgba(59, 130, 246, 0.25)" : "rgba(148, 163, 184, 0.12)"
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
