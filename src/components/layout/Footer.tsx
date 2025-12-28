import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Container } from './Container';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <Container size="wide">
        <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          {/* Copyright */}
          <p className="text-sm text-neutral-600">
            {currentYear} {t('copyright')}
          </p>

          {/* Legal Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/legal/terms"
              className="text-sm text-neutral-600 hover:text-primary-800"
            >
              {t('terms')}
            </Link>
            <Link
              href="/legal/privacy"
              className="text-sm text-neutral-600 hover:text-primary-800"
            >
              {t('privacy')}
            </Link>
            <Link
              href="/legal/ai-policy"
              className="text-sm text-neutral-600 hover:text-primary-800"
            >
              {t('aiPolicy')}
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
