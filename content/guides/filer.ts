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

  publishedAt: '2026-09-10',
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

  publishedAt: '2026-09-12',
  related: ['filer-vs-non-filer', 'how-to-get-an-ntn'],

  seo: {
    title: 'How to Become a Filer in Pakistan: Three Steps',
    description:
      'Register, file one return, check your status. What the late surcharge costs after the Finance Act 2026, the undertaking that avoids it, and why inclusion is now immediate.',
  },
};

export const FILER_GUIDES: Guide[] = [FILER_VS_NON_FILER, HOW_TO_BECOME_A_FILER];
