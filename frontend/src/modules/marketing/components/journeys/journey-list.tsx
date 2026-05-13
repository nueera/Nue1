'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MetricCard } from '@/modules/marketing/components/shared';
import { useJourneys } from '@/modules/marketing/hooks';
import type { Journey } from '@/modules/marketing/types';
import {
  Search,
  Plus,
  GitBranch,
  MoreHorizontal,
  Pencil,
  Copy,
  Trash2,
  Play,
  Pause,
  Users,
  LayoutGrid,
  List,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface JourneyListProps {
  data?: Journey[];
  isLoading?: boolean;
  onCreateNew?: () => void;
  onJourneyClick?: (journey: Journey) => void;
  onEdit?: (journey: Journey) => void;
  onDuplicate?: (journey: Journey) => void;
  onDelete?: (journey: Journey) => void;
  onActivate?: (journey: Journey) => void;
  onPause?: (journey: Journey) => void;
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-50 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400',
  active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
  paused: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
  completed: 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
  archived: 'bg-gray-50 text-gray-600 dark:bg-gray-950/30 dark:text-gray-500',
};

export function JourneyList({
  data: externalData,
  isLoading: externalLoading,
  onCreateNew,
  onJourneyClick,
  onEdit,
  onDuplicate,
  onDelete,
  onActivate,
  onPause,
}: JourneyListProps) {
  const { data: journeysData, isLoading: journeysLoading } = useJourneys();
  const data = externalData ?? journeysData?.data ?? [];
  const isLoading = externalLoading ?? journeysLoading;

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredData = data.filter((j) => {
    if (search && !j.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && j.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard icon={GitBranch} title="Total Journeys" value={data.length.toString()} accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
        <MetricCard icon={Play} title="Active" value={data.filter((j) => j.status === 'active').length.toString()} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <MetricCard icon={Users} title="Enrolled" value={data.reduce((s, j) => s + j.enrolledCount, 0).toLocaleString()} accentColor="text-blue-600" accentBg="bg-blue-50 dark:bg-blue-950/30" />
        <MetricCard icon={Pause} title="Paused" value={data.filter((j) => j.status === 'paused').length.toString()} accentColor="text-amber-600" accentBg="bg-amber-50 dark:bg-amber-950/30" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card flex-1 w-full sm:max-w-md">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search journeys..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-8 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
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
              <Plus className="h-4 w-4 mr-1" />New Journey
            </Button>
          )}
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((journey, index) => (
            <motion.div key={journey.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: index * 0.03 }}>
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-border/50" onClick={() => onJourneyClick?.(journey)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-violet-500" />
                      <h3 className="font-medium text-sm text-foreground truncate">{journey.name}</h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(journey); }}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDuplicate?.(journey); }}>Duplicate</DropdownMenuItem>
                        {journey.status === 'draft' && onActivate && (
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onActivate(journey); }}>Activate</DropdownMenuItem>
                        )}
                        {journey.status === 'active' && onPause && (
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onPause(journey); }}>Pause</DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete?.(journey); }} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Badge variant="secondary" className={cn('text-xs', statusColors[journey.status])}>
                    {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
                  </Badge>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{journey.enrolledCount}</p>
                      <p className="text-[10px] text-muted-foreground">Enrolled</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{journey.activeCount}</p>
                      <p className="text-[10px] text-muted-foreground">Active</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{journey.completedCount}</p>
                      <p className="text-[10px] text-muted-foreground">Done</p>
                    </div>
                  </div>
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
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Journey</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Status</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Trigger</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Enrolled</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((j) => (
                  <tr key={j.id} className="border-b hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => onJourneyClick?.(j)}>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><GitBranch className="h-4 w-4 text-violet-500" /><span className="text-sm font-medium">{j.name}</span></div></td>
                    <td className="px-4 py-3"><Badge variant="secondary" className={cn('text-xs', statusColors[j.status])}>{j.status.charAt(0).toUpperCase() + j.status.slice(1)}</Badge></td>
                    <td className="px-4 py-3 text-xs">{j.trigger.replace('_', ' ')}</td>
                    <td className="px-4 py-3 text-sm">{j.enrolledCount}</td>
                    <td className="px-4 py-3 text-sm">{j.activeCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredData.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <GitBranch className="h-10 w-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No journeys found</p>
          <p className="text-xs mt-1">Create automated journeys to engage your audience</p>
        </div>
      )}
    </div>
  );
}
