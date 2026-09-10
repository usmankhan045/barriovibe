import type { Guide } from './types';
import { SLABS, TAX_YEAR } from '@/lib/tax/pakistan';

/**
 * Cluster 9: salary and the slabs.
 *
 * The weakest page one measured anywhere in this project. Facebook ranks for
 * "pakistan salary tax slabs", alongside two consultant blogs, on a query with
 * real commercial intent.
 *
 * ── Why the slab table is not written out here ──
 *
 * It is interpolated from lib/tax/pakistan.ts at render time. That module is
 * reconciled against the First Schedule and against hand-computed cases by
 * `pnpm check:tax` on every build, across all fifteen salary tax years. So the
 * table on this page cannot drift from the calculator it links to, and the
 * next Finance Act moves both together or fails the build.
 *
 * The figures were separately confirmed against FBR Circular No. 02 of
 * 2026-27 para 7: all eight bands match, rate and fixed amount.
 */

const money = new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 });

/** The slab table, built from the same array the calculators compute with. */
function slabRows(): string[][] {
  return SLABS.map((slab, i) => {
    const from = i === 0 ? 0 : (SLABS[i - 1]!.upTo ?? 0);
    const band =
      slab.upTo === null
        ? `Above Rs ${money.format(from)}`
        : i === 0
          ? `Up to Rs ${money.format(slab.upTo)}`
          : `Rs ${money.format(from + 1)} to Rs ${money.format(slab.upTo)}`;
    const rate = slab.rate === 0 ? 'Nil' : `${(slab.rate * 100).toFixed(0)}%`;
    const fixed = slab.fixed === 0 ? '-' : `Rs ${money.format(slab.fixed)}`;
    return [band, rate, fixed];
  });
}

