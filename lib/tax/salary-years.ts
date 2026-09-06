/**
 * The salary slab table for every tax year the calculator offers.
 *
 * ## Why more than one year
 *
 * A salary calculator that only knows the current year answers one question:
 * what will I be withheld this month. The questions people actually arrive
 * with are often about a year that has closed. A return for tax year 2025 can
 * still be revised, an assessment for an earlier year can be amended under
 * section 122, someone reconciling an old payslip needs the rates that were in
 * force then, and anyone comparing "am I paying more than I used to" needs two
 * years side by side. None of those can be answered with this year's table.
 *
 * So this file holds ten of them, tax year 2018 through tax year 2027, and the
 * calculator takes a year as an input rather than assuming the current one.
 *
 * ## Where these came from
 *
 * FBR's own consolidated Income Tax Ordinance texts, read directly rather than
 * from any summary of them:
 *
 *   Ordinance amended up to 31 July 2025, First Schedule Part I Division I.
 *   Its operative salaried table is tax year 2026, and its footnotes carry the
 *   superseded tables for 2023, 2024 and 2025 verbatim.
 *   Ordinance amended to 2022, which carries 2019 through 2023.
 *   Ordinance amended to 2018, which carries 2018 and 2019.
 *
 * Each table below is dated by the Finance Act footnote that superseded it:
 * the Ordinance prints "Table substituted by the Finance Act, N. The
 * substituted Table read as follows", so the text under that note is what
 * stood BEFORE that Act. Two of the years were additionally cross-checked
 * against an independent public calculator, noted at the year concerned.
 *
 * ## The naming trap, stated once
 *
 * Pakistan's tax year is named for the year it ENDS in. Tax year 2023 runs
 * 1 July 2022 to 30 June 2023 and was legislated by the Finance Act 2022. The
 * `label` and `period` on each entry both appear in the UI precisely because
 * "2023" alone sends people to the wrong year, and `searchLabel` carries the
 * "2022-23" form that everyone outside the Ordinance actually uses.
 *
 * ## What this file does NOT hold
 *
 * The current year's table still lives in ./pakistan.ts, which is the module
 * every other page and every piece of provenance copy reads from. This file
 * re-exports it as the tax year 2027 entry rather than restating it, so the
 * two cannot drift: there is exactly one statement of the current slabs in
 * this codebase and it is the one that was already there.
 */

import { assertSlabsConsistent, type Slab } from './slabs';
import {
  calculate,
  SLABS as CURRENT_SLABS,
  TAX_YEAR as CURRENT_TAX_YEAR,
  type CalculatorInput,
  type Result,
} from './pakistan';

/**
 * The section 4AB surcharge as it applied to SALARY in a given year.
 *
 * Section 4AB was inserted by the Finance Act 2024, so it first bites in tax
 * year 2025. Its general rate is 10%, but a proviso charges a person whose
 * income is under the head "Salary" at 9% instead, and section 149 makes the
 * employer withhold it along with the tax. It is charged ON THE TAX, not on
 * income, and only where taxable income exceeds Rs 10 million.
 *
 * It steps down to nil for salary in tax year 2027, which is why
 * ./pakistan.ts has no surcharge in it and this file does. `rate: 0` says
 * "the section exists and does not reach salary this year"; that is a
 * different statement from the section not existing, and the difference is
 * visible to anyone checking an older year.
 */
export interface SalarySurcharge {
  /** Share of the income tax added, e.g. 0.09. Nil where it does not apply. */
  rate: number;
  /** Taxable income above which it bites. */
  threshold: number;
}

const NO_SURCHARGE: SalarySurcharge = { rate: 0, threshold: Infinity };

/**
 * Section 4AB in its first year, tax year 2025.
 *
 * As inserted by the Finance Act 2024 it charged a flat 10% of the income tax
 * above Rs 10 million of taxable income, with no distinction between salary
 * and anything else. The 9% salary proviso did not exist yet.
 */
const SURCHARGE_10PC: SalarySurcharge = { rate: 0.1, threshold: 10_000_000 };

/**
 * Section 4AB for salary in tax year 2026.
 *
 * The Finance Act 2025 added the proviso that drops a salaried person to 9%
 * while everyone else stayed at 10%. The distinction matters at exactly the
 * incomes this calculator is used for, so the two rates are separate constants
 * rather than one constant and a comment.
 */
