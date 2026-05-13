'use client';

import { useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import SmartTable from '../../../../shared/components/smart-table/smart-table';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { LeaveRequest, LeaveStatus } from '../types';

interface LeaveTableProps {
  data: LeaveRequest[];
  isLoading?: boolean;
  onRowClick?: (row: LeaveRequest) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onCancel?: (id: string) => void;
}

const LEAVE_TYPE_LABELS: Record<string, string> = {
  annual: 'Annual',
  sick: 'Sick',
  personal: 'Personal',
  maternity: 'Maternity',
  paternity: 'Paternity',
  unpaid: 'Unpaid',
};

export function LeaveTable({ data, isLoading, onRowClick, onApprove, onReject, onCancel }: LeaveTableProps) {
  const columns: ColumnDef<LeaveRequest>[] = [
    {
      accessorKey: 'employeeName',
      header: 'Employee',
      cell: ({ row }) => (
        <span className="font-medium text-foreground">{row.original.employeeName}</span>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <span className="capitalize text-foreground/80">
          {LEAVE_TYPE_LABELS[row.original.type] || row.original.type}
        </span>
      ),
    },
    {
      accessorKey: 'startDate',
      header: 'Duration',
      cell: ({ row }) => (
        <span className="text-foreground/80">
          {new Date(row.original.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
          {' - '}
          {new Date(row.original.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      ),
    },
    {
      accessorKey: 'days',
      header: 'Days',
      cell: ({ row }) => (
        <span className="font-medium text-module-erp">{row.original.days}</span>
      ),
      size: 60,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
      size: 120,
    },
    {
      id: 'actions',
      header: '',
      size: 50,
      cell: ({ row }) => {
        const status = row.original.status as LeaveStatus;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 press-scale" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="h-4 w-4" strokeWidth={1.8} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/10 backdrop-blur-xl border border-white/10">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onRowClick?.(row.original); }}>
                <Eye className="h-3.5 w-3.5 mr-2" strokeWidth={1.8} /> View
              </DropdownMenuItem>
              {status === 'pending' && onApprove && (
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onApprove(row.original.id); }}>
                  <Pencil className="h-3.5 w-3.5 mr-2" strokeWidth={1.8} /> Approve
                </DropdownMenuItem>
              )}
              {status === 'pending' && onReject && (
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onReject(row.original.id); }} className="text-red-500">
                  <Trash2 className="h-3.5 w-3.5 mr-2" strokeWidth={1.8} /> Reject
                </DropdownMenuItem>
              )}
              {(status === 'pending' || status === 'approved') && onCancel && (
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onCancel(row.original.id); }} className="text-orange-500">
                  <Trash2 className="h-3.5 w-3.5 mr-2" strokeWidth={1.8} /> Cancel
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
      <SmartTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        onRowClick={onRowClick}
        searchPlaceholder="Search leave requests..."
        emptyMessage="No leave requests found"
        emptyDescription="Apply for leave to get started"
      />
    </div>
  );
}
