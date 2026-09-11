import type { Post } from './types';

/**
 * Cluster 8 in research/POSTS.md: AI agents, cost and failure.
 *
 * `ai-cost-intent-confirmed` is the finding behind this cluster: of 5,263
 * AI/dev queries harvested, 2,042 are commercial-intent, and "ai agent cost per
 * month" and "ai agent development cost" both sit at maximum autocomplete
 * prominence on Google and Bing.
 *
 * DEMAND.md's note on the competition is the brief: the ranking articles quote
 * ranges with no methodology. So this post shows the calculation instead, from
 * published list prices, and names the date it read them.
 */
export const AGENT_COST_POSTS: Post[] = [
  {
    slug: 'what-an-ai-agent-costs-to-run',
    cluster: 'agent-cost',
    title: 'What an AI Agent Costs to Run, With the Arithmetic Shown',
    navLabel: 'What an agent costs to run',
    card: 'Published API prices, a worked example, and the one architectural decision that changes the bill by 80 percent.',

    answer:
      'Running cost is driven by how much text the agent re-reads each turn, not by which model you picked. An agent re-sends its system prompt and tool definitions on every turn, so that fixed prefix is the largest repeated charge in a run. Caching it cuts the cost of those tokens by 80 to 95 percent, and it pays for itself from the third turn onward. Get that wrong and no model choice will rescue the bill.',

    sections: [
      {
        kind: 'prose',
        heading: 'Why published agent costs are all useless',
        body: [
          'Search for what an AI agent costs and you get ranges: a few hundred a month, or tens of thousands, depending on complexity. The ranges are not wrong. They are unfalsifiable, because none of them shows a calculation you could check against your own case.',
          'The inputs are public. Every major vendor publishes per-token prices. What is missing from the published content is the structure of an agent run, and that is what decides the bill.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The one thing about agents that costs money',
        body: [
          'A chatbot answers a question and forgets it. An agent works through a task in turns: it thinks, calls a tool, reads the result, thinks again. That loop is what makes it useful and it is also what makes it expensive, for a reason that is not obvious until you see a bill.',
          'On every turn, the model is re-sent the whole conversation so far. Your system prompt, your tool definitions, the earlier turns and every tool result already returned. Nothing is remembered between calls; it is all re-read.',
          'So a ten-turn agent run does not cost ten times one turn. It costs closer to the sum of a growing context, and the fixed part at the front, the system prompt and tool definitions, is paid for ten times over.',
        ],
      },
      {
        kind: 'table',
        heading: 'Published API prices',
        intro:
          'US dollars per million tokens, read from each vendor\'s own pricing page on 11 September 2026. List prices, standard processing.',
        columns: ['Model', 'Input', 'Output', 'Cached input'],
        rows: [
          ['Claude Opus 5', '$5', '$25', '$0.50'],
          ['Claude Sonnet 5', '$2', '$10', '$0.20'],
          ['Claude Haiku 4.5', '$1', '$5', '$0.10'],
          ['GPT-6 Astra', '$10', '$50', '$1.00'],
          ['GPT-5.6 Terra', '$2', '$12', '$0.20'],
          ['GPT-5.6 Luna', '$0.20', '$1.20', '$0.02'],
        ],
      },
      {
        kind: 'prose',
        body: [
          'Look at the last column rather than the first. Cached input on Anthropic\'s models is one twentieth of fresh input. On OpenAI\'s it is one tenth. That ratio, not the difference between models, is the largest lever available to you.',
        ],
      },
      {
        kind: 'steps',
        heading: 'How to work out your own number',
        intro:
          'Four inputs, and you can get all of them before writing any code. Do this on the back of an envelope before committing to a build.',
        steps: [
          {
            title: 'Measure your fixed prefix',
            body:
              'Count the tokens in your system prompt plus your tool definitions. This is re-sent every single turn and is usually the biggest surprise: a dozen tools with thorough descriptions runs to several thousand tokens before the user has said anything.',
          },
          {
            title: 'Estimate turns per task',
            body:
              'How many tool calls does the agent make before it is done? A lookup-and-answer agent might be two or three. A research or multi-step operational agent is commonly ten to twenty, and a stuck one is more.',
          },
          {
            title: 'Multiply, then add the growth',
            body:
              'Fixed prefix times turns gives your floor. Then add the accumulating conversation: each tool result stays in context for every subsequent turn, so a verbose tool is charged repeatedly rather than once.',
          },
          {
            title: 'Apply the cache, then multiply by volume',
            body:
              'Move the fixed prefix to the cached rate, add one cache write per run, and multiply by how many times a day this runs. That is your monthly figure, and it is checkable rather than asserted.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'A worked example',
        body: [
          'Take an agent with a 20,000-token fixed prefix, which is an ordinary size once you have a real system prompt and eight or ten tools defined. Say it runs twelve turns to finish a task, and you are using Claude Opus 5 at $5 per million input tokens.',
          'Uncached, that prefix alone costs 20,000 × 12 = 240,000 input tokens, or $1.20 per run, before a single tool result or output token is counted.',
          'Cached, you pay one cache write at $6.25 per million, then eleven reads at $0.50 per million: about $0.23 per run. The same work, 80 percent cheaper, with no change to the model or the prompt.',
          'At a thousand runs a day that is the difference between roughly $1,200 and $230 a month, on the prefix alone.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'Caching is a loss if you only read once',
        body:
          'A cache write costs more than an ordinary read: 1.25 times the input price on Anthropic\'s models. Writing a prefix to cache and then using it once is more expensive than not caching at all. The break-even is a little under two and a half reads, so by the third turn you are ahead. This is why caching is an agent optimisation specifically: agents re-read by nature, one-shot calls do not.',
      },
      {
        kind: 'prose',
        heading: 'What this means for choosing a model',
        body: [
          'Model choice matters less than the loop does. A well-built agent on an expensive model routinely costs less to run than a badly built one on a cheap model, because the badly built one re-sends everything at full price on every turn and takes more turns to finish.',
          'The sensible order is: get the loop right, cache the fixed prefix, keep tool results terse, and only then argue about models. Most teams do this in reverse and spend the argument on the smallest variable.',
          'There is a real caveat in the price table above, worth stating because it will date this post: the GPT-5.6 Sol price is explicitly promotional, published as available at least through 21 November 2026. Any arithmetic built on a promotional rate has an expiry attached to it.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What this post is not costing',
        body: [
          'Three things, all of which are frequently larger than the API bill.',
          'The build. Designing, writing and testing an agent is engineering work and it dominates year one for most projects.',
          'The failures. An agent that loops, retries or gets stuck still burns tokens, and the pathological cases are the expensive ones. Budget for the agent that does not work, not only the one that does.',
          'The people. Someone has to watch what the agent is doing, and that is not free either. The published three-year comparisons that omit this are the reason cost estimates come in so low.',
        ],
      },
    ],

    faqs: [
      {
        question: 'What does an AI agent cost per month?',
        answer:
          'It depends on your fixed prefix, your turns per task and your volume, and anyone quoting a figure without those three has guessed. As a worked example: a 20,000-token prefix, twelve turns, a thousand runs a day, on Claude Opus 5 with caching, is roughly $230 a month for the repeated prefix. Uncached, the same work is about $1,200.',
      },
      {
        question: 'Does prompt caching actually save money?',
        answer:
          'Yes, on anything that re-reads the same context. Cached input is one twentieth of fresh input on Anthropic\'s models and one tenth on OpenAI\'s. The cache write costs 1.25 times an ordinary read, so you are behind after one use and ahead from the third, which makes it close to free money for an agent and a small loss for a one-shot call.',
      },
      {
        question: 'Is a cheaper model the way to cut agent costs?',
        answer:
          'Usually not first. The loop structure and caching move the bill by multiples; model choice moves it by a factor of two to five. A cheaper model that needs more turns to finish can cost more overall, and it is also the change most likely to degrade the output.',
      },
      {
        question: 'Why does my agent bill grow during a single task?',
        answer:
          'Because context accumulates. Every tool result stays in the conversation for every later turn, so a verbose tool output is charged again on each subsequent call. Trimming what tools return is often the single highest-leverage change after caching.',
      },
      {
        question: 'Are batch discounts worth using for agents?',
        answer:
          'Both Anthropic and OpenAI publish 50 percent batch discounts, but batch processing is asynchronous. It suits bulk classification or summarisation, not an agent a user is waiting on. If your agent runs overnight against a queue, it is worth looking at.',
      },
    ],

    publishedAt: '2026-09-11T07:00:00Z',
    reviewedOn: '2026-09-11',

    sources: [
      {
        label: 'Anthropic pricing',
        url: 'https://www.anthropic.com/pricing',
        readOn: '2026-09-11',
        supports: 'Claude input, output and prompt-caching read and write prices, and the batch discount.',
      },
      {
        label: 'OpenAI API pricing',
        url: 'https://openai.com/api/pricing/',
        readOn: '2026-09-11',
        supports: 'GPT model input, output and cached-input prices, and the promotional rate caveat.',
      },
    ],

    limits: [
      'List prices on one date. These change often, and one of them is explicitly promotional with a stated end date.',
      'The worked example uses a 20,000-token prefix and twelve turns because those are ordinary, not because they are yours. The method is the point; substitute your own numbers.',
      'Output tokens are not modelled in the worked example, which isolates the prefix effect. Output is charged at five times input on most models and matters for verbose agents.',
      'Build cost, failure cost and supervision are excluded and are frequently larger than the API bill.',
    ],

    cta: {
      heading: 'Want the arithmetic run on your agent?',
      body: 'Tell us what the agent does, roughly how many tools it has and how often it runs. We will do the calculation above against your case and say plainly whether the running cost is the thing you should be worried about.',
      buttonLabel: 'Get the numbers',
      href: '/contact?service=ai-agents',
    },

    related: ['n8n-zapier-make-real-cost'],

    seo: {
      title: 'What an AI Agent Costs to Run: The Real Arithmetic',
      description:
        'Agent cost is driven by the context re-sent every turn, not by model choice. Published API prices, a worked example, and why caching cuts the bill by 80 percent.',
    },
  },
];
