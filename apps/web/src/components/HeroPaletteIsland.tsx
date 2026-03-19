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
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [themeMode, setThemeMode] = useState<SiteThemeMode>("dark");
  const sections = buildSitePaletteSections(locale, hrefs);
  const renderItem = useMemo(() => createSitePaletteRenderItem(), []);
  const renderers = useMemo(() => createSitePaletteRenderers(locale), [locale]);
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
    const list = rootRef.current?.querySelector<HTMLElement>(".site-palette-list");
    if (!list) {
      return;
    }

    return bindPaletteScrollMask(list);
  }, [sections]);

  return (
    <div className="hero-stage-card hero-palette-shell" ref={rootRef}>
      <CommandPalette
        classNames={{
          caption: "site-palette-caption hero-palette-caption",
          closeButton: "site-palette-close-button",
          backButton: "site-palette-back-button",
          dialog: "site-palette-dialog hero-palette-dialog",
          emptyState: "site-palette-empty",
          headerActions: "hero-palette-header-actions",
          input: "site-palette-input",
          item: "site-palette-item",
          list: "site-palette-list",
          overlay: "site-palette-overlay hero-palette-overlay",
          sectionTitle: "site-palette-section-title-hidden"
        }}
        onOpenChange={() => undefined}
        open
        messages={{ searchPlaceholder }}
        recents={{ limit: 6, sectionTitle: recentLabel }}
        renderItem={renderItem}
        renderers={renderers}
        sections={sections}
        shortcut="shift+f12"
        theme={theme}
        title={title}
      />
    </div>
  );
}
