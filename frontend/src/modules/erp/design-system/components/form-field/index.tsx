'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  /** Optional explicit ID for the input; if omitted, a unique ID is generated */
  inputId?: string;
}

/**
 * Accessible form field wrapper.
 * Associates the <label> with the first child input/select/textarea
 * via `htmlFor` / `id` so screen readers announce the label correctly.
 */
export function FormField({ label, error, required, children, className, inputId }: FormFieldProps) {
  const autoId = useId();
  const fieldId = inputId ?? autoId;

  return (
    <div className={cn('space-y-1.5', className)}>
      <label
        htmlFor={fieldId}
        className="text-sm font-medium text-foreground"
        style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
      >
        {label}
        {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs" role="alert" style={{ fontSize: 'var(--text-xs)' }}>
          {error}
        </p>
      )}
    </div>
  );
}
