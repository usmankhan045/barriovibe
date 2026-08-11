import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container, Section, SectionHeading, Lead } from '@/components/primitives';
import { Icon } from '@/components/icons';
import { Reveal } from '@/components/ui/Reveal';
import { cx } from '@/lib/cx';
import {
  CAPABILITIES,
  ALL_DISCIPLINES_LABEL,
  FILING_CALENDAR,
  REGISTRATION_STAGES,
  REGISTRATION_AUTHORITIES,
  COMMERCE_CHANNELS,
  AGENT_TRACE,
  type Capability,
  type CapabilityId,
} from '@/content/capabilities';
import { SERVICE_GROUPS, SERVICE_COUNT, SERVICE_COUNT_WORD } from '@/content/services';
import { PILLAR_BY_SLUG } from '@/content/pillars';

/**
 * The capability grid — the home page's proof that the offering is real.
 *
 * ── The layout, and the rule it follows ──
 *
 * Twelve columns, six cards, three rows. Every row splits differently:
 *
 *     ┌──────────────────┬───────────────┐
 *     │   one contract 7 │  deadlines  5 │
 *     ├────────┬─────────┴──┬────────────┤
 *     │ regd 3 │ campaigns 4│ stores   5 │
 *     ├────────┴────────────┴────────────┤
 *     │            software 12           │
 *     └──────────────────────────────────┘
 *
 * ★ THE ASYMMETRY IS HORIZONTAL ONLY. No card spans two rows, and no card is
 *   taller than its neighbours — every row is one band of equal-height cards,
 *   and the interest comes from where the vertical seams fall (7|5, then 3|4|5,
 *   then none). That is a deliberate correction: the first version made the
 *   lead card `row-span-2` and it came out ~1,100px tall, which forced 500px
 *   siblings beside it and turned a scannable section into three screens of
 *   scrolling. Uneven WIDTH reads as composition; uneven HEIGHT reads as a
 *   broken grid and costs the reader the whole section.
 *
 *   The practical consequence: within a row the longest body sets the height of
 *   every card in it. See the word budget in content/capabilities.ts.
 *
 * ── The four-part rhythm every card repeats ──
 *
 *     label    the discipline, small blue caps
 *     title    what we do for it
 *     body     one sentence of mechanism
 *     ─────    a full-bleed hairline
 *     graphic  the same claim as data
 *
 * Identical structure in every card, varied width between them. That is the
 * whole trick: the eye learns the pattern on the first card and reads the rest
 * in a glance, while the grid still looks composed rather than tiled. The
 * elevation scale and the reasons for the hairline are in globals.css.
 *
 * ── Why each card carries a graphic ──
 *
 * A grid of six text cards is the version of this section every agency ships.
 * The graphics are all data — the real service counts, the actual filing
 * cadence, the actual channels — rendered as marks instead of sentences, so a
 * card is scannable in about a second and still says something checkable when
 * you stop on it.
 *
 * Everything here is a Server Component; every hover and transition is CSS.
 */

// ── Shared pieces ───────────────────────────────────────────────────────────

/** The discipline label. Small, blue, wide-tracked — the site's eyebrow, at card scale. */
function CardLabel({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span
      className={cx(
        'font-display text-[11px] font-bold uppercase tracking-[0.15em]',
        onDark ? 'text-blue-200' : 'text-blue-600',
      )}
    >
      {children}
    </span>
  );
}

/** The full-bleed hairline between a card's copy and its graphic. */
function Rule({ onDark = false }: { onDark?: boolean }) {
  return (
    <span
      className={cx('u-bento-rule', onDark && 'u-bento-rule--onDark')}
      aria-hidden="true"
    />
  );
}

/**
 * Resolves a card's discipline label without letting the wording drift.
 *
 * `shortTitle`, not `title`. At 3 columns "Corporate & Compliance" wraps onto
 * a second line, which pushes that one card's headline ~16px below its
 * neighbours' — and a row of cards whose headlines do not sit on the same
 * baseline is the exact thing that reads as unfinished.
 */
function labelFor(capability: Capability) {
  return capability.pillar ? PILLAR_BY_SLUG[capability.pillar].shortTitle : ALL_DISCIPLINES_LABEL;
}

