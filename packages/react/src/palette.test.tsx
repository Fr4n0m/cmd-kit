import { act, fireEvent, render, screen } from "@testing-library/react";
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
});
