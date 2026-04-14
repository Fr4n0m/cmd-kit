import React from "react";

import type { PlaygroundConfig } from "@/features/playground/config";
import type { PlaygroundLabels } from "@/features/playground/ui";
import { ColorField, Field } from "./Fields";
import { PlaygroundSelectField } from "./PlaygroundSelectField";

interface PlaygroundBasicsFormProps {
  config: PlaygroundConfig;
  labels: PlaygroundLabels;
  onUpdateConfig: (
    updater: (current: PlaygroundConfig) => PlaygroundConfig
  ) => void;
}

export function PlaygroundBasicsForm({
  config,
  labels,
  onUpdateConfig
}: PlaygroundBasicsFormProps) {
  function updateActiveThemeField(
    field: "titleColor" | "descriptionColor" | "shortcutColor",
    value: string
  ) {
    onUpdateConfig((current) => {
      if (current.activeThemeMode === "dark") {
        const darkFieldMap = {
          titleColor: "darkTitleColor",
          descriptionColor: "darkDescriptionColor",
          shortcutColor: "darkShortcutColor"
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

  const activeTitleColor =
    config.activeThemeMode === "dark" ? config.darkTitleColor : config.titleColor;
  const activeDescriptionColor =
    config.activeThemeMode === "dark"
      ? config.darkDescriptionColor
      : config.descriptionColor;
  const activeShortcutColor =
    config.activeThemeMode === "dark"
      ? config.darkShortcutColor
      : config.shortcutColor;

  return (
    <div className="form-grid">
      <PlaygroundSelectField
        label={labels.language}
        onChange={(value) =>
          onUpdateConfig((current) => ({
            ...current,
            language: value as PlaygroundConfig["language"]
          }))
        }
        options={[
          { label: labels.languageEnglish, value: "en" },
          { label: labels.languageSpanish, value: "es" }
        ]}
        value={config.language}
      />

      <Field label={labels.title}>
        <input
          onChange={(event) =>
            onUpdateConfig((current) => ({
              ...current,
              title: event.target.value
            }))
          }
          value={config.title}
        />
      </Field>
      <ColorField
        label={labels.titleColor}
        onChange={(value) => updateActiveThemeField("titleColor", value)}
        value={activeTitleColor}
      />

      <Field label={labels.placeholder}>
        <input
          onChange={(event) =>
            onUpdateConfig((current) => ({
              ...current,
              placeholder: event.target.value
            }))
          }
          value={config.placeholder}
        />
      </Field>
      <ColorField
        label={labels.captionColor}
        onChange={(value) => updateActiveThemeField("descriptionColor", value)}
        value={activeDescriptionColor}
      />

      <Field label={labels.shortcut}>
        <input
          onChange={(event) =>
            onUpdateConfig((current) => ({
              ...current,
              shortcut: event.target.value
            }))
          }
          value={config.shortcut}
        />
      </Field>
      <ColorField
        label={labels.shortcutColor}
        onChange={(value) => updateActiveThemeField("shortcutColor", value)}
        value={activeShortcutColor}
      />

      <Field label={labels.recents}>
        <label className="toggle-field">
          <input
            checked={config.recentsEnabled}
            onChange={(event) =>
              onUpdateConfig((current) => ({
                ...current,
                recentsEnabled: event.target.checked
              }))
            }
            type="checkbox"
          />
          <span>{labels.recents}</span>
        </label>
      </Field>
    </div>
  );
}

