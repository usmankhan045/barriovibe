import type { Guide } from './types';

/**
 * US LLC guides, cluster: cross-border.
 *
 * Two supporting pages for the US Company Formation service: which state to
 * form in, and how Stripe actually treats a Pakistani-owned US LLC. Kept in
 * their own file so cross-border.ts does not grow past the point of being
 * reviewable. The annual compliance calendar stays where it is, in
 * cross-border.ts as 'us-llc-annual-compliance', and both guides here link to
 * it rather than restating it.
 *
 * ── Provenance, read before editing a figure ──
 *
 * Delaware: formation fee from the Division of Corporations fee schedule
 * revised 1 August 2026 (de-llc-formation-fee-110), certificate contents from
 * 6 Del. C. s.18-201 (de-18-201-formation-contents), annual tax from s.18-1107
 * (de-llc-400-statute-resolves-conflict). The annual tax is 400, not 300.
 *
 * Wyoming: wyo.gov is still unreachable at TCP level from here. The fee
 * schedule effective 1 July 2026 was read from an archive capture dated
 * 25 September 2026 (wy-fees-reconfirmed-sep2026), and the Articles form from a
 * capture dated 11 September 2026 (wy-articles-form-contents). The guide says
 * so. "No state income tax" is NOT asserted: wy-no-state-income-tax-unverified.
 *
 * New Mexico: from the LLC Act itself, ss.53-19-8 and 53-19-63
 * (nm-53-19-8-articles-contents, nm-llc-no-annual-report). Gross receipts tax
 * rate deliberately not stated: nm-grt-services-in-nm.
 *
 * Stripe: every requirement is quoted from Stripe's own support pages or its
 * published requirements data (stripe-pakistan-not-supported,
 * stripe-us-account-requirements, stripe-ssn-requirement-conflicting-pages,
 * stripe-tin-match-assumes-us-owner, stripe-payout-bank-rules). The EIN lag is
 * quoted as two separate figures from the two parties and no waiting period is
 * promised (stripe-ein-lag-reconfirmed-sep2026, closing OPEN-ITEMS item 3).
 */

