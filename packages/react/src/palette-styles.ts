import type { CommandTheme } from "@cmd-kit/core";
import type { CSSProperties } from "react";

export function paletteStyle(theme: Required<CommandTheme>): CSSProperties {
  return {
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
  };
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
  return {
    borderRadius: "999px",
    border: `1px solid ${theme.borderColor}`,
    background: "transparent",
    color: theme.mutedColor,
    padding: "0.4rem 0.7rem"
  };
}

export function inputStyle(theme: Required<CommandTheme>): CSSProperties {
  return {
    width: "100%",
    borderRadius: "18px",
    border: `1px solid ${theme.borderColor}`,
    background: "rgba(15, 23, 42, 0.35)",
    color: theme.textColor,
    padding: "1rem 1.1rem",
    fontSize: "1rem",
    outline: "none"
  };
}

export function itemStyle(
  theme: Required<CommandTheme>,
  active: boolean,
  disabled?: boolean
): CSSProperties {
  return {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    textAlign: "left",
    border: "none",
    borderRadius: "18px",
    padding: "0.9rem 1rem",
    background: active ? "rgba(59, 130, 246, 0.15)" : "transparent",
    color: disabled ? theme.mutedColor : theme.textColor,
    opacity: disabled ? 0.55 : 1
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
    letterSpacing: "0.08em"
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

export function iconStyle(active: boolean): CSSProperties {
  return {
    width: "2rem",
    height: "2rem",
    borderRadius: "12px",
    display: "grid",
    placeItems: "center",
    background: active
      ? "rgba(59, 130, 246, 0.25)"
      : "rgba(148, 163, 184, 0.12)"
  };
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

export const captionStyle: CSSProperties = {
  margin: "0.35rem 0 0",
  color: "#94a3b8",
  fontSize: "0.92rem"
};

export const listStyle: CSSProperties = {
  overflow: "auto",
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
