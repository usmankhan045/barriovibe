import type { Service } from '../types';

/**
 * Pillar 03 — Corporate & Compliance.
 *
 * Pakistan-specific throughout: SECP eServices, IPO Pakistan trademark classes
 * under the Nice Classification, Pakistan Single Window for import–export,
 * Form A / Form 29 statutory returns.
 */
export const CORPORATE_SERVICES: Service[] = [
  {
    slug: 'trademark-registration',
    pillar: 'corporate-compliance',
    title: 'Trademark Registration',
    navLabel: 'Trademark Registration',
    oneLiner:
      'Your brand name and logo searched, filed and registered with IPO Pakistan, with the objection stage handled if one arrives.',
    intro:
      'A registered trademark is what turns a name you use into a name you own. We run a clearance search before filing so you find out about conflicts early rather than eighteen months in, file in the correct classes with IPO Pakistan, and handle examination reports and oppositions through to registration.',
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
        title: 'Search & advice',
        description:
          'We search the register for identical and confusingly similar marks and give you a written view on registrability before you spend anything on filing.',
        duration: '2–3 days',
      },
      {
        title: 'Filing',
        description:
          'Application filed in the correct classes with your specification of goods or services, and the filing receipt issued.',
        duration: '3–5 days',
      },
      {
        title: 'Examination',
        description:
          'IPO examines the mark. If an objection is raised, we draft and file the response, included, not billed as an extra.',
        duration: '6–12 months',
      },
      {
        title: 'Publication & registration',
        description:
          'The mark is advertised in the Trade Marks Journal for opposition. If unopposed, the registration certificate issues.',
        duration: '4–8 months',
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
    turnaround: 'Filing in 3–5 days · registration typically 12–24 months',
    related: ['corporate-secretarial-compliance', 'import-export-license', 'shopify-store-development'],
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
    slug: 'import-export-license',
    pillar: 'corporate-compliance',
    title: 'Import & Export License',
    navLabel: 'Import/Export License',
    oneLiner:
      'Everything needed to legally import or export from Pakistan: WeBOC and PSW registration, chamber membership and customs setup.',
    intro:
      'Cross-border trade in Pakistan runs through the Pakistan Single Window, and getting on it requires a specific sequence of registrations in a specific order. We handle the whole chain, from sales tax registration and chamber membership to PSW and WeBOC enrolment and customs profile setup, so your first consignment clears without a false start.',
    icon: 'globe-arrows',
    included: [
      'Eligibility review and the correct registration sequence for your trade',
      'Pakistan Single Window (PSW) registration and profile setup',
      'WeBOC user ID and trader enrolment',
      'Chamber of Commerce and Industry membership',
      'Sales tax registration where required for import or export',
      'Customs agent coordination and first-consignment guidance',
    ],
    audience: ['First-time importers', 'Exporters and manufacturers', 'E-commerce sellers sourcing abroad'],
    steps: [
      {
        title: 'Scoping',
        description:
          'We confirm your business structure, the HS codes you will trade under, and which registrations your specific goods actually require.',
        duration: '2–3 days',
      },
      {
        title: 'Prerequisites',
        description:
          'NTN, sales tax registration and chamber membership put in place. These gate everything downstream and are where most delays occur.',
        duration: '1–3 weeks',
      },
      {
        title: 'PSW & WeBOC',
        description:
          'Single Window registration completed, user IDs issued, and your trader profile configured with bank and financial details.',
        duration: '5–10 days',
      },
      {
        title: 'First consignment',
        description:
          'We walk you through your first GD filing and clearance alongside your customs agent, so the process is learned rather than outsourced forever.',
        duration: 'As needed',
      },
    ],
    deliverables: [
      'Active PSW account with configured trader profile',
      'WeBOC user ID and credentials',
      'Chamber of Commerce membership certificate',
      'Sales tax registration certificate, where applicable',
      'A written checklist of documents required per consignment',
    ],
    documents: [
      'NTN certificate and CNIC of proprietor or directors',
      'Incorporation certificate and Memorandum of Association, for companies',
      'Business bank account maintenance certificate',
      'Proof of business premises: ownership or rent agreement',
      'Recent electricity bill for the premises',
      'Passport-size photographs of the authorised person',
    ],
    turnaround: '2–5 weeks depending on which prerequisites already exist',
    related: ['sales-tax-registration-filing', 'corporate-secretarial-compliance', 'ecommerce-management'],
    faqs: [
      {
        question: 'Is there a single "import-export licence" in Pakistan?',
        answer:
          'Not as one document, despite the common name. What you actually need is a set of registrations, namely NTN, sales tax where applicable, chamber membership, and PSW/WeBOC enrolment, completed in the right order. Attempting them out of sequence is the usual cause of weeks of delay.',
      },
      {
        question: 'Can an individual import, or do I need a company?',
        answer:
          'A sole proprietorship with an NTN can import. A private limited company is often worth it anyway for liability separation and for the credibility it carries with foreign suppliers, but it is not a legal requirement.',
      },
      {
        question: 'Do you handle customs clearance itself?',
        answer:
          'We set up your registrations and coordinate with a licensed clearing agent, and we guide you through the first consignment. Ongoing per-consignment clearance is a customs agent’s function and is billed by them directly. We will introduce you to one we have worked with.',
      },
    ],
    seo: {
      title: 'Import Export License in Pakistan: PSW & WeBOC Registration',
      description:
        'Complete import-export setup: Pakistan Single Window registration, WeBOC enrolment, chamber membership and customs profile configuration.',
    },
  },

  {
    slug: 'corporate-secretarial-compliance',
    pillar: 'corporate-compliance',
    title: 'Corporate Compliance',
    navLabel: 'Corporate Compliance',
    oneLiner:
      'Company incorporation and every SECP filing that follows: annual returns, director changes, and the statutory registers.',
    intro:
      'Incorporating is a one-day event; staying compliant is a permanent obligation that most companies quietly fall behind on. We register your company with SECP, then run the compliance calendar of Form A annual returns, Form 29 for any change in directors, statutory registers and board minutes, so penalties never accrue in the background.',
    icon: 'building',
    included: [
      'Company incorporation with SECP: private limited, SMC or LLP',
      'Name reservation, MoA and AoA drafting, and digital signature setup',
      'Annual Form A filing and audited accounts submission',
      'Form 29 filings for changes in directors, officers or registered office',
      'Statutory registers, board minutes and resolutions maintained',
      'A compliance calendar with deadlines tracked and flagged in advance',
    ],
    audience: ['Founders incorporating', 'Companies behind on filings', 'Businesses restructuring ownership'],
    steps: [
      {
        title: 'Structure advice',
        description:
          'We recommend the right vehicle, whether SMC, private limited or LLP, based on your ownership, liability exposure and funding plans.',
        duration: '1–2 days',
      },
      {
        title: 'Incorporation',
        description:
          'Name reserved, constitutional documents drafted, digital signatures issued, and the company registered through SECP eServices.',
        duration: '3–7 days',
      },
      {
        title: 'Post-registration',
        description:
          'NTN obtained, bank account opened, statutory registers opened and first board resolutions passed.',
        duration: '1–2 weeks',
      },
      {
        title: 'Ongoing compliance',
        description:
          'Annual and event-based filings prepared and submitted on schedule, with a reminder to you before each deadline rather than after.',
        duration: 'Ongoing',
      },
    ],
    deliverables: [
      'Certificate of Incorporation',
      'Memorandum and Articles of Association',
      'Company NTN and registered bank account',
      'Statutory registers: members, directors, charges',
      'Filed Form A and Form 29 with SECP acknowledgements',
      'A compliance calendar for the year ahead',
    ],
    documents: [
      'CNIC of all directors and subscribers',
      'Three proposed company names in order of preference',
      'Proof of registered office address',
      'Shareholding split between subscribers',
      'Passport-size photographs of directors',
    ],
    turnaround: 'Incorporation 3–7 working days · compliance filings ongoing',
    related: ['income-tax-filing', 'trademark-registration', 'financial-accounting'],
    faqs: [
      {
        question: 'Should I register an SMC or a private limited company?',
        answer:
          'A Single Member Company suits one owner with no plans to bring in partners. A private limited allows two to fifty shareholders and is what any investor will expect to see. Converting from SMC to private limited later is possible but is extra cost and paperwork, so if outside investment is plausible within two years, start as a private limited.',
      },
      {
        question: 'What happens if I miss an SECP filing?',
        answer:
          'Penalties accrue per day of default against both the company and its directors personally, and the company can be struck off the register for prolonged non-compliance. Because the penalties are daily and quiet, companies routinely discover a very large number only when they next need a clean certificate for a bank, a tender or a sale.',
      },
      {
        question: 'Can foreign nationals be directors?',
        answer:
          'Yes, with additional documentation and, in some cases, security clearance depending on nationality and sector. It adds time to incorporation rather than preventing it. Tell us upfront so we build it into the timeline.',
      },
      {
        question: 'Do I need a physical office to register?',
        answer:
          'You need a registered office address in Pakistan where official correspondence can be served. It does not have to be commercial premises, and a residential address is acceptable, but it must be real and you must actually receive post there.',
      },
    ],
    seo: {
      title: 'Company Registration & SECP Compliance in Pakistan',
      description:
        'SECP company incorporation plus ongoing corporate compliance: Form A annual returns, Form 29 filings and statutory registers maintained.',
    },
  },
];
