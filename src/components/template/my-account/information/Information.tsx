import React from "react";

export default function Information() {
  return (
    <div className=" bg-white dark:bg-gray-800 p-3 rounded-xl">
      <div>
        <h2>اطلاعات حساب کاربری</h2>
      </div>
      <form className="mt-5">
        <div className=" grid grid-cols-2 gap-5">
          <div>
            <label className="text-sm">نام و نام خانوادگی</label>
            <input
              type="text"
              placeholder="بدون نام"
              className="bg-gray-200  ss02 text-sm dark:bg-black/60 mt-2.5 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="text-sm">شماره موبایل</label>
            <input
              type="text"
              placeholder="09000000000"
              className="bg-gray-200  ss02 text-sm dark:bg-black/60 mt-2.5 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="text-sm">ایمیل</label>
            <input
              type="text"
              placeholder="ایمیل خود را وارد کنید"
              className="bg-gray-200  ss02 text-sm dark:bg-black/60 mt-2.5 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="text-sm">رمز عبور</label>
            <input
              type="text"
              placeholder="30"
              className="bg-gray-200  ss02 text-sm dark:bg-black/60 mt-2.5 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="text-sm">تاریخ تولد</label>
            <input
              type="text"
              placeholder="30"
              className="bg-gray-200  ss02 text-sm dark:bg-black/60 mt-2.5 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
