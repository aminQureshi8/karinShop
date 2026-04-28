"use client";

import { useState, MouseEvent, useEffect, memo } from "react";
import { IoIosClose } from "react-icons/io";

interface FormValues {
  colors?: string[];
}

const ColorSelector = memo(
  ({
    register,
    setValue,
    errors,
  }: {
    register: any;
    setValue: any;
    errors: any;
  }) => {
    const [color, setColor] = useState("");
    const [colorArray, setColorArray] = useState<string[]>([]);

    useEffect(() => {
      setValue("colors", colorArray, { shouldValidate: true });
    }, [colorArray, setValue]);

    const addColor = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (color.trim() && !colorArray.includes(color.trim())) {
        setColorArray((prev) => [...prev, color.trim()]);
        setColor("");
      }
    };

    const removeColor = (title: string) => {
      setColorArray((prev) => prev.filter((c) => c !== title));
    };

    return (
      <div className="">
        <div className="flex flex-col font-danaMed text-sm">
          <label>رنگ</label>
          <div className="relative ">
            <input
              type="text"
              value={color}
              placeholder="مثلاً قرمز یا #ff0000"
              {...register("colors", {
                shouldUnregister: true,

                pattern: {
                  value:
                    /^(#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})|[a-zA-Z\u0600-\u06FF]{2,20})$/,
                  message:
                    "رنگ وارد شده معتبر نیست (مثلاً 'قرمز' یا '#ff0000')",
                },
                validate: {
                  hasAtLeastOne: () =>
                    colorArray.length > 0 || "حداقل یک رنگ باید اضافه شود",
                },
              })}
              onChange={(e) => setColor(e.target.value)}
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />

            <button
              onClick={addColor}
              className="absolute left-0 top-2 h-9.5 bg-blue-500 text-white px-4 text-xs rounded-l-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
            >
              افزودن
            </button>
          </div>

          {errors.colors && (
            <p className="text-red-500 text-xs mt-2">
              {errors.colors.message as string}
            </p>
          )}

          {colorArray.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {colorArray.map((c, index) => (
                <div
                  key={index}
                  className="bg-blue-100 flex items-center text-xs px-3 py-1.5 rounded-full cursor-pointer hover:bg-blue-200 transition-colors"
                  onClick={() => removeColor(c)}
                >
                  <span className="ml-1">{c}</span>
                  <IoIosClose size={18} className="text-red-600" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default ColorSelector;
