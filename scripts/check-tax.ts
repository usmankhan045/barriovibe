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
import { taxOnSlabs } from '../lib/tax/slabs';
import {
  BUSINESS_SLABS,
  calculateBusiness,
  EMPTY_BUSINESS_INPUT,
  SURCHARGE,
  slabsFor,
} from '../lib/tax/business';
import {
  calculateCompany,
  COMPANY_RATES,
  EMPTY_COMPANY_INPUT,
  MINIMUM_TAX_RATES,
  superTaxOn,
  SUPER_TAX,
} from '../lib/tax/corporate';
import {
  calculateCashWithdrawal,
  calculateElectricity,
  calculateItExport,
  calculateTelecom,
  CASH_WITHDRAWAL,
  ELECTRICITY,
  itExportRate,
  IT_EXPORT_RATES,
  TELECOM,
} from '../lib/tax/withholding';
import {
  calculatePropertyGain,
  calculateRent,
  CGT_HOLDING_TABLE,
  EMPTY_GAIN_INPUT,
  propertyGainRate,
  purchaseTax,
  PURCHASE_TAX,
  RENT_SLABS,
  RENT_SLABS_NON_FILER,
  saleTax,
  SALE_TAX,
} from '../lib/tax/property';
import {
  AGRICULTURE_SLABS,
  calculateAgriculture,
  calculateToken,
  FEDERAL_VEHICLE_TAX_BANDS,
  LAND_TAX_POSITION,
  TOKEN_SCHEDULES,
} from '../lib/tax/provincial';
import {
  calculateVehicle,
  REGISTRATION_BANDS,
  TRANSFER_BANDS,
  VEHICLE,
} from '../lib/tax/vehicle';
import {
  calculateMutualFund,
  calculateSecurities,
  EMPTY_SECURITIES_INPUT,
  MUTUAL_FUND,
  mutualFundRate,
  SECURITIES_BANDS,
} from '../lib/tax/investments';
import {
  calculateIncrement,
  calculateMultiYear,
  compareOffers,
  reverseSalary,
} from '../lib/tax/salary-tools';

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

// ════════════════════════════════════════════════════════════════════════════
// The other calculators under /tools.
//
// Same two-directional standard as the salary engine above: each rate table is
// reconciled against itself where it has cumulative figures, and every engine
// is pinned to worked examples computed by hand from the statute.
// ════════════════════════════════════════════════════════════════════════════

// ── Business and AOP slabs, First Schedule Division I sub-clause (1) ────────
for (const [i, slab] of BUSINESS_SLABS.entries()) {
  if (slab.upTo === null) continue;
  const next = BUSINESS_SLABS[i + 1];
  if (!next) continue;
  eq(
    `business tax at Rs ${slab.upTo.toLocaleString()} equals the next slab's fixed amount`,
    taxOnSlabs(slab.upTo, BUSINESS_SLABS).tax,
    next.fixed,
  );
}

// The non-salaried table must be HARSHER than the salary table everywhere above
// the exempt threshold. If a future edit ever swapped the two, this catches it,
// and swapping them is the single most damaging mistake available here.
for (const income of [1_000_000, 2_000_000, 4_000_000, 8_000_000]) {
  const business = taxOnSlabs(income, BUSINESS_SLABS).tax;
  const salary = taxOn(income).tax;
  if (business <= salary) {
    failures++;
    console.error(
      `  ✗ business tax at Rs ${income.toLocaleString()} (${business}) is not above ` +
        `salary tax (${salary}). The two tables may have been swapped.`,
    );
  }
}

// Worked: Rs 3,000,000 falls in the 30% band, Rs 170,000 fixed + 30% of 1.4m.
const biz = calculateBusiness({ ...EMPTY_BUSINESS_INPUT, taxableIncome: 3_000_000 });
eq('business tax on Rs 3,000,000', biz.totalTax, 170_000 + 1_400_000 * 0.3);
eq('business effective rate', biz.effectiveRate, 590_000 / 3_000_000, 0.0001);
eq('business marginal rate', biz.marginalRate, 0.3, 0.0001);

// Section 4AB: nil for an individual in tax year 2027, 10% of the tax for an AOP.
const aop = calculateBusiness({ taxableIncome: 20_000_000, kind: 'aop' });
const sole = calculateBusiness({ taxableIncome: 20_000_000, kind: 'individual' });
eq('AOP surcharge is 10% of the tax', aop.surcharge, aop.taxOnSlabs * SURCHARGE.aopRate);
eq('individual surcharge is nil for tax year 2027', sole.surcharge, 0);
eq(
  'surcharge does not apply at the threshold itself',
  calculateBusiness({ taxableIncome: SURCHARGE.threshold, kind: 'aop' }).surcharge,
  0,
);

// A professional firm is capped at 40% on the top slab, not 45%.
eq('professional firm top rate', slabsFor('professional-firm').at(-1)!.rate, 0.4, 0.0001);
const firm = calculateBusiness({ taxableIncome: 10_000_000, kind: 'professional-firm' });
const trader = calculateBusiness({ taxableIncome: 10_000_000, kind: 'individual' });
eq('professional firm pays less than a sole trader above the top slab',
  trader.taxOnSlabs - firm.taxOnSlabs, (10_000_000 - 5_600_000) * 0.05);

