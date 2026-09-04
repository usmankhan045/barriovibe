'use client';

import { useMemo, useState } from 'react';
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
  calculateCashWithdrawal,
  calculateItExport,
  CASH_WITHDRAWAL,
  IT_EXPORT_RATES,
} from '@/lib/tax/withholding';

/**
 * The two calculators for tax somebody else collects from you.
 *
 * Both are flat rates, so neither needs a slab walk. What they both need is
 * the filer comparison, which is where the money actually is: the gap between
 * a filer's rate and a non-filer's is the entire argument for filing, and
 * showing it is the most useful thing either page does.
 *
 * As everywhere under /tools, no rate is written here. See lib/tax/withholding.ts.
 */

function ResultPanel({ children }: { children: React.ReactNode }) {
  return <div className="u-tile p-7 md:p-8">{children}</div>;
}

/* ══ IT export receipts, section 154A ════════════════════════════════════ */

export function FreelancerTaxCalculator() {
  const [amount, setAmount] = useState(0);
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [pseb, setPseb] = useState(false);
  const [filer, setFiler] = useState(true);

  const result = useMemo(
    () => calculateItExport({ amount, period, psebRegistered: pseb, filer }),
    [amount, period, pseb, filer],
  );
  const hasInput = result.grossAnnual > 0;
  const perPeriod = (annual: number) => (period === 'monthly' ? annual / 12 : annual);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your export income</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Gross receipts, before any expense. Nothing you type here leaves your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <ChoiceField
            label="Income is stated"
            value={period}
            onChange={setPeriod}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annual', label: 'Annual' },
            ]}
          />
          <NumberField
            label={period === 'monthly' ? 'Gross receipts per month' : 'Gross receipts per year'}
            value={amount}
            onChange={setAmount}
            hint="Section 154A is charged on the receipt itself, so expenses do not come off first."
          />
          <ChoiceField
            label="PSEB registered"
            value={pseb ? 'yes' : 'no'}
            onChange={(v) => setPseb(v === 'yes')}
            options={[
              { value: 'no', label: 'No' },
              { value: 'yes', label: 'Yes' },
            ]}
            hint="Registration with the Pakistan Software Export Board must be active to get the lower rate."
          />
          <ChoiceField
            label="On the Active Taxpayer List"
            value={filer ? 'yes' : 'no'}
            onChange={(v) => setFiler(v === 'yes')}
            options={[
              { value: 'yes', label: 'Filer' },
              { value: 'no', label: 'Non-filer' },
            ]}
          />
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label="Tax your bank deducts"
              value={Rs(perPeriod(result.taxAnnual))}
              note={`${percent.format(result.rate)} of ${Rs(
                perPeriod(result.grossAnnual),
              )}, leaving ${Rs(perPeriod(result.netAnnual))}.`}
            />

            <div className="mt-7">
              <Row label="Gross receipts" value={Rs(perPeriod(result.grossAnnual))} tone="muted" />
              <Row
                label="Section 154A tax"
                value={`- ${Rs(perPeriod(result.taxAnnual))}`}
                note={`At ${percent.format(result.rate)}`}
              />
              <Row label="What reaches you" value={Rs(perPeriod(result.netAnnual))} tone="total" />
            </div>

            {result.annualSaving > 0 && (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                At the best available rate of {percent.format(IT_EXPORT_RATES.psebFiler)} (PSEB
                registered and on the ATL) the same receipts would be taxed{' '}
                {Rs(result.taxAtBestRate)} a year. That is{' '}
                <strong className="font-semibold">{Rs(result.annualSaving)} a year</strong>{' '}
                still on the table.
              </p>
            )}

            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-body">
                The four rates
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[340px] text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-line text-ink-body">
                      <th scope="col" className="pb-2 font-medium">PSEB</th>
                      <th scope="col" className="pb-2 font-medium">Filer</th>
                      <th scope="col" className="pb-2 text-right font-medium">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    {[
                      { pseb: true, filer: true, rate: IT_EXPORT_RATES.psebFiler },
                      { pseb: true, filer: false, rate: IT_EXPORT_RATES.psebNonFiler },
                      { pseb: false, filer: true, rate: IT_EXPORT_RATES.standardFiler },
                      { pseb: false, filer: false, rate: IT_EXPORT_RATES.standardNonFiler },
                    ].map((row) => {
                      const isYours = row.pseb === pseb && row.filer === filer;
                      return (
                        <tr
                          key={`${row.pseb}-${row.filer}`}
                          className={isYours ? 'bg-blue-50' : 'border-b border-line/60 last:border-0'}
                        >
                          <td className="py-2 text-ink-body">{row.pseb ? 'Yes' : 'No'}</td>
                          <td className="py-2 text-ink-body">{row.filer ? 'Yes' : 'No'}</td>
                          <td className="py-2 text-right font-medium text-ink-strong">
                            {percent.format(row.rate)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <Working>
              <p>
                Four rates come out of two yes/no facts: whether your PSEB registration is
                active, and whether you are on the Active Taxpayer List. A PSEB-registered
                filer pays a quarter of one percent; the same person with neither pays eight
                times that.
              </p>
              <p className="mt-3">
                This is a final tax only if you meet every section 154A condition, including
                receiving the payment through a bank in Pakistan and completing your filings.
                It is charged on gross receipts, which is why your costs do not reduce it.
              </p>
            </Working>
          </>
        ) : (
          <AwaitingInput>
            Enter your export receipts and this works out what your bank deducts under
            section 154A.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}

/* ══ Cash withdrawal, section 231AB ══════════════════════════════════════ */

export function CashWithdrawalCalculator() {
  const [amount, setAmount] = useState(0);
  const [filer, setFiler] = useState(false);

  const result = useMemo(() => calculateCashWithdrawal({ amount, filer }), [amount, filer]);
  const hasInput = amount > 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your withdrawal</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Everything you took out in cash on the same day, added together. Nothing you type
          here leaves your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <NumberField
            label="Cash taken out today"
            value={amount}
            onChange={setAmount}
            hint="The day's total across every withdrawal, ATM and card included."
          />
          <ChoiceField
            label="On the Active Taxpayer List"
            value={filer ? 'yes' : 'no'}
            onChange={(v) => setFiler(v === 'yes')}
            options={[
              { value: 'yes', label: 'Filer' },
              { value: 'no', label: 'Non-filer' },
            ]}
            hint="Nothing is deducted from a filer, however much they take out."
          />
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label="What the bank keeps back"
              value={Rs(result.tax)}
              note={
                filer
                  ? 'Nil. Section 231AB does not apply to a filer at any amount.'
                  : result.thresholdPassed
                    ? `${percent.format(
                        CASH_WITHDRAWAL.nonFilerRate,
                      )} of the whole amount, because the day's cash is above ${Rs(
                        CASH_WITHDRAWAL.threshold,
                      )}.`
                    : `Nil. The day's cash has not passed ${Rs(CASH_WITHDRAWAL.threshold)}.`
              }
            />

            <div className="mt-7">
              <Row label="Cash you asked for" value={Rs(result.amount)} tone="muted" />
              <Row label="Deducted by the bank" value={`- ${Rs(result.tax)}`} />
              <Row label="Cash in your hand" value={Rs(result.received)} tone="total" />
            </div>

            {!filer && result.filerSaving > 0 && (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                As a filer this would be <strong className="font-semibold">Rs 0</strong>. File
                your return, get on the Active Taxpayer List, and the deduction stops on
                every withdrawal.
              </p>
            )}

            <Working>
              <p>
                The {Rs(CASH_WITHDRAWAL.threshold)} is a trigger, not a tax-free allowance.
                Once the day&rsquo;s cash passes it, the rate applies to the whole amount you
                withdrew rather than to the part above it. Reading it the other way
                understates the deduction on every withdrawal.
              </p>
              <p className="mt-3">
                It is the day&rsquo;s total that counts, so three withdrawals of Rs 20,000 are
                treated the same as one of Rs 60,000. It is adjustable rather than final: it
                counts towards your income tax for the year, but only a person who files ever
                claims it back.
              </p>
            </Working>
          </>
        ) : (
          <AwaitingInput>
            Enter what you took out in cash today and this shows what your bank deducts
            under section 231AB.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}
