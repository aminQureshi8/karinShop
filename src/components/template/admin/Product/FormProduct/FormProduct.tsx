"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import MobileFilter from "../FormFIlterComponent/MobileFilter/MobileFilter";
import LapTopFilter from "../FormFIlterComponent/LapTopFilter/LapTopFilter";
import ColorSelector from "../FormFIlterComponent/ColorSelector/ColorSelector";
import Editor from "../Editor/Editor";
import { getFeatures } from "@/app/utils/productCategory";
import IFormInput from "@/types/Product/Product.type";
import { Controller } from "react-hook-form";

interface Category {
  _id: string;
  title: string;
  subCategories?: Category[];
}

interface Brand {
  _id: string;
  title: string;
}

export default function FormProduct({
  brands,
  categories,
}: {
  brands: Brand[];
  categories: Category[];
}) {
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [rawPrice, setRawPrice] = useState<number>(0);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

  const removeImage = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => index !== i);
    const newFiles = selectedFiles.filter((_, i) => index !== i);

    setImagePreviews(newPreviews);
    setSelectedFiles(newFiles);

    setValue("images", newFiles, { shouldValidate: true });
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();
    const features = getFeatures(data, data.subCategory);

    console.log(features);
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

          <div className="relative">
            <label>قیمت محصول</label>
            <input
              type="text"
              {...register("price", {
                required: "قیمت الزامی است",
                pattern: {
                  value: /^\d{1,3}(,\d{3})*$/,
                  message: "قیمت باید فقط عدد و جداکننده کاما باشد",
                },
                validate: (value) => {
                  const numericValue = Number(value.replace(/,/g, ""));
                  if (numericValue < 0) return "قیمت نمی‌تواند منفی باشد";
                  if (numericValue > 500000000)
                    return "حداکثر قیمت مجاز ۵۰۰ میلیون تومان است";
                  return true;
                },
              })}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                const formatted = rawValue.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ",",
                );
                e.target.value = formatted;
                setRawPrice(+rawValue);
              }}
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="مثلاً 1,200,000"
            />

            <div className="absolute left-3 top-13 transform -translate-y-1/2 text-xs text-gray-500">
              تومان
            </div>
          </div>

          <div>
            <ColorSelector
              register={register}
              setValue={setValue}
              errors={errors}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm" htmlFor="">
              عکس‌های محصول
            </label>

            <Controller
              name="images"
              control={control}
              rules={{
                required: "انتخاب حداقل یک تصویر الزامی است",
                validate: {
                  fileType: (files: FileList) => {
                    if (!files || files.length === 0)
                      return "لطفاً حداقل یک عکس انتخاب کنید";

                    const validTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/webp",
                    ];
                    for (const file of Array.from(files)) {
                      if (!validTypes.includes(file.type)) {
                        return "فرمت تصویر باید PNG، JPG یا WEBP باشد";
                      }
                    }
                    return true;
                  },
                  fileSize: (files: FileList) => {
                    for (const file of Array.from(files)) {
                      if (file.size > 2 * 1024 * 1024) {
                        return "حجم هر تصویر نباید بیشتر از ۲ مگابایت باشد";
                      }
                    }
                    return true;
                  },
                },
              }}
              render={({ field }) => (
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (!files) return;

                    field.onChange(files); // ✅ مهم‌ترین خط

                    const filesArray = Array.from(files);
                    setSelectedFiles(filesArray);
                    setImagePreviews(
                      filesArray.map((f) => URL.createObjectURL(f)),
                    );
                  }}
                  className={`border-2 bg-gray-200 dark:bg-black/60 rounded-xl mt-2 px-3 py-2 text-sm ${
                    errors.images ? "border-red-400" : ""
                  }`}
                />
              )}
            />

            {errors.images && (
              <p className="text-red-500 text-xs mt-2">
                {errors.images.message as string}
              </p>
            )}
          </div>

          <div className="col-span-3">
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {imagePreviews.map((src, index) => (
                  <div
                    key={index}
                    className="relative w-full h-28 rounded-lg overflow-hidden border dark:border-gray-700"
                    onClick={() => removeImage(index)}
                  >
                    <img
                      src={src}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-3">
            <label htmlFor="">توضیحات محصول</label>
            <Editor />
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
