'use client';

import { DepartmentSelect as SharedDepartmentSelect } from '../../../shared/components/department-select/department-select';

interface HrmDepartmentSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  allOption?: boolean;
}

/**
 * HRM-specific wrapper around the shared DepartmentSelect component.
 * Provides default placeholder text relevant to HRM context.
 */
export function DepartmentSelect({
  value,
  onChange,
  placeholder = 'Department',
  allOption = true,
}: HrmDepartmentSelectProps) {
  return (
    <SharedDepartmentSelect
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      allOption={allOption}
    />
  );
}
