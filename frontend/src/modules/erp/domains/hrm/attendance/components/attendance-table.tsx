'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusBadge } from '../../../../shared/components/status-badge';
import type { AttendanceRecord } from '../types';
import { calcWorkHours, fmtDuration } from '../attendance.utils';

interface AttendanceTableProps {
  data: AttendanceRecord[];
  isLoading?: boolean;
  onRowClick?: (record: AttendanceRecord) => void;
}

function SortIcon({ column }: { column: { getIsSorted: () => false | 'asc' | 'desc' } }) {
  const sorted = column.getIsSorted();
  if (sorted === 'asc') return <ChevronUp className="h-3.5 w-3.5 ml-1" />;
  if (sorted === 'desc') return <ChevronDown className="h-3.5 w-3.5 ml-1" />;
  return <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />;
}

export function AttendanceTable({ data, isLoading, onRowClick }: AttendanceTableProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'date', desc: true }]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<AttendanceRecord>[]>(
    () => [
      {
        accessorKey: 'employeeName',
        header: 'Employee',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-module-erp/15 text-module-erp text-xs font-semibold shrink-0">
              {row.original.employeeName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <span className="font-medium text-foreground">{row.original.employeeName}</span>
          </div>
        ),
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ getValue }) => (
          <span className="text-muted-foreground">
            {new Date(getValue() as string).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        ),
      },
      {
        accessorKey: 'checkIn',
        header: 'Check In',
        cell: ({ getValue }) => (
          <span className="font-mono text-sm">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'checkOut',
        header: 'Check Out',
        cell: ({ getValue }) => (
          <span className="font-mono text-sm">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
      },
      {
        id: 'workHours',
        header: 'Work Hours',
        accessorFn: (row) => calcWorkHours(row.checkIn, row.checkOut),
        cell: ({ row }) => {
          const hours = calcWorkHours(row.original.checkIn, row.original.checkOut);
          return (
            <span className={cn('font-mono text-sm', hours < 8 ? 'text-amber-500' : 'text-foreground')}>
              {fmtDuration(hours)}
            </span>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
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

  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search attendance..."
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b border-white/10 hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'text-xs uppercase tracking-widest text-muted-foreground/70 font-medium h-10',
                        header.column.getCanSort() && 'cursor-pointer hover:text-foreground transition-colors',
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                    >
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
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-b border-white/5">
                    {columns.map((_, j) => (
                      <TableCell key={j} className="py-3.5">
                        <Skeleton className="h-3.5 w-full max-w-[100px] rounded-lg" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={cn(
                      'border-b border-white/5 transition-all duration-150',
                      'hover:bg-white/10',
                      onRowClick && 'cursor-pointer',
                    )}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-sm py-3.5">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-48 text-center text-muted-foreground">
                    No attendance records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && pageCount > 0 && (
        <div className="border border-white/10 bg-white/5 backdrop-blur-md rounded-lg px-3 py-2.5 flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Page {pageIndex + 1} of {pageCount}
          </p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
