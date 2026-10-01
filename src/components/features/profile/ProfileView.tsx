"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import type { Restaurant } from "@/types/restaurant";
import type { Zone } from "@/types/zone";
import { useSession } from "@/components/providers/SessionProvider";
import { Card } from "@/components/ui/Card";
import { ProfileIdentityCard } from "@/components/features/profile/ProfileIdentityCard";
import { PersonalDataForm } from "@/components/features/profile/PersonalDataForm";
import { AddressBook } from "@/components/features/profile/AddressBook";
import { FavoritesSection } from "@/components/features/profile/FavoritesSection";
import { PreferencesSection } from "@/components/features/profile/PreferencesSection";

const ORDERS_COUNT = 12;

function ProfileSkeleton() {
  return (
    <div className="grid gap-margin-mobile lg:grid-cols-[320px_1fr] lg:gap-margin">
      <div className="h-64 animate-pulse rounded-xl border border-border bg-canvas-muted" />
      <div className="flex flex-col gap-margin-mobile">
        <div className="h-48 animate-pulse rounded-xl border border-border bg-canvas-muted" />
        <div className="h-72 animate-pulse rounded-xl border border-border bg-canvas-muted" />
        <div className="h-40 animate-pulse rounded-xl border border-border bg-canvas-muted" />
      </div>
    </div>
  );
}

interface ProfileViewProps {
  zones: Zone[];
  favorites: Restaurant[];
}

export function ProfileView({ zones, favorites }: ProfileViewProps) {
  const { session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/iniciar-sesion?redirect=/perfil");
    }
  }, [isLoading, session, router]);

  if (isLoading) return <ProfileSkeleton />;
  if (!session) return null;

  return (
    <div className="grid gap-margin-mobile lg:grid-cols-[320px_1fr] lg:gap-margin">
      <div className="lg:sticky lg:top-[100px] lg:self-start">
        <Card>
          <ProfileIdentityCard
            session={session}
            favoritesCount={favorites.length}
            ordersCount={ORDERS_COUNT}
          />
        </Card>
      </div>

      <div className="flex flex-col gap-margin-mobile lg:gap-margin">
        <PersonalDataForm session={session} />

        <AddressBook zones={zones} />

        <FavoritesSection restaurants={favorites} />

        <PreferencesSection />

        <Card
          title="Sesión"
          description="Cierra la sesión en este dispositivo."
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-caption text-text-secondary sm:text-body-sm">
              Iniciaste sesión con {session.email}.
            </p>

            <button
              type="button"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 text-label-lg text-neutral transition-colors hover:bg-canvas-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:h-12 sm:px-6"
            >
              <LogOut className="size-4 shrink-0" aria-hidden />
              Cerrar sesión
            </button>
          </div>
        </Card>

        <p className="text-caption text-placeholder sm:text-body-sm">
          ¿Buscas las opciones de la cuenta?{" "}
          <Link
            href="/configuracion"
            className="text-primary transition-colors hover:text-primary-hover"
          >
            Configuración
          </Link>
        </p>
      </div>
    </div>
  );
}