import type { StaticImageData } from "next/image";
import type { Address } from "@/types/address";
import type { SelectedOptionGroup } from "@/types/cart";

export type OrderStatus =
  | "recibido"
  | "en_preparacion"
  | "en_camino"
  | "entregado"
  | "cancelado";

export interface OrderLineSnapshot {
  productId: string;
  name: string;
  quantity: number;
  basePrice: number;
  unitPrice: number;
  lineTotal: number;
  image: StaticImageData;
  selections: SelectedOptionGroup[];
}

export interface OrderEvent {
  status: OrderStatus;
  at: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: StaticImageData;
  placedAt: string;
  status: OrderStatus;
  lines: OrderLineSnapshot[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  addressSnapshot: Address;
  paymentLabel: string;
  etaMinutes: number;
  timeline: OrderEvent[];
}