'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, CheckCircle2, XCircle, Clock, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCrmSyncConfig } from '@/modules/marketing/hooks';

export function CrmSyncStatus() {
  const { data: configData } = useCrmSyncConfig();

  const syncInfo = {
    status: 'connected',
    lastSync: '2024-03-15T10:30:00Z',
    nextSync: '2024-03-16T10:30:00Z',
    recordsSynced: 45280,
    errors: 3,
    crmType: 'HubSpot',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Sync Status</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Connection', value: syncInfo.status, icon: CheckCircle2, color: syncInfo.status === 'connected' ? 'text-emerald-600' : 'text-red-600' },
          { label: 'CRM', value: syncInfo.crmType, icon: Activity, color: 'text-blue-600' },
          { label: 'Records Synced', value: syncInfo.recordsSynced.toLocaleString(), icon: CheckCircle2, color: 'text-emerald-600' },
          { label: 'Errors', value: syncInfo.errors.toString(), icon: XCircle, color: 'text-red-600' },
        ].map((item, idx) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-3">
                <item.icon className={`h-4 w-4 ${item.color} mb-1`} />
                <p className="text-sm font-bold tabular-nums">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Sync</span>
            <span className="text-sm">{new Date(syncInfo.lastSync).toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Next Scheduled Sync</span>
            <span className="text-sm">{new Date(syncInfo.nextSync).toLocaleString()}</span>
          </div>
          <Button variant="outline" className="w-full" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />Sync Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
