import type { CommandSection } from "@cmd-kit/react";

import type { PlaygroundConfig } from "./config";

export function buildReactSnippet(config: PlaygroundConfig): string {
  const sectionsSnippet = toSectionsSnippet(config.sections);

  return `import { CommandPalette } from "@cmd-kit/react";

const sections = ${sectionsSnippet};

export function Demo() {
  return (
    <CommandPalette
      sections={sections}
      shortcut="${escapeString(config.shortcut)}"
      title="${escapeString(config.title)}"
      messages={{
        searchPlaceholder: "${escapeString(config.placeholder)}",
        noResults: "${escapeString(config.noResults)}"
      }}
      theme={{
        accentColor: "${config.accentColor}",
        backgroundColor: "${config.backgroundColor}",
        textColor: "${config.textColor}",
        borderColor: "${config.borderColor}",
        radius: "${config.radius}"
      }}
    />
  );
}`;
}

export function buildCssSnippet(config: PlaygroundConfig): string {
  return `:root {
  --cmdkit-accent: ${config.accentColor};
  --cmdkit-surface: ${config.backgroundColor};
  --cmdkit-text: ${config.textColor};
  --cmdkit-border: ${config.borderColor};
  --cmdkit-radius: ${config.radius};
}`;
}

export function buildTailwindSnippet(config: PlaygroundConfig): string {
  return `import { CommandPalette } from "@cmd-kit/react";

const sections = ${toSectionsSnippet(config.sections)};

<div className="rounded-[${config.radius}] border bg-[${config.backgroundColor}] text-[${config.textColor}]">
  <CommandPalette sections={sections} shortcut="${config.shortcut}" />
</div>`;
}

function toSectionsSnippet(sections: CommandSection[]): string {
  return JSON.stringify(sections, null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/"/g, "'");
}

function escapeString(value: string): string {
  return value.replace(/"/g, '\\"');
}

