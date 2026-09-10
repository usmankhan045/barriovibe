import type { Guide } from './types';

/**
 * Cluster 8: sales tax registration.
 *
 * Two things make this guide worth writing. First, the PKR 12.5 million
 * threshold that appears on ranking pages is not in section 14, not in the
 * cottage industry definition, and not in the Tier-1 retailer definition. It
 * appears to have been invented or transplanted, and correcting it is the
 * clearest single service this guide performs.
 *
 * Second, the firm is in Khyber Pakhtunkhwa, and KPK guides almost universally
 * cite the Finance Act 2013 when the operative statute has been the KP Sales
 * Tax on Services Act 2022 since June 2022.
 */

const SALES_TAX_REGISTRATION: Guide = {
  slug: 'sales-tax-registration',
  cluster: 'salestax',
  title: 'Sales Tax Registration in Pakistan: Who Actually Has to Register',
  navLabel: 'Sales tax registration',
  card: 'The turnover threshold that does not exist, the federal and provincial split that decides where you register, and the biometric deadline that removes you from the list.',

  answer:
    'Registration is triggered by what you do, not by how much you earn. Section 14 of the Sales Tax Act 1990 lists categories: manufacturer, retailer, importer, exporter claiming refunds, wholesaler or distributor. There is no turnover threshold in it. Goods are federal and services are provincial, so a service business in Khyber Pakhtunkhwa registers with KPRA rather than FBR. After registering you have thirty days to complete biometric verification at NADRA.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'There is no PKR 12.5 million threshold',
      body: 'This figure appears on ranking pages as the point at which a retailer must register. It is not in section 14, which contains no turnover threshold of any kind. It is not in the cottage industry definition at section 2(5AB), which uses Rs 8 million. It is not in the Tier-1 retailer definition at section 2(43A), which turns on electricity bills and shop size rather than turnover. If a page quotes it, that page has not read the Act.',
    },

    {
      kind: 'list',
      heading: 'Who section 14 actually requires to register',
      intro:
        'Every person making taxable supplies in Pakistan, including zero-rated supplies, in the course of a taxable activity, who falls in one of these categories.',
      items: [
        'A manufacturer who is not running a cottage industry',
        'A retailer liable to pay sales tax, excluding one who pays through the electricity bill under section 3(9)',
        'An importer',
        'An exporter who wants a refund against zero-rated supplies',
        'A wholesaler, dealer or distributor',
        'A person required under any other federal or provincial law to be registered for a duty or tax collected as if it were sales tax',
      ],
    },

    {
      kind: 'table',
      heading: 'The thresholds that do exist',
      intro:
        'Two real thresholds, doing different jobs. Neither is a general registration threshold, and neither is 12.5 million.',
      columns: ['Concept', 'Test', 'Effect'],
      rows: [
        [
          'Cottage industry, s.2(5AB)',
          'No industrial gas or electricity connection, in a residential area, at most 10 workers, and annual turnover not over Rs 8 million',
          'Excluded from registration as a manufacturer',
        ],
        [
          'Tier-1 retailer, s.2(43A)',
          'Chain store, air-conditioned mall unit, 12-month electricity bill over Rs 1.2 million, bulk importer-retailer, or shop of 1,000 square feet or more',
          'Brings integration and reporting obligations',
        ],
      ],
    },

    {
      kind: 'prose',
      heading: 'Goods are federal, services are provincial',
      body: [
        'This is the question to settle before any other, because getting it wrong means registering with the wrong authority entirely. Sales tax on goods is federal and administered by FBR. Sales tax on services is provincial: Punjab through the PRA, Sindh through the SRB, Khyber Pakhtunkhwa through the KPRA, and Balochistan through the BRA.',
        'A software house, a marketing agency or a consultancy is supplying services, so its sales tax obligation is provincial. Section 14(1)(f) is the bridge: a person required to register under a provincial law also falls into the federal category, which is why businesses doing both need to think about both.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'KPK runs on the 2022 Act, not the Finance Act 2013',
      body: 'Guides written for Khyber Pakhtunkhwa almost universally cite the Finance Act 2013. The operative statute has been the Khyber Pakhtunkhwa Sales Tax on Services Act 2022 since June 2022, updated through the Finance Act 2024. Under section 29 a person must register who provides a taxable service from a place of business in the Province, is otherwise required to register, or is a withholding agent. There is no turnover threshold there either.',
    },

    {
      kind: 'steps',
      heading: 'Registering with KPRA',
      intro: 'The timings in the KP Act are unusually specific, and both run in your favour if you plan.',
      steps: [
        {
          title: 'Apply before you are liable, not after',
          body: 'Section 29(6) requires the application not later than fifteen days before you become liable to be registered. That is a forward-looking deadline, which is unusual and easy to miss.',
        },
        {
          title: 'The Authority has fifteen days',
          body: 'Section 29(7) requires the Authority to register and notify within fifteen days of the application.',
        },
        {
          title: 'Know whether you are a withholding agent',
          body: 'Being one is itself a registration trigger under section 29(1)(c), regardless of whether you supply any taxable service at all.',
        },
        {
          title: 'File monthly',
          body: 'Payment is due on the fifteenth day of the month following the tax period. A revised return needs the Collector\'s prior permission and must be within six months.',
        },
      ],
    },

    {
      kind: 'steps',
      heading: 'Registering with FBR for goods',
      intro: 'Through IRIS, and the step after registration is the one people miss.',
      steps: [
        {
          title: 'File Form 14(1) in IRIS',
          body: 'Log in, select the sales tax registration form, give the tax period and say whether you are a manufacturer or not.',
        },
        {
          title: 'Upload what the form asks for',
          body: 'A bank account certificate in the name of the business, business details, GPS-tagged photographs of the premises, utility supplier registration numbers and meter photographs. A manufacturer additionally uploads GPS-tagged photographs of machinery and industrial meters.',
        },
        {
          title: 'Complete biometric verification within thirty days',
          body: 'Visit a NADRA e-Sahulat centre. This is the step that catches people out.',
        },
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Miss the biometric deadline and you come off the list',
      body: 'FBR is explicit: a registered person who does not visit a NADRA e-Sahulat centre within thirty days, or whose verification fails, is removed from the Sales Tax Active Taxpayer List. A manufacturer may also face post-verification by field officers, with fifteen days to resubmit anything found not genuine before the same removal follows.',
    },

    {
      kind: 'prose',
      heading: 'Selling online now triggers registration',
      body: [
        'Sections 14(1A) and 14(1B), inserted by the Finance Act 2025, changed the position for anyone selling through a marketplace or their own website. Any person, including a non-resident, selling digitally ordered goods from within Pakistan through an online marketplace, website or software application must apply for registration.',
        'The enforcement sits with the platforms rather than with you. Under 14(1B) an online marketplace or courier may not allow anyone to use its services for e-commerce unless that person holds an NTN and, where 14(1A) applies, sales tax registration. So the practical consequence of not registering is that you cannot sell, rather than that you receive a notice.',
        'Who collects depends on how the customer pays. For an online payment the acquiring bank acts as payment intermediary and withholds. For cash on delivery the courier carries the obligation.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The enforcement powers you have read about are not all in force',
      body: 'The Finance Act 2025 inserted sections 14AC, 14AD and 14AE, allowing FBR to bar bank account operations, bar transfers of immovable property, and seal premises or seize property. Each of them comes into force only on a date the Board notifies in the official Gazette, and we have not been able to trace those notifications. Section 14AC also requires three consecutive opportunities of being heard and staged suspensions before any permanent bar. Pages telling you your account can be frozen today are ahead of the law, or ahead of what we can verify.',
    },
  ],

  faqs: [
    {
      question: 'What is the turnover threshold for sales tax registration in Pakistan?',
      answer:
        'There is not one. Section 14 of the Sales Tax Act 1990 lists categories of person who must register and contains no turnover threshold. The Rs 12.5 million figure that circulates is not in section 14, nor in the cottage industry definition, nor in the Tier-1 retailer definition.',
    },
    {
      question: 'Do I register for sales tax with FBR or with my province?',
      answer:
        'Goods are federal and go to FBR. Services are provincial: Punjab to the PRA, Sindh to the SRB, Khyber Pakhtunkhwa to the KPRA, Balochistan to the BRA. A software house or agency supplies services, so its obligation is provincial.',
    },
    {
      question: 'Does a small service business in KPK need to register with KPRA?',
      answer:
        'Possibly, and turnover is not the test. Section 29 of the Khyber Pakhtunkhwa Sales Tax on Services Act 2022 requires registration by a person who provides a taxable service from a place of business in the Province, or who is a withholding agent. There is no turnover threshold in it.',
    },
    {
      question: 'What is the biometric verification requirement for sales tax?',
      answer:
        'After registering with FBR you must visit a NADRA e-Sahulat centre within thirty days for biometric verification. Failing to attend, or failing the verification, results in removal from the Sales Tax Active Taxpayer List.',
    },
    {
      question: 'Do I need sales tax registration to sell online in Pakistan?',
      answer:
        'If you sell digitally ordered goods from within Pakistan through a marketplace, website or app, section 14(1A) requires you to apply. Marketplaces and couriers are separately barred under 14(1B) from letting you use their services without an NTN and, where applicable, sales tax registration.',
    },
    {
      question: 'What documents are needed for sales tax registration?',
      answer:
        'A bank account certificate in the name of the business, business details including activity and capacity, GPS-tagged photographs of the business premises, utility supplier registration numbers and meter photographs. A manufacturer additionally provides GPS-tagged photographs of machinery and industrial meters.',
    },
    {
      question: 'Can FBR freeze my bank account for not registering?',
      answer:
        'Section 14AC provides for it, but it comes into force only on a date notified in the official Gazette and we have not traced that notification. Even once in force it requires three consecutive opportunities of being heard and staged suspensions before a permanent bar.',
    },
    {
      question: 'When is a sales tax return due?',
      answer:
        'Federally, the due date is the fifteenth day of the month following the tax period, and the Board may notify different dates for different annexures. Under the KP Act the position is the same fifteenth-day rule, with a revised return needing the Collector\'s prior permission within six months.',
    },
  ],

  publishedAt: '2026-09-13T07:00:00Z',
  related: ['how-to-get-an-ntn', 'secp-company-registration', 'filing-a-sales-tax-return'],

  seo: {
    title: 'Sales Tax Registration in Pakistan: Who Must Register',
    description:
      'The turnover threshold that does not exist, the federal and provincial split, KPRA under the 2022 Act, and the thirty-day biometric deadline that removes you from the active list.',
  },
};


/**
 * Guide 33: selling online.
 *
 * Two things carry it, and both were verified from the consolidation during
 * drafting rather than taken from the contested secondary figures the store
 * had been holding.
 *
 * 1. The rates are real and now read from statute: 1 per cent collected by the
 *    payment intermediary, 2 per cent by the courier on cash on delivery, and
 *    the charge falls on the person RECEIVING the payment.
 * 2. The proviso to s.6A(1) excludes export proceeds already withheld under
 *    s.154 or s.154A. A PSEB-registered exporter is outside the section
 *    entirely, which nobody covers and which matters to our core audience.
 *
 * The third point is the default nobody expects: below Rs 200 million turnover
 * the charge is FINAL, not adjustable, which is the opposite of the s.154B
 * creator position, and on thin margins that is expensive.
 */

const SELLING_ONLINE: Guide = {
  slug: 'tax-on-selling-online',
  cluster: 'salestax',
  title: 'Tax on Selling Online in Pakistan',
  navLabel: 'Selling online',
  card: 'The 1% and 2% collected before the money reaches you, why an IT exporter is outside it, and the final-tax default that can cost a small seller more than the profit.',

  answer:
    'Section 6A taxes payments for digitally ordered goods and services delivered from within Pakistan: 1% collected by the payment intermediary where you are paid digitally, and 2% collected by the courier on cash on delivery. It is charged on gross receipts, not profit. Export proceeds already withheld under sections 154 or 154A are expressly outside it.',

  sections: [
    {
      kind: 'note',
      tone: 'info',
      heading: 'If you are an IT exporter, this section does not reach you',
      body: 'Worth settling first because it removes the worry for a large part of our audience. The proviso to section 6A(1) says export proceeds subjected to withholding under section 154 or section 154A shall not fall within the ambit of the section. A PSEB-registered exporter whose proceeds are withheld at 0.25 per cent under section 154A is outside section 6A, and the e-commerce charge does not stack on top of the export regime. Note the carve-out keys on the proceeds actually being subjected to withholding under those sections rather than on you being an exporter in general, so a receipt routed outside the section 154A channel does not automatically carry the exemption with it.',
    },

    {
      kind: 'table',
      heading: 'What is collected, and by whom',
      intro:
        'Division IVA of Part I. The charge is on the person receiving payment, but it is collected by whoever handles the money on the way to you.',
      columns: ['How you are paid', 'Rate', 'Who collects it'],
      rows: [
        ['Digital means or banking channels', '1% of gross', 'The payment intermediary'],
        ['Cash on delivery', '2% of gross', 'The courier service'],
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'It is charged on gross, and for most sellers it is final',
      body: 'Two features that combine badly on a thin margin. Section 6A(2) applies the rate to gross receipts, so it takes no interest in what the goods cost you. And section 6A(3) makes the tax ADJUSTABLE only where turnover in the tax year exceeds two hundred million rupees, which means that below that threshold it is final by default. A seller turning over Rs 20 million at a five per cent net margin has a million rupees of profit and pays one or two per cent of the whole twenty million, which can exceed the tax that profit would otherwise carry. The proviso lets a person with turnover up to Rs 200 million opt out of the final tax regime at the time of filing for tax year 2027 and onwards, and for a low-margin seller that opt-out is the single most valuable thing on this page.',
    },

    {
      kind: 'prose',
      heading: 'What "digitally ordered" actually covers',
      body: [
        'Section 6A reaches payment for supply of digitally ordered goods or services delivered from within Pakistan using locally operated online platforms, including an online marketplace or a website. The delivery has to be from within Pakistan, and the platform has to be locally operated.',
        'Section 2(38B) defines an online marketplace as an information technology platform run by an e-commerce entity over an electronic network that acts as a facilitator between a buyer and a seller, and includes online interfaces facilitating direct interaction between multiple buyers and sellers for a fee, with or without the platform taking economic ownership of what is sold. Your own website selling your own goods is inside the section; so is a marketplace listing.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Selling online now forces sales tax registration too',
      body: 'A separate obligation with the same trigger, and the two are constantly confused. Sections 14(1A) and 14(1B) of the Sales Tax Act, inserted by the Finance Act 2025, require any person including a non-resident selling digitally ordered goods from within Pakistan through an online marketplace, website or software application to register for sales tax. Section 14(1B) then puts the enforcement on the intermediaries: an online marketplace or a courier must not allow anyone to use its services for e-commerce unless that person holds an NTN and, where the registration requirement applies, sales tax registration. So the marketplace becomes the gatekeeper, and a seller without registration finds the platform closed to them rather than receiving a notice.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'The tax that was cancelled is not this one',
      body: 'Coverage of e-commerce tax in Pakistan conflates two different things and the confusion runs in the dangerous direction. What was suspended, by SRO in 2025, was the Digital Presence Proceeds Tax on FOREIGN digital service providers. The domestic obligations, section 6A and the sales tax registration requirement, were not suspended and are in force. A domestic seller reading that "the e-commerce tax was cancelled" and concluding nothing applies to them has read something true about a different tax.',
    },

    {
      kind: 'prose',
      heading: 'How this sits with everything else you owe',
      body: [
        'Section 6A is an income tax charge collected at the point of payment. It does not replace sales tax on the supply, which is a separate regime with its own registration, its own return and its own rate, and it does not replace your income tax return.',
        'Where the section 6A tax is final, it settles the income tax on those receipts and nothing more. Where turnover exceeds Rs 200 million, or where you opt out below that, it becomes adjustable and credits against your computed liability in the ordinary way.',
      ],
    },

    {
      kind: 'calculator',
      toolSlug: 'business-tax',
      heading: 'What the profit would be taxed at instead',
      body: 'The comparison that decides whether opting out of final tax is worth it. Enter the business income the sales actually produce, and weigh the result against one or two per cent of gross turnover.',
    },
  ],

  faqs: [
    {
      question: 'What is the tax on online sales in Pakistan?',
      answer:
        'Section 6A charges 1% of gross where payment comes through digital means or banking channels, collected by the payment intermediary, and 2% where the buyer pays cash on delivery, collected by the courier. It applies to digitally ordered goods and services delivered from within Pakistan through locally operated platforms.',
    },
    {
      question: 'Does the e-commerce tax apply to IT exporters?',
      answer:
        'No. The proviso to section 6A(1) excludes export proceeds subjected to withholding under sections 154 or 154A, so a PSEB-registered exporter withheld at 0.25% is outside the section and the charges do not stack.',
    },
    {
      question: 'Is the 1% e-commerce tax final or adjustable?',
      answer:
        'Final by default below Rs 200 million of turnover, and adjustable above it under section 6A(3). A person with turnover up to Rs 200 million may opt out of the final tax regime when filing the return for tax year 2027 and onwards, which matters greatly on a low margin.',
    },
    {
      question: 'Was the e-commerce tax in Pakistan cancelled?',
      answer:
        'What was suspended was the Digital Presence Proceeds Tax on foreign digital providers. The domestic obligations, section 6A and the sales tax registration requirement for online sellers, were not suspended and are in force.',
    },
    {
      question: 'Do I need sales tax registration to sell on a marketplace?',
      answer:
        'Sections 14(1A) and 14(1B) of the Sales Tax Act require registration for selling digitally ordered goods from within Pakistan, and require marketplaces and couriers not to let anyone use their services unless the person holds an NTN and, where applicable, sales tax registration. The platform enforces it.',
    },
    {
      question: 'Is tax charged on my profit or my sales?',
      answer:
        'On gross receipts. Section 6A(2) applies the rate to the gross amount, so the cost of the goods does not enter it. That is what makes the final-tax default expensive on a thin margin and the opt-out worth considering.',
    },
    {
      question: 'Does section 6A apply to my own website, or only to marketplaces?',
      answer:
        'Both. The section covers digitally ordered goods or services delivered from within Pakistan using locally operated online platforms including an online marketplace or websites, so selling your own goods through your own site is inside it.',
    },
    {
      question: 'Does section 6A replace sales tax?',
      answer:
        'No. It is an income tax charge collected when you are paid. Sales tax on the supply is a separate regime with its own registration, return and rate.',
    },
  ],

  publishedAt: '2026-09-26T03:00:00Z',
  related: ['sales-tax-registration', 'tax-for-freelancers'],

  seo: {
    title: 'Tax on Selling Online in Pakistan: Section 6A',
    description:
      'The 1% and 2% collected before you are paid, why IT export proceeds are carved out, the final-tax default below Rs 200m turnover, and the registration marketplaces now enforce.',
  },
};


/**
 * Guide 36: the monthly sales tax return.
 *
 * The flagship correction is that filing and payment are DIFFERENT dates and
 * are separately penalised. s.2(9) sets the due date at the 15th; rule 18(9)
 * of the Sales Tax Rules says the tax is deposited by the 15th and the return
 * submitted electronically by the 18th. Pages giving a single date are wrong
 * whichever one they give.
 *
 * The second is that the input tax you lose when a supplier does not file is
 * not simply gone: rule 18(3) creates a provisional return that becomes valid
 * on payment of a recomputed amount, with carve-outs in rule 18A.
 *
 * The penalty figures were raised fivefold and tenfold by the Finance Act 2026
 * and were confirmed against the gazette, because the consolidation's own
 * footnote is written in the opposite convention to the Income Tax Ordinance
 * and reads as though the new figure were the old one.
 */

const SALES_TAX_RETURN: Guide = {
  slug: 'filing-a-sales-tax-return',
  cluster: 'salestax',
  title: 'Filing a Monthly Sales Tax Return',
  navLabel: 'Sales tax return',
  card: 'Two deadlines rather than one, what happens to your input tax when a supplier does not file, and the penalties that went up fivefold in 2026.',

  answer:
    'Pay by the 15th of the month following the tax period and file by the 18th. Those are separate obligations under separate provisions and each carries its own penalty. Input tax on a purchase depends on your supplier declaring the corresponding supply, and where they do not, your return sits provisionally until the system recomputes it.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'There are two deadlines, not one',
      body: 'Almost every page on this subject gives a single date, and whichever one it gives is wrong. Section 2(9) of the Sales Tax Act defines the due date as the 15th of the month following the tax period, and expressly allows different dates for different parts or annexures. Rule 18(9) of the Sales Tax Rules then says it plainly: the tax due shall be deposited by the 15th and the return shall be submitted electronically by the 18th of the same month. Paying on the 18th along with the return meets the filing date and breaches the payment date, and section 33 penalises late filing and late payment as separate defaults. Seven sectors have their own paired dates, and a filer with activity in more than one files a single return on the date for their major activity.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The penalties went up fivefold in June 2026',
      body: 'Section 33, entry 1: failing to furnish a return within the due date now costs fifty thousand rupees, and where the return is filed within ten days of the due date, two thousand rupees for each day of default. The Finance Act 2026 raised those from ten thousand and two hundred, so the daily figure is ten times what it was. We confirmed both against the Finance Act gazette rather than the consolidation alone, because the consolidation footnotes this change in a way that reads as though fifty thousand were the OLD figure. The gazette settles it: for the word ten, the word fifty shall be substituted. Any page published before July 2026 has the old numbers.',
    },

    {
      kind: 'prose',
      heading: 'Your input tax depends on someone else filing',
      body: [
        'This is the structural feature that makes sales tax different from income tax, and the source of most of the pain. The input tax you claim on a purchase is matched against what your supplier declares in their own return. If they have not declared the supply, the deduction is not simply accepted on your invoice.',
        'Three separate provisions sit behind that, which is worth knowing because they are usually described as one rule. Section 8(1)(ca) disallows input where the tax has not been deposited by the supplier. Section 8(1)(caa) covers a CREST discrepancy or input not verifiable in the supply chain. Section 8(1)(l) covers a supplier who has not declared or paid. Section 8A adds joint and several liability, and it puts the burden of proof expressly on the department rather than on you.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'A supplier who has not filed does not destroy your return',
      body: 'The mechanism is more forgiving than the field usually describes, and it has a name. Under the second proviso to rule 18(3), your return sits PROVISIONALLY in IRIS until the seller files, up to the last day of the month in which the due date falls. If the seller still has not filed by then, the system deletes those invoices and the corresponding input tax, recomputes your liability, and your provisional return becomes valid once you pay the recomputed amount. Rule 18A then carves out six categories from that treatment, including utilities, independent power producers, petroleum exploration and production, and cases where the supplier pays within six days. So the input is at risk, but the process is defined rather than arbitrary.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'An incomplete annexure makes the return invalid, not late',
      body: 'Rule 18(1) is stricter than people expect. Failing to fill any applicable column of the return, or of any annexure, makes the return invalid. That is a different and worse outcome than filing late: an invalid return has not been filed at all, so the late-filing penalty runs from the due date while you believe you have complied. Two of the sixteen annexures are populated for you rather than typed: Annexure A loads from your counterparty\'s Annexure C, and Annexure P is filled by the system from the province-wise data in Annexure C.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Input tax is capped at ninety per cent of output tax',
      body: 'Section 8B limits input tax adjustment to ninety per cent of output tax for the period, with carve-outs for fixed assets and capital goods, exclusions the Board may notify, and an annual true-up under section 8B(2) and (3) against audited accounts. The Finance Act 2026 added something new: the Board may now reduce or enhance that limit for a particular registered person, based on compliance with production monitoring, digital invoicing, e-bilty or point-of-sale integration. So the cap is becoming a compliance-linked figure rather than a flat one. A Tier-1 retailer who has not integrated loses sixty per cent of input tax under section 8B(6), which is a far heavier consequence than the general cap.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Pay your suppliers through the bank, and inside 180 days',
      body: 'Section 73 is omitted from most coverage and it disallows input tax on its own terms. Payment for a taxable supply must be made through the banking channel from the buyer\'s business bank account to the supplier\'s business account, where payments to that supplier aggregate over fifty thousand rupees in the tax period. The aggregate test was added by the Finance Act 2024, so paying in several smaller instalments does not avoid it. For a credit transaction there is a hard limit of one hundred and eighty days for the payment to be made. And section 73(3) penalises the supplier where the funds land in an account that is not their declared business account.',
    },

    {
      kind: 'prose',
      heading: 'Filing when you had no activity',
      body: [
        'A registered person with nothing to report still files. What is worth knowing is that the Sales Tax Act contains no express nil-return provision: the words do not appear. The duty comes from section 26(1), which requires every registered person to furnish a return, reinforced by the deletion of the words "making taxable supplies" from that section in 1999.',
        'That is a striking contrast with income tax, where section 165 of the Income Tax Ordinance expressly requires a withholding statement even where no tax was collected. If you genuinely have no continuing activity, the exit is de-registration under section 21 with a final return under section 28, and note that after six months you need the Commissioner\'s approval to file at all.',
      ],
    },
  ],

  faqs: [
    {
      question: 'When is the sales tax return due in Pakistan?',
      answer:
        'There are two dates. The tax is deposited by the 15th of the month following the tax period, and the return is submitted electronically by the 18th, under rule 18(9) of the Sales Tax Rules. They are separate obligations with separate penalties under section 33.',
    },
    {
      question: 'What is the penalty for filing a sales tax return late?',
      answer:
        'Fifty thousand rupees under section 33, entry 1, or two thousand rupees for each day of default where the return is filed within ten days of the due date. The Finance Act 2026 raised these from ten thousand and two hundred rupees.',
    },
    {
      question: 'What happens if my supplier does not file their sales tax return?',
      answer:
        'Your return sits provisionally in IRIS until they file, up to the last day of the month in which the due date falls. If they still have not filed, the system deletes those invoices and the input tax, recomputes your liability, and your return becomes valid on paying the recomputed amount. Rule 18A carves out six categories.',
    },
    {
      question: 'Can I claim input tax if the supplier has not paid it?',
      answer:
        'Not generally. Sections 8(1)(ca), 8(1)(caa) and 8(1)(l) each disallow input tax where the supplier has not deposited it, where there is a CREST discrepancy or it is not verifiable in the supply chain, or where the supplier has not declared or paid. Section 8A adds joint and several liability with the burden of proof on the department.',
    },
    {
      question: 'Is there a limit on input tax adjustment?',
      answer:
        'Yes. Section 8B caps it at ninety per cent of output tax, with carve-outs for fixed assets and capital goods and an annual true-up against audited accounts. The Finance Act 2026 lets the Board vary the limit per person based on compliance with digital invoicing and similar systems.',
    },
    {
      question: 'Do I have to file if I had no sales?',
      answer:
        'Yes. Section 26(1) requires every registered person to furnish a return, and the Act carries no express nil-return provision at all. If you have no continuing activity the route is de-registration under section 21 with a final return under section 28.',
    },
    {
      question: 'Does an incomplete annexure just delay my return?',
      answer:
        'No, it invalidates it. Rule 18(1) provides that failing to fill any applicable column of the return or of any annexure makes the return invalid, which means it has not been filed and the late-filing penalty is running.',
    },
    {
      question: 'Do I have to pay suppliers by bank transfer?',
      answer:
        'For input tax purposes, yes. Section 73 requires payment through the banking channel from your business account to the supplier\'s, where payments to that supplier aggregate over fifty thousand rupees in the tax period, with a one hundred and eighty day limit for credit transactions.',
    },
  ],

  publishedAt: '2026-09-27T07:00:00Z',
  related: ['sales-tax-registration', 'tax-on-selling-online'],

  seo: {
    title: 'Filing a Monthly Sales Tax Return in Pakistan',
    description:
      'Pay by the 15th and file by the 18th, why an incomplete annexure invalidates the return, what happens when a supplier does not file, and the 2026 penalty increases.',
  },
};

export const SALESTAX_GUIDES: Guide[] = [SALES_TAX_REGISTRATION, SELLING_ONLINE, SALES_TAX_RETURN];


