"use client";

import Link from "next/link";
import { CheckCheck, ChevronRight } from "lucide-react";
import { useNotifications } from "@/components/providers/NotificationProvider";
import { NotificationsFeed } from "./NotificationsFeed";

interface NotificationsPanelProps {
  onNavigate?: () => void;
}

export function NotificationsPanel({ onNavigate }: NotificationsPanelProps) {
  const { unreadCount, markAllAsRead } = useNotifications();

  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h2 className="text-title-xs text-neutral">
          Notificaciones
          {unreadCount > 0 && (
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 align-middle text-label-md text-primary">
              Nuevas
            </span>
          )}
        </h2>

        <button
          type="button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-label-md text-primary transition-colors hover:bg-canvas-muted hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:text-placeholder"
        >
          <CheckCheck className="size-4" aria-hidden />
          Marcar leídas
        </button>
      </header>

      <div className="max-h-[min(64vh,26rem)] overflow-y-auto">
        <NotificationsFeed onNavigate={onNavigate} />
      </div>

      <footer className="border-t border-border p-2">
        <Link
          href="/notificaciones"
          onClick={onNavigate}
          className="flex min-h-11 items-center justify-center gap-1 rounded-lg px-3 text-label-lg text-neutral transition-colors hover:bg-canvas-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          Ver todas las notificaciones
          <ChevronRight className="size-4" aria-hidden />
        </Link>
      </footer>
    </div>
  );
}