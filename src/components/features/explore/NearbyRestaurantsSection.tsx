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
        <p className="text-label-sm text-primary uppercase">Cerca de ti</p>
        <h2 className="text-headline-md text-neutral lg:text-headline-lg">
          Abiertos a pocos pasos
        </h2>
        <p className="text-body-md text-text-secondary">
          Locales a menos de 2 km con entrega rápida.
        </p>
      </div>

      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:gap-4 md:mx-0 md:px-0">
        {restaurants.map((restaurant) => (
          <li
            key={restaurant.id}
            className="w-[220px] shrink-0 snap-start sm:w-[240px] lg:w-[260px]"
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
                  sizes="260px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-surface/90 px-2 py-0.5 text-label-sm text-neutral backdrop-blur-sm">
                  <MapPin className="size-3 shrink-0" aria-hidden />
                  {formatDecimal(restaurant.distanceKm)} km
                </span>
              </div>

              <div className="flex flex-col gap-1.5 p-3.5">
                <h3 className="truncate text-label-lg text-neutral">
                  {restaurant.name}
                </h3>
                <p className="truncate text-body-sm text-text-secondary">
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