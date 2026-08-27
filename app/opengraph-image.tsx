import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { BRAND, SHORT_TAGLINE } from '@/content/site';
import { SERVICE_COUNT } from '@/content/services';
import { TOKENS } from '@/lib/tokens';

/**
 * `satori` (the renderer behind `ImageResponse`) can't resolve a `/public`
 * path at build time, so the mark is inlined as a data URI. The 90x96 copy
 * in `public/brand/logo-og.png` keeps this well under the 500KB bundle limit
 * documented for `ImageResponse`; the full-size mark lives at
 * `public/brand/logo.png` and is used by the header/footer wordmark instead.
 */
const logoDataUri = `data:image/png;base64,${readFileSync(
  join(process.cwd(), 'public/brand/logo-og.png'),
).toString('base64')}`;

/**
 * The site-wide social preview card, generated at build time.
 *
 * A single card for every page rather than one per route: 36 generated images
 * would add meaningfully to build time for a benefit nobody sees, since the
 * page title and description already appear beside the image in every social
 * preview. If per-service cards are ever wanted, this file is copied into the
 * service route folder and reads `params`.
 *
 * Colors come from lib/tokens.ts because next/og renders on a server with no
 * CSS — it cannot read the custom properties in tokens.css. `pnpm check:tokens`
 * asserts those mirrored values still match the source of truth.
 */
export const alt = `${BRAND.name} | ${SHORT_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: `linear-gradient(135deg, ${TOKENS.blue600} 0%, ${TOKENS.blue800} 58%, ${TOKENS.blue900} 100%)`,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: TOKENS.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={logoDataUri} width={34} height={36} alt="" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: TOKENS.white, letterSpacing: -0.5 }}>
              {BRAND.name}
            </span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: TOKENS.silver400,
                letterSpacing: 3,
                marginTop: 4,
              }}
            >
              {BRAND.descriptor.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Headline — the same three lines as the site's hero */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 76, fontWeight: 800, color: TOKENS.white, lineHeight: 1.04, letterSpacing: -2.5 }}>
            Books balanced.
          </span>
          <span style={{ fontSize: 76, fontWeight: 800, color: TOKENS.white, lineHeight: 1.04, letterSpacing: -2.5 }}>
            Growth engineered.
          </span>
          <span style={{ fontSize: 76, fontWeight: 800, color: TOKENS.silver400, lineHeight: 1.04, letterSpacing: -2.5 }}>
            Software shipped.
          </span>
        </div>

        {/* Footer strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 48, height: 4, background: TOKENS.white, borderRadius: 2, display: 'flex' }} />
          <span style={{ fontSize: 24, color: TOKENS.silver400 }}>
            {SERVICE_COUNT} services · Software · AI · Finance · Compliance · Growth
          </span>
        </div>
      </div>
    ),
    size,
  );
}
