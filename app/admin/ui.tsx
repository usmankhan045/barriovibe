import Link from 'next/link';

export const inputClass =
  'w-full rounded-xl border border-silver-300 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100';

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Control room</p>
        <h1 className="mt-2 font-display text-3xl font-black tracking-tight text-ink">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm text-ink-body">{description}</p> : null}
      </div>
      {action}
    </header>
  );
}

export function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_0_var(--color-blue-800)] transition hover:-translate-y-0.5"
    >
      {children}
    </Link>
  );
}

export function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-silver-300 bg-white p-5 shadow-sm ${className}`}>{children}</section>;
}

export function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Panel>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-body">{label}</p>
      <p className="mt-2 font-display text-3xl font-black text-ink">{value}</p>
    </Panel>
  );
}

export function StatusPill({ status }: { status: string }) {
  const style = status === 'published'
    ? 'border-success bg-success-bg text-success'
    : status === 'scheduled'
      ? 'border-blue-400 bg-blue-50 text-blue-700'
      : status === 'archived'
        ? 'border-danger bg-danger-bg text-danger'
        : 'border-silver-400 bg-silver-100 text-ink-body';
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold capitalize ${style}`}>{status}</span>;
}

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-bold text-ink">{label}</label>
      {children}
      {hint ? <p className="mt-1.5 text-xs leading-relaxed text-ink-body">{hint}</p> : null}
    </div>
  );
}

export function Message({ error, success }: { error?: string; success?: string }) {
  if (!error && !success) return null;
  return (
    <p role={error ? 'alert' : 'status'} className={`rounded-xl border px-4 py-3 text-sm font-semibold ${error ? 'border-danger bg-danger-bg text-danger' : 'border-success bg-success-bg text-success'}`}>
      {error ?? success}
    </p>
  );
}
