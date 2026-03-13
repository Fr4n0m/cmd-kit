import React from "react";

import type { PlaygroundConfig } from "../config";
import type { PlaygroundLabels } from "../ui";

interface PlaygroundHeaderProps {
  labels: PlaygroundLabels;
  language: PlaygroundConfig["language"];
  onLaunch: () => void;
  onToggleLanguage: () => void;
}

export function PlaygroundHeader({
  labels,
  language,
  onLaunch,
  onToggleLanguage
}: PlaygroundHeaderProps) {
  return (
    <div className="playground-header">
      <div>
        <p className="eyebrow">{labels.preview}</p>
        <h2>Live configurator</h2>
      </div>
      <div className="hero-actions">
        <button className="primary-button" onClick={onLaunch} type="button">
          {labels.launch}
        </button>
        <button
          aria-label={
            language === "en"
              ? "Switch playground language to Spanish"
              : "Cambiar el idioma del configurador a ingles"
          }
          className="ghost-button"
          onClick={onToggleLanguage}
          type="button"
        >
          {language === "en" ? "ES" : "EN"}
        </button>
      </div>
    </div>
  );
}
