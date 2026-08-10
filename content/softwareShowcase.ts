/**
 * The home page's dedicated look at Software & AI.
 *
 * Pillar 01 leads the site (see the note in content/pillars.ts on why), and
 * this section is where that gets shown rather than just claimed: six real
 * services, pulled from content/services/software-ai.ts by slug so the link
 * and the icon can never drift from the service page they point to.
 *
 * `description` is homepage-only copy, deliberately shorter and terser than
 * the service page's own `oneLiner` — a capability statement, not a sentence
 * of scene-setting. Same rule as content/capabilities.ts: mechanism words,
 * not adjectives.
 *
 * Digital FTE sits second, right after AI agents, on purpose: it is the
 * client's most distinctive offering inside software and AI, a persona-built
 * clone of one specific person rather than a task-scoped agent, and the two
 * are easy to conflate if they are not shown as separate cards with separate
 * claims. AI Prompt Engineering still exists as a service (see
 * content/services/software-ai.ts) but does not get a homepage card — six
 * slots is the width of one row at three columns, and Digital FTE earns the
 * slot Prompt Engineering held.
 */
export interface SoftwareShowcaseItem {
  /** Must match a slug in content/services/software-ai.ts. */
  slug: string;
  title: string;
  description: string;
}

export const SOFTWARE_SHOWCASE: SoftwareShowcaseItem[] = [
  {
    slug: 'agentic-ai-development',
    title: 'AI agents',
    description:
      'Software that plans, acts and completes real, multi-step work across your systems, escalating to a person only where judgement is required.',
  },
  {
    slug: 'digital-fte',
    title: 'Digital FTE',
    description:
      'A persona-built AI modelled on one specific person, a coach, a founder, an advisor, trained on their judgement and voice to run a defined slice of their work.',
  },
  {
    slug: 'workflow-automation',
    title: 'Workflow automation',
    description:
      'Manual handoffs re-engineered into monitored, self-reporting workflows connecting every tool your team runs.',
  },
  {
    slug: 'chatbot-development',
    title: 'AI chatbots',
    description:
      'Support and sales conversations grounded in your own data, deployed to WhatsApp, web and social with a clean handover to your team.',
  },
  {
    slug: 'app-development',
    title: 'Mobile applications',
    description:
      'Native-grade iOS and Android products engineered from a single codebase and shipped through both stores.',
  },
  {
    slug: 'web-development',
    title: 'Full-stack web development',
    description:
      'Marketing sites and web applications, frontend and backend, engineered for load speed, search visibility and a measurable conversion rate.',
  },
] as const;
