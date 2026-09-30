import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import banner from "@/assets/images/banner.jpg";

export function Banner() {
  return (
    <section className="relative isolate overflow-hidden rounded-xl bg-surface">
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
        className="absolute inset-0 -z-10 bg-linear-to-r from-neutral/85 via-neutral/60 to-transparent"
      />

      <div className="flex min-h-80 flex-col justify-center gap-4 p-6 sm:min-h-96 sm:p-8 lg:min-h-[500px] lg:p-16">
        <div className="max-w-xl space-y-3">
          <h2 className="text-display-sm font-extrabold text-white sm:text-headline-lg">
            Sabores auténticos de tu vecindario directo a tu mesa.
          </h2>
          <p className="text-body-md text-white/85 sm:text-body-lg">
            Descubre creaciones de autor, panaderías de masa madre y cocinas
            independientes seleccionadas por su obsesión con la calidad.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/restaurantes"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-label-lg text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Explorar restaurantes
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
