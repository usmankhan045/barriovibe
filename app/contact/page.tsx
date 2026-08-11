import {
  Container,
  Section,
  SectionHeading,
  Lead,
  Eyebrow,
  Breadcrumb,
} from '@/components/primitives';
import { Icon } from '@/components/icons';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/sections/ContactForm';
import { JsonLd, breadcrumbSchema, organizationSchema } from '@/lib/jsonld';
import { CONTACT } from '@/content/site';
import { SERVICE_COUNT, SERVICE_GROUPS } from '@/content/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Tell us what you need and get a scope and a date within one working day. Accounting, tax, compliance, marketing, web and AI services in Pakistan.',
  path: '/contact',
});

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' },
];

const DIRECT_CHANNELS = [
  {
    icon: 'mail' as const,
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: 'whatsapp' as const,
    label: 'WhatsApp',
    value: CONTACT.phone,
    href: `https://wa.me/${CONTACT.whatsapp}`,
  },
];

export default function ContactPage() {
  // Built here, on the server, and handed to the client form as plain data.
  // See the note in ContactForm — importing the content layer client-side put
  // every service's full text into the browser bundle.
  const serviceOptions = [
    { value: 'not-sure', label: "I'm not sure yet" },
    ...SERVICE_GROUPS.flatMap(({ pillar, services }) =>
      services.map((s) => ({
        value: s.slug,
        label: `${pillar.shortTitle}: ${s.title}`,
      })),
    ),
  ];

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={breadcrumbSchema(CRUMBS)} />

      <Section tight>
        <Container>
          <Breadcrumb items={CRUMBS} />

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* ── Left: context ─────────────────────────────────────────── */}
            <div>
              <SectionHeading
                level={1}
                eyebrow="Contact"
                lines={['Tell us what', 'you need. Get a']}
                accent="straight answer"
              />

              <Lead className="mt-7">
                One message gets you a scope and a date, or an honest
                &ldquo;this isn&rsquo;t us&rdquo; and a pointer to who it is.
              </Lead>

              <ul className="mt-10 flex flex-col gap-3">
                {DIRECT_CHANNELS.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      {...(channel.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="u-tile u-tile-interactive group flex items-center gap-4 p-5"
                    >
                      <span className="u-badge u-badge--chrome grid size-11 place-items-center">
                        <Icon name={channel.icon} size={19} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] text-ink-body">{channel.label}</span>
                        <span className="block truncate font-display text-[15px] font-bold text-ink transition-colors group-hover:text-blue-600">
                          {channel.value}
                        </span>
                      </span>
                      <Icon
                        name="arrow-up-right"
                        size={17}
                        className="flex-none text-ink-body transition-colors group-hover:text-blue-600"
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="u-tile mt-3 p-5">
                <Eyebrow>Office</Eyebrow>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-body">
                  {/* See the note in Footer.tsx: a placeholder street line
                      renders as a bare hyphen and looks broken. */}
                  {CONTACT.address.line1 !== '-' && (
                    <>
                      {CONTACT.address.line1}
                      <br />
                    </>
                  )}
                  {CONTACT.address.city}, {CONTACT.address.country}
                </p>
                <p className="mt-3 flex items-center gap-2 text-[13.5px] text-ink-body">
                  <Icon name="clock" size={15} />
                  {CONTACT.hours}
                </p>
              </div>

              <div className="mt-8 border-t border-line pt-7">
                <h2 className="font-display text-[15px] font-bold text-ink">
                  What happens next
                </h2>
                <ol className="mt-4 flex flex-col gap-3">
                  {[
                    'We read it properly, not an auto-reply.',
                    'We come back within one working day with questions or a scope.',
                    'You get a written scope and date before anything starts.',
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 flex-none place-items-center rounded-pill bg-blue-50 font-display text-[11px] font-bold text-blue-600">
                        {i + 1}
                      </span>
                      <span className="text-[14.5px] leading-[1.55] text-ink-body">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* ── Right: form ───────────────────────────────────────────── */}
            <Reveal>
              {/*
                No Suspense boundary. ContactForm reads `?service=` after mount
                rather than with useSearchParams, so the entire form is present
                in the prerendered HTML — see the note in that component.
              */}
              <ContactForm
                serviceOptions={serviceOptions}
                contact={{
                  phone: CONTACT.phone,
                  whatsapp: CONTACT.whatsapp,
                  email: CONTACT.email,
                  responseTime: CONTACT.responseTime,
                }}
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Reassurance strip ─────────────────────────────────────────── */}
      <Section band tight>
        <Container>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: 'No obligation',
                body: `An enquiry is an enquiry. We will tell you if one of the ${SERVICE_COUNT} services fits, and equally if none of them do.`,
              },
              {
                title: 'No hard sell',
                body: 'We do not chase. If our answer is useful and the timing is wrong, come back whenever.',
              },
              {
                title: 'Your details stay yours',
                body: 'Your enquiry is stored so we can reply and nothing else. We do not sell, share or add you to a list.',
              },
            ].map((item, i) => (
              <Reveal key={item.title} as="li" index={i} className="h-full">
                <div className="u-tile h-full p-6">
                  <h2 className="font-display text-[16px] font-bold text-ink">{item.title}</h2>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-ink-body">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
