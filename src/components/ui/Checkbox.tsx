'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              'mt-0.5 h-5 w-5 shrink-0 appearance-none border bg-white',
              'checked:bg-primary-700 checked:border-primary-700',
              'focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-1',
              'disabled:cursor-not-allowed disabled:bg-neutral-100',
              'checked:bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke-width%3D%223%22%20stroke%3D%22white%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M4.5%2012.75l6%206%209-13.5%22%20%2F%3E%3C%2Fsvg%3E")] checked:bg-center checked:bg-no-repeat',
              error ? 'border-error' : 'border-neutral-300',
              className
            )}
            aria-invalid={!!error}
            {...props}
          />
          {label && (
            <span className="text-sm text-neutral-700">{label}</span>
          )}
        </label>
        {error && (
          <p className="text-sm text-error ml-8" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
