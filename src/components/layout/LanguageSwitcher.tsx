'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    // Remove the current locale prefix from the pathname
    const segments = pathname.split('/');
    const currentLocaleIndex = locales.indexOf(segments[1] as Locale);

    let newPath: string;
    if (currentLocaleIndex !== -1) {
      // Replace the locale segment
      segments[1] = newLocale;
      newPath = segments.join('/');
    } else {
      // Add the locale segment
      newPath = `/${newLocale}${pathname}`;
    }

    setIsOpen(false);
    router.push(newPath);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded px-2 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{localeFlags[locale]}</span>
        <span className="hidden sm:inline uppercase">{locale}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded border border-neutral-200 bg-white shadow-lg">
          <div className="py-1">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-neutral-50',
                  locale === loc && 'bg-neutral-100 font-medium'
                )}
                aria-current={locale === loc ? 'true' : undefined}
              >
                <span className="text-lg">{localeFlags[loc]}</span>
                <span>{localeNames[loc]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}