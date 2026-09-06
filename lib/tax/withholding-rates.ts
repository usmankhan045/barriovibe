/**
 * Withholding rates the site states but does not yet compute.
 *
 * ## Why these live apart from ./withholding.ts
 *
 * That file holds the four sections a calculator on this site works out, each
 * with its own input type, result type and page. These are the sections the
 * rate card cites and nothing computes: there is no page asking a visitor
 * which kind of mutual fund paid their dividend. They are data rather than
 * engines, so they are declared as data.
 *
 * A calculator can graduate a section out of here later. Nothing about the
 * shape below prevents it.
 *
 * ## The one rule that governs every non-filer figure here
 *
 * None of these sections states a non-filer rate of its own. The First
 * Schedule gives one rate; Rule 1 of the TENTH Schedule, read with section
 * 100BA, then increases it "by hundred percent" for a person not on the Active
 * Taxpayer List. So every non-filer figure on this card is the filer rate
 * doubled, and it is derived rather than typed for exactly that reason.
 *
 * Rule 10 of that Schedule lists the sections the doubling does NOT reach.
 * None of the five below appears in it, which was checked line by line rather
 * than assumed.
 *
 * ONE CHANGE WORTH KNOWING: Rule 1A, which created an intermediate "on the
 * list but filed late" category with its own reduced rates, was OMITTED by the
 * Finance Act 2026. For tax year 2027 the position is binary. A rate card
 * carrying a late-filer column is out of date.
 *
 * ## Sources
 *
 * Income Tax Ordinance, 2001 as amended up to 30 June 2026, published by FBR,
 * which is the text in force for tax year 2027. Cross-checked against KPMG
 * Taseer Hadi & Co's "Withholding Tax Collection Deduction, TY 2027" (July
 * 2026), which agrees on every rate below.
 */

/** Rule 1 of the Tenth Schedule: the filer rate, increased by 100%. */
export const TENTH_SCHEDULE_UPLIFT = 2;

/** A non-filer's rate under Rule 1. Derived, never typed. */
export const nonFilerRate = (filerRate: number): number =>
  filerRate * TENTH_SCHEDULE_UPLIFT;

/** What a deduction becomes at filing. */
export type TaxNature = 'Adjustable' | 'Final' | 'Minimum' | 'Varies';

export interface WithholdingRate {
  /** What distinguishes this rate from the others in its section. */
  label: string;
  /** The rate on the Active Taxpayer List. */
  filer: number;
  nature: TaxNature;
  /** Anything a reader would otherwise get wrong. */
  note?: string;
}

export interface WithholdingSection {
  /** e.g. "150". */
  section: string;
  /** The heading a reader looks for. */
  title: string;
  /** Where the rates sit in the First Schedule, for the citation. */
  division: string;
  /** What the rate is charged on, where that is not obvious. */
  chargedOn?: string;
  rates: WithholdingRate[];
  /** Who must deduct, where the section limits it. */
  withholdingAgent?: string;
  /** A note about the section as a whole rather than one of its rates. */
  note?: string;
}

/**
 * Section 150, dividends.
 *
 * The mutual fund case is the one most often stated wrongly. It is not one
 * rate: the Finance Act 2025 split it by what the fund itself holds, so a
 * single dividend can carry two rates in proportion to the fund's average
 * annual investment in debt securities against equities.
 *
 * DELIBERATELY ABSENT: the inter-corporate dividend within a group taxed
 * under section 59AA. That is an EXEMPTION under clause (103A) of Part I of
 * the Second Schedule, not a reduced rate in Division I. Listing it as a rate
 * would misstate what it is.
 */
export const DIVIDENDS: WithholdingSection = {
  section: '150',
  title: 'Dividends',
  division: 'Division I, Part III, First Schedule',
  chargedOn: 'the gross dividend',
  rates: [
    {
      label: 'Independent power producers, where the dividend is a pass-through item reimbursed by CPPA-G',
      filer: 0.075,
      nature: 'Final',
    },
    {
      label: 'A REIT, and every case not listed separately here',
      filer: 0.15,
      nature: 'Final',
    },
    {
      label: 'A mutual fund, on the part of the dividend from equities',
      filer: 0.15,
      nature: 'Final',
      note: 'A fund holding both is split in proportion to its average annual investment in each, so one dividend can carry two rates.',
    },
    {
      label: 'A mutual fund, on the part from debt securities, paid to a person other than a company',
      filer: 0.25,
      nature: 'Final',
    },
    {
      label: 'A mutual fund, on the part from debt securities, paid to a company',
      filer: 0.29,
      nature: 'Final',
    },
    {
      label: 'A company paying no tax because of an exemption, carried-forward losses or tax credits',
      filer: 0.25,
      nature: 'Final',
    },
    {
      label: 'A special purpose vehicle, paid to a REIT scheme',
      filer: 0,
      nature: 'Final',
      note: 'Nil only where the recipient is itself a REIT scheme. Anyone else takes the rate below.',
    },
    {
      label: 'A special purpose vehicle, paid to anyone other than a REIT scheme',
      filer: 0.35,
      nature: 'Final',
    },
  ],
};

