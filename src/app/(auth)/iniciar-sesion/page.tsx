import type { Metadata } from "next";
import { AuthForm } from "@/components/features/auth/AuthForm";
import { AuthShell } from "@/components/features/auth/AuthShell";

export const metadata: Metadata = {
  title: "Iniciar sesión | Dings",
  description: "Entra a Dings con tu correo o continúa con Google.",
};

export default async function IniciarSesionPage({
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
      <AuthForm mode="login" callbackUrl={callbackUrl} />
    </AuthShell>
  );
}