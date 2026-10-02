"use client";

import { useCallback } from "react";
import type { Order } from "@/types/order";
import { useCart } from "@/components/providers/CartProvider";

export type ReorderResult =
  | { status: "added"; order: Order }
  | { status: "blocked"; order: Order; cartRestaurantName: string };

/**
 * Vuelve a cargar un pedido en el carrito. El carrito agrupa por restaurante, asi
 * que si ya hay.lineas de otro local el re-pedido se bloquea en vez de mezclar
 * dos restaurantes en la misma orden.
 */
export function useReorderOrder() {
  const { groups, addItem } = useCart();

  return useCallback(
    (order: Order): ReorderResult => {
      const foreignGroup = groups.find(
        (group) => group.restaurantId !== order.restaurantId,
      );

      if (foreignGroup) {
        return {
          status: "blocked",
          order,
          cartRestaurantName: foreignGroup.restaurantName,
        };
      }

      for (const line of order.lines) {
        // addItem deduplica por productId e incrementa en 1, asi que repetir
        // la llamada quantity veces reconstruye la cantidad original.
        for (let copy = 0; copy < line.quantity; copy += 1) {
          addItem({
            productId: line.productId,
            restaurantId: order.restaurantId,
            restaurantName: order.restaurantName,
            name: line.name,
            basePrice: line.basePrice,
            price: line.unitPrice,
            image: line.image,
            selections: line.selections,
          });
        }
      }

      return { status: "added", order };
    },
    [groups, addItem],
  );
}