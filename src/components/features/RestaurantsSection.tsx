import Image from "next/image";
import { Bike, Star, Zap } from "lucide-react";
import type { Restaurant } from "@/types/restaurant";
import hamburguesasImg from "@/assets/images/categories/hamburguesas.jpg";
import comidaCaseraImg from "@/assets/images/categories/comida-casera.jpg";
import comidaAsiaticaImg from "@/assets/images/categories/comida-asiatica.jpg";
import sandwichImg from "@/assets/images/categories/sandwich.jpg";
import parrillaImg from "@/assets/images/categories/parrilla.jpg";
import cafeImg from "@/assets/images/categories/cafe-panaderia.webp";

const RESTAURANTS: Restaurant[] = [
  {
    id: "fuego-lento-smash",
    name: "Fuego Lento Smash",
    image: hamburguesasImg,
    rating: 4.8,
    ratingCount: 850,
    description: "Smash Burgers, Papas truffle, Malteadas.",
    shippingPrice: 3900,
    express: true,
  },
  {
    id: "rincon-dona-rosa",
    name: "El Rincón de Doña Rosa",
    image: comidaCaseraImg,
    rating: 4.6,
    ratingCount: 420,
    description: "Comida casera, Arepas, Jugo de mora.",
    shippingPrice: 0,
    minOrder: 20000,
  },
  {
    id: "noodle-bar-88",
    name: "Noodle Bar 88",
    image: comidaAsiaticaImg,
    rating: 4.9,
    ratingCount: 1200,
    description: "Ramen casero, Gyozas, Té frío.",
    shippingPrice: 4900,
    minOrder: 25000,
  },
  {
    id: "esquina-del-barrio",
    name: "La Esquina del Barrio",
    image: sandwichImg,
    rating: 4.5,
    ratingCount: 310,
    description: "Arepas de masa, Empanadas, Jugo natural.",
    shippingPrice: 2900,
    express: true,
  },
  {
    id: "parrilla-don-chucho",
    name: "Parrilla Don Chucho",
    image: parrillaImg,
    rating: 4.7,
    ratingCount: 960,
    description: "Carnes al carbón, Chorizo, Yuca frita.",
    shippingPrice: 5900,
    minOrder: 30000,
  },
  {
    id: "cafe-mirador",
    name: "Café Mirador",
    image: cafeImg,
    rating: 4.4,
    ratingCount: 180,
    description: "Pan de queso, Cortado, Postres del día.",
    shippingPrice: 1900,
    minOrder: 15000,
  },
];

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function formatRatingCount(value: number) {
  return value >= 1000 ? `${(value / 1000).toFixed(1).replace(".", ",")}K` : `${value}`;
}

export function RestaurantsSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-label-sm text-primary uppercase">Selección curada</p>
        <h2 className="text-headline-md text-neutral lg:text-headline-lg">
          Populares cerca de ti
        </h2>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RESTAURANTS.map((restaurant) => (
          <li key={restaurant.id}>
            <a
              href={`/restaurantes/${restaurant.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong hover:shadow-hover"
            >
              <span className="relative block aspect-video w-full">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </span>

              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-title-md text-neutral">
                    {restaurant.name}
                  </h3>
                  <span className="flex shrink-0 items-center gap-1 rounded-[20px] bg-canvas-muted px-2.5 py-1">
                    <Star
                      className="size-3.5 fill-secondary text-secondary"
                      aria-hidden
                    />
                    <span className="text-label-sm text-neutral">
                      {restaurant.rating.toFixed(1)}
                    </span>
                    <span className="text-label-sm text-text-secondary">
                      ({formatRatingCount(restaurant.ratingCount)}+)
                    </span>
                  </span>
                </div>

                <p className="text-body-sm text-text-secondary">
                  {restaurant.description}
                </p>

                <div className="mt-auto flex items-center justify-between gap-2 rounded-[20px] bg-canvas-muted px-3 py-2">
                  <span className="flex items-center gap-2 text-label-md text-text-secondary">
                    <Bike className="size-4 shrink-0" aria-hidden />
                    {restaurant.shippingPrice === 0
                      ? "Envío gratis"
                      : `Envío ${priceFormatter.format(restaurant.shippingPrice)}`}
                  </span>

                  {restaurant.minOrder !== undefined ? (
                    <span className="text-label-md text-text-secondary">
                      Mín. {priceFormatter.format(restaurant.minOrder)}
                    </span>
                  ) : (
                    restaurant.express && (
                      <span className="flex items-center gap-1 text-label-md text-tertiary-strong">
                        <Zap className="size-3.5 shrink-0" aria-hidden />
                        Envío Súper Express
                      </span>
                    )
                  )}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
