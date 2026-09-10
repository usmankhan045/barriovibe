import type { Guide } from './types';
import { CGT_HOLDING_TABLE } from '@/lib/tax/property';

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

  publishedAt: '2026-09-15',
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

  publishedAt: '2026-09-25',
  related: ['tax-on-buying-and-selling-property', 'filer-vs-non-filer'],

  seo: {
    title: 'Capital Gains Tax on Property in Pakistan',
    description:
      'Why the acquisition date decides the rate, the holding-period table for pre-July 2024 property, how 236C credits against the gain, and the same-year resale trap.',
  },
};

export const PROPERTY_GUIDES: Guide[] = [PROPERTY_TAX, PROPERTY_GAINS];

