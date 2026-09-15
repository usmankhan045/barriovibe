import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Container,
  Section,
  SectionHeading,
  Lead,
  Chip,
  Breadcrumb,
} from '@/components/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { FlowCanvas } from '@/components/ui/FlowCanvas';
import {
  JsonLd,
  breadcrumbSchema,
  mobileAppSchema,
  organizationRef,
} from '@/lib/jsonld';
import { BUILD_BY_SLUG, BUILD_PAGES, buildHref, CATEGORY_BY_SLUG } from '@/content/builds';
import { pageMetadata } from '@/lib/seo';

/**
 * The page a build gets when the /work card cannot hold everything.
 *
 * One prerendered page per build carrying a `page` block, which today is
 * nothungry alone. The /work card is still the complete summary; this is the
 * detail behind it, ordered the way a technical buyer evaluates: what it is,
 * what it does, the decisions behind it, the specification, and what that
 * demonstrates we could do for them.
 *
 * `dynamicParams` is false so a slug without a `page` block 404s rather than
 * rendering an empty shell.
 */
export function generateStaticParams() {
  return BUILD_PAGES.map((build) => ({ build: build.slug }));
}

export const dynamicParams = false;

type Params = Promise<{ build: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { build: slug } = await params;
  const page = BUILD_BY_SLUG[slug]?.page;
  if (!page) return {};

  return pageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: buildHref(slug),
  });
}

