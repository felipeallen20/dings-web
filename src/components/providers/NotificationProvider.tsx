"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AppNotification } from "@/types/notification";
import { DEFAULT_RESTAURANT_FILTERS } from "@/types/restaurant-filters";
import {
  buildMockNotifications,
  getReadNotificationIds,
  persistReadNotificationIds,
} from "@/services/notifications";
import { getRestaurants } from "@/services/restaurants";
import { useSession } from "@/components/providers/SessionProvider";

interface NotificationContextValue {
  notifications: AppNotification[];
  readIds: string[];
  unreadCount: number;
  isLoading: boolean;
  isOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { session } = useSession();
  const userId = session?.userId ?? "guest";

  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const isLoading = loadedUserId !== userId;

  useEffect(() => {
    let active = true;

    async function load() {
      const [restaurants, storedIds] = await Promise.all([
        getRestaurants(DEFAULT_RESTAURANT_FILTERS),
        getReadNotificationIds(userId),
      ]);

      if (!active) return;

      setNotifications(buildMockNotifications(restaurants, new Date()));
      setReadIds(storedIds);
      setLoadedUserId(userId);
    }

    void load();

    return () => {
      active = false;
    };
  }, [userId]);

  useEffect(() => {
    if (isLoading) return;
    void persistReadNotificationIds(userId, readIds);
  }, [isLoading, readIds, userId]);

  const openPanel = useCallback(() => setIsOpen(true), []);
  const closePanel = useCallback(() => setIsOpen(false), []);

  const markAsRead = useCallback((id: string) => {
    setReadIds((current) =>
      current.includes(id) ? current : [...current, id],
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setReadIds((current) => {
      const allIds = notifications.map((notification) => notification.id);
      return allIds.every((id) => current.includes(id)) ? current : allIds;
    });
  }, [notifications]);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !readIds.includes(item.id)).length,
    [notifications, readIds],
  );

  const value = useMemo(
    () => ({
      notifications,
      readIds,
      unreadCount,
      isLoading,
      isOpen,
      openPanel,
      closePanel,
      markAsRead,
      markAllAsRead,
    }),
    [
      closePanel,
      isLoading,
      isOpen,
      markAllAsRead,
      markAsRead,
      notifications,
      openPanel,
      readIds,
      unreadCount,
    ],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications debe usarse dentro de NotificationProvider",
    );
  }

  return context;
}