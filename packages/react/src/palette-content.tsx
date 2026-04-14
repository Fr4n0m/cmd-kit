import type { CommandItem, CommandTheme } from "@cmd-kit/core";
import type { KeyboardEvent, ReactNode, RefObject } from "react";
import { useEffect, useRef } from "react";

import {
  breadcrumbsStyle,
  backButtonStyle,
  captionStyle,
  closeButtonStyle,
  emptyStateStyle,
  getInteractiveThemeTokens,
  headerActionsStyle,
  headerStyle,
  iconStyle,
  inputStyle,
  itemLeadingStyle,
  itemStyle,
  itemSubtitleStyle,
  itemTitleStyle,
  listStyle,
  sectionItemsStyle,
  sectionStyle,
  sectionTitleStyle,
  shortcutStyle,
  titleStyle,
  titleRowStyle
} from "./palette-styles";
import type {
  CommandPaletteClassNames,
  CommandPaletteRenderContext,
  CommandPaletteRenderers
} from "./palette-types";

interface PaletteHeaderProps {
  activeTitle: string;
  breadcrumbs: string[];
  canGoBack: boolean;
  captionId: string;
  classNames?: CommandPaletteClassNames;
  closeLabel: string;
  onClose: () => void;
  onGoBack: () => void;
  renderContext: CommandPaletteRenderContext;
  renderers?: CommandPaletteRenderers;
  shortcut: string;
  theme: Required<CommandTheme>;
  titleId: string;
}

