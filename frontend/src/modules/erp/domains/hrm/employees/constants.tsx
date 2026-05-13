import type { ColumnDef } from '@tanstack/react-table';
import type { Employee } from '../types';

export const DEPARTMENTS = ['All', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'] as const;
export const STATUSES = ['All', 'active', 'inactive', 'on-leave'] as const;

export const EMPLOYEE_TABLE_COLUMNS: ColumnDef<Employee>[] = [
  {
    accessorKey: 'avatar',
    header: '',
    size: 50,
    cell: ({ row }) => (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-module-erp/15 text-module-erp text-xs font-semibold shrink-0">
        {row.original.avatar}
      </div>
    ),
    enableSorting: false,
  },
  {
    id: 'name',
    header: 'Name',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'position',
    header: 'Position',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'joinDate',
    header: 'Join Date',
  },
  {
    id: 'actions',
    header: '',
    size: 50,
    enableSorting: false,
  },
];

export const EMPLOYEE_DETAIL_TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'attendance', label: 'Attendance' },
  { value: 'leaves', label: 'Leaves' },
  { value: 'payroll', label: 'Payroll' },
] as const;
