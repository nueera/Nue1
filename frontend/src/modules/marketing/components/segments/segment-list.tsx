'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MetricCard } from '@/modules/marketing/components/shared';
import { useSegments } from '@/modules/marketing/hooks';
import type { Segment } from '@/modules/marketing/types';
import {
  Search,
  Plus,
  Filter,
  Users,
  MoreHorizontal,
  Pencil,
  Copy,
  Trash2,
  RefreshCw,
  LayoutGrid,
  List,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SegmentListProps {
  data?: Segment[];
  isLoading?: boolean;
  onCreateNew?: () => void;
  onSegmentClick?: (segment: Segment) => void;
  onEdit?: (segment: Segment) => void;
  onDuplicate?: (segment: Segment) => void;
  onDelete?: (segment: Segment) => void;
}

export function SegmentList({
  data: externalData,
  isLoading: externalLoading,
  onCreateNew,
  onSegmentClick,
  onEdit,
  onDuplicate,
  onDelete,
}: SegmentListProps) {
  const { data: segmentsData, isLoading: segmentsLoading } = useSegments();
  const data = externalData ?? segmentsData?.data ?? [];
  const isLoading = externalLoading ?? segmentsLoading;

  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredData = data.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalMembers = data.reduce((sum, s) => sum + s.memberCount, 0);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <MetricCard icon={Filter} title="Total Segments" value={data.length.toString()} accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
        <MetricCard icon={Users} title="Total Members" value={totalMembers.toLocaleString()} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <MetricCard icon={RefreshCw} title="Dynamic" value={data.filter((s) => s.isDynamic).length.toString()} accentColor="text-blue-600" accentBg="bg-blue-50 dark:bg-blue-950/30" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card flex-1 w-full sm:max-w-md">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search segments..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <Button variant={viewMode === 'cards' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setViewMode('cards')}>
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
            <Button variant={viewMode === 'table' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setViewMode('table')}>
              <List className="h-3.5 w-3.5" />
            </Button>
          </div>
          {onCreateNew && (
            <Button onClick={onCreateNew} className="bg-emerald-600 hover:bg-emerald-700 shrink-0" size="sm">
              <Plus className="h-4 w-4 mr-1" />New Segment
            </Button>
          )}
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((segment, index) => (
            <motion.div key={segment.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: index * 0.03 }}>
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-border/50" onClick={() => onSegmentClick?.(segment)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-violet-500" />
                      <h3 className="font-medium text-sm text-foreground truncate">{segment.name}</h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(segment); }}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDuplicate?.(segment); }}>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete?.(segment); }} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {segment.description && (
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{segment.description}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-sm font-semibold">{segment.memberCount.toLocaleString()}</span>
                      <span className="text-[10px] text-muted-foreground">members</span>
                    </div>
                    {segment.isDynamic && (
                      <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
                        Dynamic
                      </Badge>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">
                    {segment.rules.length} rule{segment.rules.length !== 1 ? 's' : ''}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Segment</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Members</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Type</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Rules</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Last Evaluated</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => onSegmentClick?.(s)}>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><Filter className="h-4 w-4 text-violet-500" /><span className="text-sm font-medium">{s.name}</span></div></td>
                    <td className="px-4 py-3 text-sm">{s.memberCount.toLocaleString()}</td>
                    <td className="px-4 py-3">{s.isDynamic ? <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">Dynamic</Badge> : <Badge variant="secondary" className="text-[10px]">Static</Badge>}</td>
                    <td className="px-4 py-3 text-sm">{s.rules.length}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{s.lastEvaluatedAt ? new Date(s.lastEvaluatedAt).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredData.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <Filter className="h-10 w-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No segments found</p>
          <p className="text-xs mt-1">Create segments to target specific audiences</p>
        </div>
      )}
    </div>
  );
}
