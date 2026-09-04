import type { Faq, IconName } from './types';

/**
 * Copy for the calculators under /tools.
 *
 * Same rule as the rest of `content/`: everything a non-developer might edit
 * lives here as typed data rather than inside JSX. The difference with this
 * file is what it must NOT contain.
 *
 * ── No figures. Not one. ──
 *
 * Every rate, slab, cap and threshold on /tools/salary-tax is read from
 * lib/tax/pakistan.ts, which holds them once with its section of the Income
 * Tax Ordinance attached and reconciles them against the First Schedule on
 * every import. Copying a number into the prose here would create a second
 * source that no check can see, and the first Finance Act to move a slab would
 * leave the page arguing with itself.
 *
 * So where a sentence below needs a figure, it either interpolates one from
 * that module or it does not state one. The FAQ answers are written to that
 * constraint deliberately: read them and notice how few numbers they contain
 * relative to how much they explain. That is the constraint working.
 *
 * The two exceptions are statutory DATES, which are facts about the regulator
 * rather than rates: 30 September for an individual return, and the tax year
 * running July to June. Those follow the same rule the service copy uses (see
 * content/types.ts).
 */

export interface Tool {
  /** The URL segment under `/tools`. The registry below is keyed on it. */
  slug: string;
  title: string;
  /**
   * The label on the /tools hub card and in the breadcrumb, where the page
   * title's country and category are already implied by the surrounding page.
   * "Pakistan Salary Tax Calculator" is the right H1 and the right <title>; it
   * is a long thing to read four times down a grid of cards.
   */
  navLabel: string;
  /** One sentence on the hub card. Not the same string as `intro`, which is written to sit under an H1. */
  card: string;
  /** An icon name from components/icons. */
  icon: IconName;
  /** Two or three sentences under the H1. */
  intro: string;
  /** What the tool cannot answer. Rendered as its own section, not small print. */
  limits: string[];
  seo: { title: string; description: string };
}

export const SALARY_TAX_TOOL: Tool = {
  slug: 'salary-tax',
  title: 'Pakistan Salary Tax Calculator',
  navLabel: 'Salary Tax Calculator',
  card: 'Your monthly take-home on the current FBR salary slabs, with EOBI, provident fund, Zakat and pension relief, and the slab-by-slab working shown.',
  icon: 'calculator',
  /**
   * Deliberately two sentences.
   *
   * It was four, and on a 390px viewport those four pushed the salary input to
   * 904px on an 844px screen: a visitor who searched for a calculator had to
   * scroll a full screen past prose before reaching the thing they searched
   * for. The detail that was cut (the slab-by-slab working, the browser-only
   * promise) is not lost, it is repeated inside the tool itself where it is
   * load-bearing rather than introductory.
   *
   * Keep it short for that reason. Anything added here is added directly on
   * top of the tool.
   */
  intro:
    'Enter your gross salary and see what actually reaches your account, on the current FBR slabs for salaried individuals. Nothing you type leaves your browser.',
  limits: [
    'Income from anywhere but salary: rent, a business, capital gains, dividends or profit on debt, each taxed under its own rules',
    'More than one employer in the same tax year, where each one withholds as though it were your only income',
    'Tax already withheld from your salary, which decides whether you owe anything further or are due a refund',
    'Provincial professional tax, which is levied by your province rather than by FBR and varies by where you work',
    'Gratuity, bonuses, a car or accommodation provided by your employer, and other benefits valued under their own rules',
    'Whether you are on the Active Taxpayer List, which changes what you are withheld on banking, property and vehicles',
  ],
  seo: {
    title: 'Pakistan Salary Tax Calculator',
    description:
      'Work out your monthly take-home pay in Pakistan on the current FBR salary slabs, with EOBI, provident fund, Zakat, donation and pension relief, and the working shown.',
  },
};

/**
 * The questions people arrive with.
 *
 * Ordered by how early someone asks them: what do I owe, why does my slip
 * disagree, what can I claim, and only then the filing questions. Each answer
 * is written to be complete on its own, because these are carried into
 * FAQPage schema and any one of them may be the only part a person ever reads.
 *
 * The last three exist because they are the questions a calculator CANNOT
 * answer and where an honest tool should say so.
 */
