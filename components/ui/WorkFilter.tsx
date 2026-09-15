'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cx } from '@/lib/cx';
import { FlowCanvas } from './FlowCanvas';

/**
 * The category filter on /work.
 *
 * ── Why a filter rather than stacked sections ──
 *
 * A portfolio grows. Three categories rendered as three stacked grids means
 * the page gets longer with every project added, and the reader scrolls past
 * two categories they do not care about to reach the one they do. Tabs swap
 * the grid in place, so the page is the same height at six projects as at
 * sixty, and a visitor who came for marketing work sees marketing work.
 *
 * ── Why this is the only client component on the page ──
 *
 * It holds one piece of state: which tab is active. Everything it renders is
 * static markup handed down as props, and the project data never reaches the
 * browser beyond the handful of strings a card shows. That is the same
 * discipline the header follows, and the reason this takes `groups` already
 * reduced rather than importing content/builds.ts itself.
 *
 * ── No URL state ──
 *
 * Filtering does not push a query param. The tabs are a convenience for
 * scanning, not a destination: every project has its own page at /work/[slug],
 * which is the thing worth linking to and the thing search engines index. A
 * `?category=` on a page whose full content is already in the HTML would add a
 * second address for the same content and nothing else.
 */

export interface WorkFilterProject {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  href: string;
  repo?: string;
}

export interface WorkFilterGroup {
  slug: string;
  label: string;
  projects: WorkFilterProject[];
}

export function WorkFilter({
  groups,
  all,
}: {
  groups: WorkFilterGroup[];
  all: WorkFilterProject[];
}) {
  const [active, setActive] = useState('all');
  const shown = active === 'all' ? all : (groups.find((g) => g.slug === active)?.projects ?? all);

  /* The tab strip is hidden entirely when there is only one category to pick.
     A control that offers one choice is furniture. */
  const showTabs = groups.length > 1;

  return (
    <>
      {showTabs && (
        <div
          role="tablist"
          aria-label="Filter projects by type"
          className="flex flex-wrap items-center gap-1.5"
        >
          {[{ slug: 'all', label: 'All work', count: all.length }, ...groups.map((g) => ({
            slug: g.slug,
            label: g.label,
            count: g.projects.length,
          }))].map((tab) => {
            const isActive = tab.slug === active;
            return (
              <button
                key={tab.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.slug)}
                /* Colour and background only. A tab strip is scanned left to
                   right before anything is clicked, and a control that resizes
                   or lifts under the pointer moves the labels either side of
                   it while the eye is still reading them. */
                className={cx(
                  'u-tap rounded-pill px-4 text-[13.5px] font-semibold transition-colors duration-200',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-ink-body hover:bg-blue-50 hover:text-blue-600',
                )}
              >
                {tab.label}
                <span className={cx('ml-1.5 tabular', isActive ? 'text-blue-200' : 'text-ink-ghost')}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <ul className={cx('grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3', showTabs && 'mt-8')}>
        {shown.map((project, i) => (
          <li key={project.slug} className="h-full">
            {/* The brand surface, at a size that scales.

                These were the filled blue cards before, and they were right:
                a portfolio of blue tiles on a white page is the strongest
                thing this site does. What was wrong was the SIZE. Each one
                carried an icon badge, a product name at hero scale, a stat row
                and two links, which is a half-width tile that stops working at
                three across and is absurd at twelve.

                So the surface stays and everything decorative goes. A type
                label, a name, a line, one link. `p-6` and a 20px name instead
                of `p-10` and a 56px one, which is roughly a third of the
                height at three per row. */}
            {/* `data-flow-host` is what FlowCanvas binds its hover and focus
                listeners to. The canvas itself is behind the copy and inert, so
                it never sees the pointer.

                `overflow-hidden` keeps the fan inside the card's 24px corners:
                the sprite's alpha is the card's shape, but a canvas painted on
                top of it is a plain rectangle and would otherwise show its
                corners poking out past the radius. */}
            <article
              data-flow-host=""
              className="u-surface-btn group relative isolate flex h-full flex-col overflow-hidden p-6"
            >
              {/* Three per row, matching `lg:grid-cols-3`, so the flow crosses
                  a full row of the grid at its widest.

                  The grouping is by index and the geometry is measured off the
                  DOM, so the narrower breakpoints need no separate handling: at
                  two or one column the same three cards are simply no longer
                  side by side, FlowCanvas measures where they actually are, and
                  the stream follows them. `active` is in the key because
                  switching tabs replaces the cards under these indices, and a
                  stream should not carry the previous filter's geometry. */}
              <FlowCanvas row={`${active}-${Math.floor(i / 3)}`} className="-z-10" />

              <span className="font-display text-[10.5px] font-bold uppercase tracking-[0.14em] text-blue-200">
                {project.category}
              </span>

              <h3 className="mt-3 font-display text-[20px] font-bold leading-[1.2] text-white">
                <Link
                  href={project.href}
                  className='after:absolute after:inset-0 after:content-[""]'
                >
                  {project.name}
                </Link>
              </h3>

              <p className="mt-2.5 text-[13.5px] leading-[1.55] text-blue-100">
                {project.tagline}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-6">
                <span className="font-display text-[13px] font-bold text-white">
                  Read the build
                </span>
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="relative z-10 text-[12.5px] font-semibold text-blue-200 transition-colors duration-200 hover:text-white"
                  >
                    Source
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
