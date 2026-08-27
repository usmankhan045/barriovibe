'use client';

import type { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Wordmark } from '@/components/layout/Wordmark';
import { BRAND, CONTACT, SHORT_TAGLINE } from '@/content/site';
import { COMPANY_LINKS, LEGAL_LINKS, MEGA_MENU_COLUMNS } from '@/content/nav';

/**
 * SLOT — dropped-in footer (`footer-section`).
 *
 * Replaces the mega footer that used to live in `components/layout/Footer.tsx`.
 * See ./README.md for the handover rules this had to satisfy; the four
 * adaptations the original source needed to work here are marked ADAPTED
 * below, so a future re-sync from upstream knows exactly what was changed and
 * why.
 *
 * NOTE — this is the site's only client component that is not behind an
 * interaction. `motion` puts the whole footer on the client on every route.
 * That was a deliberate call; the zero-JS alternative is `<Reveal>`, which
 * produces the same blur/translate/fade from one shared IntersectionObserver.
 */

/* ADAPTED 1 — icons.
   The original imported FacebookIcon / InstagramIcon / YoutubeIcon /
   LinkedinIcon from lucide-react. lucide-react v1 REMOVED every brand icon
   (they are trademarks, not UI glyphs); those four exports are `undefined` on
   the installed 1.28.0, which renders as "Element type is invalid".
   The marks are inlined here instead — fill-based on a 24×24 grid, taking
   `currentColor`, so they inherit the link's hover transition. They stay local
   to this file rather than joining `components/icons`, whose set is
   stroke-based and would render these as outlines. */
const BRAND_MARKS = {
  LinkedIn:
    'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.04c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
  Instagram:
    'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.34 4.15.63c-.79.3-1.46.72-2.12 1.38A5.87 5.87 0 0 0 .63 4.15c-.3.75-.5 1.63-.56 2.9C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.9.3.79.72 1.46 1.38 2.12a5.87 5.87 0 0 0 2.12 1.38c.75.3 1.63.5 2.9.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.9-.56a5.87 5.87 0 0 0 2.12-1.38 5.87 5.87 0 0 0 1.38-2.12c.3-.75.5-1.63.56-2.9.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.9a5.87 5.87 0 0 0-1.38-2.12A5.87 5.87 0 0 0 19.85.63c-.75-.3-1.63-.5-2.9-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z',
  Facebook:
    'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z',
  X: 'M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.25 6.93 6.06-6.93Zm-1.29 19.49h2.04L6.49 3.24H4.3l13.31 17.4Z',
} as const;

type BrandName = keyof typeof BRAND_MARKS;

function BrandMark({ name, className }: { name: BrandName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={BRAND_MARKS[name]} />
    </svg>
  );
}

