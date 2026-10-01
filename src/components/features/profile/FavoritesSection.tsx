"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Restaurant } from "@/types/restaurant";
import { Card } from "@/components/ui/Card";
import { RestaurantSliderCard } from "@/components/features/restaurants/RestaurantSliderCard";

interface FavoritesSectionProps {
  restaurants: Restaurant[];
}

export function FavoritesSection({ restaurants }: FavoritesSectionProps) {
  const plural = restaurants.length === 1 ? "restaurante" : "restaurantes";

  return (
    <Card
      title="Favoritos"
      description={`${restaurants.length} ${plural} guardado${restaurants.length === 1 ? "" : "s"}.`}
      action={
        <Link
          href="/restaurantes"
          className="text-caption text-primary transition-colors hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:text-label-md"
        >
          Ver todos
        </Link>
      }
    >
      {restaurants.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border-strong bg-canvas-muted/40 px-4 py-8 text-center">
          <Heart className="size-5 text-text-secondary" aria-hidden />
          <p className="text-caption text-text-secondary sm:text-body-md">
            Guarda restaurantes para pedirlos más rápido la próxima vez.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <RestaurantSliderCard restaurant={restaurant} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}