import { money } from './slabs';
/**
 * Capital gains on securities and on mutual fund units, tax year 2027.
 *
 * Section 37A with Division VII of Part I of the First Schedule. Both charges
 * are collected by NCCPL rather than paid by the investor directly, which is
 * why an investor usually meets them as a deduction on a statement rather than
 * as a bill.
 *
 * ## The acquisition date decides the rate
 *
 * As with immovable property, the Finance Act 2024 drew a line at 1 July 2024
 * and left the old regime standing for everything bought before it. So the
 * calculator has to ask when the shares were bought, and a tool that applies
 * today's flat rate to a 2015 holding will invent a tax on a disposal that the
 * statute exempts entirely.
 */

export type FilerStatus = 'filer' | 'non-filer';

/** Securities acquired on or after this date are on the flat rate. */
export const SECURITIES_REGIME_CHANGE = new Date('2024-07-01T00:00:00Z');

/**
 * Division VII, Part I. Ordered oldest acquisition first.
 *
 * `nonFilerRate` is generally double the filer rate, and where the filer rate
 * is nil (securities acquired before 1 July 2013, which are outside the charge
 * altogether) the non-filer rate is nil too: doubling nothing is nothing, and
 * the exemption is of the gain rather than of the person.
 */
export interface SecuritiesBand {
  id: string;
  label: string;
  filerRate: number;
  nonFilerRate: number;
  /** Whether the holding period is what picks this band. */
  holdingYears?: { over: number; upTo: number | null };
}

export const SECURITIES_BANDS: SecuritiesBand[] = [
  {
    id: 'pre-2013',
    label: 'Bought before 1 July 2013',
    filerRate: 0,
    nonFilerRate: 0,
  },
  {
    id: '2013-2022',
    label: 'Bought 1 July 2013 to 30 June 2022',
    filerRate: 0.125,
    nonFilerRate: 0.25,
  },
  {
    id: '2022-2024-y0',
    label: 'Bought 1 July 2022 to 30 June 2024, held up to 1 year',
    filerRate: 0.15,
    nonFilerRate: 0.3,
    holdingYears: { over: 0, upTo: 1 },
  },
  {
    id: '2022-2024-y1',
    label: 'Bought 1 July 2022 to 30 June 2024, held 1 to 2 years',
    filerRate: 0.125,
    nonFilerRate: 0.25,
    holdingYears: { over: 1, upTo: 2 },
  },
  {
    id: '2022-2024-y2',
    label: 'Bought 1 July 2022 to 30 June 2024, held 2 to 3 years',
    filerRate: 0.1,
    nonFilerRate: 0.2,
    holdingYears: { over: 2, upTo: 3 },
  },
  {
    id: '2022-2024-y3',
    label: 'Bought 1 July 2022 to 30 June 2024, held 3 to 4 years',
    filerRate: 0.075,
    nonFilerRate: 0.15,
    holdingYears: { over: 3, upTo: 4 },
  },
  {
    id: 'post-2024',
    label: 'Bought on or after 1 July 2024',
    filerRate: 0.15,
    nonFilerRate: 0.3,
  },
];

/** The flat rate for securities acquired on or after 1 July 2024. */
export const SECURITIES_FLAT_RATE = 0.15;

/**
 * For securities acquired on or after 1 July 2024, a person off the Active
 * Taxpayer List is charged at the Division I slab rates rather than at 15%,
 * subject to a floor of 15% of the gain.
 *
 * The doubled rates in the table above are the Tenth Schedule increase that
 * applies to the older acquisition bands. The two mechanisms are different and
 * the calculator says which one it used.
 */
export const SECURITIES_NON_FILER_FLOOR = 0.15;

export interface SecuritiesInput {
  purchasePrice: number;
  salePrice: number;
  bandId: string;
  status: FilerStatus;
}

export const EMPTY_SECURITIES_INPUT: SecuritiesInput = {
  purchasePrice: 0,
  salePrice: 0,
  bandId: 'post-2024',
  status: 'filer',
};

export interface SecuritiesResult {
  gain: number;
  isLoss: boolean;
  rate: number;
  band: SecuritiesBand;
  tax: number;
  netProceeds: number;
  /** What the other filer status would pay on the same gain. */
  otherStatusTax: number;
}

export function calculateSecurities(input: SecuritiesInput): SecuritiesResult {
  const band = SECURITIES_BANDS.find((b) => b.id === input.bandId) ?? SECURITIES_BANDS.at(-1)!;

  const gain = money(input.salePrice) - money(input.purchasePrice);
  const isLoss = gain <= 0;

  const rate = input.status === 'filer' ? band.filerRate : band.nonFilerRate;
  const otherRate = input.status === 'filer' ? band.nonFilerRate : band.filerRate;

  const tax = isLoss ? 0 : gain * rate;

  return {
    gain,
    isLoss,
    rate,
    band,
    tax,
    netProceeds: gain - tax,
    otherStatusTax: isLoss ? 0 : gain * otherRate,
  };
}

/**
 * Mutual funds.
 *
 * The Finance Act 2025 flattened this: for units acquired on or after
 * 1 July 2025 a person pays 15% whether the fund is a stock fund or not, and
 * the holding period does not change it. Units acquired before that date keep
 * the doubled non-filer rate.
 *
 * A company is treated differently from a person on funds other than stock
 * funds, which is the one distinction the calculator has to ask about.
 */
export const MUTUAL_FUND = {
  /** A person, either fund type, units acquired on or after 1 July 2025. */
  personRate: 0.15,
  /** A person, units acquired before 1 July 2025, off the ATL. */
  personNonFilerRateLegacy: 0.3,
  /** A company holding a stock fund. */
  companyStockRate: 0.15,
  /** A company holding any other fund. */
  companyOtherRate: 0.25,
} as const;

export type FundKind = 'stock' | 'other';
export type Holder = 'person' | 'company';

export interface MutualFundInput {
  invested: number;
  redeemed: number;
  holder: Holder;
  fund: FundKind;
  status: FilerStatus;
  /** Units acquired on or after 1 July 2025. */
  acquiredAfterJuly2025: boolean;
}

export const EMPTY_MUTUAL_FUND_INPUT: MutualFundInput = {
  invested: 0,
  redeemed: 0,
  holder: 'person',
  fund: 'stock',
  status: 'filer',
  acquiredAfterJuly2025: true,
};

export interface MutualFundResult {
  gain: number;
  isLoss: boolean;
  rate: number;
  tax: number;
  netProceeds: number;
}

export function mutualFundRate(input: Omit<MutualFundInput, 'invested' | 'redeemed'>): number {
  if (input.holder === 'company') {
    return input.fund === 'stock' ? MUTUAL_FUND.companyStockRate : MUTUAL_FUND.companyOtherRate;
  }
  // A person: 15% on units acquired from 1 July 2025, whatever the fund type.
  // Before that date a non-filer paid double.
  if (!input.acquiredAfterJuly2025 && input.status === 'non-filer') {
    return MUTUAL_FUND.personNonFilerRateLegacy;
  }
  return MUTUAL_FUND.personRate;
}

export function calculateMutualFund(input: MutualFundInput): MutualFundResult {
  const gain = money(input.redeemed) - money(input.invested);
  const isLoss = gain <= 0;
  const rate = mutualFundRate(input);
  const tax = isLoss ? 0 : gain * rate;

  return { gain, isLoss, rate, tax, netProceeds: gain - tax };
}
