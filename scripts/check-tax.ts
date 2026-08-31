#!/usr/bin/env tsx
/**
 * Salary tax engine guard.
 *
 * The failure this exists to prevent: the calculator publishing a wrong number.
 *
 * Everything else on this site is copy, and a mistake in copy is embarrassing.
 * /tools/salary-tax is different in kind: it does arithmetic on a visitor's
 * salary and hands back a figure they may act on, under the name of a firm
 * that files tax returns for a living. A slab off by a digit is worse than
 * having no calculator at all.
 *
 * So every figure is asserted twice, from two directions:
 *
 *   AGAINST THE ORDINANCE  each slab's cumulative "fixed" amount is a number
 *                          printed in the First Schedule. Walking the slabs
 *                          beneath it must reproduce it exactly. That is the
 *                          reconciliation at the top, and it is what catches a
 *                          mistyped rate.
 *   AGAINST WORKED CASES   hand-computed examples across every bracket, plus
 *                          each allowance and credit in isolation, so a change
 *                          to the order of operations cannot pass silently.
 *
 * Run: pnpm check:tax
 */

import {
  calculate,
  taxOn,
  SLABS,
  EMPTY_INPUT,
  EOBI_ANNUAL,
  TAX_YEAR,
} from '../lib/tax/pakistan';

let failures = 0;

/** Money comparisons tolerate half a rupee; rates need a tighter window. */
function eq(name: string, got: number, want: number, tolerance = 0.51): void {
  if (Math.abs(got - want) > tolerance) {
    failures++;
    console.error(`  ✗ ${name}: got ${got.toFixed(2)}, expected ${want}`);
  }
}

// ── The slab table reconciles with itself ───────────────────────────────────
//
// This is the check that matters most. Every `fixed` below the top slab is
// also the tax due at the slab's own floor, so the table can be verified
// without trusting any single figure in it.
for (const [i, slab] of SLABS.entries()) {
  if (slab.upTo === null) continue;
  const next = SLABS[i + 1];
  if (!next) continue;
  eq(
    `tax at Rs ${slab.upTo.toLocaleString()} equals the next slab's fixed amount`,
    taxOn(slab.upTo).tax,
    next.fixed,
  );
}

// ── Worked examples, one inside each bracket ────────────────────────────────
eq('exempt threshold is untaxed', taxOn(600_000).tax, 0);
eq('Rs 1,200,000', taxOn(1_200_000).tax, 6_000);
eq('Rs 2,200,000', taxOn(2_200_000).tax, 116_000);
eq('Rs 3,000,000', taxOn(3_000_000).tax, 116_000 + 800_000 * 0.2);
eq('Rs 5,000,000', taxOn(5_000_000).tax, 541_000 + 900_000 * 0.29);
eq('Rs 10,000,000', taxOn(10_000_000).tax, 1_424_000 + 3_000_000 * 0.35);

// ── A whole calculation, monthly input ──────────────────────────────────────
const base = calculate({ ...EMPTY_INPUT, amount: 250_000, period: 'monthly' });
eq('monthly input annualises', base.grossAnnual, 3_000_000);
eq('income tax', base.incomeTax, 276_000);
eq('take-home', base.takeHomeAnnual, 2_724_000);
eq('marginal rate', base.marginalRate, 0.2, 0.0001);
eq('effective rate', base.effectiveRate, 276_000 / 3_000_000, 0.0001);

// ── EOBI is a flat figure off the minimum wage, not a percentage of salary ──
const lowEobi = calculate({ ...EMPTY_INPUT, amount: 60_000, period: 'monthly', eobi: true });
const highEobi = calculate({ ...EMPTY_INPUT, amount: 600_000, period: 'monthly', eobi: true });
eq('EOBI at a low salary', lowEobi.eobiAnnual, EOBI_ANNUAL);
eq('EOBI does not scale with salary', highEobi.eobiAnnual, lowEobi.eobiAnnual);

// ── Nothing divides by zero below the exempt threshold ──────────────────────
const exempt = calculate({
  ...EMPTY_INPUT,
  amount: 40_000,
  period: 'monthly',
  donations: 50_000,
  pensionContribution: 50_000,
  zakat: 10_000,
});
eq('no tax below the threshold', exempt.incomeTax, 0);
eq('no donation credit without tax', exempt.donationCredit, 0);
eq('no pension credit without tax', exempt.pensionCredit, 0);

// ── Credits are computed at the average rate, per (A/B) x C ─────────────────
const averageRate = 276_000 / 3_000_000;

