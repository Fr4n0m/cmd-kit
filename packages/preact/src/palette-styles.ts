import type { CommandTheme } from "@cmd-kit/core";
import type { CSSProperties } from "preact/compat";

const SQUIRCLE_SHAPE = "superellipse(0.7)";

function withSquircle(styles: CSSProperties): CSSProperties {
  return {
    ...styles,
    cornerShape: SQUIRCLE_SHAPE,
    ["corner-shape" as unknown as keyof CSSProperties]:
      SQUIRCLE_SHAPE as unknown as CSSProperties[keyof CSSProperties]
  } as CSSProperties;
}

export function paletteStyle(theme: Required<CommandTheme>): CSSProperties {
  return withSquircle({
    width: "min(680px, calc(100vw - 2rem))",
    maxHeight: "min(720px, calc(100vh - 2rem))",
    overflow: "hidden",
    borderRadius: theme.radius,
    border: `1px solid ${theme.borderColor}`,
    background: theme.backgroundColor,
    color: theme.textColor,
    boxShadow: theme.shadow,
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  });
}

export function overlayStyle(color: string): CSSProperties {
  return {
    position: "fixed",
    inset: 0,
    background: color,
    display: "grid",
    placeItems: "center",
    padding: "1rem",
    zIndex: 9999,
    backdropFilter: "blur(14px)"
  };
}

export function closeButtonStyle(theme: Required<CommandTheme>): CSSProperties {
  const light = isLightTheme(theme);
  return withSquircle({
    borderRadius: "999px",
    border: `1px solid ${theme.borderColor}`,
    background: light ? "rgba(15, 166, 216, 0.06)" : "rgba(255, 255, 255, 0.02)",
    color: theme.mutedColor,
    appearance: "none",
    width: "2.25rem",
    height: "2.25rem",
    minWidth: "2.25rem",
    minHeight: "2.25rem",
    padding: "0",
    display: "inline-grid",
    placeItems: "center",
    lineHeight: "1",
    fontSize: "1.1rem",
    fontWeight: 700,
    textAlign: "center",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
  });
}

export function backButtonStyle(theme: Required<CommandTheme>): CSSProperties {
  const light = isLightTheme(theme);
  return withSquircle({
    borderRadius: "0.65rem",
    border: `1px solid ${theme.borderColor}`,
    background: light ? "rgba(15, 166, 216, 0.08)" : "rgba(255, 255, 255, 0.03)",
    color: theme.mutedColor,
    width: "1.65rem",
    height: "1.65rem",
    padding: 0,
    display: "inline-grid",
    placeItems: "center",
    lineHeight: 1,
    fontSize: "0.95rem",
    fontWeight: 600
  });
}

export function inputStyle(theme: Required<CommandTheme>): CSSProperties {
  const light = isLightTheme(theme);
  return withSquircle({
    width: "100%",
    borderRadius: "18px",
    border: `1px solid ${theme.borderColor}`,
    background: light ? "rgba(88, 108, 126, 0.12)" : "rgba(255, 255, 255, 0.03)",
    color: theme.textColor,
    padding: "1rem 1.1rem",
    fontSize: "1rem",
    outline: "none"
  });
}

export function itemStyle(
  theme: Required<CommandTheme>,
  active: boolean,
  disabled?: boolean
): CSSProperties {
  const light = isLightTheme(theme);
  return withSquircle({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    textAlign: "left",
    border: active
      ? `1px solid ${light ? "rgba(15, 166, 216, 0.22)" : "rgba(53, 215, 255, 0.26)"}`
      : "1px solid transparent",
    borderRadius: "18px",
    padding: "0.9rem 1rem",
    background: active
      ? light
        ? "rgba(15, 166, 216, 0.13)"
        : "rgba(53, 215, 255, 0.14)"
      : "transparent",
    color: disabled ? theme.mutedColor : theme.textColor,
    opacity: disabled ? 0.55 : 1
  });
}

export function sectionTitleStyle(
  theme: Required<CommandTheme>
): CSSProperties {
  return {
    margin: 0,
    color: theme.mutedColor,
    fontSize: "0.78rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em"
  };
}

export function emptyStateStyle(theme: Required<CommandTheme>): CSSProperties {
  return withSquircle({
    borderRadius: "18px",
    border: `1px dashed ${theme.borderColor}`,
    color: theme.mutedColor,
    textAlign: "center",
    padding: "2rem"
  });
}

export function iconStyle(
  theme: Required<CommandTheme>,
  active: boolean
): CSSProperties {
  const light = isLightTheme(theme);
  return withSquircle({
    width: "2rem",
    height: "2rem",
    borderRadius: "0.78rem",
    display: "grid",
    placeItems: "center",
    color: active
      ? light
        ? "#0b607f"
        : "#eaf8ff"
      : light
        ? "#2f546b"
        : "rgba(188, 208, 223, 0.88)",
    border: active
      ? `1px solid ${light ? "rgba(15, 166, 216, 0.28)" : "rgba(53, 215, 255, 0.3)"}`
      : `1px solid ${light ? "rgba(83, 112, 136, 0.18)" : "rgba(129, 155, 174, 0.18)"}`,
    background: active
      ? light
        ? "rgba(15, 166, 216, 0.2)"
        : "rgba(53, 215, 255, 0.24)"
      : light
        ? "rgba(83, 112, 136, 0.1)"
        : "rgba(180, 205, 221, 0.12)"
  });
}

export const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  alignItems: "start"
};

export const breadcrumbsStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.35rem",
  marginBottom: "0.45rem",
  color: "#94a3b8",
  fontSize: "0.78rem"
};

export const headerActionsStyle: CSSProperties = {
  display: "flex",
  gap: "0.5rem"
};

export const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.1rem",
  fontWeight: 700
};

export const titleRowStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.45rem",
  minWidth: 0
};

export const captionStyle: CSSProperties = {
  margin: "0.35rem 0 0",
  color: "#94a3b8",
  fontSize: "0.92rem"
};

export const listStyle: CSSProperties = {
  overflow: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
};

export const sectionStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.55rem"
};

export const sectionItemsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem"
};

export const itemLeadingStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.8rem"
};

export const itemTitleStyle: CSSProperties = {
  display: "block",
  fontWeight: 600
};

export const itemSubtitleStyle: CSSProperties = {
  display: "block",
  fontSize: "0.88rem",
  color: "#94a3b8",
  marginTop: "0.15rem"
};

export const shortcutStyle: CSSProperties = {
  color: "#94a3b8",
  fontSize: "0.82rem"
};

function isLightTheme(theme: Required<CommandTheme>): boolean {
  const rgb = parseColorToRgb(theme.backgroundColor);
  if (!rgb) {
    return false;
  }

  const [r, g, b] = rgb;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.72;
}

function parseColorToRgb(color: string): [number, number, number] | null {
  const value = color.trim();

  if (value.startsWith("#")) {
    const hex = value.slice(1);

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

  const rgbMatch = value.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return [
      Number.parseInt(rgbMatch[1], 10),
      Number.parseInt(rgbMatch[2], 10),
      Number.parseInt(rgbMatch[3], 10)
    ];
  }

  return null;
}
