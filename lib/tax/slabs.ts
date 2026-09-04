/**
 * The slab walk, extracted so more than one table can use it.
 *
 * `lib/tax/pakistan.ts` had this arithmetic inline against the salary slabs,
 * which was right while salary was the only thing computed here. The business
 * and AOP calculator uses a DIFFERENT table under the same rules (First
 * Schedule, Part I, Division I, sub-clause (1) rather than (2)), and the
 * multi-year calculator uses the salary table for years other than the current
 * one. Three copies of a slab walk is three places for a rounding difference
 * to appear between pages that a visitor will reasonably expect to agree.
 *
 * So the walk lives here and the tables live with the sections that set them.
 * `lib/tax/pakistan.ts` re-exports `Slab` and `SlabRow` unchanged, so nothing
 * that already imported them from there had to move.
 */

/**
 * One band of a progressive rate table.
 *
 * `upTo: null` is the open-ended top slab. `fixed` is the cumulative tax at
 * the bottom of the slab as printed in the Ordinance, not a derived figure:
 * holding both lets `assertSlabsConsistent` check the table against itself.
 */
export interface Slab {
  /** Upper bound of the slab, or null for the open-ended top slab. */
  upTo: number | null;
  /** Marginal rate on the part of income inside this slab. */
  rate: number;
  /** Cumulative tax at the bottom of this slab, per the Ordinance. */
  fixed: number;
}

/** One slab's contribution, for the working shown under a result. */
export interface SlabRow {
  from: number;
  to: number | null;
  rate: number;
  /** Income falling inside this slab. */
  taxable: number;
  /** Tax arising from this slab alone. */
  tax: number;
}

/**
 * Tax on a taxable income against a given table, plus the per-slab working.
 *
 * The Ordinance states each slab as "fixed + rate on the excess", which is one
 * lookup. This walks every slab instead and sums them, because the pages show
 * the breakdown and a walk is what produces it. `assertSlabsConsistent` proves
 * the two methods agree for each table, so the shown working is the same
 * number as the statutory formula rather than an approximation of it.
 */
export function taxOnSlabs(
  taxableIncome: number,
  slabs: readonly Slab[],
): { tax: number; rows: SlabRow[] } {
  const rows: SlabRow[] = [];
  let tax = 0;
  let floor = 0;

  for (const slab of slabs) {
    const ceiling = slab.upTo ?? Infinity;
    if (taxableIncome <= floor) break;

    const taxable = Math.min(taxableIncome, ceiling) - floor;
    const slabTax = taxable * slab.rate;
    tax += slabTax;

    rows.push({ from: floor, to: slab.upTo, rate: slab.rate, taxable, tax: slabTax });

    floor = ceiling;
  }

  return { tax, rows };
}

/** The marginal rate at a given taxable income, against a given table. */
export function marginalRateOn(taxableIncome: number, slabs: readonly Slab[]): number {
  for (const slab of slabs) {
    if (taxableIncome <= (slab.upTo ?? Infinity)) return slab.rate;
  }
  return slabs[slabs.length - 1]!.rate;
}

/**
 * Every `fixed` below the top slab must equal the tax due at that slab's own
 * floor. Throws on import rather than returning a boolean, because a table
 * that disagrees with itself must not reach a page: see the note in
 * lib/tax/pakistan.ts on why this file asserts instead of validating.
 */
export function assertSlabsConsistent(slabs: readonly Slab[], label: string): void {
  let cumulative = 0;
  let floor = 0;

  for (const slab of slabs) {
    if (Math.abs(slab.fixed - cumulative) > 0.5) {
      throw new Error(
        `${label}: the slab starting at ${floor} states a fixed amount of ` +
          `${slab.fixed}, but the slabs beneath it sum to ${cumulative}. ` +
          `One of the two is wrong.`,
      );
    }
    if (slab.upTo === null) break;
    cumulative += (slab.upTo - floor) * slab.rate;
    floor = slab.upTo;
  }
}

/**
 * Coerce a caller-supplied figure to a usable non-negative number.
 *
 * Every engine here already clamps with `Math.max(0, x)`, which handles a
 * negative. It does not handle NaN or Infinity: `Math.max(0, NaN)` is NaN, and
 * NaN propagates silently through every subsequent operation until a page
 * renders "Rs NaN".
 *
 * The UI cannot currently produce either, because NumberField strips input to
 * digits and no string of digits parses to NaN or Infinity. This exists so
 * that fact stays a defence in depth rather than the only thing standing
 * between a caller and a nonsense figure: these modules are importable, and a
 * future caller (a URL parameter, a saved input, an API) may not be so careful.
 */
export function money(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}
