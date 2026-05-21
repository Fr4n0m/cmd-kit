import React from "react";

import { CommandPalette } from "@cmd-kit/react";

import { getThemeForMode, toTheme } from "@/features/playground/config";
import { PlaygroundCodePanel } from "@/features/playground/components/PlaygroundCodePanel";
import { PlaygroundConfigurator } from "@/features/playground/components/PlaygroundConfigurator";
import { usePlaygroundState } from "@/features/playground/playground-state";
import { getPlaygroundCopy } from "@/features/playground/ui";
import type { Language } from "@/features/playground/config";

interface PlaygroundIslandProps {
  initialLanguage?: Language;
  mode?: "embedded" | "page";
}

const MOBILE_ACK_STORAGE_KEY = "cmd-kit:playground-mobile-ack";

export default function PlaygroundIsland({
  initialLanguage = "en",
  mode = "embedded"
}: PlaygroundIslandProps) {
  const {
    activeTab,
    addItemToNestedSection,
    addItemToSection,
    addNestedSection,
    addSectionToConfig,
    code,
    config,
    copyCode,
    isOpen,
    moveItem,
    moveNestedItem,
    moveSection,
    removeItem,
    removeNestedItem,
    removeNestedSection,
    removeSection,
    setActiveTab,
    setConfig,
    setIsOpen,
    updateItem,
    updateNestedItem,
    updateNestedSection,
    updateSection
  } = usePlaygroundState(initialLanguage);
  const { labels } = getPlaygroundCopy(config.language);
  const [isMobileViewport, setIsMobileViewport] = React.useState(false);
  const [hasMobileAcknowledge, setHasMobileAcknowledge] = React.useState(false);
  const isMobileBlocked =
    mode === "page" && isMobileViewport && !hasMobileAcknowledge;
  const asyncSource = React.useMemo(
    () =>
      config.sourceMode === "async"
        ? async () => {
            await new Promise((resolve) =>
              window.setTimeout(resolve, config.sourceDelayMs)
            );

            return {
              sections: config.sections
            };
          }
        : undefined,
    [config.sections, config.sourceDelayMs, config.sourceMode]
  );
  React.useEffect(() => {
    if (mode !== "page") {
      return;
    }

    const media = window.matchMedia("(max-width: 960px)");
    const syncViewport = () => {
      setIsMobileViewport(media.matches);
    };

    syncViewport();
    const storedAcknowledge =
      window.sessionStorage.getItem(MOBILE_ACK_STORAGE_KEY) === "1";
    setHasMobileAcknowledge(storedAcknowledge);

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", syncViewport);
      return () => media.removeEventListener("change", syncViewport);
    }

    media.addListener(syncViewport);
    return () => media.removeListener(syncViewport);
  }, [mode]);

  React.useEffect(() => {
    const updateThemeModeFromRoot = () => {
      const isLight = document.documentElement.dataset.theme === "light";
      const nextMode = isLight ? "light" : "dark";

      setConfig((current) =>
        current.activeThemeMode === nextMode
          ? current
          : {
              ...current,
              activeThemeMode: nextMode
            }
      );
    };

    updateThemeModeFromRoot();
    const observer = new MutationObserver(updateThemeModeFromRoot);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    return () => observer.disconnect();
  }, [setConfig]);
  const activeTheme = React.useMemo(
    () => getThemeForMode(config, config.activeThemeMode),
    [config]
  );
  const livePreviewPalette = React.useMemo(
    () => (
      <CommandPalette
        classNames={{
          caption: "playground-live-preview-caption",
          headerActions: "playground-live-preview-header-actions",
          overlay: "playground-live-preview-overlay",
          dialog: "playground-live-preview-dialog"
        }}
        defaultOpen={false}
        messages={{
          closeLabel: config.closeLabel,
          noResults: config.noResults,
          searchPlaceholder: config.placeholder
        }}
        open={true}
        recents={
          config.recentsEnabled
            ? {
                limit: config.recentsLimit,
                sectionTitle: config.recentsTitle
              }
            : false
        }
        sections={config.sourceMode === "static" ? config.sections : undefined}
        shortcut={config.shortcut}
        source={asyncSource}
        theme={toTheme(config)}
        title={config.title}
      />
    ),
    [asyncSource, config]
  );

  React.useEffect(() => {
    const root = document.getElementById("playground");
    if (!(root instanceof HTMLElement)) {
      return;
    }

    const detailsNodes = root.querySelectorAll<HTMLDetailsElement>(
      "details.config-accordion, details.section-accordion, details.item-accordion, details.nested-accordion"
    );
    const cleanups: Array<() => void> = [];

    for (const details of detailsNodes) {
      const summary = details.querySelector(":scope > summary");
      const body = details.querySelector<HTMLElement>(
        ":scope > .config-accordion-body, :scope > .editor-detail-body"
      );

      if (!(summary instanceof HTMLElement)) {
        continue;
      }

      let animation: Animation | null = null;
      let isClosing = false;
      let isExpanding = false;

      const onAnimationFinish = (open: boolean) => {
        details.open = open;
        animation = null;
        isClosing = false;
        isExpanding = false;
        details.style.height = "";
        details.style.overflow = "";
        if (body) {
          body.style.opacity = "";
          body.style.transform = "";
        }
      };

      const onAnimationCancel = () => {
        isClosing = false;
        isExpanding = false;
      };

      const close = () => {
        isClosing = true;
        const startHeight = `${details.offsetHeight}px`;
        const endHeight = `${summary.offsetHeight}px`;

        animation?.cancel();
        if (body) {
          body.animate(
            {
              opacity: [1, 0],
              transform: ["translateY(0)", "translateY(-4px)"]
            },
            {
              duration: 180,
              easing: "ease"
            }
          );
        }
        animation = details.animate(
          {
            height: [startHeight, endHeight]
          },
          {
            duration: 220,
            easing: "ease"
          }
        );
        animation.onfinish = () => onAnimationFinish(false);
        animation.oncancel = onAnimationCancel;
      };

      const expand = () => {
        isExpanding = true;
        const startHeight = `${details.offsetHeight}px`;
        details.open = true;
        const endHeight = `${details.offsetHeight}px`;

        animation?.cancel();
        if (body) {
          body.style.opacity = "0";
          body.style.transform = "translateY(-4px)";
          body.animate(
            {
              opacity: [0, 1],
              transform: ["translateY(-4px)", "translateY(0)"]
            },
            {
              duration: 200,
              easing: "ease-out",
              fill: "forwards"
            }
          );
        }
        animation = details.animate(
          {
            height: [startHeight, endHeight]
          },
          {
            duration: 220,
            easing: "ease"
          }
        );
        animation.onfinish = () => onAnimationFinish(true);
        animation.oncancel = onAnimationCancel;
      };

      const handleSummaryClick = (event: Event) => {
        event.preventDefault();
        details.style.overflow = "hidden";

        if (isClosing || !details.open) {
          expand();
        } else if (isExpanding || details.open) {
          close();
        }
      };

      summary.addEventListener("click", handleSummaryClick);
      cleanups.push(() => {
        summary.removeEventListener("click", handleSummaryClick);
        animation?.cancel();
      });
    }

    return () => {
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
  }, [config]);

  return (
    <section
      className={mode === "page" ? "playground-shell playground-shell-page" : "playground-shell"}
      id="playground"
    >
      <CommandPalette
        defaultOpen={config.defaultOpen}
        messages={{
          closeLabel: config.closeLabel,
          noResults: config.noResults,
          searchPlaceholder: config.placeholder
        }}
        onOpenChange={setIsOpen}
        open={isOpen}
        recents={
          config.recentsEnabled
            ? {
                limit: config.recentsLimit,
                sectionTitle: config.recentsTitle
              }
            : false
        }
        sections={config.sourceMode === "static" ? config.sections : undefined}
        shortcut={config.shortcut}
        source={asyncSource}
        theme={toTheme(config)}
        title={config.title}
      />

      {isMobileBlocked ? (
        <div
          aria-modal="true"
          className="playground-mobile-ack-overlay"
          role="dialog"
        >
          <div className="playground-mobile-ack-toast">
            <strong>{labels.mobileDesktopTitle}</strong>
            <p>{labels.mobileDesktopNotice}</p>
            <button
              className="primary-button"
              onClick={() => {
                setHasMobileAcknowledge(true);
                window.sessionStorage.setItem(MOBILE_ACK_STORAGE_KEY, "1");
              }}
              type="button"
            >
              {labels.mobileDesktopAcknowledge}
            </button>
          </div>
        </div>
      ) : null}

      <div className="workspace-grid">
        <PlaygroundConfigurator
          activeTheme={activeTheme}
          config={config}
          labels={labels}
          preview={livePreviewPalette}
          onAddItemToNestedSection={addItemToNestedSection}
          onAddItemToSection={addItemToSection}
          onAddNestedSection={addNestedSection}
          onAddSection={addSectionToConfig}
          onMoveItem={moveItem}
          onMoveNestedItem={moveNestedItem}
          onMoveSection={moveSection}
          onRemoveItem={removeItem}
          onRemoveNestedItem={removeNestedItem}
          onRemoveNestedSection={removeNestedSection}
          onRemoveSection={removeSection}
          onUpdateConfig={(updater) => setConfig(updater)}
          onUpdateItem={updateItem}
          onUpdateNestedItem={updateNestedItem}
          onUpdateNestedSectionTitle={(
            sectionId,
            itemId,
            childSectionId,
            title
          ) =>
            updateNestedSection(
              sectionId,
              itemId,
              childSectionId,
              (current) => ({
                ...current,
                title
              })
            )
          }
          onUpdateSection={updateSection}
        />

        <PlaygroundCodePanel
          activeTab={activeTab}
          code={code}
          labels={labels}
          onCopy={copyCode}
          onSelectTab={setActiveTab}
        />
      </div>

      {mode === "page" ? (
        <button
          aria-label={`${labels.launch} (${config.shortcut})`}
          className="primary-button playground-quick-preview"
          onClick={() => setIsOpen(true)}
          title={`${labels.launch} (${config.shortcut})`}
          type="button"
        >
          <span>{labels.launch}</span>
          <kbd>{config.shortcut}</kbd>
        </button>
      ) : null}
    </section>
  );
}

