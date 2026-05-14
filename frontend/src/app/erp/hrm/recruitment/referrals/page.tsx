'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus, Target, MoreHorizontal, Eye } from 'lucide-react';
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

interface EmployeeReferral {
  id: string;
  candidateName: string;
  referredBy: string;
  jobOpening: string;
  status: string;
  referralDate: string;
  notes: string;
}

const initialReferrals: EmployeeReferral[] = [
  { id: 'ref-1', candidateName: 'David Park', referredBy: 'John Smith', jobOpening: 'Senior Frontend Developer', status: 'screening', referralDate: '2025-03-01', notes: 'Strong React experience' },
  { id: 'ref-2', candidateName: 'Maria Garcia', referredBy: 'Sarah Wilson', jobOpening: 'Product Designer', status: 'interviewed', referralDate: '2025-02-25', notes: 'Great portfolio' },
  { id: 'ref-3', candidateName: 'James Lee', referredBy: 'Mike Johnson', jobOpening: 'DevOps Engineer', status: 'hired', referralDate: '2025-02-15', notes: 'AWS certified' },
  { id: 'ref-4', candidateName: 'Sophie Martin', referredBy: 'Emily Davis', jobOpening: 'Marketing Manager', status: 'rejected', referralDate: '2025-02-20', notes: 'Not enough experience' },
  { id: 'ref-5', candidateName: 'Chris Taylor', referredBy: 'Alex Brown', jobOpening: 'Data Analyst', status: 'screening', referralDate: '2025-03-02', notes: 'Python expert' },
];

const statusBadgeClass: Record<string, string> = {
  screening: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  interviewed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
  hired: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
};

const jobOptions = ['Senior Frontend Developer', 'Product Designer', 'Marketing Manager', 'DevOps Engineer', 'Data Analyst'];

const columns: ColumnDef<EmployeeReferral>[] = [
  {
    accessorKey: 'candidateName',
    header: 'Candidate',
    cell: ({ getValue }) => (
      <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'referredBy',
    header: 'Referred By',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'jobOpening',
    header: 'Job Opening',
    cell: ({ getValue }) => (
      <Badge variant="outline" className="text-module-erp" style={{ fontSize: 'var(--text-xs)' }}>
        {getValue() as string}
      </Badge>
    ),
  },
  {
    accessorKey: 'referralDate',
    header: 'Date',
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
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground truncate max-w-[200px] block" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
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
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState(initialReferrals);
  const [showForm, setShowForm] = useState(false);
  const [formCandidateName, setFormCandidateName] = useState('');
  const [formJobOpening, setFormJobOpening] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const handleSubmit = () => {
    if (!formCandidateName || !formJobOpening) return;
    const newReferral: EmployeeReferral = {
      id: `ref-${Date.now()}`,
      candidateName: formCandidateName,
      referredBy: 'Current User',
      jobOpening: formJobOpening,
      status: 'screening',
      referralDate: new Date().toISOString().split('T')[0],
      notes: formNotes,
    };
    setReferrals(prev => [newReferral, ...prev]);
    setShowForm(false);
    setFormCandidateName('');
    setFormJobOpening('');
    setFormNotes('');
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
              Employee Referrals
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
            >
              Refer talented candidates for open positions
            </p>
          </div>
          <Button
            className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
            style={{ fontSize: 'var(--text-sm)' }}
            onClick={() => setShowForm(true)}
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            Refer Someone
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
            { label: 'Screening', count: referrals.filter(r => r.status === 'screening').length, color: 'text-amber-500' },
            { label: 'Interviewed', count: referrals.filter(r => r.status === 'interviewed').length, color: 'text-blue-500' },
            { label: 'Hired', count: referrals.filter(r => r.status === 'hired').length, color: 'text-green-500' },
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
            data={referrals}
            columns={columns}
            searchable
            searchPlaceholder="Search referrals..."
            emptyMessage="No referrals found"
          />
        </motion.div>

        {/* Refer Someone Modal */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
                Refer a Candidate
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="candidate-name">Candidate Name</Label>
                <Input
                  id="candidate-name"
                  placeholder="Enter candidate name"
                  value={formCandidateName}
                  onChange={(e) => setFormCandidateName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Job Opening</Label>
                <Select value={formJobOpening} onValueChange={setFormJobOpening}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job opening" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobOptions.map((job) => (
                      <SelectItem key={job} value={job}>{job}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="referral-notes">Notes</Label>
                <Input
                  id="referral-notes"
                  placeholder="Why are you referring this person?"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button className="bg-module-erp hover:bg-module-erp/90 text-white" onClick={handleSubmit}>
                Submit Referral
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
