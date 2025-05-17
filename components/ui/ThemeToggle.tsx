"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-full bg-[--muted] dark:bg-[--muted] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--ring]"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5 text-[--yellow50]" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full bg-[--muted] dark:bg-[--muted] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--ring]"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5 text-[--yellow50]" />
      ) : (
        <Moon className="h-5 w-5 text-[--yellow50]" />
      )}
    </button>
  );
};

export default ThemeToggle;
