'use client';

import { usePathname } from 'next/navigation';

/**
 * Keep the public site's chrome out of the admin render tree.
 *
 * The admin used to sit in a fixed, independently scrolling layer above the
 * public header and footer. The glass header still composited its backdrop and
 * listened to scroll events behind that layer, making dashboard scrolling do
 * work for UI that could not be seen. Keeping the route-specific decision in
 * this tiny client boundary lets the root layout stay shared without mounting
 * those effects on /admin.
 */
export function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname.startsWith('/admin') ? null : children;
}
