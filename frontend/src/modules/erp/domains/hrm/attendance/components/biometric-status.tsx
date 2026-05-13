'use client';

import { useState, useEffect } from 'react';
import { Fingerprint, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BiometricStatusProps {
  isConnected?: boolean;
  lastSyncTime?: string;
  deviceName?: string;
  deviceId?: string;
  onReconnect?: () => void;
  className?: string;
}

export function BiometricStatus({
  isConnected = false,
  lastSyncTime,
  deviceName = 'Biometric Device',
  deviceId,
  onReconnect,
  className,
}: BiometricStatusProps) {
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [timeSinceSync, setTimeSinceSync] = useState<string>('');

  useEffect(() => {
    if (!lastSyncTime) return;

    const calculateTimeSince = () => {
      const syncTime = new Date(lastSyncTime);
      const now = new Date();
      const diffMs = now.getTime() - syncTime.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ${diffMins % 60}m ago`;
      return `${diffDays}d ago`;
    };

    setTimeSinceSync(calculateTimeSince());
    const timer = setInterval(() => setTimeSinceSync(calculateTimeSince()), 60000);
    return () => clearInterval(timer);
  }, [lastSyncTime]);

  const handleReconnect = () => {
    setIsReconnecting(true);
    onReconnect?.();
    setTimeout(() => setIsReconnecting(false), 3000);
  };

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Device Icon */}
          <div className={cn(
            'flex items-center justify-center w-10 h-10 rounded-xl',
            isConnected ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
          )}>
            <Fingerprint className="h-5 w-5" strokeWidth={1.8} />
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-foreground">{deviceName}</p>
              <div className={cn(
                'flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                isConnected
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                  : 'bg-red-500/10 text-red-500 border border-red-500/20'
              )}>
                {isConnected ? (
                  <>
                    <Wifi className="h-3 w-3" />
                    Connected
                  </>
                ) : (
                  <>
                    <WifiOff className="h-3 w-3" />
                    Disconnected
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              {deviceId && (
                <span className="text-xs text-muted-foreground font-mono">ID: {deviceId}</span>
              )}
              {lastSyncTime && (
                <span className="text-xs text-muted-foreground">
                  Last sync: {timeSinceSync}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Reconnect Button */}
        {!isConnected && onReconnect && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReconnect}
            disabled={isReconnecting}
            className="text-xs"
          >
            <RefreshCw className={cn('h-3 w-3 mr-1', isReconnecting && 'animate-spin')} />
            {isReconnecting ? 'Reconnecting...' : 'Reconnect'}
          </Button>
        )}
      </div>

      {/* Connection Pulse Animation */}
      {isConnected && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="w-2 h-2 rounded-full bg-green-500/40 absolute top-0 left-0 animate-ping" />
            </div>
            <span className="text-xs text-muted-foreground">Active and syncing</span>
          </div>
        </div>
      )}
    </div>
  );
}
