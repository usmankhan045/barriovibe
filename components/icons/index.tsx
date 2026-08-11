import type { IconName } from '@/content/types';

/**
 * Hand-drawn inline SVG icon set.
 *
 * No icon library. A package like lucide-react adds 20–40KB to the bundle for
 * a set of ~1400 icons when the site uses 33 — and tree-shaking only helps if
 * every import site is statically analysable, which a data-driven
 * `icon: IconName` lookup is not.
 *
 * Every path is stroke-based on a 24×24 grid at 1.75 stroke width, uses
 * `currentColor`, and inherits size from the wrapper. That consistency is
 * what makes them read as one family inside the glossy badges.
 */

type PathSet = React.ReactNode;

const PATHS: Record<IconName, PathSet> = {
  // ── Finance & tax ────────────────────────────────────────────────────────
  calculator: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
      <rect x="7.5" y="6" width="9" height="3.5" rx="1" />
      <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01" />
    </>
  ),
  ledger: (
    <>
      <path d="M5 3.5h12a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H5z" />
      <path d="M5 3.5a2 2 0 0 0 0 4h2M9 9h6M9 13h6M9 17h3" />
    </>
  ),
  receipt: (
    <>
      <path d="M5 2.5v19l2.5-1.5 2.5 1.5 2-1.5 2 1.5 2.5-1.5L19 21.5v-19z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  percent: (
    <>
      <path d="M19 5 5 19" />
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </>
  ),
  /** A document with the magnifying glass an audit actually is. */
  audit: (
    <>
      <path d="M13.5 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h6" />
      <path d="M13.5 2.5v6h6M7.5 12h5M7.5 16h3" />
      <circle cx="16" cy="16.5" r="3" />
      <path d="m18.3 18.8 2 2" />
    </>
  ),

  // ── Corporate & compliance ───────────────────────────────────────────────
  shield: (
    <>
      <path d="M12 2.5 4.5 5.5v6c0 4.8 3.1 8.7 7.5 10 4.4-1.3 7.5-5.2 7.5-10v-6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  trademark: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M6.5 9h4M8.5 9v6M13 15V9l2 3 2-3v6" />
    </>
  ),
  /** A "C" ringed like the trademark mark, so the two read as one IP family. */
  copyright: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M14.8 9.3a3.5 3.5 0 1 0 0 5.4" />
    </>
  ),
  /** A lightbulb: the invention behind a patent, not the paperwork. */
  patent: (
    <>
      <path d="M12 2.5a6 6 0 0 0-3.4 10.9c.7.5 1.1 1.3 1.2 2.2h4.4c.1-.9.5-1.7 1.2-2.2A6 6 0 0 0 12 2.5z" />
      <path d="M9.5 6.8A3 3 0 0 1 12 5.5" />
      <path d="M9.5 18.5h5M10.3 21h3.4" />
    </>
  ),
  /** A compass: the instrument for entering a market you don't operate in yet. */
  compass: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="m15.2 8.8-4.1 2.3-1.4 4.1 4.1-2.3z" />
    </>
  ),
  'globe-arrows': (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5c2.5 2.6 3.9 6 4 9.5-.1 3.5-1.5 6.9-4 9.5-2.5-2.6-3.9-6-4-9.5.1-3.5 1.5-6.9 4-9.5z" />
    </>
  ),
  building: (
    <>
      <path d="M3.5 21.5h17M5 21.5V4a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 15 4v17.5" />
      <path d="M15 8.5h3.5A1.5 1.5 0 0 1 20 10v11.5" />
      <path d="M8.5 6.5h3M8.5 10.5h3M8.5 14.5h3M9.5 21.5v-3h1v3" />
    </>
  ),

  // ── Growth & e-commerce ──────────────────────────────────────────────────
  megaphone: (
    <>
      <path d="M3.5 10v4a1.5 1.5 0 0 0 1.5 1.5h2l7 4.5V4L7 8.5H5A1.5 1.5 0 0 0 3.5 10z" />
      <path d="M17.5 8.5a5 5 0 0 1 0 7M20 6a8.5 8.5 0 0 1 0 12" />
    </>
  ),
  cart: (
    <>
      <circle cx="9.5" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2.5 3h2.7l2.2 11.2a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.3l1.5-7.7H6" />
    </>
  ),
  'shopping-bag': (
    <>
      <path d="M4.5 7.5h15l-1.2 13a1.5 1.5 0 0 1-1.5 1.4H7.2a1.5 1.5 0 0 1-1.5-1.4z" />
      <path d="M8.5 10.5v-4a3.5 3.5 0 0 1 7 0v4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  play: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="4" />
      <path d="m10 9 5 3-5 3z" />
    </>
  ),

  // ── Software & AI ────────────────────────────────────────────────────────
  code: (
    <>
      <path d="m8.5 8-4.5 4 4.5 4M15.5 8l4.5 4-4.5 4M13.5 4.5l-3 15" />
    </>
  ),
  phone: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10.5 5.5h3M11 18.5h2" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 2.5 1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
      <path d="m18.5 15.5.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </>
  ),
  workflow: (
    <>
      <rect x="2.5" y="2.5" width="7" height="7" rx="2" />
      <rect x="14.5" y="14.5" width="7" height="7" rx="2" />
      <path d="M6 9.5V15a3 3 0 0 0 3 3h5.5" />
      <path d="M12 6h4a2 2 0 0 1 2 2v6.5" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11.5a8 8 0 0 1-8.5 8 9 9 0 0 1-3.9-.9L3.5 20.5l1.9-5.1A8 8 0 0 1 4.5 11 8 8 0 0 1 13 3.5a8 8 0 0 1 8 8z" />
      <path d="M9 11h.01M12.5 11h.01M16 11h.01" />
    </>
  ),
  prompt: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="m7 10 2.5 2L7 14M12.5 14.5h5" />
    </>
  ),
  /* Stacked store plus a retrieval ray, for RAG. The three ellipses are the
     indexed corpus and the arrow leaving them is the passage coming back with
     the answer, which is the one thing that distinguishes this service from
     the chatbot and agent icons either side of it. */
  database: (
    <>
      <ellipse cx="9.5" cy="5.5" rx="7" ry="3" />
      <path d="M2.5 5.5v6c0 1.66 3.13 3 7 3 .7 0 1.37-.04 2-.12" />
      <path d="M2.5 11.5v6c0 1.66 3.13 3 7 3M16.5 5.5v4" />
      <path d="M14.5 19.5h6m-2.5-2.5 2.5 2.5-2.5 2.5" />
    </>
  ),

  // ── Proof & differentiators ──────────────────────────────────────────────
  chart: (
    <>
      <path d="M3.5 3.5v15a2 2 0 0 0 2 2h15" />
      <path d="M7.5 16v-4M12 16V7.5M16.5 16v-6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20.5a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.9a3.5 3.5 0 0 1 0 6.2M17.5 14.6a6.5 6.5 0 0 1 4 5.9" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6.5" />
      <path d="m8.5 14.5-1 7 4.5-2.5 4.5 2.5-1-7" />
    </>
  ),
  /** A chess knight — the one icon that ties the set to the chess art. */
  knight: (
    <>
      <path d="M6.5 21.5h11M8 18.5h8l-.5-3.5c2-1.5 3-3.8 3-6.5 0-1.6-.6-3-1.7-4.1L15 2.5l-1 1.6-3.3-.9c-1.4-.4-2.9.2-3.6 1.5L5.5 8.2a1.4 1.4 0 0 0 .7 2l1.6.6L9 9.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 6.5V12l3.5 2" />
    </>
  ),
  document: (
    <>
      <path d="M13.5 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8.5z" />
      <path d="M13.5 2.5v6h6M8.5 13h7M8.5 17h5" />
    </>
  ),
  /** A map pin — the "pinned to the plan" marker on the process cards. */
  pin: (
    <>
      <path d="M12 21.5s7-7.4 7-12.5a7 7 0 1 0-14 0c0 5.1 7 12.5 7 12.5z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),

  // ── UI ───────────────────────────────────────────────────────────────────
  check: <path d="m4.5 12.5 5 5 10-11" />,
  'arrow-right': <path d="M3.5 12h17m-6.5-6.5L20.5 12 14 18.5" />,
  'arrow-up-right': <path d="M6.5 17.5 17.5 6.5M8 6.5h9.5V16" />,
  'chevron-down': <path d="m5.5 9 6.5 6.5L18.5 9" />,
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="M5.5 5.5 18.5 18.5M18.5 5.5 5.5 18.5" />,
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 7 7.4 5.3a2 2 0 0 0 2.2 0L20.5 7" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20.5 11.7a8.4 8.4 0 0 1-12.5 7.3L3.5 20.5l1.5-4.4A8.4 8.4 0 1 1 20.5 11.7z" />
      <path d="M9 8.5c-.4 0-.8.2-1 .6-.4.7-.3 1.6.2 2.4a9 9 0 0 0 4 3.7c.9.3 1.8.2 2.3-.4.2-.3.3-.7.2-1l-1.6-.8-.8.9a6 6 0 0 1-2.4-2.3l.9-.8z" />
    </>
  ),
};

export interface IconProps {
  name: IconName;
  /** Pixel size. Inherits color from `currentColor`. */
  size?: number;
  className?: string;
  /** Set only when the icon is the sole content of an interactive element. */
  label?: string;
}

export function Icon({ name, size = 24, className, label }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      // Icons sit beside text labels almost everywhere, so the default is
      // decorative. `label` opts a specific instance into being announced.
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}

export const ICON_NAMES = Object.keys(PATHS) as IconName[];
