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

export const COMPANY_GUIDES: Guide[] = [SECP_REGISTRATION];
