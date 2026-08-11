import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container, Section, SectionHeading } from '@/components/primitives';
import { Icon } from '@/components/icons';
import type { IconName } from '@/content/types';
import { IconBadge } from '@/components/ui/IconBadge';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { LiquidLens } from '@/components/ui/LiquidLens';
import { cx } from '@/lib/cx';
import { getService, serviceHref, pillarHref } from '@/content/services';
import { SOFTWARE_SHOWCASE } from '@/content/softwareShowcase';

/**
 * The home page's dedicated look at Software & AI, the client's lead
 * discipline (see content/pillars.ts). Disciplines names the five teams;
 * this section is the one that actually shows the work.
 *
 * ## The same material as the coverflow cards, inverted
 *
 * The card is `u-glass u-glass--card u-glass-interactive`: the literal classes
 * Coverflow puts on the practice cards (see `CARD_CLASS` in
 * Coverflow.tsx), not a lookalike. Sitting a section below the rake, a card
 * that only borrowed Disciplines' typography would read as a flat imitation
 * next to the real thing. See the long comment on `.u-glass--card` in
 * globals.css for why that variant carries no backdrop-filter and is therefore
 * safe on six cards where raw `.u-glass` is not.
 *
 * What `.u-glass--white` then changes is the body and nothing else: white
 * here, blue on the coverflow, with the blue kept in the rim so the edge still
 * falls off the way the material always did. RevenueEngine, one section down,
 * is built on the same pair. The reason is what is INSIDE this
 * card and not inside that one. Each of these carries a white mockup pane, and
 * a saturated blue field around a white screen leaves the eye nowhere to go
 * but the screen: six cards that read as six blue mats. Making the card the
 * same white as the pane puts the mockup back in the card instead of on it,
 * and the copy underneath goes to the page's own ink pair. The argument and
 * the three layers are recorded on `.u-glass--white` in globals.css.
 *
 * ## The grid was rebuilt away from and back to
 *
 * Three replacements were tried and all three were worse, which is worth
 * recording so the fourth is not attempted: a tab strip, a rail over a hero
 * stack, and a six-panel concertina. Each of them made one mockup bigger by
 * putting the other five behind a control, and a control on a home page is a
 * thing most visitors never touch — so five of the six services stopped being
 * on the page in any practical sense.
 *
 * Six cards shows six services. That is not a compromise, it is the point, and
 * the work belongs in making each card better rather than in making five of
 * them conditional.
 *
 * ## What was added rather than replaced
 *
 * The one thing the grid genuinely lacked was a reason to move. It now has
 * three, and all of them are on the card the pointer is actually over:
 *
 *   the light follows the pointer   `.u-glass::after` has always painted an
 *                                   illumination layer anchored at --u-px /
 *                                   --u-py. Those two properties were left in
 *                                   globals.css as a seam, with a note saying a
 *                                   listener would be worth it "if glass ever
 *                                   lands somewhere that earns it". Six cards
 *                                   is that place. See LiquidLens, which took
 *                                   the seam and then went past it.
 *   the screen leans in             the mockup lifts and its shadow deepens
 *                                   under the card's own lift, so the card
 *                                   reads as having depth rather than as a flat
 *                                   pane that translated.
 *   the rim sweeps                  already in the material: one pass of the
 *                                   travelling highlight around the silhouette,
 *                                   which is what `.u-glass-interactive` does
 *                                   everywhere else on the site.
 *
 * ## Why the mockups are framed screens and not floating chips
 *
 * The first version drew each mockup straight onto the glass: a chip here, a
 * node graph there, a phone somewhere else, each one guessing its own inset
 * inside a full-bleed band clipped by the card. Six different drawings at six
 * different scales, several of them running off their own edges, which is
 * exactly what made the row read as unfinished next to the coverflow.
 *
 * So every mockup now sits in the same `Screen`: one inset white pane, one
 * fixed face, one internal type scale, one window bar at the top. The row
 * reads as six screenshots of one design system rather than six sketches, and
 * nothing can bleed past a card edge because nothing is positioned against a
 * card edge any more. The pane's fixed height is what keeps all six the same
 * size at every column width, so the titles under them share a baseline; see
 * the note on `Screen` for why it is a height and not a ratio.
 *
 * The chrome varies with the thing being shown, and only there: four app
 * windows, one phone on a shelf, one browser. That is the honest signal for
 * what each service ships, and it costs the family nothing because the frame,
 * the palette and the inner scale are shared.
 *
 * They stand in for screenshots this agency does not have a product to take.
 * Every mockup below is a Server Component with zero client JS, and the whole
 * card is the link: `u-glass-interactive` owns its hover and focus state, so
 * nothing here reimplements a lift. The only client code in this section is
 * components/ui/LiquidLens.tsx, which moves one bead.
 */

