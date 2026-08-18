/**
 * The Corporate & Advisory services the home page names one by one.
 *
 * ## What this is NOT
 *
 * It is not an index of the practice. Corporate & Advisory runs to twenty-six
 * services across four disciplines, and an earlier version of this section
 * tried to show them grouped by discipline. That read as a second copy of the
 * coverflow one section above, which already names all three practices and is
 * the place the site makes that structure. Naming the categories twice tells a
 * visitor nothing the first time did not.
 *
 * So this is a SHORTLIST. Six services, named individually, chosen because
 * they are the ones a business most often arrives already knowing it needs.
 * The rest stay one click away on /services, in the mega-menu and in the
 * footer, so nothing is hidden by shortening what the home page shows: the
 * home page is making a case, not being a directory.
 *
 * ## Changing the shortlist
 *
 * This array IS the shortlist, and the order here is the display order. Swap a
 * slug and the section follows: the title, the icon and the link are all read
 * off the service itself through `getService`, so the only thing this file
 * owns is which six, in what order, and one line of copy each.
 *
 * Keep every slug inside Corporate & Advisory. The section's heading and lead
 * both name that practice, and a Shopify or paid-media row would contradict
 * them. Nothing enforces this in code, because the check would have to import
 * the practice tree into a file that is otherwise four fields deep.
 *
 * There is no ranking in `content/services` to derive this from, and there
 * should not be one. Which services lead is a commercial decision that changes
 * with what the firm wants to sell this quarter, and burying it in the service
 * data would put it in five places instead of one.
 *
 * ## `note`
 *
 * Home-page-only copy, and deliberately not the service's own `oneLiner`,
 * which is written for the top of its page with a headline above it and runs
 * 20–30 words. This is one clause of mechanism, no adjectives, written to sit
 * on a single line at the width the row renders. Same rule as
 * content/capabilities.ts and content/softwareShowcase.ts.
 */
export interface FeaturedService {
  /** Must match a slug in content/services. */
  slug: string;
  /** One clause of mechanism. Home page only. Keep it to a single line. */
  note: string;
}

/**
 * Two rows from Finance & Tax, two from Corporate & Legal, one each from
 * Intellectual Property and International Expansion. All four disciplines in
 * the practice appear, and the two largest appear twice.
 *
 * The International Expansion row is the US one. That discipline covers four
 * jurisdictions and the United States is five of its eight services, so the US
 * is what the single row it gets should stand for. Swapping the slug back to
 * `uae-tax-bookkeeping` is a one-line change if the commercial priority moves.
 *
 * Ordered so the discipline label alternates rather than clustering. Two
 * Finance & Tax rows next to each other read as a Finance & Tax section that
 * happens to have other things after it, which is the grouping this section is
 * specifically not doing. Alternating shows the breadth in the first four rows
 * instead of the last two, and since the labels are the only place the
 * disciplines appear here, their rhythm IS the structure a reader sees.
 */
export const FEATURED_SERVICES: FeaturedService[] = [
  {
    slug: 'company-registration',
    note: 'Private limited, SMC, LLP or partnership, with the NTN and bank account.',
  },
  {
    slug: 'income-tax-filing',
    note: 'NTN, annual returns and wealth statements, filed through FBR IRIS.',
  },
  {
    slug: 'trademark-registration',
    note: 'Clearance search, filing in the right classes, objections handled.',
  },
  {
    slug: 'us-company-formation',
    note: 'A US LLC or C-Corp with the EIN, registered agent and business banking.',
  },
  {
    slug: 'financial-accounting',
    note: 'Monthly management accounts and year-end statements under IFRS for SMEs.',
  },
  {
    slug: 'contract-drafting',
    note: 'Supply, employment, IP and shareholder agreements, drafted to your facts.',
  },
];
