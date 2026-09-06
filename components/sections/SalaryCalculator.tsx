'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { cx } from '@/lib/cx';
import { money, percent, Rs, NumberField, Row } from './calculator-parts';
import {
  EMPTY_INPUT,
  EOBI,
  EOBI_MONTHLY,
  RELIEF,
  type CalculatorInput,
} from '@/lib/tax/pakistan';
import {
  calculateForYear,
  DEFAULT_TAX_YEAR_ID,
  TAX_YEARS,
  taxYearById,
} from '@/lib/tax/salary-years';

/**
 * The salary tax calculator.
 *
 * ## Two decisions that shape everything below
 *
 * IT COMPUTES AS YOU TYPE, WITH NO SUBMIT. The whole calculation is a pure
 * function of eight numbers (lib/tax/pakistan.ts) and runs in microseconds, so
 * there is nothing for a button to wait for. A "Calculate" button here would
 * be a gate in front of an instant answer.
 *
 * IT NEVER SENDS THE SALARY ANYWHERE. No fetch, no analytics event, no query
 * string. A visitor typing their salary into an agency's website is doing
 * something they would reasonably want kept to themselves, and the page says
 * so plainly rather than leaving them to trust it. That is also why the state
 * lives in `useState` and not in the URL: a shareable link would put someone's
 * pay in their browser history and in any referrer header the page emits.
 *
 * ## The disclosure, and why the advanced fields start closed
 *
 * Most people arriving here want one number: what lands in the account. Six
 * relief fields above that answer would bury it, and every one of them is
 * zero for the majority of salaried filers. So the first screen is salary in,
 * take-home out, and the reliefs are one click away with the statutory caps
 * stated next to each. Nothing is hidden, but nothing is in the way either.
 *
 * ## What the results panel refuses to do
 *
 * It does not round to something friendly, it does not present the estimate as
 * a filing, and it does not put provident fund in with the tax. That last one
 * is the distinction most calculators get wrong: your own contribution to your
 * own fund is not a deduction in the sense that tax is, so it sits in its own
 * row with a line saying it is still your money.
 */

