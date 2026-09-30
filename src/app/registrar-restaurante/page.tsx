import type { Metadata } from "next";
import { PreregistroForm } from "@/components/features/PreregistroForm";

export const metadata: Metadata = {
  title: "Registrar mi restaurante | Dings",
  description:
    "Preregistra tu restaurante en Dings y publica tu menú en el marketplace.",
};

export default function RegistrarRestaurantePage() {
  return (
    <main className="flex-1">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 py-10 md:px-6 lg:gap-12 lg:py-14">
        <header className="mx-auto max-w-2xl space-y-4 text-center">
          <h1 className="text-headline-lg text-neutral lg:text-display-sm">
            Registra tu restaurante en Dings
          </h1>
          <p className="text-body-md text-text-secondary lg:text-body-lg">
            Estamos armando el marketplace de Dings y abrimos cupo para los
            primeros restaurantes. Completa tus datos y te contactamos para
            publicar tu menú. Por ahora trabajamos con tu propio domiciliario
            (8–10% por pedido) o con recogida en el local (3–5%).
          </p>
        </header>

        <PreregistroForm />
      </div>
    </main>
  );
}