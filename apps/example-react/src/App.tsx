import { CommandPalette } from "@cmd-kit/react";

export function App() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>cmd+kit React Example</h1>
      <p>Press Cmd/Ctrl + K to open the palette.</p>
      <CommandPalette />
    </main>
  );
}
