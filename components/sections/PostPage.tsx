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
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  organizationRef,
  postSchema,
} from "@/lib/jsonld";
import {
  POST_CLUSTER_BY_SLUG,
  PUBLISHED_POSTS,
  postClusterHref,
  postHref,
  type Post,
} from "@/content/posts";
import type { GuideSection } from "@/content/guides";

/**
 * The shared shell for every post under `/blog`.
 *
 * Deliberately the same shape as GuidePage, and it shares GuidePage's section
 * renderer rather than copying it. The two differ in exactly three places, each
 * for a reason:
 *
 *   1. No RateProvenance. That block states when Pakistani tax rates were last
 *      reconciled against the statute, which is true of guides and irrelevant
 *      to a post about vendor pricing. Posts carry their own sources instead.
 *   2. A visible sources block, rendered from the same array that feeds the
 *      schema citations, so a reader and a crawler see the same list.
 *   3. A visible limits block, where the post declares one.
 */

/** A date, as a reader reads it. */
function readable(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function PostPage({ post }: { post: Post }) {
  const cluster = POST_CLUSTER_BY_SLUG[post.cluster];
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: cluster.title, href: postClusterHref(post.cluster) },
    { label: post.navLabel, href: postHref(post) },
  ];

  const siblings = (post.related ?? [])
    .map((slug) => PUBLISHED_POSTS.find((p) => p.slug === slug))
    .filter((p): p is Post => Boolean(p));

  const stepsSection = post.sections.find(
    (s): s is Extract<GuideSection, { kind: "steps" }> => s.kind === "steps",
  );

  const published = post.publishedAt.slice(0, 10);
  const reviewed = post.reviewedOn ?? published;

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={organizationRef()} />
      <JsonLd
        data={postSchema({
          title: post.title,
          description: post.seo.description,
          path: postHref(post),
          cluster: cluster.title,
          publishedAt: post.publishedAt,
          reviewedOn: post.reviewedOn,
          sources: post.sources,
        })}
      />
      {stepsSection && (
        <JsonLd
          data={howToSchema({
            name: stepsSection.heading,
            description: stepsSection.intro ?? post.answer,
            path: postHref(post),
            steps: stepsSection.steps,
          })}
        />
      )}
      <JsonLd data={faqSchema(post.faqs)} />

      {/* ── 1. The answer ───────────────────────────────────────────────── */}
      <section className="pb-4 pt-10 md:pt-14">
        <Container>
          <Breadcrumb items={crumbs} />

          <div className="mt-8 max-w-[68ch]">
            <Eyebrow>{cluster.title}</Eyebrow>
            <h1 className="mt-3 font-display text-h1 text-ink">{post.title}</h1>

            {/* The date is stated up front rather than buried. A post whose
                figures are vendor prices is only as good as its date, and
                hiding it would be the defect this content model exists to
                prevent. */}
            <p className="mt-5 text-caption text-ink-body">
              <time dateTime={published}>{readable(post.publishedAt)}</time>
              {reviewed !== published && (
                <>
                  {" · sources re-checked "}
                  <time dateTime={reviewed}>{readable(`${reviewed}T00:00:00Z`)}</time>
                </>
              )}
            </p>

            <Rule className="mt-6" />
            {/* Pointed at by the speakable selector in postSchema. */}
            <p id="post-answer" className="mt-6 text-body-lg text-ink-body">
              {post.answer}
            </p>
          </div>
        </Container>
      </section>

      {/* ── 2. The body ─────────────────────────────────────────────────── */}
      <Section tight>
        <Container>
          <div className="max-w-[68ch]">
            {post.sections.map((section, i) => (
              <ContentBlock key={i} section={section} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 3. What this post does not claim ────────────────────────────── */}
      {post.limits && post.limits.length > 0 && (
        <Section tight>
          <Container>
            <div className="max-w-[68ch]">
              <div className="u-tile p-7 md:p-8">
                <h2
                  id="limits"
                  className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-ink-body"
                >
                  What this does not cover
                </h2>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {post.limits.map((limit) => (
                    <li key={limit} className="flex items-start gap-3.5">
                      <span
                        className="mt-2 size-1.5 flex-none rounded-pill bg-ink-body/40"
                        aria-hidden="true"
                      />
                      <span className="text-[15px] leading-[1.65] text-ink-body">
                        {limit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ── 4. Sources ──────────────────────────────────────────────────
          The same array that feeds the schema citations, so the two cannot
          come apart. Every load-bearing figure in the post is checkable from
          here, with the date it was read. */}
      <Section tight>
        <Container>
          <div className="max-w-[68ch]">
            <h2 id="sources" className="font-display text-h3 text-ink">
              Sources
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65] text-ink-body">
              Every figure above comes from one of these, read on the date
              shown. Prices change: if you are reading this long after that
              date, check before you rely on it.
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {post.sources.map((source) => (
                <li key={source.url} className="border-t border-line pt-4">
                  <a
                    href={source.url}
                    rel="nofollow noopener"
                    target="_blank"
                    className="u-arrow-link text-[15.5px] font-bold text-ink-strong"
                  >
                    {source.label}
                    <Icon
                      name="arrow-up-right"
                      size={15}
                      className="u-arrow-link__icon"
                    />
                  </a>
                  {source.supports && (
                    <p className="mt-1.5 text-[14.5px] leading-[1.6] text-ink-body">
                      {source.supports}
                    </p>
                  )}
                  <p className="mt-1 text-caption text-ink-body">
                    Read {readable(`${source.readOn}T00:00:00Z`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── 5. FAQ ──────────────────────────────────────────────────────── */}
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
            <FaqAccordion faqs={post.faqs} />
          </div>
        </Container>
      </Section>

      {/* ── 6. Where to go next ─────────────────────────────────────────── */}
      {siblings.length > 0 && (
        <Section tight>
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Also here"
                lines={["Related"]}
                accent="reading"
              />
            </Reveal>
            <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {siblings.map((sibling, i) => (
                <Reveal key={sibling.slug} as="li" index={i} className="h-full">
                  <Link
                    href={postHref(sibling)}
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

      {/* ── 7. The ask, once, at the end ────────────────────────────────── */}
      <Section band={siblings.length === 0} tight>
        <Container>
          <Reveal>
            <div className="u-tile flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
              <div className="max-w-[52ch]">
                <h2 className="font-display text-h3 text-ink">
                  {post.cta?.heading ?? "Want this applied to your case?"}
                </h2>
                <p className="mt-3 text-[15px] leading-[1.65] text-ink-body">
                  {post.cta?.body ??
                    "We do this work every week. If the post raises a question about your own situation, that is a short conversation rather than a proposal."}
                </p>
              </div>
              <Button
                href={post.cta?.href ?? "/contact"}
                size="lg"
                className="flex-none"
              >
                {post.cta?.buttonLabel ?? "Talk to us"}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
