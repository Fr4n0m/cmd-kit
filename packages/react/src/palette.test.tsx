import { act, fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { CommandPalette } from "./palette";

const items = [
  {
    id: "dashboard",
    title: "Dashboard",
    section: "Navigation",
    icon: "⌂"
  },
  {
    id: "settings",
    title: "Settings",
    section: "Preferences",
    icon: "⚙"
  }
];

describe("CommandPalette", () => {
  it("renders grouped command items when open", () => {
    render(<CommandPalette defaultOpen items={items} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("filters items from the search input", () => {
    render(<CommandPalette defaultOpen items={items} />);

    fireEvent.change(screen.getByPlaceholderText("Search commands..."), {
      target: { value: "sett" }
    });

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });

  it("executes the selected action on enter", async () => {
    const onSelect = vi.fn();

    render(
      <CommandPalette
        defaultOpen
        items={[
          {
            id: "run",
            title: "Run action",
            section: "Actions",
            onSelect
          }
        ]}
      />
    );

    await act(async () => {
      fireEvent.keyDown(screen.getByPlaceholderText("Search commands..."), {
        key: "Enter"
      });
    });

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("navigates into child sections when an item exposes nested commands", async () => {
    render(
      <CommandPalette
        defaultOpen
        items={[
          {
            id: "settings",
            title: "Settings",
            section: "General",
            children: [
              {
                id: "appearance",
                title: "Appearance",
                items: [{ id: "theme", title: "Theme" }]
              }
            ]
          }
        ]}
      />
    );

    await act(async () => {
      fireEvent.keyDown(screen.getByPlaceholderText("Search commands..."), {
        key: "Enter"
      });
    });

    expect(screen.getByText("Appearance")).toBeInTheDocument();
    expect(screen.getByText("Theme")).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("updates active descendant while navigating with the keyboard", () => {
    render(<CommandPalette defaultOpen items={items} />);

    const input = screen.getByRole("combobox");

    fireEvent.keyDown(input, { key: "ArrowDown" });

    expect(input.getAttribute("aria-activedescendant")).toContain("settings");
  });

  it("has no obvious accessibility violations in the default open state", async () => {
    const { container } = render(<CommandPalette defaultOpen items={items} />);

    const results = await axe(container);

    expect(results.violations).toHaveLength(0);
  });

  it("supports class names and renderer overrides", () => {
    render(
      <CommandPalette
        classNames={{
          dialog: "custom-dialog",
          emptyState: "custom-empty"
        }}
        defaultOpen
        items={items}
        renderers={{
          item: (item, context) => (
            <span>{context.active ? `Active ${item.title}` : item.title}</span>
          ),
          sectionTitle: ({ title }) => <span>{title.toUpperCase()}</span>,
          title: ({ activeTitle }) => <span>{`Palette ${activeTitle}`}</span>
        }}
      />
    );

    expect(screen.getByRole("dialog")).toHaveClass("custom-dialog");
    expect(screen.getByText("Palette Command menu")).toBeInTheDocument();
    expect(screen.getByText("NAVIGATION")).toBeInTheDocument();
    expect(screen.getByText("Active Dashboard")).toBeInTheDocument();
  });

  it("supports a custom empty state renderer", () => {
    render(
      <CommandPalette
        defaultOpen
        items={items}
        renderers={{
          emptyState: ({ query }) => <span>{`Missing ${query}`}</span>
        }}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Search commands..."), {
      target: { value: "zzz" }
    });

    expect(screen.getByText("Missing zzz")).toBeInTheDocument();
  });
});
