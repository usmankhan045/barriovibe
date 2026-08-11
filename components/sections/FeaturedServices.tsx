import Link from 'next/link';
import { Container, Section, SectionHeading, IconWatermark } from '@/components/primitives';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { LiquidLens } from '@/components/ui/LiquidLens';
import { PILLAR_BY_SLUG } from '@/content/pillars';
import {
  getService,
  serviceHref,
  practiceHref,
  practiceServiceCount,
} from '@/content/services';
import { FEATURED_SERVICES } from '@/content/featuredServices';

/**
 * "The regulated side of your business": the Corporate & Advisory shortlist,
 * six services named individually on the home page.
 *
 * ## What it is answering
 *
 * The home page leads with Software & AI because the client says it leads, and
 * SoftwareShowcase gives it six cards. That left Corporate & Advisory, the
 * largest practice by service count, represented by nothing except a name on
 * the coverflow. A practice name hides the disciplines under it, which hide the
 * services under them, which is the exact failure content/pillars.ts warns
 * about at twice the depth. Someone who wants a trademark filed could scroll
 * the whole page without learning that we file trademarks.
 *
 * The first version of this section over-corrected: it listed everything,
 * grouped by discipline, which is the coverflow's job done twice at a different
 * size. This one names six services and no categories. The discipline appears
 * only as a label on each row, which is the right weight for it here: you are
 * being shown a service, and told which team runs it.
 *
 * ## Why one practice and not two
 *
 * It used to carry four Corporate & Advisory rows plus a paid-media row and a
 * Shopify row, on the logic that anything outside Software & AI belonged here.
 * Six services drawn from three practices describe no part of the firm in
 * particular, and the two marketing rows were the ones a visitor was least
 * likely to be surprised by. Marketing and e-commerce keep their coverflow
 * panel, their mega-menu column and their own pages. This section spends its
 * six rows on the practice that needs naming most, because "corporate
 * services" means nothing until you say company registration, income tax and
 * trademarks.
 *
 * ## Why it looks nothing like the section above it
 *
 * Three sections in a row name services, so each has to be told apart from its
 * neighbours before a word of it is read. This one is separated by its
 * construction rather than by its ground, which is the same canvas
 * RevenueEngine sits on:
 *
 *     SoftwareShowcase       RevenueEngine          this
 *     ──────────────────     ──────────────────     ──────────────────
 *     the grey band          the canvas             the canvas
 *     a 3x2 grid             a five-across rail     a single column
 *     tall cards, portrait   tall cards, portrait   wide cards, landscape
 *     a picture per          a card per service     a line of type per
 *       service                                       service
 *     the heading above      the heading above      the heading beside,
 *                                                      and it stays
 *
 * All three are the same material now, on the client's call, and the row that
 * used to separate them is gone from that table: this was six hairline rows in
 * a register with no card in it at all. What still separates them is the SHAPE
 * of the card and what is inside it. A portrait card in a grid, a portrait card
 * in a rail and a landscape card in a column are three different objects even
 * when they are cut from one sheet of glass, and only this one is a full-width
 * line you read across rather than a tile you read down.
 *
 * The register is what the inside of the card kept, and it is the part worth
 * protecting: entry, category at the far end, arrow. The note on `.u-feat-row`
 * in globals.css is what each of those is for, and what happened to the numeral
 * that used to open every line.
 *
 * This section was the page's one dark band until the client asked for it in
 * white. The FEATURED SERVICES block in globals.css records what the dark
 * version was made of, and what was given up by dropping it, in enough detail
 * to put back.
 *
 * ## Every part of a row is real
 *
 * The title, the icon and the link are read off the service itself, so none of
 * them can drift from the page the row points at. Only the one-clause note is
 * written here.
 *
 * There is no right-hand meta column. It used to carry the service's
 * turnaround, which went with the rest of the site's timings; rather than find
 * something else to put in an 11.5rem slot, the column came out of the grid
 * and the row's body took the space.
 *
 * ## One line of client JavaScript, for the whole list
 *
 * The heading stays put because it is `position: sticky`, not because anything
 * is watching the scroll. The lift, the press and the rim sweep are CSS on
 * `:hover`/`:focus-visible` from the material itself, and the arrival is the
 * site's existing shared reveal observer. The drop is
 * components/ui/LiquidLens.tsx: one pointer listener on the list, so all six
 * cards stay Server Components. See the FEATURED SERVICES block in
 * globals.css.
 */