const SALARY_TAX: Guide = {
  slug: 'salary-tax-slabs',
  cluster: 'salary',
  title: `Salary Tax Slabs in Pakistan for ${TAX_YEAR.label}`,
  navLabel: 'Salary tax slabs',
  card: 'The eight bands for this tax year, the surcharge that was withdrawn, and why a business owner on the same income pays far more.',

  answer: `Salary is taxed on eight bands running from nil below Rs 600,000 to 35% above Rs 7 million. The nine percent surcharge that applied to salaried people above Rs 10 million taxable income was withdrawn by the Finance Act 2026, so the top marginal rate for ${TAX_YEAR.label.toLowerCase()} is a clean 35%. Your employer deducts monthly at your average rate for the year.`,

  sections: [
    {
      kind: 'table',
      heading: `The bands for ${TAX_YEAR.label.toLowerCase()}`,
      intro:
        'Rendered from the same module the salary calculator computes with, so the table and the tool cannot disagree. "Tax at the floor" is the cumulative amount owed at the bottom of the band, before the rate applies to anything above it.',
      columns: ['Annual taxable income', 'Rate on the excess', 'Tax at the floor'],
      rows: slabRows(),
    },

    {
      kind: 'calculator',
      toolSlug: 'salary-tax',
      heading: 'What it comes to on your salary',
      body: 'Enter a monthly or annual figure. The calculator shows the working slab by slab, so you can check it against the table above rather than take it on trust.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The nine percent surcharge is gone for salaried people',
      body: 'This is the most consequential thing to get right this year, and the sources contradict each other because each is describing a different year. The Finance Act 2024 inserted section 4AB at ten percent where taxable income exceeded Rs 10 million. The Finance Act 2025 reduced it to nine percent for salaried persons. The Finance Act 2026 withdrew it for salaried persons entirely, while leaving the ten percent in place for other individuals and associations of persons. If a page tells you your top effective rate is 38.15%, it has not been updated since last year.',
    },

    {
      kind: 'prose',
      heading: 'What changed this year',
      body: [
        'Two genuinely new intermediate bands appeared, at 29% and 32%, taking the table from six bands to eight. The effect is to soften the jump that used to happen between the middle and the top of the scale.',
        'The threshold for the top 35% rate moved from Rs 4.1 million to Rs 7 million. Together with the withdrawal of the surcharge, a salaried person on a high income pays materially less than they did last year, which is unusual enough to be worth stating plainly.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Are you actually on this table?',
      body: 'The salaried rates apply only where salary exceeds seventy-five percent of your taxable income. Below that, the non-salaried table applies to everything. There is a separate fifty percent test that decides which return form FBR offers you, and the two get conflated constantly: seventy-five percent decides the rate table, fifty percent decides the form.',
    },

    {
      kind: 'table',
      heading: 'The same income, taxed two ways',
      intro:
        'The gap between employment and self-employment widened this year, because salaried rates fell and the business table did not move at all. These are the figures on identical taxable income.',
      columns: ['Taxable income', 'As salary', 'As business income'],
      rows: [
        ['Rs 1,200,000', 'Rs 6,000', 'Rs 90,000'],
        ['Rs 2,200,000', 'Rs 116,000', 'Rs 350,000'],
        ['Rs 3,200,000', 'Rs 316,000', 'Rs 650,000'],
        ['Rs 5,600,000', 'Rs 976,000', 'Rs 1,610,000'],
      ],
    },

    {
      kind: 'prose',
      heading: 'Why the difference is so large at the bottom',
      body: [
        'At the first taxable band the salaried rate is one percent and the business rate is fifteen. On the first Rs 600,000 of taxable income above the exemption, an employee pays Rs 6,000 and a sole trader pays Rs 90,000 on the same money.',
        'That is not an argument for anything, and it is certainly not an argument for mischaracterising freelance income as salary. It is a reason to know which table applies to you before you plan around a number you read somewhere.',
      ],
    },

    {
      kind: 'prose',
      heading: 'How your employer works out the monthly deduction',
      body: [
        'Under section 149 an employer deducts at your average rate of tax for the year, computed on estimated salary income, rather than applying the top band to each month. That is why the monthly figure on a payslip rarely matches a naive slab calculation.',
        'The employer is also required to adjust for tax already withheld under other heads and for credits admissible under sections 61 and 63, but only on being given documentary evidence. If you contribute to an approved pension fund or make eligible donations and never hand payroll the paperwork, the benefit does not disappear, it simply waits until you file and claim it in the return.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Two reliefs that no longer exist',
      body: 'Section 60C, the deductible allowance for profit on debt on a house loan, and section 62A, the tax credit for health insurance, were both omitted by the Finance Act 2022. Both still appear on ranking pages as live reliefs. Section 60D, the education expenses allowance, does survive, but only where taxable income is below Rs 1.5 million.',
    },

    {
      kind: 'list',
      heading: 'What a salaried person can still claim',
      intro: 'Fewer than most guides suggest, and worth knowing precisely.',
      items: [
        'Section 63, contributions to an approved pension fund. The credit is calculated on the lesser of the contribution or twenty percent of taxable income, with an enhanced allowance for people who joined after age forty.',
        'Section 61, charitable donations to eligible recipients including boards of education, universities, government-run institutions and listed non-profits.',
        'Section 60D, education expenses, only where taxable income is below Rs 1.5 million, capped at the lesser of five percent of tuition paid, twenty-five percent of taxable income, or Rs 60,000 per child.',
        'Zakat deducted at source under the Zakat and Ushr Ordinance.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Checking your payslip against the table',
      body: [
        'Take your annual gross, subtract anything genuinely exempt, and read the band. Divide the resulting figure by twelve and compare it with what payroll is deducting. A small difference is normal, because the average-rate method smooths the year.',
        'A large difference is worth a question, and there is one specific reason it might arise this year: any payroll still deducting the nine percent surcharge from a salaried employee is over-deducting, because that surcharge was withdrawn. You would get it back on filing, but you would have lent it to the government for a year first.',
      ],
    },
  ],

  faqs: [
    {
      question: `What are the salary tax slabs in Pakistan for ${TAX_YEAR.label.toLowerCase()}?`,
      answer:
        'Eight bands. Nothing up to Rs 600,000, then 1% to Rs 1.2 million, 11% to Rs 2.2 million, 20% to Rs 3.2 million, 25% to Rs 4.1 million, 29% to Rs 5.6 million, 32% to Rs 7 million, and 35% above that. Each band applies only to the amount above its floor, with a fixed cumulative figure carried forward.',
    },
    {
      question: 'Is there still a surcharge on high salaries in Pakistan?',
      answer:
        'Not for salaried people. Section 4AB was inserted at ten percent by the Finance Act 2024, reduced to nine percent for salaried persons by the Finance Act 2025, and withdrawn for salaried persons entirely by the Finance Act 2026. Ten percent still applies to other individuals and associations of persons above Rs 10 million taxable income.',
    },
    {
      question: 'What is the highest rate of income tax on salary in Pakistan?',
      answer:
        '35%, on taxable income above Rs 7 million. With the surcharge withdrawn, that is also the top effective marginal rate. Last year the same person faced 35% plus a nine percent surcharge on the tax.',
    },
    {
      question: 'At what salary do I start paying income tax in Pakistan?',
      answer:
        'Above Rs 600,000 of annual taxable income, which is Rs 50,000 a month. The first band above that is charged at one percent of the excess, so tax rises very gradually at first.',
    },
    {
      question: 'Do the salaried slabs apply if I also have freelance income?',
      answer:
        'Only if salary exceeds seventy-five percent of your taxable income. Below that threshold the non-salaried table applies, and its rates are considerably higher at every band.',
    },
    {
      question: 'Why is the tax on my payslip different from the slab calculation?',
      answer:
        'Because section 149 requires your employer to deduct at your average rate of tax for the year on estimated salary income, not to apply the top band to each month. The employer should also adjust for credits under sections 61 and 63, but only if you have given them documentary evidence.',
    },
    {
      question: 'Can I still claim tax relief on a house loan in Pakistan?',
      answer:
        'No. Section 60C, the deductible allowance for profit on debt, was omitted by the Finance Act 2022, as was section 62A for health insurance. Pages listing either as available are out of date.',
    },
    {
      question: 'Why does a business owner pay more tax than a salaried person on the same income?',
      answer:
        'Because they are different tables. Division I of the First Schedule sets one rate table for salaried individuals and another for everyone else, and the Finance Act 2026 reduced the salaried rates while leaving the business rates unchanged. On Rs 5.6 million the figures are Rs 976,000 and Rs 1,610,000.',
    },
  ],

  publishedAt: '2026-09-15T03:00:00Z',
  related: ['filer-vs-non-filer', 'tax-on-pension'],

  seo: {
    title: `Salary Tax Slabs in Pakistan ${TAX_YEAR.searchLabel}`,
    description: `The eight salary tax bands for ${TAX_YEAR.label.toLowerCase()}, the section 4AB surcharge withdrawn by the Finance Act 2026, and why business income on the same figure is taxed far more heavily.`,
  },
};

export const SALARY_GUIDES: Guide[] = [SALARY_TAX];
