"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function CartDrawer() {
  const {
    groups,
    lines,
    totalItems,
    subtotal,
    isDrawerOpen,
    closeDrawer,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
  } = useCart();

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDrawerOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeDrawer();
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeDrawer, isDrawerOpen]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${
        isDrawerOpen ? "" : "pointer-events-none"
      }`}
      aria-hidden={!isDrawerOpen}
    >
      <button
        type="button"
        tabIndex={isDrawerOpen ? 0 : -1}
        aria-label="Cerrar carrito"
        onClick={closeDrawer}
        className={`absolute inset-0 bg-inverse-surface/50 transition-opacity duration-300 motion-reduce:transition-none ${
          isDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        tabIndex={-1}
        className={`absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-surface shadow-float outline-none transition-transform duration-300 ease-out motion-reduce:transition-none ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 text-headline-md text-neutral">
            Tu pedido
            {totalItems > 0 && (
              <span className="rounded-full bg-canvas-muted px-2 py-0.5 text-label-md text-text-secondary tabular-nums">
                {totalItems}
              </span>
            )}
          </h2>

          <button
            type="button"
            onClick={closeDrawer}
            tabIndex={isDrawerOpen ? 0 : -1}
            aria-label="Cerrar carrito"
            className="rounded-full p-2 text-text-secondary transition-colors hover:bg-canvas-muted hover:text-neutral"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-canvas-muted text-text-secondary">
              <ShoppingBag className="size-7" aria-hidden />
            </span>
            <p className="text-title-md text-neutral">Tu carrito está vacío</p>
            <p className="text-body-sm text-text-secondary">
              Agrega platillos de un restaurante para empezar tu pedido.
            </p>
            <Link
              href="/restaurantes"
              onClick={closeDrawer}
              tabIndex={isDrawerOpen ? 0 : -1}
              className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-label-lg text-white transition-colors hover:bg-primary-hover"
            >
              Ver restaurantes
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {groups.map((group) => (
                <section key={group.restaurantId}>
                  <h3 className="sticky top-0 z-10 border-b border-border bg-canvas-muted px-5 py-2 text-label-md text-text-secondary">
                    {group.restaurantName}
                  </h3>

                  <ul className="flex flex-col divide-y divide-border">
                    {group.lines.map((line) => (
                      <li
                        key={line.productId}
                        className="flex gap-3 px-5 py-4"
                      >
                        <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-canvas-muted">
                          <Image
                            src={line.image}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </span>

                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                          <p className="truncate text-label-lg text-neutral">
                            {line.name}
                          </p>
                          <p className="text-body-sm text-text-secondary tabular-nums">
                            {priceFormatter.format(line.price)}
                          </p>

                          {line.selections.length > 0 && (
                            <div className="flex flex-col gap-0.5">
                              {line.selections.map((group) => (
                                <p
                                  key={group.groupId}
                                  className="truncate text-label-sm text-text-secondary"
                                >
                                  {group.groupName}: {group.optionNames.join(", ")}
                                </p>
                              ))}
                            </div>
                          )}

                          <div className="mt-1 flex items-center justify-between gap-2">
                            <div className="flex items-center rounded-lg border border-border">
                              <button
                                type="button"
                                onClick={() => decrementItem(line.productId)}
                                aria-label={`Quitar una unidad de ${line.name}`}
                                className="flex size-8 items-center justify-center text-neutral transition-colors hover:bg-canvas-muted"
                              >
                                <Minus className="size-4" aria-hidden />
                              </button>

                              <span
                                aria-live="polite"
                                className="min-w-7 text-center text-label-lg text-neutral tabular-nums"
                              >
                                {line.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() => incrementItem(line.productId)}
                                aria-label={`Agregar otra unidad de ${line.name}`}
                                className="flex size-8 items-center justify-center text-neutral transition-colors hover:bg-canvas-muted"
                              >
                                <Plus className="size-4" aria-hidden />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(line.productId)}
                              aria-label={`Eliminar ${line.name} del carrito`}
                              className="rounded-full p-2 text-text-secondary transition-colors hover:bg-canvas-muted hover:text-secondary"
                            >
                              <Trash2 className="size-4" aria-hidden />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <footer className="flex flex-col gap-3 border-t border-border px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-body-md text-text-secondary">
                  Subtotal
                </span>
                <span className="text-title-md text-neutral tabular-nums">
                  {priceFormatter.format(subtotal)}
                </span>
              </div>

              <p className="text-body-sm text-text-secondary">
                El envío y los impuestos se calculan al confirmar el pedido.
              </p>

              <Link
                href="/carrito"
                onClick={closeDrawer}
                className="flex h-12 items-center justify-center rounded-lg bg-primary text-label-lg text-white transition-colors hover:bg-primary-hover"
              >
                Continuar al checkout
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="text-body-sm text-text-secondary underline underline-offset-2 transition-colors hover:text-secondary"
              >
                Vaciar carrito
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}