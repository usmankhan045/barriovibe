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
  calculateIncrement,
  calculateMultiYear,
  compareOffers,
  reverseSalary,
  type PayPeriod,
} from '@/lib/tax/salary-tools';
import { cx } from '@/lib/cx';

/**
 * The four calculators that answer a question ABOUT a salary rather than
 * computing one.
 *
 * They share a file because they share a shape: two salary figures in, a
 * comparison out, and none of them offers the allowances and credits. That
 * omission is deliberate and is explained on each page: a raise is the same
 * raise whether or not you pay Zakat, so putting six relief fields on both
 * sides of every comparison would add six controls to move both answers by the
 * same amount. /tools/salary-tax is where the reliefs belong, and each of these
 * links to it.
 *
 * No rate appears here. Every figure comes from lib/tax/salary-tools.ts, which
 * calls the same `calculate()` the salary calculator uses, so these four cannot
 * disagree with it about the tax on a given salary.
 */

/** The panel each of these renders its answer into. */
function ResultPanel({ children }: { children: React.ReactNode }) {
  return <div className="u-tile p-7 md:p-8">{children}</div>;
}

/** A shared footer pointing at the full calculator, since none of these has reliefs. */
function ReliefNote() {
  return (
    <p className="mt-6 border-t border-line pt-5 text-[13px] leading-[1.6] text-ink-body">
      Zakat, provident fund, donations and pension relief are not included here, because
      they move both figures by the same amount.{' '}
      <Link href="/tools/salary-tax" className="u-tap font-medium text-blue-600 hover:underline">
        The salary calculator
      </Link>{' '}
      has all of them.
    </p>
  );
}

/* ══ Reverse: gross from a target take-home ══════════════════════════════ */

export function ReverseSalaryCalculator() {
  const [net, setNet] = useState(0);
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');

  const annualTarget = period === 'monthly' ? net * 12 : net;
  const result = useMemo(() => reverseSalary(annualTarget), [annualTarget]);
  const hasInput = annualTarget > 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your target take-home</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          The amount you want to actually receive. Nothing you type here leaves your
          browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <ChoiceField
            label="Take-home is stated"
            value={period}
            onChange={setPeriod}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annual', label: 'Annual' },
            ]}
          />
          <NumberField
            label={period === 'monthly' ? 'Take-home per month' : 'Take-home per year'}
            value={net}
            onChange={setNet}
            hint="What you want left after income tax."
          />
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label="Gross salary needed"
              value={Rs(period === 'monthly' ? result.grossMonthly : result.grossAnnual)}
              note={
                period === 'monthly'
                  ? `${Rs(result.grossAnnual)} a year`
                  : `${Rs(result.grossMonthly)} a month`
              }
            />

            <div className="mt-7">
              <Row
                label="Gross salary"
                value={Rs(period === 'monthly' ? result.grossMonthly : result.grossAnnual)}
              />
              <Row
                label="Income tax"
                value={`- ${Rs(period === 'monthly' ? result.taxMonthly : result.taxAnnual)}`}
                note={`Effective rate ${percent.format(result.effectiveRate)}`}
              />
              <Row
                label="Take-home"
                value={Rs(period === 'monthly' ? result.targetNetMonthly : result.targetNetAnnual)}
                tone="total"
              />
            </div>

            <Working>
              <p>
                There is no formula that turns a take-home back into a gross salary,
                because the tax depends on the gross you are solving for. So this searches
                instead: it tries a gross, works out the tax on it with the same slabs the
                salary calculator uses, and narrows the range until the take-home matches
                what you asked for.
              </p>
              <p className="mt-3">
                It lands within a rupee of your figure. At a gross of{' '}
                {Rs(result.grossAnnual)} a year the tax is {Rs(result.taxAnnual)}, which
                leaves {Rs(result.grossAnnual - result.taxAnnual)}.
              </p>
            </Working>

            <ReliefNote />
          </>
        ) : (
          <AwaitingInput>
            Enter the take-home pay you want and this works backwards to the gross salary
            that produces it.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}

/* ══ Increment: what a raise is worth after tax ══════════════════════════ */

