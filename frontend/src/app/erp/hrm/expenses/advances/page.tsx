'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus, Wallet, MoreHorizontal, Eye } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EmployeeAdvance {
  id: string;
  employeeName: string;
  amount: number;
  purpose: string;
  status: string;
  requestDate: string;
  repaymentStartDate: string;
  remainingAmount: number;
}

const initialAdvances: EmployeeAdvance[] = [
  { id: 'ea-1', employeeName: 'John Smith', amount: 2000, purpose: 'House deposit', status: 'active', requestDate: '2025-02-15', repaymentStartDate: '2025-03-01', remainingAmount: 1500 },
  { id: 'ea-2', employeeName: 'Sarah Wilson', amount: 500, purpose: 'Medical emergency', status: 'active', requestDate: '2025-03-01', repaymentStartDate: '2025-04-01', remainingAmount: 500 },
  { id: 'ea-3', employeeName: 'Mike Johnson', amount: 1500, purpose: 'Vehicle repair', status: 'pending', requestDate: '2025-03-03', repaymentStartDate: '2025-04-01', remainingAmount: 1500 },
  { id: 'ea-4', employeeName: 'Emily Davis', amount: 3000, purpose: 'Education fees', status: 'approved', requestDate: '2025-02-28', repaymentStartDate: '2025-03-15', remainingAmount: 3000 },
  { id: 'ea-5', employeeName: 'Alex Brown', amount: 800, purpose: 'Travel advance', status: 'repaid', requestDate: '2025-01-15', repaymentStartDate: '2025-02-01', remainingAmount: 0 },
];

const statusBadgeClass: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  approved: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  active: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
  repaid: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/15',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
};

const purposeOptions = ['House deposit', 'Medical emergency', 'Vehicle repair', 'Education fees', 'Travel advance', 'Personal', 'Other'];

const columns: ColumnDef<EmployeeAdvance>[] = [
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
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        ${(getValue() as number).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: 'remainingAmount',
    header: 'Remaining',
    cell: ({ getValue }) => {
      const val = getValue() as number;
      return (
        <span className={cn(val > 0 ? 'text-amber-500' : 'text-green-500')} style={{ fontSize: 'var(--text-sm)' }}>
          ${val.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: 'purpose',
    header: 'Purpose',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground truncate max-w-[200px] block" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'requestDate',
    header: 'Requested',
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
            <Eye className="h-4 w-4 mr-2" strokeWidth={1.8} />
            View Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];

export default function EmployeeAdvancesPage() {
  const [advances, setAdvances] = useState(initialAdvances);
  const [showForm, setShowForm] = useState(false);
  const [formAmount, setFormAmount] = useState('');
  const [formPurpose, setFormPurpose] = useState('');
  const [formRepaymentDate, setFormRepaymentDate] = useState('');

  const handleSubmit = () => {
    if (!formAmount || !formPurpose) return;
    const newAdvance: EmployeeAdvance = {
      id: `ea-${Date.now()}`,
      employeeName: 'Current User',
      amount: parseFloat(formAmount),
      purpose: formPurpose,
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      repaymentStartDate: formRepaymentDate || new Date().toISOString().split('T')[0],
      remainingAmount: parseFloat(formAmount),
    };
    setAdvances(prev => [newAdvance, ...prev]);
    setShowForm(false);
    setFormAmount('');
    setFormPurpose('');
    setFormRepaymentDate('');
  };

  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
        >
          <div>
            <h1
              className="font-bold text-foreground"
              style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
            >
              Employee Advances
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
            >
              Manage salary advances and repayments
            </p>
          </div>
          <Button
            className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
            style={{ fontSize: 'var(--text-sm)' }}
            onClick={() => setShowForm(true)}
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            Request Advance
          </Button>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0.07, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="flex items-center gap-4 mb-6"
        >
          {[
            { label: 'Pending', count: advances.filter(a => a.status === 'pending').length, color: 'text-amber-500' },
            { label: 'Active', count: advances.filter(a => a.status === 'active').length, color: 'text-blue-500' },
            { label: 'Repaid', count: advances.filter(a => a.status === 'repaid').length, color: 'text-green-500' },
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
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <SmartTable
            data={advances}
            columns={columns}
            searchable
            searchPlaceholder="Search advances..."
            emptyMessage="No advances found"
          />
        </motion.div>

        {/* Request Advance Modal */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
                Request Advance
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Purpose</Label>
                <Select value={formPurpose} onValueChange={setFormPurpose}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    {purposeOptions.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="advance-amount">Amount ($)</Label>
                <Input
                  id="advance-amount"
                  type="number"
                  placeholder="0.00"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repayment-date">Repayment Start Date</Label>
                <Input
                  id="repayment-date"
                  type="date"
                  value={formRepaymentDate}
                  onChange={(e) => setFormRepaymentDate(e.target.value)}
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
