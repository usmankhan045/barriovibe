import Link from "next/link";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Rule,
  Breadcrumb,
} from "@/components/primitives";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/sections/FaqList";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { RateProvenance } from "@/components/sections/RateProvenance";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  guideSchema,
  howToSchema,
  organizationRef,
} from "@/lib/jsonld";
import {
  CLUSTER_BY_SLUG,
  PUBLISHED_GUIDES,
  clusterHref,
  guideHref,
  type Guide,
  type GuideSection,
} from "@/content/guides";

/**
 * The shared shell for every guide under `/guides`.
 *
 * One component for the same reason ToolPage is one component: fifty-four
 * hand-written pages drift, and the section that limits the answer is the
 * easiest to drop when copying a file and the most important to keep.
 *
 * ## The order, and why the answer comes first
 *
 * Answer, working, limits, FAQ, siblings, one ask. Someone who reads the first
 * paragraph and closes the tab should already have what they came for; a guide
 * that makes them scroll past a preamble to reach the answer is written for the
 * site rather than for them. Everything below the answer is there to be checked
 * rather than read in order.
 *
 * ## Why the sections are a closed set
 *
 * `GuideSection` has six kinds and no freeform markdown. That is a deliberate
 * constraint: it means a heading level, a schema treatment or a spacing change
 * lands on all fifty-four guides at once, and it means the fortieth guide
 * cannot quietly become a different design than the first.
 */

export function GuidePage({ guide }: { guide: Guide }) {
  const cluster = CLUSTER_BY_SLUG[guide.cluster];
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: cluster.title, href: clusterHref(guide.cluster) },
    { label: guide.navLabel, href: guideHref(guide) },
  ];

  const siblings = (guide.related ?? [])
    .map((slug) => PUBLISHED_GUIDES.find((g) => g.slug === slug))
    .filter((g): g is Guide => Boolean(g));

  /* The first steps block, if the guide has one. Used for HowTo schema only:
     the visible rendering is unchanged and happens in GuideBlock. */
  const stepsSection = guide.sections.find(
    (s): s is Extract<GuideSection, { kind: "steps" }> => s.kind === "steps",
  );

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {/* The node this page's author and publisher references point at. */}
      <JsonLd data={organizationRef()} />
      <JsonLd
        data={guideSchema({
          title: guide.title,
          description: guide.seo.description,
          path: guideHref(guide),
          cluster: cluster.title,
          publishedAt: guide.publishedAt,
        })}
      />
      {/* A procedure, where the guide has one. Emitted as a sibling of the
          Article rather than as the page's primary type: this is a reference
          guide containing a procedure, not a procedure with prose attached. */}
      {stepsSection && (
        <JsonLd
          data={howToSchema({
            name: stepsSection.heading,
            description: stepsSection.intro ?? guide.answer,
            path: guideHref(guide),
            steps: stepsSection.steps,
          })}
        />
      )}
      <JsonLd data={faqSchema(guide.faqs)} />

      {/* ── 1. The answer ─────────────────────────────────────────────────
          Above everything. A reader who takes the first paragraph and leaves
          has been served, which is the point of a reference page. */}
      <section className="pb-4 pt-10 md:pt-14">
        <Container>
          <Breadcrumb items={crumbs} />

          <div className="mt-8 max-w-[68ch]">
            <Eyebrow>{cluster.title}</Eyebrow>
            <h1 className="mt-3 font-display text-h1 text-ink">
              {guide.title}
            </h1>
            <Rule className="mt-6" />
            {/* The id is pointed at by the speakable selector in guideSchema.
                It is the canonical direct answer, so the pointer is a true
                statement about our own markup rather than a guess. */}
            <p id="guide-answer" className="mt-6 text-body-lg text-ink-body">
              {guide.answer}
            </p>
          </div>

          {/* Where the figures come from, in the same block the calculators
              carry. Guides are YMYL content and an undated, unsourced page
              about tax rates is the profile that rates worst. */}
          <div className="max-w-[68ch]">
            <RateProvenance />
          </div>
        </Container>
      </section>

      {/* ── 2. The body ───────────────────────────────────────────────────
          Measured at 68ch rather than the site's usual 62: these run long and
          a reference page is scanned as much as read. */}
      <Section tight>
        <Container>
          <div className="max-w-[68ch]">
            {guide.sections.map((section, i) => (
              <ContentBlock key={i} section={section} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 3. FAQ ────────────────────────────────────────────────────────
          Carried into FAQPage schema, so an answer can reach someone inside a
          search result without them opening the page. That is the intent. */}
      <Section band>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  eyebrow="Questions"
                  lines={["The questions"]}
                  accent="people ask"
                />
              </div>
            </Reveal>
            <FaqAccordion faqs={guide.faqs} />
          </div>
        </Container>
      </Section>

      {/* ── 4. Where to go next ───────────────────────────────────────── */}
      {siblings.length > 0 && (
        <Section tight>
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Also here"
                lines={["Related"]}
                accent="guides"
              />
            </Reveal>
            <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {siblings.map((sibling, i) => (
                <Reveal key={sibling.slug} as="li" index={i} className="h-full">
                  <Link
                    href={guideHref(sibling)}
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

      {/* ── 5. The ask, once, at the end ─────────────────────────────── */}
      <Section band={siblings.length === 0} tight>
        <Container>
          <Reveal>
            <div className="u-tile flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
              <div className="max-w-[52ch]">
                <h2 className="font-display text-h3 text-ink">
                  {guide.cta?.heading ?? 'Rather have someone handle it?'}
                </h2>
                <p className="mt-3 text-[15px] leading-[1.65] text-ink-body">
                  {guide.cta?.body ??
                    'We file returns through IRIS every day. If the answer above raises a question about your own case, that is the conversation to have before the deadline rather than after it.'}
                </p>
              </div>
              <Button href={guide.cta?.href ?? '/contact'} size="lg" className="flex-none">
                {guide.cta?.buttonLabel ?? 'Talk to us'}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
