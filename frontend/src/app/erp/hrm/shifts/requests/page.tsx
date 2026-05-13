'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus, ArrowLeftRight, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ShiftRequest {
  id: string;
  employeeName: string;
  currentShift: string;
  requestedShift: string;
  reason: string;
  status: string;
  requestDate: string;
}

const initialRequests: ShiftRequest[] = [
  { id: 'sr-1', employeeName: 'John Smith', currentShift: 'Morning Shift', requestedShift: 'General Shift', reason: 'Medical appointment scheduling', status: 'pending', requestDate: '2025-03-01' },
  { id: 'sr-2', employeeName: 'Sarah Wilson', currentShift: 'General Shift', requestedShift: 'Morning Shift', reason: 'Childcare needs', status: 'approved', requestDate: '2025-02-28' },
  { id: 'sr-3', employeeName: 'Mike Johnson', currentShift: 'Night Shift', requestedShift: 'Afternoon Shift', reason: 'Health concerns', status: 'pending', requestDate: '2025-03-02' },
  { id: 'sr-4', employeeName: 'Emily Davis', currentShift: 'Afternoon Shift', requestedShift: 'Morning Shift', reason: 'Transportation change', status: 'rejected', requestDate: '2025-02-25' },
  { id: 'sr-5', employeeName: 'Alex Brown', currentShift: 'General Shift', requestedShift: 'Flexible Shift', reason: 'Work-life balance', status: 'pending', requestDate: '2025-03-03' },
];

const statusBadgeClass: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  approved: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
};

const shiftOptions = ['Morning Shift', 'Afternoon Shift', 'Night Shift', 'General Shift', 'Flexible Shift'];

const columns: ColumnDef<ShiftRequest>[] = [
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
    accessorKey: 'currentShift',
    header: 'Current Shift',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'requestedShift',
    header: 'Requested Shift',
    cell: ({ getValue }) => (
      <Badge variant="outline" className="text-module-erp" style={{ fontSize: 'var(--text-xs)' }}>
        {getValue() as string}
      </Badge>
    ),
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground truncate max-w-[200px] block" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'requestDate',
    header: 'Request Date',
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
];

export default function ShiftRequestsPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [showForm, setShowForm] = useState(false);
  const [formCurrentShift, setFormCurrentShift] = useState('');
  const [formRequestedShift, setFormRequestedShift] = useState('');
  const [formReason, setFormReason] = useState('');

  const handleSubmit = () => {
    if (!formCurrentShift || !formRequestedShift || !formReason) return;
    const newRequest: ShiftRequest = {
      id: `sr-${Date.now()}`,
      employeeName: 'Current User',
      currentShift: formCurrentShift,
      requestedShift: formRequestedShift,
      reason: formReason,
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
    };
    setRequests(prev => [newRequest, ...prev]);
    setShowForm(false);
    setFormCurrentShift('');
    setFormRequestedShift('');
    setFormReason('');
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;

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
              Shift Change Requests
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
            >
              Review and manage shift change requests
            </p>
          </div>
          <Button
            className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
            style={{ fontSize: 'var(--text-sm)' }}
            onClick={() => setShowForm(true)}
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            Request Change
          </Button>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-4 mb-6"
        >
          {[
            { label: 'Pending', count: pendingCount, color: 'text-amber-500' },
            { label: 'Approved', count: requests.filter(r => r.status === 'approved').length, color: 'text-green-500' },
            { label: 'Rejected', count: requests.filter(r => r.status === 'rejected').length, color: 'text-red-500' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <span className={cn('font-semibold', s.color)} style={{ fontSize: 'var(--text-sm)' }}>{s.count}</span>
              <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-normal)' }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SmartTable
            data={requests as unknown as Record<string, unknown>[]}
            columns={columns}
            searchable
            searchPlaceholder="Search shift requests..."
            emptyMessage="No shift requests found"
          />
        </motion.div>

        {/* Request Form Modal */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ArrowLeftRight className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
                Request Shift Change
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Current Shift</Label>
                <Select value={formCurrentShift} onValueChange={setFormCurrentShift}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select current shift" />
                  </SelectTrigger>
                  <SelectContent>
                    {shiftOptions.map((shift) => (
                      <SelectItem key={shift} value={shift}>{shift}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Requested Shift</Label>
                <Select value={formRequestedShift} onValueChange={setFormRequestedShift}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select requested shift" />
                  </SelectTrigger>
                  <SelectContent>
                    {shiftOptions.map((shift) => (
                      <SelectItem key={shift} value={shift}>{shift}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Input
                  id="reason"
                  placeholder="Enter reason for shift change"
                  value={formReason}
                  onChange={(e) => setFormReason(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button className="bg-module-erp hover:bg-module-erp/90 text-white" onClick={handleSubmit}>
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
