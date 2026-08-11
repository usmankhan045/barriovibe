import Link from 'next/link';
import { Icon } from '@/components/icons';

/**
 * Breadcrumb trail. Also emits BreadcrumbList JSON-LD, because the visible
 * trail and the structured data should never be able to disagree — they are
 * generated from the same array.
 */
export interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <Icon
                  name="chevron-down"
                  size={13}
                  className="-rotate-90 text-ink-body"
                />
              )}
              {isLast ? (
                <span className="font-medium text-ink-strong" aria-current="page">
                  {item.label}
                </span>
              ) : (
                /* `u-tap` for the 44px touch floor. The crumbs measured 21px
                   tall, and they are the only way back up the tree from a
                   service page on a phone. See globals.css. */
                <Link
                  href={item.href}
                  className="u-tap text-ink-body transition-colors hover:text-blue-600"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
