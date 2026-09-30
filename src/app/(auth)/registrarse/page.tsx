import type { Metadata } from "next";
import { AuthForm } from "@/components/features/auth/AuthForm";
import { AuthShell } from "@/components/features/auth/AuthShell";

export const metadata: Metadata = {
  title: "Crear cuenta | Dings",
  description: "Crea tu cuenta en Dings y empieza a pedir.",
};

export default async function RegistrarsePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawCallback =
    typeof params.redirect === "string" ? params.redirect : "/";
  const callbackUrl = rawCallback.startsWith("/") ? rawCallback : "/";

  return (
    <AuthShell>
      <AuthForm mode="registro" callbackUrl={callbackUrl} />
    </AuthShell>
  );
}