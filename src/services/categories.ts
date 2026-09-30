import type { Category } from "@/types/category";
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

const CATEGORIES: Category[] = [
  { id: "hamburguesas", name: "Hamburguesas", image: hamburguesasImg },
  { id: "pizza", name: "Pizza", image: pizzaImg },
  { id: "sushi", name: "Sushi", image: sushiImg },
  { id: "mexicana", name: "Comida mexicana", image: tacosImg },
  { id: "asiatica", name: "Comida asiática", image: asiaticaImg },
  { id: "ensaladas", name: "Ensaladas", image: ensaladaImg },
  { id: "sandwiches", name: "Sándwiches", image: sandwichImg },
  { id: "pastas", name: "Pastas", image: pastaImg },
  { id: "parrilla", name: "Parrilla", image: parrillaImg },
  { id: "casera", name: "Comida casera", image: caseraImg },
  { id: "postres", name: "Postres", image: postresImg },
  { id: "cafe", name: "Café y panadería", image: cafeImg },
];

export function getCategories(): Category[] {
  return CATEGORIES;
}