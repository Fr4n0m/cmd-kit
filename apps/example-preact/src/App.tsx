import { CommandPalette } from "@cmd-kit/preact";

const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [{ id: "dashboard", title: "Dashboard", href: "/dashboard" }]
  }
];

export function App() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>cmd+kit Preact Example</h1>
      <p>Press Cmd/Ctrl + K to open the palette.</p>
      <CommandPalette
        recents={{ sectionTitle: "Recent commands" }}
        sections={sections}
        title="Preact example commands"
      />
    </main>
  );
}