/** One service, as a card in the index. The whole card is the link. */
function Row({ slug, note }: { slug: string; note: string }) {
  const service = getService(slug);
  if (!service) return null;

  const pillar = PILLAR_BY_SLUG[service.pillar];

  return (
    <Link
      href={serviceHref(service)}
      // `data-glass` is what LiquidLens's `closest()` looks for.
      data-glass
      className="u-glass u-glass--card u-glass--white u-glass-interactive u-feat-row"
    >

      <span className="u-feat-row__body">
        <span className="u-feat-row__title">{service.title}</span>
        <span className="u-feat-row__note">{note}</span>
      </span>

      {/* Which team runs it, at the far end of the row rather than over the
          title. Two things at once:

          IT ANCHORS THE RIGHT EDGE. The row is ~700px wide and the title sits
          at its left end, so the middle third was empty and the arrow read as
          belonging to something else. An index anchors both ends: the entry on
          the left, its category on the right, the way a page number sits at the
          end of a line in a table of contents.
          IT PUTS THE SERVICE FIRST. In the DOM as well as on screen. This row
          used to read "Corporate. Company Registration." to a screen reader,
          which is the opposite of what the note at the top of this file says
          the section is for: you are being shown a service, and told which team
          runs it. */}
      <span className="u-feat-row__label">
        <Icon name={service.icon} size={12} className="flex-none" />
        {pillar.shortTitle}
      </span>

      <Icon name="arrow-up-right" size={17} className="u-feat-row__arrow" />

      {/* The drop, and the well that clips it to the card's own radius. Same
          markup the other two sections carry; see LiquidLens. */}
      <span className="u-lens-well" aria-hidden="true">
        <span className="u-lens" />
      </span>
    </Link>
  );
}

export function FeaturedServices() {
  return (
    <Section id="featured-services" className="u-feat">
      {/* The same faint stroked field that sits behind the coverflow, in its
          own silver. It is texture, not a graphic: at this opacity it registers
          only as the surface not being perfectly flat. It carried an override
          to blue while this section was a dark band, and does not need one on
          the canvas. */}
      <IconWatermark className="u-feat-field" />

      <Container>
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-x-20 xl:gap-x-24">
          {/* The heading is the left column and it STAYS there. On a section
              whose right side is a list you read straight down, a heading that
              scrolls away at the second row leaves the last four rows with
              nothing framing them. Sticky is also why this is a split and not
              a centred header: the arrangement only earns itself if the
              heading is still doing work at the bottom of the list. */}
          <div className="u-feat-aside">
            <Reveal>
              <SectionHeading
                eyebrow="Corporate & Advisory"
                lines={['The regulated side']}
                accent="of your business"
              />
            </Reveal>

            {/* The count is read off the practice tree rather than typed, so
                adding a service to any of its four disciplines updates the
                sentence. */}
            <Reveal index={1}>
              <p className="text-body-lg text-ink-body mt-7 max-w-[42ch]">
                Accounts and tax, company registration and SECP compliance, trademarks
                and patents, and companies set up and filing abroad:{' '}
                {practiceServiceCount('corporate-advisory')} services in this practice.
                These six are the ones businesses ask for first.
              </p>
            </Reveal>

            <Reveal index={2}>
              {/* This practice, not the catalogue.
              
                  It used to go to `/services` and offer all 32, which is the
                  wrong door from a section that has just said "19 services in
                  this practice" and named six of them: a visitor who wants the
                  other thirteen was being handed a list where thirteen of the
                  thirty-two are the ones they came for.

                  It pointed at `/services#corporate-advisory` while a practice
                  had no page of its own. `/services/corporate-advisory` is a
                  real page now and carries all thirteen services grouped by
                  discipline, which is what this button has always claimed to
                  open. The count is read off the tree rather than typed.

                  Blue for the same reason SoftwareShowcase's is: one button in
                  the section is that section's primary action, and chrome is
                  the variant for the second button beside a blue one. */}
              <div className="mt-9">
                <Button href={practiceHref('corporate-advisory')}>
                  All {practiceServiceCount('corporate-advisory')} corporate &amp; advisory
                  services
                </Button>
              </div>
            </Reveal>
          </div>

          {/* <LiquidLens> IS the list, one pointer listener for six cards. */}
          <LiquidLens as="ul" className="u-feat-list">
            {FEATURED_SERVICES.map((featured, i) => (
              <Reveal key={featured.slug} as="li" index={i}>
                <Row slug={featured.slug} note={featured.note} />
              </Reveal>
            ))}
          </LiquidLens>
        </div>
      </Container>
    </Section>
  );
}
