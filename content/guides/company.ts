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

  publishedAt: '2026-09-11T07:00:00Z',

  cta: {
    heading: 'Rather have the incorporation handled?',
    body:
      'The share money has to be paid within thirty days and certified within forty-five, and most founders find that out late. We do the filing and the certificate together.',
    buttonLabel: 'Talk to us about registering',
  },
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

  publishedAt: '2026-09-14T03:00:00Z',
  related: ['secp-company-registration', 'how-to-get-an-ntn', 'registering-a-partnership-firm', 'non-profit-tax-status'],

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

  publishedAt: '2026-09-18T03:00:00Z',
  related: ['smc-vs-private-limited-vs-sole-proprietor', 'how-to-get-an-ntn'],

  seo: {
    title: 'Registering a Partnership Firm in Pakistan',
    description:
      'Why partnerships go to the Registrar of Firms rather than SECP, what ICT requires and charges, the twenty-partner ceiling in section 9, and how a firm is taxed.',
  },
};


/**
 * Guide 32: what a company owes SECP after incorporation.
 *
 * The section that earns it its place is s.17: subscription money must
 * actually be paid within 30 days of incorporation, and a chartered or cost
 * and management accountant's certificate filed within 45, or the shares are
 * deemed cancelled and the subscriber comes off the register. Essentially no
 * competitor guide mentions it, and founders who treat authorised capital as a
 * paper figure walk straight into it.
 *
 * Second correction: the Form A exemption in s.130(5) is a two-part structure,
 * not a simple threshold. Any company with unchanged particulars is exempt
 * from FILING; a positive duty to NOTIFY no change is then imposed on everyone
 * EXCEPT single member companies and private companies with paid-up capital
 * not over Rs 3 million. So a small company files nothing at all and a larger
 * one must still write in.
 */

