import { MAX_SAVED_LOCATIONS, type SavedLocation } from "@/types/location";

const SAVED_LOCATIONS: SavedLocation[] = [
  { id: "loc-1", label: "Casa", address: "Calle 100 #45-20, Bogotá" },
  { id: "loc-2", label: "Oficina", address: "Carrera 7 #32-16, Bogotá" },
  { id: "loc-3", label: "Restaurante", address: "Av. El Dorado #71-45, Bogotá" },
];

export async function getSavedLocations(): Promise<SavedLocation[]> {
  return SAVED_LOCATIONS.slice(0, MAX_SAVED_LOCATIONS);
}
