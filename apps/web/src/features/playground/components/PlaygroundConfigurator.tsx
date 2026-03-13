import React from "react";

import { Icon } from "../../../components/Icon";
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
  const commandCount = config.sections.reduce(
    (total, section) => total + section.items.length,
    0
  );

  return (
    <section className="panel configurator-panel">
      <div className="panel-heading">
        <p className="eyebrow">{labels.config}</p>
        <h2>Command surface</h2>
        <p className="panel-copy">
          Tune the visible product layer first, then export the code that matches it.
        </p>
      </div>

      <div className="playground-preview-card">
        <div className="preview-meta-row">
          <span className="preview-shortcut">{config.shortcut}</span>
          <span className="preview-layout">{config.layout}</span>
        </div>
        <span className="preview-title">{config.title}</span>
        <span className="preview-subtitle">{config.placeholder}</span>
      </div>

      <div className="playground-summary-grid">
        <article className="summary-tile">
          <span><Icon className="summary-icon" name="core" /> Sections</span>
          <strong>{config.sections.length}</strong>
        </article>
        <article className="summary-tile">
          <span><Icon className="summary-icon" name="spark" /> Commands</span>
          <strong>{commandCount}</strong>
        </article>
        <article className="summary-tile">
          <span><Icon className="summary-icon" name="play" /> Recents</span>
          <strong>{config.recentsEnabled ? "On" : "Off"}</strong>
        </article>
      </div>

      <div className="panel-section panel-section-accent">
        <div className="panel-section-heading">
          <span className="eyebrow">Basics</span>
          <h3>Message and behavior</h3>
        </div>
        <PlaygroundBasicsForm
          config={config}
          labels={labels}
          onUpdateConfig={onUpdateConfig}
        />
      </div>

      <div className="panel-section panel-section-accent">
        <div className="panel-section-heading">
          <span className="eyebrow">Theme</span>
          <h3>Palette and feel</h3>
        </div>
        <PlaygroundThemeForm
          config={config}
          labels={labels}
          onUpdateConfig={onUpdateConfig}
        />
      </div>

      <div className="panel-section panel-section-accent">
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
      </div>
    </section>
  );
}
