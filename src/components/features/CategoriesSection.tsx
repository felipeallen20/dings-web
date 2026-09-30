"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Category } from "@/types/category";
import hamburguesasImg from "@/assets/images/categories/hamburguesas.jpg";
import pizzaImg from "@/assets/images/categories/pizza.jpg";
import sushiImg from "@/assets/images/categories/sushi.jpg";
import tacosImg from "@/assets/images/categories/tacos.jpg";
import asiaticaImg from "@/assets/images/categories/comida-asiatica.jpg";
import ensaladaImg from "@/assets/images/categories/ensalada.jpg";
import sandwichImg from "@/assets/images/categories/sandwich.jpg";
import pastaImg from "@/assets/images/categories/pasta.jpg";
import parrillaImg from "@/assets/images/categories/parrilla.jpg";
import caseraImg from "@/assets/images/categories/comida-casera.jpg";
import postresImg from "@/assets/images/categories/postres.jpg";
import cafeImg from "@/assets/images/categories/cafe-panaderia.webp";

const CATEGORIES: Category[] = [
  { id: "hamburguesas", name: "Hamburguesas", image: hamburguesasImg },
  { id: "pizza", name: "Pizza", image: pizzaImg },
  { id: "sushi", name: "Sushi", image: sushiImg },
  { id: "mexicana", name: "Comida mexicana", image: tacosImg },
  { id: "asiatica", name: "Comida asiática", image: asiaticaImg },
  { id: "ensaladas", name: "Ensaladas", image: ensaladaImg },
  { id: "sandwiches", name: "Sándwiches", image: sandwichImg },
  { id: "pastas", name: "Pastas", image: pastaImg },
  { id: "parrilla", name: "Parrilla", image: parrillaImg },
  { id: "casera", name: "Comida casera", image: caseraImg },
  { id: "postres", name: "Postres", image: postresImg },
  { id: "cafe", name: "Café y panadería", image: cafeImg },
];

const EDGE_TOLERANCE = 4;

export function CategoriesSection() {
  const trackRef = useRef<HTMLUListElement>(null);

  const handlePrev = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft <= EDGE_TOLERANCE) {
      track.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - EDGE_TOLERANCE) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
    }
  };

  const buttonClass =
    "flex size-10 items-center justify-center rounded-full bg-canvas-muted text-neutral transition-colors hover:bg-border";

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-label-sm text-primary uppercase">
            Categorías Gastronómicas
          </p>
          <h2 className="text-headline-md text-neutral lg:text-headline-lg">
            ¿Qué se te antoja hoy?
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Categoría anterior"
            className={buttonClass}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Categoría siguiente"
            className={buttonClass}
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2"
      >
        {CATEGORIES.map((category) => (
          <li
            key={category.id}
            className="w-[calc((100%-0.5rem)/2)] shrink-0 snap-start sm:w-[calc((100%-1rem)/3)] lg:w-[calc((100%-2.75rem)/6.5)]"
          >
            <a
              href={`/explorar?categoria=${category.id}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong hover:shadow-hover"
            >
              <span className="relative block aspect-4/3 w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 15vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="px-3 py-2.5 text-center text-label-lg text-neutral">
                {category.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
