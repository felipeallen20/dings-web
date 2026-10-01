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
          sizes="260px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {product.originalPrice !== undefined && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-secondary px-2.5 py-1 text-label-sm text-white">
            Oferta
          </span>
        )}

        <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-surface/90 px-2 py-1 text-label-sm text-neutral backdrop-blur-sm tabular-nums">
          <Clock className="size-3 shrink-0 text-text-secondary" aria-hidden />
          {dish.etaMinutes} min
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <Link
          href={`/restaurantes/${dish.restaurantId}`}
          className="flex items-center gap-1.5 text-label-sm text-text-secondary transition-colors hover:text-primary"
        >
          <Star
            className="size-3 shrink-0 fill-secondary text-secondary"
            aria-hidden
          />
          <span className="truncate">{dish.restaurantName}</span>
          <span className="shrink-0 tabular-nums">{dish.rating.toFixed(1)}</span>
        </Link>

        <h3 className="text-label-lg text-neutral">{product.name}</h3>

        <p className="line-clamp-2 text-body-sm text-text-secondary">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-title-md text-neutral tabular-nums">
              {priceFormatter.format(product.price)}
            </span>
            {product.originalPrice !== undefined && (
              <span className="text-label-md text-text-secondary line-through tabular-nums">
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