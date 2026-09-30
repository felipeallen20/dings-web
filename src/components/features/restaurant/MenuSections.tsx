import type { MenuCategory, Product } from "@/types/menu";
import { ProductCard } from "@/components/features/restaurant/ProductCard";

interface MenuSectionsProps {
  categories: MenuCategory[];
  products: Product[];
}

export function MenuSections({ categories, products }: MenuSectionsProps) {
  return (
    <div className="flex flex-col gap-margin">
      {categories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.menuCategoryId === category.id,
        );

        if (categoryProducts.length === 0) return null;

        return (
          <section key={category.id} className="flex flex-col gap-6">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-headline-md text-neutral lg:text-headline-lg">
                {category.name}
              </h2>
              <p className="text-label-md text-text-secondary tabular-nums">
                {categoryProducts.length}{" "}
                {categoryProducts.length === 1 ? "producto" : "productos"}
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categoryProducts.map((product) => (
                <li key={product.id} className="h-full">
                  <ProductCard product={product} category={category} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}