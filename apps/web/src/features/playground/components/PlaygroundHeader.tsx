import React from "react";

import type { PlaygroundLabels } from "@/features/playground/ui";
import { Icon } from "@/components/icons/PlaygroundIcon";

interface PlaygroundHeaderProps {
  labels: PlaygroundLabels;
  onLaunch: () => void;
}

export function PlaygroundHeader({ labels, onLaunch }: PlaygroundHeaderProps) {
  return (
    <div className="playground-header">
      <div className="playground-header-copy">
        <p className="eyebrow">{labels.preview}</p>
        <h2>{labels.previewHeading}</h2>
        <p>{labels.previewDescription}</p>
      </div>
      <div className="playground-header-actions">
        <button className="primary-button" onClick={onLaunch} type="button">
          <Icon className="button-icon" name="play" />
          <span>{labels.launch}</span>
        </button>
      </div>
    </div>
  );
}

