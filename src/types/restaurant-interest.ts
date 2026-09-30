export type DeliveryMode = "propio" | "recogida" | "por-definir";

export interface RestaurantInterest {
  restaurantName: string;
  contactName: string;
  email: string;
  phone: string;
  cuisine: string;
  city: string;
  deliveryMode: DeliveryMode;
  dishesCount: string;
  message: string;
  consent: boolean;
}
