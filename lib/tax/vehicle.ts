import { money } from './slabs';
/**
 * Advance tax on a motor vehicle, section 231B. Tax year 2027.
 *
 * ## Two different charges under one section
 *
 * REGISTERING a vehicle (sub-sections 1 and 3) is charged as a PERCENTAGE OF
 * VALUE, by engine capacity band. TRANSFERRING an already-registered vehicle
 * (sub-section 2) is charged as a FIXED RUPEE AMOUNT, by the same bands, and
 * that amount reduces by a tenth for each year since first registration.
 *
 * Conflating the two is the error to avoid: applying the registration
 * percentage to a used-car transfer produces a figure many times too large on
 * an expensive vehicle, and applying the transfer amount to a new registration
 * produces one far too small.
 *
 * ## The non-filer multiple is THREE, not two
 *
 * Almost every other withholding rate on this site doubles for a person off
 * the Active Taxpayer List. Division VII trebles: the non-ATL column is the
 * ATL column plus 200%. It is stated in the Schedule as its own column rather
 * than derived, and it is reproduced that way here, with a check asserting the
 * relationship rather than a comment claiming it.
 *
 * ## Where these figures come from
 *
 * FBR's Withholding Income Tax Rate Card, updated to 30 June 2026 per the
 * Finance Act 2026, citing Division VII of Part IV of the First Schedule read
 * with Rule 1 of the Tenth Schedule. Corroborated against KPMG's TY2027
 * withholding card.
 */

export type FilerStatus = 'filer' | 'non-filer';

/**
 * Division VII, sub-sections 231B(1) and (3): registration, and sale by a
 * manufacturer. A percentage of the vehicle's value at every band.
 *
 * "Value" is defined by the section: for an imported vehicle the customs
 * assessed value plus duty, federal excise and sales tax; for a locally
 * manufactured one the invoice value inclusive of all duties and taxes; for an
 * auctioned one the auction value on the same inclusive basis. The calculator
 * asks for it rather than deriving it, and says which of the three applies.
 */
export const REGISTRATION_BANDS: {
  maxCc: number | null;
  label: string;
  filerRate: number;
  nonFilerRate: number;
}[] = [
  { maxCc: 850, label: 'Up to 850 cc', filerRate: 0.005, nonFilerRate: 0.015 },
  { maxCc: 1000, label: '851 to 1,000 cc', filerRate: 0.01, nonFilerRate: 0.03 },
  { maxCc: 1300, label: '1,001 to 1,300 cc', filerRate: 0.015, nonFilerRate: 0.045 },
  { maxCc: 1600, label: '1,301 to 1,600 cc', filerRate: 0.02, nonFilerRate: 0.06 },
  { maxCc: 1800, label: '1,601 to 1,800 cc', filerRate: 0.03, nonFilerRate: 0.09 },
  { maxCc: 2000, label: '1,801 to 2,000 cc', filerRate: 0.05, nonFilerRate: 0.15 },
  { maxCc: 2500, label: '2,001 to 2,500 cc', filerRate: 0.07, nonFilerRate: 0.21 },
  { maxCc: 3000, label: '2,501 to 3,000 cc', filerRate: 0.09, nonFilerRate: 0.27 },
  { maxCc: null, label: 'Above 3,000 cc', filerRate: 0.12, nonFilerRate: 0.36 },
];

/**
 * Sub-section 231B(2): transfer of registration or ownership. Fixed amounts.
 *
 * Note the first band is nil for both statuses: transferring a car of 850cc or
 * under attracts no advance tax at all.
 */
export const TRANSFER_BANDS: {
  maxCc: number | null;
  label: string;
  filer: number;
  nonFiler: number;
}[] = [
  { maxCc: 850, label: 'Up to 850 cc', filer: 0, nonFiler: 0 },
  { maxCc: 1000, label: '851 to 1,000 cc', filer: 5_000, nonFiler: 15_000 },
  { maxCc: 1300, label: '1,001 to 1,300 cc', filer: 7_500, nonFiler: 22_500 },
  { maxCc: 1600, label: '1,301 to 1,600 cc', filer: 12_500, nonFiler: 37_500 },
  { maxCc: 1800, label: '1,601 to 1,800 cc', filer: 18_750, nonFiler: 56_250 },
  { maxCc: 2000, label: '1,801 to 2,000 cc', filer: 25_000, nonFiler: 75_000 },
  { maxCc: 2500, label: '2,001 to 2,500 cc', filer: 37_500, nonFiler: 112_500 },
  { maxCc: 3000, label: '2,501 to 3,000 cc', filer: 50_000, nonFiler: 150_000 },
  { maxCc: null, label: 'Above 3,000 cc', filer: 62_500, nonFiler: 187_500 },
];

