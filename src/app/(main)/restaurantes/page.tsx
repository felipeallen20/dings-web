import type { Metadata } from "next";
import { RestaurantFiltersBar } from "@/components/features/restaurants/RestaurantFiltersBar";
import { RestaurantsResults } from "@/components/features/restaurants/RestaurantsResults";
import { getCategories } from "@/services/categories";
import { parseRestaurantFilters } from "@/services/restaurant-filters";
import { getRestaurants, getZones } from "@/services/restaurants";

export const metadata: Metadata = {
  title: "Restaurantes | Dings",
  description:
    "Filtra restaurantes por zona, proximidad, categoría y tipo de entrega.",
};

export default async function RestaurantesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = parseRestaurantFilters(await searchParams);
  const [restaurants, zones, categories] = await Promise.all([
    getRestaurants(filters),
    getZones(),
    Promise.resolve(getCategories()),
  ]);

  return (
    <main className="w-full px-4 py-6 md:px-6 lg:py-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-margin-mobile lg:gap-margin">
        <h1 className="text-title-sm text-neutral lg:text-headline-sm">
          Restaurantes cerca de ti
        </h1>

        <RestaurantFiltersBar
          filters={filters}
          zones={zones}
          categories={categories}
          resultCount={restaurants.length}
        />

        <RestaurantsResults
          restaurants={restaurants}
          categories={categories}
          filters={filters}
        />
      </div>
    </main>
  );
}