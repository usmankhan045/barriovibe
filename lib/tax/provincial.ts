/**
 * Provincial taxes: vehicle token tax and agricultural income tax.
 *
 * ## Why this file is different from every other one in lib/tax/
 *
 * Everything else here is federal. One Ordinance, one Finance Act, one FBR
 * rate card to check against. These two are set by five separate legislatures
 * and published by five separate excise and revenue departments, and they do
 * not agree with each other about structure, let alone about rates: Punjab
 * charges a percentage of invoice value in two bands and a flat amount in the
 * rest, KP is flat throughout, Balochistan offers a lifetime option at every
 * engine size, and Islamabad is almost entirely value-based.
 *
 * So this file carries something no other file here needs: a per-province
 * `source` and `confidence`. Where a schedule could not be confirmed from a
 * government domain it is NOT reproduced from a secondary site, it is marked
 * unavailable and the page says so. See `SINDH_TOKEN_UNAVAILABLE` and
 * `PUNJAB_AGRICULTURE_DISPUTED` below for the two cases where that applies,
 * and why publishing a plausible-looking number there would be worse than
 * publishing nothing.
 *
 * ## What was checked
 *
 * Punjab token: excise.punjab.gov.pk/motorvehicle_tax, read live, which
 * publishes 2026-27 alongside prior years. Widely-copied aggregator schedules
 * (Rs 800 / 1,500 / 3,000 / 6,000) CONTRADICT that page and are not used.
 * ICT token: the Finance Act 2026 gazette itself, Table 2.
 * KP token: KP Finance Act 2025, Appendix III.
 * Balochistan token: the province's published schedule of taxes and fees.
 * Agricultural income tax: the Sindh, KP and Balochistan Acts of 2025.
 */

import { taxOnSlabs, assertSlabsConsistent, type Slab, type SlabRow, money } from './slabs';

export type Province = 'punjab' | 'sindh' | 'kp' | 'balochistan' | 'ict';

export const PROVINCE_LABELS: Record<Province, string> = {
  punjab: 'Punjab',
  sindh: 'Sindh',
  kp: 'Khyber Pakhtunkhwa',
  balochistan: 'Balochistan',
  ict: 'Islamabad (ICT)',
};

/* ══ Vehicle token tax ═══════════════════════════════════════════════════ */

/**
 * One band of a province's token schedule.
 *
 * A band is either a flat annual amount or a percentage of the invoice value,
 * and provinces mix the two within a single table. Punjab's is genuinely
 * non-monotonic: it charges a percentage for 1001-1199cc and 2001-2500cc and a
 * flat amount everywhere else, which looks like an error and is not.
 */
export type TokenBand = {
  maxCc: number | null;
  label: string;
} & (
  | { kind: 'flat'; amount: number }
  | { kind: 'percent'; rate: number }
  | { kind: 'lifetime'; amount: number }
);

export interface TokenSchedule {
  province: Province;
  /** Where the schedule was read from. Rendered on the page. */
  source: string;
  /** The authority that sets it. */
  authority: string;
  bands: TokenBand[];
  /** A discount for paying the whole year early, where the province offers one. */
  earlyPayment?: { rate: number; by: string };
  notes: string[];
}

/**
 * Sindh is deliberately absent from TOKEN_SCHEDULES.
 *
 * The Sindh Excise site publishes the governing law, the registration and
 * transfer fees and the smart card fee, but not an annual cc-band schedule for
 * private cars. Several aggregators publish one; none of them could be
 * corroborated against any Sindh government source, and they disagree with
 * each other.
 *
 * A token calculator that guessed here would produce a confident figure a
 * visitor might budget against, on no authority at all. So the page offers
 * Sindh, explains what is missing, and points at the province's own
 * calculator. That is a worse product and an honest one.
 */
