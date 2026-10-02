export type NotificationKind = "pedido" | "promo" | "sistema";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  /** ISO 8601 */
  createdAt: string;
  href: string | null;
}