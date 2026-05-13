import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* ============================================================
   NOTIFICATION TYPES
   ============================================================ */

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  moduleId?: string;
  timestamp: number;
  read: boolean;
  dismissed: boolean;
  actionLabel?: string;
  actionUrl?: string;
}

export type NotificationInput = Omit<Notification, 'id' | 'timestamp' | 'read' | 'dismissed'>;

/* ============================================================
   NOTIFICATION STORE STATE
   ============================================================ */

const MAX_NOTIFICATIONS = 50;

interface NotificationState {
  notifications: Notification[];
  drawerOpen: boolean;

  // Actions
  addNotification: (partial: NotificationInput) => string;
  markRead: (id: string) => void;
  markAllRead: () => void;
  dismissNotification: (id: string) => void;
  dismissAll: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  getUnreadCount: () => number;
  getByModule: (moduleId: string) => Notification[];
}

/* ============================================================
   ID GENERATOR
   ============================================================ */

let idCounter = 0;
const generateId = (): string => {
  idCounter += 1;
  return `notif-${Date.now()}-${idCounter.toString(36)}`;
};

/* ============================================================
   NOTIFICATION STORE
   ============================================================ */

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      drawerOpen: false,

      addNotification: (partial) => {
        const id = generateId();
        const notification: Notification = {
          ...partial,
          id,
          timestamp: Date.now(),
          read: false,
          dismissed: false,
        };

        set((state) => {
          const updated = [notification, ...state.notifications].slice(0, MAX_NOTIFICATIONS);
          return { notifications: updated };
        });

        return id;
      },

      markRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      dismissNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, dismissed: true, read: true } : n
          ),
        }));
      },

      dismissAll: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            dismissed: true,
            read: true,
          })),
        }));
      },

      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),

      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.read && !n.dismissed).length;
      },

      getByModule: (moduleId) => {
        return get().notifications.filter(
          (n) => n.moduleId === moduleId && !n.dismissed
        );
      },
    }),
    {
      name: 'nueone-notification-store',
      partialize: (state) => ({
        notifications: state.notifications.slice(0, MAX_NOTIFICATIONS),
        drawerOpen: state.drawerOpen,
      }),
    }
  )
);
