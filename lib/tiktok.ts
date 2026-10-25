export type TikTokStandardEvent = 'Lead';

interface TikTokPixelQueue {
  grantConsent(): void;
  revokeConsent(): void;
  track(event: TikTokStandardEvent, properties?: Record<string, unknown>): void;
}

declare global {
  interface Window {
    ttq?: TikTokPixelQueue;
  }
}

/**
 * Queue a TikTok event when the visitor has allowed the Pixel to load.
 * Deliberately accepts no lead fields: names, contact details and enquiry
 * contents must never be sent to an advertising platform.
 */
export function trackTikTokEvent(event: TikTokStandardEvent) {
  window.ttq?.track(event);
}
