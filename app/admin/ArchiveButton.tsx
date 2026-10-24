'use client';

import { archiveContentAction } from '@/lib/admin/actions';
import type { EditorialKind } from '@/lib/editorial-content';

export default function ArchiveButton({ kind, sourceKey, isSourceControlled }: { kind: EditorialKind; sourceKey: string; isSourceControlled: boolean }) {
  return (
    <form action={archiveContentAction} onSubmit={(event) => { if (!window.confirm(isSourceControlled ? 'Archive this item? The source version will stay in the repository and can be restored later.' : 'Delete this dashboard-created item? This cannot be undone.')) event.preventDefault(); }}>
      <input type="hidden" name="kind" value={kind} /><input type="hidden" name="sourceKey" value={sourceKey} />
      <button className="w-full rounded-xl border border-danger px-4 py-2.5 text-sm font-bold text-danger hover:bg-danger-bg">{isSourceControlled ? 'Archive' : 'Delete'}</button>
    </form>
  );
}
