"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ExploreDish } from "@/services/explore";
import { DishCard } from "@/components/features/explore/DishCard";

const arrowClass =
  "flex size-9 items-center justify-center rounded-full border border-border bg-surface text-neutral transition-colors hover:border-border-strong hover:bg-canvas-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:cursor-default disabled:opacity-40 disabled:hover:bg-surface";

interface DishScrollerProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dishes: ExploreDish[];
}

export function DishScroller({
  eyebrow,
  title,
  subtitle,
  dishes,
}: DishScrollerProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollByPage(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  }

  if (dishes.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-6">
        <div className="space-y-2">
          {eyebrow && (
            <p className="text-label-sm text-primary uppercase">{eyebrow}</p>
          )}
          <h2 className="text-headline-md text-neutral lg:text-headline-lg">
            {title}
          </h2>
          {subtitle && (
            <p className="text-body-md text-text-secondary">{subtitle}</p>
          )}
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label={`Ver anteriores de ${title}`}
            className={arrowClass}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label={`Ver más de ${title}`}
            className={arrowClass}
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0"
      >
        {dishes.map((dish) => (
          <li
            key={dish.id}
            className="w-[260px] shrink-0 snap-start sm:w-[280px]"
          >
            <DishCard dish={dish} />
          </li>
        ))}
      </ul>
    </section>
  );
}