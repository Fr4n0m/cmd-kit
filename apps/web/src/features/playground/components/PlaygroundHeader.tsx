import React from "react";

import type { PlaygroundLabels } from "../ui";

interface PlaygroundHeaderProps {
  labels: PlaygroundLabels;
  onLaunch: () => void;
}

export function PlaygroundHeader({ labels, onLaunch }: PlaygroundHeaderProps) {
  return (
    <div className="playground-header">
      <div className="playground-header-copy">
        <p className="eyebrow">{labels.preview}</p>
        <h2>Shape the palette, then take the code with you.</h2>
        <p>
          Edit content, theme, sections, nested commands, and exports in one place.
        </p>
        <div className="playground-header-badges">
          <span className="playground-badge">React first</span>
          <span className="playground-badge">Vue / Preact / Vanilla exports</span>
        </div>
      </div>
      <div className="playground-header-actions">
        <button className="primary-button" onClick={onLaunch} type="button">
          {labels.launch}
        </button>
      </div>
    </div>
  );
}
