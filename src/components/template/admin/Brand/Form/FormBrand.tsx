"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

interface IFormInput {
  title: string;
  image: FileList;
  subCategory: string;
}

export default function FormBrand({ getBrands }: { getBrands: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    const getSub = async () => {
      const res = await fetch("/api/category/subCategory");
      const data = await res.json();
      setSubCategory(data);
    };
    getSub();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "all" });

  const createBrand: SubmitHandler<IFormInput> = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      if (data.image[0]) {
        formData.append("image", data.image[0]);
      }

      console.log(data);

      const res = await fetch(`/api/admin/brand?subCategory=${data.subCategory}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await res.json();

     

      if (res.ok) {
        console.log("Brand created successfully");
        toast.success("برند با موفقیعت ایجاد شد");
        reset();
        getBrands(1);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("خطا در ایجاد برند");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(createBrand)}>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <label htmlFor="title">نام برند</label>
            <input
              type="text"
              {...register("title", { required: "این فیلد الزامی است" })}
              id="title"
              placeholder="asus"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.title && (
              <span className="text-xs mt-3 text-red-500">
                {" "}
                {errors.title.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="image">تصویر برند <span className="text-xs">(اختیاری)</span></label>
            <input
              type="file"
              id="image"
              {...register("image")}
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.image && (
              <span className="text-xs mt-3 text-red-500">
                {errors.image.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="">زیر دسته بندی</label>
            <select
              {...register("subCategory", { required: "این فیلد الزامی است" })}
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option>انتخاب زیر دسته بندی</option>
              {subCategory.map((sub) => (
                <option value={sub._id}>{sub.title}</option>
              ))}
            </select>
            {errors.subCategory && (
              <span className="text-xs mt-3 text-red-500">
                {errors.subCategory.message}
              </span>
            )}
          </div>
        </div>

        <div className="mt-5">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-500 cursor-pointer text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            {isLoading ? (
              <BeatLoader size={10} color="#ffffff" />
            ) : (
              "ایجاد برند جدید"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