export const SINDH_TOKEN_UNAVAILABLE = {
  province: 'sindh' as const,
  reason:
    'Sindh Excise publishes the governing law and its registration fees, but not a public annual rate table by engine capacity for private cars. The schedules circulating on other sites could not be matched to any Sindh government source, and they disagree with one another.',
  officialTool: 'https://excise.gos.pk/Tax-Calculator',
  authority: 'Sindh Motor Vehicle Taxation Act 1958',
} as const;

export const TOKEN_SCHEDULES: Record<Exclude<Province, 'sindh'>, TokenSchedule> = {
  punjab: {
    province: 'punjab',
    source: 'Punjab Excise, Taxation & Narcotics Control Department',
    authority: 'Motor Vehicle Tax Act 1958, rates set by the Punjab Finance Act',
    bands: [
      { maxCc: 1000, label: 'Up to 1,000 cc', kind: 'lifetime', amount: 20_000 },
      { maxCc: 1199, label: '1,001 to 1,199 cc', kind: 'percent', rate: 0.003 },
      { maxCc: 1300, label: '1,200 to 1,300 cc', kind: 'flat', amount: 1_800 },
      { maxCc: 1500, label: '1,301 to 1,500 cc', kind: 'flat', amount: 6_000 },
      { maxCc: 1599, label: '1,501 to 1,599 cc', kind: 'flat', amount: 9_000 },
      { maxCc: 2000, label: '1,600 to 2,000 cc', kind: 'flat', amount: 9_000 },
      { maxCc: 2500, label: '2,001 to 2,500 cc', kind: 'percent', rate: 0.004 },
      { maxCc: null, label: 'Above 2,500 cc', kind: 'flat', amount: 15_000 },
    ],
    earlyPayment: { rate: 0.1, by: '31 August' },
    notes: [
      'A car up to 1,000 cc pays a one-off lifetime token rather than a yearly one.',
      'Two bands are charged as a percentage of the invoice price and the rest as a flat amount, which is why the yearly figure does not rise smoothly with engine size.',
      'An electric vehicle is exempt from 95% of the motor vehicle tax.',
    ],
  },
  kp: {
    province: 'kp',
    source: 'Khyber Pakhtunkhwa Finance Act 2025, Appendix III',
    authority: 'West Pakistan Motor Vehicles Taxation Act 1958, Schedule II as substituted',
    bands: [
      { maxCc: 1000, label: 'Up to 1,000 cc', kind: 'flat', amount: 2_000 },
      { maxCc: 1300, label: '1,001 to 1,300 cc', kind: 'flat', amount: 3_000 },
      { maxCc: 1500, label: '1,301 to 1,500 cc', kind: 'flat', amount: 4_000 },
      { maxCc: 2500, label: '1,501 to 2,500 cc', kind: 'flat', amount: 5_000 },
      { maxCc: null, label: 'Above 2,500 cc', kind: 'flat', amount: 8_000 },
    ],
    notes: [
      'Flat amounts throughout: KP charges no percentage of value at any engine size.',
      'There is no lifetime token option for cars in KP.',
      'An electric vehicle is exempt from token tax until 30 June 2028.',
    ],
  },
  balochistan: {
    province: 'balochistan',
    source: 'Balochistan Excise, Schedule of Taxes and Fees effective 1 July 2025',
    authority: 'Balochistan Motor Vehicles Taxation Act',
    bands: [
      { maxCc: 660, label: 'Up to 660 cc', kind: 'flat', amount: 1_000 },
      { maxCc: 1000, label: '661 to 1,000 cc', kind: 'flat', amount: 1_100 },
      { maxCc: 1500, label: '1,001 to 1,500 cc', kind: 'flat', amount: 1_400 },
      { maxCc: 2000, label: '1,501 to 2,000 cc', kind: 'flat', amount: 1_700 },
      { maxCc: null, label: 'Above 2,000 cc', kind: 'flat', amount: 2_000 },
    ],
    notes: [
      'Balochistan offers a lifetime token at every engine size, priced by the age of the vehicle, as an alternative to the yearly amounts shown here.',
      'The yearly figures above are the same at every vehicle age; only the lifetime alternative varies with age.',
    ],
  },
  ict: {
    province: 'ict',
    source: 'Finance Act 2026, Gazette of Pakistan Extraordinary, 26 June 2026, Table 2',
    authority: 'West Pakistan Motor Vehicles Taxation Act 1958 as in force in ICT',
    bands: [
      { maxCc: 1000, label: 'Up to 1,000 cc', kind: 'lifetime', amount: 20_000 },
      { maxCc: 1300, label: '1,001 to 1,300 cc', kind: 'percent', rate: 0.0025 },
      { maxCc: 1500, label: '1,301 to 1,500 cc', kind: 'percent', rate: 0.0025 },
      { maxCc: 2000, label: '1,501 to 2,000 cc', kind: 'percent', rate: 0.0025 },
      { maxCc: 2500, label: '2,001 to 2,500 cc', kind: 'percent', rate: 0.0035 },
      { maxCc: null, label: 'Above 2,500 cc', kind: 'percent', rate: 0.0035 },
    ],
    notes: [
      'Islamabad is almost entirely value-based: above 1,000 cc the token is a percentage of the invoice value rather than a flat amount.',
      'A car up to 1,000 cc pays a one-off lifetime token.',
      'These rates took effect on 1 July 2026. The two percentages were 0.2% and 0.3% in the previous year.',
    ],
  },
};

