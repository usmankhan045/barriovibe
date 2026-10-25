'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { trackAnalyticsEvent } from '@/lib/analytics';

const GOOGLE_TAG_ID = 'G-X6R5F9BXJD';
const TIKTOK_PIXEL_ID = 'DBETICJC77UASCMGJQM0';
/* Versioned because the earlier choice covered TikTok only. Every visitor must
   make a fresh, informed choice now that Google Analytics is included. */
const STORAGE_KEY = 'barriovibe-analytics-consent-v2';
const CONSENT_CHANGED_EVENT = 'barriovibe:analytics-consent-changed';
const OPEN_PREFERENCES_EVENT = 'barriovibe:open-analytics-preferences';

type AnalyticsConsent = 'granted' | 'denied' | null;

function readConsent(): AnalyticsConsent {
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === 'granted' || value === 'denied' ? value : null;
}

function subscribeToConsent(callback: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) callback();
  }

  window.addEventListener('storage', onStorage);
  window.addEventListener(CONSENT_CHANGED_EVENT, callback);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(CONSENT_CHANGED_EVENT, callback);
  };
}

function configureGoogleAnalytics() {
  if (window.__barriovibeGaConfigured) {
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    // The Google loader reads the Arguments object used by its official snippet.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_TAG_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  window.__barriovibeGaConfigured = true;
}

function revokeGoogleAnalytics() {
  window.gtag?.('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

/* Exact base code supplied by TikTok for BarrioVibe's Pixel. It is only
   inserted after consent, so no TikTok request or cookie occurs beforehand. */
const TIKTOK_PIXEL_CODE = `
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
  ttq.load('${TIKTOK_PIXEL_ID}');
  ttq.page();
}(window, document, 'ttq');
`;

function BehaviourTracking({ consent }: { consent: AnalyticsConsent }) {
  const pathname = usePathname();

  useEffect(() => {
    if (consent !== 'granted') return;
    configureGoogleAnalytics();
  }, [consent]);

  useEffect(() => {
    if (consent !== 'granted') return;
    const reached = new Set<number>();
    const thresholds = [25, 50, 75, 90] as const;

    function measureScroll() {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = available <= 0
        ? 100
        : Math.min(100, Math.round((window.scrollY / available) * 100));

      for (const threshold of thresholds) {
        if (percentage < threshold || reached.has(threshold)) continue;
        reached.add(threshold);
        trackAnalyticsEvent('scroll_depth', {
          percent_scrolled: threshold,
          page_path: window.location.pathname,
        });
      }
    }

    measureScroll();
    window.addEventListener('scroll', measureScroll, { passive: true });
    return () => window.removeEventListener('scroll', measureScroll);
  }, [consent, pathname]);

  useEffect(() => {
    if (consent !== 'granted') return;

    function trackClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const control = event.target.closest('a, button');
      if (!control || control.closest('[data-analytics-consent]')) return;

      const label = control.textContent?.trim().replace(/\s+/g, ' ').slice(0, 80) || 'Unlabelled';
      if (control instanceof HTMLAnchorElement) {
        const rawHref = control.getAttribute('href') ?? '';
        const method = rawHref.startsWith('mailto:')
          ? 'email'
          : rawHref.startsWith('tel:')
            ? 'phone'
            : control.hostname === 'wa.me'
              ? 'whatsapp'
              : null;

        if (method) {
          trackAnalyticsEvent('contact_click', {
            contact_method: method,
            link_text: label,
            page_path: window.location.pathname,
          });
          return;
        }

        if (control.origin !== window.location.origin) {
          trackAnalyticsEvent('outbound_link_click', {
            link_domain: control.hostname,
            link_url: control.href,
            link_text: label,
            page_path: window.location.pathname,
          });
          return;
        }
      }

      if (control.classList.contains('u-btn')) {
        trackAnalyticsEvent('cta_click', {
          link_text: label,
          link_url: control instanceof HTMLAnchorElement ? control.href : undefined,
          page_path: window.location.pathname,
        });
      }
    }

    document.addEventListener('click', trackClick);
    return () => document.removeEventListener('click', trackClick);
  }, [consent]);

  return null;
}

export function SiteAnalytics() {
  const consent = useSyncExternalStore(subscribeToConsent, readConsent, () => null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const openPreferences = () => setPreferencesOpen(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
  }, []);

  function saveConsent(value: Exclude<AnalyticsConsent, null>) {
    if (value === 'granted') {
      configureGoogleAnalytics();
      window.ttq?.grantConsent();
    } else {
      revokeGoogleAnalytics();
      window.ttq?.revokeConsent();
    }

    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
    setPreferencesOpen(false);
  }

  const showPreferences = consent === null || preferencesOpen;

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script
            id="google-analytics"
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
            strategy="afterInteractive"
          />
          <Script id="tiktok-pixel" strategy="afterInteractive">
            {TIKTOK_PIXEL_CODE}
          </Script>
        </>
      )}

      <BehaviourTracking consent={consent} />

      {showPreferences && (
        <aside
          data-analytics-consent
          aria-label="Analytics and advertising privacy choices"
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-3xl rounded-[24px] border border-line bg-surface p-5 shadow-tile md:bottom-6 md:flex md:items-center md:gap-6 md:p-6"
        >
          <div className="flex-1">
            <h2 className="font-display text-[17px] font-bold text-ink">
              Your privacy choices
            </h2>
            <p className="mt-1.5 text-[13.5px] leading-[1.6] text-ink-body">
              With your permission, Google Analytics and the TikTok Pixel help us
              understand visits, scrolling, useful links and successful enquiries.
              They may use cookies and receive browser information. Rejecting them does
              not affect the site.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 md:mt-0 md:flex-none">
            <button
              type="button"
              className="u-btn u-btn--chrome u-btn--sm"
              onClick={() => saveConsent('denied')}
            >
              Reject
            </button>
            <button
              type="button"
              className="u-btn u-btn--blue u-btn--sm"
              onClick={() => saveConsent('granted')}
            >
              Allow analytics
            </button>
          </div>
        </aside>
      )}
    </>
  );
}

export function AnalyticsPreferencesButton() {
  return (
    <button
      type="button"
      className="rounded-pill underline decoration-line underline-offset-4 transition-colors hover:text-blue-600"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
    >
      Privacy choices
    </button>
  );
}
