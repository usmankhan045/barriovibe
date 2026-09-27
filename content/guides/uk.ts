import type { Guide } from './types';

/**
 * The UK guides, filed under the cross-border cluster.
 *
 * Two reference pages that sit behind the UK Company Formation service and
 * the UK services around it (bookkeeping, VAT and Corporation Tax, payroll).
 * Every figure below was read from gov.uk, Companies House guidance or
 * legislation.gov.uk on 27 September 2026 and is recorded in
 * research/findings.jsonl under the ids named in each guide's comment.
 *
 * ── Two corrections these pages are built around ──
 *
 * The incorporation fee doubled on 1 February 2026, from £50 to £100 online,
 * having already been raised on 1 May 2024. Anything written between those
 * two dates quotes the wrong number with complete confidence.
 *
 * And 18 November 2025 was not an identity verification deadline. Companies
 * House says so in terms: it began a 12-month transition, and an existing
 * director's real deadline is the company's next confirmation statement. A
 * PSC who is not a director runs on a different clock again, set by their
 * birth month.
 */

/**
 * Guide: registering a UK company from Pakistan.
 *
 * Findings: ch-incorporation-fee-100, ch-nonresident-director-rules,
 * ch-registered-office-appropriate-address, ch-sic-condensed-list,
 * ch-psc-definition-and-offence, hmrc-ct-utr-activation-abroad,
 * fa2004-s55-three-month-notice, cta2009-s14-uk-incorporated-resident,
 * uk-company-filing-deadlines, uk-basic-bank-account-consumers-only.
 *
 * Deliberately left out: any statement about which banks accept non-resident
 * directors, and any treaty tie-breaker outcome for a UK company managed from
 * Pakistan. Neither was verified.
 */
