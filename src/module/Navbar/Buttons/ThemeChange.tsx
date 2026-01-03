"use client";

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function ThemeChange() {
  return (
    <button
      // onClick={() => }
      className="border-2 border-gray-200 dark:border-gray-700 rounded-full p-2 transition"
    >
      <IoSunnyOutline size={19} />

      <IoMoonOutline size={19} />
    </button>
  );
}
