import Image from "next/image";
import type { MenuCategory, Product } from "@/types/menu";
import type { CartRestaurantRef } from "@/types/cart";
import { ProductActions } from "@/components/features/product/ProductActions";

export type { CartRestaurantRef };

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

interface ProductCardProps {
  product: Product;
  category: MenuCategory;
  restaurant: CartRestaurantRef;
}

export function ProductCard({
  product,
  category,
  restaurant,
}: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong hover:shadow-hover">
      <div className="relative block aspect-4/3 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {product.originalPrice !== undefined && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-secondary px-2.5 py-1 text-label-sm text-white">
            Oferta
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <p className="text-label-sm text-text-secondary uppercase">
          {category.name}
        </p>

        <h3 className="text-label-lg text-neutral">{product.name}</h3>

        <p className="text-body-sm text-text-secondary">{product.description}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
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

          <ProductActions product={product} restaurant={restaurant} />
        </div>
      </div>
    </article>
  );
}