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
      tone: 'warning',
      heading: 'The profit may not be foreign income at all',
      body: 'Worth separating two things the word "foreign" runs together. Section 101(2) provides that business income of a resident person is Pakistan-source income to the extent it is derived from any business carried on in Pakistan. If you run the LLC from Lahore, doing the work yourself in Pakistan, there is a real argument that the profit is Pakistan-source business income rather than foreign income, even though the LLC itself is unmistakably a foreign asset. It does not change whether you declare it, because section 11(5) computes a resident\'s income from both Pakistan-source and foreign-source amounts. It changes the characterisation, and characterisation is what the rest of the return runs on.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The treaty is not the answer people think it is',
      body: 'A US-Pakistan income tax convention does exist, signed in 1957 and still in force, and it is usually invoked to say double taxation is prevented. Two problems. Section 103(1) allows a credit for foreign income tax actually PAID, so if the LLC lawfully pays no US federal income tax there is no credit to take and nothing for a treaty to relieve: the Pakistani liability is the whole liability, not a residue after American tax. And the treaty is a 1957 instrument with no limitation on benefits article, no capital gains article and no services permanent establishment. Article II(1)(l) expressly excludes remuneration for labour or personal services from the industrial and commercial profits article, so the provision people reach for does not cover freelance fees at all.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'A thirty-day clock most people have never heard of',
      body: 'Separate from anything FBR requires. Section 452 of the Companies Act 2017 obliges every substantial shareholder or officer of a Pakistani company who is a Pakistani citizen, resident or not, dual national or not, and who holds shares in a foreign company, to report that holding to their Pakistani company on a specified form within thirty days of acquiring it. The Explanation is drafted to catch a foreign entity with no Pakistan connection at all: it applies regardless of whether the foreign company has a place of business, any business activity, or a liaison office here. The company then files it with its annual return, and section 452(8) provides that the Commission shall give the information to the Federal Board of Revenue. So the register that starts at SECP ends up where the section 116A question is asked. Note the limb that catches individuals is about being a substantial shareholder or officer of a PAKISTANI company: a freelancer with a US LLC and no Pakistani company is not caught by it. Substantial means 10% or more. We read this in a consolidation dated 7 October 2022 and have not been able to check amendments after that date.',
    },

    {
      kind: 'list',
      heading: 'What the United States wants, separately',
      intro:
        'A US LLC wholly owned by one non-US person is treated as a corporation for the reporting rules in section 6038A, and the obligations survive a year of no trading. None of this is Pakistani law, and all of it applies alongside.',
      items: [
        'Form 5472 attached to a pro forma Form 1120, due the 15th day of the fourth month after year end, which is 15 April for a calendar-year LLC',
        'It cannot be filed electronically. The instructions carry an express caution: fax it, or post it to the dedicated Ogden address with "Foreign-owned U.S. DE" written across the top, and not to the ordinary Form 1120 address',
        'A dormant year still files, because formation, contributions and distributions are themselves reportable transactions',
        'The penalty is USD 25,000 for each taxable year, with a further USD 25,000 per related party per 30-day period once a notice has gone unanswered for 90 days, and no maximum',
        'FinCEN beneficial ownership reporting no longer applies to a US-formed LLC. The final rule of 11 August 2026 limits reporting companies to foreign-formed entities registered to do business in a US state, so ownership by Pakistani residents does not bring it back',
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
      question: 'Do I have to file anything in the US for my LLC?',
      answer:
        'A US LLC wholly owned by one non-US person files Form 5472 with a pro forma Form 1120, due 15 April for a calendar year. It cannot be e-filed and must go to the dedicated address rather than the ordinary Form 1120 one. The penalty is USD 25,000 for each taxable year, and a year with no trading still files because formation, contributions and distributions are reportable.',
    },
    {
      question: 'Does the US-Pakistan tax treaty stop me being taxed twice?',
      answer:
        'Not in the way it is usually invoked. Section 103(1) gives a credit for foreign tax actually paid, so where the LLC lawfully pays no US federal income tax there is nothing to credit and the Pakistani liability stands in full. The 1957 convention also excludes remuneration for labour or personal services from its industrial and commercial profits article, so it does not reach freelance fees.',
    },
    {
      question: 'Do I have to file a FinCEN beneficial ownership report?',
      answer:
        'Not for a US-formed LLC. FinCEN\'s final rule of 11 August 2026 limits reporting companies to entities formed under foreign law that have registered to do business in a US state. The test is place of formation, not the owners\' nationality, so a Wyoming LLC owned by Pakistani residents has no BOI obligation. Content describing the earlier position is out of date.',
    },
    {
      question: 'Is my LLC\'s profit foreign income or Pakistan income?',
      answer:
        'It depends on where the business is carried on. Section 101(2) makes business income of a resident Pakistan-source to the extent it is derived from a business carried on in Pakistan, so profit from work you do yourself in Pakistan may be Pakistan-source even though the LLC is a foreign asset. Either way section 11(5) brings both into your computation.',
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
      kind: 'note',
      tone: 'warning',
      heading: '"Fund it from offshore earnings and it is outside SBP" is the claim to be careful with',
      body: 'The most common advice is that if no money leaves Pakistan, the exchange regulations never engage. Para 3 of Chapter 20 cuts against it: a Pakistan national resident in Pakistan who owns foreign securities may hold them provided he acquired them in a manner not involving a breach of the Foreign Exchange regulations. The proviso is drafted around the lawfulness of the ACQUISITION, not around the route the funds took. In fairness there is an argument the other way, because section 5(2)(b) of FERA 1947 carves out payments made with foreign exchange received for services not arising from a business in Pakistan. We are recording this as genuinely arguable rather than settled, which is more than the pages asserting it flatly do.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'What a contravention carries',
      body: 'Section 23(1) of the Foreign Exchange Regulation Act 1947 makes contravention punishable with rigorous imprisonment up to five years, or a fine, or both, and the Tribunal may order confiscation of the property concerned. Section 23(2) makes the offence cognizable and non-bailable. Two practical brakes are worth knowing alongside that: under section 23(3) a Tribunal cannot take cognizance except on a written complaint by a person authorised by the State Bank, so SBP controls whether a prosecution starts at all, and where the charge is doing an act without permission, no complaint may be made until the accused has had an opportunity to show that he had it.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'A second permission your own members have to give',
      body: 'Section 199(1) of the Companies Act 2017 prohibits a company from investing in an associated company or associated undertaking except under the authority of a special resolution stating the nature, period, amount and terms of the investment, and the Explanation includes equity, loans, advances and guarantees. A foreign subsidiary is an associated undertaking under section 2(4)(b). So a Pakistani company funding its own foreign subsidiary needs a members\' special resolution rather than a board resolution, and almost no guide to investing abroad mentions it.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Controlled foreign company rules, and why they often do not bite',
      body: 'Section 109A can attribute a foreign company\'s income to a resident shareholder even where no dividend is paid, which sounds alarming and is frequently overstated. All four conditions in section 109A(2) must hold together, and one of them is that the company does NOT derive active business income. A genuine operating software subsidiary usually does, so it fails that condition and falls outside. Two de minimis rules cut it off further: attributable income is nil where the resident holds less than 10% of capital or voting rights, and the company\'s income is treated as nil where it is below PKR 10 million. Section 109A is a real risk for a passive holding structure and often not triggered for a trading one.',
    },

    {
      kind: 'prose',
      heading: 'If the company is already there without permission',
      body: [
        'No published State Bank instrument provides an amnesty, a condonation or a retrospective approval for a foreign entity already established without permission. The only mechanism in Chapter 20 is Para 13(IV)(3), under which your Authorized Dealer forwards an application for exemption or waiver to the Director of the Exchange Policy Department, and that is prospective and requires the bank\'s own recommendation.',
        'The 2018 Foreign Assets Declaration and Repatriation Act is sometimes offered as the answer. It was a tax amnesty, it expired, and it did not cure exchange control contraventions. We are stating the absence rather than inventing a route: what the published material does not contain is a clean fix, and this is a position to take to your bank and an adviser rather than resolve from a web page.',
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
      question: 'What is the penalty for investing abroad without SBP permission?',
      answer:
        'Section 23(1) of the Foreign Exchange Regulation Act 1947 provides for rigorous imprisonment up to five years, or a fine, or both, with possible confiscation of the property, and section 23(2) makes the offence cognizable and non-bailable. A prosecution can only begin on a written complaint by someone authorised by the State Bank, and where the charge is acting without permission the accused must first be given a chance to show he had it.',
    },
    {
      question: 'Can I regularise a foreign company I already set up?',
      answer:
        'No published State Bank instrument offers an amnesty or retrospective approval. Chapter 20 Para 13(IV)(3) allows an application for exemption or waiver through your Authorized Dealer, but it is prospective and needs the bank\'s recommendation. The 2018 Foreign Assets Act was a tax amnesty, has expired, and did not cure exchange control contraventions.',
    },
    {
      question: 'Do controlled foreign company rules apply to my foreign subsidiary?',
      answer:
        'Only if all four conditions in section 109A(2) hold, and one is that the company does not derive active business income. A genuine operating software subsidiary usually does, which takes it outside. Attributable income is also nil where the resident holds under 10%, or where the company\'s income is below PKR 10 million.',
    },
    {
      question: 'Does my Pakistani company need a board resolution to fund its foreign subsidiary?',
      answer:
        'More than that. Section 199(1) of the Companies Act 2017 requires a special resolution of the members, stating the nature, period, amount and terms, for any investment in an associated company or undertaking, and that includes equity, loans, advances and guarantees. A foreign subsidiary is an associated undertaking under section 2(4)(b).',
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


/**
 * Guide 20: residency, and the numbers the field repeats wrongly.
 *
 * Three corrections, all read verbatim from s.82 and its footnotes:
 *
 *   1. The presence test is 183 days, not 182. "Eighty-two" was substituted by
 *      the Finance Act 2006. The 182 figure belongs to s.82(d), a different
 *      test about other countries, and summaries quote it for both.
 *   2. The 120-day rule is not law. Clause (ab) was inserted by the Finance
 *      Act 2019 and OMITTED by the Finance Act 2021, after two tax years. It
 *      is still cited constantly.
 *   3. s.82(d) can make a Pakistani citizen resident while living abroad, and
 *      it is the limb that catches the globally mobile.
 *
 * The open question is day counting: the Ordinance contains no rule on
 * part-days, arrival or departure. Sources assert one confidently. We could
 * not obtain the Income Tax Rules 2002 to check whether it lives there, so the
 * guide says exactly that. See no-day-counting-rule and DEAD-ENDS.md.
 */

const RESIDENCY: Guide = {
  slug: 'tax-residency-for-overseas-pakistanis',
  cluster: 'cross-border',
  title: 'The 183-Day Rule Overseas Pakistanis Get Wrong',
  navLabel: 'Tax residency',
  card: 'Why the number is 183 and not 182, why the 120-day rule you have read about was repealed, and the limb that makes a citizen resident without setting foot in Pakistan.',

  answer:
    'You are a resident individual if you are in Pakistan for 183 days or more in the tax year. Separately, section 82(d) makes a Pakistani citizen resident if they were not in any other single country for more than 182 days, or are not a resident taxpayer of any other country. That second limb catches people who live abroad but move between countries, or live somewhere that taxes nobody. The 120-day rule was repealed in 2021.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'Two different numbers, and they are not interchangeable',
      body: 'Section 82(a) is 183 days: present in Pakistan for a period, or periods amounting in aggregate, to one hundred and eighty-three days or more in the tax year. The word "eighty-three" was substituted for "eighty-two" by the Finance Act 2006, so the 182 figure has been wrong for twenty years. Section 82(d) does use 182, but it is a different test measuring time in some OTHER country. Published summaries routinely quote 182 for both, which matters for anyone landing within a day of the line.',
    },

    {
      kind: 'table',
      heading: 'The tests that actually exist',
      intro:
        'Section 82 in its current form has three limbs. Any one of them makes you resident; they are alternatives rather than cumulative conditions.',
      columns: ['Limb', 'Test', 'Who it catches'],
      rows: [
        ['82(a)', 'Present in Pakistan 183 days or more in aggregate in the tax year', 'Anyone, citizen or not'],
        ['82(c)', 'An employee or official of the Federal or a Provincial Government posted abroad', 'Government staff on foreign posting'],
        ['82(d)', 'A citizen of Pakistan not present in any other country for more than 182 days, or not a resident taxpayer of any other country', 'Citizens living abroad'],
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The 120-day rule is not law and has not been since 2021',
      body: 'Clause (ab) made an individual resident on 120 days in Pakistan combined with 365 days across the four preceding years. It was inserted by the Finance Act 2019 and omitted by the Finance Act 2021, so it was live for two tax years. It is still repeated across Pakistani tax blogs and diaspora forums as though it were current, and it is the single most common piece of stale advice on this subject. An older 90-day plus 365-day test in clause (b) went in 2003.',
    },

    {
      kind: 'prose',
      heading: 'Why section 82(d) is the one that surprises people',
      body: [
        'It reverses the intuition. Most people reason that leaving Pakistan for most of the year ends their Pakistani residency, and under section 82(a) alone that would be right. Section 82(d) asks a different question of Pakistani citizens: where else are you resident?',
        'Read the two branches. Not present in any other single country for more than 182 days catches someone who spends the year across three or four countries without settling anywhere long enough. Not a resident taxpayer of any other country catches someone living permanently somewhere that does not tax individuals, because there is no other jurisdiction treating them as a resident taxpayer. A Pakistani citizen working in a Gulf state with no personal income tax can satisfy the second branch while being nowhere near Pakistan.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'What "resident taxpayer of another country" requires is not defined',
      body: 'The Ordinance does not say what evidences being a resident taxpayer elsewhere, and this is the practical crux of section 82(d). A tax residency certificate is the obvious answer where one is available. Where it is not, because the country issues none or taxes no individual income, the position is genuinely uncertain and the honest advice is to document what you can, keep the evidence of where you actually were, and take advice on your own facts rather than assume the branch is satisfied.',
    },

    {
      kind: 'prose',
      heading: 'What being resident actually means',
      body: [
        'Section 11 charges a resident on worldwide income. That is the whole consequence and it is a large one: income earned abroad, from foreign clients, paid into a foreign account, is within the charge if you are resident, whether or not it ever reaches Pakistan.',
        'A non-resident is taxed only on Pakistan-source income. So the residency question is not a formality that decides which form you file, it decides how much of your income Pakistan is taxing, and it is the first question to settle before any other.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The Ordinance does not say how to count a day',
      body: 'There is no provision in the Ordinance on part-days, on days of arrival and departure, or on days spent in transit. Sections 81 to 84 set the tests and are silent on computing them. Several published sources state confidently that any part of a day in Pakistan counts as a whole day. We could not verify that: it is not in the Ordinance, and we were unable to obtain the consolidated Income Tax Rules 2002 to check whether it lives there. If you are within a few days of 183, that gap is not academic, and it is a reason to keep your own travel record rather than rely on someone\'s arithmetic rule.',
    },

    {
      kind: 'prose',
      heading: 'Residency of a company is a different test entirely',
      body: [
        'Section 83 makes a company resident if it is incorporated or formed under any law in force in Pakistan, or if the control and management of its affairs is situated wholly in Pakistan at any time in the year, or if it is a Provincial or Local Government.',
        'The middle limb is the one worth knowing if you have a company abroad. Incorporating in Wyoming or Dubai settles where the company was formed; it does not settle where it is controlled and managed. Note also the asymmetry with associations of persons: section 84 makes an association resident if control and management is wholly OR PARTLY in Pakistan, a materially wider test than the one applied to companies.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'If you are resident, two further obligations follow',
      body: 'Section 116A requires a foreign income and assets statement from a resident individual with foreign income of USD 10,000 or more or foreign assets of USD 100,000 or more, with a penalty of 2% of the asset value for each year of default. And section 111(4) shields foreign exchange remitted through normal banking channels from the unexplained-income provisions only up to five million rupees in a tax year, and only where it is encashed into rupees with a bank certificate. Neither is an exemption from tax on the income; both are obligations that follow from being resident.',
    },
  ],

  faqs: [
    {
      question: 'How many days can I stay in Pakistan without becoming a tax resident?',
      answer:
        'Up to 182 days, because section 82(a) makes you resident at 183 days or more in aggregate in the tax year. Note that staying under that does not settle the question for a Pakistani citizen, because section 82(d) can make you resident on separate grounds.',
    },
    {
      question: 'Is the rule 182 days or 183 days in Pakistan?',
      answer:
        '183 for presence in Pakistan under section 82(a). The word "eighty-three" was substituted for "eighty-two" by the Finance Act 2006. The 182-day figure belongs to section 82(d), which measures time spent in another country, and the two get quoted interchangeably in error.',
    },
    {
      question: 'Is the 120-day rule still applicable in Pakistan?',
      answer:
        'No. Clause (ab) of section 82, the 120-day plus 365-day test, was inserted by the Finance Act 2019 and omitted by the Finance Act 2021. It applied for two tax years and is still widely cited as current, which it is not.',
    },
    {
      question: 'Can an overseas Pakistani be a tax resident of Pakistan?',
      answer:
        'Yes, under section 82(d). A citizen of Pakistan is resident if not present in any other single country for more than 182 days in the tax year, or if not a resident taxpayer of any other country. Someone moving between several countries, or living where individuals are not taxed, can be caught while spending almost no time in Pakistan.',
    },
    {
      question: 'Do overseas Pakistanis pay tax on foreign income?',
      answer:
        'Only if resident. Section 11 charges a resident on worldwide income and a non-resident on Pakistan-source income only. So the answer depends entirely on the section 82 tests, and section 82(d) is the one that most often decides it for someone living abroad.',
    },
    {
      question: 'How are days counted for Pakistani tax residency?',
      answer:
        'The Ordinance does not say. Sections 81 to 84 set the tests and contain no rule on part-days, arrival and departure days, or transit. Sources that state a part-day counts as a full day are not citing the Ordinance, and we could not confirm whether such a rule appears in the Income Tax Rules 2002.',
    },
    {
      question: 'Is my foreign company resident in Pakistan?',
      answer:
        'Under section 83 a company is resident if incorporated or formed under Pakistani law, or if the control and management of its affairs is situated wholly in Pakistan at any time in the year. Incorporating abroad answers only the first limb. For an association of persons, section 84 is wider still: control and management wholly or partly in Pakistan.',
    },
    {
      question: 'Do I need a tax residency certificate from another country?',
      answer:
        'Section 82(d) turns partly on whether you are a resident taxpayer of another country, and a certificate is the clearest evidence where one is available. The Ordinance does not prescribe what proof is required, which leaves people in countries that issue none in a genuinely uncertain position.',
    },
  ],

  publishedAt: '2026-09-29',
  related: ['us-llc-foreign-asset-declaration', 'how-to-file-your-tax-return'],

  seo: {
    title: 'Tax Residency for Overseas Pakistanis: The 183-Day Rule',
    description:
      'Why section 82(a) is 183 days and not 182, why the 120-day rule was repealed in 2021, and how section 82(d) makes a citizen resident while living abroad.',
  },
};


/**
 * Guide 21: money from abroad, and what s.111(4) actually does.
 *
 * Two corrections carry it, both read from the section and its footnotes:
 *
 *   1. There is a five million rupee annual cap. Sources describing s.111(4)
 *      as unlimited are describing the pre-2021 text, which genuinely had no
 *      ceiling for about seventeen years. They are stale rather than wrong.
 *   2. It is a shield against being asked to explain the SOURCE of money. It
 *      is not an exemption from tax on the income. A freelancer's export
 *      receipts stay taxable under s.154A whatever s.111(4) does.
 *
 * The second is the one that costs people money, because "remittances are
 * tax free in Pakistan" is repeated everywhere and is a confusion of two
 * different provisions doing two different jobs.
 */

const MONEY_FROM_ABROAD: Guide = {
  slug: 'receiving-money-from-abroad',
  cluster: 'cross-border',
  title: 'Receiving Money From Abroad: What Section 111(4) Does and Does Not Do',
  navLabel: 'Money from abroad',
  card: 'The five million rupee ceiling most pages omit, why a shield against questions is not an exemption from tax, and what the bank certificate is for.',

  answer:
    'Section 111(4) stops FBR asking you to explain the source of foreign exchange remitted through normal banking channels, up to five million rupees in a tax year, where a scheduled bank encashes it into rupees and issues a certificate. It is a shield against the unexplained-income provisions, not an exemption. Income that is taxable stays taxable: a freelancer\'s export receipts are charged under section 154A regardless.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'There is a five million rupee ceiling, and it is recent',
      body: 'Section 111(4) applies to foreign exchange remitted through normal banking channels "not exceeding five million Rupees in a tax year". A great many pages describe the protection as unlimited, and they are not making it up: the sub-section as substituted by the Finance Act 2004 carried no cap at all, and it stayed that way for roughly seventeen years. The ceiling arrived with the text substituted by the Finance Act 2021. So the unlimited version was real law for most of the time the internet has existed, and the pages describing it are stale rather than inventive. Check the date on anything that tells you there is no limit.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'A shield against questions is not an exemption from tax',
      body: 'This is the confusion that costs the most, and it is encouraged by the phrase "remittances are tax free in Pakistan". Section 111 is the unexplained-income provision: it lets the Commissioner treat an unexplained credit, investment or expenditure as income from other sources. Section 111(4) disapplies that machinery for qualifying remittances. What it does not do is decide whether the underlying income was taxable. If you are a resident freelancer and the money is payment for exported services, it is taxable under section 154A whatever section 111(4) says about explaining its source. Two different questions, two different provisions, and satisfying one leaves the other exactly where it was.',
    },

    {
      kind: 'list',
      heading: 'The four conditions, all of which have to hold',
      intro:
        'Read closely, because three of the four are things you have to do rather than things that happen automatically.',
      items: [
        'The money is foreign exchange remitted from outside Pakistan',
        'It comes through normal banking channels',
        'It does not exceed five million rupees in the tax year',
        'A scheduled bank encashes it into rupees AND issues a certificate to that effect, which you produce',
      ],
    },

    {
      kind: 'prose',
      heading: 'The encashment condition is the one people fail',
      body: [
        'The section requires the foreign exchange to be encashed into rupees by a scheduled bank, with a certificate produced. Money that arrives and sits in a foreign currency account has not been encashed, so the condition on its face is not met.',
        'The certificate is the other half. It is not enough that the encashment happened; the statute says a certificate from the bank is produced to that effect. Ask for it at the time. Reconstructing a certificate for a transaction three years old, from a bank that has since reorganised its branches, is a great deal harder than requesting one when the money lands.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Payoneer and Wise are inside the section, by express words',
      body: 'An Explanation inserted by the Finance Act 2022 removes the doubt: remittance through money service bureaus, exchange companies or money transfer operators is deemed to constitute foreign exchange remitted from outside Pakistan through normal banking channels. That settles a question people used to worry about, and it means the route the money took is not the weak point in most cases. The encashment and the certificate still are.',
    },

    {
      kind: 'prose',
      heading: 'What happens above five million',
      body: [
        'Nothing automatic, and that is worth saying plainly rather than alarmingly. Exceeding the ceiling does not make the money taxable and does not create a presumption against you. What it does is remove the statutory shortcut, so the ordinary position applies: if asked, you explain the nature and source of the amount, and section 111 bites only where no explanation is offered or the Commissioner does not find it satisfactory.',
        'For most people reading this, the explanation is easy and documented: an invoice, a contract, a client, a platform statement. The shortcut in section 111(4) exists for cases where producing that is awkward. Keeping the underlying records is what makes the ceiling a formality rather than a cliff.',
      ],
    },

    {
      kind: 'calculator',
      toolSlug: 'freelancer-tax',
      heading: 'What the income itself is taxed at',
      body: 'Since section 111(4) says nothing about the tax on the income, this is the figure that actually matters for an exporter of services. The calculator shows the position with and without PSEB registration, which is where the difference is largest.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'If you sold property, one account type changes everything',
      body: 'A separate provision worth knowing if the money is coming the other way. Under a proviso to section 236C(1), where a non-resident individual holding a POC, NICOP or CNIC sells property they acquired through a Foreign Currency Value Account or an NRP Rupee Value Account, the advance tax collected on the sale is a final discharge in lieu of the capital gains taxable under section 37. There is then no separate section 37 computation. What decides it is the account the purchase was made through, years earlier, so it is not a choice available at the point of sale.',
    },

    {
      kind: 'prose',
      heading: 'And if you are resident, the declaration obligations are separate again',
      body: [
        'Section 111(4) concerns money arriving. Section 116A concerns assets held: a resident individual with foreign assets of USD 100,000 or more, or foreign income of USD 10,000 or more, must file a foreign income and assets statement with the return, and the penalty for not doing so runs at 2% of the asset value for every year of default.',
        'They interact in the obvious way. Money that came in under section 111(4) and was spent is not a foreign asset. Money that stayed abroad, or bought something abroad, is. A person can be entirely clean on the remittance question and in default on the declaration one.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Is foreign remittance taxable in Pakistan?',
      answer:
        'The remittance itself is not a separate charge, but section 111(4) does not make the underlying income tax free. It only stops FBR treating the money as unexplained income, up to five million rupees a year and subject to encashment and a bank certificate. If the money is payment for services you exported, it is taxable under section 154A regardless.',
    },
    {
      question: 'What is the limit for foreign remittance in Pakistan?',
      answer:
        'Five million rupees in a tax year for the section 111(4) protection. Pages describing it as unlimited are describing the pre-2021 text, which genuinely had no cap from 2004 until the Finance Act 2021 substituted the sub-section.',
    },
    {
      question: 'Does section 111(4) cover Payoneer and Wise?',
      answer:
        'Yes. An Explanation inserted by the Finance Act 2022 deems remittance through money service bureaus, exchange companies or money transfer operators to be remittance through normal banking channels for the purposes of the sub-section.',
    },
    {
      question: 'What certificate do I need for a foreign remittance?',
      answer:
        'Section 111(4) requires that a scheduled bank encashes the foreign exchange into rupees and that a certificate from the bank to that effect is produced. Ask the bank for it at the time of encashment rather than years later.',
    },
    {
      question: 'What happens if my remittances exceed five million rupees?',
      answer:
        'The statutory shortcut stops applying and the ordinary position resumes: section 111 catches an amount only where no explanation of its nature and source is offered, or the explanation is not satisfactory to the Commissioner. With invoices and contracts, that is usually straightforward.',
    },
    {
      question: 'Does the money have to be converted into rupees?',
      answer:
        'For section 111(4), yes. The sub-section requires the foreign exchange to be encashed into rupees by a scheduled bank with a certificate produced. Funds left sitting in a foreign currency account have not been encashed.',
    },
    {
      question: 'Do freelancers pay tax on money received from abroad?',
      answer:
        'Yes, on the income. Export proceeds for IT and IT-enabled services are withheld under section 154A at 0.25% for a PSEB-registered exporter and 1% otherwise. Section 111(4) is about explaining the source of funds and does not change that charge.',
    },
    {
      question: 'Is a remittance the same as a foreign asset for tax purposes?',
      answer:
        'No, and they are governed by different sections. Section 111(4) deals with money arriving from abroad. Section 116A requires a resident individual holding foreign assets of USD 100,000 or more, or foreign income of USD 10,000 or more, to file a foreign income and assets statement, with a penalty of 2% of the value for each year of default.',
    },
  ],

  publishedAt: '2026-09-30',
  related: ['tax-for-freelancers', 'us-llc-foreign-asset-declaration'],

  seo: {
    title: 'Receiving Money From Abroad in Pakistan: Section 111(4)',
    description:
      'The five million rupee annual ceiling, why a shield against unexplained-income questions is not a tax exemption, and the encashment certificate the statute requires.',
  },
};

export const CROSS_BORDER_GUIDES: Guide[] = [
  US_LLC_FOREIGN_ASSET,
  FOREIGN_ENTITY_PERMISSION,
  RESIDENCY,
  MONEY_FROM_ABROAD,
];



