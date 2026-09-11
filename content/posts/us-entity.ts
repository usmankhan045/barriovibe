import type { Post } from './types';

/**
 * Cluster: running a US company from Pakistan.
 *
 * The information space here is dominated by LLC formation vendors, who sell
 * the formation and have no commercial reason to be vivid about what follows
 * it. Every figure in these posts comes from the IRS, FinCEN or the state,
 * and the research brief explicitly excluded vendor sites as sources.
 *
 * The guides already cover the PAKISTANI side of holding a foreign company:
 * section 116A declaration, the State Bank position, the penalties. These
 * cover the US side, which is a different set of obligations with a different
 * calendar, and the two together are the whole picture for a founder.
 */
export const US_ENTITY_POSTS: Post[] = [
  {
    slug: 'us-llc-filings-pakistani-founders-miss',
    cluster: 'us-entity',
    title: 'The US LLC Filing That Carries a $25,000 Penalty, and Cannot Be E-Filed',
    navLabel: 'The $25,000 filing',
    card: 'Form 5472 is due even if the company did nothing, the penalty is $25,000, and the IRS will not accept it electronically.',

    answer:
      'A US LLC with a foreign owner must file Form 5472 with a pro forma Form 1120 every year, and the penalty for not filing is $25,000. It applies even if the company earned nothing: funding the bank account or paying the registered agent is itself a reportable transaction. The IRS will not accept it electronically from a foreign-owned disregarded entity, so it goes by fax or post, which is the detail that catches people who assume they can file online near the deadline.',

    sections: [
      {
        kind: 'prose',
        heading: 'The asymmetry that produces this problem',
        body: [
          'Forming a US LLC is easy, cheap and heavily marketed. What follows it is a filing calendar with real penalties, and it is marketed by nobody, because the people who sell the formation have no reason to be vivid about the consequences of having one.',
          'So the typical Pakistani founder has a company, a bank account, and no clear idea that a filing exists until a year later. Everything below comes from the IRS, FinCEN or the state itself, and deliberately from no formation vendor.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The penalty, in the IRS\'s own words',
        body:
          'From the Instructions for Form 5472: "A penalty of $25,000 will be assessed on any reporting corporation that fails to file Form 5472 when due and in the manner prescribed." It gets worse if ignored: "If the failure continues for more than 90 days after notification by the IRS, an additional penalty of $25,000 will apply... for each 30-day period (or part of a 30-day period) during which the failure continues." And a partial filing does not protect you: "Filing a substantially incomplete Form 5472 constitutes a failure to file Form 5472."',
      },
      {
        kind: 'prose',
        heading: 'It applies even if the company did nothing',
        body: [
          'This is the assumption that costs people money: the company made no sales, so there is nothing to report.',
          'The reporting trigger is not income, it is a reportable transaction between the LLC and its foreign owner, and the regulations define that category broadly enough to include the things every dormant company does. Money moved from you into the company to open the bank account is a transaction. Paying the registered agent from your own funds is a transaction. Contributions to and distributions from the entity are named explicitly.',
          'A genuinely dormant LLC that has never received or sent a single payment may fall outside it. An LLC that was funded, or whose fees you paid, does not.',
        ],
      },
      {
        kind: 'steps',
        heading: 'What the filing actually is',
        intro:
          'Less work than the penalty implies, which is what makes missing it so expensive. The IRS documents each step.',
        steps: [
          {
            title: 'A pro forma Form 1120, mostly blank',
            body:
              'The IRS is specific: "The only information required to be completed on Form 1120 is the name and address of the foreign-owned U.S. DE and items B and E on the first page." You also write "Foreign-owned U.S. DE" across the top. It is not a corporate tax return, and filing it does not make the LLC taxable as a corporation.',
          },
          {
            title: 'Form 5472 attached to it',
            body:
              'This reports the transactions between the LLC and you as its foreign owner. It is the substantive part, and it is the one carrying the penalty.',
          },
          {
            title: 'Filed by fax or post only',
            body:
              'The IRS states plainly: "If you are a foreign-owned U.S. DE, you cannot file Form 5472 electronically." Fax to 855-887-7737, or post to the Ogden, Utah address in the instructions. Assuming you can e-file on the deadline is the most common way this goes wrong.',
          },
          {
            title: 'By the 15th day of the fourth month after year end',
            body:
              'For a calendar-year LLC that is 15 April. An extension to 15 October is available on Form 7004, and the instructions warn that these entities must not use the regular Form 7004 address.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'The BOI report you no longer have to file',
        body: [
          'This one changed, twice, and most of what you will read about it is out of date in a way that creates unnecessary alarm.',
          'FinCEN issued a final rule published on 14 August 2026 that "permanently removes the requirement for U.S. companies and U.S. persons to report beneficial ownership information to FinCEN under the Corporate Transparency Act". Its guidance now states that "U.S. companies are exempt from the Beneficial Ownership Information (BOI) reporting requirements" and that "only certain foreign companies registered to do business in the U.S. must report BOI".',
          'For a Pakistani founder the answer is therefore clean: a Wyoming, New Mexico or Delaware LLC is formed under US state law, so it is not a reporting company and files nothing. Your nationality is irrelevant to this test. What matters is where the entity was formed, not who owns it.',
          'The narrow case where it would still bite is the reverse shape: a company formed outside the United States that then registers to do business in a US state. That is a different structure from the one most founders have.',
          'An earlier interim rule from March 2025 reached the same practical outcome. The August 2026 rule makes it permanent, so if you are reading guidance that cites the interim rule, or worse the original 2024 regime with its deadlines and penalties, it is describing a world that no longer exists.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Getting the EIN without a US tax number',
        body: [
          'The online EIN application is closed to you: the IRS states that if "your principal place of business is outside the U.S.", you "apply by phone, fax or mail". That is not a workaround to route around, it is the documented process.',
          'Fax from outside the US goes to 304-707-9471, and the IRS says processing is "generally within 4 business days". By post it is "approximately 4 weeks". There is also an international phone line on 267-941-1099, which is not toll-free.',
          'The line that stops most applications is 7b, asking for the responsible party\'s tax number when you do not have one. The instructions answer it directly: "Enter foreign or N/A on line 7b if the responsible party doesn\'t have and is ineligible to obtain an SSN or ITIN."',
          'And to clear up a persistent confusion: the EIN belongs to the company, the ITIN belongs to you. They are not substitutes and you do not need both by default. You need an ITIN when you personally have a US tax purpose, most commonly a personal return or a treaty claim. Filing the pro forma 1120 and 5472 for the LLC does not itself require you to hold one.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'There is a US-Pakistan tax treaty, whatever you have read',
        body:
          'The claim that no treaty exists is common and wrong. The IRS list of tax treaties in effect includes Pakistan: TIAS 4232, with a general effective date of 1 January 1960. The likely source of the error is that the US Treasury\'s treaty page does not list it, because that page carries treaties signed after 1996 and this one was signed in 1957. The honest qualification is that a treaty from 1960 predates most modern treaty design, so it has no limitation-on-benefits article and none of the reduced withholding rates a recent treaty would carry. It exists. Whether it helps in your situation is a separate question worth asking properly.',
      },
      {
        kind: 'table',
        heading: 'What the state wants each year',
        intro:
          'From each state\'s own materials. These are the ongoing state obligations, separate from anything federal.',
        columns: ['State', 'Annual obligation', 'Notes'],
        rows: [
          ['Delaware', '$400 annual tax, due 1 June', 'No annual report required. Late penalty $200 plus 1.5% interest monthly'],
          ['New Mexico', 'No annual report, no annual fee', 'Registered agent and office still required, and lapsing risks revocation'],
          ['Wyoming', 'Not stated here', 'We could not reach any Wyoming state server to verify it, so we are not quoting a figure'],
        ],
      },
      {
        kind: 'prose',
        body: [
          'Delaware\'s shape surprises people: a flat $400 tax and no annual report, which is the reverse of the usual assumption. New Mexico genuinely has neither, confirmed from the LLC Act itself rather than from the state website, whose relevant pages return errors. But no annual report is not no obligation: the registered agent and registered office requirements continue, and letting them lapse can get the company administratively revoked.',
          'On Wyoming we are going to be unhelpful on purpose. Every Wyoming state server was unreachable from our network, and rather than copy a figure from a formation vendor we are telling you we could not check it. Wyoming\'s own Secretary of State is the place to confirm it.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What this post is not telling you',
        body: [
          'Whether you owe US income tax. That depends on whether your income is effectively connected to a US trade or business, which turns on facts this post cannot see. Having a US LLC does not by itself create a US tax liability, and does not by itself avoid one.',
          'The 30 percent withholding figure you may have read also needs care. The IRS states that "most types of U.S. source income received by a foreign person are subject to U.S. tax of 30%", reducible by treaty. But for a disregarded single-member LLC there is no separate distribution to withhold on, because you are treated as earning the income directly. The 30 percent is not a tax on moving money from your LLC to your own account, and it is widely misdescribed that way.',
          'And none of this covers the Pakistani side, which is a whole separate set of obligations: the foreign asset declaration, the State Bank position on holding a foreign company, and penalties of their own. Those are in the guides, where they are maintained against the Ordinance.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Do I have to file if my LLC made no money?',
        answer:
          'Almost certainly yes. The trigger is a reportable transaction with the foreign owner, not income, and that includes funding the company, contributions and distributions. An LLC you put money into to open a bank account has had a reportable transaction even if it never traded.',
      },
      {
        question: 'Can I file Form 5472 online?',
        answer:
          'No. The IRS states that a foreign-owned US disregarded entity cannot file Form 5472 electronically. It goes by fax to 855-887-7737 or by post to Ogden, Utah. Discovering this on 14 April is a bad way to discover it.',
      },
      {
        question: 'Does my Pakistani-owned US LLC need to file a BOI report?',
        answer:
          'No. A final rule published on 14 August 2026 permanently removed the requirement for US-formed companies, and FinCEN now states that only certain foreign companies registered to do business in the US must report. An LLC formed in a US state is not a reporting company, whoever owns it.',
      },
      {
        question: 'Is there a tax treaty between the US and Pakistan?',
        answer:
          'Yes. The IRS lists Pakistan among treaties in effect, TIAS 4232, effective 1 January 1960. It is one of the oldest still operative, so it lacks modern provisions including a limitation-on-benefits article, but the frequent claim that no treaty exists is simply wrong.',
      },
      {
        question: 'Do I need an ITIN as well as an EIN?',
        answer:
          'Not by default. The EIN is the company\'s number and the ITIN is yours. You need an ITIN when you personally have a US federal tax purpose, such as your own return or a treaty claim. Filing the LLC\'s pro forma 1120 with Form 5472 does not itself require one.',
      },
    ],

    publishedAt: '2026-10-07T03:00:00Z',

    sources: [
      {
        label: 'IRS Instructions for Form 5472',
        url: 'https://www.irs.gov/instructions/i5472',
        readOn: '2026-09-11',
        supports: 'The $25,000 penalty, the continuation penalty, the pro forma 1120 mechanics and the e-filing prohibition. Revised 12/2024.',
      },
      {
        label: 'FinCEN, beneficial ownership information',
        url: 'https://www.fincen.gov/boi',
        readOn: '2026-09-11',
        supports: 'That US companies are exempt and only certain foreign companies must report, under the final rule published 14 August 2026.',
      },
      {
        label: 'IRS Instructions for Form SS-4',
        url: 'https://www.irs.gov/instructions/iss4',
        readOn: '2026-09-11',
        supports: 'The fax and post routes for international applicants and the line 7b answer where there is no SSN or ITIN. Revised 12/2025.',
      },
      {
        label: 'IRS Table 3, List of Tax Treaties',
        url: 'https://www.irs.gov/pub/irs-lbi/table-3-list-of-tax-treaties.pdf',
        readOn: '2026-09-11',
        supports: 'Pakistan\'s entry among treaties in effect, TIAS 4232, effective 1 January 1960.',
      },
      {
        label: 'IRS, NRA withholding',
        url: 'https://www.irs.gov/individuals/international-taxpayers/nra-withholding',
        readOn: '2026-09-11',
        supports: 'The 30 percent general rule on US-source income to foreign persons and its reduction by treaty.',
      },
      {
        label: 'Delaware Division of Corporations, alternative entity tax',
        url: 'https://corp.delaware.gov/alt-entitytaxinstructions/',
        readOn: '2026-09-11',
        supports: 'The $400 annual tax, the 1 June due date, the late penalty, and that no annual report is required.',
      },
    ],

    limits: [
      'Wyoming is deliberately absent. Every Wyoming state server was unreachable from our network at connection level, and we would rather leave a gap than repeat a figure from a formation vendor.',
      'This does not tell you whether you owe US income tax. That turns on whether your income is effectively connected to a US trade or business, which is a facts question.',
      'The ITIN guidance is the IRS\'s general principle applied to an LLC owner. The IRS states the principle but publishes no LLC-owner-specific guidance, so treat the application as reasoning rather than as IRS wording.',
      'Nothing here covers the Pakistani side of owning a foreign company, which carries its own declaration requirements and penalties. That is in the guides.',
      'Tax filing rules change annually. Every document here is cited with its revision date.',
    ],

    cta: {
      heading: 'Have a US LLC and no idea what is due?',
      body: 'We handle US federal and state filings for Pakistani founders, and the Pakistani side of the same structure, which is usually the half nobody mentioned. If you have had the company for a while and never filed, that is a conversation worth having sooner.',
      buttonLabel: 'Sort out the filings',
      href: '/contact?service=us-federal-state-tax-filing',
    },

    related: ['app-store-rejection-what-actually-blocks-you'],

    seo: {
      title: 'The US LLC Filing With a $25,000 Penalty',
      description:
        'Form 5472 is due even if your LLC did nothing, carries a $25,000 penalty, and cannot be e-filed. What Pakistani founders actually owe, from the IRS rather than vendors.',
    },
  },
];
