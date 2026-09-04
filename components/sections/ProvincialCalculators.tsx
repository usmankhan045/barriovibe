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
  AGRICULTURE_SLABS,
  calculateAgriculture,
  calculateToken,
  EMPTY_AGRICULTURE_INPUT,
  EMPTY_TOKEN_INPUT,
  PROVINCE_LABELS,
  PUNJAB_AGRICULTURE_DISPUTED,
  SINDH_TOKEN_UNAVAILABLE,
  TOKEN_SCHEDULES,
  type AgricultureInput,
  type Province,
  type TokenInput,
} from '@/lib/tax/provincial';

/**
 * The two provincial calculators.
 *
 * These differ from everything else under /tools in one way that shows on the
 * page: each of them has a province where no figure can honestly be given, and
 * each says so instead of producing one.
 *
 * Sindh publishes no annual token schedule for private cars. Punjab's
 * agricultural rates were set by notification and ruled void by the Assembly
 * in April 2026. In both cases a plausible number is available from secondary
 * sites, and in both cases printing it would be worse than printing nothing:
 * a visitor cannot tell a sourced figure from an invented one, and these are
 * exactly the pages where they would budget against it.
 *
 * The unavailable states below are therefore a feature of these calculators
 * rather than a gap in them, and lib/tax/provincial.ts has assertions that
 * fail the build if either province quietly acquires a schedule.
 */

function ResultPanel({ children }: { children: React.ReactNode }) {
  return <div className="u-tile p-7 md:p-8">{children}</div>;
}

/** The panel shown where a province publishes nothing that can be applied. */
function Unavailable({
  title,
  reason,
  action,
}: {
  title: string;
  reason: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[220px] flex-col justify-center">
      <p className="font-display text-h3 text-ink">{title}</p>
      <p className="mt-4 text-[14.5px] leading-[1.65] text-ink-body">{reason}</p>
      <div className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
        {action}
      </div>
    </div>
  );
}

const PROVINCES = Object.keys(PROVINCE_LABELS) as Province[];

/* ══ Vehicle token tax ═══════════════════════════════════════════════════ */

