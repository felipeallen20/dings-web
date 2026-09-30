import type { StaticImageData } from "next/image";

export interface MenuCategory {
  id: string;
  name: string;
}

export type ProductOptionGroupType = "single" | "multiple";

export interface ProductOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface ProductOptionGroup {
  id: string;
  name: string;
  hint?: string;
  type: ProductOptionGroupType;
  required?: boolean;
  min?: number;
  max?: number;
  options: ProductOption[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: StaticImageData;
  menuCategoryId: string;
  modifierGroups?: ProductOptionGroup[];
}

export interface RestaurantMenu {
  categories: MenuCategory[];
  products: Product[];
}