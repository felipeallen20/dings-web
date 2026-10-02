import type { Metadata } from "next";
import { OrdersView } from "@/components/features/orders/OrdersView";
import type { OrderSeed } from "@/services/orders";
import { getRestaurantMenu } from "@/services/menu";
import { getRestaurants } from "@/services/restaurants";
import { DEFAULT_RESTAURANT_FILTERS } from "@/types/restaurant-filters";

export const metadata: Metadata = {
  title: "Mis pedidos | Dings",
  description: "Sigue tus pedidos en curso y revisa tu historial en Dings.",
};

const SEED_COUNT = 6;

export default async function PedidosPage() {
  const restaurants = await getRestaurants(DEFAULT_RESTAURANT_FILTERS);
  const selected = restaurants.slice(0, SEED_COUNT);
  const menus = await Promise.all(
    selected.map((restaurant) => getRestaurantMenu(restaurant)),
  );

  const seeds: OrderSeed[] = selected.map((restaurant, index) => ({
    restaurant,
    products: menus[index].products,
  }));

  return (
    <main className="w-full px-4 py-6 md:px-6 lg:py-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-margin-mobile lg:gap-margin">
        <header className="space-y-1">
          <p className="text-label-xs text-primary uppercase">Historial</p>
          <h1 className="text-title-sm text-neutral sm:text-headline-lg lg:text-display-sm">
            Mis pedidos
          </h1>
        </header>

        <OrdersView seeds={seeds} />
      </div>
    </main>
  );
}