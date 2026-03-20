import { CommandPalette } from "@cmd-kit/react";
import { useMemo, useState } from "react";

const sections = [
  {
    id: "navigation",
    title: "Workspace",
    items: [
      {
        id: "overview",
        title: "Overview",
        subtitle: "Open the workspace overview",
        shortcut: "Mod+O",
        onSelect: () => {
          console.log("Open overview");
        }
      },
      {
        id: "go-projects",
        title: "Projects",
        subtitle: "Jump to your active projects",
        shortcut: "Mod+P",
        onSelect: () => {
          console.log("Open projects");
        }
      },
      {
        id: "open-resources",
        title: "Resources",
        subtitle: "Guides and references for the team",
        children: [
          {
            id: "resource-sections",
            title: "Resources",
            items: [
              {
                id: "guides",
                title: "Guides",
                subtitle: "Implementation walkthroughs",
                onSelect: () => {
                  console.log("Open guides");
                }
              },
              {
                id: "api-reference",
                title: "API reference",
                subtitle: "Props, events, and renderers",
                onSelect: () => {
                  console.log("Open API reference");
                }
              },
              {
                id: "release-notes",
                title: "Release notes",
                subtitle: "Recent updates and breaking changes",
                onSelect: () => {
                  console.log("Open release notes");
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "commands",
    title: "Commands",
    items: [
      {
        id: "open-search",
        title: "Search across project",
        subtitle: "Open the global search flow",
        shortcut: "Mod+Shift+P",
        onSelect: () => {
          console.log("Open project search");
        }
      },
      {
        id: "new-command",
        title: "Create command",
        subtitle: "Create a new command entry",
        shortcut: "Mod+N",
        onSelect: () => {
          console.log("Create command");
        }
      },
      {
        id: "switch-theme",
        title: "Toggle theme",
        subtitle: "Switch between light and dark mode",
        shortcut: "Mod+J",
        onSelect: () => {
          console.log("Toggle theme");
        }
      },
      {
        id: "settings",
        title: "Settings",
        subtitle: "Open workspace settings",
        children: [
          {
            id: "settings-sections",
            title: "Settings",
            items: [
              {
                id: "profile-settings",
                title: "Profile",
                subtitle: "Update account details and preferences",
                onSelect: () => {
                  console.log("Open profile settings");
                }
              },
              {
                id: "keyboard-settings",
                title: "Keyboard shortcuts",
                subtitle: "Customize command shortcuts",
                onSelect: () => {
                  console.log("Open keyboard settings");
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

export function App() {
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  const isDark = themeMode === "dark";
  const theme = useMemo(
    () =>
      isDark
        ? {
            accentColor: "#35d7ff",
            backgroundColor: "#0b1116",
            textColor: "#eff7fb",
            mutedColor: "rgba(172, 192, 207, 0.74)",
            borderColor: "rgba(129, 155, 174, 0.16)",
            overlayColor: "rgba(6, 10, 14, 0.74)",
            radius: "22px",
            shadow: "0 24px 80px rgba(0, 0, 0, 0.42)"
          }
        : {
            accentColor: "#0fa6d8",
            backgroundColor: "#ffffff",
            textColor: "#0e1720",
            mutedColor: "rgba(49, 68, 84, 0.78)",
            borderColor: "rgba(83, 112, 136, 0.16)",
            overlayColor: "rgba(232, 241, 248, 0.7)",
            radius: "22px",
            shadow: "0 20px 44px rgba(40, 64, 81, 0.14)"
          },
    [isDark]
  );

  const shellStyle = useMemo(
    () => ({
      minHeight: "100vh",
      padding: "2rem",
      fontFamily: "system-ui, sans-serif",
      color: isDark ? "#e9f4fb" : "#0f1b26",
      background: isDark
        ? "radial-gradient(1200px 600px at 15% 0%, rgba(53, 215, 255, 0.12), transparent 65%), #07111f"
        : "radial-gradient(1200px 600px at 15% 0%, rgba(15, 166, 216, 0.11), transparent 65%), #edf4fa"
    }),
    [isDark]
  );

  const hintStyle = useMemo(
    () => ({ color: isDark ? "#8fa4ba" : "#5b748a" }),
    [isDark]
  );

  return (
    <main style={shellStyle}>
      <button
        onClick={() => setThemeMode((mode) => (mode === "dark" ? "light" : "dark"))}
        style={{
          marginBottom: "1rem",
          borderRadius: "10px",
          border: isDark ? "1px solid rgba(129,155,174,0.28)" : "1px solid rgba(83,112,136,0.24)",
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.75)",
          color: isDark ? "#d8ecf8" : "#1d3447",
          padding: "0.5rem 0.8rem",
          cursor: "pointer"
        }}
        type="button"
      >
        Theme: {isDark ? "Dark" : "Light"}
      </button>
      <h1>cmd+kit React Example</h1>
      <p style={hintStyle}>Press Cmd/Ctrl + K to open the palette.</p>
      <CommandPalette
        messages={{
          closeLabel: "Close example palette"
        }}
        recents={{ sectionTitle: "Recent commands" }}
        sections={sections}
        theme={theme}
        title="React example commands"
      />
    </main>
  );
}
