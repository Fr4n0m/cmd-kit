import type { CommandItem } from "@cmd-kit/core";
import {
  type KeyboardEvent,
  type RefObject,
  useEffect,
  useId,
  useRef
} from "preact/compat";

import { PaletteHeader, PaletteInput, PaletteResults } from "./palette-content";
import { overlayStyle, paletteStyle } from "./palette-styles";
import type {
  CommandPaletteProps,
  CommandPaletteRenderContext
} from "./palette-types";
import { useCommandPalette } from "./use-command-palette";

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
  const inputRef = useRef<HTMLInputElement | null>(null);
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

  usePaletteInputFocus(resolvedOpen, inputRef);
  const renderContext: CommandPaletteRenderContext = {
    activeTitle,
    canGoBack,
    close: () => setOpenState(false),
    goBack,
    shortcut
  };

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
        onKeyDown={createDialogKeyDownHandler(dialogRef)}
        ref={dialogRef}
        role="dialog"
        style={paletteStyle(resolvedConfig.theme)}
      >
        <PaletteHeader
          activeTitle={activeTitle}
          canGoBack={canGoBack}
          captionId={captionId}
          classNames={classNames}
          closeLabel={resolvedConfig.messages.closeLabel}
          onClose={() => setOpenState(false)}
          onGoBack={goBack}
          renderContext={renderContext}
          renderers={renderers}
          shortcut={shortcut}
          theme={resolvedConfig.theme}
          titleId={titleId}
        />

        <PaletteInput
          activeDescendant={getActiveDescendant(
            listboxId,
            flatItems,
            activeIndex
          )}
          captionId={captionId}
          classNames={classNames}
          inputId={inputId}
          inputRef={inputRef}
          listboxId={listboxId}
          onChange={setQuery}
          onKeyDown={createInputKeyDownHandler({
            activeIndex,
            canGoBack,
            flatItems,
            goBack,
            moveNext,
            movePrevious,
            query,
            runItem,
            setOpenState
          })}
          placeholder={resolvedConfig.messages.searchPlaceholder}
          query={query}
          resolvedOpen={resolvedOpen}
          theme={resolvedConfig.theme}
        />

        <PaletteResults
          activeIndex={activeIndex}
          classNames={classNames}
          flatItems={flatItems}
          isLoading={isLoading}
          listboxId={listboxId}
          noResults={resolvedConfig.messages.noResults}
          onRunItem={(item) => void runItem(item)}
          onSetActiveIndex={setActiveIndex}
          query={query}
          renderItem={renderItem}
          renderers={renderers}
          snapshot={snapshot}
          theme={resolvedConfig.theme}
          titleId={titleId}
        />
      </div>
    </div>
  );
}

function usePaletteInputFocus(
  resolvedOpen: boolean,
  inputRef: RefObject<HTMLInputElement | null>
) {
  useEffect(() => {
    if (!resolvedOpen) {
      return;
    }

    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [resolvedOpen, inputRef]);
}

function createInputKeyDownHandler({
  activeIndex,
  canGoBack,
  flatItems,
  goBack,
  moveNext,
  movePrevious,
  query,
  runItem,
  setOpenState
}: {
  activeIndex: number;
  canGoBack: boolean;
  flatItems: CommandItem[];
  goBack: () => void;
  moveNext: () => void;
  movePrevious: () => void;
  query: string;
  runItem: (item: CommandItem | undefined) => Promise<void>;
  setOpenState: (open: boolean) => void;
}) {
  return (event: KeyboardEvent<HTMLInputElement>) => {
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
  };
}

function createDialogKeyDownHandler(
  dialogRef: RefObject<HTMLDivElement | null>
) {
  return (event: KeyboardEvent<HTMLDivElement>) => {
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
  };
}

function getActiveDescendant(
  listboxId: string,
  flatItems: CommandItem[],
  activeIndex: number
) {
  return flatItems[activeIndex]
    ? `${listboxId}-${flatItems[activeIndex].id}`
    : undefined;
}

function joinClassNames(
  ...values: Array<string | undefined>
): string | undefined {
  const nextValue = values.filter(Boolean).join(" ");
  return nextValue || undefined;
}