export default async function BuildPage({ params }: { params: Params }) {
  const { build: slug } = await params;
  const build = BUILD_BY_SLUG[slug];
  const page = build?.page;
  if (!build || !page) notFound();

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: build.name, href: buildHref(build.slug) },
  ];

  const storeLinks = page.store?.live ? page.store : undefined;

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={organizationRef()} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {/* Only where the build actually is an installable app. A server-side
          automation gets no application schema at all rather than a borrowed
          one. See `schemaType` in content/builds.ts. */}
      {page.schemaType === 'mobile-app' && (
        <JsonLd
          data={mobileAppSchema({
            name: build.name,
            description: page.seo.description,
            path: buildHref(build.slug),
            platforms: page.platforms,
          })}
        />
      )}

      {/* ── 1. Hero ───────────────────────────────────────────────────── */}
      <Section tight>
        <Container>
          <Breadcrumb items={crumbs} />

          <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                level={1}
                eyebrow={CATEGORY_BY_SLUG[build.category].cardLabel}
                lines={page.headline.lines}
                accent={page.headline.accent}
              />
              <Lead className="mt-7 max-w-[56ch]">{page.intro}</Lead>

              <ul className="mt-7 flex flex-wrap gap-2">
                {page.platforms.map((platform) => (
                  <li key={platform}>
                    <Chip variant="blue">{platform}</Chip>
                  </li>
                ))}
              </ul>

              {storeLinks && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {storeLinks.appStore && (
                    <Button href={storeLinks.appStore}>Get it on the App Store</Button>
                  )}
                  {storeLinks.playStore && (
                    <Button href={storeLinks.playStore} variant="chrome">
                      Get it on Google Play
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* The product card, stripped to name and line.

                It carried an icon badge and two stat figures. Both are gone:
                the badge was decoration standing in for a product mark we do
                not have, and the figures repeated what the page says properly
                further down while inviting a reader to weigh a project by its
                line count. A name and a sentence is what this block is for. */}
            <Reveal>
              {/* Each panel is its own one-card row: nothing sits beside it to
                  carry the flow on to, so it is the whole stream. */}
              <div
                data-flow-host=""
                className="u-surface-btn relative isolate flex flex-col justify-center overflow-hidden p-9 md:p-10"
              >
                <FlowCanvas row="build-hero" className="-z-10" />
                <span className="font-display text-[11px] font-bold uppercase tracking-[0.15em] text-blue-200">
                  {CATEGORY_BY_SLUG[build.category].cardLabel}
                </span>
                {/* `text-h2`, not `text-h1`. The hero scale was chosen when
                    the only names here were "nothungry" and "LinkedIn FTE",
                    where one or two words at display size reads as a product
                    mark. A forty-character name at that size wraps to three
                    lines and turns the card into a poster. */}
                <p className="mt-4 font-display text-h2 leading-[1.1] text-white">{build.name}</p>
                <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.6] text-blue-100">
                  {build.tagline}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── 2. What it does ───────────────────────────────────────────── */}
      {/* `tight` on every section of this page, not the default rhythm.

          --section-y resolves to 128px top and bottom at a desktop width, so
          five default sections put 256px of empty page between each block of
          content. That rhythm is right for the marketing pages, where a
          section is a whole argument; here a section is a grid of eight short
          cards, and the gaps were larger than the things they separated.
          --section-y-tight is 80px at the same width, which still reads as a
          break without the page becoming mostly background. */}
      <Section tight>
        <Container>
          <Reveal>
            {/* "it", not "the app": this route serves an installable app and
                a server-side automation, and only one of them is an app. */}
            <SectionHeading
              eyebrow="The product"
              lines={['What it', 'actually']}
              accent="does"
            />
          </Reveal>

          {/* WHITE CARDS WITH A BLUE RULE, not glass.

              `u-bento-card` was wrong here twice over. It is a liquid-glass
              surface built to sit on the grey band of the home page, where the
              tint in its fill reads as material; on a white section it flattens
              into a pale lavender rectangle with no edge, which is exactly how
              a grid of eight of them looked. And a card carrying one heading
              and one paragraph does not need a material at all.

              So: white, one hairline, and the brand blue as a rule down the
              left. It is the same treatment as the limits list further down,
              which is the cleanest block on the page, and it gives the grid the
              definition the glass never did. The rule thickens on hover, which
              is the whole interaction: no lift, no sweep, nothing that moves
              text the eye is reading.

              The number goes inline with the heading rather than on its own
              line above it. Eight cards, each with a numeral floating over a
              heading, was three stacked rows of type before a single word of
              content. */}
          <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {build.capabilities.map((capability, i) => (
              <Reveal key={capability.title} index={i}>
                <div className="group flex h-full flex-col rounded-tile border border-line bg-white p-6 shadow-[inset_3px_0_0_0_var(--color-blue-600)] transition-shadow duration-200 hover:shadow-[inset_5px_0_0_0_var(--color-blue-600)]">
                  <h2 className="flex items-baseline gap-2.5 font-display text-[17px] font-bold leading-[1.3] text-ink">
                    <span className="tabular text-[12px] font-bold text-blue-600/50" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {capability.title}
                  </h2>
                  <p className="mt-2.5 text-[14px] leading-[1.6] text-ink-body">
                    {capability.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 3. What it means for your build ───────────────────────────
          This was "The decisions we would make again": offline sync,
          credential handling, error types. Genuinely good engineering, and
          the wrong section for this page. Someone on a portfolio is asking
          whether we can build their thing and what working with us is like.
          They are not auditing our error handling.

          So each decision is restated as the thing a client actually weighs,
          and the section runs straight into the CTA below it. The decisions
          themselves stay in content/builds.ts for the technical buyer who
          asks, which is a conversation, not a web page. */}
      <Section band tight>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Working with us"
              lines={['What this means']}
              accent="for your build"
            />
          </Reveal>

          <ul className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2">
            {page.means.map((item, i) => (
              <Reveal key={item.title} as="li" index={i} className="h-full">
                <div className="flex h-full flex-col rounded-tile border border-line bg-white p-6 shadow-[inset_3px_0_0_0_var(--color-blue-600)] md:p-7">
                  <h2 className="font-display text-[17px] font-bold leading-[1.3] text-ink">
                    {item.title}
                  </h2>
                  <p className="mt-2.5 text-[14px] leading-[1.6] text-ink-body">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── 4. The close ──────────────────────────────────────────────────
          Two sections used to sit here: a "where the limits are" list and a
          "what this build proves" panel. Both are gone on the owner's
          instruction, and both were the same mistake in different clothes:
          a page about a product ending in two more blocks of prose about the
          product. The limits belonged to a longer, more technical page than
          this one now is, and the proves list restated what the capabilities
          and decisions above had already shown.

          What replaces them is one line and the two buttons it was all
          leading to. A visitor who has read this far has the answer; the page
          should ask for the conversation rather than keep talking.

          ── The line is a QUESTION, and it belongs to this build ──

          It read "We can build one for you", which is what every agency site
          says at the bottom of every page, so a reader skips it the way they
          skip a footer. The copy now comes from `page.close` in
          content/builds.ts and names what this particular build actually was:
          the nutrition app asks whether you have something like it in your
          head, the automation asks what job you are still doing by hand.

          A question also does the work a statement cannot. "We can build one"
          asks the reader to agree with us; "what are you still doing by hand"
          asks them to think of their own answer, and a reader holding their
          own answer is the one who gets in touch. */}
      <Section tight>
        <Container>
          <Reveal>
            {/* Centred, and sized to the words rather than to the container.

                It was `text-h1` in a `p-14` box, which made the last thing on
                the page the biggest thing on it: the question filled two lines
                at hero scale and the card ran most of a screen tall. A close
                should be the firmest note, not the loudest.

                One button, too. The two service links beside it were three
                choices at the exact moment the page wants one, and the reader
                who wants a service page has the whole nav for it. */}
            {/* A ROW, not a centred column.

                Centred text in a full-width card meant a 44ch measure floating
                in the middle with two large empty flanks, which is the same
                emptiness the rest of the page had. Copy on the left and the
                button on the right uses the width the card already occupies,
                so the card gets shorter AND stops looking half-used. */}
            <div
              data-flow-host=""
              className="u-surface-btn relative isolate flex flex-col items-start gap-7 overflow-hidden px-8 py-8 md:flex-row md:items-center md:justify-between md:gap-12 md:px-11 md:py-9"
            >
              <FlowCanvas row="build-close" className="-z-10" />
              <div className="relative max-w-[52ch]">
                <span className="font-display text-[11px] font-bold uppercase tracking-[0.15em] text-blue-200">
                  Start a project
                </span>
                <h2 className="mt-2.5 font-display text-h3 leading-[1.15] text-white">
                  {page.close.line}
                </h2>
                <p className="mt-2.5 text-[14.5px] leading-[1.55] text-blue-100">
                  {page.close.sub}
                </p>
              </div>

              <div className="flex-none">
                <Button href="/contact" variant="chrome">
                  Start a project
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
