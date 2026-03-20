import type { HomePageCopy } from "@/i18n/pages/shared";
import { homeHeroEn } from "./hero";
import { homeLaunchEn } from "./launch";
import { homeOverviewEn } from "./overview";

export const homeEn: HomePageCopy = {
  ...homeHeroEn,
  ...homeOverviewEn,
  ...homeLaunchEn
};

