import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Rule,
  Lead,
  Chip,
  DotList,
  ArrowLink,
  ChessArt,
  IconWatermark,
  Breadcrumb,
} from '@/components/primitives';
import { Button } from '@/components/ui/Button';
import { Tile } from '@/components/ui/Tile';
import { IconBadge } from '@/components/ui/IconBadge';
import { Marquee } from '@/components/ui/Marquee';
import { Coverflow } from '@/components/ui/Coverflow';
import { DisplayCards } from '@/components/ui/DisplayCards';
import { Timeline } from '@/components/ui/Timeline';
import { Field, SelectField, TextareaField } from '@/components/ui/Field';
import { FaqAccordion } from '@/components/sections/FaqList';
import { Icon, ICON_NAMES } from '@/components/icons';
import { ART } from '@/lib/art';
import { TOKENS } from '@/lib/tokens';
import Link from 'next/link';
import { PILLARS } from '@/content/pillars';
import { DIFFERENTIATORS, PROCESS } from '@/content/differentiators';
import { pillarHref } from '@/content/services';
import { pageMetadata } from '@/lib/seo';
import type { ButtonVariant, ButtonSize, TimelineStep } from '@/components/ui/contracts';

/**
 * Component gallery — every swappable slot, in every variant and state, on one
 * screen.
 *
 * This is the handover surface. When the client sends their navbar, buttons or
 * scroll animation, the workflow is: drop the files into components/provided/,
 * adapt them in components/ui/, load this page, and confirm every variant still
 * renders. Without it, verifying a component swap means clicking through 35
 * pages hunting for the one place a variant is used.
 *
 * noindex, excluded from the sitemap, and disallowed in robots.txt.
 */
export const metadata = pageMetadata({
  title: 'Kitchen Sink',
  description: 'Internal component gallery.',
  path: '/dev/kitchen-sink',
  noIndex: true,
});

/** Mirrors the mapping in components/sections/Process.tsx. */
const KITCHEN_SINK_ART = ['discover', 'scope', 'execute', 'report'] as const;
const KITCHEN_SINK_STEPS: TimelineStep[] = PROCESS.map((step, i) => ({
  ...step,
  art: KITCHEN_SINK_ART[i] ?? 'discover',
}));

const BUTTON_VARIANTS: ButtonVariant[] = ['blue', 'chrome'];
const BUTTON_SIZES: ButtonSize[] = ['sm', 'md', 'lg'];

function Row({
  title,
  note,
  children,
  dark = false,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="font-display text-h3 text-ink">{title}</h2>
      {note && <p className="mt-2 max-w-[70ch] text-[14.5px] text-ink-body">{note}</p>}
      <div
        className={
          dark
            ? 'u-cta-band mt-7 flex flex-wrap items-center gap-4 rounded-tile p-7'
            : 'mt-7 flex flex-wrap items-start gap-4'
        }
      >
        {children}
      </div>
    </section>
  );
}

