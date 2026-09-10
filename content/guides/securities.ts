import type { Guide } from './types';
import { SECURITIES_BANDS, SECURITIES_FLAT_RATE } from '@/lib/tax/investments';

/**
 * Cluster: investments.
 *
 * Two things carry this guide and both are structural rather than rate trivia.
 *
 * 1. Shares bought before 1 July 2013 are outside the charge ALTOGETHER, and
 *    the exemption is of the gain rather than of the person, so a non-filer
 *    holding them is equally outside it. A long-term holder selling a legacy
 *    position is frequently told they owe 15 per cent and they owe nothing.
 * 2. NCCPL collects it, not the investor. Most people meet this tax as a line
 *    on a statement rather than as a bill, which is why so few know the rate
 *    they are actually paying.
 *
 * The band table interpolates from lib/tax/investments.ts, which check-tax
 * reconciles against Division VII on every build.
 */

/** The bands, rendered from the same array the calculator computes with. */
function securitiesRows(): string[][] {
  return SECURITIES_BANDS.map((band) => [
    band.label,
    band.filerRate === 0 ? 'Nil' : `${(band.filerRate * 100).toFixed(1).replace(/\.0$/, '')}%`,
  ]);
}

const SECURITIES_CGT: Guide = {
  slug: 'capital-gains-on-shares',
  cluster: 'property',
  title: 'Capital Gains Tax on Shares and Mutual Funds in Pakistan',
  navLabel: 'Shares and funds',
  card: 'Why shares bought before July 2013 are outside the tax entirely, what changed in 2024, and why you never get a bill for this one.',

  answer: `Gain on the disposal of securities is charged under section 37A at rates set by when you bought them. Securities acquired on or after 1 July 2024 are taxed at a flat ${(SECURITIES_FLAT_RATE * 100).toFixed(0)}% for a person on the Active Taxpayer List. Anything bought before 1 July 2013 is outside the charge completely. NCCPL computes and collects it, so you meet it as a deduction rather than as a bill.`,

  sections: [
    {
      kind: 'note',
      tone: 'info',
      heading: 'Shares bought before July 2013 are not taxed at all',
      body: 'This is the point most worth knowing and the one long-term investors are most often told wrongly. Securities acquired before 1 July 2013 sit outside section 37A entirely: not at a reduced rate, not at nil for filers only, but outside the charge. And because the exemption attaches to the gain rather than to the person, a holder who is not on the Active Taxpayer List is equally outside it. Doubling nothing is nothing. Someone selling a position they have held since the 2000s and being quoted fifteen per cent should check the acquisition date before accepting the figure.',
    },

    {
      kind: 'table',
      heading: 'The rate depends on when you bought',
      intro:
        'Division VII of Part I, rendered from the same module the calculator computes with. The rate is fixed by the acquisition date, and for one window it also falls with how long you held.',
      columns: ['When acquired', 'Rate for a person on the ATL'],
      rows: securitiesRows(),
    },

    {
      kind: 'calculator',
      toolSlug: 'capital-gains-tax',
      heading: 'What the gain comes to on your holding',
      body: 'Enter the acquisition date, the cost and the sale proceeds. The calculator picks the band from the date rather than asking you which regime applies, which is the step that goes wrong by hand.',
    },

    {
      kind: 'prose',
      heading: 'Why you never receive a bill for this',
      body: [
        'Section 37A is administered through the National Clearing Company of Pakistan. NCCPL computes the gain, collects the tax and issues a certificate, which is why an investor typically encounters this charge as a deduction on a statement rather than as something they calculate and pay.',
        'That has a practical consequence worth planning around: the collection happens whether or not you were expecting it, and the figure is computed from the records NCCPL holds. If your acquisition history is not correctly reflected there, the deduction can be computed on the wrong basis, and correcting it afterwards is considerably harder than getting the record right first.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'A non-filer does not simply pay double on post-2024 holdings',
      body: `For securities acquired on or after 1 July 2024, a person not on the Active Taxpayer List is not charged at twice ${(SECURITIES_FLAT_RATE * 100).toFixed(0)} per cent. The Ordinance charges them at the ordinary Division I slab rates instead, subject to a floor of ${(SECURITIES_FLAT_RATE * 100).toFixed(0)} per cent of the gain. So the figure depends on their total income for the year and can reach the top slab rate, which means there is no single number to quote them. Our calculator reports a range for that reason rather than printing a figure it cannot know. This is the same structure as capital gains on immovable property acquired after the same date.`,
    },

    {
      kind: 'prose',
      heading: 'The 2022 to 2024 window still tapers',
      body: [
        'For securities bought between 1 July 2022 and 30 June 2024 the rate falls with the holding period, from fifteen per cent within the first year down through twelve and a half, ten and seven and a half as the holding lengthens.',
        'That taper does not exist for anything bought on or after 1 July 2024, where the rate is flat however long you hold. So two parcels of the same share, bought weeks apart either side of that date, are on genuinely different regimes for the rest of their lives, and the later one gets no benefit from patience.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Mutual fund units follow the same section',
      body: 'Gains on mutual fund units are charged under the same section 37A machinery and are also collected by NCCPL. What differs is the treatment of distributions: a payout from a fund is a dividend rather than a capital gain, taxed under its own provision at its own rate, and the two are commonly confused on a fund statement. A rising unit price realised on redemption is a capital gain; a distribution received while holding is not.',
    },

    {
      kind: 'prose',
      heading: 'How this differs from property',
      body: [
        'The structures rhyme, which makes it easy to carry an assumption across, and one difference matters. Both regimes were split by the Finance Act 2024 at 1 July 2024, and both leave the older regime standing for anything acquired earlier.',
        'But property acquired before that date runs on a holding-period table that eventually reaches nil for every property type, while securities acquired before 1 July 2013 are outside the charge from the start and securities bought after it never reach nil at all. Same date, different logic, and the pre-2013 securities exemption has no equivalent on the property side.',
      ],
    },
  ],

  faqs: [
    {
      question: 'What is the capital gains tax on shares in Pakistan?',
      answer: `It depends on when you acquired them. Securities acquired on or after 1 July 2024 are charged at a flat ${(SECURITIES_FLAT_RATE * 100).toFixed(0)}% for a person on the Active Taxpayer List. Earlier acquisitions fall into bands set by acquisition date, and securities bought before 1 July 2013 are outside the charge entirely.`,
    },
    {
      question: 'Are old shares exempt from capital gains tax in Pakistan?',
      answer:
        'Securities acquired before 1 July 2013 are outside section 37A altogether. The exemption attaches to the gain rather than to the person, so it applies whether or not the holder is on the Active Taxpayer List.',
    },
    {
      question: 'Who collects capital gains tax on shares?',
      answer:
        'The National Clearing Company of Pakistan computes the gain, collects the tax and issues a certificate. That is why an investor usually meets this charge as a deduction on a statement rather than as a bill to pay.',
    },
    {
      question: 'Do non-filers pay double capital gains tax on shares?',
      answer:
        'Not for securities acquired on or after 1 July 2024. A person off the Active Taxpayer List is charged at the Division I slab rates with a floor equal to the flat rate, so the figure depends on their total income and can reach the top slab rate.',
    },
    {
      question: 'Does holding shares longer reduce the tax?',
      answer:
        'Only for securities bought between 1 July 2022 and 30 June 2024, where the rate falls with the holding period. For anything acquired on or after 1 July 2024 the rate is flat regardless of how long you hold.',
    },
    {
      question: 'Are mutual fund gains taxed the same as shares?',
      answer:
        'Gains on units are charged under the same section 37A machinery and collected by NCCPL. Distributions from a fund are different: they are dividends taxed under their own provision, not capital gains.',
    },
    {
      question: 'Is capital gains tax on shares the same as on property?',
      answer:
        'The structures rhyme but differ. Both were split at 1 July 2024. Property acquired before that runs on a holding-period table reaching nil, while securities acquired before 1 July 2013 are outside the charge from the start and there is no equivalent nil point for later share acquisitions.',
    },
    {
      question: 'What if NCCPL has my acquisition date wrong?',
      answer:
        'It matters, because the date decides the rate and the tax is collected from the records NCCPL holds. Correcting the record before a disposal is considerably easier than recovering tax computed on the wrong basis afterwards.',
    },
  ],

  publishedAt: '2026-09-27T03:00:00Z',
  related: ['capital-gains-tax-on-property', 'filer-vs-non-filer'],

  seo: {
    title: 'Capital Gains Tax on Shares and Mutual Funds in Pakistan',
    description:
      'Why shares bought before July 2013 are outside the charge, what the Finance Act 2024 changed, why NCCPL collects it, and how non-filers are actually taxed.',
  },
};

export const SECURITIES_GUIDES: Guide[] = [SECURITIES_CGT];
