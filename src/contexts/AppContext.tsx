import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type Track = "Tech" | "Non-Tech" | null;

type AppliedCompany = {
  companyId: string;
  companyName: string;
  status: "Applied" | "Interview" | "Rejected" | "Selected";
  appliedAt: string;
};

interface AppContextValue {
  theme: Theme;
  toggleTheme: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  track: Track;
  setTrack: (t: Track) => void;
  user: { id?: string; name: string; email: string; role?: string; preference?: string } | null;
  token: string | null;
  appliedCompanies: AppliedCompany[];
  login: (user: { id?: string; name: string; email: string; role?: string; preference?: string }, token: string) => void;
  logout: () => void;
  applyToCompany: (company: { id: string; name: string }) => Promise<{ ok: boolean; message: string }>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);
const isMongoId = (id: string) => /^[a-f\d]{24}$/i.test(id);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "light");
  const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem("favorites") || "[]"));
  const [track, setTrackState] = useState<Track>(() => (localStorage.getItem("track") as Track) || null);
  const [user, setUser] = useState<AppContextValue["user"]>(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [appliedCompanies, setAppliedCompanies] = useState<AppliedCompany[]>(() =>
    JSON.parse(localStorage.getItem("appliedCompanies") || "[]")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("appliedCompanies", JSON.stringify(appliedCompanies));
  }, [appliedCompanies]);

  const setTrack = (t: Track) => {
    setTrackState(t);
    if (t) localStorage.setItem("track", t);
    else localStorage.removeItem("track");
  };

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const toggleFavorite = (id: string) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const login = (u: { id?: string; name: string; email: string; role?: string; preference?: string }, authToken: string) => {
    setUser(u);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(u));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAppliedCompanies([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("appliedCompanies");
  };

  const applyToCompany = async (company: { id: string; name: string }) => {
    if (appliedCompanies.some((item) => item.companyId === company.id)) {
      return { ok: false, message: "You already applied to this company." };
    }

    const canCallBackend = Boolean(token && isMongoId(company.id));

    if (canCallBackend) {
      try {
        const res = await fetch("/api/v1/users/apply-company", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ companyId: company.id }),
        });
        const data = await res.json();
        if (!res.ok || !data?.success) {
          return { ok: false, message: data?.message || "Application failed" };
        }
      } catch {
        return { ok: false, message: "Server error while applying" };
      }
    }

    const newItem: AppliedCompany = {
      companyId: company.id,
      companyName: company.name,
      status: "Applied",
      appliedAt: new Date().toISOString(),
    };
    setAppliedCompanies((prev) => [newItem, ...prev]);

    if (!canCallBackend) {
      return { ok: true, message: `Applied to ${company.name} (saved locally)` };
    }

    return { ok: true, message: `Applied to ${company.name}` };
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        favorites,
        toggleFavorite,
        track,
        setTrack,
        user,
        token,
        appliedCompanies,
        login,
        logout,
        applyToCompany,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
