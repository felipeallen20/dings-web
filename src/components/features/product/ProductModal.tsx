"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Check, Minus, Plus, X } from "lucide-react";
import type { Product, ProductOptionGroup } from "@/types/menu";
import type { CartRestaurantRef } from "@/types/cart";
import { useCart } from "@/components/providers/CartProvider";
import {
  buildSelectionSummary,
  createDefaultSelections,
  getMissingGroupIds,
  getUnitPrice,
  isGroupLimitReached,
  toggleOption,
  type ProductSelections,
} from "@/services/product-options";

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

interface ProductModalProps {
  product: Product;
  restaurant: CartRestaurantRef;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({
  product,
  restaurant,
  isOpen,
  onClose,
}: ProductModalProps) {
  const groups = useMemo(
    () => product.modifierGroups ?? [],
    [product.modifierGroups],
  );
  const { addItem } = useCart();

  const [selections, setSelections] = useState<ProductSelections>(() =>
    createDefaultSelections(groups),
  );
  const [quantity, setQuantity] = useState(1);
  const [showErrors, setShowErrors] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);

  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setSelections(createDefaultSelections(groups));
      setQuantity(1);
      setShowErrors(false);
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  const unitPrice = getUnitPrice(groups, selections, product.price);
  const missingGroupIds = getMissingGroupIds(groups, selections);

  function handleSubmit() {
    if (missingGroupIds.length > 0) {
      setShowErrors(true);
      return;
    }

    const summary = buildSelectionSummary(groups, selections);

    for (let index = 0; index < quantity; index += 1) {
      addItem({
        productId: product.id,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        name: product.name,
        basePrice: product.price,
        price: unitPrice,
        image: product.image,
        selections: summary,
      });
    }

    onClose();
  }

