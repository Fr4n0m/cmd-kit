import React from "react";

import type { PlaygroundConfig } from "../config";
import type { PlaygroundLabels } from "../ui";
import { Field } from "./Fields";

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
  return (
    <div className="form-grid">
      <Field label={labels.language}>
        <select
          onChange={(event) =>
            onUpdateConfig((current) => ({
              ...current,
              language: event.target.value as PlaygroundConfig["language"]
            }))
          }
          value={config.language}
        >
          <option value="en">English</option>
          <option value="es">Espanol</option>
        </select>
      </Field>

      <Field label={labels.layout}>
        <select
          onChange={(event) =>
            onUpdateConfig((current) => ({
              ...current,
              layout: event.target.value as PlaygroundConfig["layout"]
            }))
          }
          value={config.layout}
        >
          <option value="centered">{labels.centered}</option>
          <option value="wide">{labels.wide}</option>
        </select>
      </Field>

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

      <Field label={labels.description}>
        <textarea
          onChange={(event) =>
            onUpdateConfig((current) => ({
              ...current,
              description: event.target.value
            }))
          }
          value={config.description}
        />
      </Field>

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

      <Field label={labels.noResults}>
        <input
          onChange={(event) =>
            onUpdateConfig((current) => ({
              ...current,
              noResults: event.target.value
            }))
          }
          value={config.noResults}
        />
      </Field>

      <Field label={labels.closeLabel}>
        <input
          onChange={(event) =>
            onUpdateConfig((current) => ({
              ...current,
              closeLabel: event.target.value
            }))
          }
          value={config.closeLabel}
        />
      </Field>

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

      <Field label={labels.recentsTitle}>
        <input
          disabled={!config.recentsEnabled}
          onChange={(event) =>
            onUpdateConfig((current) => ({
              ...current,
              recentsTitle: event.target.value
            }))
          }
          value={config.recentsTitle}
        />
      </Field>

      <Field label={labels.recentsLimit}>
        <input
          disabled={!config.recentsEnabled}
          min={1}
          onChange={(event) =>
            onUpdateConfig((current) => ({
              ...current,
              recentsLimit: Number(event.target.value) || 1
            }))
          }
          type="number"
          value={config.recentsLimit}
        />
      </Field>
    </div>
  );
}
