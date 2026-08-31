import Link from 'next/link';
import { Container, Section, SectionHeading } from '@/components/primitives';
import { Icon } from '@/components/icons';
import { BrandMark, hasBrandMark } from '@/components/icons/brands';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { LiquidLens } from '@/components/ui/LiquidLens';
import { PILLAR_BY_SLUG } from '@/content/pillars';
import { getService, serviceHref, pillarHref } from '@/content/services';
import { REVENUE_ENGINE } from '@/content/revenueEngine';

/**
 * "We build the demand, then take the order": Performance Marketing &
 * E-commerce, all six services named on the home page.
 *
 * ## Where it sits and why the page needed it
 *
 * The home page states the three practices in order. SoftwareShowcase is 01,
 * FeaturedServices is 03, and 02 was represented by a single panel on the
 * coverflow. A visitor who came for a Shopify build or for Daraz listings could
 * read the entire page and never see either phrase. This section is the middle
 * of that sequence and it is placed between the other two, because the order of
 * the practices is a ranking the whole site keeps (content/practices.ts) and a
 * home page that states 01, 03, 02 is not stating a ranking at all.
 *
 * ## Why it looks like none of its neighbours
 *
 * Three sections in a row, each naming services, will read as one long section
 * unless they are built differently. So the differences are structural rather
 * than decorative:
 *
 *     SoftwareShowcase      this                    FeaturedServices
 *     ────────────────      ────────────────────    ─────────────────
 *     grey band             the canvas              the canvas
 *     six glass cards       six cards in a rail     six rows in an index
 *     heading above         heading above           heading beside, and
 *                                                     it stays
 *     a picture per         a card per service      a line of type per
 *       service                                       service
 *
 * All three are on light ground, so the ARRANGEMENT is what tells them apart:
 * a capped card grid, a full-width card rail, and an index with no card in it
 * at all. All three now hold six things, which is a coincidence of the content
 * rather than a rule, and it is why the arrangement has to carry the whole
 * difference: the showcase caps at `max-w-6xl` and puts a picture on every
 * card, this runs the full container and puts a line of type on every card,
 * and FeaturedServices draws no card at all.
 *
 * Note what is no longer in that table: a row for what each one does under a
 * pointer. This section and SoftwareShowcase are now made of the same glass and
 * carry the same drop, and that is deliberate. See "The material" below.
 *
 * The array order still matters and is still the funnel: four services that
 * build demand, then two that take the order it produces. It is read left to
 * right and then down; the note on `.u-rev-card` in globals.css is what
 * happened to the staircase that used to say it a second time, and the sixth
 * card is what settled it, since a staircase only reads across a single row
 * and the row wraps at three.
 *
 * ## The material
 *
 * The card is the same glass SoftwareShowcase's cards are made of, at this
 * section's own size, and a drop of it follows the pointer across the rail.
 *
 * It used to invert instead: hovering flooded the card with brand blue from the
 * bottom edge, with the copy rendered a second time in white and clipped by the
 * same moving boundary that drew the fill. The trick worked. It was the wrong
 * thing to spend it on, for a reason that is about the page rather than about
 * the card: a card that turns solid blue is a card announcing itself, and these
 * six are here to name services and hand you to them. Six announcements in a
 * row, one screen after a section that does something else entirely, made the
 * two read as two different sites.
 *
 * So the difference between the three sections is now the ARRANGEMENT and only
 * the arrangement, which is what the table above is for. That is difference
 * enough, and it costs this file a duplicate copy of every card's content, six
 * colour rules and a touch-device opt-out that all existed to serve the fill.
 *
 * ## One line of client JavaScript, for the whole rail
 *
 * The lift, the press and the rim sweep are CSS on `:hover` / `:focus-visible`
 * from the material itself, and the arrival is the site's existing shared
 * reveal observer. The drop is components/ui/LiquidLens.tsx: one pointer
 * listener on the rail, so all six cards below stay Server Components. See the
 * REVENUE ENGINE block in globals.css.
 */

/**
 * The card's footer: the platforms the work runs on, as their own marks.
 *
 * ## A logo where there is one, the name where there is not
 *
 * This was a line of type, "Meta · Google · TikTok · LinkedIn", and at card
 * width four names wrapped onto a second line and left the row ragged across
 * the cards. Names are also the weakest form the claim can take: a visitor
 * scanning for whether these people run Daraz recognises the mark a beat before
 * they read the word.
 *
 * Three entries have no mark and are rendered as words, which is a rule and not
 * a gap: Daraz has no accurate source, and Payments and Shipping are not
 * platforms. Both forms are built to the same 20px line so the row reads as one
 * band of marks either way, and a word among logos reads as the wordmark it is.
 *
 * 18px and not 16: every mark's viewBox is grown to bring it to the set's own
 * optical weight, so they all sit a little inside their box. The note on
 * `MARKS` in components/icons/brands.tsx is the measurement.
 *
 * ## The names stay in the accessibility tree
 *
 * Every mark is `aria-hidden` with the platform's name beside it in `sr-only`
 * text, so a screen reader hears exactly what it heard when this was type. A
 * logo row that drops the words turns a card's accessible name from "…Meta,
 * Google, TikTok, LinkedIn" into nothing at all.
 */
