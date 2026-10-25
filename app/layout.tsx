import type { Metadata, Viewport } from 'next';
import { satoshi, inter } from './fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/ui/footer-section';
import { SkipLink } from '@/components/layout/SkipLink';
import { PublicOnly } from '@/components/layout/PublicOnly';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { SiteAnalytics } from '@/components/analytics/SiteAnalytics';
import { BRAND, TAGLINE, SEO_TITLE, X_HANDLE } from '@/content/site';
import { SITE_URL } from '@/lib/seo';
import { TOKENS } from '@/lib/tokens';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SEO_TITLE} | ${BRAND.name}`,
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
  // No `index: true, follow: true` here, although that is what every public
  // page wants. It is also what a page means with no robots tag at all, and
  // stating it made every 404 ship two contradictory tags: this one, and the
  // `noindex` Next injects for a 404 status. Only the Googlebot preview size is
  // not a default, so only it is stated.
  robots: {
    googleBot: { 'max-image-preview': 'large' },
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
        <PublicOnly>
          <SkipLink />
          <Header />
        </PublicOnly>
        {children}
        <PublicOnly>
          <Footer />
          <SiteAnalytics />
          {/*
            One IntersectionObserver for the public site's scroll animations.
            It is deliberately absent from /admin, which has no reveal effects.
          */}
          <RevealObserver />
          {/*
            Warms the two public-site button hover sprites. Admin controls use
            plain CSS fills and do not need these assets.
          */}
          <div className="u-btn-sprite-warm" aria-hidden="true" />
        </PublicOnly>
      </body>
    </html>
  );
}
