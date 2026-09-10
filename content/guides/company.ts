import type { Guide } from './types';

/**
 * Cluster 4: company formation.
 *
 * The highest-scoring guide in the slate: 182 harvested queries against a weak
 * page one, and the entry point to the whole compliance funnel. Register a
 * company, then you need an NTN, then sales tax, then annual filings.
 *
 * ── Two open items are published as open items ──
 *
 * The Seventh Schedule carries a clause raising fees 10 percent a year from
 * the notification date, which would have bitten on 21 April 2026, and no SRO
 * confirming it could be found. Competitors deal with this by not knowing it
 * exists. This guide states the clause, states that the position is unconfirmed
 * and tells the reader to check the challan, which is more useful than a
 * confident number that might be wrong by 10 percent.
 *
 * The same applies to the NIFT digital signature that competitors say is
 * required: no SECP page supports it, so it is addressed as a question rather
 * than repeated as a fact. See research/GUIDE-RESEARCH.md.
 */

const SECP_REGISTRATION: Guide = {
  slug: 'secp-company-registration',
  cluster: 'company',
  title: 'Registering a Company in Pakistan on SECP eZfile',
  navLabel: 'SECP company registration',
  card: 'The real fee schedule, the sixty-day trap on your reserved name, and the two filings due in the first forty-five days that nobody warns you about.',

  answer:
    'Reserve a name, file the incorporation application, and receive a certificate of incorporation. On SECP eZfile the electronic fee is Rs 1,000 for name reservation and Rs 6,050 to register a company with nominal capital up to Rs 100,000. There is no minimum capital requirement. One person can form a single member company, and nearly two in five new Pakistani companies now are.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'Most published fee figures are about a third of the real ones',
      body: 'Pages ranking today quote Rs 200 for name reservation and Rs 1,800 to 2,200 for incorporation. Those predate SRO 1806(I)/2024, which raised name reservation to Rs 1,000. The Seventh Schedule in force from 21 April 2025 sets electronic incorporation at Rs 6,050. Even invest.gov.pk, a government site, still publishes the old numbers.',
    },

    {
      kind: 'table',
      heading: 'What it actually costs',
      intro:
        'From the Seventh Schedule to the Companies Act 2017, effective 21 April 2025. Filing electronically costs roughly half what filing on paper does.',
      columns: ['Item', 'Electronic', 'Physical'],
      rows: [
        ['Name reservation', 'Rs 1,000', 'Rs 2,000'],
        ['Registration, nominal capital up to Rs 100,000', 'Rs 6,050', 'Rs 11,000'],
        ['Each additional Rs 100,000 or part, up to Rs 5bn', 'Rs 847', 'Rs 847'],
        ['Each additional Rs 100,000 or part, above Rs 5bn', 'Rs 200', 'Rs 200'],
        ['Company limited by guarantee', 'Rs 22,000', 'Rs 33,000'],
        ['Fee cap', 'Rs 40 million', 'Rs 50 million'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'One number we will not state with confidence',
      body: 'The same schedule contains a clause increasing the fees in items I to IV by 10 percent after one year from the date of the notification. The schedule took effect on 21 April 2025, so an uplift would be due from 21 April 2026. We could not find an SRO, a circular or an SECP page confirming it was applied, and no revised figure has been published. Treat the table above as the floor, check the challan eZfile generates before you pay, and be suspicious of any page quoting 2026 figures to the rupee without saying how it knows.',
    },

    {
      kind: 'prose',
      heading: 'There is no minimum capital',
      body: [
        'SECP\'s own FAQ says it directly: "There is no minimum requirement of authorized capital. However, minimum fee is charged according to authorized capital of Rs.100,000/-". The Rs 100,000 that appears everywhere is the lowest fee slab, not a sum you must have.',
        'This myth costs people real money, because it pushes founders into declaring capital they do not need and paying a fee band they did not have to enter.',
      ],
    },

    {
      kind: 'table',
      heading: 'Which vehicle to form',
      intro:
        'Section 14 of the Companies Act 2017 sets the member minimums and section 154 the director minimums. Note that these are two different rules, which competitors routinely merge.',
      columns: ['Type', 'Members', 'Directors'],
      rows: [
        ['Single member company', '1', 'At least 1'],
        ['Private limited', '2 to 50', 'Not less than 2'],
        ['Public, unlisted', '3 or more', 'Not less than 3'],
        ['Public, listed', '3 or more', 'Not less than 7'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The single member company is not a niche option',
      body: 'In August 2026 SECP registered 4,761 new companies, of which 1,846 were single member companies: nearly two in five. Section 14(1)(c) requires the sole member to nominate someone who, on the member\'s death, transfers the shares to the legal heirs. If the shares go to more than one heir, the company stops being a single member company and must comply with section 47.',
    },

    {
      kind: 'steps',
      heading: 'Reserving the name',
      intro:
        'SECP disposes of a complete application submitted before 10:00 a.m. on a working day the same day, and one submitted later on the next working day. You may propose three names in order of priority.',
      steps: [
        {
          title: 'Check the prohibited words list',
          body: 'SECP publishes 56 of them, including Bank, Exchange, Federal, Foundation, Fund, Insurance, Investment, State and University. Some are outright barred and some need prior written approval under section 10(2).',
        },
        {
          title: 'Get the spelling exactly right',
          body: 'SECP\'s rule is unusually strict: any deviation in dictionary spellings will not be accepted. A deliberate misspelling to make a name available will be rejected.',
        },
        {
          title: 'Avoid country names other than Pakistan',
          body: 'A name may not contain a country name or nationality other than Pakistan, except on sufficient justification. Pakistan combined with another country needs documentary evidence of a joint venture.',
        },
        {
          title: 'Note the sixty-day clock',
          body: 'Section 10(4): a reservation lasts not more than sixty days. If incorporation slips past that, the name is free again.',
        },
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The sixty-day trap',
      body: 'Almost nobody mentions section 10(4), so almost nobody warns you that a name reserved while you sort out documents can lapse before you incorporate. If your reservation is refused, section 10(6) gives you thirty days to appeal to the Commission, and section 10(7) makes that order final.',
    },

    {
      kind: 'list',
      heading: 'What the incorporation application contains',
      intro: 'Section 16(1) of the Companies Act 2017 lists four things.',
      items: [
        'A declaration of compliance with the Act, by an authorised intermediary or by a person named in the articles as a director',
        'The memorandum of association, signed by all subscribers, witnessed and dated',
        'The articles of association, signed and witnessed. Optional for a company limited by shares, required for a company limited by guarantee or an unlimited company',
        'An address for correspondence until the registered office is established and notified',
      ],
    },

    {
      kind: 'prose',
      heading: 'What happens after you file',
      body: [
        'If a document is incomplete, defective or contains matter contrary to law, the registrar may require a revised document within a specified period under section 16(2), and may refuse registration if the defect is not cured in time under section 16(3). On being satisfied, he registers the company and issues a certificate of incorporation.',
        'That certificate is conclusive evidence of compliance under section 16(8), which is a stronger statement than it sounds: once issued, the incorporation cannot be attacked for a procedural failure. If registration is refused, section 16(9) gives subscribers thirty days to appeal to the Commission, and that order is final.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Two filings due in the first forty-five days',
      body: 'Section 17(2): subscription money payable in cash is due within thirty days of incorporation, and shares left unpaid are deemed cancelled with the subscriber removed from the register. Section 17(3): receipt of that money must be reported to the registrar within forty-five days, with a certificate from a practising chartered accountant or cost and management accountant. New companies routinely miss both, because no guide mentions them.',
    },

    {
      kind: 'prose',
      heading: 'Your NTN arrives on its own',
      body: [
        'SECP and FBR run a one-window facility built on back-end integration: register through the SECP portal and the National Tax Number is issued automatically to the company\'s email address. As of January 2026 SECP states eZfile is integrated with FBR, EOBI and the provincial departments.',
        'Worth knowing before you appoint anyone: section 153(1)(h) of the Companies Act disqualifies a person from being a director if he does not hold a National Tax Number, subject to Commission exemption.',
      ],
    },

    {
      kind: 'table',
      heading: 'The annual calendar',
      intro:
        'Two of these deadlines are commonly published wrong. Form 29 is fifteen days, not thirty, and the forty-five days attached to Form A is an extension ceiling for listed companies rather than a separate class.',
      columns: ['Obligation', 'Deadline', 'Section'],
      rows: [
        ['Registered office notified', '30 days from incorporation', 'SECP'],
        ['Subscription money paid in cash', '30 days from incorporation', 's.17(2)'],
        ['Report of subscription money, with CA or CMA certificate', '45 days from incorporation', 's.17(3)'],
        ['First annual general meeting', 'Within 16 months of incorporation', 's.132'],
        ['Later AGMs', 'Within 120 days of financial year end', 's.132'],
        ['Form A or B, annual return', '30 days from the AGM', 's.130(3)'],
        ['Form 29, change of directors or officers', '15 days from the change', 's.197(3)'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'When you do not have to file Form A at all',
      body: 'Section 130(5) is subtler than the summaries suggest. The exemption from filing applies to any company with no change of particulars since its last annual return. The proviso then adds a duty to tell the registrar that nothing changed, and carves out single member companies and private companies with paid-up capital of not more than three million rupees. So a small company with no changes files nothing; a larger one with no changes must still notify.',
    },

    {
      kind: 'prose',
      heading: 'Is eZfile compulsory?',
      body: [
        'In practice, yes. eZfile went live in February 2024 and an enhanced release in March 2025 moved several processes to it exclusively, including foreign company registration, mortgages and charges, and changes to the principal line of business. SECP reports that 99.9 percent of company registrations are now completed entirely online.',
        'In law, the position is less tidy than that sounds. SECP has published no formal notice retiring eServices, and its own legacy eServices pages were still live in September 2026, describing the old flow and citing the Companies Ordinance 1984, which was repealed by the 2017 Act. If you find yourself on one of those pages, you are reading history.',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much does it cost to register a company in Pakistan?',
      answer:
        'Under the Seventh Schedule effective 21 April 2025, filing electronically costs Rs 1,000 for name reservation and Rs 6,050 to register a company with nominal capital up to Rs 100,000, rising by Rs 847 for each additional Rs 100,000. Filing on paper roughly doubles the registration fee. The schedule also contains a 10 percent annual escalator whose application from April 2026 we could not confirm, so check the challan eZfile generates.',
    },
    {
      question: 'Is there a minimum capital to register a company in Pakistan?',
      answer:
        'No. SECP states there is no minimum requirement of authorised capital. The Rs 100,000 figure that circulates is the lowest fee slab, not a capital requirement.',
    },
    {
      question: 'How long does name reservation take?',
      answer:
        'SECP disposes of a complete application submitted by 10:00 a.m. on a working day the same day, and one submitted after that on the next working day. The reservation then lasts not more than sixty days under section 10(4).',
    },
    {
      question: 'How many directors does a private limited company need in Pakistan?',
      answer:
        'Not less than two under section 154(1)(b). A single member company needs at least one, an unlisted public company not less than three, and a listed company not less than seven. Only a natural person may be a director.',
    },
    {
      question: 'What documents does SECP need to incorporate a company?',
      answer:
        'Section 16(1) requires a declaration of compliance, the memorandum of association signed by all subscribers and witnessed, the articles of association where required, and an address for correspondence. Particulars of the first directors are submitted with them under section 157.',
    },
    {
      question: 'Do I need a digital signature to register a company?',
      answer:
        'Possibly not. Consultant pages commonly say a paid NIFT digital signature is required, but SECP\'s own getting-started material describes a PIN sent by SMS and email, and we could not find an SECP page requiring a purchased certificate for a standard incorporation. Confirm with SECP before buying one.',
    },
    {
      question: 'Do I get an NTN automatically when I register a company?',
      answer:
        'Yes. Under the SECP and FBR one-window facility, registering through the SECP portal causes the National Tax Number to be issued automatically to the company email address.',
    },
    {
      question: 'When is Form 29 due?',
      answer:
        'Within fifteen days of the appointment of or change in a director or officer, under section 197(3). The proviso excludes the first appointment made at incorporation. Pages stating thirty days are wrong.',
    },
    {
      question: 'Does a dormant company have to file an annual return?',
      answer:
        'Not necessarily. Under section 130(5), a company with no change of particulars since its last annual return is exempt from filing. A single member company or a private company with paid-up capital of not more than three million rupees files nothing at all; any larger company must still inform the registrar that nothing has changed.',
    },
  ],

  publishedAt: '2026-09-13',
  related: ['how-to-get-an-ntn', 'trademark-registration-cost'],

  seo: {
    title: 'SECP Company Registration in Pakistan: Real Fees and Process',
    description:
      'The Seventh Schedule fees most pages get wrong, the sixty-day limit on a reserved name, and the two filings due in the first forty-five days after incorporation.',
  },
};

/**
 * The choice-of-vehicle guide.
 *
 * Its flagship correction is the audit threshold. Competitors cite s.247's
 * Rs 3 million figure as an audit exemption; s.247 governs WHO may audit, not
 * whether an audit is needed. The exemption is s.223(5) at Rs 1 million, and a
 * third threshold at s.233(3) decides the filing route. Three numbers doing
 * three jobs, routinely collapsed into one.
 */
const CHOOSING_A_STRUCTURE: Guide = {
  slug: 'smc-vs-private-limited-vs-sole-proprietor',
  cluster: 'company',
  title: 'SMC, Private Limited or Sole Proprietor: Which to Register',
  navLabel: 'Choosing a structure',
  card: 'What actually differs between the three, the audit thresholds everyone gets wrong, and the statutory points at which the answer changes.',

  answer:
    'A sole proprietorship has no registration and no separate legal existence, so the business debts are your debts. A single member company and a private limited company are both bodies corporate with limited liability, and they are taxed identically: the differences between them are compliance differences, not tax ones. Audit becomes compulsory once paid-up capital exceeds Rs 1 million.',

  sections: [
    {
      kind: 'table',
      heading: 'The three forms side by side',
      columns: ['', 'Sole proprietor', 'Single member company', 'Private limited'],
      rows: [
        ['Registered with', 'Nobody, only FBR for an NTN', 'SECP', 'SECP'],
        ['Members', 'One, and it is you', '1', '2 to 50'],
        ['Directors', 'Not applicable', 'At least 1', 'Not less than 2'],
        ['Separate legal person', 'No', 'Yes, s.18', 'Yes, s.18'],
        ['Liability', 'Unlimited and personal', 'Limited', 'Limited'],
        ['Taxed as', 'Individual, slab rates', 'Company', 'Company'],
      ],
    },

    {
      kind: 'prose',
      heading: 'There is no such thing as registering a sole proprietorship',
      body: [
        'The Companies Act 2017 contains no provision for one, and SECP registers only companies and limited liability partnerships. What people mean when they say they registered a sole proprietorship is that they obtained an NTN from FBR, and possibly a provincial or local licence.',
        'This also settles a question competitors answer badly. There is no statutory conversion from a sole proprietorship into a company, because there is nothing to convert. You incorporate a new company and transfer the assets to it, and the proprietorship simply stops. Pages describing a conversion procedure are describing something that does not exist.',
      ],
    },

    {
      kind: 'prose',
      heading: 'What limited liability actually rests on',
      body: [
        'Section 18 is the whole of it: on registration, the subscribers become a body corporate with perpetual succession and a common seal. The company is a person, distinct from the people who own it, and its debts are its own.',
        'A sole proprietor has no such statute, so there is no separation to rely on. Section 9(2) makes the point from the other direction: where an association of more than twenty persons carries on business for gain without incorporating, the members are personally liable for all the liabilities of that business.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Limited liability can be lost',
      body: 'Under section 15, if a single member company falls below one member or a private company below two, and business continues for more than 180 days, every member who knows about it becomes severally liable for the whole of the debts contracted during that time. The protection is not unconditional.',
    },

    {
      kind: 'prose',
      heading: 'An SMC is taxed exactly like a private limited company',
      body: [
        'The Income Tax Ordinance operates on the word "company" and draws no distinction for a single member company, which is a private company under the Companies Act in any event. Both reach the small company rate on the same section 2(59AB) thresholds: paid-up capital plus undistributed reserves not over Rs 50 million, not more than 250 employees, annual turnover not over Rs 250 million, and not formed by splitting up an existing company.',
        'Note the section number. Small company is defined at section 2(59AB). Section 2(59A) is a different thing entirely, the definition of a small and medium enterprise, and the two get confused constantly.',
      ],
    },

    {
      kind: 'table',
      heading: 'The three audit thresholds, and what each one does',
      intro:
        'Competitors cite the Rs 3 million figure as an audit exemption. It is not. Three separate provisions use three separate numbers for three separate purposes.',
      columns: ['Paid-up capital', 'Audit required?', 'Who may audit', 'Filing route'],
      rows: [
        ['Up to Rs 1m', 'No, s.223(5) proviso', 'Not applicable', 's.234, whether audited or not'],
        ['Over Rs 1m, under Rs 3m', 'Yes', 'Chartered accountant or CMA', 's.234 while under Rs 10m'],
        ['Rs 3m and above', 'Yes', 'Chartered accountant only, s.247(1)', 's.234 while under Rs 10m'],
        ['Rs 10m and above', 'Yes', 'Chartered accountant only', 's.233'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'What section 247 is actually for',
      body: 'It governs who is qualified to act as auditor, not whether you need one. Below Rs 3 million paid-up capital a cost and management accountant may audit a private company; at or above it, only a chartered accountant with a valid ICAP practising certificate. Citing it as an audit exemption threshold gets the reader\'s obligation wrong in both directions.',
    },

    {
      kind: 'list',
      heading: 'What a company files that a sole proprietor does not',
      intro:
        'The compliance gap is the real cost of incorporating, and it is larger than the registration fee suggests.',
      items: [
        'An income tax return regardless of income or activity, under s.114(1)(a). A dormant company still files.',
        'Books of account kept at the registered office and retained for ten financial years, under s.220',
        'Financial statements laid before the annual general meeting within 120 days of the year end, under s.223(2)',
        'An audit, unless paid-up capital is Rs 1 million or less',
        'An auditor appointed by the board within 90 days of incorporation, with the registrar notified within 14 days',
        'The annual return on Form A or B, and Form 29 within 15 days of any change of officers',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'A single member company still needs a second person',
      body: 'The Single Member Companies Rules require an SMC to appoint a company secretary within fifteen days, and the sole director may not be the company secretary. So a one-person company is not quite a one-person operation on paper. We read this in the original 2003 Rules, which still reference the repealed Companies Ordinance 1984, and SECP has reported changes to the nominee director requirements since, so confirm the current position before relying on it.',
    },

    {
      kind: 'prose',
      heading: 'When the answer changes',
      body: [
        'Rather than a revenue figure invented for the purpose, there are statutory points at which the calculation genuinely shifts. Turnover approaching Rs 100 million brings individuals and associations within minimum tax under section 113, which removes one of the better arguments for staying unincorporated. Paid-up capital above Rs 1 million starts the audit obligation. More than twenty participants makes incorporation compulsory under section 9(1).',
        'Everything else is a judgement about liability exposure. A business with real contractual or third-party risk wants the section 18 separation whatever its turnover, and a business with none may reasonably stay unincorporated well past the point where it could afford not to.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Is an SMC taxed differently from a private limited company?',
      answer:
        'No. The Income Tax Ordinance operates on the word "company" and makes no distinction for a single member company, which is a private company under the Companies Act. Both reach the small company rate on identical section 2(59AB) thresholds. The differences between the two forms are Companies Act compliance differences.',
    },
    {
      question: 'Do I need to register a sole proprietorship in Pakistan?',
      answer:
        'There is no registration for one. The Companies Act contains no sole proprietor provision and SECP registers only companies and LLPs. What you need is an NTN from FBR, sales tax registration if applicable, and any provincial or local licence your activity requires.',
    },
    {
      question: 'When does a company have to be audited in Pakistan?',
      answer:
        'Whenever paid-up capital exceeds Rs 1 million. Section 223(5) exempts a private company with paid-up capital not exceeding Rs 1 million, and section 223(9) applies that carve-out to single member companies. The Rs 3 million figure often quoted is from section 247 and governs who may act as auditor, not whether an audit is required.',
    },
    {
      question: 'Can I convert my sole proprietorship into a private limited company?',
      answer:
        'Not by conversion, because there is nothing registered to convert. You incorporate a new company and transfer the business assets to it, after which the proprietorship ceases. Guides describing a conversion procedure are describing something that does not exist in the Act.',
    },
    {
      question: 'Does a single member company need a company secretary?',
      answer:
        'The Single Member Companies Rules require one to be appointed within fifteen days, and provide that the sole director shall not be the company secretary. Confirm the current text before relying on it: the version we read is the original 2003 Rules and SECP has reported amendments since.',
    },
    {
      question: 'Does a dormant company have to file a tax return?',
      answer:
        'Yes. Section 114(1)(a) requires a return from every company, regardless of income or activity. Whether it must also file an annual return with SECP depends on whether particulars have changed since the last one.',
    },
    {
      question: 'How many people can be in a partnership in Pakistan?',
      answer:
        'Twenty. Section 9(1) of the Companies Act provides that no association or partnership of more than twenty persons may be formed for gain unless registered as a company, and section 9(2) makes those in breach personally liable for all the liabilities of the business.',
    },
  ],

  publishedAt: '2026-09-18',
  related: ['secp-company-registration', 'how-to-get-an-ntn'],

  seo: {
    title: 'SMC vs Private Limited vs Sole Proprietor in Pakistan',
    description:
      'What differs between the three structures, why an SMC is taxed identically to a private limited, and the three audit thresholds that competitors collapse into one wrong number.',
  },
};


/**
 * Guide 17: partnerships and the twenty-person cap.
 *
 * Owns a question the SECP guides cannot answer, because the answer is that
 * SECP is the wrong building. Partnership registration is with the Registrar
 * of Firms under the Partnership Act 1932, and the whole field writes about
 * "business registration in Pakistan" as though SECP were the only door.
 *
 * The section that earns it its place is s.9 of the Companies Act: more than
 * twenty partners and the firm must incorporate, with personal liability for
 * everything if it does not. Nobody covers it.
 */

const PARTNERSHIP: Guide = {
  slug: 'registering-a-partnership-firm',
  cluster: 'company',
  title: 'Registering a Partnership Firm in Pakistan',
  navLabel: 'Partnership firms',
  card: 'Why SECP is the wrong office, what the Registrar of Firms actually wants, and the twenty-partner ceiling that forces incorporation.',

  answer:
    'A partnership is registered with the Registrar of Firms under section 58 of the Partnership Act 1932, not with SECP. In Islamabad Capital Territory that means Form No. 1 signed by every partner before a qualified witness, a partnership deed on Rs 1,000 stamp paper, a Rs 1,000 fee, and about ten days. Registration is provincial, so the fee and the counter change with the province. Above twenty partners the law stops allowing a partnership at all.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'SECP does not register partnerships',
      body: 'This is the single most common wrong turn, and it is encouraged by pages that write about "business registration in Pakistan" as though there were one office. SECP registers companies and limited liability partnerships under the Companies Act 2017 and the LLP Act 2017. An ordinary partnership firm is a creature of the Partnership Act 1932 and is registered with the Registrar of Firms, which is a provincial office. Going to SECP for a partnership wastes a trip; more expensively, assuming that not being on SECP means you are unregistered leads people to incorporate when they did not need to.',
    },

    {
      kind: 'steps',
      heading: 'What registration involves in Islamabad Capital Territory',
      intro:
        'These are the ICT Administration\'s own requirements. Registration is province-specific: Punjab, Sindh and KP run their own registries and their own fees, so confirm locally before budgeting.',
      steps: [
        {
          title: 'Draw up the partnership deed',
          body: 'On Rs 1,000 stamp paper. This is the document that decides profit shares, authority, admission and retirement of partners, and what happens on a dispute. It is worth more attention than the registration itself.',
        },
        {
          title: 'Complete Form No. 1',
          body: 'The statutory application under section 58. It must be signed by all the partners before a witness who is a Gazetted Officer, an Advocate, an Attorney, a Pleader or an Honorary Magistrate. An ordinary witness will not do.',
        },
        {
          title: 'Prepare the affidavit and identity documents',
          body: 'An affidavit on Rs 5 stamp paper, plus CNICs of all partners and of the witnesses, all notarised.',
        },
        {
          title: 'Pay the fee',
          body: 'Rs 1,000 to National Bank under head C-03545 for ICT. Note the preprinted Form No. 1 still reads "Filing Fee Rs.100/-": the form is stale and the challan is what counts.',
        },
        {
          title: 'Attend in person',
          body: 'Partners appear before the Registrar. This is not a portal process in the way SECP incorporation now is.',
        },
        {
          title: 'Collect the certificate',
          body: 'About ten days in ICT on the Administration\'s own account.',
        },
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'More than twenty partners and you must incorporate',
      body: 'Section 9(1) of the Companies Act 2017 prohibits any association or partnership of more than twenty persons being formed for gain unless it is registered as a company. Section 9(2) is the part with teeth: every person in violation is personally liable for all liabilities incurred in the business. Section 9(3)(d) carves out partnerships of lawyers, accountants and other professions where practice as a limited liability company is not permitted, which is why large law and accountancy firms remain partnerships. For everyone else, twenty is a statutory ceiling rather than a guideline, and crossing it does not produce a warning letter, it produces unlimited personal exposure.',
    },

    {
      kind: 'prose',
      heading: 'Registration is optional, and mostly not optional in practice',
      body: [
        'The Partnership Act does not compel registration. A partnership exists in law from the moment people agree to share the profits of a business carried on by all or any of them acting for all, whether or not anything is filed.',
        'What registration buys is the ability to sue. An unregistered firm is severely restricted in enforcing contractual rights through the courts, and a partner in one is restricted in suing the firm or the other partners. Banks and larger customers also generally want the certificate before opening an account or onboarding a vendor. So it is voluntary in the way that having a lock on your door is voluntary.',
      ],
    },

    {
      kind: 'table',
      heading: 'Partnership, single member company, or sole proprietorship',
      intro:
        'The three routes people actually choose between, and the questions that separate them. Liability is the one that decides most cases and is the one most often left out of the comparison.',
      columns: ['', 'Partnership firm', 'Single member company', 'Sole proprietorship'],
      rows: [
        ['Registered with', 'Registrar of Firms', 'SECP', 'Nobody'],
        ['Minimum people', 'Two', 'One', 'One'],
        ['Liability', 'Unlimited, personal', 'Limited to the company', 'Unlimited, personal'],
        ['Separate legal person', 'No', 'Yes', 'No'],
        ['Annual filing with the registrar', 'No', 'Yes', 'No'],
      ],
    },

    {
      kind: 'prose',
      heading: 'How a partnership is taxed',
      body: [
        'A partnership firm is an association of persons for income tax, taxed on the non-salaried rate table in its own right. The firm pays, and the share a partner receives from a taxed association is not taxed again in the partner\'s hands.',
        'That last point matters more than it sounds, because it is the structural difference from a company. A company pays corporate tax and then a distribution to shareholders can attract tax on dividends. An association is taxed once. Whether that makes an association cheaper depends entirely on the numbers, and the top of the non-salaried table is higher than the corporate rate, so it is genuinely a calculation rather than a rule of thumb.',
      ],
    },

    {
      kind: 'calculator',
      toolSlug: 'business-tax',
      heading: 'What the firm would pay on its income',
      body: 'The non-salaried table is what an association of persons is taxed on. Enter the firm\'s taxable income to see the figure and the marginal rate it lands in.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The firm still needs an NTN, and so do the partners',
      body: 'Registration with the Registrar of Firms is not tax registration. The firm obtains its own NTN from FBR, and once it has one, section 114(1)(b)(vii) requires a return from it every year regardless of what it earned. The partners file their own returns separately. Registering the firm and stopping there is a common and expensive omission.',
    },
  ],

  faqs: [
    {
      question: 'Where do I register a partnership firm in Pakistan?',
      answer:
        'With the Registrar of Firms under section 58 of the Partnership Act 1932, which is a provincial office, not with SECP. SECP registers companies and limited liability partnerships only.',
    },
    {
      question: 'How much does it cost to register a partnership in Pakistan?',
      answer:
        'In Islamabad Capital Territory the fee is Rs 1,000 paid to National Bank under head C-03545, plus a partnership deed on Rs 1,000 stamp paper and an affidavit on Rs 5 stamp paper. Other provinces set their own fees. Note that the preprinted Form No. 1 still shows Rs 100, which is out of date.',
    },
    {
      question: 'How long does partnership registration take?',
      answer:
        'About ten days in Islamabad Capital Territory on the Administration\'s own account, once Form No. 1, the deed, the affidavit and the notarised CNICs are in and the partners have appeared in person.',
    },
    {
      question: 'Is partnership registration compulsory in Pakistan?',
      answer:
        'No. A partnership exists in law from the agreement itself. But an unregistered firm is severely restricted in enforcing its contracts through the courts, and banks and larger customers usually ask for the certificate, so unregistered is a weak position rather than a free one.',
    },
    {
      question: 'How many partners can a partnership have in Pakistan?',
      answer:
        'Twenty. Section 9(1) of the Companies Act 2017 prohibits an association or partnership of more than twenty persons formed for gain unless it registers as a company, and section 9(2) makes everyone in violation personally liable for all the business\'s liabilities. Partnerships of lawyers, accountants and similar professions are carved out by section 9(3)(d).',
    },
    {
      question: 'Who can witness Form No. 1?',
      answer:
        'A Gazetted Officer, an Advocate, an Attorney, a Pleader or an Honorary Magistrate. All partners must sign before that witness, which is why the form cannot simply be signed and posted.',
    },
    {
      question: 'Is a partnership taxed separately from the partners?',
      answer:
        'Yes. The firm is an association of persons and is taxed in its own right on the non-salaried rate table. A partner\'s share from an association that has been taxed is not taxed again in the partner\'s hands.',
    },
    {
      question: 'Does a registered partnership need an NTN?',
      answer:
        'Yes, and it is separate from registration with the Registrar of Firms. Once the firm holds an NTN, section 114(1)(b)(vii) requires a return every year whatever the firm earned. Partners file their own returns as well.',
    },
  ],

  publishedAt: '2026-09-26',
  related: ['smc-vs-private-limited-vs-sole-proprietor', 'how-to-get-an-ntn'],

  seo: {
    title: 'Registering a Partnership Firm in Pakistan',
    description:
      'Why partnerships go to the Registrar of Firms rather than SECP, what ICT requires and charges, the twenty-partner ceiling in section 9, and how a firm is taxed.',
  },
};

export const COMPANY_GUIDES: Guide[] = [SECP_REGISTRATION, CHOOSING_A_STRUCTURE, PARTNERSHIP];

