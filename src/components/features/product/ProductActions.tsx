"use client";

import { useCallback, useState } from "react";
import { Check, Plus } from "lucide-react";
import type { Product } from "@/types/menu";
import type { CartRestaurantRef } from "@/types/cart";
import { useCart } from "@/components/providers/CartProvider";
import { hasModifierGroups } from "@/services/product-options";
import { ProductModal } from "@/components/features/product/ProductModal";

interface ProductActionsProps {
  product: Product;
  restaurant: CartRestaurantRef;
}

export function ProductActions({
  product,
  restaurant,
}: ProductActionsProps) {
  const { addItem, openDrawer } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const needsConfiguration = hasModifierGroups(product);

  function handleDirectAdd() {
    addItem({
      productId: product.id,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      name: product.name,
      basePrice: product.price,
      price: product.price,
      image: product.image,
      selections: [],
    });

    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <div className="flex items-center gap-2">
      {justAdded && (
        <button
          type="button"
          onClick={openDrawer}
          className="inline-flex h-8 items-center gap-1 rounded-lg bg-tertiary/10 px-2 text-label-md text-tertiary-strong transition-colors hover:bg-tertiary/20"
        >
          <Check className="size-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
          Ver carrito
        </button>
      )}

      <button
        type="button"
        onClick={needsConfiguration ? () => setIsModalOpen(true) : handleDirectAdd}
        aria-haspopup={needsConfiguration ? "dialog" : undefined}
        aria-expanded={needsConfiguration ? isModalOpen : undefined}
        aria-label={
          needsConfiguration
            ? `Configurar y agregar ${product.name}`
            : `Añadir ${product.name} al carrito`
        }
        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-label-md text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none active:bg-primary-active"
      >
        <Plus className="size-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
        Agregar
      </button>

      {needsConfiguration && (
        <ProductModal
          product={product}
          restaurant={restaurant}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export type { CartRestaurantRef };