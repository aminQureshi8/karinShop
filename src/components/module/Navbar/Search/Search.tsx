"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { GoArrowUpLeft, GoArrowUpRight } from "react-icons/go";

export default function Search() {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [products, setProducts] = useState([]);

  const [history, setHistory] = useState<{ title: string; slug: string }[]>([]);

  const router = usePathname();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("search") || "[]"));
  }, []);

  useEffect(() => {
    setOpen(false);
    setInputValue("");
  }, [router]);

  useEffect(() => {
    if (!inputValue.trim()) {
      setProducts([]);
      return;
    }

    const searchProduct = async () => {
      const res = await fetch(`/api/search?query=${inputValue}`);
      const data = await res.json();
      setProducts(data.findProducts);
    };

    const timer = setTimeout(() => {
      searchProduct();
    }, 500);

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

  const saveToHistory = (product: { title: string; slug: string }) => {
    const oldHistory = JSON.parse(localStorage.getItem("search") || "[]");
    const updatedHistory = [
      product,
      ...oldHistory.filter((item: any) => item.slug !== product.slug),
    ].slice(0, 5);
    localStorage.setItem("search", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  return (
    <div ref={wrapperRef} className={`relative ${open && "z-50"}`}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setOpen(true)}
        className={`relative ${open ? "z-50" : ""}  rounded-full border-2 p-2 border-gray-200 dark:border-gray-700 pr-12 focus:outline-none focus:border-blue-500 w-full`}
        placeholder="جستجو در کارین..."
      />

      <div
        onClick={() => setOpen(false)}
        className={`bg-black/60 ${open ? "fixed" : "hidden"} inset-0 z-40`}
      />

      <div className={`absolute top-1 right-1 ${open ? "z-50" : ""}`}>
        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          <CiSearch size={20} />
        </button>
      </div>

      <div
        onMouseDown={(e) => e.preventDefault()}
        className={`absolute text-sm w-[300px] top-[130%] right-0 mt-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition-all duration-300 ${open ? "opacity-100 visible translate-y-0 z-50" : "opacity-0 invisible translate-y-2"}`}
      >
        <div className="p-5">
          <ul className="flex flex-col gap-4">
            {inputValue.trim().length > 0 ? (
              products.length > 0 ? (
                products.map((pro: any) => (
                  <li key={pro._id}>
                    <Link
                      href={`/product/${pro.slug}`}
                      onClick={() =>
                        saveToHistory({ title: pro.title, slug: pro.slug })
                      }
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <FaSearch className="text-gray-400" />
                        <p className="line-clamp-1 w-52">{pro.title}</p>
                      </div>
                      <GoArrowUpRight
                        size={18}
                        className="group-hover:text-blue-500"
                      />
                    </Link>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">نتیجه‌ای یافت نشد</p>
              )
            ) : (
              history.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/product/${item.slug}`}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <FaSearch className="text-gray-400" />
                      <p className="line-clamp-1 w-52">{item.title}</p>
                    </div>
                    <GoArrowUpRight
                      size={18}
                      className="group-hover:text-blue-500"
                    />
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
