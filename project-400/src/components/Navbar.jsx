import { Button } from "@/components/ui/button";
import { Building2, LogIn, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-surface/60 transition-all duration-500 ${
        scrolled ? "bg-surface/80 shadow-soft h-14" : "bg-surface/50 h-16"
      }`}
    >
      <div className="container flex h-full items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="UNC Portal Home"
        >
          <Building2 className="h-9 w-9 text-primary" />
          <span className="text-2xl md:text-[1.75rem] leading-none font-extrabold tracking-tight gradient-text">
            UNC
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium relative">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative py-1 transition-colors ${
                  active
                    ? "text-primary"
                    : "text-content-muted hover:text-content"
                }`}
              >
                {l.label}
                <span
                  className={`pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 rounded bg-gradient-to-r from-aurora-1 to-aurora-3 transition-transform duration-500 ${
                    active
                      ? "scale-x-100"
                      : "group-hover:scale-x-100 hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login" className="flex items-center">
              <LogIn className="h-4 w-4 mr-2" /> Login
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup" className="flex items-center">
              <UserPlus className="h-4 w-4 mr-2" /> Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
