import type { Zone } from "@/types/zone";
import type { DeliveryOption, Restaurant } from "@/types/restaurant";
import type {
  DistanceRange,
  RestaurantFilters,
  SortOption,
} from "@/types/restaurant-filters";
import hamburguesasImg from "@/assets/images/categories/hamburguesas.jpg";
import pizzaImg from "@/assets/images/categories/pizza.jpg";
import sushiImg from "@/assets/images/categories/sushi.jpg";
import tacosImg from "@/assets/images/categories/tacos.jpg";
import asiaticaImg from "@/assets/images/categories/comida-asiatica.jpg";
import ensaladaImg from "@/assets/images/categories/ensalada.jpg";
import sandwichImg from "@/assets/images/categories/sandwich.jpg";
import pastaImg from "@/assets/images/categories/pasta.jpg";
import parrillaImg from "@/assets/images/categories/parrilla.jpg";
import caseraImg from "@/assets/images/categories/comida-casera.jpg";
import postresImg from "@/assets/images/categories/postres.jpg";
import cafeImg from "@/assets/images/categories/cafe-panaderia.webp";

const ZONES: Zone[] = [
  { id: "chapinero", name: "Chapinero" },
  { id: "usaquen", name: "Usaquén" },
  { id: "teusaquillo", name: "Teusaquillo" },
  { id: "la-candelaria", name: "La Candelaria" },
  { id: "santa-fe", name: "Santa Fe" },
];

const BOTH_MODES: DeliveryOption[] = ["propio", "recogida"];
const PROPIO: DeliveryOption[] = ["propio"];
const RECOGIDA: DeliveryOption[] = ["recogida"];

