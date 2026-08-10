import type { Faq } from './types';

/**
 * Home page FAQs — the questions a prospect asks before enquiring, not the
 * ones we would prefer to answer. Each is answered directly in the first
 * sentence, which is also what makes them useful as FAQPage structured data.
 */
export const HOME_FAQS: Faq[] = [
  {
    question: 'Can I use just one service, or do I have to take a package?',
    answer:
      'One service is completely fine, and it is how most clients start. Nothing on this site is bundled, so you can engage us for a single tax return and never take anything else. The five disciplines exist because clients often end up needing more than one, not because we require it.',
  },
  {
    question: 'How does an agency do both tax filing and AI development?',
    answer:
      'Separate teams under one roof. The people filing your sales tax return are accountants; the people building your agent are engineers. What is shared is the account management, the deadline discipline and the commercial terms, so you get one contract and one point of contact instead of four vendors blaming each other.',
  },
  {
    question: 'Do you work with businesses outside Pakistan?',
    answer:
      'For software, AI, growth and e-commerce work, yes. Those services are location-independent. Tax, corporate compliance and licensing are Pakistan-specific, since they depend on FBR, SECP and provincial authorities. If you are a Pakistani entity operating abroad, tell us the structure and we will say honestly what we can and cannot cover.',
  },
  {
    question: 'How are engagements structured?',
    answer:
      'Ongoing services such as accounting, compliance and marketing run month to month. One-time work such as a website, an incorporation or a trademark filing runs as a fixed-scope project with a delivery date attached. Either way the scope is agreed in writing before anything starts, and anything outside it is agreed the same way rather than assumed.',
  },
  {
    question: 'What happens if we stop working together?',
    answer:
      'You keep everything. Accounting files, ad accounts, repositories, design source files and social accounts are registered in your name throughout. We work as a delegated user on your accounts, not the reverse. Ending the engagement is a password change, not a migration project.',
  },
  {
    question: 'How quickly can you start?',
    answer:
      'We reply to every enquiry within one working day and can usually scope within two. Actual start depends on the service: tax filing can begin immediately, while development work is scheduled against current capacity, which we tell you honestly rather than promising a date we cannot hold.',
  },
];
