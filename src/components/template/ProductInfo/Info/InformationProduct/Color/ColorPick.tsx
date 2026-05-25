"use client";

import { useEffect, useMemo, useState } from "react";

const colorToTailwindClass: Record<string, string> = {
   "خاکستری": "bg-gray-500",
  "طوسی": "bg-gray-300",
  "آبی": "bg-blue-500",
  "ابی": "bg-blue-500",
  "قرمز": "bg-red-500",
  "سبز": "bg-green-500",
  "مشکی": "bg-black",
  "سفید": "bg-white",
  "نارنجی": "bg-orange-500",
  "بنفش": "bg-purple-500",


  
};

function normalizeColor(s: string) {
  return s.replaceAll("[", "").replaceAll("]", "").trim();
}

export default function ColorPick({ colors }: any) {
  const normalizedColors = useMemo(
    () => (Array.isArray(colors) ? colors.map(normalizeColor) : []),
    [colors],
  );

  const [colorSelect, setColorSelect] = useState(normalizedColors[0]);

  useEffect(() => {
    if (normalizedColors[0]) localStorage.setItem("color", normalizedColors[0]);
  }, [normalizedColors]);

  return (
    <div className="my-3">
      <div className="flex items-center gap-2">
        <p>رنگ :</p>
        <p>{colorSelect}</p>
      </div>

      <div className="mt-2 flex gap-2">
        {normalizedColors.map((c, index) => {
          const cls = colorToTailwindClass[c] ?? "bg-gray-200";
          return (
            <div
              key={index}
              className={`w-6 h-6  rounded-full border-2 ${c === colorSelect && "border-4 border-blue-300!"} border-gray-300 cursor-pointer ${cls}`}
              title={c}
              onClick={() => {
                localStorage.setItem("color", c);
                setColorSelect(c);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
