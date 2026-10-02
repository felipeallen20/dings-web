import type { Address } from "@/types/address";
import type { Product } from "@/types/menu";
import type { Order, OrderEvent, OrderLineSnapshot, OrderStatus } from "@/types/order";
import type { Restaurant } from "@/types/restaurant";
import type { SelectedOptionGroup } from "@/types/cart";

export interface OrderSeed {
  restaurant: Restaurant;
  products: Product[];
}

export const ORDER_FLOW: OrderStatus[] = [
  "recibido",
  "en_preparacion",
  "en_camino",
  "entregado",
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  recibido: "Pedido recibido",
  en_preparacion: "En preparación",
  en_camino: "En camino",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

export const ORDER_STATUS_SHORT: Record<OrderStatus, string> = {
  recibido: "Recibido",
  en_preparacion: "En preparación",
  en_camino: "En camino",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

export function isOrderActive(status: OrderStatus): boolean {
  return status === "recibido" || status === "en_preparacion" || status === "en_camino";
}

const MINUTE_MS = 60_000;
const DAY_MS = 86_400_000;

/** 12 pedidos = 1 activo + 11 en el historial, igual que ORDERS_COUNT del perfil. */
const ORDER_TOTAL = 12;
const HISTORY_DAYS_AGO = [1, 2, 4, 7, 11, 16, 23, 31, 46, 63, 88];
const CANCELLED_INDEX = 4;

const DEFAULT_ADDRESS: Address = {
  id: "adr-1",
  label: "Casa",
  line1: "Calle 85 # 11-53, Apto 302",
  city: "Bogotá",
  zoneName: "Chapinero",
  isDefault: true,
  notes: "Timbre 2, la portería pide código",
};

const PAYMENT_LABELS = [
  "Visa •••• 4321",
  "Mastercard •••• 1180",
  "Dings Wallet",
  "Efectivo",
];

interface ProductChoice {
  selections: SelectedOptionGroup[];
  unitPrice: number;
}

function chooseModifiers(product: Product, salt: number): ProductChoice {
  const selections: SelectedOptionGroup[] = [];
  let unitPrice = product.price;

  (product.modifierGroups ?? []).forEach((group, groupIndex) => {
    if (!group.required || group.options.length === 0) return;

    const option = group.options[(salt + groupIndex) % group.options.length];
    unitPrice += option.priceDelta;
    selections.push({
      groupId: group.id,
      groupName: group.name,
      optionNames: [option.name],
    });
  });

  return { selections, unitPrice };
}

function buildLines(seed: OrderSeed, orderIndex: number): OrderLineSnapshot[] {
  if (seed.products.length === 0) return [];

  const count = Math.min(2 + (orderIndex % 3), seed.products.length);
  const lines: OrderLineSnapshot[] = [];

  for (let index = 0; index < count; index += 1) {
    const salt = orderIndex + index;
    const product = seed.products[salt % seed.products.length];
    const { selections, unitPrice } = chooseModifiers(product, salt);
    const quantity = 1 + (salt % 2);

    lines.push({
      productId: product.id,
      name: product.name,
      quantity,
      basePrice: product.price,
      unitPrice,
      lineTotal: unitPrice * quantity,
      image: product.image,
      selections,
    });
  }

  return lines;
}

function buildTimeline(
  status: OrderStatus,
  placedAt: Date,
  etaMinutes: number,
): OrderEvent[] {
  if (status === "cancelado") {
    return [
      { status: "recibido", at: placedAt.toISOString() },
      { status: "cancelado", at: new Date(placedAt.getTime() + 4 * MINUTE_MS).toISOString() },
    ];
  }

  const reached = ORDER_FLOW.indexOf(status);
  const stepMinutes = Math.max(
    5,
    Math.round(etaMinutes / Math.max(ORDER_FLOW.length - 1, 1)),
  );

  return ORDER_FLOW.slice(0, reached + 1).map((flowStatus, index) => ({
    status: flowStatus,
    at: new Date(placedAt.getTime() + index * stepMinutes * MINUTE_MS).toISOString(),
  }));
}

function buildOrder(seed: OrderSeed, orderIndex: number, now: Date): Order {
  const isActive = orderIndex === 0;
  const status: OrderStatus = isActive
    ? "en_preparacion"
    : orderIndex === CANCELLED_INDEX
      ? "cancelado"
      : "entregado";

  const placedAt = isActive
    ? new Date(now.getTime() - 9 * MINUTE_MS)
    : new Date(
        now.getTime() -
          HISTORY_DAYS_AGO[orderIndex - 1] * DAY_MS -
          4 * 60 * MINUTE_MS,
      );

  const lines = buildLines(seed, orderIndex);
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const shipping = seed.restaurant.shippingPrice;
  const etaMinutes = isActive ? seed.restaurant.etaMinutes : 25 + (orderIndex % 3) * 5;

  return {
    id: `D-${4821 - orderIndex * 13}`,
    restaurantId: seed.restaurant.id,
    restaurantName: seed.restaurant.name,
    restaurantImage: seed.restaurant.image,
    placedAt: placedAt.toISOString(),
    status,
    lines,
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal,
    shipping,
    total: subtotal + shipping,
    addressSnapshot: DEFAULT_ADDRESS,
    paymentLabel: PAYMENT_LABELS[orderIndex % PAYMENT_LABELS.length],
    etaMinutes,
    timeline: buildTimeline(status, placedAt, etaMinutes),
  };
}

/**
 * Mock determinista: no usa Math.random ni fechas del servidor, asi el mismo
 * seed siempre produce los mismos 12 pedidos.
 */
export function buildMockOrders(seeds: OrderSeed[], now: Date): Order[] {
  if (seeds.length === 0) return [];

  return Array.from({ length: ORDER_TOTAL }, (_, index) =>
    buildOrder(seeds[index % seeds.length], index, now),
  );
}

const timeFormatter = new Intl.DateTimeFormat("es-CO", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const dayFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
});

const fullDateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** "Hoy, 14:30" · "Ayer, 19:05" · "12 mar" · "5 ene 2024" */
export function formatOrderDate(iso: string, now: Date): string {
  const date = new Date(iso);
  const time = timeFormatter.format(date);

  if (isSameDay(date, now)) return `Hoy, ${time}`;

  if (isSameDay(date, new Date(now.getTime() - DAY_MS))) return `Ayer, ${time}`;

  return date.getFullYear() === now.getFullYear()
    ? `${dayFormatter.format(date)}, ${time}`
    : fullDateFormatter.format(date);
}

/** Marca de tiempo para la línea de tiempo: "14:32" o "12 mar, 14:32". */
export function formatEventTime(iso: string, now: Date): string {
  const date = new Date(iso);
  return isSameDay(date, now)
    ? timeFormatter.format(date)
    : `${dayFormatter.format(date)}, ${timeFormatter.format(date)}`;
}