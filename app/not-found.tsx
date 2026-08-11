import Link from 'next/link';
import { Container, Section, SectionHeading, Lead, ChessArt } from '@/components/primitives';
import { Button } from '@/components/ui/Button';
import { SERVICE_GROUPS } from '@/content/services';
import { IconBadge } from '@/components/ui/IconBadge';

/**
 * 404.
 *
 * Carries the full service list rather than a bare "page not found". If
 * someone landed here from a stale link or a typo, the thing they were looking
 * for is almost certainly one of these, so show them, instead of making them
 * navigate back to a menu.
 */
export default function NotFound() {
  return (
    <main id="main" tabIndex={-1}>
      <Section>
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <SectionHeading
                level={1}
                eyebrow="404"
                lines={['This page', 'does not']}
                accent="exist"
              />
              <Lead className="mt-7">
                The link is broken or the page has moved. Everything we offer is listed
                below. Whatever you were after is almost certainly one of them.
              </Lead>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/">Back to home</Button>
                <Button href="/services" variant="chrome">
                  All services
                </Button>
              </div>
            </div>

            <div className="hidden lg:block">
              <ChessArt name="pawn" sizes="40vw" className="mx-auto max-w-[300px]" />
            </div>
          </div>
        </Container>
      </Section>

      {/*
        Seven discipline cards, not the full 32-link directory.

        The first version listed every service here — directly above a footer
        that lists every service. Two visually identical multi-column link grids
        stacked back to back read as a rendering fault, not as a sitemap. The
        disciplines give a lost visitor a route in without duplicating what is
        already six inches below.
      */}
      <Section band tight>
        <Container>
          <h2 className="font-display text-h3 text-ink">Try one of the seven disciplines</h2>
          <ul className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SERVICE_GROUPS.map(({ pillar, services }) => (
              <li key={pillar.slug} className="h-full">
                <Link
                  href={`/services/${pillar.slug}`}
                  className="u-tile u-tile-interactive group flex h-full flex-col p-6"
                >
                  <IconBadge icon={pillar.icon} variant={pillar.badge} size="sm" />
                  <h3 className="mt-4 font-display text-[17px] font-bold text-ink transition-colors group-hover:text-blue-600">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[14px] leading-[1.55] text-ink-body">
                    {pillar.blurb}
                  </p>
                  <p className="mt-4 text-caption font-medium text-blue-600">
                    {services.length} services →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
