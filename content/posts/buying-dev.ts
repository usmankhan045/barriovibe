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

  {
    slug: 'who-owns-what-the-ai-wrote',
    cluster: 'buying-dev',
    title: 'Who Owns the Code the AI Wrote?',
    navLabel: 'Who owns AI-written code',
    card: 'Purely machine-generated output has no copyright owner. AI-assisted work does, and the vendor indemnities are narrower than you think.',

    answer:
      'Nobody owns purely AI-generated material in the US: a court has now held that copyright requires a human author, and the Supreme Court declined to review it. What is protectable is the human contribution, which in real software is substantial. The vendors all say you own the output, but they can only assign what they have, which is why every clause says "if any". And the indemnities most buyers rely on exclude modified output, which is most development work.',

    sections: [
      {
        kind: 'prose',
        heading: 'Three different questions, routinely conflated',
        body: [
          'Whether AI output can be owned at all is a question of law. Whether the vendor claims any rights in it is a question of contract. Whether anyone will defend you if a third party sues is a question of indemnity.',
          'They have different answers and people treat them as one. A vendor clause saying you own the output does not create copyright where none exists, and an indemnity is not ownership.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The legal position, now settled at circuit level',
        body:
          'In Thaler v. Perlmutter the DC Circuit held that "the Copyright Act of 1976 requires all eligible work to be authored in the first instance by a human being", and extended it explicitly: "The authorship requirement applies to all copyrightable work, including work-made-for-hire." The Supreme Court denied certiorari on 2 March 2026. So there is no route by which a company owns purely machine-generated code: not through work for hire, and not through an assignment from a tool that never held anything to assign.',
      },
      {
        kind: 'prose',
        heading: 'The reassuring half, which gets less coverage',
        body: [
          'The same judgment preserved AI-assisted work in terms: "the human authorship requirement does not prohibit copyrighting work that was made by or with the assistance of artificial intelligence. The rule requires only that the author of that work be a human being."',
          'The US Copyright Office says the same thing and goes further on what counts. Its position is that "copyright protects the original expression in a work created by a human author, even if the work also includes AI-generated material", and that protection covers the human expression plus "the creative selection, coordination, or arrangement of material in the outputs, or creative modifications of the outputs".',
          'For software this matters enormously, because real development is not prompting once and shipping. A developer who decides the architecture, selects among suggestions, edits them, integrates them into a larger system and arranges the whole is authoring a protectable work. The protection attaches to that, not to individual generated fragments standing alone.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'The part that is not settled, and is presented as though it were',
        body:
          'The Copyright Office has said that "based on the functioning of current generally available technology, prompts do not alone provide sufficient control" to make a user the author of an output. That is agency guidance rather than law, it binds registration decisions rather than courts, and the Office expressly tied it to current technology. No court has ruled on it. Equally, no court has drawn the line on how much human contribution is enough, and the DC Circuit deliberately declined to. Anyone stating either as settled law is overstating it.',
      },
      {
        kind: 'table',
        heading: 'What the vendors actually say',
        intro:
          'Note the drafting difference in the second column. Two assign, two disclaim, and those are not the same sentence.',
        columns: ['Vendor', 'Mechanism', 'The operative wording'],
        rows: [
          ['Anthropic', 'Assigns', 'Assigns its right, title and interest "if any" in Outputs'],
          ['OpenAI', 'Assigns', 'Assigns all right, title and interest "if any" in Output'],
          ['GitHub Copilot', 'Disclaims', '"GitHub does not own Suggestions"'],
          ['Google Cloud', 'Disclaims', 'Does "not assert any ownership rights" in Generated Output'],
        ],
      },
      {
        kind: 'prose',
        body: [
          'The phrase to notice is "if any". It is there because the drafters know a vendor can only assign what it holds, and in the case of purely generated output that may be nothing. The clause is doing useful work: it removes the vendor as a claimant. It is not creating a property right.',
          'Two vendors also warn that output is not exclusive. OpenAI states that "Output may not be unique, and other users may receive similar content", and Google that a service "may, in some scenarios, produce the same or similar Generated Output for multiple customers". That sits awkwardly with how most buyers imagine ownership, and it is in the terms they already agreed to.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The indemnities, and the exclusion that undoes them',
        body: [
          'Several vendors offer to defend you if a third party claims the output infringes their rights. This is genuinely valuable and it is narrower than it is generally understood to be.',
          'The exclusions recur across vendors: modified output, knowing infringement, disabled filters, trademark claims in trade or commerce, and free-tier use. Google\'s indemnity covers only "unmodified Generated Output", and applies only where the service is not provided free of charge.',
          'Consider what unmodified means for software. A developer takes a suggestion, renames the variables, adjusts the error handling and integrates it. That is modified. The protection most useful in theory may not reach the way code is actually written, and that is worth knowing before it is relied on.',
          'OpenAI similarly excludes output "modified, transformed, or used in combination with products or services not provided by or on behalf of OpenAI", and excludes Beta Services entirely. Anthropic excludes customer modifications and combination with non-Anthropic technology.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'A 2026 change that most published advice has not caught',
        body:
          'Microsoft\'s Customer Copyright Commitment previously required GitHub Copilot users to enable the duplicate detection filter as a condition of coverage. Its required mitigations page, updated 13 July 2026, now states that for GitHub offerings "as of April 3, 2026, there are no additional required mitigations. Use of the Duplicate Detection filter feature is no longer required for CCC coverage." Any guidance telling you to enable that filter to preserve your indemnity is out of date. Enabling it is still sensible on the merits, it is simply no longer a contractual condition.',
      },
      {
        kind: 'prose',
        heading: 'Registration has a disclosure duty with teeth',
        body: [
          'If you register software with the US Copyright Office, and it contains more than de minimis AI-generated content, you have a duty to disclose it and to explain the human contribution.',
          'The consequence of not doing so is worse than a rejected application. The Office states that a court "may disregard a registration in an infringement action... if it concludes that the applicant knowingly provided the Office with inaccurate information, and the accurate information would have resulted in the refusal of the registration."',
          'Registration is a precondition to suing for infringement of a US work. A registration a court disregards is therefore worthless at precisely the moment you need it, and the problem surfaces in litigation rather than at registration.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The UK and EU positions, briefly',
        body: [
          'The UK is the outlier. Section 9(3) of the Copyright, Designs and Patents Act 1988 provides that for a computer-generated work with no human author, the author is taken to be "the person by whom the arrangements necessary for the creation of the work are undertaken". That is still in force today.',
          'A government report published on 18 March 2026 proposed removing it, stating that "in the absence of evidence of its ongoing value, we propose that this specific type of protection should be removed, while copyright should continue to protect works created with AI assistance". That is a proposal. There is no bill and no commencement instrument, so the provision stands.',
          'The EU AI Act does not address ownership of output at all. The words ownership and authorship do not appear in it. Its only copyright provision obliges model providers to have a policy on copyright compliance, which concerns inputs rather than outputs. No EU court has ruled on the question.',
        ],
      },
      {
        kind: 'steps',
        heading: 'What to actually do',
        intro:
          'Five things, none of which requires a lawyer to start.',
        steps: [
          {
            title: 'Keep the human contribution real and visible',
            body:
              'Architecture decisions, code review, editing, integration, tests. This is what carries the copyright, and it is also what makes the software good, so the incentives point the same way for once.',
          },
          {
            title: 'Get the assignment from your developers regardless',
            body:
              'The AI question does not change the ordinary one. Whatever your developer contributed is theirs by default in both the US and the UK without a written assignment, and that is the larger exposure for most businesses.',
          },
          {
            title: 'Read your indemnity for the word unmodified',
            body:
              'If it covers only unmodified output, consider how much of your codebase qualifies. Probably very little, and that is a reason to weigh the indemnity accordingly rather than to stop using the tool.',
          },
          {
            title: 'Check whether you are on a free tier',
            body:
              'Several indemnities apply only to paid use. A team prototyping on free accounts is outside protections they may believe they have.',
          },
          {
            title: 'Disclose if you register',
            body:
              'More than de minimis AI content must be disclosed, with an explanation of the human contribution. The sanction is a registration a court can disregard, which is the worst possible moment to discover the problem.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'How we handle it',
        body: [
          'We build software and we use AI tools while doing it, so this is our exposure as much as our clients\'.',
          'Our contracts assign copyright to the client on final payment, and that assignment covers what we authored, which is the same thing it has always covered. Using a tool does not change what we can assign, and we do not pretend it changes what a client receives.',
          'What we do differently is keep the human contribution documented rather than incidental: design decisions, review, the reasons behind structural choices. That is good practice anyway and it happens to be what the protection attaches to.',
          'When a client asks whether AI was used, we say yes and explain where. The alternative is a conversation during due diligence in which somebody discovers it from the commit history, and that conversation is considerably worse.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Can AI-generated code be copyrighted?',
        answer:
          'Purely machine-generated material cannot, in the US. A court held that copyright requires a human author and the Supreme Court declined to review it. AI-assisted work is protectable: the copyright attaches to the human expression and to the creative selection, arrangement and modification, not to raw generated fragments alone.',
      },
      {
        question: 'Do I own the output from ChatGPT or Claude?',
        answer:
          'As between you and the vendor, yes: all four major vendors either assign their interest "if any" or disclaim ownership. That removes the vendor as a claimant. It does not create copyright where none exists, and it does not bind a third party alleging infringement.',
      },
      {
        question: 'Does the vendor indemnity protect me?',
        answer:
          'Less than most buyers assume. The exclusions recur: modified output, knowing infringement, disabled filters, trademark claims, and free-tier use. Google\'s covers only unmodified output, and a developer who edits and integrates a suggestion has modified it.',
      },
      {
        question: 'Do I still need to enable the duplicate detection filter?',
        answer:
          'Not as a condition of Microsoft\'s copyright commitment for GitHub offerings. Its required mitigations page states that as of 3 April 2026 the filter is no longer required for coverage. It remains sensible practice, and advice written before that date is out of date on the contractual point.',
      },
      {
        question: 'What about the UK and EU?',
        answer:
          'The UK is unusual: section 9(3) of the CDPA 1988 provides for computer-generated works with no human author, and it is still in force despite a March 2026 government proposal to remove it. The EU AI Act does not address output ownership at all, and no EU court has ruled on it.',
      },
    ],

    publishedAt: '2026-11-03T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Thaler v. Perlmutter, No. 23-5233, DC Circuit, 18 March 2025',
        url: 'https://media.cadc.uscourts.gov/opinions/docs/2025/03/23-5233.pdf',
        readOn: '2026-09-12',
        supports: 'The human authorship holding, its extension to work made for hire, and the express preservation of AI-assisted work. Certiorari denied 2 March 2026.',
      },
      {
        label: 'US Copyright Office, Copyright and Artificial Intelligence, Part 2: Copyrightability',
        url: 'https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf',
        readOn: '2026-09-12',
        supports: 'That AI-assisted work remains protectable, what the protection covers, and the position on prompts alone.',
      },
      {
        label: 'US Copyright Office registration guidance, 88 Fed. Reg. 16,190',
        url: 'https://www.copyright.gov/ai/ai_policy_guidance.pdf',
        readOn: '2026-09-12',
        supports: 'The disclosure duty and the consequence that a court may disregard a registration under section 411(b).',
      },
      {
        label: 'Microsoft, Customer Copyright Commitment required mitigations',
        url: 'https://learn.microsoft.com/en-us/legal/cognitive-services/openai/customer-copyright-commitment',
        readOn: '2026-09-12',
        supports: 'That as of 3 April 2026 the duplicate detection filter is no longer required for coverage of GitHub offerings.',
      },
      {
        label: 'Copyright, Designs and Patents Act 1988, section 9',
        url: 'https://www.legislation.gov.uk/ukpga/1988/48/section/9',
        readOn: '2026-09-12',
        supports: 'The computer-generated works provision, which remains in force.',
      },
    ],

    limits: [
      'This is general information, not legal advice. Copyright turns on facts, jurisdiction and your contract, none of which this post can see.',
      'The Copyright Office positions are agency guidance rather than law. They bind registration decisions and not courts, and the prompts conclusion is expressly tied to current technology.',
      'How much human contribution is enough is undecided by any court, and the DC Circuit declined to draw the line. Anyone giving you a threshold is guessing.',
      'Vendor terms and indemnities change frequently. Everything here was read on 12 September 2026 and the Microsoft product terms page did not expose a version date, so re-check before relying on the exact wording.',
    ],

    cta: {
      heading: 'Building with AI tools and unsure where you stand?',
      body: 'The two things worth checking are whether your developer assignment is in writing and whether your indemnity covers modified output. Both take minutes to establish and both are the kind of thing discovered during due diligence otherwise.',
      buttonLabel: 'Have it reviewed',
      href: '/contact?service=contract-drafting',
    },

    related: ['you-probably-do-not-own-the-code'],

    seo: {
      title: 'Who Owns the Code the AI Wrote?',
      description:
        'Purely machine-generated output has no copyright owner after Thaler. AI-assisted work does. And the indemnities exclude modified output, which is most real code.',
    },
  },

  {
    slug: 'agent-washing-auditing-a-vendor-claim',
    cluster: 'buying-dev',
    title: 'Agent Washing: How to Audit a Vendor\'s AI Claim',
    navLabel: 'Auditing an AI claim',
    card: 'Regulators have charged companies for overstating AI. Those cases are a better guide than any analyst estimate.',

    answer:
      'Gartner coined agent washing for "the rebranding of existing products, such as AI assistants, robotic process automation and chatbots, without substantial agentic capabilities", and estimates only about 130 of thousands of agentic vendors are real. That figure carries no published methodology. What does carry weight is enforcement: regulators have charged companies whose AI turned out to be people, and the findings in those orders make an excellent checklist.',

    sections: [
      {
        kind: 'prose',
        heading: 'The term, and what it is worth',
        body: [
          'Gartner named the practice: vendors "engaging in agent washing, the rebranding of existing products, such as AI assistants, robotic process automation (RPA) and chatbots, without substantial agentic capabilities". It estimates that "only about 130 of the thousands of agentic AI vendors are real".',
          'That number is quoted everywhere and Gartner has published no methodology for it: no sample frame, no criteria, no denominator. It is an analyst estimate rather than a measurement, and we are flagging that rather than repeating it as a statistic.',
          'The useful material is elsewhere, and it is harder to argue with.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'What regulators have actually found',
        body:
          'US enforcement actions against AI overstatement are real, named and dated. One order records that at a company selling AI-powered drive-thru ordering, "the vast majority of drive-thru orders... required human intervention". Another concerns a company that raised 42 million dollars while, per the charges, relying "in large part on contract employees to manually input orders". Regulators have also run a coordinated sweep of deceptive AI claims. These findings are more useful than any estimate, because they describe the specific gap between what was sold and what existed.',
      },
      {
        kind: 'prose',
        heading: 'The question that separates real from rebranded',
        body: [
          'There is one question that does most of the work, and it is not about the model.',
          'Ask what happens when the system encounters something it has not seen. A genuine agent decides what to do next based on what earlier steps returned, so the answer involves reasoning, tool selection, and sometimes asking for help. A rebranded workflow has a branch for it or it fails.',
          'The follow-up is better still: ask them to show you a case where it did something the designers did not anticipate, and what it did. Vendors with real systems have these stories and enjoy telling them, including the alarming ones. Vendors without tend to return to describing capabilities.',
        ],
      },
      {
        kind: 'table',
        heading: 'What to ask, and what a weak answer sounds like',
        intro:
          'None of these is a trick question. They are things a team running a real system answers immediately and a team with a demo answers vaguely.',
        columns: ['Question', 'A weak answer'],
        rows: [
          ['What is your evaluation set?', 'We test thoroughly before release'],
          ['How do you know it still works?', 'We monitor it closely'],
          ['What percentage of cases need a human?', 'Very few'],
          ['Show me it handling something unexpected', 'A recorded demo of the happy path'],
          ['What permissions does it hold?', 'It is fully secure'],
          ['What happens when it repeats an action?', 'That does not happen'],
        ],
      },
      {
        kind: 'prose',
        heading: 'Why the human-in-the-loop question matters most',
        body: [
          'The enforcement findings share a shape: the product was sold as automated and people were doing the work behind it.',
          'Some human involvement is normal and often correct, so the presence of people is not the problem. Concealment is. A system where 30 percent of cases are handled by a person can be an excellent product, priced and staffed accordingly. The same system sold as fully automated is a different thing, and the buyer discovers the difference when they try to scale it.',
          'So ask for the number rather than for reassurance. A vendor who knows their human intervention rate is running a real system and measuring it. A vendor who says it is minimal is telling you they do not measure it, or would rather not say.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The evaluation question is the hardest to fake',
        body: [
          'If you ask only one technical question, ask what is in their evaluation set and who wrote the expected answers.',
          'It is hard to fake because it requires an artefact. A real answer is specific: this many cases, drawn from these sources, with expected outcomes defined by these people, re-run on this schedule. A vendor without one cannot describe it convincingly, because there is nothing to describe.',
          'It also tells you what they consider correct, which is frequently more revealing than the score. A vendor whose evaluation set contains only cases the system handles well has built a demonstration rather than a test.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Claims that are not wrong but are not what you heard',
        body: [
          'Beyond outright overstatement, a set of claims are technically accurate and misleading in practice, and they are worth recognising.',
          'Powered by a named frontier model tells you which API they call. It says nothing about what they built on top, which is where all the difficulty lives.',
          'Enterprise-grade security usually means the vendor has sensible practices, and says nothing about what permissions your agent will hold in your systems, which is the question that actually decides your exposure.',
          'Learns from your data may mean retrieval over your documents, which is normal and good, or fine-tuning, which raises different questions about where your data went. Ask which, because the words are used interchangeably and the implications are not.',
          'Guardrails is the broadest of them. It can mean a classifier with a published catch rate in the low tens of percent, or a permission boundary, or a system prompt. Ask which, and where in the pipeline it runs.',
        ],
      },
      {
        kind: 'steps',
        heading: 'A proportionate audit',
        intro:
          'An afternoon of work that filters most of it, before any procurement process starts.',
        steps: [
          {
            title: 'Ask for the human intervention rate as a number',
            body:
              'Not whether humans are involved. What proportion of cases, measured over what period. The answer, or the absence of one, tells you whether they are running a measured system.',
          },
          {
            title: 'Ask to see it fail',
            body:
              'Give it something outside its brief during a demo, or ask them to show you a real failure and what they changed. A vendor comfortable showing failure is usually one with real deployments.',
          },
          {
            title: 'Ask what it would cost you to leave',
            body:
              'Where does your data live, what format does it export in, and who owns the prompts and configuration. Lock-in is not deception, and discovering it after signing feels like it.',
          },
          {
            title: 'Ask for a reference doing your use case at your scale',
            body:
              'Not a logo. A customer with a comparable problem, and a conversation without the vendor present.',
          },
          {
            title: 'Read the indemnity and the free-tier boundary',
            body:
              'Several protections apply only to paid use and exclude modified output. If the proposal relies on an indemnity, check that it reaches the way you will actually use the product.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'Turning this on ourselves',
        body: [
          'We sell agentic AI development, so a post about detecting overstatement should say what we would answer.',
          'Our human intervention rate varies by system and we quote it per project rather than in general, because a number that is not tied to a specific deployment is marketing. Where a client asks for one before we have built anything, we say we do not know yet and design the measurement into the first phase.',
          'On evaluation: we build the set from the client\'s own cases including ones the system should refuse, and we hand it over. If we disappeared, you should still be able to tell whether the thing works.',
          'And the claim we most often have to walk back is our own clients\' expectation that agentic means autonomous. Most of what we build has a human in it deliberately, at the points where being wrong is expensive. Saying that early costs us some enthusiasm and saves the conversation where somebody discovers it in month three.',
        ],
      },
    ],

    faqs: [
      {
        question: 'What is agent washing?',
        answer:
          'Gartner\'s term for rebranding existing products such as assistants, robotic process automation and chatbots as agentic without substantial agentic capability. Its estimate that only around 130 of thousands of vendors are real is widely quoted and carries no published methodology.',
      },
      {
        question: 'How can I tell if a vendor\'s AI is real?',
        answer:
          'Ask what happens when it meets something unanticipated, and ask for a case where it did something the designers did not expect. Then ask for the human intervention rate as a number. Real systems are measured, and teams running them answer immediately.',
      },
      {
        question: 'Is human involvement a red flag?',
        answer:
          'No, concealment is. A system where a person handles 30 percent of cases can be an excellent product if it is priced and staffed accordingly. Regulatory actions against AI overstatement have concerned products sold as automated while people did the work behind them.',
      },
      {
        question: 'What single question is most revealing?',
        answer:
          'What is in your evaluation set and who defined the expected answers. It is hard to fake because it requires an artefact, and what a vendor considers correct is often more revealing than the score they report.',
      },
      {
        question: 'What about claims like enterprise-grade security?',
        answer:
          'Usually true and not an answer to your question. It describes the vendor\'s practices rather than what permissions your agent will hold in your systems, which is what decides your exposure. Ask about scopes and credentials specifically.',
      },
    ],

    publishedAt: '2026-11-05T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Gartner press release on agentic AI project cancellations, 25 June 2025',
        url: 'https://www.gartner.com/en/newsroom',
        readOn: '2026-09-11',
        supports: 'The agent washing definition and the estimate of about 130 real vendors, recorded with the caveat that no methodology was published.',
      },
      {
        label: 'Gartner press release on technology purchase regret, 12 July 2022',
        url: 'https://www.gartner.com/en/newsroom',
        readOn: '2026-09-11',
        supports: 'That 56 percent of organisations reported a high degree of purchase regret over their largest recent technology purchase, with disclosed methodology.',
      },
      {
        label: 'NVIDIA NeMo Guardrails documentation',
        url: 'https://docs.nvidia.com/nemo/guardrails/',
        readOn: '2026-09-12',
        supports: 'That a shipped guardrail default has a published catch rate in the low tens of percent, which is why the word needs unpacking.',
      },
    ],

    limits: [
      'The 130 vendors figure is an analyst estimate with no published methodology. It is quoted here as an estimate and should not be repeated as a measurement.',
      'The enforcement matters are summarised from regulatory findings. They are individual cases rather than a sample, and they describe what was alleged and found in those specific matters.',
      'This is a buyer checklist rather than a due diligence standard. It filters obvious overstatement and does not substitute for technical or legal review.',
      'We sell agentic AI development, so this post is a description of questions we expect to be asked. The last section states our own answers.',
    ],

    cta: {
      heading: 'Evaluating a vendor and want a second opinion?',
      body: 'The questions above take an afternoon and filter most of it. If you are mid-procurement and want someone technical in the room who is not selling you the thing being evaluated, that is a conversation we are happy to have.',
      buttonLabel: 'Get a second opinion',
      href: '/contact?service=agentic-ai-development',
    },

    related: ['you-probably-do-not-own-the-code', 'who-owns-what-the-ai-wrote'],

    seo: {
      title: 'Agent Washing: How to Audit a Vendor AI Claim',
      description:
        'Regulators have charged firms whose AI turned out to be people. Those findings make a better checklist than any analyst estimate, and the key question is measurable.',
    },
  },

  {
    slug: 'what-happens-when-the-agency-disappears',
    cluster: 'buying-dev',
    title: 'What Happens When Your Agency Disappears',
    navLabel: 'Inheriting a codebase',
    card: 'Across 133 popular open-source projects, 65 percent had a truck factor of two or fewer. Ask the question before you need the answer.',

    answer:
      'The risk is concentration of knowledge, and it is measurable. Research on 133 popular GitHub projects found 65 percent had a truck factor of two or fewer, meaning two people leaving would orphan the project. Your supplier is smaller than those projects. The things that make a handover survivable are unglamorous and all establishable now: access in your own name, an assignment in writing, a build that runs from a clean checkout, and somewhere the decisions are written down.',

    sections: [
      {
        kind: 'prose',
        heading: 'The failure nobody plans for',
        body: [
          'Agencies close, developers move on, relationships end. None of that is unusual, and almost nobody asks what it would mean until it happens.',
          'When it does, the questions arrive in a bad order. Who has the domain. Can anybody deploy. Does the build even run on a fresh machine. Is there anything explaining why it was built this way.',
          'Each of those is cheap to establish while things are going well, and expensive to answer afterwards.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'There is a measure for this, and the numbers are stark',
        body:
          'Researchers studying 133 popular GitHub systems, covering over 373,000 files and two million commits, found that "the majority of our target systems (65%) have TF <= 2". Truck factor is the number of people who would have to leave before a project is in serious trouble. Among those systems, 34 percent had a truck factor of one. These are well-known open-source projects with many contributors. A small agency working on your product is not better placed, and frequently it is one person who understands the deployment.',
      },
      {
        kind: 'prose',
        heading: 'Access is the part that bites first',
        body: [
          'Code is recoverable. Accounts frequently are not, and this is where handovers actually stall.',
          'Domain registrar, DNS, hosting, the repository, CI, error monitoring, the app store accounts, the payment gateway, the transactional email provider, analytics. Each was created by somebody at some point, often under an email address at the agency.',
          'The recovery process for an account registered to a company that no longer exists is considerably worse than rebuilding the code. Occasionally there is no recovery process at all.',
          'The fix is an hour of work and it is to check, one by one, whose name each account is in. Do it now rather than when you need it.',
        ],
      },
      {
        kind: 'table',
        heading: 'What to establish while the relationship is good',
        intro:
          'None of these is adversarial. A supplier who resists any of them is telling you something useful for free.',
        columns: ['What', 'Why it matters', 'How long it takes'],
        rows: [
          ['Accounts in your name', 'Recovery is often impossible otherwise', 'An hour to audit'],
          ['Written copyright assignment', 'The default is that they own it', 'One clause'],
          ['Build from a clean checkout', 'Proves nothing lives only on one laptop', 'An afternoon to test'],
          ['A written deployment process', 'The single most common gap', 'A page'],
          ['Decision record', 'Explains why, which code cannot', 'Ongoing, small'],
          ['A named second person', 'Reduces the truck factor from one', 'A conversation'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The clean checkout test',
        body: [
          'There is one test that reveals more than any document, and you can ask for it at any point.',
          'Ask them to clone the repository onto a machine that has never touched the project, and run it. Not deploy it, just run it locally.',
          'What this finds is everything living outside the repository: an environment variable somebody set two years ago, a database migration applied by hand, a local file nobody committed, a dependency installed globally. All of it is invisible while the original machine still exists and fatal once it does not.',
          'A supplier who can do this in an afternoon is in good shape. One who cannot has discovered a real problem, and better now than during a handover.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Documentation that is actually worth having',
        body: [
          'Most documentation requests produce a description of what the code does, which the code already says and which goes stale immediately.',
          'What survives a handover is the why. Why this database rather than the obvious one. Why this integration is written defensively. What was tried and abandoned. Which parts are load-bearing and which are scaffolding nobody has removed.',
          'That is not a manual, it is a set of short notes attached to decisions, and it is the thing a new team spends its first month reconstructing badly if nobody wrote it down.',
          'If you ask for one document, ask for the deployment process. If you ask for two, ask for the list of decisions that would surprise a new developer.',
        ],
      },
      {
        kind: 'prose',
        heading: 'If it has already happened',
        body: [
          'Assuming you are reading this after the fact, the order that works is: access first, then build, then understanding.',
          'Get control of the accounts you can, and start the recovery process for the ones you cannot, because those take longest and block everything else. Domain and DNS first, because losing those loses the business rather than the software.',
          'Then get it building and deploying from a clean machine, ideally before touching any code. Until you can deploy, you cannot fix anything safely, and the temptation to make a small change on the live system is how a difficult situation becomes a serious one.',
          'Only then start reading the code. And resist the instinct to rewrite: an inherited codebase almost always looks worse than it is, because you are seeing the accumulated decisions without the reasons, and rewriting throws away the reasons along with the code.',
        ],
      },
      {
        kind: 'steps',
        heading: 'The audit, if you are currently fine',
        intro:
          'Half a day, and the best time to do it is when nothing is wrong.',
        steps: [
          {
            title: 'List every account and check the name on it',
            body:
              'Domain, DNS, hosting, repository, CI, monitoring, app stores, payments, email, analytics. Anything in somebody else\'s name is a dependency on that relationship continuing.',
          },
          {
            title: 'Find the assignment clause',
            body:
              'Search your contract for assignment rather than ownership. The default in both US and UK law is that the contractor keeps the copyright, and paying does not transfer it.',
          },
          {
            title: 'Ask for a clean checkout run',
            body:
              'A frank supplier will sometimes tell you in advance that it will not work, which is itself the finding and is fixable while they are still engaged.',
          },
          {
            title: 'Ask who else could deploy this',
            body:
              'If the answer is one name, you know your truck factor. It does not mean change supplier; it means know the number and decide whether you are comfortable.',
          },
          {
            title: 'Get the deployment process written down',
            body:
              'One page: how a change reaches production, what to do if it fails, where the logs are. It is the document that matters most and the one least likely to exist.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What we do, including the part that is against our interest',
        body: [
          'We build software for clients and we also take over other people\'s, so we see both ends of this.',
          'Everything we build is set up in the client\'s own accounts from day one. It is marginally more friction at the start and it means we are never the reason something cannot be recovered. It also means a client can leave us without difficulty, which is the point: a supplier retained by lock-in rather than by quality is a supplier with no incentive to stay good.',
          'We hand over the deployment process as a written page rather than as knowledge, and we assign copyright on final payment.',
          'On rescues, the most common finding is not bad code. It is that the deployment lived in one person\'s head, and that person is gone. The second most common is accounts nobody can recover. Neither is a coding problem, and both were an hour of work to prevent at some earlier point when everything was fine.',
        ],
      },
    ],

    faqs: [
      {
        question: 'What is a truck factor?',
        answer:
          'The number of people who would have to leave before a project is in serious trouble. Research on 133 popular GitHub systems found 65 percent had a truck factor of two or fewer, and 34 percent had one. Those are large open-source projects; a small supplier is rarely better placed.',
      },
      {
        question: 'What should I check before my agency disappears?',
        answer:
          'Whose name every account is in, whether you have a written copyright assignment, whether the project builds from a clean checkout, and whether the deployment process exists in writing. All four are establishable in half a day while the relationship is good.',
      },
      {
        question: 'My agency has gone. What do I do first?',
        answer:
          'Access before code. Secure the domain and DNS first, then the other accounts, then get it building and deploying from a clean machine. Until you can deploy you cannot fix anything safely, and changing the live system directly is how this gets worse.',
      },
      {
        question: 'Should I rewrite an inherited codebase?',
        answer:
          'Usually not immediately. Inherited code looks worse than it is because you see the accumulated decisions without the reasons behind them. Get it building and deployable first; the parts that genuinely need replacing will still need it in three months, and by then you will know which.',
      },
      {
        question: 'Is asking these questions insulting to my supplier?',
        answer:
          'A good one will welcome them, because the same measures protect them from being the single point of failure. Resistance to any of them is information you have obtained for free.',
      },
    ],

    publishedAt: '2026-11-06T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Avelino, Passos, Hora and Valente, A Novel Approach for Estimating Truck Factors, ICPC 2016',
        url: 'https://arxiv.org/abs/1604.06766',
        readOn: '2026-09-11',
        supports: 'The 133-system sample and the finding that 65 percent have a truck factor of two or fewer, with 34 percent at one.',
      },
      {
        label: 'US Copyright Office, Circular 30: Works Made for Hire',
        url: 'https://www.copyright.gov/circs/circ30.pdf',
        readOn: '2026-09-11',
        supports: 'That commissioned software requires a written assignment rather than a work-made-for-hire clause.',
      },
      {
        label: 'Copyright, Designs and Patents Act 1988, section 11',
        url: 'https://www.legislation.gov.uk/ukpga/1988/48/section/11',
        readOn: '2026-09-11',
        supports: 'That the author is the first owner of copyright, so the default favours the contractor.',
      },
    ],

    limits: [
      'The truck factor research covers open-source projects, where contribution is public and measurable. It is an indicator for commercial work rather than a measurement of it.',
      'The legal position on assignment is general information about default rules in two jurisdictions, not legal advice about your contract.',
      'This covers preparing for and recovering from a handover. Whether a specific codebase is worth keeping is a technical judgement that requires reading it.',
      'We both build software and take over other people\'s, so we have an interest in rescues existing. The preventive measures listed make rescues less necessary, which is the honest trade.',
    ],

    cta: {
      heading: 'Inherited something and not sure where to start?',
      body: 'Access first, then a clean build, then read the code. If you are stuck at any of those, a short review will tell you what you actually have and whether it is worth keeping, which is usually a more hopeful answer than it first appears.',
      buttonLabel: 'Get it assessed',
      href: '/contact?service=web-development',
    },

    related: ['you-probably-do-not-own-the-code', 'why-offshore-comparisons-have-no-evidence'],

    seo: {
      title: 'What Happens When Your Agency Disappears',
      description:
        'Across 133 popular projects, 65 percent had a truck factor of two or fewer. The four things to establish while the relationship is good, and what to do if it is too late.',
    },
  },

  {
    slug: 'why-offshore-comparisons-have-no-evidence',
    cluster: 'buying-dev',
    title: 'Why Offshore Development Comparisons Have No Evidence Behind Them',
    navLabel: 'Offshore, honestly',
    card: 'We are an offshore supplier telling you that every statistic in this market failed verification, including the famous one.',

    answer:
      'Every circulating figure about offshore development outcomes failed tracing. A widely quoted dissatisfaction rate attributed to a named consultancy does not appear in that firm\'s report. Even the famous academic finding that distributed work takes 2.5 times longer dissolves under the authors\' own controls: they state that once other factors are accounted for, distributed work items do not take significantly longer. We are an offshore supplier, which is why this post exists.',

    sections: [
      {
        kind: 'prose',
        heading: 'Why we are writing this',
        body: [
          'We are a Pakistani agency selling development services internationally. Every statistic in this market is either flattering to us or damaging to us, and the honest finding is that almost none of them survives being traced to a source.',
          'That is worth publishing precisely because we benefit from some of the numbers we are about to discard. A buyer who cannot tell a real claim from a marketed one is a buyer who chooses on price, and we would rather compete on the things we can evidence.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The figure that does not exist in its own source',
        body:
          'A dissatisfaction rate attributed to a major consultancy circulates widely in offshore comparison articles. We went looking for it in that firm\'s report and it is not there. This is a specific kind of failure worth recognising: not a stale figure or a disputed one, but a number attached to an authoritative name that does not appear in the document it cites. Once a figure has a consultancy\'s name on it, almost nobody opens the report.',
      },
      {
        kind: 'prose',
        heading: 'The famous academic finding, read properly',
        body: [
          'The most cited research in this area is Herbsleb and Mockus, published in IEEE Transactions on Software Engineering, which found that distributed work items took substantially longer than co-located ones. The figure usually quoted is around 2.5 times.',
          'The paper says something more careful, and the qualification is in the paper rather than in the citations of it. Once the authors control for other factors, they state: "Surprisingly, given all other factors, distributed MRs do not have significantly longer intervals."',
          'So the raw difference is real and the controlled difference largely is not. Distributed work items were bigger, involved more people and more organisations, and those differences explain the delay rather than distribution itself.',
          'Citing 2.5 times without that caveat misrepresents the source, and it is done constantly, including by people arguing against offshore work and by people selling nearshore alternatives.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What we could not find',
        body: [
          'We looked for credible independent evidence on offshore outcomes and the search returned very little.',
          'Genuine peer-reviewed work on distributed development exists, and most of it dates from roughly 2001 to 2012, before remote work became normal for everybody and before the tooling changed substantially. It describes a world where distributed meant unusual.',
          'The US Government Accountability Office, examining offshoring, concluded that the data simply does not exist at the level people assume. That is the honest state of the field.',
          'What fills the gap is vendor content on both sides: agencies selling offshore development, and agencies selling the alternative, each with statistics that trace to the other\'s marketing or to nothing.',
        ],
      },
      {
        kind: 'table',
        heading: 'The claims you will meet, and what they are worth',
        intro:
          'Neither column favours us. The first four are used to sell against us and the last is used to sell us.',
        columns: ['The claim', 'What it actually is'],
        rows: [
          ['X percent of offshore projects fail', 'Untraceable; no methodology found'],
          ['Distributed work takes 2.5 times longer', 'Real finding, and the authors control it away'],
          ['A named consultancy found Y percent dissatisfied', 'Not present in the cited report'],
          ['Rate tables by country', 'Market advertising, not outcome evidence'],
          ['Offshore saves Z percent', 'Vendor-produced, no disclosed method'],
        ],
      },
      {
        kind: 'prose',
        heading: 'What actually predicts the outcome',
        body: [
          'Since the geography statistics are unusable, it is worth saying what does appear to matter, drawn from the research that is sound rather than from our preferences.',
          'Work item size and how many people and organisations touch it. That is the Herbsleb finding once controlled: bigger, more fragmented work takes longer regardless of where anybody sits.',
          'Specification clarity, because the estimation research applies everywhere. Most projects overrun by 30 to 40 percent and uncertainty does not narrow as they proceed, and that is true in any timezone.',
          'And the ordinary contractual things: who owns the code, what happens on overrun, who can deploy. Those decide outcomes far more reliably than distance does, and they are the same questions you should ask a supplier two streets away.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The real differences, stated without statistics',
        body: [
          'There are genuine considerations in working across distance, and they are more specific than a failure rate.',
          'Overlap hours are the practical one. Four hours of overlap is a different working relationship from one hour, and it is a schedulable fact rather than a cultural claim. Ask for the number.',
          'Written communication becomes load-bearing, which cuts both ways. Teams that work across timezones tend to write things down because they must, and that documentation is the thing that survives a handover. Teams in one room often do not, which is why co-located projects can be harder to inherit.',
          'Legal and payment mechanics are real and boring: which jurisdiction governs the contract, how the assignment is executed across borders, how money moves. None of it is difficult and all of it is worth settling before rather than after.',
        ],
      },
      {
        kind: 'steps',
        heading: 'Choosing a supplier when the statistics are useless',
        intro:
          'These work regardless of where the supplier is, which is the point.',
        steps: [
          {
            title: 'Ask for a reference doing your kind of work at your scale',
            body:
              'A conversation without the supplier present. This is worth more than any market statistic and it is the step most often skipped because it is awkward to arrange.',
          },
          {
            title: 'Ask how many hours of overlap you would actually have',
            body:
              'A number, and what happens outside it. This is the one geographic factor that is concrete, and it is answerable in a sentence.',
          },
          {
            title: 'Run a small paid piece first',
            body:
              'A two week piece of real work tells you more than any evaluation process. It also tests the handover: what you receive at the end is what you would receive if things ended badly.',
          },
          {
            title: 'Check the contractual basics before the rate',
            body:
              'Copyright assignment in writing, accounts in your name, what happens on overrun. These predict outcomes better than location and they are the same questions everywhere.',
          },
          {
            title: 'Discount any statistic whose source you cannot open',
            body:
              'Including the ones that favour the supplier you like. If the number is real, the source is findable, and the exercise of looking is short.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'Our own position, stated plainly',
        body: [
          'We are the thing this post is about, so here is what we would say if you asked us for evidence.',
          'We do not have outcome statistics for offshore development generally and neither does anyone else. What we have is specific: work we have done, clients who will speak to you, and a way of working that is designed to make leaving us easy, because accounts in your name and a written deployment process are the things that protect you from any supplier including this one.',
          'We would also rather you ran a small paid piece than took our word for it. It is a genuine test and it costs you a fraction of the decision you are making.',
          'And if a competitor shows you a statistic about offshore reliability in either direction, ask them for the source. The exercise takes ten minutes and it tells you something about the supplier that no number would.',
        ],
      },
    ],

    faqs: [
      {
        question: 'What percentage of offshore development projects fail?',
        answer:
          'Nobody knows and the figures in circulation do not survive tracing. One widely quoted dissatisfaction rate attributed to a major consultancy does not appear in that firm\'s report at all. A government audit concluded the underlying data does not exist at the level people assume.',
      },
      {
        question: 'Does distributed development really take 2.5 times longer?',
        answer:
          'The raw difference was found, and the authors control it away. They state that given all other factors, distributed work items do not have significantly longer intervals. The delay was explained by work size and the number of people and organisations involved rather than by distribution.',
      },
      {
        question: 'What should I compare instead of countries?',
        answer:
          'Overlap hours, which is concrete and schedulable; a reference doing your kind of work at your scale; and the contractual basics of copyright assignment, account ownership and overrun handling. Those predict outcomes better than geography and apply to any supplier.',
      },
      {
        question: 'Are rate tables by country useful?',
        answer:
          'As market advertising rather than as outcome evidence. They tell you roughly what is charged and nothing about whether a project succeeds, and they are usually published by firms with an interest in the comparison.',
      },
      {
        question: 'How do I test a supplier properly?',
        answer:
          'Run a small paid piece of real work. It tells you more than any evaluation process, and it doubles as a handover test: what you receive at the end of two weeks is what you would receive if the relationship ended.',
      },
    ],

    publishedAt: '2026-11-07T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Herbsleb and Mockus, An Empirical Study of Speed and Communication in Globally Distributed Software Development, IEEE TSE 29(6), 2003',
        url: 'https://ieeexplore.ieee.org/document/1214326',
        readOn: '2026-09-11',
        supports: 'The distributed delay finding and the authors\' own statement that given all other factors, distributed work items do not have significantly longer intervals.',
      },
      {
        label: 'Molokken-Ostvold and Jorgensen, A Review of Surveys on Software Effort Estimation, ISESE 2003',
        url: 'https://www.simula.no/publications/review-surveys-software-effort-estimation',
        readOn: '2026-09-11',
        supports: 'That most projects overrun by 30 to 40 percent, which applies regardless of supplier location.',
      },
    ],

    limits: [
      'This establishes that the circulating figures are not citable. It does not establish that offshore development succeeds or fails at any particular rate, which would need the evidence we are saying does not exist.',
      'The sound peer-reviewed work on distributed development mostly predates 2012, before remote work became normal and before the tooling changed. Its findings may not transfer cleanly to how teams work now.',
      'We are an offshore supplier. This post discards statistics in both directions, including ones that would flatter us, and you should weigh it knowing that.',
      'Nothing here addresses any specific supplier, including us. The suggested tests are ones you can run on anybody.',
    ],

    cta: {
      heading: 'Comparing suppliers and tired of statistics?',
      body: 'The most useful thing you can do is run a small paid piece of real work with whoever you are considering, us included. It tells you more than any comparison and it costs a fraction of the decision.',
      buttonLabel: 'Start with something small',
      href: '/contact?service=web-development',
    },

    related: ['agent-washing-auditing-a-vendor-claim', 'what-happens-when-the-agency-disappears'],

    seo: {
      title: 'Why Offshore Development Comparisons Have No Evidence',
      description:
        'An offshore supplier explaining that every statistic in this market fails tracing, including the famous 2.5x finding that its own authors control away.',
    },
  },
];
