import type { HomePageCopy } from "@/i18n/pages/shared";
import { homeHeroEs } from "./hero";
import { homeLaunchEs } from "./launch";
import { homeOverviewEs } from "./overview";

export const homeEs: HomePageCopy = {
  ...homeHeroEs,
  ...homeOverviewEs,
  ...homeLaunchEs
};

