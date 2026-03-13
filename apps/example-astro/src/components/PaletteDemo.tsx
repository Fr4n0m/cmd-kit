import React from "react";
import { CommandPalette } from "@cmd-kit/react";

const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        subtitle: "Open the project dashboard",
        href: "/dashboard",
        icon: "D"
      }
    ]
  },
  {
    id: "actions",
    title: "Actions",
    items: [
      {
        id: "search",
        title: "Search docs",
        subtitle: "Jump into the documentation space",
        icon: "S",
        children: [
          {
            id: "search-scope",
            title: "Search scope",
            items: [
              { id: "guides", title: "Guides", icon: "G" },
              { id: "api", title: "API", icon: "A" }
            ]
          }
        ]
      }
    ]
  }
] as const;

export function PaletteDemo() {
  return (
    <CommandPalette
      recents={{ limit: 4, sectionTitle: "Recent" }}
      sections={sections.map((section) => ({
        ...section,
        items: section.items.map((item) => ({ ...item }))
      }))}
      shortcut="mod+k"
      theme={{
        accentColor: "#ff6b35",
        backgroundColor: "#0f172a",
        borderColor: "#334155",
        mutedColor: "rgba(226, 232, 240, 0.72)",
        overlayColor: "rgba(2, 6, 23, 0.72)",
        radius: "24px",
        shadow: "0 32px 120px rgba(0, 0, 0, 0.35)",
        textColor: "#f8fafc"
      }}
      title="Astro example commands"
    />
  );
}
