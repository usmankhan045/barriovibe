/**
 * Renders the two contact emails to /tmp so they can be eyeballed without
 * sending anything. Not part of the build: `npx tsx scripts/preview-email.mts`.
 */
import { autoReplyEmail, notificationEmail } from '../lib/email/templates';
import { writeFileSync } from 'node:fs';

const lead = {
  name: 'Ayesha Raza',
  email: 'ayesha@northfieldtrading.pk',
  phone: '+92 300 1234567',
  company: 'Northfield Trading',
  service: 'E-commerce & Marketplaces',
  message: `We run a home textiles brand selling on Daraz and our own Shopify store, and we are about to open a US storefront.

Two things we need help with: the Shopify site converts at about 0.9% which feels low, and we have no idea how to handle sales tax once we start shipping into the States.

Could we get a call this week to scope it?`,
  sourcePath: '/services/ecommerce',
};

const reply = autoReplyEmail(lead);
const notify = notificationEmail(lead, { submittedAt: new Date('2026-08-31T14:05:00Z') });
writeFileSync('/tmp/email-reply.html', reply.html);
writeFileSync('/tmp/email-notify.html', notify.html);

/* The injection case. Every one of these fields is public input. */
const hostile = {
  name: '<script>alert(1)</script>Bobby',
  email: 'x@y.com',
  company: '"><img src=x onerror=alert(2)>',
  message: 'Closing the layout: </td></tr></table><h1 style="color:red">INJECTED</h1>',
};
const hostileHtml = autoReplyEmail(hostile).html;
writeFileSync('/tmp/email-hostile.html', hostileHtml);

const leaked = ['<script', 'onerror=', '<h1 style="color:red"'].filter((s) =>
  hostileHtml.includes(s),
);
console.log('REPLY SUBJECT :', reply.subject);
console.log('NOTIFY SUBJECT:', notify.subject);
console.log('INJECTION     :', leaked.length ? `LEAKED ${JSON.stringify(leaked)}` : 'all escaped');
