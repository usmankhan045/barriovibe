import type { Guide } from './types';

/**
 * Cluster 7: cross-border.
 *
 * The flagship, and the clearest case of the convergence wedge in the whole
 * slate. Offshore-LLC formation vendors have every reason not to mention
 * Pakistani exposure, and Pakistani tax firms do not sell foreign company
 * formation, so nobody writes this page.
 *
 * ── Why it leads with the penalty rather than the duty ──
 *
 * "You must file a foreign income and assets statement" is already published
 * in a hundred places and changes nobody's behaviour. The numbers that change
 * behaviour are 2 percent of the asset value per year of default, and the fact
 * that the criminal exposure attaches to ignoring the notice rather than to
 * the original omission. Neither is published anywhere we could find.
 *
 * ── The asymmetry worth noticing ──
 *
 * s.195A gives the taxpayer who ignores a s.116A notice up to one year.
 * s.195B gives the ADVISER who arranged the structure up to seven, and a five
 * million rupee fine. Pakistan punishes the enabler considerably more heavily
 * than the evader on these facts, which is worth stating plainly on a page
 * published by a firm that could be an enabler.
 *
 * All of it read from the consolidation amended to 30 June 2026, then checked
 * against the Finance Act 2026 gazette to confirm none of it moved this year:
 * offshore-regime-fa2026-unchanged.
 */