/**
 * A resting white card: label and title, one sentence, a rule, a graphic.
 *
 * The whole tile is the link — a card with a link buried in its corner gives a
 * 300px target to the mouse and a 90px one to the thumb.
 */
function Card({
  capability,
  className,
  children,
}: {
  capability: Capability;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={capability.href}
      className={cx('u-bento-card group flex h-full flex-col p-6', className)}
    >
      <div className="flex items-center gap-3">
        <span className="u-bento-icon">
          <Icon name={capability.icon} size={18} />
        </span>
        <CardLabel>{labelFor(capability)}</CardLabel>
        <Icon
          name="arrow-up-right"
          size={16}
          className="ml-auto flex-none text-silver-400 transition-colors duration-200 group-hover:text-blue-600"
        />
      </div>

      <h3 className="mt-5 font-display text-h3 text-ink transition-colors duration-200 group-hover:text-blue-600">
        {capability.title}
      </h3>
      <p className="mt-2.5 text-[14.5px] leading-[1.55] text-ink-body">{capability.body}</p>

      {/* mt-auto pins the rule and graphic to the bottom edge, so they line up
          across a row even when one body wraps a line further than another. */}
      <div className="mt-auto pt-6">
        <Rule />
        <div className="pt-5">{children}</div>
      </div>
    </Link>
  );
}

// ── The six graphics ────────────────────────────────────────────────────────

/**
 * One mark per service, grouped by discipline, every service in the
 * catalogue represented,
 * counted from the service data rather than typed. Add another service and
 * its mark appears here automatically.
 */
