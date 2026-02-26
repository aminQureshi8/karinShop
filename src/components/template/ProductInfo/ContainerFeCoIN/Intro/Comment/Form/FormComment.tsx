"use client";
import SwalFire from "@/app/utils/swal";
import React, { useState } from "react";

export default function FormComment({
  userID,
  id,
}: {
  userID: string;
  id: string;
}) {
  const [isOk, setIsOk] = useState<null | boolean>(null);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");

  console.log(userID);

  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, comment, isOk, user: userID, product: id }),
    });

    if (res.ok) {
      const swal = await SwalFire(
        "دیدگاه با موفقعیت اضافه شد",
        "success",
        false,
        undefined,
        "باشه",
        undefined,
        undefined,
        3000,
        true,
      );

      if (swal.isConfirmed) {
        setComment("");
        setIsOk(null);
        setTitle("");
      }
    }
  };

  return (
    <div>
      <h2>
        دیدگاه ها <span>20</span>
      </h2>

      <form onSubmit={addComment}>
        <div className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="عنوان"
            />
          </div>
          <div>
            <p className="text-sm">این محصول را به دیگران پیشنهاد :</p>
            <div className="flex justify-between gap-5 items-center mt-3">
              <button
                type="button"
                onClick={() => setIsOk(true)}
                className={`text-green-500 ${isOk ? "bg-green-500 text-white dark:bg-green-900" : "bg-white dark:bg-gray-700"} text-sm rounded-lg w-full  shadow-md dark:bg-gray-700 px-5 py-2 cursor-pointer`}
              >
                میکنم
              </button>
              <button
                type="button"
                onClick={() => setIsOk(false)}
                className={`text-red-500 ${!isOk ? "bg-red-500 text-white dark:bg-red-900" : "bg-white dark:bg-gray-700"} text-sm rounded-lg w-full  shadow-md  px-5 py-2 cursor-pointer`}
              >
                نمیکنم
              </button>
            </div>
          </div>
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="دیدگاه"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg w-full cursor-pointer"
            >
              ثبت
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
