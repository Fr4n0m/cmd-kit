import React from "react";

import { Icon } from "@/components/icons/PlaygroundIcon";
import type { CommandItem, CommandSection } from "@cmd-kit/core";

import type { PlaygroundConfig } from "@/features/playground/config";
import type { PlaygroundLabels } from "@/features/playground/ui";
import { Field } from "./Fields";

interface NestedSectionEditorProps {
  childSection: CommandSection;
  language: PlaygroundConfig["language"];
  labels: PlaygroundLabels;
  onAddNestedItem: () => void;
  onMoveNestedItem: (
    nestedItemId: string,
    direction: "up" | "down"
  ) => void;
  onRemove: () => void;
  onRemoveNestedItem: (nestedItemId: string) => void;
  onUpdateNestedItem: (
    nestedItemId: string,
    updater: (item: CommandItem) => CommandItem
  ) => void;
  onUpdateSectionTitle: (title: string) => void;
}

function ItemFields({
  help,
  item,
  labels,
  onUpdate
}: {
  help: ReturnType<typeof getSectionsHelp>;
  item: CommandItem;
  labels: PlaygroundLabels;
  onUpdate: (updater: (item: CommandItem) => CommandItem) => void;
}) {
  return (
    <div className="item-grid">
      <Field anchor="item-title" helpText={help.itemTitle} label={labels.itemTitle}>
        <input
          onChange={(event) =>
            onUpdate((current) => ({
              ...current,
              title: event.target.value
            }))
          }
          value={item.title}
        />
      </Field>
      <Field helpText={help.itemIcon} label={labels.itemIcon}>
        <input
          onChange={(event) =>
            onUpdate((current) => ({
              ...current,
              icon: event.target.value
            }))
          }
          value={item.icon ?? ""}
        />
      </Field>
      <Field anchor="item-subtitle" helpText={help.itemSubtitle} label={labels.itemSubtitle}>
        <input
          onChange={(event) =>
            onUpdate((current) => ({
              ...current,
              subtitle: event.target.value
            }))
          }
          value={item.subtitle ?? ""}
        />
      </Field>
      <Field anchor="shortcut" helpText={help.itemShortcut} label={labels.itemShortcut}>
        <input
          onChange={(event) =>
            onUpdate((current) => ({
              ...current,
              shortcut: event.target.value
            }))
          }
          value={item.shortcut ?? ""}
        />
      </Field>
      <Field helpText={help.itemHref} label={labels.itemHref}>
        <input
          onChange={(event) =>
            onUpdate((current) => ({
              ...current,
              href: event.target.value
            }))
          }
          value={item.href ?? ""}
        />
      </Field>
      <Field helpText={help.itemKeywords} label={labels.itemKeywords}>
        <input
          onChange={(event) =>
            onUpdate((current) => ({
              ...current,
              keywords: event.target.value
                .split(",")
                .map((entry) => entry.trim())
                .filter(Boolean)
            }))
          }
          value={(item.keywords ?? []).join(", ")}
        />
      </Field>
    </div>
  );
}

export function NestedSectionEditor({
  childSection,
  language,
  labels,
  onAddNestedItem,
  onMoveNestedItem,
  onRemove,
  onRemoveNestedItem,
  onUpdateNestedItem,
  onUpdateSectionTitle
}: NestedSectionEditorProps) {
  const help = getSectionsHelp(language);

  return (
    <details className="nested-card nested-accordion">
      <summary className="editor-summary">
        <div className="editor-summary-copy">
          <strong>{childSection.title}</strong>
          <span>{childSection.items.length} {labels.summaryCommands}</span>
        </div>
        <Icon className="editor-summary-icon" name="triangle-down" />
      </summary>
      <div className="editor-detail-body">
        <div className="editor-topbar">
          <Field helpText={help.nestedSectionTitle} label={labels.nestedSectionTitle}>
            <input
              onChange={(event) => onUpdateSectionTitle(event.target.value)}
              value={childSection.title}
            />
          </Field>
          <div className="editor-actions">
            <button className="inline-button" onClick={onRemove} type="button">
              <Icon className="button-icon" name="trash" />
              <span>{labels.remove}</span>
            </button>
          </div>
        </div>
        <div className="section-items">
          {childSection.items.map((nestedItem, nestedIndex) => (
            <details className="item-card item-accordion" key={nestedItem.id} open={nestedIndex === 0}>
              <summary className="editor-summary">
                <div className="editor-summary-copy">
                  <strong>{nestedItem.title}</strong>
                  <span>{nestedItem.subtitle ?? nestedItem.id}</span>
                </div>
                <div className="editor-summary-meta">
                  {nestedItem.disabled ? (
                    <span className="accordion-meta-pill">{labels.itemDisabled}</span>
                  ) : null}
                  <Icon className="editor-summary-icon" name="triangle-down" />
                </div>
              </summary>
              <div className="editor-detail-body">
                <ItemFields
                  help={help}
                  item={nestedItem}
                  labels={labels}
                  onUpdate={(updater) => onUpdateNestedItem(nestedItem.id, updater)}
                />
                <div className="item-footer">
                  <div className="editor-actions">
                    <button
                      className="inline-button"
                      onClick={() => onMoveNestedItem(nestedItem.id, "up")}
                      type="button"
                    >
                      <Icon className="button-icon" name="triangle-up" />
                      <span>{labels.moveUp}</span>
                    </button>
                    <button
                      className="inline-button"
                      onClick={() => onMoveNestedItem(nestedItem.id, "down")}
                      type="button"
                    >
                      <Icon className="button-icon" name="triangle-down" />
                      <span>{labels.moveDown}</span>
                    </button>
                  </div>
                  <label className="toggle-field">
                    <input
                      checked={nestedItem.disabled ?? false}
                      onChange={(event) =>
                        onUpdateNestedItem(nestedItem.id, (current) => ({
                          ...current,
                          disabled: event.target.checked
                        }))
                      }
                      type="checkbox"
                    />
                    <span>{labels.itemDisabled}</span>
                  </label>
                  <button
                    className="inline-button"
                    onClick={() => onRemoveNestedItem(nestedItem.id)}
                    type="button"
                  >
                    <Icon className="button-icon" name="trash" />
                    <span>{labels.remove}</span>
                  </button>
                </div>
              </div>
            </details>
          ))}
        </div>
        <button
          className="ghost-button full-width"
          onClick={onAddNestedItem}
          type="button"
        >
          <Icon className="button-icon" name="plus" />
          <span>{labels.addNestedItem}</span>
        </button>
      </div>
    </details>
  );
}

