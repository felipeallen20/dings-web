import type { StaticImageData } from "next/image";

export interface MenuCategory {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: StaticImageData;
  menuCategoryId: string;
}

export interface RestaurantMenu {
  categories: MenuCategory[];
  products: Product[];
}