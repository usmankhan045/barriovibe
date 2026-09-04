import type { NextConfig } from 'next';

/**
 * Content Security Policy.
 *
 * The site loads nothing from anywhere else: fonts are self-hosted by
 * next/font, there are no third-party scripts, no analytics, no embeds and no
 * iframes. So every fetch directive can be `'self'` and the few that have no
 * legitimate use at all are closed outright.
 *
 * Two directives cannot be tightened without changing how the app is built:
 *
 * `script-src` needs `'unsafe-inline'` because Next serves its hydration
 * payload in inline `<script>` tags. The usual fix is a per-request nonce,
 * which requires middleware and would make every page dynamic. Every page
 * here is prerendered at build time, so that trade is not worth making for a
 * site with no user-generated content and one server route.
 *
 * `style-src` needs it because React writes inline `style` attributes.
 *
 * `frame-ancestors 'none'` is the modern replacement for X-Frame-Options.
 * Both are sent: the old header for anything that predates CSP level 2.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  // The contact form posts to /api/contact on this origin. Nothing else.
  "connect-src 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Every page in this site is prerendered at build time. The only server
  // surface is /api/contact. See lib/leads.ts for the swap path to a fully
  // static export.
  images: {
    formats: ['image/avif', 'image/webp'],
    // Art is pre-generated at fixed widths by scripts/extract-art.mjs, so the
    // optimizer only ever needs these.
    deviceSizes: [640, 828, 1024, 1280, 1536],
    imageSizes: [64, 96, 128, 256, 384],
  },

  // Security headers. Static assets are immutable-cached by Next automatically.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: CSP },
          /*
           * HSTS. `upgrade-insecure-requests` in the CSP above rewrites
           * resource loads within a page that has already loaded over HTTPS.
           * It does nothing for the navigation that got the visitor there, so
           * the first request of a session could still go out over plain HTTP
           * and be intercepted before any policy applies. This header closes
           * that: after one HTTPS visit the browser refuses to speak HTTP to
           * the domain for two years, and `preload` asks that it never does so
           * even on the first visit.
           *
           * `preload` is a one-way door in practice. Submitting the domain at
           * hstspreload.org bakes it into browser binaries and removal takes
           * months, so every present and future subdomain must be able to serve
           * HTTPS before that submission is made. The header is safe to send
           * now; the submission is the step to take deliberately.
           */
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
