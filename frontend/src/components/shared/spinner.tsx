'use client';

// ============================================================================
// Spinner
// Promoted from modules/erp/design-system/components/spinner to shared.
// Used by all modules — not ERP-specific.
// ============================================================================

import { cn } from '@/lib/utils';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  const sizeClass = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }[size];

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-muted border-t-primary',
        sizeClass,
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
