"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown, LayoutGrid, Rows3 } from "lucide-react";
import type { Category } from "@/types/category";
import type { Restaurant } from "@/types/restaurant";
import type { RestaurantFilters, SortOption } from "@/types/restaurant-filters";
import { useCarousel } from "@/hooks/useCarousel";
import { useApplyRestaurantFilters } from "@/hooks/useApplyRestaurantFilters";
import { CarouselArrows } from "@/components/ui/CarouselArrows";
import { RestaurantSliderCard } from "@/components/features/restaurants/RestaurantSliderCard";

type ViewMode = "categorias" | "plano";

const SLIDER_MIN_ITEMS = 3;

const SORT_LABELS: { value: SortOption; label: string }[] = [
  { value: "cercania", label: "Más cercanos" },
  { value: "rating", label: "Mejor calificados" },
  { value: "envio", label: "Envío más barato" },
];

const toggleBase =
  "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-2 text-caption transition-colors sm:h-8 sm:gap-2 sm:px-3.5 sm:text-label-md";

const toggleIdle = `${toggleBase} border-border bg-surface text-text-secondary hover:border-border-strong hover:bg-canvas-muted`;

const toggleActive = `${toggleBase} border-primary bg-primary text-white hover:bg-primary-hover`;

const sortSelectClass =
  "h-7 max-w-[9.5rem] appearance-none rounded-full border border-border bg-surface pr-6 pl-2.5 text-caption text-neutral transition-colors hover:bg-canvas-muted focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none sm:h-8 sm:max-w-none sm:pl-3.5 sm:text-label-md";

function RestaurantRow({
  restaurants,
  title,
}: {
  restaurants: Restaurant[];
  title: string;
}) {
  const { trackRef, scrollPrev, scrollNext } =
    useCarousel<HTMLUListElement>();

  if (restaurants.length < SLIDER_MIN_ITEMS) {
    return (
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <RestaurantSliderCard restaurant={restaurant} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end justify-end">
        <CarouselArrows
          onPrev={scrollPrev}
          onNext={scrollNext}
          prevLabel={`Ver anteriores de ${title}`}
          nextLabel={`Ver más de ${title}`}
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
    </div>
  );
}

function RestaurantGrid({ restaurants }: { restaurants: Restaurant[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>
          <RestaurantSliderCard restaurant={restaurant} />
        </li>
      ))}
    </ul>
  );
}

interface RestaurantsResultsProps {
  restaurants: Restaurant[];
  categories: Category[];
  filters: RestaurantFilters;
}

export function RestaurantsResults({
  restaurants,
  categories,
  filters,
}: RestaurantsResultsProps) {
  const [view, setView] = useState<ViewMode>("categorias");
  const applyFilters = useApplyRestaurantFilters();

  const groups = useMemo(() => {
    const byCategory = new Map<string, Restaurant[]>();

    for (const restaurant of restaurants) {
      const bucket = byCategory.get(restaurant.categoryId);
      if (bucket) {
        bucket.push(restaurant);
      } else {
        byCategory.set(restaurant.categoryId, [restaurant]);
      }
    }

    return categories
      .map((category) => ({
        category,
        restaurants: byCategory.get(category.id) ?? [],
      }))
      .filter((group) => group.restaurants.length > 0);
  }, [categories, restaurants]);

  if (restaurants.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface px-6 py-16 text-center">
        <h2 className="text-title-sm text-neutral sm:text-headline-md">
          No encontramos restaurantes
        </h2>
        <p className="max-w-sm text-caption text-text-secondary sm:text-body-md">
          Ajusta la zona, la proximidad o las categorías para ampliar la
          búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-margin-mobile lg:gap-margin">
      <div className="flex items-center justify-between gap-2 md:justify-end">
        <span className="text-caption text-text-secondary tabular-nums md:hidden">
          {restaurants.length}{" "}
          {restaurants.length === 1 ? "restaurante" : "restaurantes"}
        </span>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="relative shrink-0 md:hidden">
            <select
              aria-label="Ordenar por"
              value={filters.orden}
              onChange={(event) =>
                applyFilters({
                  ...filters,
                  orden: event.target.value as SortOption,
                })
              }
              className={sortSelectClass}
            >
              {SORT_LABELS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-2 size-3 -translate-y-1/2 text-text-secondary"
              aria-hidden
            />
          </div>

          <button
            type="button"
            aria-pressed={view === "categorias"}
            aria-label="Ver por categoría"
            onClick={() => setView("categorias")}
            className={view === "categorias" ? toggleActive : toggleIdle}
          >
            <Rows3 className="size-3.5 shrink-0 sm:size-4" aria-hidden />
            <span className="hidden sm:inline">Por categoría</span>
          </button>
          <button
            type="button"
            aria-pressed={view === "plano"}
            aria-label="Ver en cuadrícula plana"
            onClick={() => setView("plano")}
            className={view === "plano" ? toggleActive : toggleIdle}
          >
            <LayoutGrid className="size-3.5 shrink-0 sm:size-4" aria-hidden />
            <span className="hidden sm:inline">Cuadrícula plana</span>
          </button>
        </div>
      </div>

      {view === "plano" ? (
        <RestaurantGrid restaurants={restaurants} />
      ) : (
        <div className="flex flex-col gap-margin-mobile lg:gap-margin">
          {groups.map(({ category, restaurants: groupRestaurants }) => (
            <section key={category.id} className="flex flex-col gap-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="relative block size-9 shrink-0 overflow-hidden rounded-lg sm:size-12 sm:rounded-xl">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <div className="space-y-0.5">
                  <h2 className="text-title-sm text-neutral sm:text-headline-md">
                    {category.name}
                  </h2>
                  <p className="text-caption text-text-secondary tabular-nums sm:text-label-md">
                    {groupRestaurants.length}{" "}
                    {groupRestaurants.length === 1
                      ? "restaurante"
                      : "restaurantes"}
                  </p>
                </div>
              </div>

              <RestaurantRow
                restaurants={groupRestaurants}
                title={category.name}
              />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
