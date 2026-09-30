"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function CartToast() {
  const { toast, dismissToast, openDrawer } = useCart();

  useEffect(() => {
    if (!toast) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") dismissToast();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dismissToast, toast]);

  if (!toast) return null;

  return (
    <div className="fixed inset-x-4 top-4 z-[70] mx-auto flex max-w-[520px] items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2.5 shadow-float transition-transform duration-300 ease-out">
      <button
        type="button"
        onClick={openDrawer}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
        aria-label="Producto agregado al carrito. Abrir carrito"
      >
        <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-canvas-muted">
          <Image
            src={toast.image}
            alt=""
            fill
            sizes="40px"
            className="object-cover"
          />
        </span>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 text-label-md text-tertiary-strong">
            <Check className="size-3.5 shrink-0" aria-hidden />
            Agregado al carrito
          </p>
          <p className="truncate text-label-lg text-neutral">{toast.name}</p>
          <p className="text-label-md text-text-secondary tabular-nums">
            {toast.basePrice !== toast.price ? (
              <>
                {priceFormatter.format(toast.price)}
                <span className="ml-1.5 line-through">
                  {priceFormatter.format(toast.basePrice)}
                </span>
              </>
            ) : (
              priceFormatter.format(toast.price)
            )}
          </p>
        </div>
      </button>

      <button
        type="button"
        onClick={dismissToast}
        aria-label="Cerrar notificación"
        className="rounded-full p-2 text-text-secondary transition-colors hover:bg-canvas-muted hover:text-neutral"
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}