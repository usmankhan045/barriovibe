import type { Service } from '../types';

/**
 * Discipline 04: Finance & Tax.
 *
 * Written for the Pakistan market: FBR IRIS, NTN, STRN, withholding statements
 * under section 165, the Active Taxpayer List. The terminology is deliberately
 * specific, because a business owner should recognise their own paperwork in it
 * rather than read a generic description of accounting.
 *
 * The statutory dates in this file are real and checkable, so treat them as
 * facts to verify rather than copy to polish: 30 September for individuals and
 * AOPs, 31 December for companies, Annexure C on the 10th, payment on the 15th
 * and the sales tax return on the 18th, and section 165 withholding statements
 * within 20 days of each quarter end.
 */
export const FINANCE_TAX_SERVICES: Service[] = [
  {
    slug: 'financial-accounting',
    pillar: 'finance-tax',
    title: 'Financial Accounting',
    navLabel: 'Financial Accounting',
    oneLiner:
      'Monthly management accounts and year-end financial statements you can hand to a bank or an investor.',
    intro:
      'We maintain your general ledger, close the books each month, and produce a full set of financial statements: profit and loss, balance sheet and cash flow. They are prepared under IFRS for SMEs, reconciled to the rupee, and delivered on a fixed working day every month rather than whenever the month happens to get finished.',
    icon: 'calculator',
    included: [
      'Chart of accounts designed around how your business actually earns and spends',
      'Monthly close: journals, accruals, prepayments, depreciation schedules',
      'Profit and loss, balance sheet and cash flow statement every month',
      'Bank, cash, receivable and payable reconciliations',
      'Year-end financial statements prepared under IFRS for SMEs',
      'A management commentary explaining what actually moved, in plain language',
    ],
    audience: [
      'Businesses raising debt or equity',
      'Companies with an audit requirement',
      'Founders flying blind on numbers',
    ],
    steps: [
      {
        title: 'Books review',
        description:
          'We examine your current records, whatever state they are in, and give you a written assessment of what is missing or misstated.',
      },
      {
        title: 'Set up and catch up',
        description:
          'Chart of accounts built, opening balances established, and any backlog brought current before we start monthly work.',
      },
      {
        title: 'Monthly close',
        description:
          'Transactions recorded, accounts reconciled, and statements issued by a fixed working day every month.',
      },
      {
        title: 'Review and report',
        description:
          'A monthly call walking you through the numbers, the variances, and what needs a decision.',
      },
    ],
    deliverables: [
      'Monthly profit and loss, balance sheet and cash flow statement',
      'Reconciliation packs for every bank and cash account',
      'Fixed asset register with depreciation schedule',
      'Year-end financial statements, audit-ready',
      'A live accounting file you own and can take anywhere',
    ],
    documents: [
      'Bank statements for all business accounts',
      'Sales invoices and purchase bills',
      'Payroll records and salary sheets',
      'Loan and lease agreements',
      'Prior year financial statements, if any',
    ],
    related: ['bookkeeping', 'statutory-audit-support', 'corporate-secretarial-compliance'],
    faqs: [
      {
        question: 'Which accounting software do you use?',
        answer:
          'QuickBooks, Xero or Zoho Books, depending on what fits your operation. If you already use one, we work in it. The file stays in your name and under your ownership. We are a user on your account, never the other way round.',
      },
      {
        question: 'My books are years behind. Can you still take this on?',
        answer:
          'Yes, and it is a large part of what we do. Catch-up work is scoped separately from monthly accounting because the effort depends entirely on the size of the backlog. We agree that scope with you in writing before we start.',
      },
      {
        question: 'Do you provide audited accounts?',
        answer:
          'We prepare audit-ready financial statements and manage the audit process with your auditor, but the audit opinion itself must come from an independent practising firm. We will introduce you to one if you need it.',
      },
      {
        question: 'Will this help me get a bank loan?',
        answer:
          'It removes the usual obstacle. Banks decline applications over inconsistent or unsupported statements more often than over weak numbers. Clean, reconciled accounts with working papers behind them give the credit committee something they can actually assess.',
      },
    ],
    seo: {
      title: 'Financial Accounting Services in Pakistan',
      description:
        'Monthly management accounts and IFRS for SMEs year-end financial statements. Reconciled, audit-ready, and delivered on a fixed date each month.',
    },
  },

  {
    slug: 'bookkeeping',
    pillar: 'finance-tax',
    title: 'Bookkeeping',
    navLabel: 'Bookkeeping',
    oneLiner:
      'Every sale, expense and bank transaction recorded and reconciled weekly, so nothing is ever reconstructed from memory.',
    intro:
      'Every filing, loan application and valuation downstream depends on the books being right, and so does the simpler question of whether you made money last month. We record and categorise every transaction, reconcile your accounts weekly, and chase you for the documents you forgot to send, which is the part most bookkeepers leave to you and is why most books fall behind.',
    icon: 'ledger',
    included: [
      'Weekly recording and categorisation of all sales, purchases and expenses',
      'Bank and payment-gateway reconciliation, including Stripe, PayFast and 2Checkout',
      'Accounts receivable tracking with an ageing report and follow-up list',
      'Accounts payable scheduling so nothing goes unpaid or double-paid',
      'Digital filing of every invoice and receipt, searchable and backed up',
      'Payroll register maintenance and staff expense reimbursements',
    ],
    audience: [
      'E-commerce and retail businesses',
      'Service firms billing by project',
      'Anyone still using a spreadsheet',
    ],
    steps: [
      {
        title: 'Access and setup',
        description:
          'Read-only bank feeds connected, software configured, and a document-sharing folder set up so you stop emailing receipts.',
      },
      {
        title: 'Backlog clearance',
        description:
          'Historic transactions recorded and reconciled up to today, so we start from a verified position rather than a guess.',
      },
      {
        title: 'Weekly cycle',
        description:
          'Transactions categorised, accounts reconciled, and a short list of anything we could not identify sent to you.',
      },
      {
        title: 'Monthly handover',
        description:
          'Closed books passed to the accounting and tax teams so filings never wait on data entry.',
      },
    ],
    deliverables: [
      'Fully reconciled ledgers, current to the last week',
      'Accounts receivable and payable ageing reports',
      'A searchable digital archive of every invoice and receipt',
      'A monthly bookkeeping summary of what moved and what is outstanding',
    ],
    documents: [
      'Bank statements or read-only bank feed access',
      'Sales invoices and purchase bills',
      'Payment gateway and marketplace settlement reports',
      'Petty cash records',
    ],
    related: ['financial-accounting', 'sales-tax-registration-filing', 'ecommerce-management'],
    faqs: [
      {
        question: 'What is the difference between bookkeeping and accounting?',
        answer:
          'Bookkeeping is the recording: every transaction captured, categorised and reconciled. Accounting is the interpretation: closing entries, statements, and the analysis on top. Bookkeeping happens weekly; accounting happens monthly and at year end. Most businesses need both, and accounting is unreliable without the bookkeeping underneath it.',
      },
      {
        question: 'Do you need access to my bank account?',
        answer:
          'Read-only access only, through your bank’s own feed or by you sending statements. We never hold transaction authority, and we cannot move money. If your bank does not offer read-only access, statements work perfectly well.',
      },
      {
        question: 'How do I get receipts to you?',
        answer:
          'A shared folder, WhatsApp, or your accounting software’s mobile app. Photograph and forward. Whichever you will actually use consistently is the right answer.',
      },
    ],
    seo: {
      title: 'Bookkeeping Services in Pakistan',
      description:
        'Weekly transaction recording, bank and gateway reconciliation, and receivable tracking. Books that stay current instead of being rebuilt at year end.',
    },
  },

  {
    slug: 'income-tax-filing',
    pillar: 'finance-tax',
    title: 'Income Tax',
    navLabel: 'Income Tax',
    oneLiner:
      'NTN registration, annual income tax returns and wealth statements filed through FBR IRIS, correctly and before the deadline.',
    intro:
      'We handle income tax end to end for individuals, AOPs and companies, covering registration, the computation, the filing and any notice that follows. Every return goes out with a computation you can follow line by line, and the working papers are archived, because FBR can come back to a filed year long after you have stopped thinking about it.',
    icon: 'receipt',
    included: [
      'NTN registration for salaried individuals, sole proprietors, AOPs, companies and not-for-profits',
      'Annual return filing through FBR IRIS for salaried individuals, sole proprietors, partnerships and companies',
      'Wealth statement and reconciliation for individuals',
      'Quarterly advance tax computed under section 147',
      'Quarterly withholding statements under section 165, filed within 20 days of each quarter end',
      'Response and representation on FBR notices and audit queries',
    ],
    audience: ['Salaried individuals and freelancers', 'Private limited companies', 'AOPs and partnerships'],
    steps: [
      {
        title: 'Position review',
        description:
          'We review your income sources, prior filings and current filer status, then tell you exactly what is due and what is at risk.',
      },
      {
        title: 'Computation',
        description:
          'Taxable income calculated, every allowable deduction, credit and exemption applied, and the working shared with you before anything is submitted.',
      },
      {
        title: 'Filing',
        description:
          'Return submitted through FBR IRIS, tax paid via CPR, and your Active Taxpayer List status confirmed.',
      },
      {
        title: 'Aftercare',
        description:
          'Working papers archived and any subsequent FBR notice answered on your behalf, included for the tax year we filed.',
      },
    ],
    deliverables: [
      'Filed income tax return with FBR acknowledgement',
      'Tax computation sheet showing how every figure was reached',
      'Wealth statement and reconciliation, for individuals',
      'Computerised Payment Receipt for tax paid',
      'Confirmation of Active Taxpayer List status',
    ],
    documents: [
      'CNIC, and incorporation certificate for companies',
      'Annual financial statements or income summary',
      'Bank statements for the tax year',
      'Withholding tax certificates and deduction slips',
      'Details of assets acquired or disposed during the year',
      'Prior year return, if previously filed',
    ],
    related: ['sales-tax-registration-filing', 'financial-accounting', 'corporate-secretarial-compliance'],
    faqs: [
      {
        question: 'Why does being on the Active Taxpayer List matter?',
        answer:
          'Non-filers pay materially higher withholding rates on banking transactions, vehicle registration, property transfers and dividends. For most businesses the additional withholding over a year exceeds the cost of simply filing. Filing is usually the cheaper option even when no tax is payable.',
      },
      {
        question: 'I have not filed for several years. What happens?',
        answer:
          'Late returns can still be filed. There are penalties for delay, but they are far smaller than the cost of staying a non-filer, and voluntary filing is treated very differently from being caught. We assess your exposure first and tell you the total before you commit to anything.',
      },
      {
        question: 'What if FBR issues me a notice?',
        answer:
          'For any year we filed, responding is included. We draft the reply, assemble the supporting documents, and represent you. For years filed by someone else, we scope it separately after reviewing what the notice actually asks.',
      },
      {
        question: 'When is the deadline?',
        answer:
          'Individuals and AOPs file by 30 September following the tax year. Companies file by 31 December. FBR does sometimes extend those dates, and every year a number of businesses plan around an extension that then does not arrive or arrives shorter than expected. We work to the original date for that reason.',
      },
    ],
    seo: {
      title: 'Income Tax Return Filing in Pakistan (FBR)',
      description:
        'NTN registration, income tax return filing through FBR IRIS, wealth statements and notice handling for individuals, AOPs and companies.',
    },
  },

  {
    slug: 'sales-tax-registration-filing',
    pillar: 'finance-tax',
    title: 'Sales Tax',
    navLabel: 'Sales Tax',
    oneLiner:
      'Sales tax registration and monthly returns for FBR and the provincial revenue authorities, with input tax properly claimed.',
    intro:
      'Sales tax in Pakistan is filed monthly and split across federal and provincial authorities depending on whether you sell goods or services. We register you with the right authority, file every monthly return on time, and make sure you actually claim the input tax you are entitled to instead of leaving it on the table.',
    icon: 'percent',
    included: [
      'GST registration with FBR for goods, for individuals, partnerships and companies',
      'Provincial services tax registration with SRB, PRA, KPRA or BRA, including reactivating a suspended registration',
      'The monthly cycle filed to FBR’s calendar: Annexure C by the 10th, payment by the 15th, return e-filed by the 18th',
      'Input tax reconciled and claimed in full',
      'Annexure C sales invoice reporting and buyer-supplier matching',
      'Sales tax withholding compliance for withholding agents',
      'Refund claim preparation and follow-up for zero-rated and export supplies',
    ],
    audience: [
      'Importers, manufacturers and distributors',
      'Service businesses in a provincial net',
      'Exporters claiming refunds',
    ],
    steps: [
      {
        title: 'Liability assessment',
        description:
          'We determine which authority you fall under, federal for goods or provincial for services, and whether registration is mandatory or optional for you.',
      },
      {
        title: 'Registration',
        description:
          'STRN obtained, business premises verification arranged, and your e-filing profile configured.',
      },
      {
        title: 'Monthly filing',
        description:
          'Output and input tax reconciled and the annexures prepared, so Annexure C goes in by the 10th, the payment by the 15th and the return by the 18th.',
      },
      {
        title: 'Reconciliation',
        description:
          'Supplier declarations matched against your input claims so mismatches are caught before FBR raises them.',
      },
    ],
    deliverables: [
      'Sales Tax Registration Number certificate',
      'Filed monthly returns with acknowledgements',
      'Input and output tax reconciliation statement',
      'Payment challans and CPRs',
      'A monthly summary of tax payable and input carried forward',
    ],
    documents: [
      'NTN certificate and CNIC of the proprietor or directors',
      'Business bank account maintenance certificate',
      'Proof of business premises: ownership deed or rent agreement',
      'Electricity bill for the business premises',
      'Purchase and sales invoices for the filing month',
      'Import documents and GDs, if applicable',
    ],
    related: ['income-tax-filing', 'import-export-license', 'bookkeeping'],
    faqs: [
      {
        question: 'Do I register with FBR or my provincial authority?',
        answer:
          'Goods are federal, so FBR. Services are provincial: SRB in Sindh, PRA in Punjab, KPRA in Khyber Pakhtunkhwa, BRA in Balochistan. Businesses selling both, or operating across provinces, often need more than one registration. We map this out before registering anything.',
      },
      {
        question: 'What happens if I file late?',
        answer:
          'A penalty applies per default, plus default surcharge on unpaid tax, and repeated late filing can suspend your registration. Suspension is the expensive part: your buyers lose the ability to claim input tax on your invoices, and they notice quickly.',
      },
      {
        question: 'Can I claim input tax on everything I buy?',
        answer:
          'No. Input tax is claimable only on taxable supplies used in your business, only where the supplier has actually declared the invoice, and several categories are specifically disallowed. Unmatched claims are the single most common trigger for an audit, which is why we reconcile supplier declarations every month rather than at year end.',
      },
    ],
    seo: {
      title: 'Sales Tax Registration & Monthly Filing in Pakistan',
      description:
        'Sales tax registration with FBR, SRB, PRA, KPRA and BRA, plus monthly return filing, input tax reconciliation and refund claims.',
    },
  },

  {
    slug: 'statutory-audit-support',
    pillar: 'finance-tax',
    title: 'Statutory Audit Support',
    navLabel: 'Audit Support',
    oneLiner:
      "Your accounts made audit-ready, your independent auditor's queries answered, and the signed report delivered before your SECP filing deadline.",
    intro:
      'Under the Companies Act 2017 most companies must have their annual financial statements audited, and the auditor has to be independent of whoever kept the books. We prepare the audit-ready file, build every schedule your auditor is going to ask for, and run the correspondence with them, so the audit happens on a calendar instead of turning into a scramble in the weeks before the AGM.',
    icon: 'audit',
    included: [
      'Audit-readiness review of your existing books before your auditor sees them',
      'Full schedule pack: fixed assets, receivables and payables ageing, provisions, related-party transactions',
      'Coordination with your independent auditor from planning through fieldwork',
      'Prepared-by-client (PBC) list management, so nothing is chased at the last minute',
      'Response drafting for audit queries and management letter points',
      'Introduction to an independent audit firm if you do not already have one',
    ],
    audience: [
      'Companies with a statutory audit requirement',
      'Businesses raising debt or equity',
      'Companies behind on a prior year audit',
    ],
    steps: [
      {
        title: 'Readiness review',
        description:
          'We go through your books against what an auditor will actually ask for, and flag what is missing while there is still time to fix it.',
      },
      {
        title: 'Schedule preparation',
        description:
          'Every supporting schedule built: fixed asset register, ageing reports, reconciliations and disclosures.',
      },
      {
        title: 'Fieldwork support',
        description:
          "We sit alongside your auditor's fieldwork, answering queries same-day rather than letting them stack up.",
      },
      {
        title: 'Sign-off',
        description:
          'Management letter points closed out and the signed audit report delivered in time for your Form A filing.',
      },
    ],
    deliverables: [
      'Full audit schedule pack',
      'A PBC list tracked to completion',
      'Written responses to every audit query raised',
      'The signed independent audit report',
    ],
    documents: [
      'Trial balance and general ledger for the audit period',
      'Bank statements and reconciliations for all accounts',
      'Fixed asset register and supporting purchase documentation',
      'Prior year audited financial statements, if any',
      'Board resolutions and minutes for the period',
    ],
    related: ['financial-accounting', 'income-tax-filing', 'corporate-secretarial-compliance'],
    faqs: [
      {
        question: 'Do you carry out the audit yourselves?',
        answer:
          'No, and that is the point of the arrangement. The audit opinion has to come from an auditor who is independent of whoever prepared the books, so that nobody is marking their own work. We build the audit-ready file and run the process; your independent auditor signs the opinion.',
      },
      {
        question: 'Does every company need an audit?',
        answer:
          'Not every one. A private company whose paid-up capital does not exceed Rs 1 million falls outside the audit requirement. Above that it applies, and the size of the company decides who is allowed to sign: up to Rs 3 million of paid-up capital either a chartered accountant or a cost and management accountant may act, and once paid-up capital passes Rs 10 million it has to be a practising chartered accountant or a firm of them. Filing is a separate test again, with companies above Rs 7.5 million of share capital required to file their audited accounts with the registrar. Any company going to a bank, an investor or a tender is usually better off with a full statutory audit whichever bracket it sits in. We will tell you which one you are in before you spend anything.',
      },
      {
        question: "We don't have an auditor yet. Can you help?",
        answer:
          'Yes. We will introduce you to an independent firm qualified to sign for a company of your size, and get the file in order before you engage them, so the first thing they see is a prepared set of books rather than a shoebox of receipts.',
      },
      {
        question: "What if last year's audit found problems?",
        answer:
          "We read the prior management letter and prior year queries first, and build this year's schedules specifically to close them out, rather than repeating the same fire drill twelve months later.",
      },
    ],
    seo: {
      title: 'Statutory Audit Support & Audit-Ready Accounts',
      description:
        'Audit-ready financial statements and full schedule packs, plus coordination with your independent ICAP-licensed auditor ahead of your SECP Form A deadline.',
    },
  },

  {
    slug: 'financial-advisory',
    pillar: 'finance-tax',
    title: 'Financial Advisory',
    navLabel: 'Financial Advisory',
    oneLiner:
      'Feasibility studies, cost and profitability analysis, internal controls and written SOPs: the work that answers whether a plan actually holds.',
    intro:
      'Bookkeeping records what already happened. This work answers whether the thing you are about to do is worth doing. We build feasibility studies a lender or an investment committee will accept, take the cost base apart to find where margin is leaking, design the controls that stop money going missing quietly, and write the operating and accounting manuals that let a business run the same way when the owner is not in the room.',
    icon: 'chart',
    included: [
      'Financial feasibility studies and investment appraisals, with the assumptions stated and stress-tested',
      'Profitability and cost reduction studies: product, channel and customer level margin analysis',
      'Business process and internal control review, including fraud risk and segregation of duties',
      'Operational and accounting manuals, written as SOPs your team can actually follow',
      'Physical verification of fixed assets, inventory and investments, reconciled back to the ledger',
      'Credit evaluation and advice on the accounting treatment behind a specific transaction or standard',
    ],
    audience: [
      'Businesses appraising a new investment',
      'Owners whose margin is falling without explanation',
      'Companies preparing for external scrutiny',
    ],
    steps: [
      {
        title: 'Scoping',
        description:
          'We agree the question the engagement has to answer, in one sentence, and what evidence would count as an answer. Vague scopes produce reports nobody acts on.',
      },
      {
        title: 'Fieldwork',
        description:
          'Records examined, processes walked end to end with the people who run them, and assets or stock physically verified where the engagement calls for it.',
      },
      {
        title: 'Analysis',
        description:
          'The numbers modelled, the assumptions tested against what would have to be true, and the findings ranked by what they are actually worth.',
      },
      {
        title: 'Report and handover',
        description:
          'A written report with the recommendation, the working behind it, and the manual or model handed over in a form you can keep using.',
      },
    ],
    deliverables: [
      'A written report stating the recommendation and the reasoning behind it',
      'The financial model or costing analysis, live and editable, in your ownership',
      'A ranked list of control weaknesses with the fix for each',
      'Operational and accounting manuals, where the engagement includes them',
      'A verification report reconciling physical assets or stock to the ledger',
    ],
    documents: [
      'Financial statements and management accounts for the last two to three years',
      'The business plan, budget or projection under review',
      'Cost sheets, price lists and supplier contracts',
      'Existing process documentation or SOPs, in whatever state they are in',
      'Fixed asset register and stock records, for a verification engagement',
    ],
    related: ['financial-accounting', 'statutory-audit-support', 'company-registration'],
    faqs: [
      {
        question: 'How is this different from your accounting service?',
        answer:
          'Accounting records and reports what has already happened, on a monthly cycle, forever. Advisory is a defined piece of work that answers one forward-looking question and then ends. Most clients need the accounting permanently and the advisory occasionally, and the advisory is far better when the accounting underneath it is already clean.',
      },
      {
        question: 'Will a bank accept your feasibility study?',
        answer:
          'A feasibility study is accepted on the strength of its assumptions, not its cover page. We state every assumption explicitly, show the sensitivity around the ones that actually move the answer, and reference the source for each. That is what a credit committee reads. We will not write a study that reaches a predetermined conclusion, and if the numbers do not support the project we will tell you before you take it to a lender.',
      },
      {
        question: 'Do you find fraud, or just controls weaknesses?',
        answer:
          'The engagement is designed to find control weaknesses, the gaps through which money can leave without being noticed. That review does sometimes surface transactions that need explaining, and when it does we tell you plainly and separately. A full forensic investigation into a specific suspicion is different work and is scoped on its own.',
      },
      {
        question: 'What do SOPs actually get us?',
        answer:
          'They make the business independent of the person currently holding it together. A written manual is what lets you delegate a function without losing control of it, what a new hire is trained against, and what an auditor or a buyer asks to see when they want evidence the process is real rather than remembered.',
      },
    ],
    seo: {
      title: 'Financial Advisory & Business Analysis Services',
      description:
        'Feasibility studies, cost and profitability analysis, internal control and fraud risk review, SOP development and physical asset verification.',
    },
  },
];
