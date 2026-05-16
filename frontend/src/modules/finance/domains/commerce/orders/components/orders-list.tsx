'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable, getCoreRowModel, getSortedRowModel,
  getPaginationRowModel, getFilteredRowModel, flexRender,
  type ColumnDef, type SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PAYMENT_STATUS_CONFIG, ORDER_STATUS_CONFIG } from '../../../../constants/finance-common';
import type { Money, PaymentStatus, OrderStatus } from '../../../../types/finance-common';
import type { Order } from '../types';
import type { CommerceOrder } from '../types';

interface OrdersListProps {
  data: Order[];
  isLoading?: boolean;
  onRowClick?: (item: Order) => void;
  onEdit?: (item: Order) => void;
  onDelete?: (item: Order) => void;
  onCreateNew?: () => void;
}

function SortIcon({ column }: { column: { getIsSorted: () => false | 'asc' | 'desc' } }) {
  const sorted = column.getIsSorted();
  if (sorted === 'asc') return <ChevronUp className="h-3.5 w-3.5 ml-1" />;
  if (sorted === 'desc') return <ChevronDown className="h-3.5 w-3.5 ml-1" />;
  return <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />;
}

export function OrdersList({ data, isLoading, onRowClick, onEdit, onDelete, onCreateNew }: OrdersListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<Order>[]>(() => [

    { accessorKey: 'orderNumber', header: 'Order #' },
    { accessorKey: 'customerName', header: 'Customer' },
    {
      accessorKey: 'total', header: 'Total',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return `${m.currency} ${m.amount.toLocaleString()}`;
      },
    },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as OrderStatus;
        const c = ORDER_STATUS_CONFIG[s];
        return <Badge variant={s === 'delivered' ? 'default' : s === 'cancelled' ? 'destructive' : 'secondary'}>{c?.label ?? s}</Badge>;
      },
    },
    {
      accessorKey: 'paymentStatus', header: 'Payment',
      cell: ({ getValue }) => {
        const s = getValue() as PaymentStatus;
        const c = PAYMENT_STATUS_CONFIG[s];
        return <Badge variant={s === 'completed' ? 'default' : 'secondary'}>{c?.label ?? s}</Badge>;
      },
    },
    { accessorKey: 'createdAt', header: 'Date' },
    {
      id: 'actions', header: '', size: 48, enableSorting: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => e.stopPropagation()}><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={e => { e.stopPropagation(); onEdit?.(row.original); }}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={e => { e.stopPropagation(); onDelete?.(row.original); }} className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [onEdit, onDelete]);

  const table = useReactTable({
    data, columns, state: { sorting, globalFilter }, onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter, getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(), initialState: { pagination: { pageSize: 10 } },
    getRowId: (row) => row.id,
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card flex-1 max-w-md">
          <input type="text" value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} placeholder="Search orders..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm" />
        </div>
        {onCreateNew && (
          <Button onClick={onCreateNew}><Plus className="h-4 w-4 mr-1" />New Order</Button>
        )}
      </div>
      <div className="rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(hg => (
                <TableRow key={hg.id} className="border-b hover:bg-transparent">
                  {hg.headers.map(header => (
                    <TableHead key={header.id} className={cn('text-xs uppercase tracking-wider text-muted-foreground font-medium h-10', header.column.getCanSort() && 'cursor-pointer hover:text-foreground transition-colors')} onClick={header.column.getToggleSortingHandler()} style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}>
                      <div className="flex items-center">{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}{header.column.getCanSort() && <SortIcon column={header.column} />}</div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-b">{columns.map((_, j) => <TableCell key={j} className="py-3.5"><Skeleton className="h-3.5 w-full max-w-[120px] rounded" /></TableCell>)}</TableRow>
              )) : table.getRowModel().rows?.length ? table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className={cn('border-b transition-colors hover:bg-muted/50', onRowClick && 'cursor-pointer')} onClick={() => onRowClick?.(row.original)}>
                  {row.getVisibleCells().map(cell => <TableCell key={cell.id} className="text-sm py-3.5">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}
                </TableRow>
              )) : (
                <TableRow><TableCell colSpan={columns.length} className="h-48 text-center text-muted-foreground">No orders found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {!isLoading && table.getPageCount() > 0 && (
        <div className="border rounded-lg px-3 py-2.5 flex items-center justify-between gap-4">
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
