/**
 * Tax on immovable property: buying it, selling it, letting it, and the gain
 * on disposal. Tax year 2027.
 *
 * Four charges that a single transaction can attract at once, which is why
 * they share a file:
 *
 *   section 236K  advance tax the BUYER pays on purchase
 *   section 236C  advance tax the SELLER pays on transfer
 *   section 37    capital gains tax on the seller's actual profit
 *   section 155   tax the TENANT withholds from rent
 *
 * The interaction that matters is between 236C and section 37. A seller pays
 * 236C on the whole transfer value, gross, and separately owes capital gains
 * tax on the profit. The 236C already collected is advance tax and is
 * creditable against the final liability, so a calculator that reports both
 * without netting them tells the seller they owe a sum they do not.
 *
 * ## Where these figures come from
 *
 * Income Tax Ordinance, 2001 as amended up to 30 June 2026: sections 236K and
 * 236C with Division XVIII and Division X of Part IV of the First Schedule,
 * section 37 with Division VIII of Part I, and section 155 with Division V of
 * Part III.
 *
 * ## The one thing this cannot know
 *
 * Both advance taxes are charged on the higher of the consideration and the
 * FBR-notified value for the area, and those valuation tables are published
 * per city and per locality. Nothing here reproduces them: the calculators ask
 * for the value to use and say plainly that the notified table may be higher
 * than the price agreed. Guessing a valuation would be the worst kind of error
 * available on these pages, because it moves every figure that follows.
 */

import { taxOnSlabs, marginalRateOn, assertSlabsConsistent, type Slab, type SlabRow, money } from './slabs';
import { BUSINESS_SLABS } from './business';

/**
 * The top of the Division I non-salaried table, which is where a non-filer's
 * property gain can reach. Read from the business slabs rather than restated,
 * so the two cannot drift apart.
 */
const NON_FILER_TOP_SLAB_RATE = BUSINESS_SLABS[BUSINESS_SLABS.length - 1]!.rate;

export type FilerStatus = 'filer' | 'non-filer';

/* ══ Section 236K: the buyer's advance tax ═══════════════════════════════ */

/**
 * Division XVIII, Part IV. Charged on the gross value, with no allowance
 * subtracted first.
 *
 * A filer pays one rate whatever the property is worth: the value bands that
 * used to apply to filers were removed for tax year 2027. A non-filer is still
 * banded, and steeply. The late-filer tier that existed for tax years 2025 and
 * 2026 is gone, so there are two statuses here rather than three.
 */
export const PURCHASE_TAX = {
  /** One rate at every value. */
  filerRate: 0.0125,
  /** Banded by the value of the property. `upTo: null` is the open top band. */
  nonFilerBands: [
    { upTo: 50_000_000, rate: 0.105 },
    { upTo: 100_000_000, rate: 0.145 },
    { upTo: null, rate: 0.185 },
  ] as { upTo: number | null; rate: number }[],
} as const;

/* ══ Section 236C: the seller's advance tax ══════════════════════════════ */

/**
 * Division X, Part IV. Flat at every value for both statuses: unlike 236K, the
 * non-filer side is not banded.
 *
 * It falls on the whole transfer value rather than on the gain, which is what
 * makes it possible to pay 236C on a sale that made a loss.
 */
export const SALE_TAX = {
  filerRate: 0.0275,
  nonFilerRate: 0.115,
} as const;

/* ══ Section 37: capital gains on immovable property ═════════════════════ */

/**
 * THE ACQUISITION DATE IS THE WHOLE STORY.
 *
 * Property acquired on or after 1 July 2024 is taxed at a flat 15% for a
 * person on the Active Taxpayer List, however long it was held. Property
 * acquired before that date stays on the old holding-period table for every
 * later tax year, and that table differs by what the property is.
 *
 * So a calculator has to ask when the property was bought before it can ask
 * anything else, and one that applies the flat rate to an older purchase will
 * overstate the tax on a long-held plot by the entire charge: the old table
 * reaches nil at six years for open plots and at four for constructed property.
 */
export const CGT_REGIME_CHANGE = new Date('2024-07-01T00:00:00Z');