const US_LLC_FOREIGN_ASSET: Guide = {
  slug: 'us-llc-foreign-asset-declaration',
  cluster: 'cross-border',
  title: 'Your US LLC Is a Declarable Foreign Asset',
  navLabel: 'Declaring a foreign company',
  card: 'What section 116A requires of a Pakistani resident who owns a company abroad, the penalty that runs every year, and the point at which it stops being a filing question.',

  answer:
    'If you are a resident individual with foreign assets worth USD 100,000 or more, or foreign income of USD 10,000 or more, section 116A requires a foreign income and assets statement with your return. A US LLC is a foreign asset. Missing it costs 2% of the value of those assets for each year of default, and ignoring a Commissioner\'s notice about it is a criminal offence rather than a penalty.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'The threshold is on assets, not on income',
      body: 'This is where most people misread section 116A. The two tests are alternatives joined by "or": foreign income of not less than ten thousand United States dollars, OR foreign assets with a value of not less than one hundred thousand US dollars. An LLC that earned nothing this year and holds USD 120,000 in its bank account puts you over the line. So does a dormant company holding property. Reading the section as an income test, and concluding that a quiet year means nothing to file, is the single most common way people end up in default without knowing it.',
    },

    {
      kind: 'prose',
      heading: 'Why a US LLC is caught at all',
      body: [
        'Because residence, not citizenship or location, decides what Pakistan taxes. Section 11 charges a resident on worldwide income, and section 116A requires a statement of foreign assets from a resident individual over the threshold. Nothing in either provision cares where the company was formed or where its customers are.',
        'What people are usually thinking of when they assume otherwise is the US position: a Wyoming or New Mexico LLC owned by a non-US person, with no US-connected activity, often owes no US federal income tax. That can be perfectly true and is entirely beside the point. It answers what America wants and says nothing about what Pakistan wants, and the two questions are decided by different countries under different rules.',
      ],
    },

    {
      kind: 'table',
      heading: 'What the statement itself asks for',
      intro:
        'Section 116A(1) sets out three heads. The second one surprises people, because it reaches transactions rather than balances.',
      columns: ['Head', 'What it covers'],
      rows: [
        ['Assets and liabilities', 'Total foreign assets and liabilities as on the last day of the tax year'],
        ['Transfers', 'Any foreign assets transferred to another person during the year, and the consideration for the transfer'],
        ['Income and expenditure', 'Complete particulars of foreign income and the expenditure wholly and necessarily incurred to derive it'],
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The penalty runs every year, on the asset value',
      body: 'Entry 1AAA of the section 182 penalty table: where a person fails to furnish a foreign income and assets statement within the due date, the penalty is 2 per cent of the foreign income or value of the foreign assets FOR EACH YEAR OF DEFAULT. Read the last five words carefully, because they are what makes this different from an ordinary late-filing penalty. At the USD 100,000 threshold that is USD 2,000 for the first year and it does not stop accruing while the statement is missing. Four quiet years of not filing is not one penalty, it is four. We could find no competitor page that states this figure at all.',
    },

    {
      kind: 'prose',
      heading: 'Where it stops being about money',
      body: [
        'Section 116A(2) lets the Commissioner serve a written notice on an individual who, in his opinion and for reasons recorded in writing, was required to file the statement and did not. That notice is the hinge of the whole regime.',
        'Section 195A: a person who without reasonable excuse fails to comply with a notice under section 116A(2) commits an offence punishable on conviction with imprisonment up to one year, or a fine up to fifty thousand rupees, or both. Note precisely what is criminalised. Not the original failure to file, which sits in the penalty regime described above. Ignoring the notice. That distinction is the most useful thing on this page: a late statement filed voluntarily is an expensive administrative problem, and a notice left unanswered is a different category of problem.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The adviser is exposed more heavily than you are',
      body: 'Section 195B: an enabler who enables, guides or advises any person to design, arrange or manage a transaction or declaration in such a manner which results in offshore tax evasion commits an offence punishable with imprisonment up to seven years, or a fine up to five million rupees, or both. Section 2(38AC) defines an offshore enabler to include anyone who assists or advises in planning or arranging a transaction relating to an offshore asset "which has resulted OR MAY RESULT in tax evasion", so the definition does not wait for evasion to occur. Seven years against the taxpayer\'s one is not an accident of drafting. If a consultant offers you a structure on the basis that Pakistan will not find out, that is the provision they are standing under, and they are standing further out than you are.',
    },

    {
      kind: 'prose',
      heading: 'And it can be published',
      body: [
        'Section 216 makes tax particulars confidential. Sub-sections (6B) and (6C) carve two holes in it: the Board may publish in print and electronic media the names of offshore evaders who have evaded offshore tax of Rs 2.5 million or more, and the names of offshore tax enablers who have enabled offshore tax evasion.',
        'The asymmetry appears a third time here. The evader limb carries a monetary threshold. The enabler limb carries none.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Are you actually resident? Check before you assume either way',
      body: 'Everything above applies to a resident individual, and the residency test catches people in both directions. Section 82(a) makes you resident if present in Pakistan for 183 days or more in aggregate in the tax year. Section 82(d) is the one that surprises people: a citizen of Pakistan is resident if not present in any other single country for more than 182 days during the year, OR is not a resident taxpayer of any other country. Someone splitting the year between three countries, or living somewhere that issues no tax residency certificate, can be resident in Pakistan without spending meaningful time there. Note also that the two figures genuinely differ, 183 in section 82(a) and 182 in section 82(d), and most published summaries quote 182 for both.',
    },

    {
      kind: 'prose',
      heading: 'What to do if you are already behind',
      body: [
        'The honest answer is that this is the point to take advice rather than read a page, and we would say that even if we did not do this work, because the difference between the penalty regime and the criminal one turns on facts about your own case.',
        'What can be said generally: the statement is furnished with the return, so the mechanism for catching up is the same mechanism you would use anyway. The penalty accrues per year of default, so the cost of the delay is a function of time and the exposure grows while nothing happens. And the criminal limb attaches to a notice, which means there is a meaningful difference between acting before one arrives and acting after.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The separate question of whether you could hold it at all',
      body: 'Section 116A is a disclosure obligation and answers only what you must declare. Whether a Pakistani resident or a Pakistani company was permitted to acquire the foreign shareholding in the first place is a State Bank question under the Foreign Exchange Manual, not an FBR one, and the answer differs between an individual and a company. Declaring an asset and being permitted to hold it are separate tests, and satisfying one says nothing about the other.',
    },
  ],

  faqs: [
    {
      question: 'Do I have to declare my US LLC in Pakistan?',
      answer:
        'If you are a resident individual and your foreign assets are worth USD 100,000 or more, or your foreign income is USD 10,000 or more, then yes: section 116A requires a foreign income and assets statement with your return. An LLC is a foreign asset whether or not it distributed anything to you.',
    },
    {
      question: 'What is the threshold for the foreign income and assets statement?',
      answer:
        'Foreign income of not less than USD 10,000, or foreign assets valued at not less than USD 100,000. They are alternatives, so meeting either one triggers the obligation. A company that earned nothing but holds assets over the threshold still counts.',
    },
    {
      question: 'What is the penalty for not declaring foreign assets in Pakistan?',
      answer:
        'Under entry 1AAA of the section 182 penalty table it is 2% of the foreign income or the value of the foreign assets, for each year of default. It accrues annually rather than once, so several years of not filing produce several penalties.',
    },
    {
      question: 'Can you go to jail for not declaring foreign assets in Pakistan?',
      answer:
        'Section 195A makes it an offence to fail, without reasonable excuse, to comply with a Commissioner\'s notice under section 116A(2), punishable with imprisonment up to one year or a fine up to Rs 50,000 or both. The criminal exposure attaches to ignoring the notice, not to the original failure to file, which sits in the penalty regime.',
    },
    {
      question: 'My US LLC pays no US tax. Do I still have to report it in Pakistan?',
      answer:
        'Yes. Those are separate questions decided by different countries. Whether a US LLC owned by a non-US person owes US federal income tax is a matter of US law; whether you must declare it is decided by section 116A, which turns on your residence in Pakistan and the value of the asset.',
    },
    {
      question: 'Does section 116A apply to non-resident Pakistanis?',
      answer:
        'It applies to a resident taxpayer being an individual. The catch is that section 82(d) can make a Pakistani citizen resident even while living abroad, if they were not present in any other single country for more than 182 days or are not a resident taxpayer of any other country. Check your residency before concluding the section does not reach you.',
    },
    {
      question: 'What happens to the consultant who set up my offshore structure?',
      answer:
        'Section 195B makes an enabler who advises or arranges a transaction resulting in offshore tax evasion liable to imprisonment up to seven years or a fine up to Rs 5 million or both, and section 216(6C) allows the Board to publish enablers\' names with no monetary threshold. The adviser\'s exposure is heavier than the taxpayer\'s.',
    },
    {
      question: 'Is declaring my foreign company the same as being allowed to own it?',
      answer:
        'No. Section 116A is a disclosure duty owed to FBR. Whether a resident could lawfully acquire the shareholding is governed by the State Bank\'s Foreign Exchange Manual, and the position differs between individuals and companies. Both questions have to be answered separately.',
    },
  ],

  publishedAt: '2026-09-27',
  related: ['tax-for-freelancers', 'how-to-file-your-tax-return'],

  seo: {
    title: 'Declaring a US LLC in Pakistan: Section 116A',
    description:
      'Why a foreign company is a declarable asset for a Pakistani resident, the 2% per year penalty nobody publishes, and where section 116A stops being a filing question.',
  },
};


/**
 * Guide 19: whether a Pakistani may own a foreign entity.
 *
 * The companion to the s.116A guide, and the half nobody writes. Declaring an
 * asset and being permitted to hold it are separate tests under separate
 * regulators, and the answer differs sharply between a company and an
 * individual.
 *
 * ── The finding that drives the guide ──
 *
 * The 2024 liberalisation that every consultant blog cites is Para 13(II)A,
 * which applies to export-oriented COMPANIES in the IT sector. Para 13(II)D,
 * the individual section, was not liberalised with it, and its three general
 * permissions cover listed shares, employee stock options and sweat equity.
 * None of them covers incorporating your own company abroad, which is exactly
 * what most Pakistani freelancers with a US LLC have done.
 *
 * Stated as a gap rather than as a prohibition: we read the permissions and
 * they do not reach it. We did not read a provision expressly forbidding it,
 * and the guide says so rather than overclaiming in either direction.
 *
 * Read verbatim from Annexure A to FE Circular No. 01 of 11 July 2024.
 */

const FOREIGN_ENTITY_PERMISSION: Guide = {
  slug: 'can-a-pakistani-company-own-a-foreign-entity',
  cluster: 'cross-border',
  title: 'Can a Pakistani Legally Own a Company Abroad?',
  navLabel: 'Owning a company abroad',
  card: 'What the State Bank actually permits, the limits that come with it, and why the answer for a company is not the answer for an individual.',

  answer:
    'A Pakistani company can, within limits set by Para 13 of Chapter 20 of the Foreign Exchange Manual, and the rules were widened for IT exporters in July 2024. A resident individual is in a different position: the general permissions cover listed shares, employee stock options and sweat equity, and none of them covers incorporating your own company abroad. That gap is where most freelancers with a US LLC are sitting.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'This is a State Bank question, not an FBR one',
      body: 'Two regulators ask two different questions about the same foreign company, and satisfying one says nothing about the other. FBR asks whether you declared it: that is section 116A, and the answer is that a resident over the threshold must. The State Bank asks whether you were permitted to acquire it at all, under the Foreign Exchange Manual. It is entirely possible to be fully compliant on the tax side and outside the exchange regulations, and people routinely assume that filing the statement settles both.',
    },

    {
      kind: 'prose',
      heading: 'What changed for IT companies in 2024',
      body: [
        'FE Circular No. 01 of 11 July 2024 revised Para 13(II)A of Chapter 20 to make it easier for export-oriented companies, particularly in the IT sector, to expand abroad. Four changes: a new equity investment category for IT-sector exporters, removal of the requirement to designate a bank in advance where the funds come from an Exporter\'s Special Foreign Currency Account, express permission for IT export companies to acquire a percentage shareholding in an entity abroad rather than only establishing one, and relaxation of the rule limiting a company to one entity per jurisdiction.',
        'That is a genuine liberalisation and it is the reason the question is worth asking again in 2026 if you last looked before it. What it is not is a general opening, and the detail below is where most applications actually turn.',
      ],
    },

    {
      kind: 'table',
      heading: 'The three routes for a company, and what each allows',
      intro:
        'Para 13(II)(A1)(2). Which one applies decides both the ceiling and whether you need to designate a bank first.',
      columns: ['Source of funds', 'How much', 'Prior bank designation'],
      rows: [
        ['Exporter\'s Special Foreign Currency Account', 'Funds available in the account', 'Not required'],
        ['Special Foreign Currency Account holding equity raised from abroad', 'Funds available in the account', 'Not required'],
        ['Neither, for an IT company not yet exporting', 'Average net profit of the last three years, or USD 100,000, whichever is higher', 'Required'],
      ],
    },

    {
      kind: 'list',
      heading: 'The conditions that apply to all three',
      intro:
        'Para 13(II)(A1)(3). The first two are the ones that most often decide an application, and neither appears in the secondary coverage of the 2024 circular.',
      items: [
        'Total investment abroad must not exceed 80% of the company\'s equity, after adjusting for investments in subsidiaries and associates, goodwill, deferred tax assets and receivables from related entities, for a non-listed company',
        'The foreign business must be of a similar nature to what the applicant already does in Pakistan. An extended line of business or vertical integration counts as similar; an unrelated venture does not',
        'Operational expenses of a marketing, liaison or representative office abroad are capped at USD 30,000 a year from the second year, with increases of up to 10% a year on justification',
        'More than one entity in a single jurisdiction requires justification to the satisfaction of the Authorized Dealer',
        'An acquisition of an unlisted company above USD 1 million requires a valuation report from an accredited business valuation firm in the target country',
        'Past performance counts: previous investments abroad are weighed on profit repatriation and increase in exports when a new request is assessed',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The individual position is genuinely different',
      body: 'Para 13(II)(D) grants a resident individual general permission for exactly three things. Investment in shares of LISTED companies abroad, capped at USD 25,000 a calendar year and at 1% of the investee. Participation in an employee stock option plan of a foreign parent, capped at USD 50,000 a year and 3%. And sweat equity, shares issued for your own efforts and services without monetary consideration, capped at 20% and requiring the agreement to go to the State Bank. Read the list for what is absent: there is no general permission for a resident individual to incorporate or acquire a private company abroad. That is precisely what a freelancer forming a US LLC in their own name has done, and it is not covered by any of the three.',
    },

    {
      kind: 'prose',
      heading: 'What we are and are not saying about that gap',
      body: [
        'We are saying the general permissions do not reach it. We read Para 13(II)(D) and its three categories do not describe forming your own company abroad, and the 2024 liberalisation that consultants cite applies to Para 13(II)A, which is about companies rather than individuals.',
        'We are not saying it is prohibited, because we did not read a provision expressly prohibiting it, and the difference between "not generally permitted" and "prohibited" is real: the framework contemplates prior State Bank permission for cases outside the general permissions. What follows practically is that this is a question to put to your bank\'s designated branch or to take advice on, and not one to resolve by reading a formation vendor\'s FAQ.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The startup flip has its own route, with three hard limits',
      body: 'Para 13(II)(A2)(b) permits a Pakistani startup to put a holding company above its operating company abroad, which is the structure investors usually ask for. Three cumulative eligibility tests: the Pakistani company must be a private limited or unlisted public company incorporated for not more than 7 years and not formed by splitting up or reconstruction, with annual revenue below PKR 2 billion since incorporation, and equity including retained earnings below PKR 300 million per its latest audited accounts. The holding company must then repatriate at least 80% of funds raised abroad annually until USD 1 million, and at least 50% annually thereafter until USD 10 million cumulative, net of dividends the operating company sent up. No money may be remitted from Pakistan for the share transfer.',
    },

    {
      kind: 'list',
      heading: 'What you owe after the investment is made',
      intro:
        'Para 13(III). These are ongoing duties and the annual one is the one people forget, because nothing prompts it.',
      items: [
        'Documentary evidence of the establishment or acquisition, through your Authorized Dealer, within one month of making the investment',
        'A return to the State Bank on form V-100, through the same channel, within one month',
        'Audited financials of the investee company, submitted annually',
        'Dividends and disinvestment proceeds, including capital gains, repatriated through normal banking channels, converted to rupees, with the original Proceeds Realization Certificate filed with the State Bank. Those amounts may not be credited to a foreign currency account',
      ],
    },

    {
      kind: 'prose',
      heading: 'How this sits with the tax side',
      body: [
        'The two regimes meet at the point where money comes back. The exchange regulations require dividends and disposal proceeds to be repatriated and converted, and the tax side then asks what is taxable on that income and whether the holding itself was declared under section 116A.',
        'They also fail together. An undeclared foreign company is a section 116A problem with a penalty running at 2% of the asset value for each year of default. If it was also acquired outside the exchange framework, that is a second and separate exposure with a different regulator, and neither cures the other.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Can a Pakistani company own a subsidiary abroad?',
      answer:
        'Yes, within Para 13 of Chapter 20 of the Foreign Exchange Manual. An export-oriented IT company can invest from its Exporter\'s Special Foreign Currency Account without designating a bank in advance, or, if it has no such balances, up to the higher of its average net profit over three years or USD 100,000 after designating one.',
    },
    {
      question: 'Can a Pakistani individual open a company in the USA?',
      answer:
        'The State Bank\'s general permissions for resident individuals cover three things: shares in listed companies abroad up to USD 25,000 a year, employee stock option plans up to USD 50,000 a year, and sweat equity. Forming your own private company abroad is not among them. It is not expressly prohibited in what we read, but it is outside the general permissions, so it is a question for your bank or an adviser rather than an assumption.',
    },
    {
      question: 'What did the State Bank change in July 2024?',
      answer:
        'FE Circular No. 01 of 11 July 2024 revised Para 13(II)A to create a new equity investment category for IT-sector exporters, remove prior bank designation where funds come from an Exporter\'s Special Foreign Currency Account, permit IT export companies to acquire a shareholding rather than only establish an entity, and relax the one-entity-per-jurisdiction restriction for them.',
    },
    {
      question: 'How much can a Pakistani company invest abroad?',
      answer:
        'At any point the total investment abroad must not exceed 80% of the company\'s equity for a non-listed company, adjusted for investments in subsidiaries and associates, goodwill, deferred tax assets and related-party receivables. Within that, the ceiling depends on the route: available funds in an ESFCA or SFCA, or the higher of three-year average net profit and USD 100,000.',
    },
    {
      question: 'Can a Pakistani startup do a Delaware flip?',
      answer:
        'There is a route in Para 13(II)(A2)(b), with three cumulative conditions: incorporated in Pakistan for not more than 7 years and not by splitting up or reconstruction, annual revenue below PKR 2 billion since incorporation, and equity including retained earnings below PKR 300 million. The holding company must then repatriate 80% of funds raised abroad until USD 1 million and 50% thereafter until USD 10 million cumulative.',
    },
    {
      question: 'Do I have to report a foreign investment to the State Bank after making it?',
      answer:
        'Yes. Documentary evidence and a return on form V-100 within one month of the investment, audited financials of the investee company every year, and repatriation of dividends and disposal proceeds through banking channels with the original Proceeds Realization Certificate filed with the State Bank.',
    },
    {
      question: 'Does the foreign business have to be related to what I do in Pakistan?',
      answer:
        'Yes, for a company. The business in which the investment is made should be of a similar nature to the applicant\'s Pakistani business. An extended line of business or vertical integration is treated as similar; an unrelated venture is not.',
    },
    {
      question: 'If I declared my foreign company to FBR, am I compliant?',
      answer:
        'On the tax side, if the section 116A statement was filed correctly. Exchange control is a separate question with a separate regulator: whether you were permitted to acquire the shareholding at all is governed by the Foreign Exchange Manual, and declaring an asset does not authorise having acquired it.',
    },
  ],

  publishedAt: '2026-09-28',
  related: ['us-llc-foreign-asset-declaration', 'tax-for-freelancers'],

  seo: {
    title: 'Can a Pakistani Legally Own a Company Abroad?',
    description:
      'What Para 13 of the Foreign Exchange Manual permits, the 2024 changes for IT exporters, the startup holding company route, and why individuals are not covered.',
  },
};

export const CROSS_BORDER_GUIDES: Guide[] = [US_LLC_FOREIGN_ASSET, FOREIGN_ENTITY_PERMISSION];

