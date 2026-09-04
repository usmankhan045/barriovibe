import { money } from './slabs';
/**
 * Company income tax, super tax and minimum turnover tax, tax year 2027.
 *
 * The three sit in one file because a company is subject to all three at once
 * and they interact: section 113 REPLACES the normal tax when it is higher
 * rather than adding to it, while section 4C sits on top of whichever of the
 * two won. Splitting them across three files made that relationship something
 * a reader had to reconstruct; here it is one function.
 *
 * Sources, all in the Income Tax Ordinance, 2001 as amended up to 30 June 2026:
 * Division II of Part I of the First Schedule (company rates), section 4C
 * (super tax), and section 113 with Division IX of Part I (minimum tax).
 */

/**
 * Division II, Part I, First Schedule. A company pays ONE rate on its whole
 * taxable income. There are no slabs, which is the difference from every other
 * taxpayer on this site and the thing visitors most often expect otherwise.
 */
export const COMPANY_RATES = {
  normal: 0.29,
  /**
   * Section 2(59A): capital and reserves not above Rs 50m, not more than 250
   * employees, and annual turnover not above Rs 250m. All three, not any one.
   */
  small: 0.2,
  /**
   * A banking company. On a legislated downward path: 44% for tax year 2025,
   * 43% for 2026 and 42% from 2027 onward.
   */
  banking: 0.42,
} as const;

export type CompanyKind = keyof typeof COMPANY_RATES;

/** The small-company test, stated so the page can show it rather than assert it. */
export const SMALL_COMPANY_LIMITS = {
  capitalAndReserves: 50_000_000,
  employees: 250,
  turnover: 250_000_000,
} as const;

/**
 * Section 4C, super tax on high earning persons.
 *
 * ## The cliff
 *
 * This is NOT a slab tax. The rate applies to the WHOLE of the section 4C
 * income once the threshold is passed, not to the excess over it. A company
 * one rupee above Rs 500m pays 8% of everything, so crossing the line costs
 * Rs 40m rather than eight paisa. Modelling it as a progressive tax is the
 * common error, and it understates the liability by the entire threshold.
 *
 * ## What changed for tax year 2027
 *
 * The six middle bands between Rs 150m and Rs 500m were removed for most
 * persons and the top rate fell from 10% to 8%. Banks, oil and gas explorers
 * and fertilizer sellers were left on the old 10% from Rs 150m.
 */
export const SUPER_TAX = {
  /** Most persons and businesses. */
  general: { threshold: 500_000_000, rate: 0.08 },
  /** Banking companies, oil and gas exploration, and fertilizer sellers. */
  specified: { threshold: 150_000_000, rate: 0.1 },
  /**
   * From tax year 2027, section 4C does not apply at all where export proceeds
   * actually received exceed 80% of total sales.
   */
  exportExemptionShare: 0.8,
} as const;

export type SuperTaxCategory = keyof Pick<typeof SUPER_TAX, 'general' | 'specified'>;

/**
 * Section 113 with Division IX, the tax floor on turnover.
 *
 * Charged on SALES rather than on profit, and it applies instead of the normal
 * tax when it comes out higher. A loss-making company still pays it, which is
 * the whole point of a minimum tax and the thing that surprises people.
 *
 * Every rate here has been steady since tax year 2022 except the distributor
 * rate, which rose from 0.25% to 0.5% for tax year 2027.
 */
export const MINIMUM_TAX_RATES = {
  general: 0.0125,
  /** Sui Southern and Sui Northern Gas above Rs 1bn turnover, PIA, poultry. */
  reducedThreeQuarter: 0.0075,
  /** Oil refineries, oil marketing companies, registered motorcycle dealers. */
  reducedHalf: 0.005,
  /**
   * Distributors and wholesalers of listed goods. Conditional: the business
   * must be on the active taxpayer list under BOTH the Sales Tax Act 1990 and
   * the Income Tax Ordinance 2001. Off either list and the general rate applies.
   */
  distributors: 0.005,
  /**
   * Rice mills, flour mills, petroleum agents, online marketplaces, used
   * vehicle sellers, and large retailers integrated with FBR's system.
   */
  reducedQuarter: 0.0025,
} as const;

