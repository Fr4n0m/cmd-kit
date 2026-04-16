import { useMemo, useState } from "react";

import {
  createChildSection,
  createItem,
  createSection,
  createDefaultConfig,
  type PlaygroundConfig,
  type Language
} from "./config";
import {
  buildAstroSnippet,
  buildPreactSnippet,
  buildReactSnippet,
  buildVanillaSnippet,
  buildVueSnippet
} from "./snippets";

export type SnippetTab =
  | "react"
  | "vue"
  | "preact"
  | "astro"
  | "vanilla";

export function usePlaygroundState(initialLanguage: Language = "en") {
  const [config, setConfig] = useState<PlaygroundConfig>(
    createDefaultConfig(initialLanguage)
  );
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SnippetTab>("react");

  const code = useMemo(() => {
    if (activeTab === "vue") {
      return buildVueSnippet(config);
    }

    if (activeTab === "preact") {
      return buildPreactSnippet(config);
    }

    if (activeTab === "astro") {
      return buildAstroSnippet(config);
    }

    if (activeTab === "vanilla") {
      return buildVanillaSnippet(config);
    }

    return buildReactSnippet(config);
  }, [activeTab, config]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      return true;
    } catch {
      return false;
    }
  }

  function updateSection(
    sectionId: string,
    updater: (
      section: PlaygroundConfig["sections"][number]
    ) => PlaygroundConfig["sections"][number]
  ) {
    setConfig((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === sectionId ? updater(section) : section
      )
    }));
  }

  function removeSection(sectionId: string) {
    setConfig((current) => ({
      ...current,
      sections: current.sections.filter((section) => section.id !== sectionId)
    }));
  }

  function addSectionToConfig() {
    setConfig((current) => ({
      ...current,
      sections: [...current.sections, createSection(current.language)]
    }));
  }

  function moveSection(sectionId: string, direction: "up" | "down") {
    setConfig((current) => ({
      ...current,
      sections: moveById(current.sections, sectionId, direction)
    }));
  }

  function addItemToSection(sectionId: string) {
    setConfig((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: [...section.items, createItem(current.language)]
            }
          : section
      )
    }));
  }

  function moveItem(
    sectionId: string,
    itemId: string,
    direction: "up" | "down"
  ) {
    updateSection(sectionId, (section) => ({
      ...section,
      items: moveById(section.items, itemId, direction)
    }));
  }

  function updateItem(
    sectionId: string,
    itemId: string,
    updater: (
      item: PlaygroundConfig["sections"][number]["items"][number]
    ) => PlaygroundConfig["sections"][number]["items"][number]
  ) {
    updateSection(sectionId, (section) => ({
      ...section,
      items: section.items.map((item) =>
        item.id === itemId ? updater(item) : item
      )
    }));
  }

  function removeItem(sectionId: string, itemId: string) {
    updateSection(sectionId, (section) => ({
      ...section,
      items: section.items.filter((item) => item.id !== itemId)
    }));
  }

  function addNestedSection(sectionId: string, itemId: string) {
    setConfig((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      children: [
                        ...(item.children ?? []),
                        createChildSection(current.language)
                      ]
                    }
                  : item
              )
            }
          : section
      )
    }));
  }

  function updateNestedSection(
    sectionId: string,
    itemId: string,
    childSectionId: string,
    updater: (
      section: NonNullable<
        PlaygroundConfig["sections"][number]["items"][number]["children"]
      >[number]
    ) => NonNullable<
      PlaygroundConfig["sections"][number]["items"][number]["children"]
    >[number]
  ) {
    updateItem(sectionId, itemId, (item) => ({
      ...item,
      children: (item.children ?? []).map((childSection) =>
        childSection.id === childSectionId
          ? updater(childSection)
          : childSection
      )
    }));
  }

  function removeNestedSection(
    sectionId: string,
    itemId: string,
    childSectionId: string
  ) {
    updateItem(sectionId, itemId, (item) => ({
      ...item,
      children: (item.children ?? []).filter(
        (childSection) => childSection.id !== childSectionId
      )
    }));
  }

  function addItemToNestedSection(
    sectionId: string,
    itemId: string,
    childSectionId: string
  ) {
    setConfig((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      children: (item.children ?? []).map((childSection) =>
                        childSection.id === childSectionId
                          ? {
                              ...childSection,
                              items: [
                                ...childSection.items,
                                createItem(current.language)
                              ]
                            }
                          : childSection
                      )
                    }
                  : item
              )
            }
          : section
      )
    }));
  }

  function moveNestedItem(
    sectionId: string,
    itemId: string,
    childSectionId: string,
    nestedItemId: string,
    direction: "up" | "down"
  ) {
    updateNestedSection(sectionId, itemId, childSectionId, (childSection) => ({
      ...childSection,
      items: moveById(childSection.items, nestedItemId, direction)
    }));
  }

  function updateNestedItem(
    sectionId: string,
    itemId: string,
    childSectionId: string,
    nestedItemId: string,
    updater: (
      item: NonNullable<
        PlaygroundConfig["sections"][number]["items"][number]["children"]
      >[number]["items"][number]
    ) => NonNullable<
      PlaygroundConfig["sections"][number]["items"][number]["children"]
    >[number]["items"][number]
  ) {
    updateNestedSection(sectionId, itemId, childSectionId, (childSection) => ({
      ...childSection,
      items: childSection.items.map((nestedItem) =>
        nestedItem.id === nestedItemId ? updater(nestedItem) : nestedItem
      )
    }));
  }

  function removeNestedItem(
    sectionId: string,
    itemId: string,
    childSectionId: string,
    nestedItemId: string
  ) {
    updateNestedSection(sectionId, itemId, childSectionId, (childSection) => ({
      ...childSection,
      items: childSection.items.filter(
        (nestedItem) => nestedItem.id !== nestedItemId
      )
    }));
  }

  return {
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
  };
}

function moveById<T extends { id: string }>(
  collection: T[],
  id: string,
  direction: "up" | "down"
): T[] {
  const index = collection.findIndex((entry) => entry.id === id);

  if (index < 0) {
    return collection;
  }

  const targetIndex = direction === "up" ? index - 1 : index + 1;

  if (targetIndex < 0 || targetIndex >= collection.length) {
    return collection;
  }

  const next = [...collection];
  const [item] = next.splice(index, 1);
  next.splice(targetIndex, 0, item);
  return next;
}
