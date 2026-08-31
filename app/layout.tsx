import type { Metadata, Viewport } from 'next';
import { satoshi, inter } from './fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/ui/footer-section';
import { SkipLink } from '@/components/layout/SkipLink';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { BRAND, TAGLINE, SHORT_TAGLINE, X_HANDLE } from '@/content/site';
import { SITE_URL } from '@/lib/seo';
import { TOKENS } from '@/lib/tokens';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} | ${SHORT_TAGLINE}`,
    // Every inner page supplies a bare title; the brand is appended here so
    // no page has to remember to do it.
    template: `%s | ${BRAND.name}`,
  },
  description: TAGLINE,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.legalName }],
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    siteName: BRAND.name,
  },
  // The site-wide default. `pageMetadata` sets the same handle per route, but
  // it does not cover the home page or anything that builds metadata by hand,
  // and a card without it is attributed to nobody.
  twitter: { card: 'summary_large_image', site: X_HANDLE, creator: X_HANDLE },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Matches --color-canvas. Sets the browser UI tint on mobile so the chrome
  // blends into the page instead of framing it.
  themeColor: TOKENS.canvas,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK" className={`${satoshi.variable} ${inter.variable}`}>
      <body>
        <SkipLink />
        <Header />
        {children}
        <Footer />
        {/*
          One IntersectionObserver for the entire site's scroll animations.
          Mounted here rather than per-element so every revealed component
          stays a Server Component. See components/ui/Reveal.tsx.
        */}
        <RevealObserver />
      </body>
    </html>
  );
}
