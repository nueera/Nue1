'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
import {
  ClipboardList,
  Plus,
  Search,
  MoreHorizontal,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlans, useDeletePlan } from '@/modules/marketing/hooks';
import type { MarketingPlan } from '@/modules/marketing/types';
import { cn } from '@/lib/utils';

const STATUS_VARIANTS: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  planning: 'secondary',
  active: 'default',
  completed: 'outline',
  on_hold: 'secondary',
  cancelled: 'destructive',
};

interface PlanListProps {
  plans?: MarketingPlan[];
  isLoading?: boolean;
  onCreatePlan?: () => void;
  onEditPlan?: (plan: MarketingPlan) => void;
  onViewPlan?: (plan: MarketingPlan) => void;
  onDeletePlan?: (plan: MarketingPlan) => void;
}

export function PlanList({
  plans: externalPlans,
  isLoading: externalLoading,
  onCreatePlan,
  onEditPlan,
  onViewPlan,
  onDeletePlan,
}: PlanListProps) {
  const { data: plansData, isLoading: plansLoading } = usePlans();
  const plans = externalPlans ?? plansData?.data ?? [];
  const isLoading = externalLoading ?? plansLoading;

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = plans.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 w-full sm:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search plans..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on_hold">On Hold</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onCreatePlan} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Plan
        </Button>
      </div>

      {/* Plan cards */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <ClipboardList className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <h3 className="text-lg font-semibold">No plans found</h3>
            <p className="text-sm text-muted-foreground mt-1">Create a marketing plan to get started.</p>
            <Button className="mt-4" size="sm" onClick={onCreatePlan}>
              <Plus className="h-4 w-4 mr-2" />
              New Plan
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <Card className="border-border/50 hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{plan.name}</h3>
                      {plan.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{plan.description}</p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewPlan?.(plan)}>
                          <Eye className="h-4 w-4 mr-2" />View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditPlan?.(plan)}>
                          <Edit3 className="h-4 w-4 mr-2" />Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => onDeletePlan?.(plan)}>
                          <Trash2 className="h-4 w-4 mr-2" />Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <Badge variant={STATUS_VARIANTS[plan.status] ?? 'secondary'} className="mb-3">
                    {plan.status.replace('_', ' ')}
                  </Badge>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(plan.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {' – '}
                      {new Date(plan.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5" />
                      {plan.budget.currency} {plan.budget.spent.toLocaleString()} / {plan.budget.allocated.toLocaleString()}
                    </div>
                  </div>

                  {/* Budget progress */}
                  <div className="mt-3">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          plan.budget.spent / plan.budget.allocated > 0.9
                            ? 'bg-red-500'
                            : plan.budget.spent / plan.budget.allocated > 0.7
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        )}
                        style={{ width: `${Math.min(100, (plan.budget.spent / plan.budget.allocated) * 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
