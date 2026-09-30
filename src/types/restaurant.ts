import type { StaticImageData } from "next/image";

export interface Restaurant {
  id: string;
  name: string;
  image: StaticImageData;
  rating: number;
  ratingCount: number;
  description: string;
  shippingPrice: number;
  minOrder?: number;
  express?: boolean;
}