const RESTAURANTS: Restaurant[] = [
  {
    id: "fuego-lento-smash",
    name: "Fuego Lento Smash",
    image: hamburguesasImg,
    rating: 4.8,
    ratingCount: 850,
    description: "Smash Burgers, papas truffle, malteadas.",
    shippingPrice: 3900,
    express: true,
    categoryId: "hamburguesas",
    zoneId: "chapinero",
    distanceKm: 1.2,
    etaMinutes: 25,
    deliveryOptions: BOTH_MODES,
    isOpen: true,
  },
  {
    id: "burger-lab-72",
    name: "Burger Lab 72",
    image: hamburguesasImg,
    rating: 4.3,
    ratingCount: 290,
    description: "Hamburguesas clásicas y papas a la brasa.",
    shippingPrice: 3200,
    categoryId: "hamburguesas",
    zoneId: "la-candelaria",
    distanceKm: 1.5,
    etaMinutes: 30,
    deliveryOptions: PROPIO,
    isOpen: false,
  },
  {
    id: "pizza-rossi-napolitana",
    name: "Pizza Rossi Napolitana",
    image: pizzaImg,
    rating: 4.6,
    ratingCount: 740,
    description: "Masa fermentada 48 horas, albahaca fresca.",
    shippingPrice: 3500,
    express: true,
    categoryId: "pizza",
    zoneId: "chapinero",
    distanceKm: 1.9,
    etaMinutes: 28,
    deliveryOptions: BOTH_MODES,
    isOpen: true,
  },
  {
    id: "fugazzeta-del-barrio",
    name: "Fugazzeta del Barrio",
    image: pizzaImg,
    rating: 4.4,
    ratingCount: 260,
    description: "Fugazzeta, pizza porcionada, jugos.",
    shippingPrice: 3900,
    minOrder: 20000,
    categoryId: "pizza",
    zoneId: "santa-fe",
    distanceKm: 3.1,
    etaMinutes: 40,
    deliveryOptions: RECOGIDA,
    isOpen: true,
  },
  {
    id: "sushi-kaizen",
    name: "Sushi Kaizen",
    image: sushiImg,
    rating: 4.9,
    ratingCount: 880,
    description: "Nigiri de temporada, sashimi, rollos.",
    shippingPrice: 5900,
    minOrder: 28000,
    categoryId: "sushi",
    zoneId: "chapinero",
    distanceKm: 3.6,
    etaMinutes: 45,
    deliveryOptions: PROPIO,
    isOpen: true,
  },
  {
    id: "sushi-koi",
    name: "Sushi Koi",
    image: sushiImg,
    rating: 4.7,
    ratingCount: 390,
    description: "Combos, uramaki y postre de la casa.",
    shippingPrice: 5200,
    minOrder: 30000,
    categoryId: "sushi",
    zoneId: "usaquen",
    distanceKm: 2.9,
    etaMinutes: 38,
    deliveryOptions: BOTH_MODES,
    isOpen: true,
  },
  {
    id: "taqueria-el-pueblito",
    name: "Taquería El Pueblito",
    image: tacosImg,
    rating: 4.5,
    ratingCount: 380,
    description: "Tacos al carbón, arepas, aguas frescas.",
    shippingPrice: 2500,
    categoryId: "mexicana",
    zoneId: "la-candelaria",
    distanceKm: 0.5,
    etaMinutes: 20,
    deliveryOptions: PROPIO,
    isOpen: true,
  },
  {
    id: "tacos-la-esquina",
    name: "Tacos La Esquina",
    image: tacosImg,
    rating: 4.5,
    ratingCount: 270,
    description: "Birria, quesadillas, elote callejero.",
    shippingPrice: 2900,
    express: true,
    categoryId: "mexicana",
    zoneId: "usaquen",
    distanceKm: 2.2,
    etaMinutes: 26,
    deliveryOptions: PROPIO,
    isOpen: true,
  },
  {
    id: "noodle-bar-88",
    name: "Noodle Bar 88",
    image: asiaticaImg,
    rating: 4.9,
    ratingCount: 1200,
    description: "Ramen casero, gyozas, té frío.",
    shippingPrice: 4900,
    minOrder: 25000,
    categoryId: "asiatica",
    zoneId: "usaquen",
    distanceKm: 2.4,
    etaMinutes: 35,
    deliveryOptions: BOTH_MODES,
    isOpen: true,
  },
  {
    id: "wok-and-roll",
    name: "Wok And Roll",
    image: asiaticaImg,
    rating: 4.6,
    ratingCount: 520,
    description: "Salteados wok, pad thai, rolls de camarón.",
    shippingPrice: 4200,
    minOrder: 24000,
    categoryId: "asiatica",
    zoneId: "chapinero",
    distanceKm: 1.4,
    etaMinutes: 30,
    deliveryOptions: BOTH_MODES,
    isOpen: true,
  },
  {
    id: "ensalada-viva",
    name: "Ensalada Viva",
    image: ensaladaImg,
    rating: 4.4,
    ratingCount: 210,
    description: "Bowls verdes, vinagreta casera, wraps.",
    shippingPrice: 2900,
    minOrder: 16000,
    categoryId: "ensaladas",
    zoneId: "usaquen",
    distanceKm: 3.2,
    etaMinutes: 32,
    deliveryOptions: RECOGIDA,
    isOpen: true,
  },
  {
    id: "salad-station",
    name: "Salad Station",
    image: ensaladaImg,
    rating: 4.2,
    ratingCount: 140,
    description: "Ensaladas de temporada, jugos prensados.",
    shippingPrice: 2600,
    minOrder: 14000,
    categoryId: "ensaladas",
    zoneId: "santa-fe",
    distanceKm: 1.7,
    etaMinutes: 24,
    deliveryOptions: RECOGIDA,
    isOpen: false,
  },
  {
    id: "sandwich-city",
    name: "Sandwich City",
    image: sandwichImg,
    rating: 4.5,
    ratingCount: 310,
    description: "Baguettes artesanales, sándwiches de la casa.",
    shippingPrice: 2900,
    express: true,
    categoryId: "sandwiches",
    zoneId: "teusaquillo",
    distanceKm: 1.1,
    etaMinutes: 22,
    deliveryOptions: PROPIO,
    isOpen: true,
  },
  {
    id: "deli-capital",
    name: "Deli Capital",
    image: sandwichImg,
    rating: 4.4,
    ratingCount: 230,
    description: "Sándwiches en pan de masa madre, sopas.",
    shippingPrice: 2700,
    express: true,
    categoryId: "sandwiches",
    zoneId: "la-candelaria",
    distanceKm: 1.3,
    etaMinutes: 21,
    deliveryOptions: BOTH_MODES,
    isOpen: true,
  },
  {
    id: "pasta-familia",
    name: "Pasta Familia",
    image: pastaImg,
    rating: 4.7,
    ratingCount: 560,
    description: "Ragu lento, carbonara, salsa de la casa.",
    shippingPrice: 4500,
    minOrder: 22000,
    categoryId: "pastas",
    zoneId: "la-candelaria",
    distanceKm: 2.8,
    etaMinutes: 33,
    deliveryOptions: BOTH_MODES,
    isOpen: true,
  },
  {
    id: "pasta-mia",
    name: "Pasta Mía",
    image: pastaImg,
    rating: 4.5,
    ratingCount: 310,
    description: "Pasta fresca cada mañana, pesto propio.",
    shippingPrice: 4100,
    minOrder: 19000,
    categoryId: "pastas",
    zoneId: "chapinero",
    distanceKm: 2.6,
    etaMinutes: 30,
    deliveryOptions: RECOGIDA,
    isOpen: true,
  },
  {
    id: "parrilla-don-chucho",
    name: "Parrilla Don Chucho",
    image: parrillaImg,
    rating: 4.7,
    ratingCount: 960,
    description: "Carnes al carbón, chorizo, yuca frita.",
    shippingPrice: 5900,
    minOrder: 30000,
    categoryId: "parrilla",
    zoneId: "usaquen",
    distanceKm: 4.1,
    etaMinutes: 45,
    deliveryOptions: BOTH_MODES,
    isOpen: true,
  },
  {
    id: "la-parrillita-69",
    name: "La Parrillita 69",
    image: parrillaImg,
    rating: 4.6,
    ratingCount: 610,
    description: "Parrilla premium, cortes especiales y salsas de la casa.",
    shippingPrice: 6500,
    minOrder: 35000,
    categoryId: "parrilla",
    zoneId: "teusaquillo",
    distanceKm: 5.4,
    etaMinutes: 55,
    deliveryOptions: PROPIO,
    isOpen: true,
  },
  {
    id: "la-arepa-de-la-abuela",
    name: "La Arepa de la Abuela",
    image: caseraImg,
    rating: 4.7,
    ratingCount: 620,
    description: "Arepas caseras, sancocho, jugo de mora.",
    shippingPrice: 0,
    minOrder: 18000,
    categoryId: "casera",
    zoneId: "teusaquillo",
    distanceKm: 0.8,
    etaMinutes: 30,
    deliveryOptions: RECOGIDA,
    isOpen: true,
  },
  {
    id: "el-rincon-de-dona-rosa",
    name: "El Rincón de Doña Rosa",
    image: caseraImg,
    rating: 4.6,
    ratingCount: 420,
    description: "Comida casera, arepas, jugo de mora.",
    shippingPrice: 0,
    minOrder: 20000,
    categoryId: "casera",
    zoneId: "santa-fe",
    distanceKm: 0.9,
    etaMinutes: 28,
    deliveryOptions: BOTH_MODES,
    isOpen: true,
  },
  {
    id: "postre-el-ingenio",
    name: "Postre El Ingenio",
    image: postresImg,
    rating: 4.8,
    ratingCount: 330,
    description: "Postres por porción, tortas, brownies y gelato.",
    shippingPrice: 1900,
    categoryId: "postres",
    zoneId: "chapinero",
    distanceKm: 2.1,
    etaMinutes: 26,
    deliveryOptions: PROPIO,
    isOpen: true,
  },
  {
    id: "dulce-menta",
    name: "Dulce Menta",
    image: postresImg,
    rating: 4.7,
    ratingCount: 260,
    description: "Waffles, crepas y café de especialidad.",
    shippingPrice: 2200,
    categoryId: "postres",
    zoneId: "teusaquillo",
    distanceKm: 1.8,
    etaMinutes: 27,
    deliveryOptions: PROPIO,
    isOpen: true,
  },
  {
    id: "cafe-mirador",
    name: "Café Mirador",
    image: cafeImg,
    rating: 4.4,
    ratingCount: 180,
    description: "Pan de queso, cortado, postres del día.",
    shippingPrice: 1900,
    minOrder: 15000,
    categoryId: "cafe",
    zoneId: "teusaquillo",
    distanceKm: 0.6,
    etaMinutes: 20,
    deliveryOptions: PROPIO,
    isOpen: true,
  },
  {
    id: "pan-y-cafe-la-esquina",
    name: "Pan y Café La Esquina",
    image: cafeImg,
    rating: 4.7,
    ratingCount: 450,
    description: "Horneado diario, empanadas, jugos.",
    shippingPrice: 1500,
    categoryId: "cafe",
    zoneId: "la-candelaria",
    distanceKm: 0.3,
    etaMinutes: 15,
    deliveryOptions: PROPIO,
    isOpen: true,
  },
];

