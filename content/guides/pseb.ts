import type { Guide } from './types';

/**
 * Cluster 2: PSEB and IT export.
 *
 * The convergence wedge in its purest form: it needs the tax half and the
 * software half at once, which is why nobody writes it properly.
 *
 * Its strongest section is a correction that took two rounds of research to
 * pin down. The "80 percent of export proceeds through banking channels"
 * condition, which appears on essentially every competitor page as a live
 * requirement for the 0.25 percent rate, was never in s.154A at all. It was a
 * proviso to s.65F(1)(c), omitted by the Finance Act 2022. Every source
 * asserting it collapses to that one repealed clause.
 */

const PSEB_RATE: Guide = {
  slug: 'pseb-registration-and-the-025-rate',
  cluster: 'pseb',
  title: 'PSEB Registration and the 0.25% IT Export Rate',
  navLabel: 'PSEB and the 0.25% rate',
  card: 'What section 154A actually requires, the 80% banking condition that was repealed in 2022, and what PSEB really charges.',

  answer:
    'Registering with PSEB cuts the tax on IT and IT-enabled export proceeds from 1% to 0.25%, and the Finance Act 2026 extended that rate to tax year 2029. Registration is a statutory condition written into section 154A itself, not a formality. It costs Rs 1,000 a year for a freelancer. The widely repeated requirement to bring 80% of proceeds through banking channels was repealed in 2022 and does not apply.',

  sections: [
    {
      kind: 'prose',
      heading: 'Where the rate comes from',
      body: [
        'Section 154A requires every authorised dealer in foreign exchange to deduct tax when it realises foreign exchange proceeds on certain accounts. The first of those, in clause (a), is exports of computer software or IT services or IT enabled services, and it carries a condition in the statute itself: the exporter must be "registered with and duly certified by the Pakistan Software Export Board".',
        'Division IVA of Part III of the First Schedule then sets two rates. For PSEB-registered exporters of software and IT services, 0.25% of proceeds. In any other case, 1%. PSEB registration is therefore not paperwork that helps your claim, it is the thing that decides which of two rates the bank applies when your money arrives.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The rate now runs to 2029',
      body: 'The Ordinance as consolidated to 31 July 2025 limits the 0.25% rate to tax years 2024 up to tax year 2026, and pages quoting that limit are reading a document that predates the Finance Act 2026. The Act extended the rate from tax year 2026 to tax year 2029. This is worth knowing generally: FBR\'s consolidated PDFs carry an "amended up to" date, and anything after it is missing.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The 80% banking condition does not exist',
      body: 'Almost every guide states that 80% of your export proceeds must come through normal banking channels to get the 0.25% rate. That condition was never in section 154A. It was a proviso to section 65F(1)(c), and the Finance Act 2022 omitted that clause entirely; the consolidated Ordinance prints the repealed text in a footnote, which is how it can be checked. It also makes no structural sense as a condition here: section 154A operates at the moment an authorised dealer realises foreign exchange, so the proceeds are already through a banking channel by definition.',
    },

    {
      kind: 'prose',
      heading: 'Why the myth persists',
      body: [
        'Because it used to be nearly true. Before 2022, section 154A(1)(a) applied the reduced rate "in case tax credit under section 65F is not available", so the two provisions were linked and a condition sitting in 65F felt like a condition on 154A. The Finance Act 2022 replaced that trigger with the PSEB registration requirement, and the two have been independent ever since.',
        'The same amendment did something else worth knowing: section 65F no longer covers IT exports at all. Only two limbs survive, coal mining projects in Sindh and a startup as defined in section 2(62A) that has been certified by PSEB, for the certification year and the two following. If you read that a 100% tax credit is available on IT export income, that is repealed law.',
      ],
    },

    {
      kind: 'table',
      heading: 'What PSEB charges',
      intro:
        'From PSEB\'s own registration pages. Note that pseb.org.pk now redirects: PSEB operates as Tech Destination, so guides still pointing at the old paths are stale.',
      columns: ['Registrant', 'New registration', 'Renewal'],
      rows: [
        ['Freelancer', 'Rs 1,000 per year', 'Rs 2,000 per year'],
        ['IT company, established within 12 months', 'Rs 5,000 per year', 'By revenue, below'],
        ['IT company, established over 12 months', 'Rs 10,000 per year', 'By revenue, below'],
        ['Company renewal, revenue up to Rs 50m', '-', 'Rs 10,000 per year'],
        ['Company renewal, Rs 50m to 100m', '-', 'Rs 15,000 per year'],
        ['Company renewal, Rs 100m to 300m', '-', 'Rs 20,000 per year'],
        ['Company renewal, Rs 300m to 600m', '-', 'Rs 25,000 per year'],
        ['Company renewal, above Rs 600m', '-', 'Rs 30,000 per year'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The startup fee is not just a discount',
      body: 'PSEB charges Rs 5,000 rather than Rs 10,000 to register an IT company established within the last twelve months. That band lines up with the one surviving software limb of section 65F, which gives a startup certified by PSEB a 100% tax credit for the certification year and the next two. If you are inside twelve months of incorporation, the cheaper registration and the credit are worth looking at together rather than separately.',
    },

    {
      kind: 'list',
      heading: 'What a freelancer needs',
      intro:
        'Three documents for a new registration. The first one causes more rejections than the other two.',
      items: [
        'A personal NTN with no business name on it. PSEB is specific about this, and a business NTN will not do.',
        'Both sides of your CNIC',
        'A personal bank account letter or certificate',
        'At renewal, additionally: a summary of export revenue carrying the correct IT or ITeS code from the State Bank, and the previous year\'s income tax return',
      ],
    },

    {
      kind: 'list',
      heading: 'What a company needs',
      intro: 'More, and the export revenue summary matters as much as the incorporation papers.',
      items: [
        'Business NTN',
        'CNICs of all directors, shareholders, partners or the proprietor, and passports for any foreign nationals',
        'Memorandum and articles, Form 29 and the incorporation certificate for an SECP entity, or the partnership deed and firm registration certificate for a firm',
        'Six months of business bank statements, or a bank account letter',
        'A summary of export revenue with the correct State Bank IT or ITeS code',
        'A financial statement from audited accounts, or the tax return',
      ],
    },

    {
      kind: 'prose',
      heading: 'Making the 0.25% final rather than an instalment',
      body: [
        'The deduction under section 154A is a final tax only if three conditions in subsection (2) are met: a return has been filed, withholding tax statements for the year have been filed where required, and sales tax returns under federal or provincial law have been filed where required.',
        'The third condition carries a proviso that matters enormously to freelancers and is mentioned almost nowhere: it does not apply to an exporter falling within clause (a), which is the software and IT services category. So a PSEB-registered IT exporter with no sales tax registration does not lose final tax status for that reason. If you have been told otherwise, that is the answer.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Letting registration lapse costs a surcharge',
      body: 'PSEB registration is annual for every category. An expired registration is revived by paying a surcharge of Rs 5,000 per year on top of the renewal fee. We found no published grace period, so the practical answer is to treat the renewal date as a hard deadline rather than a suggestion.',
    },

    {
      kind: 'prose',
      heading: 'What happens if you export without registering',
      body: [
        'Nothing dramatic, and this is worth saying plainly because the alternative reading frightens people into paying for advice they do not need. Exporting IT services without PSEB registration is entirely lawful. The consequence is a rate consequence: you fall outside clause (a) and into "any other case", so the bank deducts 1% instead of 0.25%.',
        'For context on how that gap has widened, the Finance Act 2026 raised the export-of-goods rate under section 154 from 1% to 1.25%. A PSEB-registered software exporter now pays a fifth of what an exporter of goods pays, and a quarter of what an unregistered service exporter pays.',
      ],
    },

    {
      kind: 'calculator',
      toolSlug: 'freelancer-tax',
      heading: 'What the difference is worth on your numbers',
      body: 'Enter your annual export receipts to see the gap between the registered and unregistered rate, against the Rs 1,000 a year the registration costs.',
    },
  ],

  faqs: [
    {
      question: 'What is the 0.25% tax rate for IT exports in Pakistan?',
      answer:
        'Division IVA of Part III of the First Schedule sets 0.25% of proceeds for exports of computer software, IT services or IT enabled services by persons registered with the Pakistan Software Export Board, against 1% in any other case. The Finance Act 2026 extended the 0.25% rate to tax year 2029.',
    },
    {
      question: 'Do I need to bring 80% of my export proceeds through banking channels?',
      answer:
        'No. That condition was a proviso to section 65F(1)(c), which the Finance Act 2022 omitted. It was never a condition of section 154A. It also makes no structural sense there, because section 154A operates when an authorised dealer realises foreign exchange, so the proceeds are already through a banking channel.',
    },
    {
      question: 'How much does PSEB registration cost?',
      answer:
        'For a freelancer, Rs 1,000 a year for a new registration and Rs 2,000 a year to renew. For a company, Rs 5,000 if established within the last twelve months or Rs 10,000 otherwise, with renewal banded by revenue from Rs 10,000 up to Rs 30,000 above Rs 600 million.',
    },
    {
      question: 'Is PSEB registration mandatory for IT exporters?',
      answer:
        'No. Exporting IT services without it is lawful. Registration is the statutory condition in section 154A(1)(a) for the 0.25% rate, so without it your bank deducts 1% instead. It is a rate consequence, not a legality one.',
    },
    {
      question: 'Do I need sales tax registration to get final tax status on IT exports?',
      answer:
        'No. Section 154A(2)(c) requires sales tax returns to have been filed where required, but its proviso disapplies that condition for exporters within clause (a), which is the software and IT services category. A PSEB-registered IT exporter with no sales tax registration keeps final tax status.',
    },
    {
      question: 'Does section 65F still give IT exporters a 100% tax credit?',
      answer:
        'No. The IT export limb was clause (c) and the Finance Act 2022 omitted it. Section 65F survives only for coal mining projects in Sindh and for a startup as defined in section 2(62A) certified by PSEB, for the certification year and the two following tax years.',
    },
    {
      question: 'What NTN do I need for PSEB registration as a freelancer?',
      answer:
        'A personal NTN with no business name attached to it. PSEB states this explicitly and a business NTN will be rejected, which is one of the more common reasons a freelancer registration comes back.',
    },
    {
      question: 'What happens if my PSEB registration expires?',
      answer:
        'It can be revived, but PSEB charges a surcharge of Rs 5,000 per year on top of the renewal fee for an expired registration. We found no published grace period.',
    },
    {
      question: 'Is pseb.org.pk still the right website?',
      answer:
        'It redirects. PSEB now operates as Tech Destination, with registration through its portal. Guides still sending you to old pseb.org.pk paths have not been updated.',
    },
  ],

  publishedAt: '2026-09-13T03:00:00Z',
  related: ['how-to-get-an-ntn', 'filer-vs-non-filer'],

  seo: {
    title: 'PSEB Registration and the 0.25% IT Export Tax Rate',
    description:
      'What section 154A actually requires for the 0.25% rate, the 80% banking condition repealed in 2022, PSEB\'s real fees, and the proviso that exempts IT exporters from the sales tax condition.',
  },
};

/**
 * The freelancer guide.
 *
 * Separate from the PSEB guide because the searcher is different: this one has
 * not decided to register yet, or is not exporting at all, and needs the whole
 * picture before the PSEB question is even live.
 *
 * It carries the KPK finding, which is the opposite of what most pages assume.
 * Islamabad zero-rates exported services under s.3(1A) of the ICT Ordinance.
 * The KP Act contains no such relief and s.3(4) expressly taxes a service that
 * originates in the Province and terminates outside Pakistan. Since the firm
 * is in Khyber Pakhtunkhwa, getting that right matters more here than anywhere.
 */
const FREELANCER_TAX: Guide = {
  slug: 'tax-for-freelancers',
  cluster: 'pseb',
  title: 'Tax for Freelancers in Pakistan',
  navLabel: 'Freelancer tax',
  card: 'Which rate applies to your export receipts, why domestic clients usually withhold nothing, and the provincial question that catches people in KPK.',

  answer:
    'Freelance income is business income, taxed on the non-salaried slabs, not the gentler salaried ones. Export receipts are withheld by your bank under section 154A: 0.25% if you are registered with PSEB, 1% if not. A domestic client withholds nothing unless it is a prescribed person. The 80% banking-channel rule you have read about was repealed in 2022.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'Your slabs are not the salaried slabs',
      body: 'This is the most expensive assumption a freelancer makes. Division I of the First Schedule has two tables, and the salaried one applies only where salary exceeds seventy-five percent of taxable income. On the first taxable band a salaried person pays one percent and a freelancer pays fifteen. On Rs 1.2 million of taxable income that is Rs 6,000 against Rs 90,000.',
    },

    {
      kind: 'table',
      heading: 'The non-salaried table',
      intro:
        'Unchanged by the Finance Act 2026, which reduced the salaried rates and left these alone. The gap widened this year rather than narrowing.',
      columns: ['Taxable income', 'Rate on the excess', 'Tax at the floor'],
      rows: [
        ['Up to Rs 600,000', 'Nil', '-'],
        ['Rs 600,001 to Rs 1,200,000', '15%', '-'],
        ['Rs 1,200,001 to Rs 1,600,000', '20%', 'Rs 90,000'],
        ['Rs 1,600,001 to Rs 3,200,000', '30%', 'Rs 170,000'],
        ['Rs 3,200,001 to Rs 5,600,000', '40%', 'Rs 650,000'],
        ['Above Rs 5,600,000', '45%', 'Rs 1,610,000'],
      ],
    },

    {
      kind: 'prose',
      heading: 'Exporting: two rates, and PSEB is what separates them',
      body: [
        'Section 154A requires every authorised dealer in foreign exchange, which in practice means your bank, to deduct tax when it realises your foreign proceeds. There are two relevant limbs and competitors collapse them into one.',
        'Clause (a) covers exports of computer software, IT services or IT enabled services where the exporter is registered with and duly certified by PSEB, and the rate is 0.25%. Clause (b) covers services or technical services rendered outside Pakistan or exported from Pakistan generally, and the rate is 1%.',
        'So an unregistered freelancer exporting services is not outside section 154A. They are inside it at four times the rate. The Finance Act 2026 extended the 0.25% rate to tax year 2029.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The 80% banking rule does not exist',
      body: 'Nearly every freelancer guide states that 80% of your proceeds must arrive through normal banking channels to qualify for the reduced rate. That condition was a proviso to section 65F(1)(c), and the Finance Act 2022 omitted the whole clause. It was never a condition of section 154A, and it would make no sense there: section 154A operates at the moment your bank realises foreign exchange, so the money is already in a banking channel by definition.',
    },

    {
      kind: 'calculator',
      toolSlug: 'freelancer-tax',
      heading: 'What the registration is worth',
      body: 'Enter your annual export receipts to see the gap between 0.25% and 1%, against the Rs 1,000 a year PSEB registration costs.',
    },

    {
      kind: 'prose',
      heading: 'Domestic clients usually withhold nothing',
      body: [
        'Section 153 requires withholding on services, but only where the payer is a prescribed person. That list includes companies, associations of persons, and individuals or associations with turnover of Rs 100 million or more, among others. An ordinary small business paying you for a website is not on it.',
        'There is also a floor: services are only caught where payments to you aggregate above Rs 30,000 in a financial year. Below the prescribed-person threshold and below that floor, nothing is withheld, and the income is simply declared in your return with advance tax under section 147 if it applies.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'A genuine ambiguity if a large company does withhold',
      body: 'The Finance Act 2026 touched two entries that could both describe a freelance developer. IT services and IT enabled services as defined in section 2 are withheld at 4%. Independent professional services remain at 15%, and the Act inserted an express list naming software engineers or developers working independently. We can find no ruling resolving which applies to a self-employed developer billing a Pakistani company, and the difference is large enough that it is worth asking your client which entry they are applying before the payment is made.',
    },

    {
      kind: 'prose',
      heading: 'What counts as IT and IT enabled services',
      body: [
        'The definitions are in section 2. IT services include but are not limited to software development, software maintenance, system integration, web design, web development, web hosting and network design. IT enabled services include but are not limited to call centres, medical transcription, remote monitoring, graphics design, accounting services, HR services, telemedicine, data entry, cloud computing and data storage.',
        'Both lists are inclusive rather than exhaustive, and what is missing is conspicuous: video editing, translation, copywriting, general virtual assistance and social media management are not named. Whether they qualify is a real question for a large number of Pakistani freelancers, and we have found no FBR ruling on it. If your work sits outside the named list, get advice rather than assuming the answer.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Sales tax in Khyber Pakhtunkhwa is not what most guides assume',
      body: 'Islamabad zero-rates the export of services under section 3(1A) of the ICT Ordinance. The Khyber Pakhtunkhwa Sales Tax on Services Act 2022 contains no equivalent relief. Section 3(4) says the opposite: unless otherwise specified by Government, where a taxable service originates from the Province but terminates outside Pakistan, the provider is required to pay tax on it. The word export appears twice in the whole Act and neither time as an exemption. Entry 15 of the Second Schedule taxes digital and IT-based services at 2% without input tax adjustment, and names web design, mobile app development, custom software development and SEO among others.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'One point we cannot resolve for you',
      body: 'Entry 15 carries an Explanation excluding people providing software or IT-based system development in their individual capacity, and points them at item (g) of entry 19 instead. But entry 19 spells out its reduced rate of 2% only for medical and legal practitioners. So the Act sends an individual software freelancer to a reduced rate whose figure is not stated for that category in the text. We are not going to invent one. If you are an individual freelancer in KPK, ask KPRA directly, and ask us if you want help framing the question.',
    },

    {
      kind: 'prose',
      heading: 'Inward remittance is not tax-free',
      body: [
        'Section 111(4) is widely misdescribed. It provides that the unexplained-income rules do not apply to foreign exchange remitted through normal banking channels not exceeding five million rupees in a tax year, encashed into rupees by a scheduled bank, with a certificate produced to that effect. The Finance Act 2022 added that money service bureaus, exchange companies and money transfer operators count as normal banking channels.',
        'Three things follow that guides rarely state. It is capped at Rs 5 million a year. It requires encashment and a certificate, not merely receipt. And it is only a shield against being asked to explain the source: it is not an exemption from tax on the income itself, which remains taxable under section 154A or on the slabs.',
      ],
    },

    {
      kind: 'list',
      heading: 'Housekeeping that catches people out',
      items: [
        'A personal NTN is enough, and PSEB actively requires a personal NTN with no business name for a freelancer registration.',
        'But section 114A requires you to declare the bank account you use for business transactions, through the registration form.',
        'Records must be kept for six years after the end of the tax year under section 174, and indefinitely for foreign-source matters.',
        'Final tax does not mean no filing. Section 114(1)(ae) requires a return from anyone whose income is subject to final taxation, and section 154A(2)(a) makes filing a condition of the final-tax treatment itself.',
        'Minimum tax under section 113 applies to an individual only at Rs 100 million turnover, so it is almost certainly not your problem.',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much tax do freelancers pay in Pakistan?',
      answer:
        'On export receipts, your bank withholds 0.25% if you are registered with PSEB and 1% if not, under section 154A. Domestic income is taxed on the non-salaried slabs, which start at 15% on income above Rs 600,000 and reach 45% above Rs 5.6 million.',
    },
    {
      question: 'Do freelancers pay the same tax rates as salaried people in Pakistan?',
      answer:
        'No, and the difference is large. The salaried table applies only where salary exceeds seventy-five percent of taxable income. At the first taxable band a salaried person pays 1% and a freelancer pays 15%.',
    },
    {
      question: 'Do I need to bring 80% of my freelance earnings through a bank?',
      answer:
        'No. That condition was a proviso to section 65F(1)(c) and the Finance Act 2022 omitted the clause entirely. It was never part of section 154A, which operates when your bank realises the foreign exchange in any event.',
    },
    {
      question: 'Do Pakistani clients deduct tax from freelancers?',
      answer:
        'Only if they are a prescribed person under section 153, which covers companies, associations of persons, and individuals or associations with turnover of Rs 100 million or more, among others. There is also a Rs 30,000 aggregate floor per financial year. An ordinary small client withholds nothing.',
    },
    {
      question: 'Is foreign remittance taxable in Pakistan?',
      answer:
        'The remittance itself is not treated as unexplained income up to Rs 5 million a year under section 111(4), provided it comes through normal banking channels, is encashed into rupees and a bank certificate is produced. That is a shield against having to explain the source. The income remains taxable.',
    },
    {
      question: 'Do freelancers in KPK have to register for sales tax?',
      answer:
        'Possibly, and exporting does not obviously help. Unlike Islamabad, which zero-rates exported services, the KP Act has no export relief and section 3(4) taxes a service originating in the Province that terminates outside Pakistan. Entry 15 of the Second Schedule taxes digital and IT-based services at 2%. The position for an individual freelancer under entry 19 is ambiguous on the face of the Act, so ask KPRA.',
    },
    {
      question: 'Do I need a business NTN as a freelancer?',
      answer:
        'No. A personal NTN is sufficient, and PSEB specifically requires a personal NTN with no business name attached for freelancer registration. You do have to declare the bank account you use for business under section 114A.',
    },
    {
      question: 'Is video editing or translation an IT enabled service?',
      answer:
        'Not named in section 2(30AE), which lists call centres, medical transcription, remote monitoring, graphics design, accounting, HR services, telemedicine, data entry, cloud computing and data storage among others. The list is inclusive rather than exhaustive, so the question is open and we have found no FBR ruling on it.',
    },
    {
      question: 'If my tax is final, do I still have to file a return?',
      answer:
        'Yes, twice over. Section 114(1)(ae) requires a return from anyone whose income is subject to final taxation, and section 154A(2)(a) makes filing a return a condition of the final-tax treatment. Fail to file and you lose the 0.25% rate.',
    },
  ],

  publishedAt: '2026-09-16T07:00:00Z',
  related: ['pseb-registration-and-the-025-rate', 'how-to-get-an-ntn'],

  seo: {
    title: 'Tax for Freelancers in Pakistan: Rates and Rules',
    description:
      'Why freelancers use the non-salaried slabs, the 0.25% and 1% export rates under section 154A, the repealed 80% banking rule, and what KPK sales tax actually says about exported services.',
  },
};

export const PSEB_GUIDES: Guide[] = [PSEB_RATE, FREELANCER_TAX];
