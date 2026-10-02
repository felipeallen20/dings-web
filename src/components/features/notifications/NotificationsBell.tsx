"use client";

import { useRef } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useNotifications } from "@/components/providers/NotificationProvider";
import { Sheet } from "@/components/ui/Sheet";
import { iconButtonClass } from "@/components/ui/iconButton";
import { NotificationsFeed } from "./NotificationsFeed";
import { NotificationsPanel } from "./NotificationsPanel";

export function NotificationsBell() {
  const { unreadCount, isOpen, openPanel, closePanel, markAllAsRead } =
    useNotifications();
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, closePanel, isOpen);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => (isOpen ? closePanel() : openPanel())}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={
          unreadCount > 0
            ? `Notificaciones, ${unreadCount} sin leer`
            : "Notificaciones"
        }
        className={iconButtonClass}
      >
        <Bell className="size-5" aria-hidden />

        {unreadCount > 0 && (
          <span className="pointer-events-none absolute right-1.5 top-1.5 flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2.5 rounded-full bg-primary ring-2 ring-surface" />
          </span>
        )}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Notificaciones"
          className="absolute right-0 top-full z-50 mt-2 hidden w-[min(92vw,380px)] overflow-hidden rounded-xl border border-border bg-surface shadow-hover md:block"
        >
          <NotificationsPanel onNavigate={closePanel} />
        </div>
      )}

      <div className="md:hidden">
        <Sheet
          isOpen={isOpen}
          onClose={closePanel}
          title="Notificaciones"
          footer={
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-4 text-label-lg text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:bg-border disabled:text-text-secondary"
              >
                Marcar todas como leídas
              </button>

              <Link
                href="/notificaciones"
                onClick={closePanel}
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-surface px-4 text-label-lg text-neutral transition-colors hover:bg-canvas-muted hover:border-border-strong focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Ver todas las notificaciones
              </Link>
            </div>
          }
        >
          <NotificationsFeed onNavigate={closePanel} />
        </Sheet>
      </div>
    </div>
  );
}