// ── The shared frame ────────────────────────────────────────────────────────

/**
 * The white pane every mockup is drawn inside.
 *
 * ## Why a fixed height and not an aspect ratio
 *
 * `aspect-[4/3]` was the obvious choice and it is the wrong one here. An
 * aspect-sized pane is as tall as the column is wide, so the pane loses about
 * 50px of height between the three-column layout and the one-column one, while
 * everything drawn inside it is sized in px and loses nothing. Below `lg` the
 * agent trace and the chat thread were taller than their own pane, and since a
 * `flex-1` body will not shrink under its content, what got pushed out of the
 * clip was the footer under it: the input bar and the systems row simply
 * vanished on mobile.
 *
 * A fixed 14.25rem face fits the tallest of the six at every width, keeps all six
 * on one baseline so the titles under them line up, and reads as a screenshot
 * either way. `min-h-0` on each body is the second half of the fix: if a body
 * ever does outgrow the pane it now clips itself rather than ejecting the bar
 * below it.
 *
 * `overflow-hidden` of its own, so a device or a bar that runs to the pane's
 * edge is cut by the pane rather than by the card. `flex-none` so the screen
 * keeps its face when the copy under it wraps a line further on one card than
 * another.
 *
 * ## The hairline is what separates it from the card now
 *
 * A white pane on a blue card needed nothing but its own shadow. On the white
 * card (see `.u-showcase-card` in globals.css) that shadow was doing two jobs
 * badly: it was the only edge the pane had, and at the depth it needed to be
 * an edge it read as a smudge. So the separation moved to a hairline, the same
 * one the window bar and every divider inside the mockups use, and the shadow
 * went back to being a shadow: shallower, and blue rather than near-black.
 */
function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[14.25rem] w-full flex-none overflow-hidden rounded-[1rem] border border-line bg-white shadow-[0_10px_24px_-12px_rgb(11_47_146_/_0.28)]">
      <div className="flex h-full flex-col">{children}</div>
    </div>
  );
}

/** The window bar the four app screens share: an app mark, a title, a state. */
function WindowBar({
  icon,
  title,
  status,
}: {
  icon: IconName;
  title: string;
  status: string;
}) {
  return (
    <div className="flex flex-none items-center gap-2 border-b border-line px-3 py-2">
      <span className="grid size-5 flex-none place-items-center rounded-[6px] bg-blue-50 text-blue-600">
        <Icon name={icon} size={11} />
      </span>
      <span className="truncate text-[11px] font-bold text-ink">{title}</span>
      <span className="ml-auto flex flex-none items-center gap-1.5 rounded-pill bg-blue-50 px-1.5 py-[2px] text-[8.5px] font-bold uppercase tracking-[0.1em] text-blue-600">
        <span className="size-1 animate-pulse rounded-full bg-blue-600" aria-hidden="true" />
        {status}
      </span>
    </div>
  );
}

/** A gradient tile: an app icon, an avatar, a nav mark. One shape, three jobs,
 *  so the phone and the browser stop leaning on grey bars for everything. */
