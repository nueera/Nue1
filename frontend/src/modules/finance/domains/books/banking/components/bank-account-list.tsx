'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable, getCoreRowModel, getSortedRowModel,
  getPaginationRowModel, getFilteredRowModel, flexRender,
  type ColumnDef, type SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Plus, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoneyDisplay } from '../../../components/shared';
import type { BankAccount } from '../types';
import { BANK_ACCOUNT_TYPES } from '../constants';
import { getBankAccountStatusColor } from '../utils';

interface BankAccountListProps {
  data: BankAccount[];
  isLoading?: boolean;
  onRowClick?: (account: BankAccount) => void;
  onEdit?: (account: BankAccount) => void;
  onDelete?: (account: BankAccount) => void;
  onSync?: (account: BankAccount) => void;
  onCreateNew?: () => void;
}

function SortIcon({ column }: { column: { getIsSorted: () => false | 'asc' | 'desc' } }) {
  const sorted = column.getIsSorted();
  if (sorted === 'asc') return <ChevronUp className="h-3.5 w-3.5 ml-1" />;
  if (sorted === 'desc') return <ChevronDown className="h-3.5 w-3.5 ml-1" />;
  return <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />;
}

export function BankAccountList({ data, isLoading, onRowClick, onEdit, onDelete, onSync, onCreateNew }: BankAccountListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<BankAccount>[]>(() => [
    {
      id: 'name',
      header: 'Account',
      accessorFn: (row) => row.name,
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-foreground">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.bankName}</p>
        </div>
      ),
    },
    { accessorKey: 'accountNumber', header: 'Account #' },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ getValue }) => {
        const type = getValue() as string;
        const info = BANK_ACCOUNT_TYPES.find(t => t.value === type);
        return <span className="text-sm text-muted-foreground">{info?.label ?? type}</span>;
      },
    },
    {
      accessorKey: 'balance',
      header: 'Balance',
      cell: ({ row }) => (
        <MoneyDisplay
          amount={row.original.balance.amount}
          currency={row.original.balance.currency}
          size="sm"
          colorize={row.original.balance.amount < 0 ? 'negative' : 'positive'}
        />
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue() as BankAccount['status'];
        const label = status.charAt(0).toUpperCase() + status.slice(1);
        return <Badge variant="outline" className={cn('text-xs font-medium', getBankAccountStatusColor(status))}>{label}</Badge>;
      },
    },
    {
      id: 'actions',
      header: '',
      size: 48,
      enableSorting: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => e.stopPropagation()}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={e => { e.stopPropagation(); onSync?.(row.original); }}>
              <RefreshCw className="h-3.5 w-3.5 mr-2" />Sync
            </DropdownMenuItem>
            <DropdownMenuItem onClick={e => { e.stopPropagation(); onEdit?.(row.original); }}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={e => { e.stopPropagation(); onDelete?.(row.original); }} className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [onEdit, onDelete, onSync]);

  const table = useReactTable({
    data, columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 10 } },
    getRowId: (row) => row.id,
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-glass-border bg-glass-bg flex-1 max-w-md">
          <input type="text" value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} placeholder="Search bank accounts..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm" />
        </div>
        {onCreateNew && (
          <Button onClick={onCreateNew} className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-1" />New Account
          </Button>
        )}
      </div>
      <div className="glass-surface border border-glass-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(hg => (
                <TableRow key={hg.id} className="border-b border-glass-border hover:bg-transparent">
                  {hg.headers.map(header => (
                    <TableHead key={header.id} className={cn('text-xs uppercase tracking-widest text-muted-foreground/70 font-medium h-10', header.column.getCanSort() && 'cursor-pointer hover:text-foreground transition-colors')} onClick={header.column.getToggleSortingHandler()} style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}>
                      <div className="flex items-center">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && <SortIcon column={header.column} />}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="border-b border-glass-border/50">
                      {columns.map((_, j) => (<TableCell key={j} className="py-3.5"><Skeleton className="h-3.5 w-full max-w-[120px] rounded-lg" /></TableCell>))}
                    </TableRow>
                  ))
                : table.getRowModel().rows?.length
                  ? table.getRowModel().rows.map(row => (
                      <TableRow key={row.id} className={cn('border-b border-glass-border/50 transition-all duration-150 hover:bg-glass-hover', onRowClick && 'cursor-pointer')} onClick={() => onRowClick?.(row.original)}>
                        {row.getVisibleCells().map(cell => (<TableCell key={cell.id} className="text-sm py-3.5">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>))}
                      </TableRow>
                    ))
                  : (<TableRow><TableCell colSpan={columns.length} className="h-48 text-center text-muted-foreground">No bank accounts found</TableCell></TableRow>)}
            </TableBody>
          </Table>
        </div>
      </div>
      {!isLoading && table.getPageCount() > 0 && (
        <div className="border border-glass-border glass-surface rounded-lg px-3 py-2.5 flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
}
