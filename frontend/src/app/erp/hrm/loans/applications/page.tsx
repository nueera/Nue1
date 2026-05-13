'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus, Landmark, MoreHorizontal, Eye, CheckCircle2, XCircle } from 'lucide-react';
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

interface LoanApplication {
  id: string;
  employeeName: string;
  loanType: string;
  amount: number;
  term: string;
  status: string;
  applicationDate: string;
  remainingAmount: number;
  purpose: string;
}

const initialApplications: LoanApplication[] = [
  { id: 'la-1', employeeName: 'John Smith', loanType: 'Personal Loan', amount: 5000, term: '12 months', status: 'active', applicationDate: '2025-02-01', remainingAmount: 4166, purpose: 'Home renovation' },
  { id: 'la-2', employeeName: 'Sarah Wilson', loanType: 'Emergency Loan', amount: 2000, term: '6 months', status: 'pending', applicationDate: '2025-03-01', remainingAmount: 2000, purpose: 'Medical emergency' },
  { id: 'la-3', employeeName: 'Mike Johnson', loanType: 'Education Loan', amount: 10000, term: '24 months', status: 'approved', applicationDate: '2025-02-15', remainingAmount: 10000, purpose: 'MBA program' },
  { id: 'la-4', employeeName: 'Emily Davis', loanType: 'Personal Loan', amount: 3000, term: '12 months', status: 'repaid', applicationDate: '2024-03-01', remainingAmount: 0, purpose: 'Car repair' },
  { id: 'la-5', employeeName: 'Alex Brown', loanType: 'Emergency Loan', amount: 1500, term: '3 months', status: 'rejected', applicationDate: '2025-02-20', remainingAmount: 0, purpose: 'Non-eligible' },
  { id: 'la-6', employeeName: 'Lisa Chen', loanType: 'Vehicle Loan', amount: 15000, term: '36 months', status: 'active', applicationDate: '2025-01-15', remainingAmount: 14583, purpose: 'New car purchase' },
];

const statusBadgeClass: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  approved: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  active: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
  repaid: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/15',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
};

const loanTypeOptions = ['Personal Loan', 'Emergency Loan', 'Education Loan', 'Vehicle Loan'];
const termOptions = ['3 months', '6 months', '12 months', '24 months', '36 months'];

const columns: ColumnDef<LoanApplication>[] = [
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
    accessorKey: 'loanType',
    header: 'Loan Type',
    cell: ({ getValue }) => (
      <Badge variant="outline" className="text-module-erp" style={{ fontSize: 'var(--text-xs)' }}>
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
    accessorKey: 'term',
    header: 'Term',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'purpose',
    header: 'Purpose',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground truncate max-w-[150px] block" style={{ fontSize: 'var(--text-sm)' }}>
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

export default function LoanApplicationsPage() {
  const [applications, setApplications] = useState(initialApplications);
  const [showForm, setShowForm] = useState(false);
  const [formLoanType, setFormLoanType] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formTerm, setFormTerm] = useState('');
  const [formPurpose, setFormPurpose] = useState('');

  const handleSubmit = () => {
    if (!formLoanType || !formAmount || !formTerm) return;
    const newApp: LoanApplication = {
      id: `la-${Date.now()}`,
      employeeName: 'Current User',
      loanType: formLoanType,
      amount: parseFloat(formAmount),
      term: formTerm,
      status: 'pending',
      applicationDate: new Date().toISOString().split('T')[0],
      remainingAmount: parseFloat(formAmount),
      purpose: formPurpose,
    };
    setApplications(prev => [newApp, ...prev]);
    setShowForm(false);
    setFormLoanType('');
    setFormAmount('');
    setFormTerm('');
    setFormPurpose('');
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
              Loan Applications
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
            >
              Apply for and manage employee loans
            </p>
          </div>
          <Button
            className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
            style={{ fontSize: 'var(--text-sm)' }}
            onClick={() => setShowForm(true)}
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            Apply for Loan
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
            { label: 'Pending', count: applications.filter(a => a.status === 'pending').length, color: 'text-amber-500' },
            { label: 'Active', count: applications.filter(a => a.status === 'active').length, color: 'text-blue-500' },
            { label: 'Repaid', count: applications.filter(a => a.status === 'repaid').length, color: 'text-green-500' },
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
            data={applications as unknown as Record<string, unknown>[]}
            columns={columns}
            searchable
            searchPlaceholder="Search loan applications..."
            emptyMessage="No loan applications found"
          />
        </motion.div>

        {/* Apply for Loan Modal */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
                Apply for Loan
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Loan Type</Label>
                <Select value={formLoanType} onValueChange={setFormLoanType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    {loanTypeOptions.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="loan-amount">Amount ($)</Label>
                <Input
                  id="loan-amount"
                  type="number"
                  placeholder="0.00"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Repayment Term</Label>
                <Select value={formTerm} onValueChange={setFormTerm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    {termOptions.map((term) => (
                      <SelectItem key={term} value={term}>{term}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="loan-purpose">Purpose</Label>
                <Input
                  id="loan-purpose"
                  placeholder="Enter loan purpose"
                  value={formPurpose}
                  onChange={(e) => setFormPurpose(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button className="bg-module-erp hover:bg-module-erp/90 text-white" onClick={handleSubmit}>
                Submit Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
