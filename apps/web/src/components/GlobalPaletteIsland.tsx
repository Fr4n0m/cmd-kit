import { CommandPalette } from "@cmd-kit/react";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  buildSitePaletteSections,
  type SitePaletteHrefs
} from "./site-palette-data";
import {
  createSitePaletteRenderItem,
  createSitePaletteRenderers
} from "./site-palette-render";
import {
  resolveSitePaletteTheme,
  type SiteThemeMode
} from "./site-palette-theme";
import { bindPaletteScrollMask } from "./palette-scroll-mask";

interface GlobalPaletteIslandProps extends SitePaletteHrefs {
  locale: "en" | "es";
}

export function GlobalPaletteIsland({ locale, ...hrefs }: GlobalPaletteIslandProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<SiteThemeMode>("dark");
  const isEs = locale === "es";
  const sections = useMemo(
    () => buildSitePaletteSections(locale, hrefs),
    [hrefs, locale]
  );
  const renderItem = useMemo(() => createSitePaletteRenderItem(), []);
  const renderers = useMemo(
    () =>
      createSitePaletteRenderers(locale, {
        hint:
          locale === "es"
            ? "Busca documentación, playground y páginas legales."
            : "Search docs, playground, and legal pages."
      }),
    [locale]
  );
  const theme = useMemo(() => resolveSitePaletteTheme(themeMode), [themeMode]);

  useEffect(() => {
    const rootTheme = document.documentElement.dataset.theme;
    setThemeMode(rootTheme === "light" ? "light" : "dark");

    const handleThemeChange = (event: Event) => {
      const detail = (event as CustomEvent<{ theme?: string }>).detail;
      setThemeMode(detail?.theme === "light" ? "light" : "dark");
    };

    window.addEventListener("cmd-kit-theme-change", handleThemeChange);
    return () => window.removeEventListener("cmd-kit-theme-change", handleThemeChange);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const list = rootRef.current?.querySelector<HTMLElement>(".site-palette-list");
    if (!list) {
      return;
    }

    return bindPaletteScrollMask(list);
  }, [open, sections]);

  return (
    <div ref={rootRef}>
      <CommandPalette
        classNames={{
          caption: "site-palette-caption site-palette-caption-hidden",
          closeButton: "site-palette-close-button",
          backButton: "site-palette-back-button",
          dialog: "site-palette-dialog",
          emptyState: "site-palette-empty",
          input: "site-palette-input",
          item: "site-palette-item",
          list: "site-palette-list",
          overlay: "site-palette-overlay",
          sectionTitle: "site-palette-section-title-hidden"
        }}
        messages={{
          searchPlaceholder: isEs
            ? "Busca comandos, páginas y acciones..."
            : "Search commands, pages, and actions..."
        }}
        onOpenChange={setOpen}
        open={open}
        recents={{ limit: 8, sectionTitle: isEs ? "Recientes" : "Recent" }}
        renderItem={renderItem}
        renderers={renderers}
        sections={sections}
        shortcut="mod+k"
        theme={theme}
        title="Cmd+kit"
      />
    </div>
  );
}
