# @cmd-kit/preact

Preact bindings for `cmd+kit`.

## Install

```bash
npm install @cmd-kit/core @cmd-kit/preact preact
```

## Use

```tsx
import { CommandPalette } from "@cmd-kit/preact";

export function App() {
  return (
    <CommandPalette
      items={[
        { id: "dashboard", title: "Dashboard", section: "Navigation" },
        { id: "settings", title: "Settings", section: "Preferences" }
      ]}
    />
  );
}
```
