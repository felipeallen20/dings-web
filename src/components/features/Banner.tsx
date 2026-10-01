import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import banner from "@/assets/images/banner.jpg";

export function Banner() {
  return (
    <section className="relative isolate aspect-[33/14] w-full overflow-hidden rounded-xl bg-surface">
      <Image
        src={banner}
        alt="Platillos de restaurantes locales"
        fill
        priority
        sizes="(min-width: 1280px) 1232px, 100vw"
        className="-z-10 object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-neutral/90 via-neutral/55 to-neutral/5 lg:bg-linear-to-r lg:from-neutral/85 lg:via-neutral/60 lg:to-transparent"
      />

      <div className="flex h-full flex-col justify-end gap-2 p-4 sm:justify-center sm:gap-3 sm:p-8 lg:gap-4 lg:p-16">
        <div className="max-w-xl space-y-1 sm:space-y-2 lg:space-y-3">
          <h2 className="text-title-sm text-white sm:text-headline-lg lg:text-display-sm">
            Sabores de tu barrio
          </h2>
          <p className="text-caption text-white/80 sm:text-body-lg">
            Cocina de autor y panadería de barrio, directo a tu mesa.
          </p>
        </div>

        <div className="pt-0.5 lg:pt-2">
          <Link
            href="/restaurantes"
            className="inline-flex h-8 items-center gap-1 rounded-lg bg-primary px-3.5 text-label-sm text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:h-12 sm:gap-2 sm:px-6 sm:text-label-lg"
          >
            Explorar restaurantes
            <ArrowRight className="size-3 shrink-0 sm:size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