const SURCHARGE_9PC: SalarySurcharge = { rate: 0.09, threshold: 10_000_000 };

export interface TaxYearTable {
  /** Stable key, and the value the year selector round-trips. Matches the
   *  "2026-2027" form so a URL or a saved choice reads unambiguously. */
  id: string;
  /** The statutory name, e.g. "Tax year 2027". */
  label: string;
  /** The dates it runs between, spelled out. */
  period: string;
  /** The same year as it is searched for, e.g. "2026-27". */
  searchLabel: string;
  /** The Act that set the table. Shown as the page's provenance line. */
  authority: string;
  /** The slabs themselves. */
  slabs: Slab[];
  /** The exempt threshold, restated so callers do not index into `slabs`. */
  exemptThreshold: number;
  /** Section 4AB on salary, for this year. */
  surcharge: SalarySurcharge;
  /**
   * The share of taxable income that must be salary for this table to apply.
   *
   * 0.75 for tax year 2020 onward. It was 0.5 in the earlier years, which is a
   * real difference rather than a drafting change: a person with a large
   * non-salary income could fall on the salaried table in 2019 and on the
   * business table in 2021 for the same facts. The calculator states its
   * assumption rather than modelling the test, so this is here to be shown.
   */
  salaryShareTest: number;
  /** Anything about the year a reader would otherwise get wrong. */
  note?: string;
}

/**
 * Tax year 2027, taken straight from ./pakistan.ts rather than restated.
 *
 * The single most likely way this file could publish a wrong number is by
 * holding a second, stale copy of the current year's slabs. It holds a
 * reference instead.
 */
const TY2027: TaxYearTable = {
  id: '2026-2027',
  label: CURRENT_TAX_YEAR.label,
  period: CURRENT_TAX_YEAR.period,
  searchLabel: CURRENT_TAX_YEAR.searchLabel,
  authority: CURRENT_TAX_YEAR.authority,
  slabs: CURRENT_SLABS,
  exemptThreshold: 600_000,
  // Section 4AB stepped down to nil for salary this year. See business.ts,
  // where the AOP case that still pays it lives.
  surcharge: NO_SURCHARGE,
  salaryShareTest: 0.75,
};

/** Tax year 2026. Finance Act 2025. */
const TY2026: TaxYearTable = {
  id: '2025-2026',
  label: 'Tax year 2026',
  period: '1 July 2025 to 30 June 2026',
  searchLabel: '2025-26',
  authority: 'Finance Act 2025',
  slabs: [
    { upTo: 600_000, rate: 0, fixed: 0 },
    { upTo: 1_200_000, rate: 0.01, fixed: 0 },
    { upTo: 2_200_000, rate: 0.11, fixed: 6_000 },
    { upTo: 3_200_000, rate: 0.23, fixed: 116_000 },
    { upTo: 4_100_000, rate: 0.3, fixed: 346_000 },
    { upTo: null, rate: 0.35, fixed: 616_000 },
  ],
  exemptThreshold: 600_000,
  surcharge: SURCHARGE_9PC,
  salaryShareTest: 0.75,
  note: 'The 9% surcharge under section 4AB applied to salary above Rs 10 million taxable income this year. It is nil for tax year 2027.',
};

/** Tax year 2025. Finance Act 2024. */
const TY2025: TaxYearTable = {
  id: '2024-2025',
  label: 'Tax year 2025',
  period: '1 July 2024 to 30 June 2025',
  searchLabel: '2024-25',
  authority: 'Finance Act 2024',
  slabs: [
    { upTo: 600_000, rate: 0, fixed: 0 },
    { upTo: 1_200_000, rate: 0.05, fixed: 0 },
    { upTo: 2_200_000, rate: 0.15, fixed: 30_000 },
    { upTo: 3_200_000, rate: 0.25, fixed: 180_000 },
    { upTo: 4_100_000, rate: 0.3, fixed: 430_000 },
    { upTo: null, rate: 0.35, fixed: 700_000 },
  ],
  exemptThreshold: 600_000,
  // Section 4AB was inserted by the Finance Act 2024, so this is the first
  // year it applies at all, and at that point it was 10% for everyone. The
  // reduced 9% salary rate is a year later.
  surcharge: SURCHARGE_10PC,
  salaryShareTest: 0.75,
  note: 'The first year of the section 4AB surcharge: 10% of the tax where taxable income exceeded Rs 10 million, with no reduced rate for salary yet.',
};

