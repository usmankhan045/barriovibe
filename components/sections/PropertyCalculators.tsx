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
  calculatePropertyGain,
  calculateRent,
  CGT_HOLDING_TABLE,
  CGT_NON_FILER_FLOOR,
  EMPTY_GAIN_INPUT,
  EMPTY_RENT_INPUT,
  PURCHASE_TAX,
  purchaseTax,
  RENT,
  SALE_TAX,
  saleTax,
  type FilerStatus,
  type PropertyGainInput,
  type PropertyKind,
  type RentInput,
} from '@/lib/tax/property';

/**
 * The four property calculators.
 *
 * They share a file because a single transaction can attract several of these
 * at once, and each panel points at the neighbour a reader is likely to need
 * next: a seller pays 236C on the transfer AND capital gains tax on the
 * profit, and the first is creditable against the second.
 *
 * ## The valuation caveat, stated on every one of them
 *
 * Both advance taxes are charged on the higher of the price agreed and the
 * FBR-notified value for the area, and those tables are published per city and
 * per locality. Nothing here reproduces them. Each calculator asks for the
 * value to use and says plainly that the notified figure may be higher than
 * the price, because quietly assuming the price would understate every figure
 * that follows on exactly the transactions where it matters most.
 */

function ResultPanel({ children }: { children: React.ReactNode }) {
  return <div className="u-tile p-7 md:p-8">{children}</div>;
}

const FILER_OPTIONS: { value: FilerStatus; label: string }[] = [
  { value: 'filer', label: 'Filer' },
  { value: 'non-filer', label: 'Non-filer' },
];

/** The note every transfer calculator carries about FBR's valuation tables. */
function ValuationNote() {
  return (
    <p className="mt-7 border-t border-line pt-5 text-[13px] leading-[1.6] text-ink-body">
      The tax falls on the higher of the price agreed and the FBR-notified value for the
      area, which is published per city and per locality. If the notified value is above
      your price, enter that instead: it is the figure the registrar will use.
    </p>
  );
}

/* ══ Section 236K: buying ════════════════════════════════════════════════ */

