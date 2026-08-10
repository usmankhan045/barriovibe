'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Field, SelectField, TextareaField } from '@/components/ui/Field';
import { Icon } from '@/components/icons';
import { validateLead, submitLead, type LeadInput } from '@/lib/leads';

/**
 * The contact form.
 *
 * Notable behaviours:
 *
 *   • The service dropdown is pre-selected from `?service=slug`, so a visitor
 *     arriving from a service page does not restate why they came. Options are
 *     grouped by pillar, matching the site's navigation.
 *   • On success the form is REPLACED rather than navigating. No page load, no
 *     back-button trap, and the confirmation says what happens next.
 *   • Errors are announced through `role="alert"`, and focus moves to the
 *     summary so a screen-reader user is told rather than left guessing.
 *   • Two invisible spam gates: a honeypot input and a mount-to-submit timer.
 *     Neither is a CAPTCHA, so neither costs a real user anything.
 */
/** Stable no-op subscriber; a new function identity each render would loop. */
const NO_SUBSCRIBE = () => () => {};

export interface ContactFormProps {
  /**
   * Built on the server and passed down. Importing SERVICE_GROUPS here instead
   * pulled all eighteen services' full text — every FAQ, every step
   * description — into the client bundle: 24KB gzipped to populate a dropdown
   * that needs two fields per option.
   */
  serviceOptions: { value: string; label: string }[];
  /** Passed for the same reason: avoids importing content/site client-side. */
  contact: { phone: string; whatsapp: string; email: string; responseTime: string };
}

export function ContactForm({ serviceOptions, contact }: ContactFormProps) {
  /*
   * `?service=` is read from the URL after mount rather than with
   * `useSearchParams`.
   *
   * useSearchParams forces the component into a Suspense boundary at
   * prerender time, and the static HTML then contains only the fallback. An
   * audit found the consequence: with JavaScript disabled, /contact showed a
   * permanent "Loading form…" tile and no <form> element existed in the
   * markup at all — which reads as a broken page rather than a degraded one.
   *
   * `useSyncExternalStore` keeps the whole form in the prerendered HTML: the
   * server snapshot is '' and the client snapshot reads the URL. It is the
   * right primitive here rather than an effect — reading browser-only state
   * in an effect and calling setState causes a cascading render, which
   * React's lint rules correctly flag.
   *
   * A no-JS visitor now sees a real form (with a <noscript> note explaining
   * how to reach us) instead of a spinner that never resolves.
   */
  const preselected = useSyncExternalStore(
    // The query string never changes without a navigation, which remounts
    // this component — so there is nothing to subscribe to.
    NO_SUBSCRIBE,
    // Client snapshot.
    () => new URLSearchParams(window.location.search).get('service') ?? '',
    // Server snapshot. Returning '' is what keeps the prerendered HTML stable
    // and free of hydration mismatch.
    () => '',
  );

  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mountedAt = useRef<number>(0);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Recorded in an effect so it is browser time, not build time.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (formError) alertRef.current?.focus();
  }, [formError]);

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus();
  }, [status]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const form = new FormData(event.currentTarget);
    const input: LeadInput = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      phone: String(form.get('phone') ?? ''),
      company: String(form.get('company') ?? ''),
      service: String(form.get('service') ?? ''),
      message: String(form.get('message') ?? ''),
      website: String(form.get('website') ?? ''),
      sourcePath: window.location.pathname + window.location.search,
      elapsedMs: Date.now() - mountedAt.current,
    };

    // Cheap client-side pass so obvious mistakes are caught without a round
    // trip. The server re-validates everything with zod regardless — this is
    // convenience, not security. See lib/leads.ts.
    const errors = validateLead(input);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setFormError('Please check the highlighted fields.');
      return;
    }

    setStatus('submitting');
    const result = await submitLead(input);

    if (result.ok) {
      setStatus('sent');
      return;
    }

    setStatus('idle');
    setFormError(result.message);
    if (result.fieldErrors) setFieldErrors(result.fieldErrors);
  }

  if (status === 'sent') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="u-tile flex flex-col items-start p-8 focus-visible:outline-none md:p-10"
      >
        <span className="u-badge u-badge--blue grid size-14 place-items-center">
          <Icon name="check" size={26} />
        </span>
        <h2 className="mt-6 font-display text-h3 text-ink">Enquiry received.</h2>
        <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.65] text-ink-body">
          {contact.responseTime} If it is urgent, message us on WhatsApp at{' '}
          {contact.phone} and mention that you have just submitted the form.
        </p>
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="u-btn u-btn--chrome u-btn--sm mt-7"
        >
          Message on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="u-tile p-6 md:p-9">
      {formError && (
        <div
          ref={alertRef}
          role="alert"
          tabIndex={-1}
          className="mb-7 flex items-start gap-3 rounded-chip bg-danger-bg px-4 py-3.5 focus-visible:outline-none"
        >
          <Icon name="close" size={16} className="mt-0.5 flex-none text-danger" />
          <p className="text-[14px] text-danger">{formError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          name="name"
          label="Your name"
          required
          autoComplete="name"
          placeholder="Ayesha Khan"
          error={fieldErrors.name}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          error={fieldErrors.email}
        />
        <Field
          name="phone"
          label="Phone or WhatsApp"
          type="tel"
          autoComplete="tel"
          placeholder="+92 300 0000000"
          error={fieldErrors.phone}
        />
        <Field
          name="company"
          label="Company"
          autoComplete="organization"
          placeholder="Company name"
          error={fieldErrors.company}
        />
        {/* Full width on the last row. The budget select used to sit beside
            it; with that gone the five remaining fields leave an odd half-empty
            row, and this is the field whose option labels are longest anyway. */}
        <div className="sm:col-span-2">
          <SelectField
            name="service"
            label="What do you need?"
            placeholder="Choose a service"
            // `key` remounts the select once the slug is read from the URL, so
            // the browser picks up the new defaultValue. Cheaper than making the
            // field controlled for a value that is set exactly once.
            key={preselected}
            defaultValue={preselected}
            options={serviceOptions}
            error={fieldErrors.service}
          />
        </div>
      </div>

      <div className="mt-5">
        <TextareaField
          name="message"
          label="Tell us about it"
          required
          rows={6}
          placeholder="What are you trying to solve, and by when? The more specific you are, the more useful our first reply will be."
          error={fieldErrors.message}
        />
      </div>

      {/*
        Honeypot. Hidden from sight AND from assistive tech, and removed from
        the tab order — a real user can neither see nor reach it, so anything
        filled in here is automated.
      */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <noscript>
        <p className="mt-6 rounded-chip bg-blue-50 px-4 py-3.5 text-[14px] leading-[1.6] text-ink-strong">
          This form needs JavaScript to send. With it disabled, please email{' '}
          <a href={`mailto:${contact.email}`} className="font-bold text-blue-600 underline">
            {contact.email}
          </a>{' '}
          or message {contact.phone} on WhatsApp. Both reach us the same way.
        </p>
      </noscript>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="u-btn u-btn--blue u-btn--lg"
        >
          {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
          {status === 'submitting' && (
            <span
              className="size-4 animate-spin rounded-pill border-2 border-white/30 border-t-white"
              aria-hidden="true"
            />
          )}
        </button>

        <p className="text-[13px] text-ink-body">{contact.responseTime}</p>
      </div>

      {/* Announces the sending state to screen readers without a visual change. */}
      <p aria-live="polite" className="sr-only">
        {status === 'submitting' ? 'Sending your enquiry.' : ''}
      </p>
    </form>
  );
}
