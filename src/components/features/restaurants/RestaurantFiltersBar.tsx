"use client";

import { useCallback, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, MapPin, SlidersHorizontal, X } from "lucide-react";
import type { Category } from "@/types/category";
import type { Zone } from "@/types/zone";
import {
  DEFAULT_RESTAURANT_FILTERS,
  type DistanceRange,
  type RestaurantFilters,
  type SortOption,
} from "@/types/restaurant-filters";
import type { DeliveryOption } from "@/types/restaurant";
import {
  hasActiveFilters,
  serializeRestaurantFilters,
} from "@/services/restaurant-filters";

const DISTANCE_LABELS: { value: DistanceRange; label: string }[] = [
  { value: "0-1", label: "Menos de 1 km" },
  { value: "1-3", label: "1 a 3 km" },
  { value: "3-5", label: "3 a 5 km" },
  { value: "5-mas", label: "Más de 5 km" },
];

const DELIVERY_LABELS: { value: DeliveryOption; label: string }[] = [
  { value: "propio", label: "Domicilio propio" },
  { value: "recogida", label: "Recogida en el local" },
];

const SORT_LABELS: { value: SortOption; label: string }[] = [
  { value: "cercania", label: "Más cercanos" },
  { value: "rating", label: "Mejor calificados" },
  { value: "envio", label: "Envío más barato" },
];

const pillBase =
  "inline-flex h-8 shrink-0 items-center rounded-full border px-3.5 text-label-md transition-colors";

const pillIdle = `${pillBase} border-border bg-surface text-text-secondary hover:border-border-strong hover:bg-canvas-muted`;

const pillActive = `${pillBase} border-primary bg-primary text-white hover:bg-primary-hover`;

const selectClass =
  "h-8 appearance-none rounded-full border border-border bg-surface pr-8 pl-3.5 text-label-md text-neutral transition-colors hover:bg-canvas-muted focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none";

const chevronClass =
  "pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-text-secondary";

const groupLabelClass =
  "flex shrink-0 items-center gap-1.5 text-label-sm text-text-secondary uppercase";

interface RestaurantFiltersBarProps {
  filters: RestaurantFilters;
  zones: Zone[];
  categories: Category[];
  resultCount: number;
}

function FilterGroup({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={groupLabelClass}>
        {icon}
        {label}
      </span>
      {children}
    </div>
  );
}

export function RestaurantFiltersBar({
  filters,
  zones,
  categories,
  resultCount,
}: RestaurantFiltersBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const applyFilters = useCallback(
    (next: RestaurantFilters) => {
      const query = serializeRestaurantFilters(next).toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router],
  );

  const toggleCategoria = useCallback(
    (categoryId: string) => {
      const isActive = filters.categorias.includes(categoryId);
      applyFilters({
        ...filters,
        categorias: isActive
          ? filters.categorias.filter((id) => id !== categoryId)
          : [...filters.categorias, categoryId],
      });
    },
    [applyFilters, filters],
  );

  const plural = resultCount === 1 ? "restaurante" : "restaurantes";

  return (
    <div className="sticky top-[75px] z-30 rounded-xl border border-border bg-surface shadow-float">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3">
        <FilterGroup
          label="Zona"
          icon={<MapPin className="size-3.5" aria-hidden />}
        >
          <div className="relative">
            <select
              aria-label="Zona"
              value={filters.zona ?? ""}
              onChange={(event) =>
                applyFilters({ ...filters, zona: event.target.value || null })
              }
              className={selectClass}
            >
              <option value="">Todas las zonas</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </select>
            <ChevronDown className={chevronClass} aria-hidden />
          </div>
        </FilterGroup>

        <FilterGroup label="Proximidad">
          <div className="flex items-center gap-1.5">
            {DISTANCE_LABELS.map(({ value, label }) => {
              const isActive = filters.distancia === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() =>
                    applyFilters({
                      ...filters,
                      distancia: isActive ? null : value,
                    })
                  }
                  className={isActive ? pillActive : pillIdle}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </FilterGroup>

        <FilterGroup label="Entrega">
          <div className="flex items-center gap-1.5">
            {DELIVERY_LABELS.map(({ value, label }) => {
              const isActive = filters.entrega === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() =>
                    applyFilters({
                      ...filters,
                      entrega: isActive ? null : value,
                    })
                  }
                  className={isActive ? pillActive : pillIdle}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </FilterGroup>

        <button
          type="button"
          aria-pressed={filters.abiertos}
          onClick={() => applyFilters({ ...filters, abiertos: !filters.abiertos })}
          className={filters.abiertos ? pillActive : pillIdle}
        >
          Abierto ahora
        </button>

        <div className="ml-auto flex items-center gap-3">
          <span className="text-label-md text-text-secondary tabular-nums">
            {resultCount} {plural}
          </span>

          {hasActiveFilters(filters) && (
            <button
              type="button"
              onClick={() => applyFilters(DEFAULT_RESTAURANT_FILTERS)}
              className="inline-flex h-8 items-center gap-1 rounded-full px-2.5 text-label-md text-primary transition-colors hover:bg-canvas-muted"
            >
              <X className="size-3.5" aria-hidden />
              Limpiar
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-border px-4 py-3">
        <span className={groupLabelClass}>
          <SlidersHorizontal className="size-3.5" aria-hidden />
          Categoría
        </span>

        <div className="no-scrollbar flex flex-1 items-center gap-1.5 overflow-x-auto">
          {categories.map((category) => {
            const isActive = filters.categorias.includes(category.id);
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => toggleCategoria(category.id)}
                className={isActive ? pillActive : pillIdle}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="relative shrink-0">
          <select
            aria-label="Ordenar por"
            value={filters.orden}
            onChange={(event) =>
              applyFilters({
                ...filters,
                orden: event.target.value as SortOption,
              })
            }
            className={selectClass}
          >
            {SORT_LABELS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDown className={chevronClass} aria-hidden />
        </div>
      </div>
    </div>
  );
}