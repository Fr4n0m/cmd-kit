import React from "react";

import type { PlaygroundConfig } from "../config";
import type { PlaygroundLabels } from "../ui";
import { ColorField, Field } from "./Fields";
import { SectionEditor } from "./SectionEditor";

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

      <div className="form-grid">
        <Field label={labels.language}>
          <select
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                language: event.target.value as PlaygroundConfig["language"]
              }))
            }
            value={config.language}
          >
            <option value="en">English</option>
            <option value="es">Espanol</option>
          </select>
        </Field>

        <Field label={labels.layout}>
          <select
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                layout: event.target.value as PlaygroundConfig["layout"]
              }))
            }
            value={config.layout}
          >
            <option value="centered">{labels.centered}</option>
            <option value="wide">{labels.wide}</option>
          </select>
        </Field>

        <Field label={labels.title}>
          <input
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                title: event.target.value
              }))
            }
            value={config.title}
          />
        </Field>

        <Field label={labels.description}>
          <textarea
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                description: event.target.value
              }))
            }
            value={config.description}
          />
        </Field>

        <Field label={labels.placeholder}>
          <input
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                placeholder: event.target.value
              }))
            }
            value={config.placeholder}
          />
        </Field>

        <Field label={labels.noResults}>
          <input
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                noResults: event.target.value
              }))
            }
            value={config.noResults}
          />
        </Field>

        <Field label={labels.closeLabel}>
          <input
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                closeLabel: event.target.value
              }))
            }
            value={config.closeLabel}
          />
        </Field>

        <Field label={labels.shortcut}>
          <input
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                shortcut: event.target.value
              }))
            }
            value={config.shortcut}
          />
        </Field>

        <Field label={labels.recents}>
          <label className="toggle-field">
            <input
              checked={config.recentsEnabled}
              onChange={(event) =>
                onUpdateConfig((current) => ({
                  ...current,
                  recentsEnabled: event.target.checked
                }))
              }
              type="checkbox"
            />
            <span>{labels.recents}</span>
          </label>
        </Field>

        <Field label={labels.recentsTitle}>
          <input
            disabled={!config.recentsEnabled}
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                recentsTitle: event.target.value
              }))
            }
            value={config.recentsTitle}
          />
        </Field>

        <Field label={labels.recentsLimit}>
          <input
            disabled={!config.recentsEnabled}
            min={1}
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                recentsLimit: Number(event.target.value) || 1
              }))
            }
            type="number"
            value={config.recentsLimit}
          />
        </Field>
      </div>

      <div className="form-grid">
        <ColorField
          label={labels.accent}
          onChange={(value) =>
            onUpdateConfig((current) => ({
              ...current,
              accentColor: value
            }))
          }
          value={config.accentColor}
        />
        <ColorField
          label={labels.surface}
          onChange={(value) =>
            onUpdateConfig((current) => ({
              ...current,
              backgroundColor: value
            }))
          }
          value={config.backgroundColor}
        />
        <ColorField
          label={labels.text}
          onChange={(value) =>
            onUpdateConfig((current) => ({
              ...current,
              textColor: value
            }))
          }
          value={config.textColor}
        />
        <ColorField
          label={labels.border}
          onChange={(value) =>
            onUpdateConfig((current) => ({
              ...current,
              borderColor: value
            }))
          }
          value={config.borderColor}
        />

        <Field label={labels.muted}>
          <input
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                mutedColor: event.target.value
              }))
            }
            value={config.mutedColor}
          />
        </Field>
        <Field label={labels.overlay}>
          <input
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                overlayColor: event.target.value
              }))
            }
            value={config.overlayColor}
          />
        </Field>
        <Field label={labels.radius}>
          <input
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                radius: event.target.value
              }))
            }
            value={config.radius}
          />
        </Field>
        <Field label={labels.shadow}>
          <input
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                shadow: event.target.value
              }))
            }
            value={config.shadow}
          />
        </Field>
      </div>

      <div className="panel-heading">
        <p className="eyebrow">{labels.sections}</p>
        <button className="ghost-button" onClick={onAddSection} type="button">
          {labels.addSection}
        </button>
      </div>

      <div className="section-stack">
        {config.sections.map((section) => (
          <SectionEditor
            key={section.id}
            labels={labels}
            onAddItem={() => onAddItemToSection(section.id)}
            onAddNestedItem={(itemId, childSectionId) =>
              onAddItemToNestedSection(section.id, itemId, childSectionId)
            }
            onAddNestedSection={(itemId) =>
              onAddNestedSection(section.id, itemId)
            }
            onRemove={() => onRemoveSection(section.id)}
            onRemoveItem={(itemId) => onRemoveItem(section.id, itemId)}
            onRemoveNestedItem={(itemId, childSectionId, nestedItemId) =>
              onRemoveNestedItem(
                section.id,
                itemId,
                childSectionId,
                nestedItemId
              )
            }
            onRemoveNestedSection={(itemId, childSectionId) =>
              onRemoveNestedSection(section.id, itemId, childSectionId)
            }
            onUpdateItem={(itemId, updater) =>
              onUpdateItem(section.id, itemId, updater)
            }
            onUpdateNestedItem={(
              itemId,
              childSectionId,
              nestedItemId,
              updater
            ) =>
              onUpdateNestedItem(
                section.id,
                itemId,
                childSectionId,
                nestedItemId,
                updater
              )
            }
            onUpdateNestedSectionTitle={(itemId, childSectionId, title) =>
              onUpdateNestedSectionTitle(
                section.id,
                itemId,
                childSectionId,
                title
              )
            }
            onUpdateTitle={(title) =>
              onUpdateSection(section.id, (current) => ({
                ...current,
                title
              }))
            }
            section={section}
          />
        ))}
      </div>
    </section>
  );
}
