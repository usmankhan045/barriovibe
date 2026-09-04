/**
 * Business, self-employed and AOP income tax, tax year 2027.
 *
 * ## The distinction this file exists for
 *
 * The First Schedule holds TWO rate tables for individuals, and which one
 * applies is decided by a single test in Division I: where salary is more than
 * 75% of taxable income, sub-clause (2) applies (the salary slabs in
 * ./pakistan.ts); otherwise sub-clause (1) applies, which is the table here.
 *
 * They are very different. The non-salaried table starts at 15% where the
 * salary table starts at 1%, and it tops out at 45% against the salary table's
 * 35%. A sole trader run through the salary calculator is told a number that
 * can be less than half of what they owe, which is the specific error this
 * file exists to prevent, and the reason the page states the 75% test in the
 * form itself rather than in a footnote.
 *
 * ## Where these figures come from
 *
 * The Income Tax Ordinance, 2001 as amended up to 30 June 2026, First
 * Schedule, Part I, Division I, sub-clause (1), plus section 4AB for the
 * surcharge. Same sourcing rule as ./pakistan.ts: the section is named against
 * every figure so the next person can check it the same way.
 */

import { taxOnSlabs, marginalRateOn, assertSlabsConsistent, type Slab, type SlabRow, money } from './slabs';
import { TAX_YEAR } from './pakistan';

export { TAX_YEAR };
export type { Slab, SlabRow };

/**
 * First Schedule, Part I, Division I, sub-clause (1). The table for an
 * individual or AOP whose salary is 75% or less of taxable income.
 *
 * `fixed` is the Ordinance's own cumulative figure and is reconciled against
 * the slabs beneath it at the bottom of this file.
 */
export const BUSINESS_SLABS: Slab[] = [
  { upTo: 600_000, rate: 0, fixed: 0 },
  { upTo: 1_200_000, rate: 0.15, fixed: 0 },
  { upTo: 1_600_000, rate: 0.2, fixed: 90_000 },
  { upTo: 3_200_000, rate: 0.3, fixed: 170_000 },
  { upTo: 5_600_000, rate: 0.4, fixed: 650_000 },
  { upTo: null, rate: 0.45, fixed: 1_610_000 },
];

/** Income below this is untaxed. The first slab's ceiling, named. */
export const BUSINESS_EXEMPT_THRESHOLD = BUSINESS_SLABS[0]!.upTo!;

/**
 * Section 4AB, the surcharge on high income.
 *
 * Charged on the TAX, not on the income, once taxable income passes the
 * threshold. Two things about it are widely got wrong and are worth stating
 * here rather than in the page copy:
 *
 *  - It does not apply to income chargeable under the head "Salary" at all.
 *    That is why ./pakistan.ts has no surcharge in it and this file does.
 *  - The rate for an individual stepped down to nil for tax year 2027. It was
 *    9% for tax year 2026. An AOP still pays the full 10%.
 */
export const SURCHARGE = {
  /** Section 4AB applies above this taxable income. */
  threshold: 10_000_000,
  /** An association of persons. Unchanged for tax year 2027. */
  aopRate: 0.1,
  /**
   * An individual. Nil from tax year 2027, having been 9% for 2026. Kept as a
   * named constant at zero rather than deleted, because the surcharge still
   * exists in law for the AOP case above and a future Act may restore it.
   */
  individualRate: 0,
} as const;

/**
 * The cap for a professional firm that is barred from incorporating.
 *
 * Proviso to Division I: a firm of professionals (the classic case is a law
 * practice, which cannot be a company under its own regulator's rules) is
 * charged at 40% rather than 45% on the top slab. It is a ceiling on the rate,
 * not a separate table, so it is applied by re-walking the slabs with the top
 * rate replaced.
 */
export const PROFESSIONAL_FIRM_TOP_RATE = 0.4;

export type TaxpayerKind = 'individual' | 'aop' | 'professional-firm';

export interface BusinessInput {
  /** Annual taxable income from business, after expenses. */
  taxableIncome: number;
  kind: TaxpayerKind;
}

export const EMPTY_BUSINESS_INPUT: BusinessInput = {
  taxableIncome: 0,
  kind: 'individual',
};

export interface BusinessResult {
  taxableIncome: number;
  /** Tax straight off the slabs, before section 4AB. */
  taxOnSlabs: number;
  slabRows: SlabRow[];
  /** Section 4AB, on the tax rather than on the income. */
  surcharge: number;
  surchargeRate: number;
  totalTax: number;
  afterTax: number;
  effectiveRate: number;
  marginalRate: number;
}

/**
 * The table actually used for a taxpayer.
 *
 * Only the professional-firm case differs, and only in its top rate. Rebuilt
 * rather than mutated so `BUSINESS_SLABS` stays the statutory table.
 */
export function slabsFor(kind: TaxpayerKind): Slab[] {
  if (kind !== 'professional-firm') return BUSINESS_SLABS;

  return BUSINESS_SLABS.map((slab) =>
    slab.upTo === null ? { ...slab, rate: PROFESSIONAL_FIRM_TOP_RATE } : slab,
  );
}

/** The section 4AB rate for a taxpayer. Nil below the threshold. */
export function surchargeRateFor(kind: TaxpayerKind, taxableIncome: number): number {
  if (taxableIncome <= SURCHARGE.threshold) return 0;
  return kind === 'aop' ? SURCHARGE.aopRate : SURCHARGE.individualRate;
}

export function calculateBusiness(input: BusinessInput): BusinessResult {
  const taxableIncome = money(input.taxableIncome);
  const slabs = slabsFor(input.kind);

  const { tax, rows } = taxOnSlabs(taxableIncome, slabs);

  const surchargeRate = surchargeRateFor(input.kind, taxableIncome);
  const surcharge = tax * surchargeRate;
  const totalTax = tax + surcharge;

  return {
    taxableIncome,
    taxOnSlabs: tax,
    slabRows: rows,
    surcharge,
    surchargeRate,
    totalTax,
    afterTax: taxableIncome - totalTax,
    effectiveRate: taxableIncome > 0 ? totalTax / taxableIncome : 0,
    marginalRate: marginalRateOn(taxableIncome, slabs),
  };
}

assertSlabsConsistent(
  BUSINESS_SLABS,
  'Business and AOP slabs (First Schedule, Part I, Division I, sub-clause (1))',
);
