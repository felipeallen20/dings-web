"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, User } from "lucide-react";
import { LocationSelect } from "@/components/layout/LocationSelect";
import { SearchBar } from "@/components/layout/SearchBar";
import { UserMenu } from "@/components/layout/UserMenu";
import { Logo } from "@/components/ui/Logo";
import { iconButtonClass } from "@/components/ui/iconButton";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useSession } from "@/components/providers/SessionProvider";
import { useCart } from "@/components/providers/CartProvider";
import { CartDrawer } from "@/components/features/cart/CartDrawer";
import { NotificationsBell } from "@/components/features/notifications/NotificationsBell";

const NAV_LINKS = [
  { label: "Explorar", href: "/explorar" },
  { label: "Restaurantes", href: "/restaurantes" },
  { label: "Registrar Restaurante", href: "/registrar-restaurante" },
];

function CartButton() {
  const { totalItems, openDrawer } = useCart();

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={`Abrir carrito, ${totalItems} ${
        totalItems === 1 ? "producto" : "productos"
      }`}
      className={`relative ${iconButtonClass}`}
    >
      <ShoppingCart className="size-5" aria-hidden />
      {totalItems > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-4 font-semibold text-white tabular-nums">
          {totalItems}
        </span>
      )}
    </button>
  );
}

export default function Header() {
  const { session, isLoading } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  useClickOutside(menuRef, closeMenu, isMenuOpen);

  return (
    <>
      <header className="sticky top-0 z-40 h-16 w-full border-b border-border bg-surface md:h-[75px]">
        <div className="mx-auto flex h-full w-full max-w-[1280px] items-center gap-2 px-4 md:gap-4 md:px-6">
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

          <div
            ref={menuRef}
            className="relative ml-auto flex items-center gap-1 md:ml-0 md:gap-4 lg:ml-0 lg:gap-6"
          >
            <Link
              href="/iniciar-sesion"
              aria-label="Iniciar sesión"
              className={`${iconButtonClass} md:hidden`}
            >
              <User className="size-5" aria-hidden />
            </Link>

            <div className="hidden md:block">
              <UserMenu
                isLoggedIn={!isLoading && session !== null}
                displayName={session?.name}
              />
            </div>

            <NotificationsBell />

            <CartButton />

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              aria-label="Abrir menú de navegación"
              className={`${iconButtonClass} md:hidden`}
            >
              <Menu className="size-5" aria-hidden />
            </button>

            {isMenuOpen && (
              <div
                role="menu"
                aria-label="Navegación"
                className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-float md:hidden"
              >
                {NAV_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    role="menuitem"
                    onClick={closeMenu}
                    className="flex min-h-12 items-center rounded-lg px-3 text-body-md text-neutral transition-colors hover:bg-canvas-muted"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <CartDrawer />
    </>
  );
}
