import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/preact";
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
    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("filters items from the search input", () => {
    render(<CommandPalette defaultOpen items={items} />);

    fireEvent.input(screen.getByPlaceholderText("Search commands..."), {
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

  it("opens from the global shortcut and restores focus when closing", async () => {
    render(
      <>
        <button type="button">Trigger</button>
        <CommandPalette items={items} />
      </>
    );

    const trigger = screen.getByRole("button", { name: "Trigger" });
    trigger.focus();

    await act(async () => {
      fireEvent.keyDown(window, { ctrlKey: true, key: "k" });
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(screen.getByRole("combobox")).toHaveFocus();
    });

    await act(async () => {
      fireEvent.keyDown(screen.getByRole("combobox"), { key: "Escape" });
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

    expect(trigger).toHaveFocus();
  });

  it("has no obvious accessibility violations in the default open state", async () => {
    const { container } = render(<CommandPalette defaultOpen items={items} />);

    const results = await axe(container);

    expect(results.violations).toHaveLength(0);
  });
});
