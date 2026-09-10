import type { Guide } from './types';

/**
 * Cluster 8: sales tax registration.
 *
 * Two things make this guide worth writing. First, the PKR 12.5 million
 * threshold that appears on ranking pages is not in section 14, not in the
 * cottage industry definition, and not in the Tier-1 retailer definition. It
 * appears to have been invented or transplanted, and correcting it is the
 * clearest single service this guide performs.
 *
 * Second, the firm is in Khyber Pakhtunkhwa, and KPK guides almost universally
 * cite the Finance Act 2013 when the operative statute has been the KP Sales
 * Tax on Services Act 2022 since June 2022.
 */

const SALES_TAX_REGISTRATION: Guide = {
  slug: 'sales-tax-registration',
  cluster: 'salestax',
  title: 'Sales Tax Registration in Pakistan: Who Actually Has to Register',
  navLabel: 'Sales tax registration',
  card: 'The turnover threshold that does not exist, the federal and provincial split that decides where you register, and the biometric deadline that removes you from the list.',

  answer:
    'Registration is triggered by what you do, not by how much you earn. Section 14 of the Sales Tax Act 1990 lists categories: manufacturer, retailer, importer, exporter claiming refunds, wholesaler or distributor. There is no turnover threshold in it. Goods are federal and services are provincial, so a service business in Khyber Pakhtunkhwa registers with KPRA rather than FBR. After registering you have thirty days to complete biometric verification at NADRA.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'There is no PKR 12.5 million threshold',
      body: 'This figure appears on ranking pages as the point at which a retailer must register. It is not in section 14, which contains no turnover threshold of any kind. It is not in the cottage industry definition at section 2(5AB), which uses Rs 8 million. It is not in the Tier-1 retailer definition at section 2(43A), which turns on electricity bills and shop size rather than turnover. If a page quotes it, that page has not read the Act.',
    },

    {
      kind: 'list',
      heading: 'Who section 14 actually requires to register',
      intro:
        'Every person making taxable supplies in Pakistan, including zero-rated supplies, in the course of a taxable activity, who falls in one of these categories.',
      items: [
        'A manufacturer who is not running a cottage industry',
        'A retailer liable to pay sales tax, excluding one who pays through the electricity bill under section 3(9)',
        'An importer',
        'An exporter who wants a refund against zero-rated supplies',
        'A wholesaler, dealer or distributor',
        'A person required under any other federal or provincial law to be registered for a duty or tax collected as if it were sales tax',
      ],
    },

    {
      kind: 'table',
      heading: 'The thresholds that do exist',
      intro:
        'Two real thresholds, doing different jobs. Neither is a general registration threshold, and neither is 12.5 million.',
      columns: ['Concept', 'Test', 'Effect'],
      rows: [
        [
          'Cottage industry, s.2(5AB)',
          'No industrial gas or electricity connection, in a residential area, at most 10 workers, and annual turnover not over Rs 8 million',
          'Excluded from registration as a manufacturer',
        ],
        [
          'Tier-1 retailer, s.2(43A)',
          'Chain store, air-conditioned mall unit, 12-month electricity bill over Rs 1.2 million, bulk importer-retailer, or shop of 1,000 square feet or more',
          'Brings integration and reporting obligations',
        ],
      ],
    },

    {
      kind: 'prose',
      heading: 'Goods are federal, services are provincial',
      body: [
        'This is the question to settle before any other, because getting it wrong means registering with the wrong authority entirely. Sales tax on goods is federal and administered by FBR. Sales tax on services is provincial: Punjab through the PRA, Sindh through the SRB, Khyber Pakhtunkhwa through the KPRA, and Balochistan through the BRA.',
        'A software house, a marketing agency or a consultancy is supplying services, so its sales tax obligation is provincial. Section 14(1)(f) is the bridge: a person required to register under a provincial law also falls into the federal category, which is why businesses doing both need to think about both.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'KPK runs on the 2022 Act, not the Finance Act 2013',
      body: 'Guides written for Khyber Pakhtunkhwa almost universally cite the Finance Act 2013. The operative statute has been the Khyber Pakhtunkhwa Sales Tax on Services Act 2022 since June 2022, updated through the Finance Act 2024. Under section 29 a person must register who provides a taxable service from a place of business in the Province, is otherwise required to register, or is a withholding agent. There is no turnover threshold there either.',
    },

    {
      kind: 'steps',
      heading: 'Registering with KPRA',
      intro: 'The timings in the KP Act are unusually specific, and both run in your favour if you plan.',
      steps: [
        {
          title: 'Apply before you are liable, not after',
          body: 'Section 29(6) requires the application not later than fifteen days before you become liable to be registered. That is a forward-looking deadline, which is unusual and easy to miss.',
        },
        {
          title: 'The Authority has fifteen days',
          body: 'Section 29(7) requires the Authority to register and notify within fifteen days of the application.',
        },
        {
          title: 'Know whether you are a withholding agent',
          body: 'Being one is itself a registration trigger under section 29(1)(c), regardless of whether you supply any taxable service at all.',
        },
        {
          title: 'File monthly',
          body: 'Payment is due on the fifteenth day of the month following the tax period. A revised return needs the Collector\'s prior permission and must be within six months.',
        },
      ],
    },

    {
      kind: 'steps',
      heading: 'Registering with FBR for goods',
      intro: 'Through IRIS, and the step after registration is the one people miss.',
      steps: [
        {
          title: 'File Form 14(1) in IRIS',
          body: 'Log in, select the sales tax registration form, give the tax period and say whether you are a manufacturer or not.',
        },
        {
          title: 'Upload what the form asks for',
          body: 'A bank account certificate in the name of the business, business details, GPS-tagged photographs of the premises, utility supplier registration numbers and meter photographs. A manufacturer additionally uploads GPS-tagged photographs of machinery and industrial meters.',
        },
        {
          title: 'Complete biometric verification within thirty days',
          body: 'Visit a NADRA e-Sahulat centre. This is the step that catches people out.',
        },
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Miss the biometric deadline and you come off the list',
      body: 'FBR is explicit: a registered person who does not visit a NADRA e-Sahulat centre within thirty days, or whose verification fails, is removed from the Sales Tax Active Taxpayer List. A manufacturer may also face post-verification by field officers, with fifteen days to resubmit anything found not genuine before the same removal follows.',
    },

    {
      kind: 'prose',
      heading: 'Selling online now triggers registration',
      body: [
        'Sections 14(1A) and 14(1B), inserted by the Finance Act 2025, changed the position for anyone selling through a marketplace or their own website. Any person, including a non-resident, selling digitally ordered goods from within Pakistan through an online marketplace, website or software application must apply for registration.',
        'The enforcement sits with the platforms rather than with you. Under 14(1B) an online marketplace or courier may not allow anyone to use its services for e-commerce unless that person holds an NTN and, where 14(1A) applies, sales tax registration. So the practical consequence of not registering is that you cannot sell, rather than that you receive a notice.',
        'Who collects depends on how the customer pays. For an online payment the acquiring bank acts as payment intermediary and withholds. For cash on delivery the courier carries the obligation.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The enforcement powers you have read about are not all in force',
      body: 'The Finance Act 2025 inserted sections 14AC, 14AD and 14AE, allowing FBR to bar bank account operations, bar transfers of immovable property, and seal premises or seize property. Each of them comes into force only on a date the Board notifies in the official Gazette, and we have not been able to trace those notifications. Section 14AC also requires three consecutive opportunities of being heard and staged suspensions before any permanent bar. Pages telling you your account can be frozen today are ahead of the law, or ahead of what we can verify.',
    },
  ],

  faqs: [
    {
      question: 'What is the turnover threshold for sales tax registration in Pakistan?',
      answer:
        'There is not one. Section 14 of the Sales Tax Act 1990 lists categories of person who must register and contains no turnover threshold. The Rs 12.5 million figure that circulates is not in section 14, nor in the cottage industry definition, nor in the Tier-1 retailer definition.',
    },
    {
      question: 'Do I register for sales tax with FBR or with my province?',
      answer:
        'Goods are federal and go to FBR. Services are provincial: Punjab to the PRA, Sindh to the SRB, Khyber Pakhtunkhwa to the KPRA, Balochistan to the BRA. A software house or agency supplies services, so its obligation is provincial.',
    },
    {
      question: 'Does a small service business in KPK need to register with KPRA?',
      answer:
        'Possibly, and turnover is not the test. Section 29 of the Khyber Pakhtunkhwa Sales Tax on Services Act 2022 requires registration by a person who provides a taxable service from a place of business in the Province, or who is a withholding agent. There is no turnover threshold in it.',
    },
    {
      question: 'What is the biometric verification requirement for sales tax?',
      answer:
        'After registering with FBR you must visit a NADRA e-Sahulat centre within thirty days for biometric verification. Failing to attend, or failing the verification, results in removal from the Sales Tax Active Taxpayer List.',
    },
    {
      question: 'Do I need sales tax registration to sell online in Pakistan?',
      answer:
        'If you sell digitally ordered goods from within Pakistan through a marketplace, website or app, section 14(1A) requires you to apply. Marketplaces and couriers are separately barred under 14(1B) from letting you use their services without an NTN and, where applicable, sales tax registration.',
    },
    {
      question: 'What documents are needed for sales tax registration?',
      answer:
        'A bank account certificate in the name of the business, business details including activity and capacity, GPS-tagged photographs of the business premises, utility supplier registration numbers and meter photographs. A manufacturer additionally provides GPS-tagged photographs of machinery and industrial meters.',
    },
    {
      question: 'Can FBR freeze my bank account for not registering?',
      answer:
        'Section 14AC provides for it, but it comes into force only on a date notified in the official Gazette and we have not traced that notification. Even once in force it requires three consecutive opportunities of being heard and staged suspensions before a permanent bar.',
    },
    {
      question: 'When is a sales tax return due?',
      answer:
        'Federally, the due date is the fifteenth day of the month following the tax period, and the Board may notify different dates for different annexures. Under the KP Act the position is the same fifteenth-day rule, with a revised return needing the Collector\'s prior permission within six months.',
    },
  ],

  publishedAt: '2026-09-13T07:00:00Z',
  related: ['how-to-get-an-ntn', 'secp-company-registration'],

  seo: {
    title: 'Sales Tax Registration in Pakistan: Who Must Register',
    description:
      'The turnover threshold that does not exist, the federal and provincial split, KPRA under the 2022 Act, and the thirty-day biometric deadline that removes you from the active list.',
  },
};

export const SALESTAX_GUIDES: Guide[] = [SALES_TAX_REGISTRATION];
