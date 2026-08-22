import type { Service } from '../types';

/**
 * Discipline 07b: the United Kingdom.
 *
 * Split into its own file for the same reason `usa.ts` was: five UK services
 * against two for the whole of Saudi Arabia and the UAE combined is a chain
 * worth reading on its own, not three lines added to `international-expansion.ts`.
 * The chain here runs form the company, register with HMRC, keep the books,
 * file VAT and Corporation Tax, run payroll, which a reader should be able to
 * follow top to bottom. It is still the same discipline: every service here
 * carries `pillar: 'international-expansion'`, so the pillar page, the
 * mega-menu and the footer group it with the other overseas work without any
 * further wiring.
 *
 * This file replaces the single `uk-vat-bookkeeping` service that used to live
 * in `international-expansion.ts`. That one page tried to cover VAT,
 * bookkeeping and, by implication, everything else a UK entity needs, and
 * once Company Formation, a dedicated Bookkeeping page, Corporation Tax,
 * Finance Department Outsourcing and Payroll were all being added properly,
 * carrying on with one page next to five precise ones would have meant two
 * services answering the same question differently. `uk-vat-corporation-tax`
 * below is its direct successor for VAT; bookkeeping now has its own page.
 *
 * `UK_SERVICES` is spread after `USA_SERVICES` and `INTERNATIONAL_SERVICES` in
 * `content/services/index.ts`, which keeps the discipline in the order named
 * throughout: the United States, Saudi Arabia, the UAE, then the UK.
 *
 * ── Facts in this file that are checkable, and were checked ──
 *
 * Companies House's online incorporation fee is £100 and same-day incorporation
 * is £156, both effective 1 February 2026. The confirmation statement costs £50
 * filed online or £110 on paper, and is due within 14 days of the review
 * period ending. A registered office has had to be an "appropriate address"
 * and every company has needed a registered email address since March 2024.
 * Identity verification for directors and PSCs under the Economic Crime and
 * Corporate Transparency Act became mandatory for every new director and new
 * incorporation from 18 November 2025; existing directors and PSCs must
 * complete it by 18 November 2026 or at their next confirmation statement.
 * Late accounts penalties are £150 up to one month late, £375 up to three,
 * £750 up to six and £1,500 beyond that, doubled if late two years running;
 * first accounts are due 21 months after incorporation and every year after
 * that, nine months after the accounting reference date.
 *
 * The VAT registration threshold is £90,000 of taxable turnover on a rolling
 * twelve-month test, deregistration is £88,000, and a business not established
 * in the UK has no threshold at all. Corporation Tax charges a small profits
 * rate of 19% up to £50,000 of profit and a main rate of 25% above £250,000,
 * with marginal relief tapering the rate between the two. Corporation Tax
 * registration is due within three months of trading starting, the CT600 is
 * due 12 months after the accounting period ends, and payment is due nine
 * months and one day after it, three months before the return itself.
 *
 * The National Living Wage from 1 April 2026 is £12.71 for anyone 21 or over,
 * £10.85 for 18 to 20 year olds and £8.00 for 16 to 17 year olds and
 * apprentices. Employer National Insurance is 15% above the £5,000 secondary
 * threshold, frozen until April 2031. The Employment Allowance is £10,500 and
 * its former £100,000 eligibility cap was removed from April 2025, though a
 * company whose only paid employee is also its director still cannot claim
 * it. Auto-enrolment applies to eligible employees earning above £10,000 a
 * year, on qualifying earnings between £6,240 and £50,270, at a minimum total
 * contribution of 8%, at least 3% of it from the employer.
 */
