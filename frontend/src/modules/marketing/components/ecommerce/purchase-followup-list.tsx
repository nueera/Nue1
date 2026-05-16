'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { ArrowRightLeft, Search, Plus, Mail, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePurchaseFollowups } from '@/modules/marketing/hooks/use-ecommerce';
import type { PurchaseFollowup } from '@/modules/marketing/types';

const TRIGGER_LABELS: Record<string, string> = {
  purchase: 'After Purchase',
  delivery: 'After Delivery',
  review_request: 'Review Request',
  cross_sell: 'Cross-Sell',
  upsell: 'Upsell',
};

interface PurchaseFollowupListProps {
  onCreateFollowup?: () => void;
  onEditFollowup?: (followup: PurchaseFollowup) => void;
}

export function PurchaseFollowupList({ onCreateFollowup, onEditFollowup }: PurchaseFollowupListProps) {
  const { data: followupsData, isLoading } = usePurchaseFollowups();
  const followups = followupsData?.data ?? [];
  const [search, setSearch] = useState('');
  const [triggerFilter, setTriggerFilter] = useState('all');

  const filtered = followups.filter((f) => {
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (triggerFilter !== 'all' && f.triggerEvent !== triggerFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 w-full sm:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search follow-ups..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <Select value={triggerFilter} onValueChange={setTriggerFilter}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="Trigger" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Triggers</SelectItem>
              {Object.entries(TRIGGER_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onCreateFollowup} size="sm">
          <Plus className="h-4 w-4 mr-2" />New Follow-up
        </Button>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Mail className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <h3 className="text-lg font-semibold">No follow-ups</h3>
            <p className="text-sm text-muted-foreground mt-1">Create purchase follow-up sequences to boost engagement.</p>
            <Button className="mt-4" size="sm" onClick={onCreateFollowup}>
              <Plus className="h-4 w-4 mr-2" />New Follow-up
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((followup, idx) => (
            <motion.div
              key={followup.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 cursor-pointer transition-colors"
              onClick={() => onEditFollowup?.(followup)}
            >
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{followup.name}</p>
                <p className="text-xs text-muted-foreground">
                  {TRIGGER_LABELS[followup.triggerEvent] ?? followup.triggerEvent} · {followup.delayDays}d delay
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-medium">{followup.sentCount} sent</p>
                  <p className="text-xs text-muted-foreground">{followup.conversionRate}% conv.</p>
                </div>
                <Badge variant={followup.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                  {followup.status}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
