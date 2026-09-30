"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import type { AuthMode, AuthStep, OtpChallenge, Session } from "@/types/auth";
import {
  requestOtpCode,
  signInWithGoogle,
  verifyOtpCode,
} from "@/services/auth";
import { useSession } from "@/components/providers/SessionProvider";
import { TextField } from "@/components/ui/TextField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { GoogleIcon } from "@/components/features/auth/GoogleIcon";
import { OtpInput } from "@/components/features/auth/OtpInput";

const COPY = {
  login: {
    title: "Inicia sesión en Dings",
    subtitle: "Entra con tu correo o continúa con Google.",
    submit: "Continuar con correo",
    switchText: "¿No tienes cuenta?",
    switchLink: "Regístrate",
    switchHref: "/registrarse",
  },
  registro: {
    title: "Crea tu cuenta en Dings",
    subtitle: "Toma menos de un minuto y no pedimos tarjeta.",
    submit: "Crear cuenta y continuar",
    switchText: "¿Ya tienes cuenta?",
    switchLink: "Inicia sesión",
    switchHref: "/iniciar-sesion",
  },
} as const;

const googleButtonClass =
  "inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border bg-surface px-4 text-label-lg text-neutral transition-colors hover:border-border-strong hover:bg-canvas-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none";

const OTP_LENGTH = 6;

interface AuthFormProps {
  mode: AuthMode;
  callbackUrl?: string;
}

export function AuthForm({ mode, callbackUrl = "/" }: AuthFormProps) {
  const router = useRouter();
  const { setSession } = useSession();

  const copy = COPY[mode];
  const isRegistro = mode === "registro";

  const [step, setStep] = useState<AuthStep>("email");
  const [name, setName] = useState("Cliente Dings");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [challenge, setChallenge] = useState<OtpChallenge | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function completeSignIn(session: Session) {
    setSession(session);
    router.push(callbackUrl);
  }

  async function handleGoogle() {
    setError(null);
    setIsSubmitting(true);

    try {
      completeSignIn(await signInWithGoogle());
    } catch {
      setError("No pudimos conectar con Google. Inténtalo de nuevo.");
      setIsSubmitting(false);
    }
  }

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const nextEmail = String(formData.get("email") ?? "").trim();
    const nextName = isRegistro
      ? String(formData.get("name") ?? "").trim()
      : "Cliente Dings";

    try {
      const nextChallenge = await requestOtpCode(nextEmail);
      setChallenge(nextChallenge);
      setEmail(nextEmail);
      setName(nextName);
      setCode("");
      setStep("otp");
    } catch {
      setError("No pudimos enviar el código. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitCode(value: string) {
    if (!challenge || isSubmitting) return;

    setError(null);
    setIsSubmitting(true);

    try {
      completeSignIn(await verifyOtpCode(challenge, value, name));
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "No pudimos verificar el código.",
      );
      setCode("");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    if (!challenge) return;

    setError(null);
    setIsSubmitting(true);

    try {
      setChallenge(await requestOtpCode(challenge.email));
      setCode("");
    } catch {
      setError("No pudimos reenviar el código. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-headline-md text-neutral lg:text-headline-lg">
          {step === "otp" ? "Revisa tu correo" : copy.title}
        </h1>
        <p className="text-body-md text-text-secondary">
          {step === "otp" ? (
            <>
              Enviamos un código de {OTP_LENGTH} dígitos a{" "}
              <span className="font-semibold text-neutral">{email}</span>. Caduca
              en 5 minutos.
            </>
          ) : (
            copy.subtitle
          )}
        </p>
      </div>

      {step === "email" ? (
        <>
          <button
            type="button"
            onClick={handleGoogle}
            disabled={isSubmitting}
            className={googleButtonClass}
          >
            <GoogleIcon className="size-5 shrink-0" />
            Continuar con Google
          </button>

          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-label-md text-text-secondary">
              o continúa con correo
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {isRegistro && (
              <TextField
                id="name"
                label="Nombre"
                name="name"
                required
                autoComplete="name"
                placeholder="Ej. Mariana López"
              />
            )}

            <TextField
              id="email"
              label="Correo electrónico"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="tu@correo.com"
            />

            <PrimaryButton type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Enviando…" : copy.submit}
            </PrimaryButton>
          </form>

          <p className="text-center text-body-sm text-text-secondary">
            {copy.switchText}{" "}
            <Link
              href={copy.switchHref}
              className="text-primary underline underline-offset-2"
            >
              {copy.switchLink}
            </Link>
          </p>
        </>
      ) : (
        <>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void submitCode(code);
            }}
            className="space-y-4"
          >
            <OtpInput
              value={code}
              onChange={setCode}
              disabled={isSubmitting}
              onComplete={(value) => void submitCode(value)}
            />

            <PrimaryButton
              type="submit"
              fullWidth
              disabled={isSubmitting || code.length < OTP_LENGTH}
            >
              {isSubmitting ? "Verificando…" : "Verificar código"}
            </PrimaryButton>
          </form>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setError(null);
                setCode("");
              }}
              className="inline-flex items-center gap-1.5 text-label-lg text-text-secondary transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Cambiar correo
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={isSubmitting}
              className="text-label-lg text-primary transition-colors hover:text-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reenviar código
            </button>
          </div>
        </>
      )}

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-border bg-canvas-muted px-4 py-3 text-body-sm text-neutral"
        >
          {error}
        </p>
      )}

      {process.env.NODE_ENV !== "production" && step === "otp" && challenge && (
        <p className="rounded-lg border border-border bg-canvas-muted px-4 py-3 text-body-sm text-text-secondary">
          <span className="flex items-center gap-2 font-semibold text-neutral">
            <Mail className="size-4 shrink-0" aria-hidden />
            Modo demo: tu código es {challenge.code}
          </span>
        </p>
      )}
    </div>
  );
}
