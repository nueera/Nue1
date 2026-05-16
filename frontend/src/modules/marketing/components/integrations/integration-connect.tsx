'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link2, Loader2, CheckCircle2, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface IntegrationConnectProps {
  integrationName?: string;
  onConnected?: () => void;
  onCancel?: () => void;
}

export function IntegrationConnect({ integrationName, onConnected, onCancel }: IntegrationConnectProps) {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => { setConnecting(false); setConnected(true); setTimeout(() => onConnected?.(), 1000); }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Link2 className="h-5 w-5 text-emerald-600" />
              Connect {integrationName ?? 'Integration'}
            </CardTitle>
            {onCancel && <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCancel}><X className="h-4 w-4" /></Button>}
          </div>
        </CardHeader>
        <CardContent>
          {connected ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
              <h3 className="text-lg font-semibold">Connected!</h3>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>API Key / Access Token</Label>
                <Input type="password" placeholder="Enter your API key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
              </div>
              <Button onClick={handleConnect} disabled={!apiKey || connecting} className="w-full">
                {connecting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Connecting...</> : <><Link2 className="h-4 w-4 mr-2" />Connect</>}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