const STATE_CHOICE: Guide = {
  slug: 'wyoming-vs-delaware-llc-for-pakistanis',
  cluster: 'cross-border',
  title: 'Wyoming vs Delaware vs New Mexico LLC for Pakistanis',
  navLabel: 'Which US state for your LLC',
  card: 'What each state charges to form and to keep, what goes on the public record, and the short list of things that actually differ when you have no US presence.',

  answer:
    'For a Pakistani owner with no US presence, the three states differ mainly in cost and paperwork. Wyoming charges USD 100 to form and a USD 60 minimum each year. New Mexico charges USD 50 to form and nothing annually. Delaware charges USD 110 to form and USD 400 every 1 June. All three require a commercial registered agent, and the federal filings are identical whichever you choose.',

  sections: [
    {
      kind: 'table',
      heading: 'The three states side by side',
      intro:
        'Every figure below is read from the state\'s own fee schedule or statute. Registered agent fees are not included, because they are set by the agent rather than the state.',
      columns: ['', 'Wyoming', 'Delaware', 'New Mexico'],
      rows: [
        ['Filing fee to form', 'USD 100', 'USD 110', 'USD 50'],
        ['Annual state charge', 'USD 60, or USD .0002 per dollar of Wyoming assets if greater', 'USD 400 annual tax', 'None'],
        ['When it falls due', 'First day of your anniversary month', '1 June', 'Not applicable'],
        ['Annual report', 'Yes', 'None for an LLC', 'None'],
        ['Registered agent', 'Required, with a physical Wyoming address', 'Required, with a Delaware street address', 'Required: a New Mexico resident or an entity with a place of business there'],
        ['Owner names on the formation document', 'Not asked for; the organizer signs', 'Not required', 'Not required'],
        ['Other addresses on the formation document', 'Mailing address and principal office address', 'None beyond the registered agent', 'Principal place of business, if different from the registered office'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'What does not change with the state',
      body: 'The expensive obligations are federal, and they are the same in all three. A US LLC wholly owned by one non-US person files Form 5472 behind a pro forma Form 1120 every year, whether it traded or not, with a USD 25,000 penalty for missing it. The EIN is obtained the same way, by phone or by faxing Form SS-4, because the IRS online application is closed to applicants whose principal place of business is outside the United States. Stripe asks for the same things whichever state issued your certificate. And in Pakistan, the LLC is a foreign asset under section 116A regardless of where it was formed. Choosing a state moves a few hundred dollars a year; it does not move any of these.',
    },

    {
      kind: 'prose',
      heading: 'What you actually pay each year',
      body: [
        'Over the life of a company that sits in one state and bills clients elsewhere, the annual charge is the number that matters, because the formation fee is paid once. New Mexico charges nothing: its LLC Act contains no annual report provision, and its fee schedule in section 53-19-63 lists no annual fee. Wyoming charges USD 60 on the first day of the month in which you formed, because the licence tax is calculated on assets located and employed in Wyoming, and an LLC run from Pakistan usually has none. Delaware charges USD 400 by 1 June under 6 Del. C. section 18-1107(b), and it files no annual report at all.',
        'Add the registered agent to every column. You cannot act as your own from Pakistan in any of the three, so that fee recurs for as long as the company exists. Compare agent renewal prices, not only first-year prices, when you compare states.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Delaware is USD 400 a year, not 300',
      body: 'Most formation guides still print USD 300, and one of Delaware\'s own pages does too. The statute, section 18-1107(b), sets the LLC annual tax at USD 400, and the Division of Corporations\' tax instructions agree. Late payment adds a USD 200 penalty and interest at 1.5% a month. A Delaware corporation is a different regime altogether, with an annual report, franchise tax and a 1 March deadline, and quotes for one are regularly passed off as the other. The full account, with the other states\' dates, is in our guide to what a US LLC costs to keep.',
    },

    {
      kind: 'prose',
      heading: 'Privacy: what each formation document has to contain',
      body: [
        'Wyoming and New Mexico are usually sold as the private options. Measured by what the formation document itself must contain, Delaware asks for the least. Section 18-201(a) requires the LLC\'s name and its registered agent and office, plus anything the members choose to add. That is the whole list.',
        'Wyoming\'s Articles of Organization form asks for a mailing address and a principal office address as well as the agent, and it is signed by an organizer who prints their name on it, so whoever acts as organizer decides whose name is on the filing. New Mexico\'s section 53-19-8 requires the street address of the company\'s principal place of business wherever that differs from the registered office. For a company run from Lahore, that can mean a Pakistani address. None of the three asks for the members\' names.',
        'Keep the limit of this in view. It concerns the state filing only. The IRS requires the EIN application to name a responsible party and states that nominees are not authorized to apply. Stripe and US banks verify the individuals behind the company. A US LLC does not make its owner anonymous to anyone who pays it or taxes it.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Where the Wyoming figures came from',
      body: 'No wyo.gov host has been reachable from our environment in September 2026: connections time out rather than being refused, so there is no block to work around. The Wyoming fees above come from the Secretary of State\'s own fee schedule, effective 1 July 2026, read from an archive capture dated 25 September 2026, and the form details from the Secretary of State\'s own Articles of Organization form. They are the state\'s documents, read at one remove. Check the live figure before you pay.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Wyoming\'s annual report has a 60-day edge',
      body: 'The Secretary of State\'s own filing instructions say annual reports are due on the first day of the anniversary month and that an entity which has not paid within 60 days of the due date will be subject to dissolution. The fee schedule then prices the way back: USD 100 to reinstate after dissolution for tax, and USD 350 to reinstate after losing a registered agent. The second figure is the one to note, because letting an agent subscription lapse is a much easier mistake than forgetting the report.',
    },

    {
      kind: 'prose',
      heading: 'New Mexico: cheapest to file, with two things to check',
      body: [
        'New Mexico is the only one of the three with no recurring state charge, and that is established by reading its LLC Act through rather than by failing to find a fee. Two cautions. A widely repeated USD 10 annual report figure is New Mexico corporation data and does not apply to an LLC. And New Mexico gross receipts tax reaches services performed in New Mexico, or performed elsewhere where the product is first used there, so a company with New Mexico clients should look at that before assuming the state costs nothing.',
        'The other practical point is filing. The Secretary of State now accepts business filings online only, through its enterprise portal, and no longer takes paper.',
      ],
    },

    {
      kind: 'list',
      heading: 'What this comparison leaves out, on purpose',
      intro:
        'These are real questions. They are left out because we could not answer them from a primary source, or because they belong to a different decision.',
      items: [
        'State income tax. "Wyoming has no state income tax" is repeated everywhere, and we could not confirm it from an official Wyoming source this month, so this guide does not rely on it',
        'The New Mexico gross receipts tax rate. We confirmed what the tax reaches, not a current rate, so no rate is stated',
        'Corporations and venture funding. Investors\' preference for Delaware is an argument about corporations raising money, and it is a separate decision from where a single-member LLC should sit',
        'Sales tax nexus in the states your customers live in, which follows your sales rather than your state of formation',
      ],
    },
  ],

  faqs: [
    {
      question: 'Which US state is best for an LLC if I live in Pakistan?',
      answer:
        'For a single-member LLC with no US presence, the states differ mainly in cost. New Mexico has no annual state charge, Wyoming charges a USD 60 minimum each year, and Delaware charges USD 400 every 1 June. The federal filings and the Pakistani obligations are the same whichever you choose, and all three require a commercial registered agent.',
    },
    {
      question: 'How much does it cost to form an LLC in Wyoming, Delaware or New Mexico?',
      answer:
        'The state filing fee is USD 100 in Wyoming, USD 110 in Delaware under the fee schedule revised 1 August 2026, and USD 50 in New Mexico under section 53-19-63 of its LLC Act. Registered agent fees come on top and are set by the agent, not the state.',
    },
    {
      question: 'Is the Delaware LLC annual tax USD 300 or USD 400?',
      answer:
        'USD 400, due on or before 1 June. 6 Del. C. section 18-1107(b) states the figure. Pages quoting USD 300 are out of date, and Delaware LLCs file no annual report.',
    },
    {
      question: 'Does a New Mexico LLC have to file an annual report?',
      answer:
        'No. The New Mexico LLC Act contains no annual report provision and its fee schedule lists no annual fee. The USD 10 annual report figure that circulates belongs to New Mexico corporations.',
    },
    {
      question: 'Which state keeps my name off the public record?',
      answer:
        'None of the three requires members\' names on the formation document. Delaware\'s certificate needs only the company name and registered agent. Wyoming\'s form carries the organizer\'s printed name plus mailing and principal office addresses, and New Mexico\'s articles need the principal place of business if it differs from the registered office. The IRS, banks and Stripe still identify the owner.',
    },
    {
      question: 'Can I be my own registered agent from Pakistan?',
      answer:
        'No, in any of the three. Wyoming requires a physical Wyoming address and rejects a drop box, Delaware requires a Delaware street address, and New Mexico requires a resident individual or an entity with a place of business there. The agent is a recurring annual cost.',
    },
    {
      question: 'Does the state I choose change my US tax filing?',
      answer:
        'No. A foreign-owned single-member LLC files Form 5472 with a pro forma Form 1120 each year in all three states, it cannot be e-filed, and the penalty for missing it is USD 25,000. The state decides only the state fee and paperwork.',
    },
    {
      question: 'What happens if I miss the Wyoming annual report?',
      answer:
        'The Secretary of State\'s instructions say an entity that has not paid within 60 days of the due date will be subject to dissolution. The fee schedule prices reinstatement at USD 100 after dissolution for tax, and USD 350 where the company lost its registered agent.',
    },
  ],

  publishedAt: '2026-10-05T07:00:00Z',

  cta: {
    heading: 'Choosing a state for a company you will run from Pakistan?',
    body:
      'We choose the state from what you sell and who pays you, file it with the registered agent appointed at the same time, and give you the dates that keep it in good standing.',
    buttonLabel: 'Talk to us about forming your LLC',
    href: '/contact?service=us-company-formation',
  },
  related: ['us-llc-annual-compliance', 'stripe-with-us-llc-from-pakistan', 'us-llc-foreign-asset-declaration'],

  seo: {
    title: 'Wyoming vs Delaware vs New Mexico LLC for Pakistanis',
    description:
      'Formation fees, annual charges, registered agent rules and what each state puts on the record, compared for a Pakistani owner with no US presence.',
  },
};


const STRIPE_FROM_PAKISTAN: Guide = {
  slug: 'stripe-with-us-llc-from-pakistan',
  cluster: 'cross-border',
  title: 'Using Stripe From Pakistan Through a US LLC',
  navLabel: 'Stripe with a US LLC',
  card: 'Why Stripe is not open to Pakistani businesses, what it asks of a US company with a Pakistani owner, where its own pages disagree, and what happens to the money in Pakistan.',

  answer:
    'Stripe does not support Pakistan as an account country, so a Pakistani business cannot open a Stripe account to accept cards. A US-registered company can: Stripe says registered businesses must be registered in the US even if they operate in another country. Expect to provide the company\'s EIN, a US business address that is not a PO box, a passport, a live website and a bank account in the payout currency.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'Pakistan appears in Stripe\'s documents only as a payout destination',
      body: 'Stripe\'s global availability list omits Pakistan. Pakistan does appear in Stripe\'s documentation, but only as a country for cross-border payouts: in Stripe\'s own requirements data a Pakistani account can hold the "transfers" capability under a recipient agreement, and nothing else, and its payouts documentation says Pakistan is only available for cross-border payouts accounts. In practice a platform that uses Stripe can pay you in Pakistan, but you cannot open a Stripe account in Pakistan that accepts card payments from your own customers. That is why the route runs through a US company.',
    },

    {
      kind: 'table',
      heading: 'What Stripe asks for, and what it means from Pakistan',
      intro:
        'Taken from Stripe\'s published verification requirements for a US single-member LLC accepting card payments, and its support pages for US accounts.',
      columns: ['Stripe asks for', 'Stripe\'s own rule', 'For a Pakistani owner'],
      rows: [
        ['Company name and tax ID', 'Verified against IRS records', 'The LLC\'s EIN, obtained by phone or fax from abroad. A new EIN can fail this check for some weeks'],
        ['Company address', '"Must be a U.S. address. PO boxes are not allowed."', 'The difficult one. See the note below'],
        ['Representative identity', 'A passport where the person lives outside the account\'s country', 'Your Pakistani passport'],
        ['Representative tax ID', 'For a non-US representative without an SSN or ITIN, a local tax ID and documents showing you are not a US taxpayer', 'Your Pakistani tax identifier. Stripe does not publish which Pakistani document it accepts'],
        ['Representative address', 'PO boxes not allowed', 'Your home address. The published rule does not require it to be in the US'],
        ['Phone numbers', 'A valid format', 'The published requirements do not ask for a US number'],
        ['Website', 'Publicly accessible, and its content must match the business name and product description', 'A live site describing what the LLC actually sells'],
        ['Bank account for payouts', 'Generally located where the payout currency is an official currency', 'A USD account, which in general means a US-located account'],
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The business address is where the difficulty sits',
      body: 'Stripe\'s requirements table says the company address must be a US address and not a PO box. Its support page on US accounts says every business must give the address of the physical location where the majority of its business activity is carried out. For an LLC run from Pakistan, those two describe different places, and Stripe does not publish how it reconciles them. The one accommodation it does publish: if you are incorporated at a physical US address, you can set your Stripe business address to match the address on your formation document. Do not invent an address: Stripe says it verifies the business address, and may ask for official documents to do it.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The EIN wait, from both sides',
      body: 'A newly issued EIN often fails Stripe\'s tax ID check at first, because the IRS database has not caught up. Stripe says this takes the IRS 3–4 weeks on average, and that if your legal name and tax ID match your SS-4 confirmation letter, for a TIN issued within roughly the last three months, you can upload the letter instead of waiting. The IRS says an EIN can be used immediately to open a bank account, but to wait up to 2 weeks before it will pass IRS TIN Matching. The two figures describe different checks and come from different parties, so neither is a promise. Neither Stripe nor the IRS states a date after which verification is certain.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Stripe\'s own pages do not agree about the SSN',
      body: 'Stripe\'s page on representative tax IDs for US companies says a representative who is not a US individual, and has no SSN or ITIN, should provide a local non-US tax ID and documentation confirming they are not a US taxpayer. A different Stripe support page says that even when a business is verified with an EIN, you are still required to provide the SSN for the individuals associated with every US Stripe account. The first page is specific to US companies and their representatives, so it is the better guide to your case. But we are telling you that the two pages conflict, not promising which one a reviewer will apply. Separately, the representatives page says that once an account reaches USD 500,000 of lifetime payment volume, all listed owners are asked for the last four digits of an SSN or ITIN.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'A gap in Stripe\'s tax ID guidance for foreign owners',
      body: 'Stripe\'s published guide to which name and number match IRS records says a single-member LLC owned by an individual and disregarded for tax should use the owner\'s name and SSN or EIN, not the LLC\'s, and it refers you to the Form W-9 instructions. Those instructions deal with a disregarded entity that has a US owner, and tell foreign persons to use a Form W-8 instead. So the guide describes the US-owned case and says nothing about a Pakistani-owned one. We do not know of a published Stripe answer for that case. If the tax ID check fails, this is the likely reason, and it is a question to raise with Stripe support rather than to solve by trying different numbers.',
    },

    {
      kind: 'steps',
      heading: 'The order that avoids most rejections',
      intro:
        'Each step depends on the one before, and running two at once is how an application ends up waiting on a record that does not exist yet.',
      steps: [
        {
          title: 'Form the LLC',
          body: 'The company must exist before anything else, because the IRS asks you to register the entity with the state before applying for an EIN. Which state is a separate decision, covered in our state comparison.',
        },
        {
          title: 'Get the EIN from abroad',
          body: 'Apply by phone on 267-941-1099 or fax Form SS-4 to 304-707-9471 from outside the US, writing "Foreign" where the form asks for the responsible party\'s SSN or ITIN. Keep the confirmation letter, because Stripe accepts it as evidence while IRS records catch up.',
        },
        {
          title: 'Open the payout account',
          body: 'The IRS says the EIN can be used immediately to open a bank account. Stripe supports ordinary accounts and virtual accounts such as Wise, but warns that non-standard accounts may see more payout failures.',
        },
        {
          title: 'Put the website up',
          body: 'Stripe checks that the site is publicly accessible and matches the business name and product description you enter.',
        },
        {
          title: 'Apply to Stripe',
          body: 'Choose the company business type and single-member LLC structure, give the EIN and the company\'s US address, and verify yourself as representative with your passport. If the tax ID does not verify, upload the SS-4 confirmation letter.',
        },
        {
          title: 'Expect the first payout to take time',
          body: 'Stripe says the first payout is typically scheduled to complete within 7–14 days after your first successful live payment, and can take longer depending on industry, country and risk.',
        },
      ],
    },

    {
      kind: 'prose',
      heading: 'When the money reaches Pakistan',
      body: [
        'Stripe pays the LLC\'s US account. From there, what matters is Pakistani law, and it asks two separate questions. The first is about the money arriving: section 111(4) stops FBR asking you to explain the source of foreign exchange remitted through normal banking channels, within an annual ceiling and only where a scheduled bank encashes it into rupees and certifies that. It shields you from questions about where the money came from. It does not make the income tax free, and export proceeds for services are still charged under section 154A. Our guide to receiving money from abroad sets out the conditions and the certificate to ask for.',
        'The second question is about what you hold. The LLC, and anything sitting in its US account, are foreign assets. A resident individual over the section 116A thresholds must file a foreign income and assets statement with the return, and the penalty for not doing so runs for every year of default. Money left in the US account to avoid Pakistan does not reduce this. It is exactly what the statement exists to capture.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'A third question most Stripe guides never reach',
      body: 'Declaring the LLC to FBR and being permitted to own it are different tests under different regulators. Whether a Pakistani resident may hold a company abroad at all is a State Bank question under the Foreign Exchange Manual, and the general permissions for individuals do not cover forming your own company abroad. That is covered separately, and it is worth reading before the Stripe account goes live rather than after.',
    },

    {
      kind: 'list',
      heading: 'What this guide does not cover',
      intro: 'So that you know where its answer stops.',
      items: [
        'Whether Stripe will approve your business. It underwrites what you sell, and its prohibited and restricted businesses list applies on top of everything above',
        'Stripe Atlas, which forms the company for you. Stripe says Atlas companies can accept payments before the EIN arrives, and that route has its own terms',
        'PayPal and other processors, whose requirements differ',
        'US tax on the LLC\'s income, which depends on facts about your business that a verification checklist cannot settle',
      ],
    },
  ],

  faqs: [
    {
      question: 'Is Stripe available in Pakistan?',
      answer:
        'No. Pakistan is not on Stripe\'s list of supported countries, so a Pakistani business cannot open a Stripe account to accept card payments. Stripe\'s documents list Pakistan only as a destination for cross-border payouts, which lets a platform using Stripe pay someone in Pakistan.',
    },
    {
      question: 'Can I use Stripe from Pakistan with a US LLC?',
      answer:
        'A US-registered company can open a US Stripe account, and Stripe says registered businesses must be registered in the US even if they operate in another country. Approval is not automatic: Stripe verifies the company, its EIN and US address, the representative\'s identity, and the business itself.',
    },
    {
      question: 'Do I need an SSN or ITIN to open Stripe for my US LLC?',
      answer:
        'Stripe\'s page for representatives of US companies says a non-US representative without an SSN or ITIN can provide a local tax ID and documents showing they are not a US taxpayer. Another Stripe page says an SSN is required for every US account. The pages conflict, and Stripe does not say which Pakistani document it accepts.',
    },
    {
      question: 'Why is Stripe not verifying my new EIN?',
      answer:
        'Because IRS records lag behind issuance. Stripe says this takes the IRS 3–4 weeks on average and accepts an uploaded SS-4 confirmation letter for a recently issued TIN. The IRS separately says to wait up to 2 weeks before an EIN will pass TIN Matching.',
    },
    {
      question: 'Do I need a US address for Stripe?',
      answer:
        'For the company, yes: Stripe\'s requirements say the company address must be a US address and not a PO box. Stripe also says you may use the address on your formation document if you are incorporated at a physical US address. The representative\'s own address is not required to be in the US.',
    },
    {
      question: 'Do I need a US phone number for Stripe?',
      answer:
        'Stripe\'s published requirements ask for a representative phone number and a support phone number in a valid format. They do not say either must be a US number.',
    },
    {
      question: 'Can Stripe pay out to a Pakistani bank account?',
      answer:
        'Generally not. Stripe says payout bank accounts are generally located where the payout currency is an official currency, so USD payouts go to a US-located account. Pakistani bank accounts appear in Stripe\'s documentation only for cross-border payouts.',
    },
    {
      question: 'Is money from my Stripe US LLC taxable in Pakistan?',
      answer:
        'Generally yes, if you are resident. Section 111(4) can stop FBR asking where remitted money came from, but it does not exempt income, and export proceeds for services are charged under section 154A. The LLC and its US balance are also foreign assets for the section 116A statement.',
    },
  ],

  publishedAt: '2026-10-06T03:00:00Z',

  cta: {
    heading: 'Setting up a US company so you can take Stripe payments?',
    body:
      'We form the LLC, obtain the EIN from abroad, and prepare the bank and Stripe applications with the address, ownership and website evidence each of them asks for.',
    buttonLabel: 'Talk to us about a US company for Stripe',
    href: '/contact?service=us-company-formation',
  },
  related: [
    'wyoming-vs-delaware-llc-for-pakistanis',
    'receiving-money-from-abroad',
    'us-llc-foreign-asset-declaration',
    'can-a-pakistani-company-own-a-foreign-entity',
  ],

  seo: {
    title: 'Stripe From Pakistan With a US LLC: What It Requires',
    description:
      'Why Stripe does not support Pakistan, what it asks of a US LLC with a Pakistani owner, where its own pages disagree, and what happens to the money in Pakistan.',
  },
};

export const US_LLC_GUIDES: Guide[] = [STATE_CHOICE, STRIPE_FROM_PAKISTAN];
