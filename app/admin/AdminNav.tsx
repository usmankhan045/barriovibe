'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, FileText, LayoutDashboard } from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/guides', label: 'Guides', icon: BookOpen },
  { href: '/admin/articles', label: 'Articles', icon: FileText },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="p-3">
      <ul className="flex gap-1 overflow-x-auto lg:flex-col">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="shrink-0 lg:shrink">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-bold transition ${active ? 'bg-blue-600 text-white' : 'text-ink-body hover:bg-silver-100 hover:text-ink'}`}
              >
                <Icon size={17} aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