function PlatformMarks({ scope }: { scope: string[] }) {
  return (
    <span className="u-rev-card__marks">
      {scope.map((platform) =>
        hasBrandMark(platform) ? (
          <span key={platform} className="u-rev-card__mark">
            <BrandMark platform={platform} size={18} />
            <span className="sr-only">{platform}</span>
          </span>
        ) : (
          <span key={platform} className="u-rev-card__mark u-rev-card__mark--word">
            {platform}
          </span>
        ),
      )}
    </span>
  );
}

/**
 * One card's content.
 *
 * Kept as its own component now that there is only one face to render, because
 * the card around it is otherwise nothing but a link, a lens well and this.
 */
function CardFace({
  title,
  note,
  scope,
  icon,
  discipline,
}: {
  title: string;
  note: string;
  scope: string[];
  icon: Parameters<typeof Icon>[0]['name'];
  discipline: string;
}) {
  return (
    <>
      {/* The numeral that used to sit opposite this tag is gone with the
          descent it numbered. It ranked nothing: the six services are a
          funnel, not a leaderboard, and six cards each wearing a number is
          six invitations to read them as scored. */}
      <span className="u-rev-card__tag">
        <Icon name={icon} size={13} className="flex-none" />
        {discipline}
      </span>

      <span className="u-rev-card__title">{title}</span>
      <span className="u-rev-card__note">{note}</span>

      <span className="u-rev-card__foot">
        <PlatformMarks scope={scope} />
        <Icon name="arrow-up-right" size={16} className="u-rev-card__arrow" />
      </span>
    </>
  );
}

function Card({ slug, note, scope }: { slug: string; note: string; scope: string[] }) {
  const service = getService(slug);
  if (!service) return null;

  const discipline = PILLAR_BY_SLUG[service.pillar].shortTitle;
  const face = {
    title: service.title,
    note,
    scope,
    icon: service.icon,
    discipline,
  };

  return (
    <Link
      href={serviceHref(service)}
      // `data-glass` is what LiquidLens's `closest()` looks for. An attribute
      // rather than the class, because the class names a MATERIAL and this
      // names the thing the pointer lights, and a future card made of the same
      // material should not silently join a listener it was never wired into.
      data-glass
      className="u-glass u-glass--card u-glass--white u-glass-interactive u-rev-card"
    >
      <span className="u-rev-card__body">
        <CardFace {...face} />
      </span>

      {/* The drop, and the well that clips it to the card's own radius. Both
          inert markup: LiquidLens writes a transform and an opacity onto the
          inner span and nothing else in this tree is client code. */}
      <span className="u-lens-well" aria-hidden="true">
        <span className="u-lens" />
      </span>
    </Link>
  );
}

export function RevenueEngine() {
  return (
    <Section id="growth-ecommerce" className="u-rev">
      {/* A field of dots rather than the stroked icon watermark the coverflow
          and the dark band both use. Two reasons: a third appearance of that
          watermark would make it wallpaper, and a measured grid is the right
          texture under a section whose whole argument is that the work is
          measured. It fades out before it reaches the edges so it never reads
          as a boundary. */}
      <span className="u-rev-field" aria-hidden="true" />

      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The revenue side"
            lines={['We build the demand,']}
            accent="then take the order"
          />
        </Reveal>

        <Reveal index={1}>
          <p className="text-body-lg text-ink-body mt-7 max-w-[54ch]">
            Paid campaigns, your whole social presence, monetization, and the
            store the money lands in. All of it measured against what a customer
            costs to acquire and what that customer is worth.
          </p>
        </Reveal>

        {/* <LiquidLens> IS the rail rather than a wrapper around it: it renders
            the `ul` itself, so the grid, its six list items and the listener
            are all one element deep. See the `as` prop for why it can. */}
        <LiquidLens as="ul" className="u-rev-rail">
          {REVENUE_ENGINE.map((entry, i) => (
            <Reveal key={entry.slug} as="li" index={i}>
              <Card slug={entry.slug} note={entry.note} scope={entry.scope} />
            </Reveal>
          ))}
        </LiquidLens>

        {/* The two discipline hubs, not a third "all services" button. There is
            already one of those in the section below, and a visitor who has
            just read six cards from two disciplines wants the discipline, not
            the catalogue. */}
        {/* Buttons rather than the arrow links they were, and paired the way
            every other pair on this page is paired: blue then chrome. Two
            arrow links after six cards read as a footnote to the cards, which
            understated them. They are the only way out of this section, and the
            practice they name is the one the section is about.

            The order is the ranking. Growth & Marketing is the discipline the
            first four cards belong to, so it is the blue one; E-commerce &
            Marketplaces owns the last two and takes chrome. Neither is a lesser
            link, but a pair of blue buttons is two primary actions, which is
            one more than a section can have. */}
        <Reveal index={2}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            {(['growth-marketing', 'ecommerce'] as const).map((slug, i) => (
              <Button key={slug} href={pillarHref(slug)} variant={i === 0 ? 'blue' : 'chrome'}>
                {PILLAR_BY_SLUG[slug].title}
              </Button>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
