"use client";

import Image from "next/image";
import { Bike, ChefHat, ClipboardList, MapPin, PackageCheck, Phone } from "lucide-react";
import type { Order, OrderStatus } from "@/types/order";
import { ORDER_FLOW, ORDER_STATUS_LABELS } from "@/services/orders";
import { Card } from "@/components/ui/Card";

export const STATUS_ICONS: Record<OrderStatus, typeof ChefHat> = {
  recibido: ClipboardList,
  en_preparacion: ChefHat,
  en_camino: Bike,
  entregado: PackageCheck,
  cancelado: PackageCheck,
};

export function statusBadgeClass(status: OrderStatus): string {
  if (status === "entregado") return "bg-tertiary/10 text-tertiary-strong";
  if (status === "cancelado") return "bg-canvas-muted text-text-secondary";
  return "bg-primary/10 text-primary";
}

// Sin `inline-flex` aqui a proposito: si la base declara display, choca con
// `hidden` / `sm:inline-flex` y gana segun el orden del CSS, no del atributo.
export const statusBadgeBase =
  "items-center gap-1 rounded-full px-2 py-0.5 text-caption font-medium";

interface ActiveOrderCardProps {
  order: Order;
  onViewDetail: (order: Order) => void;
}

export function ActiveOrderCard({ order, onViewDetail }: ActiveOrderCardProps) {
  const currentIndex = ORDER_FLOW.indexOf(order.status);
  const StatusIcon = STATUS_ICONS[order.status];

  return (
    <Card className="border-primary/20">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-canvas-muted sm:size-16">
          <Image
            src={order.restaurantImage}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="truncate text-title-sm text-neutral sm:text-title-md">
            {order.restaurantName}
          </p>
          <p className="text-caption text-text-secondary sm:text-body-sm">
            Pedido #{order.id} · {order.itemCount}{" "}
            {order.itemCount === 1 ? "producto" : "productos"}
          </p>
        </div>

        {/* En movil el estado pasa a su propia linea: "En preparacion" mide
            94px y dejaba solo 82px para el nombre del restaurante. */}
        <span
          className={`${statusBadgeBase} ${statusBadgeClass(order.status)} hidden shrink-0 sm:inline-flex`}
        >
          <StatusIcon className="size-3.5" aria-hidden />
          {ORDER_STATUS_LABELS[order.status]}
        </span>
      </div>

      <div className="-mt-1 flex sm:hidden">
        <span
          className={`${statusBadgeBase} ${statusBadgeClass(order.status)} inline-flex w-fit`}
        >
          <StatusIcon className="size-3.5" aria-hidden />
          {ORDER_STATUS_LABELS[order.status]}
        </span>
      </div>

      <div className="flex items-baseline gap-2 rounded-lg bg-canvas-muted px-4 py-3">
        <p className="text-title-sm text-neutral sm:text-title-lg">
          Llega en ~{order.etaMinutes} min
        </p>
        <p className="text-caption text-text-secondary sm:text-body-sm">
          horario estimado
        </p>
      </div>

      <div>
        <div className="flex items-center gap-1.5" aria-hidden>
          {ORDER_FLOW.map((step, index) => (
            <span
              key={step}
              className={`h-1.5 flex-1 rounded-full ${
                index <= currentIndex ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
        <p className="sr-only">
          Paso {currentIndex + 1} de {ORDER_FLOW.length}: {ORDER_STATUS_LABELS[order.status]}
        </p>
      </div>

      <p className="flex items-start gap-2 text-caption text-text-secondary sm:text-body-sm">
        <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
        <span>
          {order.addressSnapshot.label} · {order.addressSnapshot.line1},{" "}
          {order.addressSnapshot.zoneName}
        </span>
      </p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => onViewDetail(order)}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-label-lg text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:h-12"
        >
          Ver detalle
        </button>

        <button
          type="button"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 text-label-lg text-neutral transition-colors hover:bg-canvas-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:h-12"
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          Contactar
        </button>
      </div>
    </Card>
  );
}