import type { LegalPageCopy } from "@/i18n/pages/shared";

export const legalPrivacyEn: LegalPageCopy = {
  description: "Privacy Policy for Cmd+kit.",
  eyebrow: "Legal",
  heading: "Privacy Policy",
  lastUpdatedLabel: "Last updated",
  lastUpdatedValue: "April 16, 2026",
  sections: [
    {
      id: "controller",
      title: "Data controller",
      paragraphs: [
        "Controller: <code>Fr4n0m</code> (owner of the Cmd+kit project and website).",
        "Privacy and site-usage contact: <code>fran11799@outlook.com</code>."
      ]
    },
    {
      id: "data-we-process",
      title: "What data we process",
      paragraphs: ["In the current state of the site, we process the minimum technical information needed to operate it."],
      items: [
        "<strong>Basic technical data:</strong> connection-level and infrastructure logs (for example IP address, user agent, and error traces), handled by hosting/CDN providers for security and operations.",
        "<strong>Local preferences:</strong> we store light/dark theme preference in browser <code>localStorage</code> (<code>cmd-kit-theme</code>).",
        "<strong>No user accounts:</strong> there is currently no sign-up/login or private app area.",
        "<strong>No active forms:</strong> the site does not currently collect data through contact or support forms."
      ]
    },
    {
      id: "purposes-legal-basis",
      title: "Purposes and legal basis",
      paragraphs: ["We process this information to:"],
      items: [
        "provide the website and public documentation;",
        "maintain security, stability, and technical diagnostics;",
        "remember interface preferences.",
        "The legal basis may include legitimate interest (security/operations), pre-contractual measures, or consent where applicable."
      ]
    },
    {
      id: "cookies-storage",
      title: "Cookies and local storage",
      paragraphs: [
        "Cmd+kit does not set first-party marketing or profiling cookies from its own code.",
        "The site uses browser local storage for interface preferences (theme).",
        "Infrastructure providers may set strictly necessary technical cookies required for delivery and security."
      ]
    },
    {
      id: "processors-third-parties",
      title: "Providers and third-party links",
      paragraphs: [
        "The site may rely on technical infrastructure providers (hosting, CDN, security, and code hosting).",
        "It also links to external services (for example GitHub, Buy Me a Coffee, or portfolio pages). Once you leave this site, each third party's own privacy policy applies."
      ]
    },
    {
      id: "retention",
      title: "Data retention",
      paragraphs: [
        "Technical information is retained only for as long as needed for operations, security, diagnostics, and applicable legal obligations."
      ]
    },
    {
      id: "your-rights",
      title: "Your rights",
      paragraphs: ["Where applicable under data-protection law, you may request:"],
      items: [
        "access to your personal data;",
        "rectification of inaccurate data;",
        "erasure;",
        "restriction of processing or objection;",
        "data portability;",
        "to lodge a complaint with the relevant supervisory authority."
      ]
    },
    {
      id: "policy-updates",
      title: "Policy updates",
      paragraphs: [
        "We may update this policy to reflect legal, technical, or product changes. The current version and update date are published on this page."
      ]
    }
  ],
  title: "Cmd+kit | Privacy Policy"
};


