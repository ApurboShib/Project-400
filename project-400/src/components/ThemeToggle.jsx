import { useTheme } from "./theme-provider";
import { Moon, Sun, Monitor } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * ThemeToggle cycles: light -> dark -> system (if system enabled) -> light
 */
export default function ThemeToggle({ className = "" }) {
  const { theme, setTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const display = theme;

  const iconProps = "h-4 w-4 transition-transform duration-300";
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus-ring bg-surface/70 hover:bg-overlay/60 transition-colors ${className}`}
    >
      <span className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`${iconProps} ${
            display === "light"
              ? "scale-100 rotate-0"
              : "scale-0 -rotate-90 absolute"
          }`}
        />
        <Moon
          className={`${iconProps} ${
            display === "dark"
              ? "scale-100 rotate-0"
              : "scale-0 rotate-90 absolute"
          }`}
        />
        <Monitor
          className={`${iconProps} ${
            display === "system"
              ? "scale-100 rotate-0"
              : "scale-0 rotate-90 absolute"
          }`}
        />
      </span>
      <span className="min-w-[3.5rem] text-xs tracking-wide uppercase text-content-muted">
        {mounted ? display : "..."}
      </span>
    </button>
  );
}
