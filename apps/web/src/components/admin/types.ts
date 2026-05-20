export type SubscriptionStatus = "pending" | "active" | "unsubscribed";

export type NotifyResource = {
  id: string;
  title: string;
  url: string;
  summary: string;
};

export type CatalogResource = NotifyResource;

export type SubscriptionItem = {
  email: string;
  status: SubscriptionStatus;
  locale: "es" | "en";
  source: "hero" | "footer" | "banner" | "modal" | "other";
  updatedAt: string;
  createdAt: string;
};

export type AdminPanelMode = "gate" | "full";

export type AuthHeaders = {
  authorization: string;
  "content-type": string;
};
