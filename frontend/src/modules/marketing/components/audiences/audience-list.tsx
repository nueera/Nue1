// @ts-nocheck
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
import { MetricCard } from '@/modules/marketing/components/shared/metric-card';
import { useAudiences } from '@/modules/marketing/hooks/use-audiences';
import type { Audience } from '@/modules/marketing/types';
import {
  Search,
  Plus,
  Users,
  MoreHorizontal,
  Pencil,
  Trash2,
  Upload,
  UserPlus,
  LayoutGrid,
  List,
} from 'lucide-react';

interface AudienceListProps {
  data?: Audience[];
  isLoading?: boolean;
  onCreateNew?: () => void;
  onAudienceClick?: (audience: Audience) => void;
  onEdit?: (audience: Audience) => void;
  onDelete?: (audience: Audience) => void;
  onImport?: () => void;
}

export function AudienceList({
  data: externalData,
  isLoading: externalLoading,
  onCreateNew,
  onAudienceClick,
  onEdit,
  onDelete,
  onImport,
}: AudienceListProps) {
  const { data: audiencesData, isLoading: audiencesLoading } = useAudiences();
  const data = externalData ?? audiencesData?.data ?? [];
  const isLoading = externalLoading ?? audiencesLoading;

  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredData = data.filter((a) => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalMembers = data.reduce((sum, a) => sum + a.memberCount, 0);
  const totalActive = data.reduce((sum, a) => sum + a.activeCount, 0);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard icon={Users} title="Total Audiences" value={data.length.toString()} accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
        <MetricCard icon={UserPlus} title="Total Members" value={totalMembers.toLocaleString()} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <MetricCard icon={Users} title="Active Members" value={totalActive.toLocaleString()} accentColor="text-blue-600" accentBg="bg-blue-50 dark:bg-blue-950/30" />
        <MetricCard icon={Upload} title="Growth Rate" value="+12%" accentColor="text-amber-600" accentBg="bg-amber-50 dark:bg-amber-950/30" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card flex-1 w-full sm:max-w-md">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search audiences..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm" />
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
          {onImport && (
            <Button variant="outline" size="sm" onClick={onImport}>
              <Upload className="h-4 w-4 mr-1" />Import
            </Button>
          )}
          {onCreateNew && (
            <Button onClick={onCreateNew} className="bg-emerald-600 hover:bg-emerald-700 shrink-0" size="sm">
              <Plus className="h-4 w-4 mr-1" />New Audience
            </Button>
          )}
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((audience, index) => (
            <div key={audience.id} className="animate-in fade-in slide-in-from-bottom-2 duration-200" style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'both' }}>
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-border/50" onClick={() => onAudienceClick?.(audience)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-violet-500" />
                      <h3 className="font-medium text-sm text-foreground truncate">{audience.name}</h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(audience); }}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete?.(audience); }} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {audience.description && (
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{audience.description}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <UserPlus className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-sm font-semibold">{audience.memberCount.toLocaleString()}</span>
                      <span className="text-[10px] text-muted-foreground">members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-sm font-semibold">{audience.activeCount.toLocaleString()}</span>
                      <span className="text-[10px] text-muted-foreground">active</span>
                    </div>
                  </div>
                  {audience.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {audience.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Audience</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Members</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Active</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Tags</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => onAudienceClick?.(a)}>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><Users className="h-4 w-4 text-violet-500" /><span className="text-sm font-medium">{a.name}</span></div></td>
                    <td className="px-4 py-3 text-sm">{a.memberCount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{a.activeCount.toLocaleString()}</td>
                    <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{a.tags.slice(0, 2).map((t) => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}</div></td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(a.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredData.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="h-10 w-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No audiences found</p>
          <p className="text-xs mt-1">Create your first audience to organize your contacts</p>
        </div>
      )}
    </div>
  );
}