/**
 * Tax year 2024. Finance Act 2023.
 *
 * The Finance Act 2024 left the salaried table alone, so 2024 and 2025 differ
 * in their slabs after all: the 2024 table is the one below and the 2025 table
 * is the one above. They are stated separately rather than shared, because a
 * reader checking one should not have to know which other year it borrowed
 * from.
 */
const TY2024: TaxYearTable = {
  id: '2023-2024',
  label: 'Tax year 2024',
  period: '1 July 2023 to 30 June 2024',
  searchLabel: '2023-24',
  authority: 'Finance Act 2023',
  slabs: [
    { upTo: 600_000, rate: 0, fixed: 0 },
    { upTo: 1_200_000, rate: 0.025, fixed: 0 },
    { upTo: 2_400_000, rate: 0.125, fixed: 15_000 },
    { upTo: 3_600_000, rate: 0.225, fixed: 165_000 },
    { upTo: 6_000_000, rate: 0.275, fixed: 435_000 },
    { upTo: null, rate: 0.35, fixed: 1_095_000 },
  ],
  exemptThreshold: 600_000,
  surcharge: NO_SURCHARGE,
  salaryShareTest: 0.75,
};

/**
 * Tax year 2023. Finance Act 2022.
 *
 * Cross-checked against an independent public calculator: an annual salary of
 * Rs 3,600,000 gives Rs 405,000, which is 165,000 + 20% of 1,200,000. Two
 * sources, same figure.
 */
const TY2023: TaxYearTable = {
  id: '2022-2023',
  label: 'Tax year 2023',
  period: '1 July 2022 to 30 June 2023',
  searchLabel: '2022-23',
  authority: 'Finance Act 2022',
  slabs: [
    { upTo: 600_000, rate: 0, fixed: 0 },
    { upTo: 1_200_000, rate: 0.025, fixed: 0 },
    { upTo: 2_400_000, rate: 0.125, fixed: 15_000 },
    { upTo: 3_600_000, rate: 0.2, fixed: 165_000 },
    { upTo: 6_000_000, rate: 0.25, fixed: 405_000 },
    { upTo: 12_000_000, rate: 0.325, fixed: 1_005_000 },
    { upTo: null, rate: 0.35, fixed: 2_955_000 },
  ],
  exemptThreshold: 600_000,
  surcharge: NO_SURCHARGE,
  salaryShareTest: 0.75,
};

/**
 * Tax years 2020, 2021 and 2022. Finance Act 2019.
 *
 * ONE TABLE, THREE YEARS. The Finance Acts of 2020 and 2021 both left the
 * salaried slabs alone, so the table the 2019 Act set governed all three years
 * until the Finance Act 2022 replaced it. Verified against three separate FBR
 * Ordinance vintages (amended to 30.06.2019, 30.06.2021 and 30.06.2022), which
 * is the check that matters here: reading a single consolidated text it is
 * easy to take a table from the wrong side of a Finance Act footnote and
 * attribute it to the wrong year.
 *
 * Twelve slabs, the longest table of the ten, running to a top band above
 * Rs 75 million. Declared once and referenced three times, because three
 * copies of one table is three things to get wrong.
 */
const TY2020_SLABS: Slab[] = [
  { upTo: 600_000, rate: 0, fixed: 0 },
  { upTo: 1_200_000, rate: 0.05, fixed: 0 },
  { upTo: 1_800_000, rate: 0.1, fixed: 30_000 },
  { upTo: 2_500_000, rate: 0.15, fixed: 90_000 },
  { upTo: 3_500_000, rate: 0.175, fixed: 195_000 },
  { upTo: 5_000_000, rate: 0.2, fixed: 370_000 },
  { upTo: 8_000_000, rate: 0.225, fixed: 670_000 },
  { upTo: 12_000_000, rate: 0.25, fixed: 1_345_000 },
  { upTo: 30_000_000, rate: 0.275, fixed: 2_345_000 },
  { upTo: 50_000_000, rate: 0.3, fixed: 7_295_000 },
  { upTo: 75_000_000, rate: 0.325, fixed: 13_295_000 },
  { upTo: null, rate: 0.35, fixed: 21_420_000 },
];

