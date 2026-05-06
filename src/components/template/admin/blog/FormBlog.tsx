"use client";
import { useForm, Controller } from "react-hook-form";
import Editor from "../Product/Editor/Editor";
import { useEffect, useState } from "react";

interface IFormInput {
  title: string;
  slug: string;
  category: string;
  subCategory?: string;
  author?: string;
  coverImage: FileList;
  excerpt?: string;
  content: string;
}

export default function FormBlog({ category }: { category: any[] }) {
  const [subCategory, setSubCategory] = useState<any[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IFormInput>({
    mode: "onBlur",
  });

  useEffect(() => {
    getSubCate();
  }, []);

  const handleCategoryChange = async (id: string) => {
    setValue("category", id, { shouldValidate: true });
    getSubCate(id);
  };

  const getSubCate = async (id?: string) => {
    const categoryId = id || "69ec838c8a5e1fb9766975b1";
    const res = await fetch(`/api/category/subCategory?cat=${categoryId}`);
    const data = await res.json();
    setSubCategory(data);
  };

  const onSubmit = async (data: IFormInput) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("category", data.category);
      if (data.subCategory) formData.append("subCategory", data.subCategory);
      if (data.author) formData.append("author", data.author);
      if (data.excerpt) formData.append("excerpt", data.excerpt);
      formData.append("content", data.content);

      formData.append("price", "0");

      if (mainImage) {
        formData.append("coverImage", mainImage);
      } else if (data.coverImage?.[0]) {
        formData.append("coverImage", data.coverImage[0]);
      }

      const res = await fetch("/api/admin/blog", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("خطا در ذخیره مقاله");
      }

      const result = await res.json();
      console.log("saved blog =>", result);

      reset();
      setMainImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm" htmlFor="title">
              عنوان
            </label>
            <input
              id="title"
              type="text"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              {...register("title", {
                required: "عنوان مقاله الزامی است",
                minLength: {
                  value: 3,
                  message: "عنوان باید حداقل ۳ کاراکتر باشد",
                },
              })}
            />
            {errors.title && (
              <span className="text-red-500 text-xs mt-2 block">
                {errors.title.message}
              </span>
            )}
          </div>

          <div>
            <label className="text-sm" htmlFor="slug">
              اسلاگ
            </label>
            <input
              id="slug"
              type="text"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              {...register("slug", {
                required: "اسلاگ الزامی است",
                pattern: {
                  value: /^[a-z0-9-]+$/g,
                  message:
                    "اسلاگ باید فقط شامل حروف کوچک انگلیسی، عدد و - باشد",
                },
              })}
            />
            {errors.slug && (
              <span className="text-red-500 text-xs mt-2 block">
                {errors.slug.message}
              </span>
            )}
          </div>

          <div>
            <label className="text-sm" htmlFor="category">
              دسته بندی
            </label>
            <select
              id="category"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              {...register("category", {
                required: "انتخاب دسته بندی الزامی است",
              })}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">دسته بندی را انتخاب کنید</option>
              {category?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500 text-xs mt-2 block">
                {errors.category.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm" htmlFor="coverImage">
              عکس کاور مقاله (coverImageFile)
            </label>
            <input
              id="coverImage"
              type="file"
              accept="image/*"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              {...register("coverImage", {
                required: "انتخاب عکس کاور الزامی است",
              })}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setMainImage(file);
              }}
            />
            {errors.coverImage && (
              <span className="text-red-500 text-xs mt-2 block">
                {errors.coverImage.message as string}
              </span>
            )}
          </div>

          <div>
            <label className="text-sm" htmlFor="subCategory">
              زیر دسته بندی
            </label>
            <select
              id="subCategory"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              {...register("subCategory")}
            >
              <option value="">زیر دسته بندی را انتخاب کنید</option>
              {subCategory.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm" htmlFor="author">
              نویسنده
            </label>
            <input
              id="author"
              type="text"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="در صورت خالی بودن، نامشخص ذخیره می‌شود"
              {...register("author")}
            />
            {errors.author && (
              <span className="text-red-500 text-xs mt-2 block">
                {errors.author.message as string}
              </span>
            )}
          </div>

          <div className="col-span-3">
            <label className="text-sm mb-2 block" htmlFor="excerpt">
              چکیده مقاله
            </label>
            <textarea
              id="excerpt"
              rows={3}
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              {...register("excerpt")}
            />
            {errors.excerpt && (
              <span className="text-red-500 text-xs mt-2 block">
                {errors.excerpt.message as string}
              </span>
            )}
          </div>

          <div className="col-span-3">
            <label className="text-sm mb-2 block" htmlFor="content">
              متن کامل مقاله
            </label>
            <Controller
              name="content"
              control={control}
              rules={{
                required: "متن کامل مقاله الزامی است",
              }}
              render={({ field }) => (
                <Editor value={field.value} onChange={field.onChange} />
              )}
            />

            {errors.content && (
              <span className="text-red-500 text-xs mt-2 block">
                {errors.content.message as string}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-all"
        >
          ذخیره مقاله
        </button>
      </form>
    </>
  );
}