// ── Company rates: one flat rate, no bands ─────────────────────────────────
const co = calculateCompany({ ...EMPTY_COMPANY_INPUT, taxableIncome: 50_000_000 });
eq('normal company on Rs 50m', co.totalTax, 50_000_000 * COMPANY_RATES.normal);
eq(
  'small company on Rs 50m',
  calculateCompany({ ...EMPTY_COMPANY_INPUT, taxableIncome: 50_000_000, kind: 'small' }).totalTax,
  50_000_000 * 0.2,
);
eq(
  'banking company on Rs 50m',
  calculateCompany({ ...EMPTY_COMPANY_INPUT, taxableIncome: 50_000_000, kind: 'banking' }).totalTax,
  50_000_000 * 0.42,
);

// ── Section 4C is a cliff, not a slab ──────────────────────────────────────
//
// The rate applies to the WHOLE income once the threshold is passed. Modelling
// it as marginal is the standard error and understates it by the threshold, so
// it is asserted from both sides of the line.
eq('the general section 4C threshold', SUPER_TAX.general.threshold, 500_000_000);
eq('the specified-sector section 4C threshold', SUPER_TAX.specified.threshold, 150_000_000);
eq('super tax at the threshold is nil', superTaxOn(SUPER_TAX.general.threshold, 'general', false).tax, 0);
eq(
  'super tax just above the threshold is 8% of everything',
  superTaxOn(500_000_001, 'general', false).tax,
  500_000_001 * 0.08,
);
eq('super tax on Rs 600m', superTaxOn(600_000_000, 'general', false).tax, 48_000_000);
eq(
  'banks pay 10% from Rs 150m',
  superTaxOn(200_000_000, 'specified', false).tax,
  200_000_000 * 0.1,
);
eq(
  'a general taxpayer pays nothing at Rs 200m',
  superTaxOn(200_000_000, 'general', false).tax,
  0,
);
eq(
  'the export exemption removes section 4C entirely',
  superTaxOn(600_000_000, 'general', true).tax,
  0,
);

// ── Section 113 replaces the normal tax, never adds to it ──────────────────
const floored = calculateCompany({
  ...EMPTY_COMPANY_INPUT,
  taxableIncome: 1_000_000,
  turnover: 500_000_000,
});
eq('minimum tax on Rs 500m turnover', floored.minimumTax, 500_000_000 * MINIMUM_TAX_RATES.general);
eq('minimum tax replaces the normal tax when higher', floored.taxBeforeSuperTax, 6_250_000);
eq('the excess carries forward', floored.carryForward, 6_250_000 - 1_000_000 * 0.29);

const profitable = calculateCompany({
  ...EMPTY_COMPANY_INPUT,
  taxableIncome: 400_000_000,
  turnover: 500_000_000,
});
eq('normal tax stands when it exceeds the floor', profitable.taxBeforeSuperTax, 400_000_000 * 0.29);
eq('nothing carries forward when normal tax wins', profitable.carryForward, 0);
if (profitable.minimumTaxApplies) {
  failures++;
  console.error('  ✗ section 113 reported as applying when the normal tax was higher');
}

// A loss-making company still pays the floor. That is the point of a minimum tax.
const lossMaking = calculateCompany({
  ...EMPTY_COMPANY_INPUT,
  taxableIncome: 0,
  turnover: 200_000_000,
});
eq('a loss-making company still pays section 113', lossMaking.totalTax, 200_000_000 * 0.0125);

// ── Section 154A: four rates from two facts ────────────────────────────────
eq('PSEB filer rate', itExportRate(true, true), IT_EXPORT_RATES.psebFiler, 0.0000001);
eq('PSEB non-filer rate', itExportRate(true, false), 0.005, 0.0000001);
eq('non-PSEB filer rate', itExportRate(false, true), 0.01, 0.0000001);
eq('non-PSEB non-filer rate', itExportRate(false, false), 0.02, 0.0000001);

// Worked: Rs 560,000 a month, PSEB filer. Rs 1,400 a month, Rs 16,800 a year.
const freelancer = calculateItExport({
  amount: 560_000,
  period: 'monthly',
  psebRegistered: true,
  filer: true,
});
eq('freelancer monthly tax', freelancer.taxMonthly, 1_400);
eq('freelancer annual tax', freelancer.taxAnnual, 16_800);
eq('freelancer monthly net', freelancer.netMonthly, 558_600);
eq('PSEB saving against a plain filer', 
  calculateItExport({ amount: 560_000, period: 'monthly', psebRegistered: false, filer: true }).taxAnnual
    - freelancer.taxAnnual,
  50_400);

// ── Section 231AB: a trigger, not an exemption ─────────────────────────────
//
// Below the threshold nothing is deducted; one rupee above it, the rate lands
// on the WHOLE withdrawal. Both sides asserted, because reading Rs 50,000 as a
// tax-free allowance is the common error and it understates every result.
eq(
  'nothing is deducted at the threshold',
  calculateCashWithdrawal({ amount: CASH_WITHDRAWAL.threshold, filer: false }).tax,
  0,
);
eq(
  'above the threshold the rate applies to the whole amount',
  calculateCashWithdrawal({ amount: 50_001, filer: false }).tax,
  50_001 * 0.008,
);
eq('cash withdrawal on Rs 200,000', calculateCashWithdrawal({ amount: 200_000, filer: false }).tax, 1_600);
eq(
  'cash in hand after the deduction',
  calculateCashWithdrawal({ amount: 200_000, filer: false }).received,
  198_400,
);
eq('a filer has nothing deducted', calculateCashWithdrawal({ amount: 5_000_000, filer: true }).tax, 0);

