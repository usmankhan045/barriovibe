import 'server-only';
import { z } from 'zod';
import { SERVICES } from '@/content/services';
import { LEAD_RULES } from './leads';

/**
 * Lead validation — the SERVER half. This is the real security boundary.
 *
 * `import 'server-only'` makes it a build error for a client component to
 * import this file, which is what guarantees zod and the full service content
 * stay out of the browser bundle. Between them they were 90KB gzipped.
 *
 * Limits come from LEAD_RULES in ./leads so the client's cheap checks and this
 * schema cannot drift apart.
 */

const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(LEAD_RULES.name.min, 'Please enter your name.')
    .max(LEAD_RULES.name.max, 'That name is too long.'),

  email: z
    .string()
    .trim()
    .min(1, 'We need an email to reply to.')
    .email('That does not look like a valid email address.')
    .max(LEAD_RULES.email.max),

  phone: z.string().trim().max(LEAD_RULES.phone.max).optional().or(z.literal('')),

  company: z.string().trim().max(LEAD_RULES.company.max).optional().or(z.literal('')),

  // Constrained to real slugs so a tampered request cannot write arbitrary
  // strings into the database.
  service: z
    .string()
    .refine((v) => v === '' || v === 'not-sure' || SERVICE_SLUGS.includes(v), {
      message: 'Please choose a service from the list.',
    })
    .optional()
    .or(z.literal('')),

  message: z
    .string()
    .trim()
    .min(LEAD_RULES.message.min, 'Tell us a little more, at least a sentence.')
    .max(LEAD_RULES.message.max, 'That message is too long. Please email us instead.'),

  sourcePath: z.string().max(300).optional(),

  /** Honeypot. Must be empty — a real user never sees this field. */
  website: z.string().max(0, 'Rejected.').optional(),

  /** Milliseconds from form mount to submit. */
  elapsedMs: z.number().int().nonnegative().optional(),
});
