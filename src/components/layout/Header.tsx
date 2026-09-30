"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { LocationSelect } from "@/components/layout/LocationSelect";
import { SearchBar } from "@/components/layout/SearchBar";
import { UserMenu } from "@/components/layout/UserMenu";
import { Logo } from "@/components/ui/Logo";
import { useSession } from "@/components/providers/SessionProvider";
import { useCart } from "@/components/providers/CartProvider";
import { CartDrawer } from "@/components/features/cart/CartDrawer";

const NAV_LINKS = [
  { label: "Explorar", href: "/explorar" },
  { label: "Restaurantes", href: "/restaurantes" },
  { label: "Registrar Restaurante", href: "/registrar-restaurante" },
];

export default function Header() {
  const { session, isLoading } = useSession();
  const { totalItems, openDrawer } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 h-[75px] w-full border-b border-border bg-surface">
        <div className="mx-auto flex h-full w-full max-w-[1280px] items-center gap-4 px-4 md:px-6">
          <Logo className="max-h-9 sm:max-h-10" priority />

          <div className="hidden md:block">
            <LocationSelect />
          </div>

          <div className="hidden flex-1 lg:block">
            <SearchBar />
          </div>

          <nav className="ml-auto hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-label-lg text-neutral transition-colors hover:text-primary"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4 lg:ml-0 lg:gap-6">
            <UserMenu
              isLoggedIn={!isLoading && session !== null}
              displayName={session?.name}
            />

            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Abrir carrito, ${totalItems} ${
                totalItems === 1 ? "producto" : "productos"
              }`}
              className="relative shrink-0 text-neutral transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <ShoppingCart className="size-5" aria-hidden />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-4 font-semibold tabular-nums text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer />
    </>
  );
}