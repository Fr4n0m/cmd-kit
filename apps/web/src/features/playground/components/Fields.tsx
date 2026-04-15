import React from "react";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons/PlaygroundIcon";

interface BaseFieldProps {
  helpText?: string;
  label: string;
}

export function FieldHelpTrigger({
  helpText,
  label
}: BaseFieldProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!helpText) {
    return null;
  }

  return (
    <button
      aria-expanded={isOpen}
      aria-label={`${label}: info`}
      className={isOpen ? "field-help-trigger is-open" : "field-help-trigger"}
      onBlur={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onPointerEnter={() => setIsOpen(true)}
      onPointerLeave={() => setIsOpen(false)}
      type="button"
    >
      <Icon className="field-help-icon" name="info" size={14} />
      <span className="field-help-tooltip" role="tooltip">
        {helpText}
      </span>
    </button>
  );
}

function FieldLabel({ helpText, label }: BaseFieldProps) {
  return (
    <span className="field-label-row">
      <span className="field-label-text">{label}</span>
      <FieldHelpTrigger helpText={helpText} label={label} />
    </span>
  );
}

export function Field({
  children,
  helpText,
  label
}: {
  children: ReactNode;
  helpText?: string;
  label: string;
}) {
  return (
    <label className="field">
      <FieldLabel helpText={helpText} label={label} />
      {children}
    </label>
  );
}

export function ColorField({
  helpText,
  label,
  onChange,
  value
}: {
  helpText?: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  const fallbackHex = normalizeColorForPicker(value);

  return (
    <label className="field">
      <FieldLabel helpText={helpText} label={label} />
      <div className="color-field">
        <input
          onChange={(event) => onChange(event.target.value)}
          type="color"
          value={fallbackHex}
        />
        <input
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
      </div>
    </label>
  );
}

export function RadiusField({
  helpText,
  label,
  onChange,
  value
}: {
  helpText?: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  const numericRadius = parseRadiusPx(value);

  return (
    <label className="field">
      <FieldLabel helpText={helpText} label={label} />
      <div className="radius-field">
        <input
          className="radius-field-slider"
          max={48}
          min={0}
          onChange={(event) => onChange(`${event.target.value}px`)}
          type="range"
          value={numericRadius}
        />
        <div className="radius-field-input-wrap">
          <input
            min={0}
            onChange={(event) => onChange(`${Math.max(0, Number(event.target.value) || 0)}px`)}
            type="number"
            value={numericRadius}
          />
          <span className="radius-field-suffix">px</span>
        </div>
      </div>
      <div className="radius-preview" aria-hidden="true">
        <div
          className="radius-preview-card"
          style={{ borderRadius: `${numericRadius}px` }}
        >
          <span
            className="radius-preview-pill"
            style={{ borderRadius: `${Math.max(8, Math.round(numericRadius * 0.72))}px` }}
          >
            {numericRadius}px
          </span>
        </div>
      </div>
    </label>
  );
}

const shadowPresets = {
  deep: "0 24px 80px rgba(0, 0, 0, 0.42)",
  none: "none",
  soft: "0 14px 34px rgba(7, 20, 30, 0.22)"
} as const;

export function ShadowField({
  advancedHideLabel,
  advancedShowLabel,
  helpText,
  label,
  onChange,
  value
}: {
  advancedHideLabel: string;
  advancedShowLabel: string;
  helpText?: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  const normalizedValue = value.trim();
  const isPresetSelected = Object.values(shadowPresets).includes(
    normalizedValue as (typeof shadowPresets)[keyof typeof shadowPresets]
  );
  const [showAdvanced, setShowAdvanced] = React.useState(!isPresetSelected);

  React.useEffect(() => {
    if (!Object.values(shadowPresets).includes(normalizedValue as (typeof shadowPresets)[keyof typeof shadowPresets])) {
      setShowAdvanced(true);
    }
  }, [normalizedValue]);

  return (
    <label className="field">
      <FieldLabel helpText={helpText} label={label} />
      <div className="shadow-field">
        <div className="shadow-field-topbar">
          <div className="shadow-field-presets" role="radiogroup">
            {[
              { key: "soft", label: "Soft" },
              { key: "deep", label: "Deep" },
              { key: "none", label: "None" }
            ].map((preset) => {
              const presetValue =
                shadowPresets[preset.key as keyof typeof shadowPresets];
              const isActive = value.trim() === presetValue;

              return (
                <button
                  aria-checked={isActive}
                  className={
                    isActive
                      ? "shadow-preset-button is-active"
                      : "shadow-preset-button"
                  }
                  key={preset.key}
                  onClick={() => onChange(presetValue)}
                  role="radio"
                  type="button"
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <button
            className="inline-button shadow-advanced-toggle"
            onClick={() => setShowAdvanced((current) => !current)}
            type="button"
          >
            {showAdvanced ? advancedHideLabel : advancedShowLabel}
          </button>
        </div>

        <div className="shadow-field-preview" style={{ boxShadow: value }}>
          Aa
        </div>

        {showAdvanced ? (
          <input onChange={(event) => onChange(event.target.value)} value={value} />
        ) : null}
      </div>
    </label>
  );
}

function normalizeColorForPicker(value: string): string {
  const parsed = parseColorToRgb(value);
  if (!parsed) {
    return "#0f1720";
  }

  return toHex(parsed[0], parsed[1], parsed[2]);
}

function parseColorToRgb(value: string): [number, number, number] | null {
  const trimmed = value.trim();

  if (trimmed.startsWith("#")) {
    const hex = trimmed.slice(1);

    if (hex.length === 3) {
      return [
        Number.parseInt(hex[0] + hex[0], 16),
        Number.parseInt(hex[1] + hex[1], 16),
        Number.parseInt(hex[2] + hex[2], 16)
      ];
    }

    if (hex.length >= 6) {
      return [
        Number.parseInt(hex.slice(0, 2), 16),
        Number.parseInt(hex.slice(2, 4), 16),
        Number.parseInt(hex.slice(4, 6), 16)
      ];
    }
  }

  const rgbMatch = trimmed.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return [
      Number.parseInt(rgbMatch[1], 10),
      Number.parseInt(rgbMatch[2], 10),
      Number.parseInt(rgbMatch[3], 10)
    ];
  }

  return null;
}

function toHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((channel) => Math.max(0, Math.min(255, channel)).toString(16).padStart(2, "0"))
    .join("")}`;
}

function parseRadiusPx(value: string): number {
  const numeric = Number.parseFloat(value.replace("px", "").trim());
  if (!Number.isFinite(numeric)) {
    return 0;
  }

  return Math.max(0, Math.min(48, Math.round(numeric)));
}
