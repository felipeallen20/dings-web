"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useSession } from "@/components/providers/SessionProvider";
import profileLogged from "@/assets/images/profile-logged.png";
import userDefaultIcon from "@/assets/images/user-default-icon.webp";

const MENU_ITEMS = [
  { label: "Mi perfil", href: "/perfil", icon: User },
  { label: "Configuración", href: "/configuracion", icon: Settings },
];

interface UserMenuProps {
  isLoggedIn?: boolean;
  displayName?: string;
}

export function UserMenu({ isLoggedIn = false, displayName }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { session, signOut } = useSession();

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(containerRef, close, isOpen);

  const handleSignOut = useCallback(async () => {
    close();
    await signOut();
    router.push("/");
  }, [close, router, signOut]);

  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/registrarse"
          className="text-label-lg text-text-secondary transition-colors hover:text-primary"
        >
          Registrarse
        </Link>
        <Link
          href="/iniciar-sesion"
          className="rounded-lg bg-primary px-4 py-2 text-label-lg text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  const hasProfileImage = session?.provider === "email";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={
          displayName ? `Menú de ${displayName}` : "Menú de usuario"
        }
        className="flex items-center gap-1.5 rounded-full p-1 transition-colors hover:bg-canvas-muted"
      >
        <span className="relative block size-5 shrink-0 overflow-hidden rounded-full">
          <Image
            src={hasProfileImage ? profileLogged : userDefaultIcon}
            alt=""
            fill
            sizes="20px"
            className="object-cover"
          />
        </span>
        <ChevronDown
          className={`size-4 text-neutral transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-float"
        >
          {displayName && (
            <p className="truncate border-b border-border px-4 py-2.5 text-label-sm text-text-secondary">
              {displayName}
            </p>
          )}

          {MENU_ITEMS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              role="menuitem"
              onClick={close}
              className="flex items-center gap-2.5 px-4 py-2.5 text-body-sm text-neutral transition-colors hover:bg-canvas-muted"
            >
              <Icon className="size-4 shrink-0 text-text-secondary" aria-hidden />
              {label}
            </Link>
          ))}

          <div className="mt-1 border-t border-border pt-1">
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-body-sm text-neutral transition-colors hover:bg-canvas-muted"
            >
              <LogOut
                className="size-4 shrink-0 text-text-secondary"
                aria-hidden
              />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
