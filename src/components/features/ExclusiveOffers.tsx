import Image from "next/image";
import { Percent } from "lucide-react";
import type { Offer } from "@/types/offer";
import hamburguesasImg from "@/assets/images/categories/hamburguesas.jpg";
import sushiImg from "@/assets/images/categories/sushi.jpg";
import postresImg from "@/assets/images/categories/postres.jpg";

const OFFERS: Offer[] = [
  {
    id: "truffle-fries",
    badge: "-35%",
    restaurant: "Fuego Lento Smash",
    dish: "Truffle Fries D.O.P.",
    image: hamburguesasImg,
    price: 70000,
    originalPrice: 108000,
  },
  {
    id: "spicy-tuna-crunch",
    badge: "2x1",
    restaurant: "Omakase Lab & Rolls",
    dish: "Spicy Tuna Crunch",
    image: sushiImg,
    price: 210000,
    originalPrice: 420000,
  },
  {
    id: "tiramisu",
    badge: "-25%",
    restaurant: "Trattoria Bella Napoli",
    dish: "Tiramisú al Mascarpone",
    image: postresImg,
    price: 105000,
    originalPrice: 140000,
  },
];

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function ExclusiveOffers() {
  return (
    <section
      aria-labelledby="exclusive-offers-title"
      className="flex flex-col gap-6 rounded-xl bg-canvas-muted p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-white"
            aria-hidden
          >
            <Percent className="size-6" />
          </span>
          <div className="space-y-1">
            <h2
              id="exclusive-offers-title"
              className="text-title-md text-neutral sm:text-headline-md"
            >
              Ofertas exclusivas de hoy
            </h2>
            <p className="text-body-sm text-text-secondary">
              Descuentos directos en platillos insignia de restaurantes
              seleccionados
            </p>
          </div>
        </div>

        <span className="rounded-full bg-secondary/15 px-4 py-2 text-label-sm text-secondary uppercase">
          Terminan hoy 11:59 PM
        </span>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OFFERS.map((offer) => (
          <li key={offer.id}>
            <article className="flex h-full items-center gap-4 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-border-strong hover:shadow-hover">
              <div className="relative size-[84px] shrink-0">
                <Image
                  src={offer.image}
                  alt={offer.dish}
                  fill
                  sizes="84px"
                  className="rounded-lg object-cover"
                />
                <span className="absolute top-2.5 left-2.5 rounded-full bg-secondary px-2 py-1 text-label-sm text-white">
                  {offer.badge}
                </span>
              </div>

              <div className="min-w-0 space-y-1">
                <p className="truncate text-label-md text-text-secondary">
                  {offer.restaurant}
                </p>
                <h3 className="line-clamp-2 text-body-lg font-semibold text-neutral">
                  {offer.dish}
                </h3>
                <p className="flex flex-wrap items-baseline gap-2">
                  <span className="text-title-md tabular-nums text-secondary">
                    {priceFormatter.format(offer.price)}
                  </span>
                  <span className="text-label-md tabular-nums text-text-secondary line-through">
                    {priceFormatter.format(offer.originalPrice)}
                  </span>
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
