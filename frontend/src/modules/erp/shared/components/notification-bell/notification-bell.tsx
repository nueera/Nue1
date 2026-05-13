'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationBellProps {
  unreadCount?: number;
  onClick?: () => void;
}

export function NotificationBell({ unreadCount = 0, onClick }: NotificationBellProps) {
  return (
    <Button variant="ghost" size="icon" className="relative h-8 w-8 press-scale" onClick={onClick} aria-label="Notifications">
      <Bell className="h-4 w-4" strokeWidth={1.8} />
      {unreadCount > 0 && (
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-module-erp/80 pointer-events-none" />
      )}
    </Button>
  );
}