export function TokenTaxCalculator() {
  const [input, setInput] = useState<TokenInput>(EMPTY_TOKEN_INPUT);

  const result = useMemo(() => calculateToken(input), [input]);
  const hasInput = input.engineCc > 0;

  const set = <K extends keyof TokenInput>(key: K, value: TokenInput[K]) =>
    setInput((previous) => ({ ...previous, [key]: value }));

  const schedule = input.province === 'sindh' ? null : TOKEN_SCHEDULES[input.province];
  const needsPrice = schedule?.bands.some((b) => b.kind === 'percent') ?? false;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your vehicle</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Yearly token tax, which your province sets, plus the federal tax collected with
          it. Nothing you type here leaves your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="token-province" className="font-display text-[14px] font-bold text-ink">
              Where it is registered
            </label>
            <select
              id="token-province"
              value={input.province}
              onChange={(event) => set('province', event.target.value as Province)}
              className="w-full rounded-chip border border-line bg-surface px-4 py-3 text-[15px] text-ink transition-colors focus:border-blue-600"
            >
              {PROVINCES.map((province) => (
                <option key={province} value={province}>
                  {PROVINCE_LABELS[province]}
                </option>
              ))}
            </select>
            <p className="text-[12.5px] leading-[1.5] text-ink-body">
              Token tax is set by each province separately, so the same car costs different
              amounts in different places.
            </p>
          </div>

          <NumberField
            label="Engine capacity"
            value={input.engineCc}
            onChange={(v) => set('engineCc', v)}
            prefix={null}
            placeholder="1300"
            hint="In cc, as printed in your registration book."
          />

          {needsPrice && (
            <NumberField
              label="Invoice price"
              value={input.invoicePrice}
              onChange={(v) => set('invoicePrice', v)}
              hint="Some bands are charged as a percentage of the invoice price rather than a flat amount."
            />
          )}

          <ChoiceField
            label="On the Active Taxpayer List"
            value={input.filer ? 'yes' : 'no'}
            onChange={(v) => set('filer', v === 'yes')}
            options={[
              { value: 'yes', label: 'Filer' },
              { value: 'no', label: 'Non-filer' },
            ]}
            hint="Only the federal half doubles for a non-filer. The provincial token is the same either way."
          />

          {schedule?.earlyPayment && (
            <ChoiceField
              label={`Paying the full year by ${schedule.earlyPayment.by}`}
              value={input.payingEarly ? 'yes' : 'no'}
              onChange={(v) => set('payingEarly', v === 'yes')}
              options={[
                { value: 'no', label: 'No' },
                { value: 'yes', label: 'Yes' },
              ]}
              hint={`${PROVINCE_LABELS[input.province]} takes ${percent.format(
                schedule.earlyPayment.rate,
              )} off the yearly token for paying early.`}
            />
          )}
        </div>
      </div>

      <ResultPanel>
        {!hasInput ? (
          <AwaitingInput>
            Enter your engine capacity and this works out the token tax for your province.
          </AwaitingInput>
        ) : !result.available ? (
          <Unavailable
            title="Sindh does not publish a rate table"
            reason={SINDH_TOKEN_UNAVAILABLE.reason}
            action={
              <>
                The federal half is still knowable, because the Ordinance rather than the
                province sets it: for your engine size it is{' '}
                <strong className="font-semibold">{Rs(result.federal)}</strong> a year. For the
                provincial half, use{' '}
                <a
                  href={SINDH_TOKEN_UNAVAILABLE.officialTool}
                  className="u-tap font-medium text-blue-600 hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Sindh Excise&rsquo;s own calculator
                </a>
                , which is the authority on it.
              </>
            }
          />
        ) : (
          <>
            <Headline
              label={result.isLifetime ? 'Lifetime token, paid once' : 'Token tax for the year'}
              value={Rs(result.total)}
              note={`${PROVINCE_LABELS[input.province]}, ${result.bandLabel}.`}
            />

            <div className="mt-7">
              <Row
                label={`${PROVINCE_LABELS[input.province]} token`}
                value={Rs(result.provincialGross)}
                note={result.isLifetime ? 'A one-off payment, not a yearly one' : undefined}
              />
              {result.discount > 0 && (
                <Row
                  label="Early-payment discount"
                  value={`- ${Rs(result.discount)}`}
                  note={`${percent.format(
                    result.schedule?.earlyPayment?.rate ?? 0,
                  )} for paying by ${result.schedule?.earlyPayment?.by}`}
                />
              )}
              <Row
                label="Federal tax, section 234"
                value={Rs(result.federal)}
                note={`${result.federalBandLabel}${input.filer ? '' : ', doubled for a non-filer'}`}
              />
              <Row label="Total" value={Rs(result.total)} tone="total" />
            </div>

            {result.isLifetime && (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                This band is a lifetime token: it is paid once rather than every year. The
                federal section 234 tax above is still yearly.
              </p>
            )}

            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-body">
                {PROVINCE_LABELS[input.province]} token rates
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[320px] text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-line text-ink-body">
                      <th scope="col" className="pb-2 font-medium">Engine</th>
                      <th scope="col" className="pb-2 text-right font-medium">Token</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    {result.schedule?.bands.map((band) => (
                      <tr
                        key={band.label}
                        className={
                          band.label === result.bandLabel
                            ? 'bg-blue-50'
                            : 'border-b border-line/60 last:border-0'
                        }
                      >
                        <td className="py-2 text-ink-body">{band.label}</td>
                        <td className="py-2 text-right font-medium text-ink-strong">
                          {band.kind === 'percent'
                            ? `${percent.format(band.rate)} of value`
                            : band.kind === 'lifetime'
                              ? `${Rs(band.amount)} lifetime`
                              : `${Rs(band.amount)} a year`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[12.5px] leading-[1.5] text-ink-body">
                Source: {result.schedule?.source}. Set under the {result.schedule?.authority}.
              </p>
            </div>

            <Working>
              <p>
                A token bill is two taxes collected together. The provincial token is set by{' '}
                {PROVINCE_LABELS[input.province]} and the section 234 tax is federal, which is
                why the total is larger than the provincial rate table alone.
              </p>
              {result.schedule?.notes.map((note) => (
                <p key={note} className="mt-3">
                  {note}
                </p>
              ))}
            </Working>
          </>
        )}
      </ResultPanel>
    </div>
  );
}

/* ══ Agricultural income tax ═════════════════════════════════════════════ */

export function AgricultureTaxCalculator() {
  const [input, setInput] = useState<AgricultureInput>(EMPTY_AGRICULTURE_INPUT);

  const result = useMemo(() => calculateAgriculture(input), [input]);
  const hasInput = input.annualIncome > 0;

  const set = <K extends keyof AgricultureInput>(key: K, value: AgricultureInput[K]) =>
    setInput((previous) => ({ ...previous, [key]: value }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your farm income</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Agriculture is taxed by your province, not by FBR. Nothing you type here leaves
          your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="agri-province" className="font-display text-[14px] font-bold text-ink">
              Where the land is
            </label>
            <select
              id="agri-province"
              value={input.province}
              onChange={(event) => set('province', event.target.value as Province)}
              className="w-full rounded-chip border border-line bg-surface px-4 py-3 text-[15px] text-ink transition-colors focus:border-blue-600"
            >
              {PROVINCES.filter((p) => p !== 'ict').map((province) => (
                <option key={province} value={province}>
                  {PROVINCE_LABELS[province]}
                </option>
              ))}
            </select>
            <p className="text-[12.5px] leading-[1.5] text-ink-body">
              Sindh, KP and Balochistan each legislated the same income-slab table in 2025.
              Punjab&rsquo;s position is different.
            </p>
          </div>

          <NumberField
            label="Agricultural income for the year"
            value={input.annualIncome}
            onChange={(v) => set('annualIncome', v)}
            hint="Income from the land after the expenses of producing it."
          />
          <ChoiceField
            label="Who is being taxed"
            value={input.taxpayer}
            onChange={(v) => set('taxpayer', v)}
            options={[
              { value: 'individual', label: 'A person' },
              { value: 'small-company', label: 'Small company' },
              { value: 'company', label: 'Company' },
            ]}
          />
        </div>
      </div>

      <ResultPanel>
        {!hasInput ? (
          <AwaitingInput>
            Enter your agricultural income for the year and this works out the provincial tax
            on it.
          </AwaitingInput>
        ) : !result.available ? (
          <Unavailable
            title="Punjab&rsquo;s rates are in dispute"
            reason={PUNJAB_AGRICULTURE_DISPUTED.reason}
            action={
              <>
                We are not printing a Punjab figure while that stands, because it would be a
                number computed under a notification a legislature has declared void. The{' '}
                {PUNJAB_AGRICULTURE_DISPUTED.contact} is the authority to ask. Punjab also
                keeps the greater-of rule between the per-acre land tax and the income tax,
                so both have to be worked out before either is owed.
              </>
            }
          />
        ) : (
          <>
            <Headline
              label="Provincial agricultural tax"
              value={Rs(result.tax)}
              note={`An effective rate of ${percent.format(result.effectiveRate)} on ${Rs(
                result.income,
              )}.`}
            />

            <div className="mt-7">
              <Row label="Agricultural income" value={Rs(result.income)} tone="muted" />
              <Row
                label="Tax"
                value={Rs(result.tax)}
                note={
                  input.taxpayer === 'individual'
                    ? 'Charged in bands on the income'
                    : `A flat ${percent.format(result.rate)} for a company`
                }
              />
              <Row label="Left after tax" value={Rs(result.afterTax)} tone="total" />
            </div>

            <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
              <strong className="font-semibold">Per-acre land tax:</strong>{' '}
              {result.landTax.note}
            </p>

            {result.rows.length > 0 && (
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-body">
                  Band by band
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
                      {result.rows.map((row) => (
                        <tr key={row.from} className="border-b border-line/60 last:border-0">
                          <td className="py-2 text-ink-body">
                            {row.to === null ? `Above ${Rs(row.from)}` : `${Rs(row.from)} to ${Rs(row.to)}`}
                          </td>
                          <td className="py-2 text-right text-ink-body">{percent.format(row.rate)}</td>
                          <td className="py-2 text-right font-medium text-ink-strong">{Rs(row.tax)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <Working>
              <p>
                Agriculture is a provincial subject, so this tax is charged by{' '}
                {PROVINCE_LABELS[input.province]} rather than by FBR, and it is separate from
                federal income tax on any other income you have.
              </p>
              <p className="mt-3">
                Sindh, KP and Balochistan each replaced their older area-based regimes with
                this income-slab table in 2025, effective 1 January of that year. The three
                enacted the same figures, which is why the answer here does not change between
                them, though what happened to their per-acre land taxes does.
              </p>
              <p className="mt-3">
                The bands are the same figures as the federal non-salaried table, running from
                nothing on the first {Rs(AGRICULTURE_SLABS[0]!.upTo!)} to{' '}
                {percent.format(AGRICULTURE_SLABS.at(-1)!.rate)} above{' '}
                {Rs(AGRICULTURE_SLABS.at(-2)!.upTo!)}.
              </p>
            </Working>
          </>
        )}
      </ResultPanel>
    </div>
  );
}
