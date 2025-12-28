import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout';

export default async function CorePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('core');

  return (
    <>
      {/* Header Section */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-section-lg">
        <Container size="narrow">
          <h1 className="font-serif text-3xl font-bold text-primary-900 md:text-4xl">
            {t('title')}
          </h1>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-section-md">
        <Container size="narrow">
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg text-neutral-700 leading-relaxed">
              {t('description')}
            </p>

            <p className="mt-6 text-neutral-600">
              {t('clarification')}
            </p>

            {/* Conceptual Diagram Placeholder */}
            <div className="my-12 border border-neutral-200 bg-neutral-50 p-8">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="mx-auto h-24 w-24 text-primary-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                    />
                  </svg>
                  <p className="mt-4 text-sm text-neutral-500">
                    Structural Framework Diagram
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center font-serif text-xl text-primary-800">
              {t('closing')}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
