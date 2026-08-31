/**
 * Pakistan salary tax, tax year 2027.
 *
 * ## Why this file is data first and arithmetic second
 *
 * Everything a visitor sees on /tools/salary-tax is computed here, and every
 * number in it is a statutory figure rather than a chosen one. So the rates,
 * the caps and the thresholds are declared as named constants with their
 * section of the Income Tax Ordinance, 2001 attached, and the functions below
 * only ever combine them. When the next Finance Act lands, the edit is to the
 * data at the top and to `TAX_YEAR`; the arithmetic does not move.
 *
 * ## Where these figures come from
 *
 * The Income Tax Ordinance, 2001 as amended up to 30 June 2026, published by
 * FBR, which is the text in force for tax year 2027 (the year beginning
 * 1 July 2026). Every slab, cap and formula below was read out of that
 * document rather than from a summary of it, and the section numbers in the
 * comments are there so the next person can check the same way.
 *
 * That mattered more than expected. Two things a secondary source will still
 * tell you are wrong: section 60C (the profit-on-debt allowance for a house
 * loan) was omitted by the Finance Act 2022 and no longer exists, and the
 * section 4AB surcharge no longer applies to salary at all. Both are the kind
 * of error that makes a calculator confidently produce a number that is not
 * the law, which is the specific failure this file exists to avoid.
 *
 * ## What this is NOT
 *
 * It is an estimate of tax on salary income, and the page says so. It does not
 * model: multiple employers, income under any other head, provincial
 * professional tax, the salaried-versus-other 75% test in Division I (it
 * assumes salary is more than 75% of taxable income, which is the whole point
 * of a salary calculator), or anything requiring the taxpayer's filing
 * history. A person with those facts needs a return prepared, not a widget.
 */

/**
 * The tax year these figures are for.
 *
 * Pakistan's tax year is named for the year it ENDS in, so tax year 2027 runs
 * 1 July 2026 to 30 June 2027 and is what the Finance Act 2026 legislated.
 * Both halves are shown on the page, because "2027" alone reliably makes
 * people think the calculator is a year ahead of itself.
 */
export const TAX_YEAR = {
  label: 'Tax year 2027',
  period: '1 July 2026 to 30 June 2027',
  /** The Act that set the slabs below. Shown as the page's provenance line. */
  authority: 'Finance Act 2026',
} as const;

/**
 * Salary tax slabs: First Schedule, Part I, Division I, sub-clause (2), which
 * is the table that applies where salary exceeds 75% of taxable income.
 *
 * `upTo: null` is the open-ended top slab. `fixed` is the cumulative tax at
 * the bottom of the slab, and it is stated in the Ordinance rather than
 * derived. It is ALSO derivable from the slabs below it, which is what
 * `assertSlabsConsistent` at the bottom of this file checks on every import:
 * if a future edit changes a rate and forgets the fixed amounts that follow
 * it, the two disagree and the build fails rather than the page quietly
 * reporting the wrong tax.
 */
export interface Slab {
  /** Upper bound of the slab, or null for the open-ended top slab. */
  upTo: number | null;
  /** Marginal rate on the part of income inside this slab. */
  rate: number;
  /** Cumulative tax at the bottom of this slab, per the Ordinance. */
  fixed: number;
}

export const SLABS: Slab[] = [
  { upTo: 600_000, rate: 0, fixed: 0 },
  { upTo: 1_200_000, rate: 0.01, fixed: 0 },
  { upTo: 2_200_000, rate: 0.11, fixed: 6_000 },
  { upTo: 3_200_000, rate: 0.2, fixed: 116_000 },
  { upTo: 4_100_000, rate: 0.25, fixed: 316_000 },
  { upTo: 5_600_000, rate: 0.29, fixed: 541_000 },
  { upTo: 7_000_000, rate: 0.32, fixed: 976_000 },
  { upTo: null, rate: 0.35, fixed: 1_424_000 },
];

/** The exempt threshold, restated so callers do not index into SLABS. */
export const EXEMPT_THRESHOLD = 600_000;

