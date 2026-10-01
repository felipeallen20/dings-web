export interface Address {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  zoneId?: string;
  zoneName: string;
  isDefault: boolean;
  notes?: string;
}

export interface ProfilePreferences {
  orderUpdates: boolean;
  promos: boolean;
  smsAlerts: boolean;
}