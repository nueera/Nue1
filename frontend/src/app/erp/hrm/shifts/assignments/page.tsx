'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus, Upload, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ShiftAssignment {
  id: string;
  employeeName: string;
  shiftType: string;
  effectiveDate: string;
  endDate: string;
  status: string;
}

const initialAssignments: ShiftAssignment[] = [
  { id: 'sa-1', employeeName: 'John Smith', shiftType: 'Morning Shift', effectiveDate: '2025-03-01', endDate: '2025-03-31', status: 'active' },
  { id: 'sa-2', employeeName: 'Sarah Wilson', shiftType: 'General Shift', effectiveDate: '2025-03-01', endDate: '2025-03-31', status: 'active' },
  { id: 'sa-3', employeeName: 'Mike Johnson', shiftType: 'Night Shift', effectiveDate: '2025-03-01', endDate: '2025-03-15', status: 'active' },
  { id: 'sa-4', employeeName: 'Emily Davis', shiftType: 'Afternoon Shift', effectiveDate: '2025-03-15', endDate: '2025-03-31', status: 'upcoming' },
  { id: 'sa-5', employeeName: 'Alex Brown', shiftType: 'Morning Shift', effectiveDate: '2025-02-01', endDate: '2025-02-28', status: 'expired' },
  { id: 'sa-6', employeeName: 'Lisa Chen', shiftType: 'General Shift', effectiveDate: '2025-03-01', endDate: '2025-03-31', status: 'active' },
  { id: 'sa-7', employeeName: 'Tom Garcia', shiftType: 'Night Shift', effectiveDate: '2025-03-16', endDate: '2025-03-31', status: 'upcoming' },
  { id: 'sa-8', employeeName: 'Rachel Kim', shiftType: 'Afternoon Shift', effectiveDate: '2025-03-01', endDate: '2025-03-31', status: 'active' },
];

const statusBadgeClass: Record<string, string> = {
  active: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  upcoming: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  expired: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/15',
};

const shiftOptions = ['Morning Shift', 'Afternoon Shift', 'Night Shift', 'General Shift', 'Flexible Shift'];
const employeeOptions = ['John Smith', 'Sarah Wilson', 'Mike Johnson', 'Emily Davis', 'Alex Brown', 'Lisa Chen', 'Tom Garcia', 'Rachel Kim'];

const columns: ColumnDef<ShiftAssignment>[] = [
  {
    accessorKey: 'employeeName',
    header: 'Employee',
    cell: ({ getValue }) => (
      <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'shiftType',
    header: 'Shift Type',
    cell: ({ getValue }) => (
      <Badge variant="outline" className="text-module-erp" style={{ fontSize: 'var(--text-xs)' }}>
        {getValue() as string}
      </Badge>
    ),
  },
  {
    accessorKey: 'effectiveDate',
    header: 'Effective Date',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <Badge variant="outline" className={cn('capitalize', statusBadgeClass[status] || '')} style={{ fontSize: 'var(--text-xs)' }}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: '',
    size: 50,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" strokeWidth={1.8} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>
            <Pencil className="h-4 w-4 mr-2" strokeWidth={1.8} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <Trash2 className="h-4 w-4 mr-2" strokeWidth={1.8} />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];

export default function ShiftAssignmentsPage() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [showBulk, setShowBulk] = useState(false);
  const [bulkShift, setBulkShift] = useState('');
  const [bulkEmployees, setBulkEmployees] = useState<string[]>([]);

  const toggleEmployee = (name: string) => {
    setBulkEmployees(prev =>
      prev.includes(name) ? prev.filter(e => e !== name) : [...prev, name]
    );
  };

  const handleBulkAssign = () => {
    if (!bulkShift || bulkEmployees.length === 0) return;
    const newAssignments = bulkEmployees.map((emp, i) => ({
      id: `sa-${Date.now()}-${i}`,
      employeeName: emp,
      shiftType: bulkShift,
      effectiveDate: new Date().toISOString().split('T')[0],
      endDate: '2025-03-31',
      status: 'active',
    }));
    setAssignments(prev => [...newAssignments, ...prev]);
    setShowBulk(false);
    setBulkShift('');
    setBulkEmployees([]);
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
              style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
            >
              Shift Assignments
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
            >
              Assign and manage employee shifts
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 press-scale"
              style={{ fontSize: 'var(--text-sm)' }}
              onClick={() => setShowBulk(true)}
            >
              <Upload className="h-4 w-4" strokeWidth={1.8} />
              Bulk Assign
            </Button>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SmartTable
            data={assignments as unknown as Record<string, unknown>[]}
            columns={columns}
            searchable
            searchPlaceholder="Search shift assignments..."
            emptyMessage="No shift assignments found"
          />
        </motion.div>

        {/* Bulk Assign Modal */}
        <Dialog open={showBulk} onOpenChange={setShowBulk}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
                Bulk Shift Assignment
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Shift Type</Label>
                <Select value={bulkShift} onValueChange={setBulkShift}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift type" />
                  </SelectTrigger>
                  <SelectContent>
                    {shiftOptions.map((shift) => (
                      <SelectItem key={shift} value={shift}>{shift}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Select Employees</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar border border-glass-border/40 rounded-lg p-3 bg-glass-bg/20">
                  {employeeOptions.map((emp) => (
                    <label key={emp} className="flex items-center gap-2 cursor-pointer py-1">
                      <input
                        type="checkbox"
                        checked={bulkEmployees.includes(emp)}
                        onChange={() => toggleEmployee(emp)}
                        className="rounded border-glass-border"
                      />
                      <span style={{ fontSize: 'var(--text-sm)' }}>{emp}</span>
                    </label>
                  ))}
                </div>
                {bulkEmployees.length > 0 && (
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                    {bulkEmployees.length} employee(s) selected
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowBulk(false)}>Cancel</Button>
              <Button
                className="bg-module-erp hover:bg-module-erp/90 text-white"
                onClick={handleBulkAssign}
                disabled={!bulkShift || bulkEmployees.length === 0}
              >
                Assign to {bulkEmployees.length || 0} Employee(s)
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
