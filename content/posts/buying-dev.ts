import type { Post } from './types';

/**
 * Category 6 of research/CATALOGUE.md: choosing who builds it.
 *
 * 960 queries, and an information space written almost entirely by sellers.
 * We are also a seller, which is why the load-bearing facts in these posts
 * come from statute, regulators and peer-reviewed work rather than from our
 * judgement, and why several of them argue against our own interest.
 */
export const BUYING_DEV_POSTS: Post[] = [
  {
    slug: 'you-probably-do-not-own-the-code',
    cluster: 'buying-dev',
    title: 'You Probably Do Not Own the Code You Paid For',
    navLabel: 'Who owns the code',
    card: 'In both US and UK law the default is that the contractor keeps the copyright. Paying for it does not transfer it.',

    answer:
      'Unless you have a written assignment, the developer who wrote your software probably owns the copyright in it, in both the United States and the United Kingdom. Paying for work does not transfer copyright. In the US, software is not among the categories that can be a work made for hire by contract, so even a clause saying work made for hire can fail. In the UK there is no commissioned-works provision at all: the author is the first owner.',

    sections: [
      {
        kind: 'prose',
        heading: 'The assumption almost everyone makes',
        body: [
          'You commissioned it, you paid for it, you own it. That is how it works for a physical thing, and it is not how copyright works in either of the two jurisdictions most likely to govern your contract.',
          'This post costs us nothing to publish and saves a reader a great deal, which is the main reason it exists. It is also the single most common gap we find when reviewing an existing arrangement.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The US position, and why the usual clause can fail',
        body:
          'US law allows certain commissioned works to be treated as works made for hire by written agreement, but only for nine enumerated categories, and software is not among them. The Copyright Office puts the consequence plainly: "If a work fails to satisfy any of these requirements, it is not a work made for hire." So a contract that simply says the software is a work made for hire may not achieve anything. The instrument that reliably works is an assignment of copyright, in writing, signed.',
      },
      {
        kind: 'prose',
        heading: 'The UK position gets there by a different route',
        body: [
          'The Copyright, Designs and Patents Act 1988 states at section 11 that "The author of a work is the first owner of any copyright in it", subject to provisions that cover employees rather than contractors.',
          'There is no commissioned-works provision. The UK Intellectual Property Office states it directly: the first legal owner of copyright is the person or organisation that created the work rather than the commissioner, unless otherwise agreed in writing.',
          'The practical consequence is the same as in the US by a different mechanism. Without a written assignment, a commissioner may hold only an implied licence to use the work for the purpose it was commissioned for, which is a much narrower right than ownership.',
        ],
      },
      {
        kind: 'table',
        heading: 'What the difference actually costs you',
        intro:
          'These are the situations where a licence and ownership diverge, and they are the situations that matter commercially.',
        columns: ['What you want to do', 'With ownership', 'With an implied licence'],
        rows: [
          ['Hire someone else to modify it', 'Yes', 'Possibly not'],
          ['Sell the business including the software', 'Yes', 'A due diligence problem'],
          ['Use it for a second product', 'Yes', 'Probably outside the purpose'],
          ['Open source it', 'Yes', 'No'],
          ['Stop the developer reusing it elsewhere', 'Yes', 'No'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The one that surfaces at the worst moment',
        body: [
          'Most businesses never test this, because most software is never sold and never migrates away from the people who built it.',
          'It surfaces during due diligence. An acquirer asks for evidence that the company owns its principal asset, and the answer is a set of invoices. Invoices prove payment rather than ownership, and the question then becomes whether a developer contactable three years later will sign an assignment now, on terms set by the fact that they know what it is worth.',
          'The second common moment is a relationship ending badly. If the working relationship is over and there is no assignment, the negotiation happens at exactly the point when goodwill is lowest.',
        ],
      },
      {
        kind: 'steps',
        heading: 'Fixing it, in order of cost',
        intro:
          'The first is free if you do it now and expensive if you do it later, which is the whole shape of this problem.',
        steps: [
          {
            title: 'Get an assignment in writing, signed, before work starts',
            body:
              'Not a clause saying work made for hire on its own, since in the US that may not reach software. An assignment of copyright, expressly covering the software and its documentation, signed by the developer or the agency.',
          },
          {
            title: 'Check whether the developer was an employee or a contractor',
            body:
              'Work by an employee within the scope of their employment is treated differently in both jurisdictions. A contractor, freelancer or agency is the case this post is about, and it is the more common one.',
          },
          {
            title: 'Ask about third-party and open-source components',
            body:
              'Ownership of the code your developer wrote does not extend to libraries they used. Ask for a list and their licences, because some licence terms affect what you can do with the whole.',
          },
          {
            title: 'Check whose name the accounts are in',
            body:
              'Hosting, domain, app store, analytics, payment gateway. Ownership of the code is small comfort if the domain is registered to someone you are no longer speaking to.',
          },
          {
            title: 'If work is already done, ask now rather than later',
            body:
              'A developer on good terms will usually sign an assignment without much fuss. The same request in two years, during a sale, is a negotiation with a counterparty who has learned what it is worth.',
          },
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'What this post is not',
        body:
          'This is general information about the default position in two jurisdictions, not legal advice about your contract. Copyright, moral rights, database rights and the treatment of derivative works all have detail this post does not cover, and the law that applies depends on where the parties are and what the contract says. What it should do is prompt you to look at your own paperwork.',
      },
      {
        kind: 'prose',
        heading: 'What we do about this',
        body: [
          'We build software for clients, so the default position here is one that favours us and we are telling you how to remove it.',
          'Our contracts assign copyright to the client on final payment, and we say so up front rather than waiting to be asked. The reason is commercial rather than principled: a client who later discovers they do not own what they paid for will not be a client again, and the value of that relationship exceeds any value in retaining code we were paid to write.',
          'The place we do keep something is reusable components. If we bring a library we already own into a project, we license it rather than assigning it, and we name it in the contract so nobody is surprised later. That is a normal arrangement and the only dishonest version is the one that is not written down.',
          'When a client comes to us with an existing codebase, this is among the first things we check, and the answer is frequently that nobody ever asked. It is usually fixable, and it is always cheaper to fix before it matters.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Do I own the code if I paid for it?',
        answer:
          'Probably not without a written assignment. In both the US and the UK the default is that the author owns the copyright, and payment alone does not transfer it. You may hold an implied licence to use the work for its commissioned purpose, which is narrower than ownership.',
      },
      {
        question: 'Does a work made for hire clause protect me?',
        answer:
          'In the US it may not, because software is not among the nine categories of commissioned work that can be treated as work made for hire by agreement. The Copyright Office states that a work failing any requirement is not a work made for hire. An assignment is the reliable instrument.',
      },
      {
        question: 'What is the UK position?',
        answer:
          'The Copyright, Designs and Patents Act 1988 section 11 makes the author the first owner, and there is no commissioned-works provision. The UK IPO states that the commissioner is not the first owner unless agreed in writing.',
      },
      {
        question: 'When does this actually cause a problem?',
        answer:
          'Usually during due diligence for a sale or investment, when an acquirer asks for evidence that the company owns its main asset and receives invoices instead. The other common moment is a relationship ending badly, when the assignment has to be negotiated with no goodwill left.',
      },
      {
        question: 'Can I fix it after the work is done?',
        answer:
          'Usually yes, by asking for an assignment now. A developer on good terms will normally sign one without difficulty. The same request during a sale is a negotiation with someone who has learned exactly what it is worth to you.',
      },
    ],

    publishedAt: '2026-10-31T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'US Copyright Office, Circular 30: Works Made for Hire',
        url: 'https://www.copyright.gov/circs/circ30.pdf',
        readOn: '2026-09-11',
        supports: 'The nine enumerated categories for commissioned works, the absence of software from them, and that a work failing any requirement is not a work made for hire.',
      },
      {
        label: 'Copyright, Designs and Patents Act 1988, section 11',
        url: 'https://www.legislation.gov.uk/ukpga/1988/48/section/11',
        readOn: '2026-09-11',
        supports: 'That the author of a work is the first owner of any copyright in it, and the absence of a commissioned-works provision.',
      },
      {
        label: 'UK Intellectual Property Office, guidance on ownership of copyright works',
        url: 'https://www.gov.uk/guidance/ownership-of-copyright-works',
        readOn: '2026-09-11',
        supports: 'That the first legal owner is the creator rather than the commissioner unless otherwise agreed in writing.',
      },
    ],

    limits: [
      'This is general information about default positions in two jurisdictions, not legal advice. What applies to you depends on your contract, where the parties are, and facts this post cannot see.',
      'It covers copyright in commissioned software. Moral rights, database rights, patents and the treatment of derivative works have detail that is out of scope.',
      'Employment changes the analysis. Work by an employee within the scope of employment is treated differently from contractor work in both jurisdictions.',
      'We sell development services, so the default position described here is one that favours us commercially. That is why the statute is cited rather than summarised.',
    ],

    cta: {
      heading: 'Not sure what your contract actually says?',
      body: 'It is usually a five minute check: look for the word assignment rather than ownership, and check whose name the domain and hosting accounts are in. If you would like a second pair of eyes on an existing arrangement, we will tell you plainly what it looks like.',
      buttonLabel: 'Have it checked',
      href: '/contact?service=contract-drafting',
    },

    related: ['fixed-price-or-time-and-materials'],

    seo: {
      title: 'You Probably Do Not Own the Code You Paid For',
      description:
        'In US and UK law the contractor keeps copyright by default. Software is not a work made for hire category, and the UK has no commissioned-works provision.',
    },
  },

  {
    slug: 'fixed-price-or-time-and-materials',
    cluster: 'buying-dev',
    title: 'Fixed Price or Time and Materials: What the Evidence Says',
    navLabel: 'Fixed price or T and M',
    card: 'Fixed price does not transfer the risk it appears to. Two governments openly disagree about the alternative.',

    answer:
      'Fixed price looks like it moves the overrun risk to the supplier and only partly does: a study of 230 software projects found vendors bore about 66 percent of overruns on fixed-price contracts rather than 100, and still absorbed 26 percent on time and materials. There is no consensus on which is better. The US digital service says fixed price is not appropriate for custom agile development; the UK Cabinet Office warns that time and materials can drive the wrong behaviours.',

    sections: [
      {
        kind: 'prose',
        heading: 'The usual advice, and why it is too confident',
        body: [
          'The standard buyer advice is that fixed price protects you because the supplier carries the risk, and the standard supplier advice is that time and materials is fairer because nobody can predict the work.',
          'Both are partly true and the evidence is more interesting than either. It is also genuinely contested, which is worth saying plainly rather than manufacturing a consensus.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'Fixed price does not transfer what it appears to',
        body:
          'Banerjee and Duflo studied 230 projects across 125 software firms. A fixed-price contract nominally places the entire cost of an overrun on the vendor, and in practice vendors bore roughly 66 percent of it. On time and materials contracts, where the client nominally pays for everything, vendors still absorbed about 26 percent. Contracts are renegotiated, relationships matter, and neither structure allocates risk the way the paperwork says. Reputation, rather than the contract, does much of the work.',
      },
      {
        kind: 'prose',
        heading: 'Two governments, openly disagreeing',
        body: [
          'This is more useful than a false consensus, because it shows the disagreement is real and structural rather than a matter of one side being uninformed.',
          '18F, the US government digital service, states in its field guide that fixed-price contracts "are not appropriate for custom Agile software development services". The reasoning is that fixed price requires a fixed specification, and an agile process exists precisely because the specification is expected to change as you learn.',
          'The UK Cabinet Office has warned in the opposite direction, that time and materials contracts can drive the wrong behaviours, the concern being that a supplier paid by the hour has no structural incentive to finish quickly.',
          'Both are right about their own failure mode. Fixed price prices uncertainty and then fights about scope. Time and materials avoids the fight and removes the pressure to be efficient.',
        ],
      },
      {
        kind: 'table',
        heading: 'What each structure actually does',
        intro:
          'The third column is the one to plan around, because it is the failure mode you are choosing rather than avoiding.',
        columns: ['', 'What it is good at', 'How it fails'],
        rows: [
          ['Fixed price', 'Budget certainty, clear commitment', 'Scope disputes, padded margin, corner-cutting under pressure'],
          ['Time and materials', 'Adapts as you learn, no scope fight', 'No cost ceiling, no efficiency pressure'],
          ['Capped time and materials', 'Both, partially', 'The cap becomes the price, and the same disputes near it'],
          ['Per-sprint or per-phase', 'Small commitments, frequent exits', 'Overhead of re-contracting, less continuity'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The padding you cannot see',
        body: [
          'A fixed price on genuinely uncertain work contains a risk premium. It has to: the supplier is carrying a possibility and pricing it.',
          'You pay that premium whether or not the risk materialises, and you cannot see how large it is. If the work goes smoothly, the supplier keeps it. That is not sharp practice, it is what carrying risk means, and it is the cost of the certainty you asked for.',
          'What makes it worth knowing is that you are choosing to buy insurance. Sometimes that is exactly right: if a budget is fixed and exceeding it is a serious problem, paying a premium for certainty is rational. If you have flexibility, you are paying for something you do not need.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Why scope disputes are structural rather than personal',
        body: [
          'On a fixed-price project, every request becomes a question about whether it was in scope. That is not anyone behaving badly, it is the contract doing what it was designed to do.',
          'The consequence is that the relationship changes character partway through. Early on you are solving a problem together; later you are both consulting a document about what was agreed. Most of the unhappiness in fixed-price projects traces to that transition rather than to the money.',
          'The estimation research explains why it is unavoidable at scale. Most projects overrun, the typical overrun is 30 to 40 percent, and uncertainty does not reliably narrow as the project proceeds. A contract that assumed the specification was knowable up front is a contract that will meet reality.',
        ],
      },
      {
        kind: 'steps',
        heading: 'Choosing, in practice',
        intro:
          'The structure matters less than matching it to how well you know what you want.',
        steps: [
          {
            title: 'Ask how well specified this really is',
            body:
              'If you can describe the finished thing precisely and it will not change, fixed price is reasonable. If you expect to learn while building, fixed price is buying certainty about a specification you are going to alter.',
          },
          {
            title: 'Make it smaller instead',
            body:
              'The most effective move is not choosing the structure, it is reducing what is being committed to. A fixed price on two weeks of well-understood work is a good instrument. The same instrument on six months is a forecast with a signature on it.',
          },
          {
            title: 'If fixed price, define the change process first',
            body:
              'Not whether there will be changes, there will be. Agree in advance how a change is priced and who decides, because that conversation is much easier before either side has a position.',
          },
          {
            title: 'If time and materials, buy the efficiency pressure back',
            body:
              'Regular demonstrable output, a cap you can exit at, and visibility of where hours go. The failure mode is drift, and the antidote is short cycles with something usable at the end.',
          },
          {
            title: 'Ask what happens at the overrun',
            body:
              'Whatever the structure. A supplier with a clear answer is telling you they have been here; one who says it will not happen is contradicted by the research.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What we actually do, and why',
        body: [
          'We work both ways and we are not neutral, so here is the reasoning rather than a recommendation.',
          'We prefer smaller fixed-price pieces to either extreme: a defined chunk of work, priced, delivered, then the next decision made with more information than anyone had at the start. It gives the client budget certainty at each step and gives us a specification stable enough to price honestly.',
          'For genuinely exploratory work we would rather be on time and materials with a cap and a short cycle than pretend a fixed price is meaningful. A fixed price on work nobody can specify is a number with padding in it, and the padding is invisible to the client, which we dislike for the same reason clients dislike overruns.',
          'What we try to avoid is the long fixed-price project, which is the structure clients most often ask for. It sounds the safest and it produces the scope arguments, because the estimate was made at the moment of least knowledge and the contract fixes it there.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Is fixed price safer for the buyer?',
        answer:
          'Less than it appears. A study of 230 projects found vendors bore about 66 percent of overruns on fixed-price work rather than the full amount, and still absorbed 26 percent under time and materials. Contracts get renegotiated and relationships do much of the allocation the paperwork claims to.',
      },
      {
        question: 'Which contract type do the experts recommend?',
        answer:
          'They disagree, openly. The US digital service says fixed price is not appropriate for custom agile development; the UK Cabinet Office warns time and materials can drive the wrong behaviours. Both are describing a real failure mode, and neither structure avoids both.',
      },
      {
        question: 'What is the hidden cost of a fixed price?',
        answer:
          'A risk premium you cannot see. The supplier is pricing the possibility of overrun, and you pay it whether or not the risk occurs. That is rational if budget certainty genuinely matters to you, and a waste if you have flexibility.',
      },
      {
        question: 'How do I stop a time and materials project drifting?',
        answer:
          'Short cycles with something usable at the end, a cap you can exit at, and visibility of where hours are going. The failure mode is absence of efficiency pressure, so buy it back with frequent demonstrable output rather than with reporting.',
      },
      {
        question: 'Is there a better option than either?',
        answer:
          'Usually making the commitment smaller. A fixed price on two weeks of well-understood work is a sound instrument; the same structure across six months is a forecast with a signature on it. Breaking work into priced pieces gives certainty at each step without fixing an estimate made at the point of least knowledge.',
      },
    ],

    publishedAt: '2026-11-01T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Banerjee and Duflo, Reputation Effects and the Limits of Contracting, Quarterly Journal of Economics 115(3), 2000',
        url: 'https://economics.mit.edu/sites/default/files/publications/Reputation%20Effects%20and%20the%20Limits%20of%20Contracting.pdf',
        readOn: '2026-09-11',
        supports: 'The 230-project sample and the finding that vendors bore about 66 percent of fixed-price overruns and 26 percent under time and materials.',
      },
      {
        label: '18F, De-risking Government Technology: Federal Agency Field Guide',
        url: 'https://derisking-guide.18f.gov/',
        readOn: '2026-09-11',
        supports: 'That fixed-price contracts are not appropriate for custom agile software development services.',
      },
      {
        label: 'Molokken-Ostvold and Jorgensen, A Review of Surveys on Software Effort Estimation, ISESE 2003',
        url: 'https://www.simula.no/publications/review-surveys-software-effort-estimation',
        readOn: '2026-09-11',
        supports: 'That most projects overrun, typically by 30 to 40 percent, which is why scope disputes are structural.',
      },
    ],

    limits: [
      'The 230-project study is from the Indian software industry around 2000. The mechanism, that relationships reallocate risk regardless of contract type, is general; the precise percentages are of their time and place.',
      'This covers commercial structure rather than legal drafting. What your contract actually says about change control, acceptance and termination matters more than which of the two labels it carries.',
      'No recommendation is universal here. The right structure depends on how well specified the work is, which is a fact about your project rather than about contracting.',
      'We sell development work both ways, so we benefit from either choice. The preference stated is reasoned rather than neutral.',
    ],

    cta: {
      heading: 'Deciding how to structure a piece of work?',
      body: 'The question that usually settles it is how much of this you can specify today. If the answer is most of it, fixed price is reasonable; if not, the honest structure is smaller commitments rather than a bigger number with padding in it.',
      buttonLabel: 'Talk about structure',
      href: '/contact?service=contract-drafting',
    },

    related: ['you-probably-do-not-own-the-code', 'why-software-estimates-are-wrong'],

    seo: {
      title: 'Fixed Price or Time and Materials: What Evidence Says',
      description:
        'Fixed price does not transfer the risk it appears to: vendors bore 66 percent of overruns anyway. Two governments disagree on the alternative, and both are right.',
    },
  },
];
