import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout';
import { CommissionForm } from '@/components/commission';

export default async function CommissionPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('commission');

  const processSteps = [
    t('process.step1'),
    t('process.step2'),
    t('process.step3'),
    t('process.step4'),
    t('process.step5'),
  ];

  return (
    <>
      {/* Header Section */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-section-sm">
        <Container size="narrow">
          <h1 className="font-serif text-3xl font-bold text-primary-900 md:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-neutral-700">{t('description')}</p>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-section-md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <CommissionForm />
            </div>

            {/* Process Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="font-serif text-xl font-semibold text-primary-900">
                  {t('process.title')}
                </h2>
                <ol className="mt-4 space-y-4">
                  {processSteps.map((step: string, index: number) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-primary-100 text-xs font-medium text-primary-800">
                        {index + 1}
                      </span>
                      <span className="text-sm text-neutral-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
