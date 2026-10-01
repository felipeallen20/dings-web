"use client";

import Image from "next/image";
import { BadgeCheck, CalendarDays, Camera, Package, Star } from "lucide-react";
import type { Session } from "@/types/auth";
import profileLogged from "@/assets/images/profile-logged.png";
import userDefaultIcon from "@/assets/images/user-default-icon.webp";

const memberSinceFormatter = new Intl.DateTimeFormat("es-CO", {
  month: "long",
  year: "numeric",
});

function formatMemberSince(isoDate: string) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "hace poco";
  return memberSinceFormatter.format(date);
}

interface ProfileIdentityCardProps {
  session: Session;
  favoritesCount: number;
  ordersCount: number;
}

export function ProfileIdentityCard({
  session,
  favoritesCount,
  ordersCount,
}: ProfileIdentityCardProps) {
  const avatarSrc =
    session.provider === "email" ? profileLogged : userDefaultIcon;

  return (
    <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
      <div className="relative">
        <span className="relative block size-16 overflow-hidden rounded-full ring-2 ring-border sm:size-20">
          <Image
            src={avatarSrc}
            alt={`Foto de ${session.name}`}
            fill
            sizes="(min-width: 640px) 80px, 64px"
            className="object-cover"
          />
        </span>

        <button
          type="button"
          aria-label="Cambiar foto de perfil"
          className="absolute -right-0.5 -bottom-0.5 flex size-7 items-center justify-center rounded-full border border-border bg-surface text-neutral shadow-float transition-colors hover:bg-canvas-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:size-8"
        >
          <Camera className="size-3.5" aria-hidden />
        </button>
      </div>

      <div className="flex min-w-0 flex-col gap-0.5">
        <h2 className="text-title-sm text-neutral sm:text-title-md">
          {session.name}
        </h2>
        <p className="break-all text-caption text-text-secondary sm:text-body-sm">
          {session.email}
        </p>
      </div>

      <span className="inline-flex items-center gap-1.5 rounded-full bg-canvas-muted px-2.5 py-1 text-caption text-text-secondary sm:text-label-sm">
        <BadgeCheck className="size-3 shrink-0 text-tertiary-strong" aria-hidden />
        {session.provider === "google"
          ? "Cuenta de Google"
          : "Correo verificado"}
      </span>

      <p className="flex items-center gap-1.5 text-caption text-text-secondary sm:text-body-sm">
        <CalendarDays className="size-3.5 shrink-0" aria-hidden />
        Miembro desde {formatMemberSince(session.createdAt)}
      </p>

      <dl className="grid w-full grid-cols-2 gap-2 border-t border-border pt-3 sm:pt-4">
        <div className="flex flex-col items-center gap-0.5">
          <dt className="flex items-center gap-1 text-label-xs text-text-secondary uppercase">
            <Package className="size-3" aria-hidden />
            Pedidos
          </dt>
          <dd className="text-title-xs text-neutral tabular-nums sm:text-title-sm">
            {ordersCount}
          </dd>
        </div>

        <div className="flex flex-col items-center gap-0.5 border-l border-border">
          <dt className="flex items-center gap-1 text-label-xs text-text-secondary uppercase">
            <Star className="size-3" aria-hidden />
            Favoritos
          </dt>
          <dd className="text-title-xs text-neutral tabular-nums sm:text-title-sm">
            {favoritesCount}
          </dd>
        </div>
      </dl>
    </div>
  );
}