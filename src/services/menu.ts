import type { StaticImageData } from "next/image";
import type { MenuCategory, Product, RestaurantMenu } from "@/types/menu";
import type { Restaurant } from "@/types/restaurant";
import { getCategories } from "@/services/categories";
import { getModifierGroupsFor } from "@/services/product-modifiers";
import cafeImg from "@/assets/images/categories/cafe-panaderia.webp";

interface DishTemplate {
  name: string;
  description: string;
  price: number;
}

const MENU_TEMPLATES: Record<string, DishTemplate[]> = {
  hamburguesas: [
    { name: "Smash Doble", description: "Res, cheddar curado, cebolla caramelizada.", price: 18900 },
    { name: "Clásica Dings", description: "Res, queso, lechuga, tomate, salsa especial.", price: 15900 },
    { name: "Bacon BBQ", description: "Res, tocino, cheddar, BBQ ahumado.", price: 17900 },
    { name: "Doble Cheese", description: "Doble res, doble queso, pepinillos.", price: 19900 },
    { name: "Crispy Chicken", description: "Pollo empanizado, lechuga, alioli.", price: 15900 },
    { name: "Veggie Melt", description: "Hamburguesa vegetal, champiñones, gouda.", price: 16900 },
  ],
  pizza: [
    { name: "Margherita", description: "Salsa de tomate, mozzarella, albahaca.", price: 22000 },
    { name: "Pepperoni", description: "Pepperoni, mozzarella, orégano.", price: 26500 },
    { name: "Diavola", description: "Salami picante, miel de ají, oliva.", price: 27500 },
    { name: "Capricciosa", description: "Champiñón, jamón, aceitunas, orégano.", price: 25900 },
    { name: "Cuatro quesos", description: "Mozzarella, gorgonzola, parmesano, azul.", price: 28900 },
    { name: "Hawaiana", description: "Jamón, piña, orégano.", price: 24900 },
  ],
  sushi: [
    { name: "Nigiri de salmón", description: "2 piezas, arroz avinagrado.", price: 12000 },
    { name: "Uramaki California", description: "8 piezas, kanikama, palta.", price: 28900 },
    { name: "Sashimi mixto", description: "6 piezas, corte del día.", price: 32000 },
    { name: "Philadelphia", description: "8 piezas, queso crema, salmón.", price: 31900 },
    { name: "Tempura de camarón", description: "6 piezas, salsa tentsuyu.", price: 25900 },
    { name: "Roll vegetariano", description: "8 piezas, palta, pepinillo.", price: 22900 },
  ],
  mexicana: [
    { name: "Tacos de carnitas", description: "3 piezas, cilantro, cebolla.", price: 16900 },
    { name: "Tacos al pastor", description: "3 piezas, piña, cilantro.", price: 15900 },
    { name: "Birria quesabirria", description: "3 piezas, consomé, queso gratinado.", price: 21900 },
    { name: "Burrito de carne", description: "12 piezas, arroz, frijoles.", price: 18900 },
    { name: "Quesadilla de pollo", description: "2 piezas, queso Oaxaca.", price: 14900 },
    { name: "Elote callejero", description: "Maíz, queso cotija, limón, chile.", price: 9500 },
  ],
  asiatica: [
    { name: "Ramen Tonkotsu", description: "12 horas de hervor, chashu, huevo.", price: 28900 },
    { name: "Pad Thai", description: "Fideos de arroz, cacahuete, lima.", price: 24900 },
    { name: "Gyozas de cerdo", description: "6 piezas, salsa de soja.", price: 16900 },
    { name: "Arroz salteado", description: "Pollo, huevo, salsa agridulce.", price: 21900 },
    { name: "Spring rolls", description: "6 piezas, salsa de maní.", price: 13900 },
    { name: "Wok de vegetales", description: "Verduras de estación, sésamo.", price: 19900 },
  ],
  ensaladas: [
    { name: "Bowl verde", description: "Espinaca, aguacate, pepino, vinagreta.", price: 17900 },
    { name: "Ensalada César", description: "Lechuga romana, pollo, parmesano.", price: 19900 },
    { name: "Bowl de quinoa", description: "Quinoa, arándano, nuez, feta.", price: 18500 },
    { name: "Wrap de pollo", description: "Tortilla, pollo, pesto, tomate.", price: 16900 },
    { name: "Ensalada de atún", description: "Atún, huevo, aceituna, mostaza.", price: 21500 },
    { name: "Bowl de frutas", description: "Mixto de temporada, yogur.", price: 13900 },
  ],
  sandwiches: [
    { name: "Baguette de jamón y queso", description: "Jamón serrano, gruyere, mostaza.", price: 15900 },
    { name: "Sándwich de pollo", description: "Pollo desmechado, aguacate, repollo.", price: 17900 },
    { name: "Sándwich melt", description: "Res, cheddar, cebolla caramelizada.", price: 16900 },
    { name: "Caprese en panini", description: "Mozzarella, tomate, pesto, rúcula.", price: 15500 },
    { name: "Torta de pavo", description: "Pavo, queso, lechuga, tomate.", price: 14900 },
    { name: "Wrap de lomo", description: "Lomo de cerdo, pico de gallo.", price: 19500 },
  ],
  pastas: [
    { name: "Spaghetti bolognese", description: "Ragú de 6 horas, parmesano.", price: 24900 },
    { name: "Carbonara", description: "Guanciale, huevo, pecorino.", price: 25900 },
    { name: "Pesto genovés", description: "Albaca, piñones, pasta fresca.", price: 23500 },
    { name: "Lasagna", description: "Capas de pasta, ragú, bechamel.", price: 23900 },
    { name: "Fettuccine Alfredo", description: "Salsa de crema y parmesano.", price: 22500 },
    { name: "Cacio e pepe", description: "Pecorino, pimienta, pasta fresca.", price: 21900 },
  ],
  parrilla: [
    { name: "Churrasco 400g", description: "Costilla, chimichurri, papa.", price: 34900 },
    { name: "Solomillo", description: "250g, vino, guarnición.", price: 39900 },
    { name: "Costillas al carbón", description: "500g, salsa BBQ.", price: 32900 },
    { name: "Parrillada mixta", description: "Cerdo, pollo, chorizo, camarón.", price: 38900 },
    { name: "Hamburguesa parrilla", description: "200g, cheddar, pan brioche.", price: 22900 },
    { name: "Chorizo a la brasa", description: "4 unidades, arepa, cilantro.", price: 16900 },
  ],
  casera: [
    { name: "Arepa con huevo", description: "Queso, huevo, hogao.", price: 9500 },
    { name: "Bandeja paisa", description: "Arroz, fríjoles, chicharrón, arepa.", price: 24900 },
    { name: "Sancocho", description: "Res, yuca, cilantro, ají.", price: 21900 },
    { name: "Ajiaco", description: "Pollo, papa, guisantes, cilantro.", price: 21900 },
    { name: "Arepa con queso", description: "Queso cotija, mantequilla.", price: 8500 },
    { name: "Jugo de mora", description: "Mora, azúcar, natural.", price: 5500 },
  ],
  postres: [
    { name: "Brownie con helado", description: "Chocolate 70%, helado de vainilla.", price: 12500 },
    { name: "Torta de tres leches", description: "Biscocho, leche condensada, canela.", price: 14500 },
    { name: "Cheesecake de maracuyá", description: "Base de galleta, coulis.", price: 13900 },
    { name: "Crepes de Nutella", description: "4 piezas, chocolate, banano.", price: 15500 },
    { name: "Waffle con frutas", description: "4 piezas, helado, frutas.", price: 14900 },
    { name: "Gelato 3 bolas", description: "3 bolas del día.", price: 9900 },
  ],
  cafe: [
    { name: "Cortado", description: "Espresso con leche vaporizada.", price: 5500 },
    { name: "Capuchino", description: "Espresso, leche, espuma.", price: 6900 },
    { name: "Latte", description: "Espresso con leche.", price: 6900 },
    { name: "Pan de queso", description: "Recién horneado, 3 unidades.", price: 7900 },
    { name: "Croissant", description: "Mantequilla francesa, 3 unidades.", price: 8500 },
    { name: "Cold brew", description: "Extracción en frío, 16 horas.", price: 7500 },
  ],
};

