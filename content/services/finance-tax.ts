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
    related: ['bookkeeping', 'audit-assurance', 'corporate-secretarial-compliance'],
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
    slug: 'withholding-tax-statements',
    pillar: 'finance-tax',
    title: 'Withholding Tax Statements',
    navLabel: 'Withholding Statements',
    oneLiner:
      'Quarterly and annual withholding statements filed under section 165, with the tax deducted at the right rate and deposited on time.',
    intro:
      'If you pay salaries, rent, commission, or a supplier or a contractor, you are almost certainly a withholding agent, and the obligation runs whether or not anyone has told you so. It has three parts: deduct at the correct rate, deposit the tax against the right payment section, and file the statement that reports it. The statement is where most businesses come unstuck, because it has to reconcile to every challan you paid and FBR reads the two against each other.',
    icon: 'document',
    included: [
      'Withholding agent status assessed, and the payment sections you actually fall under identified',
      'Correct rates applied by section and by the payee’s Active Taxpayer List status on the date of payment',
      'Tax deposited through IRIS against the right section, with the CPR retained against the payment it covers',
      'Quarterly statements under section 165 filed within 20 days of each quarter end',
      'Annual statement filed within 30 days of the end of the tax year, reconciled to all four quarters',
      'Section 149 salary withholding handled alongside, for employers running a payroll',
      'Notices for non-filing or short deduction answered, and revised statements filed under section 165(2) where needed',
    ],
    audience: [
      'Employers running a payroll',
      'Companies paying suppliers and contractors',
      'Businesses that have had a section 165 notice',
    ],
    steps: [
      {
        title: 'Agent status',
        description:
          'We establish which of your payments are subject to withholding and under which sections, then tell you what has been under-deducted so far and what that exposure is worth.',
      },
      {
        title: 'Deduction and deposit',
        description:
          'Rates applied by section and by ATL status at the time of payment, and the tax deposited against the correct section, so that the challan and the statement agree by construction.',
      },
      {
        title: 'Statement filing',
        description:
          'The quarterly statement prepared, reconciled to your challans and your ledger, and e-filed within 20 days of the quarter end.',
      },
      {
        title: 'Annual reconciliation',
        description:
          'The annual statement filed after the tax year and reconciled to all four quarters, so the year closes without a mismatch left for FBR to raise two years later.',
      },
    ],
    deliverables: [
      'Filed quarterly statements with FBR acknowledgements',
      'The annual withholding statement, reconciled to the four quarters',
      'A challan register with every CPR matched to the payment it covers',
      'Withholding certificates issued to the parties you deducted from',
      'A rate schedule for your payment types, kept current with the Finance Act',
    ],
    documents: [
      'Payment ledger for the quarter, by payee and by payment type',
      'CNIC or NTN of every payee you deducted from',
      'Payroll sheets for the period, where you deduct under section 149',
      'Bank statements covering the payments',
      'Tax deposit challans and CPRs already paid',
      'Statements already filed for the year, if any',
    ],
    related: ['income-tax-filing', 'financial-accounting', 'corporate-secretarial-compliance'],
    faqs: [
      {
        question: 'Am I a withholding agent?',
        answer:
          'Most companies and AOPs are, along with many individuals above a turnover threshold, and the status attaches to the kind of payment rather than to the size of the business. Salary, rent, commission, brokerage, professional fees, contracts and supplies all carry an obligation. We assess it against your actual payment ledger rather than inferring it from your legal form.',
      },
      {
        question: 'When is the statement due?',
        answer:
          'Quarterly, within 20 days of the end of each quarter, so 20 October, 20 January, 20 April and 20 July, with an annual statement following within 30 days of the end of the tax year. Missing a quarter is a separate default from missing the deduction itself, and both carry a penalty.',
      },
      {
        question: 'What happens if I deducted at the wrong rate?',
        answer:
          'The shortfall is recoverable from you rather than from the person you paid, and the expense can be disallowed in your own income tax assessment on top of that. Rates turn on the section and on whether the payee was on the Active Taxpayer List on the date of payment, which is why the ATL check belongs at the moment of payment and not at the end of the quarter.',
      },
      {
        question: 'Can a statement that has already been filed be corrected?',
        answer:
          'Yes. A revised statement can be filed under section 165(2), and it is far better to revise than to leave a mismatch sitting for FBR to find. We prepare the revision with the reconciliation behind it, so the correction explains itself rather than inviting a second question.',
      },
    ],
    seo: {
      title: 'Withholding Tax Statement Filing under Section 165',
      description:
        'Quarterly and annual withholding statements filed with FBR under section 165, with correct rates by ATL status, challan reconciliation and notices answered.',
    },
  },

  {
    slug: 'tax-advisory',
    pillar: 'finance-tax',
    title: 'Tax Advisory',
    navLabel: 'Tax Advisory',
    oneLiner:
      'Planning, written opinions and representation: the work that decides what a transaction costs before you do it, and defends it afterwards.',
    intro:
      'Filing tells FBR what you did. Advisory decides what you should do, and it is by far the cheaper half. The tax cost of a group structure, a property sale, a dividend, an employee share scheme or a payment to an overseas parent is largely fixed at the moment the transaction is designed, not at the moment it is reported. We give you a written position before you commit, and we stand behind it when a notice arrives.',
    icon: 'compass',
    included: [
      'Corporate and personal tax planning on a specific transaction, with the position written down',
      'Written opinions on treatment, exemptions, credits and the reduced rates you genuinely qualify for',
      'Representation on FBR notices, audits and amended assessments under sections 122, 177 and 214C',
      'Appeals to the Commissioner Appeals and the Appellate Tribunal Inland Revenue, and Alternative Dispute Resolution where it fits better',
      'Double taxation treaty positions, and withholding on cross-border payments, royalties and technical fees',
      'Transfer pricing documentation and related-party disclosures for groups',
      'Salary structuring and employee tax planning built to survive an employer audit',
    ],
    audience: [
      'Groups and multi-entity businesses',
      'Companies under FBR audit or appeal',
      'Anyone planning a large transaction',
    ],
    steps: [
      {
        title: 'The question',
        description:
          'We agree the question in one sentence, and what a usable answer looks like: a number, a treatment, or a decision to proceed or not. Vague briefs produce opinions nobody can act on.',
      },
      {
        title: 'Analysis',
        description:
          'The Ordinance, the relevant SROs, circulars and case law read against your facts, and the alternatives costed rather than merely described.',
      },
      {
        title: 'Written position',
        description:
          'An opinion you can act on and hand to a bank, an auditor or an investor, with the statutory authority cited for every conclusion in it.',
      },
      {
        title: 'Defence',
        description:
          'If the position is challenged, we answer the notice, appear on your behalf, and take the matter through appeal where it is worth taking through appeal.',
      },
    ],
    deliverables: [
      'A written tax opinion with the statutory authority cited',
      'A costed comparison of the alternatives considered',
      'Drafted replies to FBR notices, on the record',
      'Appeal grounds and memoranda where a matter proceeds',
      'Transfer pricing documentation for related-party transactions',
    ],
    documents: [
      'The transaction documents: drafts, term sheets or executed agreements',
      'Prior filed returns and any assessment orders',
      'Any FBR notice already received, with its full annexures',
      'Group structure chart and current shareholding',
      'Financial statements for the periods concerned',
    ],
    related: ['income-tax-filing', 'financial-advisory', 'contract-drafting'],
    faqs: [
      {
        question: 'How is this different from filing my return?',
        answer:
          'A return reports a year that has already happened, and by then most of the tax is fixed. Advisory works on the decision before it becomes a transaction, while the treatment is still open. The two are sold separately because they are genuinely different work, not because one is a premium version of the other.',
      },
      {
        question: 'I have received a notice under section 122. What now?',
        answer:
          'Do not answer it informally. An amended assessment notice has a response window, and anything you write becomes part of the record. Send it to us with its annexures and your filed return, and we will tell you what it actually alleges, what evidence answers it, and whether it is a matter to settle or to appeal.',
      },
      {
        question: 'Can you appear before FBR and the tribunal for me?',
        answer:
          'Yes. We handle representation at the Commissioner and Commissioner Appeals stage and before the Appellate Tribunal Inland Revenue. We will also tell you at the outset where a matter is better resolved through Alternative Dispute Resolution than through an appeal that will run for years.',
      },
      {
        question: 'Will a written opinion protect me if FBR disagrees?',
        answer:
          'It does not bind FBR, and nobody honest will tell you otherwise. What it does is establish that the position was taken on considered grounds with the law cited, which is what a penalty argument turns on, and it leaves your auditor and your board something defensible on file rather than a decision nobody can explain.',
      },
    ],
    seo: {
      title: 'Tax Advisory & FBR Representation in Pakistan',
      description:
        'Corporate and personal tax planning, written opinions, transfer pricing, and representation on FBR notices, audits and appeals to the Appellate Tribunal.',
    },
  },

  {
    slug: 'audit-assurance',
    pillar: 'finance-tax',
    title: 'Audit & Assurance',
    navLabel: 'Audit & Assurance',
    oneLiner:
      'Statutory audit support, internal audit, and the certificates and agreed-upon procedures a bank, a donor or a regulator asks you to produce.',
    intro:
      'Assurance is what makes a number believable to somebody who did not produce it. Most of it is the statutory audit: under the Companies Act 2017 most companies must have their annual financial statements audited by an auditor independent of whoever kept the books. The rest is everything a third party asks for outside that annual cycle, from an internal audit of a process that keeps going wrong to a certificate a bank will not release a facility without. We prepare the file, run the process, and produce the report.',
    icon: 'audit',
    included: [
      'Audit-readiness review of your existing books before your statutory auditor sees them',
      'Full schedule pack: fixed assets, receivables and payables ageing, provisions, related-party transactions',
      'Coordination with your independent statutory auditor from planning through fieldwork and sign-off',
      'Prepared-by-client (PBC) list management, so nothing is chased at the last minute',
      'Internal audit of a cycle or a function, with findings ranked by exposure rather than merely listed',
      'Agreed-upon procedures on a specific balance, process or period, reported factually with no opinion attached',
      'Certificates and third-party reports for banks, donors and regulators, with the working papers behind them',
      'Donor and grant audit preparation for not-for-profits, run against the funder’s own terms of reference',
      'Introduction to an independent audit firm if you do not already have one',
    ],
    audience: [
      'Companies with a statutory audit requirement',
      'Businesses raising debt or equity',
      'Not-for-profits reporting to a donor',
    ],
    steps: [
      {
        title: 'Scoping',
        description:
          'We agree what the engagement has to produce: a statutory audit file, an internal audit report, or a specific certificate for a named recipient. The three are prepared very differently.',
      },
      {
        title: 'Readiness review',
        description:
          'We go through your books against what the auditor or the recipient will actually ask for, and flag what is missing while there is still time to fix it.',
      },
      {
        title: 'Fieldwork',
        description:
          'Every supporting schedule built and the evidence gathered, and where a statutory audit is running we sit alongside your auditor answering queries same-day rather than letting them stack up.',
      },
      {
        title: 'Report',
        description:
          'Management letter points closed out and the report or certificate delivered, in time for the filing or the decision it exists to support.',
      },
    ],
    deliverables: [
      'Full audit schedule pack, with a PBC list tracked to completion',
      'Written responses to every audit query raised',
      'The signed independent audit report, where a statutory audit is the engagement',
      'An internal audit report with findings ranked by exposure and an owner named against each',
      'Certificates and agreed-upon procedures reports addressed to the third party that asked for them',
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
          'For a statutory audit, no, and that is the point of the arrangement. The audit opinion has to come from an auditor who is independent of whoever prepared the books, so that nobody is marking their own work. We build the audit-ready file and run the process; your independent auditor signs the opinion. Internal audit, agreed-upon procedures and certificate work carry no such independence bar, and those we perform ourselves.',
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
        question: 'What is the difference between internal audit and a statutory audit?',
        answer:
          'A statutory audit is an annual legal requirement that ends in an opinion on your financial statements for the outside world to rely on. An internal audit is commissioned by you, looks at whichever cycle you are actually worried about, and ends in findings and fixes for the inside. One is compliance and the other is management information, and a company can genuinely need both in the same year.',
      },
      {
        question: "What if last year's audit found problems?",
        answer:
          "We read the prior management letter and prior year queries first, and build this year's schedules specifically to close them out, rather than repeating the same fire drill twelve months later.",
      },
    ],
    seo: {
      title: 'Audit & Assurance Services in Pakistan',
      description:
        'Statutory audit support and audit-ready accounts, internal audit, agreed-upon procedures, and certificates for banks, donors and regulators.',
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
    related: ['financial-accounting', 'audit-assurance', 'company-registration'],
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