// ── Reverse salary: the search must invert the forward calculation ─────────
//
// This is the check that matters for the bisection. Whatever gross it returns,
// running it forward has to reproduce the take-home that was asked for.
for (const targetNet of [600_000, 1_200_000, 2_500_000, 5_000_000, 9_000_000]) {
  const reversed = reverseSalary(targetNet);
  const forward = calculate({ ...EMPTY_INPUT, amount: reversed.grossAnnual, period: 'annual' });
  eq(`reverse salary round-trips at a net of Rs ${targetNet.toLocaleString()}`,
    forward.takeHomeAnnual, targetNet, 1);
}

// ── Increment: the raise and the tax on it must agree with the two salaries ─
const raise = calculateIncrement(3_000_000, 20);
eq('raise gross', raise.riseGrossAnnual, 600_000);
eq('raise net plus extra tax equals the gross raise',
  raise.riseNetAnnual + raise.extraTaxAnnual, raise.riseGrossAnnual, 0.01);
eq('kept share is net over gross', raise.keptShare, raise.riseNetAnnual / 600_000, 0.0001);

// A raise can never leave someone worse off: there are no cliffs in the slabs.
for (let gross = 500_000; gross <= 10_000_000; gross += 100_000) {
  const step = calculateIncrement(gross, 10);
  if (step.riseNetAnnual < 0) {
    failures++;
    console.error(`  ✗ a 10% raise at Rs ${gross.toLocaleString()} reduced take-home`);
    break;
  }
}

// ── Job offers: the break-even must match the current take-home ────────────
const offers = compareOffers(3_000_000, 3_600_000);
eq('offer difference is the take-home gap',
  offers.differenceAnnual, offers.offer.takeHomeAnnual - offers.current.takeHomeAnnual, 0.01);
eq('break-even gross reproduces the current take-home',
  calculate({ ...EMPTY_INPUT, amount: offers.breakEvenGrossAnnual, period: 'annual' }).takeHomeAnnual,
  offers.current.takeHomeAnnual, 1);

// ── Multi-year: the shortfall is the whole point ───────────────────────────
//
// Two half-years at Rs 200,000 a month is Rs 2.4m for the year, taxed once. Each
// employer withholds as though the person earned Rs 2.4m for twelve months, so
// the payslips over-collect and the calculator must show that as a refund.
const twoJobs = calculateMultiYear([
  { monthlySalary: 200_000, months: 6 },
  { monthlySalary: 200_000, months: 6 },
]);
eq('two half-years sum to the annual gross', twoJobs.grossAnnual, 2_400_000);
eq('months covered', twoJobs.monthsCovered, 12);
eq('tax is charged on the year as a whole',
  twoJobs.result.incomeTax, taxOn(2_400_000).tax);
eq('an unchanged salary across two employers withholds exactly the right amount',
  twoJobs.shortfall, 0, 1);

// A mid-year raise: the second employer's projection over-collects, so filing
// produces a refund rather than a bill. Signs matter here and are easy to flip.
const raised = calculateMultiYear([
  { monthlySalary: 150_000, months: 6 },
  { monthlySalary: 400_000, months: 6 },
]);
eq('mixed-year gross', raised.grossAnnual, 150_000 * 6 + 400_000 * 6);
if (raised.shortfall >= 0) {
  failures++;
  console.error(
    `  ✗ a mid-year raise should over-withhold (a refund), got a shortfall of ${raised.shortfall}`,
  );
}

// ── Section 236K, the buyer's advance tax ──────────────────────────────────
//
// A filer pays one rate at every value; a non-filer is banded. Both sides of
// each band boundary are asserted, because an off-by-one on a band edge is
// invisible in the middle of a band.
eq('236K filer on Rs 30m', purchaseTax({ value: 30_000_000, status: 'filer' }).tax, 375_000);
eq('236K non-filer on Rs 30m', purchaseTax({ value: 30_000_000, status: 'non-filer' }).tax, 3_150_000);
eq(
  '236K filer saving on Rs 30m',
  purchaseTax({ value: 30_000_000, status: 'filer' }).filerSaving,
  2_775_000,
);
eq(
  '236K filer rate does not change with value',
  purchaseTax({ value: 500_000_000, status: 'filer' }).rate,
  PURCHASE_TAX.filerRate,
  0.0000001,
);
eq('236K non-filer at the Rs 50m edge', purchaseTax({ value: 50_000_000, status: 'non-filer' }).rate, 0.105, 0.0000001);
eq('236K non-filer just above Rs 50m', purchaseTax({ value: 50_000_001, status: 'non-filer' }).rate, 0.145, 0.0000001);
eq('236K non-filer at the Rs 100m edge', purchaseTax({ value: 100_000_000, status: 'non-filer' }).rate, 0.145, 0.0000001);
eq('236K non-filer above Rs 100m', purchaseTax({ value: 100_000_001, status: 'non-filer' }).rate, 0.185, 0.0000001);

// ── Section 236C, the seller's advance tax ────────────────────────────────
eq('236C filer on Rs 30m', saleTax({ value: 30_000_000, status: 'filer' }).tax, 825_000);
eq('236C non-filer on Rs 30m', saleTax({ value: 30_000_000, status: 'non-filer' }).tax, 3_450_000);
eq('236C filer saving on Rs 30m', saleTax({ value: 30_000_000, status: 'filer' }).filerSaving, 2_625_000);
// Unlike 236K, neither 236C rate is banded.
eq(
  '236C non-filer rate does not change with value',
  saleTax({ value: 500_000_000, status: 'non-filer' }).rate,
  SALE_TAX.nonFilerRate,
  0.0000001,
);