export function SalaryCalculator() {
  const [input, setInput] = useState<CalculatorInput>({
    ...EMPTY_INPUT,
    amount: 0,
    period: 'monthly',
  });
  const [showReliefs, setShowReliefs] = useState(false);
  /* The year the slabs come from. Its own state rather than part of `input`,
     because it selects a rate table rather than describing the salary, and
     because `CalculatorInput` is shared with the four tools in
     lib/tax/salary-tools.ts that only ever want the current year. */
  const [yearId, setYearId] = useState(DEFAULT_TAX_YEAR_ID);

  const set = <K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) =>
    setInput((previous) => ({ ...previous, [key]: value }));

  const year = useMemo(() => taxYearById(yearId), [yearId]);
  const result = useMemo(() => calculateForYear(input, yearId), [input, yearId]);
  const hasSalary = result.grossAnnual > 0;
  const isCurrentYear = yearId === DEFAULT_TAX_YEAR_ID;

  /* Whether any relief is actually in play. Drives whether the panel shows the
     allowance and credit rows at all: a visitor who filled none of them should
     not read four rows of "Rs 0". */
  const hasAllowances = result.zakatAllowance > 0 || result.educationAllowance > 0;
  const hasCredits = result.donationCredit > 0 || result.pensionCredit > 0;
  /* Section 4AB reached salary only in tax years 2025 and 2026, and only above
     Rs 10m of taxable income. Nil everywhere else, so the row is conditional
     rather than a permanent "Rs 0". */
  const hasSurcharge = result.surcharge > 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      {/* ── Inputs ──────────────────────────────────────────────────────── */}
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your salary</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Enter gross salary, before any deduction. Nothing you type here leaves your
          browser.
        </p>

        {/* ── Tax year ────────────────────────────────────────────────────
            A select rather than the radios below it: ten options, and unlike
            monthly-versus-annual there is nothing to be gained from seeing all
            ten at once. It sits above the salary because it changes what every
            figure on the page means, and a control that reframes the answer
            should not be found after it.

            Most visitors want the current year and it is the default, so this
            costs them one line of reading and no clicks. */}
        <div className="mt-7">
          <label
            htmlFor="tax-year"
            className="block font-display text-[14px] font-bold text-ink"
          >
            Tax year
          </label>
          <select
            id="tax-year"
            value={yearId}
            onChange={(event) => setYearId(event.target.value)}
            className={cx(
              'u-tap mt-2.5 w-full cursor-pointer rounded-chip border border-line bg-surface',
              'px-4 py-2.5 text-[14px] text-ink transition-colors hover:border-blue-600',
              'focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600',
            )}
          >
            {TAX_YEARS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.searchLabel} ({option.label})
                {option.id === DEFAULT_TAX_YEAR_ID ? ' - current' : ''}
              </option>
            ))}
          </select>
          <p className="mt-2 text-[12.5px] leading-[1.5] text-ink-body">
            {year.period}. Rates set by the {year.authority}.
          </p>
        </div>

        {/* Monthly or annual. Radio rather than a select: two options, and the
            choice changes what the number beside it means, so both readings
            should be visible at once rather than one hidden behind a click. */}
        <fieldset className="mt-7">
          <legend className="font-display text-[14px] font-bold text-ink">
            Salary is stated
          </legend>
          <div className="mt-2.5 flex gap-2">
            {(['monthly', 'annual'] as const).map((period) => (
              <label
                key={period}
                className={cx(
                  'u-tap flex-1 cursor-pointer rounded-chip border px-4 py-2.5 text-center',
                  'text-[14px] font-medium capitalize transition-colors',
                  // The radio is `sr-only`, so the focus ring goes on the label
                  // instead. Same reasoning as ChoiceField in ./calculator-parts.
                  'focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-600',
                  input.period === period
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-line bg-surface text-ink-body hover:border-blue-600',
                )}
              >
                <input
                  type="radio"
                  name="period"
                  value={period}
                  checked={input.period === period}
                  onChange={() => set('period', period)}
                  className="sr-only"
                />
                {period}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6">
          <NumberField
            label={input.period === 'monthly' ? 'Gross monthly salary' : 'Gross annual salary'}
            value={input.amount}
            onChange={(next) => set('amount', next)}
            placeholder={input.period === 'monthly' ? '150,000' : '1,800,000'}
          />
        </div>

        {/* ── Non-tax deductions ──────────────────────────────────────────
            Both are employer-specific, which is why both are asked rather than
            assumed. See the notes on `eobi` and `providentFundRate` in
            lib/tax/pakistan.ts. */}
        <div className="mt-7 border-t border-line pt-7">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={input.eobi}
              onChange={(event) => set('eobi', event.target.checked)}
              className="mt-0.5 size-4 flex-none accent-blue-600"
            />
            <span>
              <span className="block font-display text-[14px] font-bold text-ink">
                My employer deducts EOBI
              </span>
              <span className="mt-1 block text-[12.5px] leading-[1.5] text-ink-body">
                {Rs(EOBI_MONTHLY)} a month. It is 1% of the {Rs(EOBI.minimumWage)} minimum
                wage, not of your salary, so it is the same figure at every pay level.
                Applies only where your employer is registered with EOBI.
              </span>
            </span>
          </label>

          <div className="mt-6">
            <NumberField
              label="Provident fund contribution"
              prefix={null}
              placeholder="0"
              value={input.providentFundRate}
              onChange={(next) => set('providentFundRate', Math.min(next, 100))}
              hint="Your own share, as a percentage of gross. Your employer's trust deed sets the rate: 8.33% and 10% are both common. Leave at 0 if there is no fund."
            />
          </div>
        </div>

        {/* ── Reliefs ─────────────────────────────────────────────────────
            Closed by default. Every field states its statutory cap in the
            hint, because a visitor who enters Rs 500,000 of donations should
            find out here that the credit is capped rather than wonder why the
            answer moved less than expected. */}
        <div className="mt-7 border-t border-line pt-7">
          <button
            type="button"
            onClick={() => setShowReliefs((open) => !open)}
            aria-expanded={showReliefs}
            className="u-tap flex w-full items-center justify-between gap-3 text-left"
          >
            <span>
              <span className="block font-display text-[15px] font-bold text-ink">
                Allowances and tax credits
              </span>
              <span className="mt-0.5 block text-[12.5px] text-ink-body">
                Zakat, education, donations and pension. Most people leave these empty.
              </span>
            </span>
            <Icon
              name="chevron-down"
              size={18}
              className={cx(
                'flex-none text-ink-body transition-transform duration-200',
                showReliefs && 'rotate-180',
              )}
            />
          </button>

          {showReliefs && (
            <div className="mt-6 flex flex-col gap-6">
              <NumberField
                label="Zakat paid"
                value={input.zakat}
                onChange={(next) => set('zakat', next)}
                hint="Section 60. Paid under the Zakat and Ushr Ordinance. Comes off your income before the slabs, so it is worth your top rate."
              />

              <NumberField
                label="Annual tuition fees paid"
                value={input.tuitionFee}
                onChange={(next) => set('tuitionFee', next)}
                hint={`Section 60D. Only available if taxable income is under ${Rs(RELIEF.educationIncomeCeiling)}, and the allowance is 5% of the fee, capped at ${Rs(RELIEF.educationPerChild)} per child.`}
              />

              <NumberField
                label="Number of children in education"
                prefix={null}
                value={input.children}
                onChange={(next) => set('children', Math.min(next, 20))}
                hint="Used for the section 60D cap above."
              />

              <NumberField
                label="Donations to approved organisations"
                value={input.donations}
                onChange={(next) => set('donations', next)}
                hint="Section 61. A credit at your average tax rate on the lower of what you gave and 30% of taxable income. The organisation must be FBR-approved."
              />

              <NumberField
                label="Voluntary Pension Scheme contribution"
                value={input.pensionContribution}
                onChange={(next) => set('pensionContribution', next)}
                hint="Section 63. A credit at your average tax rate on the lower of what you paid and 20% of taxable income. The scheme must be SECP-approved."
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Results ─────────────────────────────────────────────────────── */}
      <div className="lg:sticky lg:top-32 lg:self-start">
        <div className="u-tile p-7 md:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-h3 text-ink">Your take-home</h2>
            {/* The year the figures are on. It tracks the selector rather than
                naming the current year, because a panel headed "Tax year 2027"
                while showing 2019 rates would be the worst failure this
                component could have. */}
            <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink-body">
              {year.label}
            </span>
          </div>

          {/* A closed year is stated plainly rather than left to be inferred
              from a dropdown the reader may have set and forgotten. */}
          {!isCurrentYear && (
            <p className="mt-3 rounded-chip border border-line bg-surface px-4 py-2.5 text-[12.5px] leading-[1.5] text-ink-body">
              These are the rates for {year.period}, a year that has closed, not the
              current ones.{year.note ? ` ${year.note}` : ''}
            </p>
          )}

          {!hasSalary ? (
            /* The empty state says what to do, rather than showing a column of
               zeros that looks like a computed answer of nothing. */
            <p className="mt-8 text-[15px] leading-[1.65] text-ink-body">
              Enter a salary and the figures appear here, with the slab-by-slab working
              underneath.
            </p>
          ) : (
            <>
              {/* The headline: the one number most visitors came for. */}
              <div
                className="mt-6 rounded-tile bg-blue-50 p-6"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-blue-600">
                  Monthly, after deductions
                </span>
                <p className="mt-1.5 font-display text-[34px] font-bold leading-none tabular-nums text-ink">
                  {Rs(result.takeHomeMonthly)}
                </p>
                <p className="mt-2.5 text-[13.5px] text-ink-body">
                  {Rs(result.takeHomeAnnual)} a year, from a gross of{' '}
                  {Rs(result.grossAnnual)}.
                </p>
              </div>

              <div className="mt-6">
                <Row label="Gross salary" value={Rs(result.grossAnnual)} />

                {hasAllowances && (
                  <>
                    {result.zakatAllowance > 0 && (
                      <Row
                        label="Less Zakat"
                        note="Section 60 allowance"
                        value={`- ${Rs(result.zakatAllowance)}`}
                        tone="muted"
                      />
                    )}
                    {result.educationAllowance > 0 && (
                      <Row
                        label="Less education allowance"
                        note="Section 60D allowance"
                        value={`- ${Rs(result.educationAllowance)}`}
                        tone="muted"
                      />
                    )}
                    <Row label="Taxable income" value={Rs(result.taxableIncome)} />
                  </>
                )}

                {/* The slab tax. It is the final income tax figure only when
                    nothing sits between it and the total: no credit reduced it
                    and no surcharge was added on top. Where either did, this
                    row is the start of a working and the total comes below. */}
                <Row
                  label={hasCredits || hasSurcharge ? 'Tax on the slabs' : 'Income tax'}
                  note={
                    hasCredits || hasSurcharge
                      ? undefined
                      : `Effective rate ${percent.format(result.effectiveRate)}, marginal rate ${percent.format(result.marginalRate)}`
                  }
                  value={`- ${Rs(result.taxBeforeCredits)}`}
                />

                {hasCredits && (
                  <>
                    {result.donationCredit > 0 && (
                      <Row
                        label="Donation credit"
                        note="Section 61, at your average rate"
                        value={`+ ${Rs(result.donationCredit)}`}
                        tone="muted"
                      />
                    )}
                    {result.pensionCredit > 0 && (
                      <Row
                        label="Pension credit"
                        note="Section 63, at your average rate"
                        value={`+ ${Rs(result.pensionCredit)}`}
                        tone="muted"
                      />
                    )}
                  </>
                )}

                {/* Section 4AB, in the two years it reached salary. Shown as
                    its own row rather than folded into the tax, because a
                    reader checking an old assessment needs to see it named:
                    it is a surcharge ON the tax, and at these incomes it is
                    a large number that would otherwise look like a slab
                    error. Nil for the current year, so the row is absent. */}
                {hasSurcharge && (
                  <Row
                    label="Surcharge"
                    note={`Section 4AB, ${percent.format(result.surchargeRate)} of the tax, on taxable income above ${Rs(year.surcharge.threshold)}`}
                    value={`- ${Rs(result.surcharge)}`}
                    tone="muted"
                  />
                )}

                {(hasCredits || hasSurcharge) && (
                  <Row
                    label="Income tax payable"
                    note={`Effective rate ${percent.format(result.effectiveRate)}, marginal rate ${percent.format(result.marginalRate)}`}
                    value={`- ${Rs(result.incomeTax)}`}
                  />
                )}

                {result.eobiAnnual > 0 && (
                  <Row label="EOBI" value={`- ${Rs(result.eobiAnnual)}`} />
                )}

                {result.providentFundAnnual > 0 && (
                  <Row
                    label="Provident fund"
                    note="Still yours. It goes to your fund, not to the government."
                    value={`- ${Rs(result.providentFundAnnual)}`}
                  />
                )}

                <Row label="Take-home, annual" value={Rs(result.takeHomeAnnual)} tone="total" />
              </div>

              {/* ── The working ──────────────────────────────────────────
                  A calculator that shows only its answer asks to be trusted.
                  This is the same table FBR publishes, with the visitor's own
                  income against it, so the figure above can be checked rather
                  than believed. */}
              {result.slabRows.some((row) => row.tax > 0) && (
                <details className="mt-7 border-t border-line pt-6">
                  <summary className="u-tap cursor-pointer font-display text-[14px] font-bold text-ink">
                    How the tax was worked out
                  </summary>

                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full min-w-[380px] text-left text-[13px]">
                      <thead>
                        <tr className="text-[11.5px] uppercase tracking-[0.08em] text-ink-body">
                          <th scope="col" className="pb-2 font-bold">Slab</th>
                          <th scope="col" className="pb-2 text-right font-bold">Rate</th>
                          <th scope="col" className="pb-2 text-right font-bold">Income</th>
                          <th scope="col" className="pb-2 text-right font-bold">Tax</th>
                        </tr>
                      </thead>
                      <tbody className="tabular-nums">
                        {result.slabRows.map((row) => (
                          <tr key={row.from} className="border-t border-line">
                            <td className="py-2 pr-3 text-ink-body">
                              {row.to === null
                                ? `Above ${money.format(row.from)}`
                                : `${money.format(row.from)} to ${money.format(row.to)}`}
                            </td>
                            {/* A flat band has no rate to print. Tax year 2019
                                charged a fixed rupee amount across its lower
                                bands, and showing "0%" beside a Rs 1,000
                                charge would read as a bug rather than as the
                                law. See `Slab.flat` in lib/tax/slabs.ts. */}
                            <td className="py-2 pr-3 text-right text-ink-body">
                              {row.flat ? 'Flat' : percent.format(row.rate)}
                            </td>
                            <td className="py-2 pr-3 text-right text-ink-body">
                              {money.format(Math.round(row.taxable))}
                            </td>
                            <td className="py-2 text-right font-medium text-ink-strong">
                              {money.format(Math.round(row.tax))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Both halves follow the selected year. Stating "the
                      surcharge no longer applies" while showing tax year 2025,
                      where it did apply and is in the table above, would be the
                      page contradicting itself. */}
                  <p className="mt-4 text-[12.5px] leading-[1.55] text-ink-body">
                    Rates from the First Schedule, Part I, Division I of the Income Tax
                    Ordinance, 2001, as amended by the {year.authority}, for{' '}
                    {year.label.toLowerCase()}.{' '}
                    {year.surcharge.rate > 0
                      ? `A surcharge of ${percent.format(year.surcharge.rate)} under section 4AB applied to salary above ${Rs(year.surcharge.threshold)} of taxable income this year.`
                      : 'The salaried surcharge under section 4AB does not apply this year.'}{' '}
                    This table applies where salary is more than{' '}
                    {percent.format(year.salaryShareTest)} of taxable income.
                  </p>
                </details>
              )}

              <div className="mt-7 border-t border-line pt-6">
                <p className="text-[13.5px] leading-[1.6] text-ink-body">
                  An estimate on salary income alone. Your actual liability depends on
                  your other income, prior filings and what your employer has already
                  withheld.
                </p>
                <div className="mt-5">
                  <Button href="/contact?service=income-tax-filing">
                    Have us file your return
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