/**
 * Section 234, the FEDERAL yearly tax collected with the provincial token.
 *
 * It is a separate charge under the Income Tax Ordinance that the provincial
 * excise office collects at the same time, which is why a token bill is larger
 * than the provincial schedule alone. Doubled for a person off the Active
 * Taxpayer List.
 */
export const FEDERAL_VEHICLE_TAX_BANDS: { maxCc: number | null; label: string; filer: number }[] = [
  { maxCc: 1000, label: 'Up to 1,000 cc', filer: 800 },
  { maxCc: 1199, label: '1,001 to 1,199 cc', filer: 1_500 },
  { maxCc: 1299, label: '1,200 to 1,299 cc', filer: 1_750 },
  { maxCc: 1499, label: '1,300 to 1,499 cc', filer: 2_500 },
  { maxCc: 1599, label: '1,500 to 1,599 cc', filer: 3_750 },
  { maxCc: 1999, label: '1,600 to 1,999 cc', filer: 4_500 },
  { maxCc: null, label: '2,000 cc and above', filer: 10_000 },
];

export const FEDERAL_VEHICLE_NON_FILER_MULTIPLE = 2;

export interface TokenInput {
  province: Province;
  engineCc: number;
  /** Invoice price, used only by the bands charged as a percentage. */
  invoicePrice: number;
  filer: boolean;
  /** Whether the whole year is being paid by the province's early-payment date. */
  payingEarly: boolean;
}

export const EMPTY_TOKEN_INPUT: TokenInput = {
  province: 'punjab',
  engineCc: 1300,
  invoicePrice: 0,
  filer: true,
  payingEarly: false,
};

export interface TokenResult {
  available: boolean;
  schedule: TokenSchedule | null;
  bandLabel: string;
  /** True where the band is a one-off lifetime token rather than a yearly one. */
  isLifetime: boolean;
  provincialGross: number;
  /** The early-payment discount, where one was taken. */
  discount: number;
  provincial: number;
  /** Section 234, the federal component collected alongside. */
  federal: number;
  federalBandLabel: string;
  total: number;
}

function bandFor<T extends { maxCc: number | null }>(bands: T[], cc: number): T {
  return bands.find((b) => b.maxCc === null || cc <= b.maxCc) ?? bands[bands.length - 1]!;
}