interface SectionEditorProps {
  language: PlaygroundConfig["language"];
  labels: PlaygroundLabels;
  onAddItem: () => void;
  onMoveDown: () => void;
  onMoveItem: (itemId: string, direction: "up" | "down") => void;
  onMoveNestedItem: (
    itemId: string,
    childSectionId: string,
    nestedItemId: string,
    direction: "up" | "down"
  ) => void;
  onMoveUp: () => void;
  onAddNestedSection: (itemId: string) => void;
  onAddNestedItem: (itemId: string, childSectionId: string) => void;
  onRemove: () => void;
  onRemoveItem: (itemId: string) => void;
  onRemoveNestedItem: (
    itemId: string,
    childSectionId: string,
    nestedItemId: string
  ) => void;
  onRemoveNestedSection: (itemId: string, childSectionId: string) => void;
  onUpdateItem: (
    itemId: string,
    updater: (item: CommandItem) => CommandItem
  ) => void;
  onUpdateNestedItem: (
    itemId: string,
    childSectionId: string,
    nestedItemId: string,
    updater: (item: CommandItem) => CommandItem
  ) => void;
  onUpdateNestedSectionTitle: (
    itemId: string,
    childSectionId: string,
    title: string
  ) => void;
  onUpdateTitle: (title: string) => void;
  section: PlaygroundConfig["sections"][number];
  defaultOpen?: boolean;
}