  return (
    <div
      className={`fixed inset-0 z-[65] flex items-end justify-center sm:items-center sm:p-4 ${
        isOpen ? "" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Cerrar"
        onClick={onClose}
        className={`absolute inset-0 bg-inverse-surface/50 transition-opacity duration-300 motion-reduce:transition-none ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Configurar ${product.name}`}
        tabIndex={-1}
        className={`relative flex max-h-[92vh] w-full max-w-[560px] flex-col overflow-hidden rounded-t-2xl bg-surface shadow-float outline-none transition-all duration-300 ease-out motion-reduce:transition-none sm:rounded-2xl ${
          isOpen
            ? "translate-y-0 opacity-100 sm:scale-100"
            : "translate-y-full opacity-0 sm:translate-y-0 sm:scale-95"
        }`}
      >
        <header className="relative shrink-0">
          <div className="relative block aspect-16/9 w-full bg-canvas-muted sm:aspect-2/1">
            <Image
              src={product.image}
              alt=""
              fill
              sizes="560px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-inverse-surface/70 to-transparent"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            tabIndex={isOpen ? 0 : -1}
            aria-label="Cerrar"
            className="absolute top-3 right-3 rounded-full bg-surface/90 p-2 text-neutral backdrop-blur-sm transition-colors hover:bg-surface"
          >
            <X className="size-5" aria-hidden />
          </button>

          <div className="absolute bottom-3 left-5 right-5">
            <h2 className="text-headline-md text-inverse-on-surface">
              {product.name}
            </h2>
            <p className="text-body-sm text-inverse-on-surface/85">
              {product.description}
            </p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="flex flex-col gap-6">
            {groups.map((group) => (
              <OptionGroupField
                key={group.id}
                group={group}
                selections={selections}
                hasError={showErrors && missingGroupIds.includes(group.id)}
                onToggle={(optionId) =>
                  setSelections((current) =>
                    toggleOption(current, group, optionId),
                  )
                }
              />
            ))}
          </div>
        </div>

        <footer className="flex shrink-0 items-center gap-3 border-t border-border px-5 py-4">
          <div className="flex items-center rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              aria-label="Quitar una unidad"
              className="flex size-10 items-center justify-center text-neutral transition-colors hover:bg-canvas-muted"
            >
              <Minus className="size-4" aria-hidden />
            </button>

            <span
              aria-live="polite"
              className="min-w-8 text-center text-label-lg text-neutral tabular-nums"
            >
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => setQuantity((current) => current + 1)}
              aria-label="Agregar una unidad"
              className="flex size-10 items-center justify-center text-neutral transition-colors hover:bg-canvas-muted"
            >
              <Plus className="size-4" aria-hidden />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex h-11 flex-1 items-center justify-between gap-3 rounded-lg bg-primary px-4 text-label-lg text-white transition-colors hover:bg-primary-hover"
          >
            <span>Agregar al carrito</span>
            <span className="tabular-nums">
              {priceFormatter.format(unitPrice * quantity)}
            </span>
          </button>
        </footer>
      </div>
    </div>
  );
}

interface OptionGroupFieldProps {
  group: ProductOptionGroup;
  selections: ProductSelections;
  hasError: boolean;
  onToggle: (optionId: string) => void;
}

function OptionGroupField({
  group,
  selections,
  hasError,
  onToggle,
}: OptionGroupFieldProps) {
  const selected = selections[group.id] ?? [];
  const limitReached = isGroupLimitReached(group, selections);
  const counter =
    group.type === "multiple" && group.max !== undefined
      ? `${selected.length}/${group.max}`
      : null;

  return (
    <fieldset>
      <div className="flex items-baseline justify-between gap-3">
        <legend className="text-label-lg text-neutral">
          {group.name}
          {group.required && (
            <span className="ml-1.5 text-label-md text-secondary">
              Obligatorio
            </span>
          )}
        </legend>
        {counter && (
          <span className="text-label-md text-text-secondary tabular-nums">
            {counter}
          </span>
        )}
      </div>

      {group.hint && (
        <p className="mt-0.5 text-body-sm text-text-secondary">{group.hint}</p>
      )}

      {hasError && (
        <p role="alert" className="mt-1.5 text-body-sm text-secondary">
          Selecciona una opción para continuar.
        </p>
      )}

      <div
        className={`mt-2.5 overflow-hidden rounded-lg border ${
          hasError ? "border-secondary" : "border-border"
        }`}
      >
        {group.options.map((option, index) => {
          const isSelected = selected.includes(option.id);
          const isDisabled =
            !isSelected && limitReached && group.type === "multiple";

          return (
            <label
              key={option.id}
              className={`flex items-center gap-3 px-3.5 py-3 transition-colors ${
                index > 0 ? "border-t border-border" : ""
              } ${isDisabled ? "cursor-not-allowed opacity-45" : "hover:bg-canvas-muted"}`}
            >
              <input
                type={group.type === "single" ? "radio" : "checkbox"}
                name={`${group.id}`}
                value={option.id}
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => onToggle(option.id)}
                className="sr-only"
              />

              <span
                aria-hidden
                className={`flex size-[18px] shrink-0 items-center justify-center border transition-colors ${
                  group.type === "single" ? "rounded-full" : "rounded-[5px]"
                } ${
                  isSelected
                    ? "border-primary bg-primary text-white"
                    : "border-border-strong bg-surface"
                }`}
              >
                {isSelected &&
                  (group.type === "single" ? (
                    <span className="size-1.5 rounded-full bg-white" />
                  ) : (
                    <Check className="size-3" strokeWidth={3} />
                  ))}
              </span>

              <span className="min-w-0 flex-1 text-body-sm text-neutral">
                {option.name}
              </span>

              {option.priceDelta > 0 ? (
                <span className="shrink-0 text-label-md text-text-secondary tabular-nums">
                  + {priceFormatter.format(option.priceDelta)}
                </span>
              ) : (
                <span className="shrink-0 rounded-full bg-canvas-muted px-2 py-0.5 text-label-sm text-text-secondary">
                  Incluido
                </span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}