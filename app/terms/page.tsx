import { LegalPage } from '@/components/sections/LegalPage';
import { BRAND, CONTACT } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Terms of Service',
  description: `The terms under which ${BRAND.name} provides services, including scope, pricing, ownership of work, and the limits of what we can guarantee.`,
  path: '/terms',
});

/**
 * ⚠ TEMPLATE — must be reviewed by a lawyer before launch.
 *
 * The sections that matter commercially and are easy to get wrong are the
 * ownership clause and the guarantees clause. Both are written to match what
 * the service pages promise, so the marketing copy and the contract cannot
 * contradict each other.
 */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      eyebrow="Legal"
      lines={['The terms we', 'work']}
      accent="under"
      path="/terms"
      updated="6 August 2026"
    >
      <p>
        These terms apply to services provided by {BRAND.legalName}. A signed proposal or
        written scope always takes precedence over anything on this page.
      </p>

      <h2>Scope and quotations</h2>
      <p>
        Before any work begins you receive a written scope stating what is included, what
        is excluded, the price and the delivery date. Work outside that scope is quoted
        separately and started only once you approve it. We do not perform additional
        work and invoice for it afterwards.
      </p>

      <h2>Fees</h2>
      <ul>
        <li>Retainers are invoiced monthly in advance.</li>
        <li>Project fees are invoiced 50% on commencement and 50% on delivery.</li>
        <li>
          Government, regulatory and platform fees (SECP, FBR, IPO Pakistan, chamber
          membership, app store fees, advertising spend) are charged at cost with the
          receipt attached. We do not mark them up.
        </li>
        <li>All fees are exclusive of applicable sales tax.</li>
        <li>Invoices are due within 14 days.</li>
      </ul>

      <h2>Ownership of work</h2>
      <p>
        <strong>You own everything we produce for you.</strong> Source code repositories,
        design files, accounting records, advertising accounts, social media accounts and
        domain registrations are held in your name throughout the engagement, with us
        acting as a delegated user. On termination there is nothing to transfer: you
        change the passwords and everything remains yours.
      </p>
      <p>
        Ownership of deliverables passes to you on payment in full. We retain the right
        to describe the work publicly only with your written permission.
      </p>

      <h2>What we can and cannot guarantee</h2>
      <p>
        We guarantee the scope, the delivery date and the quality of our own work. We
        cannot guarantee outcomes that are decided by a third party. Specifically:
      </p>
      <ul>
        <li>
          Approval of a trademark, company registration, licence or refund rests with the
          relevant authority, not with us.
        </li>
        <li>
          Monetization approval on YouTube, TikTok or Facebook is entirely the
          platform&rsquo;s decision. Nobody can guarantee it.
        </li>
        <li>
          Advertising return depends on your margins, pricing and market. We commit to
          accurate tracking and honest reporting, not to a specific return figure.
        </li>
        <li>
          Search rankings and app store approvals are controlled by Google and Apple
          respectively.
        </li>
      </ul>
      <p>
        Any party promising a guaranteed result in these areas is promising something
        that is not theirs to give.
      </p>

      <h2>Your responsibilities</h2>
      <p>
        We depend on you for accurate information, documents and timely approvals. Where
        we file, register or report on your behalf, the accuracy of what you supply is
        your responsibility, and we are not liable for penalties arising from information
        that was incorrect or withheld.
      </p>

      <h2>Confidentiality</h2>
      <p>
        We treat your financial records, business plans and credentials as confidential
        and will not disclose them to anyone outside our team without your consent,
        except where required by law.
      </p>

      <h2>Termination</h2>
      <p>
        Either party may end a retainer with 30 days written notice. There is no lock-in
        period and no exit fee. Work completed up to the termination date is invoiced
        normally. Project engagements may be paused or cancelled, with work completed to
        that point invoiced pro rata.
      </p>

      <h2>Liability</h2>
      <p>
        Our total liability under any engagement is limited to the fees paid for that
        engagement in the preceding twelve months. We are not liable for indirect or
        consequential loss.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of Pakistan, and the courts of{' '}
        {CONTACT.address.city} have exclusive jurisdiction.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>
    </LegalPage>
  );
}
