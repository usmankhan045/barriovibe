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
      kind: 'note',
      tone: 'info',
      heading: 'Capital gains is a separate charge, and the date you bought decides it',
      body: 'Section 236C is advance tax on the transfer. Section 37 taxes the profit, and it splits on a single date: property acquired on or after 1 July 2024 is flat 15% for a person on the Active Taxpayer List however long it was held, while property acquired on or before 30 June 2024 stays on a holding-period table that reaches nil, at different points for open plots, constructed property and flats. A person off the list does not get the flat rate at all. That is a whole subject rather than a paragraph, and the mechanics, the cost base and the same-year resale trap are set out in the capital gains guide below.',
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
        'Under section 37, and the acquisition date decides the regime. Property acquired on or after 1 July 2024 is taxed at a flat 15% for a person on the Active Taxpayer List, and property acquired earlier stays on a holding-period table that reaches nil. The mechanics, the cost base and the same-year resale rule are set out in our capital gains guide.',
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

  cta: {
    heading: 'Buying or selling, and want the figure checked?',
    body:
      'The advance tax, the capital gain and the provincial charge are three different questions on one transaction. Getting them straight before the transfer is cheaper than correcting afterwards.',
    buttonLabel: 'Talk to us about your sale',
  },
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
  related: ['tax-on-buying-and-selling-property', 'filer-vs-non-filer', 'tax-on-gifts-and-inheritance', 'capital-gains-on-shares'],

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
  related: ['tax-on-buying-and-selling-property', 'how-to-file-your-tax-return', 'landlord-tax-deductions'],

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
  related: ['tax-on-buying-and-selling-property', 'tax-on-rental-income', 'tax-on-agricultural-income'],

  seo: {
    title: 'Provincial Property Tax in Pakistan (Punjab and Beyond)',
    description:
      'Punjab moved to capital value in 2024 and its own department page still says otherwise. The rates, the transitional floor, the portal, and how it differs from 236C and 236K.',
  },
};


/**
 * Guide 31: what a landlord can deduct.
 *
 * The rental guide states the deductions in a list. This one is the working:
 * why the repair allowance is a proportion rather than a reimbursement, what
 * counts as a local rate, and the reading of the footnotes that decides
 * whether an individual can claim any of it at all.
 *
 * That last point is the reason the guide exists separately. The consolidation
 * makes it easy to read s.15A as company-only, and if you read it that way an
 * individual landlord walks away from a fifth of their rent.
 */

