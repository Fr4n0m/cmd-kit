import React from "react";

import type { PlaygroundConfig } from "@/features/playground/config";
import type { PlaygroundLabels } from "@/features/playground/ui";
import { ColorField, RadiusField, ShadowField } from "./Fields";
import { ThemePillSwitch } from "./ThemePillSwitch";

interface PlaygroundThemeFormProps {
  config: PlaygroundConfig;
  labels: PlaygroundLabels;
  onUpdateConfig: (
    updater: (current: PlaygroundConfig) => PlaygroundConfig
  ) => void;
}

export function PlaygroundThemeForm({
  config,
  labels,
  onUpdateConfig
}: PlaygroundThemeFormProps) {
  const help = getThemeHelp(config.language);
  const isDarkEditor = config.themeEditorMode === "dark";
  const currentTheme = isDarkEditor
    ? {
        accentColor: config.darkAccentColor,
        backgroundColor: config.darkBackgroundColor,
        borderColor: config.darkBorderColor,
        descriptionColor: config.darkDescriptionColor,
        itemSubtitleColor: config.darkItemSubtitleColor,
        itemTitleColor: config.darkItemTitleColor,
        mutedColor: config.darkMutedColor,
        overlayColor: config.darkOverlayColor,
        radius: config.darkRadius,
        sectionTitleColor: config.darkSectionTitleColor,
        shadow: config.darkShadow,
        shortcutColor: config.darkShortcutColor,
        titleColor: config.darkTitleColor,
        textColor: config.darkTextColor
      }
    : {
        accentColor: config.accentColor,
        backgroundColor: config.backgroundColor,
        borderColor: config.borderColor,
        descriptionColor: config.descriptionColor,
        itemSubtitleColor: config.itemSubtitleColor,
        itemTitleColor: config.itemTitleColor,
        mutedColor: config.mutedColor,
        overlayColor: config.overlayColor,
        radius: config.radius,
        sectionTitleColor: config.sectionTitleColor,
        shadow: config.shadow,
        shortcutColor: config.shortcutColor,
        titleColor: config.titleColor,
        textColor: config.textColor
      };

  function updateThemeField(field: "accentColor" | "backgroundColor" | "textColor" | "titleColor" | "descriptionColor" | "sectionTitleColor" | "itemTitleColor" | "itemSubtitleColor" | "shortcutColor" | "borderColor" | "mutedColor" | "overlayColor" | "radius" | "shadow", value: string) {
    onUpdateConfig((current) => {
      if (current.themeEditorMode === "dark") {
        const darkFieldMap = {
          accentColor: "darkAccentColor",
          backgroundColor: "darkBackgroundColor",
          textColor: "darkTextColor",
          titleColor: "darkTitleColor",
          descriptionColor: "darkDescriptionColor",
          sectionTitleColor: "darkSectionTitleColor",
          itemTitleColor: "darkItemTitleColor",
          itemSubtitleColor: "darkItemSubtitleColor",
          shortcutColor: "darkShortcutColor",
          borderColor: "darkBorderColor",
          mutedColor: "darkMutedColor",
          overlayColor: "darkOverlayColor",
          radius: "darkRadius",
          shadow: "darkShadow"
        } as const;

        return {
          ...current,
          [darkFieldMap[field]]: value
        };
      }

      return {
        ...current,
        [field]: value
      };
    });
  }

  return (
    <div className="theme-form-stack">
      <div className="theme-editor-tabs-wrap">
        <p className="theme-editor-label">{labels.themeModeField}</p>
        <ThemePillSwitch
          ariaLabel={labels.themeModeField}
          buttonClassName="theme-editor-tab"
          indicatorClassName="theme-editor-tabs-indicator"
          onChange={(nextMode) =>
            onUpdateConfig((current) => ({
              ...current,
              themeEditorMode: nextMode
            }))
          }
          options={[
            { label: labels.themeModeLight, value: "light" },
            { label: labels.themeModeDark, value: "dark" }
          ]}
          rootClassName="theme-editor-tabs"
          value={config.themeEditorMode}
        />
      </div>

      <p className="theme-editor-note">{labels.themeEditorHint}</p>

      <div className="theme-editor-section">
        <h4>
          {isDarkEditor ? labels.themeDarkSection : labels.themeLightSection}
        </h4>
        <div className="form-grid">
          <ColorField
            anchor="accent"
            helpText={help.accent}
            label={labels.accent}
            onChange={(value) => updateThemeField("accentColor", value)}
            value={currentTheme.accentColor}
          />
          <ColorField
            anchor="surface"
            helpText={help.surface}
            label={labels.surface}
            onChange={(value) => updateThemeField("backgroundColor", value)}
            value={currentTheme.backgroundColor}
          />
          <ColorField
            helpText={help.text}
            label={labels.text}
            onChange={(value) => updateThemeField("textColor", value)}
            value={currentTheme.textColor}
          />
          <ColorField
            helpText={help.title}
            label={labels.titleColor}
            onChange={(value) => updateThemeField("titleColor", value)}
            value={currentTheme.titleColor}
          />
          <ColorField
            helpText={help.description}
            label={labels.captionColor}
            onChange={(value) => updateThemeField("descriptionColor", value)}
            value={currentTheme.descriptionColor}
          />
          <ColorField
            helpText={help.sectionTitle}
            label={labels.sectionTitleColor}
            onChange={(value) => updateThemeField("sectionTitleColor", value)}
            value={currentTheme.sectionTitleColor}
          />
          <ColorField
            helpText={help.itemTitle}
            label={labels.itemTitleColor}
            onChange={(value) => updateThemeField("itemTitleColor", value)}
            value={currentTheme.itemTitleColor}
          />
          <ColorField
            helpText={help.itemSubtitle}
            label={labels.itemSubtitleColor}
            onChange={(value) => updateThemeField("itemSubtitleColor", value)}
            value={currentTheme.itemSubtitleColor}
          />
          <ColorField
            helpText={help.shortcut}
            label={labels.shortcutColor}
            onChange={(value) => updateThemeField("shortcutColor", value)}
            value={currentTheme.shortcutColor}
          />
          <ColorField
            helpText={help.border}
            label={labels.border}
            onChange={(value) => updateThemeField("borderColor", value)}
            value={currentTheme.borderColor}
          />

          <ColorField
            helpText={help.muted}
            label={labels.muted}
            onChange={(value) => updateThemeField("mutedColor", value)}
            value={currentTheme.mutedColor}
          />
          <ColorField
            helpText={help.overlay}
            label={labels.overlay}
            onChange={(value) => updateThemeField("overlayColor", value)}
            value={currentTheme.overlayColor}
          />
          <RadiusField
            helpText={help.radius}
            label={labels.radius}
            onChange={(value) => updateThemeField("radius", value)}
            value={currentTheme.radius}
          />
          <ShadowField
            advancedHideLabel={labels.shadowAdvancedHide}
            advancedShowLabel={labels.shadowAdvancedShow}
            helpText={help.shadow}
            label={labels.shadow}
            onChange={(value) => updateThemeField("shadow", value)}
            value={currentTheme.shadow}
          />
          <div className="theme-shape-preview" aria-hidden="true">
            <div
              className="theme-shape-preview-surface"
              style={{
                backgroundColor: currentTheme.backgroundColor,
                borderColor: currentTheme.borderColor,
                borderRadius: currentTheme.radius,
                boxShadow: currentTheme.shadow
              }}
            >
              <span
                className="theme-shape-preview-badge"
                style={{
                  borderColor: currentTheme.borderColor,
                  borderRadius: `calc(${currentTheme.radius} * 0.72)`,
                  color: currentTheme.mutedColor
                }}
              >
                {currentTheme.radius}
              </span>
              <strong style={{ color: currentTheme.textColor }}>Aa</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getThemeHelp(language: PlaygroundConfig["language"]) {
  if (language === "es") {
    return {
      accent: "Color principal de acciones activas, enfoque y estados destacados.",
      border: "Color de bordes y separaciones en toda la paleta.",
      description: "Color de textos descriptivos y subtítulos de cabecera.",
      itemSubtitle: "Color del texto secundario debajo del título de cada comando.",
      itemTitle: "Color del título principal de cada comando en la lista.",
      muted: "Color base para elementos secundarios (etiquetas, texto menos importante).",
      overlay: "Color de la capa del fondo cuando se abre la paleta.",
      radius: "Redondeado general de la paleta y sus bloques internos.",
      sectionTitle: "Color de los títulos de sección (por ejemplo: Commands).",
      shadow: "Profundidad visual de la paleta respecto al fondo.",
      shortcut: "Color del texto de atajos de teclado (Cmd+K, Enter, etc).",
      surface: "Color de fondo principal de la paleta.",
      text: "Color de texto base de la interfaz.",
      title: "Color del título principal de la paleta."
    };
  }

  return {
    accent: "Primary color for active actions, focus and highlighted states.",
    border: "Border and divider color across the palette.",
    description: "Color for helper text and header description lines.",
    itemSubtitle: "Color of the secondary line under each command title.",
    itemTitle: "Color of the main title for command rows.",
    muted: "Base color for secondary UI text and low-emphasis labels.",
    overlay: "Backdrop layer color shown behind the palette when opened.",
    radius: "Global corner roundness for palette surfaces and cards.",
    sectionTitle: "Color of section headers (for example: Commands).",
    shadow: "Visual depth of the palette against the page background.",
    shortcut: "Color of keyboard shortcut labels (Cmd+K, Enter, etc).",
    surface: "Main background color of the palette surface.",
    text: "Default text color used by the interface.",
    title: "Main palette title color."
  };
}

