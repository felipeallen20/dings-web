import type { ReactNode } from "react";
import Image from "next/image";
import { Bike, Clock, MapPin } from "lucide-react";
import type { Restaurant } from "@/types/restaurant";
import type { Zone } from "@/types/zone";
import { StarRating } from "@/components/features/restaurant/StarRating";
import { VerifiedBadge } from "@/components/features/restaurant/VerifiedBadge";

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

interface StatProps {
  icon: ReactNode;
  children: ReactNode;
}

function Stat({ icon, children }: StatProps) {
  return (
    <span className="flex items-center gap-2 text-label-lg text-neutral">
      <span className="text-text-secondary">{icon}</span>
      {children}
    </span>
  );
}

export function RestaurantInfoCard({
  restaurant,
  zone,
}: {
  restaurant: Restaurant;
  zone: Zone | undefined;
}) {
  return (
    <div className="relative z-10 mx-auto -mt-[90px] w-[calc(100%-2rem)] max-w-[960px] lg:-mt-[120px]">
      <div className="rounded-xl border border-border bg-surface p-6 lg:p-8">
        <div className="flex items-start gap-5">
          <span className="relative block size-20 shrink-0 overflow-hidden rounded-full border-4 border-surface shadow-float lg:size-24">
            <Image
              src={restaurant.image}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </span>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-headline-md text-neutral lg:text-headline-lg">
                {restaurant.name}
              </h1>
              {restaurant.isVerified && <VerifiedBadge />}
            </div>

            <p className="text-body-sm text-text-secondary">
              {restaurant.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
              <StarRating
                rating={restaurant.rating}
                ratingCount={restaurant.ratingCount}
              />

              <Stat icon={<Clock className="size-4" aria-hidden />}>
                <span className="tabular-nums">
                  {restaurant.etaMinutes}–{restaurant.etaMinutes + 10} min
                </span>
              </Stat>

              <Stat icon={<Bike className="size-4" aria-hidden />}>
                <span className="tabular-nums">
                  {restaurant.shippingPrice === 0
                    ? "Envío gratis"
                    : priceFormatter.format(restaurant.shippingPrice)}
                </span>
              </Stat>

              <Stat icon={<MapPin className="size-4" aria-hidden />}>
                {zone?.name ?? "Bogotá"}
              </Stat>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}