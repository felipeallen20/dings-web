import type { Metadata } from "next";
import { NotificationsView } from "@/components/features/notifications/NotificationsView";

export const metadata: Metadata = {
  title: "Notificaciones | Dings",
  description: "Avisos de tus pedidos, promociones y cuenta en Dings.",
};

export default function NotificacionesPage() {
  return (
    <main className="w-full px-4 py-6 md:px-6 lg:py-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-margin-mobile lg:gap-margin">
        <header className="space-y-1">
          <p className="text-label-xs text-primary uppercase">Bandeja</p>
          <h1 className="text-title-sm text-neutral sm:text-headline-lg lg:text-display-sm">
            Notificaciones
          </h1>
        </header>

        <NotificationsView />
      </div>
    </main>
  );
}