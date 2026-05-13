'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MetricCard } from '@/modules/marketing/components/shared/metric-card';
import { useScoringRules } from '@/modules/marketing/hooks/use-lead-scoring';
import type { ScoringRule, ScoringCriteria } from '@/modules/marketing/types';
import {
  Search,
  Plus,
  Star,
  MoreHorizontal,
  Pencil,
  Trash2,
  TrendingUp,
  TrendingDown,
  Zap,
  LayoutGrid,
  List,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ScoringRuleListProps {
  data?: ScoringRule[];
  isLoading?: boolean;
  onCreateNew?: () => void;
  onEdit?: (rule: ScoringRule) => void;
  onDelete?: (rule: ScoringRule) => void;
  onToggle?: (rule: ScoringRule) => void;
}

const criteriaColors: Record<ScoringCriteria, string> = {
  email_engagement: 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
  web_activity: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
  social_engagement: 'bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400',
  demographic_fit: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
  behavioral: 'bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400',
  custom: 'bg-gray-50 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400',
};

export function ScoringRuleList({
  data: externalData,
  isLoading: externalLoading,
  onCreateNew,
  onEdit,
  onDelete,
  onToggle,
}: ScoringRuleListProps) {
  const { data: rulesData, isLoading: rulesLoading } = useScoringRules();
  const data = externalData ?? rulesData?.data ?? [];
  const isLoading = externalLoading ?? rulesLoading;

  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredData = data.filter((r) => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeRules = data.filter((r) => r.isActive).length;
  const totalPositive = data.filter((r) => r.isPositive).reduce((s, r) => s + r.points, 0);
  const totalNegative = data.filter((r) => !r.isPositive).reduce((s, r) => s + Math.abs(r.points), 0);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard icon={Star} title="Total Rules" value={data.length.toString()} accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
        <MetricCard icon={Zap} title="Active Rules" value={activeRules.toString()} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <MetricCard icon={TrendingUp} title="Positive Points" value={`+${totalPositive}`} accentColor="text-blue-600" accentBg="bg-blue-50 dark:bg-blue-950/30" />
        <MetricCard icon={TrendingDown} title="Negative Points" value={`-${totalNegative}`} accentColor="text-red-600" accentBg="bg-red-50 dark:bg-red-950/30" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card flex-1 w-full sm:max-w-md">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search rules..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm" />
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
              <Plus className="h-4 w-4 mr-1" />New Rule
            </Button>
          )}
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((rule, index) => (
            <motion.div key={rule.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: index * 0.03 }}>
              <Card className={cn('hover:shadow-md transition-all border-border/50', !rule.isActive && 'opacity-60')}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-500" />
                      <h3 className="font-medium text-sm text-foreground truncate">{rule.name}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit?.(rule)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDelete?.(rule)} className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <Badge variant="secondary" className={cn('text-[10px]', criteriaColors[rule.criteria])}>
                    {rule.criteria.replace('_', ' ')}
                  </Badge>
                  <div className="flex items-center justify-between mt-3">
                    <span className={cn('text-lg font-bold', rule.isPositive ? 'text-emerald-600' : 'text-red-600')}>
                      {rule.isPositive ? '+' : ''}{rule.points}
                    </span>
                    <Switch checked={rule.isActive} onCheckedChange={() => onToggle?.(rule)} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 truncate">{rule.condition}</p>
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
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Rule</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Criteria</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Points</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => onEdit?.(r)}>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><Star className="h-4 w-4 text-amber-500" /><span className="text-sm font-medium">{r.name}</span></div></td>
                    <td className="px-4 py-3"><Badge variant="secondary" className={cn('text-[10px]', criteriaColors[r.criteria])}>{r.criteria.replace('_', ' ')}</Badge></td>
                    <td className="px-4 py-3"><span className={cn('text-sm font-semibold', r.isPositive ? 'text-emerald-600' : 'text-red-600')}>{r.isPositive ? '+' : ''}{r.points}</span></td>
                    <td className="px-4 py-3"><Switch checked={r.isActive} onCheckedChange={() => onToggle?.(r)} onClick={(e) => e.stopPropagation()} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredData.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <Star className="h-10 w-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No scoring rules found</p>
          <p className="text-xs mt-1">Create rules to automatically score your leads</p>
        </div>
      )}
    </div>
  );
}
