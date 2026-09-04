import { money } from './slabs';
/**
 * Four calculators that all sit on the salary slabs in ./pakistan.ts.
 *
 * None of them introduces a rate. Every figure they produce comes out of
 * `calculate()` next door, which is deliberate: a raise calculator that
 * disagreed with the salary calculator about the tax on the same salary would
 * be worse than not having one, and the only way to guarantee they agree is to
 * make one call the other rather than reimplement it.
 *
 * So what is here is the question each one asks, not the tax law:
 *
 *   reverseSalary   what gross produces this take-home
 *   increment       how much of a raise survives tax
 *   compareOffers   which of two jobs pays more, after tax
 *   multiYear       tax across a year assembled from several pay periods
 */

import { calculate, EMPTY_INPUT, type CalculatorInput, type Result } from './pakistan';

/**
 * A salary calculation from a gross annual figure, with everything optional
 * left off.
 *
 * The four tools below all compare like with like, so none of them offers the
 * allowances and credits: a raise is the same raise whether or not you pay
 * Zakat, and adding six fields to each of four calculators to move both sides
 * of every comparison by the same amount is a worse page for no more answer.
 * The salary calculator is where the reliefs live, and each page links to it.
 */
function taxFor(grossAnnual: number): Result {
  const input: CalculatorInput = { ...EMPTY_INPUT, amount: money(grossAnnual), period: 'annual' };
  return calculate(input);
}

// ── Reverse: gross from a target net ────────────────────────────────────────

export interface ReverseResult {
  targetNetAnnual: number;
  targetNetMonthly: number;
  grossAnnual: number;
  grossMonthly: number;
  taxAnnual: number;
  taxMonthly: number;
  effectiveRate: number;
  /** How close the search got. Shown so the answer is not presented as exact. */
  residual: number;
}

/**
 * The gross salary that yields a given take-home.
 *
 * ## Why this is a search rather than a formula
 *
 * Inverting the slabs algebraically is possible but fragile: it needs a
 * separate closed form per slab, and every one of them has to be rederived
 * when a Finance Act moves a threshold. That is exactly the kind of hand
 * arithmetic this codebase keeps out of tax code.
 *
 * A bisection over `calculate()` needs no rederivation, cannot disagree with
 * the forward calculation by construction, and converges to the rupee in about
 * fifty iterations. Take-home is monotonic in gross (every marginal rate is
 * below 100%), which is the property that makes bisection valid here.
 */
export function reverseSalary(targetNetAnnual: number): ReverseResult {
  const target = money(targetNetAnnual);

  let low = 0;
  // Tax never exceeds the top marginal rate, so gross is bounded by
  // target / (1 - 0.35). Doubling that leaves generous headroom for the search.
  let high = Math.max(1, target * 4);

  // 60 halvings of a bounded interval takes the error far below a rupee.
  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    if (taxFor(mid).takeHomeAnnual < target) low = mid;
    else high = mid;
  }

  const grossAnnual = high;
  const result = taxFor(grossAnnual);

  return {
    targetNetAnnual: target,
    targetNetMonthly: target / 12,
    grossAnnual,
    grossMonthly: grossAnnual / 12,
    taxAnnual: result.incomeTax,
    taxMonthly: result.incomeTax / 12,
    effectiveRate: result.effectiveRate,
    residual: result.takeHomeAnnual - target,
  };
}

// ── Increment: what a raise is worth after tax ──────────────────────────────

export interface IncrementResult {
  current: Result;
  raised: Result;
  /** The raise as offered, before tax. */
  riseGrossAnnual: number;
  riseGrossMonthly: number;
  /** What actually reaches the account. */
  riseNetAnnual: number;
  riseNetMonthly: number;
  /** Extra tax caused by the raise alone. */
  extraTaxAnnual: number;
  /** riseNet / riseGross. The share of the raise kept. */
  keptShare: number;
  /** The rate the raise itself was taxed at. */
  rateOnRise: number;
  /** True when the raise pushed the salary into a higher slab. */
  crossedSlab: boolean;
}

