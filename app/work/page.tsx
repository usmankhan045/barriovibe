import {
  Container,
  Section,
  SectionHeading,
  Lead,
  Breadcrumb,
  ChessArt,
  IconWatermark,
} from '@/components/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { WorkFilter } from '@/components/ui/WorkFilter';
import { JsonLd, breadcrumbSchema } from '@/lib/jsonld';
import { BUILDS, BUILDS_ENABLED, BUILD_GROUPS, CATEGORY_BY_SLUG, buildHref } from '@/content/builds';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Work',
  description:
    'Projects across software and AI, marketing and e-commerce, and corporate and advisory. What each one was, how it was built, and what it runs on.',
  path: '/work',
});

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
];

/**
 * The work page.
 *
 * ── A PORTFOLIO THAT GROWS, not a page with two things on it ──
 *
 * Everything here is built to survive the fiftieth project as well as the
 * second, because the previous version could not:
 *
 * 1. CATEGORIES, not one list. Work spans three practices, and a visitor who
 *    came about a Shopify build should not scroll past an AI agent to find it.
 *    The groups derive from each project's existing `pillar`, so adding a
 *    project files itself.
 *
 * 2. A FILTER, not stacked sections. Three grids stacked means the page grows
 *    with every project. Tabs swap the grid in place, so it stays one screen
 *    of chrome however long the list gets.
 *
 * 3. SMALL CARDS, three across. The two-card version gave each project a
 *    half-width tile with a stat row and an icon badge, which stops working at
 *    three projects and is absurd at twelve. A card carries a name, a line and
 *    a category now; the detail is on the project's own page, where someone
 *    who is actually interested will read it.
 *
 * ── The heading ──
 *
 * It said "Software we built and run ourselves", which was wrong twice over:
 * the work is not all software, and "run ourselves" describes our own products
 * rather than a project delivered for a client. It also told the visitor what
 * WE do instead of what is on the page. "Things we have built" is what a
 * portfolio is, and it stays true whatever lands here next.
 */
export default function WorkPage() {
  const hasBuilds = BUILDS_ENABLED && BUILDS.length > 0;

  /* Reduced to the strings a card renders before it crosses into the client
     component. Every project's body copy, capabilities, limits and page block
     stay on the server. */
  const toCard = (build: (typeof BUILDS)[number]) => ({
    slug: build.slug,
    name: build.name,
    tagline: build.tagline,
    category: CATEGORY_BY_SLUG[build.category].cardLabel,
    href: buildHref(build.slug),
    repo: build.repo,
  });

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />

      <Section tight>
        <Container>
          <Breadcrumb items={CRUMBS} />

          {/* The site's hero pattern: copy left, chess art right.

              The art was dropped when this page was rewritten, on the
              reasoning that a portfolio's own work should fill that space.
              That was wrong: every hero on the site carries one, and a single
              page without it reads as unfinished rather than as restraint.
              `victory` is the piece /work has always used, and the one the
              subject actually fits.

              The heading is two lines, not three. It used to read "Things we /
              have / built." stacked down the left, which put the accent word
              alone on its own line. */}
          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                level={1}
                eyebrow="Our work"
                lines={['Things we']}
                accent="have built"
              />
              <Lead className="mt-7 max-w-[52ch]">
                Products we own, systems we run and work delivered for clients. Every
                one has a page: what it was for, how it was built, and what it does
                not do.
              </Lead>
            </div>

            <div className="relative hidden lg:block">
              <IconWatermark />
              <ChessArt name="victory" sizes="45vw" className="relative" />
            </div>
          </div>
        </Container>
      </Section>

      {hasBuilds && (
        <Section tight className="pt-0">
          <Container>
            <Reveal>
              <WorkFilter
                all={BUILDS.map(toCard)}
                groups={BUILD_GROUPS.map((group) => ({
                  slug: group.category.slug,
                  label: group.category.label,
                  projects: group.builds.map(toCard),
                }))}
              />
            </Reveal>

            {/* The client-work note. One line, because it describes something
                that is NOT on the page, and an absence does not get a card. */}
            <Reveal>
              <div className="mt-14 flex flex-col gap-5 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
                <p className="max-w-[74ch] text-[14px] leading-[1.65] text-ink-body">
                  <span className="font-semibold text-ink-strong">
                    Client work is published only with permission.
                  </span>{' '}
                  Where a project was delivered under NDA it is described without naming
                  the client, and every figure we quote can be evidenced from an account
                  we actually ran. We will put you in touch with references on request.
                </p>
                <Button href="/contact" variant="chrome" className="flex-none">
                  Ask for references
                </Button>
              </div>
            </Reveal>
          </Container>
        </Section>
      )}
    </main>
  );
}
