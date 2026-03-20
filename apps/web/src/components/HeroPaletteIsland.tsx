import { CommandPalette } from "@cmd-kit/react";
import { useMemo } from "react";

import {
  buildSitePaletteSections,
  type SitePaletteHrefs
} from "./site-palette-data";
import { createSitePaletteRenderItem } from "./site-palette-render";

interface HeroPaletteIslandProps extends SitePaletteHrefs {
  locale: "en" | "es";
  recentLabel: string;
  searchPlaceholder: string;
  title: string;
}

export function HeroPaletteIsland({
  locale,
  recentLabel,
  searchPlaceholder,
  title,
  ...hrefs
}: HeroPaletteIslandProps) {
  const sections = buildSitePaletteSections(locale, hrefs);
  const renderItem = useMemo(() => createSitePaletteRenderItem(), []);
  const classNames = useMemo(
    () => ({
      overlay: "hero-palette-overlay",
      dialog: "hero-palette-dialog",
      caption: "hero-palette-caption",
      headerActions: "hero-palette-header-actions"
    }),
    []
  );

  return (
    <div className="hero-stage-card hero-palette-shell">
      <CommandPalette
        classNames={classNames}
        onOpenChange={() => undefined}
        open
        messages={{ searchPlaceholder }}
        recents={{ limit: 6, sectionTitle: recentLabel }}
        renderItem={renderItem}
        sections={sections}
        shortcut="shift+f12"
        title={title}
      />
    </div>
  );
}
