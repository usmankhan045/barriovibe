import { SERVICE_GROUPS } from './services';

/**
 * Navigation trees, derived from `services.ts` so a new service appears in the
 * mega-menu and footer without anyone remembering to add it.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
];

/** Five columns of the mega-menu — one per pillar, every service listed. */
export const MEGA_MENU_COLUMNS = SERVICE_GROUPS.map(({ pillar, services }) => ({
  pillar,
  href: `/services/${pillar.slug}`,
  links: services.map((s) => ({
    label: s.navLabel,
    href: `/services/${s.pillar}/${s.slug}`,
    oneLiner: s.oneLiner,
  })),
}));

export const COMPANY_LINKS: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];
