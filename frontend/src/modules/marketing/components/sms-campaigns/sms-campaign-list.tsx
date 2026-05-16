'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CampaignStatusBadge } from '../shared/campaign-status-badge';
import { MetricCard } from '../shared/metric-card';
import { useCampaigns } from '@/modules/marketing/hooks/use-campaigns';
import type { Campaign } from '@/modules/marketing/types';
import { SMS_LIMITS } from '@/modules/marketing/constants/campaign-constants';
import {
  Search,
  Plus,
  MessageSquare,
  Send,
  CheckCheck,
  AlertTriangle,
  MoreHorizontal,
} from 'lucide-react';
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

interface SmsCampaignListProps {
  data?: Campaign[];
  isLoading?: boolean;
  onCreateNew?: () => void;
  onCampaignClick?: (campaign: Campaign) => void;
  onEdit?: (campaign: Campaign) => void;
  onDelete?: (campaign: Campaign) => void;
}

export function SmsCampaignList({
  data: externalData,
  isLoading: externalLoading,
  onCreateNew,
  onCampaignClick,
  onEdit,
  onDelete,
}: SmsCampaignListProps) {
  const { data: campaignsData, isLoading: campaignsLoading } = useCampaigns();
  const allData = externalData ?? campaignsData?.data ?? [];
  const data = allData.filter((c) => c.type === 'sms' || c.channel === 'sms');
  const isLoading = externalLoading ?? campaignsLoading;

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredData = data.filter((campaign) => {
    if (search && !campaign.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && campaign.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          icon={Send}
          title="Total Sent"
          value={data.reduce((sum, c) => sum + c.metrics.sent, 0).toLocaleString()}
          accentColor="text-green-600"
          accentBg="bg-green-50 dark:bg-green-950/30"
        />
        <MetricCard
          icon={CheckCheck}
          title="Delivered"
          value={data.reduce((sum, c) => sum + c.metrics.delivered, 0).toLocaleString()}
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <MetricCard
          icon={MessageSquare}
          title="Clicked"
          value={data.reduce((sum, c) => sum + c.metrics.clicked, 0).toLocaleString()}
          accentColor="text-amber-600"
          accentBg="bg-amber-50 dark:bg-amber-950/30"
        />
        <MetricCard
          icon={AlertTriangle}
          title="Bounced"
          value={data.reduce((sum, c) => sum + c.metrics.bounced, 0).toLocaleString()}
          accentColor="text-red-600"
          accentBg="bg-red-50 dark:bg-red-950/30"
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
            placeholder="Search SMS campaigns..."
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
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          {onCreateNew && (
            <Button onClick={onCreateNew} className="bg-emerald-600 hover:bg-emerald-700 shrink-0" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New SMS
            </Button>
          )}
        </div>
      </div>

      {/* Campaign Cards */}
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
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                    <h3 className="font-medium text-sm text-foreground truncate">{campaign.name}</h3>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(campaign); }}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete?.(campaign); }} className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CampaignStatusBadge status={campaign.status} />
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div>
                    <p className="text-sm font-semibold">{campaign.metrics.sent.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">Sent</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{campaign.metrics.delivered.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">Delivered</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{campaign.metrics.clicked.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">Clicked</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No SMS campaigns found</p>
        </div>
      )}
    </div>
  );
}