/** The flat rate for a filer on property acquired on or after 1 July 2024. */
export const CGT_FLAT_RATE = 0.15;

/**
 * A person NOT on the Active Taxpayer List does not get the flat 15%.
 *
 * The Ordinance charges them at the ordinary rates in Division I (the
 * non-salaried slabs) instead, subject to a floor: the tax is never less than
 * 15% of the gain. So a non-filer pays between 15% and the top slab rate of
 * 45%, depending on the size of the gain, rather than a single figure.
 *
 * The calculator therefore reports a RANGE for a non-filer rather than a
 * number, because the exact figure depends on the person's other income for
 * the year, which a property calculator cannot know. Quoting them a flat 15%
 * would understate it; quoting 45% would overstate it.
 */
export const CGT_NON_FILER_FLOOR = 0.15;

export type PropertyKind = 'open-plot' | 'constructed' | 'flat';

/**
 * Division VIII, Part I: the holding-period table for property acquired BEFORE
 * 1 July 2024. Each entry is the rate while the holding period is at or under
 * `withinYears`; `null` is "longer than every band above", which is nil
 * throughout because each column reaches zero.
 */
export const CGT_HOLDING_TABLE: {
  withinYears: number | null;
  label: string;
  rates: Record<PropertyKind, number>;
}[] = [
  { withinYears: 1, label: 'Up to 1 year', rates: { 'open-plot': 0.15, constructed: 0.15, flat: 0.15 } },
  { withinYears: 2, label: 'Over 1 up to 2 years', rates: { 'open-plot': 0.125, constructed: 0.1, flat: 0.075 } },
  { withinYears: 3, label: 'Over 2 up to 3 years', rates: { 'open-plot': 0.1, constructed: 0.075, flat: 0 } },
  { withinYears: 4, label: 'Over 3 up to 4 years', rates: { 'open-plot': 0.075, constructed: 0.05, flat: 0 } },
  { withinYears: 5, label: 'Over 4 up to 5 years', rates: { 'open-plot': 0.05, constructed: 0, flat: 0 } },
  { withinYears: 6, label: 'Over 5 up to 6 years', rates: { 'open-plot': 0.025, constructed: 0, flat: 0 } },
  { withinYears: null, label: 'Over 6 years', rates: { 'open-plot': 0, constructed: 0, flat: 0 } },
];

/* ══ Section 155: tax the tenant withholds from rent ═════════════════════ */

/**
 * Division V, Part III. Progressive on the year's rent for an individual or
 * AOP, and the non-filer column is exactly double the filer column at every
 * band, which is the Ordinance's own construction rather than a shortcut here.
 *
 * `fixed` is the cumulative amount printed in the Schedule and is reconciled
 * against the bands beneath it at the bottom of this file.
 */
export const RENT_SLABS: Slab[] = [
  { upTo: 300_000, rate: 0, fixed: 0 },
  { upTo: 600_000, rate: 0.05, fixed: 0 },
  { upTo: 2_000_000, rate: 0.1, fixed: 15_000 },
  { upTo: null, rate: 0.25, fixed: 155_000 },
];

/** The same table doubled, which is what a non-filer is withheld at. */
export const RENT_SLABS_NON_FILER: Slab[] = RENT_SLABS.map((slab) => ({
  ...slab,
  rate: slab.rate * 2,
  fixed: slab.fixed * 2,
}));

export const RENT = {
  /**
   * A company pays a flat rate rather than the slabs, doubled for a non-filer.
   */
  companyFilerRate: 0.15,
  companyNonFilerRate: 0.3,
  /**
   * A tenant who is an individual only has to withhold once the rent it pays
   * reaches this in a year. A company, a government office or a similar tenant
   * withholds from the first rupee.
   */
  individualTenantThreshold: 1_500_000,
} as const;

/* ══ Inputs and results ══════════════════════════════════════════════════ */

export interface PropertyTransferInput {
  /** The higher of the consideration and the FBR-notified value for the area. */
  value: number;
  status: FilerStatus;
}

export interface PropertyTransferResult {
  value: number;
  rate: number;
  tax: number;
  /** What the other status would pay on the same transaction. */
  otherStatusTax: number;
  /** The gap, which is what filing is worth on this transaction alone. */
  filerSaving: number;
}

