import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { StatBar } from '@/components/sections/StatBar';
import { Disciplines } from '@/components/sections/Disciplines';
import { SoftwareShowcase } from '@/components/sections/SoftwareShowcase';
import { WhyUs } from '@/components/sections/WhyUs';
import { Process } from '@/components/sections/Process';
import { Results, LogoWall } from '@/components/sections/Results';
import { FaqSection } from '@/components/sections/FaqList';
import { CtaBand } from '@/components/layout/CtaBand';
import { HOME_FAQS } from '@/content/faqs';
import { BRAND, SHORT_TAGLINE, TAGLINE } from '@/content/site';
import { absoluteUrl } from '@/lib/seo';
import { JsonLd, organizationSchema, faqSchema } from '@/lib/jsonld';

export const metadata: Metadata = {
  // The root layout's template appends the brand to every other page; the home
  // page sets its own absolute title so it doesn't read "Brand — Brand".
  title: { absolute: `${BRAND.name} | ${SHORT_TAGLINE}` },
  description: TAGLINE,
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <main id="main" tabIndex={-1}>
      {/*
        The home page is where the Organization node must be DEFINED, not just
        referenced. Every service page's `Service.provider` points at
        `<domain>/#organization` by @id, so a consumer resolving that reference
        against the site root has to find it here.

        The FAQPage mirrors the six accordions rendered below — same array, so
        the markup and the structured data cannot describe different questions.
      */}
      <JsonLd data={organizationSchema()} />
      <JsonLd data={faqSchema(HOME_FAQS)} />

      <Hero />
      {/* StatBar is pulled up into the hero with a negative margin — it is part
          of the hero composition, not a section in its own right. */}
      <StatBar />
      <Disciplines />
      <SoftwareShowcase />
      <WhyUs />
      <Process />
      <Results />
      <LogoWall />
      <FaqSection faqs={HOME_FAQS} />
      <CtaBand
        title="Tell us what you need. We'll tell you what it takes."
        body="One message, one working day, one honest answer, including when the answer is that you don't need us."
      />
    </main>
  );
}
