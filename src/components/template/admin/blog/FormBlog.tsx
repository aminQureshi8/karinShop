"use client";
import { useForm } from "react-hook-form";
import Editor from "../Product/Editor/Editor";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

export default function FormBlog({ category }: { category: any }) {
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    getSubCate();
  }, []);

  const handleCategoryChange = async (id: string) => {
    getSubCate(id);
  };

  const getSubCate = async (id?: string) => {
    const categoryId = id || "69ec838c8a5e1fb9766975b1";
    const res = await fetch(`/api/category/subCategory?cat=${categoryId}`);
    const data = await res.json();
    setSubCategory(data);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    setValue,
    reset,
  } = useForm<IFormInput>({
    mode: "all",
  });
  return (
    <>
      <form>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm" htmlFor="">
              عنوان
            </label>
            <input
              type="text"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="">
              عنوان
            </label>
            <input
              type="text"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="">
              دسته بندی
            </label>
            <select
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {category.map((cat) => (
                <option value={cat._id}>{cat.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm" htmlFor="">
              زیر دسته بندی
            </label>
            <select className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
              <option>زیر دسته بندی را انتخاب کنید</option>
              {subCategory.map((cat) => (
                <option value={cat._id}>{cat.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm" htmlFor="">
              عنوان
            </label>
            <input
              type="text"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="">
              عنوان
            </label>
            <input
              type="text"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="col-span-3">
            <label className="text-sm mb-2 block" htmlFor="description">
              متن کامل مقاله
            </label>
            <Controller
              name="description"
              control={control}
              rules={{
                required: "توضیحات محصول الزامی است",
              }}
              render={({ field }) => (
                <Editor value={field.value} onChange={field.onChange} />
              )}
            />

            {errors.description && (
              <p className="text-red-500 text-xs mt-2">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
