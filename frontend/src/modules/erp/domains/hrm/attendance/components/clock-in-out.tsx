'use client';

import { useState, useEffect } from 'react';
import { Clock, LogIn, LogOut, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';

interface ClockInOutProps {
  isCheckedIn: boolean;
  lastCheckIn?: string;
  onCheckIn: () => void;
  onCheckOut: () => void;
  isLoading?: boolean;
}

export function ClockInOut({ isCheckedIn, lastCheckIn, onCheckIn, onCheckOut, isLoading }: ClockInOutProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateString = currentTime.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const elapsed = (() => {
    if (!isCheckedIn || !lastCheckIn) return null;
    const checkInTime = new Date(lastCheckIn);
    const diffMs = currentTime.getTime() - checkInTime.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  })();

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
      {/* Time Display */}
      <div className="mb-4">
        <p className="text-4xl font-bold text-foreground font-mono tracking-wider">{timeString}</p>
        <p className="text-sm text-muted-foreground mt-1">{dateString}</p>
      </div>

      {/* Status */}
      <div className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5',
        isCheckedIn
          ? 'bg-green-500/10 text-green-500 border border-green-500/20'
          : 'bg-white/5 text-muted-foreground border border-white/10'
      )}>
        {isCheckedIn ? (
          <>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Checked In
          </>
        ) : (
          <>
            <Coffee className="h-3.5 w-3.5" />
            Not Checked In
          </>
        )}
      </div>

      {/* Elapsed Time */}
      {elapsed && (
        <div className="mb-5 p-3 rounded-xl bg-module-erp/5 border border-module-erp/15">
          <p className="text-xs text-muted-foreground mb-1">Working Time</p>
          <p className="text-2xl font-bold font-mono text-module-erp">{elapsed}</p>
        </div>
      )}

      {/* Action Button */}
      {isCheckedIn ? (
        <Button
          onClick={() => setShowConfirm(true)}
          disabled={isLoading}
          className="w-full bg-red-500/15 text-red-500 hover:bg-red-500/25 border border-red-500/20 font-medium"
          size="lg"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Check Out
        </Button>
      ) : (
        <Button
          onClick={onCheckIn}
          disabled={isLoading}
          className="w-full bg-green-500/15 text-green-500 hover:bg-green-500/25 border border-green-500/20 font-medium"
          size="lg"
        >
          <LogIn className="h-5 w-5 mr-2" />
          Check In
        </Button>
      )}

      {/* Last Check-in Info */}
      {lastCheckIn && !isCheckedIn && (
        <p className="text-xs text-muted-foreground mt-3">
          Last check-in: {new Date(lastCheckIn).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
        </p>
      )}

      {/* Check-out Confirmation */}
      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="Confirm Check Out"
        description="Are you sure you want to check out now?"
        confirmLabel="Check Out"
        variant="default"
        onConfirm={() => {
          onCheckOut();
          setShowConfirm(false);
        }}
        isLoading={isLoading}
      />
    </div>
  );
}
