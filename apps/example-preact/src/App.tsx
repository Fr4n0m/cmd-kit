import { CommandPalette } from "@cmd-kit/preact";

export function App() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>cmd+kit Preact Example</h1>
      <p>Press Cmd/Ctrl + K to open the palette.</p>
      <CommandPalette />
    </main>
  );
}
