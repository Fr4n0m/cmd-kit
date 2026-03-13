import React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import PlaygroundIsland from "./PlaygroundIsland";

describe("PlaygroundIsland", () => {
  it("has no obvious accessibility violations", async () => {
    const { container } = render(<PlaygroundIsland />);

    const results = await axe(container);

    expect(results.violations).toHaveLength(0);
  });
});