const BEVERAGES: DishTemplate[] = [
  { name: "Gaseosa", description: "500ml, sabores disponibles.", price: 4500 },
  { name: "Agua", description: "600ml, con o sin gas.", price: 3500 },
  { name: "Limonada de mora", description: "Mora, limón, agua fría.", price: 6500 },
  { name: "Jugo de mango", description: "Mango natural, 400ml.", price: 7500 },
];

const OFFERS_CATEGORY: MenuCategory = { id: "ofertas", name: "Ofertas" };
const POPULAR_CATEGORY: MenuCategory = { id: "mas-pedidos", name: "Más pedidos" };
const DRINKS_CATEGORY: MenuCategory = { id: "bebidas", name: "Bebidas" };

const OFFER_DISCOUNT = 0.75;
const PRICE_ROUNDING = 500;

function roundToPriceStep(value: number) {
  return Math.round(value / PRICE_ROUNDING) * PRICE_ROUNDING;
}

function buildProduct(
  restaurant: Restaurant,
  dish: DishTemplate,
  index: number,
  menuCategoryId: string,
  image: StaticImageData,
  originalPrice?: number,
): Product {
  const modifierGroups = getModifierGroupsFor(
    restaurant.categoryId,
    dish.name,
    menuCategoryId,
  );

  return {
    id: `${restaurant.id}-${menuCategoryId}-${index}`,
    name: dish.name,
    description: dish.description,
    price: roundToPriceStep(dish.price * (originalPrice ? OFFER_DISCOUNT : 1)),
    originalPrice,
    image,
    menuCategoryId,
    ...(modifierGroups ? { modifierGroups } : {}),
  };
}

export async function getRestaurantMenu(
  restaurant: Restaurant,
): Promise<RestaurantMenu> {
  const dishes = MENU_TEMPLATES[restaurant.categoryId] ?? [];
  const categoryName =
    getCategories().find((category) => category.id === restaurant.categoryId)
      ?.name ?? "Carta";
  const menuCategory: MenuCategory = { id: "carta", name: categoryName };

  const products: Product[] = [
    ...dishes
      .slice(0, 2)
      .map((dish, index) =>
        buildProduct(restaurant, dish, index, OFFERS_CATEGORY.id, restaurant.image, dish.price),
      ),
    ...dishes
      .slice(2, 5)
      .map((dish, index) =>
        buildProduct(restaurant, dish, index, POPULAR_CATEGORY.id, restaurant.image),
      ),
    ...dishes.map((dish, index) =>
      buildProduct(restaurant, dish, index, menuCategory.id, restaurant.image),
    ),
    ...BEVERAGES.map((dish, index) =>
      buildProduct(restaurant, dish, index, DRINKS_CATEGORY.id, cafeImg),
    ),
  ];

  return {
    categories: [
      OFFERS_CATEGORY,
      POPULAR_CATEGORY,
      menuCategory,
      DRINKS_CATEGORY,
    ],
    products,
  };
}