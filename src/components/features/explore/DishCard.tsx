import Image from "next/image";
import Link from "next/link";
import { Clock, Star } from "lucide-react";
import type { ExploreDish } from "@/services/explore";
import { ProductActions } from "@/components/features/product/ProductActions";

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function DishCard({ dish }: { dish: ExploreDish }) {
  const { product } = dish;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong hover:shadow-hover">
      <div className="relative block aspect-4/3 w-full overflow-hidden bg-canvas-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 280px, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {product.originalPrice !== undefined && (
          <span className="absolute top-1.5 left-1.5 rounded-full bg-secondary px-1.5 py-0.5 text-label-xs text-white sm:top-2.5 sm:left-2.5 sm:px-2.5 sm:py-1 sm:text-label-sm">
            Oferta
          </span>
        )}

        <span className="absolute top-1.5 right-1.5 flex items-center gap-0.5 rounded-full bg-surface/90 px-1.5 py-0.5 text-label-xs text-neutral tabular-nums backdrop-blur-sm sm:top-2.5 sm:right-2.5 sm:gap-1 sm:px-2 sm:py-1 sm:text-label-sm">
          <Clock
            className="size-2.5 shrink-0 text-text-secondary sm:size-3"
            aria-hidden
          />
          {dish.etaMinutes} min
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-2 sm:gap-2 sm:p-3.5">
        <Link
          href={`/restaurantes/${dish.restaurantId}`}
          className="flex items-center gap-1 text-label-xs text-text-secondary transition-colors hover:text-primary sm:gap-1.5 sm:text-label-sm"
        >
          <Star
            className="size-2.5 shrink-0 fill-secondary text-secondary sm:size-3"
            aria-hidden
          />
          <span className="truncate">{dish.restaurantName}</span>
          <span className="shrink-0 tabular-nums">{dish.rating.toFixed(1)}</span>
        </Link>

        <h3 className="line-clamp-2 text-title-xs text-neutral sm:text-label-lg">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-caption text-text-secondary sm:text-body-sm">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-1 pt-1 sm:gap-2">
          <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
            <span className="text-title-xs text-neutral tabular-nums sm:text-title-md">
              {priceFormatter.format(product.price)}
            </span>
            {product.originalPrice !== undefined && (
              <span className="text-caption text-text-secondary line-through tabular-nums sm:text-label-md">
                {priceFormatter.format(product.originalPrice)}
              </span>
            )}
          </div>

          <ProductActions
            product={product}
            restaurant={{ id: dish.restaurantId, name: dish.restaurantName }}
          />
        </div>
      </div>
    </article>
  );
}