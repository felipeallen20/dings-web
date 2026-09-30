"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { LayoutGrid, Rows3 } from "lucide-react";
import type { Category } from "@/types/category";
import type { Restaurant } from "@/types/restaurant";
import { RestaurantCard } from "@/components/features/restaurants/RestaurantCard";

type ViewMode = "categorias" | "plano";

const toggleBase =
  "inline-flex h-8 items-center gap-2 rounded-full border px-3.5 text-label-md transition-colors";

const toggleIdle = `${toggleBase} border-border bg-surface text-text-secondary hover:border-border-strong hover:bg-canvas-muted`;

const toggleActive = `${toggleBase} border-primary bg-primary text-white hover:bg-primary-hover`;

function RestaurantGrid({ restaurants }: { restaurants: Restaurant[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((restaurant) => (
        <li key={restaurant.id} className="h-full">
          <RestaurantCard restaurant={restaurant} />
        </li>
      ))}
    </ul>
  );
}

interface RestaurantsResultsProps {
  restaurants: Restaurant[];
  categories: Category[];
}

export function RestaurantsResults({
  restaurants,
  categories,
}: RestaurantsResultsProps) {
  const [view, setView] = useState<ViewMode>("categorias");

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
        <h2 className="text-headline-md text-neutral">
          No encontramos restaurantes
        </h2>
        <p className="max-w-sm text-body-md text-text-secondary">
          Ajusta la zona, la proximidad o las categorías para ampliar la
          búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-margin">
      <div className="flex items-center justify-end gap-1.5">
        <button
          type="button"
          aria-pressed={view === "categorias"}
          onClick={() => setView("categorias")}
          className={view === "categorias" ? toggleActive : toggleIdle}
        >
          <Rows3 className="size-4 shrink-0" aria-hidden />
          Por categoría
        </button>
        <button
          type="button"
          aria-pressed={view === "plano"}
          onClick={() => setView("plano")}
          className={view === "plano" ? toggleActive : toggleIdle}
        >
          <LayoutGrid className="size-4 shrink-0" aria-hidden />
          Cuadrícula plana
        </button>
      </div>

      {view === "plano" ? (
        <RestaurantGrid restaurants={restaurants} />
      ) : (
        <div className="flex flex-col gap-margin">
          {groups.map(({ category, restaurants: groupRestaurants }) => (
            <section key={category.id} className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="relative block size-12 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <div className="space-y-0.5">
                  <h2 className="text-headline-md text-neutral">
                    {category.name}
                  </h2>
                  <p className="text-label-md text-text-secondary tabular-nums">
                    {groupRestaurants.length}{" "}
                    {groupRestaurants.length === 1
                      ? "restaurante"
                      : "restaurantes"}
                  </p>
                </div>
              </div>

              <RestaurantGrid restaurants={groupRestaurants} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}