export function SalaryIncrementCalculator() {
  const [current, setCurrent] = useState(0);
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [raise, setRaise] = useState(10);

  const currentAnnual = period === 'monthly' ? current * 12 : current;
  const result = useMemo(() => calculateIncrement(currentAnnual, raise), [currentAnnual, raise]);
  const hasInput = currentAnnual > 0;
  const perPeriod = (annual: number) => (period === 'monthly' ? annual / 12 : annual);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your raise</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Your salary now and the increase you have been offered. Nothing you type here
          leaves your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <ChoiceField
            label="Salary is stated"
            value={period}
            onChange={setPeriod}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annual', label: 'Annual' },
            ]}
          />
          <NumberField
            label={period === 'monthly' ? 'Current gross per month' : 'Current gross per year'}
            value={current}
            onChange={setCurrent}
            hint="Before any deduction."
          />
          <NumberField
            label="Raise offered"
            value={raise}
            onChange={setRaise}
            prefix={null}
            placeholder="10"
            hint="As a percentage of your current salary."
          />
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label="What you actually keep"
              value={Rs(perPeriod(result.riseNetAnnual))}
              note={`Of a ${Rs(perPeriod(result.riseGrossAnnual))} raise, ${percent.format(
                result.keptShare,
              )} reaches your account.`}
            />

            <div className="mt-7">
              <Row label="Raise offered" value={Rs(perPeriod(result.riseGrossAnnual))} />
              <Row
                label="Extra income tax"
                value={`- ${Rs(perPeriod(result.extraTaxAnnual))}`}
                note={`Taxed at ${percent.format(result.rateOnRise)} on the raise itself`}
              />
              <Row
                label="Added to your take-home"
                value={Rs(perPeriod(result.riseNetAnnual))}
                tone="total"
              />
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <Row
                label="Take-home before"
                value={Rs(perPeriod(result.current.takeHomeAnnual))}
                tone="muted"
              />
              <Row
                label="Take-home after"
                value={Rs(perPeriod(result.raised.takeHomeAnnual))}
                tone="muted"
              />
            </div>

            {result.crossedSlab && (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                This raise moves you into a higher slab. Only the part of your salary above
                the threshold is taxed at the higher rate, so your take-home still goes up:
                the slabs have no cliff in them.
              </p>
            )}

            <Working>
              <p>
                Tax is worked out on the whole salary before the raise and again on the
                whole salary after it, and the difference between those two figures is the
                tax on the raise. That is the only way to get it right when a raise
                straddles a slab boundary, because part of it is then taxed at one rate and
                part at the next.
              </p>
              <p className="mt-3">
                Before: {Rs(result.current.grossAnnual)} a year, tax{' '}
                {Rs(result.current.incomeTax)}. After: {Rs(result.raised.grossAnnual)} a
                year, tax {Rs(result.raised.incomeTax)}.
              </p>
            </Working>

            <ReliefNote />
          </>
        ) : (
          <AwaitingInput>
            Enter your current salary and the raise you have been offered, and this shows
            how much of it survives tax.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}

/* ══ Job offers: two salaries, after tax ════════════════════════════════ */

export function JobOfferCalculator() {
  const [current, setCurrent] = useState(0);
  const [offer, setOffer] = useState(0);
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');

  const multiplier = period === 'monthly' ? 12 : 1;
  const currentAnnual = current * multiplier;
  const offerAnnual = offer * multiplier;

  const result = useMemo(
    () => compareOffers(currentAnnual, offerAnnual),
    [currentAnnual, offerAnnual],
  );
  const hasInput = currentAnnual > 0 && offerAnnual > 0;
  const perPeriod = (a: number) => (period === 'monthly' ? a / 12 : a);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">The two jobs</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Gross salary for each, before any deduction. Nothing you type here leaves your
          browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <ChoiceField
            label="Salaries are stated"
            value={period}
            onChange={setPeriod}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annual', label: 'Annual' },
            ]}
          />
          <NumberField label="Your current job" value={current} onChange={setCurrent} />
          <NumberField label="The new offer" value={offer} onChange={setOffer} />
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label={result.offerIsBetter ? 'The offer pays more' : 'The offer pays less'}
              value={`${result.offerIsBetter ? '+' : '-'} ${Rs(
                Math.abs(perPeriod(result.differenceAnnual)),
              )}`}
              note={`${
                result.offerIsBetter ? 'More' : 'Less'
              } in your account ${period === 'monthly' ? 'each month' : 'each year'}, after tax.`}
            />

            <div className="mt-7">
              <Row
                label="Current job, gross"
                value={Rs(perPeriod(result.current.grossAnnual))}
                tone="muted"
              />
              <Row
                label="Current job, take-home"
                value={Rs(perPeriod(result.current.takeHomeAnnual))}
                note={`Tax ${Rs(perPeriod(result.current.incomeTax))}, effective ${percent.format(
                  result.current.effectiveRate,
                )}`}
              />
              <Row
                label="New offer, gross"
                value={Rs(perPeriod(result.offer.grossAnnual))}
                tone="muted"
              />
              <Row
                label="New offer, take-home"
                value={Rs(perPeriod(result.offer.takeHomeAnnual))}
                note={`Tax ${Rs(perPeriod(result.offer.incomeTax))}, effective ${percent.format(
                  result.offer.effectiveRate,
                )}`}
              />
              <Row
                label="Difference"
                value={`${result.offerIsBetter ? '+' : '-'} ${Rs(
                  Math.abs(perPeriod(result.differenceAnnual)),
                )}`}
                tone="total"
              />
            </div>

            {!result.offerIsBetter && (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                To match your current take-home, the offer would need a gross of{' '}
                <strong className="font-semibold">
                  {Rs(perPeriod(result.breakEvenGrossAnnual))}
                </strong>
                . That is the number to negotiate against.
              </p>
            )}

            <Working>
              <p>
                Each salary is taxed on its own against the same slabs, and the two
                take-home figures are compared. Comparing gross salaries alone is
                misleading once the higher one crosses a slab boundary, because the extra
                gross is then taxed at a higher rate than the salary beneath it.
              </p>
            </Working>

            <ReliefNote />
          </>
        ) : (
          <AwaitingInput>
            Enter both salaries and this compares what each one actually pays you, after
            tax.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}