const DISTANCE_BOUNDS: Record<DistanceRange, [number, number]> = {
  "0-1": [0, 1],
  "1-3": [1, 3],
  "3-5": [3, 5],
  "5-mas": [5, Number.POSITIVE_INFINITY],
};

const COMPARATORS: Record<SortOption, (a: Restaurant, b: Restaurant) => number> =
  {
    cercania: (a, b) =>
      a.distanceKm - b.distanceKm || b.rating - a.rating,
    rating: (a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount,
    envio: (a, b) =>
      a.shippingPrice - b.shippingPrice || a.distanceKm - b.distanceKm,
  };

function matchesFilters(
  restaurant: Restaurant,
  filters: RestaurantFilters,
): boolean {
  if (filters.zona && restaurant.zoneId !== filters.zona) return false;

  if (filters.distancia) {
    const [min, max] = DISTANCE_BOUNDS[filters.distancia];
    if (restaurant.distanceKm < min || restaurant.distanceKm >= max) {
      return false;
    }
  }

  if (
    filters.categorias.length > 0 &&
    !filters.categorias.includes(restaurant.categoryId)
  ) {
    return false;
  }

  if (
    filters.entrega &&
    !restaurant.deliveryOptions.includes(filters.entrega)
  ) {
    return false;
  }

  if (filters.abiertos && !restaurant.isOpen) return false;

  return true;
}

export function getZones(): Zone[] {
  return ZONES;
}

export async function getRestaurants(
  filters: RestaurantFilters,
): Promise<Restaurant[]> {
  const matched = RESTAURANTS.filter((restaurant) =>
    matchesFilters(restaurant, filters),
  );

  return [...matched].sort(COMPARATORS[filters.orden]);
}