/** Tax year 2022. Finance Act 2019, untouched by the 2020 and 2021 Acts. */
const TY2022: TaxYearTable = {
  id: '2021-2022',
  label: 'Tax year 2022',
  period: '1 July 2021 to 30 June 2022',
  searchLabel: '2021-22',
  authority: 'Finance Act 2019',
  slabs: TY2020_SLABS,
  exemptThreshold: 600_000,
  surcharge: NO_SURCHARGE,
  salaryShareTest: 0.75,
  note: 'The Finance Act 2021 did not change the salaried slabs. This year runs on the same twelve-slab table as 2020 and 2021, and it is the last year to do so: the Finance Act 2022 cut it to seven.',
};

/** Tax year 2021. Finance Act 2019, left untouched by the Finance Act 2020. */
const TY2021: TaxYearTable = {
  id: '2020-2021',
  label: 'Tax year 2021',
  period: '1 July 2020 to 30 June 2021',
  searchLabel: '2020-21',
  authority: 'Finance Act 2019',
  slabs: TY2020_SLABS,
  exemptThreshold: 600_000,
  surcharge: NO_SURCHARGE,
  salaryShareTest: 0.75,
  note: 'The Finance Act 2020 did not change the salaried slabs, so this year runs on the table set by the Finance Act 2019.',
};

/** Tax year 2020. Finance Act 2019. */
const TY2020: TaxYearTable = {
  id: '2019-2020',
  label: 'Tax year 2020',
  period: '1 July 2019 to 30 June 2020',
  searchLabel: '2019-20',
  authority: 'Finance Act 2019',
  slabs: TY2020_SLABS,
  exemptThreshold: 600_000,
  surcharge: NO_SURCHARGE,
  salaryShareTest: 0.75,
  note: 'The year the exempt threshold moved to Rs 600,000, the salaried table returned after the previous year’s flat charges, and the salary share test became 75%.',
};

/**
 * Tax year 2019. Finance Supplementary (Second Amendment) Act 2019.
 *
 * The odd one out twice over: it is the reason `Slab.flat` exists, and it is
 * the one year whose governing Act is not a Finance Act.
 *
 * ## Why the Act named here is not the Finance Act 2018
 *
 * The Finance Act 2018 abolished the separate salaried table altogether and
 * put everyone on a single unified table with a Rs 1,200,000 exempt threshold
 * and 5/10/15% rates. That table is what most secondary summaries of "2018-19"
 * still print, and it is wrong for this year: it was replaced by the
 * Finance Supplementary (Second Amendment) Act 2019, the mini-budget, BEFORE
 * the year was assessed. The mini-budget restored a separate salaried table in
 * clause (1A), and that restored table is the one below.
 *
 * Anyone checking this year against a news article from mid-2018 will find a
 * different table. The Ordinance as amended to 11 March 2019 is the text that
 * settles it.
 *
 * ## What makes the table itself awkward
 *
 * Between Rs 400,000 and Rs 1,200,000 it charged a FLAT amount rather than a
 * rate: Rs 1,000 across the whole first band and Rs 2,000 across the second.
 * Above Rs 1.2m it restarts at 5% of the excess, taking nothing forward from
 * the flat amounts below, so the cumulative reconciliation every other table
 * satisfies genuinely does not hold here. It is also discontinuous downward:
 * tax at Rs 1,200,000 is Rs 2,000 and at Rs 1,200,001 it is nil.
 *
 * The practical effect is that a salary anywhere in that Rs 800,000 range paid
 * either Rs 1,000 or Rs 2,000 for the year, which is close enough to nothing
 * that the year is often described as having a Rs 1.2m exempt threshold. It
 * did not: it had a threshold of Rs 400,000 and a nominal charge above it, and
 * `exemptThreshold` says 400,000 for that reason.
 */
