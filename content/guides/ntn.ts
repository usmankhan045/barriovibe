import type { Guide } from './types';

/**
 * Cluster 3: NTN registration.
 *
 * The SERP shape here is unusual and it decides the content. FBR's own portal
 * ranks first on most of these queries, which satisfies the navigational
 * intent and answers nothing underneath it: a person searching "ntn
 * registration requirements" wants a document list and gets a login form.
 *
 * So this guide is not a link to IRIS. It is the answer FBR's own pages do not
 * give, assembled from FBR's own documents: what it costs (nothing), what you
 * attach (usually nothing), and the step where most people stop without
 * realising they have not finished.
 */

const HOW_TO_GET_NTN: Guide = {
  slug: 'how-to-get-an-ntn',
  cluster: 'ntn',
  title: 'How to Get an NTN in Pakistan: The Free, 15-Minute Version',
  navLabel: 'How to get an NTN',
  card: 'Registration is free, a salaried person attaches no documents, and the step most people miss is the one that actually completes it.',

  answer:
    'Registration costs nothing. FBR charges no fee for a National Tax Number: the statutory fee was removed when the Finance Act 2008 replaced Part IX of the Ordinance. If you hold a CNIC, that number is already your NTN under section 181(4), but holding one does not register you. Registration means submitting Form 181 in IRIS, and a salaried person with no business attaches no documents at all.',

  sections: [
    {
      kind: 'note',
      tone: 'info',
      heading: 'Registered, filed, and on the list are three different things',
      body: 'Registration under section 181 gives you a National Tax Number. Filing a return under section 114 is a separate act. The Active Taxpayer List is built from who has filed. People conflate all three, and the conflation is why someone who registered years ago is surprised to be paying non-filer rates.',
    },

    {
      kind: 'prose',
      heading: 'What it costs',
      body: [
        'Nothing, and this is provable rather than merely asserted. The Ordinance as originally enacted did carry a fee: the old section 181(2) said an application "shall be accompanied by the prescribed fee". The Finance Act 2008 substituted Part IX in its entirety, and the replacement section 181 contains no fee provision at all.',
        'FBR\'s own list of requirements before registration names no fee, and its step-by-step IRIS guide has fourteen steps and no payment step among them. If you are quoted a price for getting an NTN, that is a consultant\'s service charge for doing the typing, not a government charge.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Is your CNIC your NTN?',
      body: [
        'Yes, and this is one of the few places where the popular shorthand is exactly right. Section 181(4), inserted by the Finance Act 2015, reads: "From tax year 2015 and onwards, in case of individuals having Computerized National Identity Card issued by the National Database and Registration Authority, CNIC shall be used as National Tax Number."',
        'What it does not mean is that you are registered. The number exists; your record in FBR\'s system does not until you create it. That distinction is the single most common misunderstanding on this subject, and it is why a person who has held a CNIC for twenty years can still be a non-filer.',
      ],
    },

    {
      kind: 'list',
      heading: 'What you need before you start',
      intro:
        'Four things, and the second one stops more registrations than the other three combined.',
      items: [
        'Your original CNIC',
        'A mobile SIM registered against your own CNIC. Not your father\'s, not your spouse\'s. FBR verifies this against NADRA in real time.',
        'A personal email address you can access now, because a PIN and then a password arrive there',
        'A certificate of maintenance of a personal bank account in your own name',
      ],
    },

    {
      kind: 'steps',
      heading: 'Registering as an individual',
      intro:
        'FBR publishes this as fourteen steps. These are the ones where something can go wrong.',
      steps: [
        {
          title: 'Choose the right link',
          body: 'On the IRIS login page, "Registration for Unregistered Person" is for people with no NTN. "E-Enrollment for Registered Person" is for people who already have an NTN but no IRIS login. Picking the wrong one is a common first failure.',
        },
        {
          title: 'Fill the new registration dialog',
          body: 'CNIC, name, current mobile service provider, cell number, email, and a captcha. FBR shows the cell format as 00923211234567: country code, no plus sign.',
        },
        {
          title: 'Verify both PINs',
          body: 'One arrives by SMS and one by email. Enter both. On success IRIS emails and texts you a password.',
        },
        {
          title: 'Log in with your CNIC',
          body: 'The login field is labelled "Registration No", and what goes in it is your CNIC. This confuses almost every first-time user.',
        },
        {
          title: 'Open Draft, then Registration',
          body: 'In the left panel, click Draft. You will see a task called "181 (Form of Registration filed voluntarily)". Select it and click Edit.',
        },
        {
          title: 'Complete and submit Form 181',
          body: 'The form arrives pre-populated. Add your address and anything missing, attach documents only if you have a business, and submit. This is the step that completes registration.',
        },
        {
          title: 'Check Completed Tasks after five minutes',
          body: 'FBR\'s own instruction. You are looking for "181 (Order to grant / refuse registration on application)". Until that appears, you are not registered.',
        },
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The step where most people stop without finishing',
      body: 'FBR states it plainly: "just after login you cannot file Tax Return unless the registration process is completed by submitting the registration application". Creating the IRIS account and seeing a dashboard feels like completion. It is not. If you never opened Draft and submitted Form 181, you have an IRIS login and no registration.',
    },

    {
      kind: 'prose',
      heading: 'What documents you actually attach',
      body: [
        'For a salaried person with no business: nothing. FBR\'s registration guide lists exactly three attachments at step 13, and every one is marked "business individuals only": a business letterhead, a paid utility bill for the business premises not older than three months, and evidence of tenancy or ownership of those premises.',
        'This is worth stating loudly because the long universal document checklists published elsewhere are the main reason salaried people conclude the process is beyond them and pay someone to do it. If you have no business, the attachments tab stays empty.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'FBR\'s two pages do not quite agree',
      body: 'The IRIS guide asks a salaried individual to upload nothing. FBR\'s separate "requirements before registration" page lists an original certificate of maintenance of a personal bank account among the things an individual needs. Both are FBR. The practical reading is that IRIS enforces one set at the upload step and a facilitation counter may ask for the other, so have the bank certificate available even though the form will not demand it. Whichever you are asked for, the name on it has to match your CNIC exactly.',
    },

    {
      kind: 'table',
      heading: 'Requirements by taxpayer type',
      intro: 'From FBR\'s published requirements. The last column is the one that surprises people.',
      columns: ['Taxpayer', 'Key requirements', 'Can register online?'],
      rows: [
        ['Salaried individual', 'CNIC, own-CNIC SIM, email, bank account certificate', 'Yes, fully'],
        [
          'Business individual',
          'The above plus premises evidence and a recent paid utility bill',
          'Yes, fully',
        ],
        [
          'Association of persons',
          'Partnership deed, Registrar of Firms certificate, all partners\' CNICs, authorisation letter signed by all partners',
          'No, RTO visit',
        ],
        [
          'Company',
          'Incorporation certificate, all directors\' CNICs, letter on company letterhead signed by all directors naming the principal officer',
          'No, RTO visit',
        ],
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Companies and associations cannot finish online',
      body: 'FBR is explicit: an individual can register through the IRIS portal, but the principal officer of an association or a company must visit the Regional Tax Office. Pages promising online company NTN registration in ten minutes are describing something FBR does not offer. There is one exception worth knowing: if you are incorporating a company through SECP, the NTN is issued automatically under the SECP and FBR one-window facility, so you may not need to register separately at all.',
    },

    {
      kind: 'list',
      heading: 'Checking an NTN or your status',
      intro: 'All official routes. The syntax differs by taxpayer type, which trips people up.',
      items: [
        'Send ATL followed by a space and your 13-digit CNIC to 9966, for an individual',
        'Send ATL followed by a space and the 7-digit NTN to 9966, for an association or company',
        'Send AJKATL instead of ATL if you are in Azad Jammu and Kashmir, whose list has been at par since the Finance Act 2018',
        'Use FBR\'s online Active Taxpayer List status page, or its taxpayer profile inquiry, for a browser check',
        'Download the full Active Taxpayer List from FBR if you need to check many people at once',
      ],
    },

    {
      kind: 'prose',
      heading: 'What registration obliges you to do',
      body: [
        'Three duties follow that nobody mentions when they sell you the registration. Section 181C requires a person deriving business income to display the National Tax Number at a conspicuous place at every place of business. Section 181E requires every company and association to file particulars of beneficial owners and to update them on change.',
        'Section 181AA runs the other way and is worth knowing before you need it: an application for a commercial or industrial electricity or gas connection shall not be processed unless the applicant is registered under section 181. Registration is not only a tax matter.',
        'And registration alone does not put you on the Active Taxpayer List. That takes a filed return.',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much does an NTN cost in Pakistan?',
      answer:
        'Nothing. FBR charges no fee for registration. The statutory fee requirement was removed when the Finance Act 2008 substituted Part IX of the Income Tax Ordinance, and the current section 181 contains no fee provision. Any amount you are asked to pay is a private service charge.',
    },
    {
      question: 'Is my CNIC my NTN number?',
      answer:
        'Yes. Section 181(4) provides that from tax year 2015 onwards, a CNIC issued by NADRA shall be used as the National Tax Number for individuals. But holding a CNIC does not mean you are registered with FBR: registration is a separate step, completed by submitting Form 181 in IRIS.',
    },
    {
      question: 'How long does NTN registration take?',
      answer:
        'FBR\'s own guide says to check the Completed Tasks folder in IRIS after five minutes for the order granting or refusing registration. For a straightforward salaried individual the whole process is usually one sitting.',
    },
    {
      question: 'What documents are required for NTN registration?',
      answer:
        'For a salaried individual, none are attached in IRIS. FBR lists three attachments and marks all of them for business individuals only: a business letterhead, a paid utility bill for the business premises not older than three months, and evidence of tenancy or ownership. You will need a CNIC, a SIM registered in your own name, an email address and a bank account certificate to complete the form itself.',
    },
    {
      question: 'Can I register for an NTN with a SIM registered in someone else\'s name?',
      answer:
        'No. FBR requires the mobile number to be registered against the applicant\'s own CNIC and verifies this against NADRA. For a company, the principal officer\'s SIM must additionally not already be registered with FBR against another taxpayer.',
    },
    {
      question: 'How do I register a company for an NTN?',
      answer:
        'Not entirely online. FBR states that the principal officer of a company or an association of persons must visit the Regional Tax Office. If you are incorporating through SECP, the NTN is issued automatically to the company email under the SECP and FBR one-window facility.',
    },
    {
      question: 'How do I check my NTN by CNIC?',
      answer:
        'Send ATL followed by a space and your 13-digit CNIC number to 9966, or use FBR\'s online Active Taxpayer List status page. That confirms your position on the list. FBR\'s taxpayer profile inquiry will confirm the registration itself.',
    },
    {
      question: 'I registered but I am still showing as a non-filer. Why?',
      answer:
        'Because registration and filing are different. The Active Taxpayer List is built from who has filed a return under section 114, not from who holds a National Tax Number. Registering gives you the number; filing puts you on the list.',
    },
    {
      question: 'Do I have to display my NTN at my business?',
      answer:
        'Yes, if you derive income from business. Section 181C requires every such person holding a National Tax Number to display it at a conspicuous place at every place of business.',
    },
  ],

  publishedAt: '2026-09-10T07:00:00Z',
  related: ['filer-vs-non-filer', 'how-to-become-a-filer', 'secp-company-registration'],

  seo: {
    title: 'How to Get an NTN in Pakistan: Free, Step by Step',
    description:
      'NTN registration is free and takes one sitting. The IRIS steps, what a salaried person actually attaches (nothing), and the step most people miss without realising.',
  },
};

/**
 * The documents guide.
 *
 * Separate from the how-to because the searcher is different: one wants the
 * procedure, the other has started and been stopped by a requirement. The
 * substance nobody else covers is that FBR's own two surfaces disagree about
 * the bank certificate, and that FBR simply does not define what counts as
 * evidence of business premises, which leaves anyone working from home without
 * an answer.
 */
const NTN_DOCUMENTS: Guide = {
  slug: 'ntn-registration-documents',
  cluster: 'ntn',
  title: 'What Documents You Need for NTN Registration',
  navLabel: 'NTN documents',
  card: 'By taxpayer type, from FBR\'s own pages, including the two requirements FBR states inconsistently and the one it never defines.',

  answer:
    'A salaried individual uploads nothing in IRIS. A business individual uploads three things: a business letterhead, a paid utility bill for the premises no older than three months, and evidence of tenancy or ownership. Associations and companies need more, and their principal officer must attend a Regional Tax Office in person. Everyone needs a CNIC, a SIM registered in their own name, an email address and a bank account certificate.',

  sections: [
    {
      kind: 'table',
      heading: 'What each taxpayer type needs',
      intro: 'From FBR\'s published requirements. The last column is the one that surprises people.',
      columns: ['Taxpayer', 'Documents', 'Register online?'],
      rows: [
        [
          'Salaried individual',
          'CNIC, SIM on own CNIC, personal email, bank account certificate. No IRIS uploads.',
          'Yes, fully',
        ],
        [
          'Business individual',
          'The above, plus business letterhead, paid utility bill under 3 months old, and tenancy or ownership evidence',
          'Yes, fully',
        ],
        [
          'Association of persons',
          'Partnership deed and registration certificate, CNICs of all partners, authorisation letter signed by all of them, SIM on the authorised person\'s CNIC and not already used with FBR, AOP email, bank certificate in the AOP name',
          'No, RTO visit',
        ],
        [
          'Company',
          'Incorporation certificate, CNICs of all directors, letter on company letterhead signed by all directors naming the principal officer, SIM on his CNIC and not already used with FBR, company email, bank certificate in the company name',
          'No, RTO visit',
        ],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'FBR states the bank certificate requirement two ways',
      body: 'FBR\'s IRIS registration guide lists three attachments and marks all of them "business individuals only", which means a salaried person uploads nothing. FBR\'s separate requirements page lists an original certificate of maintenance of a personal bank account among the things an individual needs. Both are FBR. The practical reading is that IRIS enforces one set at the upload step and a facilitation counter may ask for the other, so have the certificate available even if the form never demands it.',
    },

    {
      kind: 'prose',
      heading: 'The bank account certificate',
      body: [
        'FBR calls it an original certificate of maintenance of a personal bank account in your own name. It is a letter from your branch confirming that an account exists in your name and is operative. Any branch will issue one; what varies is how long they take and whether they charge.',
        'The failure mode worth planning around is not the document, it is the name on it. It has to match your CNIC exactly. An account opened years ago under a slightly different spelling, or without a middle name that your CNIC carries, is the kind of mismatch that sends you back to the bank rather than forward to FBR.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'What FBR never defines',
      body: 'For a business individual, FBR asks for "evidence of tenancy or ownership of business premises" and stops there. It does not say what qualifies. A registered rent agreement or a title document plainly does; a utility bill in your own name is commonly accepted. What FBR has never addressed is the person working from home with no separate premises and no tenancy to evidence, which is a large share of freelancers and consultants. If a page tells you confidently what to submit in that situation, ask where it read that.',
    },

    {
      kind: 'prose',
      heading: 'The SIM rule has no workaround',
      body: [
        'FBR requires the mobile number to be registered against your own CNIC, and verifies it against NADRA. A SIM in a parent\'s or spouse\'s name will not pass, and there is no alternative route: you get your own SIM or you do not register.',
        'For an association or a company there is a second condition that catches people who have done this before. The authorised person\'s SIM must not already be registered with FBR against another taxpayer. An accountant who used his own number for a client\'s registration has spent it.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Overseas Pakistanis and foreign nationals',
      body: [
        'FBR\'s IRIS documentation answers this more clearly than most guides do. The user ID is the thirteen-digit CNIC or NICOP for a Pakistani individual, which means a NICOP holder registers on the same basis as a resident. For a non-Pakistani individual it is a seven-digit NTN, allotted separately rather than derived from an identity card.',
        'What FBR does not address, and we will not guess at, is whether the requirement for a SIM registered against your own CNIC is enforced for someone living abroad with no Pakistani number. That is the practical blocker for overseas registration and it deserves a direct answer from a Regional Tax Office rather than an inference from us.',
      ],
    },

    {
      kind: 'prose',
      heading: 'If you are registering an association, there is a step before this one',
      body: [
        'A partnership must be registered with the Registrar of Firms under section 58 of the Partnership Act 1932 before its registration certificate can be produced to FBR. That is a separate process with a separate authority, and it is provincial: the requirements and fees differ by province.',
        'For Islamabad Capital Territory it runs to a partnership deed on Rs 1,000 stamp paper, an affidavit on Rs 5 stamp paper, a Rs 1,000 fee paid to National Bank under head C-03545, CNICs of all partners and witnesses, everything notarised, with partners appearing in person and the certificate collected about ten days later. Note that Form No. 1 itself is preprinted with a Rs 100 filing fee, which is long out of date.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'One error message, explained',
      body: 'FBR\'s own IRIS documentation records the error "Residence / Head Office / Business Address in Address Tab must be entered before submission" and gives two causes: an address that has not been marked as a residence, and a business address that has not been linked to the business. If you are stuck on it, one of those two is why.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Registering creates an obligation',
      body: 'Section 114(1)(b)(vii) requires a return from any person who has obtained a National Tax Number. Getting one is not a neutral act that only helps you at the bank: it puts you inside the filing regime, and the consequences of not filing then attach.',
    },
  ],

  faqs: [
    {
      question: 'What documents do I need for NTN registration in Pakistan?',
      answer:
        'A salaried individual uploads nothing in IRIS but needs a CNIC, a SIM registered in their own name, a personal email and a bank account certificate. A business individual additionally uploads a business letterhead, a paid utility bill for the premises no older than three months, and evidence of tenancy or ownership.',
    },
    {
      question: 'What is a certificate of maintenance of a bank account?',
      answer:
        'A letter from your branch confirming that an account exists in your name and is operative. Any branch will issue one. The name on it must match your CNIC exactly, which is the most common reason it gets rejected.',
    },
    {
      question: 'What counts as evidence of business premises?',
      answer:
        'FBR asks for evidence of tenancy or ownership without defining it. A registered rent agreement or a title document plainly qualifies. FBR has never addressed the case of someone working from home with no separate premises, so there is no authoritative answer for it.',
    },
    {
      question: 'Can I register for an NTN if my SIM is in my father\'s name?',
      answer:
        'No. FBR requires the number to be registered against your own CNIC and verifies it against NADRA. There is no workaround. For an association or company there is a further condition: the authorised person\'s SIM must not already be registered with FBR against another taxpayer.',
    },
    {
      question: 'Can an overseas Pakistani get an NTN?',
      answer:
        'Yes. FBR\'s IRIS documentation accepts a NICOP as the user ID on the same basis as a CNIC. Whether the requirement for a SIM registered against your own CNIC is enforced for someone with no Pakistani number is not addressed by FBR, so confirm with a Regional Tax Office.',
    },
    {
      question: 'Can a foreign national get an NTN in Pakistan?',
      answer:
        'Yes. FBR allots a separate seven-digit NTN to a non-Pakistani individual rather than deriving the identifier from an identity card. The specific document set is not published, so confirm it with a Regional Tax Office.',
    },
    {
      question: 'Do I need to register my partnership before applying for an AOP NTN?',
      answer:
        'Yes. The partnership registration certificate from the Registrar of Firms under section 58 of the Partnership Act 1932 is among the documents FBR asks for, so that process comes first. It is provincial, so requirements and fees differ.',
    },
    {
      question: 'Does getting an NTN mean I have to file a tax return?',
      answer:
        'Yes. Section 114(1)(b)(vii) requires a return from any person who has obtained a National Tax Number, independently of income level.',
    },
  ],

  publishedAt: '2026-09-14T07:00:00Z',
  related: ['how-to-get-an-ntn', 'filer-vs-non-filer'],

  seo: {
    title: 'NTN Registration Documents: What FBR Actually Requires',
    description:
      'Required documents by taxpayer type from FBR\'s own pages, the bank certificate FBR states two ways, the premises evidence it never defines, and the SIM rule with no workaround.',
  },
};

export const NTN_GUIDES: Guide[] = [HOW_TO_GET_NTN, NTN_DOCUMENTS];