const SECP_ANNUAL: Guide = {
  slug: 'company-annual-compliance',
  cluster: 'company',
  title: 'What Your Company Owes SECP After Incorporation',
  navLabel: 'Annual compliance',
  card: 'The share money you have thirty days to actually pay, the form due within fifteen days of any change, and when an annual return is not required at all.',

  answer:
    'Within thirty days of incorporation the subscription money has to be paid in, and within forty-five days a chartered or cost and management accountant\'s certificate confirming receipt must reach the registrar. After that: Form 29 within fifteen days of any change of directors or officers, and an annual return on Form A or B within thirty days of the AGM, unless nothing has changed since the last one.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'The share money is not a paper figure, and you have thirty days',
      body: 'Section 17(2) is the trap nobody warns about. Subscription money payable in cash is due within thirty days of incorporation, and where it is not paid the shares are deemed cancelled and the subscriber is removed from the register of members. Section 17(3) then requires receipt of that money to be reported to the registrar within forty-five days, with a certificate from a chartered accountant or a cost and management accountant in practice. Founders who declare capital on the incorporation form and treat it as notional are describing a share allotment that can simply evaporate, and the certificate requirement means a professional has to be engaged in the first six weeks rather than at the first audit.',
    },

    {
      kind: 'table',
      heading: 'The recurring filings, and what triggers each',
      intro:
        'Two of these deadlines are commonly published wrong. Form 29 is fifteen days rather than thirty, and the forty-five days attached to the annual return is an extension ceiling for listed companies, not a separate class of deadline.',
      columns: ['Filing', 'Deadline', 'Section'],
      rows: [
        ['Report of subscription money received', '45 days from incorporation', 's.17(3)'],
        ['Form 29, change of directors or officers', '15 days from the change', 's.197(3)'],
        ['Form A or B, annual return', '30 days from the AGM', 's.130(3)'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Form 29 does not cover the first appointment',
      body: 'The proviso to section 197(3) excludes the first appointment of directors made at incorporation, which is already before the registrar in the incorporation documents. So the fifteen-day clock starts at the first CHANGE, not at the beginning. What it does catch is every subsequent appointment, cessation, resignation and change of particulars of a director, chief executive, secretary, chief financial officer, auditor or legal adviser, and fifteen days is short enough that a resignation accepted at a meeting can be late before anyone has drafted minutes.',
    },

    {
      kind: 'prose',
      heading: 'When you do not have to file an annual return at all',
      body: [
        'Section 130(5) is subtler than the summaries suggest, and reading it as a simple threshold gets it wrong in both directions. The exemption from filing applies to any company where there has been no change of particulars since the last annual return filed. That part is not limited by size.',
        'The proviso then adds a separate positive duty: a company OTHER THAN a single member company or a private company with paid-up capital of not more than three million rupees must inform the registrar that there is no change. So a small company with nothing to report files nothing at all, and a larger company with nothing to report must still write in and say so. Both are commonly reported as "there is no exemption", which is wrong.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'A dormant company still files an income tax return',
      body: 'Whatever the position with SECP, section 114(1)(a) of the Income Tax Ordinance requires a return from every company regardless of income or activity. There is no dormancy relief on the tax side. A company that traded nothing, and that is genuinely exempt from filing an annual return under section 130(5), still files with FBR. The two regulators ask separate questions and satisfying one says nothing about the other.',
    },

    {
      kind: 'list',
      heading: 'How many directors you must actually have',
      intro:
        'Section 154(1), and worth checking against what your company currently has, because a resignation can take you below the floor without anyone noticing.',
      items: [
        'A single member company: at least one director',
        'Any other private company: not less than two',
        'An unlisted public company: not less than three',
        'A listed company: not less than seven',
        'Section 154(2): only a natural person shall be a director, so a company cannot sit on its own board',
      ],
    },

    {
      kind: 'prose',
      heading: 'Audit is a separate question with three different thresholds',
      body: [
        'Three provisions use three figures for three different purposes, and they are constantly collapsed into one. Section 223(5) exempts a private company with paid-up capital not exceeding one million rupees from audit, and section 223(9) applies that carve-out to single member companies. That is the audit exemption.',
        'Section 247(1) is not an exemption at all: it decides WHO may audit. At or above three million rupees of paid-up capital a private company needs a chartered accountant; below that a cost and management accountant also qualifies. Competitors routinely cite that three million figure as the audit threshold, which gets a reader\'s obligation wrong in both directions at once.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Filing electronically is cheaper, not just faster',
      body: 'Under the Seventh Schedule in force from 21 April 2025, electronic submission through eZfile costs materially less than filing on paper: incorporation at nominal capital up to Rs 100,000 is Rs 6,050 electronically against Rs 11,000 physically, and a company limited by guarantee is Rs 22,000 against Rs 33,000. The general rule the schedule follows is that paper roughly doubles the fee. Pages describing eServices are describing a platform SECP has replaced.',
    },

    {
      kind: 'prose',
      heading: 'What this costs if you ignore it',
      body: [
        'The Companies Act carries penalties for each of these filings, and the practical consequence arrives earlier than a penalty does: a company that has not filed cannot cleanly do the things that require a clean record, from opening certain accounts to satisfying a counterparty\'s due diligence.',
        'The share money point is the one with a substantive rather than procedural consequence. Deemed cancellation under section 17(2) changes who owns the company, which is a different order of problem from a late filing fee.',
      ],
    },
  ],

  faqs: [
    {
      question: 'What does a new company have to file after incorporation in Pakistan?',
      answer:
        'Subscription money must be paid within thirty days under section 17(2), and its receipt reported to the registrar within forty-five days with a certificate from a practising chartered accountant or cost and management accountant under section 17(3). After that, Form 29 within fifteen days of any change of officers, and an annual return within thirty days of the AGM.',
    },
    {
      question: 'What happens if the subscription money is not paid?',
      answer:
        'Section 17(2) deems the shares cancelled and the subscriber is removed from the register of members. That changes who owns the company, which is a more serious consequence than a late filing fee.',
    },
    {
      question: 'When is Form 29 due?',
      answer:
        'Within fifteen days of the appointment or change, under section 197(3). It is commonly published as thirty days, which is wrong. The proviso excludes the first appointment of directors made at incorporation.',
    },
    {
      question: 'Does a dormant company have to file an annual return with SECP?',
      answer:
        'Not necessarily. Section 130(5) exempts a company with no change of particulars since its last annual return. But a company other than a single member company or a private company with paid-up capital of not more than three million rupees must still inform the registrar that there is no change.',
    },
    {
      question: 'Does a dormant company have to file a tax return?',
      answer:
        'Yes. Section 114(1)(a) of the Income Tax Ordinance requires a return from every company regardless of income or activity. There is no dormancy relief with FBR, whatever the position with SECP.',
    },
    {
      question: 'At what capital does a company need an audit in Pakistan?',
      answer:
        'Above one million rupees of paid-up capital. Section 223(5) exempts a private company at or below that, and section 223(9) extends it to single member companies. The three million rupee figure is section 247 and decides who may audit, not whether an audit is required.',
    },
    {
      question: 'How many directors must a private company have?',
      answer:
        'Not less than two under section 154(1), or one for a single member company. An unlisted public company needs at least three and a listed company at least seven. Only a natural person can be a director.',
    },
    {
      question: 'Is it cheaper to file with SECP online or on paper?',
      answer:
        'Online. Under the Seventh Schedule effective 21 April 2025, electronic incorporation at nominal capital up to Rs 100,000 is Rs 6,050 against Rs 11,000 on paper, and the schedule broadly doubles fees for physical filing.',
    },
  ],

  publishedAt: '2026-09-25T07:00:00Z',
  related: ['secp-company-registration', 'smc-vs-private-limited-vs-sole-proprietor'],

  seo: {
    title: 'Company Annual Compliance in Pakistan: What SECP Requires',
    description:
      'The thirty-day share money deadline nobody warns about, Form 29 in fifteen days, when an annual return is not required, and the three audit thresholds that do different jobs.',
  },
};


/**
 * Guide 41: depreciation.
 *
 * Written for a software house, which decides the emphasis. Computer hardware
 * carries 30 per cent depreciation against a 10 per cent general machinery
 * rate, and 30 per cent initial allowance against 15, so the tax treatment of
 * a workstation is dramatically better than the treatment of generic plant and
 * almost nobody in our audience knows the gap is that large.
 *
 * The finding that earns the guide its place is the proviso to s.22(1):
 * failing to withhold under s.152 or s.153 on a capital purchase removes that
 * cost from the depreciation base IN ALL RELEVANT TAX YEARS. The write-off is
 * lost for the life of the asset, which can dwarf the withholding itself.
 */

const DEPRECIATION: Guide = {
  slug: 'depreciation-on-business-assets',
  cluster: 'company',
  title: 'Depreciation on Business Assets',
  navLabel: 'Depreciation',
  card: 'Why computer hardware is written off three times faster than general plant, and how failing to withhold can cost you the write-off entirely.',

  answer:
    'Section 22 allows a deduction computed by applying the Third Schedule rate to the written down value at the start of the year. Computer hardware is 30% where general machinery is 10%, and there is a separate initial allowance in the year an asset is first used, again 30% for hardware. Failing to withhold tax on a capital purchase removes that cost from the base permanently.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'Not withholding costs you the asset\'s entire write-off',
      body: 'This is the provision to know before it applies to you. The proviso to section 22(1) says depreciation shall not be allowed for the amount paid for the addition of capital assets to a seller, IN ALL RELEVANT TAX YEARS, where the tax deductible under section 152 or 153 on those payments has not been deducted and deposited in the treasury. The mechanism is that the amount is simply not added to your assets for computing tax depreciation. So a company that bought equipment from a supplier and did not deduct under section 153 has not merely exposed itself to a withholding penalty: it has permanently removed that equipment\'s cost from the depreciation base for the whole of the asset\'s life. On a substantial purchase the lost deduction dwarfs the withholding that was avoided.',
    },

    {
      kind: 'table',
      heading: 'The rates, and why an IT firm should care',
      intro:
        'Third Schedule Part I, applied to the written down value. Note the gap between computer hardware and everything else it might otherwise be grouped with.',
      columns: ['Asset class', 'Rate on written down value'],
      rows: [
        ['Computer hardware, including printer, monitor and allied items', '30%'],
        ['Technical or professional books', '20%'],
        ['Machinery and plant, not otherwise specified', '10%'],
        ['Furniture, including fittings', '10%'],
        ['Factory, workshop, cinema, hotel, hospital', '10%'],
        ['Building, not otherwise specified', '5%'],
      ],
    },

    {
      kind: 'prose',
      heading: 'Reducing balance, not straight line',
      body: [
        'Section 22(2) computes the deduction by applying the rate against the written down value at the beginning of the year, not against the original cost. So a workstation at 30 per cent gives you 30 per cent of cost in the first year, then 30 per cent of the remaining 70, and so on.',
        'One consequence is worth stating plainly: on the rate alone an asset never reaches zero. The tail is dealt with on disposal rather than by the rate running out, which is why the written down value at disposal matters and why keeping the schedule accurate over years is not merely bookkeeping.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The initial allowance is separate and comes on top',
      body: 'Third Schedule Part II sets an initial allowance taken in the year the asset is first used, in addition to the ordinary depreciation deduction. Buildings of all types get 10 per cent. Furniture, general machinery and plant, motor vehicles, ships and technical books get 15 per cent. Computer hardware including printer, monitor and allied items gets 30 per cent, and so does machinery and equipment used in the manufacture of IT products, which was expressly inserted into that class. Do not confuse the two schedules: 30 per cent appears in both Part I and Part II and they are different allowances doing different jobs in the same year.',
    },

    {
      kind: 'prose',
      heading: 'What this means for a software house buying equipment',
      body: [
        'A firm equipping a development team is buying almost entirely into the fastest class the Schedule has. The same rupee spent on a workstation is relieved three times faster than a rupee spent on generic plant, and it also carries double the initial allowance.',
        'That is a real planning point rather than a curiosity, because it changes the after-tax cost of hardware relative to other spending, and it applies to the printers and monitors alongside the machines. It is also one of the few places in the Ordinance where the IT sector is favoured by the ordinary rules rather than by a special regime that has to be applied for.',
      ],
    },

    {
      kind: 'calculator',
      toolSlug: 'business-tax',
      heading: 'What the deduction is worth against your income',
      body: 'Depreciation reduces business income before the rate table applies, so its value depends on the band you are in. Enter your taxable income to see the marginal rate the deduction is actually saving you.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The asset has to be used in the business',
      body: 'Section 22(1) allows the deduction for depreciation of the person\'s depreciable assets USED IN THE PERSON\'S BUSINESS in the tax year. An asset bought but not yet in use has not started depreciating, and an asset used partly privately raises an apportionment question rather than a full claim. That matters most for vehicles and for equipment in a home office, which is where a large number of our readers actually work.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'A separate disallowance for not integrating with FBR',
      body: 'Worth knowing alongside, because it works the same way. Where a person is required to integrate their business with the Board through an approved fiscal electronic device and software and fails to do so, expenditure attributable to sales is disallowed, subject to a cap of eight per cent of the allowable deduction. Like the withholding proviso above, it is a compliance failure that lands as a lost deduction rather than as a penalty, and it is the pattern to watch for in this Ordinance.',
    },
  ],

  faqs: [
    {
      question: 'What is the depreciation rate for computers in Pakistan?',
      answer:
        '30 per cent of written down value under Third Schedule Part I, for computer hardware including printer, monitor and allied items. That is three times the 10 per cent general rate for machinery and plant not otherwise specified.',
    },
    {
      question: 'Is depreciation calculated on cost or written down value?',
      answer:
        'Written down value. Section 22(2) applies the Third Schedule rate to the written down value at the beginning of the year, so it is a reducing balance rather than straight line and the asset never reaches zero on the rate alone.',
    },
    {
      question: 'What is the initial allowance?',
      answer:
        'A separate allowance under Third Schedule Part II, taken in the year the asset is first used and in addition to ordinary depreciation. Buildings 10 per cent, furniture and general machinery and vehicles 15 per cent, and computer hardware 30 per cent.',
    },
    {
      question: 'Can I lose depreciation for not deducting withholding tax?',
      answer:
        'Yes, and permanently. The proviso to section 22(1) provides that depreciation is not allowed for the amount paid for a capital asset in all relevant tax years where tax deductible under section 152 or 153 was not deducted and deposited, because the amount is not added to the assets for computing depreciation.',
    },
    {
      question: 'What is the depreciation rate for buildings in Pakistan?',
      answer:
        '5 per cent of written down value for a building not otherwise specified, and 10 per cent for a factory, workshop, cinema, hotel or hospital, and for residential quarters for labour.',
    },
    {
      question: 'Does equipment for making IT products get the higher rate?',
      answer:
        'For the initial allowance, yes. Third Schedule Part II expressly includes machinery and equipment used in the manufacture of IT products in the 30 per cent class alongside computer hardware, aircraft and aero engines.',
    },
    {
      question: 'Can I claim depreciation on an asset I have not started using?',
      answer:
        'No. Section 22(1) allows the deduction for depreciable assets used in the person\'s business in the tax year, so an asset bought but not yet in use has not begun to depreciate for tax.',
    },
    {
      question: 'Are there other deductions I can lose for non-compliance?',
      answer:
        'Yes, and the pattern is worth noticing. Where a person required to integrate with the Board through an approved fiscal electronic device fails to do so, expenditure attributable to sales is disallowed, capped at eight per cent of the allowable deduction.',
    },
  ],

  publishedAt: '2026-09-30T03:00:00Z',
  related: ['smc-vs-private-limited-vs-sole-proprietor', 'withholding-statements-section-165'],

  seo: {
    title: 'Depreciation on Business Assets in Pakistan',
    description:
      'Computer hardware at 30% against 10% for general plant, the separate initial allowance, and the proviso that removes an asset from the base if you did not withhold.',
  },
};


/**
 * Guide 44: non-profits.
 *
 * Two corrections carry it.
 *
 * 1. s.100C is STILL a hundred per cent credit. I went into this research
 *    believing it had been cut and the agent refuted it from the live text.
 *    What actually changed was the Finance Act 2025 merging Tables 1 and 2 of
 *    clause (66), so entities that had a straight exemption must now satisfy
 *    the s.100C conditions. A narrowing of eligibility, not a cut in the rate,
 *    and the two get conflated.
 * 2. SECP s.42 and FBR s.2(36) are entirely separate approvals. A s.42 licence
 *    confers no tax status whatever, and the Ordinance proves it by listing a
 *    s.42 company as one of ten categories that must STILL get Commissioner
 *    approval.
 *
 * The SECP Regulations detail is deliberately omitted: secp.gov.pk returns a
 * genuine 403 and the figures reached us at tier 3 only.
 */

const NON_PROFITS: Guide = {
  slug: 'non-profit-tax-status',
  cluster: 'company',
  title: 'Tax Status for a Non-Profit in Pakistan',
  navLabel: 'Non-profits',
  card: 'Why a SECP licence gives you no tax relief at all, what the hundred per cent credit actually requires, and the surplus that gets taxed at ten per cent.',

  answer:
    'Two separate approvals do two different jobs. A SECP section 42 licence decides whether you may exist as a non-profit company. Commissioner approval under section 2(36) decides your tax status, lasts three years, and is what unlocks the section 100C credit. Neither implies the other, and a section 42 licence on its own confers no tax relief.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'A SECP licence is not a tax exemption',
      body: 'This is the assumption that costs organisations the most and it is easy to make, because the licence is the harder thing to get. Section 42 of the Companies Act lets SECP licence an association with charitable or not-for-profit objects to register as a public company without "Limited" in its name, and section 42(6) says no such association may be registered as a company at all without it. That is a corporate-form licence: it decides whether the entity may exist in that shape. Tax status is a separate decision by the Commissioner under section 2(36). The Ordinance makes the separation explicit by listing a not-for-profit company registered with SECP under section 42 as merely one of ten categories in section 100C(2) that must still obtain Commissioner approval. And it runs the other way too: trusts, waqfs, societies and welfare institutions can get section 2(36) approval with no SECP involvement whatever.',
    },

    {
      kind: 'list',
      heading: 'What section 2(36) actually requires',
      intro:
        'Three cumulative limbs, and organisations routinely satisfy the first two and forget the third.',
      items: [
        'Established for religious, educational, charitable or welfare purposes for the benefit of the general public, or for the promotion of amateur sport, excluding a recreational club whose joining fee for new members exceeds one million rupees',
        'Formed and registered by or under any law as a non-profit organization',
        'Approved by the Commissioner for a specified period, on a prescribed application',
        'And no asset may confer, or be capable of conferring, a private benefit',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Approval expires, and three years passes quickly',
      body: 'Rule 214 provides that approval remains in force for the subsequent three years, or until withdrawn under rule 217, whichever is earlier. So section 2(36) approval is not a status you obtain once. Rule 212 provides that approval is notified in the gazette and may carry conditions, rule 213 requires a refusal to be in writing with reasons, and rule 215 requires applications to be finalised within two months. Note the Rules here are as last consolidated on 24 November 2023, which is three Finance Acts ago, so confirm the procedural detail before relying on it.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The hundred per cent credit was not cut. Eligibility was narrowed.',
      body: 'This is worth stating carefully because we went looking for a rate cut and there is not one. Section 100C still allows a tax credit equal to one hundred per cent of tax payable under any provision of the Ordinance, including minimum and final taxes. The Finance Act 2026 did not touch it. What changed is elsewhere: the Finance Act 2025 merged Tables 1 and 2 of clause (66) of Part I of the Second Schedule, so entities that previously had a straight exemption must now satisfy the section 100C conditions to get the credit. That is a narrowing of who qualifies rather than a reduction in what they get, and coverage that describes it as a cut has conflated the two.',
    },

    {
      kind: 'list',
      heading: 'The conditions attached to the credit',
      intro:
        'Section 100C(4). Missing any one of them costs the whole credit, not part of it.',
      items: [
        'The return has been filed',
        'Tax required to be deducted or collected has been deducted or collected and paid',
        'Withholding statements for the relevant year have been filed',
        'Administrative and management expenditure does not exceed fifteen per cent of total receipts, which is disapplied where activities began within the last three years or total receipts are under one hundred million rupees',
        'Approval by the Commissioner under section 2(36)',
        'No portion of income or property confers a private benefit on donors, authors or their families',
        'A statement of voluntary contributions has been filed',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Surplus funds are taxed at ten per cent',
      body: 'Section 100C(5) and (6) tax surplus funds at ten per cent, and the definition is cumulative rather than alternative, which is what makes it navigable. Surplus funds are money that is: not spent on charitable and welfare activities during the tax year; received in that year as donations, voluntary contributions, subscriptions and other income; more than twenty-five per cent of total receipts for the year; and not restricted funds, meaning funds the donor has obliged the organisation to hold. Note the time limit is the tax year itself rather than a multi-year window, which is a common misstatement. An organisation holding a large unrestricted donation across a year end should know this before the year end rather than after.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'A new full-year exemption certificate',
      body: 'Section 159(1D), inserted by the Finance Act 2026, entitles a non-profit holding section 2(36)(c) approval for a tax year to a withholding exemption certificate for that whole tax year. That is practically significant and, as far as we can see, almost unreported. It removes the need to seek relief transaction by transaction for an organisation whose approval is already in place.',
    },

    {
      kind: 'prose',
      heading: 'What a donor gets, and the limits on it',
      body: [
        'Section 61 gives the donor a tax credit rather than a deduction, computed on a formula. The amount taken into account is capped at the lesser of the actual donations or thirty per cent of taxable income for an individual or association, and twenty per cent for a company. Where the recipient is an associate of the donor, those caps are halved to fifteen and ten per cent.',
        'Two practical conditions. A cash donation counts only where it is paid by crossed cheque, so cash given over a counter does not qualify. And eligible recipients are boards of education and universities, government-run institutions, any non-profit organization or any person eligible for the section 100C credit, and the twenty-eight bodies named in the Thirteenth Schedule.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Does a SECP section 42 licence make my organisation tax exempt?',
      answer:
        'No. Section 42 is a corporate-form licence deciding whether you may register as a non-profit company. Tax status comes from Commissioner approval under section 2(36), and the Ordinance lists a section 42 company as one of ten categories that must still obtain it.',
    },
    {
      question: 'Is the section 100C credit still a hundred per cent?',
      answer:
        'Yes. Section 100C allows a credit equal to one hundred per cent of tax payable under any provision of the Ordinance, including minimum and final taxes, and the Finance Act 2026 did not amend it. What changed is that the Finance Act 2025 merged the clause (66) tables, so entities with a former straight exemption must now meet the section 100C conditions.',
    },
    {
      question: 'How long does non-profit tax approval last?',
      answer:
        'Three years under rule 214, or until withdrawn under rule 217, whichever is earlier. Approval is notified in the gazette and may carry conditions, and applications are to be finalised within two months.',
    },
    {
      question: 'What are surplus funds and how are they taxed?',
      answer:
        'Under section 100C(5) and (6), at ten per cent. Surplus funds are money not spent on charitable and welfare activities during the tax year, received that year as donations, contributions, subscriptions and other income, exceeding twenty-five per cent of total receipts, and not restricted by the donor. All four limbs must be met.',
    },
    {
      question: 'Is there a spending requirement for a non-profit?',
      answer:
        'Effectively, through two provisions. Administrative and management expenditure must not exceed fifteen per cent of total receipts for the section 100C credit, disapplied for the first three years or where receipts are under Rs 100 million. And unspent unrestricted income above twenty-five per cent of receipts is taxed as surplus funds.',
    },
    {
      question: 'Can a trust get tax approval without registering with SECP?',
      answer:
        'Yes. Trusts, waqfs, societies and welfare institutions can obtain section 2(36) approval from the Commissioner with no SECP involvement at all. The two approvals are independent in both directions.',
    },
    {
      question: 'What tax relief does a donor get?',
      answer:
        'A credit under section 61, not a deduction, capped at the lesser of actual donations or thirty per cent of taxable income for an individual or association and twenty per cent for a company, halved where the recipient is an associate. Cash donations count only if paid by crossed cheque.',
    },
    {
      question: 'Can an approved non-profit stop tax being withheld from it?',
      answer:
        'Section 159(1D), inserted by the Finance Act 2026, entitles a non-profit holding section 2(36)(c) approval for a tax year to a withholding exemption certificate for that whole tax year, rather than seeking relief transaction by transaction.',
    },
  ],

  publishedAt: '2026-10-01T07:00:00Z',
  related: ['smc-vs-private-limited-vs-sole-proprietor', 'company-annual-compliance'],

  seo: {
    title: 'Tax Status for a Non-Profit in Pakistan',
    description:
      'Why a SECP section 42 licence confers no tax relief, what the hundred per cent section 100C credit requires, the three-year approval, and the ten per cent on surplus funds.',
  },
};

export const COMPANY_GUIDES: Guide[] = [SECP_REGISTRATION, CHOOSING_A_STRUCTURE, PARTNERSHIP, SECP_ANNUAL, DEPRECIATION, NON_PROFITS];




