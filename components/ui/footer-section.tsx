'use client';

import type { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Wordmark } from '@/components/layout/Wordmark';
import { BrandMark } from '@/components/icons/brands';
import { BRAND, CONTACT, SHORT_TAGLINE, SOCIALS } from '@/content/site';
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

   They were replaced by a copy of the marks inlined in this file. That copy is
   now gone too: `components/icons/brands.tsx` already held the same kind of
   object for the platform logos in RevenueEngine, drawn on the same 24x24 grid
   and taking `currentColor` the same way, and two sets of hand-pasted logo
   paths in one repo is one set too many. The marks a footer link needs are
   declared in `content/site.ts` beside the URL they point at, so a new account
   is one entry in one file rather than a path here and an href there. */

interface FooterLink {
  title: string;
  href: string;
  /** `SOCIAL_LINKS` only: the key of a mark in `components/icons/brands.tsx`. */
  brand?: string;
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
 * An Instagram mark beside the word "Instagram" is the same fact twice, and it
 * is the one place on the page where the glyph is more recognisable than the
 * label, so the row carries marks only. The names stay in the accessibility
 * tree as `sr-only` text — unlabelled links all read as "link" to a screen
 * reader.
 *
 * The list itself comes from `SOCIALS` in content/site.ts, which is also what
 * fills `sameAs` in the Organization schema. One source, so the profiles a
 * visitor can click and the profiles the site claims as its own to a search
 * engine cannot drift apart.
 */
const SOCIAL_LINKS: FooterLink[] = SOCIALS.map((social) => ({
  title: social.label,
  href: social.href,
  brand: social.mark,
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
                  <a
                    href={link.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className={FOOTER_MARK_LINK}
                  >
                    <BrandMark platform={link.brand!} size={18} className="flex-none" />
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
