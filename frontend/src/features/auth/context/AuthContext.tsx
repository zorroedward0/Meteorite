import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { clearToken, readToken } from "@/api/client";

type SessionMode = "user" | "guest" | null;

interface Session {
  mode: SessionMode;
  authenticated: boolean;
  openSession(): void;
  openGuest(): void;
  logout(): void;
}

const MODE_KEY = "meteorite_mode";

const SessionContext = createContext<Session | null>(null);

function initialMode(): SessionMode {

  if (readToken()) {
    return "user";
  }
  if (localStorage.getItem(MODE_KEY) === "guest") {
    return "guest";
  }
  return null;

}

export function SessionProvider({ children }: { children: ReactNode }) {

  const [mode, setMode] = useState<SessionMode>(initialMode);

  const value = useMemo<Session>(
    () => ({

      mode: mode,
      authenticated: mode === "user",
      openSession() {
        localStorage.setItem(MODE_KEY, "user");
        setMode("user");
      },

      openGuest() {
        localStorage.setItem(MODE_KEY, "guest");
        setMode("guest");
      },

      logout() {
        clearToken();
        localStorage.removeItem(MODE_KEY);
        setMode(null);
      },

    }),
    [mode],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );

}

export function useSession() {

  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("useSession must be used within a SessionProvider.");
  }

  return session;

}
