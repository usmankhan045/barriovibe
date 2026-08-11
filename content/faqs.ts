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
      'One service is completely fine, and it is how most clients start. Nothing on this site is bundled, so you can engage us for a single tax return and never take anything else. The seven disciplines exist because clients tend to need a second one eventually, not because we ask you to buy them together.',
  },
  {
    question: 'How does an agency do both tax filing and AI development?',
    answer:
      'Separate teams under one roof. The people filing your sales tax return are accountants and the people building your agent are engineers, and neither does the other one’s job. What they share is the account management, the deadline discipline and the commercial terms. You get one contract and one point of contact instead of four vendors who each believe the delay is somebody else’s.',
  },
  {
    question: 'Do you work with businesses outside Pakistan?',
    answer:
      'Yes, in two different ways. Software, AI, marketing and e-commerce work is location-independent, so where you are registered makes no difference to it. The regulated work is jurisdictional, and we cover four: Pakistan through FBR, SECP and the provincial authorities, Saudi Arabia through MISA and the Saudi Business Center, the UAE through the Federal Tax Authority, and the United Kingdom through HMRC and Companies House. For anywhere else, tell us the structure and we will say plainly what we can and cannot take on.',
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
      'We reply to every enquiry within one working day and can usually scope it within two. When work actually starts depends on the service. A tax filing can begin as soon as we have your documents. Development is scheduled against whatever capacity we genuinely have, and we would rather tell you that than agree a date we already know we will miss.',
  },
];
