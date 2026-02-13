"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import MobileFilter from "../FormFIlterComponent/MobileFilter/MobileFilter";
import LapTopFilter from "../FormFIlterComponent/LapTopFilter/LapTopFilter";

interface IFormInput {
  title: string;
  slug: string;
  category: string;
  subCategory?: string;
  brand: string;
}

export default function FormProduct({
  brands,
  categories,
}: {
  brands: any[];
  categories: any[];
}) {
  const [subCategories, setSubCategories] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>({
    mode: "all",
  });

  const watchedCategory = useWatch({
    control,
    name: "category",
  });

  const watchedSubCategory = useWatch({
    control,
    name: "subCategory",
  });

  useEffect(() => {
    if (!watchedCategory || watchedCategory === "-1") {
      setSubCategories([]);
      return;
    }

    const fetchSubCategories = async () => {
      try {
        const res = await fetch(`/api/category/subCategory/${watchedCategory}`);

        if (!res.ok) return;

        const data = await res.json();
        setSubCategories(data?.subCategories || data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubCategories();
  }, [watchedCategory]);

  useEffect(() => {
    if (!watchedCategory || watchedCategory === "-1") {
      setSubCategories([]);
      setValue("subCategory", undefined);
    }
  }, [watchedCategory, setValue]);

  const onSubmit = (data: IFormInput) => {
    console.log("FORM DATA 👉", data);
  };

  return (
    <div className="font-danaMed">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <label>نام محصول</label>
            <input
              type="text"
              {...register("title", { required: "این فیلد الزامی است" })}
              placeholder="مثال: iPhone 16"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div>
            <label>اسلاگ محصول</label>
            <input
              type="text"
              {...register("slug", { required: "این فیلد الزامی است" })}
              placeholder="iphone-16"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div>
            <label>دسته بندی محصول</label>
            <select
              {...register("category", {
                validate: (v) => v !== "-1" || "دسته بندی الزامی است",
              })}
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="-1">انتخاب دسته بندی</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {subCategories.length > 0 && (
            <div>
              <label>زیرمجموعه</label>
              <select
                {...register("subCategory", {
                  required: "زیرمجموعه الزامی است",
                })}
                className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">انتخاب زیرمجموعه</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {watchedSubCategory === "698edaa869ad5da18d4114d1" && (
            <MobileFilter
              control={control}
              register={register}
              errors={errors}
            />
          )}

          {watchedSubCategory === "698f0bd7961ffa9510fae56d" && (
            <LapTopFilter
              control={control}
              register={register}
              errors={errors}
            />
          )}

          <div>
            <label>برند محصول</label>
            <select
              {...register("brand", { required: "برند الزامی است" })}
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">انتخاب برند</option>
              {brands.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-2 rounded-lg bg-blue-600 text-white"
        >
          ثبت محصول
        </button>
      </form>
    </div>
  );
}
