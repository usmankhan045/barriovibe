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
  domain: 'https://barriovibe.com',
  /** Used in the footer and the wordmark's secondary line. */
  descriptor: 'Business · Digital · Technology',
} as const;

export const CONTACT = {
  phone: '+92 309 5034118',
  /** Digits only, no +, no spaces: this is what wa.me expects. */
  whatsapp: '923095034118',
  email: 'barriovibe@gmail.com',
  address: {
    /** TODO: real office address. */
    line1: '-',
    city: 'Karachi',
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
 * Every href here was opened and confirmed to land on the real account.
 *
 * Two accounts are deliberately absent.
 *
 * Facebook: the account exists under the same name, but a logged-out request
 * cannot tell a real Facebook vanity URL from a dead one (both answer with the
 * same error page), so it stays out until the exact URL is copied from the
 * address bar of the live page. An unverified profile link in `sameAs` is a
 * claim to a search engine that we cannot back up.
 *
 * Reddit (u/Barriovibe): the account is real, but it has posted nothing. Its
 * feed at /user/Barriovibe/.rss returns zero entries, and Reddit does not hold
 * a visitor on an empty profile: it bounces them to the logged-in home feed,
 * which is what a click on this link actually did. A link that lands somewhere
 * other than where it says is worse than no link, and an empty profile in
 * `sameAs` is a weak signal to a search engine besides. Restore the entry once
 * the account has public posts, and check the .rss feed reports them.
 */
export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/barriovibe/', mark: 'instagram' },
  { label: 'Pinterest', href: 'https://www.pinterest.com/barriovibe/', mark: 'pinterest' },
  { label: 'X', href: 'https://x.com/BarrioVibe', mark: 'x' },
  { label: 'Quora', href: 'https://www.quora.com/profile/Barrio-Vibe', mark: 'quora' },
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