export function calculateIncrement(
  currentGrossAnnual: number,
  raisePercent: number,
): IncrementResult {
  const currentGross = money(currentGrossAnnual);
  const raisedGross = currentGross * (1 + money(raisePercent) / 100);

  const current = taxFor(currentGross);
  const raised = taxFor(raisedGross);

  const riseGrossAnnual = raisedGross - currentGross;
  const riseNetAnnual = raised.takeHomeAnnual - current.takeHomeAnnual;
  const extraTaxAnnual = raised.incomeTax - current.incomeTax;

  return {
    current,
    raised,
    riseGrossAnnual,
    riseGrossMonthly: riseGrossAnnual / 12,
    riseNetAnnual,
    riseNetMonthly: riseNetAnnual / 12,
    extraTaxAnnual,
    keptShare: riseGrossAnnual > 0 ? riseNetAnnual / riseGrossAnnual : 0,
    rateOnRise: riseGrossAnnual > 0 ? extraTaxAnnual / riseGrossAnnual : 0,
    crossedSlab: raised.marginalRate > current.marginalRate,
  };
}

// ── Job offers: two salaries, after tax ─────────────────────────────────────

export interface OfferComparison {
  current: Result;
  offer: Result;
  /** Offer minus current, on take-home. Negative when the offer pays less. */
  differenceAnnual: number;
  differenceMonthly: number;
  /** The difference as a share of current take-home. */
  differenceShare: number;
  /** True when the offer's take-home is higher. */
  offerIsBetter: boolean;
  /**
   * The gross the offer would need for its take-home to match the current job.
   * Nil when the offer already pays more. This is the number to negotiate with.
   */
  breakEvenGrossAnnual: number;
}

export function compareOffers(
  currentGrossAnnual: number,
  offerGrossAnnual: number,
): OfferComparison {
  const current = taxFor(money(currentGrossAnnual));
  const offer = taxFor(money(offerGrossAnnual));

  const differenceAnnual = offer.takeHomeAnnual - current.takeHomeAnnual;

  return {
    current,
    offer,
    differenceAnnual,
    differenceMonthly: differenceAnnual / 12,
    differenceShare: current.takeHomeAnnual > 0 ? differenceAnnual / current.takeHomeAnnual : 0,
    offerIsBetter: differenceAnnual > 0,
    // Solved rather than estimated, so the negotiating figure is the real one.
    breakEvenGrossAnnual: reverseSalary(current.takeHomeAnnual).grossAnnual,
  };
}

// ── Multi-year: a tax year assembled from several pay periods ───────────────

export interface PayPeriod {
  /** What the job paid, per month. */
  monthlySalary: number;
  /** How many months of the tax year it ran. */
  months: number;
  /** Optional label, e.g. the employer's name. */
  label?: string;
}

export interface MultiYearResult {
  periods: (PayPeriod & { grossForPeriod: number })[];
  monthsCovered: number;
  /** Total gross across every period entered. */
  grossAnnual: number;
  /** Tax on that total, which is what the year actually owes. */
  result: Result;

  /**
   * What each employer would have withheld treating its own period as the
   * whole year, summed. This is the figure the payslips add up to.
   */
  withheldIfEachEmployerActedAlone: number;
  /**
   * The gap between the two. Positive means tax is still owed at filing.
   *
   * This is the entire reason the calculator exists: each employer withholds
   * under section 149 against a projection of the year at ITS OWN salary, so
   * two half-years at Rs 200,000 are each withheld as though the person earned
   * Rs 2.4m, when the year actually earned Rs 2.4m in total and is taxed once.
   * Anyone who changed jobs mid-year meets this at filing time and is usually
   * surprised by it.
   */
  shortfall: number;
}

export function calculateMultiYear(periods: PayPeriod[]): MultiYearResult {
  const cleaned = periods.map((p) => ({
    ...p,
    monthlySalary: money(p.monthlySalary),
    months: money(Math.min(12, p.months)),
    grossForPeriod: money(p.monthlySalary) * money(Math.min(12, p.months)),
  }));

  const grossAnnual = cleaned.reduce((sum, p) => sum + p.grossForPeriod, 0);
  const monthsCovered = cleaned.reduce((sum, p) => sum + p.months, 0);

  const result = taxFor(grossAnnual);

  // Each employer projects ITS OWN monthly salary across a full year, works out
  // the tax on that, and withholds the months it actually employed you.
  const withheldIfEachEmployerActedAlone = cleaned.reduce((sum, p) => {
    if (p.months <= 0) return sum;
    const projectedAnnual = p.monthlySalary * 12;
    const taxOnProjection = taxFor(projectedAnnual).incomeTax;
    return sum + (taxOnProjection / 12) * p.months;
  }, 0);

  return {
    periods: cleaned,
    monthsCovered,
    grossAnnual,
    result,
    withheldIfEachEmployerActedAlone,
    shortfall: result.incomeTax - withheldIfEachEmployerActedAlone,
  };
}