// ── Section 37, property capital gains ────────────────────────────────────
//
// The acquisition date decides everything. A flat rate applied to an older
// holding would invent tax the statute does not charge, so both regimes are
// asserted, including the nil rates the old table reaches.
eq('property CGT flat rate after July 2024', propertyGainRate(true, 10, 'open-plot').rate, 0.15, 0.0000001);
eq('an open plot held over 6 years is exempt', propertyGainRate(false, 7, 'open-plot').rate, 0, 0.0000001);
eq('constructed property held over 4 years is exempt', propertyGainRate(false, 5, 'constructed').rate, 0, 0.0000001);
eq('a flat held over 2 years is exempt', propertyGainRate(false, 3, 'flat').rate, 0, 0.0000001);
eq('an open plot held under a year', propertyGainRate(false, 0.5, 'open-plot').rate, 0.15, 0.0000001);

// Every rate in the old table must be non-increasing as the holding lengthens.
// A table typed out of order would still look plausible without this.
for (const kind of ['open-plot', 'constructed', 'flat'] as const) {
  let previous = Infinity;
  for (const band of CGT_HOLDING_TABLE) {
    if (band.rates[kind] > previous + 0.0000001) {
      failures++;
      console.error(`  ✗ property CGT for ${kind} rises at "${band.label}", which no holding table does`);
      break;
    }
    previous = band.rates[kind];
  }
}

// A sale at a loss is not taxed, and 236C already collected is credited.
const gainCase = calculatePropertyGain({
  ...EMPTY_GAIN_INPUT,
  purchasePrice: 20_000_000,
  salePrice: 30_000_000,
  acquiredAfterJuly2024: true,
  advanceTaxPaid: 825_000,
});
eq('property gain', gainCase.gain, 10_000_000);
eq('property CGT at 15%', gainCase.tax, 1_500_000);
eq('236C is credited against the CGT', gainCase.balance, 1_500_000 - 825_000);

// A non-filer never pays less than 15% of the gain, and can pay up to the top
// non-salaried slab. Reported as a range, because the exact figure depends on
// their other income, which a property calculator cannot know.
const nonFilerGain = calculatePropertyGain({
  ...EMPTY_GAIN_INPUT,
  purchasePrice: 20_000_000,
  salePrice: 30_000_000,
  acquiredAfterJuly2024: true,
  status: 'non-filer',
});
eq('a non-filer pays at least the 15% floor', nonFilerGain.tax, 10_000_000 * 0.15);
eq('the top of the non-filer range is the top slab', nonFilerGain.taxAtTopSlab, 10_000_000 * 0.45);
if (!nonFilerGain.isNonFilerRange) {
  failures++;
  console.error('  ✗ a non-filer gain was reported as a single figure rather than a range');
}
// An old holding whose filer rate is BELOW the floor must still be floored.
const oldNonFiler = calculatePropertyGain({
  ...EMPTY_GAIN_INPUT,
  purchasePrice: 20_000_000,
  salePrice: 30_000_000,
  acquiredAfterJuly2024: false,
  yearsHeld: 5.5,
  kind: 'open-plot',
  status: 'non-filer',
});
eq('the 15% floor lifts a 2.5% band for a non-filer', oldNonFiler.rate, 0.15, 0.0000001);

const lossCase = calculatePropertyGain({
  ...EMPTY_GAIN_INPUT,
  purchasePrice: 30_000_000,
  salePrice: 25_000_000,
});
eq('a loss-making sale has no CGT', lossCase.tax, 0);
if (!lossCase.isLoss) {
  failures++;
  console.error('  ✗ a sale below cost was not reported as a loss');
}

// ── Section 155, rental income ────────────────────────────────────────────
for (const [i, slab] of RENT_SLABS.entries()) {
  if (slab.upTo === null) continue;
  const next = RENT_SLABS[i + 1];
  if (!next) continue;
  eq(
    `rent tax at Rs ${slab.upTo.toLocaleString()} equals the next slab's fixed amount`,
    taxOnSlabs(slab.upTo, RENT_SLABS).tax,
    next.fixed,
  );
}

// The non-filer column is the filer column doubled, at every income.
for (const rent of [400_000, 1_200_000, 3_000_000, 8_000_000]) {
  eq(
    `non-filer rent tax is double the filer's at Rs ${rent.toLocaleString()}`,
    taxOnSlabs(rent, RENT_SLABS_NON_FILER).tax,
    taxOnSlabs(rent, RENT_SLABS).tax * 2,
    0.01,
  );
}

const rent = calculateRent({ annualRent: 1_200_000, status: 'filer', landlord: 'individual' });
eq('rent tax on Rs 1,200,000', rent.tax, 75_000);
eq('rent effective rate', rent.effectiveRate, 0.0625, 0.0001);
eq('rent marginal rate', rent.marginalRate, 0.1, 0.0001);
eq(
  'a company landlord pays a flat rate',
  calculateRent({ annualRent: 1_200_000, status: 'filer', landlord: 'company' }).tax,
  1_200_000 * 0.15,
);

