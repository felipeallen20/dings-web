"use client";

import { type ReactNode } from "react";
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
import { hasActiveFilters } from "@/services/restaurant-filters";
import { useApplyRestaurantFilters } from "@/hooks/useApplyRestaurantFilters";

const DISTANCE_OPTIONS: { value: DistanceRange; label: string }[] = [
  { value: "0-1", label: "Menos de 1 km" },
  { value: "1-3", label: "1 a 3 km" },
  { value: "3-5", label: "3 a 5 km" },
  { value: "5-mas", label: "Más de 5 km" },
];

const DELIVERY_OPTIONS: { value: DeliveryOption; label: string }[] = [
  { value: "propio", label: "Domicilio propio" },
  { value: "recogida", label: "Recogida en el local" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "cercania", label: "Más cercanos" },
  { value: "rating", label: "Mejor calificados" },
  { value: "envio", label: "Envío más barato" },
];

const sectionLabelClass =
  "text-label-xs text-text-secondary uppercase tracking-wider";

const compactSelectClass =
  "h-7 w-full appearance-none rounded-full border border-border bg-surface pr-6 pl-2.5 text-caption text-neutral transition-colors hover:bg-canvas-muted focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none sm:h-8 sm:pl-3.5 sm:text-label-md";

const compactChevronClass =
  "pointer-events-none absolute top-1/2 right-2 size-3 -translate-y-1/2 text-text-secondary";

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

interface FilterSelectProps {
  label: string;
  value: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function FilterSelect({
  label,
  value,
  placeholder,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className={sectionLabelClass}>{label}</span>
      <div className="relative">
        <select
          aria-label={label}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={compactSelectClass}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className={compactChevronClass} aria-hidden />
      </div>
    </div>
  );
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

interface RestaurantFiltersBarProps {
  filters: RestaurantFilters;
  zones: Zone[];
  categories: Category[];
  resultCount: number;
}

export function RestaurantFiltersBar({
  filters,
  zones,
  categories,
  resultCount,
}: RestaurantFiltersBarProps) {
  const applyFilters = useApplyRestaurantFilters();
  const showClear = hasActiveFilters(filters);
  const plural = resultCount === 1 ? "restaurante" : "restaurantes";

  return (
    <div className="sticky top-16 z-30 rounded-xl border border-border bg-surface shadow-float md:top-[75px]">
      <div className="md:hidden">
        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 p-3 sm:gap-4 sm:p-4 lg:grid-cols-4">
          <FilterSelect
            label="Zona"
            value={filters.zona ?? ""}
            placeholder="Todas"
            options={zones.map((zone) => ({ value: zone.id, label: zone.name }))}
            onChange={(zona) => applyFilters({ ...filters, zona: zona || null })}
          />

          <FilterSelect
            label="Proximidad"
            value={filters.distancia ?? ""}
            placeholder="Todas"
            options={DISTANCE_OPTIONS}
            onChange={(distancia) =>
              applyFilters({
                ...filters,
                distancia: (distancia || null) as DistanceRange | null,
              })
            }
          />

          <FilterSelect
            label="Entrega"
            value={filters.entrega ?? ""}
            placeholder="Todas"
            options={DELIVERY_OPTIONS}
            onChange={(entrega) =>
              applyFilters({
                ...filters,
                entrega: (entrega || null) as DeliveryOption | null,
              })
            }
          />

          <FilterSelect
            label="Categorías"
            value={filters.categorias[0] ?? ""}
            placeholder="Todas"
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            onChange={(categoria) =>
              applyFilters({
                ...filters,
                categorias: categoria ? [categoria] : [],
              })
            }
          />
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-2 sm:px-4">
          <button
            type="button"
            aria-pressed={filters.abiertos}
            onClick={() =>
              applyFilters({ ...filters, abiertos: !filters.abiertos })
            }
            className={filters.abiertos ? pillActive : pillIdle}
          >
            Abierto ahora
          </button>

          {showClear && (
            <button
              type="button"
              onClick={() => applyFilters(DEFAULT_RESTAURANT_FILTERS)}
              className="inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-caption text-primary transition-colors hover:bg-canvas-muted sm:h-8 sm:text-label-md"
            >
              <X className="size-3 shrink-0 sm:size-3.5" aria-hidden />
              Limpiar
            </button>
          )}
        </div>
      </div>

      <div className="hidden md:block">
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
              {DISTANCE_OPTIONS.map(({ value, label }) => {
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
              {DELIVERY_OPTIONS.map(({ value, label }) => {
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
            onClick={() =>
              applyFilters({ ...filters, abiertos: !filters.abiertos })
            }
            className={filters.abiertos ? pillActive : pillIdle}
          >
            Abierto ahora
          </button>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-label-md text-text-secondary tabular-nums">
              {resultCount} {plural}
            </span>

            {showClear && (
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
                  onClick={() => {
                    const isSelected = filters.categorias.includes(category.id);
                    applyFilters({
                      ...filters,
                      categorias: isSelected
                        ? filters.categorias.filter((id) => id !== category.id)
                        : [...filters.categorias, category.id],
                    });
                  }}
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
              {SORT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown className={chevronClass} aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}