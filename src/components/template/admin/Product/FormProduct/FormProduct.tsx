"use client";

import { useForm, useWatch } from "react-hook-form";

interface IFormInput {
  title: string;
  slug: string;
  image: FileList;
  category: any;
  brand: any;
  subCategory: any;
}

export default function FormProduct({
  brands,
  categories,
}: {
  brands: any;
  categories: any;
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "all" });

  const watchedCategory = useWatch({
    control,
    name: "category",
  });

  const watchedSubCategory = useWatch({
    control,
    name: "subCategory",
  });

  const watchedBrand = useWatch({
    control,
    name: "brand",
  });
  return (
    <div className="font-danaMed">
      <form>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <label htmlFor="">نام محصول</label>
            <input
              type="text"
              {...register("title", { required: "این فیلد الزامی است" })}
              id="title"
              placeholder="مثال: گوشی موبایل اپل مدل iPhone 16 دو سیم کارت ظرفیت 128 گیگابایت و رم 8"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label htmlFor="">اسلاگ محصول</label>
            <input
              type="text"
              {...register("slug", { required: "این فیلد الزامی است" })}
              id="slug"
              placeholder="مثال: iphone-16-128gb"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label htmlFor="category">دسته بندی محصول</label>
            <select
              id="category"
              {...register("category", { required: "دسته بندی الزامی هست" })}
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">انتخاب دسته بندی</option>
              {categories.map((category: any) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="brand">برند محصول</label>
            <select
              id="brand"
              {...register("brand", { required: "دسته بندی الزامی هست" })}
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">انتخاب برند</option>
              {brands.map((category: any) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">نام محصول</label>
            <input
              type="text"
              {...register("title", { required: "این فیلد الزامی است" })}
              id="title"
              placeholder="asus"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label htmlFor="">نام محصول</label>
            <input
              type="text"
              {...register("title", { required: "این فیلد الزامی است" })}
              id="title"
              placeholder="asus"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label htmlFor="">نام محصول</label>
            <input
              type="text"
              {...register("title", { required: "این فیلد الزامی است" })}
              id="title"
              placeholder="asus"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label htmlFor="">نام محصول</label>
            <input
              type="text"
              {...register("title", { required: "این فیلد الزامی است" })}
              id="title"
              placeholder="asus"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label htmlFor="">نام محصول</label>
            <input
              type="text"
              {...register("title", { required: "این فیلد الزامی است" })}
              id="title"
              placeholder="asus"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
