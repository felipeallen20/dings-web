import type { StaticImageData } from "next/image";

export type DeliveryOption = "propio" | "recogida";

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
  categoryId: string;
  zoneId: string;
  distanceKm: number;
  etaMinutes: number;
  deliveryOptions: DeliveryOption[];
  isOpen: boolean;
  isVerified?: boolean;
}