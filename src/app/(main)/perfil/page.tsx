import type { Metadata } from "next";
import { ProfileView } from "@/components/features/profile/ProfileView";
import { getZones } from "@/services/restaurants";
import { getRestaurants } from "@/services/restaurants";
import { DEFAULT_RESTAURANT_FILTERS } from "@/types/restaurant-filters";

export const metadata: Metadata = {
  title: "Mi perfil | Dings",
  description: "Actualiza tus datos, direcciones y preferencias en Dings.",
};

const MOCK_FAVORITES_COUNT = 4;

export default async function PerfilPage() {
  const [restaurants, zones] = await Promise.all([
    getRestaurants(DEFAULT_RESTAURANT_FILTERS),
    getZones(),
  ]);

  return (
    <main className="w-full px-4 py-6 md:px-6 lg:py-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-margin-mobile lg:gap-margin">
        <header className="space-y-1">
          <p className="text-label-xs text-primary uppercase">Cuenta</p>
          <h1 className="text-title-sm text-neutral sm:text-headline-lg lg:text-display-sm">
            Mi perfil
          </h1>
        </header>

        <ProfileView
          zones={zones}
          favorites={restaurants.slice(0, MOCK_FAVORITES_COUNT)}
        />
      </div>
    </main>
  );
}