"use client";

import { ArrowBigLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function FilterBlog({
  checkType,
  setCheckType,
  setListType,
}: {}) {
  const [open, setOpen] = useState(false);

  const categories = [
    { id: "all", label: "همه کالاها" },
    { id: "698edaa869ad5da18d4114d1", label: "موبایل" },
    { id: "698f0bd7961ffa9510fae56d", label: "لب تاب" },
  ];

  return (
    <div className="rounded-lg bg-white dark:bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <h2>فیلتر ها</h2>

        <button
          className="text-blue-500 text-sm cursor-pointer"
          onClick={() => {
            setCheckType("all");
            setListType("pop");
          }}
        >
          حذف فیلترها
        </button>
      </div>

      <div className="mt-5">
        <ul className="flex flex-col gap-12">
          <li>
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between cursor-pointer"
            >
              <p>دسته بندی</p>

              <ArrowBigLeft
                className={`transition-transform duration-300 ${
                  open ? "rotate-90" : ""
                }`}
              />
            </div>

            <ul
              className={`overflow-hidden transition-all duration-300 ${
                open ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              {categories.map((cat) => (
                <li key={cat.id} className="p-2 rounded">
                  <div className="inline-flex items-center mt-1">
                    <label className="relative flex cursor-pointer items-center rounded-full p-2">
                      <input
                        type="checkbox"
                        checked={checkType === cat.id}
                        onChange={() => setCheckType(cat.id)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded shadow transition-all checked:bg-blue-500 dark:bg-gray-600"
                      />

                      <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white opacity-0 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </label>

                    <label className="cursor-pointer text-gray-800 dark:text-gray-400 mr-1">
                      {cat.label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
