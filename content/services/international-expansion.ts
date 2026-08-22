import type { Service } from '../types';

/**
 * Discipline 07: International Expansion, less the United States and the UK.
 *
 * Everything registered outside Pakistan that isn't the US or UK block below.
 * Saudi Arabia moved here out of Corporate & Compliance when the UK and UAE
 * engagements were added, because one overseas service inside a domestic
 * discipline read as an exception rather than as an offering.
 *
 * The US block outgrew this file and now lives in `./usa.ts`, and the UK block
 * outgrew it the same way and now lives in `./uk.ts`, both exporting their
 * services under the same `international-expansion` pillar. Nothing about the
 * discipline is split, only the source files: five US services and five UK
 * services are each a chain worth reading on its own, against two here.
 * `index.ts` spreads the US array first and the UK array last, so the
 * discipline reads in the order it is named everywhere else: the United
 * States, Saudi Arabia, the UAE, then the UK.
 *
 * The pattern is the same in both below, and in all ten over there: register
 * the entity, then run the filings that follow. The second half is the part
 * clients underestimate and the part that carries the ongoing relationship,
 * so every page here is written to name it explicitly rather than stopping at
 * the certificate.
 */
export const INTERNATIONAL_SERVICES: Service[] = [
  {
    slug: 'saudi-business-setup',
    pillar: 'international-expansion',
    title: 'Saudi Arabia Business Setup',
    navLabel: 'Saudi Business Setup',
    oneLiner:
      'A Pakistani business registered and licensed to operate in Saudi Arabia, from the MISA investment registration to your first bank account.',
    intro:
      'Saudi Arabia now allows full foreign ownership across most sectors and runs registration through a handful of integrated online platforms, which has made the process faster without making it forgiving. The sequence is fixed: attested documents before anything, an investment registration certificate before a commercial registration, and a commercial registration before a municipal licence. Getting one step out of order costs weeks. We run the whole chain from Pakistan through to a company you can actually trade with.',
    icon: 'compass',
    included: [
      'Entity structure and activity classification advice for MISA registration',
      'Document attestation chain: notarisation, Ministry of Foreign Affairs, and the Saudi Embassy in Islamabad',
      'MISA Investment Registration Certificate application',
      'Commercial Registration (CR) through the Saudi Business Center',
      'Municipal licence, GOSI and Qiwa activation once a physical presence is confirmed',
      'Corporate bank account opening support',
    ],
    audience: [
      'Pakistani exporters expanding into KSA',
      'Service firms opening a Saudi branch',
      'Founders relocating operations to Saudi Arabia',
    ],
    steps: [
      {
        title: 'Structure and scoping',
        description:
          'We confirm the right legal structure, almost always an LLC, the ISIC activity code that matches what you actually do, and what the Saudi side will require attested from Pakistan.',
      },
      {
        title: 'Attestation and MISA filing',
        description:
          "Corporate documents notarised and legalised through Pakistan's Ministry of Foreign Affairs and the Saudi Embassy, translated into Arabic, and filed for the Investment Registration Certificate.",
      },
      {
        title: 'Commercial Registration',
        description:
          'CR issued through the Saudi Business Center, which registers you with ZATCA, GOSI, Qiwa and the Chamber of Commerce in the same step.',
      },
      {
        title: 'Operational setup',
        description: 'National address, municipal licence where you hold physical premises, and the corporate bank account opened.',
      },
    ],
    deliverables: [
      'MISA Investment Registration Certificate',
      'Commercial Registration certificate',
      'Active GOSI, Qiwa and ZATCA registrations',
      'National address registration',
      'A corporate bank account',
    ],
    documents: [
      'Attested Certificate of Incorporation and Memorandum of Association',
      'Attested board resolution approving the Saudi entity',
      'Passport copies of directors and the appointed manager',
      'Audited financial statements for the Pakistani parent, where required by the chosen activity',
      'Power of attorney for the local representative',
    ],
    related: ['uae-tax-bookkeeping', 'company-registration', 'financial-accounting'],
    faqs: [
      {
        question: 'Do I need a Saudi partner to own the company?',
        answer:
          'Not for most activities. Reforms to the Saudi investment law now allow full foreign ownership without a mandatory local partner in the large majority of sectors. A handful of activities are still restricted or require a Saudi shareholder, and we confirm which category yours falls into before you commit to anything.',
      },
      {
        question: 'Which part of this actually takes the time?',
        answer:
          'Not the part people expect. The MISA registration itself is usually quick. Document attestation at the start and the corporate bank account at the end are where the delays sit, because both depend on third parties working to their own pace. Activities that need extra regulatory sign-off add to that again. We tell you where your specific activity is likely to slow down before you commit.',
      },
      {
        question: 'Can I run this from Pakistan, or do I need to be in Saudi Arabia?',
        answer:
          'Registration itself can be driven remotely, but opening the corporate bank account and completing some municipal steps typically need someone physically present at least once. We flag exactly which steps need a visit and time your travel around them rather than having you fly out repeatedly.',
      },
      {
        question: 'What happens after the company is registered?',
        answer:
          'An operating company still carries ongoing obligations: Saudi VAT filings with ZATCA, GOSI payments once you have employees, and Saudisation quotas under Nitaqat. That ongoing side is a separate engagement, scoped once the entity exists and you know your actual headcount and activity.',
      },
    ],
    seo: {
      title: 'Saudi Arabia Business Setup for Pakistani Companies',
      description:
        'MISA investment registration, Commercial Registration, attestation and bank account setup for Pakistani businesses opening a company in Saudi Arabia.',
    },
  },

  {
    slug: 'uae-tax-bookkeeping',
    pillar: 'international-expansion',
    title: 'UAE Taxation & Bookkeeping',
    navLabel: 'UAE Tax & Bookkeeping',
    oneLiner:
      'Corporate tax and VAT registration and filing with the UAE Federal Tax Authority, on books kept to the standard an FTA audit expects.',
    intro:
      'The UAE is no longer a no-tax jurisdiction, and a great many businesses there have not adjusted to the filing calendar that replaced it. Corporate tax is charged at 9% on taxable income above AED 375,000. Registration with the Federal Tax Authority is required whether or not you will owe anything, and both corporate tax and VAT are assessed against books the FTA can ask to inspect. We register you, file the returns, and keep the accounting records that sit behind them.',
    icon: 'receipt',
    included: [
      'Corporate tax registration on EmaraTax and confirmation of your first tax period',
      'VAT registration or a reasoned exemption position, plus quarterly or monthly VAT return filing',
      'Annual corporate tax return preparation and filing within the statutory window after year end',
      'Small Business Relief assessment and election where revenue keeps you inside the threshold',
      'Monthly bookkeeping to IFRS, reconciled, with the records retained for the period the FTA requires',
      'Free zone qualifying income review, where you hold a free zone licence',
    ],
    audience: [
      'Pakistani founders with a UAE company',
      'Free zone and mainland licence holders',
      'Businesses registered but never filed',
    ],
    steps: [
      {
        title: 'Position review',
        description:
          'We read your trade licence, incorporation date and financials, and tell you which registrations are already overdue and what the exposure is.',
      },
      {
        title: 'Registration',
        description:
          'Corporate tax and, where the threshold is met, VAT registration completed on EmaraTax, with tax periods and the first due dates confirmed in writing.',
      },
      {
        title: 'Books brought current',
        description:
          'Ledgers rebuilt to IFRS from the start of the relevant tax period, reconciled to bank, so the first return is filed off real accounts.',
      },
      {
        title: 'Filing calendar',
        description:
          'VAT returns filed each period and the corporate tax return filed after year end, with the reliefs and elections applied and documented.',
      },
    ],
    deliverables: [
      'Corporate tax registration number, and a VAT TRN where registered',
      'Filed VAT returns with FTA acknowledgements',
      'Filed corporate tax return with the computation behind every figure',
      'IFRS financial statements for the tax period',
      'A filing calendar with every FTA deadline for the year ahead',
    ],
    documents: [
      'Trade licence and Memorandum of Association',
      'Emirates ID and passport copies of shareholders and the authorised signatory',
      'EmaraTax login, or authorisation for us to act as tax agent contact',
      'Bank statements for all company accounts covering the period',
      'Sales invoices, purchase invoices and any customs documentation',
      'Prior returns and financial statements, if any have been filed',
    ],
    related: ['saudi-business-setup', 'uk-vat-corporation-tax', 'financial-accounting'],
    faqs: [
      {
        question: 'Do I have to register for corporate tax if my profit is under AED 375,000?',
        answer:
          'Yes. The AED 375,000 figure is the threshold above which the 9% rate applies, not a threshold for registration. Registration is required regardless, within the window the FTA sets from incorporation or from the start of your first tax period, and late registration carries an administrative penalty even where no tax is ultimately payable.',
      },
      {
        question: 'Does a free zone company pay corporate tax?',
        answer:
          'A qualifying free zone person can be taxed at 0% on qualifying income, but that status is conditional and is not automatic from holding a free zone licence. It depends on maintaining adequate substance, the type of income earned and staying within the de minimis limits. We assess it against your actual revenue mix rather than assuming the licence settles it.',
      },
      {
        question: 'What is Small Business Relief?',
        answer:
          'Where revenue stays at or below AED 3 million in the tax period and in every previous one, a resident business can elect to be treated as having no taxable income for that period. It is an election made in the return, not an exemption from filing, and it still assumes you can produce records if the FTA asks. It is a simplification, not a reason to stop keeping books.',
      },
      {
        question: 'Can you do this while I am in Pakistan?',
        answer:
          'Yes. EmaraTax filing, bookkeeping and return preparation are all done remotely, and we work from bank statements and invoices you send us. A physical visit is generally only needed for banking or licensing matters, which sit outside this engagement.',
      },
    ],
    seo: {
      title: 'UAE Corporate Tax, VAT & Bookkeeping Services',
      description:
        'Federal Tax Authority corporate tax and VAT registration and filing, Small Business Relief elections, and IFRS bookkeeping for mainland and free zone companies.',
    },
  },
];
