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
          className={`bg-white dark:bg-black/60 w-full outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl border-zinc-200 px-3 py-2 pl-16 text-sm ${
            errors.tags ? "border-red-400" : ""
          }`}
        />

        <button
          onClick={addTag}
          className="absolute left-0 top-0 h-full bg-blue-500 text-white px-4 rounded-l-xl flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
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
