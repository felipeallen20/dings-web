import Image from "next/image";
import Link from "next/link";
import { Bike, MapPin, Star } from "lucide-react";
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

export function RestaurantSliderCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <Link
      href={`/restaurantes/${restaurant.id}`}
      className="group flex flex-col gap-1.5 sm:gap-2"
    >
      <span className="relative block aspect-square w-full overflow-hidden rounded-lg bg-canvas-muted sm:aspect-video">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <span className="absolute top-1.5 left-1.5 flex items-center gap-0.5 rounded-full bg-surface/90 px-1.5 py-0.5 text-label-xs text-neutral tabular-nums backdrop-blur-sm sm:top-2 sm:left-2 sm:gap-1 sm:px-2 sm:text-label-sm">
          <MapPin
            className="size-2.5 shrink-0 text-text-secondary sm:size-3"
            aria-hidden
          />
          {formatDecimal(restaurant.distanceKm)} km
        </span>

        {!restaurant.isOpen && (
          <span className="absolute inset-0 flex items-center justify-center bg-inverse-surface/55">
            <span className="rounded-full bg-surface px-2 py-0.5 text-label-xs text-neutral sm:px-3 sm:text-label-md">
              Cerrado ahora
            </span>
          </span>
        )}
      </span>

      <span className="flex flex-col gap-0.5 sm:gap-1">
        <h3 className="line-clamp-1 text-label-md text-neutral sm:text-title-md">
          {restaurant.name}
        </h3>

        <span className="flex items-center gap-1 text-caption text-text-secondary sm:text-label-md">
          <Star
            className="size-2.5 shrink-0 fill-secondary text-secondary sm:size-3.5"
            aria-hidden
          />
          <span className="text-label-xs text-neutral tabular-nums sm:text-label-sm">
            {restaurant.rating.toFixed(1)}
          </span>
          <span className="tabular-nums">
            ({formatRatingCount(restaurant.ratingCount)}+)
          </span>
        </span>

        <span className="flex items-center gap-1 text-caption text-text-secondary sm:text-label-md">
          <Bike
            className="size-2.5 shrink-0 sm:size-3.5"
            aria-hidden
          />
          <span className="truncate tabular-nums">
            {restaurant.shippingPrice === 0
              ? "Envío gratis"
              : `Envío ${priceFormatter.format(restaurant.shippingPrice)}`}
          </span>
        </span>
      </span>
    </Link>
  );
}
