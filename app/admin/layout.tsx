import type { Metadata } from 'next';
import Link from 'next/link';
import { getSession } from '@/lib/admin/session';
import { logoutAction } from '@/lib/admin/actions';
import AdminNav from './AdminNav';

export const metadata: Metadata = { title: 'Admin · BarrioVibe', robots: { index: false, follow: false, nocache: true } };
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) return <div className="min-h-dvh bg-silver-100 text-ink">{children}</div>;

  return (
    <div className="min-h-dvh bg-silver-100 text-ink">
      <div className="flex min-h-dvh flex-col lg:flex-row">
        <aside className="border-b border-silver-300 bg-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64 lg:shrink-0 lg:flex-col lg:self-start lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3 border-b border-silver-300 px-5 py-5">
            <span className="grid size-10 place-items-center rounded-xl bg-blue-600 font-display font-black text-white">BV</span>
            <div><p className="font-display font-black leading-tight">BarrioVibe</p><p className="text-xs text-ink-body">Content control</p></div>
          </div>
          <div className="lg:flex-1"><AdminNav /></div>
          <div className="flex gap-2 border-t border-silver-300 p-4 lg:block">
            <Link href="/" target="_blank" className="block flex-1 rounded-xl border border-silver-300 px-3 py-2 text-center text-sm font-bold text-ink-body hover:border-blue-600 hover:text-blue-600">View site ↗</Link>
            <form action={logoutAction} className="flex-1 lg:mt-2"><button className="w-full rounded-xl border border-silver-300 px-3 py-2 text-sm font-bold text-ink-body hover:border-danger hover:text-danger">Sign out</button></form>
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-5 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
