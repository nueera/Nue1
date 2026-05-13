'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Search, Plus, Tag, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProductCampaigns } from '@/modules/marketing/hooks/use-ecommerce';
import type { ProductCampaign } from '@/modules/marketing/types';

const TYPE_LABELS: Record<string, string> = {
  launch: 'Launch',
  promotion: 'Promotion',
  clearance: 'Clearance',
  featured: 'Featured',
  bundle: 'Bundle',
};

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  draft: 'secondary',
  active: 'default',
  completed: 'outline',
  cancelled: 'destructive',
};

interface ProductCampaignListProps {
  onCreateCampaign?: () => void;
  onEditCampaign?: (campaign: ProductCampaign) => void;
}

export function ProductCampaignList({ onCreateCampaign, onEditCampaign }: ProductCampaignListProps) {
  const { data: campaignsData, isLoading } = useProductCampaigns();
  const campaigns = campaignsData?.data ?? [];
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = campaigns.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'all' && c.type !== typeFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 w-full sm:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search campaigns..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px] h-9"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(TYPE_LABELS).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] h-9"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onCreateCampaign} size="sm">
          <Plus className="h-4 w-4 mr-2" />New Campaign
        </Button>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Megaphone className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <h3 className="text-lg font-semibold">No product campaigns</h3>
            <p className="text-sm text-muted-foreground mt-1">Create campaigns to promote your products.</p>
            <Button className="mt-4" size="sm" onClick={onCreateCampaign}>
              <Plus className="h-4 w-4 mr-2" />New Campaign
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((campaign, idx) => (
            <motion.div key={campaign.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
              <Card className="border-border/50 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onEditCampaign?.(campaign)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-sm">{campaign.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="secondary" className="text-xs">{TYPE_LABELS[campaign.type] ?? campaign.type}</Badge>
                        {campaign.discount && <Badge variant="outline" className="text-xs">{campaign.discount}% off</Badge>}
                      </div>
                    </div>
                    <Badge variant={STATUS_VARIANT[campaign.status] ?? 'secondary'} className="text-xs">{campaign.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                    <span>Start: {new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span>End: {new Date(campaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{campaign.metrics.sent} sent</span>
                    <span>{campaign.metrics.opened} opened</span>
                    <span>{campaign.metrics.converted} converted</span>
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
