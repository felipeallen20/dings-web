"use client";

import Link from "next/link";
import { BellOff, Info, Percent, Receipt, type LucideIcon } from "lucide-react";
import type { AppNotification, NotificationKind } from "@/types/notification";
import { formatNotificationTime } from "@/services/notifications";

const KIND_META: Record<
  NotificationKind,
  { icon: LucideIcon; chip: string; label: string }
> = {
  pedido: {
    icon: Receipt,
    chip: "bg-primary/10 text-primary",
    label: "Pedido",
  },
  promo: {
    icon: Percent,
    chip: "bg-secondary/10 text-secondary-hover",
    label: "Promoción",
  },
  sistema: {
    icon: Info,
    chip: "bg-tertiary/10 text-tertiary-strong",
    label: "Cuenta",
  },
};

export function NotificationListSkeleton() {
  return (
    <ul className="divide-y divide-border" aria-hidden>
      {[0, 1, 2, 3].map((index) => (
        <li key={index} className="flex items-start gap-3 px-4 py-3.5">
          <span className="size-9 shrink-0 animate-pulse rounded-full bg-canvas-muted" />
          <span className="flex min-w-0 flex-1 flex-col gap-2 pt-1">
            <span className="h-3.5 w-2/3 animate-pulse rounded bg-canvas-muted" />
            <span className="h-3 w-full animate-pulse rounded bg-canvas-muted" />
          </span>
        </li>
      ))}
    </ul>
  );
}

interface NotificationListProps {
  notifications: AppNotification[];
  readIds: string[];
  now: Date;
  onRead: (id: string) => void;
  onNavigate?: () => void;
  emptyTitle?: string;
  emptyBody?: string;
}

export function NotificationList({
  notifications,
  readIds,
  now,
  onRead,
  onNavigate,
  emptyTitle = "Todo al día",
  emptyBody = "Aquí te avisaremos cuando tengas novedades de tus pedidos.",
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-canvas-muted text-text-secondary">
          <BellOff className="size-7" aria-hidden />
        </span>
        <p className="text-title-md text-neutral">{emptyTitle}</p>
        <p className="max-w-[38ch] text-body-sm text-text-secondary">
          {emptyBody}
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {notifications.map((notification) => {
        const { icon: Icon, chip, label } = KIND_META[notification.kind];
        const isRead = readIds.includes(notification.id);

        const content = (
          <>
            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-full ${chip}`}
            >
              <Icon className="size-4" aria-hidden />
            </span>

            <span className="flex min-w-0 flex-1 flex-col">
              <span className="flex items-start gap-2">
                <span className="min-w-0 flex-1 text-label-lg text-neutral">
                  <span className="sr-only">{label}: </span>
                  {notification.title}
                </span>

                <span className="shrink-0 pt-px text-label-sm text-text-secondary tabular-nums">
                  {formatNotificationTime(notification.createdAt, now)}
                </span>
              </span>

              <span className="mt-1 text-body-sm text-text-secondary">
                {notification.body}
              </span>
            </span>

            {!isRead && (
              <span className="mt-2 size-2 shrink-0 rounded-full bg-primary">
                <span className="sr-only">Sin leer</span>
              </span>
            )}
          </>
        );

        const rowClassName = `flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors focus-visible:bg-canvas-muted focus-visible:outline-none hover:bg-canvas-muted ${
          isRead ? "bg-surface" : "bg-primary/[0.04]"
        }`;

        return (
          <li key={notification.id}>
            {notification.href ? (
              <Link
                href={notification.href}
                onClick={() => {
                  onRead(notification.id);
                  onNavigate?.();
                }}
                className={rowClassName}
              >
                {content}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => onRead(notification.id)}
                className={rowClassName}
              >
                {content}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}