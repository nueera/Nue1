'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  MoreHorizontal,
  Eye,
  Pencil,
  UserX,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { employees, type Employee } from '@/modules/erp/data/mock';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statusBadgeClass: Record<string, string> = {
  active: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  inactive: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/15',
  'on-leave': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
};

const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
const statuses = ['All', 'active', 'inactive', 'on-leave'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.04 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function AvatarCircle({ initials }: { initials: string }) {
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-module-erp/15 text-module-erp text-xs font-semibold shrink-0">
      {initials}
    </div>
  );
}

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'avatar',
    header: '',
    size: 50,
    cell: ({ row }) => <AvatarCircle initials={row.original.avatar} />,
    enableSorting: false,
  },
  {
    id: 'name',
    header: 'Name',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-foreground">{row.original.firstName} {row.original.lastName}</p>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'position',
    header: 'Position',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <Badge
          variant="outline"
          className={cn('capitalize', statusBadgeClass[status] || '')}
          style={{ fontSize: 'var(--text-xs)' }}
        >
          {status.replace('-', ' ')}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'joinDate',
    header: 'Join Date',
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return (
        <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: '',
    size: 50,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4" strokeWidth={1.8} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>
            <Eye className="h-4 w-4 mr-2" strokeWidth={1.8} />
            View
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pencil className="h-4 w-4 mr-2" strokeWidth={1.8} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <UserX className="h-4 w-4 mr-2" strokeWidth={1.8} />
            Deactivate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];

export default function EmployeesPage() {
  const router = useRouter();
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      if (departmentFilter !== 'All' && emp.department !== departmentFilter) return false;
      if (statusFilter !== 'All' && emp.status !== statusFilter) return false;
      return true;
    });
  }, [departmentFilter, statusFilter]);

  const handleRowClick = (employee: Employee) => {
    router.push(`/erp/hrm/employees/${employee.id}`);
  };

  return (
    <PageTransition>
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <h1
            className="font-bold text-foreground"
            style={{
              fontSize: 'var(--text-xl)',
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: 'var(--leading-tight)',
            }}
          >
            Employees
          </h1>
          <p
            className="text-muted-foreground mt-1"
            style={{
              fontSize: 'var(--text-sm)',
              letterSpacing: 'var(--tracking-normal)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            Manage your workforce
          </p>
        </div>
        <Button
          className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <Plus className="h-4 w-4" strokeWidth={1.8} />
          Add Employee
        </Button>
      </motion.div>

      {/* Action bar */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-wrap items-center gap-3 mb-6"
      >
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[160px]" size="sm">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept === 'All' ? 'All Departments' : dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]" size="sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status === 'All' ? 'All Statuses' : status.replace('-', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="ml-auto flex items-center gap-1 border border-glass-border/40 bg-glass-bg/30 rounded-lg p-1">
          <button
            onClick={() => setViewMode('table')}
            className={cn(
              'flex items-center justify-center h-7 w-7 rounded-md transition-colors duration-[var(--motion-fast)]',
              viewMode === 'table'
                ? 'bg-module-erp/15 text-module-erp'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-label="Table view"
          >
            <List className="h-4 w-4" strokeWidth={1.8} />
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={cn(
              'flex items-center justify-center h-7 w-7 rounded-md transition-colors duration-[var(--motion-fast)]',
              viewMode === 'cards'
                ? 'bg-module-erp/15 text-module-erp'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-label="Card view"
          >
            <LayoutGrid className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </motion.div>

      {/* Content */}
      {viewMode === 'table' ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SmartTable
            data={filteredEmployees as unknown as Record<string, unknown>[]}
            columns={columns}
            searchable
            searchPlaceholder="Search employees..."
            onRowClick={handleRowClick as (row: Record<string, unknown>) => void}
            emptyMessage="No employees found"
          />
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredEmployees.map((emp) => (
            <motion.div
              key={emp.id}
              variants={cardVariants}
              onClick={() => handleRowClick(emp)}
              className="glass-surface rounded-xl p-5 cursor-pointer hover:border-module-erp/30 transition-colors duration-[var(--motion-fast)] hover-lift group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-module-erp/15 text-module-erp text-sm font-semibold shrink-0 group-hover:scale-[1.03] transition-transform duration-[var(--motion-base)]">
                  {emp.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground truncate" style={{ fontSize: 'var(--text-sm)' }}>
                    {emp.firstName} {emp.lastName}
                  </p>
                  <p className="text-muted-foreground truncate" style={{ fontSize: 'var(--text-xs)' }}>
                    {emp.position}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant="outline"
                  className="text-muted-foreground"
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {emp.department}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn('capitalize', statusBadgeClass[emp.status])}
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {emp.status.replace('-', ' ')}
                </Badge>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
    </PageTransition>
  );
}
