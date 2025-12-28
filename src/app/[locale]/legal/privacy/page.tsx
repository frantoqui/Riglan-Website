import { unstable_setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout';

export default function PrivacyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 py-section-sm">
        <Container size="narrow">
          <h1 className="font-serif text-3xl font-bold text-primary-900 md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Last updated: December 2024
          </p>
        </Container>
      </section>

      <section className="py-section-md">
        <Container size="narrow">
          <div className="prose prose-neutral max-w-none">
            <h2>1. Information We Collect</h2>
            <p>We collect information necessary to fulfill publication orders:</p>
            <ul>
              <li>Contact information (name, email, company)</li>
              <li>Billing information</li>
              <li>Commission request details</li>
              <li>Usage data for security and watermarking purposes</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>Your information is used to:</p>
            <ul>
              <li>Process and deliver publication orders</li>
              <li>Communicate about order status</li>
              <li>Generate watermarked documents</li>
              <li>Enforce intellectual property rights</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell or share your personal information with third parties except:
            </p>
            <ul>
              <li>Payment processors for transaction processing</li>
              <li>Legal authorities when required by law</li>
              <li>Service providers who assist in operations</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. All
              transmissions are encrypted using TLS. Access to personal data is restricted
              to authorized personnel only.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain your information for the duration of your license period plus any
              period required by law. Download logs are retained indefinitely for
              intellectual property enforcement.
            </p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion (subject to legal requirements)</li>
              <li>Object to processing</li>
              <li>Data portability</li>
            </ul>

            <h2>7. Cookies</h2>
            <p>
              We use essential cookies for site functionality. No tracking cookies are used
              for advertising purposes.
            </p>

            <h2>8. Contact</h2>
            <p>
              For privacy inquiries, use the Contact form with the subject Privacy
              Request.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
