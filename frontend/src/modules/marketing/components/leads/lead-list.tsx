// @ts-nocheck
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
  type RowSelectionState,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Trash2,
  UserPlus,
  ArrowRightLeft,
  Search,
  Filter,
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LeadScoreBadge } from '../shared/lead-score-badge';
import { LeadStageBadge } from '../shared/lead-stage-badge';
import { ChannelIcon } from '../shared/channel-icon';
import { useLeads } from '@/modules/marketing/hooks/use-leads';
import { LEAD_SOURCE_CONFIG } from '@/modules/marketing/constants/lead-constants';
import type { Lead, LeadSource, LeadStage } from '@/modules/marketing/types';

interface LeadListProps {
  data?: Lead[];
  isLoading?: boolean;
  onRowClick?: (lead: Lead) => void;
  onEdit?: (lead: Lead) => void;
  onDelete?: (lead: Lead) => void;
  onCreateNew?: () => void;
  onConvert?: (lead: Lead) => void;
  onMerge?: (leads: Lead[]) => void;
  onBulkDelete?: (ids: string[]) => void;
  onBulkAssign?: (ids: string[], ownerId: string) => void;
  onBulkStageChange?: (ids: string[], stage: LeadStage) => void;
}

function SortIcon({ column }: { column: { getIsSorted: () => false | 'asc' | 'desc' } }) {
  const sorted = column.getIsSorted();
  if (sorted === 'asc') return <ChevronUp className="h-3.5 w-3.5 ml-1" />;
  if (sorted === 'desc') return <ChevronDown className="h-3.5 w-3.5 ml-1" />;
  return <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />;
}

