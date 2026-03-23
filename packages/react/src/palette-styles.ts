import type { CommandTheme } from "@cmd-kit/core";
import type { CSSProperties } from "react";

export function paletteStyle(theme: Required<CommandTheme>): CSSProperties {
  return {
    width: "min(700px, calc(100vw - 4rem))",
    maxHeight: "min(720px, calc(100vh - 2rem))",
    overflow: "hidden",
    boxSizing: "border-box",
    borderRadius: theme.radius,
    border: `1px solid ${theme.borderColor}`,
    background: theme.backgroundColor,
    color: theme.textColor,
    fontFamily:
      'Sora, Inter, "Segoe UI", system-ui, -apple-system, sans-serif',
    boxShadow: theme.shadow,
    padding: "1.6rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.15rem"
  };
}

export function overlayStyle(color: string): CSSProperties {
  return {
    position: "fixed",
    inset: 0,
    background: color,
    display: "grid",
    placeItems: "center",
    padding: "1.5rem",
    zIndex: 9999,
    backdropFilter: "blur(14px)"
  };
}

export function closeButtonStyle(theme: Required<CommandTheme>): CSSProperties {
  const light = isLightTheme(theme);
  return {
    borderRadius: "999px",
    border: light
      ? `1px solid ${theme.borderColor}`
      : "1px solid rgba(146, 173, 194, 0.22)",
    background: light ? "rgba(15, 166, 216, 0.05)" : "rgba(166, 191, 212, 0.08)",
    color: light ? theme.mutedColor : "rgba(216, 232, 244, 0.92)",
    appearance: "none",
    width: "2.4rem",
    height: "2.4rem",
    minWidth: "2.4rem",
    minHeight: "2.4rem",
    padding: "0",
    display: "inline-grid",
    placeItems: "center",
    lineHeight: "1",
    fontSize: "0",
    fontWeight: 700,
    textAlign: "center",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    cursor: "pointer",
    transition:
      "background-color 160ms ease, border-color 160ms ease, transform 140ms ease"
  };
}

export function backButtonStyle(theme: Required<CommandTheme>): CSSProperties {
  return {
    border: "none",
    background: "transparent",
    color: theme.mutedColor,
    width: "auto",
    height: "auto",
    minWidth: "auto",
    minHeight: "auto",
    padding: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    fontSize: "1.1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 140ms ease, color 160ms ease, opacity 160ms ease",
    opacity: 0.9
  };
}

export function inputStyle(theme: Required<CommandTheme>): CSSProperties {
  const light = isLightTheme(theme);
  return {
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "18px",
    border: `1px solid ${theme.borderColor}`,
    background: light ? "rgba(171, 189, 205, 0.16)" : "rgba(255, 255, 255, 0.03)",
    color: theme.textColor,
    padding: "1.06rem 1.22rem",
    fontSize: "1rem",
    outline: "none"
  };
}

export function itemStyle(
  theme: Required<CommandTheme>,
  active: boolean,
  disabled?: boolean
): CSSProperties {
  const light = isLightTheme(theme);
  return {
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    textAlign: "left",
    border: active
      ? `1px solid ${light ? "rgba(15, 166, 216, 0.22)" : "rgba(53, 215, 255, 0.26)"}`
      : "1px solid transparent",
    borderRadius: "18px",
    padding: "0.64rem 0.86rem",
    background: active
      ? light
        ? "rgba(15, 166, 216, 0.13)"
        : "rgba(53, 215, 255, 0.14)"
      : "transparent",
    transition:
      "background-color 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease",
    color: disabled ? theme.mutedColor : theme.textColor,
    opacity: disabled ? 0.55 : 1,
    cursor: disabled ? "not-allowed" : "pointer"
  };
}

export function sectionTitleStyle(
  theme: Required<CommandTheme>
): CSSProperties {
  const light = isLightTheme(theme);
  return {
    margin: 0,
    color: light ? "rgba(49, 68, 84, 0.58)" : theme.mutedColor,
    fontSize: "0.78rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontFamily:
      '"IBM Plex Mono", "Cascadia Code", "Fira Code", ui-monospace, monospace'
  };
}

export function emptyStateStyle(theme: Required<CommandTheme>): CSSProperties {
  return {
    borderRadius: "18px",
    border: `1px dashed ${theme.borderColor}`,
    color: theme.mutedColor,
    textAlign: "center",
    padding: "2rem"
  };
}

export function iconStyle(
  theme: Required<CommandTheme>,
  active: boolean
): CSSProperties {
  const light = isLightTheme(theme);
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.05rem",
    height: "2.05rem",
    fontSize: "1.5rem",
    lineHeight: 1,
    flexShrink: 0,
    transform: "scale(1)",
    transition: "transform 160ms ease, color 160ms ease",
    color: active
      ? light
        ? "#0b607f"
        : "#eaf8ff"
      : light
        ? "rgba(47, 84, 107, 0.86)"
        : "rgba(188, 208, 223, 0.88)"
  };
}

export const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1.1rem",
  alignItems: "flex-start"
};

export const breadcrumbsStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.35rem",
  marginBottom: "0.45rem",
  color: "#94a3b8",
  fontSize: "0.78rem",
  fontFamily:
    '"IBM Plex Mono", "Cascadia Code", "Fira Code", ui-monospace, monospace'
};

export const headerActionsStyle: CSSProperties = {
  display: "flex",
  gap: "0.5rem",
  alignItems: "flex-start"
};

export const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.24rem",
  fontWeight: 600,
  letterSpacing: "-0.006em",
  lineHeight: 1.2,
  fontFamily:
    'Sora, Inter, "Segoe UI", system-ui, -apple-system, sans-serif'
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
  fontSize: "0.92rem",
  fontFamily:
    'Sora, Inter, "Segoe UI", system-ui, -apple-system, sans-serif'
};

export const listStyle: CSSProperties = {
  overflow: "auto",
  boxSizing: "border-box",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
};

export const sectionStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.7rem"
};

export const sectionItemsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.32rem"
};

export const itemLeadingStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.9rem"
};

export const itemTitleStyle: CSSProperties = {
  display: "block",
  fontWeight: 600,
  fontSize: "0.98rem",
  lineHeight: 1.16,
  letterSpacing: "-0.004em",
  transform: "scale(1)",
  transformOrigin: "left center",
  transition: "transform 160ms ease, color 160ms ease",
  fontFamily:
    'Sora, Inter, "Segoe UI", system-ui, -apple-system, sans-serif'
};

export const itemSubtitleStyle: CSSProperties = {
  display: "block",
  fontSize: "0.86rem",
  color: "#94a3b8",
  marginTop: "0.12rem",
  lineHeight: 1.2
};

export const shortcutStyle: CSSProperties = {
  color: "#94a3b8",
  fontSize: "0.82rem",
  fontFamily:
    '"IBM Plex Mono", "Cascadia Code", "Fira Code", ui-monospace, monospace'
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