/** Section 236K, the buyer's side. */
export function purchaseTax(input: PropertyTransferInput): PropertyTransferResult {
  const value = money(input.value);

  const nonFilerRate =
    PURCHASE_TAX.nonFilerBands.find((band) => band.upTo === null || value <= band.upTo)?.rate ??
    PURCHASE_TAX.nonFilerBands[PURCHASE_TAX.nonFilerBands.length - 1]!.rate;

  const rate = input.status === 'filer' ? PURCHASE_TAX.filerRate : nonFilerRate;
  const filerTax = value * PURCHASE_TAX.filerRate;
  const nonFilerTax = value * nonFilerRate;

  return {
    value,
    rate,
    tax: value * rate,
    otherStatusTax: input.status === 'filer' ? nonFilerTax : filerTax,
    filerSaving: nonFilerTax - filerTax,
  };
}

/** Section 236C, the seller's side. */
export function saleTax(input: PropertyTransferInput): PropertyTransferResult {
  const value = money(input.value);

  const filerTax = value * SALE_TAX.filerRate;
  const nonFilerTax = value * SALE_TAX.nonFilerRate;
  const rate = input.status === 'filer' ? SALE_TAX.filerRate : SALE_TAX.nonFilerRate;

  return {
    value,
    rate,
    tax: value * rate,
    otherStatusTax: input.status === 'filer' ? nonFilerTax : filerTax,
    filerSaving: nonFilerTax - filerTax,
  };
}

export interface PropertyGainInput {
  purchasePrice: number;
  salePrice: number;
  /** Documented costs of purchase, improvement and sale. */
  costs: number;
  /** Whole years the property was held. */
  yearsHeld: number;
  /** Whether it was acquired on or after 1 July 2024. */
  acquiredAfterJuly2024: boolean;
  kind: PropertyKind;
  status: FilerStatus;
  /** 236C already collected on the transfer, creditable against this. */
  advanceTaxPaid: number;
}

export const EMPTY_GAIN_INPUT: PropertyGainInput = {
  purchasePrice: 0,
  salePrice: 0,
  costs: 0,
  yearsHeld: 2,
  acquiredAfterJuly2024: true,
  kind: 'constructed',
  status: 'filer',
  advanceTaxPaid: 0,
};

export interface PropertyGainResult {
  gain: number;
  /** True when the sale made a loss, in which case there is no gain to tax. */
  isLoss: boolean;
  rate: number;
  /** Which regime decided the rate, for the working. */
  regime: 'flat' | 'holding-period';
  /** The band label from the holding table, where that regime applied. */
  bandLabel: string | null;
  tax: number;
  /**
   * True where the seller is off the ATL, in which case `tax` is the FLOOR
   * rather than the answer: the real figure depends on their other income.
   */
  isNonFilerRange: boolean;
  /** The top of that range, at the highest non-salaried slab rate. */
  taxAtTopSlab: number;
  /** 236C already collected, credited against the tax above. */
  advanceTaxPaid: number;
  /** Positive means more to pay; negative means the advance tax over-collected. */
  balance: number;
  netProceeds: number;
}

/**
 * The rate on a property gain.
 *
 * A non-filer does not get the flat 15%: the Ordinance charges them at the
 * rates in Division I (the ordinary slab rates) instead, which this models as
 * the caller's business. What is returned here is the filer position and the
 * holding-period table, and the calculator says so rather than silently
 * applying a filer rate to a non-filer.
 */
export function propertyGainRate(
  acquiredAfterJuly2024: boolean,
  yearsHeld: number,
  kind: PropertyKind,
): { rate: number; regime: 'flat' | 'holding-period'; bandLabel: string | null } {
  if (acquiredAfterJuly2024) {
    return { rate: CGT_FLAT_RATE, regime: 'flat', bandLabel: null };
  }

  const band =
    CGT_HOLDING_TABLE.find((b) => b.withinYears !== null && yearsHeld <= b.withinYears) ??
    CGT_HOLDING_TABLE[CGT_HOLDING_TABLE.length - 1]!;

  return { rate: band.rates[kind], regime: 'holding-period', bandLabel: band.label };
}

