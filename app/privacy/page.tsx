import { LegalPage } from '@/components/sections/LegalPage';
import { BRAND, CONTACT } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: `How ${BRAND.name} collects, uses and stores personal data submitted through this website, and how to have it deleted.`,
  path: '/privacy',
});

/**
 * ⚠ TEMPLATE — reviewed by a lawyer before launch.
 *
 * This describes what the site actually does today, which is deliberately
 * little: one contact form, no analytics, no third-party trackers, no cookies.
 * If analytics or a marketing pixel is ever added, this page must be updated
 * in the same commit.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      eyebrow="Legal"
      lines={['How we handle']}
      accent="your information"
      path="/privacy"
      updated="6 August 2026"
    >
      <p>
        This policy explains what {BRAND.legalName} does with personal information
        submitted through this website. It is written to describe what actually happens,
        not to cover every theoretical possibility.
      </p>

      <h2>What we collect</h2>
      <p>
        Only what you type into the contact form: your name, email address, and
        optionally your phone number, company name, the service you are interested in
        and your message. We also record which page you submitted from,
        so we know what you were reading.
      </p>
      <p>
        We store a one-way hash of your IP address and your browser&rsquo;s user-agent
        string. The hash lets us identify repeated automated submissions without
        retaining your actual IP address, which we have no use for.
      </p>

      <h2>What we do not collect</h2>
      <ul>
        <li>
          <strong>No analytics.</strong> This site runs no Google Analytics, no
          Meta pixel and no third-party tracking of any kind.
        </li>
        <li>
          <strong>No cookies.</strong> The site sets no cookies and requires no
          cookie banner, because there is nothing to consent to.
        </li>
        <li>
          <strong>No advertising identifiers</strong> and no cross-site tracking.
        </li>
        <li>
          <strong>No fonts or scripts from third-party servers.</strong> Everything
          is served from this domain, so no external party sees your visit.
        </li>
      </ul>

      <h2>Why we hold it</h2>
      <p>
        To reply to your enquiry and to keep a record of the conversation if you become
        a client. That is the only purpose. We do not sell, rent or share your details
        with anyone, and we do not add you to a mailing list.
      </p>

      <h2>Where it is stored</h2>
      <p>
        Enquiries are stored in a Supabase database with access restricted to our team.
        Data is transmitted over HTTPS. Our database credentials are held on the server
        only and are never present in your browser.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Enquiries that do not lead to work are deleted after 24 months. Client records
        are retained for as long as the relationship continues, and afterwards for the
        period required by Pakistani tax and corporate record-keeping law.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us at any time for a copy of what we hold about you, ask us to
        correct it, or ask us to delete it. Email{' '}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and we will action it
        within 30 days. There is no charge and you do not need to give a reason.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we add analytics, a chat widget, or anything else that collects data, this
        page will be updated at the same time and the date at the top will change.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        , or {CONTACT.phone}.
      </p>
    </LegalPage>
  );
}