export type MinimumTaxSector = keyof typeof MINIMUM_TAX_RATES;

export const MINIMUM_TAX = {
  /**
   * A company and a Pakistan branch of a foreign company are caught at any
   * size. An individual or AOP is caught only once turnover reaches this.
   */
  individualTurnoverThreshold: 100_000_000,
  /** Excess minimum tax over normal tax carries forward this many years. */
  carryForwardYears: 2,
} as const;

export interface CompanyInput {
  /** Annual taxable income (profit) chargeable to tax. */
  taxableIncome: number;
  /** Annual turnover, for the section 113 comparison. */
  turnover: number;
  kind: CompanyKind;
  sector: MinimumTaxSector;
  /** Section 4C income. Usually taxable income; kept separate because it is defined separately. */
  superTaxIncome: number;
  superTaxCategory: SuperTaxCategory;
  /** Export proceeds received above 80% of sales removes section 4C entirely. */
  exportsAbove80Percent: boolean;
}

export const EMPTY_COMPANY_INPUT: CompanyInput = {
  taxableIncome: 0,
  turnover: 0,
  kind: 'normal',
  sector: 'general',
  superTaxIncome: 0,
  superTaxCategory: 'general',
  exportsAbove80Percent: false,
};

export interface CompanyResult {
  taxableIncome: number;
  turnover: number;

  /** Division II: the flat rate on taxable income. */
  companyRate: number;
  normalTax: number;

  /** Section 113: the floor computed on turnover. */
  minimumTaxRate: number;
  minimumTax: number;
  /** True when section 113 exceeded the normal tax and replaced it. */
  minimumTaxApplies: boolean;
  /** The excess carried forward under section 113(2)(c). */
  carryForward: number;

  /** Whichever of normalTax and minimumTax is charged. */
  taxBeforeSuperTax: number;

  /** Section 4C, on top of the above. */
  superTaxRate: number;
  superTax: number;
  superTaxThreshold: number;

  totalTax: number;
  afterTax: number;
  effectiveRate: number;
}

/** Section 4C. Nil at or below the threshold, then the rate on the whole income. */
export function superTaxOn(
  superTaxIncome: number,
  category: SuperTaxCategory,
  exportsAbove80Percent: boolean,
): { tax: number; rate: number; threshold: number } {
  const band = SUPER_TAX[category];
  if (exportsAbove80Percent || superTaxIncome <= band.threshold) {
    return { tax: 0, rate: 0, threshold: band.threshold };
  }
  // The rate applies to the whole income, not to the excess. See the note above.
  return { tax: superTaxIncome * band.rate, rate: band.rate, threshold: band.threshold };
}

export function calculateCompany(input: CompanyInput): CompanyResult {
  const taxableIncome = money(input.taxableIncome);
  const turnover = money(input.turnover);

  const companyRate = COMPANY_RATES[input.kind];
  const normalTax = taxableIncome * companyRate;

  const minimumTaxRate = MINIMUM_TAX_RATES[input.sector];
  const minimumTax = turnover * minimumTaxRate;

  // Section 113 replaces the normal tax when higher; it is never added to it.
  const minimumTaxApplies = minimumTax > normalTax;
  const taxBeforeSuperTax = Math.max(normalTax, minimumTax);
  const carryForward = minimumTaxApplies ? minimumTax - normalTax : 0;

  const {
    tax: superTax,
    rate: superTaxRate,
    threshold: superTaxThreshold,
  } = superTaxOn(
    money(input.superTaxIncome),
    input.superTaxCategory,
    input.exportsAbove80Percent,
  );

  const totalTax = taxBeforeSuperTax + superTax;

  return {
    taxableIncome,
    turnover,
    companyRate,
    normalTax,
    minimumTaxRate,
    minimumTax,
    minimumTaxApplies,
    carryForward,
    taxBeforeSuperTax,
    superTaxRate,
    superTax,
    superTaxThreshold,
    totalTax,
    afterTax: taxableIncome - totalTax,
    effectiveRate: taxableIncome > 0 ? totalTax / taxableIncome : 0,
  };
}
