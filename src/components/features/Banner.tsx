"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import banner1 from "@/assets/images/banners/banner1.webp";
import banner2 from "@/assets/images/banners/banner2.webp";
import banner3 from "@/assets/images/banners/banner3.webp";

const AUTOSLIDE_MS = 8000;
const SWIPE_THRESHOLD_PX = 40;

/**
 * Fuentes originales: 2048px (banner1/banner3) y 3168px (banner2), con la
 * misma proporción 33:14. Como el contenedor tope en 1232px, todas entran por
 * reduccion y no hace falta capear el ancho.
 */
const BANNER_SIZES =
  "(min-width: 1280px) 1232px, (min-width: 768px) calc(100vw - 48px), calc(100vw - 32px)";

const SLIDES = [
  {
    id: "banner1",
    src: banner1,
    alt: "Descubre qué hay para hoy en Dings",
    href: "/explorar",
  },
  {
    id: "banner2",
    src: banner2,
    alt: "Encuentra restaurantes cerca de ti",
    href: "/restaurantes",
  },
  { id: "banner3", src: banner3, alt: "Novedades de Dings", href: null },
];

const arrowClass =
  "pointer-events-auto flex size-9 items-center justify-center rounded-full border border-border bg-surface/85 text-neutral opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-surface focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none lg:size-10";

export function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);

  const swipeStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % SLIDES.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => setIsTabHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (isHovering || isTabHidden) return;

    const current = activeIndex;
    const timeout = window.setTimeout(() => {
      setActiveIndex((current + 1) % SLIDES.length);
    }, AUTOSLIDE_MS);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, isHovering, isTabHidden]);

  function handlePointerDown(event: React.PointerEvent<HTMLElement>) {
    swipeStartX.current = event.clientX;
    didSwipe.current = false;
  }

  function handlePointerUp(event: React.PointerEvent<HTMLElement>) {
    if (swipeStartX.current === null) return;

    const delta = event.clientX - swipeStartX.current;
    swipeStartX.current = null;

    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;

    didSwipe.current = true;
    if (delta < 0) {
      goNext();
    } else {
      goPrev();
    }
  }

  return (
    <section
      className="group relative isolate aspect-[33/14] w-full touch-pan-y overflow-hidden rounded-xl bg-surface"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      aria-roledescription="carrusel"
      aria-label="Promociones destacadas"
    >
      {SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;
        const slideState = isActive
          ? "opacity-100"
          : "pointer-events-none opacity-0";

        const content = (
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes={BANNER_SIZES}
            className="object-cover"
          />
        );

        return slide.href ? (
          <Link
            key={slide.id}
            href={slide.href}
            tabIndex={isActive ? 0 : -1}
            aria-hidden={!isActive}
            onClick={(event) => {
              if (didSwipe.current) {
                event.preventDefault();
                didSwipe.current = false;
              }
            }}
            className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${slideState}`}
          >
            {content}
          </Link>
        ) : (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${slideState}`}
          >
            {content}
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 hidden items-center justify-between p-3 md:flex">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Banner anterior"
          className={`${arrowClass} -translate-x-1 group-hover:translate-x-0 focus-visible:translate-x-0 motion-reduce:transform-none`}
        >
          <ChevronLeft className="size-4 lg:size-5" aria-hidden />
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="Banner siguiente"
          className={`${arrowClass} translate-x-1 group-hover:translate-x-0 focus-visible:translate-x-0 motion-reduce:transform-none`}
        >
          <ChevronRight className="size-4 lg:size-5" aria-hidden />
        </button>
      </div>
    </section>
  );
}