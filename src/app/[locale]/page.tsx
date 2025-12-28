import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('home');

  const whatYouBuyItems = [
    t('whatYouBuy.item1'),
    t('whatYouBuy.item2'),
    t('whatYouBuy.item3'),
    t('whatYouBuy.item4'),
  ];

  const whatYouDontBuyItems = [
    t('whatYouDontBuy.item1'),
    t('whatYouDontBuy.item2'),
    t('whatYouDontBuy.item3'),
    t('whatYouDontBuy.item4'),
    t('whatYouDontBuy.item5'),
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-section-lg">
        <Container size="narrow">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-900 sm:text-5xl md:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-700 md:text-xl">
            {t('hero.subtitle')}
          </p>
        </Container>
      </section>

      {/* Context Section */}
      <section className="py-section-md">
        <Container size="narrow">
          <h2 className="font-serif text-2xl font-semibold text-primary-900 md:text-3xl">
            {t('context.title')}
          </h2>
          <p className="mt-4 text-lg text-neutral-700">
            {t('context.description')}
          </p>
        </Container>
      </section>

      {/* What You Buy / Don't Buy Section */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-section-md">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            {/* What You Buy */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-primary-900">
                {t('whatYouBuy.title')}
              </h2>
              <ul className="mt-6 space-y-3">
                {whatYouBuyItems.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="mt-1 h-5 w-5 shrink-0 text-success"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What You Don't Buy */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-primary-900">
                {t('whatYouDontBuy.title')}
              </h2>
              <ul className="mt-6 space-y-3">
                {whatYouDontBuyItems.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="mt-1 h-5 w-5 shrink-0 text-neutral-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Value Statement */}
      <section className="py-section-md">
        <Container size="narrow">
          <p className="text-center font-serif text-xl text-primary-800 md:text-2xl">
            {t('value.text')}
          </p>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="border-t border-neutral-200 bg-primary-900 py-section-md">
        <Container size="narrow">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-center sm:gap-8">
            <Link href="/publications">
              <Button variant="secondary" size="lg">
                {t('cta.viewPublications')}
              </Button>
            </Link>
            <Link href="/commission">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                {t('cta.commission')}
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-center text-sm text-primary-300">
            {t('tagline')}
          </p>
        </Container>
      </section>
    </>
  );
}