export function SectionEditor({
  language,
  labels,
  onAddItem,
  onMoveDown,
  onMoveItem,
  onMoveNestedItem,
  onMoveUp,
  onAddNestedItem,
  onAddNestedSection,
  onRemove,
  onRemoveItem,
  onRemoveNestedItem,
  onRemoveNestedSection,
  onUpdateItem,
  onUpdateNestedItem,
  onUpdateNestedSectionTitle,
  onUpdateTitle,
  section,
  defaultOpen = false
}: SectionEditorProps) {
  const help = getSectionsHelp(language);

  return (
    <details className="section-card section-accordion" open={defaultOpen}>
      <summary className="editor-summary">
        <div className="editor-summary-copy">
          <strong>{section.title}</strong>
          <span>{section.items.length} {labels.summaryCommands}</span>
        </div>
        <Icon className="editor-summary-icon" name="triangle-down" />
      </summary>
      <div className="editor-detail-body">
        <div className="editor-topbar">
          <Field anchor="section" helpText={help.sectionTitle} label={labels.sectionTitle}>
            <input
              onChange={(event) => onUpdateTitle(event.target.value)}
              value={section.title}
            />
          </Field>
          <div className="editor-actions">
            <button className="inline-button" onClick={onMoveUp} type="button">
              <Icon className="button-icon" name="triangle-up" />
              <span>{labels.moveUp}</span>
            </button>
            <button className="inline-button" onClick={onMoveDown} type="button">
              <Icon className="button-icon" name="triangle-down" />
              <span>{labels.moveDown}</span>
            </button>
            <button className="inline-button" onClick={onRemove} type="button">
              <Icon className="button-icon" name="trash" />
              <span>{labels.remove}</span>
            </button>
          </div>
        </div>
        <div className="section-items">
          {section.items.map((item, itemIndex) => (
            <details className="item-card item-accordion" key={item.id} open={itemIndex === 0}>
              <summary className="editor-summary">
                <div className="editor-summary-copy">
                  <strong>{item.title}</strong>
                  <span>{item.subtitle ?? item.id}</span>
                </div>
                <div className="editor-summary-meta">
                  {item.disabled ? (
                    <span className="accordion-meta-pill">{labels.itemDisabled}</span>
                  ) : null}
                  <Icon className="editor-summary-icon" name="triangle-down" />
                </div>
              </summary>
              <div className="editor-detail-body">
                <ItemFields
                  help={help}
                  item={item}
                  labels={labels}
                  onUpdate={(updater) => onUpdateItem(item.id, updater)}
                />
                <div className="item-footer">
                  <div className="editor-actions">
                    <button
                      className="inline-button"
                      onClick={() => onMoveItem(item.id, "up")}
                      type="button"
                    >
                      <Icon className="button-icon" name="triangle-up" />
                      <span>{labels.moveUp}</span>
                    </button>
                    <button
                      className="inline-button"
                      onClick={() => onMoveItem(item.id, "down")}
                      type="button"
                    >
                      <Icon className="button-icon" name="triangle-down" />
                      <span>{labels.moveDown}</span>
                    </button>
                  </div>
                  <label className="toggle-field">
                    <input
                      checked={item.disabled ?? false}
                      onChange={(event) =>
                        onUpdateItem(item.id, (current) => ({
                          ...current,
                          disabled: event.target.checked
                        }))
                      }
                      type="checkbox"
                    />
                    <span>{labels.itemDisabled}</span>
                  </label>
                  <button
                    className="inline-button"
                    onClick={() => onRemoveItem(item.id)}
                    type="button"
                  >
                    <Icon className="button-icon" name="trash" />
                    <span>{labels.remove}</span>
                  </button>
                </div>
                <div className="nested-builder">
                  <div className="row-between">
                    <span className="item-meta">{labels.nested}</span>
                    <button
                      className="inline-button"
                      onClick={() => onAddNestedSection(item.id)}
                      type="button"
                    >
                      <Icon className="button-icon" name="plus" />
                      <span>{labels.addNestedSection}</span>
                    </button>
                  </div>
                  {(item.children ?? []).map((childSection) => (
                    <NestedSectionEditor
                      childSection={childSection}
                      key={childSection.id}
                      language={language}
                      labels={labels}
                      onAddNestedItem={() =>
                        onAddNestedItem(item.id, childSection.id)
                      }
                      onMoveNestedItem={(nestedItemId, direction) =>
                        onMoveNestedItem(
                          item.id,
                          childSection.id,
                          nestedItemId,
                          direction
                        )
                      }
                      onRemove={() =>
                        onRemoveNestedSection(item.id, childSection.id)
                      }
                      onRemoveNestedItem={(nestedItemId) =>
                        onRemoveNestedItem(item.id, childSection.id, nestedItemId)
                      }
                      onUpdateNestedItem={(nestedItemId, updater) =>
                        onUpdateNestedItem(
                          item.id,
                          childSection.id,
                          nestedItemId,
                          updater
                        )
                      }
                      onUpdateSectionTitle={(title) =>
                        onUpdateNestedSectionTitle(item.id, childSection.id, title)
                      }
                    />
                  ))}
                </div>
                <div className="item-meta">{item.id}</div>
              </div>
            </details>
          ))}
        </div>
        <button
          className="ghost-button full-width"
          onClick={onAddItem}
          type="button"
        >
          <Icon className="button-icon" name="plus" />
          <span>{labels.addItem}</span>
        </button>
      </div>
    </details>
  );
}

function getSectionsHelp(language: PlaygroundConfig["language"]) {
  if (language === "es") {
    return {
      itemHref: "Ruta o URL a la que navegar cuando se ejecuta este comando.",
      itemIcon: "Icono del comando. Puedes usar emoji o SVG inline.",
      itemKeywords: "Palabras clave separadas por comas para mejorar la búsqueda.",
      itemShortcut: "Atajo específico para este comando dentro de la paleta.",
      itemSubtitle: "Texto secundario que describe la acción del comando.",
      itemTitle: "Nombre principal del comando en la lista.",
      nestedSectionTitle: "Título del grupo anidado que se abre desde este comando.",
      sectionTitle: "Nombre visible de la sección principal de comandos."
    };
  }

  return {
    itemHref: "Path or URL to navigate to when this command runs.",
    itemIcon: "Command icon. You can use emoji or inline SVG markup.",
    itemKeywords: "Search keywords separated by commas for better matching.",
    itemShortcut: "Item-specific shortcut available inside the palette.",
    itemSubtitle: "Secondary line that describes what this command does.",
    itemTitle: "Main command label shown in the command list.",
    nestedSectionTitle: "Title of the nested group opened by this command.",
    sectionTitle: "Visible name for the top-level command section."
  };
}