const LANDLORD_DEDUCTIONS: Guide = {
  slug: 'landlord-tax-deductions',
  cluster: 'property',
  title: 'What a Landlord Can Deduct in Pakistan',
  navLabel: 'Landlord deductions',
  card: 'The one-fifth repair allowance you get without spending it, the provincial property tax that reduces your federal bill, and why the statute is not company-only.',

  answer:
    'Section 15A allows a landlord to deduct a flat one-fifth of rent for repairs whether or not it was spent, insurance, local rates and taxes including provincial property tax, ground rent, profit on money borrowed to acquire or build the property, collection costs up to four per cent, legal costs of defending title, and irrecoverable rent. These are available to an individual, not only to a company.',

  sections: [
    {
      kind: 'note',
      tone: 'info',
      heading: 'The repair allowance is a proportion, not a reimbursement',
      body: 'Section 15A(1)(a) allows an allowance equal to one-fifth of the rent chargeable to tax for the year, computed before any other deduction under the section. Read that carefully, because it is more generous than landlords assume. It is not a claim for repairs you carried out and can evidence. It is a fixed proportion of rent, allowed whether you spent nothing on the property or spent more than a fifth. A landlord with a new building and no maintenance costs gets it, and a landlord who spent a third of the rent on repairs gets the same fifth and no more.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The statute is not company-only, though it reads that way at first',
      body: 'This is worth stating because getting it wrong costs an individual landlord a fifth of their rent. The footnotes to section 15A record that the word "person" was substituted by the Finance Act 2016 and the word "company" by the Finance Act 2021. Scanned quickly, that looks as though "company" was inserted in 2021 and the deductions are corporate. It is the opposite: in this convention the quoted word is the one being REPLACED, so "person" went out in 2016 and came back in when "company" was replaced in 2021. The operative text reads "person", and section 15(1) charges rent received by a person generally. An individual can claim all of it.',
    },

    {
      kind: 'table',
      heading: 'The deductions, and what each is limited by',
      intro:
        'Section 15A(1). Two are capped as a proportion of rent, and the rest are actual amounts.',
      columns: ['Deduction', 'Limit'],
      rows: [
        ['Repairs', 'One-fifth of rent chargeable, computed before other deductions'],
        ['Insurance premium against damage or destruction', 'Actual'],
        ['Local rate, tax, charge or cess on the property', 'Actual, excluding tax under the Ordinance'],
        ['Ground rent', 'Actual'],
        ['Profit on money borrowed to acquire, construct, renovate, extend or reconstruct', 'Actual'],
        ['Administration and collection charges', 'Four per cent of rent chargeable'],
        ['Legal costs defending title or a suit connected with the property', 'Actual'],
        ['Irrecoverable unpaid rent', 'The unpaid rent, on stated conditions'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Your provincial property tax belongs in that list',
      body: 'Section 15A(1)(c) covers any local rate, tax, charge or cess in respect of the property, or the rent from it, paid or payable to any local authority or government, and then carves out only "any tax payable under this Ordinance". The annual Urban Immovable Property Tax your province charges is a tax in respect of the property paid to a government, and it is plainly not payable under the Income Tax Ordinance, so it sits inside the deduction. The carve-out is there to stop you deducting your own income tax, nothing more. Keep the provincial challan with your records: it is a deduction rather than just a receipt.',
    },

    {
      kind: 'prose',
      heading: 'The collection charge was cut, and the older figure still circulates',
      body: [
        'Clause (h) allows expenditure paid wholly and exclusively for the purpose of deriving rent, including administration and collection charges, capped as a proportion of rent chargeable for the year.',
        'The cap was six per cent and the Finance Act 2020 substituted four. Pages quoting six per cent are six years out of date, which is a small error in itself but a useful signal about the rest of the page it appears on.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Interest on the loan that bought the property',
      body: [
        'Clause (e) allows profit paid or payable on any money borrowed, including by way of mortgage, to acquire, construct, renovate, extend or reconstruct the property. Clause (g) covers profit or interest where the property is subject to a mortgage or other capital charge.',
        'Note what the borrowing has to be for. It is the acquisition or improvement of the property producing the rent, not borrowing secured on it for another purpose. A loan taken against a rental property to fund a different business is not within the clause on its face.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Unpaid rent, and the conditions attached',
      body: 'Clause (j) allows an allowance for unpaid rent where there are reasonable grounds for believing it is irrecoverable, and the conditions are specific rather than a general bad-debt rule. The tenancy must have been bona fide; the defaulting tenant must have vacated or steps must have been taken to compel them to vacate; the defaulting tenant must not be in occupation of any other property of yours; and you must have taken all reasonable steps to institute legal proceedings for recovery, or have reasonable grounds for believing legal proceedings would be pointless. Writing off rent because a tenant stopped paying, without more, does not meet it.',
    },

    {
      kind: 'calculator',
      toolSlug: 'rental-income-tax',
      heading: 'What the rent is taxed at once deductions come off',
      body: 'The deductions above reduce the figure the rent table is applied to. Enter the rent to see the bands, then work from the net figure rather than the gross.',
    },

    {
      kind: 'prose',
      heading: 'What is not deductible',
      body: [
        'Anything already claimed elsewhere, and the income tax itself. The carve-out in clause (c) is explicit on the second point.',
        'The repair allowance also settles a question people ask in the other direction: because it is a fixed fifth rather than actual expenditure, there is no separate claim for the repairs themselves on top of it. The fifth is the repair deduction, whatever the invoices say.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Can I claim a repair allowance if I did not repair anything?',
      answer:
        'Yes. Section 15A(1)(a) gives an allowance equal to one-fifth of the rent chargeable for the year, computed before other deductions. It is a proportion of rent rather than a reimbursement of expenditure, so it is allowed whether or not you spent it.',
    },
    {
      question: 'Can an individual landlord claim section 15A deductions, or only a company?',
      answer:
        'An individual can. The footnotes make it look company-only, but the convention is that a footnote names the word REPLACED, so "company" was replaced by "person" in 2021. The operative text reads "person", consistent with section 15(1).',
    },
    {
      question: 'Is provincial property tax deductible against rental income?',
      answer:
        'Yes. Section 15A(1)(c) allows any local rate, tax, charge or cess in respect of the property paid to a local authority or government, excluding only tax payable under the Income Tax Ordinance. Provincial Urban Immovable Property Tax qualifies.',
    },
    {
      question: 'Can I deduct my home loan interest against rent?',
      answer:
        'Profit on money borrowed to acquire, construct, renovate, extend or reconstruct the property is deductible under section 15A(1)(e). The borrowing must be for the property producing the rent, not merely secured against it for another purpose.',
    },
    {
      question: 'How much can I claim for collecting the rent?',
      answer:
        'Up to four per cent of the rent chargeable for the year, for expenditure wholly and exclusively incurred in deriving the rent including administration and collection charges. The cap was six per cent until the Finance Act 2020 reduced it.',
    },
    {
      question: 'Can I write off rent a tenant never paid?',
      answer:
        'Only on the conditions in clause (j). The tenancy must have been bona fide, the tenant must have vacated or steps taken to compel them, they must not occupy another property of yours, and you must have taken reasonable steps to sue or have grounds to believe proceedings would be pointless.',
    },
    {
      question: 'Can I claim actual repair costs on top of the one-fifth allowance?',
      answer:
        'No. The one-fifth is the repair deduction. Because it is a fixed proportion rather than actual expenditure, there is no separate claim for the invoices on top of it.',
    },
    {
      question: 'Is my income tax deductible against rental income?',
      answer:
        'No. Clause (c) allows local rates and taxes on the property but expressly excludes any tax payable under the Income Tax Ordinance itself.',
    },
  ],

  publishedAt: '2026-09-25T03:00:00Z',
  related: ['tax-on-rental-income', 'provincial-property-tax'],

  seo: {
    title: 'What a Landlord Can Deduct in Pakistan: Section 15A',
    description:
      'The one-fifth repair allowance allowed whether or not you spent it, provincial property tax as a deduction, the four per cent collection cap, and why it is not company-only.',
  },
};


/**
 * Guide 34: gifts and inheritance.
 *
 * The point that carries it is the carry-over cost basis in s.79(3)(b), which
 * is almost never explained. A gift to a relative is not a tax-free step-up:
 * the recipient inherits the giver's ORIGINAL cost, so the accrued gain is
 * preserved and lands on the recipient when they eventually sell. Gifting
 * before selling defers nothing, it moves the gain to someone else.
 *
 * The second is new this year. An Explanation inserted into s.79(1)(b) by the
 * Finance Act 2026 brings a family settlement consequent upon death inside the
 * non-recognition rule, which closes a real problem for heirs who redistribute
 * property by agreement rather than taking exactly what the succession
 * certificate allocates.
 */

const GIFTS_AND_INHERITANCE: Guide = {
  slug: 'tax-on-gifts-and-inheritance',
  cluster: 'property',
  title: 'Tax on Gifts and Inherited Property in Pakistan',
  navLabel: 'Gifts and inheritance',
  card: 'Why a gift to a relative is not a clean slate, who counts as a relative, and the family settlement rule that arrived in 2026.',

  answer:
    'Section 79 provides that no gain or loss arises on transmission of an asset on death, or on a gift to a relative. But the recipient takes the asset at the giver\'s original cost, not its current value, so the accrued gain is preserved rather than erased and falls on the recipient when they sell. Pakistan has no separate inheritance or estate tax.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'A gift does not wipe out the gain, it moves it',
      body: 'This is the misunderstanding that costs the most money and it is barely explained anywhere. Section 79(1)(c) means no gain arises when you gift an asset to a relative, so the giver pays nothing. Section 79(3)(b) then says the person acquiring the asset is treated as acquiring it for a cost equal to the cost of the asset for the person disposing of it. So your father who bought a plot for two million rupees in 2005 and gifts it to you at a market value of forty million has not passed you an asset worth forty million with a clean slate. He has passed you an asset with a cost of two million, and the thirty-eight million of accrued gain is now yours to be taxed on when you sell. Gifting before a sale defers nothing. It changes who pays.',
    },

    {
      kind: 'list',
      heading: 'When no gain or loss arises at all',
      intro:
        'Section 79(1). Anything not on this list is an ordinary disposal, valued as if it had been sold.',
      items: [
        'Between spouses under an agreement to live apart',
        'Transmission of the asset to an executor or beneficiary on the death of a person',
        'A gift of the asset to a relative, as defined in section 85(5)',
        'Compulsory acquisition under any law, where the consideration is reinvested in an asset of a like kind within one year',
        'By a company to its shareholders on liquidation',
        'By an association of persons to its members on dissolution, where assets are distributed in accordance with their interests in the capital',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Who counts as a relative is wider than people assume',
      body: 'Section 85(5) defines a relative in relation to an individual as an ancestor, a descendant of any of the grandparents, or an adopted child, of the individual or of a spouse of the individual, and a spouse of the individual or of any of those people. Read the middle limb carefully: a descendant of any of your grandparents reaches your siblings, your uncles and aunts, and your first cousins. It also runs through your spouse, so your spouse\'s relatives are within it too. What it does not reach is a friend, a business partner or an unrelated party, and a gift to any of those is an ordinary disposal at market value.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The gift limb was narrowed in 2018',
      body: 'Section 79(1)(c) used to cover a gift of an asset generally. The Finance Act 2018 inserted the words limiting it to a gift to a relative as defined in section 85(5). So the position that a gift is outside capital gains regardless of who receives it is eight years out of date, and pages describing gifting as a general planning route are describing repealed law. If the recipient is not a relative within the definition, the disposal is treated as an ordinary one.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The family settlement rule is new this year',
      body: 'An Explanation inserted into section 79(1)(b) by the Finance Act 2026 clarifies, for removal of doubt, that transmission of immovable property to a beneficiary on death also includes transmission by reason of a family settlement amongst family members consequent upon the death. This closes a real problem. Heirs frequently redistribute inherited property among themselves by agreement rather than each taking exactly what the succession certificate allocates, and before the Explanation those redistributions were arguably taxable disposals between the heirs. Note two limits on its face: it speaks of immovable property, and of a settlement consequent upon the death, so a rearrangement among living family members is not within it.',
    },

    {
      kind: 'prose',
      heading: 'There is no inheritance tax, and that is a separate point',
      body: [
        'Pakistan has no estate duty or inheritance tax as such. Section 79(1)(b) means the transmission itself is not a taxable event, so an heir does not face a charge on receiving property.',
        'What an heir does inherit, along with the property, is the deceased\'s cost basis under section 79(3)(b) and the eventual capital gains position that comes with it. So "no inheritance tax" is true and is not the same as "no tax", and the difference shows up years later at the point of sale.',
      ],
    },

    {
      kind: 'calculator',
      toolSlug: 'property-capital-gains',
      heading: 'What the gain would be on a later sale',
      body: 'Because the cost carries over, the figure to enter is what the original owner paid, not what the property was worth when it came to you. That single input is what most people get wrong on an inherited or gifted property.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Advance tax on the transfer is a different question again',
      body: 'Section 79 deals with capital gains. It says nothing about the advance tax collected when a transfer is registered. Where an immovable property changes hands, sections 236C and 236K operate on the transfer itself, and whether a gift or an inheritance transfer attracts them depends on the transaction and the documentation rather than on section 79. Ask at the registry what will be collected before assuming a non-recognition transfer is also free of advance tax, because the two questions are decided by different provisions.',
    },

    {
      kind: 'prose',
      heading: 'Documenting a gift properly matters more than the tax',
      body: [
        'Because a gift to a relative is outside the charge and a gift to anyone else is not, the relationship is doing the work, and it should be evidenced rather than assumed. The same applies to the money: an unexplained asset can be caught by section 111 regardless of what the parties call the transaction.',
        'A gift deed, the relationship, and a clear trail for any consideration are what make the position defensible later. This is one of the places where an arrangement that is perfectly lawful becomes expensive purely because nobody wrote it down at the time.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Is there inheritance tax in Pakistan?',
      answer:
        'No. There is no estate duty or inheritance tax, and section 79(1)(b) means transmission of an asset to an executor or beneficiary on death gives rise to no gain or loss. What the heir does inherit is the deceased\'s cost basis, which affects the tax on a later sale.',
    },
    {
      question: 'Is a gift taxable in Pakistan?',
      answer:
        'A gift of an asset to a relative as defined in section 85(5) gives rise to no gain or loss under section 79(1)(c). A gift to someone outside that definition is treated as an ordinary disposal. The gift limb was narrowed to relatives by the Finance Act 2018.',
    },
    {
      question: 'Who counts as a relative for a tax-free gift?',
      answer:
        'Under section 85(5): an ancestor, a descendant of any of your grandparents, or an adopted child, of you or of your spouse, and a spouse of any of those. Descendants of a grandparent reaches siblings, uncles, aunts and first cousins.',
    },
    {
      question: 'If I am gifted a property, what is my cost for capital gains?',
      answer:
        'The giver\'s cost, not the market value at the time of the gift. Section 79(3)(b) treats you as acquiring the asset for a cost equal to the cost it had for the person disposing of it, so the accrued gain carries over to you.',
    },
    {
      question: 'Can I gift a property to my child before selling it to save tax?',
      answer:
        'It does not save the tax, it moves it. No gain arises on the gift itself, but the child takes your original cost under section 79(3)(b), so the whole accrued gain is still there and falls on them when they sell.',
    },
    {
      question: 'Can heirs redistribute inherited property between themselves?',
      answer:
        'Yes, and since the Finance Act 2026 the position is explicit. An Explanation to section 79(1)(b) confirms that transmission of immovable property to a beneficiary on death includes transmission by family settlement among family members consequent upon the death.',
    },
    {
      question: 'Does a gift avoid advance tax on a property transfer?',
      answer:
        'Not necessarily. Section 79 governs capital gains only. Advance tax under sections 236C and 236K operates on the transfer itself, and whether it is collected depends on the transaction and the documentation rather than on section 79.',
    },
    {
      question: 'Do I need a gift deed?',
      answer:
        'The relationship is what takes a gift outside the charge, so it should be evidenced rather than assumed, and an unexplained asset can be caught by section 111 whatever the parties call the transaction. A gift deed and a clear trail are what make the position defensible later.',
    },
  ],

  publishedAt: '2026-09-26T07:00:00Z',
  related: ['capital-gains-tax-on-property', 'tax-on-buying-and-selling-property'],

  seo: {
    title: 'Tax on Gifts and Inherited Property in Pakistan',
    description:
      'Why a gift to a relative preserves the gain rather than erasing it, who counts as a relative, the 2026 family settlement rule, and why there is no inheritance tax but there is tax.',
  },
};


/**
 * Guide 43: agricultural income.
 *
 * The correction that carries it is that the uniform story is wrong. "All
 * provinces have taxed agricultural income at up to 45 per cent since
 * 1 January 2025" is repeated everywhere and only KP matches it. Sindh carved
 * out six months by a later Act, and Punjab moved its rates out of the statute
 * into rules whose validity is now publicly disputed.
 *
 * The federal hook that makes any of this matter to our readers is the proviso
 * to s.111(1): agricultural income explains an unexplained asset only to the
 * extent of income worked back from provincial tax ACTUALLY PAID.
 *
 * Punjab's current position is published as disputed rather than asserted,
 * because the ruling casting doubt on it reached us only through press behind
 * a paywall and a Speaker's ruling is not self-executing law.
 */

const AGRICULTURAL_INCOME: Guide = {
  slug: 'tax-on-agricultural-income',
  cluster: 'property',
  title: 'Tax on Agricultural Income in Pakistan',
  navLabel: 'Agricultural income',
  card: 'Why the federal exemption is narrower than it sounds, what each province actually enacted, and why agricultural income only shelters assets to the extent tax was paid.',

  answer:
    'Agricultural income is exempt from federal income tax under section 41, but the exemption is narrow and the tax is provincial rather than absent. The provinces did not all move together: Khyber Pakhtunkhwa\'s new rates ran from 1 January 2025, Sindh carved out the first six months by a later Act, and Punjab moved its rates out of the statute into rules.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'Agricultural income only shelters an asset as far as tax was paid',
      body: 'This is the federal provision that makes the provincial regimes matter, and it is the one most often stated wrongly. The proviso to section 111(1) says that where a taxpayer explains an unexplained credit, investment, money, valuable article or expenditure by way of agricultural income, that explanation shall be accepted TO THE EXTENT OF agricultural income worked back on the basis of agricultural income tax PAID under the relevant provincial law. So agricultural income does not explain an asset because it exists. It explains it in proportion to provincial tax actually paid on it. Declaring to the province without paying, or not declaring at all, leaves the asset unexplained and chargeable as income from other sources.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The exemption is narrower than the word suggests',
      body: 'Section 41(2) defines agricultural income in three limbs and each carries a limit worth knowing. The land must be SITUATED IN PAKISTAN and used for agricultural purposes. Income from a process counts only where it is a process ordinarily employed by a cultivator or receiver of rent-in-kind to render the produce fit to be taken to market, so value-added processing beyond that falls outside and is ordinary business income. And the sale limb covers the sale BY THAT SAME PERSON of produce on which no other process was performed, so a trader who buys and resells produce is not within it at all. The farm building limb requires the building to be on or in the immediate vicinity of the land.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The provinces did not all move together, whatever you have read',
      body: 'The story in circulation is that all provinces aligned agricultural income tax with federal rates from 1 January 2025, at up to 45 per cent. Only Khyber Pakhtunkhwa matches it cleanly. Sindh enacted the same structure and then, by a later amending Act, applied the OLD rates for 1 January to 30 June 2025 and moved the new slabs and the super tax to 1 July 2025. Press reports described that as deferring the 45 per cent rate for a year; the enacted text carves out six months. And Punjab took its rates out of the Act entirely. If you are working out what you owe for a period straddling early 2025, which province you are in changes the answer.',
    },

    {
      kind: 'table',
      heading: 'What each province actually did',
      intro:
        'Rates are set provincially and the structures now broadly mirror the federal slabs, but the commencement dates and the instruments differ.',
      columns: ['Province', 'Instrument', 'Position'],
      rows: [
        ['Khyber Pakhtunkhwa', 'KP Agricultural Income Tax Act 2025', 'Rates in the Act, in force 1 January 2025'],
        ['Sindh', 'Sindh Act II of 2025, amended by Act XXV of 2025', 'Old rates to 30 June 2025, new slabs from 1 July 2025'],
        ['Punjab', 'Amendment Act 2024, rates by notification', 'Schedules omitted from the Act, rates prescribed by rules'],
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Punjab: we can tell you what was enacted, not that it is in force',
      body: 'Punjab is the one to be careful about. The Punjab Agricultural Income Tax (Amendment) Act 2024 omitted both Schedules from the 1997 Act and made the rates "as may be prescribed", moving them into rules, with a new section 11(2) requiring any rules amendment as to rates during a financial year to be laid before the Assembly at the next Annual Budget. Rates were then prescribed by notification in the Punjab Gazette of 6 March 2025, on the same structure as the other provinces. It has since been reported that the Assembly Speaker ruled in April 2026 that those notifications breached section 11(2) and are to be treated as never having had legal existence. We have that from press reporting we could not get behind, a Speaker\'s ruling is not self-executing law, and we found no court judgment. So we can tell you what was enacted and by which instrument, and we are telling you plainly that its current validity is disputed. If you are in Punjab, this is a question for an adviser and for the Board of Revenue, not for a web page.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Punjab taxed livestock for seven months and then stopped',
      body: 'A small point that illustrates how fast this is moving. The 2024 amendment brought livestock into the Punjab base, inserting a livestock head and a definition. The Punjab Agricultural Income Tax (Amendment) Act 2025, gazetted 5 August 2025, omitted both. So livestock income was inside the Punjab charge only between 1 January and 5 August 2025. Anyone computing a Punjab liability across that window needs the dates rather than the headline.',
    },

    {
      kind: 'calculator',
      toolSlug: 'agriculture-tax',
      heading: 'What the provincial charge comes to',
      body: 'The provincial slabs now broadly mirror the federal table. Enter the farm income to see the figure, and read it alongside the commencement caveats above rather than instead of them.',
    },

    {
      kind: 'prose',
      heading: 'Why the exemption exists at all',
      body: [
        'Agricultural income tax is a provincial subject under the Constitution, which is why the federal Ordinance exempts agricultural income rather than taxing it: the federation is not the government entitled to tax it. Section 41 is a jurisdictional boundary rather than a relief.',
        'That is the reason the reforms of 2024 and 2025 had to be enacted four times, once by each province, and the reason they diverge. It is also why "agricultural income is tax free in Pakistan" is a sentence that has never been true: it is federally exempt and provincially taxable, and the provincial side has just become considerably more real.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Corporate farming and super tax are in there too',
      body: 'The new provincial Acts are not only about slabs for individuals. Khyber Pakhtunkhwa\'s Act, which is the clearest drafted of the three, sets corporate farming rates of 20 per cent for a small company and 29 per cent otherwise, a super tax running from 1 to 10 per cent between Rs 150 million and above Rs 500 million, and a per-acre floor by zone. Sindh set its own schedules on a similar structure, while Punjab set super tax by reference to the federal Ordinance rather than its own table. A farming company is now looking at a provincial corporate charge that did not meaningfully exist before.',
    },
  ],

  faqs: [
    {
      question: 'Is agricultural income tax free in Pakistan?',
      answer:
        'It is exempt from federal income tax under section 41, because agricultural income tax is a provincial subject. It is not untaxed: every province levies its own agricultural income tax, and the provincial regimes were substantially reformed in 2024 and 2025.',
    },
    {
      question: 'What counts as agricultural income?',
      answer:
        'Section 41(2) is narrow. Rent or revenue from land situated in Pakistan used for agricultural purposes; income from agriculture or from a process ordinarily employed by a cultivator to make produce marketable; sale by that same person of produce on which no other process was performed; and income from a farm building on or in the immediate vicinity of the land.',
    },
    {
      question: 'Is processing produce agricultural income?',
      answer:
        'Only where the process is one ordinarily employed by a cultivator or receiver of rent-in-kind to render the produce fit to be taken to market. Value-added processing beyond that falls outside section 41 and is ordinary business income.',
    },
    {
      question: 'Can I use agricultural income to explain an unexplained asset?',
      answer:
        'Only to the extent of provincial tax actually paid. The proviso to section 111(1) accepts the explanation to the extent of agricultural income worked back on the basis of agricultural income tax paid under the relevant provincial law.',
    },
    {
      question: 'Did all provinces tax agricultural income at 45% from January 2025?',
      answer:
        'No, and this is the most repeated error. Khyber Pakhtunkhwa did. Sindh applied the old rates to 30 June 2025 and moved the new slabs and super tax to 1 July 2025 by a later amending Act. Punjab moved its rates out of the statute into rules.',
    },
    {
      question: 'What are the agricultural income tax rates in Punjab?',
      answer:
        'Punjab omitted both Schedules from its 1997 Act in 2024 and prescribed rates by notification in March 2025 on the same structure as the other provinces. It has been reported that the Assembly Speaker ruled in April 2026 that those notifications were invalid. We could not verify that beyond press reporting, so treat the current Punjab position as disputed.',
    },
    {
      question: 'Is livestock income taxed in Punjab?',
      answer:
        'It was, briefly. The 2024 amendment brought livestock into the Punjab base and the Amendment Act of 2025, gazetted 5 August 2025, omitted it. Livestock was within the charge only between 1 January and 5 August 2025.',
    },
    {
      question: 'Does a farming company pay agricultural income tax?',
      answer:
        'Yes, under the new provincial regimes. Khyber Pakhtunkhwa sets corporate farming at 20 per cent for a small company and 29 per cent otherwise, with a super tax band above Rs 150 million. The other provinces adopted broadly similar structures.',
    },
  ],

  publishedAt: '2026-10-01T03:00:00Z',
  related: ['provincial-property-tax', 'how-to-file-your-tax-return'],

  seo: {
    title: 'Tax on Agricultural Income in Pakistan',
    description:
      'Why the section 41 exemption is narrower than it sounds, what each province actually enacted in 2025, and why agricultural income shelters assets only as far as tax was paid.',
  },
};

export const PROPERTY_GUIDES: Guide[] = [PROPERTY_TAX, PROPERTY_GAINS, RENTAL_INCOME, PROVINCIAL_PROPERTY_TAX, LANDLORD_DEDUCTIONS, GIFTS_AND_INHERITANCE, AGRICULTURAL_INCOME];






