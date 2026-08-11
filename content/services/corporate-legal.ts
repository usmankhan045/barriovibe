import type { Service } from '../types';

/**
 * Discipline 05: Corporate & Legal.
 *
 * Formerly "Corporate & Compliance". It was renamed and re-scoped when the
 * catalogue grew: intellectual property moved out to its own discipline, Saudi
 * Arabia moved out to International Expansion, and registration, secretarial
 * compliance and contract drafting stayed. "Compliance" no longer described a
 * discipline whose largest page is a drafting service.
 *
 * Pakistan-specific throughout: SECP eServices, Section 42 licensing, Form A
 * and Form 29 statutory returns, PSEB, chamber membership, and Pakistan Single
 * Window for import and export.
 *
 * ── One deliberate split ──
 *
 * `company-registration` and `corporate-secretarial-compliance` used to be one
 * page. They are two because they are two purchases: incorporating is a
 * one-time event a founder searches for by name, and the compliance calendar
 * afterwards is a subscription that a different person signs off. Each page
 * points at the other rather than repeating it, and neither one restates the
 * incorporation sequence.
 */
export const CORPORATE_SERVICES: Service[] = [
  {
    slug: 'company-registration',
    pillar: 'corporate-legal',
    title: 'Company Registration',
    navLabel: 'Company Registration',
    oneLiner:
      'Your business registered in the right legal form: private limited, single member, LLP or a registered partnership, with the NTN and bank account that follow.',
    intro:
      'The vehicle you register decides who carries the liability, how you are taxed, and whether an investor can put money in without restructuring the whole thing first. We advise on the structure, reserve the name, draft the constitutional documents, and register the entity through SECP eServices or with the registrar of firms. Then we finish the part most people underestimate: the NTN, the bank account and the opening statutory registers, without which you have a certificate rather than a working company.',
    icon: 'building',
    included: [
      'Structure advice across private limited, single member company, LLP, and partnership or AOP',
      'Name availability search and reservation through SECP eServices',
      'Memorandum and Articles of Association drafted around your actual business objects',
      'Digital signature issuance for every subscriber and director',
      'Incorporation filing and Certificate of Incorporation',
      'Post-registration setup: company NTN, corporate bank account and the opening statutory registers',
    ],
    audience: [
      'Founders incorporating for the first time',
      'Sole proprietors converting to a company',
      'Partners formalising an existing arrangement',
    ],
    steps: [
      {
        title: 'Structure advice',
        description:
          'We recommend the right vehicle based on your ownership, liability exposure, tax position and funding plans, and tell you plainly what each one costs you later.',
      },
      {
        title: 'Name and documents',
        description:
          'Name searched and reserved, constitutional documents drafted to your objects, and digital signatures issued to every subscriber.',
      },
      {
        title: 'Incorporation',
        description:
          'The entity is filed and registered, with SECP for a company or LLP and with the registrar of firms for a partnership, and the certificate issues.',
      },
      {
        title: 'Made operational',
        description:
          'Company NTN obtained, corporate bank account opened, statutory registers opened and the first board resolutions passed.',
      },
    ],
    deliverables: [
      'Certificate of Incorporation, or the registered partnership deed',
      'Memorandum and Articles of Association',
      'Digital signatures for all subscribers and directors',
      'Company NTN certificate and an opened corporate bank account',
      'Statutory registers: members, directors and charges',
    ],
    documents: [
      'CNIC of all directors, subscribers or partners',
      'Three proposed company names in order of preference',
      'Proof of registered office address',
      'Shareholding or profit-sharing split between the subscribers',
      'Passport-size photographs of directors',
    ],
    related: ['corporate-secretarial-compliance', 'income-tax-filing', 'pseb-registration'],
    faqs: [
      {
        question: 'Should I register an SMC or a private limited company?',
        answer:
          'A Single Member Company suits one owner with no plans to bring in partners. A private limited allows two to fifty shareholders and is what any investor will expect to see. Converting from SMC to private limited later is possible but is extra cost and paperwork, so if outside investment is plausible within two years, start as a private limited.',
      },
      {
        question: 'What is the difference between an LLP and a partnership?',
        answer:
          'A registered partnership under the Partnership Act 1932 is simple and cheap, but every partner is personally liable for the whole of the firm’s debts. An LLP is registered with SECP, is a separate legal person, and caps each partner’s liability at what they put in. If the business carries real financial exposure, the LLP is usually worth the extra filing burden.',
      },
      {
        question: 'Can foreign nationals be directors or shareholders?',
        answer:
          'Yes, with additional documentation and, in some cases, security clearance depending on nationality and sector. It adds time to incorporation rather than preventing it. Tell us upfront so we build it into the timeline instead of discovering it at the filing stage.',
      },
      {
        question: 'Do I need a physical office to register?',
        answer:
          'You need a registered office address in Pakistan where official correspondence can be served. It does not have to be commercial premises, and a residential address is acceptable, but it must be real and you must actually receive post there.',
      },
    ],
    seo: {
      title: 'Company Registration in Pakistan (SECP)',
      description:
        'SECP incorporation for private limited, single member, LLP and partnership structures, with name reservation, digital signatures, NTN and bank account setup.',
    },
  },

  {
    slug: 'corporate-secretarial-compliance',
    pillar: 'corporate-legal',
    title: 'Corporate Compliance',
    navLabel: 'Corporate Compliance',
    oneLiner:
      'Every SECP filing after incorporation, run on a calendar: annual returns, director and address changes, registers and board minutes.',
    intro:
      'Registering a company takes a few days. Staying compliant lasts as long as the company does, and it is the part most businesses quietly fall behind on. We run the calendar: the Form A annual return within 30 days of your AGM, Form 29 inside the 15-day window whenever an officer changes, the Form 45 beneficial ownership declaration, and the statutory registers and minute book kept current. Penalties under the Companies Act run per day of default, so the point of the calendar is that nothing accrues quietly in the background.',
    icon: 'shield',
    included: [
      'The annual return on Form A, filed within 30 days of your AGM as section 130 requires',
      'Form 29 for any change of director, chief executive, secretary, CFO, auditor or legal adviser, filed inside the 15-day window',
      'Form 45 beneficial ownership declarations under section 123A, kept current',
      'Share transfers, allotments and increases in authorised capital',
      'Statutory registers, board minutes and resolutions drafted and maintained',
      'A compliance calendar with every deadline tracked and flagged before it arrives',
    ],
    audience: [
      'Companies behind on their filings',
      'Businesses restructuring ownership',
      'Founders with no company secretary',
    ],
    steps: [
      {
        title: 'Compliance audit',
        description:
          'We pull your SECP record, identify every filing that is late or missing, and give you a written position on exposure before anything is submitted.',
      },
      {
        title: 'Catch-up filings',
        description:
          'Overdue returns and event-based forms brought current, with penalties computed and paid so the record is clean rather than partially fixed.',
      },
      {
        title: 'Registers rebuilt',
        description:
          'Statutory registers, minute book and resolutions reconstructed to match what actually happened, which is what a due diligence exercise will ask for.',
      },
      {
        title: 'Ongoing calendar',
        description:
          'Annual and event-based filings prepared and submitted on schedule, with a reminder to you before each deadline rather than after.',
      },
    ],
    deliverables: [
      'Filed Form A and Form 29 with SECP acknowledgements',
      'Statutory registers: members, directors, charges and beneficial owners',
      'A maintained minute book with signed board and general meeting resolutions',
      'A written compliance position showing what was outstanding and what was cleared',
      'A compliance calendar for the year ahead',
    ],
    documents: [
      'Certificate of Incorporation and current Memorandum and Articles',
      'SECP eServices login, or authorisation for us to act',
      'Details of every director and officer change since the last filing',
      'Audited or draft financial statements for the year being filed',
      'Existing registers and minute book, in whatever state they are in',
    ],
    related: ['company-registration', 'statutory-audit-support', 'income-tax-filing'],
    faqs: [
      {
        question: 'What happens if I miss an SECP filing?',
        answer:
          'Penalties run per day of default and attach to the company and to its directors personally. Prolonged non-compliance can get the company struck off the register altogether. What makes it dangerous is that nothing arrives in the post while it accumulates, so companies usually discover the figure at the worst moment, which is when a bank, a buyer or a tender asks for a clean compliance record.',
      },
      {
        question: 'How quickly must a director change be filed?',
        answer:
          'Form 29 is due within 15 days of the appointment or the change, and the clock starts on the date of the board resolution rather than the date somebody remembers to tell us. The same form covers the chief executive, the secretary, the CFO, the auditors and the legal adviser, not only directors. Late Form 29 filing is one of the most common defaults we clear, and it is entirely avoidable if the resolution and the filing happen in the same sitting.',
      },
      {
        question: 'Do you also prepare the accounts that go with the annual return?',
        answer:
          'Not in this engagement. The accounts come from our Financial Accounting service and, where a statutory audit applies, from your independent auditor. We file what is signed off. Keeping the two separate is deliberate, because the filing agent should not also be the source of the numbers being filed.',
      },
      {
        question: 'We have never kept a minute book. Is that a problem?',
        answer:
          'It is a problem the first time a buyer, a bank or an investor asks for it, and by then it is too late to create one credibly. We reconstruct the registers and minutes from the filings and resolutions that do exist, note honestly what could not be evidenced, and keep it current from that point.',
      },
    ],
    seo: {
      title: 'SECP Corporate Compliance & Annual Filings',
      description:
        'Ongoing SECP compliance for Pakistani companies: Form A annual returns, Form 29 filings, share transfers, statutory registers and board minutes maintained.',
    },
  },

  {
    slug: 'npo-registration',
    pillar: 'corporate-legal',
    title: 'Non-Profit Registration',
    navLabel: 'Non-Profit Registration',
    oneLiner:
      'A not-for-profit licensed under Section 42 and incorporated with SECP, then certified by the Pakistan Centre for Philanthropy so donors can claim relief.',
    intro:
      'Setting up a not-for-profit in Pakistan happens in two stages and is judged in a third. SECP first grants a licence under section 42 of the Companies Act 2017, which lets a company drop the word Limited from its name and requires it to apply its income to its objects rather than distribute it. Incorporation as a public limited company follows. The third stage is Pakistan Centre for Philanthropy certification, and that is the one an institutional donor or the FBR will ask to see. We run all three.',
    icon: 'users',
    included: [
      'Section 42 licence application to SECP, including the statement of proposed activities',
      'Memorandum and Articles drafted to non-profit objects, with the income-and-property clause SECP requires',
      'Incorporation as a public limited company within the window the licence allows',
      'Governance pack: board composition, conflict of interest policy and the registers a regulator expects',
      'Pakistan Centre for Philanthropy certification, the only FBR-authorised NPO evaluation',
      'Licence renewal diarised ahead of the three-year expiry',
    ],
    audience: [
      'Founders setting up a charitable organisation',
      'CSR foundations inside a company group',
      'Existing NPOs seeking donor certification',
    ],
    steps: [
      {
        title: 'Eligibility and structure',
        description:
          'We confirm the objects qualify as non-profit under Section 42, assemble at least three promoters, and tell you honestly whether the activity fits before any fee is spent.',
      },
      {
        title: 'Licence application',
        description:
          'Draft memorandum, articles, activity statement, director affidavits and the prescribed fee filed with SECP for the Section 42 licence.',
      },
      {
        title: 'Incorporation',
        description:
          'Once licensed, the company is incorporated as a public limited company, then the NTN and bank account are opened in the organisation’s own name.',
      },
      {
        title: 'PCP certification',
        description:
          'Governance, financial management and programme delivery documented and submitted to the Pakistan Centre for Philanthropy for evaluation.',
      },
    ],
    deliverables: [
      'SECP Section 42 licence',
      'Certificate of Incorporation as a public limited company',
      'Memorandum and Articles with the non-profit clauses SECP requires',
      'Organisation NTN and a bank account in the organisation’s name',
      'PCP certification, where the evaluation is passed',
    ],
    documents: [
      'CNIC of all promoters and proposed directors, minimum three',
      'Three proposed names in order of preference',
      'A written statement of proposed activities and how they will be funded',
      'Affidavits from each director confirming they are not disqualified',
      'Proof of registered office address',
      'Programme and financial records for the PCP evaluation, where the organisation is already operating',
    ],
    related: ['company-registration', 'income-tax-filing', 'financial-accounting'],
    faqs: [
      {
        question: 'What does a Section 42 licence actually allow?',
        answer:
          'It permits a company formed for a charitable, scientific, educational or similar purpose to drop "Limited" from its name and to apply its income only to its objects rather than distributing it to members. The licence is granted for a definite period, normally three years, and must be renewed on application before it expires.',
      },
      {
        question: 'Do we need PCP certification, or is SECP registration enough?',
        answer:
          'SECP registration makes the organisation legal. PCP certification is what makes it fundable. The Pakistan Centre for Philanthropy is the only certification agency authorised by the FBR to evaluate NPO performance, and institutional donors, corporate CSR budgets and the tax relief available to your donors all commonly turn on it.',
      },
      {
        question: 'How many people do we need to start one?',
        answer:
          'At least three promoters, and in practice you want a board that is genuinely independent rather than three members of one family. SECP looks at the composition, and PCP looks at it much harder, so it is worth getting right at the start instead of restructuring after a failed evaluation.',
      },
      {
        question: 'Do you register trusts or societies as well?',
        answer:
          'No. We register not-for-profit companies under Section 42 with SECP, and we do not take on trust deeds with a registrar, provincial charity commission registrations, or FBR approval work for those structures. If a trust is genuinely the better vehicle for you, we will say so and point you elsewhere rather than steer you into a company.',
      },
    ],
    seo: {
      title: 'Section 42 Non-Profit Registration in Pakistan',
      description:
        'SECP Section 42 licensing and incorporation for not-for-profit companies, plus Pakistan Centre for Philanthropy certification for donor and FBR purposes.',
    },
  },

  {
    slug: 'pseb-registration',
    pillar: 'corporate-legal',
    title: 'PSEB Registration',
    navLabel: 'PSEB Registration',
    oneLiner:
      'Registration with the Pakistan Software Export Board for freelancers, software houses and call centres, plus the annual renewal that keeps it alive.',
    intro:
      'The Pakistan Software Export Board sits under the Ministry of IT and Telecommunication and registers the country’s IT and IT-enabled services exporters. Registration is what gets you the reduced tax rate on export proceeds and access to PSEB’s facilitation schemes. A call centre cannot legally operate without it. We register you in the right category, get the paperwork past the first review, and put the renewal on a calendar, because it is annual and it lapses quietly.',
    icon: 'award',
    included: [
      'Category assessment across freelancer, IT company or software house, and call centre or BPO',
      'Prerequisite check: NTN, SECP incorporation for a company, and evidence of IT or ITeS export income',
      'Application preparation and submission on the PSEB portal',
      'Evidence pack for foreign remittances, whether through a bank, Payoneer, Upwork or Fiverr',
      'Call centre registration including the additional infrastructure and premises requirements',
      'Annual renewal filed before expiry, with the fee category confirmed each year',
    ],
    audience: [
      'Freelancers billing overseas clients',
      'Software houses and digital agencies',
      'Call centres and BPO operators',
    ],
    steps: [
      {
        title: 'Category and eligibility',
        description:
          'We confirm which PSEB category you fall into and what it costs, since the fee scale differs sharply between an individual freelancer and a registered call centre.',
      },
      {
        title: 'Prerequisites',
        description:
          'NTN confirmed, incorporation documents assembled for a company, and proof of export income put in the form PSEB accepts.',
      },
      {
        title: 'Application',
        description:
          'Submitted on the PSEB portal with the fee paid, then tracked through review, with any query answered rather than left to time out.',
      },
      {
        title: 'Renewal calendar',
        description:
          'Certificate issued and the renewal date diarised, so registration is renewed before expiry instead of being re-applied for from scratch.',
      },
    ],
    deliverables: [
      'PSEB registration certificate in the correct category',
      'Portal account handed over in your own name',
      'A compiled evidence pack of export remittances',
      'A renewal reminder ahead of the annual expiry date',
    ],
    documents: [
      'CNIC of the applicant, or of directors for a company',
      'NTN certificate',
      'SECP Certificate of Incorporation, for companies',
      'Bank statements or remittance advices showing foreign income',
      'Company profile, website and client references',
      'Premises and infrastructure details, for call centre registration',
    ],
    related: ['company-registration', 'income-tax-filing', 'web-development'],
    faqs: [
      {
        question: 'Is PSEB registration compulsory?',
        answer:
          'For a call centre, yes: operating one in Pakistan without PSEB registration is not permitted. For freelancers and software houses it is voluntary, but the reduced tax rate on export proceeds usually recovers the fee many times over within a single year, which is why most exporters register anyway.',
      },
      {
        question: 'What does it actually save me?',
        answer:
          'The headline benefit is a materially lower tax rate on IT and ITeS export receipts than an unregistered exporter pays, plus eligibility for PSEB facilitation schemes and formal recognition when a foreign client runs due diligence on you. We will work the arithmetic against your own remittance volume before you commit, rather than quoting a rate at you.',
      },
      {
        question: 'I am a freelancer with no company. Can I still register?',
        answer:
          'Yes. Individual freelancers register in their own name with an NTN and proof of foreign earnings from platforms such as Upwork or Fiverr, or from direct bank remittances. You do not need to incorporate first, although incorporating later does mean a fresh registration in the company’s name.',
      },
      {
        question: 'What happens if I let it lapse?',
        answer:
          'The registration expires and the tax benefit stops applying from that point, which usually surfaces as an unexpected deduction on the next remittance. Renewal is a far smaller job than re-registering, so it goes on the compliance calendar with everything else.',
      },
    ],
    seo: {
      title: 'PSEB Registration for IT Companies & Freelancers',
      description:
        'Pakistan Software Export Board registration and annual renewal for freelancers, software houses and call centres, including the export income evidence pack.',
    },
  },

  {
    slug: 'trade-body-registration',
    pillar: 'corporate-legal',
    title: 'Chamber & Trade Body Membership',
    navLabel: 'Chamber Membership',
    oneLiner:
      'Membership of your Chamber of Commerce and Industry, which is what lets you obtain Certificates of Origin and the trade documents an exporter needs.',
    intro:
      'Chamber membership reads like a networking subscription and works like trade infrastructure. Certificates of Origin and several attested trade documents are issued by Chambers of Commerce and Industry to their own members, so for anyone shipping across a border the membership is a prerequisite rather than a benefit. We handle the application, the bank certificate that holds most applications up, and the annual renewal.',
    icon: 'pin',
    included: [
      'Selection of the right chamber for your city and sector, including the specialised trade associations where one fits better',
      'Membership application on letterhead with the completed form and prescribed fee',
      'Bank certificate arranged in the business name, which is the step that usually stalls applications',
      'Membership category advice across sole proprietor, firm and company, since fees and privileges differ',
      'Certificate of Origin issuance walked through the first time',
      'Annual renewal filed before the membership year closes',
    ],
    audience: [
      'Exporters needing Certificates of Origin',
      'Importers completing PSW registration',
      'Businesses bidding for tenders',
    ],
    steps: [
      {
        title: 'Chamber selection',
        description:
          'We confirm which chamber your business should join based on where you are registered and what you trade, and what that specific chamber currently requires.',
      },
      {
        title: 'Documents',
        description:
          'Application letter, membership form, NTN and sales tax certificates assembled, and the original bank certificate obtained in the business name.',
      },
      {
        title: 'Submission',
        description:
          'Application filed with the Secretary General’s office and the fee paid, then followed up until the membership number is issued.',
      },
      {
        title: 'Put to use',
        description:
          'Your first Certificate of Origin obtained alongside you, and the renewal date diarised so membership never lapses mid-shipment.',
      },
    ],
    deliverables: [
      'Chamber of Commerce and Industry membership certificate',
      'Membership number recorded against your PSW and WeBOC profiles',
      'A worked example of a Certificate of Origin application',
      'A renewal reminder ahead of the membership year end',
    ],
    documents: [
      'Application on business letterhead addressed to the Secretary General',
      'CNIC of the proprietor, partners or directors',
      'NTN certificate, and the sales tax registration certificate where you hold one',
      'Original bank certificate in the name of the business',
      'Incorporation certificate and partnership deed, as applicable',
      'Passport-size photographs of the authorised representative',
    ],
    related: ['import-export-license', 'company-registration', 'sales-tax-registration-filing'],
    faqs: [
      {
        question: 'Do I actually need chamber membership?',
        answer:
          'If you export, effectively yes. Certificates of Origin are issued by chambers to their members, and a buyer’s bank or customs authority will commonly require one before releasing payment or clearing goods. If you only trade domestically, it is genuinely optional and we will tell you so.',
      },
      {
        question: 'Which chamber should I join?',
        answer:
          'Normally the chamber for the city your business is registered in, because that is the one whose Certificates of Origin your customs and banking counterparties will recognise without question. Sector associations can be worth adding on top for advocacy and contacts, but they do not substitute for the city chamber.',
      },
      {
        question: 'Why is the bank certificate such a common hold-up?',
        answer:
          'Chambers require an original certificate issued by your bank in the exact registered name of the business, and banks issue these slowly and reject name mismatches outright. We request it at the start of the engagement rather than at the end, which is usually the difference between a two-week application and a two-month one.',
      },
    ],
    seo: {
      title: 'Chamber of Commerce Membership in Pakistan',
      description:
        'Chamber of Commerce and Industry membership registration and renewal, including the bank certificate and the Certificate of Origin process for exporters.',
    },
  },

  {
    slug: 'import-export-license',
    pillar: 'corporate-legal',
    title: 'Import & Export License',
    navLabel: 'Import/Export License',
    oneLiner:
      'Everything needed to legally import or export from Pakistan: WeBOC and PSW registration, chamber membership and customs setup.',
    intro:
      'Cross-border trade in Pakistan runs through the Pakistan Single Window, and getting on it requires a specific sequence of registrations in a specific order. We handle the whole chain, from sales tax registration and chamber membership to PSW and WeBOC enrolment and customs profile setup, so your first consignment clears without a false start.',
    icon: 'globe-arrows',
    included: [
      'Eligibility review and the correct registration sequence for your trade',
      'Pakistan Single Window (PSW) registration and profile setup',
      'WeBOC user ID and trader enrolment',
      'Chamber of Commerce and Industry membership',
      'Sales tax registration where required for import or export',
      'Customs agent coordination and first-consignment guidance',
    ],
    audience: ['First-time importers', 'Exporters and manufacturers', 'E-commerce sellers sourcing abroad'],
    steps: [
      {
        title: 'Scoping',
        description:
          'We confirm your business structure, the HS codes you will trade under, and which registrations your specific goods actually require.',
      },
      {
        title: 'Prerequisites',
        description:
          'NTN, sales tax registration and chamber membership put in place. These gate everything downstream and are where most delays occur.',
      },
      {
        title: 'PSW & WeBOC',
        description:
          'Single Window registration completed, user IDs issued, and your trader profile configured with bank and financial details.',
      },
      {
        title: 'First consignment',
        description:
          'We walk you through your first GD filing and clearance alongside your customs agent, so the process is learned rather than outsourced forever.',
      },
    ],
    deliverables: [
      'Active PSW account with configured trader profile',
      'WeBOC user ID and credentials',
      'Chamber of Commerce membership certificate',
      'Sales tax registration certificate, where applicable',
      'A written checklist of documents required per consignment',
    ],
    documents: [
      'NTN certificate and CNIC of proprietor or directors',
      'Incorporation certificate and Memorandum of Association, for companies',
      'Business bank account maintenance certificate',
      'Proof of business premises: ownership or rent agreement',
      'Recent electricity bill for the premises',
      'Passport-size photographs of the authorised person',
    ],
    related: ['sales-tax-registration-filing', 'corporate-secretarial-compliance', 'ecommerce-management'],
    faqs: [
      {
        question: 'Is there a single "import-export licence" in Pakistan?',
        answer:
          'Not as one document, despite the common name. What you actually need is a set of registrations, namely NTN, sales tax where applicable, chamber membership, and PSW/WeBOC enrolment, completed in the right order. Attempting them out of sequence is the usual cause of weeks of delay.',
      },
      {
        question: 'Can an individual import, or do I need a company?',
        answer:
          'A sole proprietorship with an NTN can import. A private limited company is often worth it anyway for liability separation and for the credibility it carries with foreign suppliers, but it is not a legal requirement.',
      },
      {
        question: 'Do you handle customs clearance itself?',
        answer:
          'We set up your registrations and coordinate with a licensed clearing agent, and we guide you through the first consignment. Ongoing per-consignment clearance is a customs agent’s function and is billed by them directly. We will introduce you to one we have worked with.',
      },
    ],
    seo: {
      title: 'Import Export License in Pakistan: PSW & WeBOC Registration',
      description:
        'Complete import-export setup: Pakistan Single Window registration, WeBOC enrolment, chamber membership and customs profile configuration.',
    },
  },

  {
    slug: 'contract-drafting',
    pillar: 'corporate-legal',
    title: 'Contract & Agreement Drafting',
    navLabel: 'Contract Drafting',
    oneLiner:
      'The agreements your business actually runs on, drafted to your facts rather than downloaded: commercial, employment, IP, property and digital policies.',
    intro:
      'Most commercial disputes start with an agreement that simply never addressed the thing that went wrong. We draft the contracts a business actually signs: supplier and distribution agreements, employment contracts, NDAs, IP assignments, shareholder arrangements, leases, and the website terms and privacy policy your payment provider will ask for. All written to Pakistani law and to the deal you have actually done, rather than to a template written for somebody else’s.',
    icon: 'document',
    included: [
      'Corporate and commercial agreements: supply, distribution, agency, services and consultancy',
      'Technology and intellectual property: licensing, IP assignment, software development and NDAs',
      'Website and digital policies: terms of service, privacy policy, refund and shipping terms',
      'Employment and HR: contracts, offer letters, non-solicitation and the employee handbook',
      'Property and finance: lease and tenancy agreements, loan documents and security arrangements',
      'Founder and ownership documents: shareholder agreements, partnership deeds and buy-sell terms',
    ],
    audience: [
      'Businesses using downloaded templates',
      'Founders formalising a partnership',
      'Companies about to sign with a large counterparty',
    ],
    steps: [
      {
        title: 'Instructions',
        description:
          'We take the commercial deal in plain language, ask the questions the agreement will have to answer, and flag where your intention and your leverage differ.',
      },
      {
        title: 'First draft',
        description:
          'The agreement drafted to your facts, with the negotiable positions marked so you know which clauses are yours to trade and which protect you.',
      },
      {
        title: 'Negotiation',
        description:
          'We mark up the counterparty’s comments, explain in plain terms what each change actually costs you, and settle the final text.',
      },
      {
        title: 'Execution',
        description:
          'Signature, witnessing, stamping and, where the document requires it, registration, then a filed copy in your own document set.',
      },
    ],
    deliverables: [
      'The executed agreement, in editable and signed form',
      'A plain-language summary of what each key clause commits you to',
      'A negotiation mark-up history, where there was a counterparty',
      'A reusable template where the document is one you will sign repeatedly',
    ],
    documents: [
      'A written or verbal outline of the commercial deal',
      'Any term sheet, quotation or email chain already agreed',
      'CNIC or incorporation details of both parties',
      'Existing versions of the agreement, if you are replacing one',
      'Relevant supporting documents: title deed, invoice terms, or the IP being assigned',
    ],
    related: ['company-registration', 'trademark-registration', 'corporate-secretarial-compliance'],
    faqs: [
      {
        question: 'Why not just use a template from the internet?',
        answer:
          'Because a template is written for a jurisdiction, an industry and a bargaining position that are probably not yours, and it is silent on precisely the point your deal turns on. Templates are also usually one-sided in favour of whoever published them, and it is rarely you. They are fine as a starting checklist and dangerous as a signed document.',
      },
      {
        question: 'Do you handle disputes if the agreement is breached?',
        answer:
          'We draft, negotiate and advise. Litigation before a court or tribunal is separate work and, in most cases, better done by counsel who appears in that forum regularly. We will hand over a clean file and introduce you rather than take on a matter we are not the right firm for.',
      },
      {
        question: 'Does a website need terms and a privacy policy in Pakistan?',
        answer:
          'A published privacy policy and terms of service are a practical requirement rather than a formality: payment gateways, app stores and most enterprise buyers require them before they will onboard you, and if you take personal data from users in other markets, their law can apply to you regardless of where you are registered.',
      },
      {
        question: 'Can you review an agreement someone else has sent us?',
        answer:
          'Yes, and it is often the more valuable engagement. We mark up the draft, tell you which clauses are standard, which are aggressive and which are genuinely unusual, and give you a short list of the changes actually worth spending negotiating capital on.',
      },
    ],
    seo: {
      title: 'Contract & Agreement Drafting Services in Pakistan',
      description:
        'Commercial, employment, IP, property and digital agreements drafted, negotiated and executed under Pakistani law, written to your facts rather than a template.',
    },
  },
];
