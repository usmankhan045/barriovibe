import type { Service } from '../types';

/**
 * Discipline 07a: the United States.
 *
 * Split into its own file rather than added to `international-expansion.ts`
 * because the US block is five services against three for the whole of Saudi
 * Arabia, the UAE and the UK combined, and because those five are a single
 * chain rather than five unrelated offerings: form the entity, get the number,
 * keep the books, file the returns, register the brand. A reader working down
 * the file should be able to follow that chain. It is still the same
 * discipline: every service here carries `pillar: 'international-expansion'`,
 * so the pillar page, the mega-menu and the footer group it with the other
 * overseas work without any further wiring.
 *
 * `USA_SERVICES` is spread ahead of `INTERNATIONAL_SERVICES` in
 * `content/services/index.ts`, which puts the US first inside the discipline.
 *
 * ── Facts in this file that are checkable, and were checked ──
 *
 * A foreign-owned single-member LLC is disregarded for tax and still files
 * Form 5472 behind a pro forma Form 1120, due 15 April for a calendar-year
 * owner, extendable six months on Form 7004. The penalty is $25,000 per form
 * per year, plus $25,000 for each 30 days once the IRS has issued a 90-day
 * notice. Wyoming's annual report falls on the first day of the formation
 * anniversary month with a $60 minimum licence tax; Delaware's flat $300 LLC
 * tax falls on 1 June; New Mexico requires no annual report at all. Form W-7
 * is paper only. The USPTO has required a US-licensed attorney of record from
 * every foreign-domiciled applicant since 2019, and since January 2025 charges
 * $100 per class for insufficient information and $200 per class for free-text
 * identifications outside the Trademark ID Manual. Economic nexus is $100,000
 * of sales into a state in most states, some adding a 200-transaction test.
 * The 1099-NEC and 1099-MISC threshold rises from $600 to $2,000 for payments
 * made from 2026.
 *
 * ── One fact that is deliberately NOT sold as a service ──
 *
 * BOI reporting. FinCEN's final rule, effective 14 August 2026, permanently
 * exempts entities created in the United States and their beneficial owners
 * from beneficial ownership reporting. Only an entity formed under foreign law
 * and then registered to do business in a US state is still a reporting
 * company, which is not the structure anything on this page produces. Several
 * competitors still list it. It appears here once, as an FAQ answer on the
 * formation page, and nowhere else.
 */
