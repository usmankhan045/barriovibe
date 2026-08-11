import type { Service } from '../types';

/**
 * Discipline 06: Intellectual Property.
 *
 * These three used to sit inside Corporate & Compliance. They were split out
 * when the catalogue grew: registrations and IP prosecution are bought by
 * different people at different moments, and a discipline holding both put a
 * founder incorporating a company and a brand owner fighting a copycat in the
 * same list.
 *
 * IPO Pakistan throughout: Nice Classification classes for trade marks, the
 * Copyright Ordinance 1962 categories, and the 20-year patent term.
 */
export const IP_SERVICES: Service[] = [
  {
    slug: 'trademark-registration',
    pillar: 'intellectual-property',
    title: 'Trademark Registration',
    navLabel: 'Trademark Registration',
    oneLiner:
      'Your brand name and logo searched, filed and registered with IPO Pakistan, with the objection stage handled if one arrives.',
    intro:
      'Registration turns a name you use into a name you own. We search the register before you file, so a conflict surfaces now rather than a year and a half into the examination queue, then file in the correct Nice classes with the Intellectual Property Organization of Pakistan and answer the examination reports and any opposition through to a registration certificate.',
    icon: 'trademark',
    included: [
      'Clearance search of the IPO Pakistan register before you commit to a name',
      'Class selection under the Nice Classification, covering how you actually trade',
      'TM-1 application drafting and filing with IPO Pakistan',
      'Response to examination reports and office objections',
      'Journal publication monitoring and opposition handling',
      'Registration certificate collection and renewal diarising',
    ],
    audience: ['New brands about to launch', 'E-commerce and retail sellers', 'Businesses facing a copycat'],
    steps: [
      {
        title: 'Search and advice',
        description:
          'We search the register for identical and confusingly similar marks and give you a written view on registrability before you spend anything on filing.',
      },
      {
        title: 'Filing',
        description:
          'Application filed in the correct classes with your specification of goods or services, and the filing receipt issued.',
      },
      {
        title: 'Examination',
        description:
          'IPO examines the mark. If an objection is raised, we draft and file the response, included, not billed as an extra.',
      },
      {
        title: 'Publication and registration',
        description:
          'The mark is advertised in the Trade Marks Journal for opposition. If unopposed, the registration certificate issues.',
      },
    ],
    deliverables: [
      'Written clearance search report with a registrability opinion',
      'Filed TM-1 application and official filing receipt',
      'Responses to any examination report raised',
      'Trademark registration certificate',
      'A renewal reminder schedule, since registration runs ten years',
    ],
    documents: [
      'The wordmark, or the logo as a high-resolution image',
      'CNIC of the applicant, or incorporation certificate for a company',
      'List of goods or services the mark will be used on',
      'Date of first use in Pakistan, if already trading',
      'Signed Form TM-48 power of attorney',
    ],
    related: ['copyright-registration', 'patent-registration', 'shopify-store-development'],
    faqs: [
      {
        question: 'Why does registration take so long?',
        answer:
          'The waiting is IPO Pakistan’s examination and publication queue, not our filing. Your protection, however, dates back to the filing date once registered, so the sooner you file, the earlier your priority. Trading with a "TM" mark while the application is pending is normal and expected.',
      },
      {
        question: 'How many classes do I need?',
        answer:
          'One per distinct category of goods or services. A clothing brand that also sells cosmetics needs two. Filing in classes you do not actually trade in wastes money and leaves the registration vulnerable to non-use cancellation, so we scope this to your real business rather than filing broadly.',
      },
      {
        question: 'What if someone opposes my mark?',
        answer:
          'Oppositions are filed during the journal publication window. We notify you immediately, assess the strength of the opposition honestly, and scope defending it separately. This stage sits outside the standard engagement because effort varies enormously. Many oppositions are resolved by negotiating a coexistence agreement rather than litigating.',
      },
      {
        question: 'Does a Pakistan trademark protect me abroad?',
        answer:
          'No. Trademark rights are territorial. A Pakistan registration protects you in Pakistan only. If you sell into other markets, you need separate filings there. The Madrid Protocol can make multi-country filing cheaper, and we can advise on whether it fits.',
      },
    ],
    seo: {
      title: 'Trademark Registration in Pakistan (IPO)',
      description:
        'Trademark search, class selection and TM-1 filing with IPO Pakistan. Objection responses and opposition handling through to registration.',
    },
  },

  {
    slug: 'copyright-registration',
    pillar: 'intellectual-property',
    title: 'Copyright Registration',
    navLabel: 'Copyright Registration',
    oneLiner:
      "Your software, content or creative work registered with IPO Pakistan's Copyright Office, so ownership is a certificate, not an argument.",
    intro:
      'Copyright exists from the moment you create an original work. Proving that you created it first, years later and in front of somebody who disagrees, is the harder problem. We register the work with the Copyright Office at IPO Pakistan in the correct category and fee class, so what you hold is a certificate that counts as prima facie evidence of ownership rather than a folder of dated files.',
    icon: 'copyright',
    included: [
      'Work classification into the correct category: literary, artistic, musical, software or cinematograph',
      'Application drafting and filing with the IPO Pakistan Copyright Office',
      'Fee computation for the specific category and use, since software and commercial artistic works are priced differently',
      'Journal publication monitoring through the two-month objection window',
      'Response to any objection raised by an interested party',
      'Registration certificate collection and safekeeping',
    ],
    audience: ['Software and app developers', 'Publishers, authors and designers', 'Brands with proprietary content'],
    steps: [
      {
        title: 'Classification and advice',
        description:
          'We identify the correct category for your work and confirm the fee, which varies by category and, for artistic works, by whether it is used commercially.',
      },
      {
        title: 'Filing',
        description:
          'Application filed with the Copyright Office along with the required copies of the work and supporting affidavits.',
      },
      {
        title: 'Journal publication',
        description:
          'Accepted applications are published in the Copyright Journal, opening a two-month window for anyone to object.',
      },
      {
        title: 'Certificate',
        description:
          'If unopposed, the registration certificate issues. If opposed, we assess the objection and scope a response separately.',
      },
    ],
    deliverables: [
      'Filed copyright application and official receipt',
      'Confirmation of Journal publication',
      'Response to any objection raised during the publication window',
      'Copyright registration certificate',
    ],
    documents: [
      'Copies of the work in the format the Copyright Office prescribes for its category',
      'CNIC of the author, or incorporation certificate for a company',
      'A signed declaration of original authorship',
      'For artistic works used commercially, proof of the goods or services it is used on',
      'Power of attorney if we are filing on your behalf',
    ],
    related: ['trademark-registration', 'patent-registration', 'web-development'],
    faqs: [
      {
        question: 'Do I need to register to own the copyright?',
        answer:
          'No. Copyright exists automatically the moment an original work is created, under the Copyright Ordinance 1962. Registration is voluntary, but the certificate it produces is prima facie evidence of ownership and authorship, which matters enormously if you ever need to prove you were first, in a dispute, a licensing deal or in court.',
      },
      {
        question: 'Does this cover software and app code?',
        answer:
          'Yes. Computer programs are registered as literary work under Pakistani copyright law, with its own fee category. Register the version that matters, typically a stable release, and treat later versions as derivative works if you want them separately protected.',
      },
      {
        question: 'Will a Pakistan copyright protect me if I sell internationally?',
        answer:
          'Copyright protection is granted nationally, but Pakistan participates in international arrangements that extend some reciprocal recognition, so origin-country protection often carries further than trademark rights do. The specifics depend on the destination market. Tell us where you are selling and we will confirm the actual position rather than assume one.',
      },
      {
        question: 'What happens if someone objects during the Journal publication?',
        answer:
          'You are notified and given the chance to respond. Most objections are about disputed authorship or a prior claim to the same work, not simple copying, and get resolved on the papers rather than in a hearing. If it escalates, we scope defending it as separate work once we have seen what is actually being argued.',
      },
    ],
    seo: {
      title: 'Copyright Registration in Pakistan (IPO)',
      description:
        'Copyright registration with IPO Pakistan: category classification, filing, Journal publication and objection handling through to certificate.',
    },
  },

  {
    slug: 'patent-registration',
    pillar: 'intellectual-property',
    title: 'Patent Registration',
    navLabel: 'Patent Registration',
    oneLiner:
      'Your invention filed, examined and carried through to grant with IPO Pakistan, protected for 20 years from the filing date.',
    intro:
      'A trade mark protects what you call it and copyright protects how you expressed it. A patent is the only one that protects how the thing works. We file the application with IPO Pakistan, answer the formality and substantive examination reports, and carry it through publication in the Official Gazette and any opposition to grant.',
    icon: 'patent',
    included: [
      'Patentability assessment: novelty, inventive step and industrial applicability, before you file',
      'Specification and claims drafting that actually covers what you built',
      'Application filing with IPO Pakistan',
      'Response to formality and substantive examination reports',
      'Publication and opposition monitoring in the Official Gazette',
      'Grant certificate collection and renewal-fee diarising for the 20-year term',
    ],
    audience: [
      'Hardware and product inventors',
      'Manufacturers with a proprietary process',
      'R&D teams protecting an invention before disclosure',
    ],
    steps: [
      {
        title: 'Patentability review',
        description:
          'We assess whether the invention is novel, involves an inventive step, and is industrially applicable, and give you a written view before you spend on filing.',
      },
      {
        title: 'Drafting and filing',
        description:
          'Specification and claims drafted to the scope that is actually defensible, then filed with IPO Pakistan.',
      },
      {
        title: 'Examination',
        description:
          'Formality examination confirms the application is complete; substantive examination tests the invention itself. We respond to every objection raised.',
      },
      {
        title: 'Publication and grant',
        description:
          'The application is published in the Official Gazette for opposition. If unopposed, the Patent Registration Certificate issues.',
      },
    ],
    deliverables: [
      'Written patentability opinion',
      'Filed patent specification and claims',
      'Responses to formality and substantive examination reports',
      'Patent Registration Certificate',
      'A renewal schedule for the 20-year term',
    ],
    documents: [
      'A full technical description of the invention, with drawings where relevant',
      'Details of any prior public disclosure or existing similar solutions you are aware of',
      'CNIC of the inventor, or incorporation certificate for a company applicant',
      'Assignment documentation if the inventor and the applicant are not the same',
      'Signed power of attorney',
    ],
    related: ['trademark-registration', 'copyright-registration', 'agentic-ai-development'],
    faqs: [
      {
        question: 'How long does a Pakistani patent last?',
        answer:
          'Twenty years from the filing date, or from the earliest priority date if you claimed priority from an earlier foreign filing. It is not indefinite: annual maintenance fees keep it in force, and missing them lapses the patent before the term is up.',
      },
      {
        question: 'Why does examination take so long?',
        answer:
          'Formality examination is quick, usually a couple of months, but substantive examination tests novelty and inventive step against everything already known, and the queue at IPO Pakistan is long. Responding to objections quickly is the one part of the timeline you control, and slow responses are the most common reason a filing drags past two years.',
      },
      {
        question: 'What can and cannot be patented in Pakistan?',
        answer:
          'New, non-obvious inventions with an industrial use qualify. Discoveries, scientific theories, business methods and software as such are generally excluded, though a software-driven invention with a genuine technical effect can sometimes still qualify. We give you a straight answer on your specific case before you pay to file, not after.',
      },
      {
        question: 'Should I patent it or keep it a trade secret?',
        answer:
          'A patent gives you an enforceable monopoly for 20 years in exchange for publicly disclosing exactly how the invention works. A trade secret protects indefinitely, but only for as long as nobody else works it out independently. If the invention is reverse-engineerable from the product itself, patenting is usually the safer bet.',
      },
    ],
    seo: {
      title: 'Patent Registration in Pakistan (IPO)',
      description:
        'Patent filing with IPO Pakistan: patentability review, specification drafting, examination response and grant, protected for 20 years from filing.',
    },
  },
];