function ContractLedger() {
  return (
    <ul className="flex flex-col gap-2.5">
      {SERVICE_GROUPS.map(({ pillar, services }) => (
        <li key={pillar.slug} className="flex items-center gap-3">
          <span className="w-[6.25rem] flex-none truncate text-[12.5px] text-blue-100">
            {pillar.shortTitle}
          </span>
          <span className="flex flex-1 items-center gap-1.5" aria-hidden="true">
            {services.map((service) => (
              <span
                key={service.slug}
                className="h-1.5 w-full max-w-2.5 rounded-[2px] bg-blue-200"
              />
            ))}
          </span>
          <span className="tabular text-[12.5px] font-bold text-white">
            {String(services.length).padStart(2, '0')}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** The statutory calendar. Rows separated by a hairline, not by boxes. */
function FilingCalendar() {
  return (
    <ul className="flex flex-col divide-y divide-line">
      {FILING_CALENDAR.map((filing) => (
        <li key={filing.label} className="flex items-center gap-3 py-2 first:pt-0 last:pb-0">
          <Icon name="check" size={13} className="flex-none text-blue-600" />
          <span className="text-[13px] font-medium text-ink">{filing.label}</span>
          <span className="ml-auto text-right text-[12px] text-ink-body">{filing.cadence}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Filed → examined → registered, as a horizontal rail.
 *
 * Horizontal because this is the narrowest card in the grid and a vertical
 * stack of three stages is 90px of height for three words. The connectors are
 * flexible spacers between the nodes, so the rail spans whatever width the
 * column happens to be.
 */
function RegistrationRail() {
  return (
    <div>
      <ol className="flex items-center">
      {REGISTRATION_STAGES.map((stage, i) => {
        const isLast = i === REGISTRATION_STAGES.length - 1;
        return (
          <li key={stage} className={cx('flex items-center', !isLast && 'flex-1')}>
            <span className="flex flex-col items-center gap-1.5">
              <span
                className={cx(
                  'grid size-4 place-items-center rounded-pill',
                  isLast ? 'bg-blue-600 text-white' : 'border border-silver-400 bg-surface',
                )}
                aria-hidden="true"
              >
                {isLast && <Icon name="check" size={10} />}
              </span>
              <span
                className={cx(
                  'text-[11.5px] font-medium',
                  isLast ? 'text-blue-600' : 'text-ink-body',
                )}
              >
                {stage}
              </span>
            </span>
            {!isLast && (
              <span className="mx-2 -mt-5 h-px flex-1 bg-silver-300" aria-hidden="true" />
            )}
          </li>
        );
      })}
      </ol>
      <p className="mt-4 border-t border-line pt-3 text-[12px] text-ink-body">
        {REGISTRATION_AUTHORITIES}
      </p>
    </div>
  );
}

/**
 * Cost per acquisition falling across twelve reported months.
 *
 * Deliberately unlabelled on the y-axis and drawn without a scale: it is the
 * SHAPE of a monthly report, not a claimed result. Inventing "−42% CPA" here
 * would be the same fabrication the placeholder stats in content/proof.ts
 * refuse to make.
 */
function SpendChart() {
  // Twelve months, not six: at this card's width six bars are ~50px wide each
  // and the graphic reads as a stack of blocks rather than as a chart.
  const bars = [100, 92, 96, 83, 88, 72, 69, 74, 58, 51, 44, 34];

  return (
    <div>
      {/* Flex boxes rather than an SVG.
          As an SVG this needed `preserveAspectRatio="none"` to fill a card of
          unknown width, and non-uniform scaling stretches the bars' corner
          radii with them — at this card's width the 2px `rx` came out as a
          6px horizontal blob. Percentage heights on flex children give the
          same chart with square corners at every width. */}
      <div
        className="flex h-14 items-end gap-1.5 border-b border-line pb-px"
        role="img"
        aria-label="Illustrative monthly report: cost per acquisition trending down over twelve months."
      >
        {bars.map((height, i) => (
          <span
            key={i}
            className={cx(
              'flex-1 rounded-t-[3px]',
              i === bars.length - 1 ? 'bg-blue-600' : 'bg-blue-200',
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <p className="mt-2.5 text-[12px] text-ink-body">Cost per acquisition · return on spend</p>
    </div>
  );
}

/** The three storefronts we build on and operate, and what we run on each. */
function ChannelBoard() {
  return (
    <ul className="flex flex-col divide-y divide-line">
      {COMMERCE_CHANNELS.map((channel) => (
        <li key={channel.name} className="flex items-center gap-3 py-2 first:pt-0 last:pb-0">
          <span className="size-1.5 flex-none rounded-pill bg-blue-600" aria-hidden="true" />
          <span className="text-[13px] font-medium text-ink">{channel.name}</span>
          <span className="ml-auto text-right text-[12px] text-ink-body">{channel.scope}</span>
        </li>
      ))}
    </ul>
  );
}

/** One agent run, traced. The third row is the one that matters. */
function AgentTrace() {
  return (
    <ol className="flex flex-col divide-y divide-line">
      {AGENT_TRACE.map((entry, i) => (
        <li key={entry.step} className="flex items-center gap-3 py-2 first:pt-0 last:pb-0">
          <span
            className="tabular text-[11px] font-bold tracking-[0.1em] text-blue-600"
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-[13px] font-medium text-ink">{entry.step}</span>
          <span className="ml-auto flex-none text-[11.5px] text-ink-body">{entry.tool}</span>
        </li>
      ))}
    </ol>
  );
}

const GRAPHICS: Record<CapabilityId, ReactNode> = {
  'one-contract': <ContractLedger />,
  deadlines: <FilingCalendar />,
  registrations: <RegistrationRail />,
  campaigns: <SpendChart />,
  storefronts: <ChannelBoard />,
  software: <AgentTrace />,
};

/**
 * Column spans. Rows split 7|5, then 3|4|5, then 12 — see the diagram above.
 * No `row-span` anywhere, deliberately.
 */
const SPANS: Record<CapabilityId, string> = {
  'one-contract': 'md:col-span-2 lg:col-span-7',
  deadlines: 'md:col-span-2 lg:col-span-5',
  registrations: 'lg:col-span-3',
  campaigns: 'lg:col-span-4',
  storefronts: 'md:col-span-2 lg:col-span-5',
  software: 'md:col-span-2 lg:col-span-12',
};

// ── Section ─────────────────────────────────────────────────────────────────

export function Capabilities() {
  const byId = Object.fromEntries(CAPABILITIES.map((c) => [c.id, c])) as Record<
    CapabilityId,
    Capability
  >;
  const feature = byId['one-contract'];
  const software = byId.software;
  const middle = CAPABILITIES.filter((c) => c.id !== 'one-contract' && c.id !== 'software');
  const softwarePillar = PILLAR_BY_SLUG['software-ai'];

  return (
    <Section id="capabilities" band>
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="What you actually get"
              lines={[`${SERVICE_COUNT_WORD} services.`]}
              accent="One way of working"
              className="max-w-xl"
            />
            <Lead className="lg:max-w-sm lg:text-right">
              The full list sits on the services page, one page per service. This is
              what the work looks like from the inside.
            </Lead>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {/* ── Row 1, left: the one filled card ────────────────────────
              Written out rather than run through Card() because it inverts —
              white type, a stat instead of an icon tile — and because its
              graphic sits beside the copy rather than under it. */}
          <Reveal className={SPANS['one-contract']}>
            <Link
              href={feature.href}
              className="u-bento-feature group flex h-full flex-col gap-6 p-6 sm:flex-row sm:items-stretch sm:gap-8"
            >
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-3">
                  <CardLabel onDark>{labelFor(feature)}</CardLabel>
                  <Icon
                    name="arrow-up-right"
                    size={16}
                    className="ml-auto flex-none text-blue-200 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>

                <span className="mt-5 flex items-baseline gap-2.5">
                  <span className="font-display text-stat tabular text-white">
                    {SERVICE_COUNT}
                  </span>
                  <span className="text-[13px] text-blue-100">services</span>
                </span>

                <h3 className="mt-3 font-display text-h3 text-white">{feature.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.55] text-blue-100">
                  {feature.body}
                </p>

                <span className="mt-auto inline-flex items-center gap-2 pt-6 font-display text-[14.5px] font-bold text-white">
                  See every service
                  <Icon
                    name="arrow-right"
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </div>

              {/* On sm+ the ledger is divided from the copy by a vertical
                  hairline rather than boxed in a panel — same reasoning as the
                  horizontal rule on the white cards. */}
              <div className="flex flex-col border-t border-white/15 pt-6 sm:w-[45%] sm:flex-none sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                <CardLabel onDark>{feature.panelLabel}</CardLabel>
                {/* Centred in the leftover height rather than pinned to the
                    top: this column is shorter than the copy beside it, and a
                    five-row ledger hanging from the top edge leaves a hole in
                    the corner where the drafting grid is. */}
                <div className="mt-5 flex flex-1 flex-col justify-center">
                  {GRAPHICS['one-contract']}
                </div>
              </div>
            </Link>
          </Reveal>

          {/* ── Rows 1–2: the four resting cards ─────────────────────── */}
          {middle.map((capability, i) => (
            <Reveal key={capability.id} index={i + 1} className={SPANS[capability.id]}>
              <Card capability={capability}>{GRAPHICS[capability.id]}</Card>
            </Reveal>
          ))}

          {/* ── Row 3: the full-width closer ─────────────────────────── */}
          <Reveal index={5} className={SPANS.software}>
            <Link
              href={software.href}
              className="u-bento-card group flex h-full flex-col gap-6 p-6 lg:flex-row lg:items-center lg:gap-14"
            >
              <div className="lg:max-w-[46%]">
                <div className="flex items-center gap-3">
                  <span className="u-bento-icon">
                    <Icon name={software.icon} size={18} />
                  </span>
                  <CardLabel>{labelFor(software)}</CardLabel>
                  <Icon
                    name="arrow-up-right"
                    size={16}
                    className="ml-auto flex-none text-silver-400 transition-colors duration-200 group-hover:text-blue-600 lg:hidden"
                  />
                </div>

                <h3 className="mt-5 font-display text-h3 text-ink transition-colors duration-200 group-hover:text-blue-600">
                  {software.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.55] text-ink-body">
                  {software.body}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {softwarePillar.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-pill border border-line bg-band px-3 py-1 text-[12px] font-medium text-ink-strong"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divided by a vertical hairline on lg, a horizontal one when
                  stacked — the same rule, rotated with the layout. */}
              <div className="border-t border-line pt-6 lg:ml-auto lg:w-[44%] lg:flex-none lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
                <div className="flex items-center justify-between gap-4">
                  <CardLabel>{software.panelLabel}</CardLabel>
                  <Icon
                    name="arrow-up-right"
                    size={16}
                    className="hidden flex-none text-silver-400 transition-colors duration-200 group-hover:text-blue-600 lg:block"
                  />
                </div>
                <div className="mt-5">{GRAPHICS.software}</div>
              </div>
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
