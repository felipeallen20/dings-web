import { Banner } from "@/components/features/Banner";
import { CategoriesSection } from "@/components/features/CategoriesSection";
import { RestaurantsSection } from "@/components/features/RestaurantsSection";
import { ExclusiveOffers } from "@/components/features/ExclusiveOffers";
import { SellOnDingsSection } from "@/components/features/SellOnDingsSection";

export default function Home() {
  return (
    <main className="w-full px-4 py-6 md:px-6 lg:py-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-margin-mobile lg:gap-margin">
        <Banner />
        <CategoriesSection />
        <ExclusiveOffers />
        <RestaurantsSection />
        <SellOnDingsSection />
      </div>
    </main>
  );
}