const donated = calculate({ ...EMPTY_INPUT, amount: 3_000_000, period: 'annual', donations: 100_000 });
eq('donation credit at the average rate', donated.donationCredit, averageRate * 100_000, 1);
eq('tax net of the donation credit', donated.incomeTax, 276_000 - averageRate * 100_000, 1);

const donatedOver = calculate({
  ...EMPTY_INPUT,
  amount: 3_000_000,
  period: 'annual',
  donations: 2_000_000,
});
eq('donation credit caps at 30% of taxable income', donatedOver.donationCredit, averageRate * 900_000, 1);

const pensioned = calculate({
  ...EMPTY_INPUT,
  amount: 3_000_000,
  period: 'annual',
  pensionContribution: 2_000_000,
});
eq('pension credit caps at 20% of taxable income', pensioned.pensionCredit, averageRate * 600_000, 1);

// A credit reduces tax payable and is not refundable, so it cannot go below 0.
const overCredited = calculate({
  ...EMPTY_INPUT,
  amount: 700_000,
  period: 'annual',
  donations: 200_000,
  pensionContribution: 140_000,
});
if (overCredited.incomeTax < 0) {
  failures++;
  console.error(`  ✗ credits drove tax negative: ${overCredited.incomeTax}`);
}

// ── Allowances come off income, before the slabs ────────────────────────────
const zakat = calculate({ ...EMPTY_INPUT, amount: 3_000_000, period: 'annual', zakat: 100_000 });
eq('Zakat reduces taxable income', zakat.taxableIncome, 2_900_000);
eq('Zakat is worth the marginal rate', zakat.incomeTax, 116_000 + 700_000 * 0.2);

const educated = calculate({
  ...EMPTY_INPUT,
  amount: 1_400_000,
  period: 'annual',
  tuitionFee: 500_000,
  children: 2,
});
eq('education allowance is 5% of the fee', educated.educationAllowance, 25_000);

const educatedCapped = calculate({
  ...EMPTY_INPUT,
  amount: 1_400_000,
  period: 'annual',
  tuitionFee: 5_000_000,
  children: 1,
});
eq('education allowance caps per child', educatedCapped.educationAllowance, 60_000);

const educatedRich = calculate({
  ...EMPTY_INPUT,
  amount: 3_000_000,
  period: 'annual',
  tuitionFee: 500_000,
  children: 2,
});
eq('education allowance is unavailable above Rs 1.5m', educatedRich.educationAllowance, 0);

// ── Provident fund reduces take-home without touching tax ───────────────────
const pf = calculate({ ...EMPTY_INPUT, amount: 3_000_000, period: 'annual', providentFundRate: 10 });
eq('provident fund amount', pf.providentFundAnnual, 300_000);
eq('provident fund does not change tax', pf.incomeTax, 276_000);
eq('provident fund reduces take-home', pf.takeHomeAnnual, 3_000_000 - 276_000 - 300_000);

// ── The shown working sums to the stated total ──────────────────────────────
//
// The page prints a row per slab. If those rows did not add up to the headline
// figure, the visitor would be shown a breakdown contradicting the answer above
// it, which is the one bug a reader can catch and we cannot.
for (const gross of [750_000, 1_500_000, 2_500_000, 3_500_000, 4_500_000, 6_000_000, 9_000_000]) {
  const result = calculate({ ...EMPTY_INPUT, amount: gross, period: 'annual' });
  const summed = result.slabRows.reduce((total, row) => total + row.tax, 0);
  eq(`slab rows sum to the total at Rs ${gross.toLocaleString()}`, summed, result.taxBeforeCredits, 0.01);
}

// ── Monotonicity: earning more never leaves you with less ───────────────────
//
// A progressive system has no cliffs, so take-home must rise with gross across
// every bracket boundary. This is what would catch a slab typed with the wrong
// bound, which the reconciliation above cannot see if `fixed` is wrong to match.
let previousTakeHome = -1;
for (let gross = 500_000; gross <= 12_000_000; gross += 25_000) {
  const { takeHomeAnnual } = calculate({ ...EMPTY_INPUT, amount: gross, period: 'annual' });
  if (takeHomeAnnual < previousTakeHome) {
    failures++;
    console.error(`  ✗ take-home fell at Rs ${gross.toLocaleString()}: a slab boundary is wrong`);
    break;
  }
  previousTakeHome = takeHomeAnnual;
}

// ── Report ──────────────────────────────────────────────────────────────────
if (failures > 0) {
  console.error(`\n  ✗ Tax check failed: ${failures} problem(s). Do not ship this.\n`);
  process.exit(1);
}

console.log(
  `\n  ✓ Tax check passed: ${SLABS.length} slabs reconcile with the First Schedule, ` +
    `allowances and credits verified for ${TAX_YEAR.label}`,
);
console.log('');
