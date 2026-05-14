// @ts-nocheck
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
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
import { MetricCard } from '@/modules/marketing/components/shared/metric-card';
import { useSignupForms } from '@/modules/marketing/hooks/use-signup-forms';
import type { SignupForm } from '@/modules/marketing/types';
import {
  Search,
  Plus,
  FileText,
  MoreHorizontal,
  Eye,
  BarChart3,
  Copy,
  Pencil,
  Trash2,
  LayoutGrid,
  List,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface FormListProps {
  data?: SignupForm[];
  isLoading?: boolean;
  onCreateNew?: () => void;
  onFormClick?: (form: SignupForm) => void;
  onEdit?: (form: SignupForm) => void;
  onDuplicate?: (form: SignupForm) => void;
  onDelete?: (form: SignupForm) => void;
}

const statusColors: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
  inactive: 'bg-gray-50 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400',
  draft: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
};

export function FormList({
  data: externalData,
  isLoading: externalLoading,
  onCreateNew,
  onFormClick,
  onEdit,
  onDuplicate,
  onDelete,
}: FormListProps) {
  const { data: formsData, isLoading: formsLoading } = useSignupForms();
  const data = externalData ?? formsData?.data ?? [];
  const isLoading = externalLoading ?? formsLoading;

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredData = data.filter((form) => {
    if (search && !form.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && form.status !== statusFilter) return false;
    return true;
  });

  const totalSubmissions = data.reduce((sum, f) => sum + f.submissions, 0);
  const avgConversion = data.length > 0
    ? Math.round(data.reduce((sum, f) => sum + f.conversionRate, 0) / data.length)
    : 0;

  return (
    <div className="space-y-4">
      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          icon={FileText}
          title="Total Forms"
          value={data.length.toString()}
          accentColor="text-violet-600"
          accentBg="bg-violet-50 dark:bg-violet-950/30"
        />
        <MetricCard
          icon={BarChart3}
          title="Submissions"
          value={totalSubmissions.toLocaleString()}
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <MetricCard
          icon={Eye}
          title="Avg Conversion"
          value={`${avgConversion}%`}
          accentColor="text-amber-600"
          accentBg="bg-amber-50 dark:bg-amber-950/30"
        />
        <MetricCard
          icon={Copy}
          title="Active Forms"
          value={data.filter((f) => f.status === 'active').length.toString()}
          accentColor="text-rose-600"
          accentBg="bg-rose-50 dark:bg-rose-950/30"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card flex-1 w-full sm:max-w-md">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search forms..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'cards' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('cards')}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('table')}
            >
              <List className="h-3.5 w-3.5" />
            </Button>
          </div>
          {onCreateNew && (
            <Button onClick={onCreateNew} className="bg-emerald-600 hover:bg-emerald-700 shrink-0" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Form
            </Button>
          )}
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((form, index) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              <Card
                className="hover:shadow-md transition-all duration-200 cursor-pointer border-border/50"
                onClick={() => onFormClick?.(form)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-violet-500" />
                      <h3 className="font-medium text-sm text-foreground truncate">{form.name}</h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(form); }}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDuplicate?.(form); }}>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete?.(form); }} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Badge variant="secondary" className={cn('text-xs', statusColors[form.status])}>
                    {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                  </Badge>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{form.submissions.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">Submissions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{form.conversionRate}%</p>
                      <p className="text-[10px] text-muted-foreground">Conversion</p>
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
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Form</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Status</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Theme</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Submissions</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Conv. Rate</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((form) => (
                  <tr
                    key={form.id}
                    className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onFormClick?.(form)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-violet-500" />
                        <span className="text-sm font-medium">{form.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className={cn('text-xs', statusColors[form.status])}>
                        {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{form.theme}</td>
                    <td className="px-4 py-3 text-sm">{form.submissions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{form.conversionRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredData.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-10 w-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No signup forms found</p>
          <p className="text-xs mt-1">Try adjusting your filters or create a new form</p>
        </div>
      )}
    </div>
  );
}
