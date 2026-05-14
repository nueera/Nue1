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
import { CampaignStatusBadge } from '../shared/campaign-status-badge';
import { ChannelIcon } from '../shared/channel-icon';
import { MetricCard } from '../shared/metric-card';
import { useCampaigns } from '@/modules/marketing/hooks/use-campaigns';
import { CAMPAIGN_TYPE_CONFIG, CAMPAIGN_STATUS_CONFIG } from '@/modules/marketing/constants/campaign-constants';
import type { Campaign, CampaignType, CampaignStatus } from '@/modules/marketing/types';
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  Mail,
  Send,
  Eye,
  MousePointerClick,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface EmailCampaignListProps {
  data?: Campaign[];
  isLoading?: boolean;
  onCreateNew?: () => void;
  onCampaignClick?: (campaign: Campaign) => void;
  onEdit?: (campaign: Campaign) => void;
  onDuplicate?: (campaign: Campaign) => void;
  onDelete?: (campaign: Campaign) => void;
}

export function EmailCampaignList({
  data: externalData,
  isLoading: externalLoading,
  onCreateNew,
  onCampaignClick,
  onEdit,
  onDuplicate,
  onDelete,
}: EmailCampaignListProps) {
  const { data: campaignsData, isLoading: campaignsLoading } = useCampaigns();
  const data = externalData ?? campaignsData?.data ?? [];
  const isLoading = externalLoading ?? campaignsLoading;

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredData = data.filter((campaign) => {
    if (search && !campaign.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && campaign.status !== statusFilter) return false;
    if (typeFilter !== 'all' && campaign.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          icon={Send}
          title="Total Sent"
          value={data.reduce((sum, c) => sum + c.metrics.sent, 0).toLocaleString()}
          accentColor="text-blue-600"
          accentBg="bg-blue-50 dark:bg-blue-950/30"
        />
        <MetricCard
          icon={Eye}
          title="Avg Open Rate"
          value={
            data.length > 0
              ? `${Math.round(
                  data.reduce((sum, c) => sum + (c.metrics.opened / Math.max(c.metrics.sent, 1)) * 100, 0) / data.length
                )}%`
              : '0%'
          }
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <MetricCard
          icon={MousePointerClick}
          title="Avg Click Rate"
          value={
            data.length > 0
              ? `${Math.round(
                  data.reduce((sum, c) => sum + (c.metrics.clicked / Math.max(c.metrics.opened, 1)) * 100, 0) / data.length
                )}%`
              : '0%'
          }
          accentColor="text-amber-600"
          accentBg="bg-amber-50 dark:bg-amber-950/30"
        />
        <MetricCard
          icon={Mail}
          title="Campaigns"
          value={data.length.toString()}
          accentColor="text-purple-600"
          accentBg="bg-purple-50 dark:bg-purple-950/30"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 w-full sm:max-w-md">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card flex-1">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.entries(CAMPAIGN_STATUS_CONFIG).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px] h-8 text-xs">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(CAMPAIGN_TYPE_CONFIG).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  {config.label}
                </SelectItem>
              ))}
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
              New
            </Button>
          )}
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((campaign, index) => (
            <div
              key={campaign.id}
              className="animate-in fade-in slide-in-from-bottom-2 duration-200"
              style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'both' }}
            >
              <Card
                className="hover:shadow-md transition-all duration-200 cursor-pointer border-border/50"
                onClick={() => onCampaignClick?.(campaign)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <ChannelIcon channel={campaign.channel} />
                      <h3 className="font-medium text-sm text-foreground truncate">
                        {campaign.name}
                      </h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(campaign); }}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDuplicate?.(campaign); }}>
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete?.(campaign); }} className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CampaignStatusBadge status={campaign.status} />
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{campaign.metrics.sent.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">Sent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{campaign.metrics.opened.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">Opened</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{campaign.metrics.clicked.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">Clicked</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Campaign</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Status</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Sent</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Opened</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Clicked</th>
                  <th className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-4 py-3 text-left">Bounced</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onCampaignClick?.(campaign)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <ChannelIcon channel={campaign.channel} />
                        <span className="text-sm font-medium">{campaign.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><CampaignStatusBadge status={campaign.status} /></td>
                    <td className="px-4 py-3 text-sm">{campaign.metrics.sent.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{campaign.metrics.opened.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{campaign.metrics.clicked.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{campaign.metrics.bounced.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredData.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <Mail className="h-10 w-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No campaigns found</p>
          <p className="text-xs mt-1">Try adjusting your filters or create a new campaign</p>
        </div>
      )}
    </div>
  );
}
