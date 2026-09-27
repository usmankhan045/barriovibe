import type { Guide } from './types';

/**
 * Corporate registrations that are not ordinary company formation: the
 * section 42 non-profit company, and the set of registrations people call an
 * "import export licence". Both sit in the company cluster and support the
 * npo-registration and import-export-license service pages.
 *
 * ## Section 42
 *
 * Built from SECP's own current documents rather than from the 2018
 * regulations most competitor pages still describe. The Associations with
 * Charitable and Not for Profit Objects Regulations 2018 were replaced by
 * Chapter VII of the Companies Regulations 2024, which SRO 1221(I)/2024 and
 * SRO 601(I)/2025 then amended heavily: ninety days to incorporate instead of
 * sixty, a Rs 200,000 member liability and start-up donation, three graduate
 * promoters, prior approval for a change of CEO.
 *
 * Two things are published as open items rather than smoothed over:
 *
 * 1. SECP's regulations and SECP's own guidebook disagree on auditor and PCP
 *    requirements by size. See `s42-size-rules-regs-vs-guidebook`.
 * 2. No current SECP document describes a licence term or a renewal
 *    procedure, and reg 100(2) overrides contrary renewal conditions in older
 *    licences. The guide says what the Act says (a period "to be specified")
 *    and tells the reader to read their licence. See `s42-no-renewal-procedure`.
 *
 * Tax status is deliberately left to `non-profit-tax-status`, and ordinary
 * incorporation mechanics to `secp-company-registration`.
 *
 * ## Import export
 *
 * The flagship correction is that there is no such licence. The Import and
 * Export Policy Orders ban or restrict named goods and leave everything else
 * open; what a trader actually needs is an NTN, sales tax registration where
 * section 14 applies, and a PSW subscription followed by registration with
 * Customs as a trader. The separate WeBOC user ID that most pages describe no
 * longer exists as a step: PSW says so in terms.
 *
 * Chamber membership is published as an open question. We found no condition
 * requiring it in the PSW subscription rules as PSW describes them or in the
 * 2022 Policy Orders, but that is a negative reading of scanned, since-amended
 * instruments, recorded as `ipo-epo-2022-no-chamber-condition` (unverified).
 */

