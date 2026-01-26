import React from "react";

export default function page() {
  return (
<div className="min-h-screen flex items-center justify-center font-danaMed">
  <div className="rounded-xl w-96 dark:bg-slate-800 flex flex-col justify-center py-8">
    <h1 className="text-center text-lg font-semibold mb-2">کارین شاپ</h1>
    <p className="pr-8 mb-4">ورود | ثبت نام</p>

    <form className="px-8">
      <label className="text-xs text-gray-400">
        لطفا شماره موبایل یا ایمیل خود را وارد کنید
      </label>
      <input
        type="text"
        className="bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      <button className="bg-blue-500 text-white w-full rounded-lg py-2 mt-5 ">ورود</button>
    </form>

    <p className="text-center text-xs text-gray-400 mt-10">
      ورود شما به معنای پذیرش قوانین سایت است
    </p>
  </div>
</div>

  );
}
