import type { LegalPageCopy } from "../../shared";
import { legalPrivacyEn } from "./privacy";
import { legalTermsEn } from "./terms";

export const legalEn: Record<"privacy" | "terms", LegalPageCopy> = {
  privacy: legalPrivacyEn,
  terms: legalTermsEn
};
