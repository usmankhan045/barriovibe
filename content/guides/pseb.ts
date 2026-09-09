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

  publishedAt: '2026-09-16',
  related: ['how-to-get-an-ntn', 'filer-vs-non-filer'],

  seo: {
    title: 'PSEB Registration and the 0.25% IT Export Tax Rate',
    description:
      'What section 154A actually requires for the 0.25% rate, the 80% banking condition repealed in 2022, PSEB\'s real fees, and the proviso that exempts IT exporters from the sales tax condition.',
  },
};

export const PSEB_GUIDES: Guide[] = [PSEB_RATE];
