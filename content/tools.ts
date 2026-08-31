import type { Faq } from './types';

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
  title: string;
  /** Two or three sentences under the H1. */
  intro: string;
  /** What the tool cannot answer. Rendered as its own section, not small print. */
  limits: string[];
  seo: { title: string; description: string };
}

export const SALARY_TAX_TOOL: Tool = {
  title: 'Pakistan Salary Tax Calculator',
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
