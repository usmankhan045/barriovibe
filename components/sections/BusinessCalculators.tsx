'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AwaitingInput,
  ChoiceField,
  Headline,
  NumberField,
  Row,
  Rs,
  Working,
  percent,
} from './calculator-parts';
import {
  calculateBusiness,
  EMPTY_BUSINESS_INPUT,
  SURCHARGE,
  type BusinessInput,
  type TaxpayerKind,
} from '@/lib/tax/business';
import {
  calculateCompany,
  EMPTY_COMPANY_INPUT,
  MINIMUM_TAX,
  MINIMUM_TAX_RATES,
  SMALL_COMPANY_LIMITS,
  superTaxOn,
  SUPER_TAX,
  type CompanyInput,
  type CompanyKind,
  type MinimumTaxSector,
  type SuperTaxCategory,
} from '@/lib/tax/corporate';

/**
 * The four calculators for a business rather than a salary.
 *
 * They share a file because they share the thing a visitor most needs to get
 * right before any of them is useful: WHICH ONE APPLIES TO THEM. A sole trader
 * is taxed in slabs, a company at one flat rate, and both may be floored by
 * section 113 and topped by section 4C. Each panel below says what it assumes
 * and links to its neighbour where the assumption might be wrong.
 *
 * As everywhere under /tools, no rate is written here. Everything comes from
 * lib/tax/business.ts and lib/tax/corporate.ts, where each figure carries its
 * section of the Ordinance.
 */

function ResultPanel({ children }: { children: React.ReactNode }) {
  return <div className="u-tile p-7 md:p-8">{children}</div>;
}

/* ══ Business, self-employed and AOP ═════════════════════════════════════ */

const TAXPAYER_LABELS: { value: TaxpayerKind; label: string }[] = [
  { value: 'individual', label: 'Sole trader' },
  { value: 'aop', label: 'Partnership (AOP)' },
  { value: 'professional-firm', label: 'Professional firm' },
];

