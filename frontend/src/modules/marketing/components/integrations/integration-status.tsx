'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, CheckCircle2, XCircle, RefreshCw, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface IntegrationStatusProps {
  integrationName?: string;
}

export function IntegrationStatus({ integrationName }: IntegrationStatusProps) {
  const integrations = [
    { name: 'Salesforce', status: 'connected' as const, lastSync: '2024-03-15T10:30:00Z', records: 45280, errors: 0 },
    { name: 'Google Analytics', status: 'connected' as const, lastSync: '2024-03-15T09:00:00Z', records: 0, errors: 0 },
    { name: 'Shopify', status: 'connected' as const, lastSync: '2024-03-15T08:00:00Z', records: 12850, errors: 2 },
    { name: 'Twitter', status: 'error' as const, lastSync: '2024-03-14T10:00:00Z', records: 0, errors: 15 },
    { name: 'Slack', status: 'disconnected' as const, lastSync: undefined, records: 0, errors: 0 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Integration Status</h3>
      </div>

      <div className="space-y-2">
        {integrations.map((integration, idx) => (
          <motion.div key={integration.name} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-muted">
                    {integration.status === 'connected' ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : integration.status === 'error' ? (
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{integration.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {integration.lastSync ? `Last sync: ${new Date(integration.lastSync).toLocaleString()}` : 'Not connected'}
                      {integration.errors > 0 && ` · ${integration.errors} errors`}
                    </p>
                  </div>
                  <Badge variant={integration.status === 'connected' ? 'default' : integration.status === 'error' ? 'destructive' : 'secondary'} className="text-xs">
                    {integration.status}
                  </Badge>
                  {integration.status === 'connected' && (
                    <Button variant="ghost" size="icon" className="h-7 w-7"><RefreshCw className="h-3.5 w-3.5" /></Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
