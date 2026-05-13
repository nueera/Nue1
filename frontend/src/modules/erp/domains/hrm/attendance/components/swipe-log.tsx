'use client';

import { LogIn, LogOut, Fingerprint, Smartphone, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SwipeLog } from '../types';

interface SwipeLogProps {
  logs: SwipeLog[];
  isLoading?: boolean;
}

const SOURCE_ICONS: Record<SwipeLog['source'], React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  biometric: Fingerprint,
  mobile: Smartphone,
  web: Globe,
};

const SOURCE_COLORS: Record<SwipeLog['source'], string> = {
  biometric: 'bg-purple-500/10 text-purple-500',
  mobile: 'bg-blue-500/10 text-blue-500',
  web: 'bg-teal-500/10 text-teal-500',
};

export function SwipeLogTable({ logs, isLoading }: SwipeLogProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-14 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Fingerprint className="h-10 w-10 text-muted-foreground/20 mb-4" />
        <p className="text-sm font-medium text-muted-foreground">No swipe logs</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Swipe entries will appear here when available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-foreground">Swipe Log</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{logs.length} entries</p>
      </div>

      {/* Log Entries */}
      <div className="divide-y divide-white/5 max-h-96 overflow-y-auto">
        {logs.map((log) => {
          const isIn = log.direction === 'in';
          const SourceIcon = SOURCE_ICONS[log.source];
          const sourceColor = SOURCE_COLORS[log.source];

          return (
            <div
              key={log.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors duration-150"
            >
              {/* Direction Indicator */}
              <div className={cn(
                'flex items-center justify-center w-8 h-8 rounded-lg shrink-0',
                isIn ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
              )}>
                {isIn ? <LogIn className="h-4 w-4" /> : <LogOut className="h-4 w-4" />}
              </div>

              {/* Time */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn('text-xs font-medium uppercase', isIn ? 'text-green-500' : 'text-red-500')}>
                    {log.direction}
                  </span>
                  <span className="text-sm font-mono text-foreground">
                    {new Date(log.timestamp).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {new Date(log.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>

              {/* Source */}
              <div className={cn('flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium', sourceColor)}>
                <SourceIcon className="h-3 w-3" />
                <span className="capitalize hidden sm:inline">{log.source}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
