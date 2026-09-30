import type { ProductOptionGroup } from "@/types/menu";

const INCLUDED = 0;

function single(
  id: string,
  name: string,
  hint: string | undefined,
  options: { id: string; name: string; priceDelta?: number }[],
): ProductOptionGroup {
  return {
    id,
    name,
    hint,
    type: "single",
    required: true,
    options: options.map((option) => ({
      id: option.id,
      name: option.name,
      priceDelta: option.priceDelta ?? INCLUDED,
    })),
  };
}

function multiple(
  id: string,
  name: string,
  hint: string | undefined,
  max: number,
  options: { id: string; name: string; priceDelta?: number }[],
): ProductOptionGroup {
  return {
    id,
    name,
    hint,
    type: "multiple",
    max,
    options: options.map((option) => ({
      id: option.id,
      name: option.name,
      priceDelta: option.priceDelta ?? INCLUDED,
    })),
  };
}

/**
 * Opciones por platillo de bebida: son parte del combo, por eso casi todas
 * no suman precio. El tamaño sí lo hace.
 */
const BEVERAGE_GROUPS: Record<string, ProductOptionGroup[]> = {
  Gaseosa: [
    single("sabor-gaseosa", "Sabor", "Sin costo adicional", [
      { id: "cola", name: "Cola" },
      { id: "naranja", name: "Naranja" },
      { id: "limon", name: "Limón" },
      { id: "uva", name: "Uva" },
      { id: "manzana", name: "Manzana" },
    ]),
  ],
  Agua: [
    single("tipo-agua", "Tipo de agua", undefined, [
      { id: "con-gas", name: "Con gas" },
      { id: "sin-gas", name: "Sin gas" },
    ]),
  ],
  "Limonada de mora": [
    single("tamano-limonada", "Tamaño", undefined, [
      { id: "400", name: "400 ml" },
      { id: "600", name: "600 ml", priceDelta: 1500 },
    ]),
  ],
  "Jugo de mango": [
    single("tamano-jugo", "Tamaño", undefined, [
      { id: "400", name: "400 ml" },
      { id: "600", name: "600 ml", priceDelta: 1800 },
    ]),
  ],
};

/**
 * Exclusiones: quitan un ingrediente, nunca suman precio.
 */
const WITHOUT_GROUPS: Record<string, ProductOptionGroup[]> = {
  hamburguesas: [
    multiple(
      "sin-ingredientes",
      "Quitar ingredientes",
      "Opcional, sin costo adicional",
      6,
      [
        { id: "sin-cebolla", name: "Sin cebolla" },
        { id: "sin-tomate", name: "Sin tomate" },
        { id: "sin-lechuga", name: "Sin lechuga" },
        { id: "sin-pepinillo", name: "Sin pepinillo" },
        { id: "sin-queso", name: "Sin queso" },
        { id: "sin-salsa", name: "Sin salsa especial" },
      ],
    ),
  ],
  pizza: [
    multiple(
      "sin-ingredientes",
      "Quitar ingredientes",
      "Opcional, sin costo adicional",
      4,
      [
        { id: "sin-cebolla", name: "Sin cebolla" },
        { id: "sin-jitomate", name: "Sin jitomate" },
        { id: "sin-oregano", name: "Sin orégano" },
        { id: "sin-albahaca", name: "Sin albahaca" },
      ],
    ),
  ],
  sushi: [
    multiple(
      "sin-ingredientes",
      "Sin ingredientes",
      "Opcional, sin costo adicional",
      4,
      [
        { id: "sin-palta", name: "Sin palta" },
        { id: "sin-kanikama", name: "Sin kanikama" },
        { id: "sin-cebollin", name: "Sin cebollín" },
        { id: "sin-aji", name: "Sin ají" },
      ],
    ),
  ],
  mexicana: [
    multiple(
      "sin-ingredientes",
      "Sin ingredientes",
      "Opcional, sin costo adicional",
      3,
      [
        { id: "sin-cebolla", name: "Sin cebolla" },
        { id: "sin-cilantro", name: "Sin cilantro" },
        { id: "sin-pina", name: "Sin piña" },
      ],
    ),
  ],
};

const EXTRAS_GROUPS: Record<string, ProductOptionGroup[]> = {
  hamburguesas: [
    multiple(
      "extras",
      "Agregar extras",
      "Máximo 4 por producto",
      4,
      [
        { id: "bacon", name: "Bacon", priceDelta: 3500 },
        { id: "huevo", name: "Huevo", priceDelta: 2500 },
        { id: "queso-extra", name: "Queso extra", priceDelta: 2000 },
        { id: "doble-carne", name: "Doble carne", priceDelta: 6500 },
        { id: "champinones", name: "Champiñones", priceDelta: 1500 },
      ],
    ),
    single("salsa", "Salsa", "Sin costo adicional", [
      { id: "especial", name: "Salsa especial de la casa" },
      { id: "bbq", name: "BBQ" },
      { id: "mostaza", name: "Mostaza" },
      { id: "ketchup", name: "Ketchup" },
      { id: "mayonesa", name: "Mayonesa" },
      { id: "ninguna", name: "Sin salsa" },
    ]),
  ],
  pizza: [
    multiple(
      "extras",
      "Agregar ingredientes",
      "Máximo 5 por producto",
      5,
      [
        { id: "pepperoni", name: "Pepperoni", priceDelta: 3500 },
        { id: "champinones", name: "Champiñones", priceDelta: 3000 },
        { id: "bacon", name: "Bacon", priceDelta: 4000 },
        { id: "mozzarella", name: "Mozzarella extra", priceDelta: 2500 },
        { id: "aceitunas", name: "Aceitunas", priceDelta: 2000 },
      ],
    ),
  ],
  mexicana: [
    multiple(
      "extras",
      "Agregar extras",
      "Máximo 3 por producto",
      3,
      [
        { id: "carne", name: "Carne extra", priceDelta: 4000 },
        { id: "queso", name: "Queso gratinado", priceDelta: 2500 },
        { id: "guacamole", name: "Guacamole", priceDelta: 3500 },
        { id: "crema", name: "Crema", priceDelta: 1500 },
      ],
    ),
  ],
};

const CATEGORY_GROUPS: Record<string, ProductOptionGroup[]> = {
  hamburguesas: [
    ...(EXTRAS_GROUPS.hamburguesas ?? []),
    ...(WITHOUT_GROUPS.hamburguesas ?? []),
  ],
  pizza: [...(EXTRAS_GROUPS.pizza ?? []), ...(WITHOUT_GROUPS.pizza ?? [])],
  sushi: [...(WITHOUT_GROUPS.sushi ?? [])],
  mexicana: [
    ...(EXTRAS_GROUPS.mexicana ?? []),
    ...(WITHOUT_GROUPS.mexicana ?? []),
  ],
};

export function getModifierGroupsFor(
  categoryId: string,
  dishName: string,
  menuCategoryId: string,
): ProductOptionGroup[] | undefined {
  if (menuCategoryId === "bebidas") {
    return BEVERAGE_GROUPS[dishName];
  }

  const groups = CATEGORY_GROUPS[categoryId];
  return groups && groups.length > 0 ? groups : undefined;
}