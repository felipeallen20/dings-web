import { DishScroller } from "@/components/features/explore/DishScroller";
import type { ExploreCollection, ExploreDish } from "@/services/explore";

export function ExploreCollections({
  collections,
}: {
  collections: ExploreCollection[];
}) {
  return (
    <>
      {collections.map((collection) => (
        <DishScroller
          key={collection.id}
          eyebrow="Colecciones"
          title={collection.title}
          subtitle={collection.subtitle}
          dishes={collection.dishes}
        />
      ))}
    </>
  );
}

export function ExploreTrending({
  dishes,
}: {
  dishes: ExploreDish[];
}) {
  return (
    <DishScroller
      eyebrow="Toca hoy"
      title="Lo que más pide la gente"
      subtitle="Platillos destacados que combinan rapidez, calificación y valor."
      dishes={dishes}
    />
  );
}