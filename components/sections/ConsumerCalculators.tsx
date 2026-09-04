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
  calculateElectricity,
  calculateTelecom,
  ELECTRICITY,
  TELECOM,
  type MeterKind,
  type TelecomKind,
} from '@/lib/tax/withholding';
import {
  calculateVehicle,
  EMPTY_VEHICLE_INPUT,
  REGISTRATION_BANDS,
  TRANSFER_BANDS,
  VEHICLE,
  type FilerStatus,
  type VehicleInput,
} from '@/lib/tax/vehicle';

/**
 * Three taxes people pay without ever filing anything: on a vehicle, on an
 * electricity bill and on a phone bill.
 *
 * All three are collected by somebody else and all three are adjustable
 * against the year's liability, which is the point each page makes: the money
 * is not lost, but nobody claims it for you.
 */

function ResultPanel({ children }: { children: React.ReactNode }) {
  return <div className="u-tile p-7 md:p-8">{children}</div>;
}

/* ══ Section 231B: vehicles ══════════════════════════════════════════════ */

export function VehicleTaxCalculator() {
  const [input, setInput] = useState<VehicleInput>(EMPTY_VEHICLE_INPUT);

  const result = useMemo(() => calculateVehicle(input), [input]);
  const isRegistration = input.transaction === 'registration';
  const hasInput = isRegistration ? input.value > 0 : input.engineCc > 0;

  const set = <K extends keyof VehicleInput>(key: K, value: VehicleInput[K]) =>
    setInput((previous) => ({ ...previous, [key]: value }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your vehicle</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Advance tax under section 231B. Nothing you type here leaves your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <ChoiceField
            label="What are you doing"
            value={input.transaction}
            onChange={(v) => set('transaction', v)}
            options={[
              { value: 'registration', label: 'Registering' },
              { value: 'transfer', label: 'Transferring' },
            ]}
            hint="Registering is charged as a percentage of the value. Transferring an already-registered vehicle is a fixed amount that falls with age. They are different charges."
          />
          <NumberField
            label="Engine capacity"
            value={input.engineCc}
            onChange={(v) => set('engineCc', v)}
            prefix={null}
            placeholder="1300"
            hint="In cc, as printed in the registration book. Leave at zero for an electric vehicle with no rating."
          />

          {isRegistration ? (
            <NumberField
              label="Value of the vehicle"
              value={input.value}
              onChange={(v) => set('value', v)}
              hint="Imported: customs value plus duty, excise and sales tax. Locally made: invoice value inclusive of all duties and taxes."
            />
          ) : (
            <NumberField
              label="Years since first registered"
              value={input.yearsSinceRegistration}
              onChange={(v) => set('yearsSinceRegistration', v)}
              prefix={null}
              placeholder="0"
              hint="The transfer charge falls by a tenth for each year, reaching nil at ten."
            />
          )}

          <ChoiceField
            label="On the Active Taxpayer List"
            value={input.status}
            onChange={(v) => set('status', v)}
            options={[
              { value: 'filer', label: 'Filer' },
              { value: 'non-filer', label: 'Non-filer' },
            ] as { value: FilerStatus; label: string }[]}
            hint="A non-filer pays three times as much here, not twice."
          />
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label={isRegistration ? 'Advance tax on registration' : 'Advance tax on transfer'}
              value={Rs(result.tax)}
              note={
                isRegistration
                  ? `${percent.format(result.rate)} of ${Rs(input.value)}, for the ${result.bandLabel} band.`
                  : `A fixed amount for the ${result.bandLabel} band${
                      result.reduction > 0
                        ? `, less ${percent.format(result.reduction)} for the vehicle's age`
                        : ''
                    }.`
              }
            />

            <div className="mt-7">
              <Row label="Band" value={result.bandLabel} tone="muted" />
              {isRegistration && <Row label="Value" value={Rs(input.value)} tone="muted" />}
              {!isRegistration && result.reduction > 0 && (
                <>
                  <Row label="Charge when new" value={Rs(result.grossTax)} tone="muted" />
                  <Row
                    label="Reduction for age"
                    value={`- ${Rs(result.grossTax - result.tax)}`}
                    note={`${percent.format(result.reduction)} off, at a tenth per year`}
                  />
                </>
              )}
              <Row label="Section 231B" value={Rs(result.tax)} tone="total" />
            </div>

            <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
              {input.status === 'filer'
                ? `Off the Active Taxpayer List this would be ${Rs(
                    result.otherStatusTax,
                  )}, three times as much. Filing is worth ${Rs(result.filerSaving)} on this alone.`
                : `As a filer this would be ${Rs(
                    result.otherStatusTax,
                  )}, a third of what you pay. The gap is ${Rs(result.filerSaving)}.`}
            </p>

            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-body">
                {isRegistration ? 'Registration rates' : 'Transfer amounts'}
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[340px] text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-line text-ink-body">
                      <th scope="col" className="pb-2 font-medium">Engine</th>
                      <th scope="col" className="pb-2 text-right font-medium">Filer</th>
                      <th scope="col" className="pb-2 text-right font-medium">Non-filer</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    {isRegistration
                      ? REGISTRATION_BANDS.map((band) => (
                          <tr
                            key={band.label}
                            className={
                              band.label === result.bandLabel
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
                        ))
                      : TRANSFER_BANDS.map((band) => (
                          <tr
                            key={band.label}
                            className={
                              band.label === result.bandLabel
                                ? 'bg-blue-50'
                                : 'border-b border-line/60 last:border-0'
                            }
                          >
                            <td className="py-2 text-ink-body">{band.label}</td>
                            <td className="py-2 text-right text-ink-body">{Rs(band.filer)}</td>
                            <td className="py-2 text-right font-medium text-ink-strong">
                              {Rs(band.nonFiler)}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Working>
              {isRegistration ? (
                <p>
                  Registering a vehicle is charged as a percentage of its value, by engine
                  capacity band. Value has a statutory meaning here: for an imported vehicle it
                  is the customs assessed value plus duty, federal excise and sales tax, and
                  for a locally made one the invoice value inclusive of all duties and taxes.
                </p>
              ) : (
                <p>
                  Transferring an already-registered vehicle is a fixed amount rather than a
                  percentage, so the value of the car does not enter it. The amount falls by a
                  tenth for each year since the vehicle was first registered in Pakistan, and
                  reaches nil at {VEHICLE.usedReductionYearsToNil} years.
                </p>
              )}
              <p className="mt-3">
                A person off the Active Taxpayer List pays three times the filer figure here.
                Most withholding rates double for a non-filer; this one trebles.
              </p>
            </Working>
          </>
        ) : (
          <AwaitingInput>
            {isRegistration
              ? 'Enter the engine capacity and the value, and this works out the advance tax on registering it.'
              : 'Enter the engine capacity and the age, and this works out the advance tax on transferring it.'}
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}

/* ══ Section 235: electricity ════════════════════════════════════════════ */

const METERS: { value: MeterKind; label: string }[] = [
  { value: 'domestic', label: 'Home' },
  { value: 'commercial', label: 'Shop or office' },
  { value: 'industrial', label: 'Factory' },
];

export function ElectricityBillCalculator() {
  const [bill, setBill] = useState(0);
  const [meter, setMeter] = useState<MeterKind>('domestic');
  const [filer, setFiler] = useState(false);

  const result = useMemo(
    () => calculateElectricity({ bill, meter, filer }),
    [bill, meter, filer],
  );
  const hasInput = bill > 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your bill</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Income tax added to an electricity bill under section 235. Nothing you type here
          leaves your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <ChoiceField
            label="What kind of meter"
            value={meter}
            onChange={setMeter}
            options={METERS}
            hint="A home meter is charged only where the consumer is not a filer. A shop or factory is charged regardless."
          />
          <NumberField
            label="Monthly bill"
            value={bill}
            onChange={setBill}
            hint="The bill before this tax is added."
          />
          {meter === 'domestic' && (
            <ChoiceField
              label="On the Active Taxpayer List"
              value={filer ? 'yes' : 'no'}
              onChange={(v) => setFiler(v === 'yes')}
              options={[
                { value: 'yes', label: 'Filer' },
                { value: 'no', label: 'Non-filer' },
              ]}
              hint="A home meter belonging to a filer pays nothing under this section, at any bill."
            />
          )}
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label="Income tax on the bill"
              value={Rs(result.tax)}
              note={result.basis}
            />

            <div className="mt-7">
              <Row label="Bill" value={Rs(result.bill)} tone="muted" />
              <Row label="Section 235 tax" value={Rs(result.tax)} />
              <Row label="Total payable" value={Rs(result.total)} tone="total" />
            </div>

            {meter === 'domestic' && !filer && result.filerSaving > 0 && (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                As a filer this would be <strong className="font-semibold">Rs 0</strong>. A home
                meter belonging to someone on the Active Taxpayer List pays nothing under
                section 235, whatever the bill.
              </p>
            )}

            {meter === 'commercial' && bill > ELECTRICITY.business.upperBand.over && (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                A factory on the same bill would pay{' '}
                {Rs(calculateElectricity({ bill, meter: 'industrial', filer }).tax)}: the
                industrial rate above {Rs(ELECTRICITY.business.upperBand.over)} is{' '}
                {percent.format(ELECTRICITY.business.upperBand.industrialRate)} against{' '}
                {percent.format(ELECTRICITY.business.upperBand.commercialRate)} for a shop.
              </p>
            )}

            <Working>
              <p>
                {meter === 'domestic'
                  ? `A home meter is charged only where the consumer is not on the Active Taxpayer List AND the monthly bill reaches ${Rs(
                      ELECTRICITY.domestic.threshold,
                    )}. Below that nothing is charged even to a non-filer.`
                  : `A commercial or industrial meter is charged on a band table regardless of filer status: nothing up to ${Rs(
                      ELECTRICITY.business.exemptUpTo,
                    )}, then ${percent.format(
                      ELECTRICITY.business.lowerBand.rate,
                    )} of the whole bill, and above ${Rs(
                      ELECTRICITY.business.upperBand.over,
                    )} a fixed ${Rs(ELECTRICITY.business.upperBand.fixed)} plus a rate on the excess.`}
              </p>
              <p className="mt-3">
                This counts as income tax you have already paid for the year. You claim it back
                on your return, with the certificate your electricity company can give you.
              </p>
            </Working>
          </>
        ) : (
          <AwaitingInput>
            Enter your monthly bill and this shows the income tax added to it under section
            235.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}

/* ══ Section 236: phone and internet ═════════════════════════════════════ */

const TELECOM_KINDS: { value: TelecomKind; label: string }[] = [
  { value: 'load', label: 'Prepaid load' },
  { value: 'bill', label: 'Mobile or internet bill' },
  { value: 'landline', label: 'Landline bill' },
];

export function TelecomTaxCalculator() {
  const [amount, setAmount] = useState(0);
  const [kind, setKind] = useState<TelecomKind>('load');
  const [namedNonFiler, setNamedNonFiler] = useState(false);

  const result = useMemo(
    () => calculateTelecom({ amount, kind, namedNonFiler }),
    [amount, kind, namedNonFiler],
  );
  const hasInput = amount > 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="u-tile p-7 md:p-8">
        <h2 className="font-display text-h3 text-ink">Your load or bill</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
          Income tax under section 236. Nothing you type here leaves your browser.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          <ChoiceField
            label="What is it"
            value={kind}
            onChange={setKind}
            options={TELECOM_KINDS}
            hint="On a load the tax comes out of your balance. On a bill it is added to what you owe."
          />
          <NumberField
            label={kind === 'load' ? 'Amount you are loading' : 'Bill amount'}
            value={amount}
            onChange={setAmount}
          />
          {kind !== 'landline' && (
            <ChoiceField
              label="Named in an FBR order for not filing"
              value={namedNonFiler ? 'yes' : 'no'}
              onChange={(v) => setNamedNonFiler(v === 'yes')}
              options={[
                { value: 'no', label: 'No' },
                { value: 'yes', label: 'Yes' },
              ]}
              hint="Rare. Where FBR has published an income tax general order under section 114B naming you, the rate is far higher."
            />
          )}
        </div>
      </div>

      <ResultPanel>
        {hasInput ? (
          <>
            <Headline
              label="Income tax"
              value={Rs(result.tax)}
              note={
                result.belowThreshold
                  ? `A landline bill at or below ${Rs(TELECOM.landline.exemptUpTo)} is not charged.`
                  : result.taxComesOutOfAmount
                    ? `${percent.format(result.rate)} comes out of what you load.`
                    : `${percent.format(result.rate)} is added to what you owe.`
              }
            />

            <div className="mt-7">
              <Row
                label={result.taxComesOutOfAmount ? 'You hand over' : 'Bill before tax'}
                value={Rs(result.amount)}
                tone="muted"
              />
              <Row
                label="Section 236 tax"
                value={`${result.taxComesOutOfAmount ? '- ' : '+ '}${Rs(result.tax)}`}
              />
              <Row
                label={result.taxComesOutOfAmount ? 'Reaches your balance' : 'Total payable'}
                value={Rs(result.net)}
                tone="total"
              />
            </div>

            {kind === 'landline' && !result.belowThreshold && (
              <p className="mt-5 rounded-chip bg-blue-50 p-4 text-[13.5px] leading-[1.6] text-ink-strong">
                A landline is charged {percent.format(TELECOM.landline.rate)} of the amount{' '}
                <strong className="font-semibold">above</strong> {Rs(TELECOM.landline.exemptUpTo)},
                not of the whole bill. That is the opposite of the cash withdrawal tax, where
                passing the threshold puts the rate on everything.
              </p>
            )}

            <Working>
              <p>
                A mobile bill, an internet bill and a prepaid load are all charged at{' '}
                {percent.format(TELECOM.standardRate)}, and it does not turn on whether you
                file. What differs is the direction: on a load the tax comes out of the amount,
                so a {Rs(1000)} load puts {Rs(850)} in your balance, while on a bill it is added
                on top of what you owe.
              </p>
              <p className="mt-3">
                It counts as income tax you have already paid for the year. Claiming it back
                means filing a return, which is why most people never see it again.
              </p>
            </Working>
          </>
        ) : (
          <AwaitingInput>
            Enter the amount and this shows the income tax inside it under section 236.
          </AwaitingInput>
        )}
      </ResultPanel>
    </div>
  );
}
