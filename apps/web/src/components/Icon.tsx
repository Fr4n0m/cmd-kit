import React from "react";

interface IconProps {
  className?: string;
  name:
    | "arrow-right"
    | "astro"
    | "code"
    | "copy"
    | "core"
    | "globe"
    | "play"
    | "plus"
    | "preact"
    | "react"
    | "spark"
    | "trash"
    | "triangle-down"
    | "triangle-up"
    | "vanilla"
    | "vue";
  title?: string;
}

export function Icon({ className, name, title }: IconProps) {
  const labelled = Boolean(title);

  const sharedProps = {
    "aria-hidden": labelled ? undefined : true,
    "aria-label": title,
    className,
    fill: "none",
    role: labelled ? "img" : "presentation",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24"
  };

  switch (name) {
    case "arrow-right":
      return (
        <svg {...sharedProps}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "astro":
      return (
        <svg {...sharedProps}>
          <path d="m7.5 17.5 3.1-9.6c.2-.7 1.2-.7 1.4 0l3.1 9.6" />
          <path d="M9.6 14.5h4.8" />
          <path d="M9 18c.9-.6 1.9-.9 3-.9s2.1.3 3 .9" />
        </svg>
      );
    case "code":
      return (
        <svg {...sharedProps}>
          <path d="m9 8-4 4 4 4" />
          <path d="m15 8 4 4-4 4" />
          <path d="m13.5 5.5-3 13" />
        </svg>
      );
    case "copy":
      return (
        <svg {...sharedProps}>
          <rect height="11" rx="2" width="11" x="9" y="9" />
          <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1" />
        </svg>
      );
    case "core":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 3.5v3" />
          <path d="M12 17.5v3" />
          <path d="m4.6 7.1 2.6 1.5" />
          <path d="m16.8 14.4 2.6 1.5" />
          <path d="m4.6 16.9 2.6-1.5" />
          <path d="m16.8 9.6 2.6-1.5" />
        </svg>
      );
    case "globe":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.8 12h16.4" />
          <path d="M12 3.5c2.4 2.4 3.7 5.4 3.7 8.5s-1.3 6.1-3.7 8.5c-2.4-2.4-3.7-5.4-3.7-8.5s1.3-6.1 3.7-8.5Z" />
        </svg>
      );
    case "play":
      return (
        <svg {...sharedProps}>
          <path d="m9 7 8 5-8 5z" />
        </svg>
      );
    case "plus":
      return (
        <svg {...sharedProps}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );
    case "preact":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="3.1" />
          <circle cx="12" cy="12" r="7.3" strokeDasharray="2.4 2.4" />
        </svg>
      );
    case "react":
      return (
        <svg {...sharedProps}>
          <ellipse cx="12" cy="12" rx="9" ry="3.8" />
          <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "spark":
      return (
        <svg {...sharedProps}>
          <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
        </svg>
      );
    case "trash":
      return (
        <svg {...sharedProps}>
          <path d="M4 7h16" />
          <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
          <path d="M7.5 7 8.2 18a2 2 0 0 0 2 1.9h3.6a2 2 0 0 0 2-1.9L16.5 7" />
          <path d="M10 10.5v5.5" />
          <path d="M14 10.5v5.5" />
        </svg>
      );
    case "triangle-down":
      return (
        <svg {...sharedProps}>
          <path d="m7 10 5 6 5-6" />
        </svg>
      );
    case "triangle-up":
      return (
        <svg {...sharedProps}>
          <path d="m7 14 5-6 5 6" />
        </svg>
      );
    case "vanilla":
      return (
        <svg {...sharedProps}>
          <path d="M8 5.5h8l3 4.2-7 8.8-7-8.8Z" />
          <path d="m9.8 9.5 2.2 7 2.2-7" />
        </svg>
      );
    case "vue":
      return (
        <svg {...sharedProps}>
          <path d="m4.5 6 7.5 12L19.5 6" />
          <path d="m8.3 6 3.7 6 3.7-6" />
        </svg>
      );
  }
}
