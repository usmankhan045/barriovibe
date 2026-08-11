/**
 * Practice 02, Performance Marketing & E-commerce, as the home page states it.
 *
 * ## Why this is the whole practice and not a shortlist
 *
 * content/featuredServices.ts is a shortlist because Corporate & Advisory runs
 * to nineteen services and six is a choice. This practice has five. Naming all
 * five costs one extra card and removes the question a shortlist always
 * invites, which is what got left out.
 *
 * ## The order is the funnel
 *
 * Demand first, then the storefront the demand arrives at: three Growth &
 * Marketing services, then two E-commerce ones. The section renders them left
 * to right in this order, so reading order is the funnel. Reordering this array
 * reorders the funnel, which is the one thing here that is not free to change.
 *
 * The row used to descend as well, one card lower than the last, saying the
 * same thing a second way. It is level now; the note on `.u-rev-card` in
 * globals.css records why.
 *
 * ## `note` and `scope`
 *
 * `note` is one clause of mechanism, no adjectives, written for a single line
 * at the width a card renders. Same rule as content/featuredServices.ts and
 * content/capabilities.ts, and deliberately not the service's own `oneLiner`,
 * which is written for the top of its own page.
 *
 * `scope` is the card's footer: the platforms the work actually happens on. It
 * is there because this is the one practice where the platform IS most of the
 * question a visitor is holding. Someone who needs Daraz listings run is
 * scanning for Daraz, not for "E-commerce Management". Keep these to four
 * entries; a fifth wraps the footer onto a second line.
 *
 * Each entry renders as its logo where the site has one and as its name where
 * it does not, which is a rule with two edges worth knowing before editing:
 *
 *   ADDING A PLATFORM     if it has no mark in components/icons/brands.tsx it
 *                         appears as a word among logos. That is a supported
 *                         outcome, not a broken one, but the mark is better and
 *                         adding one is a two-line change.
 *   SPELLING              the name is matched case-insensitively against that
 *                         file's keys. "Tiktok" finds the mark, "Tik Tok" does
 *                         not, and the failure is silent by design: it falls
 *                         back to the word.
 *
 * Payments and Shipping are neither platforms nor brands, and they stay as
 * words on purpose. They are the two things a Shopify build is bought for.
 */
export interface RevenueService {
  /** Must match a slug in content/services. */
  slug: string;
  /** One clause of mechanism. Home page only. Keep it to a single line. */
  note: string;
  /** The platforms the work runs on. Four maximum. */
  scope: string[];
}

export const REVENUE_ENGINE: RevenueService[] = [
  {
    slug: 'performance-marketing',
    note: 'Full-funnel campaigns, with the conversion tracking proven before the budget moves.',
    scope: ['Meta', 'Google', 'TikTok', 'LinkedIn'],
  },
  {
    slug: 'social-media-management',
    note: 'Strategy, content, publishing and the replies, cut for each platform separately.',
    scope: ['Instagram', 'TikTok', 'LinkedIn', 'YouTube'],
  },
  {
    slug: 'platform-monetization',
    note: 'The gating metric worked toward and the policy review cleared before you apply.',
    scope: ['YouTube', 'TikTok', 'Facebook'],
  },
  {
    slug: 'shopify-store-development',
    note: 'Theme, catalogue, payments and shipping built around how you actually sell.',
    scope: ['Shopify', 'Payments', 'Shipping'],
  },
  {
    slug: 'ecommerce-management',
    note: 'Listings, stock, orders and returns run every day, with the numbers watched.',
    scope: ['Shopify', 'Daraz', 'Amazon'],
  },
];
