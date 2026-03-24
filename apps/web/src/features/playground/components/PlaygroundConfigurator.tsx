import React from "react";

import { Icon } from "@/components/icons/PlaygroundIcon";
import type { PlaygroundConfig } from "@/features/playground/config";
import type { PlaygroundLabels } from "@/features/playground/ui";
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

function AccordionSection({
  children,
  defaultOpen = false,
  description,
  eyebrow,
  heading,
  step
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  description: string;
  eyebrow: string;
  heading: string;
  step: string;
}) {
  return (
    <details className="config-accordion" open={defaultOpen}>
      <summary className="config-accordion-summary">
        <div className="config-accordion-copy">
          <span className="config-accordion-step">{step}</span>
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h3>{heading}</h3>
            <p>{description}</p>
          </div>
        </div>
        <Icon className="config-accordion-icon" name="triangle-down" />
      </summary>
      <div className="config-accordion-body">{children}</div>
    </details>
  );
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
        <h2>{labels.configuratorHeading}</h2>
        <p className="panel-copy">{labels.configuratorDescription}</p>
      </div>

      <div className="playground-config-overview">
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
            <span><Icon className="summary-icon" name="core" /> {labels.summarySections}</span>
            <strong>{config.sections.length}</strong>
          </article>
          <article className="summary-tile">
            <span><Icon className="summary-icon" name="spark" /> {labels.summaryCommands}</span>
            <strong>{commandCount}</strong>
          </article>
          <article className="summary-tile">
            <span><Icon className="summary-icon" name="play" /> {labels.summaryRecents}</span>
            <strong>{config.recentsEnabled ? labels.recentsEnabled : labels.recentsDisabled}</strong>
          </article>
        </div>
      </div>

      <div className="config-accordion-stack">
        <AccordionSection
          defaultOpen
          description={labels.basicsDescription}
          eyebrow={labels.basicsEyebrow}
          heading={labels.basicsHeading}
          step="01"
        >
          <PlaygroundBasicsForm
            config={config}
            labels={labels}
            onUpdateConfig={onUpdateConfig}
          />
        </AccordionSection>

        <AccordionSection
          description={labels.themeDescription}
          eyebrow={labels.themeEyebrow}
          heading={labels.themeHeading}
          step="02"
        >
          <PlaygroundThemeForm
            config={config}
            labels={labels}
            onUpdateConfig={onUpdateConfig}
          />
        </AccordionSection>

        <AccordionSection
          description={labels.sectionsDescription}
          eyebrow={labels.sections}
          heading={labels.sectionsHeading}
          step="03"
        >
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
        </AccordionSection>
      </div>
    </section>
  );
}

