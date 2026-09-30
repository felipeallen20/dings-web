import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import promoRest from "@/assets/images/banners/promo-rest.jpg";

const COMMISSION_TIERS = [
  { id: "propio", label: "Tu domiciliario", rate: "8–10%" },
  { id: "recogida", label: "Si el cliente recoge", rate: "3–5%" },
];

export function SellOnDingsSection() {
  return (
    <section
      aria-labelledby="sell-on-dings-title"
      className="relative isolate overflow-hidden rounded-xl bg-inverse-surface"
    >
      <Image
        src={promoRest}
        alt=""
        fill
        sizes="(min-width: 1024px) 1232px, 100vw"
        className="-z-10 object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-inverse-surface/95 via-inverse-surface/85 to-inverse-surface/55"
      />

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14 lg:p-12">
        <div className="space-y-4">
          <p className="text-label-sm text-inverse-on-surface/70 uppercase">
            Para restaurantes
          </p>
          <h2
            id="sell-on-dings-title"
            className="text-headline-md text-inverse-on-surface lg:text-headline-lg"
          >
            Vende en Dings
          </h2>
          <p className="max-w-md text-body-md text-inverse-on-surface/80">
            Cobramos solo por lo que usas. Publica tu menú, mantén tus precios
            competitivos y recibe pedidos de tu barrio.
          </p>
          <Link
            href="/registrar-restaurante"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-secondary px-6 text-label-lg text-white transition-colors hover:bg-secondary-hover focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-inverse-surface focus-visible:outline-none"
          >
            Registrar mi restaurante
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </Link>
        </div>

        <dl className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 sm:divide-x sm:divide-inverse-on-surface/20">
          {COMMISSION_TIERS.map(({ id, label, rate }) => (
            <div key={id}>
              <dt className="text-label-md text-inverse-on-surface/70 uppercase">
                {label}
              </dt>
              <dd className="mt-1 text-headline-lg text-inverse-on-surface tabular-nums">
                {rate}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
