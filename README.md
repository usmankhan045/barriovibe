# Agency website

A Next.js 16 / React 19 marketing site for a services agency organised as a
three-level tree: three practices, seven disciplines, thirty-nine services.
The practices are Software & AI, Performance Marketing & E-commerce, and
Corporate & Advisory. The disciplines under them are software and AI, growth
and marketing, e-commerce and marketplaces, finance and tax, corporate and
legal, intellectual property, and international expansion, the last covering
the United States, Saudi Arabia, the UAE and the UK.

Every service has its own page, all generated from a typed content layer in
`content/`. Every page is prerendered to static HTML at build time, 58 routes,
and the only dynamic surface on the whole site is `/api/contact`, which writes
contact-form submissions to Supabase. The design system is locked to two
client-supplied brand colours enforced by a build-time guard, and
`components/ui/` is a deliberately swappable zone so the client's own
components can be dropped in later without touching page composition.

**This site is not finished.** It is structurally complete and technically
sound, but it ships with named placeholders: contact details and case studies.
Supabase is not yet provisioned. See
[Before launch](#before-launch-placeholder-checklist), which is the part of
this document that actually matters for handover.

---

## Quick start

Requires Node 20+ and pnpm 11 (`packageManager` is pinned to `pnpm@11.20.0`).

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

`pnpm install` needs build scripts to run for three packages (`esbuild`,
`unrs-resolver`, `sharp`) — these are already allow-listed in
`pnpm-workspace.yaml`, so no prompt should appear.

Build and run the production output:

```bash
pnpm build
pnpm start
```

Before committing anything, run the full guard suite:

```bash
pnpm verify
```

Optional but useful during development: `/dev/kitchen-sink` renders every
swappable component in every variant and state on one page. It is `noindex`,
excluded from the sitemap, and disallowed in `robots.txt`.

---

## Scripts

Every entry in `package.json`:

| Script | Command | What it does | When to run |
|---|---|---|---|
| `pnpm dev` | `next dev` | Dev server with hot reload. | Always, while working. |
| `pnpm build` | `next build` | Production build. Prerenders 62 static pages (58 HTML routes plus `robots.txt`, `sitemap.xml`, `icon.svg` and the Open Graph image) and prints First Load JS per route. | Before deploying; whenever you want to check the bundle budget. |
| `pnpm start` | `next start` | Serves the production build locally. | To sanity-check the built output, including `/api/contact`. |
| `pnpm lint` | `eslint .` | Flat-config ESLint with `next/core-web-vitals` + `next/typescript`. | Part of `verify`. |
| `pnpm typecheck` | `tsc --noEmit` | Strict TypeScript, including `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`. | Part of `verify`. |
| `pnpm check:tokens` | `node scripts/check-tokens.mjs` | Brand colour guard. Asserts the two frozen hexes are still in `app/tokens.css`, that no raw hex exists anywhere else, and that the two allowed mirrors have not drifted. | Part of `verify`. Run after any styling change. |
| `pnpm check:layout` | `node scripts/check-layout.mjs` | Scans `.tsx` in `app/` and `components/` for `grid` elements with no base `grid-cols-*`, which overflow on mobile. | Part of `verify`. Run after any layout change. |
| `pnpm check:content` | `tsx scripts/check-content.ts` | Content completeness guard. Every service must be fully described, uniquely slugged, cross-linked and reachable from the mega-menu. | Part of `verify`. Run after any `content/` edit. |
| `pnpm verify` | all four checks above | `typecheck && lint && check:tokens && check:layout && check:content`. | Before every commit, and before every deploy. |
| `pnpm art` | `node scripts/extract-art.mjs` | Regenerates the five chess WebP files in `public/art/` from the source mockups in `assets/source/`. Output is committed. | Only when the source mockups change. Not part of the build. |

---

## Before launch: placeholder checklist

Nothing below is a bug. Each is a deliberate placeholder that renders as a
plain hyphen or an obviously blank value rather than a plausible-looking fake,
so an unfinished field is conspicuous on the page instead of quietly shipping a
lie. None of them will block a build, so they have to be worked through by
hand.

Prices and turnaround times are no longer on this list. Both were removed from
the `Service` type outright rather than blanked, on the client's instruction
that the site quotes privately and publishes no figures. See the two notes in
`content/types.ts` for why an empty required field was the wrong way to record
that.

| # | Placeholder | File to edit | If it is not done |
|---|---|---|---|
| 1 | ~~**Agency name**~~ **DONE**: `BarrioVibe` | `content/site.ts` → `BRAND.name`, `BRAND.legalName` | Set. The name reaches the wordmark, every page title, all Open Graph tags, the footer, the legal pages and the JSON-LD from these two constants alone. `legalName` still equals `BRAND.name`: give it the registered entity once one exists. |
| 2 | ~~**Production domain**~~ **DONE**: `https://barriovibe.com` | `content/site.ts` → `BRAND.domain` | Set. Canonical URLs, `sitemap.xml`, `robots.txt` and absolute OG image URLs are all derived from it, so confirm the site is actually served from this host before launch. |
| 3 | **Phone / WhatsApp**, `+92 000 0000000` / `920000000000` | `content/site.ts` → `CONTACT.phone`, `CONTACT.whatsapp` | Every call and WhatsApp CTA is dead. Note `whatsapp` is digits only, no `+` and no spaces, which is what `wa.me` expects. |
| 4 | **Email**, `hello@barriovibe.com` | `content/site.ts` → `CONTACT.email` | Named to match the domain but not yet verified as a live inbox. This address is what the site tells visitors to use when the contact form is down, so it must actually receive mail before launch. |
| 5 | **Office address**, `line1: '-'` | `content/site.ts` → `CONTACT.address` | The contact page shows a bare hyphen where the address should be. |
| 6 | **Social links**, all `href: '#'`, all handles `@` | `content/site.ts` → `SOCIALS` | Footer social links go nowhere. Remove the entries you do not have accounts for rather than leaving `#`. |
| 7 | **Stats**, all four are structural counts rather than performance figures | `content/proof.ts` → `STATS` | Nothing renders wrong today: every figure is true and checkable. But services and disciplines are derived while jurisdictions is typed by hand, so recount that one whenever a jurisdiction is added. Client retention and filings-on-time are the intended replacements for the last two slots. Do not invent numbers. |
| 8 | **Client logos** — empty array, `LOGOS_ENABLED = false` | `content/proof.ts` → `CLIENT_LOGOS` | Nothing renders (correct today). Add real logo files under `public/logos/` and flip the flag when there are clients to name. |
| 9 | **Case studies** — empty array, `CASES_ENABLED = false` | `content/cases.ts` | `/work` renders an honest empty state that explains why there is nothing there yet. This is by design and is safe to launch with. When real engagements land, fill `CASE_STUDIES`, flip the flag, and make sure every metric is one you can evidence if challenged. |
| 10 | **Privacy policy** — a template | `app/privacy/page.tsx` | Legally unreviewed. It accurately describes what the site does today (one contact form, no analytics, no cookies, no third-party fonts or scripts), but it needs a lawyer's sign-off. If analytics or a marketing pixel is ever added, this page must be updated in the same commit. |
| 11 | **Terms of service** — a template | `app/terms/page.tsx` | Legally unreviewed. The ownership clause and the guarantees clause are the two that matter commercially; both are written to match what the service pages promise so the copy and the contract cannot contradict each other. Have both read by a lawyer. |
| 12 | **"Last updated" dates on the legal pages** — `6 August 2026` | `app/privacy/page.tsx`, `app/terms/page.tsx` → `updated` prop | The dates will be stale by launch. Set them to the date of legal sign-off. |
| 13 | **Supabase project** — not provisioned | See [Lead capture setup](#lead-capture-setup) | The contact form returns a 503 with a message telling the visitor to email instead. The migration is written but has not been applied to any project, and no environment variables are set. Nothing is being captured today. |
| 14 | **State colours** — `--color-success` / `--color-danger` marked provisional | `app/tokens.css` | Form validation colours are hue-matched to the brand but are not client-confirmed brand colours. Confirm or replace. |

---

## Design system

### The two frozen colours

```
Chess Blue        #0B2F92
Metallic Silver   #C9CDD3
```

These are the client's exact brand colours, sampled from their own mockups and
confirmed by them. They are **frozen**: do not modify, do not "optimize", do not
regenerate. `pnpm check:tokens` asserts both literals are present verbatim in
`app/tokens.css`, so a refactor, a cleanup or a well-meaning tweak cannot
silently drift them.

They are hand-written rather than generated by the same formula as the rest of
their scales for a specific reason: the HSL round-trip of these two values
produces `#0B2F93` and `#CACED3` — each one digit off. Every *other* step in
both scales is derived at the brand hue and saturation (blue at hue 224 / 86%,
silver at hue 216 / 10%), which is why the whole palette reads as one family and
why the silver reads as a blue-tinted metal rather than a neutral grey sitting
next to a blue. The two hues are 8° apart.

### Metallic Silver is a material, not a text colour

`--color-silver-400` measures **1.60:1 on white**. It is for chrome gradients,
badge fills, borders, dividers and 3D surfaces. It is never a text colour.
Silver-400/500/600 used on text is a build failure in review terms and an
accessibility failure in fact.

Text that needs grey uses `--color-ink-body` (silver-700, 5.01:1) or darker.
There is deliberately **no lighter text tier**: an earlier palette had an
`--color-ink-faint` mapped to silver-600 (2.95:1) and an axe audit failed it on
every page. No value light enough to read as "faint" can pass AA on white *and*
on the section band, so hierarchy below body copy is created with size and
weight instead. Two exceptions exist and are documented in the file:
`--color-ink-decorative` for `aria-hidden` marks nobody has to read, and
`--color-ink-ghost` (silver-550, 3.33:1) for the large decorative section
numerals, which are still visible text and so must clear the 3:1 large-text
threshold. Do not reapply an opacity modifier to the ghost token; that is what
broke it the first time.

### Where tokens live

| File | Role |
|---|---|
| `app/tokens.css` | **The single source of truth.** Colours, type scale, geometry, shadows, gradients, motion, layout metrics. The only file allowed to contain raw hex. Read its comments — every non-obvious value has its reasoning recorded inline. |
| `app/globals.css` | Base styles plus the reusable surface classes (`u-btn`, `u-tile`, `u-badge`, `u-eyebrow`, `u-rule`) that give the glossy "premium" look. Consumes tokens only. |
| `lib/tokens.ts` | A small TypeScript mirror, for the handful of places that cannot read CSS: `viewport.themeColor`, and Open Graph images generated with `next/og` at build time. |
| `app/icon.svg` | The favicon. A standalone file, so it carries its own literals. |

Colours are declared inside Tailwind's `@theme` block with `--color-*: initial`
first, which drops Tailwind's stock palette entirely — if a colour is not
defined in `tokens.css`, it does not exist and cannot be used by accident.

### The guard scripts

**`pnpm check:tokens`** does three things:

1. Asserts `#0B2F92` and `#C9CDD3` are still present in `app/tokens.css`.
2. Walks every `.css`, `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs` and `.svg` file in
   `app/`, `components/`, `content/`, `lib/` and the repo root, and fails on any
   raw hex outside the three allowed files (`app/tokens.css`, `lib/tokens.ts`,
   `app/icon.svg`). `node_modules`, `.next`, `out`, `public`, `assets` and
   `scripts` are skipped, as are comment lines — so documentation and the art
   pipeline may quote hex values freely.
3. Asserts every hex in the two mirrors also exists in `app/tokens.css`, so a
   brand colour change cannot leave a mirror silently stale.

The point is not pedantry. It is what guarantees that a component dropped in
later inherits the exact brand by pointing at the same variables, and what makes
a future palette change a one-file edit rather than a hunt.

**`pnpm check:layout`** catches one specific, invisible bug. A grid written as
`className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]"` has no explicit
`grid-template-columns` below the `lg` breakpoint, so the browser creates one
implicit `auto` column — `minmax(min-content, max-content)` — which grows to its
content's max-content width and overflows instead of wrapping. On this site that
surfaced as the home page laying out 453px wide inside a 342px column on a 390px
viewport, clipping the right edge of every card. `overflow-x: clip` on `<body>`
hid the scrollbar, so it looked fine at a glance and only showed up as missing
content. The fix is always the same: declare a base `grid-cols-1`.

### Fonts

Two self-hosted variable woff2 files, 91KB combined, covering the full 300–900
weight range in one request per family:

| File | Family | Licence |
|---|---|---|
| `app/fonts/Satoshi-Variable.woff2` (43KB) | Satoshi, Indian Type Foundry | ITF Free Font License — free for personal and commercial use |
| `app/fonts/Inter-Variable-latin.woff2` (48KB) | Inter, Rasmus Andersson | SIL Open Font License 1.1 |

Self-hosted rather than `next/font/google`, so the build never depends on a
network fetch and the browser never touches a third-party origin — there is no
`fonts.gstatic.com` or `cdn.fontshare.com` request in production. The Inter file
is the **latin subset only** (48KB vs ~350KB for the full multi-script family);
if the site ever needs Urdu, Arabic or extended Latin, download the matching
subset rather than swapping in the full file.

### Chess art

The five 3D chess renders are cropped out of the client's own mockups by
`pnpm art`, which reads `assets/source/*.png|jpg` and writes
`public/art/*.webp`. The pipeline takes **5.38MB of source PNGs down to 137KB of
WebP**. Output is committed, so the script only needs re-running if the source
mockups change.

Two decisions worth knowing before touching it:

- **The white render background is kept, not keyed to transparency.** The canvas
  is `#FEFEFE` and so is the render background — a difference the eye cannot
  see. Keying would destroy the contact shadows and floor reflections that are
  most of what makes the renders read as 3D, and any luminance threshold punches
  holes in the silver pieces, whose specular highlights are brighter than the
  background. Instead the `<ChessArt>` container applies a CSS edge-feather
  mask, so a render fades into whatever it sits on.
- **The source renders are only 600–800px wide**, which is the ceiling on output
  quality. They are laid out to display at roughly two-thirds of native width so
  they stay sharp on 2× displays. If higher-resolution renders arrive, drop them
  into `assets/source/` and raise `MAX_WIDTH` in the script.

Each render is imported statically via `lib/art.ts`, so `next/image` gets
intrinsic dimensions and a blur placeholder for free — half of how CLS stays at
zero. All five are marked `decorative: true`, rendered with an empty `alt` and
`aria-hidden`, because they illustrate a metaphor rather than convey information
the copy omits.

### Bundle budget

Client-side JavaScript is roughly **147KB gzipped in total, of which only about
6.2KB is this project's own code**. The rest is the React 19 / Next 16 App
Router framework floor and cannot be reduced without leaving the framework.
There are exactly five client components in the codebase
(`components/layout/Header.tsx`, `components/layout/HeaderClient.tsx`,
`components/ui/RevealObserver.tsx`, `components/sections/ContactForm.tsx`,
`components/sections/StatValue.tsx`); everything else is a Server Component.

Two decisions keep it there, and both should survive future edits:

- Scroll reveals use **one** `IntersectionObserver` mounted once in the root
  layout (`RevealObserver`), not one per element — which is what lets every
  revealed component stay a Server Component.
- Validation is split across `lib/leads.ts` and `lib/leads.server.ts` so zod
  never reaches the browser. See [Lead capture](#lead-capture-setup).

**On the 90KB figure in the original plan:** it is not achievable and should not
be treated as the target. Next 16's App Router ships roughly 140KB of framework
before a single line of application code runs. The number worth watching is the
*application* share — currently ~6.2KB. Measure it with:

```bash
# after pnpm build, list chunks containing this project's own code
grep -l "u-btn--blue\|data-reveal" .next/static/chunks/*.js | \
  xargs -I{} sh -c 'gzip -c {} | wc -c'
```

If total transferred JS moves materially above ~150KB, something new has been
pulled into the client bundle. The two most likely causes, both of which have
already happened once here, are a client component importing `content/services`
(worth 24KB of service copy) or importing `lib/leads.server.ts` (worth 66KB of
zod).

---

## Content architecture

Everything a non-developer might reasonably want to edit lives in `content/` as
typed data, never inside JSX.

| File | Contents |
|---|---|
| `content/site.ts` | Brand name, legal name, domain, contact details, socials, taglines. **The rename point.** |
| `content/types.ts` | `Practice`, `Pillar`, `Service`, `Step`, `Faq`, `IconName`. `IconName` is a closed union, so a typo is a compile error rather than a missing icon at runtime. |
| `content/practices.ts` | The three practices, and the only record of which discipline sits under which. |
| `content/pillars.ts` | The seven disciplines, with two headlines, blurb, intro, icon, badge variant and highlights. |
| `content/services/` | The 39 services, eight files by discipline, re-exported from `index.ts`. International Expansion is split across `international-expansion.ts` and `usa.ts`, which is a file split and not a discipline split: both carry the same `pillar`. |
| `content/nav.ts` | Primary nav, mega-menu columns and footer link columns, all derived from `services/`. |
| `content/proof.ts` | Stats and client logos, each behind an enable flag. |
| `content/cases.ts` | Case studies, behind `CASES_ENABLED`. |
| `content/faqs.ts` | Home page FAQs, also emitted as `FAQPage` structured data. |
| `content/differentiators.ts` | The six "why choose us" commitments, and the four `PROCESS` steps. |
| `content/capabilities.ts` | The home page capability grid. One card per team, mechanism rather than adjective. |
| `content/featuredServices.ts` | The six Corporate & Advisory services the home page names one by one. A shortlist, not an index. |
| `content/revenueEngine.ts` | Practice 02 in full, all five services, as the home page states it. |
| `content/softwareShowcase.ts` | The Software & AI home page section. |

### One array drives six things

`content/services/index.ts` exports a single `SERVICES` array. That array is the
source of truth for:

1. The 39 static service routes (`/services/[pillar]/[service]`)
2. The header mega-menu
3. The home page service index
4. The footer link columns
5. `sitemap.xml`
6. The contact form's service dropdown

The client's hardest requirement was that a visitor can see every service
offered, with nothing hidden. That guarantee is only as good as the data, which
is why `pnpm check:content` exists and why it is wired into `pnpm verify`.

### Adding a 40th service

1. Add one `Service` object to the appropriate file in `content/services/`. The
   required shape is in `content/types.ts`; copy an existing entry as a
   template.
2. Fill in every field. `check:content` requires all of `slug`, `pillar`,
   `title`, `navLabel`, `oneLiner`, `intro` and `icon`, plus at least 4
   `included`, 3 `audience`, 4 `steps` (each with a title and a description),
   3 `deliverables`, 3 `related` and 3 `faqs`. `documents` may be empty, which
   hides that section, and is right for non-compliance services. There are no
   price or timing fields; see the notes in `content/types.ts`.
3. Use a lowercase kebab-case slug that no other service uses.
4. Point `related` at three slugs that exist, none of them its own, and make at
   least one cross into a different pillar. Same-pillar-only related links are a
   warning, not a failure.
5. Pick an `icon` from the `IconName` union. If you need a new one, add the SVG
   to `components/icons/index.tsx` and the name to the union in
   `content/types.ts`.
6. Keep the SEO title under 60 characters and the description between 110 and
   160. Both are warnings rather than failures, but both cause truncation in
   results.
7. Run `pnpm check:content`.

8. The discipline you put it under must belong to a practice in
   `content/practices.ts`, or `check:content` fails: a discipline in no
   practice is missing from the mega-menu and the footer while still appearing
   on the About grid, which is the "nothing hidden" guarantee failing by a side
   door.

You do not need to touch routing, navigation, the footer, the sitemap or the
contact form. All six update from the array. `SERVICE_COUNT` and
`SERVICE_COUNT_WORD` are derived too, so headline copy that says "Thirty-nine
services" becomes "Forty services" automatically, including both taglines in
`content/site.ts`, which interpolate `SERVICE_COUNT_WORD` rather than spelling
the number out.

---

## Component slots

`components/ui/` is a **swappable zone**. The client is supplying their own
navbar, buttons, scroll animation and other components, and these will be
replaced. `components/sections/` is composition — page structure that consumes
those slots — and is not replaced.

The full contract, the handover checklist for an incoming component, the table
of reusable surface classes and the accessibility floor are documented in
[`components/ui/README.md`](components/ui/README.md). Read that before swapping
anything. The short version: components take their colours from
`var(--color-*)` and never from literals; each slot's prop interface is fixed in
[`components/ui/contracts.ts`](components/ui/contracts.ts) so an incoming
component with a different API is absorbed by a thin adapter in one file; and
`/dev/kitchen-sink` shows every slot in every variant on one page so a swap can
be verified in one URL rather than by clicking through 36 pages.

---

## Lead capture setup

### How it works

| Piece | Role |
|---|---|
| `lib/leads.ts` | Client-safe half. Plain functions, **zero dependencies**. Budget bands, shared limits (`LEAD_RULES`), a permissive email check, and `submitLead()`. |
| `lib/leads.server.ts` | Server half. The zod schema, built from the same `LEAD_RULES`. Marked `import 'server-only'`. |
| `app/api/contact/route.ts` | The only server surface on the site. Validates, runs the spam gates, and inserts. |
| `supabase/migrations/0001_create_leads.sql` | The `leads` table. |

The client/server split is deliberate and should not be collapsed. The obvious
design puts one zod schema in a shared file and imports it from both sides; it
reads well and it cost **66KB gzipped in the client bundle**, because the
browser was downloading a full parser to check that an email contains an `@`.
So the responsibilities were split along the line they should have been on
anyway: client-side validation is a UX convenience that catches mistakes before
a round trip, and server-side validation is the actual security boundary,
because anything the browser checks can be bypassed by posting straight to the
endpoint. `import 'server-only'` makes it a *build error* for a client component
to import the server half, which is what keeps zod and the full service content
— 90KB gzipped between them — out of the browser. `LEAD_RULES` is shared, so the
two halves cannot drift apart.

The route handler also carries: a honeypot field, a minimum-elapsed-time gate
(2s), and an in-memory rate limit of 5 submissions per IP per hour. Both spam
gates deliberately return a *success* response — telling a bot precisely why it
was rejected is free tuning information, and a human can never trigger either.
The submitter's IP is stored as a salted SHA-256 prefix, never in the clear.

### Setup, in order

Nothing below has been done yet. The migration exists; it has not been applied
to any project, and no environment variables are set. Until it is, the form
returns a 503 with a message directing the visitor to email instead.

**1. Create or choose a Supabase project.**

**2. Apply the migration.** Either:

```bash
supabase db push
```

or paste `supabase/migrations/0001_create_leads.sql` into the project's SQL
editor and run it.

The security model is worth understanding before you change it. The table
enables RLS with **zero policies**, and additionally revokes the default grants
from `anon` and `authenticated`. That is not an oversight — with RLS on and no
policy granting access, neither role can read or write the table at all, so a
leaked publishable key cannot expose a single customer enquiry. The only writer
is `/api/contact`, using the service-role key, which bypasses RLS by design and
lives only in a server-side environment variable.

**3. Set the three environment variables.** Copy `.env.example` to `.env.local`
for development, and set the same values in your host's environment for
production:

```bash
cp .env.example .env.local
```

| Variable | Where to find it | Notes |
|---|---|---|
| `SUPABASE_URL` | Supabase dashboard → Project Settings → API | Server-only. |
| `SUPABASE_SERVICE_ROLE_KEY` | Same page | Server-only. **Bypasses RLS.** If it ever reaches a browser, every lead is readable by anyone. |
| `LEAD_IP_SALT` | Generate: `openssl rand -hex 32` | Salts the IP hash so it cannot be reversed by hashing all ~4 billion IPv4 addresses. Changing it later is safe; it only means old and new hashes stop matching. |

Note that **none of these carry the `NEXT_PUBLIC_` prefix**, which is exactly
the point — Next will not inline them into the client bundle. Do not add the
prefix. `.env.local` is gitignored; never commit real values.

**4. Test.** Run `pnpm build && pnpm start`, submit the form at `/contact`, and
confirm a row appears in the `leads` table. Take more than two seconds to fill
it in, or the elapsed-time gate will silently swallow the submission (you will
still see a success message — check the server log for
`[contact] submitted too fast`).

Worth testing at the same time: with the env vars unset, the form should return
a 503 and a message pointing at the email address in `content/site.ts`. That
address must be real — it is the fallback the site offers when its own
infrastructure fails.

### Working the leads

The table ships with a `status` column (`new`, `contacted`, `quoted`, `won`,
`lost`, `spam`) and a `notes` column, plus indexes on `created_at desc`,
`status` and `lower(email)`, so the list can be worked newest-first in the
Supabase table editor without extra tooling.

`service_slug` is intentionally **not** a foreign key. Services live in
TypeScript, not the database, and a renamed slug should not be able to fail an
insert and lose a lead.

---

## Deployment

The build produces 58 prerendered HTML routes plus one dynamic route handler at
`/api/contact` (`runtime = 'nodejs'`, `dynamic = 'force-dynamic'`). Node rather
than the edge, because the Supabase service-role client and the crypto hashing
are both simpler there and the endpoint is called a handful of times a day, so
edge latency is irrelevant.

Any host that runs a Next.js server works: Vercel, Netlify, a Node process
behind nginx, a container. Set the three environment variables from the table
above in the host's environment. Security headers (`X-Content-Type-Options`,
`Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) are configured in
`next.config.ts`.

Do not deploy before the domain in `content/site.ts` is real — canonical URLs,
the sitemap and absolute OG image paths are all derived from it.

### The static-export path

If the site ever needs to be a fully static export — cPanel, GitHub Pages, a
plain CDN bucket — the seam is already in place and is documented at the bottom
of `lib/leads.ts`.

`submitLead()` is the **only** place in the codebase that talks to a lead
backend. No component imports a backend directly. To go static:

1. Add `output: 'export'` to `next.config.ts`.
2. Replace the body of `submitLead()` with a direct `supabase-js` insert against
   an **insert-only RLS policy** (which means changing the migration's security
   model — today it grants `anon` nothing at all).
3. Delete `app/api/contact/route.ts`.

Nothing else moves. Two caveats: a static export cannot use the `headers()`
block in `next.config.ts`, so those security headers must be reconfigured at the
web server or CDN; and `next/image` optimization is unavailable, though the
chess art is already pre-sized WebP so the practical impact is small.

---

## Verification

`pnpm verify` runs four checks in sequence and fails on the first problem:

| Check | Catches |
|---|---|
| `typecheck` | Type errors under `strict`, plus unused locals/parameters and unchecked index access. |
| `lint` | `next/core-web-vitals` and `next/typescript` rules. |
| `check:tokens` | A drifted brand colour, a raw hex outside the three allowed files, a stale token mirror. |
| `check:layout` | A responsive grid with no base column count, which is the mobile overflow bug. |
| `check:content` | An incomplete service, a duplicate or malformed slug, a discipline with no services, a discipline in no practice or in two, a practice whose menu link does not cover all of its disciplines, a broken `related` link, a service missing from the mega-menu. Warns (does not fail) on over-length SEO metadata, same-pillar-only related links, and FAQs without a question mark. |

### What it cannot check

`pnpm verify` is a static analysis suite. It reads source files. It does not run
a browser, so it cannot catch:

- **Visual regression of any kind.** Nothing here renders a pixel. A component
  that is technically valid and visually broken passes every check. Use
  `/dev/kitchen-sink` and look at it.
- **Real-browser accessibility.** The contrast ratios in `app/tokens.css` were
  measured with an axe audit and are recorded in the comments, but that audit
  was run by hand and is not automated. Re-run axe (or Lighthouse) in a browser
  after any change to colour usage — particularly if anyone introduces a new
  text colour, which is the failure mode the tokens are shaped to prevent.
- **Whether Metallic Silver is being used as a text colour.** `check:tokens`
  enforces that colours come from tokens; it cannot tell a border from a
  paragraph. This one is on review.
- **Bundle size.** Nothing fails the build on a bundle regression. The
  application-code share is ~6.2KB gzipped against a ~140KB framework floor;
  see [Bundle budget](#bundle-budget) for how to re-measure it.
- **Runtime behaviour of the contact form.** No test posts to `/api/contact`.
  The Supabase insert, the rate limit, the honeypot and the timing gate are all
  verified by hand.
- **Copy accuracy.** Stats, statutory dates, thresholds, penalty figures and
  every other factual claim on the service pages are content, not code.
  Nothing validates that they are still true. The compliance pages cite real
  and checkable figures on purpose, which also means they go out of date when a
  Finance Act, an IRS threshold or a USPTO fee schedule changes. Treat them as
  facts to re-verify, not as copy to polish.
