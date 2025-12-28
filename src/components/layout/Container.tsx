import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'narrow' | 'default' | 'wide';
}

export function Container({ children, className, size = 'default' }: ContainerProps) {
  const sizes = {
    narrow: 'max-w-3xl',
    default: 'max-w-5xl',
    wide: 'max-w-7xl',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  );
}
