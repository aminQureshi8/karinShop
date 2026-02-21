import React, { useState } from "react";

export default function FormComment() {
  const [ok, setOk] = useState<null | boolean>(null);
  return (
    <div>
      <h2>
        دیدگاه ها <span>20</span>
      </h2>

      <form>
        <div className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="عنوان"
            />
          </div>
          <div>
            <p className="text-sm">این محصول را به دیگران پیشنهاد :</p>
            <div className="flex justify-between gap-5 items-center mt-3">
              <button
                type="button"
                onClick={() => setOk(true)}
                className={`text-green-500 ${ok ? "bg-green-500 text-white" : "bg-white"} text-sm rounded-lg w-full  shadow-md dark:bg-gray-700 px-5 py-2 cursor-pointer`}
              >
                میکنم
              </button>
              <button
                type="button"
                onClick={() => setOk(false)}
                className={`text-red-500 ${!ok ? "bg-red-500 text-white" : "bg-white"} text-sm rounded-lg w-full  shadow-md dark:bg-gray-700 px-5 py-2 cursor-pointer`}
              >
                نمیکنم
              </button>
            </div>
          </div>
          <div>
            <textarea
              name=""
              id=""
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="دیدگاه"
            ></textarea>
          </div>
          <div>
            <button
              type="button"
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
