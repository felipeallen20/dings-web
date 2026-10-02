"use client";

import Image from "next/image";
import { RotateCcw } from "lucide-react";
import type { Order } from "@/types/order";
import { formatOrderDate } from "@/services/orders";
import { statusBadgeBase, statusBadgeClass } from "./ActiveOrderCard";

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function summarizeLines(order: Order): string {
  const names = order.lines.map((line) => line.name);
  const shown = names.slice(0, 2).join(", ");
  const remaining = names.length - 2;

  if (remaining <= 0) return shown;
  return `${shown} y ${remaining} más`;
}

interface OrderCardProps {
  order: Order;
  now: Date;
  onViewDetail: (order: Order) => void;
  onReorder: (order: Order) => void;
}

export function OrderCard({ order, now, onViewDetail, onReorder }: OrderCardProps) {
  const showBadge = order.status !== "entregado";

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong sm:p-5">
      <div className="flex items-start gap-3 sm:items-center sm:gap-4">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-canvas-muted sm:size-16">
          <Image
            src={order.restaurantImage}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h3 className="truncate text-title-sm text-neutral sm:text-title-md">
            {order.restaurantName}
          </h3>
          <p className="text-caption text-text-secondary sm:text-body-sm">
            #{order.id} · {formatOrderDate(order.placedAt, now)}
          </p>
          <p className="truncate text-caption text-placeholder sm:text-body-sm">
            {order.itemCount} {order.itemCount === 1 ? "producto" : "productos"} ·{" "}
            {summarizeLines(order)}
          </p>
        </div>

        {showBadge && (
          <span
            className={`${statusBadgeBase} ${statusBadgeClass(order.status)} hidden h-fit shrink-0 sm:inline-flex`}
          >
            {order.status === "cancelado" ? "Cancelado" : "En curso"}
          </span>
        )}
      </div>

      {showBadge && (
        <div className="-mt-1 flex sm:hidden">
          <span
            className={`${statusBadgeBase} ${statusBadgeClass(order.status)} inline-flex w-fit`}
          >
            {order.status === "cancelado" ? "Cancelado" : "En curso"}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-baseline gap-1.5 text-caption text-text-secondary sm:text-body-sm">
          Total
          <span className="text-title-sm text-neutral sm:text-title-md">
            {priceFormatter.format(order.total)}
          </span>
        </p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => onViewDetail(order)}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-surface px-4 text-label-lg text-neutral transition-colors hover:bg-canvas-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:h-11"
          >
            Detalle
          </button>

          <button
            type="button"
            onClick={() => onReorder(order)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-label-lg text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:h-11"
          >
            <RotateCcw className="size-4 shrink-0" aria-hidden />
            Volver a pedir
          </button>
        </div>
      </div>
    </article>
  );
}