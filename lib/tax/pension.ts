/**
 * Tax on pension income, section 12(2A). Tax year 2027.
 *
 * ## Why this file exists at all
 *
 * Until the Finance Act 2025, it did not need to. Pension from a former
 * employer was exempt under clause (8) of Part I of the Second Schedule, and a
 * calculator had nothing to compute. The Finance Act 2025 omitted clause (8),
 * omitted the armed forces and Federal or Provincial Government limb of clause
 * (9), and inserted section 12(2A) to charge what the exemption used to cover.
 *
 * So the headline "pension is now taxable in Pakistan" is true and is also
 * badly misleading, which is the reason to model it rather than describe it.
 * The charge starts at ten million rupees a year and stops entirely at seventy.
 * Most pensioners owe nothing and can be shown that they owe nothing.
 *
 * ## Where these figures come from
 *
 * Income Tax Ordinance, 2001 as amended up to 30 June 2026: section 12(2A),
 * and the proviso to clause (2) of Division I of Part I of the First Schedule,
 * read from page 528 of that document rather than from a summary.
 *
 * ## What survives the repeal, and is not modelled here
 *
 * Clause (9)(ii), pension granted to the families and dependents of public
 * servants or members of the Armed Forces who die during service. Clause (12),
 * commutation of pension from Government or an approved scheme. Clause (13),
 * gratuity and commutation on retirement, within limits. All three remain
 * exemptions and none of them is a rate calculation, so they belong in guide
 * prose rather than in this module.
 */

import { money } from './slabs';

/**
 * The proviso to Division I clause (2): pension received by an individual from
 * a former employer.
 *
 * Two bands and nothing else. Written as a threshold plus a rate on the excess
 * rather than as a slab table, because that is the shape the proviso itself
 * uses and inventing a slab structure here would misrepresent it.
 */
export const PENSION = {
  /** Nil at or below this. Rs 10,000,000. */
  threshold: 10_000_000,
  /** Charged on the amount above the threshold only. */
  rateOnExcess: 0.05,
  /**
   * Section 12(2A)(i): an individual who has attained this age is not charged
   * to tax on pension income, at any amount.
   */
  exemptFromAge: 70,
} as const;

export interface PensionInput {
  /** Pension received from a former employer in the tax year. */
  annualPension: number;
  /** Age attained. Seventy or above removes the charge entirely. */
  age: number;
  /**
   * Section 12(2A)(ii): still working for the former employer or an associate.
   *
   * This is the case that costs money, and it is the reason the flag exists.
   * The 0/5 percent table does not apply; the pension is charged at the
   * ordinary Division I rates instead. This module does not compute that,
   * because it is the salary computation in `pakistan.ts` and duplicating it
   * here would create the second source of truth this codebase exists to
   * avoid. It reports the fact and the caller routes accordingly.
   */
  stillWorkingForFormerEmployer: boolean;
}

export interface PensionResult {
  annualPension: number;
  /** Nil where exempt by age, or where the pension is at or below the threshold. */
  tax: number;
  /** The amount actually charged at 5 percent, which is nil in most cases. */
  amountAboveThreshold: number;
  /** Why the answer is what it is. */
  reason: 'exempt-by-age' | 'below-threshold' | 'charged-on-excess' | 'ordinary-slabs';
  /** True where section 12(2A)(ii) sends the whole pension to the salary slabs. */
  usesOrdinarySlabs: boolean;
}

/**
 * Section 12(2A). Returns nil in every case except a pension above the
 * threshold, held by someone under seventy, who has stopped working for the
 * employer that pays it.
 */
export function pensionTax(input: PensionInput): PensionResult {
  const annualPension = money(input.annualPension);

  // 12(2A)(ii) first: it displaces the table entirely rather than modifying it.
  if (input.stillWorkingForFormerEmployer) {
    return {
      annualPension,
      tax: 0,
      amountAboveThreshold: 0,
      reason: 'ordinary-slabs',
      usesOrdinarySlabs: true,
    };
  }

  if (input.age >= PENSION.exemptFromAge) {
    return {
      annualPension,
      tax: 0,
      amountAboveThreshold: 0,
      reason: 'exempt-by-age',
      usesOrdinarySlabs: false,
    };
  }

  const amountAboveThreshold = Math.max(0, annualPension - PENSION.threshold);

  return {
    annualPension,
    tax: money(amountAboveThreshold * PENSION.rateOnExcess),
    amountAboveThreshold: money(amountAboveThreshold),
    reason: amountAboveThreshold > 0 ? 'charged-on-excess' : 'below-threshold',
    usesOrdinarySlabs: false,
  };
}