interface FooterLink {
  title: string;
  href: string;
  /** `SOCIAL_LINKS` only. */
  brand?: BrandName;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

/* ADAPTED 2 — link data.
 * The original shipped demo links: two in-page anchors, plus /faqs, /blog,
 * /changelog, /brand and /help. None of those routes exist here, so they would
 * have been dead links in the footer of all 36 pages. Sections are derived from
 * the content layer instead, so renaming a route or a pillar still only takes
 * the one edit in content/.
 */
const footerLinks: FooterSection[] = [
  {
    label: 'Services',
    links: MEGA_MENU_COLUMNS.map((column) => ({
      title: column.practice.shortTitle,
      href: column.href,
    })),
  },
  {
    label: 'Company',
    links: COMPANY_LINKS.map((link) => ({
      title: link.label,
      href: link.href,
    })),
  },
  {
    label: 'Get in touch',
    links: [
      { title: CONTACT.email, href: `mailto:${CONTACT.email}` },
      { title: CONTACT.phone, href: `https://wa.me/${CONTACT.whatsapp}` },
      { title: 'Start a project', href: '/contact' },
      {
        title: `${CONTACT.address.city}, ${CONTACT.address.country}`,
        href: '/contact',
      },
    ],
  },
  /* Its own column on the client's instruction, not filed beside the
   * copyright the way it was before. Two links is shorter than the other
   * three columns, which is a real trade against the "every column reads
   * the same depth" reasoning this footer used to run on — but a named
   * "Legal" heading is what was actually asked for, so it stands as its
   * own category rather than being folded back in for the sake of even
   * columns. */
  {
    label: 'Legal',
    links: LEGAL_LINKS.map((link) => ({ title: link.label, href: link.href })),
  },
];

/**
 * The social marks, placed with the brand block rather than filed as a fifth
 * link column — the client's reference layout (xeven.com) puts them directly
 * under the lockup's own copy, not alongside Services/Company/Get in touch,
 * because they are not a navigation section, they are the brand's presence
 * elsewhere. See the render site for where that lands them.
 *
 * A LinkedIn mark beside the word "LinkedIn" is the same fact twice, and it
 * is the one place on the page where the glyph is more recognisable than the
 * label, so the row carries marks only. The names stay in the accessibility
 * tree as `sr-only` text — four unlabelled links are four links called
 * "link" to a screen reader.
 */
const SOCIAL_LINKS: FooterLink[] = (Object.keys(BRAND_MARKS) as BrandName[]).map((name) => ({
  title: name,
  href: '#',
  brand: name,
}));

/* ADAPTED 6 — the hover seat, lifted verbatim from the mega-menu submenu.
 *
 * Same recipe as the service links in `HeaderClient.tsx`: a `rounded-pill`
 * seat that tints on hover with the label going brand blue. Written out here
 * rather than shared through a class because the two live in different layers
 * of the site — the menu is a SLOT the client is replacing, and coupling the
 * footer to it would mean the replacement takes the footer's hover state with
 * it. (Both used to carry a sliding arrow; the site has none on its links now.)
 *
 * ── Why the seat is a FILL and not glass ──
 *
 * The obvious reading of "use the liquid glass effect on the footer links" is
 * a little glass pane behind each one. That is the one thing Apple's guidance
 * rules out outright — never stack glass on glass — and it applies literally
 * here, because the footer IS glass now. Two panes one inside the other stop
 * reading as depth and start reading as a rendering artefact.
 *
 * The submenu already solved this and its comment says so: it sits on the
 * glass mega-menu panel, and its hover seat is a flat `bg-blue-50`. What
 * belongs on top of glass is fills, transparency and vibrancy — thin overlays
 * that feel like part of the material rather than another sheet of it. So
 * copying the submenu's hover exactly is both what was asked for and the
 * correct construction; there was no trade to make.
 *
 * The seat bleeds 10px left of the text via `-ml-2.5` on the <ul>, so the
 * labels stay optically aligned with the column heading above them while the
 * tinted pill still has padding to sit in.
 */
/* inline-flex, not `flex w-full`. The columns are `auto` grid tracks sized to
 * their longest label, so a full-width link makes every seat as wide as the
 * longest entry in its column — a 5-character "Work" would light up a pill the
 * width of "E-commerce & Marketplaces". Shrink-to-fit keeps the tint on the
 * words. It was `justify-between` while a right-aligned arrow anchored the far
 * edge; with the arrow gone there is nothing to push apart. */
/* `u-tap` takes these to 44px on a touch device and leaves the desktop seat
   at its measured 34px. See the tap-target note in globals.css. */
const FOOTER_LINK =
  'u-tap inline-flex items-center rounded-pill px-2.5 py-1.5' +
  ' transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600';

/* The same seat with equal padding on all four sides, because what sits in it
 * is a square mark rather than a line of type. The pill's own radius makes it
 * a circle at this size, which is what a social mark's target should be. */
const FOOTER_MARK_LINK =
  'u-tap u-tap--square inline-flex items-center justify-center rounded-pill p-2' +
  ' transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600';

export function Footer() {
  return (
    /* ADAPTED 3 — tokens, inverted for a light page.
     * app/tokens.css declares `--color-*: initial`, which drops Tailwind's
     * stock palette, and this project never adopted shadcn's semantic names —
     * `text-muted-foreground` and `bg-foreground/20` emitted no color at all.
     * The glow used `theme(backgroundColor.white/8%)`, v3 dot-path syntax that
     * does not resolve under v4.
     *
     * The original is a dark card: near-black on near-black, separated only by
     * a hairline arc, with a WHITE bloom blooming down from the top edge. The
     * light version has to invert the direction of the light, not just swap the
     * colours — a white bloom on a white card is nothing. Width is the
     * container's 1280px content box + gutters, so the wordmark lines up with
     * the one in the header.
     *
     * ADAPTED 5 — the footer is a SHEET OF GLASS lifted over the page.
     *
     * It was `bg-band` with a painted white bloom faking light spilling over
     * its top edge. It is now `.u-glass .u-glass--sheet`, and the light is
     * real: the footer is pulled up over whatever section closes the page, so
     * its curved top edge has that ground genuinely behind it, refracted and
     * lensed rather than approximated. See `.u-glass--sheet` in globals.css for
     * why this element qualifies for the material when a card does not: the
     * whole test is whether there is something behind it.
     *
     * `-mt-12` rather than `-mt-10`: the overlap is now load-bearing instead of
     * decorative, and 48px is what the fill ramp in `.u-glass--sheet` is keyed
     * to. It is also the most that can be taken. Sections close on `py-20`
     * (80px) at the tightest, so this leaves 32px of clearance under their last
     * line on mobile. Deeper starts cutting into the section's own layout.
     *
     * The old top hairline is gone with the bloom. `.u-glass::after` draws the
     * rim, and unlike a `border-t` it follows the 40px radius around both
     * corners — which is the bug that hairline existed to work around.
     *
     * `pt-20` rather than `pt-16` so the wordmark clears the overlap: nothing
     * legible may sit in the 48px strip where the blue shows through.
     */
    <footer className="u-glass u-glass--sheet relative -mt-12 w-full overflow-hidden rounded-t-[28px] pt-20 pb-12 md:rounded-t-[40px] lg:pt-24">

      {/* Full-bleed footer, container-width contents — the same split every
			    other section on the site uses, so the wordmark lines up with the
			    one in the header. */}
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10">
        {/* ADAPTED 4 — `grid-cols-1` base.
				    The original opened `grid w-full gap-8 xl:grid-cols-3`. With no
				    base template the browser creates one implicit auto column sized
				    to max-content, which overflows on mobile — the exact bug
				    `pnpm check:layout` fails the build on. See check-layout.mjs. */}
        <div className="grid w-full grid-cols-1 gap-10 xl:grid-cols-[1fr_auto] xl:gap-8">
          <AnimatedContainer>
            <Wordmark />
            {/* The tagline, not the copyright line, now sits under the
                lockup — the copyright moved to its own bar at the very
                bottom of the footer (see the close of this component), and
                a one-line description of the firm is what a logo usually
                introduces anyway. */}
            <p className="mt-4 max-w-[34ch] text-[13.5px] leading-relaxed text-ink-body">
              {SHORT_TAGLINE}
            </p>

            {/* The social row. See the note on `SOCIAL_LINKS` for why it sits
                here, with the brand block, instead of filed as a link column.
                `-ml-2` matches the seat's own padding so the marks line up
                under the logo the way the tagline above does. */}
            <ul className="-ml-2 mt-5 flex flex-wrap items-center gap-0.5 text-ink-body">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.title}>
                  <a href={link.href} className={FOOTER_MARK_LINK}>
                    <BrandMark name={link.brand!} className="size-[17px] flex-none" />
                    <span className="sr-only">{link.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedContainer>

          {/* `auto` rather than a 2fr share: an even split leaves the fourth
				    column's text stranded short of the right edge, because each cell
				    is far wider than its longest label. Sizing the field to its
				    content and letting the 1fr logo column absorb the slack packs
				    the columns and lands them flush right, which is the proportion
				    the reference actually has.

				    `repeat(4,auto)` rather than `grid-cols-4`, for the same reason:
				    equal fractions make every column as wide as the widest one — the
				    email address — which would leave "Legal" trailing dead space. */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-[repeat(4,auto)] lg:gap-x-14">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <h3 className="font-display text-[11px] font-bold tracking-[0.14em] text-ink-strong uppercase">
                  {section.label}
                </h3>
                <ul className="-ml-2.5 mt-4 space-y-0.5 text-[13.5px] text-ink-body">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      {/* Only in-app routes go through next/link. mailto:, wa.me and
										    the contact placeholder are not routes, and handing them to
										    the router breaks the mail client / new tab. */}
                      {link.href.startsWith('/') ? (
                        <Link href={link.href} className={FOOTER_LINK}>
                          <span className="inline-flex items-center">{link.title}</span>
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          {...(link.href.startsWith('http')
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className={FOOTER_LINK}
                        >
                          <span className="inline-flex items-center">{link.title}</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        {/* The copyright bar. Its own row at the absolute bottom of the
            footer rather than sitting under the logo, on the client's
            instruction — a border-top separates it from the columns above
            so it reads as the page's closing line, not a fifth column. */}
        <AnimatedContainer
          delay={0.1 + footerLinks.length * 0.1}
          className="mt-12 border-t border-line pt-6 text-center lg:mt-16"
        >
          <p className="text-[13px] text-ink-body">
            © {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
          </p>
        </AnimatedContainer>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    // Wrapped rather than returned bare: `children` is ReactNode, which is
    // wider than what a component may return under this tsconfig's `strict`.
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      /* No `filter: blur()` in this animation, deliberately — the original had
       * blur(4px) → blur(0px).
       *
       * opacity and transform are the two properties the compositor can
       * animate on its own thread without touching layout or paint. `filter`
       * is not one of them: every frame of a blur re-rasterizes the element
       * and its subtree. Here that is five containers re-rasterizing together,
       * at the bottom of every page on the site, arriving exactly when the
       * scroll reaches the end. Dropping it costs a little softness and buys
       * back the one animation on the site that could not run on the
       * compositor.
       *
       * 0.8s → 0.45s for the same reason the CSS reveals came down: at scroll
       * speed the longer curve finishes well after you are already reading.
       */
      initial={{ translateY: -8, opacity: 0 }}
      whileInView={{ translateY: 0, opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
