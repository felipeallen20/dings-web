import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RestaurantInfoCard } from "@/components/features/restaurant/RestaurantInfoCard";
import { MenuSections } from "@/components/features/restaurant/MenuSections";
import { getRestaurantMenu } from "@/services/menu";
import {
  getRestaurantById,
  getRestaurantIds,
  getZones,
} from "@/services/restaurants";

export async function generateStaticParams() {
  const ids = await getRestaurantIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const restaurant = await getRestaurantById(id);

  if (!restaurant) {
    return { title: "Restaurante no encontrado | Dings" };
  }

  return {
    title: `${restaurant.name} | Dings`,
    description: restaurant.description,
  };
}

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = await getRestaurantById(id);

  if (!restaurant) {
    notFound();
  }

  const [menu, zones] = await Promise.all([
    getRestaurantMenu(restaurant),
    getZones(),
  ]);
  const zone = zones.find((item) => item.id === restaurant.zoneId);

  return (
    <main className="w-full px-4 py-6 md:px-6 lg:py-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-margin-mobile lg:gap-margin">
        <div className="relative">
          <div className="relative h-[300px] overflow-hidden rounded-xl lg:h-[400px]">
            <Image
              src={restaurant.image}
              alt={`Portada de ${restaurant.name}`}
              fill
              priority
              sizes="(min-width: 1280px) 1232px, 100vw"
              className="object-cover"
            />
          </div>

          <RestaurantInfoCard restaurant={restaurant} zone={zone} />
        </div>

        <MenuSections
          categories={menu.categories}
          products={menu.products}
          restaurant={{ id: restaurant.id, name: restaurant.name }}
        />
      </div>
    </main>
  );
}