import Link from 'next/link';
import {
  Container,
  Section,
  SectionHeading,
  Lead,
  Breadcrumb,
  ChessArt,
} from '@/components/primitives';
import { Icon } from '@/components/icons';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { JsonLd, breadcrumbSchema, itemListSchema, organizationRef } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';
import {
  BLOG_HUB,
  PUBLISHED_POSTS,
  activePostClusters,
  postClusterHref,
  postHref,
  postsInCluster,
} from '@/content/posts';

export const metadata = pageMetadata({
  title: BLOG_HUB.seo.title,
  description: BLOG_HUB.seo.description,
  path: '/blog',
});

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
];

/**
 * The blog index.
 *
 * ## The empty state is kept, not deleted
 *
 * This page used to carry a hand-written "nothing here yet" state behind a
 * `POSTS_ENABLED = false` flag, arguing that an empty blog is better than a
 * stocked-looking one full of filler. That argument was right and it still is,
 * so the state survives as the real empty branch rather than being removed once
 * the first posts shipped.
 *
 * It now triggers on the actual condition instead of a hand-flipped constant:
 * if the date gate has published nothing, the honest page is the one that says
 * so. That also makes it the correct thing to render if every post were ever
 * withdrawn, which a boolean would have quietly got wrong.
 */
export default function BlogPage() {
  const clusters = activePostClusters();
  const hasPosts = PUBLISHED_POSTS.length > 0;

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd data={organizationRef()} />
      {hasPosts && (
        <JsonLd data={itemListSchema('Blog', PUBLISHED_POSTS.map(postHref))} />
      )}

      <Section tight>
        <Container>
          <Breadcrumb items={CRUMBS} />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <SectionHeading
                level={1}
                eyebrow="Blog"
                lines={hasPosts ? ['Numbers with', 'a date'] : ['Nothing to', 'read']}
                accent={hasPosts ? 'on them' : 'here yet'}
              />
              <Lead className="mt-7 max-w-[54ch]">
                {hasPosts
                  ? BLOG_HUB.intro
                  : 'We would rather this page was empty than full of posts nobody on the team could stand behind. When it opens, every post will come from work we actually did.'}
              </Lead>
            </div>

            <div className="hidden lg:block">
              <ChessArt name="cluster" sizes="45vw" className="mx-auto max-w-[420px]" />
            </div>
          </div>
        </Container>
      </Section>

      {hasPosts ? (
        <>
          {clusters.map((cluster) => {
            const posts = postsInCluster(cluster.slug);
            return (
              <Section key={cluster.slug} tight>
                <Container>
                  <Reveal>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div className="max-w-[58ch]">
                        <h2 className="font-display text-h2 text-ink">
                          {cluster.title}
                        </h2>
                        <p className="mt-3 text-[15.5px] leading-[1.65] text-ink-body">
                          {cluster.card}
                        </p>
                      </div>
                      <Link
                        href={postClusterHref(cluster.slug)}
                        className="u-arrow-link text-caption"
                      >
                        All {posts.length === 1 ? 'in this topic' : `${posts.length} posts`}
                        <Icon name="arrow-right" size={15} className="u-arrow-link__icon" />
                      </Link>
                    </div>
                  </Reveal>

                  <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {posts.map((post, i) => (
                      <Reveal key={post.slug} as="li" index={i} className="h-full">
                        <Link
                          href={postHref(post)}
                          className="u-tile u-tile-interactive group flex h-full flex-col p-7"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="font-display text-h3 text-ink transition-colors group-hover:text-blue-600">
                              {post.navLabel}
                            </h3>
                            <Icon
                              name="arrow-up-right"
                              size={18}
                              className="mt-1 flex-none text-ink-body transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"
                            />
                          </div>
                          <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-ink-body">
                            {post.card}
                          </p>
                          <time
                            dateTime={post.publishedAt.slice(0, 10)}
                            className="mt-4 text-caption text-ink-body"
                          >
                            {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              timeZone: 'UTC',
                            })}
                          </time>
                        </Link>
                      </Reveal>
                    ))}
                  </ul>
                </Container>
              </Section>
            );
          })}

          {/* The standing promise, kept visible now that there is content to
              hold against it. These were the three conditions the empty state
              said every post would meet. */}
          <Section band tight>
            <Container>
              <Reveal>
                <div className="u-tile mx-auto max-w-3xl p-8 md:p-10">
                  <h2 className="font-display text-h3 text-ink">
                    What every post here has to do
                  </h2>
                  <ul className="mt-6 flex flex-col gap-3.5">
                    {[
                      'State where each figure came from and the day it was read, because a price with no date behind it is a guess.',
                      'Say what it does not cover, in its own words, rather than implying it covered everything.',
                      'Get corrected or taken down when it goes out of date, not left to rank.',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Icon
                          name="check"
                          size={17}
                          className="mt-0.5 flex-none text-blue-600"
                        />
                        <span className="text-[15px] leading-[1.6] text-ink-strong">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </Container>
          </Section>
        </>
      ) : (
        /* ── Honest empty state ─────────────────────────────────────── */
        <Section tight>
          <Container>
            <Reveal>
              <div className="u-tile mx-auto max-w-3xl p-8 md:p-12">
                <span className="u-badge u-badge--chrome grid size-14 place-items-center">
                  <Icon name="document" size={24} />
                </span>

                <h2 className="mt-6 font-display text-h3 text-ink">
                  Nothing published yet, deliberately
                </h2>

                <div className="mt-5 flex flex-col gap-4 text-[15px] leading-[1.7] text-ink-body">
                  <p>
                    A stocked-looking blog is one afternoon of generic &ldquo;5
                    tips&rdquo; posts away. It would not tell you anything true about
                    how we work, so we are not shipping it.
                  </p>
                  <p>When this section opens, every post will meet three conditions:</p>
                </div>

                <ul className="mt-6 flex flex-col gap-3.5">
                  {[
                    'It is written by someone who did the work it describes, not briefed to a writer who did not.',
                    'It links to the real service page behind it, so the claim is checkable.',
                    'It gets corrected or taken down once it is out of date, not left to rank.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Icon name="check" size={17} className="mt-0.5 flex-none text-blue-600" />
                      <span className="text-[15px] leading-[1.6] text-ink-strong">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 border-t border-line pt-6 text-[15px] leading-[1.65] text-ink-body">
                  In the meantime, the service pages are the honest substitute: each
                  one states exactly what is included, what you receive, how long it
                  takes and what we need from you.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/services">Browse the services</Button>
                  <Button href="/contact" variant="chrome">
                    Ask us a question
                  </Button>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>
      )}
    </main>
  );
}