export const VEHICLE = {
  /** The non-ATL column is the ATL column plus 200%, i.e. three times it. */
  nonFilerMultiple: 3,
  /**
   * The transfer charge falls by a tenth for each year since the vehicle was
   * first registered in Pakistan, reaching nil at ten years. It applies to the
   * TRANSFER clause only, never to a first registration.
   */
  usedReductionPerYear: 0.1,
  usedReductionYearsToNil: 10,
  /**
   * A vehicle with no engine capacity (an electric vehicle) valued at or above
   * this is charged a flat percentage on registration, and a fixed amount on
   * transfer, rather than falling in a cc band.
   */
  noCcValueThreshold: 5_000_000,
  noCcRegistrationRate: 0.03,
  noCcTransferAmount: 20_000,
} as const;

export type VehicleTransaction = 'registration' | 'transfer';

export interface VehicleInput {
  /** Engine capacity in cc. Zero for an electric vehicle with no rating. */
  engineCc: number;
  /** Value on the section's own basis. Only used for a registration. */
  value: number;
  transaction: VehicleTransaction;
  status: FilerStatus;
  /** Years since first registration in Pakistan. Only reduces a transfer. */
  yearsSinceRegistration: number;
}

export const EMPTY_VEHICLE_INPUT: VehicleInput = {
  engineCc: 1300,
  value: 0,
  transaction: 'registration',
  status: 'filer',
  yearsSinceRegistration: 0,
};

export interface VehicleResult {
  transaction: VehicleTransaction;
  bandLabel: string;
  /** The percentage, for a registration. Nil for a transfer. */
  rate: number;
  /** The charge before any used-vehicle reduction. */
  grossTax: number;
  /** The proportion knocked off for a used vehicle, nil for a registration. */
  reduction: number;
  tax: number;
  /** What the other filer status would pay on the same transaction. */
  otherStatusTax: number;
  filerSaving: number;
  /** True where no engine capacity applied and the value rule was used. */
  usedNoCcRule: boolean;
}

function bandFor<T extends { maxCc: number | null }>(bands: T[], cc: number): T {
  return bands.find((b) => b.maxCc === null || cc <= b.maxCc) ?? bands[bands.length - 1]!;
}

export function calculateVehicle(input: VehicleInput): VehicleResult {
  const cc = money(input.engineCc);
  const value = money(input.value);
  const years = money(input.yearsSinceRegistration);

  // An electric vehicle has no cc rating, and is charged on value instead.
  const usedNoCcRule = cc <= 0 && value >= VEHICLE.noCcValueThreshold;

  if (input.transaction === 'registration') {
    const band = bandFor(REGISTRATION_BANDS, cc);
    const filerRate = usedNoCcRule ? VEHICLE.noCcRegistrationRate : band.filerRate;
    const nonFilerRate = usedNoCcRule
      ? VEHICLE.noCcRegistrationRate * VEHICLE.nonFilerMultiple
      : band.nonFilerRate;

    const rate = input.status === 'filer' ? filerRate : nonFilerRate;
    const filerTax = value * filerRate;
    const nonFilerTax = value * nonFilerRate;

    return {
      transaction: 'registration',
      bandLabel: usedNoCcRule ? 'No engine capacity, charged on value' : band.label,
      rate,
      grossTax: value * rate,
      // A first registration gets no used-vehicle reduction: the reduction is
      // written into the transfer clause only.
      reduction: 0,
      tax: value * rate,
      otherStatusTax: input.status === 'filer' ? nonFilerTax : filerTax,
      filerSaving: nonFilerTax - filerTax,
      usedNoCcRule,
    };
  }

  const band = bandFor(TRANSFER_BANDS, cc);
  const filerAmount = usedNoCcRule ? VEHICLE.noCcTransferAmount : band.filer;
  const nonFilerAmount = usedNoCcRule
    ? VEHICLE.noCcTransferAmount * VEHICLE.nonFilerMultiple
    : band.nonFiler;

  const gross = input.status === 'filer' ? filerAmount : nonFilerAmount;

  // A tenth off for each year since first registration, floored at nil.
  const reduction = Math.min(1, years * VEHICLE.usedReductionPerYear);
  const applied = (amount: number) => amount * (1 - reduction);

  return {
    transaction: 'transfer',
    bandLabel: usedNoCcRule ? 'No engine capacity, charged on value' : band.label,
    rate: 0,
    grossTax: gross,
    reduction,
    tax: applied(gross),
    otherStatusTax: applied(input.status === 'filer' ? nonFilerAmount : filerAmount),
    filerSaving: applied(nonFilerAmount) - applied(filerAmount),
    usedNoCcRule,
  };
}
