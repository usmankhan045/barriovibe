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
  calculateMutualFund,
  calculateSecurities,
  EMPTY_MUTUAL_FUND_INPUT,
  EMPTY_SECURITIES_INPUT,
  MUTUAL_FUND,
  SECURITIES_BANDS,
  type FilerStatus,
  type MutualFundInput,
  type SecuritiesInput,
} from '@/lib/tax/investments';

/**
 * Capital gains on shares and on mutual fund units, section 37A.
 *
 * Both are collected by NCCPL rather than paid directly, so an investor
 * usually meets them as a line on a statement. What both calculators are
 * really for is the question behind that line: which rate applied, and why.
 *
 * The acquisition date is what decides it, and it is asked first on both. A
 * tool that applies today's rate to a holding bought in 2015 invents a tax the
 * statute exempts entirely, and that is the error these are built to avoid.
 */

function ResultPanel({ children }: { children: React.ReactNode }) {
  return <div className="u-tile p-7 md:p-8">{children}</div>;
}

const FILER_OPTIONS: { value: FilerStatus; label: string }[] = [
  { value: 'filer', label: 'Filer' },
  { value: 'non-filer', label: 'Non-filer' },
];

/* ══ Section 37A: shares ═════════════════════════════════════════════════ */

export function SecuritiesGainsCalculator() {
  const [input, setInput] = useState<SecuritiesInput>(EMPTY_SECURITIES_INPUT);

  const result = useMemo(() => calculateSecurities(input), [input]);
  const hasInput = input.salePrice > 0 && input.purchasePrice > 0;

  const set = <K extends keyof SecuritiesInput>(key: K, value: SecuritiesInput[K]) =>
    setInput((previous) => ({ ...previous, [key]: value }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your shares</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Tax on the profit from selling listed securities. Nothing you type here leaves
          your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="sec-band" className="font-display text-[14px] font-bold text-ink">
              When you bought them
            </label>
            <select
              id="sec-band"
              value={input.bandId}
              onChange={(event) => set('bandId', event.target.value)}
              className="w-full rounded-chip border border-line bg-surface px-4 py-3 text-[15px] text-ink transition-colors focus:border-blue-600"
            >
              {SECURITIES_BANDS.map((band) => (
                <option key={band.id} value={band.id}>
                  {band.label}
                </option>
              ))}
            </select>
            <p className="text-[12.5px] leading-[1.5] text-ink-body">
              The acquisition date decides the rate, and for one period the holding period
              decides it too.
            </p>
          </div>

          <NumberField
            label="What you paid"
            value={input.purchasePrice}
            onChange={(v) => set('purchasePrice', v)}
          />
          <NumberField
            label="What you sold for"
            value={input.salePrice}
            onChange={(v) => set('salePrice', v)}
          />
          <ChoiceField
            label="On the Active Taxpayer List"
            value={input.status}
            onChange={(v) => set('status', v)}
            options={FILER_OPTIONS}
          />
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label={result.isLoss ? 'No taxable gain' : 'Capital gains tax'}
              value={Rs(result.tax)}
              note={
                result.isLoss
                  ? 'The sale did not produce a gain, so there is nothing to tax.'
                  : result.rate === 0
                    ? 'This acquisition period is outside the charge entirely.'
                    : `${percent.format(result.rate)} of a ${Rs(result.gain)} gain.`
              }
            />

            <div className="mt-7">
              <Row label="Sale proceeds" value={Rs(input.salePrice)} tone="muted" />
              <Row label="Cost" value={`- ${Rs(input.purchasePrice)}`} tone="muted" />
              <Row label={result.isLoss ? 'Loss' : 'Gain'} value={Rs(Math.abs(result.gain))} />
              {!result.isLoss && (
                <Row
                  label="Capital gains tax"
                  value={`- ${Rs(result.tax)}`}
                  note={result.band.label}
                />
              )}
              <Row label="What you keep" value={Rs(result.netProceeds)} tone="total" />
            </div>

            {!result.isLoss && result.rate > 0 && (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                {input.status === 'filer'
                  ? `Off the Active Taxpayer List this same gain would be taxed ${Rs(
                      result.otherStatusTax,
                    )}, double what you pay.`
                  : `As a filer this would be ${Rs(result.otherStatusTax)}, half what you pay.`}
              </p>
            )}

            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-body">
                The rates by acquisition period
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[400px] text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-line text-ink-body">
                      <th scope="col" className="pb-2 font-medium">Bought</th>
                      <th scope="col" className="pb-2 text-right font-medium">Filer</th>
                      <th scope="col" className="pb-2 text-right font-medium">Non-filer</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    {SECURITIES_BANDS.map((band) => (
                      <tr
                        key={band.id}
                        className={
                          band.id === input.bandId
                            ? 'bg-blue-50'
                            : 'border-b border-line/60 last:border-0'
                        }
                      >
                        <td className="py-2 text-ink-body">{band.label}</td>
                        <td className="py-2 text-right text-ink-body">
                          {percent.format(band.filerRate)}
                        </td>
                        <td className="py-2 text-right font-medium text-ink-strong">
                          {percent.format(band.nonFilerRate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Working>
              <p>
                Shares bought on or after 1 July 2024 are taxed at one flat rate however long
                they were held. Older holdings stay on the regime that applied when they were
                bought, which is why a share bought before 1 July 2013 is outside the charge
                altogether.
              </p>
              <p className="mt-3">
                NCCPL computes and collects this, so it is usually deducted before the money
                reaches you rather than paid separately.
              </p>
            </Working>
          </>
        ) : (
          <AwaitingInput>
            Enter what you paid and what you sold for, and this works out the tax on the
            profit.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}

/* ══ Mutual funds ════════════════════════════════════════════════════════ */

export function MutualFundCalculator() {
  const [input, setInput] = useState<MutualFundInput>(EMPTY_MUTUAL_FUND_INPUT);

  const result = useMemo(() => calculateMutualFund(input), [input]);
  const hasInput = input.redeemed > 0 && input.invested > 0;

  const set = <K extends keyof MutualFundInput>(key: K, value: MutualFundInput[K]) =>
    setInput((previous) => ({ ...previous, [key]: value }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your units</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Tax when you redeem mutual fund units. Nothing you type here leaves your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <NumberField
            label="What you invested"
            value={input.invested}
            onChange={(v) => set('invested', v)}
          />
          <NumberField
            label="What you got back"
            value={input.redeemed}
            onChange={(v) => set('redeemed', v)}
          />
          <ChoiceField
            label="Who holds the units"
            value={input.holder}
            onChange={(v) => set('holder', v)}
            options={[
              { value: 'person', label: 'A person' },
              { value: 'company', label: 'A company' },
            ]}
            hint="Pick company only if the investment is in a registered company's name. Anything held by you personally, or by a partnership, is a person."
          />
          <ChoiceField
            label="What kind of fund"
            value={input.fund}
            onChange={(v) => set('fund', v)}
            options={[
              { value: 'stock', label: 'Stock fund' },
              { value: 'other', label: 'Any other fund' },
            ]}
            hint="Your fund company states this on your account statement."
          />
          <ChoiceField
            label="When you bought the units"
            value={input.acquiredAfterJuly2025 ? 'after' : 'before'}
            onChange={(v) => set('acquiredAfterJuly2025', v === 'after')}
            options={[
              { value: 'after', label: 'On or after 1 Jul 2025' },
              { value: 'before', label: 'Before that' },
            ]}
          />
          <ChoiceField
            label="On the Active Taxpayer List"
            value={input.status}
            onChange={(v) => set('status', v)}
            options={FILER_OPTIONS}
          />
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label={result.isLoss ? 'No taxable gain' : 'Tax on redemption'}
              value={Rs(result.tax)}
              note={
                result.isLoss
                  ? 'You got back less than you put in, so there is nothing to tax.'
                  : `${percent.format(result.rate)} of a ${Rs(result.gain)} gain.`
              }
            />

            <div className="mt-7">
              <Row label="Redeemed" value={Rs(input.redeemed)} tone="muted" />
              <Row label="Invested" value={`- ${Rs(input.invested)}`} tone="muted" />
              <Row label={result.isLoss ? 'Loss' : 'Gain'} value={Rs(Math.abs(result.gain))} />
              {!result.isLoss && <Row label="Tax deducted" value={`- ${Rs(result.tax)}`} />}
              <Row label="What you keep" value={Rs(result.netProceeds)} tone="total" />
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-body">
                The rates
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[340px] text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-line text-ink-body">
                      <th scope="col" className="pb-2 font-medium">Holder</th>
                      <th scope="col" className="pb-2 text-right font-medium">Stock fund</th>
                      <th scope="col" className="pb-2 text-right font-medium">Other fund</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    <tr className="border-b border-line/60">
                      <td className="py-2 text-ink-body">A person</td>
                      <td className="py-2 text-right text-ink-body">
                        {percent.format(MUTUAL_FUND.personRate)}
                      </td>
                      <td className="py-2 text-right text-ink-body">
                        {percent.format(MUTUAL_FUND.personRate)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-ink-body">A company</td>
                      <td className="py-2 text-right text-ink-body">
                        {percent.format(MUTUAL_FUND.companyStockRate)}
                      </td>
                      <td className="py-2 text-right font-medium text-ink-strong">
                        {percent.format(MUTUAL_FUND.companyOtherRate)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Working>
              <p>
                For a person, units bought on or after 1 July 2025 are taxed at{' '}
                {percent.format(MUTUAL_FUND.personRate)} whether the fund is a stock fund or
                not, and how long you held them does not change it.
              </p>
              <p className="mt-3">
                A company is the exception: it pays{' '}
                {percent.format(MUTUAL_FUND.companyOtherRate)} on a fund that is not a stock
                fund. Your fund company deducts this and passes it to NCCPL before paying you.
              </p>
            </Working>
          </>
        ) : (
          <AwaitingInput>
            Enter what you invested and what you got back, and this works out the tax on the
            gain.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}
