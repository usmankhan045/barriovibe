const attempts = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW = 15 * 60 * 1000;

export function loginAllowed(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const record = attempts.get(key);
  if (!record || record.resetAt <= now) return { allowed: true, retryAfter: 0 };
  return {
    allowed: record.count < LIMIT,
    retryAfter: Math.max(1, Math.ceil((record.resetAt - now) / 1000)),
  };
}

export function loginFailed(key: string): void {
  const now = Date.now();
  const record = attempts.get(key);
  attempts.set(
    key,
    !record || record.resetAt <= now
      ? { count: 1, resetAt: now + WINDOW }
      : { count: record.count + 1, resetAt: now + WINDOW },
  );
  if (attempts.size > 1000) {
    for (const [candidate, value] of attempts) {
      if (value.resetAt <= now) attempts.delete(candidate);
    }
  }
}

export function loginSucceeded(key: string): void {
  attempts.delete(key);
}