const TY2019: TaxYearTable = {
  id: '2018-2019',
  label: 'Tax year 2019',
  period: '1 July 2018 to 30 June 2019',
  searchLabel: '2018-19',
  authority: 'Finance Supplementary (Second Amendment) Act 2019',
  slabs: [
    { upTo: 400_000, rate: 0, fixed: 0 },
    { upTo: 800_000, rate: 0, fixed: 0, flat: 1_000 },
    { upTo: 1_200_000, rate: 0, fixed: 0, flat: 2_000 },
    { upTo: 2_500_000, rate: 0.05, fixed: 0 },
    { upTo: 4_000_000, rate: 0.15, fixed: 65_000 },
    { upTo: 8_000_000, rate: 0.2, fixed: 290_000 },
    { upTo: null, rate: 0.25, fixed: 1_090_000 },
  ],
  exemptThreshold: 400_000,
  surcharge: NO_SURCHARGE,
  salaryShareTest: 0.5,
  note: 'Set by the mini-budget rather than by the Finance Act 2018, whose unified table it replaced before the year was assessed. Between Rs 400,000 and Rs 1,200,000 it charged a flat Rs 1,000 or Rs 2,000 for the whole year rather than a percentage, so the tax does not move across that range and then steps.',
};

/**
 * Tax year 2018. Finance Act 2017.
 *
 * Twelve narrow slabs on a Rs 400,000 threshold, and the last year before the
 * 2018 Act rewrote the table completely. Note the salary share test was 50%
 * rather than today's 75%.
 */
/**
 * Tax years 2016, 2017 and 2018. Finance Act 2015.
 *
 * ONE TABLE, THREE YEARS, and the longest unchanged run in the whole set. The
 * Finance Acts of 2016 and 2017 both left the salaried slabs alone, so the
 * table the 2015 Act set stood until the Finance Act 2018 rewrote Division I
 * completely. Verified from the Ordinance amended to 30 June 2018, whose only
 * substitution footnote over this table names the Finance Act 2018: there is
 * no 2016 or 2017 substitution to find.
 *
 * That matters because attributing tax year 2018 to the "Finance Act 2017" is
 * the obvious guess and it is wrong. Each year's `authority` is the Act that
 * actually set its table, not the Act passed the summer before it.
 *
 * Twelve slabs on a Rs 400,000 threshold. The Finance Act 2015's own change
 * was to split the old 5% band, inserting a 2% band for Rs 400,000 to
 * Rs 500,000: the change FBR's Circular 2 of 2015 describes as cutting the
 * rate "from 5% to 2%", and the thing that tells this table from the 2013 one.
 */
const TY2016_SLABS: Slab[] = [
  { upTo: 400_000, rate: 0, fixed: 0 },
  { upTo: 500_000, rate: 0.02, fixed: 0 },
  { upTo: 750_000, rate: 0.05, fixed: 2_000 },
  { upTo: 1_400_000, rate: 0.1, fixed: 14_500 },
  { upTo: 1_500_000, rate: 0.125, fixed: 79_500 },
  { upTo: 1_800_000, rate: 0.15, fixed: 92_000 },
  { upTo: 2_500_000, rate: 0.175, fixed: 137_000 },
  { upTo: 3_000_000, rate: 0.2, fixed: 259_500 },
  { upTo: 3_500_000, rate: 0.225, fixed: 359_500 },
  { upTo: 4_000_000, rate: 0.25, fixed: 472_000 },
  { upTo: 7_000_000, rate: 0.275, fixed: 597_000 },
  { upTo: null, rate: 0.3, fixed: 1_422_000 },
];

const TY2018: TaxYearTable = {
  id: '2017-2018',
  label: 'Tax year 2018',
  period: '1 July 2017 to 30 June 2018',
  searchLabel: '2017-18',
  // Not the Finance Act 2017, which left the salaried table alone. See the
  // note on TY2016_SLABS below, which this year shares.
  authority: 'Finance Act 2015',
  slabs: TY2016_SLABS,
  exemptThreshold: 400_000,
  surcharge: NO_SURCHARGE,
  salaryShareTest: 0.5,
  note: 'The Finance Act 2017 did not change the salaried slabs, so this year runs on the table set by the Finance Act 2015. It is the last year before the 2018 Act rewrote the table completely.',
};

/** Tax year 2017. Finance Act 2015, untouched by the Finance Act 2016. */
const TY2017: TaxYearTable = {
  id: '2016-2017',
  label: 'Tax year 2017',
  period: '1 July 2016 to 30 June 2017',
  searchLabel: '2016-17',
  authority: 'Finance Act 2015',
  slabs: TY2016_SLABS,
  exemptThreshold: 400_000,
  surcharge: NO_SURCHARGE,
  salaryShareTest: 0.5,
  note: 'The Finance Act 2016 did not change the salaried slabs, so this year runs on the table set by the Finance Act 2015.',
};

