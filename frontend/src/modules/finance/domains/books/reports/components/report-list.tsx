// @ts-nocheck
'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable, getCoreRowModel, getSortedRowModel,
  getPaginationRowModel, getFilteredRowModel, flexRender,
  type ColumnDef, type SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, FileText, Download, CalendarClock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Report } from '../types';
import { getReportTypeLabel, getReportCategory } from '../utils';

interface ReportListProps {
  data: Report[];
  isLoading?: boolean;
  onRun?: (report: Report) => void;
  onSchedule?: (report: Report) => void;
  onDownload?: (report: Report) => void;
}

function SortIcon({ column }: { column: { getIsSorted: () => false | 'asc' | 'desc' } }) {
  const sorted = column.getIsSorted();
  if (sorted === 'asc') return <ChevronUp className="h-3.5 w-3.5 ml-1" />;
  if (sorted === 'desc') return <ChevronDown className="h-3.5 w-3.5 ml-1" />;
  return <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />;
}

export function ReportList({ data, isLoading, onRun, onSchedule, onDownload }: ReportListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<Report>[]>(() => [
    {
      id: 'name',
      header: 'Report',
      accessorFn: (row) => row.name,
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-foreground">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.description}</p>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ getValue }) => {
        const type = getValue() as string;
        const category = getReportCategory(type as Report['type']);
        return (
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-sm">{getReportTypeLabel(type as Report['type'])}</p>
              <p className="text-xs text-muted-foreground">{category}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'lastRunAt',
      header: 'Last Run',
      cell: ({ getValue }) => {
        const val = getValue() as string | undefined;
        if (!val) return <span className="text-muted-foreground text-sm">Never</span>;
        return <span className="text-sm">{new Date(val).toLocaleDateString()}</span>;
      },
    },
    {
      accessorKey: 'isScheduled',
      header: 'Scheduled',
      cell: ({ getValue }) => {
        const scheduled = getValue() as boolean;
        return scheduled
          ? <Badge variant="outline" className="text-xs font-medium bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800"><CalendarClock className="h-3 w-3 mr-1" />Yes</Badge>
          : <Badge variant="outline" className="text-xs bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-800/30 dark:text-gray-400 dark:border-gray-700">No</Badge>;
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
            <DropdownMenuItem onClick={e => { e.stopPropagation(); onRun?.(row.original); }}>Run Report</DropdownMenuItem>
            <DropdownMenuItem onClick={e => { e.stopPropagation(); onDownload?.(row.original); }}>
              <Download className="h-3.5 w-3.5 mr-2" />Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={e => { e.stopPropagation(); onSchedule?.(row.original); }}>
              <CalendarClock className="h-3.5 w-3.5 mr-2" />Schedule
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [onRun, onSchedule, onDownload]);

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
          <input type="text" value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} placeholder="Search reports..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm" />
        </div>
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
                      <TableRow key={row.id} className="border-b border-glass-border/50 transition-all duration-150 hover:bg-glass-hover">
                        {row.getVisibleCells().map(cell => (<TableCell key={cell.id} className="text-sm py-3.5">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>))}
                      </TableRow>
                    ))
                  : (<TableRow><TableCell colSpan={columns.length} className="h-48 text-center text-muted-foreground">No reports found</TableCell></TableRow>)}
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
