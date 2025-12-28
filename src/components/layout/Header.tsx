'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from './Container';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils';

interface NavItem {
  key: string;
  href: string;
}

const navItems: NavItem[] = [
  { key: 'publications', href: '/publications' },
  { key: 'commission', href: '/commission' },
  { key: 'core', href: '/core' },
  { key: 'contact', href: '/contact' },
];

export function Header() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
      <Container size="wide">
        <nav className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo-black.png"
              alt="RIGLAN"
              width={120}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="whitespace-nowrap text-sm font-medium text-neutral-600 hover:text-primary-800"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden items-center gap-4 md:flex">
            <LanguageSwitcher />
            <Link
              href="/auth/login"
              className="whitespace-nowrap text-sm font-medium text-primary-700 hover:text-primary-900"
            >
              {t('login')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center text-neutral-600 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            'border-t border-neutral-200 md:hidden',
            mobileMenuOpen ? 'block' : 'hidden'
          )}
        >
          <div className="space-y-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block py-2 text-base font-medium text-neutral-600 hover:text-primary-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className="block py-2 text-base font-medium text-primary-700 hover:text-primary-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('login')}
            </Link>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}