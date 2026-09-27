import Link from 'next/link';
import { Container, Section, SectionHeading, Eyebrow } from '@/components/primitives';
import { Icon } from '@/components/icons';
import { Reveal } from '@/components/ui/Reveal';
import { serviceHref } from '@/content/services';
import type { Service } from '@/content/types';
import type { Evidence } from '@/lib/service-links';

/**
 * The two halves of the link between a service and the writing behind it. See
 * content/service-links.ts for why the link exists at all.
 */

/**
 * One line under a guide's, tool's or post's opening, naming the service that
 * does the work.
 *
 * Near the top rather than at the foot, and as a plain text link rather than a
 * card. A reader who came for the answer should not have it interrupted by a
 * sales block, and one who came to get the thing done should not have to read
 * to the end to find out that someone will. The service's own name is the link
 * text because that is the phrase the service page is trying to rank for, and
 * anchor text is the strongest statement a site can make about what the page
 * at the other end is.
 */
export function DoneForYou({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[14.5px] text-ink-body">
      <span>We do this for clients:</span>
      {services.map((service, i) => (
        <span key={service.slug} className="inline-flex items-baseline">
          <Link
            href={serviceHref(service)}
            className="u-tap font-semibold text-blue-600 underline decoration-blue-600/30 underline-offset-4 transition-colors hover:decoration-blue-600"
          >
            {service.headline ?? service.title}
          </Link>
          {i < services.length - 1 && <span aria-hidden="true">,</span>}
        </span>
      ))}
    </p>
  );
}

/**
 * The guides, calculators and posts behind a service, on the service page.
 *
 * Headed as evidence rather than as "resources", because that is what it is to
 * a reader deciding whether to hire the firm: the firm's own working on the
 * subject, dated and sourced, which a brochure page cannot show.
 */
export function ServiceEvidence({ items }: { items: Evidence[] }) {
  if (items.length === 0) return null;

  return (
    <Section tight>
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Our working" lines={['Read before']} accent="you decide" />
          <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.65] text-ink-body">
            Our own writing on the subject, with every source named. Most people find their
            question answered here, and the ones who still want it done know exactly what they are
            asking for.
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.href} as="li" index={i} className="h-full">
              <Link
                href={item.href}
                className="u-tile u-tile-interactive group flex h-full flex-col p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <Eyebrow as="span">{item.kind}</Eyebrow>
                  <Icon
                    name="arrow-up-right"
                    size={16}
                    className="flex-none text-ink-body transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"
                  />
                </div>
                <h3 className="mt-3 font-display text-[17px] font-bold text-ink transition-colors group-hover:text-blue-600">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-[1.55] text-ink-body">{item.card}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
