// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface IntegrationConfigProps {
  integrationName?: string;
  onSave?: (config: Record<string, unknown>) => void;
}

export function IntegrationConfig({ integrationName, onSave }: IntegrationConfigProps) {
  const [syncContacts, setSyncContacts] = useState(true);
  const [syncCompanies, setSyncCompanies] = useState(true);
  const [syncDeals, setSyncDeals] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [syncFrequency, setSyncFrequency] = useState('daily');

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5 text-emerald-600" />
            {integrationName ?? 'Integration'} Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div><p className="text-sm font-medium">Sync Contacts</p><p className="text-xs text-muted-foreground">Automatically sync contact data</p></div>
              <Switch checked={syncContacts} onCheckedChange={setSyncContacts} />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div><p className="text-sm font-medium">Sync Companies</p><p className="text-xs text-muted-foreground">Keep company data in sync</p></div>
              <Switch checked={syncCompanies} onCheckedChange={setSyncCompanies} />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div><p className="text-sm font-medium">Sync Deals</p><p className="text-xs text-muted-foreground">Sync deal/opportunity data</p></div>
              <Switch checked={syncDeals} onCheckedChange={setSyncDeals} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Webhook URL</Label>
            <Input placeholder="https://..." value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
          </div>

          <Button onClick={() => onSave?.({ syncContacts, syncCompanies, syncDeals, webhookUrl, syncFrequency })} className="w-full">
            <Save className="h-4 w-4 mr-2" />Save Configuration
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
