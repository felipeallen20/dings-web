import { RestaurantCard } from "@/components/features/restaurants/RestaurantCard";
import { getRestaurants } from "@/services/restaurants";
import { DEFAULT_RESTAURANT_FILTERS } from "@/types/restaurant-filters";

const HOME_RESTAURANT_LIMIT = 6;

export async function RestaurantsSection() {
  const restaurants = await getRestaurants(DEFAULT_RESTAURANT_FILTERS);

  return (
    <section className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-label-sm text-primary uppercase">Selección curada</p>
        <h2 className="text-headline-md text-neutral lg:text-headline-lg">
          Populares cerca de ti
        </h2>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.slice(0, HOME_RESTAURANT_LIMIT).map((restaurant) => (
          <li key={restaurant.id} className="h-full">
            <RestaurantCard restaurant={restaurant} />
          </li>
        ))}
      </ul>
    </section>
  );
}