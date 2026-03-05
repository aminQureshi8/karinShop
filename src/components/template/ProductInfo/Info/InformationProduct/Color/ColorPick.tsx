"use client";

import { useEffect } from "react";

export default function ColorPick({ colors }: any) {
  console.log(colors[0].split("[").join("").split("]").join(""));

  useEffect(() => {
    localStorage.setItem(
      "color",
      colors[0].split("[").join("").split("]").join(""),
    );
  }, []);

  return (
    <div className="my-3">
      <div className="flex items-center gap-2">
        <p>رنگ : </p>
        <p>ابی</p>
      </div>

      <div className="mt-2" onClick={() => {}}>
        {colors.map((color: any, index: number) => (
          <div
            key={index}
            className="w-6 h-6 rounded-full bg-blue-500 border-2 border-gray-300 cursor-pointer"
          ></div>
        ))}
      </div>
    </div>
  );
}
