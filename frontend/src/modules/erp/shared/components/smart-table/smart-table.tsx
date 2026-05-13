'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Search, FileX } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';

interface SmartTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  emptyDescription?: string;
  selectable?: boolean;
  onSelectionChange?: (selected: T[]) => void;
}

function SortIcon({ column }: { column: { getIsSorted: () => false | 'asc' | 'desc' } }) {
  const sorted = column.getIsSorted();
  if (sorted === 'asc') return <ChevronUp className="h-3.5 w-3.5 ml-1 sort-arrow sort-arrow-asc" />;
  if (sorted === 'desc') return <ChevronDown className="h-3.5 w-3.5 ml-1 sort-arrow sort-arrow-desc" />;
  return <ArrowUpDown className="h-3 w-3 ml-1 opacity-30 sort-arrow" />;
}

export default function SmartTable<T extends object>({
  data,
  columns,
  searchable = true,
  searchPlaceholder = 'Search...',
  pageSize: initialPageSize = 10,
  onRowClick,
  isLoading = false,
  emptyMessage = 'No data found',
  emptyDescription = 'Try adjusting your search or filters',
  selectable = false,
  onSelectionChange,
}: SmartTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [currentPageSize, setCurrentPageSize] = useState(initialPageSize);
  const [clickedRowId, setClickedRowId] = useState<string | null>(null);

  const allColumns = useMemo(() => {
    const cols: ColumnDef<T>[] = [];

    if (selectable) {
      cols.unshift({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
            }}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            onClick={(e) => e.stopPropagation()}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      });
    }

    cols.push(...columns);
    return cols;
  }, [columns, selectable]);

  const table = useReactTable({
    data,
    columns: allColumns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
      setRowSelection(newSelection);

      if (onSelectionChange) {
        const selectedRows = table
          .getFilteredRowModel()
          .rows.filter((row) => newSelection[row.id])
          .map((row) => row.original);
        onSelectionChange(selectedRows);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageSize: currentPageSize },
    },
    enableRowSelection: selectable,
    getRowId: (row, index) => (row as Record<string, unknown>).id as string ?? String(index),
  });

  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;

  const skeletonRows = useMemo(() => Array.from({ length: 5 }, (_, i) => i), []);

  const handleRowClick = useCallback((row: { id: string; original: T }) => {
    if (!onRowClick) return;
    // Instant visual acknowledgment
    setClickedRowId(row.id);
    // Brief flash then navigate
    setTimeout(() => {
      setClickedRowId(null);
      onRowClick(row.original);
    }, 80);
  }, [onRowClick]);

  return (
    <div className="space-y-3">
      {/* Search bar */}
      {searchable && (
        <div className="search-glow flex items-center gap-2 px-3 py-2 rounded-lg border border-glass-border bg-glass-bg transition-all duration-[var(--motion-fast)]">
          <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" strokeWidth={1.8} />
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none"
            style={{
              fontSize: 'var(--text-sm)',
              letterSpacing: 'var(--tracking-normal)',
            }}
          />
        </div>
      )}

      {/* Table */}
      <div className="glass-surface rounded-xl overflow-hidden">
        <div className="overflow-x-auto smooth-scroll erp-table-container">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-glass-border hover:bg-transparent select-none smart-table-header"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'text-xs uppercase tracking-widest text-muted-foreground/70 font-medium h-10',
                        header.column.getCanSort() && 'cursor-pointer select-none hover:text-foreground transition-colors duration-[var(--motion-fast)]',
                        header.id === 'select' && 'w-10'
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        fontSize: 'var(--text-xs)',
                        letterSpacing: 'var(--tracking-wide)',
                        width: header.getSize() !== 150 ? header.getSize() : undefined,
                      }}
                    >
                      <div className="flex items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && <SortIcon column={header.column} />}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                skeletonRows.map((i) => (
                  <TableRow key={i} className="border-b border-glass-border/30">
                    {allColumns.map((col, j) => (
                      <TableCell key={j} className="py-3.5">
                        <Skeleton className="h-3.5 w-full max-w-[120px] rounded-lg animate-pulse" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, rowIndex) => {
                  const isClicked = clickedRowId === row.id;
                  const isSelected = row.getIsSelected();

                  return (
                    <TableRow
                      key={row.id}
                      data-state={isSelected && 'selected'}
                      className={cn(
                        'border-b border-glass-border/20 transition-all duration-[60ms]',
                        // Selected row gets persistent highlight
                        isSelected && 'bg-module-erp/6',
                        // Clicked row gets instant flash
                        isClicked && 'bg-module-erp/12',
                        // Even rows slightly different
                        !isSelected && !isClicked && rowIndex % 2 === 1 && 'bg-muted/20',
                        // Hover elevation
                        'hover:bg-glass-hover/60 row-hover-elevate',
                        // Clickable cursor
                        onRowClick && 'cursor-pointer'
                      )}
                      onClick={() => handleRowClick(row)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            'text-sm py-3.5',
                            cell.column.id === 'select' && 'w-10',
                          )}
                          style={{
                            fontSize: 'var(--text-sm)',
                            letterSpacing: 'var(--tracking-normal)',
                            lineHeight: 'var(--leading-normal)',
                          }}
                          onClick={(e) => {
                            if (cell.column.id === 'select') e.stopPropagation();
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={allColumns.length} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground/60">
                      <FileX className="h-7 w-7 opacity-20" strokeWidth={1.5} />
                      <p
                        className="font-medium text-muted-foreground/80"
                        style={{
                          fontSize: 'var(--text-sm)',
                          letterSpacing: 'var(--tracking-normal)',
                        }}
                      >
                        {emptyMessage}
                      </p>
                      <p
                        className="text-muted-foreground/40"
                        style={{
                          fontSize: 'var(--text-xs)',
                          letterSpacing: 'var(--tracking-normal)',
                        }}
                      >
                        {emptyDescription}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && pageCount > 0 && (
        <div className="border border-glass-border/50 rounded-lg bg-glass-bg/30 px-3 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p
              className="text-muted-foreground"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
            >
              Rows per page
            </p>
            <select
              value={currentPageSize}
              onChange={(e) => {
                const size = Number(e.target.value);
                setCurrentPageSize(size);
                table.setPageSize(size);
              }}
              className="bg-glass-bg border border-glass-border/50 rounded-md px-2 py-1 text-sm text-foreground outline-none"
              style={{ fontSize: 'var(--text-xs)' }}
            >
              {[10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <p
            className="text-muted-foreground hidden sm:block"
            style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
          >
            Page {pageIndex + 1} of {pageCount}
          </p>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 press-scale"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 press-scale"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