function GradientChip({ className, children }: { className?: string; children?: ReactNode }) {
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

// ── The six screens ─────────────────────────────────────────────────────────

/** 1: AI agents. One run, traced. Task-scoped, the agent completes a process.
 *  Digital FTE, next, is person-scoped: the distinction the two cards exist to
 *  make visible. The third step is the one that matters, so it is the one left
 *  open. */
function AgentScreen() {
  const steps = [
    { label: 'Order matched in Shopify', meta: 'Orders API', done: true },
    { label: 'Refund policy checked', meta: 'Your terms', done: true },
    { label: 'Held for approval', meta: 'Waiting on a human', done: false },
  ];

  return (
    <Screen>
      <WindowBar icon="sparkles" title="Refund request 4471" status="Live" />

      {/* The run's own progress, above the trace. Two thirds of a bar is what
          makes the open third step read as a run still going rather than as a
          list with one item unticked. */}
      <div className="flex-none px-3.5 pt-2.5">
        <div className="flex items-baseline justify-between">
          <span className="text-[9.5px] font-semibold text-ink">2 of 3 steps done</span>
          <span className="text-[9px] font-medium text-ink-body">18s</span>
        </div>
        <span className="mt-1 block h-[3px] w-full overflow-hidden rounded-pill bg-blue-100">
          <span className="block h-full w-2/3 rounded-pill bg-blue-600" aria-hidden="true" />
        </span>
      </div>

      <ol className="flex min-h-0 flex-1 flex-col justify-center px-3.5 py-2.5">
        {steps.map((step, i) => (
          <li key={step.label} className="flex gap-2.5">
            <span className="flex flex-none flex-col items-center">
              <span
                className={cx(
                  'grid size-4 flex-none place-items-center rounded-full',
                  step.done ? 'bg-blue-600 text-white' : 'border-2 border-blue-200 bg-white',
                )}
                aria-hidden="true"
              >
                {step.done && <Icon name="check" size={9} />}
              </span>
              {i < steps.length - 1 && (
                <span className="w-px flex-1 bg-blue-100" aria-hidden="true" />
              )}
            </span>

            <span className={cx('flex flex-col', i < steps.length - 1 && 'pb-2.5')}>
              <span
                className={cx(
                  'text-[11px] font-semibold leading-tight',
                  step.done ? 'text-ink' : 'text-blue-600',
                )}
              >
                {step.label}
              </span>
              <span className="text-[9.5px] leading-tight text-ink-body">{step.meta}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="flex flex-none items-center gap-2 border-t border-line px-3.5 py-2">
        <span className="text-[9.5px] font-medium text-ink-body">3 systems connected</span>
        <span className="ml-auto flex items-center gap-1" aria-hidden="true">
          {(['cart', 'receipt', 'mail'] as const).map((icon) => (
            <span
              key={icon}
              className="grid size-4 place-items-center rounded-[5px] bg-band text-ink-body"
            >
              <Icon name={icon} size={9} />
            </span>
          ))}
        </span>
      </div>
    </Screen>
  );
}

/** 2: Digital FTE. An identity, not a task trace. A day's work counted, then
 *  what the persona was actually built from. */
function DigitalFteScreen() {
  const counters = [
    { value: '12', label: 'Replied' },
    { value: '3', label: 'Drafted' },
    { value: '1', label: 'Escalated' },
  ];
  const trained = [
    'Their own replies and tone',
    'The calls they make on their own',
    'Where they escalate, and to whom',
  ];

  return (
    <Screen>
      <WindowBar icon="users" title="Coach’s Digital FTE" status="On shift" />

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-2 p-3">
        <div className="grid grid-cols-3 gap-2">
          {counters.map((counter) => (
            <div key={counter.label} className="rounded-md bg-band px-2 py-1.5">
              <span className="block font-display text-[16px] font-extrabold leading-none tabular text-blue-600">
                {counter.value}
              </span>
              <span className="mt-0.5 block text-[8.5px] font-medium leading-tight text-ink-body">
                {counter.label}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-md border border-line p-2">
          <span className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-blue-600">
            Modelled on
          </span>
          <ul className="mt-1 flex flex-col gap-1">
            {trained.map((line) => (
              <li key={line} className="flex items-center gap-1.5">
                <Icon name="check" size={10} className="flex-none text-blue-600" />
                <span className="text-[10px] font-medium leading-tight text-ink">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Screen>
  );
}

/** 3: Workflow automation. A builder canvas: the handoffs that used to be
 *  manual, drawn as the steps they became. */
function AutomationScreen() {
  const nodes: { icon: IconName; label: string; tag: string }[] = [
    { icon: 'cart', label: 'Order placed', tag: 'Trigger' },
    { icon: 'receipt', label: 'Invoice raised', tag: 'Ledger' },
    { icon: 'chat', label: 'Customer notified', tag: 'WhatsApp' },
  ];

  return (
    <Screen>
      <WindowBar icon="workflow" title="Order to invoice" status="Auto" />

      <div className="flex min-h-0 flex-1 flex-col justify-center px-3.5 py-2.5">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex flex-col">
            <div className="flex items-center gap-2 rounded-md border border-line bg-white px-2 py-1.5 shadow-[0_4px_10px_-6px_rgb(4_17_52_/_0.35)]">
              <span className="grid size-5 flex-none place-items-center rounded-[5px] bg-blue-50 text-blue-600">
                <Icon name={node.icon} size={10} />
              </span>
              <span className="text-[10.5px] font-semibold text-ink">{node.label}</span>
              <span className="ml-auto rounded-pill bg-band px-1.5 py-0.5 text-[8.5px] font-semibold text-ink-body">
                {node.tag}
              </span>
            </div>

            {/* The connector is drawn on the node's own icon axis: 10px of
                padding plus half of a 24px tile. Anything centred on the box
                instead lands between two nodes that are not centred on it. */}
            {i < nodes.length - 1 && (
              <span
                className="ml-[1.125rem] h-2.5 w-0.5 rounded-pill bg-blue-200"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-none items-center gap-2 border-t border-line px-3.5 py-2">
        <Icon name="check" size={10} className="flex-none text-blue-600" />
        <span className="text-[9.5px] font-medium text-ink-body">
          Runs on every order, reports itself
        </span>
      </div>
    </Screen>
  );
}

/** 4: AI chatbots. A real exchange, no faces: the site does not fabricate
 *  people any more than it fabricates numbers. */
function ChatScreen() {
  return (
    <Screen>
      <WindowBar icon="whatsapp" title="Support" status="Online" />

      {/* Centred rather than bottom-aligned. A thread pinned to the input bar
          leaves the top third of the pane empty, which on a card this size
          reads as a rendering fault rather than as an empty conversation. */}
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-1.5 bg-band px-3 py-2.5">
        <span className="max-w-[80%] self-start rounded-lg rounded-bl-sm bg-white px-2.5 py-1.5 text-[10.5px] font-medium text-ink shadow-[0_2px_6px_-2px_rgb(4_17_52_/_0.25)]">
          Where is order 4471?
        </span>
        <span className="max-w-[85%] self-end rounded-lg rounded-br-sm bg-blue-600 px-2.5 py-1.5 text-[10.5px] font-medium text-white">
          Out for delivery, arriving today
        </span>
        <span className="max-w-[80%] self-start rounded-lg rounded-bl-sm bg-white px-2.5 py-1.5 text-[10.5px] font-medium text-ink shadow-[0_2px_6px_-2px_rgb(4_17_52_/_0.25)]">
          Can I change the address?
        </span>
        <span
          className="flex items-center gap-1 self-end rounded-lg rounded-br-sm bg-blue-600 px-2.5 py-1.5"
          aria-hidden="true"
        >
          <span className="size-1 animate-pulse rounded-full bg-white/90" />
          <span className="size-1 animate-pulse rounded-full bg-white/60" />
          <span className="size-1 animate-pulse rounded-full bg-white/40" />
        </span>
      </div>

      <div className="flex flex-none items-center gap-2 border-t border-line px-3 py-2">
        <span className="flex-1 rounded-pill bg-band px-2.5 py-1 text-[10px] text-ink-body">
          Message
        </span>
        <span className="grid size-6 flex-none place-items-center rounded-full bg-blue-600 text-white">
          <Icon name="arrow-right" size={11} />
        </span>
      </div>
    </Screen>
  );
}

/** 5: Mobile applications. A device on a shelf rather than a window: a phone
 *  with a real screen on it, and two of the app's own surfaces floating beside
 *  it at the scale they would be inside it. */
function MobileScreen() {
  const bars = [42, 68, 52, 84, 61, 38];

  return (
    <Screen>
      <div className="relative h-full bg-band">
        {/* The phone. Positioned in percentages of the pane, not of the card,
            so it holds its proportions at every column width. */}
        <div className="absolute bottom-[5%] left-[6%] top-[5%] w-[36%] rounded-[1.15rem] bg-blue-900 p-[3px] shadow-[0_18px_30px_-12px_rgb(4_17_52_/_0.55)]">
          <div className="flex h-full flex-col overflow-hidden rounded-[0.95rem] bg-white">
            <div className="flex flex-none items-center justify-between px-2 pt-1.5">
              <span className="text-[6.5px] font-bold tabular text-ink">9:41</span>
              <span className="flex items-center gap-[2px]" aria-hidden="true">
                <span className="h-1 w-1.5 rounded-[1px] bg-ink" />
                <span className="h-1 w-2 rounded-[1px] border border-ink" />
              </span>
            </div>

            <div className="mt-1.5 flex flex-none items-center gap-1.5 px-2">
              <GradientChip className="size-4 rounded-[5px]">
                <Icon name="sparkles" size={9} />
              </GradientChip>
              <span className="flex-1 text-[7.5px] font-bold text-ink">Coach</span>
              <GradientChip className="size-4 rounded-full text-[5.5px] font-bold">AK</GradientChip>
            </div>

            <div className="mx-2 mt-1.5 flex-none rounded-md bg-blue-600 px-2 py-1.5">
              <span className="block font-display text-[12px] font-extrabold leading-none tabular text-white">
                24
              </span>
              <span className="mt-0.5 block text-[6px] font-medium text-blue-100">
                Active clients
              </span>
            </div>

            <div className="mt-1.5 flex h-4 flex-none items-end gap-[3px] px-2" aria-hidden="true">
              {bars.map((height, i) => (
                <span
                  key={i}
                  className={cx('flex-1 rounded-t-[1px]', i === 3 ? 'bg-blue-600' : 'bg-blue-100')}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            {/* Two session rows, so the tab bar sits under content rather than
                under a hole. Initials, not faces: the site does not invent
                people to put in its own mockups. */}
            <div className="mt-2 flex flex-col gap-1 px-2">
              <div className="flex items-center gap-1.5 rounded-md bg-blue-50 px-1.5 py-1">
                <GradientChip className="size-3.5 rounded-full text-[5px] font-bold">
                  JM
                </GradientChip>
                <span className="flex-1">
                  <span className="block h-1 w-[70%] rounded-pill bg-blue-200" aria-hidden="true" />
                  <span
                    className="mt-[3px] block h-[3px] w-[45%] rounded-pill bg-blue-100"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-md px-1.5 py-1">
                <span
                  className="grid size-3.5 flex-none place-items-center rounded-full bg-silver-300 text-[5px] font-bold text-white"
                  aria-hidden="true"
                >
                  RS
                </span>
                <span className="flex-1">
                  <span
                    className="block h-1 w-[58%] rounded-pill bg-silver-300"
                    aria-hidden="true"
                  />
                  <span
                    className="mt-[3px] block h-[3px] w-[38%] rounded-pill bg-silver-200"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>

            <div className="mt-auto flex flex-none items-center justify-around border-t border-line py-1.5">
              <span className="grid size-4 place-items-center rounded-full bg-blue-600 text-white">
                <Icon name="chart" size={9} />
              </span>
              <Icon name="chat" size={10} className="text-ink-body" />
              <Icon name="users" size={10} className="text-ink-body" />
            </div>
          </div>
        </div>

        {/* Two of the app's own surfaces, lifted off the shelf. */}
        <div className="absolute right-[7%] top-1/2 flex w-[47%] -translate-y-1/2 flex-col gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-[0_10px_22px_-10px_rgb(4_17_52_/_0.45)]">
            <span className="grid size-6 flex-none place-items-center rounded-md bg-blue-50 text-blue-600">
              <Icon name="clock" size={12} />
            </span>
            <span className="flex flex-col">
              <span className="text-[10px] font-bold leading-tight text-ink">New booking</span>
              <span className="text-[8.5px] leading-tight text-ink-body">Today, 4:30pm</span>
            </span>
          </div>

          <div className="rounded-lg bg-white p-2 shadow-[0_10px_22px_-10px_rgb(4_17_52_/_0.45)]">
            <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-blue-600">
              One codebase
            </span>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="flex items-center gap-1 rounded-pill bg-band px-1.5 py-0.5 text-[8.5px] font-semibold text-ink">
                <Icon name="phone" size={9} className="text-blue-600" />
                iOS
              </span>
              <span className="flex items-center gap-1 rounded-pill bg-band px-1.5 py-0.5 text-[8.5px] font-semibold text-ink">
                <Icon name="phone" size={9} className="text-blue-600" />
                Android
              </span>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

/** 6: Full-stack web development. A browser rather than an app window, and a
 *  page inside it with the parts a real one has: nav, hero, two calls to
 *  action, a feature row. */
function WebScreen() {
  return (
    <Screen>
      {/* Browser chrome, in place of the window bar the app screens carry. */}
      <div className="flex flex-none items-center gap-1.5 border-b border-line bg-band px-3 py-2">
        <span className="size-1.5 rounded-full bg-silver-300" aria-hidden="true" />
        <span className="size-1.5 rounded-full bg-silver-300" aria-hidden="true" />
        <span className="size-1.5 rounded-full bg-silver-300" aria-hidden="true" />
        <span className="ml-1.5 flex flex-1 items-center gap-1.5 rounded-pill bg-white px-2 py-0.5">
          <Icon name="shield" size={8} className="flex-none text-blue-600" />
          <span className="h-[3px] w-12 rounded-pill bg-silver-200" aria-hidden="true" />
        </span>
      </div>

      {/* Set as a page with real words rather than as grey bars. A wireframe
          says "a layout exists"; a page with type on it says "a site shipped",
          which is the claim the card underneath is actually making. */}
      <div className="flex min-h-0 flex-1 flex-col px-3 py-2.5">
        {/* Nav */}
        <div className="flex flex-none items-center gap-2 border-b border-line pb-2">
          <GradientChip className="size-3.5 rounded-[4px]" />
          <span className="text-[7px] font-semibold text-ink">Work</span>
          <span className="text-[7px] font-semibold text-ink-body">Services</span>
          <span className="text-[7px] font-semibold text-ink-body">About</span>
          <span className="ml-auto rounded-pill bg-blue-600 px-1.5 py-[3px] text-[7px] font-bold text-white">
            Get a quote
          </span>
        </div>

        {/* Hero */}
        <div className="mt-2 flex flex-1 flex-col justify-center">
          <span className="block font-display text-[13px] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink">
            Built to load fast
            <br />
            and <span className="text-blue-600">convert</span>.
          </span>
          <span className="mt-1 block text-[7px] leading-snug text-ink-body">
            Frontend, backend and the infrastructure under both.
          </span>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="rounded-[5px] bg-blue-600 px-2 py-1 text-[7px] font-bold text-white">
              Start a project
            </span>
            <span className="rounded-[5px] border border-line px-2 py-1 text-[7px] font-bold text-ink">
              See the work
            </span>
          </div>
        </div>

        {/* Feature row */}
        <div className="mt-2 flex flex-none gap-1.5 border-t border-line pt-2">
          {(
            [
              { icon: 'code', label: 'Typed' },
              { icon: 'chart', label: 'Measured' },
              { icon: 'shield', label: 'Hardened' },
            ] as const
          ).map((feature) => (
            <div key={feature.label} className="flex-1 rounded-md bg-band p-1.5">
              <span className="grid size-4 place-items-center rounded-[5px] bg-white text-blue-600 shadow-[0_2px_6px_-2px_rgb(4_17_52_/_0.3)]">
                <Icon name={feature.icon} size={9} />
              </span>
              <span className="mt-1 block text-[7px] font-semibold leading-tight text-ink">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

const SCREENS: Record<string, () => ReactNode> = {
  'agentic-ai-development': AgentScreen,
  'digital-fte': DigitalFteScreen,
  'workflow-automation': AutomationScreen,
  'chatbot-development': ChatScreen,
  'app-development': MobileScreen,
  'web-development': WebScreen,
};

export function SoftwareShowcase() {
  return (
    <Section id="software-ai" band>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Software & AI"
            lines={['What we build,']}
            accent="and what it does in production"
          />
        </Reveal>

        {/* Capped a step in from the container. Three cards across the full
            1,280px came out at coverflow width, which is right for a card that
            is the only thing on screen and too heavy for six of them in a
            grid: the row read as a wall. This is the same composition one
            notch down.

            <LiquidLens> wraps the grid rather than each card: one pointer
            listener for the whole section, and the six cards inside it stay
            Server Components. See the component for the physics, and for why
            everything it writes goes on one card and never on this wrapper. */}
        <LiquidLens className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOFTWARE_SHOWCASE.map((item, i) => {
            const service = getService(item.slug);
            const ScreenGraphic = SCREENS[item.slug];
            if (!service || !ScreenGraphic) return null;

            return (
              <Reveal key={item.slug} index={i}>
                <Link
                  href={serviceHref(service)}
                  // `data-glass` is what LiquidLens's `closest()` looks for.
                  // An attribute rather than the class, because the class names
                  // a MATERIAL and this names the thing the pointer lights,
                  // and a future card made of the same material should not
                  // silently join a listener it was never wired into.
                  data-glass
                  className="u-glass u-glass--card u-glass--white u-glass-interactive u-showcase-card group flex h-full flex-col p-4 sm:p-[1.125rem]"
                >
                  {/* The drop the pointer drags across the card, and the well
                      that clips it to the card's own radius. Both inert markup:
                      LiquidLens writes a transform and an opacity onto the
                      inner span and nothing else in this tree is client code.
                      `z-index: 2` on the well in globals.css, because a drop on
                      the surface of a card is over the screen and over the copy,
                      not under them, and that clip is also what lets one drop
                      cross from card to card without either end showing a seam. */}
                  <span className="u-lens-well" aria-hidden="true">
                    <span className="u-lens" />
                  </span>

                  <div className="u-showcase-screen">
                    <ScreenGraphic />
                  </div>

                  {/* Title and badge, the sentence, Explore. The numeral and
                      the dotted highlights the coverflow carries are the right
                      rhythm for a card with nothing else on it; under a screen
                      that is already doing the explaining they were just more
                      text competing with it. */}
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <h3 className="font-display text-[1.0625rem] font-bold leading-tight text-ink">
                      {item.title}
                    </h3>
                    {/* Blue, where every other badge on the site is chrome.
                        The chrome sphere is a white ball with a silver rim and
                        it is meant to be read against colour: on this card's
                        white body it is a smudge, and the one mark that names
                        the service disappears. Blue is the same sphere lit the
                        same way, and it is the accent the card otherwise only
                        has at its edges. */}
                    <IconBadge
                      icon={service.icon}
                      variant="blue"
                      size="xs"
                      className="u-showcase-badge flex-none"
                    />
                  </div>

                  <p className="mt-2 line-clamp-3 text-[12.5px] leading-[1.5] text-ink-body">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-4">
                    <span className="relative flex items-center gap-2 pt-3.5 font-display text-[12.5px] font-bold text-ink">
                      {/* The rule over "Explore" draws in from the left on
                          hover instead of sitting there as a border. It is the
                          same gesture as `.u-rule` under every heading on the
                          site, at card scale, and it is the one mark on the
                          card that says the whole thing is a link. */}
                      <span className="u-showcase-rule" aria-hidden="true" />
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
        </LiquidLens>

        <Reveal index={5}>
          {/* Blue, because it is the only button in the section and therefore
              its primary action. Chrome is for the SECOND button beside a blue
              one (the hero, WhyUs, the CTA band all pair them that way); a lone
              chrome button is a section whose one call to action is dressed as
              the alternative to something that is not there. */}
          <div className="mt-14 flex justify-center lg:mt-16">
            <Button href={pillarHref('software-ai')}>
              View every software &amp; AI service
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
