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
import { usePopups } from '@/modules/marketing/hooks';
import type { Popup } from '@/modules/marketing/types';
import {
  Search,
  Plus,
  PanelTop,
  Eye,
  MousePointerClick,
  MoreHorizontal,
  Pencil,
  Copy,
  Trash2,
  LayoutGrid,
  List,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PopupListProps {
  data?: Popup[];
  isLoading?: boolean;
  onCreateNew?: () => void;
  onPopupClick?: (popup: Popup) => void;
  onEdit?: (popup: Popup) => void;
  onDuplicate?: (popup: Popup) => void;
  onDelete?: (popup: Popup) => void;
}

const statusColors: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
  inactive: 'bg-gray-50 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400',
  draft: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
};

const typeIcons: Record<string, string> = {
  popup: '🔲',
  slide_in: '📩',
  floating_bar: '📏',
  full_screen: '🖥️',
  sticky_bar: '📌',
};

export function PopupList({
  data: externalData,
  isLoading: externalLoading,
  onCreateNew,
  onPopupClick,
  onEdit,
  onDuplicate,
  onDelete,
}: PopupListProps) {
  const { data: popupsData, isLoading: popupsLoading } = usePopups();
  const data = externalData ?? popupsData?.data ?? [];
  const isLoading = externalLoading ?? popupsLoading;

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredData = data.filter((popup) => {
    if (search && !popup.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && popup.status !== statusFilter) return false;
    if (typeFilter !== 'all' && popup.type !== typeFilter) return false;
    return true;
  });

  const totalViews = data.reduce((sum, p) => sum + p.views, 0);
  const totalConversions = data.reduce((sum, p) => sum + p.conversions, 0);
  const avgConvRate = data.length > 0
    ? Math.round(data.reduce((sum, p) => sum + p.conversionRate, 0) / data.length * 10) / 10
    : 0;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard icon={PanelTop} title="Total Popups" value={data.length.toString()} accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
        <MetricCard icon={Eye} title="Total Views" value={totalViews.toLocaleString()} accentColor="text-blue-600" accentBg="bg-blue-50 dark:bg-blue-950/30" />
        <MetricCard icon={MousePointerClick} title="Conversions" value={totalConversions.toLocaleString()} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <MetricCard icon={PanelTop} title="Avg Conv. Rate" value={`${avgConvRate}%`} accentColor="text-amber-600" accentBg="bg-amber-50 dark:bg-amber-950/30" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card flex-1 w-full sm:max-w-md">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search popups..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] h-8 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px] h-8 text-xs"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="popup">Popup</SelectItem>
              <SelectItem value="slide_in">Slide-in</SelectItem>
              <SelectItem value="floating_bar">Floating Bar</SelectItem>
              <SelectItem value="full_screen">Full Screen</SelectItem>
              <SelectItem value="sticky_bar">Sticky Bar</SelectItem>
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
              <Plus className="h-4 w-4 mr-1" />New Popup
            </Button>
          )}
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((popup, index) => (
            <motion.div key={popup.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: index * 0.03 }}>
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-border/50" onClick={() => onPopupClick?.(popup)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{typeIcons[popup.type] ?? '🔲'}</span>
                      <h3 className="font-medium text-sm text-foreground truncate">{popup.name}</h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(popup); }}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDuplicate?.(popup); }}>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete?.(popup); }} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Badge variant="secondary" className={cn('text-xs', statusColors[popup.status])}>
                    {popup.status.charAt(0).toUpperCase() + popup.status.slice(1)}
                  </Badge>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{popup.views.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{popup.conversions.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">Conv.</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{popup.conversionRate}%</p>
                      <p className="text-[10px] text-muted-foreground">Rate</p>
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
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Popup</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Status</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Type</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Views</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Conversions</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Rate</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((popup) => (
                  <tr key={popup.id} className="border-b hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => onPopupClick?.(popup)}>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><span>{typeIcons[popup.type]}</span><span className="text-sm font-medium">{popup.name}</span></div></td>
                    <td className="px-4 py-3"><Badge variant="secondary" className={cn('text-xs', statusColors[popup.status])}>{popup.status.charAt(0).toUpperCase() + popup.status.slice(1)}</Badge></td>
                    <td className="px-4 py-3 text-sm capitalize">{popup.type.replace('_', ' ')}</td>
                    <td className="px-4 py-3 text-sm">{popup.views.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{popup.conversions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{popup.conversionRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredData.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <PanelTop className="h-10 w-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No popups found</p>
          <p className="text-xs mt-1">Create your first popup to engage visitors</p>
        </div>
      )}
    </div>
  );
}