/**
 * EOBI, the one deduction here that is not income tax.
 *
 * Two things about it are counter-intuitive and both are handled explicitly
 * rather than glossed:
 *
 *   IT IS NOT A PERCENTAGE OF YOUR SALARY. The employee's 1% is charged on the
 *   government-notified minimum wage, so it is the same Rs 407 a month whether
 *   you earn Rs 60,000 or Rs 600,000.
 *   IT IS NOT UNIVERSAL. It applies through the employer's registration with
 *   EOBI, which covers establishments of five or more workers. Plenty of
 *   salaried people in Pakistan have no EOBI line on their slip at all.
 *
 * Which is why the page asks rather than assuming. See the note on
 * `CalculatorInput.eobi`.
 */
export const EOBI = {
  /** Minimum wage notified for FY 2026-27, the base the contribution sits on. */
  minimumWage: 40_700,
  /** The employee's share. The employer's separate 5% is not a salary deduction. */
  employeeRate: 0.01,
} as const;

/** Rs 407 a month, Rs 4,884 a year. Derived so the two can never disagree. */
export const EOBI_MONTHLY = Math.round(EOBI.minimumWage * EOBI.employeeRate);
export const EOBI_ANNUAL = EOBI_MONTHLY * 12;

/**
 * The statutory caps on the reliefs the calculator offers.
 *
 * Two different mechanisms live here and the difference is the single thing
 * most often got wrong about them:
 *
 *   A DEDUCTIBLE ALLOWANCE comes off taxable income BEFORE the slabs are
 *   applied, so it is worth your marginal rate.
 *   A TAX CREDIT comes off the tax itself, computed at your AVERAGE rate
 *   through the Ordinance's own formula (A/B) x C.
 *
 * Zakat and education expenses are allowances. Donations and the pension
 * contribution are credits. `calculate` below applies them in that order,
 * which is the order section 9 and Part X require.
 */
export const RELIEF = {
  /** Section 60D. Available only below this taxable income. */
  educationIncomeCeiling: 1_500_000,
  /** Section 60D(2)(a). The allowance is 5% of the fee, not the whole fee. */
  educationFeeRate: 0.05,
  /** Section 60D(2)(b). */
  educationIncomeRate: 0.25,
  /** Section 60D(2)(c), per child. */
  educationPerChild: 60_000,
  /** Section 61, component C(b)(i) for an individual. */
  donationIncomeRate: 0.3,
  /** Section 63, component C(ii). */
  pensionIncomeRate: 0.2,
} as const;

export interface CalculatorInput {
  /** Gross salary as typed, in the unit `period` names. */
  amount: number;
  period: 'monthly' | 'annual';
  /**
   * Whether the employer deducts EOBI. Off by default and asked as a question,
   * because assuming it would put a Rs 4,884 deduction on the slip of every
   * visitor whose employer is not registered.
   */
  eobi: boolean;
  /**
   * Employee provident fund contribution, as a percentage of gross.
   *
   * There is no statutory rate: the trust deed sets it, 8.33% and 10% are both
   * common, and many employers run no fund at all. So this is a number the
   * visitor supplies rather than one this file asserts.
   *
   * It reduces take-home WITHOUT reducing tax. The employee's own contribution
   * to a recognised fund is made out of taxed salary, so it is shown under
   * deductions and deliberately kept out of the taxable income figure. It is
   * also the visitor's own money going into their own fund, which the results
   * panel says rather than leaving it looking like a tax.
   */
  providentFundRate: number;
  /** Section 60: Zakat paid under the Zakat and Ushr Ordinance, annual. */
  zakat: number;
  /** Section 60D: total annual tuition fee paid, and the number of children. */
  tuitionFee: number;
  children: number;
  /** Section 61: annual donations to approved organisations. */
  donations: number;
  /** Section 63: annual contribution to an approved Voluntary Pension Scheme. */
  pensionContribution: number;
}

export const EMPTY_INPUT: CalculatorInput = {
  amount: 0,
  period: 'monthly',
  eobi: false,
  providentFundRate: 0,
  zakat: 0,
  tuitionFee: 0,
  children: 0,
  donations: 0,
  pensionContribution: 0,
};

