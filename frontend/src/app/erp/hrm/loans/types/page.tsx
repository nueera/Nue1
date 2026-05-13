'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus, Landmark, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
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

interface LoanType {
  id: string;
  name: string;
  maxAmount: number;
  interestRate: number;
  maxTerm: string;
  status: string;
}

const initialLoanTypes: LoanType[] = [
  { id: 'lt-1', name: 'Personal Loan', maxAmount: 10000, interestRate: 5.0, maxTerm: '12 months', status: 'active' },
  { id: 'lt-2', name: 'Emergency Loan', maxAmount: 3000, interestRate: 2.0, maxTerm: '6 months', status: 'active' },
  { id: 'lt-3', name: 'Education Loan', maxAmount: 20000, interestRate: 3.5, maxTerm: '24 months', status: 'active' },
  { id: 'lt-4', name: 'Vehicle Loan', maxAmount: 25000, interestRate: 4.5, maxTerm: '36 months', status: 'active' },
  { id: 'lt-5', name: 'Housing Loan', maxAmount: 50000, interestRate: 6.0, maxTerm: '60 months', status: 'inactive' },
];

const statusBadgeClass: Record<string, string> = {
  active: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  inactive: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/15',
};

const termOptions = ['3 months', '6 months', '12 months', '24 months', '36 months', '60 months'];

const columns: ColumnDef<LoanType>[] = [
  {
    accessorKey: 'name',
    header: 'Loan Type',
    cell: ({ getValue }) => (
      <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'maxAmount',
    header: 'Max Amount',
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        ${(getValue() as number).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: 'interestRate',
    header: 'Interest Rate',
    cell: ({ getValue }) => (
      <span style={{ fontSize: 'var(--text-sm)' }}>
        {(getValue() as number).toFixed(1)}%
      </span>
    ),
  },
  {
    accessorKey: 'maxTerm',
    header: 'Max Term',
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

export default function LoanTypesPage() {
  const [loanTypes, setLoanTypes] = useState(initialLoanTypes);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formMaxAmount, setFormMaxAmount] = useState('');
  const [formInterestRate, setFormInterestRate] = useState('');
  const [formMaxTerm, setFormMaxTerm] = useState('');

  const handleAdd = () => {
    if (!formName || !formMaxAmount || !formInterestRate || !formMaxTerm) return;
    const newType: LoanType = {
      id: `lt-${Date.now()}`,
      name: formName,
      maxAmount: parseFloat(formMaxAmount),
      interestRate: parseFloat(formInterestRate),
      maxTerm: formMaxTerm,
      status: 'active',
    };
    setLoanTypes(prev => [...prev, newType]);
    setShowForm(false);
    setFormName('');
    setFormMaxAmount('');
    setFormInterestRate('');
    setFormMaxTerm('');
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
              Loan Types
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
            >
              Configure available loan types and their terms
            </p>
          </div>
          <Button
            className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
            style={{ fontSize: 'var(--text-sm)' }}
            onClick={() => setShowForm(true)}
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            Add Loan Type
          </Button>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SmartTable
            data={loanTypes as unknown as Record<string, unknown>[]}
            columns={columns}
            searchable
            searchPlaceholder="Search loan types..."
            emptyMessage="No loan types found"
          />
        </motion.div>

        {/* Add Loan Type Modal */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
                Add Loan Type
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="loan-name">Loan Type Name</Label>
                <Input
                  id="loan-name"
                  placeholder="e.g., Personal Loan"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-amount">Max Amount ($)</Label>
                  <Input
                    id="max-amount"
                    type="number"
                    placeholder="0.00"
                    value={formMaxAmount}
                    onChange={(e) => setFormMaxAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                  <Input
                    id="interest-rate"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={formInterestRate}
                    onChange={(e) => setFormInterestRate(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Max Term</Label>
                <Select value={formMaxTerm} onValueChange={setFormMaxTerm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select max term" />
                  </SelectTrigger>
                  <SelectContent>
                    {termOptions.map((term) => (
                      <SelectItem key={term} value={term}>{term}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button className="bg-module-erp hover:bg-module-erp/90 text-white" onClick={handleAdd}>
                Add Loan Type
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
