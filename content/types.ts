/**
 * Content types.
 *
 * Everything a non-developer might edit lives in `content/` as typed data, not
 * inside JSX. `services.ts` in particular is the single source of truth that
 * drives SIX things at once:
 *
 *   1. the 18 static routes             5. sitemap.xml
 *   2. the header mega-menu             6. the contact form's service dropdown
 *   3. the home page service index
 *   4. the footer link columns
 *
 * Adding a 19th service means adding one object. All six update automatically,
 * and `pnpm check:content` fails the build if any required field is left empty
 * — which is what stops a service from being silently hidden.
 */

export type PillarSlug =
  | 'finance-tax'
  | 'corporate-compliance'
  | 'growth-marketing'
  | 'ecommerce'
  | 'software-ai';

export type BadgeVariant = 'blue' | 'chrome';

export interface Pillar {
  slug: PillarSlug;
  /** Display order, also rendered as the ghost numeral: 01 through 05. */
  number: string;
  title: string;
  /** Shorter label for tight spots (mega-menu column heads, breadcrumbs). */
  shortTitle: string;
  /**
   * The pillar page's H1, split for the signature two-line treatment.
   * Written explicitly rather than derived from `title` — splitting
   * "Finance & Tax" on the ampersand produces "& Tax." as an accent line,
   * which reads as a typo.
   */
  headline: { lines: string[]; accent: string };
  /** One sentence, plain English, for pillar cards and the mega-menu. */
  blurb: string;
  /** Longer intro for the pillar page hero. */
  intro: string;
  icon: IconName;
  badge: BadgeVariant;
  /** The 2–4 service names shown as a dotted summary line on the home page. */
  highlights: string[];
}

export interface Step {
  title: string;
  description: string;
  /** e.g. "1–2 days". Shown as a chip on the step. */
  duration: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  pillar: PillarSlug;

  /** Full name, used as the H1 and in the service index. */
  title: string;
  /** Compact name for the mega-menu and footer where space is tight. */
  navLabel: string;
  /**
   * One plain-English sentence answering "what is this?". Shown directly
   * under every link to this service — this is what makes the offering
   * unambiguous at a glance rather than a bare list of nouns.
   */
  oneLiner: string;
  /** Two-to-three sentence definition for the service page hero. */
  intro: string;

  icon: IconName;

  /** Concrete scope. 4–6 items. No vague phrasing. */
  included: string[];
  /** Who buys this. 3 short audience labels. */
  audience: string[];
  /** The engagement, start to finish. Always 4 steps. */
  steps: Step[];
  /** Tangible artefacts the client ends up holding. */
  deliverables: string[];
  /**
   * Paperwork the client must supply. Compliance services only —
   * empty array hides the section.
   */
  documents: string[];

  /** e.g. "3–5 working days" or "Ongoing, monthly". */
  turnaround: string;

  /* NO PRICE FIELDS, DELIBERATELY.
   *
   * `priceFrom` / `priceUnit` used to live here, carrying a "PKR —" placeholder
   * that rendered as a chip on the services hub and a "Starting from" block on
   * every service page. The client's call is that the site quotes privately and
   * publishes no figures at all, so the fields are gone rather than blanked —
   * an empty string in a required field is an invitation to fill it back in.
   * Turnaround is still public; price is not. */

  /** Slugs of 3 related services. At least one should cross pillars. */
  related: string[];

  faqs: Faq[];

  seo: {
    /** Under 60 chars. The brand name is appended by the layout. */
    title: string;
    /** 140–160 chars. */
    description: string;
  };
}

/**
 * Icon names map to inline SVG components in `components/icons`. Kept as a
 * closed union so a typo is a compile error rather than a missing icon at
 * runtime, and so the bundle only ever contains icons that are actually used.
 */
export type IconName =
  | 'calculator'
  | 'ledger'
  | 'receipt'
  | 'percent'
  | 'shield'
  | 'trademark'
  | 'globe-arrows'
  | 'building'
  | 'megaphone'
  | 'cart'
  | 'shopping-bag'
  | 'target'
  | 'play'
  | 'code'
  | 'phone'
  | 'sparkles'
  | 'workflow'
  | 'chat'
  | 'prompt'
  | 'chart'
  | 'users'
  | 'award'
  | 'knight'
  | 'check'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'chevron-down'
  | 'menu'
  | 'close'
  | 'mail'
  | 'whatsapp'
  | 'clock'
  | 'document'
  | 'pin';
