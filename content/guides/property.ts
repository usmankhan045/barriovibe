import type { Guide } from './types';
import { CGT_HOLDING_TABLE, RENT_SLABS } from '@/lib/tax/property';

/**
 * Cluster 6: property tax.
 *
 * This guide opens with the strongest authority signal in the whole set: a
 * live PDF on fbr.gov.pk states a rate the enacted Finance Act 2026
 * contradicts. FBR's Salient Features were written against the Bill, the
 * National Assembly amended it on 26 June 2026, and assent followed on 27
 * June. So the Salient Features say 236K is 1.5 percent and the Act says 1.25.
 *
 * Our calculator already has 1.25. Leading with that is not a boast, it is the
 * clearest possible demonstration of why "cite the primary source" is not
 * enough on its own: you have to cite the RIGHT primary source, and know which
 * of two government documents was overtaken.
 */

/** Render a rate the way the Schedule prints it, with nil shown as a word. */
function pct(rate: number): string {
  if (rate === 0) return 'Nil';
  const asPercent = rate * 100;
  return `${Number.isInteger(asPercent) ? asPercent : asPercent.toFixed(1)}%`;
}

const PROPERTY_TAX: Guide = {
  slug: 'tax-on-buying-and-selling-property',
  cluster: 'property',
  title: 'Tax on Buying and Selling Property in Pakistan',
  navLabel: 'Property tax',
  card: 'What a buyer and a seller each pay for tax year 2027, why FBR\'s own summary states a rate the law contradicts, and the deemed-income tax that no longer exists.',

  answer:
    'A seller pays 2.75% of the transfer value under section 236C, or 11.5% if not on the Active Taxpayer List. A buyer on the list pays a flat 1.25% under section 236K at every value, while a buyer not on it pays 10.5% to 18.5% by band. Both are advance tax, creditable against your final liability rather than a separate charge. Section 7E, the deemed rental income tax, was struck down and repealed in 2026.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'FBR\'s own summary states a rate the Act contradicts',
      body: 'FBR\'s Salient Features document for Budget 2026-27, still live on fbr.gov.pk, gives the section 236K flat rate as 1.5%. The enacted Finance Act 2026 sets it at 1.25%. The explanation is timing: the Salient Features were written against the Finance Bill, the National Assembly amended it on 26 June 2026, and assent followed on 27 June. Anyone who goes to the primary source and stops at that PDF publishes 1.5% in good faith and is wrong. Cite the Act.',
    },

    {
      kind: 'table',
      heading: 'What each side pays, tax year 2027',
      intro:
        'Note the asymmetry in what the tax is charged on: section 236K works off fair market value, section 236C off the gross consideration received. The statutory language genuinely differs between them.',
      columns: ['Transaction', 'On the ATL', 'Not on the ATL'],
      rows: [
        ['Selling, section 236C', '2.75%', '11.5%'],
        ['Buying up to Rs 50m, section 236K', '1.25%', '10.5%'],
        ['Buying Rs 50m to 100m', '1.25%', '14.5%'],
        ['Buying above Rs 100m', '1.25%', '18.5%'],
      ],
    },

    {
      kind: 'calculator',
      toolSlug: 'property-purchase-tax',
      heading: 'What a purchase costs',
      body: 'Enter the value and your status. The calculator applies the bands above and shows both sides of the gap, so you can see what filing would have saved on this one transaction.',
    },

    {
      kind: 'prose',
      heading: 'Advance tax is not your final tax',
      body: [
        'This is the most expensive misunderstanding in Pakistani property. Sections 236C and 236K are advance tax: they are creditable against your final liability for the year and refundable if they exceed it. They are not a separate charge you pay on top of everything else, and they are not the capital gains tax.',
        'A seller therefore pays 236C on the whole transfer value at the time of transfer, and separately owes capital gains tax under section 37 on the actual gain. The 236C already collected comes off that liability. A calculator that reports both without netting them tells you that you owe a sum you do not.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'One case where 236C stops being adjustable',
      body: 'Where a property is bought and sold within the same tax year, section 236C(2) is reported to treat the collection as minimum tax: not adjustable and not refundable. That matters to anyone flipping property rather than holding it. We have not been able to read that sub-section in the bare Act, so treat it as a question to raise with your adviser rather than as settled, and note that no published guide we have found addresses it at all.',
    },

    {
      kind: 'prose',
      heading: 'Capital gains: the acquisition date decides everything',
      body: [
        'Section 37 splits on a single date. Property acquired on or after 1 July 2024 is taxed at a flat 15% for a person on the Active Taxpayer List at the date of disposal, however long it was held. There is no holding-period relief at all.',
        'Property acquired on or before 30 June 2024 stays on the old holding-period table for every later tax year, and that table differs by what the property is. Open plots, constructed property and flats have materially different schedules, which is the detail most published tables flatten into one column.',
      ],
    },

    {
      kind: 'table',
      heading: 'Capital gains on property acquired before 1 July 2024',
      intro:
        'Three different schedules. Flats reach nil fastest at three years, constructed property at five, open plots at six.',
      columns: ['Holding period', 'Open plots', 'Constructed', 'Flats'],
      rows: [
        ['Up to 1 year', '15%', '15%', '15%'],
        ['1 to 2 years', '12.5%', '10%', '7.5%'],
        ['2 to 3 years', '10%', '7.5%', 'Nil'],
        ['3 to 4 years', '7.5%', '5%', '-'],
        ['4 to 5 years', '5%', 'Nil', '-'],
        ['5 to 6 years', '2.5%', '-', '-'],
        ['Over 6 years', 'Nil', '-', '-'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'A non-filer does not get the flat 15%',
      body: 'A person not on the Active Taxpayer List at the date of disposal is charged at the ordinary Division I rates for individuals and associations, or Division II for companies, subject to a floor: the tax shall not be less than 15% of the gain. So a non-filer pays somewhere between 15% and the top slab rate depending on the size of the gain, not a single figure.',
    },

    {
      kind: 'calculator',
      toolSlug: 'property-capital-gains',
      heading: 'Work out the gain',
      body: 'The calculator asks for the acquisition date first, because nothing else can be decided until it knows which regime applies.',
    },

    {
      kind: 'prose',
      heading: 'Section 7E no longer exists',
      body: [
        'The deemed rental income tax, which charged you on income you never received from property you merely owned, is gone. The Federal Constitutional Court held section 7E unconstitutional on 7 May 2026, and the Finance Act 2026 then omitted both the section and its rate entry at Division VIIIC of Part I of the First Schedule.',
        'This matters practically because a great deal of published material still explains how to obtain a 7E exemption certificate. If a page is telling you to get one, that page has not been updated since May 2026 and you should treat everything else on it with the same suspicion.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The late filer tier is also gone',
      body: 'Between 2024 and 2026 there was a third rate tier for property: the Finance Act 2024 inserted Rule 1A into the Tenth Schedule creating a "late filer" who paid more than an on-time filer but less than a non-filer, and it applied only to sections 236C and 236K. The Finance Act 2026 omitted Rule 1A. Every rate card for tax year 2027 has two columns.',
    },

    {
      kind: 'prose',
      heading: 'The value the tax is charged on may not be your price',
      body: [
        'Section 68(4) empowers FBR to notify fair market values, and section 68(6) provides that consideration shall not be taken to be less than the notified value. The practical effect is that both advance taxes are computed on the higher of what you actually paid and what FBR says the property is worth.',
        'Those tables are published as city-wise notifications and revised irregularly rather than on a fixed cycle. Before you budget for a transaction, look up the notified value for the specific locality, because a number several years old is no guide to the current one.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Provincial taxes are on top, and we will not quote them here',
      body: 'Stamp duty, capital value tax and registration fees are provincial and differ by province. We have not been able to source the current Khyber Pakhtunkhwa rates from the KP Revenue Authority directly, and the figures circulating for KP come from sources we would not rely on for a client. Punjab reduced stamp duty by Ordinance in 2026, and an Ordinance lapses after ninety days unless enacted, so even that is not safe to state without checking. Ask your provincial authority or ask us.',
    },
  ],

  faqs: [
    {
      question: 'How much tax do I pay when selling property in Pakistan?',
      answer:
        'Under section 236C a seller on the Active Taxpayer List pays 2.75% of the gross consideration received, and a seller not on the list pays 11.5%. That is advance tax, creditable against your final liability. Capital gains tax under section 37 is separate and the 236C already collected comes off it.',
    },
    {
      question: 'How much advance tax does a buyer pay on property?',
      answer:
        'Under section 236K a buyer on the Active Taxpayer List pays a flat 1.25% of fair market value at every value. A buyer not on the list pays 10.5% up to Rs 50 million, 14.5% between Rs 50 and 100 million, and 18.5% above that.',
    },
    {
      question: 'Is section 236K 1.25% or 1.5%?',
      answer:
        '1.25%. FBR\'s Salient Features document for Budget 2026-27 states 1.5%, but that document was written against the Finance Bill, which the National Assembly amended before assent on 27 June 2026. The enacted Finance Act 2026 sets 1.25%.',
    },
    {
      question: 'Is 236C the final tax on selling property?',
      answer:
        'No. It is advance tax, creditable against your final liability for the year and refundable if it exceeds it. Treating it as a final charge is the most common and most expensive mistake in Pakistani property transactions.',
    },
    {
      question: 'How is capital gains tax calculated on property in Pakistan?',
      answer:
        'The acquisition date decides the regime. Property acquired on or after 1 July 2024 is taxed at a flat 15% for a person on the Active Taxpayer List, whatever the holding period. Property acquired before that date follows a holding-period table that differs for open plots, constructed property and flats, reaching nil at six, five and three years respectively.',
    },
    {
      question: 'Do non-filers pay 15% capital gains tax on property?',
      answer:
        'No. A person not on the Active Taxpayer List at the date of disposal is charged at the ordinary slab rates for individuals and associations, subject to a floor of 15% of the gain. The result is between 15% and the top slab rate depending on the size of the gain.',
    },
    {
      question: 'Is section 7E still applicable?',
      answer:
        'No. The Federal Constitutional Court held section 7E unconstitutional on 7 May 2026 and the Finance Act 2026 omitted both the section and its rate entry. Pages explaining how to obtain a 7E exemption certificate have not been updated since.',
    },
    {
      question: 'Is there still a late filer rate on property?',
      answer:
        'No. The late filer tier was created by the Finance Act 2024 through Rule 1A of the Tenth Schedule and applied only to sections 236C and 236K. The Finance Act 2026 omitted Rule 1A, so late filers now pay the same rates as on-time filers.',
    },
    {
      question: 'Is tax charged on my purchase price or the FBR value?',
      answer:
        'On the higher of the two. Section 68(4) lets FBR notify fair market values and section 68(6) provides that consideration shall not be taken to be less than the notified value. Check the notified value for the specific locality before you budget.',
    },
  ],

  publishedAt: '2026-09-12T07:00:00Z',
  related: ['filer-vs-non-filer'],

  seo: {
    title: 'Tax on Buying and Selling Property in Pakistan (2026-27)',
    description:
      'Section 236C and 236K rates for tax year 2027, why FBR\'s own summary contradicts the Act, the capital gains split at 1 July 2024, and the repeal of section 7E.',
  },
};


/**
 * Guide 16: capital gains on property.
 *
 * The acquisition date is the whole guide. Property bought on or after
 * 1 July 2024 is flat 15 percent forever; property bought a day earlier stays
 * on a holding-period table that reaches nil. Two identical plots sold on the
 * same day at the same gain can carry wildly different tax, and the only thing
 * separating them is when they were bought.
 *
 * ── Why the holding table is interpolated, not typed ──
 *
 * It renders from CGT_HOLDING_TABLE in lib/tax/property.ts, the same array the
 * capital gains calculator computes with and that check-tax.ts asserts on every
 * build. Retyping it here would create a second source of truth for a table
 * that FBR's own consolidation prints incompletely.
 *
 * ── A document defect worth knowing about ──
 *
 * FBR's consolidation amended to 30 June 2026 prints only row 1 of the live
 * Division VIII table on page 526. Rows 2 to 7 are missing from the document
 * itself. The full grid survives only in the footnote reproducing the
 * pre-2024 Division. Recorded as cgt-division-viii-live-table.
 */

function holdingRows(): string[][] {
  return CGT_HOLDING_TABLE.map((band) => [
    band.label,
    pct(band.rates['open-plot']),
    pct(band.rates.constructed),
    pct(band.rates.flat),
  ]);
}

const PROPERTY_GAINS: Guide = {
  slug: 'capital-gains-tax-on-property',
  cluster: 'property',
  title: 'Capital Gains Tax on Property in Pakistan',
  navLabel: 'Capital gains on property',
  card: 'Why the date you bought decides everything, how the gain is computed with no allowance for inflation, and the relief that halves the rate for one group of sellers.',

  answer:
    'Property acquired on or after 1 July 2024 is taxed at a flat 15% under section 37, however long you held it. Property acquired on or before 30 June 2024 stays on the old holding-period table, which falls to nil after six years for an open plot, four for constructed property and two for a flat. The gain is simply what you sold it for less what you paid, with no adjustment for inflation.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'The acquisition date, not the holding period, is the first question',
      body: 'Two people can sell identical plots on the same day for the same gain and pay completely different tax. One bought on 30 June 2024 and, having held it seven years, pays nothing. The other bought on 1 July 2024 and pays 15% no matter how long they hold. The Finance Act 2024 did not amend the old table, it added a separate column for later acquisitions and left the existing one running. So a page that tells you capital gains tax on property is 15% is right about half the market and wrong about the rest.',
    },

    {
      kind: 'table',
      heading: 'Property acquired on or before 30 June 2024',
      intro:
        'The holding-period table, rendered from the same module the capital gains calculator computes with. Read down the column for what you own: the three property types reach nil at different points, and that is the part most summaries flatten.',
      columns: ['Holding period', 'Open plots', 'Constructed property', 'Flats'],
      rows: holdingRows(),
    },

    {
      kind: 'prose',
      heading: 'Property acquired on or after 1 July 2024',
      body: [
        'One rate, 15%, for a person on the Active Taxpayer List, and it does not decay. Holding the property for twenty years produces the same rate as selling it after eleven months.',
        'A person not on the list does not get that rate. The Ordinance charges them at the ordinary rates in Division I, the non-salaried slabs, subject to a floor of 15%. So a non-filer pays somewhere between 15% and the top slab rate, depending on their other income for the year, which means there is no single number to quote them. Our calculator reports a range for that reason rather than printing a figure it cannot know.',
      ],
    },

    {
      kind: 'calculator',
      toolSlug: 'property-capital-gains',
      heading: 'What the gain comes to on your case',
      body: 'Enter the acquisition date, what you paid, and what you sold for. The calculator picks the regime from the date rather than asking you which one applies, and it nets the section 236C already collected against the result.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Inflation is taxed as though it were profit',
      body: 'Section 37(2) computes the gain as A minus B: the consideration received less the cost of the asset. There is no indexation, no adjustment for the intervening years, and since the Finance Act 2022 no holding-period discount either. The former section 37(3), which reduced the gain to three-quarters where an asset had been held more than a year, was omitted outright. On a property held through a decade of Pakistani inflation, a large part of what the Ordinance calls a gain is the currency moving rather than the asset appreciating, and it is taxed identically.',
    },

    {
      kind: 'prose',
      heading: 'What counts as cost',
      body: [
        'B in the formula is the cost of the asset, and the sums people forget are the ones that reduce the bill. The purchase price is obvious. Less obvious, and equally deductible, are the costs of acquiring and disposing: stamp duty, registration charges, the agent commission on both ends, and legal fees.',
        'What does not go in is anything you have already claimed elsewhere, and ordinary maintenance. Capital improvements are a different matter from repainting, and the distinction is worth documenting at the time rather than reconstructing it years later under an assessment.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'A relief that halves the rate, for one group',
      body: 'A proviso to Division VIII reduces the section 37 rate by fifty per cent on the first sale of immovable property acquired or allotted to ex-servicemen and serving personnel of the Armed Forces, or ex-employees and serving personnel of the Federal and Provincial Governments, where the seller is the original allottee and the allotment authority certifies it. The conditions are cumulative and narrow: first sale, original allottee, certified. The same class also has a parallel exemption from section 236C on that sale, so two separate reliefs can apply to one transaction.',
    },

    {
      kind: 'prose',
      heading: 'How 236C interacts with what you actually owe',
      body: [
        'These are two different charges on one transaction and the relationship between them is where most of the expensive confusion sits. Section 236C is collected by whoever registers the transfer, on the gross consideration, before anyone has worked out whether you made money. Section 37 taxes the profit.',
        'The 236C is advance tax and credits against the section 37 liability. It is not an additional cost and it is not a settlement. A seller who treats it as either will either overpay or get a surprise: overpay by paying capital gains tax on top of it without taking the credit, or be surprised when the gain turns out to exceed what the advance tax covered.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Buying and selling in the same tax year changes the rules',
      body: 'The proviso to section 236C(2) provides that where property is acquired and disposed of within the same tax year, the tax collected under that section is minimum tax rather than adjustable. That inverts the position above. On a same-year resale, the 2.75% of gross consideration becomes a floor you cannot go below, so a flip at a thin margin can produce advance tax exceeding the tax on the actual gain, and none of the excess comes back. Anyone trading property rather than holding it should know this before the second transaction, not after.',
    },

    {
      kind: 'prose',
      heading: 'Selling at a loss',
      body: [
        'There is no capital gains tax on a loss, but section 236C is still collected, because it falls on the transfer value and takes no interest in whether the transaction made money. So a seller who lost money still pays 2.75% of the price at the registry.',
        'That collection is advance tax against the year\'s liability rather than a charge on the sale, so it is recoverable through the return in the ordinary way. It is also a reason the return matters to someone who assumes a loss-making sale has nothing to declare.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Overseas sellers who bought through the right account',
      body: 'A proviso to section 236C(1) added by the Finance Act 2021 provides that where the seller is a non-resident individual holding a POC, NICOP or CNIC who acquired the property through a Foreign Currency Value Account or an NRP Rupee Value Account with an authorised bank, the tax collected under section 236C is a final discharge of liability in lieu of the capital gains taxable under section 37. There is then no separate section 37 computation on that disposal. Note what decides it: the account the purchase was made through, years earlier. It is not a choice available at the point of sale.',
    },
  ],

  faqs: [
    {
      question: 'What is the capital gains tax rate on property in Pakistan?',
      answer:
        'It depends on when you bought it. Property acquired on or after 1 July 2024 is taxed at a flat 15% for a person on the Active Taxpayer List, whatever the holding period. Property acquired on or before 30 June 2024 uses a holding-period table that falls to nil after six years for an open plot, four for constructed property and two for a flat.',
    },
    {
      question: 'How long do I have to hold property to avoid capital gains tax in Pakistan?',
      answer:
        'Only if you bought it on or before 30 June 2024. On that table an open plot reaches nil after six years, constructed property after four and a flat after two. For property acquired on or after 1 July 2024 there is no holding period that removes the charge: the flat 15% applies indefinitely.',
    },
    {
      question: 'Is the capital gain adjusted for inflation in Pakistan?',
      answer:
        'No. Section 37(2) computes the gain as the consideration received less the cost of the asset, with no indexation. The three-quarters reduction for assets held more than a year, in the former section 37(3), was omitted by the Finance Act 2022.',
    },
    {
      question: 'Do I pay both 236C and capital gains tax when I sell property?',
      answer:
        'You pay 236C at the registry and it credits against your section 37 liability rather than adding to it. The exception is a property bought and sold in the same tax year: the proviso to section 236C(2) makes the collection minimum tax, so it becomes a floor rather than a credit.',
    },
    {
      question: 'Do I pay tax if I sell property at a loss?',
      answer:
        'No capital gains tax, because there is no gain. Section 236C is still collected, since it falls on the transfer value regardless of profit. It is advance tax and recoverable through your return.',
    },
    {
      question: 'What can I deduct from the sale price to reduce the gain?',
      answer:
        'The cost of the asset, which includes the costs of acquiring and disposing of it: stamp duty, registration charges, agent commission on both ends, and legal fees. Capital improvements count; ordinary maintenance does not.',
    },
    {
      question: 'Do non-filers pay 15% capital gains tax on property?',
      answer:
        'No, and it is usually more. A person not on the Active Taxpayer List is charged at the Division I non-salaried slab rates with a floor of 15%, so the figure depends on their total income for the year and can reach the top slab rate.',
    },
    {
      question: 'Is there any capital gains relief for armed forces or government allottees?',
      answer:
        'Yes. A proviso to Division VIII halves the section 37 rate on the first sale of property allotted to ex-servicemen and serving armed forces personnel, or ex-employees and serving personnel of the Federal and Provincial Governments, where the seller is the original allottee and the allotment authority certifies it.',
    },
  ],

  publishedAt: '2026-09-17T07:00:00Z',
  related: ['tax-on-buying-and-selling-property', 'filer-vs-non-filer'],

  seo: {
    title: 'Capital Gains Tax on Property in Pakistan',
    description:
      'Why the acquisition date decides the rate, the holding-period table for pre-July 2024 property, how 236C credits against the gain, and the same-year resale trap.',
  },
};


/**
 * Guide 23: rental income.
 *
 * Three corrections carry it, all read from the Ordinance:
 *
 *   1. Rent withholding stopped being a final tax in 2010. The old s.155(2)
 *      was omitted, and pages still describing the deduction as a discharge
 *      are sixteen years stale. Same shape as the s.111(4) unlimited-shield
 *      error: the source is quoting repealed law, not inventing.
 *   2. A boutique, beauty parlour, hospital, clinic or maternity home is a
 *      prescribed person by virtue of WHAT IT IS, with no threshold, while an
 *      individual only becomes one at Rs 1.5m of gross rent a year.
 *   3. A non-adjustable deposit is taxable rent spread over ten years, and it
 *      sits inside the withholding base.
 *
 * The slab table interpolates from lib/tax/property.ts, which check-tax
 * reconciles against Division V on every build.
 */

const rentMoney = new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 });

/** The rent table, built from the same array the calculator computes with. */
function rentRows(): string[][] {
  return RENT_SLABS.map((slab, i) => {
    const from = i === 0 ? 0 : (RENT_SLABS[i - 1]!.upTo ?? 0);
    const band =
      slab.upTo === null
        ? `Above Rs ${rentMoney.format(from)}`
        : i === 0
          ? `Up to Rs ${rentMoney.format(slab.upTo)}`
          : `Rs ${rentMoney.format(from + 1)} to Rs ${rentMoney.format(slab.upTo)}`;
    const rate = slab.rate === 0 ? 'Nil' : `${(slab.rate * 100).toFixed(0)}%`;
    const fixed = slab.fixed === 0 ? '-' : `Rs ${rentMoney.format(slab.fixed)}`;
    return [band, rate, fixed];
  });
}

const RENTAL_INCOME: Guide = {
  slug: 'tax-on-rental-income',
  cluster: 'property',
  title: 'Tax on Rental Income in Pakistan',
  navLabel: 'Rental income',
  card: 'What your tenant withholds, why it is not the end of the matter, the deductions almost nobody claims, and how a security deposit becomes taxable income.',

  answer:
    'Rent is taxed on a progressive table starting above Rs 300,000 a year. Certain tenants, called prescribed persons, must withhold from what they pay you, but since 2010 that deduction has been adjustable rather than final, so you still file and still compute your actual liability. Against that you can deduct a flat one-fifth for repairs, your provincial property tax, and profit on money borrowed to buy or build the property.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'The withholding is not a final tax, and has not been since 2010',
      body: 'This is the most consequential thing to get right, and pages still get it wrong in good faith. Section 155(2) used to provide that the tax deducted "shall be a final tax on the income from property". The Finance Act 2010 omitted that sub-section. So a deduction by your tenant is advance tax credited against your actual liability, not a settlement of it. Two practical consequences follow. You still file a return and still compute the tax on the rent table. And where the withheld amount exceeds what the table produces, the excess is yours to recover, which it would not be under a final-tax regime.',
    },

    {
      kind: 'table',
      heading: 'The rent table',
      intro:
        'Division V of Part III. Rendered from the same module the rental calculator computes with, so the table and the tool cannot disagree. "Tax at the floor" is the cumulative amount owed at the bottom of the band.',
      columns: ['Annual rent', 'Rate on the excess', 'Tax at the floor'],
      rows: rentRows(),
    },

    {
      kind: 'calculator',
      toolSlug: 'rental-income-tax',
      heading: 'What it comes to on your rent',
      body: 'Enter the annual rent to see the figure band by band, and what a tenant would withhold against it.',
    },

    {
      kind: 'list',
      heading: 'Who has to withhold from your rent',
      intro:
        'Section 155(3) lists prescribed persons. Most of the list is what you would expect. One entry is not, and it catches small businesses that have never heard of the section.',
      items: [
        'The Federal Government, a Provincial Government, or a Local Government',
        'A company',
        'A non-profit organization or a charitable institution',
        'A diplomatic mission of a foreign state',
        'A private educational institution, a boutique, a beauty parlour, a hospital, a clinic or a maternity home',
        'An individual or association of persons paying gross rent of one and a half million rupees or more in a year',
        'Any other person notified by the Board',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'A beauty parlour withholds from the first rupee. A wealthy individual may not.',
      body: 'Read the list again and notice the asymmetry. A boutique, a beauty parlour, a hospital, a clinic or a maternity home is a prescribed person because of what it is, with no turnover test and no rent threshold attached. An individual or an association becomes one only once the rent they pay reaches Rs 1.5 million a year. So a small salon renting a shop must withhold on every payment, while an individual paying Rs 1.4 million for a house withholds nothing at all. If you let commercial premises to one of the named trades, expect withholding whatever the rent.',
    },

    {
      kind: 'prose',
      heading: 'It applies whatever head your rent is taxed under',
      body: [
        'There used to be an argument that rent taxable as business income, rather than under the head Income from Property, fell outside section 155. The Finance Act 2021 added an Explanation closing it: for removal of doubt, sub-section (1) applies when a payment is made on account of rent of immovable property irrespective of head of income.',
        'A separate Explanation, inserted in 2006, widens what the withholding is calculated on. The gross amount of rent includes amounts referred to in section 16(1) or 16(3), which is the non-adjustable deposit dealt with below. A large deposit is therefore not outside the withholding base simply because it is not called rent.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'A non-adjustable deposit is taxable rent, spread over ten years',
      body: 'Section 16(1) is the provision landlords are most often surprised by. Where you receive from a tenant an amount which is not adjustable against the rent payable, that amount is treated as rent chargeable under the head Income from Property in the year you receive it and in each of the following nine tax years, in equal proportion. A Rs 2 million non-adjustable deposit is Rs 200,000 of taxable rent a year for a decade. It is not money held on trust for tax purposes, whatever the tenancy agreement calls it.',
    },

    {
      kind: 'prose',
      heading: 'What happens when you give the deposit back',
      body: [
        'Section 16(2) handles the early refund. If you return the amount on termination of the tenancy before the ten years have expired, no portion is allocated to the year of refund or to any later year. The spreading simply stops.',
        'Section 16(3) then handles the case that would otherwise tax the same money twice. If you let the property to a succeeding tenant and take a new non-adjustable amount from them, that succeeding amount is reduced by whatever portion of the earlier amount has already been charged to tax, and only the balance is spread. It is a sensible mechanism and it is almost never explained, which matters because a landlord who has taken deposits from two tenants in a decade is otherwise looking at an overstated figure.',
      ],
    },

    {
      kind: 'list',
      heading: 'What you can deduct',
      intro:
        'Section 15A, and these are more generous than most landlords realise. The repair allowance in particular is a flat proportion rather than a claim you have to evidence.',
      items: [
        'A repair allowance equal to one-fifth of the rent chargeable for the year, computed before any other deduction under the section. It is allowed whether or not you spent it',
        'Any insurance premium paid to insure the building against damage or destruction',
        'Any local rate, tax, charge or cess in respect of the property, paid to a local authority or government, other than a tax payable under the Ordinance itself',
        'Ground rent',
        'Profit paid on money borrowed, including by mortgage, to acquire, construct, renovate, extend or reconstruct the property',
        'Administration and collection expenditure, capped at four per cent of the rent chargeable for the year',
        'Legal costs of defending your title to the property or a suit connected with it',
        'Irrecoverable unpaid rent, where the tenancy was bona fide and the stated conditions are met',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Your provincial property tax is deductible against your rent',
      body: 'This is the one place the two property tax regimes meet, and nobody writes it. The annual Urban Immovable Property Tax you pay to your province is a tax in respect of the property paid to a government, so it falls squarely inside the section 15A(1)(c) deduction. The carve-out in that clause, "not being any tax payable under this Ordinance", excludes federal income tax and nothing else. Keep the challan: it reduces the base your federal tax on rent is computed on.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'These deductions are available to a person, not only to a company',
      body: 'Worth stating because the consolidation makes it easy to read the other way. The footnotes to section 15A record that the word "person" was substituted by the Finance Act 2016 and the word "company" by the Finance Act 2021. In that convention the quoted word is the one being replaced, so "company" came out and "person" went back in. The operative text reads "person", consistent with section 15(1), which charges rent received by a person generally. An individual landlord can claim all of the above.',
    },

    {
      kind: 'prose',
      heading: 'A company letting property is on a different rate',
      body: [
        'The table above is the individual and association position. A company pays a flat rate on rent rather than the progressive bands, and the non-filer figure is double it.',
        'The calculator on this page handles both, because the choice changes the answer substantially at the lower end: the first Rs 300,000 of rent is nil for an individual and is not for a company.',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much tax do I pay on rental income in Pakistan?',
      answer:
        'For an individual or association, on a progressive table starting above Rs 300,000 of annual rent and rising in bands. A company pays a flat rate instead. Whatever your tenant withheld is credited against that figure rather than being the end of it.',
    },
    {
      question: 'Is tax deducted by my tenant a final tax?',
      answer:
        'No, and it has not been since 2010. Section 155(2), which made the deduction a final tax on income from property, was omitted by the Finance Act 2010. The deduction is adjustable, so you file, compute the tax on the rent table, and recover any excess.',
    },
    {
      question: 'Does my tenant have to deduct tax from my rent?',
      answer:
        'Only if the tenant is a prescribed person under section 155(3). That includes companies, government, non-profits, and specifically a private educational institution, boutique, beauty parlour, hospital, clinic or maternity home. An individual or association only becomes one at Rs 1.5 million of gross rent a year.',
    },
    {
      question: 'Is a security deposit taxable in Pakistan?',
      answer:
        'If it is not adjustable against the rent, yes. Section 16(1) treats it as rent chargeable in the year received and each of the following nine years in equal proportion. If you refund it on termination before ten years, the spreading stops for the year of refund and afterwards.',
    },
    {
      question: 'What expenses can a landlord deduct in Pakistan?',
      answer:
        'Under section 15A: a flat one-fifth repair allowance, insurance premium, local rates and taxes on the property, ground rent, profit on money borrowed to acquire or build it, administration and collection costs up to four per cent of rent, legal costs defending title, and irrecoverable rent on stated conditions.',
    },
    {
      question: 'Can I claim the repair allowance if I did not spend it?',
      answer:
        'Yes. Section 15A(1)(a) allows an allowance equal to one-fifth of the rent chargeable for the year, computed before any other deduction under the section. It is a proportion of rent rather than a reimbursement of expenditure.',
    },
    {
      question: 'Is provincial property tax deductible against rental income?',
      answer:
        'Yes. Section 15A(1)(c) allows a deduction for any local rate, tax, charge or cess in respect of the property paid to a local authority or government, excluding only tax payable under the Income Tax Ordinance. Provincial Urban Immovable Property Tax qualifies.',
    },
    {
      question: 'Does section 155 apply if my rent is business income?',
      answer:
        'Yes. An Explanation added by the Finance Act 2021 states, for removal of doubt, that the sub-section applies when a payment is made on account of rent of immovable property irrespective of head of income.',
    },
  ],

  publishedAt: '2026-09-21T03:00:00Z',
  related: ['tax-on-buying-and-selling-property', 'how-to-file-your-tax-return'],

  seo: {
    title: 'Tax on Rental Income in Pakistan',
    description:
      'The rent table, why tenant withholding stopped being a final tax in 2010, the deductions landlords miss, and how a non-adjustable deposit becomes ten years of taxable rent.',
  },
};


/**
 * Guide 24: provincial property tax.
 *
 * The lead is the purest instance of this project's core failure mode we have
 * found: the levying department's own live page publishes repealed law. A
 * reader can check it in thirty seconds, which is what makes it worth leading
 * with rather than merely asserting we are more current.
 *
 * ── Scope, and why it is Punjab ──
 *
 * The Punjab reform is verified from the enacting instrument, the Punjab
 * Finance Act 2024 s.4, downloaded and read. Sindh, KP and ICT are not:
 * sindhlaws.gov.pk fails at TCP level, the ICT rate instrument S.R.O.
 * 404(I)/2024 is unpublished and the levy is in active litigation, and KP's
 * own department publishes superseded rates. So this guide gives Punjab in
 * full and the others structurally, and says which is which.
 *
 * ── Three things published as open questions ──
 *
 * The commencement notification for s.4 is unlocated, so 1 January 2025 is an
 * inference from the statutory 31.12.2024 pivot rather than a read date. No
 * rebate or surcharge percentage is printed, because no readable source
 * carries them. And no ICT rate is stated at all.
 */

const PROVINCIAL_PROPERTY_TAX: Guide = {
  slug: 'provincial-property-tax',
  cluster: 'property',
  title: 'Provincial Property Tax in Pakistan',
  navLabel: 'Provincial property tax',
  card: 'The annual tax your province charges on owning property, which is a different tax from the federal one, and why Punjab\'s own website describes law that was repealed.',

  answer:
    'Every province levies an annual Urban Immovable Property Tax on ownership, and it is entirely separate from the federal advance tax on buying and selling. Punjab moved from a percentage of annual rental value to a percentage of capital value under the Punjab Finance Act 2024, at rates between 0.07% and 0.09% with residential property up to Rs 5 million exempt. Sindh still uses annual rental value.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'Punjab\'s Excise and Taxation website describes a tax that no longer exists',
      body: 'Check it yourself, because that is the point. The department that levies the tax publishes a property tax page stating a rate of 5% of annual value, an exemption for houses up to five marlas, and a surcharge charged monthly. The Punjab Finance Act 2024 replaced the annual-value charge with a capital-value one, omitted the five-marla exemption outright, and the surcharge wording was changed to quarterly with effect from 1 July 2026. A consolidation of the Act hosted on that same domain carries no amendment later than 2013 and still prints the old ten per cent charge. None of this is obscure and none of it is hidden: it is simply not maintained, and it is the first thing that comes up when a reader searches.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'This is not the tax you pay when you buy or sell',
      body: 'Two completely different regimes get called "property tax" and conflating them sends people to the wrong office. The provincial Urban Immovable Property Tax is an annual charge on OWNING property, levied by your province\'s Excise, Taxation and Narcotics Control department. Sections 236C and 236K are federal advance income tax on TRANSFERRING it, collected by whoever registers the transfer, and section 37 is federal capital gains on the profit. Different statutes, different authorities, different events. Paying one has no effect on the other.',
    },

    {
      kind: 'table',
      heading: 'Punjab: the rates in force',
      intro:
        'The Schedule inserted by the Punjab Finance Act 2024. Taxable value is determined by the valuation table, which section 2(j) defines as the table notified under the Stamp Act 1899, so it is the DC rate rather than what you paid or what the property would rent for.',
      columns: ['Taxable value', 'Residential', 'Commercial'],
      rows: [
        ['Up to Rs 5 million', 'Exempt', '0.07%'],
        ['Over Rs 5 million to Rs 10 million', '0.07%', '0.07%'],
        ['Over Rs 10 million to Rs 25 million', '0.08%', '0.08%'],
        ['Rs 25 million and above', '0.09%', '0.09%'],
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'A lower rate does not always mean a lower bill',
      body: 'The Schedule carries a transitional floor that almost no coverage mentions. Where the tax produced by the table above is LOWER than the tax that was payable on and before 31 December 2024, you do not get the reduction: you keep paying on the old basis, uplifted, until the new figure catches up with it. So for a property already on the register before the reform, capital value acts as a floor rather than a cut. Someone comparing the headline percentages against the old five per cent of annual value and concluding their bill has collapsed should check the challan before spending the difference.',
    },

    {
      kind: 'list',
      heading: 'What else the Punjab Finance Act 2024 changed',
      intro:
        'The rate is the visible change. These matter more to how the tax actually works.',
      items: [
        'Section 5 was replaced. It used to be headed "Ascertainment of annual value" and is now "Ascertainment of taxable value", determined by the valuation table for the rating area',
        'Section 5-A, the machinery for valuation tables under the old regime, was omitted entirely',
        'The exemption for owner-occupied property and the exemption for houses up to five marlas were both omitted. The test is now the Rs 5 million taxable value threshold and nothing else',
        'A new section 6-A requires the owner to self-assess online, with a declaration of correctness, and pay on that basis',
        'Self-assessments may be audited at random. Where a variation is found, the assessing authority levies the correct tax plus a one-time penalty equal to the amount of tax evaded',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'When the new regime started, and why we will not give you a date to the day',
      body: 'The Punjab Finance Act 2024 came into force on 1 July 2024, but section 1(3) expressly held back section 4, the provision that rewrote the property tax, to commence "on such date as the Government may, by notification in the official Gazette, specify". The transitional table in the Schedule pivots on tax payable "on and before 31.12.2024", which points strongly to commencement on 1 January 2025, and that is the date generally reported. We have not been able to locate the notification itself, so we are telling you the inference rather than presenting it as a read date. If a precise commencement date matters to your case, ask the department for the notification number.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'On the rebate and the surcharge, we would rather say nothing than guess',
      body: 'Punjab gives a rebate for paying the year\'s tax in a lump sum by the due date, and charges a surcharge on unpaid tax. Both figures circulate widely and we could not obtain a source we can actually read for the current percentages: the Finance Act 2024 does not carry them, and the department\'s own page states figures we have already shown to be from the repealed regime. Rather than print a number that might be a year or a decade out of date, we are telling you the mechanisms exist and that the challan generated by the portal is the authoritative figure.',
    },

    {
      kind: 'prose',
      heading: 'Sindh has not followed Punjab',
      body: [
        'Sindh still charges on annual rental value rather than capital value, at 25 per cent of annual value, with annual value built from the plot and covered areas at notified rates less a repair allowance. If you own property in both provinces, you are dealing with two genuinely different systems rather than two rates.',
        'Sindh also keeps small-property exemptions that Punjab abolished, including relief tied to plot size and to a single small flat. We have not been able to read the Sindh statute directly, because the provincial law site does not respond at all from our environment, so what we can tell you rests on the department\'s own restatement rather than on the section text. We are not publishing Sindh due dates, rebates or surcharge percentages for the same reason.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Khyber Pakhtunkhwa, and Islamabad',
      body: [
        'Khyber Pakhtunkhwa charges on a table rather than as a percentage of a value: per-marla amounts by category and locality, with self-occupied property below about five marlas exempt and let-out property charged at double. The schedules were substituted by the KP Finance Act 2025. As in Punjab, the department\'s own site publishes superseded figures, so use the Finance Act rather than the web page.',
        'Islamabad is the one to be most careful about. The tax is collected by the Metropolitan Corporation under the Islamabad Capital Territory Local Government Act 2015, not by CDA under the CDA Ordinance as widely stated. The rate instrument is not published, and the levy has been through the Islamabad High Court more than once, with a notification struck down, that order suspended, and bills suspended again in mid-2026 while billing resumed. We are not giving you an Islamabad rate, because we have not seen one we can stand behind and the position may not be settled.',
      ],
    },

    {
      kind: 'steps',
      heading: 'Looking your property up in Punjab, and paying',
      intro:
        'The portal is epay.punjab.gov.pk and there is an ePay Punjab app. The identifier trips people up because most guides have it backwards.',
      steps: [
        {
          title: 'Search by PIN, not by PT-10',
          body: 'The Property Identification Number is the key you search with. The PT-10 is what the system returns to you, and there may be more than one: separate records for arrears and for the current year.',
        },
        {
          title: 'Pick the record you are paying',
          body: 'Choose the PT-10 the search returns, and check the property details against what you own before going further.',
        },
        {
          title: 'Generate the challan',
          body: 'The portal produces a PSID, a payment slip number of seventeen or eighteen digits.',
        },
        {
          title: 'Pay through any ordinary channel',
          body: 'The PSID is payable at ATMs, through internet and mobile banking, through wallets, or over the counter at a bank.',
        },
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'It reduces your federal tax on rent',
      body: 'If you let the property, the provincial property tax you pay is deductible against your rental income under section 15A(1)(c) of the Income Tax Ordinance, which allows any local rate, tax, charge or cess in respect of the property paid to a local authority or government. The only carve-out is for tax payable under the Ordinance itself, meaning federal income tax. So keep the challan: it is not just a receipt, it is a deduction.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Section 7E is repealed, but the cross-reference to it is not',
      body: 'Section 7E, the federal deemed rental income tax on property, was omitted by the Finance Act 2026 along with the Division that set its rate. Section 236C(2A) was not amended to match, and still directs the registering authority to refuse a transfer unless the seller has discharged a liability under section 7E. A repealed section is still being pointed at by a live one. Expect some counters to keep asking for a 7E certificate on that basis, and note separately that liability validly incurred for earlier tax years is not erased by the repeal.',
    },
  ],

  faqs: [
    {
      question: 'What is the property tax rate in Punjab?',
      answer:
        'Between 0.07% and 0.09% of taxable value under the Schedule to the Punjab Urban Immovable Property Tax Act 1958, as substituted by the Punjab Finance Act 2024. Residential property with taxable value up to Rs 5 million is exempt. The older 5% or 10% of annual value figures, including on the department\'s own website, are repealed.',
    },
    {
      question: 'Is the five marla exemption still available in Punjab?',
      answer:
        'No. The Punjab Finance Act 2024 omitted both the five-marla exemption and the owner-occupied exemption. The only residential threshold now is taxable value of Rs 5 million or less.',
    },
    {
      question: 'How is taxable value worked out in Punjab?',
      answer:
        'By the valuation table for the rating area. Section 2(j) defines a valuation table as the one notified under the Stamp Act 1899, which is the DC rate, so it is neither the price you paid nor a rental estimate.',
    },
    {
      question: 'Will my Punjab property tax go down under capital value?',
      answer:
        'Not necessarily. The Schedule contains a transitional provision: where the new calculation produces less tax than was payable on and before 31 December 2024, the old basis continues, uplifted, until the new figure overtakes it. For property already assessed before the reform, capital value acts as a floor.',
    },
    {
      question: 'Is provincial property tax the same as the tax on buying property?',
      answer:
        'No. Provincial Urban Immovable Property Tax is an annual charge on ownership levied by your province. Sections 236C and 236K are federal advance income tax on transfer, and section 37 is federal capital gains. Different statutes, different authorities, and paying one does not affect the other.',
    },
    {
      question: 'How do I check my property tax online in Punjab?',
      answer:
        'Through epay.punjab.gov.pk or the ePay Punjab app. Search using your Property Identification Number, the PIN. The system returns one or more PT-10 records, and you generate a challan from the one you want, which produces a PSID payable through banks, ATMs, apps or wallets.',
    },
    {
      question: 'Do I look up my property by PT-10 number?',
      answer:
        'The other way round. The PIN is what you search with and the PT-10 is what the system returns, often more than one, because arrears and the current year sit in separate records. Guides telling you to search by PT-10 have it backwards.',
    },
    {
      question: 'Can I deduct provincial property tax from my rental income?',
      answer:
        'Yes. Section 15A(1)(c) of the Income Tax Ordinance allows a deduction for any local rate, tax, charge or cess in respect of the property paid to a local authority or government, excluding only tax payable under the Ordinance itself.',
    },
  ],

  publishedAt: '2026-09-21T07:00:00Z',
  related: ['tax-on-buying-and-selling-property', 'tax-on-rental-income'],

  seo: {
    title: 'Provincial Property Tax in Pakistan (Punjab and Beyond)',
    description:
      'Punjab moved to capital value in 2024 and its own department page still says otherwise. The rates, the transitional floor, the portal, and how it differs from 236C and 236K.',
  },
};

export const PROPERTY_GUIDES: Guide[] = [
  PROPERTY_TAX,
  PROPERTY_GAINS,
  RENTAL_INCOME,
  PROVINCIAL_PROPERTY_TAX,
];



