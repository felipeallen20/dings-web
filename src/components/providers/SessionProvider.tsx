"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@/types/auth";
import {
  getStoredSession,
  persistSession,
  signOut as clearStoredSession,
} from "@/services/auth";

interface SessionContextValue {
  session: Session | null;
  isLoading: boolean;
  setSession: (session: Session) => void;
  signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getStoredSession().then((stored) => {
      if (!active) return;
      setSessionState(stored);
      setIsLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const setSession = useCallback((next: Session) => {
    setSessionState(next);
    void persistSession(next);
  }, []);

  const signOut = useCallback(async () => {
    setSessionState(null);
    await clearStoredSession();
  }, []);

  const value = useMemo(
    () => ({ session, isLoading, setSession, signOut }),
    [isLoading, session, setSession, signOut],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession debe usarse dentro de SessionProvider");
  }

  return context;
}
