"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const buttonClass =
  "flex size-8 items-center justify-center rounded-full bg-canvas-muted text-neutral transition-colors hover:bg-border sm:size-10";

interface CarouselArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
}

export function CarouselArrows({
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
}: CarouselArrowsProps) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={onPrev}
        aria-label={prevLabel}
        className={buttonClass}
      >
        <ChevronLeft className="size-4 sm:size-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className={buttonClass}
      >
        <ChevronRight className="size-4 sm:size-5" aria-hidden />
      </button>
    </div>
  );
}