const SECTION_42: Guide = {
  slug: 'section-42-company-registration',
  cluster: 'company',
  title: 'Registering a Section 42 Non-Profit Company in Pakistan',
  navLabel: 'Section 42 companies',
  card: 'The SECP licence that has to come before the company, the Rs 150,000 fee, the ninety-day window to incorporate, and the conditions the licence ties you to.',

  answer:
    'A non-profit company in Pakistan cannot be registered at all until SECP grants a licence under section 42 of the Companies Act 2017. You reserve a name, apply for the licence with a non-refundable Rs 150,000 fee and at least three qualifying promoters, then incorporate as a public company within ninety days of the licence. The licence decides the corporate form only. Tax status is a separate approval.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'The licence comes first, and there is no way round it',
      body: 'Section 42(6) is blunt: notwithstanding anything in the Act or any other law, no association with charitable or not-for-profit objects may be registered as a company without a section 42 licence. Regulation 18 of the Companies Regulations 2024 puts the order in terms, requiring the subscribers to obtain the licence before they file the incorporation application. So the familiar eZfile incorporation is the last step here, not the first, and a non-profit that incorporated as an ordinary company to save time has not become a section 42 company by doing so.',
    },

    {
      kind: 'list',
      heading: 'Who needs a section 42 licence',
      intro:
        'Section 42(1) sets three conditions. An association meeting all three can only become a company through the licence.',
      items: [
        'It is to be formed as a limited company for promoting commerce, art, science, religion, health, education, research, sports, protection of the environment, social welfare, charity or any other useful object',
        'It intends to apply its profits and other income in promoting those objects, and it prohibits the payment of dividends to its members',
        'Its objects and activities are not, and will not at any time be, against the laws, public order, security, sovereignty and national interests of Pakistan',
        'What it gets in return: registration as a public limited company without the word "Limited" or "(Guarantee) Limited" in its name, with all the privileges and obligations of a limited company under section 42(4)',
      ],
    },

    {
      kind: 'table',
      heading: 'What SECP charges',
      intro:
        'From the Seventh Schedule to the Companies Act 2017 as consolidated by SECP with effect from 10 November 2025. Item III covers a section 42 company without share capital; one with share capital pays the ordinary share capital scale in Item I.',
      columns: ['Item', 'Electronic', 'Physical'],
      rows: [
        ['Name reservation', 'Rs 1,000', 'Rs 2,000'],
        ['Application for the licence, non-refundable', 'Rs 150,000', 'Rs 150,000'],
        ['Registration, section 42 company without share capital', 'Rs 27,500', 'Rs 55,000'],
        ['Registration, section 42 company with share capital', 'Item I scale', 'Item I scale'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The Rs 150,000 is lost if the licence is refused',
      body: 'The schedule calls it a non-refundable processing fee, and it is the same whether you file electronically or on paper. That is the practical reason to get the promoters, the objects and the documents right before applying: a refusal costs the whole fee, and a fresh application pays it again. The Item I scale for a company with share capital carries the ten per cent escalation clause discussed in our SECP company registration guide. The two Item III fees in the table carry no such clause.',
    },

    {
      kind: 'list',
      heading: 'Who can be a promoter',
      intro:
        'Regulation 97(6) of the Companies Regulations 2024, inserted in April 2025, and the fit and proper test in regulation 101. These are the requirements that most often decide whether a section 42 company is possible at all.',
      items: [
        'At least three promoters, of whom at least three must be graduates. SECP\'s guidebook adds that they need management experience as well',
        'Every promoter and director must be an active taxpayer. SECP\'s checklist asks for the promoters to be on FBR\'s Active Taxpayers List',
        'Relevant experience in the objects. Where there are several objects and the proposed chief executive lacks experience in them, there must be at least one promoter with adequate experience in each field',
        'Fit and proper under regulation 101: no link to money laundering or terrorist financing, not declared a tax defaulter, no conviction for fraud or breach of trust, no overdue payment showing in the credit bureau report, and no role in a company whose licence was revoked for irregularities, among other tests',
        'Every director must be a promoter or member, under regulation 100(1)(xxxiii)',
        'An international NGO is not eligible at all. Regulation 97(5) excludes it, and SECP\'s guidebook sends INGOs to the Ministry of Interior',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Two hundred thousand rupees per promoter, before anything else',
      body: 'Regulation 100(1)(v) requires each promoter to undertake a start-up donation of not less than Rs 200,000, and regulation 100(1)(iv) sets each member\'s liability at not less than Rs 200,000. Both figures were doubled from one hundred thousand by SRO 601(I)/2025, so pages quoting the lower amount are out of date. The donation undertaking does not apply to a promoter nominated by a government or a statutory body, in which case that body contributes. SECP\'s checklist also asks for an affidavit that the promoters will be the main donors and a list of intended donors with the amounts they intend to give.',
    },

    {
      kind: 'steps',
      heading: 'The process, in the order SECP requires it',
      steps: [
        {
          title: 'Define the objects',
          body: 'SECP wants each object to say what the company will achieve, how, and for whom. Regulation 97(2) lets you adopt the standard object clauses in Annexure U to the Regulations, adapted as needed, and SECP\'s guidebook reproduces them by sector.',
        },
        {
          title: 'Assemble the promoters',
          body: 'At least three who between them satisfy the graduate, experience, active taxpayer and fit and proper requirements above. This is the step that stops most applications before they start.',
        },
        {
          title: 'Reserve the name',
          body: 'Through eZfile, as for any company. The name should match the principal object, and the company will later have to carry the phrase "A company set up under section 42 of the Companies Act, 2017" alongside it on everything it issues.',
        },
        {
          title: 'Apply for the licence',
          body: 'Form App-3 with the supporting documents, filed by an authorised promoter or an authorised representative under regulation 97(1), and the Rs 150,000 challan. Foreign promoters, directors or chief executives need Ministry of Interior security clearance before the licence is granted.',
        },
        {
          title: 'SECP examines it',
          body: 'Under regulation 98 SECP may make enquiries and ask for more information, assesses every promoter, proposed director and proposed chief executive against the fit and proper criteria, and grants the licence subject to conditions. A refusal has to be made by order, after the applicant has been given a hearing.',
        },
        {
          title: 'Incorporate within ninety days',
          body: 'Regulation 99(1) requires the incorporation application within ninety days of the licence. SECP may extend by a maximum of another ninety days, and after that the licence is deemed cancelled and you start again with a fresh application and a fresh fee.',
        },
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Sixty days is the old number',
      body: 'Regulation 99(1) originally gave sixty days to incorporate after the licence. SRO 1221(I)/2024 of 6 August 2024 changed it to ninety and replaced an open-ended extension with a hard ninety-day ceiling. Guidance written against the 2018 regulations, or the first version of the 2024 ones, gets both parts wrong.',
    },

    {
      kind: 'list',
      heading: 'What the licence application contains',
      intro:
        'From SECP\'s current checklist and guidebook for a fresh applicant. An association already registered under another law files more, listed after this.',
      items: [
        'Form App-3, signed by an authorised promoter or licensed intermediary',
        'Paid challan for the Rs 150,000 non-refundable fee, and confirmation that the name is available',
        'Copies of the CNIC, NICOP or passport of every promoter, proposed director, proposed chief executive and witness, with signatures verified',
        'CVs of the promoters, directors and chief executive, with the highest degree and evidence of experience, attested as SECP specifies',
        'A notarised letter of authority on stamp paper from all promoters in favour of one of them or an intermediary',
        'The draft memorandum and articles in the form of Table F of the First Schedule',
        'A list of intended donors with their particulars and intended amounts, and the promoters\' affidavit on donors and the register of donors',
        'A board resolution where a promoter is a company, approval where a promoter is a state enterprise or public sector company, and an NOC where a promoter is a government servant',
        'An NOC from the Ministry of Interior or Economic Affairs where there will be foreign donations or foreign directors, and the latest audited accounts of any donor companies',
      ],
    },

    {
      kind: 'prose',
      heading: 'Converting an existing trust or society',
      body: [
        'An existing trust or society may apply to become a section 42 company under regulation 97(7), but only where the law governing its dissolution or takeover allows it. It files the same application plus its last audited accounts and annual report, its registration certificate, a resolution of all members approving the change, a certified member list and constitution, and a statement of pending disputes.',
        'The part that catches people is what happens next. Regulation 100(1)(xxx) requires the trust or society to be dissolved within ninety days of the company\'s incorporation, with evidence and an auditor\'s certificate filed within thirty days of the dissolution, or SECP begins revoking the licence. And SECP\'s guidebook says a society registered under the Societies Act converts only on its dissolution under that Act, with its assets passing to another society rather than to the new company. A society expecting to carry its property across into a section 42 company should read that twice.',
      ],
    },

    {
      kind: 'list',
      heading: 'The conditions a licence carries',
      intro:
        'Regulation 100(1) lists them, and section 42(2) makes them part of the memorandum and articles. The ones that change how the organisation actually runs:',
      items: [
        'Every rupee of money, property, donations and income is applied solely to the objects, and nothing is paid to members or their close relatives by way of dividend, bonus or profit',
        'Remuneration only for a chief executive or directors who are not members and are in whole-time employment. Members and their close relatives may not be paid for services, and the bar runs for a year after a member leaves',
        'Prior SECP approval for any change to the object clause and for any change of chief executive, re-appointment excepted',
        'Accounts closed on 30 June every year',
        'Funds received through banking channels, with cash of up to Rs 20,000 allowed if it is banked within three working days',
        'No foreign donations without prior permission from the relevant authorities, and none from blacklisted or unregistered INGOs',
        'Separate registers of donors and donations, and of donees and beneficiaries, alongside the books of account',
        'No political activity or funding, and no functioning as a trade organisation',
        'A website carrying the information specified in Annexure V to the Regulations',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'SECP\'s regulations and SECP\'s guidebook disagree on size rules',
      body: 'Both classify section 42 companies by annual revenue: small up to Rs 50 million, medium above that up to Rs 200 million, large above Rs 200 million. They then diverge. The Companies Regulations 2024 as SECP consolidates them require a medium company\'s auditor to be QCR rated and a large company\'s to be registered with the Audit Oversight Board, and require only large companies to show registration with the Pakistan Centre for Philanthropy or the provincial charity commission within six months. SECP\'s section 42 guidebook, in the version it was serving in September 2026, says small companies need a QCR rated auditor, medium and large an AOB certified one, and that medium and large companies must obtain PCP certification every three years. Both agree that medium and large companies need at least one female director. The regulation is the binding text, but the guidebook is the later document, so we cannot tell you which SECP applies today. Ask before appointing an auditor.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'What we could not find: a licence term or a renewal',
      body: 'Section 42(1) says the licence is granted "for a period to be specified", and many pages say it runs for three years and must be renewed. We could not find that in any current SECP document. The Companies Regulations 2024 contain no procedure for renewing a section 42 licence, SECP\'s guidebook and checklist mention no term, and regulation 100(2) provides that any condition in an existing licence, "including renewal of license", that contradicts the regulations has no effect. Read your own licence for the period it states, and ask SECP if it names one, rather than relying on a general figure.',
    },

    {
      kind: 'prose',
      heading: 'How a licence is lost, and where the assets go',
      body: [
        'Section 42(5) lets SECP revoke a licence, after written notice and a hearing, on grounds that include breach of the licence conditions, failing to file financial statements or annual returns for the two immediately preceding financial years, membership falling below three, not carrying on business for a year, fraud or failure to keep proper accounts, and involvement in money laundering or terrorist financing. A company may also surrender its licence voluntarily under regulation 103.',
        'Section 43 then takes over. The company stops all activity except recovering money owed to it, may not solicit or receive donations, and must transfer its remaining assets after debts to another section 42 company, preferably with similar objects, within ninety days. Nothing comes back to the members, which is the point of the structure and worth understanding before a founder puts personal money into it.',
      ],
    },

    {
      kind: 'prose',
      heading: 'When a trust or society fits better',
      body: [
        'A section 42 company is not the only way to run a non-profit, and for tax purposes it is not privileged. Commissioner approval under section 2(36) of the Income Tax Ordinance is open to a non-profit formed and registered under any law, and trusts, waqfs and societies can obtain it with no SECP involvement. What the company form adds is incorporation, limited liability, SECP supervision and the credibility that comes with it.',
        'The price is the regulation 97 and 100 regime above. If the founders cannot field three graduate promoters who are active taxpayers and pass the fit and proper test, if they cannot each commit Rs 200,000, or if the plan depends on members or their relatives being paid by the organisation, a section 42 company is either unavailable or the wrong shape. That is when a trust or a society is worth considering instead.',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much does it cost to register a section 42 company in Pakistan?',
      answer:
        'Under the Seventh Schedule as consolidated from 10 November 2025, the licence application carries a non-refundable Rs 150,000 fee, and registration of a section 42 company without share capital costs Rs 27,500 electronically or Rs 55,000 on paper. Name reservation is Rs 1,000 electronically. One with share capital pays the ordinary share capital scale instead.',
    },
    {
      question: 'How many people do I need to form a section 42 company?',
      answer:
        'At least three promoters under regulation 97(6) of the Companies Regulations 2024, at least three of whom must be graduates, all of them active taxpayers, and all meeting the fit and proper criteria. Membership falling below three later is a ground for revoking the licence under section 42(5).',
    },
    {
      question: 'How long do we have to incorporate after the licence?',
      answer:
        'Ninety days under regulation 99(1). SECP may extend by a maximum of another ninety days on application, after which the licence is deemed cancelled and a fresh application, with a fresh fee, is needed.',
    },
    {
      question: 'Does a section 42 licence make us tax exempt?',
      answer:
        'No. The licence decides whether the organisation may exist as a non-profit company. Tax status needs separate Commissioner approval under section 2(36) of the Income Tax Ordinance, which is covered in our guide on tax status for a non-profit.',
    },
    {
      question: 'Can the directors of a section 42 company be paid?',
      answer:
        'Only a chief executive or directors who are not members and are in whole-time employment may be paid remuneration. All directors may receive actual expenses and a meeting fee set by the board, disclosed in the directors\' report. Members and their close relatives may not be paid for services, and the bar continues for a year after a member leaves.',
    },
    {
      question: 'How much do the promoters have to contribute?',
      answer:
        'Each promoter undertakes a start-up donation of not less than Rs 200,000 under regulation 100(1)(v), and each member\'s liability is not less than Rs 200,000 under regulation 100(1)(iv). Both were raised from one hundred thousand in April 2025.',
    },
    {
      question: 'Can an existing trust or society become a section 42 company?',
      answer:
        'Yes, under regulation 97(7), where its governing law allows dissolution or takeover. The trust or society must then be dissolved within ninety days of incorporation. SECP\'s guidebook says a society\'s assets go to another society on dissolution rather than to the new company.',
    },
    {
      question: 'Does a section 42 licence have to be renewed?',
      answer:
        'We could not confirm that it does. The Act says the licence is for a period to be specified, but the Companies Regulations 2024 contain no renewal procedure and override contrary renewal conditions in older licences. Check the period stated in your own licence.',
    },
  ],

  publishedAt: '2026-10-07T07:00:00Z',
  basis:
    'Sourced from section 42 of the Companies Act 2017, the Companies Regulations 2024 and SECP\'s Seventh Schedule fees.',
  reviewedOn: '2026-09-27',

  cta: {
    heading: 'Setting up a non-profit company?',
    body:
      'The Rs 150,000 fee is lost if the licence is refused, so the promoters and objects need to be right before anything is filed. We check both first, then run the licence and the incorporation.',
    buttonLabel: 'Talk to us about a section 42 licence',
    href: '/contact?service=npo-registration',
  },
  related: ['non-profit-tax-status', 'secp-company-registration', 'company-annual-compliance'],

  seo: {
    title: 'Section 42 Company Registration in Pakistan',
    description:
      'The SECP licence a non-profit company needs first, the Rs 150,000 fee, three qualifying promoters, ninety days to incorporate, and the conditions it imposes.',
  },
};

const IMPORT_EXPORT: Guide = {
  slug: 'import-export-license-pakistan',
  cluster: 'company',
  title: 'Import Export License in Pakistan: What You Actually Register',
  navLabel: 'Import export registration',
  card: 'Why there is no single licence, the Rs 500 Single Window subscription that replaced the WeBOC user ID, and the two-year renewal nobody mentions.',

  answer:
    'Pakistan issues no general import export licence. To trade ordinary goods you need an NTN, sales tax registration where section 14 of the Sales Tax Act applies, and a Pakistan Single Window subscription followed by registration with Customs as a trader. The subscription costs Rs 500, lasts two years, and replaces the separate WeBOC user ID. Restricted goods then need their own permits through the same portal.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'There is no document called an import export licence',
      body: 'The phrase describes a set of registrations, not a certificate. Trade in goods is governed by the Import Policy Order 2022 and the Export Policy Order 2022, made under section 3 of the Imports and Exports (Control) Act 1950. The Import Policy Order allows goods to be imported from worldwide sources unless it bans them (Appendix A), bans them second-hand (Appendix C) or restricts them subject to conditions (Appendix B). For everything else, what stands between a business and its first consignment is identity and tax registration, not a licence. Anyone offering to sell you a general import export licence is selling the registrations below under another name.',
    },

    {
      kind: 'steps',
      heading: 'The registrations, in the order they depend on each other',
      steps: [
        {
          title: 'Get an NTN, and keep its email current',
          body: 'FBR charges nothing for a National Tax Number. The detail that matters later is the email address held against it in IRIS, because PSW sends its one-time passwords and login link to that address and to nowhere else.',
        },
        {
          title: 'Register the company first, if trading through one',
          body: 'A company subscribes to PSW with its SECP registration number, and one of its directors, as held in FBR\'s records, completes the verification. A sole proprietor subscribes on a personal NTN.',
        },
        {
          title: 'Register for sales tax if section 14 catches you',
          body: 'Section 14(1) of the Sales Tax Act 1990 lists an importer, and an exporter who intends to claim a sales tax refund on zero-rated supplies, among the categories that must register. It is triggered by the activity, not by turnover.',
        },
        {
          title: 'Subscribe to the Pakistan Single Window',
          body: 'Enter the NTN, CNIC and a mobile number registered in your own name, pay the Rs 500 fee through the PSID the system generates, confirm the one-time passwords, and complete biometric verification. PSW then emails a link to create the user ID and password.',
        },
        {
          title: 'Register with Customs as a trader',
          body: 'Log in to PSW and register as a trader: business name, address, city and whether the use is commercial or non-commercial, with the documents the form asks for. A business with several directors or partners submits an authority letter.',
        },
        {
          title: 'Apply for any goods-specific permits',
          body: 'Where your goods are restricted, the licences, permits and certificates from the regulator concerned are applied for through PSW. The Single Declaration through PSW is mandatory for any consignment with regulatory requirements.',
        },
      ],
    },

    {
      kind: 'table',
      heading: 'What the registrations cost',
      intro:
        'The government fees we could verify. Customs agents, clearing charges and duties on the goods themselves are separate.',
      columns: ['Registration', 'Official fee', 'How long it lasts'],
      rows: [
        ['NTN with FBR', 'None', '-'],
        ['PSW subscription', 'Rs 500, non-refundable', 'Two years'],
        ['PSW renewal', 'Rs 500', 'A further two years'],
        ['Registration with Customs as a trader', 'None stated by PSW', '-'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The WeBOC user ID is no longer a separate step',
      body: 'Most pages still describe getting a WeBOC user ID as its own registration, with a file of documents submitted to Customs. PSW answers the question directly: a PSW subscriber does not need a separate user ID for WeBOC, and uses WeBOC functionality after registering as a trader with the Customs Management System. WeBOC is still the Customs system underneath, and where a consignment has no regulatory requirements a goods declaration may be filed through either interface. But every trader function in WeBOC is available through PSW, and PSW says its subscription replaced twenty-two paper documents previously submitted for registration with Customs.',
    },

    {
      kind: 'list',
      heading: 'What PSW checks during subscription',
      intro:
        'There is no document bundle to assemble. PSW verifies these particulars electronically against FBR, NADRA and the mobile number portability database, so each has to be right at source before you start.',
      items: [
        'An NTN, FTN or sales tax registration number',
        'For a company, its SECP registration number or CUIN',
        'A CNIC, with biometric verification of the person subscribing',
        'A mobile number registered against that CNIC. A number registered in a company\'s name will not be accepted',
        'The email address held against the NTN in IRIS, which must be accessible for one-time passwords',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'An old email address in IRIS stops the whole process',
      body: 'PSW fetches the email address from FBR\'s database and sends the one-time password and the login link there. If that address belongs to a former accountant, a consultant or a mailbox nobody checks, the subscription cannot be completed, and PSW\'s answer is that the email must first be updated against the NTN with FBR. It is the most avoidable delay in the sequence, and worth checking before anything else.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The subscription expires after two years',
      body: 'Under SRO 2296(I)/2022 a PSW subscription is valid for two years. Renewal is started from Profile Management in the portal, costs another Rs 500 through a PSID that must be paid within ten days, and repeats the biometric verification. PSW prompts a month before expiry. If the subscription lapses, requests already filed continue to be processed but nothing new can be started, which is an unpleasant discovery with a container at the port.',
    },

    {
      kind: 'prose',
      heading: 'Biometric verification, and what happens if it fails',
      body: [
        'PSW\'s subscription page describes biometric verification at a NADRA e-Sahulat centre, taking the CNIC and the application ID. On 23 September 2026 PSW reported that it had integrated with NADRA\'s PakID mobile app, so the same verification can be completed remotely for subscription, renewal and profile updates. Check which route the portal offers when you reach that step.',
        'Where fingerprints cannot be read, for age, wear or a medical reason, PSW allows an undertaking instead, followed by a physical appearance before the Assistant or Deputy Collector at the Customs collectorate for the city selected at registration, with the original CNIC and an authority letter where the business has several directors. Until that is done, no goods declaration can be filed.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Is chamber of commerce membership required?',
      body: 'Many pages list it as a precondition. We could not find the requirement. PSW\'s subscription particulars do not include it, and neither the Import Policy Order 2022 nor the Export Policy Order 2022 as notified makes it a general condition of importing or exporting. Both orders have been amended since and we have not read every amendment, so treat this as unconfirmed rather than settled. Membership has a consequence worth knowing either way: section 114(1)(b)(ix) of the Income Tax Ordinance requires a resident person registered with a chamber of commerce to file an income tax return.',
    },
  ],

  faqs: [
    {
      question: 'How do I get an import export license in Pakistan?',
      answer:
        'There is no general licence to get. For ordinary goods you need an NTN, sales tax registration where section 14 of the Sales Tax Act applies, and a Pakistan Single Window subscription followed by registration with Customs as a trader. Restricted goods need their own permits, applied for through PSW.',
    },
    {
      question: 'What is the PSW registration fee?',
      answer:
        'Rs 500, one-time and non-refundable, paid through a Payment Slip ID the portal generates. The subscription lasts two years under SRO 2296(I)/2022, and renewal costs another Rs 500.',
    },
    {
      question: 'Do I still need a WeBOC user ID?',
      answer:
        'No. PSW states that a subscriber does not need a separate user ID for WeBOC. After subscribing you register as a trader with the Customs Management System through PSW and use WeBOC functions from there.',
    },
    {
      question: 'Can an individual import without a company?',
      answer:
        'Yes. PSW subscription works on an NTN, and a sole proprietor subscribes on a personal NTN. A company subscribes with its SECP registration number, with one director completing the verification.',
    },
    {
      question: 'Do importers need sales tax registration?',
      answer:
        'Section 14(1) of the Sales Tax Act 1990 lists an importer among the categories that must register, and an exporter who intends to claim refunds on zero-rated supplies. Registration turns on the activity, not on turnover.',
    },
    {
      question: 'Is chamber of commerce membership mandatory for importers?',
      answer:
        'We could not find a legal requirement. It is not among PSW\'s subscription particulars and the 2022 Import and Export Policy Orders do not impose it generally, though both have been amended since. Note that a resident registered with a chamber must file an income tax return under section 114(1)(b)(ix).',
    },
    {
      question: 'What happens if my PSW subscription expires?',
      answer:
        'You cannot start any new transaction until it is renewed. Requests already filed continue to be processed. Renewal costs Rs 500, is paid within ten days of requesting it, and repeats the biometric verification.',
    },
    {
      question: 'Why can\'t I complete PSW subscription?',
      answer:
        'The usual cause is the email address. PSW sends its one-time passwords to the email held against your NTN in IRIS, and if you cannot access it the address must first be updated with FBR. A mobile number not registered against your own CNIC is the other common block.',
    },
  ],

  publishedAt: '2026-10-08T03:00:00Z',
  basis:
    'Sourced from Pakistan Single Window\'s published rules and fees under SRO 2296(I)/2022, and the Import and Export Policy Orders 2022.',
  reviewedOn: '2026-09-27',

  cta: {
    heading: 'Setting up to import or export?',
    body:
      'The registrations only take days when the NTN, the IRIS email and the sales tax position are right before the PSW subscription starts. We sort those first, then run the subscription and the Customs registration.',
    buttonLabel: 'Talk to us about import and export registration',
    href: '/contact?service=import-export-license',
  },
  related: ['how-to-get-an-ntn', 'sales-tax-registration', 'secp-company-registration', 'paying-foreign-suppliers'],

  seo: {
    title: 'Import Export License in Pakistan: PSW Registration',
    description:
      'Why Pakistan has no single import export licence, the Rs 500 PSW subscription that replaced the WeBOC user ID, the two-year renewal, and the order of steps.',
  },
};

export const CORPORATE_GUIDES: Guide[] = [SECTION_42, IMPORT_EXPORT];
