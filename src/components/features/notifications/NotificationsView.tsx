"use client";

import { useMemo, useState } from "react";
import { CheckCheck } from "lucide-react";
import type { NotificationKind } from "@/types/notification";
import { useNotifications } from "@/components/providers/NotificationProvider";
import {
  NotificationList,
  NotificationListSkeleton,
} from "./NotificationList";

type FilterId = "todas" | NotificationKind;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "pedido", label: "Pedidos" },
  { id: "promo", label: "Promociones" },
  { id: "sistema", label: "Cuenta" },
];

const EMPTY_COPY: Record<FilterId, { title: string; body: string }> = {
  todas: {
    title: "Todo al día",
    body: "Aquí te avisaremos cuando tengas novedades de tus pedidos.",
  },
  pedido: {
    title: "Sin novedades de pedidos",
    body: "Te escribimos cuando tu pedido avance o sea entregado.",
  },
  promo: {
    title: "Sin promociones",
    body: "Los descuentos de tus restaurantes favoritos llegan aquí.",
  },
  sistema: {
    title: "Sin novedades de cuenta",
    body: "Aquí verás avisos de perfil, pedidos y seguridad.",
  },
};

export function NotificationsView() {
  const {
    notifications,
    readIds,
    unreadCount,
    markAsRead,
    markAllAsRead,
    isLoading,
  } = useNotifications();
  const [filter, setFilter] = useState<FilterId>("todas");
  const [now] = useState(() => new Date());

  const counts = useMemo(() => {
    const result: Record<FilterId, number> = {
      todas: notifications.length,
      pedido: 0,
      promo: 0,
      sistema: 0,
    };

    for (const notification of notifications) {
      result[notification.kind] += 1;
    }

    return result;
  }, [notifications]);

  const visible = useMemo(
    () =>
      filter === "todas"
        ? notifications
        : notifications.filter((notification) => notification.kind === filter),
    [filter, notifications],
  );

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border bg-surface sm:gap-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5 sm:gap-1">
          <h2 className="text-title-sm text-neutral sm:text-headline-md">
            Bandeja de entrada
          </h2>
          <p className="text-caption text-text-secondary sm:text-body-md">
            Avisos de tus pedidos, promociones y cuenta.
          </p>
        </div>

        <button
          type="button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-label-md text-neutral transition-colors hover:bg-canvas-muted hover:border-border-strong focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:text-placeholder"
        >
          <CheckCheck className="size-4" aria-hidden />
          Marcar leídas
        </button>
      </div>

      <div
        role="tablist"
        aria-label="Notificaciones por tipo"
        className="flex gap-1 overflow-x-auto rounded-lg bg-canvas-muted p-1 no-scrollbar"
      >
        {FILTERS.map((item) => {
          const isActive = filter === item.id;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(item.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-caption transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:py-2 sm:text-label-lg ${
                isActive
                  ? "bg-surface text-neutral shadow-float"
                  : "text-text-secondary hover:text-neutral"
              }`}
            >
              {item.label}
              <span
                className={`rounded-full px-1.5 text-caption tabular-nums ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "bg-border text-text-secondary"
                }`}
              >
                {counts[item.id]}
              </span>
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <NotificationListSkeleton />
      ) : (
        <NotificationList
          notifications={visible}
          readIds={readIds}
          now={now}
          onRead={markAsRead}
          emptyTitle={EMPTY_COPY[filter].title}
          emptyBody={EMPTY_COPY[filter].body}
        />
      )}
    </section>
  );
}