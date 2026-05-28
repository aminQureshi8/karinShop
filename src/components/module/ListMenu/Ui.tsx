"use client";

import { memo, useEffect, useState } from "react";
import SubCate from "./SubCate";
import { MdKeyboardArrowLeft } from "react-icons/md";
import SubCategoryType from "@/types/subCategories.type";

const Ui = memo(({ subCategories }: { subCategories: any }) => {
  const [brandState, setBrandState] = useState([]);
  const [section, setSection] = useState("/mobile");

  useEffect(() => {
    const controller = new AbortController();

    const firstFetch = async () => {
      try {
        const res = await fetch(
          `/api/admin/brand/subCate?sub=6a08c059cb34d5b275335a40`,
          { signal: controller.signal },
        );
        const data = await res.json();
        ;

        setBrandState(data.findsBrand);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    };

    firstFetch();

    return () => controller.abort();
  }, []);

  const sectionTitle = {
    "/mobile": "موبایل",
    "/laptop": "لپ تاپ",
  }[section];

  const liTags = {
    "/mobile": ["گوشی ارزان", "گوشی موبایل قسطی"],
    "/laptop": ["لپ تاپ اقتصادی", "لپ تاپ تا ۱۰ میلیون تومان"],
  }[section];

  return (
    <div className="absolute text-sm !w-[900px] top-[180%] invisible opacity-0 translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out">
      <div className="h-80">
        <div className="p-5 grid grid-cols-3 gap-5 h-full">
          <div className="bg-gray-100 text-black dark:text-white dark:bg-black !h-full rounded-xl p-3">
            <ul className="flex flex-col">
              {subCategories.map((sub: SubCategoryType) => (
                <SubCate
                  key={sub._id}
                  {...sub}
                  setBrandState={setBrandState}
                  setSection={setSection}
                />
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            <div>
              <div className="flex items-center gap-2 text-blue-500">
                <p>مشاهده همه</p>
                <MdKeyboardArrowLeft />
              </div>

              <div className="grid grid-cols-3 gap-5 text-black dark:text-white mt-3">
                <div>
                  <h2 className="flex items-center" dir="rtl">
                    <span className="h-6 w-[3px] bg-blue-400 ml-2"></span>
                    برندهای مختلف :
                  </h2>

                  <ul className="flex flex-col gap-3 mt-2">
                    {brandState.map((brand: any, index: number) => (
                      <li
                        key={index}
                        className=" text-gray-600 dark:text-gray-400"
                      >
                        {brand.title}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="flex items-center" dir="rtl">
                    <span className="h-6 w-[3px] bg-blue-400 ml-2"></span>
                    بر اساس قیمت {sectionTitle} :
                  </h2>
                  <ul className="flex flex-col gap-3 mt-2">
                    {liTags?.map((li, index) => (
                      <li key={index}>{li}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="">برند های مختلف</h2>
                  <ul className="flex flex-col gap-3 mt-2">
                    <li>لب تاب</li>
                    <li>لب تاب</li>
                    <li>لب تاب</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Ui;
