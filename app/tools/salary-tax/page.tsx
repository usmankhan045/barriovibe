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
import { RateProvenance } from '@/components/sections/RateProvenance';
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  organizationRef,
  webApplicationSchema,
} from '@/lib/jsonld';
import { getService, serviceHref } from '@/content/services';
import {
  SALARY_TAX_FAQS,
  SALARY_TAX_TOOL,
  TOOLS,
  toolHref,
  type Tool,
} from '@/content/tools';
import { SLABS, TAX_YEAR, EXEMPT_THRESHOLD } from '@/lib/tax/pakistan';
import { toolMetadata } from '@/lib/seo';

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

// "Tools" pointed at this page's own URL while it was the only tool and there
// was no index above it. It points at the hub now, so the crumb is a route out
// rather than a link back to the page you are on.
const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools' },
  { label: SALARY_TAX_TOOL.navLabel, href: toolHref(SALARY_TAX_TOOL) },
];

/**
 * The three calculators a reader on this page is most likely to want next.
 *
 * Chosen rather than listed: someone who has just worked out this month's tax
 * is usually asking one of three follow-up questions. What would a raise leave
 * me with (increment), what gross do I need to hit a take-home figure
 * (reverse), and how do two offers actually compare (job offer). Resolved from
 * TOOLS by slug so a rename cannot leave a dead link behind.
 */
const RELATED_TOOLS = ['salary-increment', 'reverse-salary', 'job-offer-comparison']
  .map((slug) => TOOLS.find((t) => t.slug === slug))
  .filter((t): t is Tool => Boolean(t));

export const metadata: Metadata = toolMetadata({
  title: SALARY_TAX_TOOL.seo.title,
  description: SALARY_TAX_TOOL.seo.description,
  path: toolHref(SALARY_TAX_TOOL),
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
      {/* The node this page's WebApplication provider points at. */}
      <JsonLd data={organizationRef()} />
      <JsonLd
        data={webApplicationSchema({
          name: SALARY_TAX_TOOL.title,
          description: SALARY_TAX_TOOL.seo.description,
          path: toolHref(SALARY_TAX_TOOL),
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

          {/* Same block, same position as every tool built on ToolPage. This
              page predates that template and has to opt in by hand. */}
          <RateProvenance />
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

      {/* ── 5. Where to go next ───────────────────────────────────────────
          Every other calculator carries this block from ToolPage; this page,
          written before that template existed, was the only one of the
          twenty-two without it. That made the site's most-visited entry point
          its only dead end: a reader arriving here on the wrong calculator was
          offered the hub or nothing, and the link equity that should have
          spread across the salary cluster stopped at this page. */}
      <Section band tight>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Also here" lines={['Other calculators']} accent="for this" />
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {RELATED_TOOLS.map((sibling, i) => (
              <Reveal key={sibling.slug} as="li" index={i} className="h-full">
                <Link
                  href={toolHref(sibling)}
                  className="u-tile u-tile-interactive group flex h-full flex-col p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-h3 text-ink transition-colors group-hover:text-blue-600">
                      {sibling.navLabel}
                    </h3>
                    <Icon
                      name="arrow-up-right"
                      size={18}
                      className="mt-1 flex-none text-ink-body transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"
                    />
                  </div>
                  <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-ink-body">
                    {sibling.card}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── 6. The ask, once, at the end ──────────────────────────────── */}
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
