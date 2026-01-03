"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function NextTheme({ children }: { children: React.ReactNode }) {
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark" || (theme === "system" && systemTheme === "dark")) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [theme, systemTheme]);

  return <>{children}</>;
}
