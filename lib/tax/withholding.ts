import { money } from './slabs';
/**
 * Two withholding taxes a person meets without filing anything: section 154A
 * on IT export receipts, and section 231AB on cash taken out of a bank.
 *
 * Both are collected by somebody else (a bank, in both cases) at a flat rate,
 * so neither needs a slab walk. What they need instead is the filer test,
 * which is where the money actually is: the gap between a filer's rate and a
 * non-filer's is the entire argument for filing a return, and it is what these
 * two calculators exist to show.
 *
 * Sources: Income Tax Ordinance, 2001 as amended up to 30 June 2026, sections
 * 154A and 231AB, with the rates in Division IVA and Division VIA of Part III
 * of the First Schedule.
 */

/**
 * Section 154A, tax on IT and IT-enabled export receipts.
 *
 * Four rates from two yes/no facts: whether the exporter is registered with
 * the Pakistan Software Export Board, and whether they are on the Active
 * Taxpayer List. A PSEB-registered filer pays a quarter of one percent; the
 * same person off the ATL and without PSEB pays eight times that.
 *
 * The rate is charged on GROSS receipts, before any expense. That is not an
 * oversight in the calculator: section 154A is a final tax regime on the
 * receipt itself, which is why a freelancer cannot deduct their costs from it.
 */
export const IT_EXPORT_RATES = {
  psebFiler: 0.0025,
  psebNonFiler: 0.005,
  standardFiler: 0.01,
  standardNonFiler: 0.02,
} as const;

export interface ItExportInput {
  /** Gross export receipts for the period, before expenses. */
  amount: number;
  period: 'monthly' | 'annual';
  psebRegistered: boolean;
  /** On the Active Taxpayer List. */
  filer: boolean;
}

export const EMPTY_IT_EXPORT_INPUT: ItExportInput = {
  amount: 0,
  period: 'monthly',
  psebRegistered: false,
  filer: true,
};

export interface ItExportResult {
  grossAnnual: number;
  grossMonthly: number;
  rate: number;
  taxAnnual: number;
  taxMonthly: number;
  netAnnual: number;
  netMonthly: number;
  /** What the same receipts would cost at the best available rate. */
  bestRate: number;
  taxAtBestRate: number;
  /** Annual saving still on the table, nil when already on the best rate. */
  annualSaving: number;
}

export function itExportRate(psebRegistered: boolean, filer: boolean): number {
  if (psebRegistered) {
    return filer ? IT_EXPORT_RATES.psebFiler : IT_EXPORT_RATES.psebNonFiler;
  }
  return filer ? IT_EXPORT_RATES.standardFiler : IT_EXPORT_RATES.standardNonFiler;
}

export function calculateItExport(input: ItExportInput): ItExportResult {
  const grossAnnual = money(input.period === 'monthly' ? input.amount * 12 : input.amount);

  const rate = itExportRate(input.psebRegistered, input.filer);
  const taxAnnual = grossAnnual * rate;

  const bestRate = IT_EXPORT_RATES.psebFiler;
  const taxAtBestRate = grossAnnual * bestRate;

  return {
    grossAnnual,
    grossMonthly: grossAnnual / 12,
    rate,
    taxAnnual,
    taxMonthly: taxAnnual / 12,
    netAnnual: grossAnnual - taxAnnual,
    netMonthly: (grossAnnual - taxAnnual) / 12,
    bestRate,
    taxAtBestRate,
    annualSaving: money(taxAnnual - taxAtBestRate),
  };
}

/**
 * Section 231AB, tax on cash withdrawn from a bank.
 *
 * Three things about it are consistently got wrong, and the calculator is
 * built to correct all three:
 *
 *  - A FILER PAYS NOTHING. However much they withdraw. The deduction exists
 *    only for people not on the Active Taxpayer List.
 *  - The Rs 50,000 is a TRIGGER, NOT AN EXEMPTION. Once the day's cash passes
 *    it, the rate applies to the whole amount withdrawn, not to the excess.
 *  - The threshold is the DAY'S AGGREGATE across every withdrawal, ATM and
 *    card included. Three withdrawals of Rs 20,000 are treated as one of
 *    Rs 60,000.
 *
 * It is adjustable, not final: it counts towards the year's liability and is
 * claimed on the return. A person who never files never claims it.
 */
export const CASH_WITHDRAWAL = {
  /** The day's aggregate cash withdrawal at which the deduction starts. */
  threshold: 50_000,
  /** Non-filers only. Raised from 0.6% by the Finance Act 2025. */
  nonFilerRate: 0.008,
  /** A filer has nothing deducted, at any amount. */
  filerRate: 0,
} as const;

