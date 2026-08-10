import type { Service } from '../types';

/**
 * Pillar 02 — Finance & Tax.
 *
 * Copy is written for the Pakistan market: FBR IRIS, NTN, STRN, withholding
 * statements under s.165, annual return deadlines. Terminology is deliberately
 * concrete — a business owner should recognise their own paperwork in it.
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
      'We maintain your general ledger, close the books every month, and produce a full set of financial statements: profit and loss, balance sheet, and cash flow. Prepared under IFRS for SMEs, reconciled to the last rupee, and delivered on a fixed date each month rather than whenever it gets done.',
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
        duration: '2–3 days',
      },
      {
        title: 'Set up & catch up',
        description:
          'Chart of accounts built, opening balances established, and any backlog brought current before we start monthly work.',
        duration: '1–3 weeks',
      },
      {
        title: 'Monthly close',
        description:
          'Transactions recorded, accounts reconciled, and statements issued by a fixed working day every month.',
        duration: 'By the 10th',
      },
      {
        title: 'Review & report',
        description:
          'A monthly call walking you through the numbers, the variances, and what needs a decision.',
        duration: 'Monthly',
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
    turnaround: 'Statements by the 10th of each month',
    related: ['bookkeeping', 'income-tax-filing', 'corporate-secretarial-compliance'],
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
      'Bookkeeping is the daily discipline that makes everything downstream possible: tax filings, financing, valuations, even knowing whether you made money last month. We record and categorise every transaction, reconcile your accounts on a weekly cycle, and chase the documents you forgot to send.',
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
        title: 'Access & setup',
        description:
          'Read-only bank feeds connected, software configured, and a document-sharing folder set up so you stop emailing receipts.',
        duration: '2–4 days',
      },
      {
        title: 'Backlog clearance',
        description:
          'Historic transactions recorded and reconciled up to today, so we start from a verified position rather than a guess.',
        duration: '1–4 weeks',
      },
      {
        title: 'Weekly cycle',
        description:
          'Transactions categorised, accounts reconciled, and a short list of anything we could not identify sent to you.',
        duration: 'Every week',
      },
      {
        title: 'Monthly handover',
        description:
          'Closed books passed to the accounting and tax teams so filings never wait on data entry.',
        duration: 'Monthly',
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
    turnaround: 'Weekly reconciliation cycle',
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
      'We handle income tax end to end for individuals, AOPs and companies: registration, computation, filing, and the notices that sometimes follow. Every return is filed with a computation you can actually follow, and we keep the working papers in case FBR asks a question two years from now.',
    icon: 'receipt',
    included: [
      'NTN registration for individuals, AOPs and companies',
      'Annual income tax return preparation and filing through FBR IRIS',
      'Wealth statement and reconciliation for individuals',
      'Quarterly advance tax computation under section 147',
      'Withholding tax statements under section 165',
      'Response and representation on FBR notices and audit queries',
    ],
    audience: ['Salaried individuals and freelancers', 'Private limited companies', 'AOPs and partnerships'],
    steps: [
      {
        title: 'Position review',
        description:
          'We review your income sources, prior filings and current filer status, then tell you exactly what is due and what is at risk.',
        duration: '1–2 days',
      },
      {
        title: 'Computation',
        description:
          'Taxable income calculated, every allowable deduction, credit and exemption applied, and the working shared with you before anything is submitted.',
        duration: '2–4 days',
      },
      {
        title: 'Filing',
        description:
          'Return submitted through FBR IRIS, tax paid via CPR, and your Active Taxpayer List status confirmed.',
        duration: '1 day',
      },
      {
        title: 'Aftercare',
        description:
          'Working papers archived and any subsequent FBR notice answered on your behalf, included for the tax year we filed.',
        duration: 'Ongoing',
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
    turnaround: '3–7 working days from complete documents',
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
          'For individuals and AOPs, 30 September following the tax year. For companies, 31 December. FBR sometimes extends these, but we work to the original date, because an extension you were counting on and did not get is an expensive surprise.',
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
      'Sales tax registration with FBR, and with SRB, PRA, KPRA or BRA as applicable',
      'Monthly sales tax return filing before the 18th',
      'Input tax reconciliation and claim maximisation',
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
        duration: '1–2 days',
      },
      {
        title: 'Registration',
        description:
          'STRN obtained, business premises verification arranged, and your e-filing profile configured.',
        duration: '5–10 days',
      },
      {
        title: 'Monthly filing',
        description:
          'Output and input tax reconciled, annexures prepared, return filed and payment challan issued before the 18th.',
        duration: 'Monthly',
      },
      {
        title: 'Reconciliation',
        description:
          'Supplier declarations matched against your input claims so mismatches are caught before FBR raises them.',
        duration: 'Monthly',
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
    turnaround: 'Registration 5–10 days · returns filed monthly by the 18th',
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
];
