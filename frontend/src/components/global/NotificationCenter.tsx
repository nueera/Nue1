'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Bell,
  X,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  CheckCheck,
  BellOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotificationStore, type Notification, type NotificationType } from '@/stores/useNotificationStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

/* ============================================================
   MODULE COLOR MAPPING
   ============================================================ */

const MODULE_ACCENT_MAP: Record<string, string> = {
  erp: 'var(--module-erp)',
  crm: 'var(--module-crm)',
  finance: 'var(--module-finance)',
  marketing: 'var(--module-marketing)',
  analytics: 'var(--module-analytics)',
  automation: 'var(--module-automation)',
  retention: 'var(--module-retention)',
  settings: 'var(--module-settings)',
};

function getModuleColor(moduleId?: string): string {
  if (!moduleId) return 'var(--module-erp)';
  return MODULE_ACCENT_MAP[moduleId] ?? 'var(--module-erp)';
}

/* ============================================================
   TYPE ICON MAP
   ============================================================ */

const TYPE_ICON_MAP: Record<NotificationType, React.ElementType> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const TYPE_COLOR_MAP: Record<NotificationType, string> = {
  success: 'text-status-success',
  error: 'text-status-danger',
  warning: 'text-status-warning',
  info: 'text-status-info',
};

/* ============================================================
   RELATIVE TIME
   ============================================================ */

function relativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

/* ============================================================
   NOTIFICATION BELL (for topbar)
   ============================================================ */

