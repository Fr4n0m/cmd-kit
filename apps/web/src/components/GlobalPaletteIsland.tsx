import { CommandPalette } from "@cmd-kit/react";
import { useMemo, useState } from "react";

import {
  buildSitePaletteSections,
  type SitePaletteHrefs
} from "./site-palette-data";
import { createSitePaletteRenderItem } from "./site-palette-render";

interface GlobalPaletteIslandProps extends SitePaletteHrefs {
  locale: "en" | "es";
}

export function GlobalPaletteIsland({ locale, ...hrefs }: GlobalPaletteIslandProps) {
  const [open, setOpen] = useState(false);
  const isEs = locale === "es";
  const sections = useMemo(
    () => buildSitePaletteSections(locale, hrefs),
    [hrefs, locale]
  );
  const renderItem = useMemo(() => createSitePaletteRenderItem(), []);

  return (
    <div>
      <CommandPalette
        messages={{
          searchPlaceholder: isEs
            ? "Busca comandos, páginas y acciones..."
            : "Search commands, pages, and actions..."
        }}
        onOpenChange={setOpen}
        open={open}
        recents={{ limit: 8, sectionTitle: isEs ? "Recientes" : "Recent" }}
        renderItem={renderItem}
        sections={sections}
        shortcut="mod+k"
        title="Cmd+kit"
      />
    </div>
  );
}
