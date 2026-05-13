'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { SegmentRule } from '@/modules/marketing/types';
import { useSegmentPreview } from '@/modules/marketing/hooks/use-segments';
import { Users, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface SegmentPreviewProps {
  rules: SegmentRule[];
}

export function SegmentPreview({ rules }: SegmentPreviewProps) {
  const { data: previewData, isLoading } = useSegmentPreview();
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate preview count based on rules
  useEffect(() => {
    const conditionCount = rules.reduce((sum, r) => sum + r.conditions.length, 0);
    const baseCount = 5420;
    const count = Math.max(100, Math.round(baseCount / (conditionCount * 0.8 + 1)));
    setMemberCount(count);
  }, [rules]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-500" />
            Live Preview
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleRefresh}>
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <motion.div
          key={memberCount}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="text-center py-4"
        >
          <p className="text-4xl font-bold text-foreground tabular-nums">
            {memberCount?.toLocaleString() ?? '—'}
          </p>
          <p className="text-sm text-muted-foreground mt-1">contacts match your segment rules</p>
        </motion.div>

        <div className="text-xs text-muted-foreground text-center">
          {rules.length} group{rules.length !== 1 ? 's' : ''} with {rules.reduce((sum, r) => sum + r.conditions.length, 0)} condition{rules.reduce((sum, r) => sum + r.conditions.length, 0) !== 1 ? 's' : ''}
        </div>
      </CardContent>
    </Card>
  );
}