export const SALARY_TAX_FAQS: Faq[] = [
  {
    question: 'How is salary tax calculated in Pakistan?',
    answer:
      'Progressively, in slabs. Your annual taxable income is divided into bands and each band is taxed at its own rate, so a raise that moves you into a higher slab is taxed at the higher rate only on the part above the threshold. This is why your effective rate, the tax as a share of your whole salary, is always lower than the rate on your top slab. The calculator above shows both, and the working underneath shows what each slab contributed.',
  },
  {
    question: 'Why is the tax on my salary slip different from this?',
    answer:
      'Usually because your employer is withholding against a projection of your full year under section 149, spread across twelve months, and adjusting it as the year progresses. Bonuses, a mid-year raise, a change of employer or any relief you have declared to payroll all move that projection. This calculator works out the tax on a full year at the salary you entered, which is the right figure for the year as a whole and will not always match one month of a slip.',
  },
  {
    question: 'What is EOBI and why is it the same amount for everyone?',
    answer:
      'It is the state old-age pension contribution, and the employee share is calculated on the government-notified minimum wage rather than on your actual salary. That is why it is a flat monthly figure at every pay level rather than a percentage of what you earn. Your employer pays a separate and larger share of its own, which cannot lawfully be deducted from your pay. It only applies where your employer is registered with EOBI, which is why the calculator asks instead of assuming.',
  },
  {
    question: 'Does my provident fund contribution reduce my tax?',
    answer:
      'Your own contribution does not. It is deducted from salary that has already been taxed, which is why the calculator shows it as reducing your take-home without changing the tax figure above it. What it is not is a tax: it goes into your own fund and it remains your money. Your employer\'s contribution to a recognised fund, and the interest the fund earns, are treated separately and are exempt within the limits set in the Sixth Schedule.',
  },
  {
    question: 'What can a salaried person actually claim?',
    answer:
      'Four things, and they work in two different ways. Zakat paid under the Zakat and Ushr Ordinance and tuition fees under section 60D are deductible allowances: they come off your income before the slabs are applied, so they are worth your top rate. Donations to FBR-approved organisations under section 61 and contributions to a SECP-approved Voluntary Pension Scheme under section 63 are tax credits: they come off the tax itself, calculated at your average rate rather than your marginal one. All four are in the calculator, each with its statutory cap applied.',
  },
  {
    question: 'Is there still a surcharge on high salaries?',
    answer:
      'Not on salary. The surcharge under section 4AB applied to individuals with taxable income above ten million rupees, and it no longer applies to anyone whose income is chargeable under the head "Salary". Several calculators and articles still apply it. If a tool is quoting you a top marginal figure above the highest slab rate, that is what it is doing.',
  },
  {
    question: 'Can I claim the deduction for a house loan?',
    answer:
      'No. The deductible allowance for profit on debt under section 60C was omitted by the Finance Act 2022 and no longer exists. It is still described as available on a number of sites, which is worth knowing before you plan around it.',
  },
  {
    question: 'Do I have to file a return if my employer already deducts tax?',
    answer:
      'Yes, if your income is above the taxable threshold. Withholding by your employer is payment of tax, not filing, and the two are separate obligations. Filing is what puts you on the Active Taxpayer List, and non-filers pay materially higher withholding rates on banking transactions, property, vehicles and dividends. For most salaried people that difference over a year exceeds what filing costs.',
  },
  {
    question: 'When is the deadline for a salaried individual?',
    answer:
      '30 September following the end of the tax year, which runs from 1 July to 30 June. FBR does sometimes extend it, and every year a number of people plan around an extension that then arrives shorter than expected or not at all. Working to the original date is the safer assumption.',
  },
  {
    question: 'How accurate is this calculator?',
    answer:
      'The arithmetic is exact for the case it models: tax on salary income for a full year at the current rates, with the allowances and credits you enter. The rates are taken from the Income Tax Ordinance itself and are reconciled against the First Schedule automatically, so the slabs cannot silently drift out of date without the site failing to build. What it cannot know is anything you have not told it, and the section above lists what that includes. Treat it as a well-founded estimate rather than a computation of your liability.',
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   The salary tools.

   Four questions about a salary rather than four ways of taxing one. Each
   states in its own `limits` that it carries no reliefs and why, because the
   omission is the first thing a careful reader will notice.
   ══════════════════════════════════════════════════════════════════════════ */

export const MULTI_YEAR_SALARY_TOOL: Tool = {
  slug: 'multi-year-salary-tax',
  title: 'Multi-Year Salary Tax Calculator',
  navLabel: 'Multi-Year Salary Tax',
  card: 'Changed jobs or got a raise mid-year? Add each stretch of the year separately and see the tax on the year as a whole, against what your payslips actually took.',
  icon: 'clock',
  intro:
    'A tax year is taxed once, on everything you earned in it. Your employers cannot see each other, so each one withholds as though the salary it pays were your only income. This adds your periods up and taxes them once.',
  limits: [
    'Anything but salary income, which is taxed under its own head and its own rules',
    'Tax your employers actually withheld, which is on your payslips and certificates and is what the final settlement is measured against',
    'Zakat, provident fund, donations and pension relief, which are on the salary calculator and would move every period by the same amount',
    'A period where your salary changed mid-month, which you can approximate by splitting it into two entries',
    'Provincial professional tax, levied by your province rather than by FBR',
  ],
  seo: {
    title: 'Multi-Year Salary Tax Calculator Pakistan',
    description:
      'Work out Pakistan salary tax across a year of job changes, raises and part-year work. See the tax on the year as a whole and what your employers would have withheld.',
  },
};

export const SALARY_INCREMENT_TOOL: Tool = {
  slug: 'salary-increment',
  title: 'Salary Increment Calculator',
  navLabel: 'Salary Increment',
  card: 'See how much of a raise actually reaches your account once tax takes its share, and whether it pushes you into a higher slab.',
  icon: 'chart',
  intro:
    'A raise is quoted gross and paid net. This works out the tax on the salary before and after, so the difference between them is what the raise is really worth.',
  limits: [
    'Anything but salary income',
    'Zakat, provident fund, donations and pension relief, which are on the salary calculator and would move both sides of the comparison equally',
    'A raise that arrives partway through the year, where only some months are paid at the new salary',
    'Bonuses, allowances and benefits, which are valued under their own rules',
    'What your employer will actually withhold month to month, which follows a projection under section 149',
  ],
  seo: {
    title: 'Salary Increment Calculator Pakistan',
    description:
      'Work out how much of your salary raise you keep after tax in Pakistan, on the current FBR slabs, and whether the raise crosses into a higher slab.',
  },
};

export const REVERSE_SALARY_TOOL: Tool = {
  slug: 'reverse-salary',
  title: 'Reverse Salary Calculator',
  navLabel: 'Reverse Salary',
  card: 'Know what you want to take home? This works backwards to the gross salary that produces it, which is the figure to ask for.',
  icon: 'target',
  intro:
    'Every other calculator here starts with a gross salary. This one starts with the number you actually care about, the amount that reaches your account, and finds the gross that produces it.',
  limits: [
    'Anything but salary income',
    'Zakat, provident fund, donations and pension relief, each of which changes the gross needed for a given take-home',
    'EOBI, which comes off take-home without changing the tax',
    'What an employer is willing to pay, which is a different question from what the arithmetic requires',
    'Bonuses and allowances, which are valued under their own rules',
  ],
  seo: {
    title: 'Reverse Salary Calculator Pakistan',
    description:
      'Enter the monthly take-home pay you want and find the gross salary needed before tax in Pakistan, on the current FBR salary slabs.',
  },
};

export const JOB_OFFER_TOOL: Tool = {
  slug: 'job-offer-comparison',
  title: 'Job Offer Comparison Calculator',
  navLabel: 'Job Offer Comparison',
  card: 'Compare two salaries by what each one actually pays you after tax, and see the gross an offer would need to match what you earn now.',
  icon: 'users',
  intro:
    'Two gross salaries are not comparable once the higher one crosses a slab boundary, because the extra gross is taxed at a higher rate than the salary beneath it. This taxes each one separately and compares what is left.',
  limits: [
    'Everything about a job that is not pay: the work, the people, the hours, the commute and what you learn',
    'Anything but salary income',
    'Zakat, provident fund, donations and pension relief, which would move both offers by the same amount',
    'Provident fund matching, medical cover, a car, or any other benefit an employer values differently from you',
    'Bonuses and equity, neither of which is salary and neither of which is guaranteed',
  ],
  seo: {
    title: 'Job Offer Comparison Calculator Pakistan',
    description:
      'Compare two Pakistan job offers by take-home pay after tax, on the current FBR salary slabs, with the gross an offer needs to match your current pay.',
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   The business tools.
   ══════════════════════════════════════════════════════════════════════════ */

export const BUSINESS_TAX_TOOL: Tool = {
  slug: 'business-tax',
  title: 'Business and AOP Tax Calculator',
  navLabel: 'Business & AOP Tax',
  card: 'Income tax for a sole trader, a partnership or a professional firm, on the non-salaried slabs, with the section 4AB surcharge where it applies.',
  icon: 'ledger',
  intro:
    'The First Schedule holds two tables for individuals, and which one applies turns on a single test: whether salary is more than 75% of your taxable income. This is the other table, and it is considerably steeper than the salary one.',
  limits: [
    'Which of the two tables applies to you, which depends on the 75% test and on figures only your own accounts can settle',
    'What counts as a deductible business expense, which is where most of the real work in a business return is',
    'Tax already paid: advance tax, tax withheld by your customers, and anything carried forward',
    'The minimum tax under section 113, which can exceed this figure and replaces it when it does',
    'Salary income taxed under its own head, and every other head of income',
    'Provincial sales tax on services, which is levied by your province rather than by FBR',
  ],
  seo: {
    title: 'Business and AOP Tax Calculator Pakistan',
    description:
      'Calculate Pakistan income tax for a sole trader, partnership or professional firm on the non-salaried FBR slabs, including the section 4AB surcharge.',
  },
};

export const CORPORATE_TAX_TOOL: Tool = {
  slug: 'corporate-tax',
  title: 'Corporate Tax Calculator',
  navLabel: 'Corporate Tax',
  card: 'Company income tax on yearly profit at the normal, small-company and banking rates, with the section 113 turnover floor applied where it bites.',
  icon: 'building',
  intro:
    'A company pays one flat rate on the whole of its taxable profit. There are no bands and no exempt threshold, which is the main way company tax differs from every other calculator here.',
  limits: [
    'What your taxable profit actually is, which is an accounting question rather than an arithmetic one',
    'Super tax under section 4C, which sits on top of this and has its own calculator',
    'Tax already paid: advance tax under section 147, and tax withheld by your customers',
    'Losses brought forward, depreciation and every other adjustment between accounting profit and taxable income',
    'Whether your company meets the small-company test, which has three conditions and needs all three',
    'Final tax regimes, exemptions and reduced rates that apply to particular sectors',
  ],
  seo: {
    title: 'Corporate Tax Calculator Pakistan',
    description:
      'Calculate Pakistan company income tax on yearly profit at the normal, small-company and banking rates, with the section 113 minimum tax on turnover.',
  },
};

export const SUPER_TAX_TOOL: Tool = {
  slug: 'super-tax',
  title: 'Super Tax Calculator',
  navLabel: 'Super Tax (4C)',
  card: 'The extra tax on very high income under section 4C. It is a cliff rather than a slab: pass the threshold and the rate applies to the whole income.',
  icon: 'percent',
  intro:
    'Super tax sits on top of ordinary income tax rather than replacing it. The thing to understand about it is that it is not progressive: once income passes the threshold, the rate applies to all of it.',
  limits: [
    'What your section 4C income is, which is defined in the section itself and is not simply your taxable income',
    'The ordinary income tax this sits on top of, which has its own calculator',
    'Whether your business falls in the specified sectors, which changes both the threshold and the rate',
    'Whether your export receipts genuinely exceed 80% of sales on the section\u2019s own measure, which turns on money actually received',
    'Tax already paid and anything carried forward',
  ],
  seo: {
    title: 'Super Tax Calculator Pakistan | Section 4C',
    description:
      'Calculate Pakistan super tax under section 4C. Nothing at or below Rs 500 million and 8% above it for most businesses, 10% from Rs 150 million for banks, oil and gas and fertilizer.',
  },
};

export const MINIMUM_TURNOVER_TAX_TOOL: Tool = {
  slug: 'minimum-turnover-tax',
  title: 'Minimum Turnover Tax Calculator',
  navLabel: 'Minimum Turnover Tax',
  card: 'The section 113 floor computed on sales instead of profit. You pay whichever is higher, which is why a loss-making business still pays it.',
  icon: 'audit',
  intro:
    'Section 113 sets a floor under your tax, worked out from turnover rather than from profit. It replaces your normal tax when it comes out higher, and it is never added on top of it.',
  limits: [
    'Your normal income tax, which has to be worked out before the two can be compared',
    'Which sector rate applies to you, which is a question about your business rather than your figures',
    'Whether the conditional distributor rate is available, which needs active status on two separate taxpayer lists',
    'Turnover already subject to a final tax regime, which is excluded from the section 113 base',
    'How much carried-forward minimum tax you can actually use, which depends on later years',
  ],
  seo: {
    title: 'Minimum Turnover Tax Calculator Pakistan | Section 113',
    description:
      'Calculate the Pakistan minimum tax on turnover under section 113. General rate 1.25%, reduced sector rates, and the two-year carry forward of the excess.',
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   Tax somebody else collects.
   ══════════════════════════════════════════════════════════════════════════ */

export const FREELANCER_TAX_TOOL: Tool = {
  slug: 'freelancer-tax',
  title: 'Freelancer and IT Export Tax Calculator',
  navLabel: 'Freelancer & IT Export',
  card: 'What your bank deducts from export receipts under section 154A, and what PSEB registration plus filer status would save you on the same income.',
  icon: 'code',
  intro:
    'Four rates come out of two yes/no facts: whether your PSEB registration is active, and whether you are on the Active Taxpayer List. The gap between the best and worst of them is eightfold on identical income.',
  limits: [
    'Whether your income actually qualifies as an IT or IT-enabled export under section 154A, which is defined by the section rather than by what you call your work',
    'Whether the tax is final for you, which needs every section 154A condition met including receipt through a bank in Pakistan',
    'Income from anywhere but eligible exports, which is taxed under the normal rules',
    'Your business expenses, which do not reduce this: section 154A is charged on gross receipts',
    'Provincial sales tax on services, which is levied by your province and is separate from this',
  ],
  seo: {
    title: 'Freelancer Tax Calculator Pakistan | Section 154A',
    description:
      'Calculate Pakistan freelancer and IT export tax under section 154A. Compare the PSEB filer rate of 0.25% against 1% and 2%, and see what registration would save.',
  },
};

export const CASH_WITHDRAWAL_TOOL: Tool = {
  slug: 'cash-withdrawal-tax',
  title: 'Cash Withdrawal Tax Calculator',
  navLabel: 'Cash Withdrawal Tax',
  card: 'What a bank keeps back under section 231AB when a non-filer takes out cash. A filer has nothing deducted, at any amount.',
  icon: 'receipt',
  intro:
    'Section 231AB applies to non-filers only. The threshold is a trigger rather than a tax-free allowance: once the day\u2019s cash passes it, the rate applies to the whole amount withdrawn.',
  limits: [
    'Every other withholding tax on a bank transaction, each of which has its own section and its own rate',
    'Whether you are actually on the Active Taxpayer List, which is checked against FBR\u2019s own list rather than against whether you filed',
    'The annual return this is adjustable against, which is where the deduction is claimed back',
    'Withdrawals in a currency other than rupees, and transactions that are not cash',
    'Bank charges and any other deduction your bank makes for its own reasons',
  ],
  seo: {
    title: 'Cash Withdrawal Tax Calculator Pakistan | Section 231AB',
    description:
      'Calculate the Pakistan section 231AB tax on cash withdrawals: 0.8% for non-filers once the day exceeds Rs 50,000, and nothing at all for filers.',
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   Property, vehicles, investments and the provincial taxes.

   Two of these carry a limitation that is not the usual "an estimate cannot
   know your circumstances": /tools/vehicle-token-tax cannot give a Sindh
   figure and /tools/agriculture-tax cannot give a Punjab one, because no
   government source publishes a schedule that can honestly be applied. Both
   say so on the page. See the notes in lib/tax/provincial.ts.
   ══════════════════════════════════════════════════════════════════════════ */

export const PROPERTY_PURCHASE_TOOL: Tool = {
  slug: 'property-purchase-tax',
  title: 'Property Purchase Tax Calculator',
  navLabel: 'Property Purchase Tax',
  card: 'Advance tax the buyer pays under section 236K. A filer pays one rate at any value; a non-filer pays up to fifteen times as much.',
  icon: 'building',
  intro:
    'Section 236K is collected from the buyer when a property is registered. A filer pays 1.25% whatever the property is worth. A non-filer is banded by value, and the gap between the two is the largest on any transaction on this site.',
  limits: [
    'The FBR-notified valuation for the area, which is published per city and per locality and is often above the price agreed. The tax falls on whichever is higher',
    'Stamp duty, the capital value tax and the registration fee, which are provincial charges collected on the same transaction and are not this',
    'Whether the seller is also passing on their own section 236C, which is a separate charge on the other side of the deal',
    'Any exemption available on a first property, an inherited property or a gift between relatives',
    'What your position on the Active Taxpayer List actually is on the day of registration, which is checked against FBR\u2019s list rather than against whether you filed',
  ],
  seo: {
    title: 'Property Purchase Tax Calculator Pakistan | Section 236K',
    description:
      'Calculate the advance tax on buying property in Pakistan under section 236K: 1.25% for filers at any value, and 10.5% to 18.5% for non-filers by value band.',
  },
};

export const PROPERTY_SALE_TOOL: Tool = {
  slug: 'property-sale-tax',
  title: 'Property Sale Tax Calculator',
  navLabel: 'Property Sale Tax',
  card: 'Advance tax deducted from the seller under section 236C. It falls on the whole transfer value, which is why a sale at a loss still attracts it.',
  icon: 'receipt',
  intro:
    'Section 236C is collected from the seller when a property is transferred. It is charged on the whole value rather than on your profit, and it is advance tax, so it is creditable against the capital gains tax on the same sale.',
  limits: [
    'The FBR-notified valuation for the area, which the tax falls on where it is higher than the price agreed',
    'The capital gains tax on your actual profit, which is a separate calculation this one is creditable against',
    'Stamp duty and the provincial charges collected on the same transfer',
    'Whether the sale is exempt, for instance on a property held long enough under the pre-2024 rules',
    'Tax already withheld from you elsewhere in the year, which also counts towards your final liability',
  ],
  seo: {
    title: 'Property Sale Tax Calculator Pakistan | Section 236C',
    description:
      'Calculate the advance tax on selling property in Pakistan under section 236C: 2.75% for filers and 11.5% for non-filers, creditable against capital gains tax.',
  },
};

export const PROPERTY_GAINS_TOOL: Tool = {
  slug: 'property-capital-gains',
  title: 'Property Capital Gains Tax Calculator',
  navLabel: 'Property Capital Gains',
  card: 'Tax on the profit from selling a property, with the section 236C already deducted credited against it. When you bought decides everything.',
  icon: 'chart',
  intro:
    'Property bought on or after 1 July 2024 is taxed at a flat rate for a filer, however long it was held. Anything bought before that date stays on the old holding-period table, which reaches nil and differs by what the property is.',
  limits: [
    'The FBR-notified valuation, which can make the taxable gain larger than the profit you actually made',
    'What counts as a deductible cost, which needs documents rather than estimates',
    'Your other income for the year, which decides a non-filer\u2019s rate entirely and can move it between 15% and the top slab',
    'Inherited property and gifts between relatives, where the acquisition date and cost are determined by their own rules',
    'Losses on other property disposals in the same year, which can be set against this gain',
  ],
  seo: {
    title: 'Property Capital Gains Tax Calculator Pakistan',
    description:
      'Calculate capital gains tax on a Pakistan property sale. Flat 15% for filers on property bought from 1 July 2024, holding-period rates for older purchases.',
  },
};

export const RENTAL_INCOME_TOOL: Tool = {
  slug: 'rental-income-tax',
  title: 'Rental Income Tax Calculator',
  navLabel: 'Rental Income Tax',
  card: 'What your tenant withholds from rent under section 155, in bands on the year\u2019s rent, with a non-filer withheld at exactly double.',
  icon: 'ledger',
  intro:
    'Rent is taxed in steps on the total for the year, and your tenant deducts it before paying you. A private tenant only has to withhold above a threshold; a company or government tenant withholds from the first rupee.',
  limits: [
    'Repairs, property tax, insurance and the other deductions allowable against property income, which reduce what you finally owe',
    'Rent from more than one property, which is added together before the bands are applied',
    'Whether your tenant is a prescribed person required to withhold at all',
    'Your other income for the year, which the withheld tax is ultimately adjusted against',
    'Provincial property tax, which your province levies separately from this',
  ],
  seo: {
    title: 'Rental Income Tax Calculator Pakistan | Section 155',
    description:
      'Calculate the tax your tenant withholds from rent in Pakistan under section 155, on the current bands, with filer and non-filer rates and company rates.',
  },
};

export const VEHICLE_TAX_TOOL: Tool = {
  slug: 'vehicle-tax',
  title: 'Vehicle Registration Tax Calculator',
  navLabel: 'Vehicle Tax',
  card: 'Advance tax on registering or transferring a vehicle under section 231B. Registration is a percentage of value; transfer is a fixed amount that falls with age.',
  icon: 'compass',
  intro:
    'Section 231B charges two different things under one section. Registering a vehicle costs a percentage of its value; transferring one that is already registered costs a fixed amount, reduced by a tenth for every year since it was first registered.',
  limits: [
    'The yearly token tax, which your province charges separately and which has its own calculator here',
    'What counts as the vehicle\u2019s value, which the section defines differently for imported, locally made and auctioned vehicles',
    'Customs duty, sales tax and federal excise on an imported vehicle, which are charged before this and form part of the value it is charged on',
    'Provincial registration and transfer fees, and the number plate and smart card charges',
    'Whether a vehicle qualifies for any exemption, for instance as an electric vehicle or under a disability concession',
  ],
  seo: {
    title: 'Vehicle Tax Calculator Pakistan | Section 231B',
    description:
      'Calculate the advance tax on registering or transferring a vehicle in Pakistan under section 231B, by engine capacity, with the used-vehicle reduction.',
  },
};

export const TOKEN_TAX_TOOL: Tool = {
  slug: 'vehicle-token-tax',
  title: 'Vehicle Token Tax Calculator',
  navLabel: 'Vehicle Token Tax',
  card: 'The yearly token, which your province sets, plus the federal section 234 tax collected with it. Rates differ sharply between provinces.',
  icon: 'clock',
  intro:
    'A token bill is two taxes collected together: the provincial token, set by your province, and a federal tax under section 234. Provinces differ not just in rate but in structure, so the same car costs very different amounts in different places.',
  limits: [
    'Sindh, which publishes no annual rate table for private cars that we could verify against a government source. The page says so rather than guessing, and points at the province\u2019s own calculator',
    'Arrears, surcharges and penalties on a token paid late, which each province sets its own way',
    'Lifetime token options, which several provinces offer as an alternative to the yearly amounts shown',
    'Concessions for electric vehicles, which are changing in most provinces and differ by year',
    'Vehicles other than private cars: commercial vehicles, motorcycles and goods transport are on their own schedules',
  ],
  seo: {
    title: 'Vehicle Token Tax Calculator Pakistan | All Provinces',
    description:
      'Calculate yearly vehicle token tax in Pakistan by province, with the federal section 234 tax and the early-payment discount where a province offers one.',
  },
};

export const SECURITIES_GAINS_TOOL: Tool = {
  slug: 'capital-gains-tax',
  title: 'Capital Gains Tax Calculator for Shares',
  navLabel: 'Shares Capital Gains',
  card: 'Tax on the profit from selling listed securities under section 37A. When you bought them decides the rate, and shares bought before July 2013 are outside the charge entirely.',
  icon: 'chart',
  intro:
    'Section 37A taxes the gain on listed securities, and NCCPL collects it before the money reaches you. The rate turns on when you acquired the shares, not on when you sold them.',
  limits: [
    'Losses on other securities in the same year, which are set against gains before the tax is worked out',
    'Your other income, which decides a non-filer\u2019s rate on shares acquired from July 2024',
    'Bonus shares, rights issues and corporate actions, which have their own cost rules',
    'Dividends, which are taxed separately from the gain on the shares that paid them',
    'Securities that are not listed, and foreign holdings, which fall outside section 37A',
  ],
  seo: {
    title: 'Capital Gains Tax Calculator Pakistan | Shares and PSX',
    description:
      'Calculate capital gains tax on Pakistan Stock Exchange shares under section 37A. Flat 15% on shares bought from 1 July 2024, with lower rates on older holdings.',
  },
};

export const MUTUAL_FUND_TOOL: Tool = {
  slug: 'mutual-fund-tax',
  title: 'Mutual Fund Tax Calculator',
  navLabel: 'Mutual Fund Tax',
  card: 'Tax when you redeem fund units. A person pays one rate on either fund type; a company pays more on anything but a stock fund.',
  icon: 'database',
  intro:
    'Your fund company deducts this before paying you and passes it to NCCPL. For a person the rate no longer depends on the fund type or on how long the units were held, which is a recent simplification.',
  limits: [
    'Dividends the fund paid you along the way, which are taxed under their own rules rather than as a gain',
    'Losses on other redemptions in the same year',
    'The fund\u2019s own charges, front-end loads and management fees, which reduce your return without reducing this tax',
    'Voluntary pension schemes and other wrappers, which have their own treatment entirely',
    'Whether your fund is classified as a stock fund, which your account statement rather than this calculator settles',
  ],
  seo: {
    title: 'Mutual Fund Tax Calculator Pakistan',
    description:
      'Work out the tax when you redeem mutual fund units in Pakistan: 15% for a person on either fund type, and 25% for a company on a fund that is not a stock fund.',
  },
};

export const AGRICULTURE_TAX_TOOL: Tool = {
  slug: 'agriculture-tax',
  title: 'Agricultural Income Tax Calculator',
  navLabel: 'Agricultural Income Tax',
  card: 'Provincial tax on farm income. Sindh, KP and Balochistan adopted the same slabs in 2025; Punjab\u2019s rates are in dispute and the page says so.',
  icon: 'award',
  intro:
    'Agriculture is a provincial subject, so this tax is charged by your province rather than by FBR. Sindh, KP and Balochistan each replaced their older area-based regimes with the same income-slab table in 2025.',
  limits: [
    'Punjab, whose rate notifications were ruled void by the Assembly in April 2026. We are not printing a figure computed under them, and the page explains why',
    'The per-acre land tax, which survives in KP, Balochistan and Punjab as a floor rather than an extra, and was abolished only in Sindh',
    'What counts as agricultural income, which each province defines in its own Act and which excludes a good deal of what happens on a farm',
    'The expenses allowable against it, which need accounts rather than an estimate',
    'Provincial super tax on very large agricultural incomes, which each province sets separately and has changed recently',
    'Federal income tax on any income you have that is not agricultural, which is a separate return entirely',
  ],
  seo: {
    title: 'Agricultural Income Tax Calculator Pakistan',
    description:
      'Calculate provincial agricultural income tax in Pakistan on the 2025 slab regime for Sindh, KP and Balochistan, with the per-acre land tax position for each.',
  },
};

export const ELECTRICITY_TOOL: Tool = {
  slug: 'electricity-bill-tax',
  title: 'Electricity Bill Tax Calculator',
  navLabel: 'Electricity Bill Tax',
  card: 'Income tax added to an electricity bill under section 235. A home meter belonging to a filer pays nothing; a shop or factory pays regardless.',
  icon: 'sparkles',
  intro:
    'Two different regimes sit under one section. A home meter is charged only where the consumer is not on the Active Taxpayer List and the bill reaches the threshold. A commercial or industrial meter is charged on a band table whatever your filer status.',
  limits: [
    'Sales tax, the fuel price adjustment, the TV licence fee and the other charges on a bill, none of which is this',
    'Provincial electricity duty, which your province levies separately',
    'Whether this is a minimum tax or an adjustable one for you, which depends on conditions in the section',
    'Bills for agricultural connections and other categories on their own footing',
    'What you can actually claim back, which needs the certificate your electricity company issues',
  ],
  seo: {
    title: 'Electricity Bill Tax Calculator Pakistan | Section 235',
    description:
      'Calculate the income tax on a Pakistan electricity bill under section 235: 7.5% on home bills from Rs 25,000 for non-filers, plus the commercial and industrial bands.',
  },
};

export const TELECOM_TOOL: Tool = {
  slug: 'mobile-internet-tax',
  title: 'Mobile and Internet Tax Calculator',
  navLabel: 'Mobile & Internet Tax',
  card: 'The income tax inside a mobile load or added to a phone bill under section 236. On a load it comes out of your balance; on a bill it goes on top.',
  icon: 'phone',
  intro:
    'One rate covers a mobile bill, an internet bill and a prepaid load alike, and it does not turn on whether you file. What differs is direction: a load is taxed inside the amount, a bill on top of it.',
  limits: [
    'Sales tax on services, which your province charges on the same bill and which is a larger figure than this',
    'Your operator\u2019s own charges, bundle prices and the way it rounds a top-up',
    'The federal excise duty applied in Islamabad, which is separate again',
    'Whether you are named in an FBR order under section 114B, which changes the rate dramatically and which only FBR can tell you',
    'What you can claim back, which needs you to file and to have the certificates',
  ],
  seo: {
    title: 'Mobile and Internet Tax Calculator Pakistan | Section 236',
    description:
      'See the income tax on a mobile load, internet or landline bill in Pakistan under section 236: 15% on a load or bill, and 10% on a landline bill above Rs 1,000.',
  },
};

/**
 * The registry behind /tools.
 *
 * One array, in the order the hub renders them. A new calculator is added
 * here and to `app/tools/<slug>/page.tsx`, and it then appears on the hub, in
 * the sitemap and in the hub's ItemList schema without anyone editing three
 * more files.
 *
 * It is not derived from the filesystem. A route that exists is not the same
 * claim as a tool that is finished and ready to be linked from the navbar, and
 * this list is the second claim.
 */
export const TOOLS: Tool[] = [
  SALARY_TAX_TOOL,
  MULTI_YEAR_SALARY_TOOL,
  SALARY_INCREMENT_TOOL,
  REVERSE_SALARY_TOOL,
  JOB_OFFER_TOOL,
  BUSINESS_TAX_TOOL,
  CORPORATE_TAX_TOOL,
  SUPER_TAX_TOOL,
  MINIMUM_TURNOVER_TAX_TOOL,
  FREELANCER_TAX_TOOL,
  PROPERTY_PURCHASE_TOOL,
  PROPERTY_SALE_TOOL,
  PROPERTY_GAINS_TOOL,
  RENTAL_INCOME_TOOL,
  VEHICLE_TAX_TOOL,
  TOKEN_TAX_TOOL,
  SECURITIES_GAINS_TOOL,
  MUTUAL_FUND_TOOL,
  AGRICULTURE_TAX_TOOL,
  CASH_WITHDRAWAL_TOOL,
  ELECTRICITY_TOOL,
  TELECOM_TOOL,
];

/**
 * The hub groups the tools rather than running eleven cards in one list.
 *
 * Eleven undifferentiated cards is a wall, and the groups are the question a
 * visitor is actually answering when they arrive: am I employed, do I run a
 * business, or is somebody deducting tax from me. `slug` is used for the
 * section id so the hub's own headings are linkable.
 */
export interface ToolGroup {
  slug: string;
  /** Used for the group's own heading, split the way SectionHeading wants it. */
  title: string;
  accent: string;
  blurb: string;
  tools: Tool[];
}

export const TOOL_GROUPS: ToolGroup[] = [
  {
    slug: 'salary',
    title: 'Salary and',
    accent: 'take-home',
    blurb:
      'For anyone on a payroll. Every one of these taxes a salary against the same FBR slabs, so they cannot disagree with each other about the same figure.',
    tools: [
      SALARY_TAX_TOOL,
      MULTI_YEAR_SALARY_TOOL,
      SALARY_INCREMENT_TOOL,
      REVERSE_SALARY_TOOL,
      JOB_OFFER_TOOL,
    ],
  },
  {
    slug: 'business',
    title: 'Business and',
    accent: 'company',
    blurb:
      'For a sole trader, a partnership or a registered company. A business is taxed on a different and much steeper table than a salary, which is the distinction these four exist to get right.',
    tools: [
      BUSINESS_TAX_TOOL,
      CORPORATE_TAX_TOOL,
      SUPER_TAX_TOOL,
      MINIMUM_TURNOVER_TAX_TOOL,
    ],
  },
  {
    slug: 'property',
    title: 'Property and',
    accent: 'rent',
    blurb:
      'Buying, selling and letting. A single sale can attract several of these at once, and the advance tax on the transfer is creditable against the tax on the gain, so they are built to be read together.',
    tools: [
      PROPERTY_PURCHASE_TOOL,
      PROPERTY_SALE_TOOL,
      PROPERTY_GAINS_TOOL,
      RENTAL_INCOME_TOOL,
    ],
  },
  {
    slug: 'vehicle',
    title: 'Vehicles and',
    accent: 'investments',
    blurb:
      'Registering a car, paying its yearly token, and cashing in shares or fund units. The token calculator is the one here that depends on your province as well as on FBR.',
    tools: [VEHICLE_TAX_TOOL, TOKEN_TAX_TOOL, SECURITIES_GAINS_TOOL, MUTUAL_FUND_TOOL],
  },
  {
    slug: 'withholding',
    title: 'Tax deducted',
    accent: 'by someone else',
    blurb:
      'Tax collected before the money reaches you, on a bank withdrawal, an export payment, an electricity bill or a phone top-up. Most of these turn on whether you are on the Active Taxpayer List, which is usually where the money is.',
    tools: [FREELANCER_TAX_TOOL, CASH_WITHDRAWAL_TOOL, ELECTRICITY_TOOL, TELECOM_TOOL],
  },
  {
    slug: 'provincial',
    title: 'Set by your',
    accent: 'province',
    blurb:
      'Agriculture is a provincial subject, not a federal one, so these are charged by your province and the rates differ across the four. Where a province publishes nothing we can verify, the calculator says so rather than guessing.',
    tools: [AGRICULTURE_TAX_TOOL],
  },
];

export const toolHref = (tool: Tool) => `/tools/${tool.slug}`;

/**
 * Copy for the hub itself.
 *
 * Written to survive the list growing: it describes what the tools have in
 * common (free, no sign-up, computed in the browser) rather than counting
 * them or naming the one that exists today.
 */
export const TOOLS_HUB = {
  title: 'Tools',
  intro:
    'Free calculators that run entirely in your browser. Nothing you type is sent anywhere, there is no sign-up, and each one shows its working so you can check the answer rather than take it on trust.',
  seo: {
    title: 'Free Tools and Calculators',
    description:
      'Free calculators for Pakistan, computed in your browser with the working shown. No sign-up and nothing you enter leaves your device.',
  },
} as const;

/* ══════════════════════════════════════════════════════════════════════════
   FAQs, one set per calculator.

   Written to the same rule as SALARY_TAX_FAQS above: each answer is complete
   on its own, because these are carried into FAQPage schema and any one of
   them may be the only part a person ever reads. Ordered by how early somebody
   asks them, and each set ends with the questions its calculator CANNOT
   answer, where an honest tool should say so.
   ══════════════════════════════════════════════════════════════════════════ */

export const MULTI_YEAR_SALARY_FAQS: Faq[] = [
  {
    question: 'Why does the tax on my payslips not match the tax on my year?',
    answer:
      'Because each employer withholds against a projection of a full year at the salary it pays you, under section 149. If you worked six months at one job and six at another, both employers withheld as though you earned their salary for all twelve months. The year itself is taxed once, on the total, which is almost never what the two projections add up to.',
  },
  {
    question: 'I changed jobs mid-year. Will I owe more tax or get a refund?',
    answer:
      'It depends on the direction of the change. If your salary went up, the second employer projected a full year at the higher figure and over-withheld, so you are usually due a refund. If you took a pay cut, or had months with no salary at all, each employer withheld against a lower projection and you may owe the difference at filing. The calculator shows which of the two applies to your year.',
  },
  {
    question: 'What if I did not work for part of the year?',
    answer:
      'Enter only the months you were paid. A tax year with four unpaid months is taxed on the eight months of salary you actually received, not on a projection of twelve. That is frequently a refund, because whichever employer paid you withheld as though the salary continued all year.',
  },
  {
    question: 'Does a bonus go in here?',
    answer:
      'Not as a monthly salary. A bonus is chargeable under the head Salary and does form part of your annual income, but it is a one-off rather than a rate per month, and this calculator asks for a monthly figure and a number of months. Entering it would overstate the year unless you divided it out yourself.',
  },
  {
    question: 'Does this tell me what I owe at filing?',
    answer:
      'It tells you the tax on the year, which is one half of that sum. The other half is what has already been withheld from you, which is on your payslips and on the certificates your employers can issue. What you owe or are owed is the difference, and only your own certificates can settle it.',
  },
];

export const SALARY_INCREMENT_FAQS: Faq[] = [
  {
    question: 'How much of a raise do you actually keep in Pakistan?',
    answer:
      'It depends entirely on which slab the raise falls in. A raise inside the 1% band is kept almost in full; the same raise on a salary already in the 35% band keeps 65 paisa in the rupee. The calculator works out the tax before and after the raise and shows the difference, which is the only way to get it right when a raise straddles a boundary.',
  },
  {
    question: 'Will a raise ever leave me worse off?',
    answer:
      'No. Pakistan taxes salary progressively, which means a higher rate applies only to the part of your income above the threshold, not to all of it. Crossing into a higher slab always leaves you with more than before, just not with all of the raise. The belief that a raise can cost you money is the single most common misunderstanding about tax slabs and it is not true here.',
  },
  {
    question: 'Why is my effective rate lower than my slab rate?',
    answer:
      'Because your slab rate applies only to your top band of income. Everything below it is taxed at the lower rates beneath, including the first tranche which is not taxed at all. Your effective rate is the tax as a share of your whole salary, and it is always lower than the rate on your top slab.',
  },
  {
    question: 'My raise arrives in April. Does this still apply?',
    answer:
      'Not directly. This calculates a full year at each salary, which is the right comparison for deciding whether a raise is worth taking. A raise arriving partway through the tax year means only some months are paid at the new figure, and the multi-year calculator is built for that case.',
  },
  {
    question: 'Should I negotiate on gross or on take-home?',
    answer:
      'Employers quote gross and think in gross, so negotiate there, but decide using take-home. A gross figure that sounds generous can be worth much less than it appears if it lands in a higher slab, and the only way to know is to work the tax on both figures.',
  },
];

export const REVERSE_SALARY_FAQS: Faq[] = [
  {
    question: 'How do I work out the gross salary I need?',
    answer:
      'You cannot do it with a single formula, because the tax depends on the gross you are solving for. What works is to try a gross, tax it, see whether the take-home lands where you want, and narrow in. That is exactly what this calculator does, against the same FBR slabs the salary calculator uses, and it lands within a rupee of your target.',
  },
  {
    question: 'Is the gross I need just my take-home plus tax?',
    answer:
      'No, and this is where most people go wrong. Adding the tax on your target take-home gives a figure that is itself taxed at a higher rate, so it still falls short. The answer has to be solved for rather than added up, which is why the number here is usually higher than people expect.',
  },
  {
    question: 'Why does asking for a bit more take-home cost so much more gross?',
    answer:
      'Because the extra gross is taxed at your marginal rate, not your average one. In the 35% band, every extra rupee of take-home needs about 1.54 rupees of gross. That gap widens with every slab you climb, which is why a modest increase in what you want to receive can mean a large increase in what you have to ask for.',
  },
  {
    question: 'Does this include provident fund and EOBI?',
    answer:
      'No. It solves for income tax only. A provident fund contribution and EOBI both come off your take-home without changing your tax, so if your employer deducts either, the gross you need is higher than the figure here by roughly those amounts. The salary calculator has both.',
  },
  {
    question: 'Can I use this to set a freelance rate?',
    answer:
      'Only if you are taxed as a salaried person, which a freelancer usually is not. Freelance and business income is taxed on a different and steeper table, and IT export receipts have their own regime under section 154A. Both have their own calculators here.',
  },
];

export const JOB_OFFER_FAQS: Faq[] = [
  {
    question: 'How do I compare two job offers in Pakistan after tax?',
    answer:
      'Tax each salary on its own and compare what is left, which is what this calculator does. Comparing gross figures is misleading once the higher offer crosses a slab boundary, because the extra gross is then taxed at a higher rate than the salary underneath it. The difference in take-home is usually smaller than the difference in gross.',
  },
  {
    question: 'What gross does an offer need to match what I earn now?',
    answer:
      'The calculator works it out and shows it whenever the offer pays less. It is the gross salary whose take-home equals your current take-home, solved against the same slabs. That figure is the one to negotiate against, because it is the point at which the move costs you nothing in cash terms.',
  },
  {
    question: 'A higher salary put me in a higher slab. Is the move still worth it?',
    answer:
      'On cash, almost always yes. The higher rate applies only to the part of the salary above the threshold, so a higher gross always produces a higher take-home. What changes is how much of the increase you keep, and that is the number this calculator exists to show you before you decide.',
  },
  {
    question: 'What about provident fund, medical cover and a car?',
    answer:
      'None of them is in here, and all of them can be worth more than the gap between two salaries. An employer contribution to a recognised provident fund is exempt within the limits in the Sixth Schedule; a car and accommodation are valued under their own rules and are taxable. Compare the cash here, then weigh the benefits separately.',
  },
  {
    question: 'Should I decide on money alone?',
    answer:
      'This calculator only knows about money, and it is the smaller half of most job decisions. The work, the people, the hours, the commute and what you will be able to do next are not in any of these numbers, and they are usually what people cite when a move works out or does not.',
  },
];

export const BUSINESS_TAX_FAQS: Faq[] = [
  {
    question: 'Which tax table applies to me, salaried or business?',
    answer:
      'One test decides it: whether salary is more than 75% of your taxable income. Above 75% you are on the salary table, which starts at 1%. At or below it you are on the business table, which starts at 15% and tops out at 45%. The difference between the two on the same income is large, so the test is worth getting right rather than assuming.',
  },
  {
    question: 'Are a sole trader and a partnership taxed the same?',
    answer:
      'On the slabs, yes: an individual and an association of persons use the same table. They differ on the section 4AB surcharge. An AOP pays 10% of its tax once taxable income passes ten million rupees; for an individual that surcharge was 9% for tax year 2026 and is nil from tax year 2027.',
  },
  {
    question: 'What is the section 4AB surcharge?',
    answer:
      'An extra charge computed on the tax rather than on the income, which applies above ten million rupees of taxable income. It never applied to income chargeable under the head Salary, and from tax year 2027 it no longer applies to an individual at all. A calculator still adding it to a sole trader’s figure is quoting you too much.',
  },
  {
    question: 'Why is my professional firm capped at 40%?',
    answer:
      'Because a firm of professionals that is prohibited from incorporating by its own regulator is charged at 40% on its top band rather than 45%. The classic case is a legal practice. It is a ceiling on the top rate rather than a separate table, so every band below it is unchanged.',
  },
  {
    question: 'Does this account for my business expenses?',
    answer:
      'No. It taxes the taxable income you enter, which is the figure after expenses. Working out what is deductible is where most of the real work in a business return sits, and it needs your accounts rather than a form.',
  },
  {
    question: 'Could I owe more than this?',
    answer:
      'Yes. Section 113 sets a minimum tax computed on turnover rather than profit, and it replaces this figure when it comes out higher, which is common in a low-margin or loss-making year. It has its own calculator here. Advance tax and tax withheld by your customers are also not in this figure and reduce what you finally pay.',
  },
];

export const CORPORATE_TAX_FAQS: Faq[] = [
  {
    question: 'What is the company tax rate in Pakistan?',
    answer:
      '29% for a normal company, 20% for a small company, and 42% for a banking company. A company pays one flat rate on the whole of its taxable profit: there are no bands and no exempt threshold, which is the main difference from how an individual is taxed.',
  },
  {
    question: 'What counts as a small company?',
    answer:
      'Three conditions, and all three have to be met: capital and reserves not above fifty million rupees, not more than 250 employees, and annual turnover not above 250 million rupees. Failing any one of them puts the company on the normal rate, so this is worth checking rather than assuming from size alone.',
  },
  {
    question: 'Why is the banking rate coming down?',
    answer:
      'It is on a legislated path rather than changing year by year: 44% for tax year 2025, 43% for 2026, and 42% from 2027 onwards. A calculator quoting 44% is using a rate that is two years out of date.',
  },
  {
    question: 'Does a loss-making company pay tax?',
    answer:
      'Often yes, because of section 113. It sets a minimum tax computed on turnover rather than on profit, and a company with no profit still has turnover. That is the point of a minimum tax, and it is the part that most surprises companies in a bad year.',
  },
  {
    question: 'Is super tax on top of this?',
    answer:
      'Yes. Section 4C sits on top of ordinary company tax rather than replacing it, and it starts at very high income. It has its own calculator here. Section 113 works the other way: it replaces the company tax when it is higher rather than adding to it.',
  },
  {
    question: 'Is my accounting profit the same as my taxable income?',
    answer:
      'Almost never. Depreciation, provisions, disallowed expenses and losses carried forward all sit between the two, and the gap can be large. The figure to enter here is taxable income, which comes out of your tax computation rather than straight off your profit and loss account.',
  },
];

export const SUPER_TAX_FAQS: Faq[] = [
  {
    question: 'What is super tax under section 4C?',
    answer:
      'An extra income tax on persons and businesses with very high income for the year. It sits on top of the ordinary income tax rather than replacing it, so a company in its range pays both.',
  },
  {
    question: 'How much is super tax for 2026-27?',
    answer:
      'For most businesses and people, nothing at or below five hundred million rupees of section 4C income, and 8% above that. Banks, oil and gas exploration businesses and fertilizer sellers pay 10% once their income passes one hundred and fifty million.',
  },
  {
    question: 'Is super tax charged only on the amount above the threshold?',
    answer:
      'No, and this is the thing to understand about it. The rate applies to the whole income, not to the excess. A business one rupee above five hundred million pays 8% of everything, which is forty million rupees rather than eight paisa. Crossing the line matters far more here than with any ordinary slab.',
  },
  {
    question: 'What changed for this year?',
    answer:
      'The six middle bands between one hundred and fifty and five hundred million were removed for most persons, and the top rate came down from 10% to 8%. The same income last year would have been charged somewhere between 1% and 10%. Banks, oil and gas explorers and fertilizer sellers were left on the old basis.',
  },
  {
    question: 'Do exporters pay super tax?',
    answer:
      'From tax year 2027, not where export proceeds actually received are more than 80% of total sales. It is an exemption from the section rather than a lower rate, so it removes the charge entirely. What matters is money received rather than invoiced.',
  },
  {
    question: 'Is my section 4C income the same as my taxable income?',
    answer:
      'Not necessarily. Section 4C defines its own income figure, and it is not simply the taxable income from your ordinary computation. Getting that figure right is the harder half of this calculation and it is not something a calculator can do for you.',
  },
];

export const MINIMUM_TURNOVER_TAX_FAQS: Faq[] = [
  {
    question: 'What is minimum tax under section 113?',
    answer:
      'A floor under your income tax, computed from turnover rather than from profit. You pay the higher of your normal tax and this figure. It is never added on top: it replaces the normal tax when it exceeds it.',
  },
  {
    question: 'Do I pay it if my business made a loss?',
    answer:
      'Yes, if you are within the section. A loss-making business has no profit to tax but still has turnover, and section 113 is computed on turnover. That is what a minimum tax is for, and it is the part businesses most often do not budget for in a bad year.',
  },
  {
    question: 'What is the minimum turnover tax rate?',
    answer:
      'The general rate is 1.25% of turnover. Reduced rates apply by sector: 0.75% for gas utilities above a billion rupees of turnover, PIA and poultry; 0.5% for oil refineries, oil marketing companies and registered motorcycle dealers; and 0.25% for rice and flour mills, petroleum agents, online marketplaces, used-vehicle sellers and large retailers integrated with FBR. Distributors and wholesalers of listed goods moved from 0.25% to 0.5% for 2026-27.',
  },
  {
    question: 'Who has to pay it?',
    answer:
      'Every resident company and every Pakistan branch of a foreign company, whatever its size. An individual or association of persons is only caught once turnover reaches one hundred million rupees.',
  },
  {
    question: 'Can I get the extra back?',
    answer:
      'Partly, and later. Where minimum tax exceeds your normal tax, the excess carries forward for up to two years and can be set against the normal tax of those years. If those years are also minimum-tax years, the carried-forward amount goes unused.',
  },
  {
    question: 'Why is the distributor rate conditional?',
    answer:
      'The reduced 0.5% rate for distributors and wholesalers of listed goods requires active status on the taxpayer lists under both the Sales Tax Act 1990 and the Income Tax Ordinance 2001. Falling off either list puts the business back on the general 1.25% rate.',
  },
];

export const FREELANCER_TAX_FAQS: Faq[] = [
  {
    question: 'How much tax does a freelancer pay in Pakistan?',
    answer:
      'On eligible IT and IT-enabled exports, between 0.25% and 2% of gross receipts under section 154A, deducted by your bank. Which of the four rates applies turns on two things: whether your PSEB registration is active, and whether you are on the Active Taxpayer List. The best case is eight times cheaper than the worst on identical income.',
  },
  {
    question: 'What does PSEB registration save?',
    answer:
      'For a filer, it takes the rate from 1% to 0.25%, so three quarters of the tax. On receipts of a few hundred thousand rupees a month that is a substantial annual figure, and the calculator shows exactly what it would be on your own numbers.',
  },
  {
    question: 'Can I deduct my expenses from this?',
    answer:
      'No. Section 154A is charged on the receipt itself rather than on profit, so your laptop, your internet and your subcontractors do not reduce it. That is a consequence of it being a final tax regime: the rate is low because there are no deductions, not in spite of it.',
  },
  {
    question: 'Is this my final tax?',
    answer:
      'Only if you meet every section 154A condition, which include receiving the payment through a bank in Pakistan and completing your required filings. Miss one and the income falls back into the normal regime, where it is taxed on the business slabs instead and the arithmetic changes entirely.',
  },
  {
    question: 'Do I still have to file a return?',
    answer:
      'Yes. Tax being deducted and final is not the same as having filed, and filing is what keeps you on the Active Taxpayer List. Falling off it doubles your section 154A rate, so for a freelancer the cost of not filing is direct and immediate rather than theoretical.',
  },
  {
    question: 'What if I also earn income that is not an export?',
    answer:
      'That income is taxed under the normal rules, on the business slabs, and is not covered here. Section 154A applies only to eligible IT and IT-enabled export receipts as the section defines them, which is narrower than what many people mean by freelancing.',
  },
];

export const CASH_WITHDRAWAL_FAQS: Faq[] = [
  {
    question: 'Who pays tax on cash withdrawals in Pakistan?',
    answer:
      'Only non-filers, meaning people whose name is not on FBR’s Active Taxpayer List. A filer has nothing deducted under section 231AB, however much cash they take out.',
  },
  {
    question: 'How much is the cash withdrawal tax?',
    answer:
      'It is 0.8% for non-filers, and it starts once the cash you take out in a single day passes fifty thousand rupees. The rate was 0.6% until the Finance Act 2025 raised it.',
  },
  {
    question: 'Is the first fifty thousand rupees free of tax?',
    answer:
      'No. Fifty thousand is the point at which the deduction starts, not an amount that stays exempt. Once the day’s cash passes it, the 0.8% applies to the whole amount withdrawn rather than only to the part above it. Reading it as an allowance understates the deduction every time.',
  },
  {
    question: 'Does it apply to each withdrawal or to the whole day?',
    answer:
      'To the whole day. The threshold is the total of your cash withdrawals in a single day, so three withdrawals of twenty thousand rupees count the same as one of sixty thousand. Splitting a withdrawal does not avoid it.',
  },
  {
    question: 'Does it apply at an ATM?',
    answer:
      'Yes. What matters is cash leaving your account rather than which counter you use, so ATM withdrawals and cash taken out on a card count towards the same daily total.',
  },
  {
    question: 'Can I get this money back?',
    answer:
      'It is adjustable, which means it counts towards your income tax for the year and is claimed on your annual return. But you have to file to claim it. A person who never files never gets it back, and the money simply stays with FBR.',
  },
  {
    question: 'How do I stop the deduction?',
    answer:
      'File your income tax return so your name appears on the Active Taxpayer List. From then on you count as a filer and the deduction stops on every withdrawal. For anyone who handles cash regularly, that saving alone usually exceeds what filing costs.',
  },
];

export const PROPERTY_PURCHASE_FAQS: Faq[] = [
  {
    question: 'How much tax do you pay when buying property in Pakistan?',
    answer:
      'A buyer on the Active Taxpayer List pays 1.25% of the value under section 236K, whatever the property is worth. A buyer who is not pays between 10.5% and 18.5% depending on the value, so the same purchase can cost fifteen times more.',
  },
  {
    question: 'Is section 236K charged on the price I agreed?',
    answer:
      'On the higher of the price you agreed and the value FBR has notified for that area. Those valuation tables are published per city and per locality, and in many areas the notified figure is above the market price. Whichever is higher is what the registrar applies the rate to.',
  },
  {
    question: 'Is there still a late-filer rate?',
    answer:
      'No. The late-filer tier applied only to sections 236C and 236K, and only for tax years 2025 and 2026. The Finance Act 2026 removed it, so there are two positions now rather than three: on the Active Taxpayer List or not.',
  },
  {
    question: 'Do the value bands apply to filers?',
    answer:
      'Not any more. A filer pays one rate at every value from this tax year. The three value bands survive only on the non-filer side, which is where the rate climbs with the price of the property.',
  },
  {
    question: 'Can I get this money back?',
    answer:
      'It is advance tax, so it counts towards your income tax for the year and is claimed on your return. It is not a separate charge you simply lose, but it is only recoverable by someone who files.',
  },
  {
    question: 'What else do I pay on top of this?',
    answer:
      'Stamp duty, capital value tax and the registration fee, all of which your province charges on the same transaction and none of which is section 236K. This calculator covers the federal advance tax only.',
  },
];

export const PROPERTY_SALE_FAQS: Faq[] = [
  {
    question: 'How much tax is deducted when you sell property in Pakistan?',
    answer:
      'Section 236C takes 2.75% from a seller on the Active Taxpayer List and 11.5% from one who is not. Unlike the buyer’s side, neither rate is banded: they are flat at every value.',
  },
  {
    question: 'Is section 236C charged on my profit?',
    answer:
      'No, on the whole transfer value. That is why a property sold at a loss still attracts it, and why the figure can be large on a sale that made you nothing. The tax on your actual profit is capital gains tax, which is a separate calculation.',
  },
  {
    question: 'Do I pay both section 236C and capital gains tax?',
    answer:
      'Both are charged, but not both are kept. Section 236C is advance tax, so it is creditable against the capital gains tax on the same sale. If the advance tax collected exceeds the tax on the gain, the difference is refundable, but only on a return you file.',
  },
  {
    question: 'What if the FBR value is higher than what I sold for?',
    answer:
      'The higher figure is used. The rate applies to the greater of the consideration received and the value notified for the area, so a sale below the notified value is still taxed on the notified value.',
  },
  {
    question: 'Is there a late-filer rate for sellers?',
    answer:
      'Not for this tax year. It existed for tax years 2025 and 2026 and was removed by the Finance Act 2026, so a seller is either on the Active Taxpayer List or not.',
  },
];

export const PROPERTY_GAINS_FAQS: Faq[] = [
  {
    question: 'How is capital gains tax on property calculated in Pakistan?',
    answer:
      'It depends entirely on when you bought. Property acquired on or after 1 July 2024 is taxed at a flat 15% for a seller on the Active Taxpayer List, however long it was held. Property acquired before that date stays on a holding-period table where the rate falls the longer you owned it, and differs between an open plot, constructed property and a flat.',
  },
  {
    question: 'Do I still pay if I held the property for years?',
    answer:
      'On a purchase from 1 July 2024, yes: the flat rate does not fall with time. On an older purchase, often no. The old table reaches nil at six years for an open plot, four for constructed property and two for a flat, and those rates still govern those purchases in every later tax year.',
  },
  {
    question: 'What does a non-filer pay?',
    answer:
      'Not the flat 15%. A person off the Active Taxpayer List is charged at the ordinary non-salaried slab rates instead, subject to a floor of 15% of the gain. So the figure lies somewhere between 15% and the top slab rate, decided by their other income for the year, which is why this calculator gives a non-filer a range rather than a number.',
  },
  {
    question: 'Does the section 236C already deducted count towards this?',
    answer:
      'Yes. It is advance tax on the same sale, so it comes off the capital gains tax rather than adding to it. Where it exceeds the tax on the gain, the excess is claimed back on your return.',
  },
  {
    question: 'What costs can I take off the gain?',
    answer:
      'Documented costs of acquiring, improving and selling the property. Estimates will not do: what you can substantiate is what reduces the gain, which is why keeping the paperwork on a property matters years before you sell it.',
  },
  {
    question: 'What if I sold at a loss?',
    answer:
      'There is no gain, so there is no capital gains tax. Section 236C is still deducted on the transfer, though, because it falls on the value rather than the profit, and that becomes recoverable on your return.',
  },
];

export const RENTAL_INCOME_FAQS: Faq[] = [
  {
    question: 'How much tax is deducted from rent in Pakistan?',
    answer:
      'For a person, it is charged in steps on the rent for the whole year: nothing on the first Rs 300,000, then 5%, then Rs 15,000 plus 10%, and Rs 155,000 plus 25% above Rs 2,000,000. A non-filer is withheld at exactly double at every band. A company landlord pays a flat 15%.',
  },
  {
    question: 'Does my tenant have to deduct it?',
    answer:
      'A company, a government office or a similar prescribed person deducts from the first rupee. A private individual renting from you only has to deduct once the rent they pay reaches Rs 1,500,000 in a year. Below that nothing is withheld, but the rent is still taxable and still belongs on your return.',
  },
  {
    question: 'Is this the final tax on my rent?',
    answer:
      'No, it is tax withheld. Rental income is taxed as part of your total income, and the deductions allowable against property income can bring the final figure below what was withheld. The difference is claimed on your return.',
  },
  {
    question: 'I have two rented properties. How does that work?',
    answer:
      'The rents are added together and the bands applied to the total, not to each property separately. Two properties at Rs 900,000 each are taxed as Rs 1,800,000, which reaches a higher band than either would alone.',
  },
  {
    question: 'What can I deduct against rental income?',
    answer:
      'Repairs, property tax, insurance, ground rent and certain other expenses of the property are allowable against rental income under the Ordinance. None of them is in this calculator, which shows what your tenant withholds rather than what you finally owe.',
  },
];

export const VEHICLE_TAX_FAQS: Faq[] = [
  {
    question: 'How much tax do you pay to register a car in Pakistan?',
    answer:
      'A percentage of the vehicle’s value, set by engine capacity: from 0.5% up to 850cc to 12% above 3,000cc for a filer. A non-filer pays three times those rates, which is unusual, since most withholding rates only double.',
  },
  {
    question: 'Is transferring a used car taxed the same as registering a new one?',
    answer:
      'No, and this is the distinction that matters most here. Registration is a percentage of value. Transferring a vehicle that is already registered is a fixed rupee amount by engine band, and the value of the car does not enter it at all. Applying the registration percentage to a used-car transfer produces a figure many times too large.',
  },
  {
    question: 'Does the tax fall as the car gets older?',
    answer:
      'On a transfer, yes: the amount is reduced by a tenth for each year since the vehicle was first registered in Pakistan, reaching nil at ten years. On a first registration there is no such reduction.',
  },
  {
    question: 'What counts as the value of the vehicle?',
    answer:
      'The section defines it three ways. For an imported vehicle it is the customs assessed value plus customs duty, federal excise and sales tax. For a locally manufactured one it is the invoice value inclusive of all duties and taxes. For an auctioned one it is the auction value on the same inclusive basis.',
  },
  {
    question: 'Is this the same as token tax?',
    answer:
      'No. This is a federal advance tax charged once when a vehicle is registered or transferred. Token tax is a yearly charge set by your province, collected with a separate federal tax under section 234. They are different taxes with different calculators.',
  },
  {
    question: 'What about an electric vehicle with no engine capacity?',
    answer:
      'Where there is no cc rating and the value is at or above Rs 5 million, registration is charged at 3% of that value and a transfer at a fixed Rs 20,000, rather than falling into an engine band.',
  },
];

export const TOKEN_TAX_FAQS: Faq[] = [
  {
    question: 'How much is token tax in Pakistan?',
    answer:
      'It depends on your province, and they differ in structure as well as in amount. Khyber Pakhtunkhwa charges flat amounts from Rs 2,000 to Rs 8,000. Islamabad charges a percentage of the invoice value above 1,000cc. Punjab mixes the two. Balochistan charges flat amounts with a lifetime option at every engine size.',
  },
  {
    question: 'Why does the calculator not give a figure for Sindh?',
    answer:
      'Because Sindh Excise does not publish an annual rate table for private cars that we could verify. Other sites print one; we could not match it to any Sindh government source, and those sites do not agree with each other. Rather than pass on an unverifiable figure, the page says so and points at the province’s own calculator, which is the authority.',
  },
  {
    question: 'What is the extra federal tax on my token bill?',
    answer:
      'Section 234 of the Income Tax Ordinance, a federal tax your provincial excise office collects at the same time as the token. It is why a token bill is larger than the provincial rate table alone, and it doubles for someone off the Active Taxpayer List.',
  },
  {
    question: 'Is there a discount for paying early?',
    answer:
      'In Punjab, yes: 10% off the yearly token if the whole year is paid by 31 August. Not every province offers one, and a lifetime token is not discounted, because it is not a yearly charge.',
  },
  {
    question: 'What is a lifetime token?',
    answer:
      'A one-off payment that settles the provincial token for the life of the vehicle, offered for smaller cars in Punjab and Islamabad and at every engine size in Balochistan. The federal section 234 tax is still charged yearly on top of it.',
  },
  {
    question: 'Does being a filer reduce my token tax?',
    answer:
      'Only the federal half. The provincial token is the same whether you file or not; the section 234 tax collected with it doubles for a non-filer.',
  },
];

export const SECURITIES_GAINS_FAQS: Faq[] = [
  {
    question: 'How much is capital gains tax on shares in Pakistan?',
    answer:
      'For shares bought on or after 1 July 2024, a flat 15% for someone on the Active Taxpayer List, however long they were held. Shares bought earlier stay on the regime that applied when they were bought, which for the 2022 to 2024 period falls with the holding period and for anything before 1 July 2013 is nil.',
  },
  {
    question: 'Are shares I bought years ago exempt?',
    answer:
      'Shares acquired before 1 July 2013 are outside the charge entirely. Shares acquired between then and June 2022 are taxed at 12.5%. The date you bought is what governs, not the date you sold, which is why a calculator that applies today’s rate to an old holding invents a tax that does not exist.',
  },
  {
    question: 'Do I pay this myself?',
    answer:
      'Usually not directly. NCCPL computes and collects capital gains tax on listed securities, so it is deducted before the money reaches you and appears on your statement rather than as a bill.',
  },
  {
    question: 'What does a non-filer pay?',
    answer:
      'Double, on the older acquisition bands. On shares acquired from 1 July 2024 the position is different: a non-filer is charged at the ordinary slab rates with a floor of 15%, so the figure depends on their other income.',
  },
  {
    question: 'Can I set my losses against my gains?',
    answer:
      'Yes, within the same year and within the same class of securities, and NCCPL nets them in its own computation. This calculator works out a single disposal, so it will not reflect a loss you made elsewhere in the year.',
  },
];

export const MUTUAL_FUND_FAQS: Faq[] = [
  {
    question: 'How much tax do you pay on mutual funds in Pakistan?',
    answer:
      'For a person, 15% of the gain, whether it is a stock fund or any other fund, and how long you held the units does not change it. A company pays 15% on a stock fund and 25% on any other fund.',
  },
  {
    question: 'Who deducts it?',
    answer:
      'Your fund company, at the point you redeem. It withholds the tax and passes it to NCCPL, so what reaches your account is already net of it.',
  },
  {
    question: 'Does it matter how long I held the units?',
    answer:
      'For a person on units bought from 1 July 2025, no: one rate applies however long you held them. That is a simplification of an older regime where the rate varied.',
  },
  {
    question: 'What is a stock fund?',
    answer:
      'A fund classified as such under the collective investment scheme rules, broadly one investing predominantly in equities. Your account statement states which category your fund is in; this calculator cannot tell from the figures alone.',
  },
  {
    question: 'What about the dividends the fund paid me?',
    answer:
      'Those are taxed separately, under the rules for dividends, and are not part of the gain this calculates. A fund can therefore produce two different tax charges in the same year.',
  },
];

export const AGRICULTURE_FAQS: Faq[] = [
  {
    question: 'Who taxes agricultural income in Pakistan?',
    answer:
      'Your province, not FBR. Agriculture is a provincial subject under the Constitution, so each province charges it under its own Act and at its own rates, and it is separate from the federal income tax you pay on anything else.',
  },
  {
    question: 'What changed in 2025?',
    answer:
      'Sindh, Khyber Pakhtunkhwa and Balochistan each legislated to replace their older area-based regimes with an income-slab table aligned to the federal non-salaried rates, effective 1 January 2025. All three enacted the same figures, which is why the answer does not differ between them.',
  },
  {
    question: 'Why is there no figure for Punjab?',
    answer:
      'Because Punjab set its agricultural rates by notification rather than through the Assembly, and on 21 April 2026 the Assembly Speaker ruled those notifications void, holding that the Act requires rates to be laid before it. Punjab is also the only province whose agricultural rates sit in rules rather than in its Act. Printing a figure would mean handing you a number computed under a notification a legislature has declared void.',
  },
  {
    question: 'Does the per-acre land tax still exist?',
    answer:
      'It depends on the province, and this is the detail most summaries get wrong. Sindh repealed its old Ordinance outright, so only the income-based tax remains there. Khyber Pakhtunkhwa and Balochistan substituted their land tax schedules rather than deleting them, and in KP it operates as a floor: you pay the greater of the two, not the sum. Punjab keeps the greater-of rule as well.',
  },
  {
    question: 'Is agricultural income exempt from federal tax?',
    answer:
      'Agricultural income as defined in the Ordinance is exempt from federal income tax, which is what leaves room for the provinces to tax it. What counts as agricultural income is narrower than what happens on a farm, and processing or trading activity often falls outside it and back into the federal net.',
  },
  {
    question: 'Is there a super tax on agricultural income?',
    answer:
      'Each of the three provinces legislated one on very large agricultural incomes, and the thresholds have already moved: Sindh raised its exemption to Rs 500 million and cut its top rate in its 2026 Finance Act. This calculator does not include provincial super tax, because it is changing province by province.',
  },
];

export const ELECTRICITY_FAQS: Faq[] = [
  {
    question: 'Is there income tax on electricity bills in Pakistan?',
    answer:
      'On a home meter, only if you are not on the Active Taxpayer List and the monthly bill is Rs 25,000 or more, in which case 7.5% of the bill is added. A filer with a home meter pays nothing under section 235 at any bill. A shop, office or factory is charged on a band table regardless of filer status.',
  },
  {
    question: 'How much is the tax on a commercial electricity bill?',
    answer:
      'Nothing up to Rs 500. From Rs 501 to Rs 20,000 it is 10% of the bill. Above Rs 20,000 it is Rs 1,950 plus 12% of the part above Rs 20,000 for a commercial connection.',
  },
  {
    question: 'Does a factory pay the same as a shop?',
    answer:
      'Only up to Rs 20,000. Above that an industrial connection pays Rs 1,950 plus 5% of the excess, against 12% for a commercial one on the same bill, so the gap widens as the bill grows.',
  },
  {
    question: 'How do I stop this being added to my home bill?',
    answer:
      'File your return and get onto the Active Taxpayer List. A domestic consumer who is a filer is not charged under section 235 at all, whatever the bill.',
  },
  {
    question: 'Can I get it back?',
    answer:
      'It counts as income tax you have already paid for the year and is claimed on your return, with the certificate your electricity company can issue. Someone who never files never claims it.',
  },
];

export const TELECOM_FAQS: Faq[] = [
  {
    question: 'How much tax is on a mobile load in Pakistan?',
    answer:
      'Income tax takes 15% of what you load under section 236, so a Rs 1,000 load puts Rs 850 into your balance before your operator takes its own sales tax and charges. The rate is the same for everyone and does not depend on whether you file.',
  },
  {
    question: 'Is the tax added to my bill or taken out of my load?',
    answer:
      'It depends which it is, and the difference matters. On a prepaid load the tax comes out of the amount you hand over. On a postpaid mobile or internet bill it is added on top of what you owe. Same rate, opposite direction.',
  },
  {
    question: 'What about a landline bill?',
    answer:
      'A landline is charged 10%, and only on the amount above Rs 1,000. A bill of Rs 2,000 is charged on Rs 1,000 of it, not on the whole thing, and a bill at or below Rs 1,000 is not charged at all.',
  },
  {
    question: 'Do filers pay less on their phone bill?',
    answer:
      'No. Section 236 applies at the same rate whether or not you are on the Active Taxpayer List, which makes it unusual among the withholding taxes. The exception is a person named in an FBR order under section 114B for not filing, where the rate on a load rises steeply.',
  },
  {
    question: 'Is this the same as the sales tax on my bill?',
    answer:
      'No. Provincial sales tax on telecommunication services is charged separately and is a larger figure than this. What section 236 takes is income tax, which is adjustable against your yearly liability; the sales tax is not.',
  },
  {
    question: 'Can I claim it back?',
    answer:
      'It is adjustable against your income tax for the year, so it is claimed on your return like any other withholding. Most people never do, which is how a tax of a few rupees at a time adds up quietly over a year.',
  },
];
