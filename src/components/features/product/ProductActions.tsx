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
    <div className="flex items-center gap-1.5 sm:gap-2">
      {justAdded && (
        <button
          type="button"
          onClick={openDrawer}
          className="inline-flex h-7 items-center gap-1 rounded-lg bg-tertiary/10 px-1.5 text-caption text-tertiary-strong transition-colors hover:bg-tertiary/20 sm:h-8 sm:gap-1.5 sm:px-2.5 sm:text-label-md"
        >
          <Check
            className="size-3 shrink-0 sm:size-3.5"
            strokeWidth={2.5}
            aria-hidden
          />
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
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none active:bg-primary-active sm:h-8 sm:w-auto sm:gap-1.5 sm:px-2.5 sm:text-label-md"
      >
        <Plus
          className="size-3 shrink-0 sm:size-3.5"
          strokeWidth={2.5}
          aria-hidden
        />
        <span className="hidden sm:inline">Agregar</span>
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