import { unstable_setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout';

export default function AIPolicyPage({
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
            AI Training Prohibition
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Last updated: December 2024
          </p>
        </Container>
      </section>

      <section className="py-section-md">
        <Container size="narrow">
          <div className="prose prose-neutral max-w-none">
            <div className="border-l-4 border-error bg-red-50 p-4 mb-8">
              <p className="font-semibold text-error">
                RIGLAN publications may NOT be used for AI/ML training purposes.
              </p>
            </div>

            <h2>1. Prohibition Scope</h2>
            <p>The following uses of RIGLAN publications are strictly prohibited:</p>
            <ul>
              <li>Ingestion into AI/ML training datasets</li>
              <li>Parsing for automated text extraction</li>
              <li>Indexing in AI-powered search systems</li>
              <li>Fine-tuning of language models</li>
              <li>Use in retrieval-augmented generation (RAG) systems</li>
              <li>Any form of automated data mining for AI purposes</li>
            </ul>

            <h2>2. Rationale</h2>
            <p>
              RIGLAN publications represent significant intellectual investment in
              structural analysis. The prohibition protects the value of this work and
              prevents unauthorized reproduction through AI-generated derivatives.
            </p>

            <h2>3. Liquidated Damages</h2>
            <p>
              <strong>USD 25,000 per report</strong> for any violation of this policy.
              This amount represents a reasonable estimate of damages and is not a penalty.
            </p>

            <h2>4. Audit Rights</h2>
            <p>
              RIGLAN reserves the right to audit customer systems to verify compliance with
              this policy. Audit requests must be complied with within 30 days.
            </p>

            <h2>5. Technical Measures</h2>
            <p>RIGLAN employs various technical measures to detect violations:</p>
            <ul>
              <li>Unique watermarks in all documents</li>
              <li>Monitoring of AI model outputs for derivative content</li>
              <li>Partnership with AI providers to identify training data sources</li>
            </ul>

            <h2>6. Reporting Violations</h2>
            <p>
              If you become aware of any violation of this policy, please report it
              immediately through the Contact form.
            </p>

            <h2>7. Permitted Uses</h2>
            <p>Human reading, analysis, and reference are always permitted within the scope of the license. This policy only prohibits automated AI/ML processing.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
