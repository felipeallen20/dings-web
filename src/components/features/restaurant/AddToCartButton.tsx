"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export function AddToCartButton({ productName }: { productName: string }) {
  const [quantity, setQuantity] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setQuantity((current) => current + 1)}
      aria-label={`Añadir ${productName} al carrito`}
      className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 text-label-lg text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none active:bg-primary-active"
    >
      <Plus className="size-4 shrink-0" strokeWidth={2.5} aria-hidden />
      {quantity > 0 && (
        <span className="tabular-nums" aria-live="polite">
          {quantity}
        </span>
      )}
    </button>
  );
}