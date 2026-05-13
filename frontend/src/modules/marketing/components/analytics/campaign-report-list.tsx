'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Search, FileText, Eye, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCampaignReport } from '@/modules/marketing/hooks';

interface CampaignReportListProps {
  onViewReport?: (campaignId: string) => void;
}

export function CampaignReportList({ onViewReport }: CampaignReportListProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const mockReports = [
    { id: '1', name: 'Q1 Newsletter', type: 'email', sent: 12500, openRate: 28.5, clickRate: 9.2, revenue: 15400, date: '2024-03-15' },
    { id: '2', name: 'Flash Sale SMS', type: 'sms', sent: 8200, openRate: 95.0, clickRate: 22.1, revenue: 32100, date: '2024-03-10' },
    { id: '3', name: 'Product Launch', type: 'email', sent: 18000, openRate: 32.1, clickRate: 14.8, revenue: 89500, date: '2024-03-05' },
    { id: '4', name: 'Welcome Series', type: 'email', sent: 5600, openRate: 45.2, clickRate: 18.5, revenue: 12300, date: '2024-03-01' },
    { id: '5', name: 'Social Promo', type: 'social', sent: 25000, openRate: 0, clickRate: 3.8, revenue: 7800, date: '2024-02-28' },
  ];

  const filtered = mockReports.filter((r) => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'all' && r.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search reports..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[130px] h-9"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="social">Social</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filtered.map((report, idx) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 cursor-pointer transition-colors"
            onClick={() => onViewReport?.(report.id)}
          >
            <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-blue-50 dark:bg-blue-950/30">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{report.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="secondary" className="text-xs">{report.type}</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="text-right">
                <p className="font-medium text-foreground">{report.openRate}%</p>
                <p>Open Rate</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{report.clickRate}%</p>
                <p>Click Rate</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-emerald-600">${report.revenue.toLocaleString()}</p>
                <p>Revenue</p>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
