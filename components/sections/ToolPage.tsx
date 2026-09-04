import Link from 'next/link';
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
import { JsonLd, breadcrumbSchema, faqSchema, webApplicationSchema } from '@/lib/jsonld';
import { TOOLS, toolHref, type Tool } from '@/content/tools';
import { TAX_YEAR } from '@/lib/tax/pakistan';
import type { Faq } from '@/content/types';

/**
 * The shared shell for every calculator page under /tools.
 *
 * ## Why this is one component and not ten pages
 *
 * /tools/salary-tax was written as a bespoke page while it was the only
 * calculator, and it still is one: it carries a slab table and a set of
 * sections nothing else needs. The ten that followed it do not differ in
 * structure at all. They differ in the calculator in the middle, the copy
 * around it and the questions underneath, and every one of those is data.
 *
 * Ten hand-written pages would drift. The disclaimer would be worded three
 * ways, one page would lose its breadcrumb, and the section that says what a
 * calculator cannot do (the most important section on any of them, and the
 * easiest to skip when copying a file) would go missing from the one page
 * where it mattered most. So the structure lives here and each page supplies
 * its tool, its calculator and its FAQs.
 *
 * ## The section order, and why the ask is last
 *
 * Tool, then limits, then FAQ, then one commercial ask. A visitor who gets
 * their number and leaves is a success, so the calculator is above the fold
 * and everything below it is reference material. The ask sits at the bottom
 * where someone who has read that far has shown they want more than a number.
 */

export interface ToolPageProps {
  tool: Tool;
  /** The calculator itself. A client component; everything around it is static. */
  children: React.ReactNode;
  faqs: Faq[];
  /** The eyebrow above the H1. Defaults to the tax year. */
  eyebrow?: string;
  /** Headline split for the limits section, so each page can name its own subject. */
  limitsHeading?: { lines: string[]; accent: string };
  /** The one commercial ask at the foot of the page. */
  cta: {
    heading: string;
    body: string;
    buttonLabel: string;
    buttonHref: string;
  };
  /** Two or three sibling calculators, for a reader whose question is next door. */
  related?: string[];
}

export function ToolPage({
  tool,
  children,
  faqs,
  eyebrow,
  limitsHeading = { lines: ['What this'], accent: 'does not do' },
  cta,
  related = [],
}: ToolPageProps) {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/tools' },
    { label: tool.navLabel, href: toolHref(tool) },
  ];

  const siblings = related
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter((t): t is Tool => Boolean(t));

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={webApplicationSchema({
          name: tool.title,
          description: tool.seo.description,
          path: toolHref(tool),
        })}
      />
      <JsonLd data={faqSchema(faqs)} />

      {/* ── 1. Hero and the calculator itself ─────────────────────────────
          The tool is the first thing on the page rather than the third. See
          the note in app/tools/salary-tax/page.tsx: a visitor who searched for
          a calculator should not scroll past prose to reach one. */}
      <section className="pb-4 pt-10 md:pt-14">
        <Container>
          <Breadcrumb items={crumbs} />

          <div className="mt-8 max-w-[62ch]">
            <Eyebrow>{eyebrow ?? TAX_YEAR.label}</Eyebrow>
            <h1 className="mt-3 font-display text-h1 text-ink">{tool.title}</h1>
            <Rule className="mt-6" />
            <p className="mt-6 text-body-lg text-ink-body">{tool.intro}</p>
          </div>

          <div className="mt-8 md:mt-12">{children}</div>
        </Container>
      </section>

      {/* ── 2. What it does not cover ─────────────────────────────────────
          Its own section rather than small print. The limits of an estimate
          are the part a reader most needs and least expects to be told. */}
      <Section band>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  eyebrow="Read this first"
                  lines={limitsHeading.lines}
                  accent={limitsHeading.accent}
                />
                <p className="mt-6 max-w-[40ch] text-[15px] leading-[1.65] text-ink-body">
                  It is accurate for what it models, and everything below changes the
                  answer. None of it can be handled by a form with a few fields in it.
                </p>
              </div>
            </Reveal>

            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {tool.limits.map((limit, i) => (
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

      {/* ── 3. FAQ ────────────────────────────────────────────────────────
          Carried into FAQPage schema above, so an answer can reach someone in
          a search result without them opening the page. That is a feature. */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <SectionHeading eyebrow="Questions" lines={['The questions']} accent="people ask" />
              </div>
            </Reveal>
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </Section>

      {/* ── 4. Where to go next ───────────────────────────────────────────
          Named siblings rather than the whole list: a reader on the wrong
          calculator wants the right one, not a directory. */}
      {siblings.length > 0 && (
        <Section band tight>
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Also here" lines={['Other calculators']} accent="for this" />
            </Reveal>
            <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {siblings.map((sibling, i) => (
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
      )}

      {/* ── 5. The ask, once, at the end ──────────────────────────────── */}
      <Section tight>
        <Container>
          <Reveal>
            <div className="u-tile flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
              <div>
                <Eyebrow>Next step</Eyebrow>
                <p className="mt-2 max-w-[46ch] font-display text-h3 text-ink">{cta.heading}</p>
                <p className="mt-3 max-w-[52ch] text-[14.5px] leading-[1.6] text-ink-body">
                  {cta.body}
                </p>
              </div>

              {/* `min-w-0` and the button's own `text-center` let a long label
                  wrap instead of forcing the column wider than the viewport.
                  "Talk to us about your company" overflowed a 320px screen by
                  6px without it, which is narrow enough to be invisible in
                  review and wide enough to make the whole page scroll
                  sideways. */}
              <div className="flex min-w-0 flex-col items-start gap-3 lg:flex-none lg:items-end">
                <Button href={cta.buttonHref} className="max-w-full text-center">
                  {cta.buttonLabel}
                </Button>
                <Link
                  href="/tools"
                  className="u-tap text-[13.5px] text-ink-body transition-colors hover:text-blue-600"
                >
                  All calculators
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