/* ══ Multi-year: a tax year built from several pay periods ═══════════════ */

const BLANK_PERIOD: PayPeriod = { monthlySalary: 0, months: 6 };

export function MultiYearSalaryCalculator() {
  const [periods, setPeriods] = useState<PayPeriod[]>([
    { monthlySalary: 0, months: 6, label: 'First job' },
    { monthlySalary: 0, months: 6, label: 'Second job' },
  ]);

  const result = useMemo(() => calculateMultiYear(periods), [periods]);
  const hasInput = result.grossAnnual > 0;

  const update = (index: number, patch: Partial<PayPeriod>) =>
    setPeriods((previous) =>
      previous.map((entry, i) => (i === index ? { ...entry, ...patch } : entry)),
    );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your year</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Add each stretch of the tax year separately: a job change, a raise, or months
          you did not work. Nothing you type here leaves your browser.
        </p>

        <div className="mt-7 flex flex-col gap-7">
          {periods.map((entry, index) => (
            <div key={index} className="flex flex-col gap-4 border-l-2 border-line pl-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-[14px] font-bold text-ink">
                  {entry.label ?? `Period ${index + 1}`}
                </p>
                {periods.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setPeriods((p) => p.filter((_, i) => i !== index))}
                    className="u-tap text-[12.5px] text-ink-body transition-colors hover:text-blue-600"
                  >
                    Remove
                  </button>
                )}
              </div>
              <NumberField
                label="Gross salary per month"
                value={entry.monthlySalary}
                onChange={(next) => update(index, { monthlySalary: next })}
              />
              <NumberField
                label="Months on this salary"
                value={entry.months}
                onChange={(next) => update(index, { months: Math.min(12, next) })}
                prefix={null}
                placeholder="6"
              />
            </div>
          ))}

          {periods.length < 6 && (
            <button
              type="button"
              onClick={() =>
                setPeriods((p) => [...p, { ...BLANK_PERIOD, label: `Period ${p.length + 1}` }])
              }
              className="u-tap self-start rounded-chip border border-line px-4 py-2.5 text-[14px] font-medium text-ink-strong transition-colors hover:border-blue-600 hover:text-blue-600"
            >
              Add another period
            </button>
          )}

          <p
            className={cx(
              'text-[12.5px] leading-[1.5]',
              result.monthsCovered > 12 ? 'text-blue-600' : 'text-ink-body',
            )}
          >
            {result.monthsCovered} of 12 months entered.
            {result.monthsCovered > 12 && ' A tax year only has twelve.'}
          </p>
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label="Tax for the year"
              value={Rs(result.result.incomeTax)}
              note={`On ${Rs(result.grossAnnual)} of salary across ${result.monthsCovered} months.`}
            />

            <div className="mt-7">
              {result.periods.map((entry, index) => (
                <Row
                  key={index}
                  label={entry.label ?? `Period ${index + 1}`}
                  value={Rs(entry.grossForPeriod)}
                  note={`${Rs(entry.monthlySalary)} a month for ${entry.months} ${
                    entry.months === 1 ? 'month' : 'months'
                  }`}
                  tone="muted"
                />
              ))}
              <Row label="Gross for the year" value={Rs(result.grossAnnual)} />
              <Row label="Income tax" value={`- ${Rs(result.result.incomeTax)}`} />
              <Row label="Take-home" value={Rs(result.result.takeHomeAnnual)} tone="total" />
            </div>

            {Math.abs(result.shortfall) > 1 && (
              <div className="mt-6 rounded-chip bg-blue-50 p-5">
                <p className="font-display text-[15px] font-bold text-ink">
                  {result.shortfall > 0
                    ? `You may owe about ${Rs(result.shortfall)} at filing`
                    : `You may be due about ${Rs(Math.abs(result.shortfall))} back`}
                </p>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-ink-body">
                  Each employer withholds under section 149 against a projection of a full
                  year at the salary it pays you. Your employers would have withheld about{' '}
                  {Rs(result.withheldIfEachEmployerActedAlone)} between them, while the year
                  as a whole is taxed {Rs(result.result.incomeTax)}.{' '}
                  {result.shortfall > 0
                    ? 'The difference is settled when you file.'
                    : 'The difference is refundable, but only if you file to claim it.'}
                </p>
              </div>
            )}

            <Working>
              <p>
                A tax year is taxed once, on everything you earned in it. Your employers
                cannot see each other, so each one withholds as though the salary it pays
                were your only income for the whole year. That is why the tax on your
                payslips rarely adds up to the tax on your year.
              </p>
              <p className="mt-3">
                This adds your periods into one annual figure of {Rs(result.grossAnnual)},
                then taxes that figure once against the salary slabs.
              </p>
            </Working>

            <ReliefNote />
          </>
        ) : (
          <AwaitingInput>
            Enter what you earned in each part of the year, and this works out the tax on
            the year as a whole.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}
