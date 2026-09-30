import type { StaticImageData } from "next/image";

export interface Category {
  id: string;
  name: string;
  image: StaticImageData;
}
