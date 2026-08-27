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
import { JsonLd, breadcrumbSchema } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Blog',
  description:
    'Notes on software, AI, marketing and the corporate work behind them. Published when there is something worth saying, not on a schedule.',
  path: '/blog',
});

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
];

/**
 * The blog. Empty for now, deliberately: publishing the same three filler
 * "5 tips for X" posts every agency site launches with would say less about
 * the firm than saying nothing does. See app/work/page.tsx for the same
 * pattern applied to case studies.
 *
 * Flip this on the day the first post is ready to ship, not before.
 */
const POSTS_ENABLED = false;

export default function BlogPage() {
  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />

      <Section tight>
        <Container>
          <Breadcrumb items={CRUMBS} />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <SectionHeading
                level={1}
                eyebrow="Blog"
                lines={['Nothing to', 'read']}
                accent="here yet"
              />
              <Lead className="mt-7 max-w-[54ch]">
                We would rather this page was empty than full of posts nobody on the
                team could stand behind. When it opens, every post will come from
                work we actually did.
              </Lead>
            </div>

            <div className="hidden lg:block">
              <ChessArt name="cluster" sizes="45vw" className="mx-auto max-w-[420px]" />
            </div>
          </div>
        </Container>
      </Section>

      {POSTS_ENABLED ? null : (
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
