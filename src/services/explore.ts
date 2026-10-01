import type { StaticImageData } from "next/image";
import type { Product } from "@/types/menu";
import type { Restaurant } from "@/types/restaurant";
import { getCategories } from "@/services/categories";
import { DRINKS_CATEGORY, getRestaurantMenu } from "@/services/menu";
import { getRestaurants, getZones } from "@/services/restaurants";
import { DEFAULT_RESTAURANT_FILTERS } from "@/types/restaurant-filters";

export interface ExploreDish {
  id: string;
  product: Product;
  restaurantId: string;
  restaurantName: string;
  rating: number;
  ratingCount: number;
  etaMinutes: number;
  distanceKm: number;
  score: number;
}

export interface ExploreCollection {
  id: string;
  title: string;
  subtitle: string;
  dishes: ExploreDish[];
}

export interface ExploreCategory {
  id: string;
  name: string;
  image: StaticImageData;
  restaurantCount: number;
}

export interface ExploreZone {
  id: string;
  name: string;
  restaurantCount: number;
}

function scoreDish(product: Product, restaurant: Restaurant): number {
  const quality = restaurant.rating * 22;
  const popularity = Math.log10(restaurant.ratingCount + 1) * 16;
  const proximity = -restaurant.distanceKm * 9;
  const speed = -restaurant.etaMinutes * 0.6;
  const promo = product.originalPrice !== undefined ? 7 : 0;
  const value = product.price <= 20000 ? 3 : 0;

  return quality + popularity + proximity + speed + promo + value;
}

/**
 * Recorre el catálogo completo y devuelve un platillo por restaurante+platillo.
 * El mismo dish aparece hasta 3 veces en un menú (ofertas, más pedidos y
 * carta), así que se queda el precio más bajo de cada uno.
 */
async function buildDishPool(): Promise<ExploreDish[]> {
  const restaurants = await getRestaurants(DEFAULT_RESTAURANT_FILTERS);
  const menus = await Promise.all(
    restaurants.map(async (restaurant) => ({
      restaurant,
      menu: await getRestaurantMenu(restaurant),
    })),
  );

  const byKey = new Map<string, ExploreDish>();

  for (const { restaurant, menu } of menus) {
    for (const product of menu.products) {
      if (product.menuCategoryId === DRINKS_CATEGORY.id) continue;

      const key = `${restaurant.id}:${product.name}`;
      const dish: ExploreDish = {
        id: `${restaurant.id}:${product.id}`,
        product,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        rating: restaurant.rating,
        ratingCount: restaurant.ratingCount,
        etaMinutes: restaurant.etaMinutes,
        distanceKm: restaurant.distanceKm,
        score: scoreDish(product, restaurant),
      };

      const existing = byKey.get(key);

      if (!existing || product.price < existing.product.price) {
        byKey.set(key, dish);
      }
    }
  }

  return [...byKey.values()];
}

function byScore(a: ExploreDish, b: ExploreDish): number {
  return b.score - a.score || b.rating - a.rating;
}

export async function getTrendingDishes(limit = 12): Promise<ExploreDish[]> {
  const pool = await buildDishPool();
  return [...pool].sort(byScore).slice(0, limit);
}

export async function getExploreCollections(): Promise<ExploreCollection[]> {
  const pool = await buildDishPool();

  return [
    {
      id: "ofertas-del-dia",
      title: "Ofertas del día",
      subtitle: "Platillos con descuento activo ahora",
      dishes: pool
        .filter((dish) => dish.product.originalPrice !== undefined)
        .sort(byScore)
        .slice(0, 12),
    },
    {
      id: "rapidos-y-economicos",
      title: "Rápidos y económicos",
      subtitle: "Llegan rápido y por menos de $20.000",
      dishes: pool
        .filter((dish) => dish.etaMinutes <= 28 && dish.product.price <= 20000)
        .sort((a, b) => a.etaMinutes - b.etaMinutes || byScore(a, b))
        .slice(0, 12),
    },
    {
      id: "para-compartir",
      title: "Para compartir",
      subtitle: "Cenas y detalles con más de $25.000",
      dishes: pool
        .filter((dish) => dish.product.price >= 25000)
        .sort(byScore)
        .slice(0, 12),
    },
  ];
}

export async function getExploreCategories(): Promise<ExploreCategory[]> {
  const restaurants = await getRestaurants(DEFAULT_RESTAURANT_FILTERS);
  const counts = new Map<string, number>();

  for (const restaurant of restaurants) {
    counts.set(
      restaurant.categoryId,
      (counts.get(restaurant.categoryId) ?? 0) + 1,
    );
  }

  return getCategories()
    .map((category) => ({
      id: category.id,
      name: category.name,
      image: category.image,
      restaurantCount: counts.get(category.id) ?? 0,
    }))
    .filter((category) => category.restaurantCount > 0);
}

export async function getExploreZones(): Promise<ExploreZone[]> {
  const restaurants = await getRestaurants(DEFAULT_RESTAURANT_FILTERS);
  const counts = new Map<string, number>();

  for (const restaurant of restaurants) {
    counts.set(restaurant.zoneId, (counts.get(restaurant.zoneId) ?? 0) + 1);
  }

  return getZones()
    .map((zone) => ({
      id: zone.id,
      name: zone.name,
      restaurantCount: counts.get(zone.id) ?? 0,
    }))
    .filter((zone) => zone.restaurantCount > 0);
}

export async function getNearbyRestaurants(limit = 8): Promise<Restaurant[]> {
  const restaurants = await getRestaurants({
    ...DEFAULT_RESTAURANT_FILTERS,
    abiertos: true,
  });

  return restaurants
    .filter((restaurant) => restaurant.distanceKm <= 2)
    .sort(
      (a, b) =>
        a.distanceKm - b.distanceKm || b.rating - a.rating,
    )
    .slice(0, limit);
}