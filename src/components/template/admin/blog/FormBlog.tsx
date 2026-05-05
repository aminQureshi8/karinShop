"use client";
import { useForm } from "react-hook-form";
import Editor from "../Product/Editor/Editor";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

export default function FormBlog() {
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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