export interface CashWithdrawalInput {
  /** Everything withdrawn in cash on the same day, added together. */
  amount: number;
  filer: boolean;
}

export const EMPTY_CASH_WITHDRAWAL_INPUT: CashWithdrawalInput = {
  amount: 0,
  filer: false,
};

export interface CashWithdrawalResult {
  amount: number;
  rate: number;
  tax: number;
  received: number;
  /** True once the day's cash is above the threshold. */
  thresholdPassed: boolean;
  /** What a non-filer would pay on the same amount. Nil for a non-filer's own result. */
  filerSaving: number;
}

export function calculateCashWithdrawal(input: CashWithdrawalInput): CashWithdrawalResult {
  const amount = money(input.amount);
  const thresholdPassed = amount > CASH_WITHDRAWAL.threshold;

  // The rate applies to the whole withdrawal, not the part above the trigger.
  const nonFilerTax = thresholdPassed ? amount * CASH_WITHDRAWAL.nonFilerRate : 0;

  const rate = input.filer ? CASH_WITHDRAWAL.filerRate : CASH_WITHDRAWAL.nonFilerRate;
  const tax = input.filer ? 0 : nonFilerTax;

  return {
    amount,
    rate: thresholdPassed ? rate : 0,
    tax,
    received: amount - tax,
    thresholdPassed,
    filerSaving: nonFilerTax,
  };
}

/**
 * Section 235, tax on an electricity bill.
 *
 * Two entirely different regimes under one section, which is why the
 * calculator asks what the meter is before it asks anything else:
 *
 *   A DOMESTIC meter is charged only where the consumer is NOT on the Active
 *   Taxpayer List and the monthly bill reaches the threshold. A filer at home
 *   pays nothing under this section at any bill.
 *
 *   A COMMERCIAL or INDUSTRIAL meter is charged on a band table regardless of
 *   filer status, and the industrial rate above the top threshold is lower
 *   than the commercial one on the same bill.
 */
export const ELECTRICITY = {
  domestic: {
    /** Below this monthly bill nothing is charged, even to a non-filer. */
    threshold: 25_000,
    /** Non-filers only. A domestic filer pays nothing. */
    nonFilerRate: 0.075,
  },
  /**
   * The commercial and industrial band table. `upTo: null` is the open band,
   * where the charge is `fixed` plus `rate` on the amount above `over`.
   */
  business: {
    exemptUpTo: 500,
    /** Rs 501 to Rs 20,000: a flat percentage of the whole bill. */
    lowerBand: { upTo: 20_000, rate: 0.1 },
    /** Above Rs 20,000: a fixed amount plus a rate on the excess. */
    upperBand: {
      over: 20_000,
      fixed: 1_950,
      commercialRate: 0.12,
      /** An industrial connection pays less than a shop on the same bill. */
      industrialRate: 0.05,
    },
  },
} as const;

export type MeterKind = 'domestic' | 'commercial' | 'industrial';

export interface ElectricityInput {
  /** The monthly bill before this tax is added. */
  bill: number;
  meter: MeterKind;
  filer: boolean;
}

export const EMPTY_ELECTRICITY_INPUT: ElectricityInput = {
  bill: 0,
  meter: 'domestic',
  filer: false,
};

export interface ElectricityResult {
  bill: number;
  tax: number;
  /** The bill with the tax added, which is what is actually payable. */
  total: number;
  /** Nil for a domestic filer, which is the point of the comparison. */
  filerSaving: number;
  /** True where a domestic bill is under the threshold. */
  belowThreshold: boolean;
  /** How the charge was arrived at, for the working. */
  basis: string;
}

