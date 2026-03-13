import React from "react";

import type { CommandItem, CommandSection } from "@cmd-kit/react";

import type { PlaygroundConfig } from "../config";
import type { PlaygroundLabels } from "../ui";
import { Field } from "./Fields";

interface NestedSectionEditorProps {
  childSection: CommandSection;
  itemId: string;
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
  sectionId: string;
}

function ItemFields({
  item,
  labels,
  onUpdate
}: {
  item: CommandItem;
  labels: PlaygroundLabels;
  onUpdate: (updater: (item: CommandItem) => CommandItem) => void;
}) {
  return (
    <div className="item-grid">
      <Field label={labels.itemTitle}>
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
      <Field label={labels.itemIcon}>
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
      <Field label={labels.itemSubtitle}>
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
      <Field label={labels.itemShortcut}>
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
      <Field label={labels.itemHref}>
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
      <Field label={labels.itemKeywords}>
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
  labels,
  onAddNestedItem,
  onMoveNestedItem,
  onRemove,
  onRemoveNestedItem,
  onUpdateNestedItem,
  onUpdateSectionTitle
}: NestedSectionEditorProps) {
  return (
    <div className="nested-card">
      <div className="editor-topbar">
        <Field label={labels.nestedSectionTitle}>
          <input
            onChange={(event) => onUpdateSectionTitle(event.target.value)}
            value={childSection.title}
          />
        </Field>
        <div className="editor-actions">
          <button className="inline-button" onClick={onRemove} type="button">
            {labels.remove}
          </button>
        </div>
      </div>
      <div className="section-items">
        {childSection.items.map((nestedItem) => (
          <div className="item-card" key={nestedItem.id}>
            <ItemFields
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
                  {labels.moveUp}
                </button>
                <button
                  className="inline-button"
                  onClick={() => onMoveNestedItem(nestedItem.id, "down")}
                  type="button"
                >
                  {labels.moveDown}
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
                {labels.remove}
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="ghost-button full-width"
        onClick={onAddNestedItem}
        type="button"
      >
        {labels.addNestedItem}
      </button>
    </div>
  );
}

interface SectionEditorProps {
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
}

export function SectionEditor({
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
  section
}: SectionEditorProps) {
  return (
    <div className="section-card">
      <div className="editor-topbar">
        <Field label={labels.sectionTitle}>
          <input
            onChange={(event) => onUpdateTitle(event.target.value)}
            value={section.title}
          />
        </Field>
        <div className="editor-actions">
          <button className="inline-button" onClick={onMoveUp} type="button">
            {labels.moveUp}
          </button>
          <button className="inline-button" onClick={onMoveDown} type="button">
            {labels.moveDown}
          </button>
          <button className="inline-button" onClick={onRemove} type="button">
            {labels.remove}
          </button>
        </div>
      </div>
      <div className="section-items">
        {section.items.map((item) => (
          <div className="item-card" key={item.id}>
            <ItemFields
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
                  {labels.moveUp}
                </button>
                <button
                  className="inline-button"
                  onClick={() => onMoveItem(item.id, "down")}
                  type="button"
                >
                  {labels.moveDown}
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
                {labels.remove}
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
                  {labels.addNestedSection}
                </button>
              </div>
              {(item.children ?? []).map((childSection) => (
                <NestedSectionEditor
                  childSection={childSection}
                  itemId={item.id}
                  key={childSection.id}
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
                  sectionId={section.id}
                />
              ))}
            </div>
            <div className="item-meta">{item.id}</div>
          </div>
        ))}
      </div>
      <button
        className="ghost-button full-width"
        onClick={onAddItem}
        type="button"
      >
        {labels.addItem}
      </button>
    </div>
  );
}
