import type { OtpChallenge, Session } from "@/types/auth";

const STORAGE_KEY = "dings.session";
const OTP_TTL_MS = 5 * 60 * 1000;
const OTP_LENGTH = 6;
const NETWORK_DELAY_MS = 600;

function delay() {
  return new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY_MS));
}

function createUserId() {
  return `usr-${Math.random().toString(36).slice(2, 10)}`;
}

function buildSession(
  name: string,
  email: string,
  provider: Session["provider"],
): Session {
  return {
    userId: createUserId(),
    name,
    email,
    provider,
    createdAt: new Date().toISOString(),
  };
}

export async function requestOtpCode(email: string): Promise<OtpChallenge> {
  await delay();

  return {
    email,
    code: String(Math.floor(100000 + Math.random() * 900000)).slice(
      0,
      OTP_LENGTH,
    ),
    expiresAt: Date.now() + OTP_TTL_MS,
  };
}

export async function verifyOtpCode(
  challenge: OtpChallenge,
  code: string,
  name: string,
): Promise<Session> {
  await delay();

  if (Date.now() > challenge.expiresAt) {
    throw new Error("El código expiró. Pide uno nuevo.");
  }

  if (code !== challenge.code) {
    throw new Error("El código no coincide. Revísalo e inténtalo de nuevo.");
  }

  return buildSession(name, challenge.email, "email");
}

export async function signInWithGoogle(): Promise<Session> {
  await delay();

  return buildSession("Ana Restrepo", "ana.restrepo@correo.com", "google");
}

export async function getStoredSession(): Promise<Session | null> {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Session;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export async function persistSession(session: Session): Promise<void> {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export async function signOut(): Promise<void> {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}