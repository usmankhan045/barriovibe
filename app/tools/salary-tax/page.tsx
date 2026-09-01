import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Rule,
  Breadcrumb,
} from '@/components/primitives';
import { Icon } from '@/components/icons';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { FaqAccordion } from '@/components/sections/FaqList';
import { SalaryCalculator } from '@/components/sections/SalaryCalculator';
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  webApplicationSchema,
} from '@/lib/jsonld';
import { getService, serviceHref } from '@/content/services';
import { SALARY_TAX_FAQS, SALARY_TAX_TOOL } from '@/content/tools';
import { SLABS, TAX_YEAR, EXEMPT_THRESHOLD } from '@/lib/tax/pakistan';
import { pageMetadata } from '@/lib/seo';

/**
 * /tools/salary-tax: the Pakistan salary tax calculator.
 *
 * ## Why this is a page and not a section on a service page
 *
 * The service template (app/services/[category]/[service]/page.tsx) renders
 * the identical section order for all forty-four services, deliberately, so a
 * visitor comparing two of them finds the same information in the same place
 * both times. A calculator bolted onto one of them breaks that for the sake of
 * one page.
 *
 * It also wants a URL of its own. "Salary tax calculator Pakistan" is a search
 * with real volume and no commercial intent, made by people who are not
 * looking for an accountant yet. That is exactly the visitor a tool should
 * catch, and it needs a canonical URL, its own title and its own FAQ schema to
 * catch them. Buried in a service page it would have none of the three.
 *
 * `/tools/` rather than `/salary-tax-calculator` because this will not be the
 * only one: a sales tax and a gratuity calculator are the obvious next two,
 * and the segment means adding them is a directory rather than another
 * argument about site structure.
 *
 * ## The page's job after the answer
 *
 * A visitor who gets their number and leaves is a success. The page is built
 * that way: the calculator is above the fold, and everything below it is
 * reference material rather than a funnel. The one commercial ask sits at the
 * bottom, after the slab table and the FAQ, where someone who has read that
 * far has shown they want more than a number.
 */

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools/salary-tax' },
  { label: SALARY_TAX_TOOL.title, href: '/tools/salary-tax' },
];

export const metadata: Metadata = pageMetadata({
  title: SALARY_TAX_TOOL.seo.title,
  description: SALARY_TAX_TOOL.seo.description,
  path: '/tools/salary-tax',
});

/**
 * The slab table, rendered from the same array the calculator computes with.
 *
 * Not retyped as static copy, which is the point: a table on the page that
 * disagreed with the arithmetic behind it would be the most damaging kind of
 * error here, and deriving it from `SLABS` makes that impossible rather than
 * unlikely.
 */
