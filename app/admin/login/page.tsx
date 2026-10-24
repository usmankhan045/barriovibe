import { redirect } from 'next/navigation';
import { getSession } from '@/lib/admin/session';
import LoginForm from './LoginForm';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  if (await getSession()) redirect('/admin');
  const { next } = await searchParams;
  const safeNext = next?.startsWith('/admin') ? next : '/admin';
  return (
    <main className="grid min-h-screen place-items-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center gap-3"><span className="grid size-12 place-items-center rounded-xl bg-blue-600 font-display font-black text-white">BV</span><div><h1 className="font-display text-xl font-black">Control room</h1><p className="text-xs text-ink-body">Guides and articles</p></div></div>
        <div className="rounded-2xl border border-silver-300 bg-white p-6 shadow-lg"><LoginForm next={safeNext} /></div>
      </div>
    </main>
  );
}
