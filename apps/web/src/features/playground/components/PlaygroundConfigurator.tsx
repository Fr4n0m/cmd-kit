import React from "react";

import { Icon } from "@/components/icons/PlaygroundIcon";
import type { CommandTheme } from "@cmd-kit/core";
import type { PlaygroundConfig } from "@/features/playground/config";
import type { PlaygroundLabels } from "@/features/playground/ui";
import { PlaygroundBasicsForm } from "./PlaygroundBasicsForm";
import { PlaygroundSectionsPanel } from "./PlaygroundSectionsPanel";
import { PlaygroundThemeForm } from "./PlaygroundThemeForm";
import { ThemePillSwitch } from "./ThemePillSwitch";

interface PlaygroundConfiguratorProps {
  activeTheme: CommandTheme;
  config: PlaygroundConfig;
  labels: PlaygroundLabels;
  preview: React.ReactNode;
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
  activeTheme,
  config,
  labels,
  preview,
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
  const previewCardStyle: React.CSSProperties = {
    background: activeTheme.backgroundColor,
    borderColor: activeTheme.borderColor,
    borderRadius: activeTheme.radius,
    boxShadow: activeTheme.shadow,
    color: activeTheme.textColor
  };
  const subtitleStyle: React.CSSProperties = {
    color: activeTheme.descriptionColor ?? activeTheme.mutedColor
  };
  const summaryCards = [
    {
      icon: "core" as const,
      label: labels.summarySections,
      value: config.sections.length
    },
    {
      icon: "menu" as const,
      label: labels.summaryCommands,
      value: commandCount
    },
    {
      icon: "play" as const,
      label: labels.summaryRecents,
      value: config.recentsEnabled ? labels.recentsEnabled : labels.recentsDisabled
    }
  ];
  const previewHotspots = React.useMemo(
    () => [
      {
        id: "title",
        left: 10,
        top: 11,
        label: `${labels.basicsEyebrow}: ${labels.title}`
      },
      {
        id: "placeholder",
        left: 12,
        top: 22,
        label: `${labels.basicsEyebrow}: ${labels.placeholder}`
      },
      {
        id: "surface",
        left: 94,
        top: 10,
        label: `${labels.themeEyebrow}: ${labels.surface}`
      },
      {
        id: "section",
        left: 9,
        top: 34,
        label: `${labels.sections}: ${labels.sectionTitle}`
      },
      {
        id: "item-title",
        left: 18,
        top: 45,
        label: `${labels.sections}: ${labels.itemTitle}`
      },
      {
        id: "item-subtitle",
        left: 19,
        top: 50,
        label: `${labels.sections}: ${labels.itemSubtitle}`
      },
      {
        id: "shortcut",
        left: 90,
        top: 47,
        label: `${labels.sections}: ${labels.itemShortcut}`
      },
      {
        id: "accent",
        left: 94,
        top: 61,
        label: `${labels.themeEyebrow}: ${labels.accent}`
      }
    ],
    [labels]
  );

  return (
    <section className="panel configurator-panel">
      <div className="panel-heading panel-heading-with-tools">
        <div className="panel-heading-copy">
          <p className="eyebrow">{labels.config}</p>
          <h2>{labels.configuratorHeading}</h2>
          <p className="panel-copy">{labels.configuratorDescription}</p>
        </div>
        <div className="panel-heading-tools">
          <span className="visually-hidden">{labels.themePreviewModeField}</span>
          <ThemePillSwitch
            ariaLabel={labels.themePreviewModeField}
            buttonClassName="summary-theme-tab"
            iconClassName="summary-theme-icon summary-theme-icon-image"
            indicatorClassName="summary-theme-tabs-indicator"
            onChange={(nextMode) =>
              onUpdateConfig((current) => ({
                ...current,
                activeThemeMode: nextMode
              }))
            }
            options={[
              {
                iconSrc: "/icons/theme-sun.svg",
                label: labels.themeModeLight,
                value: "light"
              },
              {
                iconSrc: "/icons/theme-moon.svg",
                label: labels.themeModeDark,
                value: "dark"
              }
            ]}
            rootClassName="summary-theme-tabs"
            value={config.activeThemeMode}
          />
        </div>
      </div>

      <div className="playground-config-overview">
        <div className="playground-preview-card" style={previewCardStyle}>
          <h3 className="preview-heading" style={subtitleStyle}>
            {labels.preview}
          </h3>
          <div className="playground-live-preview-frame">
            <div className="playground-live-preview-shell">{preview}</div>
            <div className="playground-preview-hotspots" aria-hidden="true">
              {previewHotspots.map((hotspot) => (
                <span
                  className="playground-preview-hotspot"
                  key={hotspot.id}
                  style={
                    {
                      "--hotspot-left": `${hotspot.left}%`,
                      "--hotspot-top": `${hotspot.top}%`
                    } as React.CSSProperties
                  }
                >
                  <span className="playground-preview-hotspot-dot" />
                  <span className="playground-preview-hotspot-tooltip">
                    {hotspot.label}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="playground-summary-grid">
          {summaryCards.map((card) => (
            <article className="summary-tile" key={card.label}>
              <span><Icon className="summary-icon" name={card.icon} /> {card.label}</span>
              <strong>{card.value}</strong>
            </article>
          ))}
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