export function calculateToken(input: TokenInput): TokenResult {
  const cc = money(input.engineCc);
  const price = money(input.invoicePrice);

  const federalBand = bandFor(FEDERAL_VEHICLE_TAX_BANDS, cc);
  const federal = input.filer
    ? federalBand.filer
    : federalBand.filer * FEDERAL_VEHICLE_NON_FILER_MULTIPLE;

  // Sindh has no published schedule. The federal half is still knowable, and is
  // still reported, because it is set by the Ordinance rather than the province.
  if (input.province === 'sindh') {
    return {
      available: false,
      schedule: null,
      bandLabel: '',
      isLifetime: false,
      provincialGross: 0,
      discount: 0,
      provincial: 0,
      federal,
      federalBandLabel: federalBand.label,
      total: federal,
    };
  }

  const schedule = TOKEN_SCHEDULES[input.province];
  const band = bandFor(schedule.bands, cc);

  const provincialGross =
    band.kind === 'percent' ? price * band.rate : band.amount;

  // A lifetime token is a one-off and is not discounted for early payment.
  const isLifetime = band.kind === 'lifetime';
  const discountRate = !isLifetime && input.payingEarly ? (schedule.earlyPayment?.rate ?? 0) : 0;
  const discount = provincialGross * discountRate;

  return {
    available: true,
    schedule,
    bandLabel: band.label,
    isLifetime,
    provincialGross,
    discount,
    provincial: provincialGross - discount,
    federal,
    federalBandLabel: federalBand.label,
    total: provincialGross - discount + federal,
  };
}

/* ══ Agricultural income tax ═════════════════════════════════════════════ */

/**
 * The slab table the 2025 provincial Acts adopted.
 *
 * Sindh, KP and Balochistan each legislated in early 2025 to replace their
 * area-based regimes with an income-slab regime aligned to the federal
 * non-salaried table, effective 1 January 2025. All three enacted the SAME
 * numbers, which is why one table serves all three here rather than three
 * identical copies.
 *
 * It is the same table as BUSINESS_SLABS in ./business.ts, and deliberately
 * restated rather than imported: they are set by different legislatures and a
 * future provincial Finance Act can move one without moving the other. Sharing
 * the array would make that divergence silently impossible to express.
 */
export const AGRICULTURE_SLABS: Slab[] = [
  { upTo: 600_000, rate: 0, fixed: 0 },
  { upTo: 1_200_000, rate: 0.15, fixed: 0 },
  { upTo: 1_600_000, rate: 0.2, fixed: 90_000 },
  { upTo: 3_200_000, rate: 0.3, fixed: 170_000 },
  { upTo: 5_600_000, rate: 0.4, fixed: 650_000 },
  { upTo: null, rate: 0.45, fixed: 1_610_000 },
];

export const AGRICULTURE_COMPANY_RATES = {
  small: 0.2,
  normal: 0.29,
} as const;

/**
 * Punjab is deliberately excluded from the calculation.
 *
 * Punjab set its agricultural rates by notification in March 2025, and again
 * in September 2025 applying them retrospectively, rather than by putting them
 * before the Assembly at budget time. On 21 April 2026 the Punjab Assembly's
 * Speaker ruled both notifications void ab initio, holding that section 11(2)
 * of the Punjab Agricultural Income Tax Act 1997 makes laying the rates before
 * the Assembly mandatory rather than procedural, and directed that assessments
 * made under them be suspended.
 *
 * Punjab is also the only province whose agricultural rates are not in its
 * Act at all: the 2024 Amendment deleted the rate Schedules and moved them to
 * rules, and the consolidated statute prints "SCHEDULES [OMITTED]".
 *
 * So there is no rate here that can honestly be called current. Publishing the
 * Board of Revenue's figures would mean handing a Punjab farmer a number
 * computed under a notification a legislature has declared void. The page
 * states the position and points at the Board of Revenue instead.
 */
