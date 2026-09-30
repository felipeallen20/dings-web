import type { StaticImageData } from "next/image";

export interface Offer {
  id: string;
  badge: string;
  restaurant: string;
  dish: string;
  image: StaticImageData;
  price: number;
  originalPrice: number;
}
