import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Restaurant } from "@/types/restaurant";

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function formatDecimal(value: number) {
  return value.toFixed(1).replace(".", ",");
}

export function NearbyRestaurantsSection({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  if (restaurants.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-label-xs text-primary uppercase">Cerca de ti</p>
        <h2 className="text-title-sm text-neutral sm:text-headline-md">
          Abiertos a pocos pasos
        </h2>
        <p className="text-caption text-text-secondary sm:text-body-md">
          Locales a menos de 2 km con entrega rápida.
        </p>
      </div>

      <ul className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:gap-4">
        {restaurants.map((restaurant) => (
          <li
            key={restaurant.id}
            className="w-[calc((100%-0.75rem)/2)] shrink-0 snap-start sm:w-[240px] lg:w-[260px]"
          >
            <Link
              href={`/restaurantes/${restaurant.id}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong hover:shadow-hover"
            >
              <div className="relative block aspect-video w-full bg-canvas-muted">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  sizes="(min-width: 1024px) 260px, (min-width: 640px) 240px, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-1.5 left-1.5 flex items-center gap-0.5 rounded-full bg-surface/90 px-1.5 py-0.5 text-label-xs text-neutral backdrop-blur-sm sm:top-2 sm:left-2 sm:gap-1 sm:px-2 sm:text-label-sm">
                  <MapPin className="size-2.5 shrink-0 sm:size-3" aria-hidden />
                  {formatDecimal(restaurant.distanceKm)} km
                </span>
              </div>

              <div className="flex flex-col gap-1 p-2.5 sm:gap-1.5 sm:p-3.5">
                <h3 className="truncate text-caption text-neutral sm:text-label-lg">
                  {restaurant.name}
                </h3>
                <p className="truncate text-label-xs text-text-secondary sm:text-body-sm">
                  {restaurant.shippingPrice === 0
                    ? "Envío gratis"
                    : `Envío ${priceFormatter.format(restaurant.shippingPrice)} · ${restaurant.etaMinutes} min`}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}