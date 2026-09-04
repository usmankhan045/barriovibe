import type { BrandMarkName } from '@/components/icons/brands';
import { SERVICE_COUNT_WORD } from './services';

/**
 * Site-wide constants.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  RENAMING THE AGENCY IS A THREE-LINE EDIT: right here.                │
 * │  Nothing else in the codebase hardcodes the brand name.               │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Every value marked TODO is a placeholder awaiting real data. They render as
 * visible hyphens rather than plausible-looking fake values, so an
 * unfinished field is obvious on the page instead of quietly shipping a lie.
 */

export const BRAND = {
  name: 'BarrioVibe',
  /**
   * TODO: registered legal entity, e.g. "BarrioVibe (Private) Limited".
   * Until one is registered this stays equal to the brand name rather than
   * inventing a suffix the paperwork does not have.
   */
  legalName: 'BarrioVibe',
  /** Production domain. Drives canonical URLs and absolute OG paths. */
  domain: 'https://www.barriovibe.com',
  /** Used in the footer and the wordmark's secondary line. */
  descriptor: 'Business · Digital · Technology',
} as const;

/**
 * IndexNow host key.
 *
 * Proves to Bing, Yandex, Naver and Seznam that whoever submits a URL for
 * recrawling controls this domain. Google does not participate in IndexNow.
 *
 * This is a public verification token rather than a secret: it is served, by
 * design, at `/{key}.txt` for anyone to fetch. `app/{key}.txt/route.ts` serves
 * it, and its directory name must equal this string. `pnpm check:content`
 * asserts that, because a rename here with no matching rename there fails
 * silently: submissions are simply rejected.
 */
export const INDEXNOW_KEY = 'bdd57b0a8a61a3cc7efb6ce8c10abc5e';

export const CONTACT = {
  phone: '+92 309 5034118',
  /** Digits only, no +, no spaces: this is what wa.me expects. */
  whatsapp: '923095034118',
  email: 'barriovibe@gmail.com',
  address: {
    line1: 'Ayan Plaza, Mardan Road',
    city: 'Charsadda',
    country: 'Pakistan',
  },
  /** Displayed on the contact page so nobody wonders when they'll hear back. */
  hours: 'Mon–Sat, 10:00–19:00 PKT',
  responseTime: 'We reply to every enquiry within one working day.',
} as const;

/**
 * The brand's presence elsewhere. One list, consumed by two places that must
 * never disagree: the footer's mark row and the `sameAs` array in the
 * Organization schema. `sameAs` is how a search engine ties this domain to
 * those profiles, so a link that 404s is worse than an absent one.
 *
 * `mark` names a glyph in `components/icons/brands.tsx`. Adding an entry
 * without adding its mark there renders nothing, which is why the type below
 * pins it to that file's keys rather than to `string`.
 *
 * Every href here is a profile the owner has confirmed.
 *
 * Two entries cannot be checked from a script, and are here on the owner's
 * word rather than on a passing request.
 *
 * Facebook: a logged-out request cannot tell a real vanity URL from a dead
 * one. Every path answers 400, including known-good ones, so the response
 * carries no information. This URL was copied from the address bar of the
 * live page, which is the only check that settles it.
 *
 * Reddit (u/Barriovibe): the account is real but has not posted publicly yet,
 * and Reddit blocks automated checks from CI (403 on every profile, active
 * ones included), so the .rss feed cannot confirm otherwise. Listed on the
 * owner's instruction. Two caveats stand until it has public posts: a
 * logged-out click may bounce to Reddit's home feed instead of holding on the
 * profile, and an empty profile is a weak `sameAs` signal.
 */
export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/barriovibe/', mark: 'instagram' },
  { label: 'Pinterest', href: 'https://www.pinterest.com/barriovibe/', mark: 'pinterest' },
  { label: 'X', href: 'https://x.com/BarrioVibe', mark: 'x' },
  { label: 'Quora', href: 'https://www.quora.com/profile/Barrio-Vibe', mark: 'quora' },
  { label: 'Facebook', href: 'https://www.facebook.com/barriovibe/', mark: 'facebook' },
  { label: 'Reddit', href: 'https://www.reddit.com/user/Barriovibe/', mark: 'reddit' },
] as const satisfies readonly { label: string; href: string; mark: BrandMarkName }[];

/**
 * The X handle, with the @, as Twitter Card metadata wants it. Kept beside
 * SOCIALS because it is the same account: if the profile URL above ever
 * changes, this changes with it.
 */
export const X_HANDLE = '@BarrioVibe';

/**
 * The positioning line. Used as the metadata description default and in the
 * footer.
 *
 * It names the DISCIPLINES rather than the three practices. A practice name is
 * a category, and someone who reads only this sentence in a search result
 * should come away knowing what the firm actually does.
 */
export const TAGLINE =
  `Web, apps and AI. Marketing, e-commerce and monetization. Accounting, tax, company registration, IP and overseas setup. ${SERVICE_COUNT_WORD} services, one accountable team.`;

export const SHORT_TAGLINE =
  'One agency for software and AI, performance marketing and e-commerce, and corporate and advisory.';

/**
 * The home page's `<title>`, and the fallback title for anything that does not
 * set one.
 *
 * Separate from SHORT_TAGLINE, which it used to be. That line is a positioning
 * sentence written to be read under a headline, and at 98 characters it made a
 * 125-character title: Google shows roughly 60, so two thirds of it was never
 * seen, and the third that was said "One agency for software and AI, perfor..."
 * rather than what the firm does or where.
 *
 * This is written for the one job a title has, which is to be read in a result
 * list beside nine competitors. Disciplines first because that is what was
 * searched for, Pakistan because it qualifies every one of them, and the brand
 * last because a name means nothing to someone who has not heard it yet.
 */
export const SEO_TITLE =
  'Web, Marketing, Tax and Legal Services in Pakistan';

/**
 * The hero subhead. Separate from TAGLINE, which it used to reuse.
 *
 * TAGLINE is written for a search result: a dense, comma-separated list of
 * what the firm sells, because that is what a snippet has to do in 160
 * characters with no page around it. Under a headline it read as a list rather
 * than as a sentence, and the hero is the one place on the site with a
 * visitor's full attention.
 *
 * So this one makes the argument instead of listing the inventory: what the
 * firm covers, and the reason that breadth is worth anything, which is that it
 * comes under one contract with one team answerable for it. The list is one
 * scroll below in the coverflow, and the full catalogue is a click away.
 */
export const HERO_SUBHEAD =
  `Software and AI, performance marketing and e-commerce, and the corporate, tax and legal work behind them. ${SERVICE_COUNT_WORD} services, one contract, and one team that cannot point at another vendor when something goes wrong.`;