/** Tax year 2016. Finance Act 2015. */
const TY2016: TaxYearTable = {
  id: '2015-2016',
  label: 'Tax year 2016',
  period: '1 July 2015 to 30 June 2016',
  searchLabel: '2015-16',
  authority: 'Finance Act 2015',
  slabs: TY2016_SLABS,
  exemptThreshold: 400_000,
  surcharge: NO_SURCHARGE,
  salaryShareTest: 0.5,
  note: 'The year a 2% band was inserted for Rs 400,000 to Rs 500,000, splitting the 5% band that stood before it.',
};

/**
 * Tax years 2014 and 2015. Finance Act 2013.
 *
 * ONE TABLE, TWO YEARS again: the Finance Act 2014 left the salaried slabs
 * alone. Eleven slabs, and the last table before the 2% band appears.
 *
 * This is also the year marginal relief disappeared. Tax years 2012 and 2013
 * let a taxpayer whose income just crossed a band cap the tax at the band
 * below plus a share of the excess; the Finance Act 2013 omitted that proviso,
 * and from this year a slab boundary is an ordinary marginal step.
 */
const TY2014_SLABS: Slab[] = [
  { upTo: 400_000, rate: 0, fixed: 0 },
  { upTo: 750_000, rate: 0.05, fixed: 0 },
  { upTo: 1_400_000, rate: 0.1, fixed: 17_500 },
  { upTo: 1_500_000, rate: 0.125, fixed: 82_500 },
  { upTo: 1_800_000, rate: 0.15, fixed: 95_000 },
  { upTo: 2_500_000, rate: 0.175, fixed: 140_000 },
  { upTo: 3_000_000, rate: 0.2, fixed: 262_500 },
  { upTo: 3_500_000, rate: 0.225, fixed: 362_500 },
  { upTo: 4_000_000, rate: 0.25, fixed: 475_000 },
  { upTo: 7_000_000, rate: 0.275, fixed: 600_000 },
  { upTo: null, rate: 0.3, fixed: 1_425_000 },
];

/** Tax year 2015. Finance Act 2013, untouched by the Finance Act 2014. */
const TY2015: TaxYearTable = {
  id: '2014-2015',
  label: 'Tax year 2015',
  period: '1 July 2014 to 30 June 2015',
  searchLabel: '2014-15',
  authority: 'Finance Act 2013',
  slabs: TY2014_SLABS,
  exemptThreshold: 400_000,
  surcharge: NO_SURCHARGE,
  salaryShareTest: 0.5,
  note: 'The Finance Act 2014 did not change the salaried slabs, so this year runs on the table set by the Finance Act 2013.',
};

/** Tax year 2014. Finance Act 2013. */
const TY2014: TaxYearTable = {
  id: '2013-2014',
  label: 'Tax year 2014',
  period: '1 July 2013 to 30 June 2014',
  searchLabel: '2013-14',
  authority: 'Finance Act 2013',
  slabs: TY2014_SLABS,
  exemptThreshold: 400_000,
  surcharge: NO_SURCHARGE,
  salaryShareTest: 0.5,
  note: 'The first year without marginal relief: the Finance Act 2013 omitted the proviso that had capped the tax where income only just crossed a band.',
};

/**
 * Tax year 2013. Finance Act 2012.
 *
 * The year the modern system arrives, and the one table here whose stated
 * amounts deliberately break their own arithmetic.
 *
 * ## The regime change
 *
 * The Finance Act 2012 replaced a seventeen-slab table that charged a flat
 * percentage of a person's WHOLE income with the six-slab marginal table
 * below. That is why this is the oldest year the calculator offers: every year
 * from here on is "fixed plus a rate on the excess", which is what the engine
 * computes. Tax year 2012 and earlier are a different kind of tax and would
 * need a different calculator, so they are deliberately absent rather than
 * approximated.
 *
 * ## Why three of the six bands are marked nonCumulative
 *
 * They state more tax than the bands beneath them sum to, on purpose. FBR's
 * Circular 2 of 2012 explains it directly: "for taxpayers in highest tax rate
 * slab only basic exemption of Rs. 400,000 is provided and the benefit of
 * lower rates of the intermediate slabs has not been passed on", which is why
 * the top band is "20% plus Rs. 420,000 (instead of Rs. 255,000 which would
 * have been the case if benefit of lower rate of previous slabs was provided)".
 * The circular makes the same point for Rs 175,000 against 167,500 and
 * Rs 95,000 against 92,500.
 *
 * So the stated figures are the law and the derived ones would undercharge by
 * up to Rs 165,000. `Slab.nonCumulative` makes the walk read them rather than
 * accumulate into them, and exempts exactly these three from the table's
 * self-check.
 *
 * ## What is NOT modelled
 *
 * Marginal relief still existed this year, and it let a taxpayer just over a
 * band cap their tax at the band below plus a share of the excess, taking
 * whichever of the two figures was lower. The calculator does not apply it: it
 * is an optional computation that turns on facts the page does not ask for,
 * and it only ever reduces the figure. The result here is therefore the
 * headline charge, which is the conservative direction to be wrong in. The
 * page says as much through this year's note.
 */
