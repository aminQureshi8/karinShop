"use client";

import { useState, MouseEvent, useEffect } from "react";
import { IoIosClose } from "react-icons/io";

function Tag({ register, setValue, errors }: any) {
  const [tag, setTag] = useState("");
  const [tagArray, setTagArray] = useState<string[]>([]);

  useEffect(() => {
    setValue("tags", tagArray, { shouldValidate: true });
  }, [tagArray, setValue]);

  const addTag = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (tag.trim() && !tagArray.includes(tag.trim())) {
      setTagArray((prev) => [...prev, tag.trim()]);
      setTag("");
    }
  };

  const removeTag = (title: string) => {
    setTagArray((prev) => prev.filter((c) => c !== title));
  };

  return (
    <div className="flex flex-col font-danaMed text-sm">
      <label>تگ ها</label>
      <div className="relative mt-2">
        <input
          type="text"
          value={tag}
          placeholder="مثلاً قرمز یا #ff0000"
          {...register("tags", {
            shouldUnregister: true,
            validate: {
              hasAtLeastOne: () =>
                tagArray.length > 0 || "حداقل یک تگ باید اضافه شود",
            },
          })}
          onChange={(e) => setTag(e.target.value)}
          className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />

        <button
          onClick={addTag}
          className="absolute left-0 top-2 h-9.5 bg-blue-500 text-white px-4 text-xs rounded-l-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
        >
          افزودن
        </button>
      </div>

      {errors.tags && (
        <p className="text-red-500 text-xs mt-2">
          {errors.tags.message as string}
        </p>
      )}

      {tagArray.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tagArray.map((c, index) => (
            <div
              key={index}
              className="bg-blue-100 flex items-center text-xs px-3 py-1.5 rounded-full cursor-pointer hover:bg-blue-200 transition-colors"
              onClick={() => removeTag(c)}
            >
              <span className="ml-1">{c}</span>
              <IoIosClose size={18} className="text-red-600" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tag;