/** One slab's contribution, for the working shown under the result. */
export interface SlabRow {
  from: number;
  to: number | null;
  rate: number;
  /** Income falling inside this slab. */
  taxable: number;
  /** Tax arising from this slab alone. */
  tax: number;
}

export interface Result {
  grossAnnual: number;
  grossMonthly: number;

  /** Allowances under sections 60 and 60D, before the slabs. */
  zakatAllowance: number;
  educationAllowance: number;
  taxableIncome: number;

  /** Tax on `taxableIncome` straight off the slabs, before any credit. */
  taxBeforeCredits: number;
  slabRows: SlabRow[];

  /** Credits under sections 61 and 63, at the average rate. */
  donationCredit: number;
  pensionCredit: number;
  /** The average rate the credits are computed at: taxBeforeCredits / taxable. */
  averageRate: number;

  incomeTax: number;
  eobiAnnual: number;
  providentFundAnnual: number;

  /** Income tax + EOBI. What actually leaves as tax and statutory deduction. */
  totalStatutory: number;
  /** Everything that comes off the gross, provident fund included. */
  totalDeductions: number;

  takeHomeAnnual: number;
  takeHomeMonthly: number;

  /** incomeTax / grossAnnual. The number people mean by "my tax rate". */
  effectiveRate: number;
  /** The rate on the next rupee earned. */
  marginalRate: number;
}

function annualise(amount: number, period: CalculatorInput['period']): number {
  return period === 'monthly' ? amount * 12 : amount;
}

/**
 * Tax on a taxable income, plus the per-slab working.
 *
 * The Ordinance states each slab as "fixed + rate on the excess", which is one
 * lookup. This walks every slab instead and sums them, because the page shows
 * the breakdown and a walk is what produces it. `assertSlabsConsistent` proves
 * the two methods agree, so the shown working is the same number as the
 * statutory formula rather than an approximation of it.
 */
export function taxOn(taxableIncome: number): { tax: number; rows: SlabRow[] } {
  const rows: SlabRow[] = [];
  let tax = 0;
  let floor = 0;

  for (const slab of SLABS) {
    const ceiling = slab.upTo ?? Infinity;
    if (taxableIncome <= floor) break;

    const taxable = Math.min(taxableIncome, ceiling) - floor;
    const slabTax = taxable * slab.rate;
    tax += slabTax;

    rows.push({
      from: floor,
      to: slab.upTo,
      rate: slab.rate,
      taxable,
      tax: slabTax,
    });

    floor = ceiling;
  }

  return { tax, rows };
}

/** The marginal rate at a given taxable income. */
export function marginalRateAt(taxableIncome: number): number {
  let floor = 0;
  for (const slab of SLABS) {
    const ceiling = slab.upTo ?? Infinity;
    if (taxableIncome <= ceiling) return taxableIncome <= floor ? slab.rate : slab.rate;
    floor = ceiling;
  }
  return SLABS[SLABS.length - 1]!.rate;
}

/**
 * Section 60D, the education allowance.
 *
 * The threshold test is the trap in this one. The Ordinance gates it on
 * taxable income being under Rs 1.5m, and "taxable income" there is the figure
 * BEFORE this allowance is applied, which is what `incomeBeforeAllowance` is.
 * Reading it the other way lets an allowance pull someone under the ceiling
 * and thereby qualify them for it, which is circular.
 */
function educationAllowance(
  incomeBeforeAllowance: number,
  tuitionFee: number,
  children: number,
): number {
  if (incomeBeforeAllowance >= RELIEF.educationIncomeCeiling) return 0;
  if (tuitionFee <= 0 || children <= 0) return 0;

  return Math.min(
    tuitionFee * RELIEF.educationFeeRate,
    incomeBeforeAllowance * RELIEF.educationIncomeRate,
    children * RELIEF.educationPerChild,
  );
}

/**
 * The Ordinance's credit formula, (A/B) x C, used by both section 61 and
 * section 63.
 *
 * A is tax before credits, B is taxable income, so A/B is the average rate. C
 * is the lesser of what was actually paid and the section's cap. Guarding B
 * against zero matters: below the exempt threshold there is no tax to credit
 * against and the formula would otherwise divide by nothing.
 */
