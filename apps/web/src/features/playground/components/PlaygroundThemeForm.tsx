import React from "react";

import type { PlaygroundConfig } from "../config";
import type { PlaygroundLabels } from "../ui";
import { ColorField, Field } from "./Fields";

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
  return (
    <div className="form-grid">
      <ColorField
        label={labels.accent}
        onChange={(value) =>
          onUpdateConfig((current) => ({
            ...current,
            accentColor: value
          }))
        }
        value={config.accentColor}
      />
      <ColorField
        label={labels.surface}
        onChange={(value) =>
          onUpdateConfig((current) => ({
            ...current,
            backgroundColor: value
          }))
        }
        value={config.backgroundColor}
      />
      <ColorField
        label={labels.text}
        onChange={(value) =>
          onUpdateConfig((current) => ({
            ...current,
            textColor: value
          }))
        }
        value={config.textColor}
      />
      <ColorField
        label={labels.border}
        onChange={(value) =>
          onUpdateConfig((current) => ({
            ...current,
            borderColor: value
          }))
        }
        value={config.borderColor}
      />

      <Field label={labels.muted}>
        <input
          onChange={(event) =>
            onUpdateConfig((current) => ({
              ...current,
              mutedColor: event.target.value
            }))
          }
          value={config.mutedColor}
        />
      </Field>
      <Field label={labels.overlay}>
        <input
          onChange={(event) =>
            onUpdateConfig((current) => ({
              ...current,
              overlayColor: event.target.value
            }))
          }
          value={config.overlayColor}
        />
      </Field>
      <Field label={labels.radius}>
        <input
          onChange={(event) =>
            onUpdateConfig((current) => ({
              ...current,
              radius: event.target.value
            }))
          }
          value={config.radius}
        />
      </Field>
      <Field label={labels.shadow}>
        <input
          onChange={(event) =>
            onUpdateConfig((current) => ({
              ...current,
              shadow: event.target.value
            }))
          }
          value={config.shadow}
        />
      </Field>
    </div>
  );
}
