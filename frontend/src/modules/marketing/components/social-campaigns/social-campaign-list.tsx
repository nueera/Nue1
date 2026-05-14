// @ts-nocheck
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CampaignStatusBadge } from '../shared/campaign-status-badge';
import { useCampaigns } from '@/modules/marketing/hooks/use-campaigns';
import type { Campaign, SocialCampaign } from '@/modules/marketing/types';
import { Search, Plus, Share2, MoreHorizontal, Eye, Heart, MessageSquare, Repeat2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SocialCampaignListProps {
  data?: Campaign[];
  isLoading?: boolean;
  onCreateNew?: () => void;
  onCampaignClick?: (campaign: Campaign) => void;
  onEdit?: (campaign: Campaign) => void;
  onDelete?: (campaign: Campaign) => void;
}

export function SocialCampaignList({ data: externalData, isLoading: externalLoading, onCreateNew, onCampaignClick, onEdit, onDelete }: SocialCampaignListProps) {
  const { data: campaignsData, isLoading: campaignsLoading } = useCampaigns();
  const allData = externalData ?? campaignsData?.data ?? [];
  const data = allData.filter((c) => c.type === 'social');
  const isLoading = externalLoading ?? campaignsLoading;

  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');

  const filteredData = data.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (platformFilter !== 'all' && c.channel !== platformFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card flex-1 w-full sm:max-w-md">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search social posts..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-[140px] h-8 text-xs"><SelectValue placeholder="Platform" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="twitter">Twitter/X</SelectItem>
            </SelectContent>
          </Select>
          {onCreateNew && (
            <Button onClick={onCreateNew} className="bg-emerald-600 hover:bg-emerald-700 shrink-0" size="sm">
              <Plus className="h-4 w-4 mr-1" />New Post
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((campaign, index) => (
          <div key={campaign.id} className="animate-in fade-in slide-in-from-bottom-2 duration-200" style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'both' }}>
            <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-border/50" onClick={() => onCampaignClick?.(campaign)}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-purple-600" />
                    <h3 className="font-medium text-sm truncate">{campaign.name}</h3>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => e.stopPropagation()}><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(campaign); }}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete?.(campaign); }} className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <CampaignStatusBadge status={campaign.status} />
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 capitalize">{campaign.channel}</Badge>
                </div>
                <div className="grid grid-cols-4 gap-1 text-center">
                  <div><Eye className="h-3.5 w-3.5 mx-auto text-muted-foreground" /><p className="text-xs font-medium mt-0.5">{campaign.metrics.opened.toLocaleString()}</p></div>
                  <div><Heart className="h-3.5 w-3.5 mx-auto text-red-400" /><p className="text-xs font-medium mt-0.5">{campaign.metrics.clicked.toLocaleString()}</p></div>
                  <div><MessageSquare className="h-3.5 w-3.5 mx-auto text-blue-400" /><p className="text-xs font-medium mt-0.5">{campaign.metrics.converted.toLocaleString()}</p></div>
                  <div><Repeat2 className="h-3.5 w-3.5 mx-auto text-green-400" /><p className="text-xs font-medium mt-0.5">{campaign.metrics.unsubscribed.toLocaleString()}</p></div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <Share2 className="h-10 w-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No social posts found</p>
        </div>
      )}
    </div>
  );
}
