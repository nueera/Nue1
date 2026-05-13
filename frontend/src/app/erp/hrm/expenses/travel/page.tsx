'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus, Plane, MoreHorizontal, Eye, CheckCircle2, XCircle } from 'lucide-react';
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

interface TravelRequest {
  id: string;
  employeeName: string;
  destination: string;
  purpose: string;
  departureDate: string;
  returnDate: string;
  estimatedCost: number;
  status: string;
}

const initialRequests: TravelRequest[] = [
  { id: 'tr-1', employeeName: 'John Smith', destination: 'Chicago, IL', purpose: 'Client meeting', departureDate: '2025-03-15', returnDate: '2025-03-17', estimatedCost: 1200, status: 'pending' },
  { id: 'tr-2', employeeName: 'Sarah Wilson', destination: 'New York, NY', purpose: 'Annual conference', departureDate: '2025-03-20', returnDate: '2025-03-22', estimatedCost: 1800, status: 'approved' },
  { id: 'tr-3', employeeName: 'Mike Johnson', destination: 'San Francisco, CA', purpose: 'Office visit', departureDate: '2025-03-10', returnDate: '2025-03-12', estimatedCost: 950, status: 'approved' },
  { id: 'tr-4', employeeName: 'Emily Davis', destination: 'London, UK', purpose: 'Training program', departureDate: '2025-04-01', returnDate: '2025-04-05', estimatedCost: 3500, status: 'pending' },
  { id: 'tr-5', employeeName: 'Alex Brown', destination: 'Austin, TX', purpose: 'Team offsite', departureDate: '2025-02-20', returnDate: '2025-02-22', estimatedCost: 800, status: 'completed' },
  { id: 'tr-6', employeeName: 'Lisa Chen', destination: 'Seattle, WA', purpose: 'Product launch', departureDate: '2025-03-25', returnDate: '2025-03-26', estimatedCost: 650, status: 'rejected' },
];

const statusBadgeClass: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  approved: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
  completed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
};

const purposeOptions = ['Client meeting', 'Conference', 'Training program', 'Office visit', 'Team offsite', 'Product launch', 'Other'];

const columns: ColumnDef<TravelRequest>[] = [
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
    accessorKey: 'destination',
    header: 'Destination',
    cell: ({ getValue }) => (
      <span style={{ fontSize: 'var(--text-sm)' }}>{getValue() as string}</span>
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
    accessorKey: 'departureDate',
    header: 'Departure',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  },
  {
    accessorKey: 'returnDate',
    header: 'Return',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  },
  {
    accessorKey: 'estimatedCost',
    header: 'Est. Cost',
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        ${(getValue() as number).toLocaleString()}
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

export default function TravelRequestsPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [showForm, setShowForm] = useState(false);
  const [formDestination, setFormDestination] = useState('');
  const [formPurpose, setFormPurpose] = useState('');
  const [formDeparture, setFormDeparture] = useState('');
  const [formReturn, setFormReturn] = useState('');
  const [formCost, setFormCost] = useState('');

  const handleSubmit = () => {
    if (!formDestination || !formPurpose || !formDeparture || !formReturn) return;
    const newRequest: TravelRequest = {
      id: `tr-${Date.now()}`,
      employeeName: 'Current User',
      destination: formDestination,
      purpose: formPurpose,
      departureDate: formDeparture,
      returnDate: formReturn,
      estimatedCost: parseFloat(formCost) || 0,
      status: 'pending',
    };
    setRequests(prev => [newRequest, ...prev]);
    setShowForm(false);
    setFormDestination('');
    setFormPurpose('');
    setFormDeparture('');
    setFormReturn('');
    setFormCost('');
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
              Travel Requests
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
            >
              Submit and manage business travel requests
            </p>
          </div>
          <Button
            className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
            style={{ fontSize: 'var(--text-sm)' }}
            onClick={() => setShowForm(true)}
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            New Request
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
            { label: 'Pending', count: requests.filter(r => r.status === 'pending').length, color: 'text-amber-500' },
            { label: 'Approved', count: requests.filter(r => r.status === 'approved').length, color: 'text-green-500' },
            { label: 'Completed', count: requests.filter(r => r.status === 'completed').length, color: 'text-blue-500' },
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
            searchPlaceholder="Search travel requests..."
            emptyMessage="No travel requests found"
          />
        </motion.div>

        {/* New Travel Request Modal */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
                New Travel Request
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="e.g., New York, NY"
                  value={formDestination}
                  onChange={(e) => setFormDestination(e.target.value)}
                />
              </div>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departure">Departure</Label>
                  <Input
                    id="departure"
                    type="date"
                    value={formDeparture}
                    onChange={(e) => setFormDeparture(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="return">Return</Label>
                  <Input
                    id="return"
                    type="date"
                    value={formReturn}
                    onChange={(e) => setFormReturn(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="est-cost">Estimated Cost ($)</Label>
                <Input
                  id="est-cost"
                  type="number"
                  placeholder="0.00"
                  value={formCost}
                  onChange={(e) => setFormCost(e.target.value)}
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
