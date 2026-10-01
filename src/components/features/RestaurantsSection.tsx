import { RestaurantsCarousel } from "@/components/features/RestaurantsCarousel";
import { getRestaurants } from "@/services/restaurants";
import { DEFAULT_RESTAURANT_FILTERS } from "@/types/restaurant-filters";

const HOME_RESTAURANT_LIMIT = 6;

export async function RestaurantsSection() {
  const restaurants = await getRestaurants(DEFAULT_RESTAURANT_FILTERS);

  return <RestaurantsCarousel restaurants={restaurants.slice(0, HOME_RESTAURANT_LIMIT)} />;
}