/**
 * Section 151, profit on debt.
 *
 * Two things here are counter-intuitive and both are stated rather than
 * glossed:
 *
 *   THE RATE ROSE SHARPLY AND RECENTLY. The Finance Act 2025 replaced a flat
 *   15% with the three-tier structure below. Somebody who last checked in 2024
 *   remembers 15% on a bank deposit and now pays 20%.
 *
 *   WHAT THE DEDUCTION *IS* DEPENDS ON WHO YOU ARE AND HOW MUCH YOU EARNED.
 *   Section 151(3) makes it minimum tax, except for a company or where section
 *   7B applies. Section 7B covers non-companies but stops at Rs 5 million of
 *   profit on debt. So an individual under that figure is on a final regime, an
 *   individual over it is on minimum tax, and a company is on advance tax. The
 *   Rs 5 million is a REGIME SWITCH, not an exemption: nothing is free below it.
 */
export const PROFIT_ON_DEBT: WithholdingSection = {
  section: '151',
  title: 'Profit on debt',
  division: 'Division IA, Part III, First Schedule',
  chargedOn: 'the gross yield, less any Zakat paid under the Zakat and Ushr Ordinance',
  rates: [
    {
      label: 'An account or deposit with a banking company or financial institution',
      filer: 0.2,
      nature: 'Varies',
    },
    {
      label: 'Government securities, where the recipient is not an individual',
      filer: 0.2,
      nature: 'Varies',
    },
    {
      label: 'Every other case, including National Savings, the Post Office and Government securities paid to an individual',
      filer: 0.15,
      nature: 'Varies',
    },
  ],
  note: 'What the deduction becomes depends on the recipient. For an individual or an association of persons with profit on debt up to Rs 5 million it is final tax under section 7B; above that figure it is minimum tax. For a company it is adjustable. The Rs 5 million is a switch between regimes, not an amount that goes untaxed.',
};

/**
 * Section 156, prizes and winnings.
 *
 * The trap is the non-cash prize. Section 156(2) makes the payer collect tax
 * on the FAIR MARKET VALUE of a prize that is not money, so the winner of a car
 * or a plot hands over cash before taking it.
 */
export const PRIZES: WithholdingSection = {
  section: '156',
  title: 'Prizes and winnings',
  division: 'Division VI, Part III, First Schedule',
  chargedOn: 'the gross amount paid',
  rates: [
    {
      label: 'A prize on a prize bond, or a cross-word puzzle',
      filer: 0.15,
      nature: 'Final',
    },
    {
      label: 'Winnings from a raffle, lottery or quiz, and a prize offered by a company to promote sales',
      filer: 0.2,
      nature: 'Final',
    },
  ],
  note: 'Where the prize is not money, the payer collects the tax on its fair market value, so a car or a plot costs the winner cash before they can take it.',
};

/**
 * Section 233, brokerage and commission.
 *
 * Two boundaries here are read as exemptions and are not:
 *
 *   THE Rs 500,000 IS A BAND EDGE. A life insurance agent on Rs 600,000 of
 *   commission does not get 8% on the first half-million: the whole lot falls
 *   into the 12% row.
 *
 *   THE TURNOVER TEST IS ABOUT THE PAYER, NOT THE AGENT. Only a government
 *   body, a company, or an individual or association with turnover of Rs 100
 *   million or more has to deduct at all.
 */
export const BROKERAGE: WithholdingSection = {
  section: '233',
  title: 'Brokerage and commission',
  division: 'Division II, Part IV, First Schedule',
  rates: [
    { label: 'Advertising agents', filer: 0.1, nature: 'Minimum' },
    {
      label: 'Life insurance agents, where commission is under Rs 500,000 a year',
      filer: 0.08,
      nature: 'Minimum',
      note: 'A band edge, not an exemption: commission of Rs 500,000 or more falls entirely into the row below.',
    },
    { label: 'Everyone else', filer: 0.12, nature: 'Minimum' },
  ],
  withholdingAgent:
    'A federal, provincial or local government body, a company, or an individual or association of persons with turnover of Rs 100 million or more. A smaller business paying commission does not deduct.',
  note: 'Commission an agent keeps out of money it remits to its principal is treated as paid by the principal, who must still account for the tax. An advertising agent is charged this in addition to the deduction on the advertising services themselves.',
};

/**
 * Section 236A, sale by auction.
 *
 * The definitions do more work than the rates. "Sale by public auction"
 * expressly includes renewing a licence that was previously auctioned, and
 * "sale of property" includes awarding a lease, including a lease of the right
 * to collect tolls. It reaches confiscated and attached property, and applies
 * whether or not the goods belong to the Government.
 */
export const AUCTIONS: WithholdingSection = {
  section: '236A',
  title: 'Sale by auction',
  division: 'Division VIII, Part IV, First Schedule',
  chargedOn: 'the gross sale price',
  rates: [
    { label: 'Any property or goods sold by auction', filer: 0.1, nature: 'Adjustable' },
    {
      label: 'Immovable property, and Pakistan Railways train management services',
      filer: 0.05,
      nature: 'Adjustable',
    },
  ],
  note: 'Renewing a licence that was previously auctioned counts as a sale by auction, and where the price is paid in instalments the tax is collected with each one. Tax on a lease of the right to collect tolls is final rather than adjustable.',
};

/** Every section this module states, in the order the card shows them. */
export const WITHHOLDING_SECTIONS: WithholdingSection[] = [
  DIVIDENDS,
  PROFIT_ON_DEBT,
  PRIZES,
  BROKERAGE,
  AUCTIONS,
];
