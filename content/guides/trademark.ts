import type { Guide } from './types';

/**
 * Cluster 5: trademark and IP.
 *
 * The SERP told us what to write here. YouTube and Scribd rank on page one for
 * "trademark registration check online pakistan", and the Scribd result is a
 * scraped copy of an old IPO web page. Google is surfacing a document dump of
 * the official source because nobody has written the structured page.
 *
 * Every fee below is read from the gazette notification of 4 March 2019, which
 * substituted the First Schedule to the Trade Marks Rules 2004. That matters
 * because the market carries two separate conflations: TM-11 registration with
 * TM-5 opposition, both Rs 9,000, and renewal mislabelled as TM-13 in a widely
 * syndicated table when the gazette says TM-12.
 */

const TRADEMARK_REGISTRATION: Guide = {
  slug: 'trademark-registration-cost',
  cluster: 'trademark',
  title: 'What a Trademark Actually Costs in Pakistan',
  navLabel: 'Trademark costs',
  card: 'Every official fee from the gazette, why one class is not the whole bill, and the renewal at Rs 15,000 that almost nobody mentions.',

  answer:
    'The official fees for one class are Rs 3,000 to apply on Form TM-1 and Rs 9,000 to register on Form TM-11, so Rs 12,000 before any search or agent cost. A search on TM-55 adds Rs 1,000. Pakistan allows only one class per application, so a mark covering three classes costs three times that. Renewal after ten years is Rs 15,000.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'Two fee errors are circulating widely',
      body: 'The first: TM-11, the registration fee, and TM-5, the opposition fee, both cost Rs 9,000 and get merged into one line. They are unrelated forms. The second: a syndicated fee table labels renewal as TM-13. The gazette says TM-12 is renewal at Rs 15,000 and TM-13 is restoration at Rs 3,000. A third set of figures entirely, quoting Rs 2,000 to apply and Rs 500 to search, appears on several ranking pages and matches no schedule we can find.',
    },

    {
      kind: 'table',
      heading: 'The official fee schedule',
      intro:
        'From the notification of 4 March 2019, effective 9 March 2019, which substituted the First Schedule to the Trade Marks Rules 2004. As at the review date on this page, no later revision has been notified.',
      columns: ['Form', 'What it is for', 'Fee'],
      rows: [
        ['TM-1', 'Application to register a trade mark, one class', 'Rs 3,000'],
        ['TM-55', 'Request for a search under rule 87', 'Rs 1,000'],
        ['TM-5', 'Notice of opposition, per application opposed', 'Rs 9,000'],
        ['TM-6', 'Counter-statement answering an opposition', 'Rs 1,500'],
        ['TM-11', 'Registration of a trade mark', 'Rs 9,000'],
        ['TM-12', 'Renewal under section 35', 'Rs 15,000'],
        ['TM-12', 'Additional fee for late renewal, rule 52(1)', 'Rs 900'],
        ['TM-13', 'Restoration of a removed mark, section 35(6)', 'Rs 3,000'],
      ],
    },

    {
      kind: 'prose',
      heading: 'Why one class is not the whole bill',
      body: [
        'Rule 13 of the Trade Marks Rules 2004 is short and expensive: "Every application for the registration of a trade mark shall be in respect of goods or services in one class only." Pakistan does not permit multi-class applications, so protecting a brand across several classes means several complete applications.',
        'A clothing business that also sells bags and runs a retail service is in three classes. That is three TM-1 filings at Rs 3,000 and three TM-11 registrations at Rs 9,000, so Rs 36,000 in official fees alone, plus Rs 1,000 per search if you search each one first.',
        'Almost every published cost page quotes the Rs 3,000 application fee and stops, which understates the real figure by a factor of four before you have added a single extra class.',
      ],
    },

    {
      kind: 'table',
      heading: 'What it costs by number of classes',
      intro: 'Official fees only, excluding any agent or attorney charge.',
      columns: ['Classes', 'Applications', 'Registrations', 'Total'],
      rows: [
        ['1', 'Rs 3,000', 'Rs 9,000', 'Rs 12,000'],
        ['2', 'Rs 6,000', 'Rs 18,000', 'Rs 24,000'],
        ['3', 'Rs 9,000', 'Rs 27,000', 'Rs 36,000'],
        ['5', 'Rs 15,000', 'Rs 45,000', 'Rs 60,000'],
      ],
    },

    {
      kind: 'steps',
      heading: 'The process, with the statute behind each stage',
      intro:
        'IPO Pakistan sets out the Registry\'s functions against the sections that authorise them. The spine is rule 87, then sections 22, 27, 28, 29, 33 and 35.',
      steps: [
        {
          title: 'Search, under rule 87',
          body: 'On Form TM-55 at Rs 1,000, for one mark in one class. Optional in law and worth doing, because an application that collides with an earlier mark costs you the filing fee to find out.',
        },
        {
          title: 'File, under section 22',
          body: 'Form TM-1 at Rs 3,000, one class. IPO Pakistan and PITB launched online filing in June 2023, so this no longer requires physical documents.',
        },
        {
          title: 'Examination, under section 27',
          body: 'The Registry checks absolute grounds under section 14 and relative grounds under section 17, and issues an examination report. IPO\'s published average for the first report is four months.',
        },
        {
          title: 'Publication, under section 28',
          body: 'An accepted mark is advertised in the Trade Marks Journal, which is where the opposition window opens.',
        },
        {
          title: 'Opposition, under section 29',
          body: 'Two months from advertisement, extendable by the Registrar but not exceeding two months in aggregate. Opposition costs the opponent Rs 9,000 on TM-5; answering costs you Rs 1,500 on TM-6.',
        },
        {
          title: 'Registration, under section 33',
          body: 'After the opposition window closes the Registry issues a demand notice, you file TM-11 with Rs 9,000, and the mark is entered in the register.',
        },
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'You cannot sue before the mark is registered',
      body: 'IPO Pakistan states it plainly: no infringement proceedings may be brought before the mark is in fact registered, and rights take effect from the date of actual registration. Pakistan is also a first-to-file jurisdiction, so long prior use does not automatically defeat someone who filed before you. Those two facts together are the real argument for filing early, and neither is a sales pitch.',
    },

    {
      kind: 'prose',
      heading: 'The free search and the official one are not the same thing',
      body: [
        'IPO Pakistan operates a public search facility and a separate premium search. Either will tell you whether an obviously identical mark exists, and that is worth five minutes before you fall in love with a name.',
        'Neither is the search that rule 87 contemplates. The official search report, requested on TM-55 for Rs 1,000 and delivered in about fifteen days by IPO\'s published average, covers one mark in one class and requires two representations of the mark mounted on strong paper. The free lookup has no statutory standing and does not bind the examiner.',
      ],
    },

    {
      kind: 'table',
      heading: 'The renewal timetable, exactly',
      intro:
        'A registration lasts ten years from the filing date, not from the registration date, and renews indefinitely. The rules set four separate windows and competitors routinely collapse them into one.',
      columns: ['Stage', 'When', 'Rule'],
      rows: [
        ['Registrar sends a reminder', 'Not earlier than 6 months, not later than 1 month, before expiry', 'Rule 50'],
        ['Renewal filed on TM-12', 'Within the six months ending on the expiry date', 'Rule 51'],
        ['Grace period, with the Rs 900 additional fee', 'Six months after expiry', 'Rule 52'],
        ['Restoration on TM-13', 'Within six months of the date of removal', 'Rule 53'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Removal and expiry are different dates',
      body: 'Pages commonly say restoration is available "within twelve months of expiry". Rule 53 runs from the date of removal from the register, which follows the grace period rather than coinciding with expiry. If you are counting from the wrong date you may believe you have longer than you do. IPO also notes that the Registrar may require evidence of use on renewal.',
    },

    {
      kind: 'prose',
      heading: 'Registration is not the end of the obligation',
      body: [
        'Section 73 allows a registration to be revoked if the mark has not been put to bona fide use in Pakistan within five years following completion of the registration procedure, or if such use is suspended for an uninterrupted five years without proper reasons. A mark registered defensively and never used is vulnerable.',
        'Since the Trade Marks (Amendment) Act 2023, revocation on that ground is filed before the Registrar rather than the High Court, except where High Court proceedings on the mark are already pending.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Filing abroad through Madrid',
      body: [
        'Pakistan joined the Madrid Protocol with effect from 24 May 2021, so a Pakistani business can use its national application or registration as the basis for an international one filed through IPO Pakistan as office of origin.',
        'The reverse direction has a wrinkle worth knowing. The domestic chapter giving international registrations effect in Pakistan arrived only with the Trade Marks (Amendment) Act 2023, so inbound designations lacked a clear domestic basis for the first two years. Pakistan also declared an eighteen-month refusal period, requires a declaration of intention to use, and provides that licence recordings in the International Register have no effect in Pakistan: a licence must be recorded nationally.',
      ],
    },

    {
      kind: 'table',
      heading: 'Trademark, copyright or patent',
      intro: 'All three registries sit under IPO Pakistan. They protect different things.',
      columns: ['Right', 'Protects', 'Term', 'Registration'],
      rows: [
        [
          'Trade mark',
          'Brand identifiers that distinguish goods or services',
          '10 years from filing, renewable indefinitely',
          'Required before you can sue',
        ],
        [
          'Copyright',
          'Literary, artistic and musical works',
          'Life of the author plus 50 years',
          'Automatic on creation; registration helps enforcement',
        ],
        ['Patent', 'Inventions', '20 years, subject to annual fees', 'Required'],
      ],
    },
  ],

  faqs: [
    {
      question: 'How much does trademark registration cost in Pakistan?',
      answer:
        'For one class, Rs 3,000 to apply on Form TM-1 and Rs 9,000 to register on Form TM-11, so Rs 12,000 in official fees. An official search on TM-55 adds Rs 1,000. Agent or attorney charges are separate and are not set by the gazette.',
    },
    {
      question: 'Can one trademark application cover several classes in Pakistan?',
      answer:
        'No. Rule 13 of the Trade Marks Rules 2004 requires every application to be in respect of goods or services in one class only. Covering three classes means three separate applications and three registration fees, so Rs 36,000 in official fees.',
    },
    {
      question: 'How much does it cost to renew a trademark in Pakistan?',
      answer:
        'Rs 15,000 on Form TM-12, under section 35. Renewing during the six-month grace period after expiry adds a further Rs 900. Restoration of a mark that has been removed costs Rs 3,000 on Form TM-13.',
    },
    {
      question: 'How long does trademark registration take in Pakistan?',
      answer:
        'IPO Pakistan publishes averages of fifteen days for an acknowledgement, four months to the first examination report, two months to acceptance and publication, and six months to registration where there is no opposition. Practitioners commonly report eighteen months to two years end to end.',
    },
    {
      question: 'How do I check if a trademark is already registered in Pakistan?',
      answer:
        'IPO Pakistan operates a public online search and a separate premium search, either of which will surface an obviously identical mark. Neither is the official search: that is requested on Form TM-55 for Rs 1,000 under rule 87, covers one mark in one class, and takes about fifteen days.',
    },
    {
      question: 'How long is a trademark valid in Pakistan?',
      answer:
        'Ten years from the date of filing, not from the date of registration, and renewable for further ten-year periods indefinitely. Renewal must be filed within the six months ending on the expiry date, with a six-month grace period after expiry on payment of an additional fee.',
    },
    {
      question: 'Do I need a lawyer to register a trademark in Pakistan?',
      answer:
        'Not if you are in Pakistan. Any legal person may apply without appointing a licensed attorney, and online filing has been available since June 2023. An applicant residing outside Pakistan must act through a registered trademark agent or advocate, with a notarised power of attorney.',
    },
    {
      question: 'Can I sue someone for using my trademark before it is registered?',
      answer:
        'No. IPO Pakistan states that no infringement proceedings may be brought before the mark is in fact registered, and that rights take effect from the date of actual registration. Pakistan is a first-to-file jurisdiction, so filing early matters.',
    },
    {
      question: 'What happens if I do not use my registered trademark?',
      answer:
        'Section 73 allows revocation if the mark has not been put to bona fide use in Pakistan within five years following completion of the registration procedure, or if use is suspended for an uninterrupted five years without proper reasons.',
    },
  ],

  publishedAt: '2026-09-12T03:00:00Z',
  related: ['secp-company-registration'],

  seo: {
    title: 'Trademark Registration Cost in Pakistan: Every Official Fee',
    description:
      'The full gazette fee schedule, why one class is not the whole bill under rule 13, the renewal at Rs 15,000 nobody mentions, and the exact renewal and restoration windows.',
  },
};

export const TRADEMARK_GUIDES: Guide[] = [TRADEMARK_REGISTRATION];
