import type { Guide } from './types';

/**
 * US filings a Pakistani founder makes in their own name: the ITIN and the
 * USPTO trademark. Both sit in the cross-border cluster alongside the US LLC
 * guides, and both are the reference pages behind the `itin-application` and
 * `us-trademark-registration` services.
 *
 * ── The corrections that lead ──
 *
 * ITIN: owning a US LLC is not, by itself, a reason to need an ITIN. The
 * LLC's Form 5472 runs on the LLC's EIN, and the owner's own US number is
 * asked for "if any", with a self-assigned reference ID number where there is
 * none (f5472-owner-itin-not-required). And the IRS processing time for an
 * application filed from overseas is 9 to 11 weeks all year, not 7 weeks off
 * peak (irs-w7-processing-overseas).
 *
 * Trademark: the US-attorney rule turns on DOMICILE, which for a company is
 * its principal place of business (37 CFR 2.2(o), (p)). A Wyoming LLC run from
 * Lahore is foreign-domiciled, so forming one does not get round the rule
 * (uspto-domicile-principal-place). And an IPO Pakistan mark cannot anchor
 * Amazon Brand Registry, because Pakistan has no Amazon store
 * (amazon-brand-registry-eligibility).
 *
 * ── Deliberately left out ──
 *
 * The five-year dependency of a Madrid registration on its basic mark, and
 * the current status of the USPTO's 2019 pre-publication waiver for Madrid
 * applicants, could not be confirmed from a fetched primary source. Neither
 * is stated. Nor is any claim about the firm's own turnaround.
 */