export function LeadList({
  data: externalData,
  isLoading: externalLoading,
  onRowClick,
  onEdit,
  onDelete,
  onCreateNew,
  onConvert,
  onMerge,
  onBulkDelete,
  onBulkAssign,
  onBulkStageChange,
}: LeadListProps) {
  const { data: leadsData, isLoading: leadsLoading } = useLeads();
  const data = externalData ?? leadsData?.data ?? [];
  const isLoading = externalLoading ?? leadsLoading;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 100]);

  const filteredData = useMemo(() => {
    return data.filter((lead) => {
      if (sourceFilter !== 'all' && lead.source !== sourceFilter) return false;
      if (stageFilter !== 'all' && lead.stage !== stageFilter) return false;
      if (lead.score.total < scoreRange[0] || lead.score.total > scoreRange[1]) return false;
      return true;
    });
  }, [data, sourceFilter, stageFilter, scoreRange]);

  const selectedLeads = useMemo(() => {
    return filteredData.filter((_, i) => rowSelection[i.toString()]);
  }, [filteredData, rowSelection]);

  const selectedCount = selectedLeads.length;

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        id: 'name',
        header: 'Name',
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold shrink-0">
              {row.original.firstName[0]}
              {row.original.lastName[0]}
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">
                {row.original.firstName} {row.original.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'company',
        header: 'Company',
        cell: ({ getValue }) => (
          <span className="text-sm text-foreground">{(getValue() as string) || '—'}</span>
        ),
      },
      {
        accessorKey: 'source',
        header: 'Source',
        cell: ({ getValue }) => {
          const source = getValue() as LeadSource;
          const config = LEAD_SOURCE_CONFIG[source];
          return (
            <div className="flex items-center gap-1.5">
              <ChannelIcon channel={source === 'social_media' ? 'facebook' : source === 'email' ? 'email' : source === 'phone' ? 'sms' : source === 'chat' ? 'sms' : 'web_push'} size="sm" />
              <span className="text-sm">{config?.label ?? source}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'stage',
        header: 'Stage',
        cell: ({ getValue }) => <LeadStageBadge stage={getValue() as LeadStage} />,
      },
      {
        accessorKey: 'score',
        header: 'Score',
        accessorFn: (row) => row.score.total,
        cell: ({ row }) => <LeadScoreBadge score={row.original.score.total} />,
      },
      {
        accessorKey: 'assignedTo',
        header: 'Owner',
        cell: ({ getValue }) => (
          <span className="text-sm text-muted-foreground">{(getValue() as string) || 'Unassigned'}</span>
        ),
      },
      {
        accessorKey: 'lastContactedAt',
        header: 'Last Activity',
        cell: ({ getValue }) => {
          const val = getValue() as string | undefined;
          if (!val) return <span className="text-sm text-muted-foreground">Never</span>;
          const date = new Date(val);
          return (
            <span className="text-sm text-muted-foreground">
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          );
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
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(row.original); }}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onConvert?.(row.original); }}>
                Convert to Contact
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => { e.stopPropagation(); onDelete?.(row.original); }}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [onEdit, onDelete, onConvert]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter, rowSelection },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 10 } },
    getRowId: (_row, index) => index.toString(),
    enableRowSelection: true,
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 w-full sm:max-w-md">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card flex-1">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search leads..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm"
            />
          </div>
        </div>
        {onCreateNew && (
          <Button onClick={onCreateNew} className="bg-emerald-600 hover:bg-emerald-700 shrink-0">
            <Plus className="h-4 w-4 mr-1" />
            New Lead
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[150px] h-8 text-xs">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            {Object.entries(LEAD_SOURCE_CONFIG).map(([key, config]) => (
              <SelectItem key={key} value={key}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-[150px] h-8 text-xs">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="proposal">Proposal</SelectItem>
            <SelectItem value="negotiation">Negotiation</SelectItem>
            <SelectItem value="closed_won">Closed Won</SelectItem>
            <SelectItem value="closed_lost">Closed Lost</SelectItem>
            <SelectItem value="nurturing">Nurturing</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={`${scoreRange[0]}-${scoreRange[1]}`}
          onValueChange={(v) => {
            const [min, max] = v.split('-').map(Number);
            setScoreRange([min, max]);
          }}
        >
          <SelectTrigger className="w-[150px] h-8 text-xs">
            <SelectValue placeholder="Score Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-100">All Scores</SelectItem>
            <SelectItem value="0-30">Cold (0-30)</SelectItem>
            <SelectItem value="31-60">Warm (31-60)</SelectItem>
            <SelectItem value="61-100">Hot (61-100)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {selectedCount > 0 && (
        <div
          className="animate-in fade-in slide-in-from-top-2 duration-200 flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800"
        >
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            {selectedCount} selected
          </span>
          <div className="flex items-center gap-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => onBulkDelete?.(selectedLeads.map((l) => l.id))}
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => {
                if (selectedLeads.length >= 2) onMerge?.(selectedLeads);
              }}
            >
              <ArrowRightLeft className="h-3 w-3" />
              Merge
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => onBulkAssign?.(selectedLeads.map((l) => l.id), 'current-user')}
            >
              <UserPlus className="h-3 w-3" />
              Assign
            </Button>
            <Select
              onValueChange={(stage) =>
                onBulkStageChange?.(selectedLeads.map((l) => l.id), stage as LeadStage)
              }
            >
              <SelectTrigger className="h-7 w-[130px] text-xs">
                <SelectValue placeholder="Change Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="closed_won">Closed Won</SelectItem>
                <SelectItem value="closed_lost">Closed Lost</SelectItem>
                <SelectItem value="nurturing">Nurturing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="border-b hover:bg-transparent">
                  <TableHead className="w-10">
                    <Checkbox
                      checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                      }
                      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                      aria-label="Select all"
                    />
                  </TableHead>
                  {hg.headers
                    .filter((h) => h.id !== 'select')
                    .map((header) => (
                      <TableHead
                        key={header.id}
                        className={cn(
                          'text-xs uppercase tracking-wider text-muted-foreground font-medium h-10',
                          header.column.getCanSort() &&
                            'cursor-pointer hover:text-foreground transition-colors'
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        style={{
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
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-b">
                    <TableCell className="py-3.5">
                      <Skeleton className="h-4 w-4 rounded" />
                    </TableCell>
                    {columns.map((_, j) => (
                      <TableCell key={j} className="py-3.5">
                        <Skeleton className="h-4 w-full max-w-[120px] rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={cn(
                      'border-b transition-colors hover:bg-muted/50',
                      row.getIsSelected() && 'bg-emerald-50/50 dark:bg-emerald-950/20',
                      onRowClick && 'cursor-pointer'
                    )}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    <TableCell className="w-10" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                      />
                    </TableCell>
                    {row
                      .getVisibleCells()
                      .filter((c) => c.column.id !== 'select')
                      .map((cell) => (
                        <TableCell key={cell.id} className="text-sm py-3.5">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="h-48 text-center text-muted-foreground"
                  >
                    No leads found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && table.getPageCount() > 0 && (
        <div className="border rounded-lg px-3 py-2.5 flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
