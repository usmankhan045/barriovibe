'use client';

import { useActionState } from 'react';
import { loginAction, type ActionState } from '@/lib/admin/actions';
import { Field, inputClass, Message } from '../ui';

export default function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(loginAction, {} as ActionState);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <Message error={state.error} />
      <Field label="Admin password" htmlFor="password">
        <input id="password" name="password" type="password" autoComplete="current-password" autoFocus required className={inputClass} />
      </Field>
      <button disabled={pending} className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-[0_4px_0_var(--color-blue-800)] disabled:opacity-60">
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
