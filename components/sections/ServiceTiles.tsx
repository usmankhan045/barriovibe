import Link from 'next/link';
import { Icon } from '@/components/icons';
import { Reveal } from '@/components/ui/Reveal';
import { serviceHref } from '@/content/services';
import type { Service } from '@/content/types';

/**
 * The service tile: title, one-liner, and the first three things included.
 *
 * Extracted because a discipline page and a practice page have to render the
 * same card. A practice page is just the same grid repeated once per
 * discipline, and the moment the two templates carried their own copy of this
 * markup they would start to drift, which on this site means a visitor
 * comparing two services across two pages gets two different amounts of
 * information about them.
 *
 * `included.slice(0, 3)` rather than the whole list: the tile is a decision
 * aid, not the service page. Three lines is what the shortest service has, so
 * every card in a grid has the same shape.
 */
export function ServiceTiles({ services }: { services: Service[] }) {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service, i) => (
        <Reveal key={service.slug} as="li" index={i} className="h-full">
          <Link
            href={serviceHref(service)}
            className="u-tile u-tile-interactive group flex h-full flex-col p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-h3 text-ink transition-colors group-hover:text-blue-600">
                {service.title}
              </h3>
              <Icon
                name="arrow-up-right"
                size={18}
                className="mt-1 flex-none text-ink-body transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"
              />
            </div>

            <p className="mt-3 text-[15px] leading-[1.6] text-ink-body">{service.oneLiner}</p>

            <ul className="mt-5 flex flex-1 flex-col gap-2">
              {service.included.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Icon name="check" size={15} className="mt-1 flex-none text-blue-600" />
                  <span className="text-[13.5px] leading-[1.5] text-ink-body">{item}</span>
                </li>
              ))}
            </ul>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
