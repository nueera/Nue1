// @ts-nocheck
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { SocialAccount } from '@/modules/marketing/types';
import { Link2, Unlink, RefreshCw, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface SocialAccountConnectProps {
  accounts?: SocialAccount[];
  onConnect?: (platform: string) => void;
  onDisconnect?: (accountId: string) => void;
  onRefresh?: (accountId: string) => void;
  className?: string;
}

const PLATFORMS = [
  { key: 'facebook', name: 'Facebook', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', icon: 'f' },
  { key: 'instagram', name: 'Instagram', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300', icon: '📷' },
  { key: 'linkedin', name: 'LinkedIn', color: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300', icon: 'in' },
  { key: 'twitter', name: 'Twitter/X', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300', icon: '𝕏' },
];

const MOCK_ACCOUNTS: SocialAccount[] = [
  { id: '1', platform: 'facebook', accountName: 'Acme Corp', accountId: 'acmecorp', followers: 15420, connectedAt: '2024-01-15', status: 'connected' },
  { id: '2', platform: 'instagram', accountName: '@acmecorp', accountId: 'acmecorp', followers: 8930, connectedAt: '2024-01-15', status: 'connected' },
  { id: '3', platform: 'linkedin', accountName: 'Acme Corp', accountId: 'acme-corp', followers: 5200, connectedAt: '2024-02-01', status: 'expired' },
];

export function SocialAccountConnect({ accounts = MOCK_ACCOUNTS, onConnect, onDisconnect, onRefresh, className }: SocialAccountConnectProps) {
  const connectedPlatforms = accounts.map((a) => a.platform);

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Link2 className="h-4 w-4 text-muted-foreground" />
          Connected Accounts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {PLATFORMS.map((platform) => {
          const account = accounts.find((a) => a.platform === platform.key);
          const isConnected = !!account && account.status === 'connected';
          const isExpired = account?.status === 'expired';

          return (
            <motion.div
              key={platform.key}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-3 rounded-lg border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className={cn('flex items-center justify-center h-9 w-9 rounded-lg text-sm font-bold', platform.color)}>
                  {platform.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{platform.name}</p>
                  {account && (
                    <p className="text-xs text-muted-foreground">
                      {account.accountName} · {account.followers.toLocaleString()} followers
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isConnected && (
                  <Badge className="text-[10px] gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" /> Connected
                  </Badge>
                )}
                {isExpired && (
                  <Badge className="text-[10px] gap-1 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                    <AlertCircle className="h-3 w-3" /> Expired
                  </Badge>
                )}
                {!account && (
                  <Button size="sm" className="text-xs h-7 bg-emerald-600 hover:bg-emerald-700" onClick={() => onConnect?.(platform.key)}>
                    <ExternalLink className="h-3 w-3 mr-1" /> Connect
                  </Button>
                )}
                {isConnected && (
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onRefresh?.(account.id)}>
                    <RefreshCw className="h-3.5 w-3.5" />
                  </Button>
                )}
                {account && (
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onDisconnect?.(account.id)}>
                    <Unlink className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
