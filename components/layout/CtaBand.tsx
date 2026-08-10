import { Container } from '@/components/primitives';
import { Button } from '@/components/ui/Button';
import { CONTACT } from '@/content/site';
import { cx } from '@/lib/cx';

/**
 * The full-bleed closing band. Appears at the foot of every page.
 *
 * White on the brand blue is 11.44:1 — comfortably past AA even at body size,
 * which is why the band can carry real copy rather than just a headline.
 *
 * `service` deep-links the contact form with a service preselected, so a
 * visitor arriving from a service page doesn't have to re-state why they came.
 */
export function CtaBand({
  title,
  body,
  primaryLabel = 'Start a project',
  service,
  className,
}: {
  title: string;
  body?: string;
  primaryLabel?: string;
  service?: string;
  className?: string;
}) {
  const contactHref = service ? `/contact?service=${service}` : '/contact';

  return (
    <section className={cx('u-cta-band relative overflow-hidden', className)}>
      <Container>
        <div className="relative flex flex-col items-start gap-8 py-20 md:py-24 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-h2 text-white">{title}</h2>
            {body && <p className="mt-5 max-w-[52ch] text-body-lg text-blue-100">{body}</p>}
          </div>

          <div className="flex flex-none flex-wrap gap-3">
            {/* The same two mockup pills used everywhere else on the site.
                This band previously had white and ghost buttons — a third and
                fourth button colour that appear in no mockup. The blue pill
                still separates from the band because the band's ground here is
                blue-800→blue-900 while the pill's body sits at blue-600, with a
                bright bevel rim on both edges and its own drop shadow. */}
            <Button href={contactHref} size="lg">
              {primaryLabel}
            </Button>
            <Button href={`https://wa.me/${CONTACT.whatsapp}`} variant="chrome" size="lg">
              Message on WhatsApp
            </Button>
          </div>
        </div>
      </Container>

      {/* Soft radial lift in the corner so the band is not a flat rectangle. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 size-[28rem] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-blue-400) 0%, transparent 70%)' }}
      />
    </section>
  );
}
