import React from "react";

import type { PlaygroundConfig } from "@/features/playground/config";
import type { PlaygroundLabels } from "@/features/playground/ui";
import { ColorField, Field } from "./Fields";
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
            label={labels.accent}
            onChange={(value) => updateThemeField("accentColor", value)}
            value={currentTheme.accentColor}
          />
          <ColorField
            label={labels.surface}
            onChange={(value) => updateThemeField("backgroundColor", value)}
            value={currentTheme.backgroundColor}
          />
          <ColorField
            label={labels.text}
            onChange={(value) => updateThemeField("textColor", value)}
            value={currentTheme.textColor}
          />
          <ColorField
            label={labels.titleColor}
            onChange={(value) => updateThemeField("titleColor", value)}
            value={currentTheme.titleColor}
          />
          <ColorField
            label={labels.captionColor}
            onChange={(value) => updateThemeField("descriptionColor", value)}
            value={currentTheme.descriptionColor}
          />
          <ColorField
            label={labels.sectionTitleColor}
            onChange={(value) => updateThemeField("sectionTitleColor", value)}
            value={currentTheme.sectionTitleColor}
          />
          <ColorField
            label={labels.itemTitleColor}
            onChange={(value) => updateThemeField("itemTitleColor", value)}
            value={currentTheme.itemTitleColor}
          />
          <ColorField
            label={labels.itemSubtitleColor}
            onChange={(value) => updateThemeField("itemSubtitleColor", value)}
            value={currentTheme.itemSubtitleColor}
          />
          <ColorField
            label={labels.shortcutColor}
            onChange={(value) => updateThemeField("shortcutColor", value)}
            value={currentTheme.shortcutColor}
          />
          <ColorField
            label={labels.border}
            onChange={(value) => updateThemeField("borderColor", value)}
            value={currentTheme.borderColor}
          />

          <Field label={labels.muted}>
            <input
              onChange={(event) => updateThemeField("mutedColor", event.target.value)}
              value={currentTheme.mutedColor}
            />
          </Field>
          <Field label={labels.overlay}>
            <input
              onChange={(event) => updateThemeField("overlayColor", event.target.value)}
              value={currentTheme.overlayColor}
            />
          </Field>
          <Field label={labels.radius}>
            <input
              onChange={(event) => updateThemeField("radius", event.target.value)}
              value={currentTheme.radius}
            />
          </Field>
          <Field label={labels.shadow}>
            <input
              onChange={(event) => updateThemeField("shadow", event.target.value)}
              value={currentTheme.shadow}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

