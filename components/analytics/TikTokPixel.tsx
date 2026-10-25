'use client';

import Script from 'next/script';
import { useEffect, useState, useSyncExternalStore } from 'react';

const PIXEL_ID = 'DBEQM4JC77U4J2JQDPS0';
const STORAGE_KEY = 'barriovibe-marketing-consent';
const CONSENT_CHANGED_EVENT = 'barriovibe:marketing-consent-changed';
const OPEN_PREFERENCES_EVENT = 'barriovibe:open-marketing-preferences';

type MarketingConsent = 'granted' | 'denied' | null;

function readConsent(): MarketingConsent {
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

/* Exact base code supplied by TikTok for BarrioVibe's Pixel. It is only
   inserted after consent, so no TikTok request or cookie occurs beforehand. */
const PIXEL_CODE = `
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
  ttq.load('${PIXEL_ID}');
  ttq.page();
}(window, document, 'ttq');
`;

export function TikTokPixel() {
  const consent = useSyncExternalStore(subscribeToConsent, readConsent, () => null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const openPreferences = () => setPreferencesOpen(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
  }, []);

  function saveConsent(value: Exclude<MarketingConsent, null>) {
    if (value === 'granted') window.ttq?.grantConsent();
    else window.ttq?.revokeConsent();

    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
    setPreferencesOpen(false);
  }

  const showPreferences = consent === null || preferencesOpen;

  return (
    <>
      {consent === 'granted' && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {PIXEL_CODE}
        </Script>
      )}

      {showPreferences && (
        <aside
          aria-label="Marketing privacy choices"
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-3xl rounded-[24px] border border-line bg-surface p-5 shadow-tile md:bottom-6 md:flex md:items-center md:gap-6 md:p-6"
        >
          <div className="flex-1">
            <h2 className="font-display text-[17px] font-bold text-ink">
              Your privacy choices
            </h2>
            <p className="mt-1.5 text-[13.5px] leading-[1.6] text-ink-body">
              With your permission, we use the TikTok Pixel to measure visits and
              successful enquiries from our advertising. It may use cookies and share
              browser information with TikTok. Rejecting it does not affect the site.
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
              Allow TikTok
            </button>
          </div>
        </aside>
      )}
    </>
  );
}

export function MarketingPreferencesButton() {
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
