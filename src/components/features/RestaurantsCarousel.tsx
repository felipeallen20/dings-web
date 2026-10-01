"use client";

import type { Restaurant } from "@/types/restaurant";
import { useCarousel } from "@/hooks/useCarousel";
import { CarouselArrows } from "@/components/ui/CarouselArrows";
import { RestaurantSliderCard } from "@/components/features/restaurants/RestaurantSliderCard";

export function RestaurantsCarousel({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const { trackRef, scrollPrev, scrollNext } =
    useCarousel<HTMLUListElement>();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-label-xs text-primary uppercase">Selección curada</p>
          <h2 className="text-title-sm text-neutral sm:text-headline-md">
            Populares cerca de ti
          </h2>
        </div>

        <CarouselArrows
          onPrev={scrollPrev}
          onNext={scrollNext}
          prevLabel="Restaurante anterior"
          nextLabel="Restaurante siguiente"
        />
      </div>

      <ul
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
      >
        {restaurants.map((restaurant) => (
          <li
            key={restaurant.id}
            className="w-[calc((100%-0.75rem)/2)] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/3)] lg:w-[calc((100%-2.25rem)/4)]"
          >
            <RestaurantSliderCard restaurant={restaurant} />
          </li>
        ))}
      </ul>
    </section>
  );
}