export function BusinessTaxCalculator() {
  const [input, setInput] = useState<BusinessInput>(EMPTY_BUSINESS_INPUT);

  const result = useMemo(() => calculateBusiness(input), [input]);
  const hasInput = result.taxableIncome > 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your business</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Use this where salary is 75% or less of your taxable income. Nothing you type
          here leaves your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <ChoiceField
            label="Who is being taxed"
            value={input.kind}
            onChange={(kind) => setInput((p) => ({ ...p, kind }))}
            options={TAXPAYER_LABELS}
            hint="A professional firm barred from incorporating is capped at 40% instead of 45%."
          />
          <NumberField
            label="Annual taxable income"
            value={input.taxableIncome}
            onChange={(taxableIncome) => setInput((p) => ({ ...p, taxableIncome }))}
            hint="Profit after business expenses, for the whole tax year."
          />
        </div>

        <p className="mt-7 border-t border-line pt-5 text-[13px] leading-[1.6] text-ink-body">
          If salary is more than 75% of your taxable income, a different and much lower
          table applies.{' '}
          <Link href="/tools/salary-tax" className="u-tap font-medium text-blue-600 hover:underline">
            Use the salary calculator
          </Link>{' '}
          instead.
        </p>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label="Tax for the year"
              value={Rs(result.totalTax)}
              note={`An effective rate of ${percent.format(
                result.effectiveRate,
              )} on ${Rs(result.taxableIncome)}.`}
            />

            <div className="mt-7">
              <Row label="Taxable income" value={Rs(result.taxableIncome)} tone="muted" />
              <Row label="Tax on the slabs" value={Rs(result.taxOnSlabs)} />
              {result.surcharge > 0 && (
                <Row
                  label="Section 4AB surcharge"
                  value={Rs(result.surcharge)}
                  note={`${percent.format(result.surchargeRate)} of the tax, charged above ${Rs(
                    SURCHARGE.threshold,
                  )} of income`}
                />
              )}
              <Row label="Total tax" value={Rs(result.totalTax)} tone="total" />
              <Row label="Left after tax" value={Rs(result.afterTax)} tone="muted" />
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-body">
                Slab by slab
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[380px] text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-line text-ink-body">
                      <th scope="col" className="pb-2 font-medium">Band</th>
                      <th scope="col" className="pb-2 text-right font-medium">Rate</th>
                      <th scope="col" className="pb-2 text-right font-medium">Tax</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    {result.slabRows.map((row) => (
                      <tr key={row.from} className="border-b border-line/60 last:border-0">
                        <td className="py-2 text-ink-body">
                          {row.to === null
                            ? `Above ${Rs(row.from)}`
                            : `${Rs(row.from)} to ${Rs(row.to)}`}
                        </td>
                        <td className="py-2 text-right text-ink-body">
                          {percent.format(row.rate)}
                        </td>
                        <td className="py-2 text-right font-medium text-ink-strong">
                          {Rs(row.tax)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Working>
              <p>
                Business income is taxed in steps. Each band only taxes the income inside
                it, so your marginal rate of {percent.format(result.marginalRate)} applies
                to the next rupee you earn, not to everything you earned.
              </p>
              {input.kind === 'aop' && result.surcharge > 0 && (
                <p className="mt-3">
                  An AOP with taxable income above {Rs(SURCHARGE.threshold)} also pays the
                  section 4AB surcharge, which is {percent.format(SURCHARGE.aopRate)} of the
                  tax rather than of the income.
                </p>
              )}
              {input.kind === 'individual' && result.taxableIncome > SURCHARGE.threshold && (
                <p className="mt-3">
                  The section 4AB surcharge no longer applies to an individual: it was 9%
                  for tax year 2026 and is nil from tax year 2027. Calculators still adding
                  it will quote you a higher figure.
                </p>
              )}
            </Working>
          </>
        ) : (
          <AwaitingInput>
            Enter your annual taxable income and this works out the tax on it, band by
            band.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}

/* ══ Company tax ═════════════════════════════════════════════════════════ */

const COMPANY_LABELS: { value: CompanyKind; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'small', label: 'Small' },
  { value: 'banking', label: 'Banking' },
];

export function CorporateTaxCalculator() {
  const [input, setInput] = useState<CompanyInput>(EMPTY_COMPANY_INPUT);

  const result = useMemo(() => calculateCompany(input), [input]);
  const hasInput = result.taxableIncome > 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your company</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          For a registered company. Nothing you type here leaves your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <ChoiceField
            label="Kind of company"
            value={input.kind}
            onChange={(kind) => setInput((p) => ({ ...p, kind }))}
            options={COMPANY_LABELS}
            hint={`A small company has capital and reserves up to ${Rs(
              SMALL_COMPANY_LIMITS.capitalAndReserves,
            )}, up to ${SMALL_COMPANY_LIMITS.employees} staff and turnover up to ${Rs(
              SMALL_COMPANY_LIMITS.turnover,
            )}. All three, not any one.`}
          />
          <NumberField
            label="Annual taxable income"
            value={input.taxableIncome}
            onChange={(taxableIncome) => setInput((p) => ({ ...p, taxableIncome }))}
            hint="Profit chargeable to tax for the year."
          />
          <NumberField
            label="Annual turnover"
            value={input.turnover}
            onChange={(turnover) => setInput((p) => ({ ...p, turnover }))}
            hint="Optional. Used for the section 113 minimum tax, which replaces the normal tax when it comes out higher."
          />
        </div>

        <p className="mt-7 border-t border-line pt-5 text-[13px] leading-[1.6] text-ink-body">
          A sole trader or partnership is taxed in steps instead.{' '}
          <Link
            href="/tools/business-tax"
            className="u-tap font-medium text-blue-600 hover:underline"
          >
            Use the business calculator
          </Link>
          .
        </p>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label="Tax for the year"
              value={Rs(result.totalTax)}
              note={`An effective rate of ${percent.format(
                result.effectiveRate,
              )} on ${Rs(result.taxableIncome)} of profit.`}
            />

            <div className="mt-7">
              <Row label="Taxable income" value={Rs(result.taxableIncome)} tone="muted" />
              <Row
                label="Company tax"
                value={Rs(result.normalTax)}
                note={`${percent.format(result.companyRate)} of taxable income, with no bands`}
              />
              {result.turnover > 0 && (
                <Row
                  label="Section 113 minimum tax"
                  value={Rs(result.minimumTax)}
                  note={`${percent.format(result.minimumTaxRate)} of ${Rs(result.turnover)} turnover`}
                  tone="muted"
                />
              )}
              <Row label="Tax charged" value={Rs(result.taxBeforeSuperTax)} tone="total" />
              <Row label="Left after tax" value={Rs(result.afterTax)} tone="muted" />
            </div>

            {result.minimumTaxApplies && (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                Section 113 is higher than the tax on your profit, so it replaces it rather
                than adding to it. The excess of {Rs(result.carryForward)} carries forward
                for up to {MINIMUM_TAX.carryForwardYears} years.
              </p>
            )}

            <Working>
              <p>
                A company pays one flat rate on the whole of its taxable profit. There are
                no bands and no exempt threshold, which is the main difference from every
                other taxpayer on this site.
              </p>
              {result.turnover > 0 && (
                <p className="mt-3">
                  Section 113 sets a floor computed from turnover instead of profit, so a
                  company pays the higher of the two. A loss-making company still pays the
                  floor: that is what a minimum tax is for.
                </p>
              )}
            </Working>
          </>
        ) : (
          <AwaitingInput>
            Enter your company&rsquo;s taxable profit and this works out the tax on it.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}

/* ══ Super tax, section 4C ═══════════════════════════════════════════════ */

const SUPER_TAX_LABELS: { value: SuperTaxCategory; label: string }[] = [
  { value: 'general', label: 'Most businesses' },
  { value: 'specified', label: 'Bank, oil & gas, fertilizer' },
];

export function SuperTaxCalculator() {
  const [income, setIncome] = useState(0);
  const [category, setCategory] = useState<SuperTaxCategory>('general');
  const [exportsExempt, setExportsExempt] = useState(false);

  const result = useMemo(
    () => superTaxOn(income, category, exportsExempt),
    [income, category, exportsExempt],
  );
  const hasInput = income > 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your section 4C income</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Super tax starts at very high income. Nothing you type here leaves your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <ChoiceField
            label="Kind of business"
            value={category}
            onChange={setCategory}
            options={SUPER_TAX_LABELS}
            hint={`Most businesses pay nothing at or below ${Rs(
              SUPER_TAX.general.threshold,
            )}. Banks, oil and gas explorers and fertilizer sellers start at ${Rs(
              SUPER_TAX.specified.threshold,
            )}.`}
          />
          <NumberField
            label="Income for the year"
            value={income}
            onChange={setIncome}
            hint="The section 4C income figure for the whole year."
          />
          <ChoiceField
            label="Export proceeds above 80% of sales"
            value={exportsExempt ? 'yes' : 'no'}
            onChange={(v) => setExportsExempt(v === 'yes')}
            options={[
              { value: 'no', label: 'No' },
              { value: 'yes', label: 'Yes' },
            ]}
            hint="From tax year 2027, section 4C does not apply at all where export money actually received is more than 80% of total sales."
          />
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label="Super tax"
              value={Rs(result.tax)}
              note={
                result.tax > 0
                  ? `${percent.format(result.rate)} of the whole income, because it is above ${Rs(
                      result.threshold,
                    )}.`
                  : exportsExempt
                    ? 'Nil: the export exemption removes section 4C entirely.'
                    : `Nil: income is at or below the ${Rs(result.threshold)} threshold.`
              }
            />

            <div className="mt-7">
              <Row label="Section 4C income" value={Rs(income)} tone="muted" />
              <Row label="Threshold" value={Rs(result.threshold)} tone="muted" />
              <Row label="Super tax" value={Rs(result.tax)} tone="total" />
            </div>

            <div className="mt-6 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
              <strong className="font-semibold">Section 4C is a cliff, not a slab.</strong>{' '}
              The rate applies to the whole income once the threshold is passed, not to the
              part above it. A business one rupee over {Rs(result.threshold)} pays{' '}
              {percent.format(SUPER_TAX[category].rate)} of everything.
            </div>

            <Working>
              <p>
                Super tax sits on top of ordinary income tax rather than replacing it. For
                tax year 2027 the six middle bands between {Rs(SUPER_TAX.specified.threshold)}{' '}
                and {Rs(SUPER_TAX.general.threshold)} were removed for most businesses and
                the top rate fell from 10% to {percent.format(SUPER_TAX.general.rate)}. Banks,
                oil and gas explorers and fertilizer sellers kept the old 10% from{' '}
                {Rs(SUPER_TAX.specified.threshold)}.
              </p>
            </Working>
          </>
        ) : (
          <AwaitingInput>
            Enter your section 4C income for the year and this works out the super tax on
            it.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}

/* ══ Minimum turnover tax, section 113 ═══════════════════════════════════ */

const SECTOR_LABELS: { value: MinimumTaxSector; label: string; note: string }[] = [
  { value: 'general', label: 'General', note: 'Every business not listed below.' },
  {
    value: 'reducedThreeQuarter',
    label: 'Gas utilities, PIA, poultry',
    note: 'Sui Southern and Sui Northern above Rs 1bn of turnover, PIA, and the poultry industry.',
  },
  {
    value: 'reducedHalf',
    label: 'Refineries, oil marketing, motorcycle dealers',
    note: 'Oil refineries, oil marketing companies and registered motorcycle dealers.',
  },
  {
    value: 'distributors',
    label: 'Distributors and wholesalers',
    note: 'Listed goods only, and only while on the active taxpayer list under both the Sales Tax Act 1990 and the Income Tax Ordinance 2001. Raised from 0.25% for tax year 2027.',
  },
  {
    value: 'reducedQuarter',
    label: 'Mills, agents, marketplaces, retailers',
    note: 'Rice and flour mills, petroleum agents, online marketplaces, used-vehicle sellers and large retailers integrated with FBR.',
  },
];

export function MinimumTurnoverTaxCalculator() {
  const [turnover, setTurnover] = useState(0);
  const [normalTax, setNormalTax] = useState(0);
  const [sector, setSector] = useState<MinimumTaxSector>('general');

  const rate = MINIMUM_TAX_RATES[sector];
  const minimumTax = Math.max(0, turnover) * rate;
  const applies = minimumTax > normalTax;
  const charged = Math.max(minimumTax, normalTax);
  const hasInput = turnover > 0;

  const selected = SECTOR_LABELS.find((s) => s.value === sector)!;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your turnover</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Section 113 is computed on sales rather than profit. Nothing you type here leaves
          your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="min-tax-sector"
              className="font-display text-[14px] font-bold text-ink"
            >
              Your sector
            </label>
            <select
              id="min-tax-sector"
              value={sector}
              onChange={(event) => setSector(event.target.value as MinimumTaxSector)}
              className="w-full rounded-chip border border-line bg-surface px-4 py-3 text-[15px] text-ink transition-colors focus:border-blue-600"
            >
              {SECTOR_LABELS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({percent.format(MINIMUM_TAX_RATES[option.value])})
                </option>
              ))}
            </select>
            <p className="text-[12.5px] leading-[1.5] text-ink-body">{selected.note}</p>
          </div>

          <NumberField
            label="Annual turnover"
            value={turnover}
            onChange={setTurnover}
            hint="Total sales for the year, before any expense."
          />
          <NumberField
            label="Your normal income tax"
            value={normalTax}
            onChange={setNormalTax}
            hint="Optional. The tax on your profit, so the two can be compared. Section 113 replaces it when higher."
          />
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label="Minimum tax on turnover"
              value={Rs(minimumTax)}
              note={`${percent.format(rate)} of ${Rs(turnover)} in sales.`}
            />

            <div className="mt-7">
              <Row label="Turnover" value={Rs(turnover)} tone="muted" />
              <Row label="Section 113 minimum tax" value={Rs(minimumTax)} />
              {normalTax > 0 && <Row label="Your normal income tax" value={Rs(normalTax)} />}
              {normalTax > 0 && <Row label="Tax actually charged" value={Rs(charged)} tone="total" />}
            </div>

            {normalTax > 0 && (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                {applies
                  ? `Section 113 is higher, so it replaces your normal tax. The excess of ${Rs(
                      minimumTax - normalTax,
                    )} carries forward for up to ${MINIMUM_TAX.carryForwardYears} years.`
                  : 'Your normal tax is higher, so section 113 does not bite this year.'}
              </p>
            )}

            <Working>
              <p>
                Section 113 sets a floor under your tax, worked out from sales instead of
                profit. You pay whichever is higher: it is never added on top of your normal
                tax. A loss-making business still pays it, which is the point of a minimum
                tax and the part that surprises people.
              </p>
              <p className="mt-3">
                Every company and every Pakistan branch of a foreign company is caught,
                whatever its size. A sole trader or partnership is only caught once turnover
                reaches {Rs(MINIMUM_TAX.individualTurnoverThreshold)}.
              </p>
            </Working>
          </>
        ) : (
          <AwaitingInput>
            Enter your annual turnover and this works out the tax floor section 113 sets on
            it.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}
