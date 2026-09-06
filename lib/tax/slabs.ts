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
  /**
   * A whole-band flat charge, in rupees, replacing the "fixed + rate on the
   * excess" formula for this band alone.
   *
   * Almost every table in Pakistani income tax law is progressive in the usual
   * way, and for those this is absent and the two fields above say everything.
   * Tax year 2019 is the exception the type exists for: the Finance Act 2018
   * charged a salaried person a flat Rs 1,000 anywhere between Rs 400,000 and
   * Rs 800,000, and a flat Rs 2,000 between Rs 800,000 and Rs 1,200,000. Not a
   * rate on the excess. The same rupee figure across the whole band.
   *
   * That table has two further properties worth stating, because they are what
   * makes it awkward rather than merely unusual:
   *
   *   THE FLAT AMOUNTS DO NOT ACCUMULATE. The band above Rs 1.2m is "5% of the
   *   amount exceeding Rs 1,200,000", starting from zero rather than from the
   *   Rs 2,000 below it. So the cumulative reconciliation that every other
   *   table satisfies does not hold here, and `assertSlabsConsistent` is told
   *   as much rather than being loosened for every table to accommodate one.
   *
   *   IT IS A CLIFF, NOT A RAMP. Earning one rupee over Rs 400,000 costs
   *   Rs 1,000. That is what the law said, so it is what this computes.
   */
  flat?: number;
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
  /**
   * True where this band charged a flat amount rather than a rate on the
   * slice. The working shown to a reader says "Rs 1,000 on the band" instead
   * of a percentage, because a percentage would be a fiction here.
   */
  flat?: boolean;
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
  /* Whether the band below the one being walked charged a flat amount. Only
     the tax year 2019 table can set this: see `Slab.flat`. */
  let previousWasFlat = false;

  for (const slab of slabs) {
    const ceiling = slab.upTo ?? Infinity;
    if (taxableIncome <= floor) break;

    const taxable = Math.min(taxableIncome, ceiling) - floor;

    /* A flat band charges its whole amount the moment income enters it, and
       nothing accumulates from the bands beneath. See `Slab.flat`: tax year
       2019 is the only table here that uses this, and it is a cliff by
       design rather than by oversight. Everything else is the usual
       rate-on-the-slice. */
    if (slab.flat !== undefined) {
      tax = slab.flat;
      rows.push({ from: floor, to: slab.upTo, rate: 0, taxable, tax: slab.flat, flat: true });
      floor = ceiling;
      previousWasFlat = true;
      continue;
    }

    /* The band above a flat one starts its count again from that band's own
       stated amount rather than carrying the flat charge upward. In tax year
       2019 the band above Rs 1.2m is "5% of the amount exceeding Rs 1,200,000"
       with nothing added, so a person one rupee over pays five paisa and not
       the Rs 2,000 from the band below. That discontinuity is what the Act
       says, and dropping the accumulated total here is what reproduces it. */
    if (previousWasFlat) tax = slab.fixed;
    previousWasFlat = false;

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
    /* A flat band is outside the cumulative scheme by construction: it charges
       one figure across the whole band and the band above it starts again from
       zero. Reconciling it against the bands beneath would be asserting an
       arithmetic the Ordinance does not use. The table containing one is still
       checked everywhere else, and `check-tax.ts` asserts the flat bands
       themselves against worked cases instead. See `Slab.flat`. */
    if (slab.flat !== undefined) {
      if (slab.upTo === null) break;
      cumulative = slab.flat;
      floor = slab.upTo;
      continue;
    }

    /* The band directly above a flat one restarts from zero rather than from
       the flat amount, so its stated `fixed` is measured from its own floor.
       Skipping the comparison where the band below was flat is what lets the
       tax year 2019 table pass a check the other nine still face in full. */
    const belowWasFlat = cumulative !== 0 && slabs.some((s) => s.flat !== undefined && s.upTo === floor);

    if (!belowWasFlat && Math.abs(slab.fixed - cumulative) > 0.5) {
      throw new Error(
        `${label}: the slab starting at ${floor} states a fixed amount of ` +
          `${slab.fixed}, but the slabs beneath it sum to ${cumulative}. ` +
          `One of the two is wrong.`,
      );
    }
    if (slab.upTo === null) break;
    cumulative = slab.fixed + (slab.upTo - floor) * slab.rate;
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
