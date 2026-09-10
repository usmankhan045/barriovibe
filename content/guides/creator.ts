import type { Guide } from './types';

/**
 * Cluster 11: creator income.
 *
 * The whole guide turns on a correction. Every published account describes
 * section 154B as a 5 percent final tax on creator income. Section 154B(3)
 * makes it MINIMUM tax for a resident and final only for a non-resident
 * without a permanent establishment, and given section 82(d) the final limb
 * reaches almost no Pakistani reader.
 *
 * The second correction is where the 10 percent comes from. Division IIIAB
 * contains 5 percent and nothing else. The doubling is Tenth Schedule Rule 1,
 * and Rule 10 exempts sections 154 and 154A from it but not 154B, which is
 * exactly why export proceeds are not doubled and creator revenue is.
 */

const CREATOR_TAX: Guide = {
  slug: 'tax-on-youtube-and-social-media-income',
  cluster: 'creator',
  title: 'Tax on YouTube, TikTok and Social Media Income in Pakistan',
  navLabel: 'Creator income',
  card: 'What section 154B actually does, why calling it a 5% final tax is wrong for almost everyone, and who deducts it.',

  answer:
    'Since 1 July 2026, section 154B requires your bank to deduct 5% when platform revenue lands in your account. For a resident creator that is minimum tax, not final tax: you still compute business income on the non-salaried slabs and pay the higher of the two. Google, Meta and TikTok deduct nothing. The 10% figure that circulates applies to people not on the Active Taxpayer List.',

  sections: [
    {
      kind: 'prose',
      heading: 'What changed, and what did not',
      body: [
        'Before 1 July 2026 there was no section 154B and no Division IIIAB. Creator income was ordinary business income, taxed on the non-salaried slabs, collected through the return and advance tax. There was no platform-specific withholding.',
        'What the Finance Act 2026 created is a collection mechanism with a floor attached, not a new charge on income that was previously untaxed. Most coverage frames it as a new tax on creators, which overstates what happened. If you were declaring this income properly before, the main change is that some of it is now taken at the door.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'It is minimum tax, not final tax',
      body: 'This is the correction that matters most and essentially every published account gets it wrong. Section 154B(3) provides that the deduction is minimum in the case of a resident person, and final tax only in the case of a non-resident person not having a permanent establishment in Pakistan. For a resident creator the 5% is a floor: you still compute your business income on the slabs and pay the higher of the two figures, and you cannot reclaim the excess if the slab result is lower. Given how section 82(d) defines residence, the final-tax limb reaches almost no Pakistani reader.',
    },

    {
      kind: 'prose',
      heading: 'Your bank collects it, not the platform',
      body: [
        'Section 154B(1) names banking and non-banking financial institutions, and requires the deduction at the time of credit or receipt into an account. Google, Meta and TikTok are not withholding agents and deduct nothing under Pakistani law. Whether Google pays you from Singapore or the United States makes no difference to the charge.',
        'The definition of payment is drawn widely: it includes any inward remittance, transfer or credit received through banking channels, including through intermediaries such as online payment service providers or digital financial platforms. Receiving through Payoneer or a similar service does not put the money outside the section.',
      ],
    },

    {
      kind: 'table',
      heading: 'The rates, and where each comes from',
      intro:
        'Only one of these is in Division IIIAB. Knowing where the other comes from explains why export proceeds are treated differently.',
      columns: ['Situation', 'Rate', 'Source'],
      rows: [
        ['On the Active Taxpayer List', '5%', 'Division IIIAB'],
        ['Not on the list', '10%', 'Tenth Schedule Rule 1 doubling'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Why creator revenue is doubled when export proceeds are not',
      body: 'Division IIIAB reads in full: the rate of tax to be deducted under section 154B shall be 5%. There is no 10% in it. The higher figure comes from Rule 1 of the Tenth Schedule, which increases the rate by one hundred percent for a person not on the Active Taxpayer List. Rule 10 lists the sections that escape that doubling and includes sections 154 and 154A, the export provisions, but not 154B. So an unregistered exporter is not doubled and an unregistered creator is.',
    },

    {
      kind: 'prose',
      heading: 'Which platforms, and what counts',
      body: [
        'The statute names YouTube, Facebook, Instagram and TikTok, and then says "or such other similar platforms", so the list is illustrative rather than closed. A digital content creator or social media influencer is defined as any individual or entity deriving income from the creation, publication or monetization of content on digital platforms.',
        'There is no rate differentiation between platforms. AdSense revenue, a TikTok creator fund payment and a Meta payout are treated identically.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Brand deals are a different question',
      body: [
        'Section 154B bites only where the credited amount represents revenues received from social media platforms. A brand paying you directly for a sponsored post is not a platform, so the section does not apply to that payment.',
        'What applies instead depends on the brand. If it is a prescribed person under section 153, advertising services other than through print or electronic media sit in the specified sectors list, which the Finance Act 2026 raised from 6% to 7%. If the brand is not a prescribed person, nothing is withheld and the fee is ordinary business income declared in your return.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'A twentyfold question the rules do not yet answer',
      body: 'A bank sees a dollar credit arriving from Google. It must decide whether that is an export of IT services under section 154A, withheld at 0.25% or 1%, or platform revenue under section 154B, withheld at 5%. That is a twentyfold difference on the same money. Section 154B(4) empowers the Board to prescribe identification and reporting mechanisms by notification, and we have not been able to trace one. Until it exists, banks are making that call without a published test, and creators are reporting different treatment. If your bank has coded your receipts one way and you think the other is right, that is a conversation worth having early rather than at assessment.',
    },

    {
      kind: 'prose',
      heading: 'Why AdSense is probably not a 0.25% IT export',
      body: [
        'Three things point the same way. Section 154A(1)(a) covers exports of computer software, IT services or IT enabled services, and a share of advertising revenue from a platform does not sit naturally in the section 2 definitions of either. Section 154A operates through authorised dealers in foreign exchange while section 154B operates through banking and non-banking financial institutions at credit, which is a deliberately separate collection channel. And the same Finance Act both extended the 0.25% rate to 2029 and inserted section 154B, which is hard to read as anything other than treating them as different things.',
        'None of that is a ruling, and we are not going to present it as one. It is the best reading of the statutes available, and the absence of the section 154B(4) notification is precisely what leaves it open.',
      ],
    },

    {
      kind: 'calculator',
      toolSlug: 'freelancer-tax',
      heading: 'What the slabs come to on your revenue',
      body: 'Because the 5% is a floor rather than a settlement for a resident, the figure that decides your actual liability is the slab computation underneath it. Enter your platform revenue to see both, and which one governs.',
    },

    {
      kind: 'prose',
      heading: 'The slabs still apply underneath',
      body: [
        'Because the deduction is minimum tax for a resident, your actual liability is computed normally: creator income is business income, taxed on the non-salaried table in Division I. That table starts at 15% above Rs 600,000 and reaches 45% above Rs 5.6 million.',
        'You then compare that figure with the 5% already taken. If the slab computation is higher, you pay the difference. If it is lower, the 5% stands as your minimum and the excess is not refundable. A creator with high revenue and genuine deductible costs can easily find the slab figure exceeds 5% of gross, which is the case where the floor does nothing and ordinary planning matters more.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Sales tax is a separate question, and provincial',
      body: 'Islamabad zero-rates the export of services. Khyber Pakhtunkhwa does not: the KP Sales Tax on Services Act 2022 has no export relief, and entry 15 of its Second Schedule taxes digital and IT-based services at 2% without input tax adjustment, expressly naming social media marketing, content marketing and influencer marketing. Whether a creator monetising a platform audience is providing a taxable service in the Province is a question worth asking KPRA rather than assuming either way.',
    },

    {
      kind: 'prose',
      heading: 'Receiving in foreign currency',
      body: [
        'Section 111(4) applies here as it does to any inward remittance. Foreign exchange remitted through normal banking channels, not exceeding five million rupees in a tax year, encashed into rupees with a bank certificate, is outside the unexplained-income provisions.',
        'It is a shield against being asked to explain where the money came from. It is not an exemption, and section 154B still bites on the credit.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Is there tax on YouTube income in Pakistan?',
      answer:
        'Yes. Since 1 July 2026, section 154B requires banking and non-banking financial institutions to deduct 5% when revenue from social media platforms is credited to your account. Before that the income was still taxable as business income; what changed is the collection mechanism.',
    },
    {
      question: 'Is the 5% on social media income a final tax?',
      answer:
        'Not for a resident. Section 154B(3) makes the deduction minimum tax for a resident person and final tax only for a non-resident without a permanent establishment in Pakistan. As a resident you still compute business income on the slabs and pay the higher figure.',
    },
    {
      question: 'Does Google or YouTube deduct Pakistani tax from my AdSense payments?',
      answer:
        'No. Section 154B places the obligation on banking and non-banking financial institutions at the time the amount is credited to your account. The platforms are not withholding agents under Pakistani law.',
    },
    {
      question: 'How much tax do non-filers pay on YouTube income?',
      answer:
        '10%, but not because Division IIIAB says so. Division IIIAB sets 5% and nothing else. Rule 1 of the Tenth Schedule doubles the rate for a person not on the Active Taxpayer List, and Rule 10 does not exempt section 154B from that doubling as it does sections 154 and 154A.',
    },
    {
      question: 'Which platforms does section 154B cover?',
      answer:
        'The section names YouTube, Facebook, Instagram and TikTok, followed by "or such other similar platforms", so the list is illustrative. There is no difference in rate between them.',
    },
    {
      question: 'Is a brand sponsorship taxed the same as platform revenue?',
      answer:
        'No. Section 154B applies only where the credit represents revenue from a social media platform. A brand paying you directly is not a platform. If that brand is a prescribed person under section 153, advertising services outside print and electronic media are withheld at 7% following the Finance Act 2026.',
    },
    {
      question: 'Can YouTube income qualify for the 0.25% IT export rate?',
      answer:
        'Probably not. A share of platform advertising revenue does not fit the section 2 definitions of IT or IT enabled services, and the two provisions use different collection channels and were dealt with in the same Finance Act. There is no ruling on the point, and the identification rules that section 154B(4) allows the Board to make have not been traced.',
    },
    {
      question: 'Do I still have to file a return if my bank already deducted 5%?',
      answer:
        'Yes. For a resident the deduction is minimum tax rather than a settlement, so the return is where your actual liability is computed. Section 114 requires a return from anyone who has obtained a National Tax Number in any event.',
    },
  ],

  publishedAt: '2026-09-17T03:00:00Z',
  related: ['tax-for-freelancers', 'filer-vs-non-filer'],

  seo: {
    title: 'Tax on YouTube and Social Media Income in Pakistan',
    description:
      'Section 154B explained: why the 5% is minimum tax rather than final for residents, where the 10% non-filer rate actually comes from, and why your bank collects it rather than the platform.',
  },
};

export const CREATOR_GUIDES: Guide[] = [CREATOR_TAX];
