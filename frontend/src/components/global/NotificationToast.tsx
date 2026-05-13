'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useNotificationStore,
  type Notification,
  type NotificationType,
} from '@/stores/useNotificationStore';

/* ============================================================
   CONSTANTS
   ============================================================ */

const AUTO_DISMISS_MS = 4000;
const MAX_VISIBLE_TOASTS = 3;

/* ============================================================
   TYPE CONFIG
   ============================================================ */

const TYPE_ICON_MAP: Record<NotificationType, React.ElementType> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const TYPE_BG_TINT: Record<NotificationType, string> = {
  success: 'border-status-success/30 bg-status-success/5',
  error: 'border-status-danger/30 bg-status-danger/5',
  warning: 'border-status-warning/30 bg-status-warning/5',
  info: 'border-status-info/30 bg-status-info/5',
};

const TYPE_ICON_COLOR: Record<NotificationType, string> = {
  success: 'text-status-success',
  error: 'text-status-danger',
  warning: 'text-status-warning',
  info: 'text-status-info',
};

/* ============================================================
   MODULE COLOR MAP (for progress bar)
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
   SINGLE TOAST
   ============================================================ */

interface ToastItemProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

function ToastItem({ notification, onDismiss }: ToastItemProps) {
  const [progress, setProgress] = useState(100);
  const startTimeRef = useRef(Date.now());
  const rafRef = useRef<number>(0);

  const Icon = TYPE_ICON_MAP[notification.type];
  const bgTint = TYPE_BG_TINT[notification.type];
  const iconColor = TYPE_ICON_COLOR[notification.type];
  const accentColor = getModuleColor(notification.moduleId);

  const handleDismiss = useCallback(() => {
    onDismiss(notification.id);
  }, [notification.id, onDismiss]);

  // Auto-dismiss timer
  useEffect(() => {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / AUTO_DISMISS_MS) * 100);
      setProgress(remaining);

      if (remaining > 0) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        onDismiss(notification.id);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    startTimeRef.current = startTime;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [notification.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={cn(
        'relative overflow-hidden rounded-lg border shadow-theme-md',
        'glass-surface',
        bgTint,
        'w-[340px] max-w-[calc(100vw-2rem)]'
      )}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]">
        <div
          className="h-full transition-none"
          style={{
            width: `${progress}%`,
            backgroundColor: accentColor,
            opacity: 0.7,
          }}
        />
      </div>

      <div className="flex items-start gap-2.5 p-3">
        {/* Type icon */}
        <Icon className={cn('h-4 w-4 shrink-0 mt-0.5', iconColor)} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground leading-snug">
            {notification.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
            {notification.message}
          </p>
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="shrink-0 p-0.5 rounded hover:bg-accent/50 transition-colors"
          aria-label="Dismiss toast"
        >
          <X className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    </motion.div>
  );
}

/* ============================================================
   NOTIFICATION TOAST CONTAINER
   ============================================================ */

export function NotificationToast() {
  const { notifications, dismissNotification } = useNotificationStore();
  const [visibleToasts, setVisibleToasts] = useState<Notification[]>([]);
  const prevCountRef = useRef(0);
  const shownIdsRef = useRef<Set<string>>(new Set());

  // Listen for new notifications and show them as toasts
  useEffect(() => {
    const newNotifications = notifications.filter(
      (n) => !n.dismissed && !shownIdsRef.current.has(n.id)
    );

    if (newNotifications.length > 0) {
      // Mark as shown so we don't re-toast them
      newNotifications.forEach((n) => shownIdsRef.current.add(n.id));

      setVisibleToasts((prev) => {
        const updated = [...newNotifications, ...prev].slice(0, MAX_VISIBLE_TOASTS);
        return updated;
      });
    }

    prevCountRef.current = notifications.length;
  }, [notifications]);

  // Clean up shown IDs when dismissed
  useEffect(() => {
    const dismissedIds = new Set(
      notifications.filter((n) => n.dismissed).map((n) => n.id)
    );
    dismissedIds.forEach((id) => shownIdsRef.current.delete(id));
  }, [notifications]);

  const handleDismiss = useCallback(
    (id: string) => {
      setVisibleToasts((prev) => prev.filter((t) => t.id !== id));
      dismissNotification(id);
    },
    [dismissNotification]
  );

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col-reverse gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {visibleToasts.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <ToastItem
              notification={notification}
              onDismiss={handleDismiss}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default NotificationToast;