const UK_COMPANY_FROM_PAKISTAN: Guide = {
  slug: 'uk-company-registration-from-pakistan',
  cluster: 'cross-border',
  title: 'How to Register a UK Company from Pakistan',
  navLabel: 'UK company from Pakistan',
  card: 'Who can be a director, the address rules, the £100 fee that replaced £50 in February 2026, and every filing a UK company owes from its first year.',

  answer:
    'A Pakistani resident can be the sole director and shareholder of a UK private limited company, and the whole registration runs online. What you cannot supply from Pakistan is the registered office: it must be a physical UK address. Companies House charges £100 to incorporate online since 1 February 2026, every director must verify their identity first, and the company then owes a confirmation statement, annual accounts and a Company Tax Return every year.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'The fee doubled in February 2026',
      body: 'Companies House has changed its fees twice in two years. On 1 May 2024 online incorporation became £50 and the confirmation statement £34. On 1 February 2026 they became £100 and £50. Any page written between those two dates quotes figures that are now out of date. The current table: £100 online or through software, £124 on paper, £156 for same-day incorporation through software. The confirmation statement is £50 online and £110 on paper.',
    },

    {
      kind: 'prose',
      heading: 'Who can be a director and a shareholder',
      body: [
        'Nationality and residence are not conditions. The gov.uk guidance says it directly: directors do not have to live in the UK, but the company must have a UK registered office address. A private company needs at least one director, who must be 16 or over, and at least one shareholder, who can be the same person. A company secretary is optional.',
        'So a single Pakistani founder holding 100% of the shares and acting as the only director is a normal, lawful structure. What changed in November 2025 is that the director has to verify their identity with Companies House before the company can be registered at all. That process has its own guide, linked below, because the timetable is the part most people get wrong.',
      ],
    },

    {
      kind: 'table',
      heading: 'The three addresses, and which ones must be in the UK',
      intro:
        'People run these together, and only one of them has to be British.',
      columns: ['Address', 'Must it be in the UK?', 'Is it public?'],
      rows: [
        ['Registered office', 'Yes, a physical address in the same UK nation the company is registered in', 'Yes'],
        ['Director\'s service address', 'No', 'Yes'],
        ['Director\'s and PSC\'s home address', 'No', 'No. It is given to Companies House but not disclosed'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'What an appropriate registered office means',
      body: 'The registered office has to be an "appropriate" address: someone acting for the company will be made aware of post delivered there, and a sender can get confirmation of delivery. A Royal Mail PO Box, or a similar service from another provider, no longer qualifies. An accountant\'s or agent\'s address is fine with their permission, provided it meets the same tests, and a company whose address fails them can be struck off. This matters more for an owner in Pakistan than for anyone else, because HMRC posts the Corporation Tax activation code to the registered office, not to you. The company also needs a registered email address that someone actually reads. It is not published.',
    },

    {
      kind: 'steps',
      heading: 'Registering, in order',
      steps: [
        {
          title: 'Verify every director\'s identity',
          body: 'Each director gets an 11-character Companies House personal code from identity verification, and the registration asks for every director\'s code. Do this first, because nothing else can be filed without it.',
        },
        {
          title: 'Choose the name and check it',
          body: 'Check availability on the Companies House register, and check existing UK trade marks as the gov.uk step-by-step suggests. A name without "Limited" has to be registered by post rather than online.',
        },
        {
          title: 'Pick the SIC code from the condensed list',
          body: 'Companies House uses a condensed version of the ONS SIC 2007 list and warns that a code not on that list may get the filing rejected. Pick the code for what the company will actually do. It can be changed later through the confirmation statement.',
        },
        {
          title: 'Identify the PSCs',
          body: 'A person with significant control is usually anyone with more than 25% of the shares or votes, the power to appoint or remove a majority of directors, or other significant influence or control. Their details go in at incorporation, including a home address that is not published. If there is genuinely no PSC, the company must file a statement saying so: the PSC section cannot be blank.',
        },
        {
          title: 'Prepare the constitution and file',
          body: 'Memorandum, articles and a statement of capital. Online registration costs £100 and usually completes within 24 hours. The company needs its own Government Gateway user ID for this; a personal one cannot be used. A paper IN01 costs £124 and takes 8 to 10 days.',
        },
      ],
    },

    {
      kind: 'prose',
      heading: 'Corporation Tax, the UTR, and the three-month clock',
      body: [
        'Registering online with Companies House usually sets the company up for Corporation Tax at the same time. HMRC then issues a 10-digit Unique Taxpayer Reference; if it has not arrived within 15 working days, it can be requested online.',
        'The clock that matters starts when the company begins to do business, which gov.uk defines broadly: buying, selling, advertising, renting a property or employing someone. That date starts the first accounting period, and section 55 of the Finance Act 2004 requires notice to HMRC no later than three months after it. A company that has registered but not started is usually dormant for Corporation Tax.',
        'When the Corporation Tax service is added to the business tax account, HMRC posts an activation code within 10 days, or 21 days if you live abroad, to the registered office. This is the practical reason the registered office has to be one where someone will open your post and tell you.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'A UK company is UK resident, wherever you run it from',
      body: 'Section 14 of the Corporation Tax Act 2009: a company incorporated in the United Kingdom is UK resident for the purposes of the Corporation Tax Acts, even if another rule of law would place it elsewhere. A UK resident company pays Corporation Tax on all its profits, from the UK and abroad. Running the company from Lahore does not take it outside UK Corporation Tax. Whether Pakistan also regards it as resident when it is managed from Pakistan, and how the treaty would settle that, is a separate question we have not addressed here and which needs advice on your facts.',
    },

    {
      kind: 'table',
      heading: 'What the company files every year',
      intro:
        'Three obligations to two bodies, on three different clocks. A loss, or no trading, does not remove any of them.',
      columns: ['Filing', 'Where', 'Deadline', 'Cost or consequence'],
      rows: [
        ['Confirmation statement', 'Companies House', 'At least every 12 months, up to 14 days after the review period ends', '£50 online. Not filing can mean a fine of up to £5,000 and strike-off'],
        ['Annual accounts', 'Companies House', 'First accounts 21 months after registration, then 9 months after each year end', 'Automatic penalty from £150 to £1,500 by lateness, doubled if late 2 years running'],
        ['Corporation Tax payment', 'HMRC', '9 months and 1 day after the accounting period ends', 'Paid before the return is due'],
        ['Company Tax Return (CT600)', 'HMRC', '12 months after the accounting period ends', 'Due even with a loss or nothing to pay'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Your first year can need two tax returns',
      body: 'The first accounts run from incorporation to the accounting reference date Companies House sets, so they usually cover more than 12 months. A Corporation Tax accounting period can never exceed 12 months. So the first set of accounts can produce two Company Tax Returns and two payment dates. And living abroad is not an excuse: Companies House lists directors living or travelling overseas among the reasons a late-filing appeal may not succeed.',
    },

    {
      kind: 'prose',
      heading: 'The bank account, honestly',
      body: [
        'No step in the gov.uk registration process asks for a bank account, and the company exists without one. Opening one is a separate matter decided by the bank.',
        'The statutory right to a basic bank account under the Payment Accounts Regulations 2015 belongs to consumers, which the Regulations define as natural persons acting outside their trade or business. A company has no equivalent entitlement. Whether a given bank or payment provider will onboard a company whose only director lives in Pakistan is its own commercial and anti-money laundering decision, and it varies by provider and changes over time. We do not publish a list, because nothing we could cite would keep it accurate.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Pakistan has its own questions about this company',
      body: 'Everything above is UK law. A resident of Pakistan who owns a UK company also has to ask whether they were permitted to acquire a foreign shareholding under the State Bank\'s Foreign Exchange Manual, which treats individuals and Pakistani companies very differently, and whether the shareholding must be declared to FBR in a foreign income and assets statement. Both are covered in the related guides below. Being lawfully registered in the UK answers neither.',
    },
  ],

  faqs: [
    {
      question: 'Can a Pakistani citizen register a company in the UK?',
      answer:
        'Yes. Directors do not have to live in the UK and there is no nationality requirement for directors or shareholders. The company needs a physical UK registered office, at least one director aged 16 or over who has verified their identity with Companies House, and at least one shareholder, who can be the same person.',
    },
    {
      question: 'How much does it cost to register a UK company?',
      answer:
        'The Companies House fee is £100 online or through software, £124 on paper, and £156 for same-day incorporation through software. These took effect on 1 February 2026. The previous online fee, from 1 May 2024, was £50, so older pages quoting that figure are out of date.',
    },
    {
      question: 'Can I use my Pakistan address as the registered office?',
      answer:
        'No. The registered office must be a physical address in the UK, in the same nation the company is registered in, and must be an appropriate address where post will reach someone acting for the company. Your Pakistan address can be your service address, and your home address is given to Companies House without being published.',
    },
    {
      question: 'Can I use a PO Box as the registered office?',
      answer:
        'No. Companies House no longer accepts a Royal Mail PO Box or a similar service from another provider. An accountant\'s or agent\'s address can be used with their permission if it meets the appropriate-address tests.',
    },
    {
      question: 'What is a SIC code and which one do I choose?',
      answer:
        'It identifies what the company does. Choose from the condensed SIC 2007 list Companies House publishes, since a code outside it may get the filing rejected. It can be changed later through the confirmation statement.',
    },
    {
      question: 'When do I have to register for Corporation Tax?',
      answer:
        'Online incorporation usually sets up Corporation Tax at the same time. Separately, section 55 of the Finance Act 2004 requires notice to HMRC within three months of the start of the first accounting period, which begins when the company starts to do business.',
    },
    {
      question: 'Is a UK company owned from Pakistan taxed in the UK?',
      answer:
        'Yes. Section 14 of the Corporation Tax Act 2009 makes every UK-incorporated company UK resident for Corporation Tax, and a UK resident company pays Corporation Tax on its worldwide profits, however it is managed.',
    },
    {
      question: 'Do I need a UK bank account to register the company?',
      answer:
        'No. Registration does not require one. Opening a business account afterwards is at the bank\'s discretion; the statutory right to a basic account applies only to consumers, not companies.',
    },
    {
      question: 'What does a UK company have to file every year?',
      answer:
        'A confirmation statement to Companies House at least every 12 months (£50 online), annual accounts to Companies House, and a Company Tax Return to HMRC with the tax paid 9 months and 1 day after the period ends. All three are due even if the company made a loss.',
    },
  ],

  publishedAt: '2026-10-06T07:00:00Z',

  cta: {
    heading: 'Forming a UK company from Pakistan?',
    body:
      'We handle incorporation, the registered office requirements, identity verification and Corporation Tax registration, and then keep the confirmation statement, accounts and CT600 on a written calendar.',
    buttonLabel: 'Talk to us about UK company formation',
    href: '/contact?service=uk-company-formation',
  },
  related: [
    'companies-house-identity-verification-from-pakistan',
    'can-a-pakistani-company-own-a-foreign-entity',
    'us-llc-foreign-asset-declaration',
    'receiving-money-from-abroad',
  ],

  seo: {
    title: 'Register a UK Company from Pakistan (2026 Guide)',
    description:
      'How a Pakistani resident forms a UK limited company: the £100 fee since February 2026, registered office rules, PSCs, Corporation Tax and yearly filings.',
  },
};

/**
 * Guide: Companies House identity verification for directors and PSCs in
 * Pakistan.
 *
 * Findings: ch-idv-mandatory-18-nov-2025, ch-idv-two-routes-and-documents,
 * ch-idv-consequences-s167m.
 *
 * Deliberately left out: the amount of any identity verification financial
 * penalty (not stated in any source read), whether any given Pakistani
 * passport is biometric, and whether the One Login app route works in
 * practice for Pakistani passports. The guide tells the reader how to check
 * rather than asserting either.
 *
 * Note for content/services/uk.ts: that file says existing directors must
 * verify "by 18 November 2026 or at their next confirmation statement,
 * whichever comes first". Companies House ties the director deadline to the
 * next confirmation statement and calls the 12 months a transition. The effect
 * for a director is the same; the wording here follows the source.
 */
const CH_IDENTITY_VERIFICATION: Guide = {
  slug: 'companies-house-identity-verification-from-pakistan',
  cluster: 'cross-border',
  title: 'Companies House Identity Verification from Pakistan',
  navLabel: 'Companies House ID verification',
  card: 'Who must verify, when your own deadline actually falls, the two routes open to someone in Pakistan, and what happens if you do not.',

  answer:
    'Since 18 November 2025 every director and person with significant control of a UK company must verify their identity with Companies House, wherever they live. From Pakistan you can do it free online through GOV.UK One Login with a biometric passport, or through an Authorised Corporate Service Provider. An existing director\'s deadline is the company\'s next confirmation statement, which cannot be filed until every director has verified.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: '18 November 2025 was a start date, not a deadline',
      body: 'Companies House says it in bold: "This date is not a deadline. It marks the start of a 12-month transition period." Your own deadline depends on your role and on when you took it. For an existing director it is the company\'s next confirmation statement filed from that date. For an existing PSC who is not a director it is a 14-day window at the start of their birth month. Pages that give one date for everybody are describing a timetable that does not exist.',
    },

    {
      kind: 'list',
      heading: 'Who has to verify',
      intro:
        'The requirement comes from the Economic Crime and Corporate Transparency Act 2023, which inserted it into the Companies Act 2006. It applies to people, whatever their nationality or residence.',
      items: [
        'Every director of a UK company, and the equivalent in other entities, including LLP members',
        'Every director of an overseas company registered in the UK',
        'Every person with significant control (PSC), broadly anyone with more than 25% of the shares or votes',
        'Authorised Corporate Service Providers, before they can register as agents',
        'Not yet: people who file for a company, limited partnerships, corporate directors, corporate LLP members and officers of corporate PSCs. Companies House says these will follow at a later date',
      ],
    },

    {
      kind: 'table',
      heading: 'When your deadline falls',
      intro:
        'Each role runs on its own clock. If you are both director and PSC of the same company, you provide your code separately for each role.',
      columns: ['Your position', 'When you must provide your personal code'],
      rows: [
        ['Director of an existing company', 'In the company\'s next confirmation statement filed from 18 November 2025'],
        ['New director, appointed from 18 November 2025', 'In the appointment filing'],
        ['Director of a new company', 'In the incorporation filing, for every director'],
        ['Existing PSC who is also a director', 'Within 14 days starting the day after the confirmation statement date. Filing the statement early does not move this window'],
        ['Existing PSC who is not a director', 'Within the first 14 days of your birth month. Born 22 January, your window opens 1 January'],
        ['PSC added after 18 November 2025', 'When first added to the register, or within 14 days of it'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The confirmation statement is the lock',
      body: 'Companies House: "Your company will be unable to file its confirmation statement unless all its directors are verified." That turns a personal obligation into a company one. A single unverified director living abroad stops the whole company filing its annual statement, and a missed confirmation statement carries its own fine and strike-off risk. Companies House says it emails companies before the statement is due to remind them.',
    },

    {
      kind: 'steps',
      heading: 'Route one: verify yourself with GOV.UK One Login',
      intro:
        'Free, online, and the route Companies House describes first. From Pakistan, the practical version is the app with your passport.',
      steps: [
        {
          title: 'Check your passport is biometric and in date',
          body: 'One Login accepts a biometric passport from any country. A biometric passport has a small rectangular chip symbol on the front cover. An expired passport cannot be used in the app. The other options Companies House lists, UK bank details or a UK Post Office, are offered to people who live in the UK, so a Pakistan resident should expect the passport route.',
        },
        {
          title: 'Create a GOV.UK One Login with your own email address',
          body: 'An email address can only be used once to verify an identity, so do not use a shared company inbox or your accountant\'s. You will also need your current address and the year you moved in. Answer the questions about yourself, not your company.',
        },
        {
          title: 'Complete the check and collect your personal code',
          body: 'On success you receive an 11-character Companies House personal code. It is yours, not the company\'s, and you use the same code for every company where you are a director or PSC. Since 8 July 2026 it is also emailed to you; otherwise it is under "Manage account" in your Companies House account.',
        },
        {
          title: 'Connect the code to each role',
          body: 'Verifying is only the first of two steps. As a director, the code goes into the confirmation statement or appointment filing. As a PSC, you file it through the "Provide identity verification details for a PSC" service, which is also where you can request a 14-day extension, before the deadline passes.',
        },
      ],
    },

    {
      kind: 'prose',
      heading: 'Route two: an Authorised Corporate Service Provider',
      body: [
        'An ACSP is an agent, usually an accountant, solicitor or formation agent, that has registered with Companies House and is supervised by a UK anti-money laundering body. Companies House says you can use one from any country, and that the agent may charge. You give them your full name, home address, email address and identity evidence; Companies House then emails your personal code to the address they supply, usually within a few hours, so make sure it is one you control.',
        'An ACSP checking documents by a person rather than by technology needs two documents: two photo documents, or one photo document and one supporting document. Someone who does not live in the UK must provide at least one government-issued document. A passport counts as a photo document, and can be up to 18 months expired on this route. Supporting documents include a birth or marriage certificate, a bank statement or a utility bill for your current address. The ACSP must keep copies for 7 years.',
        'One visible difference: when an ACSP verified you, the public register shows the ACSP\'s name and its anti-money laundering supervisors alongside your name and the verification date.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Never post or email documents to Companies House',
      body: 'Companies House accepts only these two routes and tells people not to send identity documents to it directly. It also warns against letting anyone else use your identity to set up or run a company: someone who does can take on debt in your name, and you remain legally responsible.',
    },

    {
      kind: 'prose',
      heading: 'What happens if you do not verify',
      body: [
        'Section 167M of the Companies Act 2006, in force since 18 November 2025, makes it an offence for an individual to act as a director unless their identity is verified, and a separate offence for the company and every officer in default to allow it. PSCs who do not comply may also be committing an offence.',
        'Companies House\'s published enforcement approach starts with a default letter once the due date passes and then has three main routes: prosecution, referral to the Insolvency Service, and financial penalties at company or individual level. It says it is likely to treat a case as serious where there are three or more offences in five years. It also says it will publish a note against an unverified person\'s name on the register, and that an unverified person will be unable to be appointed as a new director or to register a new company.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Your contracts still stand',
      body: 'A point worth knowing before panicking: section 167M(6) says the only consequences of acting unverified are the offences in that section, and that a contravention does not in any way affect the validity of the director\'s acts. Invoices issued and contracts signed by an unverified director remain valid. The exposure is criminal and regulatory, not contractual, which is a reason to fix it promptly rather than a reason to leave it.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'If something outside your control stops you',
      body: 'Companies House will consider a written representation within the timeframe it gives you, where the circumstances were exceptional and tied to the due date. If accepted, enforcement is usually paused for up to two months. Its own example is a serious IT failure with no other way to file. A PSC can separately request a 14-day extension before the deadline, and Companies House has discretion to grant up to 14 days.',
    },
  ],

  faqs: [
    {
      question: 'Do I need to verify my identity if I live in Pakistan?',
      answer:
        'Yes. The requirement applies to every director and PSC of a UK company regardless of where they live. Companies House offers online verification through GOV.UK One Login with a biometric passport from any country, or verification through an Authorised Corporate Service Provider, which it says can be used from any country.',
    },
    {
      question: 'What is the deadline for Companies House identity verification?',
      answer:
        'It depends on your role. An existing director provides their personal code in the company\'s next confirmation statement filed from 18 November 2025. An existing PSC who is not a director does it in the first 14 days of their birth month. New directors and new companies do it at appointment or incorporation.',
    },
    {
      question: 'Can I use my Pakistani passport?',
      answer:
        'For the GOV.UK One Login app it must be a biometric passport, marked with a small rectangular chip symbol on the cover, and it must not be expired. If yours is not biometric, an ACSP can verify you using a passport plus a second document, and a passport up to 18 months expired is acceptable on that route.',
    },
    {
      question: 'How much does identity verification cost?',
      answer:
        'Verifying through GOV.UK One Login is free. An Authorised Corporate Service Provider may charge for doing it on your behalf.',
    },
    {
      question: 'What is a Companies House personal code?',
      answer:
        'An 11-character code issued once you have verified. It is personal to you, and you reuse the same code for every company where you are a director or PSC. You need it to file the confirmation statement, to be appointed as a director and to complete your PSC verification.',
    },
    {
      question: 'What happens if a director does not verify?',
      answer:
        'Acting as a director while unverified is an offence under section 167M of the Companies Act 2006, for the director and for the company and its officers in default. The company also cannot file its confirmation statement. Companies House may prosecute, refer to the Insolvency Service or issue financial penalties.',
    },
    {
      question: 'Are contracts signed by an unverified director invalid?',
      answer:
        'No. Section 167M(6) states that the only consequences are the offences and that a contravention does not affect the validity of the director\'s acts.',
    },
    {
      question: 'I am both director and PSC. Do I verify twice?',
      answer:
        'You verify once and get one personal code, but you must provide it separately for each role: in the confirmation statement as director, and through the PSC service within 14 days starting the day after the confirmation statement date.',
    },
    {
      question: 'Can I send my documents to Companies House by post or email?',
      answer:
        'No. Companies House accepts only GOV.UK One Login or an Authorised Corporate Service Provider, and tells people not to post or email identity documents to it.',
    },
  ],

  publishedAt: '2026-10-07T03:00:00Z',

  cta: {
    heading: 'A director or PSC in Pakistan who has not verified yet?',
    body:
      'We will work out each person\'s actual deadline from the register, take them through verification, and file the codes in the confirmation statement and PSC service before the dates pass.',
    buttonLabel: 'Get your directors verified',
    href: '/contact?service=uk-company-formation',
  },
  related: [
    'uk-company-registration-from-pakistan',
    'can-a-pakistani-company-own-a-foreign-entity',
    'overseas-pakistani-tax-obligations',
  ],

  seo: {
    title: 'Companies House ID Verification from Pakistan',
    description:
      'How UK company directors and PSCs living in Pakistan verify identity with Companies House: real deadlines by role, One Login or an ACSP, and the s.167M offence.',
  },
};

export const UK_GUIDES: Guide[] = [UK_COMPANY_FROM_PAKISTAN, CH_IDENTITY_VERIFICATION];
