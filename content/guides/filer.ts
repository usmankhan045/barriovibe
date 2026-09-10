import type { Guide } from './types';

/**
 * Cluster 1: filer status.
 *
 * The lead cluster, chosen from evidence rather than instinct. Live SERP
 * analysis found SlideShare and a LinkedIn post ranking on page one for
 * "difference between filer and non filer", which is what a commercial query
 * looks like when nobody has written the authoritative page. Thirteen shipped
 * calculators expose a filer/non-filer toggle, so every claim here links to a
 * tool that proves the number on the reader's own figures.
 *
 * ── The no-figures rule ──
 *
 * Same as content/tools.ts, and it bites harder here because a guide is
 * prose and prose invites retyping. Where a rate appears below it is either
 * interpolated from lib/tax/ at render time or it is a statutory constant
 * that lib/tax/ does not model (the s.182A surcharge, for instance). Nothing
 * that a calculator computes is restated as a literal.
 *
 * Every figure traces to a `verified` record in research/findings.jsonl. The
 * ids are named in comments so a reviewer can check them, and so the next
 * Finance Act has a list of what to re-verify.
 */

const FILER_VS_NON_FILER: Guide = {
  slug: 'filer-vs-non-filer',
  cluster: 'filer',
  title: 'Filer vs Non-Filer in Pakistan: What the Difference Actually Costs',
  navLabel: 'Filer vs non-filer',
  card: 'The rupee difference on property, vehicles, banking and dividends, with the section behind each rate and a calculator for your own numbers.',

  answer:
    'A person on the Active Taxpayer List pays less tax on the same transaction. Selling property costs 2.75% against 11.5%. Cash withdrawals over Rs 50,000 a day cost nothing against 0.8%. Vehicle registration is tripled, not doubled. The gap is set by the Tenth Schedule to the Income Tax Ordinance, and getting on the list means filing one return.',

  sections: [
    {
      kind: 'prose',
      body: [
        'Pakistani tax law never uses the word "filer". The Income Tax Ordinance refers to persons appearing, or not appearing, in the Active Taxpayer List, and the difference in what they pay is set out in the Tenth Schedule. That distinction matters more than it sounds, because the popular shorthand hides three separate states that people routinely confuse: registered with FBR, having filed a return, and being on the list.',
        'You can be registered and not on the list. You can have filed and still be waiting. This guide covers what the gap costs, how the rates are actually derived, and what the law says beyond the withholding rates that everyone quotes.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Three states, not two',
      body: 'Registration under section 181 gives you a National Tax Number. Filing a return under section 114 is a separate act. The Active Taxpayer List is built from who has filed. A CNIC alone puts you in none of the three: section 181(4) makes your CNIC serve as your NTN, but it does not register you.',
    },

    {
      kind: 'prose',
      heading: 'How the higher rates are actually set',
      body: [
        'Most explanations say a non-filer "pays double". That is the default rule and it is not the whole rule. The Tenth Schedule, which section 100BA brings into force, sets out three different mechanisms, and knowing which one applies to your transaction is the difference between an estimate and an answer.',
        'Rule 1 states the general case: where tax is deducted or collected from a person not on the list, the rate is increased by one hundred percent of the rate specified in the Ordinance. That is the doubling everyone knows about.',
        'Then come the exceptions. Motor vehicle registration under section 231B is increased by two hundred percent, so the rate is tripled rather than doubled. Property purchase under section 236K is not multiplied at all: the Schedule sets a fixed table of rates by value band. Property sale under section 236C, and sections 236G and 236H, are likewise given fixed figures rather than a multiplier.',
        'Rule 10 does the opposite job and is almost never mentioned. It lists the sections the Tenth Schedule does not touch at all: salary under section 149, cash withdrawal under section 231AB, electricity under section 235, telephone and internet under section 236, and export proceeds under sections 154 and 154A. Where a filer and a non-filer pay different amounts on those, the difference is written directly into the First Schedule and has nothing to do with doubling.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The three-year shield most guides miss',
      body: 'Rule 1 carries a proviso: the punitive property rates do not apply to a person who filed by the due date for all of the last three tax years preceding the year for which a return has not been filed. A clean three-year record protects you from the worst of the property table even in a year you have not yet filed.',
    },

    {
      kind: 'calculator',
      toolSlug: 'property-sale-tax',
      heading: 'What it costs on a property sale',
      body: 'Section 236C is charged on the gross consideration received, not on your profit, so it is payable even on a sale that made a loss. Enter a sale value to see both sides of the gap.',
    },

    {
      kind: 'prose',
      heading: 'Where the gap is widest',
      body: [
        'Cash withdrawal is the starkest case and it is usually described wrongly. Section 231AB charges nothing at all to a person on the list. A person not on it pays 0.8% on daily withdrawals above Rs 50,000. The cost is not double, it is the entire charge, because the comparison is against zero.',
        'Property is where the largest single sums move. A seller not on the list pays 11.5% of the whole transfer value against 2.75%, and on a Rs 20 million sale that difference is Rs 1.75 million on one transaction. Buyers face a banded table rising to 18.5% above Rs 100 million while a person on the list pays a flat 1.25% at every value.',
        'Vehicles are tripled rather than doubled, which is the correction worth making loudly because the doubling shorthand understates it by half again. Profit on a bank deposit runs 20% against 40% under section 151, and a dividend 15% against 30% under section 150.',
      ],
    },

    {
      kind: 'calculator',
      toolSlug: 'cash-withdrawal-tax',
      heading: 'What it costs on cash withdrawals',
      body: 'Section 231AB is excluded from the Tenth Schedule by Rule 10, so the 0.8% is a standalone rate rather than a doubled one. A person on the list pays nothing.',
    },

    {
      kind: 'prose',
      heading: 'The late filer category no longer exists',
      body: [
        'Between 2024 and 2026 there were three tiers rather than two. The Finance Act 2024 inserted Rule 1A into the Tenth Schedule, creating a "late filer" who paid more than an on-time filer but less than a non-filer, and it applied only to sections 236C and 236K on property. The Finance Act 2025 raised those rates further.',
        'The Finance Act 2026 omitted Rule 1A entirely. Late filers now pay the same withholding rates as anyone else on the list, and every rate card for tax year 2027 carries two columns rather than three.',
        'Filing late still costs you, but through a different mechanism: the surcharge for late inclusion in the list, covered below. If you are reading a page that still shows three tiers, or FBR\'s consolidated Ordinance PDF, check the amendment date on it. A consolidation dated before 1 July 2026 predates the Act that removed the tier.',
      ],
    },

    {
      kind: 'prose',
      heading: 'What it costs beyond the withholding rates',
      body: [
        'Section 182A is where the consequences that never appear in comparison tables are set out, and one of them can dwarf every rate difference combined.',
        'A person who does not file by the due date is not included in the list for that year. They may not carry forward any loss under Part VIII of Chapter IV for that tax year, which for a business with a bad year is a permanent loss of relief that no withholding saving comes close to. They may not be issued a refund while off the list, and they lose the additional payment for a delayed refund under section 171.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The surcharge went up twenty-five times',
      body: 'The Finance Act 2026 raised the section 182A surcharge for late inclusion in the list from Rs 1,000 to Rs 25,000 for an individual, from Rs 10,000 to Rs 50,000 for an association of persons, and from Rs 20,000 to Rs 100,000 for a company. Pages still quoting Rs 1,000 are describing tax year 2026. The Act added a waiver that was not in the Bill: no surcharge for an individual who gives the Commissioner an undertaking not to acquire property for six months.',
    },

    {
      kind: 'steps',
      heading: 'Getting on the list',
      intro:
        'Four steps, and the last one is the part people get wrong about timing.',
      steps: [
        {
          title: 'Register, if you are not already',
          body: 'Registration under section 181 is free. FBR charges nothing for a National Tax Number; the statutory fee was removed when the Finance Act 2008 substituted Part IX of the Ordinance.',
        },
        {
          title: 'File the return for the last completed tax year',
          body: 'The list is built from who has filed. Registration alone will not put you on it, however long ago you registered.',
        },
        {
          title: 'Pay the surcharge if you filed late',
          body: 'Rs 25,000 for an individual under section 182A, or give the undertaking on property instead.',
        },
        {
          title: 'Check your status',
          body: 'Send ATL and your 13-digit CNIC to 9966, or use FBR\'s online status page. An association or company sends its 7-digit NTN instead.',
        },
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'FBR contradicts itself on how fast this happens',
      body: 'FBR\'s own Active Taxpayer List page still says the list is updated every Monday. FBR\'s own press release of 18 October 2024 says it moved to daily updates, and that a person filing by the due date is included immediately. The press release is the current position, and the download page carries a daily date stamp. If you file on time, you do not wait a week.',
    },

    {
      kind: 'prose',
      heading: 'Two routes that avoid the gap without filing',
      body: [
        'A non-resident holding a Pakistan Origin Card or NICOP can obtain the filer rate on sections 236C and 236K without being on the list and without filing a return. The authority handling the transaction creates a PSID through the Overseas Pakistanis link on FBR\'s portal, uploads the card and proof of residency, and a Commissioner verifies and approves payment at the filer rate. FBR documents this in its own overseas FAQ and almost nobody writes about it.',
        'Separately, Rule 2 of the Tenth Schedule lets a withholding agent who believes a person was not required to file notify the Commissioner electronically with the person\'s particulars and the reasons. The Commissioner has thirty days to respond, and silence is deemed acceptance.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'One restriction you have probably read about is not in force',
      body: 'Section 114C, inserted by the Finance Act 2025, would bar people below a resources threshold from buying vehicles above Rs 7 million, property above Rs 100 million, securities above Rs 50 million, or withdrawing cash above Rs 100 million. Per FBR\'s own circular it comes into force only from a date the Federal Government notifies in the Gazette, and we have found no such notification. Many pages report these bans as current law. Check the position before acting on either version, including ours.',
    },
  ],

  faqs: [
    {
      question: 'What is the difference between a filer and a non-filer?',
      answer:
        'A filer is a person appearing in FBR\'s Active Taxpayer List, which is built from who has filed an income tax return. A non-filer is anyone not on that list. The practical difference is the rate of tax withheld on transactions: a non-filer pays double under the general rule in the Tenth Schedule, triple on vehicle registration, and fixed higher rates on property.',
    },
    {
      question: 'How do I know if I am a filer or non-filer?',
      answer:
        'Send ATL followed by a space and your 13-digit CNIC number to 9966, or check FBR\'s online Active Taxpayer List status page. An association of persons or a company sends its 7-digit NTN instead. Residents of Azad Jammu and Kashmir use AJKATL rather than ATL.',
    },
    {
      question: 'Does being a filer mean I pay less income tax?',
      answer:
        'Not on your income itself. The slab rates that apply to salary or business income are the same either way. What changes is the tax withheld on transactions: property, vehicles, banking, dividends and prizes. A filer also keeps rights a non-filer loses, including carrying forward losses and receiving refunds.',
    },
    {
      question: 'How much tax do non-filers pay on property?',
      answer:
        'A seller not on the Active Taxpayer List pays 11.5% of the transfer value under section 236C, against 2.75% for a filer. A buyer pays a banded rate under section 236K: 10.5% up to Rs 50 million, 14.5% between Rs 50 and 100 million, and 18.5% above that, against a flat 1.25% for a filer.',
    },
    {
      question: 'I filed my return today. When do I become a filer?',
      answer:
        'Immediately, if you filed by the due date. FBR moved the Active Taxpayer List to daily updates in October 2024 and stated that taxpayers filing by the due date are included immediately. FBR\'s own list page still says the update happens every Monday, which is out of date.',
    },
    {
      question: 'Is there still a late filer category?',
      answer:
        'No. The late filer tier was created by the Finance Act 2024 through Rule 1A of the Tenth Schedule and applied only to property transactions. The Finance Act 2026 omitted Rule 1A, so for tax year 2027 there are two statuses rather than three. Filing late still costs a surcharge for inclusion in the list.',
    },
    {
      question: 'How much is the surcharge to become a filer after the deadline?',
      answer:
        'Under section 182A the surcharge is Rs 25,000 for an individual, Rs 50,000 for an association of persons and Rs 100,000 for a company, following the Finance Act 2026. An individual can avoid it by giving the Commissioner an undertaking not to acquire any property for six months.',
    },
    {
      question: 'Can a non-filer buy a car or property in Pakistan?',
      answer:
        'Yes, at higher withholding rates. Section 114C would restrict purchases above certain values, but it takes effect only from a date notified in the official Gazette, and no such notification has been traced. Pages describing those restrictions as current law appear to be premature.',
    },
    {
      question: 'Do overseas Pakistanis have to be filers to avoid higher property tax?',
      answer:
        'No. A non-resident with a Pakistan Origin Card or NICOP can pay at the filer rate on sections 236C and 236K without appearing on the list. The transaction authority raises a PSID through the Overseas Pakistanis link on FBR\'s portal and a Commissioner approves it on proof of non-resident status.',
    },
    {
      question: 'Do non-filers pay more on mobile top-ups and electricity bills?',
      answer:
        'Not through the Tenth Schedule. Rule 10 excludes telephone and internet under section 236 and electricity under section 235 from the Schedule entirely, so no doubling applies. Any difference on those bills is written directly into the First Schedule, and for telephone and internet there is currently no difference by status at all.',
    },
  ],

  publishedAt: '2026-09-10T03:00:00Z',
  related: ['how-to-become-a-filer'],

  seo: {
    title: 'Filer vs Non-Filer in Pakistan: The Real Cost',
    description:
      'What non-filer status costs on property, vehicles, cash withdrawals and dividends in Pakistan, with the Ordinance section behind every rate and free calculators for your own figures.',
  },
};

/**
 * The procedural half of the filer cluster.
 *
 * "How to become a filer" is the deepest seed in the entire harvest: 412
 * autocomplete completions, more than any other Pakistani tax query tested,
 * and its SERP carries YouTube and LinkedIn on page one. It is a separate
 * guide from filer-vs-non-filer rather than a section of it because the
 * searcher is different: one has decided and wants the procedure, the other is
 * still deciding and wants the arithmetic.
 */
const HOW_TO_BECOME_A_FILER: Guide = {
  slug: 'how-to-become-a-filer',
  cluster: 'filer',
  title: 'How to Become a Filer in Pakistan',
  navLabel: 'How to become a filer',
  card: 'Register, file one return, and check your status. What it costs if you are late, and why the answer to "how long does it take" changed in 2024.',

  answer:
    'Becoming a filer means appearing on FBR\'s Active Taxpayer List, and the list is built from who has filed a return. Three steps: register for a National Tax Number if you have not, file the return for the last completed tax year, and pay the surcharge if you missed the deadline. If you file on time, inclusion is immediate rather than weekly.',

  sections: [
    {
      kind: 'prose',
      body: [
        'There is no application to become a filer. The Active Taxpayer List is not something you join, it is a list FBR generates from returns filed, so the whole procedure is really one act with some paperwork either side of it.',
        'What changes is the timing and the cost, and both changed recently enough that most published advice is out of date on one or the other.',
      ],
    },

    {
      kind: 'steps',
      heading: 'The three steps',
      steps: [
        {
          title: 'Register, if you have not already',
          body: 'Registration under section 181 gives you a National Tax Number and is free. If you hold a CNIC that number is already your NTN under section 181(4), but you still have to submit Form 181 in IRIS to be registered.',
        },
        {
          title: 'File the return for the last completed tax year',
          body: 'This is the step that actually does it. Registration alone will never put you on the list, however long ago you registered. The tax year runs July to June and the return for a salaried individual is due by 30 September.',
        },
        {
          title: 'Pay the surcharge if you filed late',
          body: 'Under section 182A, late filing means paying a surcharge before you are included in the list. There is now an alternative for individuals, covered below.',
        },
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'How long it takes, and why most answers are wrong',
      body: 'FBR moved the Active Taxpayer List to daily updates in October 2024, and stated that a taxpayer filing by the due date is included immediately. Before that the list shifted annually each March and was refreshed weekly. FBR\'s own list page still says "every Monday", which contradicts FBR\'s own press release. If you file on time, you do not wait.',
    },

    {
      kind: 'prose',
      heading: 'What it costs to file late',
      body: [
        'The surcharge under section 182A rose sharply in 2026. For an individual it went from Rs 1,000 to Rs 25,000, for an association of persons from Rs 10,000 to Rs 50,000, and for a company from Rs 20,000 to Rs 100,000. Pages still quoting the old figures are describing tax year 2026.',
        'The Finance Act 2026 added an alternative that was not in the Bill and is therefore missing from most commentary: an individual can avoid the surcharge entirely by giving the concerned Commissioner an undertaking not to purchase, acquire or otherwise obtain ownership or beneficial interest in any property for six months from the date of the undertaking.',
        'That is a real choice rather than a technicality. If you were not going to buy property in the next six months anyway, the undertaking costs you nothing and saves Rs 25,000.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Filing late costs more than the surcharge',
      body: 'Section 182A also provides that a person who does not file by the due date may not carry forward any loss for that tax year, may not be issued a refund while off the list, and loses the additional payment for a delayed refund under section 171. For a business with a bad year, the loss carry-forward is permanent and can dwarf every other consequence.',
    },

    {
      kind: 'calculator',
      toolSlug: 'salary-tax',
      heading: 'Work out what you owe first',
      body: 'The return is easier to face when you know the number. This computes salary tax on the current slabs and shows the working slab by slab.',
    },

    {
      kind: 'list',
      heading: 'Checking whether it worked',
      intro: 'All official routes, and the syntax differs by taxpayer type.',
      items: [
        'Send ATL and your 13-digit CNIC to 9966, for an individual',
        'Send ATL and the 7-digit NTN to 9966, for an association or a company',
        'Use AJKATL rather than ATL if you are in Azad Jammu and Kashmir',
        'Check FBR\'s online Active Taxpayer List status page in a browser',
      ],
    },

    {
      kind: 'prose',
      heading: 'Two cases where you do not need to file',
      body: [
        'A non-resident holding a Pakistan Origin Card or NICOP can get the filer rate on property transactions without being on the list at all. The authority handling the transaction raises a PSID through the Overseas Pakistanis link on FBR\'s portal, uploads the card and proof of residency, and a Commissioner approves payment at the filer rate. FBR documents this in its own overseas FAQ.',
        'Separately, Rule 2 of the Tenth Schedule lets a withholding agent who believes a person was not required to file notify the Commissioner with the reasons. The Commissioner has thirty days to respond and silence is deemed acceptance. Neither route is a substitute for filing if you are required to file.',
      ],
    },
  ],

  faqs: [
    {
      question: 'How do I become a filer in Pakistan?',
      answer:
        'File an income tax return. The Active Taxpayer List is generated from returns filed, so there is no separate application. If you are not registered, register first under section 181 to get a National Tax Number, which is free, then file the return for the last completed tax year.',
    },
    {
      question: 'How long does it take to become a filer after filing?',
      answer:
        'Immediately, if you filed by the due date. FBR moved the Active Taxpayer List to daily updates in October 2024 and stated that taxpayers filing by the due date are included immediately. FBR\'s own list page still says the update happens every Monday, which is out of date.',
    },
    {
      question: 'How much does it cost to become a filer?',
      answer:
        'Registration is free and filing a return costs nothing. If you file after the due date, section 182A requires a surcharge before you are included in the list: Rs 25,000 for an individual, Rs 50,000 for an association of persons and Rs 100,000 for a company.',
    },
    {
      question: 'Can I avoid the late filing surcharge?',
      answer:
        'An individual can. The Finance Act 2026 provided that the surcharge does not apply to an individual who furnishes an undertaking with the concerned Commissioner not to purchase, acquire or otherwise obtain ownership or beneficial interest in any property for six months from the date of the undertaking.',
    },
    {
      question: 'Do I need to file a return if my employer already deducts tax?',
      answer:
        'Deduction at source and filing are different obligations. Your employer withholding tax on salary does not put you on the Active Taxpayer List, so without a filed return you will still pay non-filer rates on property, vehicles and banking transactions.',
    },
    {
      question: 'What is the last date to file a tax return in Pakistan?',
      answer:
        'For a salaried individual the return for a tax year ending 30 June is due by 30 September. FBR has extended that date in past years, including twice in tax year 2025, but an extension is an administrative decision rather than something to plan around.',
    },
    {
      question: 'I am registered with FBR but not on the Active Taxpayer List. Why?',
      answer:
        'Because registration and filing are separate. Registration gives you a National Tax Number; the list is built from who has filed a return. If you registered but never filed, you hold an NTN and are not a filer.',
    },
  ],

  publishedAt: '2026-09-11T03:00:00Z',
  related: ['filer-vs-non-filer', 'how-to-get-an-ntn'],

  seo: {
    title: 'How to Become a Filer in Pakistan: Three Steps',
    description:
      'Register, file one return, check your status. What the late surcharge costs after the Finance Act 2026, the undertaking that avoids it, and why inclusion is now immediate.',
  },
};

/**
 * The status-check guide.
 *
 * Verification intent is 208 of the 2,233 harvested Pakistani queries, and the
 * four highest-prominence tool queries are all "...registration check". The
 * site has no verification tool yet, and building one needs an external data
 * source rather than the in-browser arithmetic the calculators use.
 *
 * So this is the honest version: explain the official routes precisely, say
 * what each one tells you, and cover the case the SMS reply cannot explain.
 * It captures the informational half of the intent at the cost of a page
 * rather than an integration.
 */
const CHECKING_ATL_STATUS: Guide = {
  slug: 'check-your-atl-status',
  cluster: 'filer',
  title: 'How to Check Whether You Are on the Active Taxpayer List',
  navLabel: 'Checking ATL status',
  card: 'Every official route, what the reply actually means, and why you can be registered, have filed, and still not appear.',

  answer:
    'Send ATL followed by a space and your 13-digit CNIC to 9966, or use FBR\'s online status page. An association or company sends its 7-digit NTN instead, and Azad Jammu and Kashmir uses AJKATL. The list is rebuilt daily and a person filing by the due date is included immediately, which is a change from the weekly update FBR\'s own page still describes.',

  sections: [
    {
      kind: 'list',
      heading: 'The official routes',
      intro:
        'All of these are FBR\'s own. The syntax differs by taxpayer type, which is where most failed checks come from.',
      items: [
        'SMS for an individual: ATL, a space, then your 13-digit CNIC with no dashes, to 9966',
        'SMS for an association or company: ATL, a space, then the 7-digit NTN, to 9966',
        'SMS in Azad Jammu and Kashmir: AJKATL rather than ATL, with a CNIC or an 11-digit NTN',
        'Online: FBR\'s Active Taxpayer List status page, and its separate taxpayer profile inquiry',
        'The full list: FBR publishes the whole Active Taxpayer List for download, which is what you want if you are checking many people at once',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Azad Jammu and Kashmir has its own list',
      body: 'It is a separate Active Taxpayer List with its own SMS keyword, and it has been treated at par with the income tax ATL since the Finance Act 2018. Sending ATL rather than AJKATL for an AJK taxpayer returns the wrong answer rather than an error, which is the kind of failure that goes unnoticed.',
    },

    {
      kind: 'prose',
      heading: 'What the answer actually tells you',
      body: [
        'The list records who has filed a return for the relevant tax year. That is all it records. It is not a statement that your tax affairs are in order, that you owe nothing, or that a past year was filed correctly.',
        'It matters because being on it changes the rate withheld on property, vehicles, banking and dividends. Somebody checking your status before a transaction is checking which column of the rate table applies to you, not forming a view about you.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'FBR contradicts itself on how often the list updates',
      body: 'FBR\'s Active Taxpayer List page still says the list is updated every Monday. FBR\'s own press release of 18 October 2024 says it moved to daily updates, and that a taxpayer filing by the due date is included immediately, replacing the older practice of shifting the list annually each March. The press release is the current position and the download page carries a daily date stamp. If you filed on time, you are not waiting a week.',
    },

    {
      kind: 'prose',
      heading: 'Registered, filed, and listed are three different states',
      body: [
        'This is the reason most "why am I not showing" questions arise. Registration under section 181 gives you a National Tax Number. Filing a return under section 114 is a separate act. The Active Taxpayer List is built from who has filed.',
        'So a person who registered years ago and never filed holds an NTN and is not on the list. A person who filed last year but not this one may drop off. And a person holding only a CNIC has neither, even though section 181(4) makes that CNIC their National Tax Number for when they do register.',
      ],
    },

    {
      kind: 'steps',
      heading: 'If the check says you are not on it',
      intro: 'Work through these in order. Most cases resolve at the second step.',
      steps: [
        {
          title: 'Check you sent the right thing',
          body: 'Thirteen digits without dashes for an individual, seven for an association or company, and AJKATL rather than ATL if you are in Azad Jammu and Kashmir.',
        },
        {
          title: 'Check whether you actually filed',
          body: 'In IRIS, the return and the wealth statement should both be in Completed Task rather than Draft. A return left in Draft was never filed, and this is the single most common cause.',
        },
        {
          title: 'Check which year you filed for',
          body: 'The list is built from the last completed tax year. Filing for an earlier year does not put you on the current list.',
        },
        {
          title: 'If you filed late, pay the surcharge',
          body: 'Under section 182A inclusion after the due date requires a surcharge of Rs 25,000 for an individual, Rs 50,000 for an association and Rs 100,000 for a company, unless you give the Commissioner an undertaking not to acquire property for six months.',
        },
      ],
    },

    {
      kind: 'calculator',
      toolSlug: 'property-purchase-tax',
      heading: 'What the status is worth on a transaction',
      body: 'If you are checking before buying property, this shows the difference the answer makes in rupees. A filer pays a flat 1.25% and a non-filer pays a banded rate rising to 18.5%.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Checking someone else',
      body: 'The list is public, and checking a counterparty before a property transaction or a large contract is ordinary practice rather than an intrusion. You need their CNIC or NTN, and the same routes work. If you are verifying many people, download the full list rather than sending a hundred texts.',
    },
  ],

  faqs: [
    {
      question: 'How do I check my filer status by CNIC?',
      answer:
        'Send ATL, a space, and your 13-digit CNIC without dashes to 9966. You can also use FBR\'s online Active Taxpayer List status page. An association of persons or a company sends its 7-digit NTN instead of a CNIC.',
    },
    {
      question: 'How often is the Active Taxpayer List updated?',
      answer:
        'Daily. FBR moved to daily updates in October 2024 and stated that a taxpayer filing by the due date is included immediately. FBR\'s own ATL page still says every Monday, which is out of date, and the older practice of shifting the list annually each March has also gone.',
    },
    {
      question: 'I filed my return but I am not on the Active Taxpayer List. Why?',
      answer:
        'Most often because the return is still sitting in the Draft folder in IRIS rather than in Completed Task, which means it was never actually filed. Other causes are filing for an earlier tax year than the one the current list is built from, or filing late without paying the section 182A surcharge.',
    },
    {
      question: 'What is the SMS format to check ATL status in Pakistan?',
      answer:
        'ATL, a space, then your 13-digit CNIC with no dashes, sent to 9966. For an association or company it is ATL, a space, then the 7-digit NTN. In Azad Jammu and Kashmir the keyword is AJKATL rather than ATL.',
    },
    {
      question: 'Does having an NTN mean I am on the Active Taxpayer List?',
      answer:
        'No. Registration and filing are separate. An NTN means you are registered with FBR; the list records who has filed a return. A person who registered and never filed holds an NTN and is not on the list.',
    },
    {
      question: 'Can I check someone else\'s filer status?',
      answer:
        'Yes. The Active Taxpayer List is public and you need only their CNIC or NTN. Checking a counterparty before a property transaction or a large contract is ordinary practice, and FBR publishes the full list for download if you are verifying many people.',
    },
  ],

  publishedAt: '2026-09-15T07:00:00Z',
  related: ['filer-vs-non-filer', 'how-to-become-a-filer'],

  seo: {
    title: 'How to Check Your Active Taxpayer List Status in Pakistan',
    description:
      'Every official route including the SMS formats to 9966, why the list now updates daily rather than weekly, and what to do when you have filed but are still not showing.',
  },
};


/**
 * Guide 25: tax on a car.
 *
 * The guide that found a bug in our own calculator. Two provisions interact
 * and most coverage carries only one of them: Division VII clause (2) reduces
 * the transfer RATE by a tenth each year, and the proviso to s.231B(2) stops
 * COLLECTION entirely after five years. The cut-off binds first, so the taper
 * never runs past 50 per cent and a car five years old carries no transfer tax
 * at all. Our module tapered to ten years until this was reconciled.
 *
 * The other two points nobody covers: s.231B(2A), the anti-flipping rule for a
 * car sold before it is registered, and s.231B(4), which is what a reader
 * needs when a second collection is demanded on the same vehicle.
 */

const VEHICLE_TAX: Guide = {
  slug: 'tax-on-buying-a-car',
  cluster: 'filer',
  title: 'Tax on Buying and Transferring a Car in Pakistan',
  navLabel: 'Vehicle tax',
  card: 'What is collected at registration and at transfer, the five-year point after which nothing is due, and the rule that stops you paying twice on the same car.',

  answer:
    'Advance tax under section 231B is collected twice over a car\'s life: once by the Excise and Taxation registering authority at first registration, charged on value in engine-capacity bands, and again on any later transfer of registration, as a fixed amount by band. The transfer charge falls by a tenth for each year since first registration, and nothing at all is collected once the vehicle is five years old.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'Nothing is collected on a transfer after five years',
      body: 'This is the point most coverage misses, and it changes the arithmetic completely on an older car. The rate does fall by ten per cent a year from first registration, which is the part everyone quotes. But the proviso to section 231B(2) says something stronger: no collection of advance tax under that sub-section shall be made on transfer of vehicles after five years from the date of first registration in Pakistan. The cut-off arrives before the taper finishes. So the reduction only ever runs from a hundred per cent down to sixty, and from five years the charge is nil rather than continuing to shrink toward year ten. Buying a car older than five years, the filer and non-filer gap on this section does not arise at all, because neither pays anything.',
    },

    {
      kind: 'calculator',
      toolSlug: 'vehicle-tax',
      heading: 'What it comes to on your car',
      body: 'Enter the engine capacity, the transaction and the age. The calculator applies the band, the taper and the five-year cut-off, and shows what the other filer status would pay on the same car.',
    },

    {
      kind: 'prose',
      heading: 'Two different charges, and they work differently',
      body: [
        'Section 231B(1) is the charge at first registration of a locally manufactured vehicle, collected by the Excise and Taxation registering authority at the Division VII rates. It is calculated on the value of the vehicle within engine-capacity bands, so a more expensive car in the same band pays more.',
        'Section 231B(2) is the charge on a later transfer of registration or ownership, and it is a fixed amount per band rather than a percentage. The value of the car does not enter it at all. Someone selling a well-maintained car and someone selling a wreck of the same engine size face the same figure, subject to the age reduction.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Not on the Active Taxpayer List costs three times, not twice',
      body: 'The usual shorthand is that a non-filer pays double. On vehicles it is triple. The Tenth Schedule increases the rate by one hundred per cent by default, but section 231B carries a proviso taking the increase to two hundred per cent, which makes the figure three times the filer amount rather than twice it. On a mid-sized car that is a difference worth more than the cost of filing a return.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'You should not pay twice on the same vehicle',
      body: 'Section 231B(4) is the provision to know if you are asked for advance tax at registration having already paid at the showroom or at import. It disapplies the sub-section (1) charge where the person produces evidence that tax was already collected from the same person under sub-section (3), which is the manufacturer collecting at the point of sale, or under section 148, which is collection at import. Keep the manufacturer\'s or the customs receipt, and keep it in the name of the person registering the vehicle, because the section requires it to have been collected from the same person.',
    },

    {
      kind: 'prose',
      heading: 'Selling your allocation before the car is registered',
      body: [
        'Booking a car and selling the allocation before taking delivery, sometimes called own-money, has its own rule. Section 231B(2A) requires the registering authority to collect tax at the Division VII rates at registration where a locally manufactured vehicle has been sold prior to registration by the person who originally bought it from the manufacturer.',
        'The effect is that the transaction does not escape the section by happening before the car reaches the register. Whoever finally registers it pays, and the person who flipped the allocation has not removed the charge, only moved it.',
      ],
    },

    {
      kind: 'list',
      heading: 'Who the section does not apply to',
      intro:
        'The proviso to section 231B(1) lists the exemptions, and they are institutional rather than personal. There is no exemption here for a first-time buyer, a small car or a low income.',
      items: [
        'The Federal Government',
        'A Provincial Government',
        'A Local Government',
        'A foreign diplomat',
        'A diplomatic mission in Pakistan',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'It is no longer only about private cars',
      body: 'The section used to read "advance tax on private motor vehicles" and the Finance Act 2022 omitted the word "private" from both the heading and the operative sub-section. The Ordinance\'s own contents page still carries the old title, which is a good illustration of why the operative text is what to read. Secondary coverage almost universally still calls it a tax on private motor vehicles.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Electric vehicles are handled by value, not capacity',
      body: 'Where engine capacity does not apply and the vehicle is worth five million rupees or more, Division VII charges a flat percentage at registration and a fixed twenty thousand rupees on transfer, rather than trying to place it in a cc band. The ten per cent annual reduction and the five-year cut-off apply to the transfer figure in the same way.',
    },

    {
      kind: 'prose',
      heading: 'What this tax is, and is not',
      body: [
        'It is advance income tax, not a road tax and not a registration fee. It is collected by the Excise and Taxation department but it belongs to your federal income tax account, and it is creditable against your liability for the year in the ordinary way.',
        'That is worth separating from provincial motor vehicle token tax, which is a genuinely different provincial charge levied annually on keeping a vehicle on the road. The two are collected by the same department and are constantly confused, in much the same way that federal advance tax on property and provincial property tax are confused.',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much tax do I pay when buying a car in Pakistan?',
      answer:
        'At first registration, advance tax under section 231B(1) at the Division VII rates, charged on the value of the vehicle within engine-capacity bands. On a later transfer, a fixed amount by band instead, reduced by a tenth for each year since first registration.',
    },
    {
      question: 'Is there tax on transferring a car older than five years?',
      answer:
        'No. The proviso to section 231B(2) provides that no collection shall be made on transfer of vehicles after five years from the date of first registration in Pakistan. The ten per cent annual reduction stops mattering at that point because there is nothing left to collect.',
    },
    {
      question: 'How much more does a non-filer pay on a car?',
      answer:
        'Three times the filer amount, not double. The Tenth Schedule doubles rates by default, but section 231B carries a proviso taking the increase to two hundred per cent, which trebles the figure.',
    },
    {
      question: 'I paid tax at the showroom. Do I pay again at registration?',
      answer:
        'You should not. Section 231B(4) disapplies the registration charge where you produce evidence that tax was already collected from the same person under sub-section (3), by the manufacturer, or under section 148 on import. Keep the receipt and check it is in the name of the person registering the vehicle.',
    },
    {
      question: 'Is advance tax on a car the same as token tax?',
      answer:
        'No. Section 231B is federal advance income tax, creditable against your income tax liability for the year. Motor vehicle token tax is a separate provincial charge for keeping a vehicle on the road. Both are handled by Excise and Taxation, which is why they get confused.',
    },
    {
      question: 'What if I sell my car booking before registering it?',
      answer:
        'Section 231B(2A) requires the registering authority to collect at the Division VII rates where a locally manufactured vehicle was sold before registration by the person who originally bought it from the manufacturer. The charge is not avoided, only shifted to whoever registers it.',
    },
    {
      question: 'Does section 231B apply to commercial vehicles?',
      answer:
        'It is no longer limited to private ones. The Finance Act 2022 omitted the word "private" from the heading and from sub-section (1), although the Ordinance contents page and most published summaries still carry the old title.',
    },
    {
      question: 'How is an electric vehicle taxed under section 231B?',
      answer:
        'By value rather than engine capacity. Where capacity does not apply and the vehicle is worth five million rupees or more, Division VII sets a flat percentage at registration and a fixed twenty thousand rupees on transfer, with the same annual reduction and five-year cut-off.',
    },
  ],

  publishedAt: '2026-09-22T03:00:00Z',
  related: ['filer-vs-non-filer', 'check-your-atl-status'],

  seo: {
    title: 'Tax on Buying and Transferring a Car in Pakistan',
    description:
      'Section 231B explained: what is collected at registration and transfer, why nothing is due after five years, the triple rate for non-filers, and how not to pay twice.',
  },
};

export const FILER_GUIDES: Guide[] = [FILER_VS_NON_FILER,
  HOW_TO_BECOME_A_FILER,
  CHECKING_ATL_STATUS, VEHICLE_TAX];

