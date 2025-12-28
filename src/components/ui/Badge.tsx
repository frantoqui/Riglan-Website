import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { PublicationFormat } from '@/types';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-700',
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

// Specialized badge for publication formats
export interface FormatBadgeProps {
  format: PublicationFormat;
  size?: 'sm' | 'md';
  className?: string;
}

const formatColors: Record<PublicationFormat, { bg: string; text: string }> = {
  BRIEF: { bg: 'bg-blue-100', text: 'text-blue-800' },
  DOSSIER: { bg: 'bg-green-100', text: 'text-green-800' },
  REVIEW: { bg: 'bg-purple-100', text: 'text-purple-800' },
  FILE: { bg: 'bg-amber-100', text: 'text-amber-800' },
};

export function FormatBadge({ format, size = 'md', className }: FormatBadgeProps) {
  const colors = formatColors[format];

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium uppercase tracking-wide',
        colors.bg,
        colors.text,
        sizes[size],
        className
      )}
    >
      {format}
    </span>
  );
}
