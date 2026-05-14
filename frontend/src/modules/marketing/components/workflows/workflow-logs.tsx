// @ts-nocheck
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { History, Search, CheckCircle2, XCircle, SkipForward, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWorkflowLogs } from '@/modules/marketing/hooks/use-workflows';
import type { WorkflowLog } from '@/modules/marketing/types';

interface WorkflowLogsProps {
  workflowId?: string;
}

const STATUS_CONFIG: Record<string, { icon: typeof CheckCircle2; color: string }> = {
  success: { icon: CheckCircle2, color: 'text-emerald-600' },
  failed: { icon: XCircle, color: 'text-red-600' },
  skipped: { icon: SkipForward, color: 'text-amber-600' },
};

export function WorkflowLogs({ workflowId }: WorkflowLogsProps) {
  const { data: logsData, isLoading } = useWorkflowLogs(workflowId ?? '');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockLogs: WorkflowLog[] = [
    { id: '1', workflowId: workflowId ?? 'w1', contactId: 'c1', action: 'send_email', status: 'success', executedAt: '2024-03-15T10:30:00Z' },
    { id: '2', workflowId: workflowId ?? 'w1', contactId: 'c2', action: 'add_tag', status: 'success', executedAt: '2024-03-15T10:30:05Z' },
    { id: '3', workflowId: workflowId ?? 'w1', contactId: 'c3', action: 'send_sms', status: 'failed', executedAt: '2024-03-15T10:30:10Z', error: 'Invalid phone number' },
    { id: '4', workflowId: workflowId ?? 'w1', contactId: 'c4', action: 'wait', status: 'skipped', executedAt: '2024-03-15T10:30:15Z' },
    { id: '5', workflowId: workflowId ?? 'w1', contactId: 'c5', action: 'webhook', status: 'success', executedAt: '2024-03-15T10:30:20Z' },
  ];

  const logs = mockLogs.filter((l) => {
    if (statusFilter !== 'all' && l.status !== statusFilter) return false;
    if (search && !l.action.includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <History className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Execution Logs</h3>
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
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="skipped">Skipped</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {logs.map((log, idx) => {
          const statusConfig = STATUS_CONFIG[log.status] ?? STATUS_CONFIG.success;
          const StatusIcon = statusConfig.icon;

          return (
            <motion.div key={log.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50"
            >
              <StatusIcon className={`h-4 w-4 shrink-0 ${statusConfig.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{log.action.replace(/_/g, ' ')}</span>
                  <Badge variant={log.status === 'success' ? 'default' : log.status === 'failed' ? 'destructive' : 'secondary'} className="text-xs">
                    {log.status}
                  </Badge>
                </div>
                {log.error && <p className="text-xs text-red-600 mt-0.5">{log.error}</p>}
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                <Clock className="h-3 w-3" />
                {new Date(log.executedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
