import Link from "next/link";
import { Receipt } from "lucide-react";

export function OrdersEmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-canvas-muted text-text-secondary">
        <Receipt className="size-6" aria-hidden />
      </span>

      <div className="flex flex-col gap-1">
        <p className="text-title-sm text-neutral sm:text-title-md">
          Todavía no tienes pedidos
        </p>
        <p className="text-caption text-text-secondary sm:text-body-sm">
          Cuando pidas algo, aquí vas a poder seguirlo en vivo y volver a
          pedirlo con un toque.
        </p>
      </div>

      <Link
        href="/explorar"
        className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-label-lg text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:h-12"
      >
        Explorar restaurantes
      </Link>
    </div>
  );
}