const TY2013: TaxYearTable = {
  id: '2012-2013',
  label: 'Tax year 2013',
  period: '1 July 2012 to 30 June 2013',
  searchLabel: '2012-13',
  authority: 'Finance Act 2012',
  slabs: [
    { upTo: 400_000, rate: 0, fixed: 0 },
    { upTo: 750_000, rate: 0.05, fixed: 0 },
    { upTo: 1_500_000, rate: 0.1, fixed: 17_500 },
    // The three the Ordinance states above their own arithmetic.
    { upTo: 2_000_000, rate: 0.15, fixed: 95_000, nonCumulative: true },
    { upTo: 2_500_000, rate: 0.175, fixed: 175_000, nonCumulative: true },
    { upTo: null, rate: 0.2, fixed: 420_000, nonCumulative: true },
  ],
  exemptThreshold: 400_000,
  surcharge: NO_SURCHARGE,
  salaryShareTest: 0.5,
  note: 'The first year of the modern six-slab table, which replaced seventeen slabs charging a percentage of the whole income. Marginal relief still applied this year and could reduce the tax where income only just crossed a band, which this estimate does not apply.',
};

/**
 * Every year the calculator offers, newest first.
 *
 * Newest first because the current year is what most visitors want and a
 * select should open on it, and because "which year am I on" is answered by
 * the first row rather than by scrolling.
 */
export const TAX_YEARS: TaxYearTable[] = [
  TY2027,
  TY2026,
  TY2025,
  TY2024,
  TY2023,
  TY2022,
  TY2021,
  TY2020,
  TY2019,
  TY2018,
  TY2017,
  TY2016,
  TY2015,
  TY2014,
  TY2013,
];

/** The year the calculator opens on. */
export const DEFAULT_TAX_YEAR_ID = TY2027.id;

/** Look a year up by id, falling back to the current one. */
export function taxYearById(id: string): TaxYearTable {
  return TAX_YEARS.find((year) => year.id === id) ?? TY2027;
}

/**
 * The calculator, run against a named tax year.
 *
 * This is what a page calls. It is a thin wrapper rather than a second engine:
 * it looks the year up, hands `calculate` that year's slabs and surcharge, and
 * gets back exactly the same `Result` shape the single-year calculator always
 * returned. Every allowance, credit, EOBI and provident-fund rule is the one
 * in ./pakistan.ts, computed once, so a year selector cannot introduce a
 * disagreement between "this year" and "the current year".
 *
 * An unknown id falls back to the current year rather than throwing. The id
 * reaches this function from a `<select>` and, later, possibly from a URL, and
 * a stale bookmark should show this year's tax rather than an error page.
 */
export function calculateForYear(input: CalculatorInput, yearId: string): Result {
  const year = taxYearById(yearId);
  return calculate({ ...input, year: { slabs: year.slabs, surcharge: year.surcharge } });
}

/**
 * Every table is checked on import, exactly as the current year's always was.
 *
 * The point of `assertSlabsConsistent` is that a mistyped rate cannot reach a
 * page: each `fixed` is the Ordinance's own cumulative figure and must equal
 * the sum of the bands beneath it. Adding nine more tables adds nine more
 * chances to mistype, so all ten face the same check rather than only the one
 * that had it before.
 */
for (const year of TAX_YEARS) {
  assertSlabsConsistent(year.slabs, `Pakistan salary tax slabs, ${year.label}`);
}
