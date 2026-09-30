export type LocationId = string;

export interface SavedLocation {
  id: LocationId;
  label: string;
  address: string;
}

export const MAX_SAVED_LOCATIONS = 5;
