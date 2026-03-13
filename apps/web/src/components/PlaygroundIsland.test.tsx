import React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import PlaygroundIsland from "./PlaygroundIsland";

describe("PlaygroundIsland", () => {
  it("exposes accessible tab semantics for generated code views", () => {
    render(<PlaygroundIsland />);

    expect(screen.getByRole("tablist", { name: "Generated Code" })).not.toBeNull();
    expect(screen.getByRole("tab", { name: "React" }).getAttribute("aria-selected")).toBe(
      "true"
    );
    expect(screen.getByRole("tabpanel")).not.toBeNull();
  });

  it("has no obvious accessibility violations", async () => {
    const { container } = render(<PlaygroundIsland />);

    const results = await axe(container);

    expect(results.violations).toHaveLength(0);
  });
});