export function PropertyPurchaseCalculator() {
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState<FilerStatus>('filer');

  const result = useMemo(() => purchaseTax({ value, status }), [value, status]);
  const hasInput = value > 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">The purchase</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Advance tax the buyer pays under section 236K. Nothing you type here leaves your
          browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <NumberField
            label="Value of the property"
            value={value}
            onChange={setValue}
            hint="The higher of the price agreed and the FBR-notified value for the area."
          />
          <ChoiceField
            label="On the Active Taxpayer List"
            value={status}
            onChange={setStatus}
            options={FILER_OPTIONS}
            hint="There is no separate late-filer tier this year: it existed only for tax years 2025 and 2026."
          />
        </div>

        <ValuationNote />
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label="Advance tax on purchase"
              value={Rs(result.tax)}
              note={`${percent.format(result.rate)} of ${Rs(result.value)}.`}
            />

            <div className="mt-7">
              <Row label="Value used" value={Rs(result.value)} tone="muted" />
              <Row label="Section 236K" value={Rs(result.tax)} tone="total" />
            </div>

            {status === 'filer' ? (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                Off the Active Taxpayer List this same purchase would cost{' '}
                <strong className="font-semibold">{Rs(result.otherStatusTax)}</strong>. Filing is
                worth {Rs(result.filerSaving)} on this transaction alone.
              </p>
            ) : (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                As a filer this would be{' '}
                <strong className="font-semibold">{Rs(result.otherStatusTax)}</strong>, a saving of{' '}
                {Rs(result.filerSaving)} on this purchase.
              </p>
            )}

            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-body">
                The rates
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[340px] text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-line text-ink-body">
                      <th scope="col" className="pb-2 font-medium">Value</th>
                      <th scope="col" className="pb-2 text-right font-medium">Filer</th>
                      <th scope="col" className="pb-2 text-right font-medium">Non-filer</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    {PURCHASE_TAX.nonFilerBands.map((band) => (
                      <tr key={String(band.upTo)} className="border-b border-line/60 last:border-0">
                        <td className="py-2 text-ink-body">
                          {band.upTo === null ? 'Above Rs 100m' : `Up to ${Rs(band.upTo)}`}
                        </td>
                        <td className="py-2 text-right text-ink-body">
                          {percent.format(PURCHASE_TAX.filerRate)}
                        </td>
                        <td className="py-2 text-right font-medium text-ink-strong">
                          {percent.format(band.rate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Working>
              <p>
                A filer pays {percent.format(PURCHASE_TAX.filerRate)} whatever the property is
                worth: the value bands that used to apply to filers were removed for this tax
                year. A non-filer is still banded, and steeply.
              </p>
              <p className="mt-3">
                There is no allowance to subtract first. The rate falls on the whole value,
                which is the higher of what you paid and what FBR has notified for the area.
              </p>
            </Working>
          </>
        ) : (
          <AwaitingInput>
            Enter what the property is worth and this works out the advance tax you pay as
            the buyer.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}

/* ══ Section 236C: selling ═══════════════════════════════════════════════ */

export function PropertySaleCalculator() {
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState<FilerStatus>('filer');

  const result = useMemo(() => saleTax({ value, status }), [value, status]);
  const hasInput = value > 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">The sale</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Advance tax deducted from the seller under section 236C. Nothing you type here
          leaves your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <NumberField
            label="Value of the property"
            value={value}
            onChange={setValue}
            hint="The higher of the price agreed and the FBR-notified value for the area."
          />
          <ChoiceField
            label="On the Active Taxpayer List"
            value={status}
            onChange={setStatus}
            options={FILER_OPTIONS}
          />
        </div>

        <ValuationNote />

        <p className="mt-5 text-[13px] leading-[1.6] text-ink-body">
          This is advance tax on the whole transfer value, not tax on your profit. The tax
          on the profit is separate.{' '}
          <Link
            href="/tools/property-capital-gains"
            className="u-tap font-medium text-blue-600 hover:underline"
          >
            Work out the capital gains tax
          </Link>
          .
        </p>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label="Advance tax on sale"
              value={Rs(result.tax)}
              note={`${percent.format(result.rate)} of ${Rs(result.value)}.`}
            />

            <div className="mt-7">
              <Row label="Value used" value={Rs(result.value)} tone="muted" />
              <Row label="Section 236C" value={Rs(result.tax)} tone="total" />
            </div>

            <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
              {status === 'filer'
                ? `Off the Active Taxpayer List this would be ${Rs(
                    result.otherStatusTax,
                  )}, so filing is worth ${Rs(result.filerSaving)} on this sale.`
                : `As a filer this would be ${Rs(result.otherStatusTax)}, a saving of ${Rs(
                    result.filerSaving,
                  )} on this sale.`}
            </p>

            <Working>
              <p>
                Both rates are flat at every value: unlike section 236K on the buyer&rsquo;s
                side, the non-filer rate here is not banded. A filer pays{' '}
                {percent.format(SALE_TAX.filerRate)} and a non-filer{' '}
                {percent.format(SALE_TAX.nonFilerRate)}, whatever the property is worth.
              </p>
              <p className="mt-3">
                It falls on the whole transfer value rather than on your gain, which is why a
                sale that made a loss still attracts it. It is advance tax, so it is
                creditable against the capital gains tax on the same sale.
              </p>
            </Working>
          </>
        ) : (
          <AwaitingInput>
            Enter what the property sold for and this works out the advance tax deducted
            from you as the seller.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}

/* ══ Section 37: the gain on a property sale ═════════════════════════════ */

const PROPERTY_KINDS: { value: PropertyKind; label: string }[] = [
  { value: 'open-plot', label: 'Open plot' },
  { value: 'constructed', label: 'Constructed' },
  { value: 'flat', label: 'Flat' },
];

export function PropertyGainsCalculator() {
  const [input, setInput] = useState<PropertyGainInput>(EMPTY_GAIN_INPUT);

  const result = useMemo(() => calculatePropertyGain(input), [input]);
  const hasInput = input.salePrice > 0 && input.purchasePrice > 0;

  const set = <K extends keyof PropertyGainInput>(key: K, value: PropertyGainInput[K]) =>
    setInput((previous) => ({ ...previous, [key]: value }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">The property</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Tax on the profit from a sale. Nothing you type here leaves your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <ChoiceField
            label="When did you buy it"
            value={input.acquiredAfterJuly2024 ? 'after' : 'before'}
            onChange={(v) => set('acquiredAfterJuly2024', v === 'after')}
            options={[
              { value: 'after', label: 'On or after 1 Jul 2024' },
              { value: 'before', label: 'Before that' },
            ]}
            hint="This is the question that decides everything else: purchases from 1 July 2024 are on one flat rate, older ones on a holding-period table."
          />
          <NumberField
            label="What you paid"
            value={input.purchasePrice}
            onChange={(v) => set('purchasePrice', v)}
          />
          <NumberField
            label="What you sold it for"
            value={input.salePrice}
            onChange={(v) => set('salePrice', v)}
          />
          <NumberField
            label="Costs of purchase, improvement and sale"
            value={input.costs}
            onChange={(v) => set('costs', v)}
            hint="Documented costs only. They come off the gain."
          />

          {!input.acquiredAfterJuly2024 && (
            <>
              <NumberField
                label="Years you owned it"
                value={input.yearsHeld}
                onChange={(v) => set('yearsHeld', v)}
                prefix={null}
                placeholder="2"
              />
              <ChoiceField
                label="What kind of property"
                value={input.kind}
                onChange={(v) => set('kind', v)}
                options={PROPERTY_KINDS}
                hint="The old table treats plots, constructed property and flats differently."
              />
            </>
          )}

          <ChoiceField
            label="On the Active Taxpayer List"
            value={input.status}
            onChange={(v) => set('status', v)}
            options={FILER_OPTIONS}
          />
          <NumberField
            label="Section 236C already deducted"
            value={input.advanceTaxPaid}
            onChange={(v) => set('advanceTaxPaid', v)}
            hint="Advance tax collected on the transfer. It is creditable against the tax below."
          />
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label={result.isLoss ? 'No taxable gain' : 'Capital gains tax'}
              value={result.isLoss ? Rs(0) : Rs(result.tax)}
              note={
                result.isLoss
                  ? 'The sale did not produce a gain, so there is nothing to tax.'
                  : result.isNonFilerRange
                    ? `At least ${percent.format(
                        CGT_NON_FILER_FLOOR,
                      )} of the gain. A non-filer is charged at the ordinary slab rates with this as the floor.`
                    : `${percent.format(result.rate)} of a ${Rs(result.gain)} gain.`
              }
            />

            <div className="mt-7">
              <Row label="Sale price" value={Rs(input.salePrice)} tone="muted" />
              <Row label="Purchase price" value={`- ${Rs(input.purchasePrice)}`} tone="muted" />
              {input.costs > 0 && <Row label="Costs" value={`- ${Rs(input.costs)}`} tone="muted" />}
              <Row label={result.isLoss ? 'Loss' : 'Gain'} value={Rs(Math.abs(result.gain))} />
              {!result.isLoss && (
                <Row
                  label="Capital gains tax"
                  value={Rs(result.tax)}
                  note={
                    result.regime === 'flat'
                      ? 'Flat rate, bought on or after 1 July 2024'
                      : (result.bandLabel ?? undefined)
                  }
                />
              )}
              {input.advanceTaxPaid > 0 && (
                <Row label="Section 236C already paid" value={`- ${Rs(result.advanceTaxPaid)}`} />
              )}
              <Row
                label={result.balance >= 0 ? 'Left to pay' : 'Over-collected'}
                value={Rs(Math.abs(result.balance))}
                tone="total"
              />
            </div>

            {result.isNonFilerRange && (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                A non-filer is not given the flat rate. The charge is at the ordinary
                non-salaried slab rates, never less than{' '}
                {percent.format(CGT_NON_FILER_FLOOR)} of the gain, so the figure lies between{' '}
                <strong className="font-semibold">{Rs(result.tax)}</strong> and{' '}
                <strong className="font-semibold">{Rs(result.taxAtTopSlab)}</strong> depending
                on your other income for the year. Only your full return settles which.
              </p>
            )}

            {result.balance < 0 && (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                The advance tax collected on the transfer is more than the tax on the gain.
                The difference is claimed on your return, not refunded automatically.
              </p>
            )}

            <Working>
              {result.regime === 'flat' ? (
                <p>
                  You bought on or after 1 July 2024, so the time you held the property does
                  not change the rate. A filer pays a flat{' '}
                  {percent.format(0.15)} of the gain however long they owned it.
                </p>
              ) : (
                <p>
                  You bought before 1 July 2024, so the old holding-period table still governs
                  this sale in every later tax year. Yours falls in the band &ldquo;
                  {result.bandLabel}&rdquo;, which for this property type is{' '}
                  {percent.format(result.rate)}.
                </p>
              )}
              <p className="mt-3">
                Section 236C collected on the transfer is advance tax, not a separate charge,
                so it comes off the figure above rather than adding to it.
              </p>
            </Working>

            {!input.acquiredAfterJuly2024 && (
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-body">
                  The table for older purchases
                </p>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[400px] text-left text-[13.5px]">
                    <thead>
                      <tr className="border-b border-line text-ink-body">
                        <th scope="col" className="pb-2 font-medium">Held for</th>
                        <th scope="col" className="pb-2 text-right font-medium">Plot</th>
                        <th scope="col" className="pb-2 text-right font-medium">Constructed</th>
                        <th scope="col" className="pb-2 text-right font-medium">Flat</th>
                      </tr>
                    </thead>
                    <tbody className="tabular-nums">
                      {CGT_HOLDING_TABLE.map((band) => (
                        <tr key={band.label} className="border-b border-line/60 last:border-0">
                          <td className="py-2 text-ink-body">{band.label}</td>
                          <td className="py-2 text-right text-ink-body">
                            {percent.format(band.rates['open-plot'])}
                          </td>
                          <td className="py-2 text-right text-ink-body">
                            {percent.format(band.rates.constructed)}
                          </td>
                          <td className="py-2 text-right text-ink-body">
                            {percent.format(band.rates.flat)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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

/* ══ Section 155: rental income ══════════════════════════════════════════ */

export function RentalIncomeCalculator() {
  const [input, setInput] = useState<RentInput>(EMPTY_RENT_INPUT);
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');

  const annualRent = period === 'monthly' ? input.annualRent * 12 : input.annualRent;
  const result = useMemo(
    () => calculateRent({ ...input, annualRent }),
    [input, annualRent],
  );
  const hasInput = annualRent > 0;
  const perPeriod = (a: number) => (period === 'monthly' ? a / 12 : a);

  const set = <K extends keyof RentInput>(key: K, value: RentInput[K]) =>
    setInput((previous) => ({ ...previous, [key]: value }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your rent</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Tax your tenant withholds under section 155. Nothing you type here leaves your
          browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <ChoiceField
            label="Rent is stated"
            value={period}
            onChange={setPeriod}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annual', label: 'Annual' },
            ]}
          />
          <NumberField
            label={period === 'monthly' ? 'Rent per month' : 'Rent for the year'}
            value={input.annualRent}
            onChange={(v) => set('annualRent', v)}
          />
          <ChoiceField
            label="Who owns the property"
            value={input.landlord}
            onChange={(v) => set('landlord', v)}
            options={[
              { value: 'individual', label: 'A person' },
              { value: 'company', label: 'A company' },
            ]}
            hint="A company pays a flat rate rather than the progressive bands."
          />
          <ChoiceField
            label="On the Active Taxpayer List"
            value={input.status}
            onChange={(v) => set('status', v)}
            options={FILER_OPTIONS}
            hint="A non-filer is withheld at exactly double, at every band."
          />
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label="Tax withheld from your rent"
              value={Rs(perPeriod(result.tax))}
              note={`An effective rate of ${percent.format(result.effectiveRate)} on ${Rs(
                perPeriod(result.annualRent),
              )}.`}
            />

            <div className="mt-7">
              <Row label="Rent" value={Rs(perPeriod(result.annualRent))} tone="muted" />
              <Row label="Section 155 tax" value={`- ${Rs(perPeriod(result.tax))}`} />
              <Row label="What reaches you" value={Rs(perPeriod(result.netAnnual))} tone="total" />
            </div>

            <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
              {input.status === 'filer'
                ? `Off the Active Taxpayer List this would be ${Rs(
                    perPeriod(result.otherStatusTax),
                  )}, exactly double. Filing is worth ${Rs(perPeriod(result.filerSaving))} a ${
                    period === 'monthly' ? 'month' : 'year'
                  }.`
                : `As a filer this would be ${Rs(
                    perPeriod(result.otherStatusTax),
                  )}, half what you are being withheld.`}
            </p>

            {result.belowIndividualTenantThreshold && input.landlord === 'individual' && (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                A private tenant only has to withhold once the rent they pay you reaches{' '}
                {Rs(RENT.individualTenantThreshold)} in a year. Below that, a family renting
                from you deducts nothing, though the rent is still taxable and still goes on
                your return. A company or government tenant withholds from the first rupee.
              </p>
            )}

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
                Rent paid to one owner, or to two or more owners together, is taxed in steps
                on the rent for the whole year. Each step only applies to the rent inside it,
                so the first {Rs(300_000)} always has nothing taken out.
              </p>
              <p className="mt-3">
                This is tax withheld rather than tax finally due. It is adjustable against
                your liability for the year, and if your other circumstances make the final
                figure lower, the difference is claimed on your return.
              </p>
            </Working>
          </>
        ) : (
          <AwaitingInput>
            Enter the rent and this works out what your tenant withholds under section 155.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}
