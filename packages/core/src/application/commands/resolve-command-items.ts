import type {
  CommandItem,
  CommandKitConfig,
  CommandSection
} from "../../domain/commands/types";

interface ResolveCommandItemsOptions {
  includeNestedChildren?: boolean;
}

export function resolveCommandItems(
  config: CommandKitConfig,
  options: ResolveCommandItemsOptions = {}
): CommandItem[] {
  if (config.sections?.length) {
    return flattenSections(config.sections, options);
  }

  return flattenItems(config.items ?? [], options);
}

export function flattenSections(
  sections: CommandSection[],
  options: ResolveCommandItemsOptions = {}
): CommandItem[] {
  return sections.flatMap((section) =>
    flattenItems(
      section.items.map((item) => ({
        ...item,
        section: item.section ?? section.title
      })),
      options
    )
  );
}

function flattenItems(
  items: CommandItem[],
  options: ResolveCommandItemsOptions
): CommandItem[] {
  const { includeNestedChildren = false } = options;
  const flattened: CommandItem[] = [];

  for (const item of items) {
    flattened.push(item);

    if (!includeNestedChildren || !item.children?.length) {
      continue;
    }

    const nestedItems = item.children.flatMap((section) =>
      flattenItems(
        section.items.map((childItem) => ({
          ...childItem,
          section: childItem.section ?? section.title
        })),
        options
      )
    );

    flattened.push(...nestedItems);
  }

  return flattened;
}
