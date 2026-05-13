'use client';

import { EmployeeSelect as SharedEmployeeSelect } from '../../../shared/components/employee-select/employee-select';
import type { EmployeeOption } from '../../../shared/components/employee-select/employee-select';

interface HrmEmployeeSelectProps {
  employees: EmployeeOption[];
  value?: string;
  onChange?: (employeeId: string) => void;
  placeholder?: string;
}

/**
 * HRM-specific wrapper around the shared EmployeeSelect component.
 * Provides default placeholder text relevant to HRM context.
 */
export function EmployeeSelect({
  employees,
  value,
  onChange,
  placeholder = 'Select employee...',
}: HrmEmployeeSelectProps) {
  return (
    <SharedEmployeeSelect
      employees={employees}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export type { EmployeeOption };
