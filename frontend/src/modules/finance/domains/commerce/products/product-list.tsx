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
import type { Money } from '../../../types/finance-common';
import type { CommerceProduct } from './types';

interface ProductListProps {
  data: CommerceProduct[];
  isLoading?: boolean;
  onRowClick?: (item: CommerceProduct) => void;
  onEdit?: (item: CommerceProduct) => void;
  onDelete?: (item: CommerceProduct) => void;
  onCreateNew?: () => void;
}

function SortIcon({ column }: { column: { getIsSorted: () => false | 'asc' | 'desc' } }) {
  const sorted = column.getIsSorted();
  if (sorted === 'asc') return <ChevronUp className="h-3.5 w-3.5 ml-1" />;
  if (sorted === 'desc') return <ChevronDown className="h-3.5 w-3.5 ml-1" />;
  return <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />;
}

export function ProductList({ data, isLoading, onRowClick, onEdit, onDelete, onCreateNew }: ProductListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<CommerceProduct>[]>(() => [
    { accessorKey: 'name', header: 'Product' },
    { accessorKey: 'slug', header: 'Slug' },
    {
      accessorKey: 'price', header: 'Price',
      cell: ({ getValue }) => { const m = getValue() as Money; return `${m.currency} ${m.amount.toLocaleString()}`; },
    },
    { accessorKey: 'stock', header: 'Stock' },
    { accessorKey: 'visibility', header: 'Visibility', cell: ({ getValue }) => <Badge variant={getValue() === 'visible' ? 'default' : 'secondary'}>{getValue() as string}</Badge> },
    { accessorKey: 'category', header: 'Category' },
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
          <input type="text" value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} placeholder="Search products..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm" />
        </div>
        {onCreateNew && <Button onClick={onCreateNew}><Plus className="h-4 w-4 mr-1" />New Product</Button>}
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
                <TableRow><TableCell colSpan={columns.length} className="h-48 text-center text-muted-foreground">No products found</TableCell></TableRow>
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
