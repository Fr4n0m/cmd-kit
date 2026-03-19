import type { CommandItem } from "@cmd-kit/react";
import type { CommandPaletteRenderers } from "@cmd-kit/react";

import { Icon, type PlaygroundIconName } from "./icons/PlaygroundIcon";

export type SitePaletteIconMap = Partial<Record<string, PlaygroundIconName>>;

const defaultIconByItemId: Record<string, PlaygroundIconName> = {
  "go-home": "globe",
  "open-playground": "play",
  "open-customization": "spark",
  "docs-root": "code",
  "docs-getting-started": "arrow-right",
  "docs-react": "react",
  "docs-vue": "vue",
  "docs-preact": "preact",
  "docs-astro": "astro",
  "docs-core": "core",
  "docs-playground": "play",
  "legal-root": "code",
  "legal-privacy": "globe",
  "legal-terms": "code"
};

export function createSitePaletteRenderItem(overrides: SitePaletteIconMap = {}) {
  const iconByItemId = { ...defaultIconByItemId, ...overrides };

  return (item: CommandItem, active: boolean) => {
    const iconName = iconByItemId[item.id] ?? "code";
    const trailing = item.shortcut ?? (item.children?.length ? "Enter" : null);

    return (
      <>
        <div className="site-palette-row">
          <span className={active ? "site-palette-icon is-active" : "site-palette-icon"}>
            <Icon className="site-palette-icon-svg" name={iconName} tone="mono" />
          </span>
          <span className="site-palette-copy">
            <span className="site-palette-title">{item.title}</span>
            {item.subtitle ? (
              <span className="site-palette-subtitle">{item.subtitle}</span>
            ) : null}
          </span>
        </div>
        {trailing ? <span className="site-palette-trailing">{trailing}</span> : null}
      </>
    );
  };
}

export function createSitePaletteRenderers(
  locale: "en" | "es",
  options?: {
    hint?: string;
  }
): CommandPaletteRenderers {
  const hint = options?.hint;

  return {
    title: ({ activeTitle, canGoBack, goBack }) => (
      <span className="site-palette-title-block">
        <span className="site-palette-heading">
          {canGoBack ? (
            <button
              aria-label={locale === "es" ? "Volver" : "Go back"}
              className="site-palette-title-back"
              onClick={goBack}
              type="button"
            >
              <Icon className="site-palette-title-back-icon" name="arrow-right" tone="mono" />
            </button>
          ) : null}
          <span>{activeTitle}</span>
        </span>
        {hint ? <span className="site-palette-title-hint">{hint}</span> : null}
      </span>
    )
  };
}
