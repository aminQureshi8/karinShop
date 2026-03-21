"use client";
import { closeSearch } from "@/app/redux/slices/SearchMobile/SearchMobile";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";
import { GoArrowUpRight } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { FaGripfire } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SearchMobileMenu() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const router = usePathname();
  const isOpen = useSelector((state: RootState) => state.searchMobile.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeSearch());
    setSearch("");
  }, [router]);

  useEffect(() => {
    if (!search.trim()) {
      setProducts([]);
      return;
    }

    const timer = setTimeout(() => {
      searchProduct();
    }, 500);

    const searchProduct = async () => {
      const res = await fetch(`/api/search?query=${search}`);
      const data = await res.json();
      setProducts(data.findProducts);
    };

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div
      className={`fixed inset-0 z-50
    bg-white/40 dark:bg-gray-900/40
    backdrop-blur-md
    border border-white/30 dark:border-white/10
    text-gray-900 dark:text-white
    transform transition-transform duration-300
    ${isOpen ? "translate-y-0" : "-translate-y-full"}
  `}
    >
      <div className="p-4 font-danaMed">
        <div className="flex gap-3 items-center">
          <div className="relative w-full">
            <input
              placeholder="جستجو در همه کالاها"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="pr-12 w-full outline-0 rounded-full py-2 text-sm dark:border-white/15 dark:placeholder-gray-400   text-gray-900 bg-gray-200 dark:bg-gray-800/50 dark:text-white"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300">
              <CiSearch size={18} />
            </div>
          </div>

          <button onClick={() => dispatch(closeSearch())}>
            <IoCloseOutline size={22} />
          </button>
        </div>
        <div className="mt-5 text-sm">
          <p>
            نتیجه جستجو : <span className="text-blue-500">iphone</span>
          </p>
        </div>
        <div className="mt-5 text-sm">
          <ul className="flex flex-col gap-5">
            {products.length === 0 ? (
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CiSearch size={19} />
                  <p>ایفون ۱۴</p>
                </div>
                <div>
                  <GoArrowUpRight size={19} />
                </div>
              </li>
            ) : (
              products.map((p) => (
                <li className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CiSearch size={19} />
                    <Link
                      href={`/productInfo/${p._id}`}
                      className="line-clamp-1"
                    >
                      {p.title}
                    </Link>
                  </div>
                  <div>
                    <GoArrowUpRight size={19} />
                  </div>
                </li>
              ))
            )}

            <li className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CiSearch size={19} />
                <p>ایفون ۱۴</p>
              </div>
              <div>
                <GoArrowUpRight size={19} />
              </div>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CiSearch size={19} />
                <p>ایفون ۱۴</p>
              </div>
              <div>
                <GoArrowUpRight size={19} />
              </div>
            </li>
          </ul>
        </div>
        <div className="mt-5 text-sm">
          <div className="flex items-center gap-3">
            <FaGripfire size={19} />
            <p>جستجو های پرطرفدار : </p>
          </div>
          <div className="flex items-center gap-5 mt-3">
            <div className="border-2 border-gray-200 dark:border-gray-700 px-3 py-2 rounded-full">
              ایفون
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
