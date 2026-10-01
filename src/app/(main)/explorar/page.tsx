import type { Metadata } from "next";
import {
  getExploreCategories,
  getExploreCollections,
  getExploreZones,
  getNearbyRestaurants,
  getTrendingDishes,
} from "@/services/explore";
import { ExploreTrending, ExploreCollections } from "@/components/features/explore/ExploreCollections";
import { NearbyRestaurantsSection } from "@/components/features/explore/NearbyRestaurantsSection";
import {
  ExploreCategoriesSection,
  ExploreZonesSection,
} from "@/components/features/explore/ExploreBrowseSections";

export const metadata: Metadata = {
  title: "Explorar | Dings",
  description: "Descubre platillos cercanos, ofertas y colecciones curadas.",
};

export default async function ExplorePage() {
  const [
    trending,
    collections,
    categories,
    zones,
    nearby,
  ] = await Promise.all([
    getTrendingDishes(12),
    getExploreCollections(),
    getExploreCategories(),
    getExploreZones(),
    getNearbyRestaurants(8),
  ]);

  return (
    <main className="w-full px-4 py-6 md:px-6 lg:py-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-margin-mobile lg:gap-margin">
        <header className="space-y-2">
          <p className="text-label-sm text-primary uppercase">Explorar</p>
          <h1 className="text-headline-lg text-neutral lg:text-display-sm">
            Lo que hay para hoy
          </h1>
          <p className="max-w-2xl text-body-md text-text-secondary">
            Descubre platillos populares, colecciones curadas y restaurantes
            cercanos a tu ubicación.
          </p>
        </header>

        <ExploreTrending dishes={trending} />
        <ExploreCollections collections={collections} />
        <NearbyRestaurantsSection restaurants={nearby} />
        <ExploreCategoriesSection categories={categories} />
        <ExploreZonesSection zones={zones} />
      </div>
    </main>
  );
}