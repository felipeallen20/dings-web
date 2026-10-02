import type { AppNotification, NotificationKind } from "@/types/notification";
import type { Restaurant } from "@/types/restaurant";

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

const READ_STORAGE_PREFIX = "dings.notificaciones.leidas";

interface NotificationTemplate {
  id: string;
  kind: NotificationKind;
  /** Restaurante de referencia para el mensaje; si no existe usa el índice. */
  restaurantId: string | null;
  restaurantIndex: number;
  title: (restaurant: Restaurant | null) => string;
  body: (restaurant: Restaurant | null) => string;
  minutesAgo: number;
  href: (restaurant: Restaurant | null) => string | null;
}

const TEMPLATES: NotificationTemplate[] = [
  {
    id: "ntf-en-camino",
    kind: "pedido",
    restaurantId: "fuego-lento-smash",
    restaurantIndex: 0,
    title: () => "Tu pedido va en camino",
    body: (restaurant) =>
      `${restaurant?.name ?? "El restaurante"} salió a reparto. Llega en unos 12 minutos.`,
    minutesAgo: 4,
    href: () => "/pedidos",
  },
  {
    id: "ntf-recibido",
    kind: "pedido",
    restaurantId: "noodle-bar-88",
    restaurantIndex: 1,
    title: () => "Pedido confirmado",
    body: (restaurant) =>
      `${restaurant?.name ?? "El restaurante"} ya recibió tu pedido y entra a preparación.`,
    minutesAgo: 26,
    href: () => "/pedidos",
  },
  {
    id: "ntf-promocion-pizza",
    kind: "promo",
    restaurantId: "pizza-rossi-napolitana",
    restaurantIndex: 2,
    title: () => "20% OFF en pizzas de masa fermentada",
    body: (restaurant) =>
      `${restaurant?.name ?? "Este restaurante"} tiene 48 horas de fermentación y 20% de descuento hoy.`,
    minutesAgo: 62,
    href: (restaurant) => (restaurant ? `/restaurantes/${restaurant.id}` : "/restaurantes"),
  },
  {
    id: "ntf-promocion-parrilla",
    kind: "promo",
    restaurantId: "parrilla-don-chucho",
    restaurantIndex: 3,
    title: () => "Envío gratis hasta las 22:00",
    body: (restaurant) =>
      `${restaurant?.name ?? "Este restaurante"} cubre el envío en tu zona para pedidos desde $40.000.`,
    minutesAgo: 5 * 60,
    href: (restaurant) => (restaurant ? `/restaurantes/${restaurant.id}` : "/restaurantes"),
  },
  {
    id: "ntf-promocion-sushi",
    kind: "promo",
    restaurantId: "sushi-kaizen",
    restaurantIndex: 4,
    title: () => "Menú de temporada con 15% OFF",
    body: (restaurant) =>
      `Rolls y nigiri de temporada en ${restaurant?.name ?? "este local"} después de las 20:00.`,
    minutesAgo: 2 * 24 * 60,
    href: (restaurant) => (restaurant ? `/restaurantes/${restaurant.id}` : "/restaurantes"),
  },
  {
    id: "ntf-alertas",
    kind: "sistema",
    restaurantId: null,
    restaurantIndex: 5,
    title: () => "Activa las alertas de tu pedido",
    body: () =>
      "Recibe confirmación, preparación y entrega al instante en tu campana de notificaciones.",
    minutesAgo: 3 * 24 * 60,
    href: () => "/perfil",
  },
  {
    id: "ntf-entregado",
    kind: "pedido",
    restaurantId: "sushi-koi",
    restaurantIndex: 6,
    title: () => "Tu pedido fue entregado",
    body: (restaurant) =>
      `${restaurant?.name ?? "El restaurante"} dejó tu pedido. Vuelve a pedirlo cuando quieras.`,
    minutesAgo: 28 * 60,
    href: () => "/pedidos",
  },
  {
    id: "ntf-perfil",
    kind: "sistema",
    restaurantId: null,
    restaurantIndex: 7,
    title: () => "Completa tu perfil y gana un envío gratis",
    body: () =>
      "Agrega tu dirección y método de pago favoritos para pedir más rápido la próxima vez.",
    minutesAgo: 6 * 24 * 60,
    href: () => "/perfil",
  },
];

function resolveRestaurant(
  restaurants: Restaurant[],
  restaurantId: string | null,
  restaurantIndex: number,
): Restaurant | null {
  if (restaurants.length === 0) return null;
  if (restaurantId) {
    const match = restaurants.find((restaurant) => restaurant.id === restaurantId);
    if (match) return match;
  }
  return restaurants[restaurantIndex % restaurants.length] ?? null;
}

/**
 * Mock determinista: sin Math.random ni fechas del servidor, el mismo
 * `now` siempre produce la misma bandeja de notificaciones.
 */
export function buildMockNotifications(
  restaurants: Restaurant[],
  now: Date,
): AppNotification[] {
  return TEMPLATES.map((template) => {
    const restaurant = resolveRestaurant(
      restaurants,
      template.restaurantId,
      template.restaurantIndex,
    );

    return {
      id: template.id,
      kind: template.kind,
      title: template.title(restaurant),
      body: template.body(restaurant),
      createdAt: new Date(
        now.getTime() - template.minutesAgo * MINUTE_MS,
      ).toISOString(),
      href: template.href(restaurant),
    };
  });
}

const dayFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
});

const fullDateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function startOfDay(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
}

/** "Ahora" · "Hace 4 min" · "Hace 5 h" · "Ayer" · "12 mar" · "3 mar 2025" */
export function formatNotificationTime(iso: string, now: Date): string {
  const date = new Date(iso);
  const diff = now.getTime() - date.getTime();

  if (diff < MINUTE_MS) return "Ahora";
  if (diff < HOUR_MS) return `Hace ${Math.floor(diff / MINUTE_MS)} min`;

  const days = Math.round((startOfDay(now) - startOfDay(date)) / DAY_MS);

  if (days <= 0) return `Hace ${Math.floor(diff / HOUR_MS)} h`;
  if (days === 1) return "Ayer";

  return date.getFullYear() === now.getFullYear()
    ? dayFormatter.format(date)
    : fullDateFormatter.format(date);
}

function readStorageKey(userId: string) {
  return `${READ_STORAGE_PREFIX}.${userId}`;
}

/** IDs leídos por usuario. Invitado persiste bajo la clave "guest". */
export async function getReadNotificationIds(
  userId: string,
): Promise<string[]> {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(readStorageKey(userId));
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    window.localStorage.removeItem(readStorageKey(userId));
    return [];
  }
}

export async function persistReadNotificationIds(
  userId: string,
  ids: string[],
): Promise<void> {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(readStorageKey(userId), JSON.stringify(ids));
}