const ITIN_FROM_PAKISTAN: Guide = {
  slug: 'itin-from-pakistan',
  cluster: 'cross-border',
  title: 'Getting an ITIN From Pakistan: Who Actually Needs One',
  navLabel: 'ITIN from Pakistan',
  card: 'Why owning a US LLC does not by itself mean you need an ITIN, the Form W-7 reasons and exceptions, the three ways to apply, and the wait the IRS quotes for overseas applicants.',

  answer:
    'You need an ITIN only if you have a US federal tax purpose and cannot get a Social Security Number: typically a personal US return to file, or a treaty rate to claim. Owning a US LLC is not, on its own, that purpose. The LLC\'s Form 5472 runs on the LLC\'s EIN, and the owner\'s number is asked for only "if any". From Pakistan, the IRS says to allow 9 to 11 weeks.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'An ITIN is not part of forming or keeping a US LLC',
      body: 'Worth settling first, because the two numbers are easily run together. A foreign-owned single-member LLC files Form 5472 behind a pro forma Form 1120, and the only identifying number that return needs is the LLC\'s own EIN, entered at item B. For the foreign owner, the Form 5472 instructions ask for a US identifying number "if any". Where there is none, the LLC assigns the owner a reference ID number of its own, which needs no application to the IRS, and enters the owner\'s foreign tax identification number or "None". Getting the EIN does not need an ITIN either: the Form SS-4 instructions tell a responsible party with no SSN or ITIN to write "foreign" on line 7b. An ITIN becomes necessary when you personally have something to file or claim, which is a separate question from owning the company.',
    },

    {
      kind: 'prose',
      heading: 'What an ITIN is, and what it is not',
      body: [
        'An ITIN is a nine-digit number the IRS issues to an individual who is required for federal tax purposes to have a US taxpayer identification number but does not have, and is not eligible for, a Social Security Number. The IRS test is short: you need one if you have a federal tax purpose and you are not eligible for an SSN.',
        'It is issued for federal tax purposes only. The IRS states that it does not qualify you for Social Security benefits, does not provide or change immigration status, does not authorise you to work in the US, and does not serve as identification outside the federal tax system. It identifies you, the person. The EIN identifies the company. They are not substitutes for each other.',
      ],
    },

    {
      kind: 'table',
      heading: 'Who needs one, and who does not',
      intro:
        'The IRS defines a federal tax purpose as being required to file a US federal income tax return, filing one to claim a refund or report income, being claimed as a spouse or dependent for an allowable tax benefit, or having to provide a taxpayer number for another federal tax purpose.',
      columns: ['Situation', 'ITIN?'],
      rows: [
        ['You own a foreign-owned single-member US LLC and file Form 5472 for it', 'Not for that filing. It runs on the LLC\'s EIN'],
        ['You are applying for the LLC\'s EIN', 'No. Write "foreign" on Form SS-4 line 7b'],
        ['You must file a personal US return (Form 1040-NR) to report income or claim a refund', 'Yes, reason b'],
        ['You are claiming a reduced treaty rate on US income paid to you, where an ITIN is required', 'Yes, reason a, together with box h and Exception 1 or 2'],
        ['You are married to a US citizen or resident and electing to file jointly', 'Yes, reason e'],
        ['You are eligible for an SSN, for example with a US work visa', 'No. Apply for the SSN instead'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'A return full of zeros does not create a reason',
      body: 'Attaching a nil return to the W-7 does not create the tax purpose. The IRS says so on its ITIN page: generally, a tax return that contains all zero entries will not show a federal tax purpose, and in that case you do not need to file a return or apply for an ITIN. If the only thing the return does is carry the application, it does not do that job either.',
    },

    {
      kind: 'list',
      heading: 'The W-7 reasons a Pakistani applicant actually uses',
      intro:
        'Form W-7 has eight reason boxes, a to h, and one must be checked even on a renewal. Most boxes cover US residents, dependants and students. These are the ones that fit someone living in Pakistan.',
      items: [
        'a. Nonresident alien required to get an ITIN to claim a tax treaty benefit. Must be paired with box h and the exception that applies, with the treaty country and article number entered',
        'b. Nonresident alien filing a US federal tax return, to report income or only to claim a refund. A complete non-US address is required on line 3',
        'e. Spouse of a US citizen or resident alien, including a nonresident spouse electing to file jointly',
        'h. Other. Used with one of the five exceptions below when no return is attached, or with a detailed written reason and supporting documents where nothing else fits',
      ],
    },

    {
      kind: 'list',
      heading: 'The five exceptions, where no tax return is attached',
      intro:
        'A first-time application must go with the US federal tax return the ITIN is needed for, unless one of these exceptions applies. Each is claimed on the line next to box h, by number, sub-letter and category.',
      items: [
        'Exception 1: passive income such as partnership, interest, annuity or rental income that is subject to third-party withholding or covered by treaty benefits. The instructions are explicit that if you are required to file a federal tax return, you are not eligible for Exception 1',
        'Exception 2: claiming treaty benefits on wages, salary, compensation, honoraria, scholarships, fellowships, grants or gambling income, or receiving taxable scholarship income without a treaty claim',
        'Exception 3: interest on a home mortgage for US property you own, where the lender reports it',
        'Exception 4: the disposition of a US real property interest by a foreign person, which is generally subject to withholding by the buyer',
        'Exception 5: a non-US representative of a foreign corporation who needs an ITIN to meet its e-filing requirement under Treasury Decision 9363',
      ],
    },

    {
      kind: 'list',
      heading: 'Supporting documents',
      intro:
        'Every application, new or renewal, must prove identity and foreign status, using originals or copies certified by the agency that issued them.',
      items: [
        'A valid passport is the only document that works on its own. With it, nothing else from the IRS list is needed',
        'Without a passport, at least two documents from the IRS list of thirteen, at least one with a photograph. A national identity card qualifies only if it shows name, photograph, address, date of birth and an expiry date',
        'Documents must be current when submitted. For postal applications the postmark generally fixes that date',
        'Name, date of birth and country of citizenship must match what is on the W-7',
        'A notarised copy is not a certified copy. Certification comes from the issuing agency, or from officers at a US embassy or consulate, which the instructions say to contact in advance because services vary by country',
        'The IRS may later ask for a certified translation of any document not in English',
      ],
    },

    {
      kind: 'table',
      heading: 'The three ways to apply, and what happens to your passport',
      intro:
        'This is the choice that matters most from Pakistan, because the postal route means the IRS holds whatever originals you send until processing is done.',
      columns: ['Route', 'How it works', 'Your passport'],
      rows: [
        ['By post or courier to the IRS in Austin', 'W-7, the return or exception documents, and originals or certified copies, sent together', 'Originals are posted to the US and returned by post. The instructions say to call if they have not come back within 60 days'],
        ['Certifying Acceptance Agent', 'An IRS-authorised agent checks your documents and sends the application to the IRS', 'Verified and returned to you immediately. The original never leaves your hands'],
        ['IRS Taxpayer Assistance Center', 'In person at a designated IRS office, by appointment only, booked on 844-545-5640', 'Verified and returned immediately. Only practical if you are in the United States'],
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'An Acceptance Agent is not a Certifying Acceptance Agent',
      body: 'The IRS runs two kinds of agent and the names are close enough to be confused in a sales conversation. A Certifying Acceptance Agent can authenticate your passport and hand it straight back, receives copies of your ITIN notices, and can work with the IRS to resolve problems with the application. A plain Acceptance Agent helps complete the form, but must still send the IRS your originals or certified copies from the issuing agency, so your passport goes in the post exactly as if you had filed yourself. The IRS acceptance agent list includes Pakistan among the countries with agents abroad. Ask which kind you are dealing with before handing anything over.',
    },

    {
      kind: 'list',
      heading: 'Where to send it',
      intro:
        'From the IRS instructions for Form W-7, revised December 2024. Re-check them against the current revision before posting anything.',
      items: [
        'By post: Internal Revenue Service, ITIN Operation, P.O. Box 149342, Austin, TX 78714-9342',
        'By courier (the IRS calls these private delivery services): Internal Revenue Service, ITIN Operation, Mail Stop 6090-AUSC, 3651 S. Interregional, Hwy 35, Austin, TX 78741-0000',
        'If a return goes with the application, it goes to this address as well. The instructions say not to use the mailing address printed in the return\'s own instructions, such as Form 1040-NR, because the return is processed as part of the application package',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'From Pakistan the wait is 9 to 11 weeks, all year',
      body: 'Seven weeks is the headline figure, and it is not the one that applies from Pakistan. The IRS instructions say to allow 7 weeks for the IRS to notify you of the application\'s status, and 9 to 11 weeks if you apply during peak processing, 15 January to 30 April, OR if you are filing from overseas. The second limb is the one that applies to almost every reader of this page, and it applies in every month, not just in peak season. If nothing has arrived by the end of that period, the IRS number for callers outside the US is 267-941-1000, which is not toll free.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'You cannot e-file with a new ITIN in the year it is issued',
      body: 'The instructions state that you cannot electronically file a return using an ITIN in the calendar year the ITIN is assigned, and that includes prior-year returns. The return that goes with the application is posted with it anyway, but any other return you need to file that year also goes on paper. You do not need an ITIN to request an extension on Form 4868 or to make estimated tax payments: in both cases you write "ITIN TO BE REQUESTED" where the number is asked for, and you do not attach a W-7.',
    },

    {
      kind: 'prose',
      heading: 'Expiry and renewal',
      body: [
        'An ITIN that has not been included on at least one US federal tax return for three consecutive tax years expires on 31 December of the third of those years. An ITIN issued before 2013 that has never been renewed also needs renewing before it goes on a return.',
        'You renew only if the number is going onto a tax return. An expired ITIN can still be used on information returns that others file about payments to you, such as a Form 1099. Renewal uses the same Form W-7 with "Renew an existing ITIN" checked, a reason box still checked, your existing ITIN and the name it was issued under on line 6f, and generally the return you are filing attached. The same documents are required as for a first application.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Do I need an ITIN to own a US LLC from Pakistan?',
      answer:
        'Not for that reason alone. The LLC\'s Form 5472 and pro forma Form 1120 run on the LLC\'s EIN. The Form 5472 instructions ask for the owner\'s US identifying number only "if any", and otherwise use a reference ID number the LLC assigns itself. You need an ITIN if you personally have a US return to file or a treaty benefit to claim.',
    },
    {
      question: 'Do I need an ITIN to get an EIN?',
      answer:
        'No. The Form SS-4 instructions tell a responsible party who has no SSN or ITIN and is ineligible for one to write "foreign" on line 7b. The online EIN application is not available to applicants outside the US, so the EIN is obtained by phone, fax or post.',
    },
    {
      question: 'How long does an ITIN take from Pakistan?',
      answer:
        'The IRS says to allow 9 to 11 weeks for an application filed from overseas, whatever the time of year. Seven weeks is the figure for a domestic application outside the 15 January to 30 April peak.',
    },
    {
      question: 'Do I have to post my original passport to the IRS?',
      answer:
        'Not if a Certifying Acceptance Agent authenticates it, because a CAA verifies the passport and returns it immediately. A copy certified by the issuing agency is also accepted. Posting originals is the default for the direct route, and the IRS returns them by post.',
    },
    {
      question: 'Can I apply for an ITIN without a tax return?',
      answer:
        'Only under one of the five exceptions listed in the W-7 instructions, claimed on the line next to box h: passive income with third-party withholding or treaty benefits, other treaty-covered income, reported US mortgage interest, US real property dispositions, and Treasury Decision 9363. Otherwise the application goes with the return the ITIN is needed for.',
    },
    {
      question: 'Will a nil return get me an ITIN?',
      answer:
        'Generally not. The IRS states that a tax return containing all zero entries will not show a federal tax purpose, and that in that case you do not need to file a return or apply for an ITIN.',
    },
    {
      question: 'Where do I mail Form W-7?',
      answer:
        'By post to Internal Revenue Service, ITIN Operation, P.O. Box 149342, Austin, TX 78714-9342, or by courier to ITIN Operation, Mail Stop 6090-AUSC, 3651 S. Interregional, Hwy 35, Austin, TX 78741-0000. An attached return goes to the same address, not the one in the return\'s own instructions.',
    },
    {
      question: 'When does an ITIN expire?',
      answer:
        'When it has not appeared on a US federal tax return for three consecutive tax years, on 31 December of the third year. An ITIN issued before 2013 and never renewed also needs renewing. You only renew when the number is going onto a tax return.',
    },
    {
      question: 'Does an ITIN let me work in the US or open a US bank account?',
      answer:
        'It does not authorise work, provide or change immigration status, or qualify you for Social Security benefits, and the IRS says it does not serve as identification outside the federal tax system. Whether a bank accepts it is the bank\'s own policy, not an IRS rule.',
    },
  ],

  publishedAt: '2026-10-04T07:00:00Z',

  cta: {
    heading: 'Not sure you need an ITIN at all?',
    body:
      'Owning an LLC is not, by itself, a reason to apply. We check your reason against the W-7 before anything is prepared, and use a certification route that keeps your passport in Pakistan.',
    buttonLabel: 'Ask about an ITIN application',
    href: '/contact?service=itin-application',
  },
  related: ['us-llc-annual-compliance', 'us-llc-foreign-asset-declaration', 'can-a-pakistani-company-own-a-foreign-entity'],

  seo: {
    title: 'ITIN From Pakistan: Form W-7, Documents and Timing',
    description:
      'Who in Pakistan actually needs an ITIN, why a US LLC owner often does not, the W-7 reasons and exceptions, the three ways to apply, and the 9 to 11 week wait.',
  },
};


const US_TRADEMARK_FROM_PAKISTAN: Guide = {
  slug: 'us-trademark-from-pakistan',
  cluster: 'cross-border',
  title: 'Registering a US Trademark From Pakistan',
  navLabel: 'US trademark from Pakistan',
  card: 'Why a US LLC does not get you round the US-attorney rule, the USPTO fees and surcharges since January 2025, the Madrid route through IPO Pakistan, and what Amazon Brand Registry will accept.',

  answer:
    'Apply to the USPTO through a US-licensed attorney, which 37 CFR 2.11 has required of every applicant domiciled outside the US since 3 August 2019. A company\'s domicile is where it is run from, so a US LLC managed from Pakistan is caught too. The base fee is USD 350 per class, plus surcharges of USD 100 to 200 per class for an incomplete or free-text application.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'Forming a US LLC does not make you US-domiciled',
      body: 'A common assumption is that filing in the name of your Wyoming or Delaware LLC gets round the attorney rule. It does not. 37 CFR 2.2(o) defines the domicile of a company as its principal place of business, and 2.2(p) defines that as the headquarters where the senior executives or officers ordinarily direct and control its activities. A registered agent\'s address in Wyoming is not where anyone directs anything. If you run the LLC from Lahore or Karachi, its principal place of business is in Pakistan and the rule applies to it exactly as it applies to you.',
    },

    {
      kind: 'prose',
      heading: 'The attorney requirement',
      body: [
        '37 CFR 2.11(a): an applicant, registrant or party to a proceeding whose domicile is not located within the United States or its territories must be represented by an attorney qualified to practise before the USPTO. The rule took effect on 3 August 2019. The USPTO states in the same provision that it cannot help you choose one.',
        'Leaving the attorney out also costs money at filing. The base application requirements in 37 CFR 2.22(a)(19) include, for a foreign-domiciled applicant, the designated attorney\'s name, postal address, email address and bar information. An application missing any base requirement pays the USD 100 per class surcharge under 2.22(b), on top of the office action demanding the attorney anyway.',
      ],
    },

    {
      kind: 'table',
      heading: 'USPTO fees since 18 January 2025',
      intro:
        '37 CFR 2.6 as in force in September 2026, per class of goods or services, filed electronically. The structure came from the USPTO\'s fiscal year 2025 fee rule, effective 18 January 2025, which replaced the old two-tier application with one base fee plus surcharges.',
      columns: ['Item', 'Fee per class'],
      rows: [
        ['Application, base fee', 'USD 350'],
        ['Surcharge: base application information missing', 'USD 100'],
        ['Surcharge: goods and services not taken from the ID Manual', 'USD 200'],
        ['Surcharge: each further 1,000 characters of free-text description beyond the first 1,000', 'USD 200'],
        ['Statement of use, or amendment to allege use (intent-to-use applications)', 'USD 150'],
        ['Six-month extension to file the statement of use', 'USD 125'],
        ['Madrid (section 66(a)) application received on or after 18 February 2025', 'USD 600'],
        ['Paper application', 'USD 850'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The surcharges are optional, if the application is drafted for them',
      body: 'Every surcharge is triggered by something in the application rather than by the mark. Picking goods and services from the USPTO\'s ID Manual inside the electronic form avoids the USD 200; a free-text description adds it, and a long free-text description adds USD 200 more for each further 1,000 characters. Supplying the full base information, including the attorney\'s details, avoids the USD 100. A class drafted in free text and missing base information costs USD 650 instead of USD 350 before anyone has examined it, and more again if the description runs long.',
    },

    {
      kind: 'table',
      heading: 'The filing bases',
      intro:
        '37 CFR 2.34. The basis decides what you must show and when. Section 1(a) and 1(b) cannot both be claimed for the same goods, and a Madrid basis cannot be combined with any other.',
      columns: ['Basis', 'What it rests on', 'What you must supply'],
      rows: [
        ['1(a) use in commerce', 'The mark is already in use in US commerce', 'Dates of first use anywhere and in commerce, and a specimen per class'],
        ['1(b) intent to use', 'A bona fide intention to use the mark in US commerce', 'A verified statement now; a statement of use with a specimen before registration'],
        ['44(e) foreign registration', 'A registration in your country of origin, such as an IPO Pakistan registration', 'A copy or certification of the foreign registration, and a verified intention to use'],
        ['44(d) foreign priority', 'A foreign application filed within the previous six months', 'The priority claim, and a section 1 or 44(e) basis before publication'],
        ['66(a) Madrid', 'An international registration designating the United States', 'The declaration of intention to use, made in the international application'],
      ],
    },

    {
      kind: 'prose',
      heading: 'Intent to use, and the clock that starts later',
      body: [
        'A 1(b) application lets you file before you have sold anything in the US, and it is examined and published like any other. The registration issues only after you file a statement of use, with a specimen, showing the mark in use on everything you intend to keep in the application.',
        'The deadline runs from the notice of allowance, not from filing. 37 CFR 2.88 gives six months from that notice. 2.89 allows a first six-month extension on request, then further six-month extensions on a showing of good cause, not totalling more than 24 months. So the longest the window can run is 36 months from the notice of allowance. Miss it and the application is abandoned.',
      ],
    },

    {
      kind: 'list',
      heading: 'Specimens: what the USPTO accepts',
      intro:
        '37 CFR 2.56. One specimen per class, showing the mark as actually used in commerce on the goods or services listed.',
      items: [
        'For goods: the mark on the goods, their containers or packaging, labels or tags attached to them, or a display associated with the goods that is point-of-sale in nature',
        'For services: the mark used in selling, performing or advertising the services, with a direct association between the mark and the services',
        'A web page must show its URL and the date it was accessed or printed',
        'Not acceptable: an artist\'s rendering, a printer\'s proof, a computer illustration, a digital image or similar mockup of how the mark may be displayed. A designed box that has never shipped is exactly this',
      ],
    },

    {
      kind: 'prose',
      heading: 'The Madrid route through IPO Pakistan',
      body: [
        'Pakistan acceded to the Madrid Protocol with effect from 24 May 2021, according to WIPO\'s information notice on the accession. A Pakistani national, or anyone with a domicile or business in Pakistan, can therefore file an international application through IPO Pakistan as the office of origin and designate the United States in it.',
        'Three conditions shape whether that is the better route. You need a basic mark first: a Pakistani application or registration for the same mark. The goods and services in the international registration can be narrower than the basic mark but never broader. And the USPTO charges more per class for a Madrid designation, USD 600 against USD 350 for a direct filing, although the response period for an office action is six months rather than three.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Madrid does not remove the attorney requirement',
      body: 'It postpones it. When the USPTO made the rule in 2019 it said in terms that foreign-domiciled applicants filing under section 66(a) are also subject to the requirement to appoint a US attorney. Because an international application filed with WIPO has no place to name a US attorney, the USPTO said it would not insist on one before publication for a Madrid application that needed no correction at all. The moment an examiner raises an issue that has to be answered, the requirement is back, and a response has to be filed through the USPTO\'s electronic system by someone entitled to sign it.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'A Pakistani filing can give you six months of priority',
      body: 'Pakistan has been party to the Paris Convention since 22 July 2004. Under section 44(d), a US application filed within six months of your first Pakistani application for the same mark can claim that earlier filing date. That is useful when you have filed at IPO Pakistan and only later decided on the US: the priority date is what counts against anyone who files the same name in the US in between.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Amazon Brand Registry will not accept an IPO Pakistan mark',
      body: 'Amazon\'s published requirement is a pending or registered trademark for your brand name or logo, issued by the designated government trademark office of a country with a corresponding Amazon store. Pakistan is not among the countries in Amazon\'s store list, so a Pakistani registration, however valid in Pakistan, does not qualify. A USPTO application does. Three other conditions from the same page: you must be the trademark owner, not an agent; the mark must be a word mark or a design mark containing words, letters or numbers, matching the brand name you enrol; and the brand name must appear on a logo permanently affixed to the products or packaging. A purely pictorial logo with no lettering is not enough.',
    },

    {
      kind: 'list',
      heading: 'After registration: the dates that keep it alive',
      intro:
        '37 CFR 2.160 and 2.182. Miss them and the registration is cancelled or expires, whatever the mark is worth.',
      items: [
        'A declaration of continued use between the fifth and sixth anniversaries of registration',
        'A further declaration of use, and a renewal application, in the year before the end of each ten-year period after registration',
        'A six-month grace period after each deadline, with a surcharge per class',
        'Office actions during examination must be answered within three months, extendable once by three months for a fee, or within six months for a Madrid application',
      ],
    },
  ],

  faqs: [
    {
      question: 'Do I need a US attorney to register a trademark from Pakistan?',
      answer:
        'Yes. 37 CFR 2.11 requires every applicant domiciled outside the United States to be represented by a US-qualified attorney, and has since 3 August 2019. Filing without one also puts the application outside the base fee, adding a USD 100 per class surcharge.',
    },
    {
      question: 'Can I avoid the US attorney rule by filing through my US LLC?',
      answer:
        'Not if you run the LLC from Pakistan. The USPTO defines a company\'s domicile as its principal place of business, the headquarters where its officers direct and control it, so an LLC managed from Pakistan is foreign-domiciled under 37 CFR 2.2.',
    },
    {
      question: 'How much does a US trademark cost in USPTO fees?',
      answer:
        'USD 350 per class to file electronically, plus USD 100 per class if base information is missing and USD 200 per class if the goods are described in free text instead of chosen from the ID Manual. An intent-to-use application adds USD 150 per class for the statement of use.',
    },
    {
      question: 'Can I register before I sell anything in the US?',
      answer:
        'Yes, on an intent-to-use basis under section 1(b). The registration issues after you file a statement of use with a specimen, due six months after the notice of allowance and extendable in six-month steps up to 36 months in total.',
    },
    {
      question: 'Is Pakistan a member of the Madrid Protocol?',
      answer:
        'Yes, since 24 May 2021. A Pakistani applicant with a Pakistani application or registration can file an international application through IPO Pakistan designating the United States. The USPTO fee for a Madrid designation is USD 600 per class.',
    },
    {
      question: 'Does my Pakistani trademark protect my brand in the US?',
      answer:
        'No. It can support a US application, either as a registration under section 44(e) or, within six months of the Pakistani filing, as a priority claim under section 44(d), because Pakistan is a Paris Convention member. The US right comes only from the US application.',
    },
    {
      question: 'Can I use a mockup of my packaging as a specimen?',
      answer:
        'No. 37 CFR 2.56 excludes artist\'s renderings, printer\'s proofs, computer illustrations and digital mockups. The specimen must show the mark as actually used, such as a photograph of the real label or packaging.',
    },
    {
      question: 'Can I use my IPO Pakistan trademark for Amazon Brand Registry?',
      answer:
        'No. Amazon requires a pending or registered mark issued by the trademark office of a country with an Amazon store, and Pakistan does not have one. A pending or registered USPTO mark qualifies, provided you own it and it contains the brand name as words, letters or numbers.',
    },
    {
      question: 'How long do I have to answer a USPTO office action?',
      answer:
        'Three months from issue, extendable once by three months for USD 125. For an application that came through Madrid, six months.',
    },
  ],

  publishedAt: '2026-10-05T03:00:00Z',

  cta: {
    heading: 'Selling into the US under your own brand?',
    body:
      'The attorney of record is required, the surcharges are avoidable, and the filing basis decides when you can register. We run the clearance, the specification and the filing with a US attorney appointed.',
    buttonLabel: 'Ask about a US trademark',
    href: '/contact?service=us-trademark-registration',
  },
  related: ['trademark-registration-cost', 'us-llc-annual-compliance', 'can-a-pakistani-company-own-a-foreign-entity'],

  seo: {
    title: 'US Trademark From Pakistan: USPTO Rules and Fees',
    description:
      'The US-attorney rule and why a US LLC does not avoid it, USPTO fees and surcharges since 2025, intent to use, Madrid via IPO Pakistan and Amazon Brand Registry.',
  },
};

export const US_FILING_GUIDES: Guide[] = [ITIN_FROM_PAKISTAN, US_TRADEMARK_FROM_PAKISTAN];