// ── Section 37A, securities ───────────────────────────────────────────────
eq(
  'securities bought after July 2024',
  calculateSecurities({ ...EMPTY_SECURITIES_INPUT, purchasePrice: 2_000_000, salePrice: 3_000_000 }).tax,
  150_000,
);
eq(
  'a non-filer pays double on the same gain',
  calculateSecurities({
    ...EMPTY_SECURITIES_INPUT,
    purchasePrice: 2_000_000,
    salePrice: 3_000_000,
    status: 'non-filer',
  }).tax,
  300_000,
);
eq(
  'securities bought before July 2013 are exempt',
  calculateSecurities({
    ...EMPTY_SECURITIES_INPUT,
    purchasePrice: 2_000_000,
    salePrice: 3_000_000,
    bandId: 'pre-2013',
  }).tax,
  0,
);
// Doubling an exemption must stay an exemption, not become a charge.
eq(
  'a non-filer is also exempt on pre-2013 securities',
  calculateSecurities({
    ...EMPTY_SECURITIES_INPUT,
    purchasePrice: 2_000_000,
    salePrice: 3_000_000,
    bandId: 'pre-2013',
    status: 'non-filer',
  }).tax,
  0,
);
// Every band's non-filer rate is double its filer rate, or nil where nil.
for (const band of SECURITIES_BANDS) {
  eq(`${band.id}: non-filer rate is double the filer rate`, band.nonFilerRate, band.filerRate * 2, 0.0000001);
}

// ── Mutual funds ──────────────────────────────────────────────────────────
eq(
  'a person redeeming a stock fund',
  calculateMutualFund({
    invested: 2_000_000,
    redeemed: 3_000_000,
    holder: 'person',
    fund: 'stock',
    status: 'filer',
    acquiredAfterJuly2025: true,
  }).tax,
  150_000,
);
eq('a company on a stock fund', mutualFundRate({ holder: 'company', fund: 'stock', status: 'filer', acquiredAfterJuly2025: true }), MUTUAL_FUND.companyStockRate, 0.0000001);
eq('a company on any other fund', mutualFundRate({ holder: 'company', fund: 'other', status: 'filer', acquiredAfterJuly2025: true }), 0.25, 0.0000001);
eq(
  'a person is 15% on either fund type from July 2025',
  mutualFundRate({ holder: 'person', fund: 'other', status: 'filer', acquiredAfterJuly2025: true }),
  0.15,
  0.0000001,
);

// ── Section 235, electricity ──────────────────────────────────────────────
//
// A domestic filer pays nothing at any bill; a domestic non-filer pays nothing
// below the threshold. Both are asserted, since the second is the one a
// "charge above a threshold" reading gets wrong.
eq(
  'a domestic filer pays nothing',
  calculateElectricity({ bill: 100_000, meter: 'domestic', filer: true }).tax,
  0,
);
eq(
  'a domestic non-filer below the threshold pays nothing',
  calculateElectricity({ bill: ELECTRICITY.domestic.threshold - 1, meter: 'domestic', filer: false }).tax,
  0,
);
eq(
  'a domestic non-filer at the threshold',
  calculateElectricity({ bill: 25_000, meter: 'domestic', filer: false }).tax,
  25_000 * 0.075,
);
eq(
  'a domestic non-filer on Rs 35,000',
  calculateElectricity({ bill: 35_000, meter: 'domestic', filer: false }).tax,
  2_625,
);
eq(
  'the bill plus the tax is what is payable',
  calculateElectricity({ bill: 35_000, meter: 'domestic', filer: false }).total,
  37_625,
);
// Commercial and industrial bands, and the industrial discount above Rs 20,000.
eq('a commercial bill up to Rs 500', calculateElectricity({ bill: 500, meter: 'commercial', filer: true }).tax, 0);
eq('a commercial bill of Rs 10,000', calculateElectricity({ bill: 10_000, meter: 'commercial', filer: true }).tax, 1_000);
eq(
  'a commercial bill of Rs 50,000',
  calculateElectricity({ bill: 50_000, meter: 'commercial', filer: true }).tax,
  1_950 + 30_000 * 0.12,
);
eq(
  'an industrial bill of Rs 50,000 is charged less',
  calculateElectricity({ bill: 50_000, meter: 'industrial', filer: true }).tax,
  1_950 + 30_000 * 0.05,
);

// ── Section 236, telecom ──────────────────────────────────────────────────
//
// The direction of the charge is the thing to get right: a load is taxed
// INSIDE the amount, a bill ON TOP of it. Asserting both catches a sign flip
// that would otherwise be off by twice the tax.
const load = calculateTelecom({ amount: 1_000, kind: 'load', namedNonFiler: false });
eq('tax on a Rs 1,000 load', load.tax, 150);
eq('a load leaves Rs 850 in the balance', load.net, 850);
const phoneBill = calculateTelecom({ amount: 1_000, kind: 'bill', namedNonFiler: false });
eq('a bill is charged on top', phoneBill.net, 1_150);
eq(
  'a landline bill at the threshold is exempt',
  calculateTelecom({ amount: TELECOM.landline.exemptUpTo, kind: 'landline', namedNonFiler: false }).tax,
  0,
);
// The landline charge is on the EXCESS over Rs 1,000, not on the whole bill.
// FBR's card says "10% of the amount of bill exceeding Rs 1,000". Charging the
// whole bill would double this figure, and 231AB next door works the other way
// round, so both readings are asserted here deliberately.
eq(
  'a landline bill is charged on the excess only',
  calculateTelecom({ amount: 2_000, kind: 'landline', namedNonFiler: false }).tax,
  (2_000 - 1_000) * 0.1,
);
eq(
  'a landline bill just above the threshold is charged almost nothing',
  calculateTelecom({ amount: 1_001, kind: 'landline', namedNonFiler: false }).tax,
  0.1,
  0.01,
);
eq(
  'a person named in an FBR order pays 75% on a load',
  calculateTelecom({ amount: 1_000, kind: 'load', namedNonFiler: true }).tax,
  750,
);

