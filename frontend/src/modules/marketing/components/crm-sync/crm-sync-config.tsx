'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { RefreshCw, Database, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCrmSyncConfig, useUpdateCrmSyncConfig } from '@/modules/marketing/hooks/use-crm-sync';
import type { CrmSyncConfig } from '@/modules/marketing/types';

const CRM_TYPES = [
  { value: 'salesforce', label: 'Salesforce' },
  { value: 'hubspot', label: 'HubSpot' },
  { value: 'pipedrive', label: 'Pipedrive' },
  { value: 'zoho', label: 'Zoho CRM' },
  { value: 'dynamics', label: 'Dynamics 365' },
  { value: 'custom', label: 'Custom' },
];

interface CrmSyncConfigProps {
  config?: CrmSyncConfig;
  onSave?: (config: Partial<CrmSyncConfig>) => void;
}

export function CrmSyncConfig({ config: externalConfig, onSave }: CrmSyncConfigProps) {
  const { data: configData } = useCrmSyncConfig();
  const config = externalConfig ?? configData?.data;
  const updateConfig = useUpdateCrmSyncConfig();

  const [crmType, setCrmType] = useState(config?.crmType ?? 'hubspot');
  const [enabled, setEnabled] = useState(config?.enabled ?? false);
  const [syncFrequency, setSyncFrequency] = useState(config?.syncFrequency ?? 'daily');
  const [apiKey, setApiKey] = useState('');
  const [instanceUrl, setInstanceUrl] = useState('');

  const handleSave = () => {
    const payload = { crmType: crmType as CrmSyncConfig['crmType'], enabled, syncFrequency: syncFrequency as CrmSyncConfig['syncFrequency'] };
    updateConfig.mutate(payload as any);
    onSave?.(payload);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Database className="h-5 w-5 text-emerald-600" />
            CRM Sync Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div><p className="text-sm font-medium">Enable Sync</p><p className="text-xs text-muted-foreground">Automatically sync data with your CRM</p></div>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>

          <div className="space-y-2">
            <Label>CRM Platform</Label>
            <Select value={crmType} onValueChange={setCrmType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{CRM_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Instance URL</Label>
            <Input placeholder="https://your-crm.example.com" value={instanceUrl} onChange={(e) => setInstanceUrl(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>API Key / Token</Label>
            <Input type="password" placeholder="Enter API key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Sync Frequency</Label>
            <Select value={syncFrequency} onValueChange={setSyncFrequency}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSave} className="w-full"><Save className="h-4 w-4 mr-2" />Save Configuration</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
