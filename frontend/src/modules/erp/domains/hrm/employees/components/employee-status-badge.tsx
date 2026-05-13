'use client';

import { StatusBadge } from '../../../../shared/components/status-badge';

interface EmployeeStatusBadgeProps {
  status: string;
}

export function EmployeeStatusBadge({ status }: EmployeeStatusBadgeProps) {
  return <StatusBadge status={status} />;
}