export const USA_SERVICES: Service[] = [
  {
    slug: 'us-company-formation',
    pillar: 'international-expansion',
    title: 'US Company Formation',
    navLabel: 'US Company Formation',
    oneLiner:
      'A US LLC or C-Corporation registered in your name from Pakistan, with the EIN, registered agent and business banking that make it usable.',
    intro:
      'You do not have to be a US citizen, hold a green card or set foot in the United States to own a US company. What stops most Pakistani founders is not the incorporation, which is a state filing, but everything after it: an EIN without a Social Security Number, a registered agent in the state, an operating agreement a bank will read, and an account that actually opens. We run the whole chain and hand over a company you can trade and get paid through.',
    icon: 'building',
    included: [
      'Entity and state chosen on your facts: LLC or C-Corporation, in Wyoming, New Mexico or Delaware',
      'Name availability check and Articles of Organization or Incorporation filed with the Secretary of State',
      'Registered agent appointed in the state of formation, which the state requires you to keep',
      'EIN obtained from the IRS on Form SS-4 without a Social Security Number',
      'Operating agreement or corporate bylaws drafted, plus the founder resolutions a bank asks for',
      'Business banking and payment applications prepared: Wise, Payoneer, Mercury or Relay, then Stripe or PayPal',
      'Annual report and franchise tax dates recorded for your state, so the company does not lapse',
    ],
    audience: [
      'Freelancers billing US clients',
      'SaaS and agency founders needing Stripe',
      'Amazon and Shopify sellers',
    ],
    steps: [
      {
        title: 'Structure',
        description:
          'We ask what you sell, who pays you and how, then recommend the entity and the state. Wyoming, New Mexico and Delaware are not interchangeable, and the wrong one costs you every year for as long as the company exists.',
      },
      {
        title: 'Filing',
        description:
          'Name cleared against the state register and the formation document filed with the Secretary of State, with the registered agent appointed at the same time rather than afterwards.',
      },
      {
        title: 'EIN and documents',
        description:
          'Form SS-4 filed with the IRS to obtain the EIN without an SSN, and your operating agreement, bylaws and founder resolutions drafted around the ownership you actually have.',
      },
      {
        title: 'Banking',
        description:
          'Applications prepared and submitted for a business account and your payment processor, with the ownership, address and business-model evidence each of them asks for.',
      },
    ],
    deliverables: [
      'Stamped Articles of Organization or Incorporation from the Secretary of State',
      'EIN confirmation letter from the IRS',
      'Signed operating agreement or corporate bylaws, with founder resolutions',
      'Registered agent appointment in the state of formation',
      'A business bank account and payment processor ready to receive',
      'A compliance calendar naming every state and federal date for the year ahead',
    ],
    documents: [
      'Passport of every owner, in English',
      'Proof of home address for every owner',
      'Three preferred company names, in order of preference',
      'A description of what the business sells, and to whom',
      'A mobile number and an email address that will stay reachable',
    ],
    related: ['us-tax-filing', 'itin-application', 'company-registration'],
    faqs: [
      {
        question: 'Do I need to be in the US, or hold a visa?',
        answer:
          'No. Neither citizenship, residence, a visa nor a US address is required to own a US LLC or corporation, and the whole formation runs remotely from Pakistan. What the state does require is a registered agent with a physical address in the state, and appointing one is part of this work.',
      },
      {
        question: 'Can I get an EIN without a Social Security Number?',
        answer:
          'Yes. A foreign owner applies on Form SS-4 and writes “Foreign” where the form asks for an SSN or ITIN. The application goes to the IRS by fax or post rather than through the online tool, which is restricted to applicants who already hold a US taxpayer number.',
      },
      {
        question: 'Which state should I register in?',
        answer:
          'It depends on what the company will do. Wyoming is the common default for a single-member LLC and charges an annual report licence tax with a $60 minimum, due on the first day of your formation anniversary month. New Mexico requires no annual report at all. Delaware charges a flat $300 LLC tax every 1 June and earns that cost mainly if you intend to raise venture capital. We recommend on your facts rather than on a default.',
      },
      {
        question: 'Will forming a US LLC get me a Stripe account?',
        answer:
          'It is what makes an application possible, not what guarantees approval. Stripe accepts US LLCs owned by Pakistani residents, but it underwrites the business, so the outcome still turns on what you sell, your website and your payout bank. We prepare the application with that in mind and tell you plainly where the risk sits before you apply.',
      },
      {
        question: 'Do I still have to file a BOI report with FinCEN?',
        answer:
          'Not for a company formed in the United States. FinCEN’s final rule, effective 14 August 2026, permanently exempts entities created in the US and their beneficial owners from beneficial ownership reporting. Only an entity formed under foreign law and then registered to do business in a US state remains a reporting company, which is not what this service produces.',
      },
    ],
    seo: {
      title: 'US LLC & Corporation Formation from Pakistan',
      description:
        'Form a US LLC or C-Corporation from Pakistan with EIN, registered agent, operating agreement and business banking. No SSN, no US address and no travel.',
    },
  },

  {
    slug: 'us-tax-filing',
    pillar: 'international-expansion',
    title: 'US Federal & State Tax Filing',
    navLabel: 'US Tax Filing',
    oneLiner:
      'Federal and state returns for your US company and its owners, including the Form 5472 filing that carries a $25,000 penalty when it is missed.',
    intro:
      'A US company files whether or not it made money, and a foreign-owned one files forms most accountants outside the US never see. A single-member LLC owned from Pakistan is disregarded for tax and still has to lodge Form 5472 behind a pro forma Form 1120 every year, with a penalty starting at $25,000 for not doing it. We work out what your structure actually owes, file the federal and state returns, and keep the state registration alive underneath them.',
    icon: 'calculator',
    included: [
      'Form 5472 with the pro forma Form 1120 for a foreign-owned single-member LLC, due 15 April',
      'Form 1065 partnership return with Schedules K-1 and K-3 for a multi-member LLC',
      'Form 1120 corporation return for a C-Corporation, with state corporate returns where they are required',
      'Form 1040-NR where you have income effectively connected with a US trade or business',
      'Extensions filed on Form 7004 or Form 4868 before the deadline rather than after it',
      'State annual report and franchise tax filed on your state’s date, so the company stays in good standing',
      'Reportable-transaction schedules: capital contributions, owner draws, and every payment between you and the LLC',
    ],
    audience: [
      'Owners of a foreign-owned US LLC',
      'Companies that have never filed',
      'Founders who have had an IRS notice',
    ],
    steps: [
      {
        title: 'Position review',
        description:
          'We read your formation documents, EIN letter and bank statements, then tell you exactly which federal and state returns are due, and which years are already late.',
      },
      {
        title: 'Books to a return',
        description:
          'Transactions classified and reconciled for the tax year, with transactions between you and the company identified separately, because those are precisely what Form 5472 reports.',
      },
      {
        title: 'Filing',
        description:
          'Returns prepared, sent to you with every figure explained, and lodged with the IRS and the state once you have signed off on them.',
      },
      {
        title: 'Standing maintained',
        description:
          'Annual report and franchise tax filed on the state’s own date, and next year’s calendar issued with every federal and state deadline already on it.',
      },
    ],
    deliverables: [
      'Filed federal return with the IRS acknowledgement',
      'Filed state annual report or franchise tax return',
      'Form 5472 as lodged, with the related-party schedule behind it',
      'A tax-year summary of the company’s income, expenses and owner transactions',
      'A written filing calendar for the year ahead',
    ],
    documents: [
      'Articles of Organization or Incorporation, and the EIN confirmation letter',
      'Operating agreement or bylaws showing current ownership',
      'Bank and payment processor statements covering the whole tax year',
      'A record of every transfer between you and the company, in both directions',
      'Prior year US returns, if any were filed',
      'Your ITIN or SSN, where the structure requires an individual return',
    ],
    related: ['us-company-formation', 'us-bookkeeping-payroll', 'income-tax-filing'],
    faqs: [
      {
        question: 'My LLC made no money. Do I still have to file?',
        answer:
          'Yes. A foreign-owned single-member LLC files Form 5472 with a pro forma Form 1120 for any year in which it had a reportable transaction, and forming the company and funding it are themselves reportable transactions. A dormant year is still a filing year.',
      },
      {
        question: 'What happens if I have never filed Form 5472?',
        answer:
          'The penalty is $25,000 per form per year, with a further $25,000 for every 30 days that pass once the IRS has issued a 90-day notice. It is a penalty for not filing rather than a tax on profit, so it applies in full to a company that earned nothing. Late filings are still worth making, and we prepare them with a reasonable-cause statement attached.',
      },
      {
        question: 'Does owning a US LLC mean I pay US income tax?',
        answer:
          'Not automatically. A single-member LLC with no US office, no US employees and no dependent agent in the US often has no income effectively connected with a US trade or business, and so no US income tax, while still having to file. The reporting obligation and the tax liability are separate questions and we answer them separately.',
      },
      {
        question: 'When are the deadlines?',
        answer:
          'Form 5472 with the pro forma Form 1120 is due 15 April for a calendar-year owner, with a six-month extension available on Form 7004 filed before that date. A partnership return on Form 1065 is due 15 March. State dates are set by the state: Wyoming on the first day of your formation anniversary month, Delaware on 1 June.',
      },
      {
        question: 'Do I have to register for US sales tax?',
        answer:
          'Only where you have nexus, and that is decided by where your buyers are rather than where you live. Most states set an economic nexus threshold at $100,000 of sales into the state, some adding a 200-transaction test. We check your sales by state before registering you anywhere, because registering unnecessarily creates a filing obligation you then have to keep meeting.',
      },
    ],
    seo: {
      title: 'US Tax Filing for Foreign-Owned LLCs & Corporations',
      description:
        'Form 5472, pro forma 1120, 1065 and 1040-NR filed for foreign-owned US companies, plus state annual reports and franchise tax. Late years brought current.',
    },
  },

  {
    slug: 'itin-application',
    pillar: 'international-expansion',
    title: 'ITIN Application',
    navLabel: 'ITIN Application',
    oneLiner:
      'An IRS Individual Taxpayer Identification Number for someone not eligible for a Social Security Number, applied for on Form W-7 and seen through.',
    intro:
      'An ITIN is the number the IRS issues to a person who has a US tax obligation but cannot get a Social Security Number, which describes almost every Pakistani owner of a US company. You need one to file a personal US return, to claim a treaty rate on tax withheld from you, and to satisfy a bank or a platform asking for a US taxpayer number. The application is paper only, and it is refused for small documentary reasons far more often than for substantive ones.',
    icon: 'users',
    included: [
      'Eligibility checked against the IRS reasons for applying, before anything is prepared',
      'Form W-7 completed with the correct reason code and its supporting explanation',
      'Identity and foreign status evidence assembled, with a valid passport as the single sufficient document',
      'The federal tax return or exception documentation the W-7 has to be attached to',
      'Submission to the IRS ITIN Operation, and the correspondence handled if they write back',
      'Renewal of an existing ITIN that has expired through disuse',
    ],
    audience: [
      'Owners of a US LLC or corporation',
      'People with US tax withheld from them',
      'Anyone asked for a US taxpayer number',
    ],
    steps: [
      {
        title: 'Eligibility',
        description:
          'We confirm you actually need an ITIN and establish which of the IRS reason codes applies to you. A wrong code is the single most common reason a W-7 comes back unprocessed.',
      },
      {
        title: 'Documents',
        description:
          'Passport and supporting evidence checked against what the IRS accepts, and the certification route agreed so that you do not have to post your original passport out of the country.',
      },
      {
        title: 'Filing',
        description:
          'Form W-7 lodged together with the return or the exception documentation it must accompany, since a W-7 submitted on its own is not a complete application.',
      },
      {
        title: 'Follow-through',
        description:
          'IRS correspondence answered and the assignment letter delivered to you, with the number recorded wherever your bank, your accountant and your platforms need it.',
      },
    ],
    deliverables: [
      'A completed and lodged Form W-7 with its full supporting pack',
      'Certified copies of the identity documents used',
      'The IRS notice assigning your ITIN',
      'The return or exception documentation filed alongside the application',
    ],
    documents: [
      'A valid, unexpired passport',
      'Proof of the US tax reason: your LLC documents, a platform notice or a withholding statement',
      'Your US entity’s EIN letter, where the application is connected to a company',
      'A prior ITIN letter, if you are renewing rather than applying',
    ],
    related: ['us-tax-filing', 'us-company-formation', 'income-tax-filing'],
    faqs: [
      {
        question: 'Do I have to post my original passport to the IRS?',
        answer:
          'Not if the copies are certified for you. A Certifying Acceptance Agent verifies the passport and certifies it to the IRS, and the issuing authority can also certify a copy. Both routes keep the original in your hands, which matters, because the IRS holds original documents for the duration of processing.',
      },
      {
        question: 'How long does the IRS take?',
        answer:
          'The IRS runs to roughly seven weeks outside peak season and nine to eleven weeks during it, measured from the day a complete application reaches them. An incomplete application restarts rather than continues, which is the whole case for getting it right the first time.',
      },
      {
        question: 'Is an ITIN the same thing as an EIN?',
        answer:
          'No. An EIN identifies a business to the IRS and is issued to your company. An ITIN identifies a person and is issued to you. A US LLC needs an EIN; you may separately need an ITIN if you have to file a personal US return or claim a treaty benefit.',
      },
      {
        question: 'Does an ITIN give me the right to work or live in the US?',
        answer:
          'No. It is a tax processing number and nothing more. It confers no immigration status, no work authorisation and no entitlement to social security benefits, and the IRS says exactly that on the assignment letter.',
      },
      {
        question: 'My ITIN has stopped working. What happened?',
        answer:
          'An ITIN that has not appeared on a federal return for three consecutive years expires. It is renewed on the same Form W-7, marked as a renewal, and we handle a renewal the same way as a first application.',
      },
    ],
    seo: {
      title: 'ITIN Application for Non-US Citizens | Form W-7',
      description:
        'IRS Individual Taxpayer Identification Number applications on Form W-7, prepared and filed from Pakistan with certified documents and renewals handled.',
    },
  },

  {
    slug: 'us-bookkeeping-payroll',
    pillar: 'international-expansion',
    title: 'US Bookkeeping & Payroll',
    navLabel: 'US Bookkeeping & Payroll',
    oneLiner:
      'Books kept in US dollars to the standard a US return is filed from, plus payroll and contractor reporting where you have people being paid.',
    intro:
      'A US return is only as good as the ledger behind it, and a foreign-owned company’s ledger has one job most bookkeepers miss: it has to separate the payments between you and your own company, because those are exactly what Form 5472 reports. We keep the books monthly in dollars, reconcile them to your bank and your payment processors, and run payroll or contractor reporting where you have people being paid in the US.',
    icon: 'ledger',
    included: [
      'Monthly bookkeeping in US dollars, reconciled to bank, Stripe, PayPal and marketplace payouts',
      'Owner transactions tracked separately: capital in, draws out, and anything paid on the company’s behalf',
      'Chart of accounts built for the US return you will file rather than translated from a Pakistani one',
      'Payroll for US employees, with federal and state withholding and the quarterly and annual returns',
      'Contractor reporting: W-9 collection and Form 1099-NEC, or W-8BEN with Forms 1042 and 1042-S for foreign payees',
      'Sales tax nexus monitored state by state, with registration and filing once a threshold is crossed',
      'A year-end pack handed to whoever files the return, or filed by us',
    ],
    audience: [
      'US LLCs trading through Stripe',
      'Amazon and Shopify sellers',
      'Companies paying US staff or contractors',
    ],
    steps: [
      {
        title: 'Set up',
        description:
          'Chart of accounts built for the entity type and the return it will file, with your bank and payment processor feeds connected so nothing has to be typed in by hand.',
      },
      {
        title: 'Catch up',
        description:
          'Any backlog reconstructed from bank and processor statements back to the start of the tax year, so the first month we close sits on a true opening balance.',
      },
      {
        title: 'Monthly close',
        description:
          'Transactions classified and reconciled, owner transactions flagged as they occur, and a profit and loss and balance sheet issued every month.',
      },
      {
        title: 'Reporting',
        description:
          'Payroll and contractor filings lodged on their due dates, nexus reviewed state by state, and the year-end pack prepared for the tax return.',
      },
    ],
    deliverables: [
      'Monthly profit and loss and balance sheet in US dollars',
      'Reconciliation packs for every bank and payment processor account',
      'A related-party ledger of every transaction between you and the company',
      'Filed payroll returns and issued W-2 or 1099-NEC forms, where payroll runs',
      'A year-end pack the tax return is prepared directly from',
    ],
    documents: [
      'Bank statements for all US accounts',
      'Stripe, PayPal, Payoneer, Wise and marketplace payout reports',
      'Sales invoices and expense receipts for the period',
      'W-9 or W-8BEN forms from anyone you pay',
      'Payroll records, where you have US employees',
    ],
    related: ['us-tax-filing', 'bookkeeping', 'ecommerce-management'],
    faqs: [
      {
        question: 'Why does it matter which payments came from me personally?',
        answer:
          'Because that is what Form 5472 reports. A foreign-owned single-member LLC has to disclose its reportable transactions with its foreign owner, which includes money you put in and money you take out. If the ledger does not separate them, the form cannot be prepared without going back through a year of statements line by line.',
      },
      {
        question: 'Do I have to send a 1099 to a contractor in Pakistan?',
        answer:
          'Usually not. Form 1099-NEC is for US persons. A foreign contractor gives you a W-8BEN or W-8BEN-E instead, and where the payment is US-source it is reported on Forms 1042 and 1042-S rather than on a 1099. Collecting the right form before you pay is what keeps this simple.',
      },
      {
        question: 'What is the 1099 threshold now?',
        answer:
          'For payments made from 2026 onward the 1099-NEC and 1099-MISC reporting threshold rises from $600 to $2,000. The obligation to collect a W-9 before you pay does not move with the threshold, so we set that up as part of onboarding any contractor.',
      },
      {
        question: 'When do I have to register for sales tax in a state?',
        answer:
          'When you cross that state’s economic nexus threshold, which is $100,000 of sales into the state in most of them, sometimes with a 200-transaction alternative. Marketplaces such as Amazon collect and remit on their own sales, so what usually triggers registration is your own website. We track it by state and tell you before you cross rather than after.',
      },
    ],
    seo: {
      title: 'US Bookkeeping & Payroll for Foreign-Owned Companies',
      description:
        'Monthly US dollar bookkeeping reconciled to Stripe and bank, related-party tracking for Form 5472, payroll, 1099 and W-8BEN reporting, and sales tax nexus.',
    },
  },

  {
    slug: 'us-trademark-registration',
    pillar: 'international-expansion',
    title: 'US Trademark Registration',
    navLabel: 'US Trademark',
    oneLiner:
      'Your brand registered with the USPTO, which a foreign-domiciled applicant is only permitted to do through a US-licensed attorney.',
    intro:
      'A trademark registered in Pakistan protects you in Pakistan. Selling into the United States, on your own site or through Amazon, puts your brand in front of a market where a registration you do not hold is one somebody else can take. The USPTO also has a rule that catches most applicants from abroad by surprise: if you are domiciled outside the United States, your application has to be filed and prosecuted by an attorney licensed in the US. We run the clearance and the filing, and appoint that attorney as part of the work.',
    icon: 'trademark',
    included: [
      'Clearance search of the USPTO register and of unregistered US use, before you commit to a name',
      'A US-licensed attorney appointed as attorney of record, which the USPTO requires of every foreign-domiciled applicant',
      'Classes and specification drafted from the Trademark ID Manual, which avoids the free-text surcharge',
      'Filing basis advised: use in commerce under section 1(a), or intent to use under section 1(b)',
      'Specimens of use prepared and lodged, including Amazon and Shopify listings where that is the use',
      'Office action responses carried through to registration, and the maintenance dates recorded',
    ],
    audience: [
      'Amazon and Shopify sellers',
      'SaaS and app brands selling to the US',
      'Businesses already registered in Pakistan',
    ],
    steps: [
      {
        title: 'Clearance',
        description:
          'We search the USPTO register and unregistered US use for conflicts, and tell you plainly whether the mark is worth filing or should be changed before you spend anything on it.',
      },
      {
        title: 'Specification',
        description:
          'Goods and services drafted from the Trademark ID Manual, and the classes chosen for what you actually sell rather than for everything you might one day sell.',
      },
      {
        title: 'Filing',
        description:
          'Application filed with a US-licensed attorney as attorney of record, on the correct basis, with the specimen or the intent-to-use declaration that basis requires.',
      },
      {
        title: 'Prosecution',
        description:
          'The examiner’s office actions answered inside the response window, publication monitored for opposition, and the registration certificate delivered to you.',
      },
    ],
    deliverables: [
      'A written clearance opinion on the mark',
      'The filed US application with its serial number',
      'A US-licensed attorney appointed as attorney of record',
      'Drafted responses to any office action raised',
      'The USPTO registration certificate, and the maintenance dates that follow it',
    ],
    documents: [
      'The wordmark, and the logo file if you are registering a design mark',
      'A list of the goods and services the mark is used on',
      'Evidence of use in US commerce: listings, packaging, screenshots',
      'The date the mark was first used in the US, if it has been',
      'Your Pakistan registration certificate, where one exists',
    ],
    related: ['trademark-registration', 'us-company-formation', 'ecommerce-management'],
    faqs: [
      {
        question: 'Do I have to use a US attorney?',
        answer:
          'Yes, if you are domiciled outside the United States. The USPTO has required a US-licensed attorney of record from every foreign-domiciled applicant and registrant since 2019, and an application filed without one is refused on that ground alone. Appointing that attorney is part of this engagement rather than a cost you go and find separately.',
      },
      {
        question: 'Does my Pakistani trademark protect me in the US?',
        answer:
          'No. Trademark rights are territorial, and an IPO Pakistan registration gives you nothing in the United States. It can, in some circumstances, support a US application under section 44, which is one of the first things we check.',
      },
      {
        question: 'Can I register before I have sold anything in the US?',
        answer:
          'Yes, on an intent-to-use basis under section 1(b). The application is examined and published, and the registration issues once you file a statement of use with a specimen. It holds your priority date while you get to market.',
      },
      {
        question: 'Why do the USPTO fees vary so much?',
        answer:
          'The USPTO replaced its old two-tier application in January 2025 with a single base fee plus surcharges. Insufficient information adds $100 per class, and describing your goods in free text instead of selecting from the Trademark ID Manual adds $200 per class. Drafting from the manual is what keeps a filing at base rate.',
      },
      {
        question: 'Will Amazon Brand Registry accept it?',
        answer:
          'Amazon accepts a pending application in some programmes and a registration in others, and its requirements change. The registration is the durable answer, and we file on the basis and in the classes that support the listings you actually run.',
      },
    ],
    seo: {
      title: 'US Trademark Registration with the USPTO',
      description:
        'USPTO trademark clearance, filing and prosecution for Pakistani brands, with the US-licensed attorney of record every foreign applicant must appoint.',
    },
  },
];
