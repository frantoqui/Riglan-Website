import { unstable_setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout';

export default function TermsPage({
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
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Last updated: December 2024
          </p>
        </Container>
      </section>

      <section className="py-section-md">
        <Container size="narrow">
          <div className="prose prose-neutral max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using RIGLAN publications and services, you agree to be bound
              by these Terms of Service. If you do not agree to these terms, do not use our
              services.
            </p>

            <h2>2. Use Restrictions - No AI Training</h2>
            <p>
              RIGLAN publications may NOT be ingested, parsed, indexed, fine-tuned, or used
              for training artificial intelligence or machine learning systems. This
              prohibition applies to all forms of automated data extraction and processing
              for AI/ML purposes.
            </p>
            <p>
              <strong>Liquidated Damages:</strong> USD 25,000 per report for violations.
              RIGLAN reserves the right to audit compliance.
            </p>

            <h2>3. Ownership & Intellectual Property</h2>
            <p>
              All publications remain the exclusive property of RIGLAN. Clients receive
              usage rights only. No ownership transfer or derivative rights are granted.
            </p>

            <h2>4. License Terms</h2>
            <ul>
              <li>Single legal entity license</li>
              <li>Non-transferable and non-sublicensable</li>
              <li>Entity-bound use only</li>
              <li>5-year license duration</li>
            </ul>

            <h2>5. Publication Status</h2>
            <p>
              <strong>Private:</strong> For commissioned use only. Client identity never
              disclosed.
            </p>
            <p>
              <strong>Catalogue Inclusion:</strong> Publication may be offered to other
              clients. Commissioning client identity never disclosed. Client retains same
              usage rights.
            </p>

            <h2>6. Watermarking & Traceability</h2>
            <p>
              All documents contain traceable watermarks. Unauthorized distribution may be
              investigated and enforced.
            </p>

            <h2>7. Refund Policy</h2>
            <p>NO refunds once delivery has occurred.</p>

            <h2>8. Limitation of Liability</h2>
            <p>
              RIGLAN publications are structural analyses only. They do not constitute
              advice, recommendations, or guidance. RIGLAN is not liable for any decisions
              made based on publication content.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These terms are governed by the laws of the applicable jurisdiction. Any
              disputes shall be resolved through binding arbitration.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
