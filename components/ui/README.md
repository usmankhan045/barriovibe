# `components/ui/` — the swappable zone

Everything in this folder is a **slot**. The client is supplying their own
navbar, buttons, scroll animation and other components, and these will be
replaced by them.

Everything in `components/sections/` is **composition** — page structure that
consumes these slots. It is not replaced.

## Three rules that make the swap painless

### 1. Tokens, never literals

No component in this codebase contains a hex value. Colors, shadows,
gradients, radii and easing all come from `var(--…)` declared in
[`app/tokens.css`](../../app/tokens.css). `pnpm check:tokens` fails the build
if a raw hex appears anywhere else.

**What this means for a dropped-in component:** point its colors at the same
variables and it inherits the exact brand automatically — including the two
frozen brand colors — with no hunting through the file for hardcoded values.

The glossy surfaces are already available as plain CSS classes in
`app/globals.css`, so an incoming component can adopt the exact brand look
without re-deriving anything:

| Class | What it gives you |
|---|---|
| `u-btn` + `u-btn--blue` | The glossy blue pill: gradient, inset top highlight, blue-tinted drop shadow |
| `u-btn` + `u-btn--chrome` | The chrome pill, terminating on Metallic Silver |
| `u-tile` / `u-tile-interactive` | White card with hairline border, ambient shadow, hover lift |
| `u-badge` + `u-badge--blue` / `--chrome` | Glossy circular icon badge |
| `u-eyebrow` / `u-rule` | The uppercase blue label and the 40×3 rule under headings |
| `u-glass` (+ `u-glass--pill`) | **Liquid Glass. Navigation layer only** — see below |

### Liquid Glass is not a card style

`u-glass` is on three elements: the nav pill, the mega-menu panel and the
mobile menu button. Things that float above the page while real content
scrolls underneath them. **Do not put it on a card.**

That was tried — every `u-tile`, every bento card, every badge — and it failed
twice over. It was heavy: two `backdrop-filter` passes per card came to well
over a hundred filtered layers on the home page, and a backdrop filter is
re-computed on every frame it is on screen, so the whole cost lands on
scrolling. And it was not Liquid Glass, it was **glassmorphism** — a
translucent frosted panel with a bright border, applied to everything.

The two get conflated constantly and are opposites where it counts: frosted
glass scatters light and hides what is behind it; Liquid Glass bends light and
reveals it. Bending needs something to bend. On a `#fefefe` canvas there is
nothing behind a card, and the giveaway was that the effect needed a fabricated
ambient light field painted across the whole page to have anything to refract.
Inventing the content that glass exists to reveal is the placement being wrong,
restated. Apple's HIG says both of these things directly — glass belongs in the
navigation layer, and glass never stacks on glass.

The full construction and the reasoning behind every number is commented in
[`app/globals.css`](../../app/globals.css) under `LIQUID GLASS`; its parameters
are in [`app/tokens.css`](../../app/tokens.css).

Two things to know before touching it:

1. **`--glass-range` and `--glass-fill-edge` on `.u-glass--pill` are
   accessibility values.** The pill flies over the dark feature card while
   carrying link text; at their defaults that measured 3.01:1. They are tuned
   against screenshots, not arithmetic. Re-measure mid-scroll over the darkest
   thing on the site before changing either.
2. **Do not stack glass on glass.** Elements sitting *on* a glass surface use
   plain fills, as the mega-menu sidebar does.

### 2. Prop contracts are fixed up front

Each slot's interface lives in [`contracts.ts`](./contracts.ts) and is
documented there. Pages import from `@/components/ui/<Name>` and never from
`components/provided/`, so an incoming component with a different API is
absorbed by a thin adapter in one file rather than rippling through the site.

### 3. `/dev/kitchen-sink` shows every state at once

Every slot, every variant, every state, on one page. Drop a component in, load
one URL, and see immediately whether it works everywhere it is used.

The route is `noindex` and excluded from the sitemap.

## Handover checklist for an incoming component

1. Drop the original files into `components/provided/<name>/` untouched.
2. Write or update the adapter at `components/ui/<Name>.tsx` so it satisfies
   the interface in `contracts.ts`.
3. Replace any hardcoded colors with the matching `var(--color-…)` token.
4. Load `/dev/kitchen-sink` and check every variant renders.
5. Run `pnpm verify` — this catches raw hex, type errors and lint issues.
6. If the component ships client JS, re-check the bundle: `pnpm build` prints
   First Load JS per route, and the budget for `/` is 90KB.

## Accessibility floor

Whatever replaces these must keep:

- A visible focus ring (`:focus-visible`, 2px `--color-blue-600`, 2px offset)
- Real semantics — `<button>` for actions, `<a>` for navigation
- `prefers-reduced-motion` honoured for anything animated
- **`prefers-reduced-transparency` and `prefers-contrast` honoured for anything
  glass.** These are Apple's own two accessibility modifiers for this material
  and both are implemented at the bottom of `globals.css`: the first drops the
  material to the solid surface the site used before it existed, the second
  adds a contrasting border on top of that. A dropped-in glass component that
  ignores them will stay translucent for exactly the users who asked it not to.
- **Metallic Silver (`--color-silver-400`) never used for text.** It is
  1.60:1 on white. It is a material for gradients, borders and 3D surfaces.
  Text uses `--color-ink-body` (5.01:1) or darker.