// ── Section 231B, motor vehicles ──────────────────────────────────────────
//
// The non-ATL column here is THREE times the ATL column, not two. Every other
// withholding rate on this site doubles, so this is asserted for every band
// rather than assumed.
for (const band of REGISTRATION_BANDS) {
  eq(
    `231B registration ${band.label}: non-filer is three times the filer rate`,
    band.nonFilerRate,
    band.filerRate * VEHICLE.nonFilerMultiple,
    0.0000001,
  );
}
for (const band of TRANSFER_BANDS) {
  eq(
    `231B transfer ${band.label}: non-filer is three times the filer amount`,
    band.nonFiler,
    band.filer * VEHICLE.nonFilerMultiple,
    0.51,
  );
}

// Registration is a percentage of value; transfer is a fixed amount. Applying
// one where the other belongs is the error this pair of assertions catches.
const reg = calculateVehicle({
  engineCc: 1300,
  value: 4_000_000,
  transaction: 'registration',
  status: 'filer',
  yearsSinceRegistration: 0,
});
eq('231B registration, 1,300cc at Rs 4m', reg.tax, 60_000);
eq(
  '231B registration, same car for a non-filer',
  calculateVehicle({
    engineCc: 1300,
    value: 4_000_000,
    transaction: 'registration',
    status: 'non-filer',
    yearsSinceRegistration: 0,
  }).tax,
  180_000,
);

const transfer = calculateVehicle({
  engineCc: 1300,
  value: 4_000_000,
  transaction: 'transfer',
  status: 'filer',
  yearsSinceRegistration: 0,
});
eq('231B transfer, 1,300cc, new', transfer.tax, 7_500);
// The value must not enter a transfer at all.
eq(
  '231B transfer ignores the value',
  calculateVehicle({
    engineCc: 1300,
    value: 40_000_000,
    transaction: 'transfer',
    status: 'filer',
    yearsSinceRegistration: 0,
  }).tax,
  7_500,
);

// A tenth off per year, reaching nil at ten years and never going negative.
eq(
  '231B transfer after 5 years is halved',
  calculateVehicle({
    engineCc: 1300,
    value: 0,
    transaction: 'transfer',
    status: 'filer',
    yearsSinceRegistration: 5,
  }).tax,
  3_750,
);
eq(
  '231B transfer after 10 years is nil',
  calculateVehicle({
    engineCc: 1300,
    value: 0,
    transaction: 'transfer',
    status: 'filer',
    yearsSinceRegistration: 10,
  }).tax,
  0,
);
eq(
  '231B transfer after 15 years does not go negative',
  calculateVehicle({
    engineCc: 1300,
    value: 0,
    transaction: 'transfer',
    status: 'filer',
    yearsSinceRegistration: 15,
  }).tax,
  0,
);
// A first registration gets NO used-vehicle reduction, whatever is entered.
eq(
  '231B registration is not reduced by age',
  calculateVehicle({
    engineCc: 1300,
    value: 4_000_000,
    transaction: 'registration',
    status: 'filer',
    yearsSinceRegistration: 8,
  }).tax,
  60_000,
);
// The smallest band is nil on transfer for both statuses.
eq(
  '231B transfer up to 850cc is nil',
  calculateVehicle({
    engineCc: 800,
    value: 0,
    transaction: 'transfer',
    status: 'non-filer',
    yearsSinceRegistration: 0,
  }).tax,
  0,
);

// Both band tables must be ordered and non-decreasing in rate.
let previousRegRate = -1;
for (const band of REGISTRATION_BANDS) {
  if (band.filerRate < previousRegRate) {
    failures++;
    console.error(`  ✗ 231B registration rate falls at "${band.label}"; the table may be out of order`);
    break;
  }
  previousRegRate = band.filerRate;
}

// ── Provincial: vehicle token tax ─────────────────────────────────────────
//
// Five jurisdictions, four schedules, and one gap. These checks are less about
// arithmetic than about the gap staying a gap: Sindh has no published schedule
// and must never silently acquire one from a neighbour's table.
for (const [province, schedule] of Object.entries(TOKEN_SCHEDULES)) {
  if (schedule.bands.length === 0) {
    failures++;
    console.error(`  ✗ ${province} token schedule is empty`);
  }
  // Exactly one open-ended top band, and it must be last.
  const openBands = schedule.bands.filter((b) => b.maxCc === null);
  if (openBands.length !== 1 || schedule.bands.at(-1)!.maxCc !== null) {
    failures++;
    console.error(`  ✗ ${province} token schedule must end with exactly one open band`);
  }
  // Bands must be in ascending order of engine capacity.
  let previousCc = -1;
  for (const band of schedule.bands) {
    const cc = band.maxCc ?? Infinity;
    if (cc <= previousCc) {
      failures++;
      console.error(`  ✗ ${province} token bands are out of order at "${band.label}"`);
      break;
    }
    previousCc = cc;
  }
}

// Punjab: a 1,300cc car is a flat band, and the early-payment discount applies.
const punjabToken = calculateToken({
  province: 'punjab',
  engineCc: 1300,
  invoicePrice: 4_000_000,
  filer: true,
  payingEarly: false,
});
eq('Punjab token, 1,300cc', punjabToken.provincial, 1_800);
eq('Punjab federal component, 1,300cc', punjabToken.federal, 2_500);
eq('Punjab total, 1,300cc', punjabToken.total, 4_300);

const punjabEarly = calculateToken({
  province: 'punjab',
  engineCc: 1300,
  invoicePrice: 0,
  filer: true,
  payingEarly: true,
});
eq('Punjab early-payment discount is 10%', punjabEarly.discount, 180);
eq('Punjab token after the discount', punjabEarly.provincial, 1_620);

