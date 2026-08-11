import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { StatBar } from '@/components/sections/StatBar';
import { Disciplines } from '@/components/sections/Disciplines';
import { SoftwareShowcase } from '@/components/sections/SoftwareShowcase';
import { RevenueEngine } from '@/components/sections/RevenueEngine';
import { FeaturedServices } from '@/components/sections/FeaturedServices';
import { WhyUs } from '@/components/sections/WhyUs';
import { Process } from '@/components/sections/Process';
import { Results, LogoWall } from '@/components/sections/Results';
import { FaqSection } from '@/components/sections/FaqList';
import { WhatsAppFab } from '@/components/ui/WhatsAppFab';
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
    <>
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
      {/* Practice 02, all five of it. The three sections here run in practice
          order, which is the ranking content/practices.ts sets and every other
          surface on the site keeps. */}
      <RevenueEngine />
      {/* Software gets its own six cards because it leads. This names six from
          Corporate & Advisory, the largest practice, so the home page mentions
          that work by name rather than leaving it behind a practice label the
          coverflow has already shown. */}
      <FeaturedServices />
      <WhyUs />
      <Process />
      <Results />
      <LogoWall />
      <FaqSection faqs={HOME_FAQS} />

      {/* The closing ask, and it is no longer a section.

          A full-bleed blue band used to close this page: a headline, a
          paragraph and two buttons, about 400px of it. It said the same thing
          the hero says and the contact page says, at the point in the scroll
          where a visitor has either decided or not, and on a page that had just
          spent three sections naming thirty-two services it read as one more
          section rather than as the end of the argument.

          What replaces it is one button that arrives when the last section
          does. Same offer, none of the height, and it follows the visitor
          through the FAQ and the footer instead of scrolling past once. The
          band is still the closing ask on every other page; see WhatsAppFab for
          why this one earns the lighter version.

          Outside `<main>`, which is load-bearing: the button watches the last
          element child of `#main` to know when to arrive, and inside it, it was
          that child and observed itself. A fixed element is in the viewport at
          every scroll position, so it was on from the first pixel. It belongs
          out here anyway, being a floating link to another app rather than part
          of the page's content.

          It arrives at Disciplines, the third section, which is where this page
          stops introducing itself and starts naming work. Above that line a
          visitor has read a headline and four numbers and has nothing to ask
          about yet; from it down there is always something on screen worth a
          question. */}
      </main>

      <WhatsAppFab from="#disciplines" />
    </>
  );
}
