import { useMemo, useState } from "react";

import {
  createChildSection,
  createItem,
  createSection,
  defaultConfig,
  type PlaygroundConfig
} from "./config";
import {
  buildCssSnippet,
  buildJsonSnippet,
  buildPreactSnippet,
  buildReactSnippet,
  buildTailwindSnippet,
  buildVueSnippet
} from "./snippets";

export type SnippetTab = "react" | "vue" | "preact" | "css" | "tailwind" | "json";

export function usePlaygroundState() {
  const [config, setConfig] = useState<PlaygroundConfig>(defaultConfig);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SnippetTab>("react");

  const code = useMemo(() => {
    if (activeTab === "css") {
      return buildCssSnippet(config);
    }

    if (activeTab === "tailwind") {
      return buildTailwindSnippet(config);
    }

    if (activeTab === "json") {
      return buildJsonSnippet(config);
    }

    if (activeTab === "vue") {
      return buildVueSnippet(config);
    }

    if (activeTab === "preact") {
      return buildPreactSnippet(config);
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
      sections: [...current.sections, createSection()]
    }));
  }

  function addItemToSection(sectionId: string) {
    updateSection(sectionId, (section) => ({
      ...section,
      items: [...section.items, createItem()]
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
    updateItem(sectionId, itemId, (item) => ({
      ...item,
      children: [...(item.children ?? []), createChildSection()]
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
    updateNestedSection(sectionId, itemId, childSectionId, (childSection) => ({
      ...childSection,
      items: [...childSection.items, createItem()]
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
