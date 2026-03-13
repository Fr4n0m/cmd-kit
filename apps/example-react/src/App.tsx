import { CommandPalette } from "@cmd-kit/react";

const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        subtitle: "Open the main workspace",
        section: "Navigation"
      }
    ]
  },
  {
    id: "actions",
    title: "Actions",
    items: [
      {
        id: "search",
        title: "Search everything",
        children: [
          {
            id: "scopes",
            title: "Scopes",
            items: [{ id: "docs", title: "Documentation" }]
          }
        ]
      }
    ]
  }
];

export function App() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>cmd+kit React Example</h1>
      <p>Press Cmd/Ctrl + K to open the palette.</p>
      <CommandPalette
        messages={{
          closeLabel: "Close example palette"
        }}
        recents={{ sectionTitle: "Recent commands" }}
        sections={sections}
        title="React example commands"
      />
    </main>
  );
}
