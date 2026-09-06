/**
 * The withholding rate card: every rate the site already computes, gathered
 * into one table a person can read, print or download.
 *
 * ## Why this file holds no rates of its own
 *
 * Every figure below is imported from the module that owns it and asserts it.
 * Not one is retyped here. That is the whole design: a rate card is the single
 * most dangerous kind of page to build from copied numbers, because it is
 * exactly the page a reader trusts without checking, and a stale figure on it
 * would be invisible until someone acted on it.
 *
 * So the card is a VIEW. `lib/tax/withholding.ts`, `property.ts`, `vehicle.ts`
 * and `pakistan.ts` hold the rates with their statutory sections attached and
 * `scripts/check-tax.ts` reconciles them on every build. When a Finance Act
 * moves one, it moves in that module, and this page follows on the next build
 * with no edit here at all.
 *
 * ## What the card is for
 *
 * Two audiences that want the same table for different reasons. A person
 * deciding whether to file wants the filer and non-filer columns side by side,
 * because the gap between them is the argument. A person already filing wants
 * a reference for a rate they half-remember. Both are better served by one
 * honest table than by a calculator they have to run five times.
 *
 * ## Why the year matters, and why only one year is offered
 *
 * Withholding rates move more often than salary slabs and in more sections.
 * The card therefore states the year it is for and cites the Act that set it,
 * exactly as the salary calculator does. Only the current year is published:
 * an older card would need every one of its rows verified against that year's
 * Ordinance, and publishing an unverified rate under a firm's name is the
 * failure this codebase is built to prevent. Earlier years are added as they
 * are verified, one at a time, not inferred from this one.
 */

import { TAX_YEAR, EXEMPT_THRESHOLD, SLABS } from './pakistan';
import {
  CASH_WITHDRAWAL,
  ELECTRICITY,
  IT_EXPORT_RATES,
  TELECOM,
} from './withholding';
import { PURCHASE_TAX, SALE_TAX, RENT_SLABS, CGT_FLAT_RATE } from './property';
import { VEHICLE } from './vehicle';
import { SECURITIES_FLAT_RATE } from './investments';
import {
  WITHHOLDING_SECTIONS,
  nonFilerRate,
  type WithholdingSection,
} from './withholding-rates';

/**
 * One line of the card.
 *
 * `filer` and `nonFiler` are strings rather than numbers because the honest
 * answer is often not a percentage: it is "slab rates", "nil", "3x the filer
 * rate", or a rate that only bites above a threshold. Forcing those into a
 * number would mean rounding the law into something tidier than it is, which
 * is the one thing a rate card must not do.
 *
 * They are still DERIVED from the numeric constants rather than typed out, so
 * a rate change still flows through. See `pc` and `rs` below.
 */
export interface RateRow {
  /** The section of the Ordinance, e.g. "149" or "236K". */
  section: string;
  /** What is being paid or done. */
  payment: string;
  /** The rate for a person on the Active Taxpayer List. */
  filer: string;
  /** The rate for a person off it. */
  nonFiler: string;
  /** Advance, final or minimum tax. What the deduction becomes at filing. */
  nature: 'Adjustable' | 'Final' | 'Minimum' | 'Varies';
  /** Anything a reader would otherwise get wrong. Optional and short. */
  note?: string;
  /** The calculator that computes this row, where one exists. */
  toolSlug?: string;
}

export interface RateGroup {
  title: string;
  rows: RateRow[];
}

/** A rate as a percentage string, from the constant rather than by hand. */
const pc = (rate: number): string => {
  const value = rate * 100;
  // Trailing zeros read as false precision on a rate card: 12.5% and 15%,
  // never 15.0%.
  return `${Number(value.toFixed(4))}%`;
};

/** A rupee figure with thousands separators. */
const rs = (amount: number): string => `Rs ${new Intl.NumberFormat('en-PK').format(amount)}`;

/**
 * The sections the card states but nothing on the site computes.
 *
 * Expanded from `lib/tax/withholding-rates.ts` rather than retyped, and the
 * non-filer column is derived through `nonFilerRate` rather than stated: every
 * one of these is the filer rate doubled under Rule 1 of the Tenth Schedule,
 * and writing the doubled figure out by hand would be inviting one of them to
 * drift from its own rule.
 */
function rowsFor(section: WithholdingSection): RateRow[] {
  return section.rates.map((rate) => ({
    section: section.section,
    payment: rate.label,
    filer: pc(rate.filer),
    nonFiler: pc(nonFilerRate(rate.filer)),
    nature: rate.nature,
    note: rate.note,
  }));
}

/**
 * The card itself, grouped the way a reader looks things up rather than the
 * way the Ordinance is numbered: by what you are doing, not by section order.
 */
