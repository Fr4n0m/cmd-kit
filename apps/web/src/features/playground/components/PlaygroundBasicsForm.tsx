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
  const help = getBasicsHelp(config.language);

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
        helpText={help.language}
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

      <Field anchor="title" helpText={help.title} label={labels.title}>
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
        helpText={help.titleColor}
        label={labels.titleColor}
        onChange={(value) => updateActiveThemeField("titleColor", value)}
        value={activeTitleColor}
      />

      <Field anchor="placeholder" helpText={help.placeholder} label={labels.placeholder}>
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
        helpText={help.descriptionColor}
        label={labels.captionColor}
        onChange={(value) => updateActiveThemeField("descriptionColor", value)}
        value={activeDescriptionColor}
      />

      <Field helpText={help.shortcut} label={labels.shortcut}>
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
        helpText={help.shortcutColor}
        label={labels.shortcutColor}
        onChange={(value) => updateActiveThemeField("shortcutColor", value)}
        value={activeShortcutColor}
      />

      <Field helpText={help.recents} label={labels.recents}>
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

function getBasicsHelp(language: PlaygroundConfig["language"]) {
  if (language === "es") {
    return {
      descriptionColor: "Color del texto secundario que acompaña al título en la vista previa.",
      language: "Idioma del configurador y de los textos por defecto generados en el snippet.",
      placeholder: "Texto de búsqueda visible dentro del input de la command palette.",
      recents: "Activa una sección de elementos recientes ejecutados por el usuario.",
      shortcut: "Atajo global para abrir/cerrar la paleta (ejemplo: mod+k).",
      shortcutColor: "Color de la etiqueta del atajo en la vista previa y en la paleta.",
      title: "Título principal que aparece en la cabecera de la command palette.",
      titleColor: "Color del título principal de la paleta."
    };
  }

  return {
    descriptionColor: "Secondary helper text color shown under the palette title in preview.",
    language: "Configurator language and default generated copy in exported snippets.",
    placeholder: "Search prompt text displayed inside the command palette input.",
    recents: "Enable a recent-commands section based on executed items.",
    shortcut: "Global keybinding used to open/close the palette (example: mod+k).",
    shortcutColor: "Color used by keyboard shortcut labels in preview and palette.",
    title: "Main heading shown at the top of the command palette.",
    titleColor: "Main title color for the palette header."
  };
}

