export type AnalyticsEventParameters = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __barriovibeGaConfigured?: boolean;
  }
}

/** Send only deliberately selected, non-personal event parameters to GA4. */
export function trackAnalyticsEvent(
  event: string,
  parameters: AnalyticsEventParameters = {},
) {
  window.gtag?.('event', event, parameters);
}
