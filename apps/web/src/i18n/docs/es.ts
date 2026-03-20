import type { DocPageData, DocSlug } from "./shared";
import { gettingStartedESDoc } from "./pages/es/getting-started";
import { reactESDoc } from "./pages/es/react";
import { vueESDoc } from "./pages/es/vue";
import { preactESDoc } from "./pages/es/preact";
import { astroESDoc } from "./pages/es/astro";
import { coreESDoc } from "./pages/es/core";
import { customizationESDoc } from "./pages/es/customization";
import { playgroundESDoc } from "./pages/es/playground";

export const docsEs: Record<DocSlug, DocPageData> = {
  "getting-started": gettingStartedESDoc,
  react: reactESDoc,
  vue: vueESDoc,
  preact: preactESDoc,
  astro: astroESDoc,
  core: coreESDoc,
  customization: customizationESDoc,
  playground: playgroundESDoc
};
