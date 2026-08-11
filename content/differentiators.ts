import type { BadgeVariant, IconName } from './types';

/**
 * "Why choose us" — six reasons, from mockup 3.
 *
 * Each is written as a commitment that can be verified rather than an
 * adjective. "We reply within one working day" is checkable; "great
 * communication" is not.
 *
 * Every badge is `chrome`, matching the pillars — one silver treatment across
 * the whole site rather than a blue/chrome alternation. See content/pillars.ts.
 */
export interface Differentiator {
  title: string;
  description: string;
  icon: IconName;
  badge: BadgeVariant;
}

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: 'One accountable team',
    description:
      'Your accountant, your marketer and your developer work at the same firm and answer to the same account lead. There is no other vendor to blame.',
    icon: 'knight',
    badge: 'chrome',
  },
  {
    title: 'Fixed scope, fixed dates',
    description:
      'You get the scope and the date in writing before work starts. Changes are agreed up front, never assumed.',
    icon: 'shield',
    badge: 'chrome',
  },
  {
    title: 'Deadlines we own',
    description:
      'Every statutory date sits on a calendar we watch. You hear from us before a deadline, not after a penalty.',
    icon: 'clock',
    badge: 'chrome',
  },
  {
    title: 'You own everything',
    description:
      'Accounts, repositories, ad accounts and source files stay in your name. Leaving us costs you a password change.',
    icon: 'users',
    badge: 'chrome',
  },
  {
    title: 'Reported against revenue',
    description:
      'Marketing is measured on cost per acquisition and return on spend. Impressions are not a result.',
    icon: 'chart',
    badge: 'chrome',
  },
  {
    title: 'We say no',
    description:
      'If a cheaper tool or a different firm suits you better, we say so. Taking on work we are wrong for costs us more than the fee is worth.',
    icon: 'award',
    badge: 'chrome',
  },
];

/**
 * How we work — the four-step engagement shown on the home page.
 */
export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  /**
   * The pill shown over the step's photograph in the timeline.
   *
   * Every one of these restates something the step's own `description`
   * already commits to — "no obligation" → "No obligation", "a written scope"
   * → "In writing". That rule is the whole point of the field: the timeline
   * component it feeds has a `category` slot that invites a marketing word,
   * and a tag that cannot be traced to a sentence below it is a new promise
   * being made in a badge, where nobody has to stand behind it.
   */
  tag: string;
}

export const PROCESS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description:
      'A call to understand the business, the constraint and the deadline. No pitch deck, no obligation.',
    tag: 'No obligation',
  },
  {
    number: '02',
    title: 'Scope and schedule',
    description:
      'A written scope listing what is included, what is not, and the date it lands. You approve before anything starts.',
    tag: 'In writing',
  },
  {
    number: '03',
    title: 'Execute',
    description:
      'The work, with a named point of contact and a status you can check rather than chase.',
    tag: 'Named contact',
  },
  {
    number: '04',
    title: 'Report',
    description:
      'Deliverables handed over with the numbers behind them, and a clear view of what happens next.',
    tag: 'With numbers',
  },
];
