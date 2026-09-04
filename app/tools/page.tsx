import Link from 'next/link';
import {
  Container,
  Section,
  SectionHeading,
  Lead,
  Eyebrow,
  Breadcrumb,
  ChessArt,
  IconWatermark,
} from '@/components/primitives';
import { Icon } from '@/components/icons';
import { IconBadge } from '@/components/ui/IconBadge';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { JsonLd, breadcrumbSchema, itemListSchema } from '@/lib/jsonld';
import { TOOLS, TOOL_GROUPS, TOOLS_HUB, toolHref } from '@/content/tools';
import { pageMetadata } from '@/lib/seo';

/**
 * /tools: the hub over every calculator on the site.
 *
 * ## Why a hub and not a single tool page
 *
 * The salary calculator was the only tool for a while and lived at
 * /tools/salary-tax with no index above it, reachable from one footer link.
 * That works for one. It stops working at two, because the second tool needs
 * somewhere to be discovered and the footer is not it.
 *
 * So this page exists to be the thing the navbar's Tools item points at, and
 * the list it renders comes from `TOOLS` in content/tools.ts rather than from
 * the filesystem. A new calculator is one entry there plus its own route; it
 * then appears here, in the sitemap and in this page's ItemList schema with no
 * further edits.
 *
 * ## What this page deliberately does not do
 *
 * It does not sell. Someone who lands on a calculator index is looking for a
 * number, not an agency, and the same reasoning that keeps /tools/salary-tax
 * mostly reference material applies here: one ask, at the bottom, after the
 * grid. A visitor who uses a calculator and leaves is a success.
 */

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools' },
];

export const metadata = pageMetadata({
  title: TOOLS_HUB.seo.title,
  description: TOOLS_HUB.seo.description,
  path: '/tools',
});

export default function ToolsPage() {
  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd data={itemListSchema('Tools', TOOLS.map(toolHref))} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-20 pt-10 md:pt-14">
        <Container>
          <Breadcrumb items={CRUMBS} />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative z-10">
              <SectionHeading
                level={1}
                eyebrow={`${TOOLS.length} calculators, free to use`}
                lines={['Calculators that']}
                accent="show their working"
              />
              <Lead className="mt-7">{TOOLS_HUB.intro}</Lead>
            </div>

            <div className="relative hidden lg:block">
              <IconWatermark />
              <ChessArt name="formation" sizes="45vw" className="relative" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── The list, grouped ─────────────────────────────────────────────
          Grouped rather than run as one list of eleven. The groups are the
          question a visitor is actually answering when they arrive: am I
          employed, do I run a business, or is somebody deducting tax from me.
          Eleven undifferentiated cards make that question the reader's problem.

          The cards carry the short `navLabel` and `card` strings rather than
          each page's own H1 and intro: those are written to sit under a
          heading on the tool itself and read as repetition here. */}
      {TOOL_GROUPS.map((group, groupIndex) => (
        <Section key={group.slug} id={group.slug} band={groupIndex % 2 === 0} className="scroll-mt-28">
          <Container>
            <Reveal>
              <SectionHeading
                level={2}
                eyebrow={`${group.tools.length} ${group.tools.length === 1 ? 'calculator' : 'calculators'}`}
                lines={[group.title]}
                accent={group.accent}
              />
              <p className="mt-6 max-w-[64ch] text-body-lg text-ink-body">{group.blurb}</p>
            </Reveal>

            <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {group.tools.map((tool, i) => (
                <Reveal key={tool.slug} as="li" index={i} className="h-full">
                  <Link
                    href={toolHref(tool)}
                    className="u-tile u-tile-interactive group flex h-full flex-col p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <IconBadge icon={tool.icon} variant="chrome" />
                      <Icon
                        name="arrow-up-right"
                        size={18}
                        className="mt-1 flex-none text-ink-body transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"
                      />
                    </div>

                    <h3 className="mt-6 font-display text-h3 text-ink transition-colors group-hover:text-blue-600">
                      {tool.navLabel}
                    </h3>
                    <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-ink-body">
                      {tool.card}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ))}

      {/* ── The ask, once, at the end ─────────────────────────────────── */}
      <Section tight>
        <Container>
          <Reveal>
            <div className="u-tile flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
              <div>
                <Eyebrow>Next step</Eyebrow>
                <p className="mt-2 max-w-[46ch] font-display text-h3 text-ink">
                  An estimate is not a filed return.
                </p>
                <p className="mt-3 max-w-[52ch] text-[14.5px] leading-[1.6] text-ink-body">
                  These tools answer one question each. When the answer raises another
                  one, we do the accounting, tax and compliance work behind them.
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 lg:flex-none lg:items-end">
                <Button href="/contact">Talk to us</Button>
                <Link
                  href="/services"
                  className="u-tap text-[13.5px] text-ink-body transition-colors hover:text-blue-600"
                >
                  See all services
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
