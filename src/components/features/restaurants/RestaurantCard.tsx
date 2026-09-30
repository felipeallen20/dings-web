import Image from "next/image";
import { Bike, Clock, MapPin, Star, Zap } from "lucide-react";
import type { Restaurant } from "@/types/restaurant";

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function formatDecimal(value: number) {
  return value.toFixed(1).replace(".", ",");
}

function formatRatingCount(value: number) {
  return value >= 1000
    ? `${(value / 1000).toFixed(1).replace(".", ",")}K`
    : `${value}`;
}

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <a
      href={`/restaurantes/${restaurant.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong hover:shadow-hover"
    >
      <div className="relative block aspect-video w-full">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-label-sm text-neutral tabular-nums">
          <MapPin className="size-3.5 text-text-secondary" aria-hidden />
          {formatDecimal(restaurant.distanceKm)} km
        </span>

        {!restaurant.isOpen && (
          <span className="absolute inset-0 flex items-center justify-center bg-inverse-surface/60">
            <span className="rounded-full bg-surface px-3 py-1.5 text-label-md text-neutral">
              Cerrado ahora
            </span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-title-md text-neutral">{restaurant.name}</h3>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-canvas-muted px-2.5 py-1">
            <Star
              className="size-3.5 fill-secondary text-secondary"
              aria-hidden
            />
            <span className="text-label-sm text-neutral tabular-nums">
              {restaurant.rating.toFixed(1)}
            </span>
            <span className="text-label-sm text-text-secondary tabular-nums">
              ({formatRatingCount(restaurant.ratingCount)}+)
            </span>
          </span>
        </div>

        <p className="text-body-sm text-text-secondary">
          {restaurant.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 rounded-full bg-canvas-muted px-3 py-2">
          <span className="flex items-center gap-2 text-label-md text-text-secondary tabular-nums">
            <Bike className="size-4 shrink-0" aria-hidden />
            {restaurant.shippingPrice === 0
              ? "Envío gratis"
              : `Envío ${priceFormatter.format(restaurant.shippingPrice)}`}
          </span>

          {restaurant.express ? (
            <span className="flex items-center gap-1 text-label-md text-tertiary-strong">
              <Zap className="size-3.5 shrink-0" aria-hidden />
              Súper Express
            </span>
          ) : (
            <span className="flex items-center gap-1 text-label-md text-text-secondary tabular-nums">
              <Clock className="size-3.5 shrink-0" aria-hidden />
              {restaurant.etaMinutes} min
            </span>
          )}
        </div>
      </div>
    </a>
  );
}