import React from "react";

import type { PlaygroundConfig } from "../config";
import type { PlaygroundLabels } from "../ui";
import { SectionEditor } from "./SectionEditor";

interface PlaygroundSectionsPanelProps {
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

export function PlaygroundSectionsPanel({
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
  onUpdateItem,
  onUpdateNestedItem,
  onUpdateNestedSectionTitle,
  onUpdateSection
}: PlaygroundSectionsPanelProps) {
  return (
    <>
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
            onMoveDown={() => onMoveSection(section.id, "down")}
            onMoveItem={(itemId, direction) =>
              onMoveItem(section.id, itemId, direction)
            }
            onMoveNestedItem={(
              itemId,
              childSectionId,
              nestedItemId,
              direction
            ) =>
              onMoveNestedItem(
                section.id,
                itemId,
                childSectionId,
                nestedItemId,
                direction
              )
            }
            onMoveUp={() => onMoveSection(section.id, "up")}
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
    </>
  );
}
