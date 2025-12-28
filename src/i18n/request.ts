import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is valid
  if (!locales.includes(locale as Locale)) {
    return {
      locale: 'en',
      messages: (await import('../../public/locales/en/common.json')).default,
    };
  }

  return {
    messages: (await import(`../../public/locales/${locale}/common.json`)).default,
  };
});
