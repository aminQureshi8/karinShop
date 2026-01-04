"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function ThemeChange() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="border-2 border-gray-200 dark:border-gray-700 rounded-full p-2 flex items-center justify-center"
        aria-label="loading theme"
      >
        <span className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="border-2 border-gray-200 dark:border-gray-700 rounded-full p-2"
    >
      {resolvedTheme === "dark" ? (
        <IoSunnyOutline size={19} />
      ) : (
        <IoMoonOutline size={19} />
      )}
    </button>
  );
}