export const PUNJAB_AGRICULTURE_DISPUTED = {
  province: 'punjab' as const,
  reason:
    'Punjab set its agricultural income tax rates by notification rather than through the Assembly. On 21 April 2026 the Assembly Speaker ruled those notifications void, holding that the Act requires rates to be laid before the Assembly, and directed that assessments under them be suspended. Punjab is also the only province whose agricultural rates sit in rules rather than in its Act, which is why no schedule can be quoted here with confidence.',
  authority: 'Punjab Agricultural Income Tax Act 1997, as amended in 2024 and 2025',
  contact: 'Punjab Board of Revenue',
} as const;

/**
 * Whether a province still charges a per-acre land tax alongside the income
 * one, and on what basis.
 *
 * This is the detail most summaries get wrong. The 2025 Acts did NOT abolish
 * land tax everywhere: Sindh repealed its old Ordinance outright, but KP and
 * Balochistan substituted their land tax schedules rather than deleting them,
 * and in both the land tax operates as a FLOOR. A holding pays the greater of
 * the income-based tax and the area-based one, not the sum of the two.
 */
export const LAND_TAX_POSITION: Record<Province, { stillCharged: boolean; note: string }> = {
  sindh: {
    stillCharged: false,
    note: 'Abolished. The Sindh Agricultural Income Tax Act 2025 repealed the 2000 Ordinance, so only the income-based tax remains.',
  },
  kp: {
    stillCharged: true,
    note: 'Still charged, as a floor rather than an extra. Where the income-based tax comes out lower than the per-acre tax on the same holding, the per-acre figure is charged instead.',
  },
  balochistan: {
    stillCharged: true,
    note: 'Still charged. The 2025 Amendment substituted the land tax schedule rather than deleting it, so Balochistan has both a land tax and an income tax.',
  },
  punjab: {
    stillCharged: true,
    note: 'Still charged, and the Act keeps the greater-of rule between the land tax and the income tax. The rates themselves are the part in dispute.',
  },
  ict: {
    stillCharged: false,
    note: 'Agriculture is a provincial subject. Islamabad has no provincial agricultural income tax of its own.',
  },
};

export type AgricultureTaxpayer = 'individual' | 'small-company' | 'company';

export interface AgricultureInput {
  province: Province;
  annualIncome: number;
  taxpayer: AgricultureTaxpayer;
}

export const EMPTY_AGRICULTURE_INPUT: AgricultureInput = {
  province: 'sindh',
  annualIncome: 0,
  taxpayer: 'individual',
};

export interface AgricultureResult {
  /** False for Punjab, and for Islamabad, where no schedule can be applied. */
  available: boolean;
  income: number;
  tax: number;
  rows: SlabRow[];
  rate: number;
  effectiveRate: number;
  afterTax: number;
  landTax: { stillCharged: boolean; note: string };
}

export function calculateAgriculture(input: AgricultureInput): AgricultureResult {
  const income = money(input.annualIncome);
  const landTax = LAND_TAX_POSITION[input.province];

  // Punjab's rates are void and Islamabad has none. Neither can be computed.
  if (input.province === 'punjab' || input.province === 'ict') {
    return {
      available: false,
      income,
      tax: 0,
      rows: [],
      rate: 0,
      effectiveRate: 0,
      afterTax: income,
      landTax,
    };
  }

  if (input.taxpayer !== 'individual') {
    const rate =
      input.taxpayer === 'small-company'
        ? AGRICULTURE_COMPANY_RATES.small
        : AGRICULTURE_COMPANY_RATES.normal;
    const tax = income * rate;
    return {
      available: true,
      income,
      tax,
      rows: [],
      rate,
      effectiveRate: income > 0 ? tax / income : 0,
      afterTax: income - tax,
      landTax,
    };
  }

  const { tax, rows } = taxOnSlabs(income, AGRICULTURE_SLABS);

  return {
    available: true,
    income,
    tax,
    rows,
    rate: 0,
    effectiveRate: income > 0 ? tax / income : 0,
    afterTax: income - tax,
    landTax,
  };
}

assertSlabsConsistent(
  AGRICULTURE_SLABS,
  'Provincial agricultural income tax slabs (Sindh, KP and Balochistan Acts of 2025)',
);
