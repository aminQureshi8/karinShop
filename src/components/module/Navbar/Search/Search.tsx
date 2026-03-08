"use client";
import { useEffect, useRef, useState } from "react";
import { CiMobile1, CiSearch } from "react-icons/ci";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function Search() {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!inputValue.trim()) return;

    const timer = setTimeout(() => {
      searchProduct();
    }, 500);

    const searchProduct = async () => {
      const res = await fetch(`/api/search?query=${inputValue}`);
      const data = await res.json();
      console.log(data);
    };

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setOpen(true)}
        className="rounded-full border-2 p-2 border-gray-200 dark:border-gray-700 pr-12 focus:outline-none focus:border-blue-500 w-full"
        placeholder="جستجو در کارین..."
      />

      <div className="absolute top-1 right-1">
        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          <CiSearch size={20} />
        </button>
      </div>

      <div
        onMouseDown={(e) => e.preventDefault()}
        className={`absolute text-sm w-[900px] top-[180%] right-0 mt-2
        bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700
        rounded-md shadow-lg z-50 transition-all duration-300
        ${open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}
        `}
      >
        <div className="h-80 p-5 grid grid-cols-3 gap-5">
          <div className="bg-gray-100 dark:bg-black rounded-xl p-3">
            <ul className="flex flex-col gap-5">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <CiMobile1 size={20} />
                  <p>موبایل</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2">
            <div className="flex items-center gap-2 text-blue-500">
              <p>مشاهده همه</p>
              <MdKeyboardArrowLeft />
            </div>

            <div className="grid grid-cols-3 gap-5 mt-3">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <h2 className="font-semibold">برند های مختلف</h2>
                  <ul className="flex flex-col gap-3 mt-2">
                    <li>لب تاب</li>
                    <li>لب تاب</li>
                    <li>لب تاب</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
