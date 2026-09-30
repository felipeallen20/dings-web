import type { StaticImageData } from "next/image";

export interface CartRestaurantRef {
  id: string;
  name: string;
}

export interface SelectedOptionGroup {
  groupId: string;
  groupName: string;
  optionNames: string[];
}

export interface CartLineInput {
  productId: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  basePrice: number;
  price: number;
  image: StaticImageData;
  selections: SelectedOptionGroup[];
}

export interface CartLine extends CartLineInput {
  quantity: number;
}

export interface CartLineGroup {
  restaurantId: string;
  restaurantName: string;
  lines: CartLine[];
  subtotal: number;
}