'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Store, Link2, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useConnectStore } from '@/modules/marketing/hooks/use-ecommerce';

const PLATFORMS = [
  { value: 'shopify', label: 'Shopify' },
  { value: 'woocommerce', label: 'WooCommerce' },
  { value: 'magento', label: 'Magento' },
  { value: 'bigcommerce', label: 'BigCommerce' },
  { value: 'custom', label: 'Custom' },
];

interface StoreConnectProps {
  onConnected?: () => void;
  onCancel?: () => void;
}

export function StoreConnect({ onConnected, onCancel }: StoreConnectProps) {
  const connectStore = useConnectStore();
  const [platform, setPlatform] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [storeName, setStoreName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    if (!platform || !storeUrl) return;
    setConnecting(true);
    // Simulate OAuth flow
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      connectStore.mutate({ platform, domain: storeUrl, name: storeName } as any);
      setTimeout(() => onConnected?.(), 1000);
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <Card className="border-border/50 max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Store className="h-5 w-5 text-emerald-600" />
            Connect E-Commerce Store
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {connected ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
              <h3 className="text-lg font-semibold">Store Connected!</h3>
              <p className="text-sm text-muted-foreground mt-1">Your store has been successfully connected.</p>
            </motion.div>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" placeholder="My Store" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-url">Store URL</Label>
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input id="store-url" placeholder="https://mystore.com" value={storeUrl} onChange={(e) => setStoreUrl(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key / Access Token</Label>
                <Input id="api-key" type="password" placeholder="Enter your API key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
                <p className="text-xs text-muted-foreground">Found in your store admin under API/Apps settings.</p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button onClick={handleConnect} disabled={!platform || !storeUrl || connecting}>
                  {connecting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Link2 className="h-4 w-4 mr-2" />
                      Connect Store
                    </>
                  )}
                </Button>
                {onCancel && (
                  <Button variant="outline" onClick={onCancel}>Cancel</Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
