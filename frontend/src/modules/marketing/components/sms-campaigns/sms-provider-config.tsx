// @ts-nocheck
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check, Settings, AlertCircle } from 'lucide-react';

interface SmsProviderConfigProps {
  className?: string;
}

const PROVIDERS = [
  { id: 'twilio', name: 'Twilio', description: 'Cloud communications platform' },
  { id: 'vonage', name: 'Vonage', description: 'Nexmo API' },
  { id: 'messagebird', name: 'MessageBird', description: 'Omnichannel communication' },
  { id: 'clicksend', name: 'ClickSend', description: 'Business communications' },
];

export function SmsProviderConfig({ className }: SmsProviderConfigProps) {
  const [selectedProvider, setSelectedProvider] = useState('twilio');
  const [config, setConfig] = useState({
    accountSid: '',
    authToken: '',
    phoneNumber: '',
    webhookUrl: '',
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsConnected(true);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Settings className="h-4 w-4 text-muted-foreground" />
          SMS Gateway Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Provider Selection */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Provider</Label>
          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROVIDERS.map((provider) => (
                <SelectItem key={provider.id} value={provider.id}>
                  {provider.name} — {provider.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Configuration Fields */}
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Account SID</Label>
            <Input
              value={config.accountSid}
              onChange={(e) => setConfig((p) => ({ ...p, accountSid: e.target.value }))}
              placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="h-9 mt-1"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Auth Token</Label>
            <Input
              value={config.authToken}
              onChange={(e) => setConfig((p) => ({ ...p, authToken: e.target.value }))}
              placeholder="Your auth token"
              type="password"
              className="h-9 mt-1"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Phone Number</Label>
            <Input
              value={config.phoneNumber}
              onChange={(e) => setConfig((p) => ({ ...p, phoneNumber: e.target.value }))}
              placeholder="+1234567890"
              className="h-9 mt-1"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Webhook URL (optional)</Label>
            <Input
              value={config.webhookUrl}
              onChange={(e) => setConfig((p) => ({ ...p, webhookUrl: e.target.value }))}
              placeholder="https://your-app.com/webhook/sms"
              className="h-9 mt-1"
            />
          </div>
        </div>

        {/* Status */}
        {isConnected ? (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <Check className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Connected to {PROVIDERS.find((p) => p.id === selectedProvider)?.name}
            </span>
          </div>
        ) : (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="text-xs text-amber-700 dark:text-amber-300">
              SMS gateway is not configured. Please provide your credentials to enable SMS campaigns.
            </span>
          </div>
        )}

        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700"
          onClick={handleConnect}
          disabled={isConnecting || !config.accountSid || !config.authToken}
        >
          {isConnecting ? 'Connecting...' : isConnected ? 'Reconnect' : 'Connect'}
        </Button>
      </CardContent>
    </Card>
  );
}
