import { Flame, Store, Timer } from "lucide-react";

export function BottomBar() {
  return (
    <div className="hidden w-full border-b border-border bg-canvas-muted md:block">
      <div className="mx-auto flex h-10 w-full max-w-[1280px] items-center justify-between gap-4 px-4 md:px-6">
        <p className="flex min-w-0 items-center gap-2 text-body-sm font-semibold text-neutral">
          <Flame className="size-4 shrink-0 text-secondary" aria-hidden />
          <span className="truncate">
            32 cocinas activas en tu zona, listas para que pidas ahora
          </span>
        </p>

        <div className="flex shrink-0 items-center gap-4">
          <p className="flex items-center gap-2 text-label-lg text-secondary">
            <Timer className="size-4 shrink-0" aria-hidden />
            Entrega en 30 min
          </p>
          <span aria-hidden className="h-3 w-px bg-border-strong" />
          <p className="hidden items-center gap-2 text-label-md text-text-secondary sm:flex">
            <Store className="size-4 shrink-0" aria-hidden />
            Menús de locales desde $8.000
          </p>
        </div>
      </div>
    </div>
  );
}
