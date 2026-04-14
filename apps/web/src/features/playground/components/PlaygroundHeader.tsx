import React from "react";

import type { PlaygroundLabels } from "@/features/playground/ui";
import { Icon } from "@/components/icons/PlaygroundIcon";

interface PlaygroundHeaderProps {
  labels: PlaygroundLabels;
  shortcut: string;
  onLaunch: () => void;
}

export function PlaygroundHeader({
  labels,
  shortcut,
  onLaunch
}: PlaygroundHeaderProps) {
  const launchHint = `${labels.launch} (${shortcut})`;

  return (
    <div className="playground-header">
      <div className="playground-header-copy">
        <p className="eyebrow">{labels.preview}</p>
        <h2>{labels.previewHeading}</h2>
        <p>{labels.previewDescription}</p>
      </div>
      <div className="playground-header-actions">
        <button
          aria-label={launchHint}
          className="primary-button launch-button"
          onClick={onLaunch}
          title={launchHint}
          type="button"
        >
          <Icon className="button-icon" name="play" />
          <span>{labels.launch}</span>
        </button>
      </div>
    </div>
  );
}

