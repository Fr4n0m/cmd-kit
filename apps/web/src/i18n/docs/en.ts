import type { DocPageData, DocSlug } from "./shared";
import { gettingStartedENDoc } from "./pages/en/getting-started";
import { reactENDoc } from "./pages/en/react";
import { vueENDoc } from "./pages/en/vue";
import { preactENDoc } from "./pages/en/preact";
import { astroENDoc } from "./pages/en/astro";
import { coreENDoc } from "./pages/en/core";
import { customizationENDoc } from "./pages/en/customization";
import { playgroundENDoc } from "./pages/en/playground";

export const docsEn: Record<DocSlug, DocPageData> = {
  "getting-started": gettingStartedENDoc,
  react: reactENDoc,
  vue: vueENDoc,
  preact: preactENDoc,
  astro: astroENDoc,
  core: coreENDoc,
  customization: customizationENDoc,
  playground: playgroundENDoc
};
