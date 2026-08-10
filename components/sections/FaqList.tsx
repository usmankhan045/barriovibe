import { Container, Section, SectionHeading, Lead } from '@/components/primitives';
import { Icon } from '@/components/icons';
import { ArrowLink } from '@/components/primitives';
import { Reveal } from '@/components/ui/Reveal';
import type { Faq } from '@/content/types';
import { cx } from '@/lib/cx';

/**
 * FAQ accordion built on native <details>/<summary>.
 *
 * Zero JavaScript. The browser handles open/close state, keyboard operation,
 * focus management and screen-reader announcement natively and correctly —
 * a hand-rolled React accordion would ship state, effects and ARIA wiring to
 * reproduce behaviour that is already free and better tested.
 *
 * The only thing that needs styling away is the default disclosure triangle.
 */
export function FaqAccordion({ faqs, className }: { faqs: Faq[]; className?: string }) {
  return (
    <ul className={cx('flex flex-col gap-3', className)}>
      {faqs.map((faq, i) => (
        <Reveal key={faq.question} as="li" index={i}>
          <details className="group u-tile overflow-hidden">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-5 p-6 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-[17px] font-bold leading-[1.4] text-ink transition-colors group-open:text-blue-600">
                {faq.question}
              </h3>
              <span
                className="mt-0.5 grid size-7 flex-none place-items-center rounded-pill border border-line text-ink-body transition-all duration-200 group-open:rotate-180 group-open:border-blue-200 group-open:text-blue-600"
                aria-hidden="true"
              >
                <Icon name="chevron-down" size={15} />
              </span>
            </summary>
            <div className="px-6 pb-6">
              <p className="max-w-[68ch] border-t border-line pt-4 text-[15px] leading-[1.65] text-ink-body">
                {faq.answer}
              </p>
            </div>
          </details>
        </Reveal>
      ))}
    </ul>
  );
}

/** The home page's FAQ section wrapper. */
export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <Section id="faq" band>
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Questions"
                lines={['The things', 'people actually']}
                accent="ask"
              />
              <Lead className="mt-7">
                Not answered here? Ask us directly. We reply within one working day.
              </Lead>
              <ArrowLink href="/contact" className="mt-6">
                Ask a question
              </ArrowLink>
            </div>
          </Reveal>

          <FaqAccordion faqs={faqs} />
        </div>
      </Container>
    </Section>
  );
}
