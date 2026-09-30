import {
  DEFAULT_RESTAURANT_FILTERS,
  DELIVERY_OPTIONS,
  DISTANCE_RANGES,
  SORT_OPTIONS,
  type DistanceRange,
  type RestaurantFilters,
  type SortOption,
} from "@/types/restaurant-filters";
import type { DeliveryOption } from "@/types/restaurant";

type SearchParams = Record<string, string | string[] | undefined>;

function readParam(params: SearchParams, key: string): string | null {
  const value = params[key];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function parseDistance(value: string | null): DistanceRange | null {
  return DISTANCE_RANGES.find((range) => range === value) ?? null;
}

function parseOrden(value: string | null): SortOption {
  return SORT_OPTIONS.find((option) => option === value) ?? "cercania";
}

function parseEntrega(value: string | null): DeliveryOption | null {
  return DELIVERY_OPTIONS.find((option) => option === value) ?? null;
}

export function parseRestaurantFilters(
  searchParams: SearchParams,
): RestaurantFilters {
  const categorias = readParam(searchParams, "categoria")
    ?.split(",")
    .map((id) => id.trim())
    .filter((id) => id.length > 0);

  return {
    zona: readParam(searchParams, "zona"),
    distancia: parseDistance(readParam(searchParams, "distancia")),
    categorias: categorias ?? [],
    entrega: parseEntrega(readParam(searchParams, "entrega")),
    abiertos: readParam(searchParams, "abiertos") === "1",
    orden: parseOrden(readParam(searchParams, "orden")),
  };
}

export function serializeRestaurantFilters(
  filters: RestaurantFilters,
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.zona) params.set("zona", filters.zona);
  if (filters.distancia) params.set("distancia", filters.distancia);
  if (filters.categorias.length > 0) {
    params.set("categoria", filters.categorias.join(","));
  }
  if (filters.entrega) params.set("entrega", filters.entrega);
  if (filters.abiertos) params.set("abiertos", "1");
  if (filters.orden !== DEFAULT_RESTAURANT_FILTERS.orden) {
    params.set("orden", filters.orden);
  }

  return params;
}

export function hasActiveFilters(filters: RestaurantFilters): boolean {
  return serializeRestaurantFilters(filters).toString().length > 0;
}