"use client";

import Image from "next/image";
import { CreditCard, MapPin } from "lucide-react";
import type { Order, OrderStatus } from "@/types/order";
import { formatEventTime, ORDER_STATUS_LABELS } from "@/services/orders";
import { Sheet } from "@/components/ui/Sheet";
import { STATUS_ICONS, statusBadgeBase, statusBadgeClass } from "./ActiveOrderCard";

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function Timeline({ order, now }: { order: Order; now: Date }) {
  const isLast = (index: number) => index === order.timeline.length - 1;

  return (
    <ol className="flex flex-col">
      {order.timeline.map((event, index) => {
        const Icon = STATUS_ICONS[event.status as OrderStatus];
        const isCurrent = index === order.timeline.length - 1;

        return (
          <li key={`${event.status}-${event.at}`} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                  isCurrent
                    ? "bg-primary text-white"
                    : "bg-canvas-muted text-text-secondary"
                }`}
              >
                <Icon className="size-4" aria-hidden />
              </span>

              {!isLast(index) && (
                <span className="w-px flex-1 bg-border" aria-hidden />
              )}
            </div>

            <div className={`flex flex-1 flex-col gap-0.5 ${isLast(index) ? "" : "pb-5"}`}>
              <p className="text-label-lg text-neutral sm:text-body-md">
                {ORDER_STATUS_LABELS[event.status]}
              </p>
              <p className="text-caption text-text-secondary sm:text-body-sm">
                {formatEventTime(event.at, now)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function PriceRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className={strong ? "text-label-lg text-neutral" : "text-caption text-text-secondary"}>
        {label}
      </span>
      <span className={strong ? "text-title-sm text-neutral" : "text-caption text-text-secondary"}>
        {value}
      </span>
    </div>
  );
}

interface OrderDetailSheetProps {
  order: Order | null;
  now: Date;
  onClose: () => void;
  onReorder: (order: Order) => void;
}

export function OrderDetailSheet({
  order,
  now,
  onClose,
  onReorder,
}: OrderDetailSheetProps) {
  return (
    <Sheet
      isOpen={order !== null}
      onClose={onClose}
      title={order?.restaurantName ?? ""}
      description={order ? `Pedido #${order.id}` : undefined}
      footer={
        order && (
          <button
            type="button"
            onClick={() => onReorder(order)}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-label-lg text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Volver a pedir
          </button>
        )
      }
    >
      {order && (
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-canvas-muted">
              <Image
                src={order.restaurantImage}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="text-caption text-text-secondary sm:text-body-sm">
                {order.itemCount} {order.itemCount === 1 ? "producto" : "productos"} ·{" "}
                {priceFormatter.format(order.total)}
              </p>
              <span className={`${statusBadgeBase} inline-flex w-fit ${statusBadgeClass(order.status)}`}>
                {ORDER_STATUS_LABELS[order.status]}
              </span>
            </div>
          </div>

          <section className="flex flex-col gap-3">
            <h3 className="text-title-sm text-neutral sm:text-title-md">Seguimiento</h3>
            <Timeline order={order} now={now} />
          </section>

          <section className="flex flex-col gap-3">
            <h3 className="text-title-sm text-neutral sm:text-title-md">Productos</h3>

            <ul className="flex flex-col divide-y divide-border">
              {order.lines.map((line) => (
                <li key={line.productId} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-canvas-muted">
                    <Image
                      src={line.image}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-label-lg text-neutral sm:text-body-md">
                        {line.quantity}× {line.name}
                      </p>
                      <p className="shrink-0 text-label-lg text-neutral sm:text-body-md">
                        {priceFormatter.format(line.lineTotal)}
                      </p>
                    </div>

                    {line.selections.length > 0 && (
                      <p className="text-caption text-text-secondary sm:text-body-sm">
                        {line.selections
                          .map((group) => `${group.groupName}: ${group.optionNames.join(", ")}`)
                          .join(" · ")}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h3 className="text-title-sm text-neutral sm:text-title-md">Totales</h3>
            <div className="flex flex-col gap-2 rounded-lg bg-canvas-muted p-4">
              <PriceRow
                label="Subtotal"
                value={priceFormatter.format(order.subtotal)}
              />
              <PriceRow
                label="Envío"
                value={
                  order.shipping === 0
                    ? "Gratis"
                    : priceFormatter.format(order.shipping)
                }
              />
              <PriceRow label="Total" value={priceFormatter.format(order.total)} strong />
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h3 className="text-title-sm text-neutral sm:text-title-md">Entrega y pago</h3>

            <p className="flex items-start gap-2 text-caption text-text-secondary sm:text-body-sm">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                {order.addressSnapshot.label} · {order.addressSnapshot.line1}
                {order.addressSnapshot.line2 && `, ${order.addressSnapshot.line2}`},{" "}
                {order.addressSnapshot.city} · {order.addressSnapshot.zoneName}
                {order.addressSnapshot.notes && (
                  <span className="block text-placeholder">
                    {order.addressSnapshot.notes}
                  </span>
                )}
              </span>
            </p>

            <p className="flex items-start gap-2 text-caption text-text-secondary sm:text-body-sm">
              <CreditCard className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{order.paymentLabel}</span>
            </p>
          </section>
        </div>
      )}
    </Sheet>
  );
}