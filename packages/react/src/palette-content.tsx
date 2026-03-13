import type { CommandItem, CommandTheme } from "@cmd-kit/core";
import type { KeyboardEvent, ReactNode, RefObject } from "react";

import {
  captionStyle,
  closeButtonStyle,
  emptyStateStyle,
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
  titleStyle
} from "./palette-styles";
import type {
  CommandPaletteClassNames,
  CommandPaletteRenderContext,
  CommandPaletteRenderers
} from "./palette-types";

interface PaletteHeaderProps {
  activeTitle: string;
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
  return (
    <div className={classNames?.header} style={headerStyle}>
      <div>
        <p className={classNames?.title} id={titleId} style={titleStyle}>
          {renderers?.title ? renderers.title(renderContext) : activeTitle}
        </p>
        <p className={classNames?.caption} id={captionId} style={captionStyle}>
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
            onClick={onGoBack}
            style={closeButtonStyle(theme)}
            type="button"
          >
            Back
          </button>
        ) : null}
        <button
          aria-label={closeLabel}
          className={classNames?.closeButton}
          onClick={onClose}
          style={closeButtonStyle(theme)}
          type="button"
        >
          Esc
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
  return (
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
              style={sectionTitleStyle(theme)}
            >
              {renderers?.sectionTitle
                ? renderers.sectionTitle({ title: group.title })
                : group.title}
            </p>
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
                    onMouseEnter={() => {
                      if (itemIndex >= 0) {
                        onSetActiveIndex(itemIndex);
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
                      <DefaultItem item={item} isActive={isActive} />
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
