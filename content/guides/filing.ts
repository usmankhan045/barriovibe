import type { Guide } from './types';

/**
 * Cluster 10: filing a return.
 *
 * Written from FBR's own IRIS 2.0 manual rather than from a competitor's
 * description of it, which is why the amount codes are here. Those codes are
 * what the reader is actually looking at on screen, and no ranking page
 * carries them.
 *
 * The section that earns this guide its place is the section 182 tapering
 * relief: the late-filing penalty falls by 75, 50 or 25 percent if you file
 * within one, two or three months of the due date. It is directly actionable
 * for anyone reading in October, and it is almost universally omitted.
 */

const FILING_A_RETURN: Guide = {
  slug: 'how-to-file-your-tax-return',
  cluster: 'filing',
  title: 'How to File Your Income Tax Return in Pakistan',
  navLabel: 'Filing your return',
  card: 'The IRIS screens in order with the amount codes you will actually see, the wealth statement nobody expects, and what it costs if you are late.',

  answer:
    'File through IRIS by 30 September. A salaried person enters annual income under Employment, reads the Admitted Income Tax figure, enters it against the section 149 withholding line so it nets to zero, then completes the wealth statement and reconciles it to zero. Every resident individual who files a return must also file a wealth statement, whatever their income.',

  sections: [
    {
      kind: 'list',
      heading: 'What to have in front of you first',
      intro:
        'The return is mostly transcription. Gathering these before you log in turns an evening into twenty minutes.',
      items: [
        'Your salary certificate for the year, showing gross salary and tax deducted',
        'Bank statements for every account, and any withholding certificates the bank issued',
        'Last year\'s wealth statement, because this year reconciles against it',
        'Details of any property, vehicle, or investment bought or sold during the year',
        'Receipts for pension contributions or donations you intend to claim',
      ],
    },

    {
      kind: 'steps',
      heading: 'The IRIS route, screen by screen',
      intro:
        'From FBR\'s own IRIS 2.0 manual. The codes in brackets are what appears on screen, which is the thing most guides leave out.',
      steps: [
        {
          title: 'Declaration, then Normal Return',
          body: 'In IRIS, open the Declaration menu and choose Returns/Statements (Original), then Normal Return. Enter the tax period when prompted.',
        },
        {
          title: 'Data tab, then Employment',
          body: 'Enter your annual figure under "Pay, Wages or Other Remuneration (including Arrears of Salary)", which carries code 1009. Then press Calculate.',
        },
        {
          title: 'Read the Admitted Income Tax',
          body: 'Under Tax Chargeable and Payments, open Computations and note the Admitted Income Tax figure, code 9203. That is your liability before credit for what your employer already deducted.',
        },
        {
          title: 'Claim what was already withheld',
          body: 'Under Adjustable Tax, enter that figure against "Salary of Employees u/s 149", code 64020004, and Calculate again. The amount moves across to Withholding Income Tax, code 9201. If your employer deducted correctly, the admitted tax now nets to zero.',
        },
        {
          title: 'Complete the wealth statement',
          body: 'The 116 tab has three parts: personal expenses, personal assets and liabilities, and the reconciliation of net assets. All three must be filled.',
        },
        {
          title: 'Reconcile to zero',
          body: 'FBR states it plainly: the return completes only when the Unreconciled Amount, code 703000, is zero. This is the step that stops most people.',
        },
        {
          title: 'Save, then Submit',
          body: 'Submitting brings up a declaration and asks for your four-digit PIN. If tax is payable, IRIS generates a PSID for the payment.',
        },
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'How to know it actually filed',
      body: 'Both the return and the wealth statement must move out of the Draft folder and into Completed Task. If either is still sitting in Draft, you have not filed, whatever else the screen appeared to say.',
    },

    {
      kind: 'prose',
      heading: 'The wealth statement is not optional',
      body: [
        'Section 116(2) requires every resident taxpayer who is an individual and files a return to furnish a wealth statement and a wealth reconciliation statement with it. Every member of an association of persons must do the same alongside the association\'s return.',
        'There is no income threshold. The old Rs 1 million floor was removed by the Finance Act 2013, so any page still quoting one is thirteen years out of date. The statement covers assets and liabilities including foreign ones, those of a spouse where the spouse is dependent, those of minor children and dependents, assets transferred during the year and the consideration for them, and total expenditure.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Making the reconciliation balance',
      body: [
        'The reconciliation asks a simple question in an unfriendly way: your net assets went up or down by some amount this year, and the inflows minus the outflows should explain exactly that. When they do not, the difference sits in the Unreconciled Amount and IRIS will not let you finish.',
        'The usual causes are ordinary rather than sinister. Personal expenses understated, because nobody tracks them and the figure entered is a guess. An asset valued differently this year than last. A gift, a loan repaid, or a sale whose proceeds were never entered as an inflow. Work through inflows first, then expenses, and the gap usually names itself.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The deadline, and what an extension actually is',
      body: 'For an individual the return is due by 30 September following the end of the tax year. Two different things get called an extension. Section 119 is an application you make in writing to the Commissioner, by the due date, on limited grounds: absence from Pakistan, sickness or other misadventure, or other reasonable cause. Section 214A is FBR extending the date for everyone, which it has done in several recent years. The first is yours to ask for; the second is not something you can plan around.',
    },

    {
      kind: 'table',
      heading: 'What it costs to file late',
      intro:
        'Under section 182 the penalty is the higher of 0.1% of tax payable per day or Rs 1,000 per day, subject to a minimum, and capped at 200% of tax payable. The relief in the last column is the part almost nobody publishes.',
      columns: ['Situation', 'Minimum penalty', 'Reduction'],
      rows: [
        ['Individual with 75% or more income from salary', 'Rs 10,000', '-'],
        ['Any other case', 'Rs 50,000', '-'],
        ['Filed within one month of the due date', '-', 'Reduced by 75%'],
        ['Filed within two months', '-', 'Reduced by 50%'],
        ['Filed within three months', '-', 'Reduced by 25%'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Late is much better than later',
      body: 'The tapering relief means the difference between filing in early October and letting it drift to January is most of the penalty. Separately, getting back on the Active Taxpayer List after a late filing now costs a section 182A surcharge of Rs 25,000 for an individual, unless you give the Commissioner an undertaking not to acquire property for six months.',
    },

    {
      kind: 'prose',
      heading: 'What happens after you submit',
      body: [
        'A complete return is treated as an assessment order deemed issued by the Commissioner under section 120, which is what self-assessment means in practice: nobody approves it, it simply stands.',
        'It is then run through an automated system that can correct arithmetical errors, disallow claims that are wrong on the face of the return, and adjust losses. FBR must issue a system-generated notice first and consider your response, and if you do not respond within thirty days the adjustment is made anyway. If no adjustment happens within six months of filing, the return as you declared it stands.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Getting it wrong, and fixing it',
      body: [
        'Section 114(6) allows a revised return, and the condition everyone quotes is that the Commissioner must approve it in writing. What competitors omit is that four separate carve-outs mostly disapply that requirement.',
        'Approval is not needed at all if you revise within sixty days of filing the original. It is deemed granted if the Commissioner does not pass a written order within sixty days of your asking. It is deemed granted where the revision declares more taxable income or less loss than was determined. And the Commissioner shall grant approval in the case of a bona fide omission or wrong statement.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'If you live abroad, check before assuming you need not file',
      body: 'Section 82(d) makes a Pakistani citizen resident if they are not present in any other single country for more than 182 days during the tax year, or are not a resident taxpayer of any other country. A person living in a country that issues no tax residency certificate, or moving between several, can be resident in Pakistan without setting foot in it. IRIS does offer a dedicated declaration for a non-resident Pakistan-origin person with no Pakistan-source income, but the residency question comes first.',
    },
  ],

  faqs: [
    {
      question: 'What is the last date to file an income tax return in Pakistan?',
      answer:
        '30 September following the end of the tax year, for an individual. FBR has extended that date in several recent years under section 214A, but an extension is a decision it makes for everyone rather than something you can rely on in advance.',
    },
    {
      question: 'Do I have to file a wealth statement?',
      answer:
        'Yes, if you are a resident individual filing a return. Section 116(2) requires a wealth statement and a wealth reconciliation statement with every such return, and there is no income threshold. The old Rs 1 million floor was removed by the Finance Act 2013.',
    },
    {
      question: 'My employer already deducted my tax. Do I still need to file?',
      answer:
        'Yes. Deduction at source and filing are separate obligations, and without a filed return you will not appear on the Active Taxpayer List. In the return you enter the tax your employer withheld against the section 149 line, code 64020004, so that your admitted tax nets to zero.',
    },
    {
      question: 'Why will IRIS not let me submit my return?',
      answer:
        'Most often because the Unreconciled Amount in the wealth statement, code 703000, is not zero. FBR states that the return process completes only when it has been adjusted to zero. The usual cause is understated personal expenses or an inflow that was never entered.',
    },
    {
      question: 'What is the penalty for filing a tax return late in Pakistan?',
      answer:
        'Under section 182 it is the higher of 0.1% of tax payable per day or Rs 1,000 per day, with a minimum of Rs 10,000 for an individual with 75% or more income from salary and Rs 50,000 otherwise, capped at 200% of tax payable. It is reduced by 75%, 50% or 25% if you file within one, two or three months of the due date.',
    },
    {
      question: 'Can I revise my tax return after filing?',
      answer:
        'Yes. Section 114(6) sets conditions including the Commissioner\'s written approval, but approval is not required if you revise within sixty days of the original filing, is deemed granted if the Commissioner does not respond within sixty days, is deemed granted where you declare more income or less loss, and must be granted for a bona fide omission or wrong statement.',
    },
    {
      question: 'How do I get an extension to file my return?',
      answer:
        'Apply in writing to the Commissioner under section 119, by the due date, on one of the stated grounds: absence from Pakistan, sickness or other misadventure, or other reasonable cause. That is different from the blanket extension FBR sometimes grants everyone under section 214A.',
    },
    {
      question: 'Do overseas Pakistanis have to file a return?',
      answer:
        'It depends on residency, and the test catches people out. Under section 82(d) a Pakistani citizen is resident if not present in any other single country for more than 182 days in the tax year, or not a resident taxpayer of any other country. Living abroad is not by itself an answer.',
    },
  ],

  publishedAt: '2026-09-22',
  related: ['salary-tax-slabs', 'how-to-become-a-filer'],

  seo: {
    title: 'How to File Your Income Tax Return in Pakistan (IRIS)',
    description:
      'The IRIS screens in order with the amount codes, why the wealth statement is compulsory for every filer, how to reconcile it to zero, and the late-filing relief nobody mentions.',
  },
};

export const FILING_GUIDES: Guide[] = [FILING_A_RETURN];
