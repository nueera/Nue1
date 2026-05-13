'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus, Pencil, Trash2, MoreHorizontal, Clock } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ShiftType {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  graceTime: string;
  color: string;
  status: string;
}

const initialShiftTypes: ShiftType[] = [
  { id: 'st-1', name: 'Morning Shift', startTime: '06:00', endTime: '14:00', graceTime: '15', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15', status: 'active' },
  { id: 'st-2', name: 'Afternoon Shift', startTime: '14:00', endTime: '22:00', graceTime: '15', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/15', status: 'active' },
  { id: 'st-3', name: 'Night Shift', startTime: '22:00', endTime: '06:00', graceTime: '10', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/15', status: 'active' },
  { id: 'st-4', name: 'General Shift', startTime: '09:00', endTime: '18:00', graceTime: '15', color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15', status: 'active' },
  { id: 'st-5', name: 'Flexible Shift', startTime: '08:00', endTime: '17:00', graceTime: '30', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/15', status: 'inactive' },
];

const statusBadgeClass: Record<string, string> = {
  active: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  inactive: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/15',
};

const columns: ColumnDef<ShiftType>[] = [
  {
    accessorKey: 'name',
    header: 'Shift Name',
    cell: ({ getValue }) => (
      <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    cell: ({ getValue }) => (
      <span style={{ fontSize: 'var(--text-sm)' }}>{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'endTime',
    header: 'End Time',
    cell: ({ getValue }) => (
      <span style={{ fontSize: 'var(--text-sm)' }}>{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'graceTime',
    header: 'Grace Time',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string} min
      </span>
    ),
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
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];

export default function ShiftTypesPage() {
  const [shiftTypes, setShiftTypes] = useState(initialShiftTypes);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formStart, setFormStart] = useState('');
  const [formEnd, setFormEnd] = useState('');
  const [formGrace, setFormGrace] = useState('15');

  const handleAdd = () => {
    if (!formName || !formStart || !formEnd) return;
    const newType: ShiftType = {
      id: `st-${Date.now()}`,
      name: formName,
      startTime: formStart,
      endTime: formEnd,
      graceTime: formGrace,
      color: 'bg-module-erp/10 text-module-erp border-module-erp/15',
      status: 'active',
    };
    setShiftTypes(prev => [...prev, newType]);
    setShowForm(false);
    setFormName('');
    setFormStart('');
    setFormEnd('');
    setFormGrace('15');
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
              Shift Types
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
            >
              Configure shift types and their timings
            </p>
          </div>
          <Button
            className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
            style={{ fontSize: 'var(--text-sm)' }}
            onClick={() => setShowForm(true)}
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            Add Shift Type
          </Button>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SmartTable
            data={shiftTypes as unknown as Record<string, unknown>[]}
            columns={columns}
            searchable
            searchPlaceholder="Search shift types..."
            emptyMessage="No shift types found"
          />
        </motion.div>

        {/* Add Shift Type Modal */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
                Add Shift Type
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="shift-name">Shift Name</Label>
                <Input
                  id="shift-name"
                  placeholder="e.g., Morning Shift"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={formStart}
                    onChange={(e) => setFormStart(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={formEnd}
                    onChange={(e) => setFormEnd(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="grace-time">Grace Time (minutes)</Label>
                <Input
                  id="grace-time"
                  type="number"
                  placeholder="15"
                  value={formGrace}
                  onChange={(e) => setFormGrace(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button className="bg-module-erp hover:bg-module-erp/90 text-white" onClick={handleAdd}>
                Add Shift Type
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