export const RATE_GROUPS: RateGroup[] = [
  {
    title: 'Salary and services',
    rows: [
      {
        section: '149',
        payment: 'Salary',
        filer: 'Slab rates',
        nonFiler: 'Slab rates',
        nature: 'Adjustable',
        note: `Nil up to ${rs(EXEMPT_THRESHOLD)} of annual taxable income, then ${pc(SLABS[1]!.rate)} rising to ${pc(SLABS[SLABS.length - 1]!.rate)}. The Active Taxpayer List does not change the salary slabs.`,
        toolSlug: 'salary-tax',
      },
      {
        section: '154A',
        payment: 'IT and IT-enabled export receipts, PSEB registered',
        filer: pc(IT_EXPORT_RATES.psebFiler),
        nonFiler: pc(IT_EXPORT_RATES.psebNonFiler),
        nature: 'Final',
        note: 'Charged on gross receipts before any expense, so costs are not deductible against it.',
        toolSlug: 'freelancer-tax',
      },
      {
        section: '154A',
        payment: 'IT and IT-enabled export receipts, not PSEB registered',
        filer: pc(IT_EXPORT_RATES.standardFiler),
        nonFiler: pc(IT_EXPORT_RATES.standardNonFiler),
        nature: 'Final',
        note: 'Registering with the Pakistan Software Export Board cuts this to a quarter of the standard rate.',
        toolSlug: 'freelancer-tax',
      },
    ],
  },
  {
    title: 'Banking and utilities',
    rows: [
      {
        section: '231AB',
        payment: `Cash withdrawn from a bank, above ${rs(CASH_WITHDRAWAL.threshold)} in a day`,
        filer: 'Nil',
        nonFiler: pc(CASH_WITHDRAWAL.nonFilerRate),
        nature: 'Adjustable',
        note: `The threshold is the day's total across every withdrawal, and once it is passed the rate applies to the whole amount rather than to the excess.`,
        toolSlug: 'cash-withdrawal-tax',
      },
      {
        section: '235',
        payment: `Domestic electricity bill above ${rs(ELECTRICITY.domestic.threshold)} a month`,
        filer: 'Nil',
        nonFiler: pc(ELECTRICITY.domestic.nonFilerRate),
        nature: 'Adjustable',
        toolSlug: 'electricity-bill-tax',
      },
      {
        section: '236',
        payment: 'Mobile and internet bills, and prepaid load',
        filer: pc(TELECOM.standardRate),
        nonFiler: pc(TELECOM.standardRate),
        nature: 'Adjustable',
        note: 'The same rate either way. Being on the Active Taxpayer List does not reduce it.',
        toolSlug: 'mobile-internet-tax',
      },
    ],
  },
  {
    title: 'Property',
    rows: [
      {
        section: '236K',
        payment: 'Buying immovable property',
        filer: pc(PURCHASE_TAX.filerRate),
        nonFiler: `${pc(PURCHASE_TAX.nonFilerBands[0]!.rate)} to ${pc(PURCHASE_TAX.nonFilerBands[PURCHASE_TAX.nonFilerBands.length - 1]!.rate)}`,
        nature: 'Adjustable',
        note: `One rate at every value for a filer. For a non-filer it is banded by the property's value, rising with it.`,
        toolSlug: 'property-purchase-tax',
      },
      {
        section: '236C',
        payment: 'Selling immovable property',
        filer: pc(SALE_TAX.filerRate),
        nonFiler: pc(SALE_TAX.nonFilerRate),
        nature: 'Adjustable',
        note: 'Creditable against the tax on the gain under section 37, so it is not an extra cost where a gain is declared.',
        toolSlug: 'property-sale-tax',
      },
      {
        section: '37',
        payment: 'Capital gain on property bought on or after 1 July 2024',
        filer: pc(CGT_FLAT_RATE),
        nonFiler: 'Slab rates, with a floor',
        nature: 'Adjustable',
        note: 'A flat rate for a filer whatever the holding period. A non-filer is taxed on the normal slabs and cannot fall below the filer rate.',
        toolSlug: 'property-capital-gains',
      },
      {
        section: '155',
        payment: 'Rent of immovable property',
        filer: 'Slab rates',
        nonFiler: 'Slab rates, doubled',
        nature: 'Adjustable',
        // The first rent slab is the nil band, so its ceiling IS the exempt
        // threshold. Read from the table rather than restated, for the reason
        // at the top of this file.
        note: `Nil up to ${rs(RENT_SLABS[0]!.upTo ?? 0)} of annual rent for a filer.`,
        toolSlug: 'rental-income-tax',
      },
    ],
  },
  {
    title: 'Vehicles and investments',
    rows: [
      {
        section: '231B',
        payment: 'Registering or transferring a motor vehicle',
        filer: 'By engine capacity or value',
        nonFiler: `${VEHICLE.nonFilerMultiple} times the filer charge`,
        nature: 'Adjustable',
        note: 'The transfer charge falls by a tenth for each year since first registration, reaching nil at ten years.',
        toolSlug: 'vehicle-tax',
      },
      {
        section: '37A',
        payment: 'Capital gain on securities acquired on or after 1 July 2024',
        filer: pc(SECURITIES_FLAT_RATE),
        nonFiler: 'Slab rates, with a floor',
        nature: 'Final',
        note: 'One rate whatever the holding period, which replaced the old sliding scale.',
        toolSlug: 'capital-gains-tax',
      },
    ],
  },
  {
    title: 'Investment income',
    rows: [
      ...rowsFor(WITHHOLDING_SECTIONS[0]!),
      ...rowsFor(WITHHOLDING_SECTIONS[1]!),
    ],
  },
  {
    title: 'Commission, prizes and auctions',
    rows: [
      ...rowsFor(WITHHOLDING_SECTIONS[3]!),
      ...rowsFor(WITHHOLDING_SECTIONS[2]!),
      ...rowsFor(WITHHOLDING_SECTIONS[4]!),
    ],
  },
];

/** Every row, flattened. Used by the PDF and by the count in the copy. */
export const RATE_ROWS: RateRow[] = RATE_GROUPS.flatMap((group) => group.rows);

/**
 * The card's provenance, taken from the same constant the calculators cite so
 * the two cannot disagree about which year is current.
 */
export const RATE_CARD = {
  taxYear: TAX_YEAR,
  /** How many rates the card states. Derived, so it cannot go stale. */
  rowCount: RATE_ROWS.length,
} as const;
