"use client";

import { ArrowLeft } from "lucide-react";

type Props = {
  title: string;
  items: string[];
  active: boolean;
  onBack: () => void;
};

export default function CategorySection({
  title,
  items,
  active,
  onBack,
}: Props) {
  return (
    <div
      className={`absolute inset-0 min-h-screen p-3 bg-white dark:bg-gray-800 transition-transform duration-300 ${
        active ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="flex items-center gap-2 border-b-2 border-gray-200 pb-3 dark:border-b-gray-700 cursor-pointer"
        onClick={onBack}
      >
        <h2>{title}</h2>
        <ArrowLeft size={15} />
      </div>

      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="cursor-pointer hover:text-blue-500">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
