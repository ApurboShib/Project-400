import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const ThemeContext = createContext();

export function ThemeProvider({
  children,
  defaultTheme = "light",
  enableSystem = true,
}) {
  const getPreferred = () => {
    if (!enableSystem) return defaultTheme;
    if (typeof window === "undefined") return defaultTheme;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    return mq.matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return defaultTheme;
    const stored = window.localStorage.getItem("theme");
    if (stored && stored !== "system") return stored;
    if (stored === "system") return getPreferred();
    return defaultTheme === "system" ? getPreferred() : defaultTheme;
  });

  const applyTheme = useCallback(
    (value) => {
      if (typeof document === "undefined") return;
      const root = document.documentElement;
      const resolved = value === "system" ? getPreferred() : value;
      root.setAttribute("data-theme", resolved);
      root.classList.toggle("dark", resolved === "dark");
      window.localStorage.setItem("theme", value);
    },
    [enableSystem]
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Listen to system changes if using system theme
  useEffect(() => {
    if (!enableSystem) return;
    const stored = window.localStorage.getItem("theme");
    if (stored !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => setTheme("system");
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [enableSystem]);

  // Reduced motion attribute/class toggle
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => {
      if (mq.matches)
        document.documentElement.setAttribute("data-reduced-motion", "true");
      else document.documentElement.removeAttribute("data-reduced-motion");
    };
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const resolved = prev === "system" ? getPreferred() : prev;
      if (resolved === "light") return "dark";
      if (resolved === "dark") return enableSystem ? "system" : "light";
      return "light";
    });
  }, [enableSystem]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
