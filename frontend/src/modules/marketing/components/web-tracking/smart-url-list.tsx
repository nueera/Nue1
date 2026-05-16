'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, Link2, ExternalLink, BarChart3, MousePointerClick } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSmartUrls } from '@/modules/marketing/hooks/use-web-tracking';
import type { SmartUrl } from '@/modules/marketing/types';

interface SmartUrlListProps {
  onCreateUrl?: () => void;
  onViewAnalytics?: (url: SmartUrl) => void;
}

export function SmartUrlList({ onCreateUrl, onViewAnalytics }: SmartUrlListProps) {
  const { data: urlsData } = useSmartUrls();
  const urls = urlsData?.data ?? [];
  const [search, setSearch] = useState('');

  const filtered = urls.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.shortCode.includes(search)
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search URLs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Button onClick={onCreateUrl} size="sm"><Plus className="h-4 w-4 mr-2" />Create URL</Button>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Link2 className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <h3 className="text-lg font-semibold">No smart URLs</h3>
            <p className="text-sm text-muted-foreground mt-1">Create trackable smart URLs for your campaigns.</p>
            <Button className="mt-4" size="sm" onClick={onCreateUrl}><Plus className="h-4 w-4 mr-2" />Create URL</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((url, idx) => (
            <motion.div key={url.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 cursor-pointer transition-colors"
              onClick={() => onViewAnalytics?.(url)}
            >
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
                <Link2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{url.name}</p>
                <p className="text-xs text-muted-foreground font-mono truncate">{url.shortUrl}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MousePointerClick className="h-3 w-3" />{url.clicks}</span>
                <span>{url.uniqueClicks} unique</span>
                <span className="text-emerald-600">{url.conversions} conv.</span>
              </div>
              <Badge variant="secondary" className="text-xs">/{url.shortCode}</Badge>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