export function NotificationBell() {
  const { toggleDrawer, getUnreadCount, notifications } = useNotificationStore();
  const unreadCount = getUnreadCount();
  const prevCountRef = useRef(unreadCount);
  const [isWiggling, setIsWiggling] = useState(false);

  // Animate bell when new notifications arrive
  useEffect(() => {
    if (unreadCount > prevCountRef.current) {
      setIsWiggling(true);
      const timer = setTimeout(() => setIsWiggling(false), 600);
      return () => clearTimeout(timer);
    }
    prevCountRef.current = unreadCount;
  }, [unreadCount]);

  // Derive the most recent notification's module for badge accent color
  const latestModule = useMemo(() => {
    const latest = notifications.find((n) => !n.read && !n.dismissed);
    return latest?.moduleId;
  }, [notifications]);

  const badgeColor = getModuleColor(latestModule);

  return (
    <motion.button
      onClick={toggleDrawer}
      className={cn(
        'relative flex items-center justify-center h-9 w-9 rounded-lg',
        'text-muted-foreground hover:text-foreground hover:bg-accent/50',
        'transition-colors duration-150',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
      )}
      aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
      animate={isWiggling ? { rotate: [0, 15, -15, 10, -10, 0] } : { rotate: 0 }}
      transition={isWiggling ? { duration: 0.5, ease: 'easeInOut' } : { duration: 0 }}
    >
      <Bell className="h-[18px] w-[18px]" />
      <AnimatePresence>
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-h-[18px] min-w-[18px] px-1 rounded-full text-[10px] font-bold text-white leading-none"
            style={{ backgroundColor: badgeColor }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ============================================================
   NOTIFICATION ITEM
   ============================================================ */

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

function NotificationItem({ notification, onRead, onDismiss }: NotificationItemProps) {
  const router = useRouter();
  const Icon = TYPE_ICON_MAP[notification.type];
  const typeColor = TYPE_COLOR_MAP[notification.type];
  const moduleColor = getModuleColor(notification.moduleId);

  const handleClick = useCallback(() => {
    if (!notification.read) {
      onRead(notification.id);
    }
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  }, [notification, onRead, router]);

  const handleDismiss = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDismiss(notification.id);
    },
    [notification.id, onDismiss]
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 80, transition: { duration: 0.2 } }}
      className={cn(
        'group relative flex gap-3 p-3 rounded-lg cursor-pointer',
        'transition-colors duration-150',
        notification.read
          ? 'hover:bg-accent/30'
          : 'bg-accent/10 hover:bg-accent/50'
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      {/* Module accent bar */}
      <div
        className="w-[3px] shrink-0 rounded-full self-stretch"
        style={{ backgroundColor: moduleColor }}
      />

      {/* Type icon */}
      <div className="shrink-0 mt-0.5">
        <Icon className={cn('h-4 w-4', typeColor)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              'text-sm leading-snug',
              notification.read ? 'text-muted-foreground font-normal' : 'text-foreground font-medium'
            )}
          >
            {notification.title}
          </p>
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Unread dot */}
            {!notification.read && (
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: moduleColor }}
              />
            )}
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-accent/60"
              aria-label="Dismiss notification"
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
          {notification.message}
        </p>

        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] text-muted-foreground/70">
            {relativeTime(notification.timestamp)}
          </span>
          {notification.actionLabel && notification.actionUrl && (
            <span
              className="text-[10px] font-medium underline-offset-2 hover:underline"
              style={{ color: moduleColor }}
            >
              {notification.actionLabel}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   NOTIFICATION DRAWER (slide-in panel)
   ============================================================ */

export function NotificationDrawer() {
  const {
    drawerOpen,
    closeDrawer,
    notifications,
    markRead,
    markAllRead,
    dismissNotification,
    dismissAll,
    getUnreadCount,
  } = useNotificationStore();

  const isMobile = useIsMobile();
  const unreadCount = getUnreadCount();

  // Active (non-dismissed) notifications
  const activeNotifications = useMemo(
    () => notifications.filter((n) => !n.dismissed),
    [notifications]
  );

  // Group by module
  const groupedNotifications = useMemo(() => {
    const groups: Record<string, Notification[]> = {};
    for (const n of activeNotifications) {
      const key = n.moduleId ?? 'general';
      if (!groups[key]) groups[key] = [];
      groups[key].push(n);
    }
    return groups;
  }, [activeNotifications]);

  const moduleLabels: Record<string, string> = {
    erp: 'ERP',
    crm: 'CRM',
    finance: 'Finance',
    marketing: 'Marketing',
    analytics: 'Analytics',
    automation: 'Automation',
    retention: 'Retention',
    settings: 'Settings',
    general: 'General',
  };

  const drawerWidth = isMobile ? 'w-full' : 'w-[380px]';

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'fixed top-0 right-0 z-50 h-full',
              drawerWidth,
              'glass-surface-strong border-l border-glass-border',
              'flex flex-col'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border shrink-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
                {unreadCount > 0 && (
                  <span
                    className="flex items-center justify-center min-h-[18px] min-w-[18px] px-1 rounded-full text-[10px] font-bold text-white leading-none"
                    style={{ backgroundColor: 'var(--module-erp)' }}
                  >
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllRead}
                    className="h-7 text-xs gap-1 px-2"
                  >
                    <CheckCheck className="h-3 w-3" />
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeDrawer}
                  className="h-7 w-7"
                  aria-label="Close notifications"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Notification list */}
            <ScrollArea className="flex-1">
              <div className="p-2">
                <AnimatePresence mode="popLayout">
                  {activeNotifications.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-16 px-4 text-center"
                    >
                      <BellOff className="h-10 w-10 text-muted-foreground/30 mb-3" />
                      <p className="text-sm font-medium text-muted-foreground">
                        No notifications
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">
                        You&apos;re all caught up!
                      </p>
                    </motion.div>
                  ) : (
                    Object.entries(groupedNotifications).map(([moduleId, items]) => (
                      <div key={moduleId} className="mb-3">
                        {/* Module group header */}
                        <div className="flex items-center gap-2 px-3 py-1.5">
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: getModuleColor(moduleId === 'general' ? undefined : moduleId) }}
                          />
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {moduleLabels[moduleId] ?? moduleId}
                          </span>
                          <Separator className="flex-1" />
                        </div>

                        {/* Items */}
                        <div className="space-y-0.5">
                          <AnimatePresence mode="popLayout">
                            {items.map((n) => (
                              <NotificationItem
                                key={n.id}
                                notification={n}
                                onRead={markRead}
                                onDismiss={dismissNotification}
                              />
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </ScrollArea>

            {/* Footer */}
            {activeNotifications.length > 0 && (
              <div className="shrink-0 border-t border-glass-border px-4 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={dismissAll}
                  className="w-full text-xs text-muted-foreground hover:text-foreground"
                >
                  Dismiss all notifications
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   COMBINED EXPORT — Convenience wrapper
   ============================================================ */

export function NotificationCenter() {
  return (
    <>
      <NotificationBell />
      <NotificationDrawer />
    </>
  );
}

export default NotificationCenter;
