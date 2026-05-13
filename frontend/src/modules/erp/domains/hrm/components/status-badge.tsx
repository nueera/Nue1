'use client';

import { StatusBadge as SharedStatusBadge } from '../../../shared/components/status-badge/status-badge';

interface HrmStatusBadgeProps {
  status: string;
  className?: string;
}

/**
 * HRM-specific wrapper around the shared StatusBadge component.
 * Can be extended with HRM-specific status color mappings in the future.
 */
export function StatusBadge({ status, className }: HrmStatusBadgeProps) {
  return <SharedStatusBadge status={status} className={className} />;
}
