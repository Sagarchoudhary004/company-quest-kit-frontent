import { Link, NavLink, useNavigate } from "react-router-dom";
import { Moon, Sun, GraduationCap, LogIn, LogOut, Menu, X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const { theme, toggleTheme, favorites, user, logout } = useApp();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";
  const links = isAdmin
    ? [
        { to: "/", label: "Home" },
        { to: "/admin", label: "Admin Panel" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/companies", label: "Companies" },
        { to: "/favorites", label: "Saved" },
      ];

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <div className="h-9 w-9 rounded-xl gradient-primary grid place-items-center shadow-glow">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-gradient">PlacePrep</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`
              }
            >
              {l.label}
              {l.to === "/favorites" && favorites.length > 0 && (
                <span className="ml-1.5 text-xs bg-primary text-primary-foreground rounded-full px-1.5">{favorites.length}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <div className="h-9 w-9 rounded-full gradient-primary grid place-items-center text-primary-foreground font-semibold text-sm">
                {user.name[0]?.toUpperCase()}
              </div>
              <Button variant="ghost" size="icon" onClick={logout} aria-label="Log out"><LogOut className="h-5 w-5" /></Button>
            </div>
          ) : (
            <Button onClick={() => navigate("/login")} variant="hero" size="sm" className="hidden sm:inline-flex">
              <LogIn className="h-4 w-4 mr-1" /> Sign In
            </Button>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur">
          <nav className="container py-3 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `px-4 py-2.5 rounded-lg text-sm font-medium ${isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
              >
                {l.label}
              </NavLink>
            ))}
            {!user && (
              <Button onClick={() => { setOpen(false); navigate("/login"); }} variant="hero" className="mt-2">
                <LogIn className="h-4 w-4 mr-1" /> Sign In
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
