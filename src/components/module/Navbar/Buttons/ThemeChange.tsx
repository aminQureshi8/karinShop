"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { BeatLoader } from "react-spinners";
export default function ThemeChange() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="size-9 bg-gray-300 animate-pulse dark:bg-gray-800  rounded-full p-2 flex items-center justify-center"
        aria-label="loading theme"
      ></button>
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
