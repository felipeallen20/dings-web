"use client";

import { useState } from "react";
import { useNotifications } from "@/components/providers/NotificationProvider";
import {
  NotificationList,
  NotificationListSkeleton,
} from "./NotificationList";

interface NotificationsFeedProps {
  onNavigate?: () => void;
}

export function NotificationsFeed({ onNavigate }: NotificationsFeedProps) {
  const { notifications, readIds, markAsRead, isLoading } = useNotifications();
  const [now] = useState(() => new Date());

  if (isLoading) return <NotificationListSkeleton />;

  return (
    <NotificationList
      notifications={notifications}
      readIds={readIds}
      now={now}
      onRead={markAsRead}
      onNavigate={onNavigate}
    />
  );
}