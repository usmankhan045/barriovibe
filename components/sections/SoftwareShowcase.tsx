import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container, Section, SectionHeading } from '@/components/primitives';
import { Icon } from '@/components/icons';
import { IconBadge } from '@/components/ui/IconBadge';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { cx } from '@/lib/cx';
import { getService, serviceHref, pillarHref } from '@/content/services';
import { SOFTWARE_SHOWCASE } from '@/content/softwareShowcase';

/**
 * The home page's dedicated look at Software & AI, the client's lead
 * discipline (see content/pillars.ts). Disciplines names the five teams;
 * this section is the one that actually shows the work.
 *
 * ── One card, not a mockup sitting above a caption ──
 *
 * The first pass here built each card as a brand-colour mockup panel with a
 * plain caption underneath it, on the section's own white band — the pattern
 * a lot of enterprise marketing sites use. Sitting directly under the
 * Disciplines carousel, that read as two different card languages on one
 * page: Disciplines is one glossy blue tile carrying everything — numeral,
 * badge, copy, the "Explore" link — and this section was a picture with a
 * label. So the card is now built the same way Disciplines is: the gradient
 * and the specular run the full height, the mockup sits in the top band, and
 * the title, description and "Explore" link sit in white/blue-100 text on
 * the same surface, closed off with a hairline exactly like the carousel's
 * detail pane. One material for both, not two.
 *
 * The six mockups — an agent trace, a persona badge, a node graph, a chat
 * exchange, a phone, a browser — stand in for screenshots this agency does
 * not have a product to take, built from the same tokens (`--grad-cta`, the
 * blue/silver scale) as every other surface on the page.
 *
 * The whole card is the link and lifts on hover; every mockup is a Server
 * Component with zero client JS, same as everywhere else here.
 */

function MockupArea({ children }: { children: ReactNode }) {
  // overflow-hidden of its own, not just the outer card's: the outer clip
  // only catches what escapes the CARD, and this band sits flush against the
  // text below it with no seam between them — without its own clip, a tall
  // rotated mockup (the phone) bleeds straight into the title underneath it.
  return <div className="relative h-48 w-full flex-none overflow-hidden sm:h-52">{children}</div>;
}

/** A small floating mockup card, the shared unit most mockups below compose
 *  with: rounded, on its own white, lightly rotated so it reads as placed
 *  rather than pinned to the grid. */
