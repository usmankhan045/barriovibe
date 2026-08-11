/**
 * Content types.
 *
 * Everything a non-developer might edit lives in `content/` as typed data, not
 * inside JSX. `services.ts` in particular is the single source of truth that
 * drives SIX things at once:
 *
 *   1. the static service routes         5. sitemap.xml
 *   2. the header mega-menu               6. the contact form's service dropdown
 *   3. the home page service index
 *   4. the footer link columns
 *
 * Adding another service means adding one object. All six update
 * automatically, and `pnpm check:content` fails the build if any required
 * field is left empty, which is what stops a service from being silently
 * hidden.
 */

/**
 * The top of the three-level tree: practice → discipline → service.
 *
 * A practice exists because thirty-two services under seven disciplines is
 * more than a single row of mega-menu tabs can carry, and because "Shopify
 * Development" and "Sales Tax" belong to visibly different sides of the
 * business. Practices are what the navbar, the home page and the services hub
 * lead with.
 *
 * ── A practice with more than one discipline HAS a page ──
 *
 * It did not used to. The navbar's practice tab linked to the first discipline
 * under it, which meant clicking "Marketing & E-commerce" landed on a page
 * headed "Growth" that listed three of the practice's six services and never
 * mentioned E-commerce at all. The same hole swallowed ten of the thirteen
 * services under Corporate & Advisory. A tab that names two things and shows
 * one is not a navigation shortcut, it is a page that hides services, which is
 * the exact failure `pnpm check:content` exists to prevent elsewhere.
 *
 * So `/services/{practice}` is now a real route for any practice holding more
 * than one discipline, and it lists every service in the practice, grouped by
 * discipline. A practice holding a SINGLE discipline still has no page of its
 * own: its discipline page already covers it exactly, and Software & AI shares
 * its slug with that discipline, so the two would be the same URL anyway.
 */
export type PracticeSlug =
  | 'software-ai'
  | 'marketing-ecommerce'
  | 'corporate-advisory';

export type PillarSlug =
  | 'software-ai'
  | 'growth-marketing'
  | 'ecommerce'
  | 'finance-tax'
  | 'corporate-legal'
  | 'intellectual-property'
  | 'international-expansion';

export type BadgeVariant = 'blue' | 'chrome';

/**
 * The chess piece a practice is marked with on the home page rake. See
 * components/icons/chess.tsx for the drawings and `mark` on Practice for the
 * mapping.
 */
export type ChessPiece = 'knight' | 'bishop' | 'rook';

/* NO `number`. Practices and disciplines carried one, rendered as a ghost
   numeral beside the icon and as a "Practice 02 ·" label above the heading.
   Both are gone: the numbering ranked things the visitor has no reason to see
   ranked, and array order already carries that ranking wherever it matters.
   Where the label was load-bearing it has been replaced by the service count,
   which is information rather than decoration. The `number` on a ProcessStep
   below is a different thing and stays: a step really is the third of five. */
export interface Practice {
  slug: PracticeSlug;
  title: string;
  /** Shorter label for the mega-menu tab strip, where three tabs share a row. */
  shortTitle: string;
  /**
   * The practice page's H1, split for the signature two-line treatment, same
   * shape as a Pillar's.
   *
   * Optional because only a practice with more than one discipline gets a page
   * to put an H1 on; a single-discipline practice is served by its discipline's
   * page and would never render this. `pnpm check:content` fails the build if a
   * multi-discipline practice is missing it, so the field cannot go absent from
   * a practice that does render one.
   */
  headline?: { lines: string[]; accent: string };
  /** One sentence, plain English, for the home page card. */
  blurb: string;
  /** Longer paragraph for the services hub section head. */
  intro: string;
  icon: IconName;
  badge: BadgeVariant;
  /**
   * The chess piece this practice carries on the home page rake, and only
   * there. `icon`/`badge` above are still what every other surface uses — the
   * services hub, the About grid, the 404 — so this is an addition and not a
   * replacement.
   */
  mark: ChessPiece;
  /**
   * The disciplines inside this practice, in display order. This is the only
   * place the practice → discipline edge is recorded, and
   * `pnpm check:content` fails if a discipline is listed twice or not at all.
   */
  pillars: PillarSlug[];
}

export interface Pillar {
  slug: PillarSlug;
  title: string;
  /**
   * The headline over this discipline's list of services, in the same
   * two-part shape as `headline`.
   *
   * It replaced "N services under Growth", which counted the list instead of
   * saying anything about it. A visitor can see how many cards there are. What
   * they cannot see from a grid of titles is what the discipline is FOR, which
   * is the sentence that belongs here.
   *
   * Written once and used twice: as the section headline on the discipline's
   * own page, and as the headline over the discipline's block on its practice
   * page. Those are the same list in two places, so they say the same thing.
   * Keep it distinct from `headline` above, which is the page's H1 and will
   * sit a screen higher on the discipline page.
   */
  servicesHeadline: { lines: string[]; accent: string };
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

  /* NO TIMING FIELDS, AND NO PRICE FIELDS. DELIBERATELY.
   *
   * `turnaround` used to live here and `Step.duration` above it, rendering as
   * a clock chip on every service card, a "Timeline" band on every service
   * page, and a duration chip on all 128 process steps. They are gone on the
   * client's instruction, for the same reason the prices went: a published
   * figure reads as a commitment, and a compliance firm's real timeline is set
   * by SECP, the FBR, IPO Pakistan, HMRC or the FTA rather than by us.
   *
   * Removed rather than blanked. An empty string in a required field is an
   * invitation to fill it back in.
   *
   * Statutory dates are NOT timings and stay in the copy: "30 September" for
   * an individual return or "the 18th" for a sales tax return is a fact about
   * the regulator, not a promise about us. */

  /* NO PRICE FIELDS, DELIBERATELY.
   *
   * `priceFrom` / `priceUnit` used to live here, carrying a "PKR —" placeholder
   * that rendered as a chip on the services hub and a "Starting from" block on
   * every service page. The client's call is that the site quotes privately and
   * publishes no figures at all, so the fields are gone rather than blanked —
   * an empty string in a required field is an invitation to fill it back in.
   * Neither figure is public now; see the timing note above. */

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
  | 'copyright'
  | 'patent'
  | 'audit'
  | 'compass'
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
  | 'database'
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
