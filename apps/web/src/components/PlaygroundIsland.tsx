import React from "react";

import { CommandPalette } from "@cmd-kit/react";

import { toTheme } from "../features/playground/config";
import { PlaygroundCodePanel } from "../features/playground/components/PlaygroundCodePanel";
import { PlaygroundConfigurator } from "../features/playground/components/PlaygroundConfigurator";
import { PlaygroundHeader } from "../features/playground/components/PlaygroundHeader";
import { usePlaygroundState } from "../features/playground/playground-state";
import { playgroundLabels } from "../features/playground/ui";

export default function PlaygroundIsland() {
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
  } = usePlaygroundState();
  const labels = playgroundLabels[config.language];

  return (
    <section className="playground-shell" id="playground">
      <CommandPalette
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
        sections={config.sections}
        shortcut={config.shortcut}
        theme={toTheme(config)}
        title="cmd+kit preview"
      />

      <PlaygroundHeader
        labels={labels}
        language={config.language}
        onLaunch={() => setIsOpen(true)}
        onToggleLanguage={() =>
          setConfig((current) => ({
            ...current,
            language: current.language === "en" ? "es" : "en"
          }))
        }
      />

      <div className="workspace-grid">
        <PlaygroundConfigurator
          config={config}
          labels={labels}
          onAddItemToNestedSection={addItemToNestedSection}
          onAddItemToSection={addItemToSection}
          onAddNestedSection={addNestedSection}
          onAddSection={addSectionToConfig}
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
          onCopy={() => void copyCode()}
          onSelectTab={setActiveTab}
        />
      </div>
    </section>
  );
}