function Chip({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cx(
        'absolute rounded-xl bg-white p-3.5 shadow-[0_12px_28px_-8px_rgb(4_17_52_/_0.45)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** 1 — AI agents: a live trace, mid-shift — one card, centred, rather than
 *  two stacked chips guessing they will not collide. Task-scoped — the agent
 *  completes a process. Digital FTE, next, is person-scoped: the distinction
 *  the two cards exist to make visible. */
function AgentPanel() {
  return (
    <MockupArea>
      <div className="flex h-full items-center justify-center px-5">
        <div className="w-full max-w-[15rem] -rotate-1 rounded-xl bg-white p-4 shadow-[0_12px_28px_-8px_rgb(4_17_52_/_0.45)]">
          <span className="flex items-center gap-1.5">
            <span className="relative flex size-1.5 flex-none items-center justify-center">
              <span className="absolute size-1.5 animate-pulse rounded-full bg-blue-600" aria-hidden="true" />
            </span>
            <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-blue-600">
              Agent · live
            </span>
          </span>
          <ul className="mt-2.5 flex flex-col gap-1.5">
            <li className="flex items-center gap-2 text-[12px] font-medium text-ink">
              <Icon name="check" size={12} className="flex-none text-blue-600" />
              Order matched to Shopify record
            </li>
            <li className="flex items-center gap-2 text-[12px] font-medium text-ink">
              <Icon name="check" size={12} className="flex-none text-blue-600" />
              Refund policy checked against terms
            </li>
            <li className="flex items-center gap-2 text-[12px] font-medium text-ink-body">
              <span className="size-3 flex-none rounded-full border-2 border-blue-200" aria-hidden="true" />
              Held for approval
            </li>
          </ul>
          <div className="mt-2.5 flex items-center justify-between border-t border-line pt-2">
            <span className="text-[10.5px] text-ink-body">3 systems connected</span>
            <span className="flex gap-1" aria-hidden="true">
              <span className="size-1.5 rounded-full bg-blue-600" />
              <span className="size-1.5 rounded-full bg-blue-200" />
              <span className="size-1.5 rounded-full bg-blue-200" />
            </span>
          </div>
        </div>
      </div>
    </MockupArea>
  );
}

/** 2 — Digital FTE: an identity, not a task trace — a persona badge for the
 *  person this was built around, then a day's worth of what it actually
 *  handled, counted rather than described.
 *
 *  The badge row and the card below it are two siblings in a `flex-col`, not
 *  two independently-positioned elements each guessing the other's height —
 *  that was the version that let the card grow tall enough to cover the
 *  badge's second line. Flex layout can compress the gap between them; it
 *  cannot make them overlap. */
function DigitalFtePanel() {
  return (
    <MockupArea>
      <div className="flex h-full flex-col justify-between p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <span className="relative flex-none">
            <span className="grid size-10 place-items-center rounded-full bg-white text-blue-600 shadow-[0_10px_20px_-6px_rgb(4_17_52_/_0.5)]">
              <Icon name="users" size={17} />
            </span>
            <span className="absolute -bottom-1 -right-1 grid size-4 place-items-center rounded-full bg-blue-600 text-white shadow-[0_4px_10px_-2px_rgb(4_17_52_/_0.6)]">
              <Icon name="sparkles" size={9} />
            </span>
          </span>
          <span className="flex flex-col">
            <span className="text-[12px] font-bold text-white">Coach’s Digital FTE</span>
            <span className="text-[10px] text-blue-100">Modelled on one person</span>
          </span>
        </div>

        <div className="-rotate-1 rounded-xl bg-white p-3.5 shadow-[0_12px_28px_-8px_rgb(4_17_52_/_0.45)]">
          <div className="flex items-center gap-1.5">
            <span className="relative flex size-1.5 flex-none items-center justify-center">
              <span className="absolute size-1.5 animate-pulse rounded-full bg-blue-600" aria-hidden="true" />
            </span>
            <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-blue-600">
              Today, handled
            </span>
          </div>
          <ul className="mt-2 flex flex-col gap-1.5">
            <li className="flex items-center justify-between text-[12px] font-medium text-ink">
              <span>Client messages replied</span>
              <span className="tabular text-ink-body">12</span>
            </li>
            <li className="flex items-center justify-between text-[12px] font-medium text-ink">
              <span>Session notes drafted</span>
              <span className="tabular text-ink-body">3</span>
            </li>
            <li className="flex items-center justify-between text-[12px] font-medium text-ink-body">
              <span>Escalated for a decision</span>
              <span className="tabular">1</span>
            </li>
          </ul>
        </div>
      </div>
    </MockupArea>
  );
}

/** 3 — Workflow automation: a hub and four spokes, drawn directly on the
 *  surface rather than boxed in a card — the diagram is the point. */
function AutomationPanel() {
  const items: { icon: 'document' | 'chat' | 'cart' | 'calculator'; label: string; x: number; y: number }[] = [
    { icon: 'document', label: 'Inbox', x: 14, y: 18 },
    { icon: 'chat', label: 'Support', x: 86, y: 16 },
    { icon: 'cart', label: 'Orders', x: 88, y: 82 },
    { icon: 'calculator', label: 'Accounts', x: 12, y: 84 },
  ];
  const hub = { x: 50, y: 50 };

  return (
    <MockupArea>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {items.map((item) => (
          <line
            key={item.icon}
            x1={hub.x}
            y1={hub.y}
            x2={item.x}
            y2={item.y}
            stroke="rgb(255 255 255 / 0.35)"
            strokeWidth="0.6"
            strokeDasharray="1.5 3"
          />
        ))}
      </svg>

      {items.map((item) => (
        <span
          key={item.icon}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
        >
          <span className="grid size-10 place-items-center rounded-full bg-white text-blue-600 shadow-[0_10px_20px_-6px_rgb(4_17_52_/_0.5)]">
            <Icon name={item.icon} size={17} />
          </span>
          <span className="rounded-pill bg-white/10 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-blue-100">
            {item.label}
          </span>
        </span>
      ))}

      <span
        className="absolute grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-blue-600 shadow-[0_14px_28px_-6px_rgb(4_17_52_/_0.55)]"
        style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
      >
        <span className="absolute inset-0 rounded-full border border-blue-200 animate-pulse" aria-hidden="true" />
        <Icon name="workflow" size={22} />
      </span>
    </MockupArea>
  );
}

/** 4 — AI chatbots: a real exchange, not a testimonial — no faces, the site
 *  does not fabricate people any more than it fabricates numbers. Three
 *  messages, not four: the card sits inside a padded flex column that fills
 *  the mockup band exactly, so there is no percentage-guessed inset left to
 *  get wrong as the band's own height changes. */
function ChatPanel() {
  return (
    <MockupArea>
      <div className="flex h-full flex-col p-4 sm:p-5">
        <div className="flex h-full flex-col -rotate-1 rounded-xl bg-white p-3.5 shadow-[0_12px_28px_-8px_rgb(4_17_52_/_0.45)]">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <span className="relative flex size-1.5 flex-none items-center justify-center">
              <span className="absolute size-1.5 animate-pulse rounded-full bg-blue-600" aria-hidden="true" />
            </span>
            <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-blue-600">
              WhatsApp · live
            </span>
          </div>
          <div className="mt-2.5 flex flex-1 flex-col justify-center gap-1.5">
            <span className="max-w-[85%] rounded-lg rounded-bl-sm bg-band px-2.5 py-1.5 text-[11.5px] font-medium text-ink-strong">
              Where is order 4471?
            </span>
            <span className="ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-blue-600 px-2.5 py-1.5 text-[11.5px] font-medium text-white">
              Out for delivery, arriving today
            </span>
            <span className="max-w-[85%] rounded-lg rounded-bl-sm bg-band px-2.5 py-1.5 text-[11.5px] font-medium text-ink-strong">
              Can I change the address?
            </span>
          </div>
        </div>
      </div>
    </MockupArea>
  );
}

/** A small gradient chip: an app icon, an avatar, a nav-mark. One shape, three
 *  jobs, so the mobile and web mockups below stop leaning on flat grey bars
 *  for everything and start looking like screens with real interface on them. */
function GradientChip({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span
      className={cx('grid flex-none place-items-center text-white', className)}
      style={{ backgroundImage: 'var(--grad-cta)' }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

/** 5 — Mobile applications: a real screen, not a wireframe — a status bar, an
 *  app icon and an account avatar, two stats, a usage chart, two client rows
 *  with initials in place of a stock photo, and a tab bar with real icons. A
 *  second, dimmer phone behind it carries the composition into the corners. */
function MobilePanel() {
  const bars = [40, 65, 50, 80, 60, 35];

  return (
    <MockupArea>
      <div className="absolute inset-0 grid place-items-center">
        <div
          className="absolute h-[92%] w-[46%] translate-x-[36%] translate-y-[8%] rotate-[9deg] rounded-[1.5rem] bg-white/15 p-2 backdrop-blur-sm"
          aria-hidden="true"
        >
          <div className="h-full rounded-[1.1rem] bg-white/10" />
        </div>

        <div className="relative h-[96%] w-[52%] -translate-x-[6%] rotate-[-4deg] rounded-[1.6rem] bg-white p-1.5 shadow-[0_28px_50px_-12px_rgb(4_17_52_/_0.6)]">
          <div className="flex h-full flex-col overflow-hidden rounded-[1.2rem] bg-white">
            {/* Status bar */}
            <div className="flex items-center justify-between px-3 pt-2">
              <span className="text-[8px] font-bold tabular text-ink">9:41</span>
              <div className="flex items-center gap-0.5" aria-hidden="true">
                <span className="h-1.5 w-2 rounded-[1px] bg-ink" />
                <span className="h-1.5 w-2 rounded-[1px] bg-ink" />
                <span className="h-1.5 w-2.5 rounded-[2px] border border-ink" />
              </div>
            </div>

            {/* App bar: icon, name, account avatar */}
            <div className="mt-2 flex items-center gap-2 px-3 pb-2">
              <GradientChip className="size-6 rounded-[7px]">
                <Icon name="sparkles" size={12} />
              </GradientChip>
              <span className="flex-1 text-[10.5px] font-bold text-ink">Coach App</span>
              <GradientChip className="size-6 rounded-full text-[8px] font-bold">AK</GradientChip>
            </div>

            {/* Stat row */}
            <div className="flex items-center gap-2 px-3">
              <div className="flex-1 rounded-lg bg-band px-2 py-1.5">
                <span className="block font-display text-[15px] font-extrabold tabular text-blue-600">
                  24
                </span>
                <span className="text-[7px] font-medium text-ink-body">Active clients</span>
              </div>
              <div className="flex-1 rounded-lg bg-band px-2 py-1.5">
                <span className="block font-display text-[15px] font-extrabold tabular text-ink">6</span>
                <span className="text-[7px] font-medium text-ink-body">Sessions today</span>
              </div>
            </div>

            {/* Usage chart, unlabelled — the shape, not a claimed number */}
            <div className="mt-2 flex h-6 items-end gap-1 px-3" aria-hidden="true">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className={cx('flex-1 rounded-t-[2px]', i === 3 ? 'bg-blue-600' : 'bg-blue-100')}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            {/* Content rows */}
            <div className="mt-2 flex flex-1 flex-col gap-1.5 px-3">
              <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-2 py-1.5">
                <GradientChip className="size-5 rounded-full text-[7px] font-bold">JM</GradientChip>
                <div className="flex-1">
                  <span className="block h-1.5 w-[60%] rounded-pill bg-blue-200" aria-hidden="true" />
                  <span className="mt-1 block h-1 w-[40%] rounded-pill bg-blue-100" aria-hidden="true" />
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
                <span className="grid size-5 flex-none place-items-center rounded-full bg-silver-300 text-[7px] font-bold text-white">
                  RS
                </span>
                <div className="flex-1">
                  <span className="block h-1.5 w-[50%] rounded-pill bg-silver-300" aria-hidden="true" />
                  <span className="mt-1 block h-1 w-[32%] rounded-pill bg-silver-200" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Tab bar, real icons */}
            <div className="mt-auto flex items-center justify-around border-t border-line py-2">
              <span className="grid size-6 place-items-center rounded-full bg-blue-600 text-white">
                <Icon name="chart" size={12} />
              </span>
              <Icon name="chat" size={13} className="text-silver-400" />
              <Icon name="calculator" size={13} className="text-silver-400" />
              <Icon name="users" size={13} className="text-silver-400" />
            </div>
          </div>
        </div>
      </div>
    </MockupArea>
  );
}

/** 6 — Full-stack web development: a real page, not a wireframe — a nav bar
 *  with a logo mark, a hero with two calls to action, a row of feature cards
 *  with icons, and an analytics widget peeking from behind the browser
 *  window for the same depth every other mockup here already has. */
function WebPanel() {
  const bars = [30, 55, 40, 70, 50];

  return (
    <MockupArea>
      <div
        className="absolute right-3 top-3 flex w-24 items-end gap-1 rounded-xl bg-white/15 p-3 backdrop-blur-sm"
        style={{ transform: 'rotate(6deg)' }}
        aria-hidden="true"
      >
        {bars.map((h, i) => (
          <span key={i} className="h-6 flex-1 rounded-t-[2px] bg-white/40" style={{ height: `${h}%` }} />
        ))}
      </div>

      <Chip className="inset-x-5 top-9 bottom-[8%] flex flex-col rotate-[1.2deg]">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-line pb-2.5">
          <span className="size-2 rounded-full bg-silver-300" aria-hidden="true" />
          <span className="size-2 rounded-full bg-silver-300" aria-hidden="true" />
          <span className="size-2 rounded-full bg-blue-600" aria-hidden="true" />
          <span className="ml-2 h-2.5 flex-1 rounded-pill bg-band" aria-hidden="true" />
        </div>

        {/* Nav */}
        <div className="mt-2.5 flex items-center gap-2 border-b border-line pb-2">
          <GradientChip className="size-3 rounded-[4px]" />
          <span className="h-1.5 w-8 rounded-pill bg-band" aria-hidden="true" />
          <span className="h-1.5 w-8 rounded-pill bg-band" aria-hidden="true" />
          <span className="h-1.5 w-8 rounded-pill bg-band" aria-hidden="true" />
          <span className="ml-auto h-4 w-12 rounded-pill bg-blue-600" aria-hidden="true" />
        </div>

        {/* Hero */}
        <div className="mt-3 flex flex-1 flex-col gap-2">
          <span className="h-3.5 w-[80%] rounded-pill bg-ink-strong" aria-hidden="true" />
          <span className="h-3.5 w-[55%] rounded-pill bg-ink-strong" aria-hidden="true" />
          <span className="mt-1 h-2 w-[65%] rounded-pill bg-band" aria-hidden="true" />
          <div className="mt-1.5 flex gap-2">
            <span className="h-6 w-16 rounded-lg bg-blue-600" aria-hidden="true" />
            <span className="h-6 w-16 rounded-lg border border-line" aria-hidden="true" />
          </div>

          {/* Feature row */}
          <div className="mt-auto flex gap-2 border-t border-line pt-2.5">
            {(['code', 'phone', 'sparkles'] as const).map((icon) => (
              <div key={icon} className="flex-1 rounded-lg bg-band p-2">
                <span className="grid size-5 place-items-center rounded-md bg-white text-blue-600 shadow-[0_2px_6px_-1px_rgb(4_17_52_/_0.2)]">
                  <Icon name={icon} size={11} />
                </span>
                <span className="mt-1.5 block h-1 w-[70%] rounded-pill bg-silver-300" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </Chip>
    </MockupArea>
  );
}

const PANELS: Record<string, () => ReactNode> = {
  'agentic-ai-development': AgentPanel,
  'digital-fte': DigitalFtePanel,
  'workflow-automation': AutomationPanel,
  'chatbot-development': ChatPanel,
  'app-development': MobilePanel,
  'web-development': WebPanel,
};

export function SoftwareShowcase() {
  return (
    <Section id="software-ai" band>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Software & AI"
            lines={['Software, engineered.']}
            accent="AI, shipped to production"
          />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {SOFTWARE_SHOWCASE.map((item, i) => {
            const service = getService(item.slug);
            const PanelGraphic = PANELS[item.slug];
            if (!service || !PanelGraphic) return null;

            return (
              <Reveal key={item.slug} index={i}>
                <Link
                  href={serviceHref(service)}
                  className="u-showcase-panel group flex h-full flex-col transition-transform duration-300 ease-brand hover:-translate-y-1"
                >
                  <PanelGraphic />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-[1.0625rem] font-bold text-white">{item.title}</h3>
                      <IconBadge icon={service.icon} variant="chrome" size="xs" className="flex-none" />
                    </div>
                    <p className="mt-1.5 flex-1 text-[13px] leading-[1.5] text-blue-100">
                      {item.description}
                    </p>
                    <span className="mt-3 flex items-center gap-2 border-t border-white/15 pt-3 font-display text-[13px] font-bold text-white">
                      Explore
                      <Icon
                        name="arrow-right"
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal index={5}>
          <div className="mt-14 flex justify-center lg:mt-16">
            <Button href={pillarHref('software-ai')} variant="chrome">
              View every software & AI service
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