export function calculatePropertyGain(input: PropertyGainInput): PropertyGainResult {
  const proceeds = money(input.salePrice);
  const gain = proceeds - money(input.purchasePrice) - money(input.costs);
  const isLoss = gain <= 0;

  const { rate, regime, bandLabel } = propertyGainRate(
    input.acquiredAfterJuly2024,
    money(input.yearsHeld),
    input.kind,
  );

  // A non-filer is charged at the Division I slab rates with a 15% floor, so
  // what is reported for them is a range rather than a figure. See the note on
  // CGT_NON_FILER_FLOOR.
  const isNonFilerRange = input.status === 'non-filer' && !isLoss;
  const effectiveRate = isNonFilerRange ? Math.max(rate, CGT_NON_FILER_FLOOR) : rate;

  const tax = isLoss ? 0 : gain * effectiveRate;
  const taxAtTopSlab = isLoss ? 0 : gain * NON_FILER_TOP_SLAB_RATE;
  const advanceTaxPaid = money(input.advanceTaxPaid);

  return {
    gain,
    isLoss,
    rate: effectiveRate,
    regime,
    bandLabel,
    tax,
    isNonFilerRange,
    taxAtTopSlab,
    advanceTaxPaid,
    // Advance tax is creditable, so the balance is what is actually left to pay.
    balance: tax - advanceTaxPaid,
    netProceeds: proceeds - money(input.purchasePrice) - money(input.costs) - tax,
  };
}

export interface RentInput {
  /** Rent for the whole year. */
  annualRent: number;
  status: FilerStatus;
  /** A company landlord pays a flat rate rather than the slabs. */
  landlord: 'individual' | 'company';
}

export const EMPTY_RENT_INPUT: RentInput = {
  annualRent: 0,
  status: 'filer',
  landlord: 'individual',
};

export interface RentResult {
  annualRent: number;
  monthlyRent: number;
  tax: number;
  taxMonthly: number;
  rows: SlabRow[];
  effectiveRate: number;
  marginalRate: number;
  netAnnual: number;
  netMonthly: number;
  /** What the other filer status would be withheld on the same rent. */
  otherStatusTax: number;
  filerSaving: number;
  /** True where an individual tenant is below the withholding threshold. */
  belowIndividualTenantThreshold: boolean;
}

function rentTax(annualRent: number, status: FilerStatus, landlord: 'individual' | 'company') {
  if (landlord === 'company') {
    const rate = status === 'filer' ? RENT.companyFilerRate : RENT.companyNonFilerRate;
    return { tax: annualRent * rate, rows: [] as SlabRow[], marginal: rate };
  }
  const slabs = status === 'filer' ? RENT_SLABS : RENT_SLABS_NON_FILER;
  const { tax, rows } = taxOnSlabs(annualRent, slabs);
  return { tax, rows, marginal: marginalRateOn(annualRent, slabs) };
}

export function calculateRent(input: RentInput): RentResult {
  const annualRent = money(input.annualRent);

  const own = rentTax(annualRent, input.status, input.landlord);
  const other = rentTax(
    annualRent,
    input.status === 'filer' ? 'non-filer' : 'filer',
    input.landlord,
  );

  const filerTax = input.status === 'filer' ? own.tax : other.tax;
  const nonFilerTax = input.status === 'filer' ? other.tax : own.tax;

  return {
    annualRent,
    monthlyRent: annualRent / 12,
    tax: own.tax,
    taxMonthly: own.tax / 12,
    rows: own.rows,
    effectiveRate: annualRent > 0 ? own.tax / annualRent : 0,
    marginalRate: own.marginal,
    netAnnual: annualRent - own.tax,
    netMonthly: (annualRent - own.tax) / 12,
    otherStatusTax: other.tax,
    filerSaving: nonFilerTax - filerTax,
    belowIndividualTenantThreshold: annualRent < RENT.individualTenantThreshold,
  };
}

assertSlabsConsistent(RENT_SLABS, 'Rental income slabs (First Schedule, Part III, Division V)');
assertSlabsConsistent(
  RENT_SLABS_NON_FILER,
  'Rental income slabs, non-filer (First Schedule, Part III, Division V, doubled)',
);