export function PaletteHeader({
  activeTitle,
  breadcrumbs,
  canGoBack,
  captionId,
  classNames,
  closeLabel,
  onClose,
  onGoBack,
  renderContext,
  renderers,
  shortcut,
  theme,
  titleId
}: PaletteHeaderProps) {
  const interactionTokens = getInteractiveThemeTokens(theme);

  return (
    <div className={classNames?.header} style={headerStyle}>
      <div>
        {breadcrumbs.length > 1 ? (
          <p className={classNames?.breadcrumbs} style={breadcrumbsStyle(theme)}>
            {breadcrumbs.join(" / ")}
          </p>
        ) : null}
        <p
          className={classNames?.title}
          id={titleId}
          style={{ ...titleStyle, color: theme.titleColor }}
        >
          {renderers?.title
            ? renderers.title(renderContext)
            : renderDefaultTitle(
                activeTitle,
                canGoBack,
                onGoBack,
                classNames,
                theme
              )}
        </p>
        <p className={classNames?.caption} id={captionId} style={captionStyle(theme)}>
          Press {prettyShortcut(shortcut)} to open or close.
        </p>
      </div>
      <div className={classNames?.headerActions} style={headerActionsStyle}>
        <button
          aria-label={closeLabel}
          className={classNames?.closeButton}
          onClick={onClose}
          onMouseEnter={(event) => {
            event.currentTarget.style.background =
              interactionTokens.closeHoverBackground;
            event.currentTarget.style.borderColor = interactionTokens.closeHoverBorder;
            event.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = interactionTokens.closeBackground;
            event.currentTarget.style.borderColor = interactionTokens.closeBorder;
            event.currentTarget.style.transform = "translateY(0)";
          }}
          style={closeButtonStyle(theme)}
          type="button"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            style={{ display: "block" }}
          >
            <path
              d="M4 4L12 12M12 4L4 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface PaletteInputProps {
  activeDescendant?: string;
  captionId: string;
  classNames?: CommandPaletteClassNames;
  inputId: string;
  inputRef: RefObject<HTMLInputElement | null>;
  listboxId: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  query: string;
  resolvedOpen: boolean;
  theme: Required<CommandTheme>;
}

export function PaletteInput({
  activeDescendant,
  captionId,
  classNames,
  inputId,
  inputRef,
  listboxId,
  onChange,
  onKeyDown,
  placeholder,
  query,
  resolvedOpen,
  theme
}: PaletteInputProps) {
  return (
    <input
      aria-activedescendant={activeDescendant}
      aria-autocomplete="list"
      aria-controls={listboxId}
      aria-describedby={captionId}
      aria-expanded={resolvedOpen}
      aria-label={placeholder}
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      className={classNames?.input}
      id={inputId}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      ref={inputRef}
      role="combobox"
      style={inputStyle(theme)}
      value={query}
    />
  );
}

interface PaletteResultsProps {
  activeTitle: string;
  activeIndex: number;
  classNames?: CommandPaletteClassNames;
  flatItems: CommandItem[];
  isLoading: boolean;
  listboxId: string;
  noResults: string;
  onRunItem: (item: CommandItem) => void;
  onSetActiveIndex: (index: number) => void;
  query: string;
  renderItem?: (item: CommandItem, active: boolean) => ReactNode;
  renderers?: CommandPaletteRenderers;
  snapshot: {
    groups: Array<{
      id: string;
      items: CommandItem[];
      title: string;
    }>;
  };
  theme: Required<CommandTheme>;
  titleId: string;
}

export function PaletteResults({
  activeTitle,
  activeIndex,
  classNames,
  flatItems,
  isLoading,
  listboxId,
  noResults,
  onRunItem,
  onSetActiveIndex,
  query,
  renderItem,
  renderers,
  snapshot,
  theme,
  titleId
}: PaletteResultsProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const updateMask = () => {
      const scrollable = list.scrollHeight > list.clientHeight + 1;
      const hasTop = list.scrollTop > 0;
      const hasBottom =
        list.scrollTop + list.clientHeight < list.scrollHeight - 1;

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

    updateMask();
    list.addEventListener("scroll", updateMask, { passive: true });
    window.addEventListener("resize", updateMask);
    return () => {
      list.removeEventListener("scroll", updateMask);
      window.removeEventListener("resize", updateMask);
    };
  }, [snapshot, query]);

  return (
    <>
      <style>{`#${listboxId}::-webkit-scrollbar{width:0;height:0}`}</style>
      <div
        aria-busy={isLoading}
        aria-labelledby={titleId}
        className={classNames?.list}
        id={listboxId}
        role="listbox"
        style={listStyle}
        ref={listRef}
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
            {!(snapshot.groups.length === 1 && group.title === activeTitle) ? (
              <p
                className={classNames?.sectionTitle}
                id={`${listboxId}-${group.id}-label`}
                style={sectionTitleStyle(theme)}
              >
                {renderers?.sectionTitle
                  ? renderers.sectionTitle({ title: group.title })
                  : group.title}
              </p>
            ) : null}
            <div className={classNames?.sectionItems} style={sectionItemsStyle}>
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
                    onClick={() => onRunItem(item)}
                    onMouseEnter={(event) => {
                      if (itemIndex >= 0) {
                        onSetActiveIndex(itemIndex);
                      }
                      const iconElement = event.currentTarget.querySelector(
                        "[data-cmdkit-icon]"
                      ) as HTMLElement | null;
                      const titleElement = event.currentTarget.querySelector(
                        "[data-cmdkit-title]"
                      ) as HTMLElement | null;
                      if (iconElement) {
                        iconElement.style.transform = "scale(1.08)";
                      }
                      if (titleElement) {
                        titleElement.style.transform = "scale(1.03)";
                      }
                    }}
                    onMouseLeave={(event) => {
                      const iconElement = event.currentTarget.querySelector(
                        "[data-cmdkit-icon]"
                      ) as HTMLElement | null;
                      const titleElement = event.currentTarget.querySelector(
                        "[data-cmdkit-title]"
                      ) as HTMLElement | null;
                      if (iconElement) {
                        iconElement.style.transform = "scale(1)";
                      }
                      if (titleElement) {
                        titleElement.style.transform = "scale(1)";
                      }
                    }}
                    role="option"
                    style={itemStyle(theme, isActive, item.disabled)}
                    type="button"
                  >
                    {renderItem ? (
                      renderItem(item, isActive)
                    ) : renderers?.item ? (
                      renderers.item(item, { active: isActive })
                    ) : (
                      <DefaultItem item={item} isActive={isActive} theme={theme} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          ))
        ) : (
          <div className={classNames?.emptyState} style={emptyStateStyle(theme)}>
            {renderers?.emptyState ? renderers.emptyState({ query }) : noResults}
          </div>
        )}
      </div>
    </>
  );
}

