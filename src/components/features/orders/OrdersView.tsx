"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Order } from "@/types/order";
import {
  buildMockOrders,
  isOrderActive,
  type OrderSeed,
} from "@/services/orders";
import { useSession } from "@/components/providers/SessionProvider";
import { useCart } from "@/components/providers/CartProvider";
import { useReorderOrder } from "@/hooks/useReorderOrder";
import { Sheet } from "@/components/ui/Sheet";
import { ActiveOrderCard } from "./ActiveOrderCard";
import { OrderCard } from "./OrderCard";
import { OrderDetailSheet } from "./OrderDetailSheet";
import { OrdersEmptyState } from "./OrdersEmptyState";

type OrdersTab = "activos" | "anteriores";

interface BlockedReorder {
  order: Order;
  cartRestaurantName: string;
}

function OrdersSkeleton() {
  return (
    <div className="flex flex-col gap-margin-mobile lg:gap-margin">
      <div className="h-11 animate-pulse rounded-lg bg-canvas-muted sm:h-12" />
      <div className="h-56 animate-pulse rounded-xl border border-border bg-canvas-muted" />
      <div className="h-40 animate-pulse rounded-xl border border-border bg-canvas-muted" />
      <div className="h-40 animate-pulse rounded-xl border border-border bg-canvas-muted" />
    </div>
  );
}

interface OrdersViewProps {
  seeds: OrderSeed[];
}

export function OrdersView({ seeds }: OrdersViewProps) {
  const { session, isLoading } = useSession();
  const router = useRouter();
  const { openDrawer } = useCart();
  const reorderOrder = useReorderOrder();

  const [now] = useState(() => new Date());
  const [tab, setTab] = useState<OrdersTab>("activos");
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const [blockedReorder, setBlockedReorder] = useState<BlockedReorder | null>(null);

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/iniciar-sesion?redirect=/pedidos");
    }
  }, [isLoading, session, router]);

  const orders = useMemo(() => buildMockOrders(seeds, now), [seeds, now]);

  const activeOrders = useMemo(
    () => orders.filter((order) => isOrderActive(order.status)),
    [orders],
  );
  const pastOrders = useMemo(
    () => orders.filter((order) => !isOrderActive(order.status)),
    [orders],
  );

  function handleReorder(order: Order) {
    const result = reorderOrder(order);

    if (result.status === "blocked") {
      setBlockedReorder({
        order,
        cartRestaurantName: result.cartRestaurantName,
      });
      return;
    }

    setDetailOrder(null);
    openDrawer();
  }

  if (isLoading) return <OrdersSkeleton />;
  if (!session) return null;

  const tabs: { id: OrdersTab; label: string; count: number }[] = [
    { id: "activos", label: "Activos", count: activeOrders.length },
    { id: "anteriores", label: "Anteriores", count: pastOrders.length },
  ];

  return (
    <>
      <div className="flex flex-col gap-margin-mobile lg:gap-margin">
        <div
          role="tablist"
          aria-label="Pedidos por estado"
          className="flex gap-1 rounded-lg bg-canvas-muted p-1"
        >
          {tabs.map((item) => {
            const isActive = tab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(item.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-caption transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:py-2 sm:text-label-lg ${
                  isActive
                    ? "bg-surface text-neutral shadow-float"
                    : "text-text-secondary hover:text-neutral"
                }`}
              >
                {item.label}
                <span
                  className={`rounded-full px-1.5 text-caption ${
                    isActive ? "bg-primary/10 text-primary" : "bg-border text-text-secondary"
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {orders.length === 0 && <OrdersEmptyState />}

        {orders.length > 0 && tab === "activos" && (
          <>
            {activeOrders.length === 0 ? (
              <p className="rounded-xl border border-border bg-surface px-4 py-10 text-center text-caption text-text-secondary sm:text-body-md">
                No tienes pedidos en curso.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-margin-mobile lg:grid-cols-2 lg:gap-margin">
                {activeOrders.map((order) => (
                  <div
                    key={order.id}
                    className={activeOrders.length === 1 ? "lg:col-span-2" : undefined}
                  >
                    <ActiveOrderCard order={order} onViewDetail={setDetailOrder} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {orders.length > 0 && tab === "anteriores" && (
          <>
            {pastOrders.length === 0 ? (
              <p className="rounded-xl border border-border bg-surface px-4 py-10 text-center text-caption text-text-secondary sm:text-body-md">
                Aún no tienes pedidos entregados.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-margin-mobile lg:grid-cols-2 lg:gap-margin">
                {pastOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    now={now}
                    onViewDetail={setDetailOrder}
                    onReorder={handleReorder}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <OrderDetailSheet
        order={detailOrder}
        now={now}
        onClose={() => setDetailOrder(null)}
        onReorder={handleReorder}
      />

      <Sheet
        isOpen={blockedReorder !== null}
        onClose={() => setBlockedReorder(null)}
        title="No podemos re-pedir aquí"
        description={
          blockedReorder
            ? `Tu carrito tiene pedidos de ${blockedReorder.cartRestaurantName}.`
            : undefined
        }
        footer={
          <div className="flex flex-col gap-2 sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => setBlockedReorder(null)}
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-4 text-label-lg text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Entendido
            </button>
            <button
              type="button"
              onClick={() => {
                setBlockedReorder(null);
                openDrawer();
              }}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-surface px-4 text-label-lg text-neutral transition-colors hover:bg-canvas-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Ver mi carrito
            </button>
          </div>
        }
      >
        <p className="text-body-sm text-text-secondary">
          Cada carrito pertenece a un solo restaurante. Para volver a pedir{" "}
          {blockedReorder?.order.restaurantName ?? "este pedido"}, vacía primero el
          carrito actual desde el carrito.
        </p>
      </Sheet>
    </>
  );
}