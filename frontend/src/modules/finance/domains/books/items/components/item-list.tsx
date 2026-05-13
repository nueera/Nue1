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
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoneyDisplay } from '../../../components/shared';
import type { Item } from '../types';
import { ITEM_TYPES, ITEM_STATUSES } from '../constants';
import { getItemTypeLabel, getItemStatusColor } from '../utils';

interface ItemListProps {
  data: Item[];
  isLoading?: boolean;
  onRowClick?: (item: Item) => void;
  onEdit?: (item: Item) => void;
  onDelete?: (item: Item) => void;
  onCreateNew?: () => void;
}

function SortIcon({ column }: { column: { getIsSorted: () => false | 'asc' | 'desc' } }) {
  const sorted = column.getIsSorted();
  if (sorted === 'asc') return <ChevronUp className="h-3.5 w-3.5 ml-1" />;
  if (sorted === 'desc') return <ChevronDown className="h-3.5 w-3.5 ml-1" />;
  return <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />;
}

export function ItemList({ data, isLoading, onRowClick, onEdit, onDelete, onCreateNew }: ItemListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<Item>[]>(() => [
    {
      id: 'name', header: 'Item', accessorFn: (row) => row.name,
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-foreground">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.sku}</p>
        </div>
      ),
    },
    {
      accessorKey: 'type', header: 'Type',
      cell: ({ getValue }) => <span className="text-sm">{getItemTypeLabel(getValue() as Item['type'])}</span>,
    },
    { accessorKey: 'category', header: 'Category' },
    {
      accessorKey: 'rate', header: 'Rate',
      cell: ({ row }) => <MoneyDisplay amount={row.original.rate.amount} currency={row.original.rate.currency} size="sm" />,
    },
    {
      accessorKey: 'stockOnHand', header: 'Stock',
      cell: ({ getValue, row }) => row.original.trackInventory
        ? <span className={cn('text-sm', (getValue() as number) <= row.original.reorderPoint && 'text-amber-600')}>{getValue() as number}</span>
        : <span className="text-xs text-muted-foreground">—</span>,
    },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue() as Item['status'];
        const info = ITEM_STATUSES.find(s => s.value === status);
        return <Badge variant="outline" className={cn('text-xs font-medium', getItemStatusColor(status))}>{info?.label ?? status}</Badge>;
      },
    },
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
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-glass-border bg-glass-bg flex-1 max-w-md">
          <input type="text" value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} placeholder="Search items..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm" />
        </div>
        {onCreateNew && <Button onClick={onCreateNew} className="bg-emerald-600 hover:bg-emerald-700"><Plus className="h-4 w-4 mr-1" />New Item</Button>}
      </div>
      <div className="glass-surface border border-glass-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(hg => (
                <TableRow key={hg.id} className="border-b border-glass-border hover:bg-transparent">
                  {hg.headers.map(header => (
                    <TableHead key={header.id} className={cn('text-xs uppercase tracking-widest text-muted-foreground/70 font-medium h-10', header.column.getCanSort() && 'cursor-pointer hover:text-foreground transition-colors')} onClick={header.column.getToggleSortingHandler()} style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}>
                      <div className="flex items-center">{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}{header.column.getCanSort() && <SortIcon column={header.column} />}</div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-b border-glass-border/50">{columns.map((_, j) => <TableCell key={j} className="py-3.5"><Skeleton className="h-3.5 w-full max-w-[120px] rounded-lg" /></TableCell>)}</TableRow>
              )) : table.getRowModel().rows?.length ? table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className={cn('border-b border-glass-border/50 transition-all duration-150 hover:bg-glass-hover', onRowClick && 'cursor-pointer')} onClick={() => onRowClick?.(row.original)}>
                  {row.getVisibleCells().map(cell => <TableCell key={cell.id} className="text-sm py-3.5">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}
                </TableRow>
              )) : (
                <TableRow><TableCell colSpan={columns.length} className="h-48 text-center text-muted-foreground">No items found</TableCell></TableRow>
              )}
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