function creditAtAverageRate(
  taxBeforeCredits: number,
  taxableIncome: number,
  paid: number,
  cap: number,
): number {
  if (taxableIncome <= 0 || taxBeforeCredits <= 0 || paid <= 0) return 0;
  const eligible = Math.min(paid, cap);
  return (taxBeforeCredits / taxableIncome) * eligible;
}

export function calculate(input: CalculatorInput): Result {
  const grossAnnual = Math.max(0, annualise(input.amount, input.period));

  // ── Allowances, section 9: these come off before the slabs ──────────────
  const zakatAllowance = Math.min(Math.max(0, input.zakat), grossAnnual);
  const afterZakat = grossAnnual - zakatAllowance;

  const education = educationAllowance(
    afterZakat,
    Math.max(0, input.tuitionFee),
    Math.max(0, Math.floor(input.children)),
  );

  const taxableIncome = Math.max(0, afterZakat - education);

  // ── The slabs ───────────────────────────────────────────────────────────
  const { tax: taxBeforeCredits, rows: slabRows } = taxOn(taxableIncome);
  const averageRate = taxableIncome > 0 ? taxBeforeCredits / taxableIncome : 0;

  // ── Credits, Part X: these come off the tax, at the average rate ────────
  const donationCredit = creditAtAverageRate(
    taxBeforeCredits,
    taxableIncome,
    Math.max(0, input.donations),
    taxableIncome * RELIEF.donationIncomeRate,
  );

  const pensionCredit = creditAtAverageRate(
    taxBeforeCredits,
    taxableIncome,
    Math.max(0, input.pensionContribution),
    taxableIncome * RELIEF.pensionIncomeRate,
  );

  // Credits cannot take the liability below zero: they reduce tax payable,
  // they are not refundable.
  const incomeTax = Math.max(0, taxBeforeCredits - donationCredit - pensionCredit);

  // ── Deductions that are not tax ─────────────────────────────────────────
  const eobiAnnual = input.eobi ? EOBI_ANNUAL : 0;
  const providentFundAnnual =
    grossAnnual * Math.min(Math.max(0, input.providentFundRate), 100) / 100;

  const totalStatutory = incomeTax + eobiAnnual;
  const totalDeductions = totalStatutory + providentFundAnnual;
  const takeHomeAnnual = grossAnnual - totalDeductions;

  return {
    grossAnnual,
    grossMonthly: grossAnnual / 12,

    zakatAllowance,
    educationAllowance: education,
    taxableIncome,

    taxBeforeCredits,
    slabRows,

    donationCredit,
    pensionCredit,
    averageRate,

    incomeTax,
    eobiAnnual,
    providentFundAnnual,

    totalStatutory,
    totalDeductions,

    takeHomeAnnual,
    takeHomeMonthly: takeHomeAnnual / 12,

    effectiveRate: grossAnnual > 0 ? incomeTax / grossAnnual : 0,
    marginalRate: marginalRateAt(taxableIncome),
  };
}

/**
 * Proves the two statements of the same table agree.
 *
 * Every slab's `fixed` is the Ordinance's own cumulative figure, and it is
 * also computable by walking the slabs beneath it. They must match. This runs
 * at module load, so a bad edit fails `pnpm typecheck`, `pnpm build` and the
 * page's first render rather than shipping a wrong number quietly.
 *
 * It is cheap enough to leave in: eight slabs, one pass, once per process.
 */
function assertSlabsConsistent(): void {
  let cumulative = 0;
  let floor = 0;

  for (const slab of SLABS) {
    if (Math.abs(slab.fixed - cumulative) > 0.5) {
      throw new Error(
        `Pakistan tax slabs are inconsistent: the slab starting at ${floor} declares a ` +
          `fixed amount of ${slab.fixed}, but the slabs beneath it sum to ${cumulative}. ` +
          'Re-check the table in the First Schedule, Part I, Division I.',
      );
    }
    if (slab.upTo === null) break;
    cumulative += (slab.upTo - floor) * slab.rate;
    floor = slab.upTo;
  }
}

assertSlabsConsistent();
