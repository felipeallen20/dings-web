"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Receipt, Search, User, X, type LucideIcon } from "lucide-react";
import { SearchBar } from "@/components/layout/SearchBar";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "explorar", label: "Explorar", icon: Compass, href: "/explorar" },
  { id: "buscar", label: "Buscar", icon: Search },
  { id: "pedidos", label: "Pedidos", icon: Receipt },
  { id: "perfil", label: "Perfil", icon: User, href: "/perfil" },
];

function itemClassName(isActive: boolean) {
  return `flex min-h-14 w-full flex-col items-center justify-center gap-1 py-2 text-label-md transition-colors ${
    isActive
      ? "text-primary"
      : "text-text-secondary hover:text-neutral focus-visible:text-neutral"
  }`;
}

export function BottomNav() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isExploreActive = pathname.startsWith("/explorar");
  const isProfileActive = pathname.startsWith("/perfil");

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {isSearchOpen && (
        <div
          id="bottom-nav-search"
          className="flex items-center gap-2 border-b border-border px-4 py-3"
        >
          <SearchBar />

          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Cerrar búsqueda"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-canvas-muted hover:text-neutral focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
      )}

      <ul className="flex items-stretch">
        {NAV_ITEMS.map(({ id, label, icon: Icon, href }) => {
          const isActive =
            id === "explorar"
              ? isExploreActive
              : id === "perfil"
                ? isProfileActive
                : id === "buscar" && isSearchOpen;

          if (id === "buscar") {
            return (
              <li key={id} className="flex-1">
                <button
                  type="button"
                  onClick={() => setIsSearchOpen((open) => !open)}
                  aria-expanded={isSearchOpen}
                  aria-controls="bottom-nav-search"
                  className={itemClassName(isActive)}
                >
                  <Icon className="size-5" aria-hidden />
                  <span>{label}</span>
                </button>
              </li>
            );
          }

          if (href) {
            return (
              <li key={id} className="flex-1">
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={itemClassName(isActive)}
                >
                  <Icon className="size-5" aria-hidden />
                  <span>{label}</span>
                </Link>
              </li>
            );
          }

          return (
            <li key={id} className="flex-1">
              <button type="button" className={itemClassName(false)}>
                <Icon className="size-5" aria-hidden />
                <span>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