export function calculateElectricity(input: ElectricityInput): ElectricityResult {
  const bill = money(input.bill);

  if (input.meter === 'domestic') {
    const belowThreshold = bill < ELECTRICITY.domestic.threshold;
    const nonFilerTax = belowThreshold ? 0 : bill * ELECTRICITY.domestic.nonFilerRate;
    const tax = input.filer ? 0 : nonFilerTax;

    return {
      bill,
      tax,
      total: bill + tax,
      filerSaving: nonFilerTax,
      belowThreshold,
      basis: belowThreshold
        ? `Below the Rs ${ELECTRICITY.domestic.threshold.toLocaleString()} threshold, so nothing is charged.`
        : input.filer
          ? 'A domestic filer pays nothing under section 235.'
          : `${ELECTRICITY.domestic.nonFilerRate * 100}% of the whole bill.`,
    };
  }

  // Commercial and industrial: the band table, and filer status does not enter.
  const { exemptUpTo, lowerBand, upperBand } = ELECTRICITY.business;

  if (bill <= exemptUpTo) {
    return { bill, tax: 0, total: bill, filerSaving: 0, belowThreshold: true, basis: `Nothing is charged up to Rs ${exemptUpTo}.` };
  }

  if (bill <= lowerBand.upTo) {
    const tax = bill * lowerBand.rate;
    return {
      bill,
      tax,
      total: bill + tax,
      filerSaving: 0,
      belowThreshold: false,
      basis: `${lowerBand.rate * 100}% of the whole bill.`,
    };
  }

  const rate = input.meter === 'industrial' ? upperBand.industrialRate : upperBand.commercialRate;
  const tax = upperBand.fixed + (bill - upperBand.over) * rate;

  return {
    bill,
    tax,
    total: bill + tax,
    filerSaving: 0,
    belowThreshold: false,
    basis: `Rs ${upperBand.fixed.toLocaleString()} plus ${rate * 100}% of the amount above Rs ${upperBand.over.toLocaleString()}.`,
  };
}

/**
 * Section 236, tax on a phone or internet bill and on a prepaid load.
 *
 * One rate covers a mobile bill, an internet bill and a prepaid load alike,
 * and it does not turn on filer status, which makes this the most uniform
 * charge on the site. Two details are not uniform:
 *
 *   A LANDLINE bill is exempt up to a threshold and charged at a lower rate
 *   above it.
 *   A LOAD is charged INSIDE the amount (Rs 150 of a Rs 1,000 load is tax, so
 *   Rs 850 reaches the balance) while a BILL is charged ON TOP of what is
 *   owed. Getting that direction wrong changes the answer by twice the tax.
 */
export const TELECOM = {
  /** A mobile bill, an internet bill, or a prepaid load. */
  standardRate: 0.15,
  landline: {
    /**
     * A landline bill at or below this is not charged, AND the rate applies
     * only to the amount ABOVE it.
     *
     * FBR's own rate card words it "10.00% of the amount of bill exceeding
     * Rs 1,000", which is a marginal charge rather than a threshold. This is
     * the opposite of section 231AB next door, where passing the threshold
     * puts the rate on the whole withdrawal, and getting the two the same way
     * round is the easiest mistake to make in this file.
     */
    exemptUpTo: 1_000,
    rate: 0.1,
  },
  /**
   * Where FBR has published an order under section 114B naming a person for
   * not filing, a load is charged at this instead.
   */
  namedNonFilerRate: 0.75,
} as const;

export type TelecomKind = 'load' | 'bill' | 'landline';

export interface TelecomInput {
  amount: number;
  kind: TelecomKind;
  /** Named in an FBR order under section 114B for not filing. Rare. */
  namedNonFiler: boolean;
}

export const EMPTY_TELECOM_INPUT: TelecomInput = {
  amount: 0,
  kind: 'load',
  namedNonFiler: false,
};

export interface TelecomResult {
  amount: number;
  rate: number;
  tax: number;
  /** On a load, what reaches the balance. On a bill, what is payable. */
  net: number;
  /** True for a load, where the tax comes out of the amount rather than on top. */
  taxComesOutOfAmount: boolean;
  belowThreshold: boolean;
}

export function calculateTelecom(input: TelecomInput): TelecomResult {
  const amount = money(input.amount);

  if (input.kind === 'landline') {
    const belowThreshold = amount <= TELECOM.landline.exemptUpTo;
    // Charged on the EXCESS over Rs 1,000, not on the whole bill. See the note
    // on TELECOM.landline above.
    const tax = belowThreshold
      ? 0
      : (amount - TELECOM.landline.exemptUpTo) * TELECOM.landline.rate;
    return {
      amount,
      rate: belowThreshold ? 0 : TELECOM.landline.rate,
      tax,
      // A landline bill is charged on top of what is owed.
      net: amount + tax,
      taxComesOutOfAmount: false,
      belowThreshold,
    };
  }

  const rate = input.namedNonFiler ? TELECOM.namedNonFilerRate : TELECOM.standardRate;
  const tax = amount * rate;
  const isLoad = input.kind === 'load';

  return {
    amount,
    rate,
    tax,
    // A load is taxed inside the amount; a bill is taxed on top of it.
    net: isLoad ? amount - tax : amount + tax,
    taxComesOutOfAmount: isLoad,
    belowThreshold: false,
  };
}
