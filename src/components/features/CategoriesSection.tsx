"use client";

import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/services/categories";
import { useCarousel } from "@/hooks/useCarousel";
import { CarouselArrows } from "@/components/ui/CarouselArrows";

export function CategoriesSection() {
  const { trackRef, scrollPrev, scrollNext } =
    useCarousel<HTMLUListElement>();
  const categories = getCategories();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-label-xs text-primary uppercase">
            Categorías Gastronómicas
          </p>
          <h2 className="text-title-sm text-neutral sm:text-headline-md">
            ¿Qué se te antoja hoy?
          </h2>
        </div>

        <CarouselArrows
          onPrev={scrollPrev}
          onNext={scrollNext}
          prevLabel="Categoría anterior"
          nextLabel="Categoría siguiente"
        />
      </div>

      <ul
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {categories.map((category) => (
          <li
            key={category.id}
            className="w-[calc((100%-2rem)/3)] shrink-0 snap-start px-1 sm:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-5rem)/6)]"
          >
            <Link
              href={`/restaurantes?categoria=${category.id}`}
              className="group flex flex-col gap-1.5"
            >
              <span className="relative block aspect-square w-full overflow-hidden rounded-lg bg-canvas-muted">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="line-clamp-1 text-center text-caption text-neutral sm:text-label-md">
                {category.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}