// A percentage band uses the invoice price; a flat band must ignore it.
const punjabPercent = calculateToken({
  province: 'punjab',
  engineCc: 1100,
  invoicePrice: 4_000_000,
  filer: true,
  payingEarly: false,
});
eq('Punjab 1,100cc is 0.3% of the invoice price', punjabPercent.provincialGross, 12_000);
eq(
  'a flat band ignores the invoice price',
  calculateToken({ province: 'punjab', engineCc: 1300, invoicePrice: 99_000_000, filer: true, payingEarly: false })
    .provincial,
  1_800,
);

// A lifetime token is not discounted for early payment: it is not a yearly tax.
const lifetime = calculateToken({
  province: 'punjab',
  engineCc: 800,
  invoicePrice: 0,
  filer: true,
  payingEarly: true,
});
eq('a lifetime token is not discounted', lifetime.discount, 0);
eq('Punjab lifetime token up to 1,000cc', lifetime.provincial, 20_000);
if (!lifetime.isLifetime) {
  failures++;
  console.error('  ✗ a lifetime band was not reported as one');
}

// KP is flat throughout and charges no percentage at any size.
for (const band of TOKEN_SCHEDULES.kp.bands) {
  if (band.kind === 'percent') {
    failures++;
    console.error(`  ✗ KP should be flat throughout, but "${band.label}" is a percentage`);
  }
}
eq(
  'KP token, 1,300cc',
  calculateToken({ province: 'kp', engineCc: 1300, invoicePrice: 0, filer: true, payingEarly: false }).provincial,
  3_000,
);
// KP publishes no early-payment discount, so asking for one must change nothing.
eq(
  'KP has no early-payment discount',
  calculateToken({ province: 'kp', engineCc: 1300, invoicePrice: 0, filer: true, payingEarly: true }).discount,
  0,
);

// ICT is value-based above 1,000cc, straight from the Finance Act 2026 gazette.
eq(
  'ICT token, 1,300cc at Rs 4m',
  calculateToken({ province: 'ict', engineCc: 1300, invoicePrice: 4_000_000, filer: true, payingEarly: false })
    .provincial,
  4_000_000 * 0.0025,
);

// SINDH MUST STAY UNAVAILABLE. If a future edit gives it a schedule from a
// source that was never confirmed, this is what catches it.
const sindhToken = calculateToken({
  province: 'sindh',
  engineCc: 1300,
  invoicePrice: 4_000_000,
  filer: true,
  payingEarly: false,
});
if (sindhToken.available || sindhToken.provincial !== 0) {
  failures++;
  console.error(
    '  ✗ Sindh reported a provincial token figure. No Sindh government source publishes one; ' +
      'if that has changed, update the note in lib/tax/provincial.ts rather than only the table.',
  );
}
// The federal half IS knowable for Sindh, because the Ordinance sets it.
eq('the federal component is still reported for Sindh', sindhToken.federal, 2_500);
eq('a non-filer pays double the federal component', 
  calculateToken({ province: 'sindh', engineCc: 1300, invoicePrice: 0, filer: false, payingEarly: false }).federal,
  5_000);

// The federal band table must be ordered and non-decreasing.
let previousFederal = -1;
for (const band of FEDERAL_VEHICLE_TAX_BANDS) {
  if (band.filer < previousFederal) {
    failures++;
    console.error(`  ✗ section 234 amount falls at "${band.label}"`);
    break;
  }
  previousFederal = band.filer;
}

// ── Provincial: agricultural income tax ───────────────────────────────────
for (const [i, slab] of AGRICULTURE_SLABS.entries()) {
  if (slab.upTo === null) continue;
  const next = AGRICULTURE_SLABS[i + 1];
  if (!next) continue;
  eq(
    `agriculture tax at Rs ${slab.upTo.toLocaleString()} equals the next slab's fixed amount`,
    taxOnSlabs(slab.upTo, AGRICULTURE_SLABS).tax,
    next.fixed,
  );
}

// Sindh, KP and Balochistan enacted the same table, so they must agree.
for (const province of ['sindh', 'kp', 'balochistan'] as const) {
  eq(
    `${province} agriculture tax on Rs 3,000,000`,
    calculateAgriculture({ province, annualIncome: 3_000_000, taxpayer: 'individual' }).tax,
    170_000 + 1_400_000 * 0.3,
  );
}
eq(
  'a company pays a flat 29% on agricultural income',
  calculateAgriculture({ province: 'sindh', annualIncome: 3_000_000, taxpayer: 'company' }).tax,
  3_000_000 * 0.29,
);
eq(
  'a small company pays 20%',
  calculateAgriculture({ province: 'sindh', annualIncome: 3_000_000, taxpayer: 'small-company' }).tax,
  3_000_000 * 0.2,
);

// PUNJAB MUST STAY UNAVAILABLE. Its notifications were ruled void by the
// Assembly, so no rate here can honestly be called current.
const punjabAgri = calculateAgriculture({
  province: 'punjab',
  annualIncome: 3_000_000,
  taxpayer: 'individual',
});
if (punjabAgri.available || punjabAgri.tax !== 0) {
  failures++;
  console.error(
    '  ✗ Punjab reported an agricultural tax figure. Its rate notifications were ruled void ' +
      'ab initio in April 2026; if that position has changed, update the note in ' +
      'lib/tax/provincial.ts rather than only the table.',
  );
}

// Land tax survives in KP, Balochistan and Punjab, and was abolished in Sindh.
// Getting this backwards would tell a Sindh farmer they owe a repealed tax.
if (LAND_TAX_POSITION.sindh.stillCharged) {
  failures++;
  console.error('  ✗ Sindh land tax was repealed by the 2025 Act but is reported as charged');
}
for (const province of ['kp', 'balochistan', 'punjab'] as const) {
  if (!LAND_TAX_POSITION[province].stillCharged) {
    failures++;
    console.error(`  ✗ ${province} still charges a per-acre land tax but is reported as not`);
  }
}