function DefaultItem({
  item,
  isActive,
  theme
}: {
  item: CommandItem;
  isActive: boolean;
  theme: Required<CommandTheme>;
}) {
  const hasCustomIcon =
    typeof item.icon === "string" && item.icon.trim().length > 0;
  const hasCustomSvgIcon =
    hasCustomIcon && isSvgMarkup(item.icon);
  const interactionTokens = getInteractiveThemeTokens(theme);
  const itemColor = isActive
    ? interactionTokens.itemTitleActiveColor
    : interactionTokens.itemTitleInactiveColor;

  return (
    <>
      <div style={itemLeadingStyle}>
        <span data-cmdkit-icon style={iconStyle(theme, isActive)}>
          {hasCustomSvgIcon ? (
            <span
              aria-hidden="true"
              // Icon markup is provided by app-level config. If it starts with
              // <svg>, render it as markup instead of literal text.
              dangerouslySetInnerHTML={{ __html: item.icon }}
            />
          ) : hasCustomIcon ? (
            item.icon
          ) : (
            <DefaultBrandIcon />
          )}
        </span>
        <div>
          <span
            data-cmdkit-title
            style={{ ...itemTitleStyle, color: itemColor }}
          >
            {item.title}
          </span>
          {item.subtitle ? (
            <span style={itemSubtitleStyle(theme)}>{item.subtitle}</span>
          ) : null}
        </div>
      </div>
      {item.shortcut ? (
        <span style={shortcutStyle(theme)}>{prettyShortcut(item.shortcut)}</span>
      ) : null}
      {!item.shortcut && item.children?.length ? (
        <span style={shortcutStyle(theme)}>Enter</span>
      ) : null}
    </>
  );
}

function prettyShortcut(shortcut: string): string {
  const tokens = shortcut
    .split("+")
    .map((token) => token.trim())
    .filter(Boolean);

  const formatToken = (token: string): string => {
    const normalized = token.toLowerCase();
    if (normalized === "mod") {
      if (typeof navigator === "undefined") {
        return "Mod";
      }
      return navigator.userAgent.includes("Mac") ? "Cmd" : "Ctrl";
    }

    if (normalized.length === 1) {
      return normalized.toUpperCase();
    }

    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  };

  if (typeof navigator === "undefined") {
    return tokens.map((token) => formatToken(token)).join(" + ");
  }

  return tokens.map((token) => formatToken(token)).join(" + ");
}

function isSvgMarkup(value: string): boolean {
  return value.trimStart().startsWith("<svg");
}

function renderDefaultTitle(
  activeTitle: string,
  canGoBack: boolean,
  onGoBack: () => void,
  classNames: CommandPaletteClassNames | undefined,
  theme: Required<CommandTheme>
) {
  return (
    <span style={titleRowStyle}>
      {canGoBack ? (
        <button
          aria-label="Go back"
          className={classNames?.backButton}
          onClick={onGoBack}
          onMouseEnter={(event) => {
            event.currentTarget.style.transform = "translateY(-1px)";
            event.currentTarget.style.color = theme.textColor;
            event.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.transform = "translateY(0)";
            event.currentTarget.style.color = theme.mutedColor;
            event.currentTarget.style.opacity = "0.9";
          }}
          style={backButtonStyle(theme)}
          title="Go back"
          type="button"
        >
          ←
        </button>
      ) : null}
      <span>{activeTitle}</span>
    </span>
  );
}

function DefaultBrandIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      style={{ display: "block" }}
    >
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <text
        x="12"
        y="14"
        textAnchor="middle"
        fill="currentColor"
        fontSize="7.2"
        fontWeight="700"
        fontFamily='Inter, "Segoe UI", system-ui, -apple-system, sans-serif'
      >
        Cmd
      </text>
    </svg>
  );
}

function joinClassNames(
  ...values: Array<string | undefined>
): string | undefined {
  const nextValue = values.filter(Boolean).join(" ");
  return nextValue || undefined;
}
