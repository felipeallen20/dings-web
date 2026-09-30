import type { DeliveryOption } from "@/types/restaurant";

export type DistanceRange = "0-1" | "1-3" | "3-5" | "5-mas";

export type SortOption = "cercania" | "rating" | "envio";

export interface RestaurantFilters {
  zona: string | null;
  distancia: DistanceRange | null;
  categorias: string[];
  entrega: DeliveryOption | null;
  abiertos: boolean;
  orden: SortOption;
}

export const DISTANCE_RANGES: DistanceRange[] = ["0-1", "1-3", "3-5", "5-mas"];

export const SORT_OPTIONS: SortOption[] = ["cercania", "rating", "envio"];

export const DELIVERY_OPTIONS: DeliveryOption[] = ["propio", "recogida"];

export const DEFAULT_RESTAURANT_FILTERS: RestaurantFilters = {
  zona: null,
  distancia: null,
  categorias: [],
  entrega: null,
  abiertos: false,
  orden: "cercania",
};