import type { ReactNode } from "react";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import panelImage from "@/assets/images/dings login.jpg";

const TRUST_POINTS = [
  "Restaurantes verificados uno por uno",
  "Sin cobros por aparecer en el marketplace",
  "Paga solo el día que pidas",
];

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto grid w-full max-w-[1280px] flex-1 gap-0 lg:grid-cols-[1.05fr_1fr]">
        <aside className="relative hidden overflow-hidden lg:block">
          <Image
            src={panelImage}
            alt=""
            fill
            priority
            sizes="55vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-inverse-surface via-inverse-surface/75 to-inverse-surface/35"
          />

          <div className="relative flex h-full flex-col justify-between p-10 xl:p-12">
            <div className="[&_img]:brightness-0 [&_img]:invert">
              <Logo className="max-h-9" />
            </div>

            <div className="space-y-6">
              <h2 className="max-w-sm text-headline-lg text-inverse-on-surface">
                La cocina de tu barrio, a un clic
              </h2>

              <ul className="space-y-2.5">
                {TRUST_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2.5 text-body-md text-inverse-on-surface/90"
                  >
                    <CircleCheck
                      className="size-4 shrink-0 text-tertiary"
                      aria-hidden
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div className="flex items-center justify-center px-4 py-10 md:px-6 lg:px-12 lg:py-14">
          <div className="w-full max-w-[420px]">
            <div className="mb-8 lg:hidden">
              <Logo className="max-h-8" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