export const UK_SERVICES: Service[] = [
  {
    slug: 'uk-company-formation',
    pillar: 'international-expansion',
    title: 'UK Company Formation & Companies House Compliance',
    navLabel: 'UK Company Formation',
    oneLiner:
      'A private limited company incorporated with Companies House, registered for Corporation Tax, and kept compliant through the confirmation statement each year.',
    intro:
      'Incorporating a UK company takes a day once the paperwork is right, and almost every problem we see afterwards traces back to what was skipped at that stage: a registered office that cannot actually receive post, a SIC code that does not match the business, or a director who was never told about the identity verification Companies House now requires. We form the company, register it for Corporation Tax, and run the calendar of filings that keeps it in good standing rather than handing you a certificate and leaving the rest to you.',
    icon: 'building',
    included: [
      'Company name check and private limited company incorporation filed with Companies House',
      'Registered office and registered email address set up to meet Companies House’s current requirements',
      'Memorandum and Articles of Association, statement of capital and initial PSC filing',
      'Corporation Tax registration with HMRC within the three-month statutory window',
      'Identity verification for directors and persons with significant control under the Economic Crime and Corporate Transparency Act',
      'A compliance calendar covering the confirmation statement, the accounts deadline and every other Companies House filing date',
    ],
    audience: [
      'Pakistani businesses opening a UK entity',
      'Founders relocating operations to the UK',
      'Consultancies and agencies billing UK clients',
    ],
    steps: [
      {
        title: 'Structure and name',
        description:
          'We confirm a private limited company is the right vehicle, check the proposed name against the Companies House register, and choose the SIC code that actually matches what the business does.',
      },
      {
        title: 'Incorporation',
        description:
          'Memorandum and Articles filed, the statement of capital and initial PSC register prepared, and the registered office and registered email address set up to meet Companies House’s current requirements.',
      },
      {
        title: 'HMRC registration',
        description:
          'Corporation Tax registration filed with HMRC inside the three-month window that runs from the date the company starts to trade, with the Unique Taxpayer Reference confirmed.',
      },
      {
        title: 'Identity verification and calendar',
        description:
          'Directors and any person with significant control taken through Companies House identity verification, and a written calendar issued naming every confirmation statement and accounts date for the year ahead.',
      },
    ],
    deliverables: [
      'Certificate of Incorporation from Companies House',
      'Memorandum and Articles of Association',
      'HMRC Corporation Tax registration confirmation and Unique Taxpayer Reference',
      'Confirmed identity verification status for every director and PSC',
      'A written compliance calendar for the year ahead',
    ],
    documents: [
      'Passport of every director, shareholder and person with significant control',
      'Proof of address for every director and PSC',
      'Three preferred company names, in order of preference',
      'A description of what the business does, for the SIC code',
      'Details of the share allocation between shareholders',
    ],
    related: ['uk-vat-corporation-tax', 'uk-bookkeeping', 'company-registration'],
    faqs: [
      {
        question: 'Do I need to be a UK resident to form a company here?',
        answer:
          'No. Neither residency nor a UK passport is required to be a director or shareholder of a UK private limited company, and the whole incorporation runs remotely. What Companies House does require is a registered office in the UK and, since March 2024, a registered email address it can actually use to contact the company.',
      },
      {
        question: 'What is the identity verification Companies House now asks for?',
        answer:
          'Under the Economic Crime and Corporate Transparency Act, every director and person with significant control has to verify their identity with Companies House, either directly or through an authorised agent. It became mandatory for every new director and new incorporation from 18 November 2025, and existing directors and PSCs have to complete it by 18 November 2026 or at their next confirmation statement, whichever comes first. Companies House has said active enforcement begins once that transition period ends.',
      },
      {
        question: 'What does the confirmation statement actually confirm?',
        answer:
          'That the information Companies House holds on your company, its registered office, its directors, its PSCs and its shareholdings, is still correct as at a set date each year. It has to be filed within 14 days of that date even where nothing has changed, and the online filing fee is £50. A late confirmation statement is a criminal offence on the part of every director, not just an administrative default.',
      },
      {
        question: 'What happens if the annual accounts are filed late?',
        answer:
          'A private limited company’s first accounts are due 21 months after incorporation, and every year after that, nine months after the accounting reference date. Penalties are automatic and rise with how late you are: £150 up to one month, £375 up to three months, £750 up to six months and £1,500 beyond that, doubled if you were late the year before as well.',
      },
    ],
    seo: {
      title: 'UK Company Formation & Companies House Compliance',
      description:
        'Private limited company incorporation with Companies House, Corporation Tax registration, director identity verification and a full compliance calendar.',
    },
  },

  {
    slug: 'uk-bookkeeping',
    pillar: 'international-expansion',
    title: 'UK Outsourced Bookkeeping',
    navLabel: 'UK Bookkeeping',
    oneLiner:
      'Monthly bookkeeping in Xero or QuickBooks Online, reconciled to your UK bank feeds and kept to the digital-record standard Making Tax Digital requires.',
    intro:
      'A UK company’s books have to satisfy two audiences at once: HMRC, which expects digital records with an unbroken digital link once you are VAT registered, and whoever reads the management accounts to decide whether the business is actually working. We run the bookkeeping in Xero or QuickBooks Online, reconcile every account monthly, and hand off a set of books your accountant, your bank or your board can rely on without checking it first.',
    icon: 'ledger',
    included: [
      'Monthly bookkeeping in Xero or QuickBooks Online, whichever the business already runs on',
      'Bank feed connection and reconciliation for every UK business account',
      'Sales and purchase invoices recorded and categorised against a chart of accounts built for the business',
      'Digital records kept to the standard Making Tax Digital requires, with the links between records preserved',
      'Accounts receivable and payable tracked, with an ageing report every month',
      'A monthly management accounts pack handed to the tax team, your board, or your own accountant',
    ],
    audience: [
      'UK companies without an in-house bookkeeper',
      'E-commerce sellers trading through a UK entity',
      'Consultancies and agencies billing UK clients',
    ],
    steps: [
      {
        title: 'Software and access',
        description:
          'Xero or QuickBooks Online configured, bank feeds connected, and a document-sharing folder set up so invoices and receipts stop arriving by email.',
      },
      {
        title: 'Backlog cleared',
        description:
          'Historic transactions recorded and reconciled back to a verified opening balance, so the first monthly close is not built on a guess.',
      },
      {
        title: 'Monthly cycle',
        description:
          'Sales, purchases and expenses recorded and categorised, bank and card accounts reconciled, and a short query list sent for anything we cannot identify.',
      },
      {
        title: 'Handover',
        description:
          'Closed books passed to whoever files the VAT return and the Company Tax Return, so no filing waits on data entry it should never have depended on.',
      },
    ],
    deliverables: [
      'Fully reconciled ledgers in Xero or QuickBooks Online, current to the last month',
      'A monthly management accounts pack: profit and loss and balance sheet',
      'Accounts receivable and payable ageing reports',
      'A digital record kept to the standard Making Tax Digital requires',
    ],
    documents: [
      'UK business bank and card statements, or read-only feed access',
      'Sales invoices and purchase bills for the period',
      'Payment processor and marketplace settlement reports, where relevant',
      'A prior bookkeeping file or opening balances, if you are switching to us',
    ],
    related: ['uk-vat-corporation-tax', 'uk-payroll', 'bookkeeping'],
    faqs: [
      {
        question: 'Xero or QuickBooks: which one do you use?',
        answer:
          'Whichever the business already runs on, or Xero by default for a new UK company, since it is the platform the largest share of UK accountants and HMRC-recognised Making Tax Digital software integrates with cleanly. We work in your file rather than moving you to ours, and you keep the subscription and the ownership of the data throughout.',
      },
      {
        question: 'Do you need access to our UK bank account?',
        answer:
          'Read-only feed access only, connected directly through Xero or QuickBooks, or bank statements if your bank does not support a feed. We never hold transaction authority and cannot move money out of the account.',
      },
      {
        question: 'How is this different from your VAT and Corporation Tax service?',
        answer:
          'Bookkeeping is the recording: every transaction captured, categorised and reconciled every month. VAT and Corporation Tax is the filing built on top of it, the return prepared from those books and submitted to HMRC. Most UK companies need both, and the filing is far faster and cheaper when the bookkeeping underneath it is already current.',
      },
      {
        question: 'What does Making Tax Digital mean for our bookkeeping?',
        answer:
          'Once you are VAT registered, your records have to be kept digitally and the return has to reach HMRC through compatible software, with a digital link the whole way from the original transaction to the figure on the return. Typing numbers from a spreadsheet into HMRC’s portal is no longer accepted. Working in Xero or QuickBooks from the outset is what keeps that link intact rather than reconstructed at quarter end.',
      },
    ],
    seo: {
      title: 'UK Outsourced Bookkeeping (Xero & QuickBooks)',
      description:
        'Monthly UK bookkeeping in Xero or QuickBooks Online, with bank reconciliation, receivable and payable tracking and digital records kept to Making Tax Digital.',
    },
  },

  {
    slug: 'uk-vat-corporation-tax',
    pillar: 'international-expansion',
    title: 'UK VAT & Corporation Tax',
    navLabel: 'UK VAT & Corporation Tax',
    oneLiner:
      'VAT registration and quarterly Making Tax Digital returns, plus Corporation Tax registration and the CT600 filed to HMRC on the numbers, not the deadline.',
    intro:
      'VAT and Corporation Tax run on separate clocks, and a UK company gets caught by whichever one it is not watching. VAT is filed quarterly against a rolling twelve-month turnover test that has nothing to do with the tax year. Corporation Tax is filed annually but paid nine months and a day after the accounting period ends, three months before the return itself is due. We register you for both, keep the two calendars separate, and file each one from books that already reconcile.',
    icon: 'percent',
    included: [
      'VAT registration with HMRC, and a written view on whether registration is mandatory, voluntary or not yet due',
      'Threshold monitored against the rolling twelve-month test, currently £90,000 of taxable turnover',
      'Quarterly VAT returns prepared and filed through Making Tax Digital for VAT',
      'Corporation Tax registration with HMRC, and the Unique Taxpayer Reference confirmed',
      'Company Tax Return (CT600) prepared and filed, with the computation behind every figure',
      'Small profits rate, marginal relief and the main rate applied correctly against your actual profit',
    ],
    audience: [
      'UK-registered companies trading now',
      'Non-established businesses selling into the UK',
      'Companies that have never filed a CT600',
    ],
    steps: [
      {
        title: 'Position review',
        description:
          'We test your turnover against the VAT threshold and confirm your Corporation Tax accounting period, then tell you plainly what is registered, what is overdue and what is not yet due.',
      },
      {
        title: 'Registration',
        description:
          'VAT registration filed with HMRC where the threshold is met or voluntary registration makes sense, and Corporation Tax registration filed within three months of trading starting.',
      },
      {
        title: 'Quarterly VAT cycle',
        description:
          'Each VAT return reconciled to your books and filed through Making Tax Digital, one month and seven days after the period ends.',
      },
      {
        title: 'Annual Corporation Tax',
        description:
          'The CT600 prepared from your year-end accounts, the tax paid nine months and a day after the accounting period ends, and the return itself filed within twelve months.',
      },
    ],
    deliverables: [
      'VAT registration certificate and VAT number',
      'Filed quarterly VAT returns with HMRC confirmation',
      'Filed CT600 Company Tax Return with the computation behind it',
      'A reconciliation showing output tax, input tax and the VAT payable',
      'A filing calendar naming every VAT and Corporation Tax date for the year',
    ],
    documents: [
      'Certificate of Incorporation and Companies House details',
      'HMRC Government Gateway credentials, or authorisation for us to act as agent',
      'UK business bank statements for the period',
      'Sales invoices and purchase invoices',
      'Year-end accounts, for the Corporation Tax computation',
    ],
    related: ['uk-company-formation', 'uk-bookkeeping', 'income-tax-filing'],
    faqs: [
      {
        question: 'When do we have to register for VAT?',
        answer:
          'When taxable turnover passes £90,000 in any rolling twelve-month period, which is not the same as your accounting year, or when you expect to pass it within the next thirty days alone. Registration is due within thirty days of crossing it. A business not established in the UK selling taxable supplies here generally has no threshold at all and must register from its first supply.',
      },
      {
        question: 'Why does Corporation Tax get paid before the return is filed?',
        answer:
          'Because the two deadlines are set independently. Payment is due nine months and one day after your accounting period ends; the CT600 itself is not due for a further three months, at twelve months after the period ends. Waiting for the return before paying is the single most common way businesses end up owing HMRC interest on a liability they had already worked out.',
      },
      {
        question: 'What is marginal relief?',
        answer:
          'The small profits rate of 19% applies up to £50,000 of profit, and the main rate of 25% applies above £250,000. Between those two figures, marginal relief tapers the rate up gradually rather than stepping straight from 19% to 25%, so a company on £100,000 of profit pays less than 25% on all of it. We apply it as part of every computation rather than defaulting to the main rate.',
      },
      {
        question: 'We are not established in the UK. Do we still need a Government Gateway account?',
        answer:
          'Yes, for VAT and Corporation Tax filing, though we can act as your agent and file on your behalf once you authorise us, which is how most overseas-owned companies run this without ever logging in themselves.',
      },
    ],
    seo: {
      title: 'UK VAT & Corporation Tax Filing Services',
      description:
        'VAT registration with quarterly Making Tax Digital returns, and Corporation Tax registration with the CT600 filed on time, for UK companies and overseas owners.',
    },
  },

  {
    slug: 'uk-finance-department',
    pillar: 'international-expansion',
    title: 'Outsourced Finance Department for UK SMEs',
    navLabel: 'UK Finance Department',
    oneLiner:
      'A monthly finance function covering bookkeeping, management accounts, cash flow and board reporting, run for a fraction of an in-house finance hire.',
    intro:
      'A UK SME usually needs a finance function well before it can justify hiring a finance director, and the gap in between is where the books drift, invoices go uncollected and the board finds out about a cash problem the month it becomes one. We run the finance department as a monthly service: books kept current, management accounts produced on a fixed date, cash flow forecast forward rather than reported backward, and a set of numbers you can actually take into a board meeting or a bank conversation.',
    icon: 'chart',
    included: [
      'Monthly bookkeeping and reconciliation across every UK bank and payment account',
      'Management accounts: profit and loss, balance sheet and cash flow, delivered on a fixed working day each month',
      'Budget versus actual reporting, with variances explained rather than merely listed',
      'A rolling cash flow forecast, so a shortfall is visible weeks before it arrives',
      'Credit control: an ageing report and a follow-up process for overdue invoices',
      'A monthly finance review call walking the board or the founder through the numbers and what needs a decision',
    ],
    audience: [
      'UK SMEs without a finance director',
      'Founders raising debt or investment',
      'Companies that have outgrown a part-time bookkeeper',
    ],
    steps: [
      {
        title: 'Finance health check',
        description:
          'We review your current books, systems and reporting, whatever state they are in, and set out in writing what is missing before we build anything on top of it.',
      },
      {
        title: 'Set up and catch up',
        description:
          'Chart of accounts, reporting templates and a forecast model built around your business, with any backlog brought current first.',
      },
      {
        title: 'Monthly cycle',
        description:
          'Books closed, management accounts produced, cash flow forecast rolled forward, and overdue invoices chased, on the same schedule every month.',
      },
      {
        title: 'Review and decisions',
        description:
          'A monthly call through the numbers and the variances, with the finance team available between calls for whatever decision the business is actually facing.',
      },
    ],
    deliverables: [
      'Monthly management accounts: profit and loss, balance sheet and cash flow',
      'A rolling cash flow forecast, updated every month',
      'Budget versus actual reporting with variance commentary',
      'An accounts receivable ageing report and credit control log',
      'A board-ready reporting pack for investors, lenders or your own board',
    ],
    documents: [
      'Existing bookkeeping file, or bank statements if none exists yet',
      'Prior management accounts or budgets, if any',
      'Sales invoices, purchase invoices and payroll records',
      'Any existing lender or investor reporting requirements',
    ],
    related: ['uk-bookkeeping', 'uk-vat-corporation-tax', 'financial-advisory'],
    faqs: [
      {
        question: 'How is this different from just outsourcing our bookkeeping?',
        answer:
          'Bookkeeping records what already happened. This adds the layer on top: forecasting, budget analysis, credit control and board reporting, run by people who can explain what a number means, not only enter it. Most SMEs start with bookkeeping alone and add the finance department layer once the business is large enough that someone actually needs to act on the numbers, not just file them.',
      },
      {
        question: 'Do we get the same person every month?',
        answer:
          'Yes. A named finance lead runs your account and sits on the monthly call, backed by the bookkeeping and tax team rather than working alone. Continuity is the point of the service: a board or a lender should not have to re-explain the business every quarter.',
      },
      {
        question: 'Can this replace a finance director for a funding round?',
        answer:
          'It gets you most of the way. Clean management accounts, a credible forecast and a finance lead who can answer investor questions cover what most seed and early Series A due diligence actually asks for. A finance director becomes worth hiring once the business needs someone in the room making capital allocation calls day to day, which is a different job from producing the numbers.',
      },
      {
        question: 'What size of business is this built for?',
        answer:
          'Most clients are UK SMEs with revenue from roughly £500,000 up to a few million pounds, past the point a spreadsheet and a part-time bookkeeper can keep up, and not yet at the size that justifies a full-time finance director. Below that, our standalone bookkeeping service is usually the better fit.',
      },
    ],
    seo: {
      title: 'Outsourced Finance Department for UK SMEs',
      description:
        'A monthly outsourced finance function for UK SMEs: bookkeeping, management accounts, budget versus actual, cash flow forecasting and board-ready reporting.',
    },
  },

  {
    slug: 'uk-payroll',
    pillar: 'international-expansion',
    title: 'UK Payroll Services',
    navLabel: 'UK Payroll',
    oneLiner:
      'PAYE payroll run to HMRC’s Real Time Information rules, with minimum wage, employer National Insurance and pension auto-enrolment handled every pay run.',
    intro:
      'UK payroll reports to HMRC on or before the day you pay someone, not afterwards, which is what Real Time Information actually requires. We register you as an employer, run the payroll each period, and keep National Minimum Wage, employer National Insurance and workplace pension auto-enrolment correct without you having to track three separate sets of rules that change every April.',
    icon: 'users',
    included: [
      'PAYE registration with HMRC, completed before your first payday',
      'Payroll run each pay period, with payslips issued and Full Payment Submissions filed to HMRC on or before payday',
      'National Minimum Wage and National Living Wage rates applied and checked against every employee’s age band',
      'Employer National Insurance calculated against the secondary threshold, with the Employment Allowance claimed where the company qualifies',
      'Workplace pension auto-enrolment: assessment, enrolment, and the minimum 8% contribution split with your pension provider',
      'Year-end reporting: P60s issued to employees and P11Ds prepared for any benefits in kind',
    ],
    audience: [
      'UK companies hiring their first employee',
      'Businesses running payroll on a spreadsheet',
      'Companies switching payroll provider mid-year',
    ],
    steps: [
      {
        title: 'Employer setup',
        description:
          'PAYE registration filed with HMRC, timed so your reference numbers are issued before your first payday, since HMRC recommends registering at least two weeks ahead.',
      },
      {
        title: 'Payroll build',
        description:
          'Employees set up with the correct tax code and National Insurance category, and your pension provider connected for auto-enrolment assessment from the first pay run.',
      },
      {
        title: 'Pay cycle',
        description:
          'Payroll calculated each period, payslips issued, and the Full Payment Submission filed to HMRC on or before payday, every time.',
      },
      {
        title: 'Year end',
        description:
          'P60s issued to every employee, P11Ds prepared where benefits in kind apply, and next year’s rate changes, National Minimum Wage, thresholds and pension bands, built into the first pay run of the new tax year.',
      },
    ],
    deliverables: [
      'PAYE reference numbers and confirmed employer registration',
      'Payslips issued to every employee each pay period',
      'Filed Full Payment Submissions with HMRC confirmation',
      'Pension auto-enrolment records and contribution schedule',
      'P60s and, where relevant, P11Ds at year end',
    ],
    documents: [
      'Employee details: name, address, National Insurance number and start date',
      'Signed employment contracts or offer letters',
      'P45 from a previous employer, or a starter checklist where none exists',
      'Details of any benefits in kind or salary sacrifice arrangements',
      'Your chosen workplace pension provider, if one is already in place',
    ],
    related: ['uk-bookkeeping', 'uk-finance-department', 'withholding-tax-statements'],
    faqs: [
      {
        question: 'When do we have to register as an employer?',
        answer:
          'Before your first payday. HMRC recommends registering at least two weeks ahead of it, since the PAYE reference numbers needed to file Real Time Information are issued after registration and there can be a short processing delay. You cannot register more than two months before you start paying anyone, so timing it against your actual first pay date matters.',
      },
      {
        question: 'What are the current minimum wage rates?',
        answer:
          'From 1 April 2026 the National Living Wage for anyone 21 or over is £12.71 an hour, the rate for 18 to 20 year olds is £10.85, and the rate for 16 to 17 year olds and apprentices is £8.00. We check every employee against their age band on every pay run, since the band changes as they have birthdays, not just once a year.',
      },
      {
        question: 'Do we have to auto-enrol employees into a pension?',
        answer:
          'Any employee earning above £10,000 a year and aged between 22 and State Pension age has to be automatically enrolled, with a minimum total contribution of 8% of qualifying earnings between £6,240 and £50,270, at least 3% of which the employer pays. It applies from day one of employment for eligible staff, and assessment happens every pay run, not just at hiring.',
      },
      {
        question: 'Can we claim the Employment Allowance?',
        answer:
          'Most employers with at least two employees can, up to £10,500 off the annual employer National Insurance bill, since the previous £100,000 eligibility cap was removed. One exclusion still applies: a company where the only paid employee is also its director cannot claim it. We check eligibility and claim it through the Employer Payment Summary as part of running your payroll.',
      },
    ],
    seo: {
      title: 'UK Payroll Services (PAYE & RTI)',
      description:
        'UK PAYE payroll run to HMRC’s RTI rules: Full Payment Submissions, minimum wage checks, employer National Insurance and pension auto-enrolment.',
    },
  },
];
