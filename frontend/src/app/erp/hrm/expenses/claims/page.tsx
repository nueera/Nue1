'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus, Receipt, MoreHorizontal, Eye, CheckCircle2, XCircle } from 'lucide-react';
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

interface ExpenseClaim {
  id: string;
  employeeName: string;
  type: string;
  amount: number;
  status: string;
  submittedDate: string;
  description: string;
}

const initialClaims: ExpenseClaim[] = [
  { id: 'ec-1', employeeName: 'John Smith', type: 'Travel', amount: 450, status: 'pending', submittedDate: '2025-03-01', description: 'Client visit - Chicago' },
  { id: 'ec-2', employeeName: 'Sarah Wilson', type: 'Meals', amount: 85, status: 'approved', submittedDate: '2025-02-28', description: 'Team lunch meeting' },
  { id: 'ec-3', employeeName: 'Mike Johnson', type: 'Office Supplies', amount: 210, status: 'approved', submittedDate: '2025-02-27', description: 'Monitor and keyboard' },
  { id: 'ec-4', employeeName: 'Emily Davis', type: 'Training', amount: 1200, status: 'pending', submittedDate: '2025-03-02', description: 'Conference registration' },
  { id: 'ec-5', employeeName: 'Alex Brown', type: 'Travel', amount: 780, status: 'rejected', submittedDate: '2025-02-25', description: 'Non-approved trip' },
  { id: 'ec-6', employeeName: 'Lisa Chen', type: 'Internet', amount: 60, status: 'reimbursed', submittedDate: '2025-02-20', description: 'Home office internet' },
];

const statusBadgeClass: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  approved: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
  reimbursed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
};

const expenseTypes = ['Travel', 'Meals', 'Office Supplies', 'Training', 'Internet', 'Software', 'Other'];

const columns: ColumnDef<ExpenseClaim>[] = [
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
    accessorKey: 'type',
    header: 'Type',
    cell: ({ getValue }) => (
      <Badge variant="outline" className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
        {getValue() as string}
      </Badge>
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
    accessorKey: 'description',
    header: 'Description',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground truncate max-w-[200px] block" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'submittedDate',
    header: 'Submitted',
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
            View
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CheckCircle2 className="h-4 w-4 mr-2" strokeWidth={1.8} />
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <XCircle className="h-4 w-4 mr-2" strokeWidth={1.8} />
            Reject
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];

export default function ExpenseClaimsPage() {
  const [claims, setClaims] = useState(initialClaims);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const handleSubmit = () => {
    if (!formType || !formAmount || !formDescription) return;
    const newClaim: ExpenseClaim = {
      id: `ec-${Date.now()}`,
      employeeName: 'Current User',
      type: formType,
      amount: parseFloat(formAmount),
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
      description: formDescription,
    };
    setClaims(prev => [newClaim, ...prev]);
    setShowForm(false);
    setFormType('');
    setFormAmount('');
    setFormDescription('');
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
              Expense Claims
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
            >
              Submit and manage expense claims
            </p>
          </div>
          <Button
            className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
            style={{ fontSize: 'var(--text-sm)' }}
            onClick={() => setShowForm(true)}
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            New Claim
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
            { label: 'Pending', count: claims.filter(c => c.status === 'pending').length, color: 'text-amber-500' },
            { label: 'Approved', count: claims.filter(c => c.status === 'approved').length, color: 'text-green-500' },
            { label: 'Reimbursed', count: claims.filter(c => c.status === 'reimbursed').length, color: 'text-blue-500' },
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
            data={claims as unknown as Record<string, unknown>[]}
            columns={columns}
            searchable
            searchPlaceholder="Search expense claims..."
            emptyMessage="No expense claims found"
          />
        </motion.div>

        {/* New Claim Modal */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
                New Expense Claim
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Expense Type</Label>
                <Select value={formType} onValueChange={setFormType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select expense type" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter expense description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button className="bg-module-erp hover:bg-module-erp/90 text-white" onClick={handleSubmit}>
                Submit Claim
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
