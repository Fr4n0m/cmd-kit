import type {
  CommandItem,
  CommandKitConfig,
  CommandSection
} from "../../domain/commands/types";

export function resolveCommandItems(config: CommandKitConfig): CommandItem[] {
  if (config.sections?.length) {
    return flattenSections(config.sections);
  }

  return config.items ?? [];
}

export function flattenSections(sections: CommandSection[]): CommandItem[] {
  return sections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section: item.section ?? section.title
    }))
  );
}