function SlabTable() {
  const money = new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 });

  return (
    <div className="u-tile overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-[14px]">
          <caption className="sr-only">
            Income tax rates for salaried individuals, {TAX_YEAR.label}
          </caption>
          <thead>
            <tr className="border-b border-line text-[11.5px] uppercase tracking-[0.08em] text-ink-body">
              <th scope="col" className="px-6 py-4 font-bold">Annual taxable income</th>
              <th scope="col" className="px-6 py-4 text-right font-bold">Rate on the excess</th>
              <th scope="col" className="px-6 py-4 text-right font-bold">Tax at the floor</th>
            </tr>
          </thead>
          <tbody>
            {SLABS.map((slab, i) => {
              const from = i === 0 ? 0 : (SLABS[i - 1]!.upTo ?? 0);
              return (
                <tr key={from} className="border-b border-line last:border-0">
                  <td className="px-6 py-3.5 text-ink-strong">
                    {slab.upTo === null
                      ? `Above Rs ${money.format(from)}`
                      : i === 0
                        ? `Up to Rs ${money.format(slab.upTo)}`
                        : `Rs ${money.format(from + 1)} to Rs ${money.format(slab.upTo)}`}
                  </td>
                  <td className="px-6 py-3.5 text-right tabular-nums text-ink-body">
                    {slab.rate === 0 ? 'Nil' : `${(slab.rate * 100).toFixed(0)}%`}
                  </td>
                  <td className="px-6 py-3.5 text-right tabular-nums text-ink-body">
                    {slab.fixed === 0 ? '-' : `Rs ${money.format(slab.fixed)}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SalaryTaxPage() {
  const incomeTax = getService('income-tax-filing');

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={webApplicationSchema({
          name: SALARY_TAX_TOOL.title,
          description: SALARY_TAX_TOOL.seo.description,
          path: '/tools/salary-tax',
        })}
      />
      <JsonLd data={faqSchema(SALARY_TAX_FAQS)} />

      {/* ── 1. Hero and the calculator itself ─────────────────────────────
          The tool is the first thing on the page rather than the third. A
          visitor searching "salary tax calculator" has stated exactly what
          they want, and making them scroll past an introduction to reach it
          would be writing for the site rather than for them. */}
      <section className="relative pb-14 pt-10 md:pt-14">
        <Container>
          <Breadcrumb items={CRUMBS} />

          <div className="mt-8 max-w-[62ch]">
            <Eyebrow>Free tool</Eyebrow>
            <h1 className="mt-4 text-h1 text-ink">{SALARY_TAX_TOOL.title}</h1>
            <Rule className="mt-6" />
            <p className="mt-6 text-body-lg text-ink-body">{SALARY_TAX_TOOL.intro}</p>
          </div>

          {/* Tighter on a phone than the `mt-12` a section normally gets. The
              tool is what the page is; on a narrow screen every rem above it
              is a rem the visitor scrolls before they can use it. */}
          <div className="mt-8 md:mt-12">
            <SalaryCalculator />
          </div>
        </Container>
      </section>

      {/* ── 2. The slab table ─────────────────────────────────────────────
          The rates in full, because a visitor who wants to check the answer
          should not have to go to FBR's site to do it. Derived from the same
          array the calculator uses. */}
      <Section band>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={TAX_YEAR.label}
              lines={['The rates this']}
              accent="is calculated on"
            />
            <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.65] text-ink-body">
              Salaried individuals, {TAX_YEAR.period}. These are the rates in the First
              Schedule, Part I, Division I of the Income Tax Ordinance, 2001, as amended
              by the {TAX_YEAR.authority}. They apply where salary is more than 75% of
              your taxable income, which is the case for most employed people.
            </p>
          </Reveal>

          <Reveal index={1} className="mt-10">
            <SlabTable />
          </Reveal>

          <Reveal index={2}>
            <p className="mt-6 max-w-[62ch] text-[13.5px] leading-[1.6] text-ink-body">
              Two changes worth knowing: the 9% surcharge under section 4AB no longer
              applies to salary at all, and the threshold for the top 35% rate moved from
              Rs 4.1 million to Rs 7 million. Income up to Rs{' '}
              {new Intl.NumberFormat('en-PK').format(EXEMPT_THRESHOLD)} remains untaxed.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── 3. What it does not cover ─────────────────────────────────────
          Stated as its own section rather than as small print under the tool.
          The limits of an estimate are the part a reader most needs and least
          expects to be told, and a firm that files returns should be the one
          telling them. */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  eyebrow="Read this first"
                  lines={['What this']}
                  accent="does not do"
                />
                <p className="mt-6 max-w-[40ch] text-[15px] leading-[1.65] text-ink-body">
                  It is an estimate on salary income, and it is accurate for that. Every
                  situation below changes the answer, and none of them can be handled by a
                  form with eight fields in it.
                </p>
              </div>
            </Reveal>

            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {SALARY_TAX_TOOL.limits.map((limit, i) => (
                <Reveal key={limit} as="li" index={i} className="h-full">
                  <div className="u-tile flex h-full items-start gap-4 p-6">
                    <span
                      className="mt-0.5 grid size-6 flex-none place-items-center rounded-pill bg-blue-50 text-blue-600"
                      aria-hidden="true"
                    >
                      <Icon name="document" size={13} />
                    </span>
                    <span className="text-[14.5px] leading-[1.6] text-ink-strong">{limit}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── 4. FAQ ────────────────────────────────────────────────────────
          Written for the questions people actually arrive with, and carried
          into FAQPage schema above so they can be answered in a search result
          without the visitor reaching the page at all. That is a feature: a
          tool that answers the question is doing its job either way. */}
      <Section band>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <SectionHeading eyebrow="Questions" lines={['About salary tax']} accent="in Pakistan" />
              </div>
            </Reveal>
            <FaqAccordion faqs={SALARY_TAX_FAQS} />
          </div>
        </Container>
      </Section>

      {/* ── 5. The ask, once, at the end ──────────────────────────────── */}
      <Section tight>
        <Container>
          <Reveal>
            <div className="u-tile flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
              <div>
                <Eyebrow>Next step</Eyebrow>
                <p className="mt-2 max-w-[46ch] font-display text-h3 text-ink">
                  A number is not a filed return.
                </p>
                <p className="mt-3 max-w-[52ch] text-[14.5px] leading-[1.6] text-ink-body">
                  We file income tax returns through FBR IRIS for salaried individuals,
                  with a computation you can follow line by line. Individuals file by
                  30 September.
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 lg:flex-none lg:items-end">
                <Button href="/contact?service=income-tax-filing">Talk to us about filing</Button>
                {incomeTax && (
                  <Link
                    href={serviceHref(incomeTax)}
                    className="u-tap text-[13.5px] text-ink-body transition-colors hover:text-blue-600"
                  >
                    See the income tax service
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
