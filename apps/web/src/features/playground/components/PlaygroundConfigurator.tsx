import React from "react";

import type { PlaygroundConfig } from "../config";
import type { PlaygroundLabels } from "../ui";
import { PlaygroundBasicsForm } from "./PlaygroundBasicsForm";
import { PlaygroundSectionsPanel } from "./PlaygroundSectionsPanel";
import { PlaygroundThemeForm } from "./PlaygroundThemeForm";

interface PlaygroundConfiguratorProps {
  config: PlaygroundConfig;
  labels: PlaygroundLabels;
  onAddItemToNestedSection: (
    sectionId: string,
    itemId: string,
    childSectionId: string
  ) => void;
  onAddItemToSection: (sectionId: string) => void;
  onAddNestedSection: (sectionId: string, itemId: string) => void;
  onAddSection: () => void;
  onMoveItem: (
    sectionId: string,
    itemId: string,
    direction: "up" | "down"
  ) => void;
  onMoveNestedItem: (
    sectionId: string,
    itemId: string,
    childSectionId: string,
    nestedItemId: string,
    direction: "up" | "down"
  ) => void;
  onMoveSection: (sectionId: string, direction: "up" | "down") => void;
  onRemoveItem: (sectionId: string, itemId: string) => void;
  onRemoveNestedItem: (
    sectionId: string,
    itemId: string,
    childSectionId: string,
    nestedItemId: string
  ) => void;
  onRemoveNestedSection: (
    sectionId: string,
    itemId: string,
    childSectionId: string
  ) => void;
  onRemoveSection: (sectionId: string) => void;
  onUpdateConfig: (
    updater: (current: PlaygroundConfig) => PlaygroundConfig
  ) => void;
  onUpdateItem: (
    sectionId: string,
    itemId: string,
    updater: (
      item: PlaygroundConfig["sections"][number]["items"][number]
    ) => PlaygroundConfig["sections"][number]["items"][number]
  ) => void;
  onUpdateNestedItem: (
    sectionId: string,
    itemId: string,
    childSectionId: string,
    nestedItemId: string,
    updater: (
      item: PlaygroundConfig["sections"][number]["items"][number]
    ) => PlaygroundConfig["sections"][number]["items"][number]
  ) => void;
  onUpdateNestedSectionTitle: (
    sectionId: string,
    itemId: string,
    childSectionId: string,
    title: string
  ) => void;
  onUpdateSection: (
    sectionId: string,
    updater: (
      section: PlaygroundConfig["sections"][number]
    ) => PlaygroundConfig["sections"][number]
  ) => void;
}

export function PlaygroundConfigurator({
  config,
  labels,
  onAddItemToNestedSection,
  onAddItemToSection,
  onAddNestedSection,
  onAddSection,
  onMoveItem,
  onMoveNestedItem,
  onMoveSection,
  onRemoveItem,
  onRemoveNestedItem,
  onRemoveNestedSection,
  onRemoveSection,
  onUpdateConfig,
  onUpdateItem,
  onUpdateNestedItem,
  onUpdateNestedSectionTitle,
  onUpdateSection
}: PlaygroundConfiguratorProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <p className="eyebrow">{labels.config}</p>
        <h2>cmd+kit</h2>
      </div>

      <div className="playground-preview-card">
        <span className="preview-shortcut">{config.shortcut}</span>
        <span className="preview-title">{config.title}</span>
        <span className="preview-subtitle">{config.placeholder}</span>
      </div>

      <PlaygroundBasicsForm
        config={config}
        labels={labels}
        onUpdateConfig={onUpdateConfig}
      />

      <PlaygroundThemeForm
        config={config}
        labels={labels}
        onUpdateConfig={onUpdateConfig}
      />

      <PlaygroundSectionsPanel
        config={config}
        labels={labels}
        onAddItemToNestedSection={onAddItemToNestedSection}
        onAddItemToSection={onAddItemToSection}
        onAddNestedSection={onAddNestedSection}
        onAddSection={onAddSection}
        onMoveItem={onMoveItem}
        onMoveNestedItem={onMoveNestedItem}
        onMoveSection={onMoveSection}
        onRemoveItem={onRemoveItem}
        onRemoveNestedItem={onRemoveNestedItem}
        onRemoveNestedSection={onRemoveNestedSection}
        onRemoveSection={onRemoveSection}
        onUpdateItem={onUpdateItem}
        onUpdateNestedItem={onUpdateNestedItem}
        onUpdateNestedSectionTitle={onUpdateNestedSectionTitle}
        onUpdateSection={onUpdateSection}
      />
    </section>
  );
}
