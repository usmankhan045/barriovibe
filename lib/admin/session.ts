import 'server-only';
import crypto from 'node:crypto';
import { cache } from 'react';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'barriovibe_admin_session';
const MAX_AGE_SECONDS = 60 * 60 * 12;

interface SessionPayload {
  iat: number;
  exp: number;
}

function secret(): string {
  const value = process.env.ADMIN_SESSION_SECRET ?? '';
  if (value.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET must be set to at least 32 characters.');
  }
  return value;
}

function signature(body: string): string {
  return crypto.createHmac('sha256', secret()).update(body).digest('base64url');
}

function equal(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export function verifyPassword(provided: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? '';
  if (!expected) throw new Error('ADMIN_PASSWORD is not configured.');
  const left = crypto.createHash('sha256').update(provided).digest();
  const right = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(left, right);
}

function token(): string {
  const iat = Math.floor(Date.now() / 1000);
  const body = Buffer.from(
    JSON.stringify({ iat, exp: iat + MAX_AGE_SECONDS } satisfies SessionPayload),
  ).toString('base64url');
  return `${body}.${signature(body)}`;
}

function verify(value: string | undefined): SessionPayload | null {
  if (!value) return null;
  const split = value.lastIndexOf('.');
  if (split < 1) return null;
  const body = value.slice(0, split);
  try {
    if (!equal(value.slice(split + 1), signature(body))) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload;
    if (typeof payload.iat !== 'number' || typeof payload.exp !== 'number') return null;
    return payload.exp > Date.now() / 1000 ? payload : null;
  } catch {
    return null;
  }
}

export async function startSession(): Promise<void> {
  (await cookies()).set(COOKIE_NAME, token(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}

export const getSession = cache(async () => verify((await cookies()).get(COOKIE_NAME)?.value));

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  return session;
}
