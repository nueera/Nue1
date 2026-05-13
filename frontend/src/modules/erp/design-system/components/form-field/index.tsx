'use client';

import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, error, required, children, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="text-sm font-medium text-foreground" style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs" style={{ fontSize: 'var(--text-xs)' }}>
          {error}
        </p>
      )}
    </div>
  );
}
