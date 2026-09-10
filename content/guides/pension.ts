import type { Guide } from './types';
import { PENSION } from '@/lib/tax/pension';

/**
 * Cluster 9 spoke: pension.
 *
 * The Finance Act 2025 repealed the general pension exemption, and the
 * headline written everywhere, "pension is now taxable in Pakistan", is true
 * and badly misleading. The charge starts at ten million rupees a year and
 * stops entirely at seventy, so most pensioners owe nothing and can be shown
 * that they owe nothing. Leading with the alarm and correcting it afterwards
 * would be the wrong shape for a page read by retired people.
 *
 * Figures interpolate from lib/tax/pension.ts, which check-tax asserts against
 * s.12(2A) and the Division I proviso on every build.
 */

const pensionMoney = new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 });

const PENSION_TAX: Guide = {
  slug: 'tax-on-pension',
  cluster: 'salary',
  title: 'Tax on Pension in Pakistan',
  navLabel: 'Pension',
  card: 'The general exemption was repealed in 2025, and most pensioners still owe nothing. What changed, what survived, and the one case that costs money.',

  answer: `Pension from a former employer stopped being generally exempt when the Finance Act 2025 repealed the exemption. What replaced it charges nothing on the first Rs ${pensionMoney.format(PENSION.threshold)} a year and ${(PENSION.rateOnExcess * 100).toFixed(0)}% on the excess, as a final tax, and nothing at all at any amount once you have attained ${PENSION.exemptFromAge}. The case that does cost money is continuing to work for the employer paying the pension.`,

  sections: [
    {
      kind: 'note',
      tone: 'info',
      heading: 'If your pension is ordinary, you owe nothing. Start there.',
      body: `The repeal has been reported in a way that alarms people it does not affect. Section 12(2A) charges nil where the pension received from a former employer does not exceed Rs ${pensionMoney.format(PENSION.threshold)} in the tax year, and ${(PENSION.rateOnExcess * 100).toFixed(0)}% only on the amount above that. A pension of Rs 1.8 million a year, which is a good pension, is nil. A pension of Rs 12 million pays ${(PENSION.rateOnExcess * 100).toFixed(0)}% of the Rs 2 million above the threshold and nothing on the rest. And once you have attained ${PENSION.exemptFromAge}, there is no charge at any figure.`,
    },

    {
      kind: 'calculator',
      toolSlug: 'salary-tax',
      heading: 'If you also draw a salary',
      body: 'Pension sits outside the salary computation unless you are still working for the employer that pays it, in which case the whole pension goes onto the salary slabs. This calculator is for that case, and for anyone comparing employment income against it.',
    },

    {
      kind: 'prose',
      heading: 'What the Finance Act 2025 actually repealed',
      body: [
        'Two things went. Clause (8) of Part I of the Second Schedule exempted any pension received by a citizen of Pakistan from a former employer, other than where the person continued to work for that employer. It was omitted. And sub-clause (i) of clause (9), which exempted pension for service rendered as a member of the Armed Forces or as an employee of the Federal or a Provincial Government, was omitted with it.',
        'That second omission is the one that has gone least noticed and affects the largest number of people, because it removes a specific exemption that public servants and armed forces pensioners had relied on separately from the general one.',
      ],
    },

    {
      kind: 'list',
      heading: 'What survived, and is still exempt',
      intro:
        'The repeal was narrower than the coverage suggests. Three exemptions in the same Part were left alone.',
      items: [
        'Clause (9)(ii): pension granted under the relevant rules to the families and dependents of public servants or members of the Armed Forces who die during service. The family pension limb is untouched',
        'Clause (12): any payment in the nature of commutation of pension received from Government or under a pension scheme approved by the Board',
        'Clause (13): income representing gratuity or commutation of pension received by an employee on retirement, or by heirs on death, within the stated limits',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The case that costs money: still working for the same employer',
      body: 'Section 12(2A)(ii) is the sting, and it is easy to walk into. Where an individual continues to work for the former employer, or an associate of that employer, the pension is charged at the ordinary rates in Division I rather than on the nil-and-five-per-cent table. The whole pension goes onto the salary slabs alongside the salary. Someone who retires, draws a pension, and is then brought back as a consultant by the same organisation has moved their pension from a nil charge to the ordinary progressive rates, and the arrangement is worth pricing before agreeing to it.',
    },

    {
      kind: 'prose',
      heading: 'A final tax, which is unusual and useful',
      body: [
        'Section 12(2A)(i) charges the pension as a final tax at the proviso rates. Final taxation means the charge is settled at that rate rather than being pooled with your other income and taxed at your marginal rate.',
        'For a pensioner with other income, that is a real benefit and the opposite of how the creator withholding under section 154B works for residents, where the deduction is a minimum rather than a settlement. Here the five per cent above the threshold is the end of the matter on that income.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Age seventy removes the charge, not the return',
      body: `Section 12(2A)(i) provides that an individual who has attained the age of ${PENSION.exemptFromAge} shall not be charged to tax on pension income. It is an exemption from the charge on that income, not a release from filing. Section 114(1)(b)(vii) requires a return from anyone who has obtained a National Tax Number, whatever their income, and holding an NTN is what most pensioners will have from their working life. Filing with nil tax on the pension is the normal outcome, not an oddity.`,
    },

    {
      kind: 'prose',
      heading: 'Contributing to a pension is a separate provision entirely',
      body: [
        'Two different things are called pension relief and they are constantly run together. Section 12(2A) is about pension you receive. Section 63 is a tax credit for contributions you make to an approved pension fund while working, calculated on the lesser of the contribution or a proportion of taxable income, with an enhanced allowance for people who joined later in life.',
        'Nothing in the Finance Act 2025 repeal touched section 63. If you are still working and contributing, the credit is unaffected.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'What we would check on a payslip or a pension advice',
      body: `Whether anything is being deducted at all. On a pension below Rs ${pensionMoney.format(PENSION.threshold)} a year, the correct deduction is nil, and a pension office still withholding on the pre-2025 basis, or applying salary slabs to a pension that is not caught by section 12(2A)(ii), is over-deducting. It would come back on filing, but only after the money had been lent to the government for a year.`,
    },
  ],

  faqs: [
    {
      question: 'Is pension taxable in Pakistan?',
      answer: `Since the Finance Act 2025, yes in principle, but the charge is nil on the first Rs ${pensionMoney.format(PENSION.threshold)} a year and ${(PENSION.rateOnExcess * 100).toFixed(0)}% only on the excess. Anyone who has attained ${PENSION.exemptFromAge} is not charged at any amount. Most pensioners owe nothing.`,
    },
    {
      question: 'What did the Finance Act 2025 change about pension?',
      answer:
        'It omitted clause (8) of Part I of the Second Schedule, the general exemption for pension from a former employer, and omitted sub-clause (i) of clause (9), which separately exempted armed forces and government service pensions. Section 12(2A) was inserted to charge what the exemptions used to cover.',
    },
    {
      question: 'Do retired government employees pay tax on pension now?',
      answer:
        'The specific exemption they relied on, clause (9)(i), was omitted by the Finance Act 2025. They fall under section 12(2A) like everyone else, which means nil below the threshold, five per cent on the excess, and nil at any amount from age seventy.',
    },
    {
      question: 'At what age is pension tax free in Pakistan?',
      answer: `${PENSION.exemptFromAge}. Section 12(2A)(i) provides that an individual who has attained that age shall not be charged to tax on pension income, whatever the amount.`,
    },
    {
      question: 'Is family pension still exempt?',
      answer:
        'Yes. Clause (9)(ii) survives: pension granted under the relevant rules to the families and dependents of public servants or members of the Armed Forces who die during service was not touched by the repeal.',
    },
    {
      question: 'Is commuted pension taxable?',
      answer:
        'No, in the ordinary case. Clause (12) still exempts commutation of pension received from Government or under a Board-approved scheme, and clause (13) still exempts gratuity and commutation on retirement within limits. The repeal was aimed at the recurring pension, not at these.',
    },
    {
      question: 'What happens if I keep working for my old employer after retiring?',
      answer:
        'Section 12(2A)(ii) takes you off the nil-and-five-per-cent table. Where you continue to work for the former employer or an associate, the pension is charged at the ordinary Division I rates alongside your other income, which is materially more expensive.',
    },
    {
      question: 'Do I still have to file a return if my pension is not taxed?',
      answer:
        'Almost certainly. Section 114(1)(b)(vii) requires a return from anyone who has obtained a National Tax Number, regardless of income, and most pensioners hold one from their working life. Filing with nil tax on the pension is the normal outcome.',
    },
  ],

  publishedAt: '2026-09-22T07:00:00Z',
  related: ['salary-tax-slabs', 'how-to-file-your-tax-return'],

  seo: {
    title: 'Tax on Pension in Pakistan',
    description:
      'The Finance Act 2025 repealed the general pension exemption. What replaced it, why most pensioners still owe nothing, what stayed exempt, and the case that costs money.',
  },
};

export const PENSION_GUIDES: Guide[] = [PENSION_TAX];