export default function KitchenSinkPage() {
  return (
    <main id="main" tabIndex={-1}>
      <Section tight>
        <Container>
          <Eyebrow>Internal</Eyebrow>
          <h1 className="mt-4 text-h1 text-ink">Kitchen sink</h1>
          <Lead className="mt-5">
            Every UI slot in every variant. Drop a replacement component into
            <code className="mx-1 rounded bg-silver-100 px-1.5 py-0.5 text-[14px]">
              components/ui/
            </code>
            and check this page before touching anything else.
          </Lead>

          {/* ── Brand colors ────────────────────────────────────────── */}
          <Row
            title="Brand colors"
            note="The two frozen values are marked. pnpm check:tokens fails the build if either drifts, or if any hex appears outside app/tokens.css."
          >
            {[
              // Read from the mirror, never retyped — `pnpm check:tokens`
              // rejects a raw hex here, which is exactly the point.
              { name: 'Chess Blue', token: 'blue-600', hex: TOKENS.blue600.toUpperCase(), cls: 'bg-blue-600', frozen: true },
              { name: 'Metallic Silver', token: 'silver-400', hex: TOKENS.silver400.toUpperCase(), cls: 'bg-silver-400', frozen: true },
              { name: 'Ink', token: 'silver-900', hex: '-', cls: 'bg-silver-900' },
              { name: 'Body', token: 'silver-700', hex: '-', cls: 'bg-silver-700' },
              { name: 'Line', token: 'silver-200', hex: '-', cls: 'bg-silver-200' },
              { name: 'Canvas', token: 'canvas', hex: '-', cls: 'bg-canvas' },
            ].map((swatch) => (
              <div key={swatch.token} className="w-44">
                <div
                  className={`h-24 rounded-tile border border-line ${swatch.cls}`}
                  aria-hidden="true"
                />
                <p className="mt-2.5 font-display text-[14px] font-bold text-ink">
                  {swatch.name}
                  {swatch.frozen && <span className="ml-1.5 text-blue-600">★</span>}
                </p>
                <p className="text-[12.5px] text-ink-body">
                  --color-{swatch.token}
                  {swatch.frozen && ` · ${swatch.hex}`}
                </p>
              </div>
            ))}
          </Row>

          {/* ── Gradients ───────────────────────────────────────────── */}
          <Row
            title="Brand surfaces"
            note="The premium read is one recipe: gradient + inset white top-highlight + a drop shadow tinted with the brand blue, never neutral black. Available as .u-btn--blue / .u-btn--chrome so an incoming component adopts it with one class."
          >
            {[
              { label: '--grad-blue', style: 'var(--grad-blue)' },
              { label: '--grad-chrome', style: 'var(--grad-chrome)' },
              { label: '--grad-badge-blue', style: 'var(--grad-badge-blue)' },
              { label: '--grad-badge-chrome', style: 'var(--grad-badge-chrome)' },
              { label: '--grad-cta', style: 'var(--grad-cta)' },
            ].map((gradient) => (
              <div key={gradient.label} className="w-44">
                <div
                  className="h-24 rounded-tile border border-line"
                  style={{ backgroundImage: gradient.style }}
                  aria-hidden="true"
                />
                <p className="mt-2.5 text-[12.5px] text-ink-body">{gradient.label}</p>
              </div>
            ))}
          </Row>

          {/* ── Type scale ──────────────────────────────────────────── */}
          <Row title="Type scale" note="Satoshi for display, Inter for body. Both self-hosted variable fonts.">
            <div className="flex w-full flex-col gap-5">
              <p className="text-display text-ink">Display · Books balanced.</p>
              <p className="text-h1 text-ink">H1 · Growth engineered.</p>
              <p className="text-h2 text-ink">H2 · One agency. Five disciplines.</p>
              <p className="text-h3 text-ink">H3 · What&rsquo;s included</p>
              <Eyebrow>Eyebrow · Finance · Compliance · Commerce</Eyebrow>
              <p className="text-body-lg text-ink-body">Body large · 18px, the lead paragraph size.</p>
              <p className="text-body text-ink-body">Body · 16px, the default reading size.</p>
              <p className="text-caption text-ink-body">Caption · 14px, for metadata.</p>
              <p className="font-display text-stat tabular text-blue-600">Stat · 98%</p>
              <p className="font-display text-ghost text-ink-ghost">Ghost numeral · 01</p>
            </div>
          </Row>

          {/* ── Buttons ─────────────────────────────────────────────── */}
          <Row title="Button variants" note="SLOT. Server Component, zero client JS. Hover and gloss are both CSS. Two variants only; see contracts.ts.">
            {BUTTON_VARIANTS.map((variant) => (
              <Button key={variant} href="#" variant={variant}>
                {variant}
              </Button>
            ))}
          </Row>

          <Row title="Button on dark" note="The same two pills. The band carries no button colour of its own." dark>
            <Button href="#">blue</Button>
            <Button href="#" variant="chrome">
              chrome
            </Button>
          </Row>

          <Row title="Button sizes and states">
            {BUTTON_SIZES.map((size) => (
              <Button key={size} href="#" size={size}>
                size {size}
              </Button>
            ))}
            <Button>plain button</Button>
            <Button disabled>disabled</Button>
            <Button href="https://example.com">external link</Button>
          </Row>

          {/* ── Tiles ───────────────────────────────────────────────── */}
          <Row title="Tile" note="SLOT. Separates from the canvas by border + shadow, not fill: canvas and surface are nearly the same colour by design.">
            <Tile className="w-72 p-6">
              <p className="font-display text-[15px] font-bold text-ink">Static tile</p>
              <p className="mt-2 text-[14px] text-ink-body">No hover treatment.</p>
            </Tile>
            <Tile href="#" className="w-72 p-6">
              <p className="font-display text-[15px] font-bold text-ink">Interactive tile</p>
              <p className="mt-2 text-[14px] text-ink-body">Lifts 4px and blooms its shadow on hover.</p>
            </Tile>
          </Row>

          {/* ── Deck ────────────────────────────────────────────────── */}
          <Row
            title="DisplayCards"
            note="SLOT. Zero client JS. The rake is one --i per card and a CSS transform reading it. Narrow the window below 64rem, or load this on a touch device, and the same markup is a plain card grid: the stack hides five of six cards behind the sixth, and it only ships where hover exists to give them back. Tab through it: focus does what hover does."
          >
            <div className="w-full">
              <DisplayCards cards={DIFFERENTIATORS} label="Kitchen sink deck" />
            </div>
          </Row>

          {/* ── Timeline ────────────────────────────────────────────── */}
          <Row
            title="Timeline"
            note="SLOT. Server Component. The four photographs and all the copy are server-rendered; the only client JS is PointerTilt, one pointermove listener writing two custom properties. Below 64rem, or on any device without a fine pointer, the rail moves to the left, the cards go full width and every description is visible: the hover-to-open state only ships where a hover exists to open it."
          >
            <div className="w-full">
              <Timeline steps={KITCHEN_SINK_STEPS} label="Kitchen sink timeline" />
            </div>
          </Row>

          {/* ── Badges ──────────────────────────────────────────────── */}
          <Row title="IconBadge" note="SLOT. The site uses chrome everywhere; blue stays part of the contract but nothing in content/ selects it.">
            {(['blue', 'chrome'] as const).map((variant) =>
              (['sm', 'md', 'lg'] as const).map((size) => (
                <div key={`${variant}-${size}`} className="flex flex-col items-center gap-2">
                  <IconBadge icon="shield" variant={variant} size={size} />
                  <span className="text-[12px] text-ink-body">
                    {variant}/{size}
                  </span>
                </div>
              )),
            )}
          </Row>

          {/* ── Icons ───────────────────────────────────────────────── */}
          <Row
            title={`Icons (${ICON_NAMES.length})`}
            note="Hand-drawn inline SVG. No icon library, since a package would ship 1,400 icons to serve these."
          >
            <div className="grid w-full grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-9">
              {ICON_NAMES.map((name) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-2 rounded-chip border border-line bg-surface p-3"
                >
                  <Icon name={name} size={22} className="text-ink-strong" />
                  <span className="text-center text-[10.5px] leading-tight text-ink-body">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </Row>

          {/* ── Typographic primitives ──────────────────────────────── */}
          <Row title="SectionHeading" note="The signature pattern: last line in brand blue, always ending in a period, with a 40×3 rule beneath. Encoded once so it cannot drift across 36 pages.">
            <SectionHeading
              eyebrow="Eyebrow text"
              lines={['One agency.', 'Five']}
              accent="disciplines"
            />
          </Row>

          <Row title="Chips, rules, dot lists, arrow links">
            <div className="flex w-full flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                <Chip>silver chip</Chip>
                <Chip variant="blue">blue chip</Chip>
                <Chip>
                  <Icon name="clock" size={13} className="mr-1.5 text-ink-body" />
                  with icon
                </Chip>
              </div>
              <Rule />
              <DotList items={['Accounting', 'Bookkeeping', 'Income Tax', 'Sales Tax']} />
              <ArrowLink href="#">Arrow link</ArrowLink>
              <Breadcrumb
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Services', href: '/services' },
                  { label: 'Current page', href: '#' },
                ]}
              />
            </div>
          </Row>

          {/* ── Form fields ─────────────────────────────────────────── */}
          <Row title="Form fields" note="SLOT. Errors are wired through aria-invalid and aria-describedby, because the red border alone is invisible to assistive tech.">
            <div className="grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
              <Field name="ks-name" label="Text field" required placeholder="Placeholder" />
              <Field name="ks-optional" label="Optional field" placeholder="Not required" />
              <Field
                name="ks-error"
                label="With error"
                required
                error="That does not look like a valid email address."
              />
              <Field name="ks-hint" label="With hint" hint="A range is fine." />
              <SelectField
                name="ks-select"
                label="Select"
                placeholder="Choose one"
                options={[
                  { value: 'a', label: 'Option A' },
                  { value: 'b', label: 'Option B' },
                ]}
              />
              <div className="sm:col-span-2">
                <TextareaField name="ks-textarea" label="Textarea" required rows={4} />
              </div>
            </div>
          </Row>

          {/* ── Accordion ───────────────────────────────────────────── */}
          <Row title="FAQ accordion" note="Native <details>/<summary>. Zero JavaScript: the browser handles state, keyboard operation and screen-reader announcement correctly and for free.">
            <div className="w-full max-w-2xl">
              <FaqAccordion
                faqs={[
                  { question: 'Is this a real question?', answer: 'It is an example answer, used to check the open state renders correctly.' },
                  { question: 'And a second one?', answer: 'Yes, so the closed state is visible alongside the open one.' },
                ]}
              />
            </div>
          </Row>


          {/* ── Marquee ─────────────────────────────────────────────── */}
          <Row
            title="Coverflow"
            note="SLOT. Drag it, hover a side card to bring it in, or use ← →. The centred card is the only one showing its detail, which is `[data-cf-active]`, flipped by the paint loop and transitioned by CSS. Needs the dark stage behind it: the cards are `.u-glass`, and glass with nothing behind it is glassmorphism. Flattens to a plain row under prefers-reduced-motion and below 48rem."
          >
            <div className="u-stage w-full overflow-hidden rounded-tile-lg py-6">
              <IconWatermark className="u-stage-field" />
              <Coverflow
                label="Kitchen sink coverflow"
                slides={PILLARS.map((pillar) => ({
                  id: pillar.slug,
                  label: pillar.title,
                  card: (
                    <Link href={pillarHref(pillar.slug)} className="u-cf-card-body">
                      <span className="flex items-center justify-between">
                        <span
                          className="font-display text-ghost tabular text-ink-ghost-on-glass"
                          aria-hidden="true"
                        >
                          {pillar.number}
                        </span>
                        <IconBadge icon={pillar.icon} variant={pillar.badge} size="md" />
                      </span>
                      <span className="u-cf-lede mt-auto block">
                        <span className="block font-display text-h3 text-white">
                          {pillar.title}
                        </span>
                        <DotList items={pillar.highlights} className="mt-2 text-white/80" />
                      </span>
                      <span className="u-cf-detail mt-4 block border-t border-white/15 pt-4">
                        <span className="line-clamp-4 block text-caption leading-relaxed text-white/80">
                          {pillar.blurb}
                        </span>
                      </span>
                    </Link>
                  ),
                }))}
              />
            </div>
          </Row>

          <Row title="Marquee" note="SLOT. Pure CSS keyframes, no JavaScript. Pauses on hover, stops entirely under prefers-reduced-motion.">
            <div className="w-full">
              <Marquee duration={25}>
                {['ALPHA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO', 'FOXTROT'].map((name) => (
                  <span
                    key={name}
                    className="px-10 font-display text-[19px] font-bold text-ink-body"
                  >
                    {name}
                  </span>
                ))}
              </Marquee>
            </div>
          </Row>

          {/* ── Art ─────────────────────────────────────────────────── */}
          <Row title="Chess art" note="Cropped from the client's own mockups by `pnpm art`. Renders keep their white background; the edge-feather mask blends them into the page. See scripts/extract-art.mjs.">
            <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-3">
              {(Object.keys(ART) as (keyof typeof ART)[]).map((name) => (
                <div key={name}>
                  <ChessArt name={name} sizes="30vw" />
                  <p className="mt-2 text-center text-[12.5px] text-ink-body">{name}</p>
                </div>
              ))}
            </div>
          </Row>

          <Row title="Icon watermark" note="Inline SVG, no image request. Sits behind hero art at very low opacity.">
            <div className="relative h-80 w-full max-w-lg overflow-hidden rounded-tile border border-line">
              <IconWatermark />
            </div>
          </Row>
        </Container>
      </Section>
    </main>
  );
}
