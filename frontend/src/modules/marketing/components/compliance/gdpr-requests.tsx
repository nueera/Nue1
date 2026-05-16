'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Shield, Clock, CheckCircle2, Loader2, XCircle, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGdprRequests, useHandleGdprRequest } from '@/modules/marketing/hooks/use-compliance';
import type { GdprRequest } from '@/modules/marketing/types';

const STATUS_CONFIG: Record<string, { icon: typeof CheckCircle2; color: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { icon: Clock, color: 'text-amber-600', variant: 'secondary' },
  processing: { icon: Loader2, color: 'text-blue-600', variant: 'outline' },
  completed: { icon: CheckCircle2, color: 'text-emerald-600', variant: 'default' },
  rejected: { icon: XCircle, color: 'text-red-600', variant: 'destructive' },
};

const TYPE_LABELS: Record<string, string> = { access: 'Data Access', deletion: 'Data Deletion', portability: 'Data Portability', rectification: 'Data Rectification', objection: 'Objection', restriction: 'Processing Restriction' };

export function GdprRequests() {
  const { data: requestsData } = useGdprRequests();
  const [statusFilter, setStatusFilter] = useState('all');

  const mockRequests: GdprRequest[] = [
    { id: '1', contactId: 'c1', type: 'access', status: 'pending', requestedAt: '2024-03-15T10:00:00Z' },
    { id: '2', contactId: 'c2', type: 'deletion', status: 'processing', requestedAt: '2024-03-14T10:00:00Z' },
    { id: '3', contactId: 'c3', type: 'portability', status: 'completed', requestedAt: '2024-03-13T10:00:00Z', completedAt: '2024-03-14T10:00:00Z' },
    { id: '4', contactId: 'c4', type: 'rectification', status: 'pending', requestedAt: '2024-03-12T10:00:00Z' },
    { id: '5', contactId: 'c5', type: 'deletion', status: 'rejected', requestedAt: '2024-03-11T10:00:00Z', notes: 'Legal retention requirement' },
  ];

  const filtered = mockRequests.filter((r) => statusFilter === 'all' || r.status === statusFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-semibold">GDPR Requests</h3>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px] h-9"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filtered.map((req, idx) => {
          const config = STATUS_CONFIG[req.status];
          const StatusIcon = config.icon;
          return (
            <motion.div key={req.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
              <Card className="border-border/50">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`h-4 w-4 ${config.color} ${req.status === 'processing' ? 'animate-spin' : ''}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{TYPE_LABELS[req.type] ?? req.type}</span>
                        <Badge variant={config.variant} className="text-xs">{req.status}</Badge>
                      </div>
                      {req.notes && <p className="text-xs text-muted-foreground mt-0.5">{req.notes}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Requested</p>
                      <p className="text-xs">{new Date(req.requestedAt).toLocaleDateString()}</p>
                    </div>
                    {req.status === 'pending' && (
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1"><Eye className="h-3 w-3" />Review</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
