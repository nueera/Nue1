'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { History, Search, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSyncLogs } from '@/modules/marketing/hooks/use-crm-sync';
import type { SyncLog } from '@/modules/marketing/types';

const STATUS_CONFIG: Record<string, { icon: typeof CheckCircle2; color: string; variant: 'default' | 'secondary' | 'destructive' }> = {
  success: { icon: CheckCircle2, color: 'text-emerald-600', variant: 'default' },
  partial: { icon: AlertTriangle, color: 'text-amber-600', variant: 'secondary' },
  failed: { icon: XCircle, color: 'text-red-600', variant: 'destructive' },
};

export function CrmSyncLogs() {
  const { data: logsData } = useSyncLogs();
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const mockLogs: SyncLog[] = [
    { id: '1', timestamp: '2024-03-15T10:30:00Z', recordsSynced: 1250, errors: 0, direction: 'marketing_to_crm', status: 'success' },
    { id: '2', timestamp: '2024-03-14T10:30:00Z', recordsSynced: 1180, errors: 3, direction: 'crm_to_marketing', status: 'partial' },
    { id: '3', timestamp: '2024-03-13T10:30:00Z', recordsSynced: 0, errors: 12, direction: 'bidirectional', status: 'failed' },
    { id: '4', timestamp: '2024-03-12T10:30:00Z', recordsSynced: 1320, errors: 0, direction: 'marketing_to_crm', status: 'success' },
    { id: '5', timestamp: '2024-03-11T10:30:00Z', recordsSynced: 980, errors: 1, direction: 'crm_to_marketing', status: 'partial' },
  ];

  const filtered = mockLogs.filter((l) => {
    if (statusFilter !== 'all' && l.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <History className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Sync Logs</h3>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px] h-9"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="partial">Partial</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filtered.map((log, idx) => {
          const config = STATUS_CONFIG[log.status] ?? STATUS_CONFIG.success;
          const StatusIcon = config.icon;
          return (
            <motion.div key={log.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50"
            >
              <StatusIcon className={`h-4 w-4 shrink-0 ${config.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant={config.variant} className="text-xs">{log.status}</Badge>
                  <span className="text-xs text-muted-foreground">{log.direction.replace(/_/g, ' ')}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{log.recordsSynced} records synced · {log.errors} errors</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{new Date(log.timestamp).toLocaleString()}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
