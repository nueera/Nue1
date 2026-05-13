'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEPARTMENTS } from '../../../core/utils/constants';

interface DepartmentSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  allOption?: boolean;
}

export function DepartmentSelect({ value, onChange, placeholder = 'Department', allOption = true }: DepartmentSelectProps) {
  const items = allOption ? ['All', ...DEPARTMENTS] : [...DEPARTMENTS];
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[160px]" size="sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((dept) => (
          <SelectItem key={dept} value={dept}>
            {dept === 'All' ? 'All Departments' : dept}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
