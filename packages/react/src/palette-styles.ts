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
  const light = isLightTheme(theme);
  return {
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
    fontWeight: 600,
    cursor: "pointer"
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
    padding: "0.98rem 1.2rem",
    background: active
      ? light
        ? "rgba(15, 166, 216, 0.13)"
        : "rgba(53, 215, 255, 0.14)"
      : "transparent",
    color: disabled ? theme.mutedColor : theme.textColor,
    opacity: disabled ? 0.55 : 1,
    cursor: disabled ? "not-allowed" : "pointer"
  };
}

export function sectionTitleStyle(
  theme: Required<CommandTheme>
): CSSProperties {
  return {
    margin: 0,
    color: theme.mutedColor,
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
