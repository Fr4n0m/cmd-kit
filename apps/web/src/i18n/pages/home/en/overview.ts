import type { HomeOverviewCopy } from "../shared";

export const homeOverviewEn: HomeOverviewCopy = {
  metricOutputLabel: "Output",
  metricOutputValue: "React, Vue, Preact, CSS, Tailwind, JSON",
  metricSurfaceLabel: "Architecture",
  metricSurfaceValue: "Headless engine + UI adapters",
  overviewLargeBody:
    "Cmd+kit separates engine and presentation so teams can ship quickly with the default UI and move to custom surfaces without rebuilding command logic.",
  overviewLargeEyebrow: "Why it exists",
  overviewLargeHeading:
    "Most command palettes force a trade-off between shipping fast and keeping interface control.",
  overviewReactBody:
    "Ship with the packaged component first, then move to custom rendering while keeping the same command model and execution flow.",
  overviewReactEyebrow: "React",
  overviewReactHeading: "Composable integration surface",
  overviewSearchBody:
    "Fuzzy matching, grouped results, nested navigation, and recents live in the engine and stay consistent across all adapters.",
  overviewSearchEyebrow: "Search",
  overviewSearchHeading: "Search behavior that scales with content"
};
