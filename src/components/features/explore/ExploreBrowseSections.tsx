import Link from "next/link";
import Image from "next/image";
import type { ExploreCategory, ExploreZone } from "@/services/explore";

export function ExploreCategoriesSection({
  categories,
}: {
  categories: ExploreCategory[];
}) {
  if (categories.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-label-xs text-primary uppercase">Categorías</p>
        <h2 className="text-title-sm text-neutral sm:text-headline-md">
          Explora por tipo de cocina
        </h2>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <li key={category.id} className="h-full">
            <Link
              href={`/restaurantes?categoria=${category.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong hover:shadow-hover"
            >
              <div className="relative block aspect-4/3 w-full bg-canvas-muted">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-0.5 px-2.5 py-2 sm:px-3 sm:py-2.5">
                <span className="line-clamp-2 text-caption text-neutral sm:text-label-lg">
                  {category.name}
                </span>
                <span className="text-label-xs text-text-secondary sm:text-label-sm">
                  {category.restaurantCount}{" "}
                  {category.restaurantCount === 1
                    ? "restaurante"
                    : "restaurantes"}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ExploreZonesSection({ zones }: { zones: ExploreZone[] }) {
  if (zones.length === 0) return null;

  return (
    <section className="flex flex-col gap-5">
      <div className="space-y-2">
        <p className="text-label-xs text-primary uppercase">Barrios y zonas</p>
        <h2 className="text-title-sm text-neutral sm:text-headline-md">
          Cerca de donde estás
        </h2>
      </div>

      <ul className="flex flex-wrap gap-2">
        {zones.map((zone) => (
          <li key={zone.id}>
            <Link
              href={`/restaurantes?zona=${zone.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-caption text-neutral transition-colors hover:border-border-strong hover:bg-canvas-muted sm:gap-2 sm:px-3.5 sm:py-2 sm:text-label-lg"
            >
              {zone.name}
              <span className="rounded-full bg-canvas-muted px-1.5 py-0.5 text-label-xs text-text-secondary sm:text-label-sm">
                {zone.restaurantCount}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}