// ── Robustness: nothing may produce NaN, Infinity or a negative charge ────
//
// The UI cannot currently feed these in: NumberField strips input to digits,
// and no string of digits parses to NaN or Infinity. This asserts that the
// engines survive them anyway, because these modules are importable and a
// future caller (a URL parameter, a saved input, an API) may be less careful.
// `money()` in lib/tax/slabs.ts is what makes it true.
{
  const HOSTILE = [0, -1, -1e9, 0.5, 1e15, Number.NaN, Infinity, -Infinity];
  const sane = (label: string, v: number) => {
    if (!Number.isFinite(v) || v < 0) {
      failures++;
      console.error(`  ✗ ${label} produced ${v}, which must never reach a page`);
    }
  };

  for (const v of HOSTILE) {
    sane('salary tax', calculate({ ...EMPTY_INPUT, amount: v, period: 'annual' }).incomeTax);
    sane('business tax', calculateBusiness({ taxableIncome: v, kind: 'aop' }).totalTax);
    sane('company tax', calculateCompany({ ...EMPTY_COMPANY_INPUT, taxableIncome: v, turnover: v, superTaxIncome: v }).totalTax);
    sane('231AB', calculateCashWithdrawal({ amount: v, filer: false }).tax);
    sane('154A', calculateItExport({ amount: v, period: 'monthly', psebRegistered: true, filer: true }).taxAnnual);
    sane('235 domestic', calculateElectricity({ bill: v, meter: 'domestic', filer: false }).tax);
    sane('235 commercial', calculateElectricity({ bill: v, meter: 'commercial', filer: true }).tax);
    sane('236 load', calculateTelecom({ amount: v, kind: 'load', namedNonFiler: false }).tax);
    sane('236 landline', calculateTelecom({ amount: v, kind: 'landline', namedNonFiler: false }).tax);
    sane('236K', purchaseTax({ value: v, status: 'non-filer' }).tax);
    sane('236C', saleTax({ value: v, status: 'non-filer' }).tax);
    sane('rent', calculateRent({ annualRent: v, status: 'non-filer', landlord: 'individual' }).tax);
    sane('property gain', calculatePropertyGain({ ...EMPTY_GAIN_INPUT, purchasePrice: v, salePrice: v, costs: v, advanceTaxPaid: v }).tax);
    sane('37A', calculateSecurities({ ...EMPTY_SECURITIES_INPUT, purchasePrice: v, salePrice: v }).tax);
    sane('mutual fund', calculateMutualFund({ invested: v, redeemed: v, holder: 'person', fund: 'stock', status: 'filer', acquiredAfterJuly2025: true }).tax);
    sane('231B registration', calculateVehicle({ engineCc: v, value: v, transaction: 'registration', status: 'non-filer', yearsSinceRegistration: v }).tax);
    sane('231B transfer', calculateVehicle({ engineCc: 1300, value: v, transaction: 'transfer', status: 'filer', yearsSinceRegistration: v }).tax);
    sane('reverse salary', reverseSalary(v).grossAnnual);
    sane('multi-year', calculateMultiYear([{ monthlySalary: v, months: v }]).result.incomeTax);
    for (const province of ['punjab', 'sindh', 'kp', 'balochistan', 'ict'] as const) {
      sane(`token ${province}`, calculateToken({ province, engineCc: v, invoicePrice: v, filer: false, payingEarly: true }).total);
      sane(`agriculture ${province}`, calculateAgriculture({ province, annualIncome: v, taxpayer: 'individual' }).tax);
    }
  }
}

// ── Tax never exceeds the base it is charged on ───────────────────────────
//
// A rate typed as a whole number where a fraction belongs (0.29 written as 29)
// passes every worked example that happens to use a different figure, and
// fails this immediately.
for (let x = 0; x <= 50_000_000; x += 250_000) {
  if (taxOn(x).tax > x) { failures++; console.error(`  ✗ salary tax exceeds income at ${x}`); break; }
  if (calculateBusiness({ taxableIncome: x, kind: 'aop' }).totalTax > x) {
    failures++; console.error(`  ✗ business tax exceeds income at ${x}`); break;
  }
  if (calculateRent({ annualRent: x, status: 'non-filer', landlord: 'individual' }).tax > x) {
    failures++; console.error(`  ✗ rent tax exceeds the rent at ${x}`); break;
  }
}

// ── Rent take-home is monotonic across every band boundary ────────────────
{
  let previous = -Infinity;
  for (let x = 0; x <= 20_000_000; x += 50_000) {
    const net = calculateRent({ annualRent: x, status: 'filer', landlord: 'individual' }).netAnnual;
    if (net < previous - 0.01) { failures++; console.error(`  ✗ rent net fell at ${x}`); break; }
    previous = net;
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
if (failures > 0) {
  console.error(`\n  ✗ Tax check failed: ${failures} problem(s). Do not ship this.\n`);
  process.exit(1);
}

console.log(
  `\n  ✓ Tax check passed: ${SLABS.length} salary, ${BUSINESS_SLABS.length} business and ` +
    `${RENT_SLABS.length} rent slabs reconcile with the First Schedule; company, 4C, 113, 154A, ` +
    `231AB, 236C, 236K, 231B, 235, 236, 37 and 37A rates verified for ${TAX_YEAR.label}`,
);
console.log('');
