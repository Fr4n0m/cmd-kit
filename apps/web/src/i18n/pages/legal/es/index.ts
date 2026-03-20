import type { LegalPageCopy } from "../../shared";
import { legalPrivacyEs } from "./privacy";
import { legalTermsEs } from "./terms";

export const legalEs: Record<"privacy" | "terms", LegalPageCopy> = {
  privacy: legalPrivacyEs,
  terms: legalTermsEs
};
