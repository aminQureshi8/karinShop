"use client";

import ThemeChange from "@/components/module/Navbar/Buttons/ThemeChange";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = async (data: any) => {
    const { identifier } = data;

    const res = await fetch("/api/auth/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier }),
    });

    if (res.ok) {
      router.push(`/otp?identifier=${identifier}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-danaMed">
      <div className="rounded-xl w-96 bg-white shadow-2xl dark:bg-slate-800 flex flex-col justify-center py-5">
        <div className="flex justify-end pl-3">
          <ThemeChange />
        </div>
        <h1 className="text-center text-lg font-semibold mb-4">کارین شاپ</h1>
        <p className="pr-8 mb-4">ورود | ثبت نام</p>

        <form className="px-8" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-xs text-gray-400">
            لطفا شماره موبایل یا ایمیل خود را وارد کنید
          </label>
          <input
            type="text"
            {...register("identifier", {
              required: "این فیلد الزامی است",
              pattern: {
                value:
                  /^(?:[^\s@]+@[^\s@]+\.[^\s@]{2,}|(?:\+98|0)?9(?:0|1|2|3)\d{8})$/,
                message: "ایمیل یا شماره موبایل معتبر وارد کنید",
              },
            })}
            className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {errors.identifier && (
            <span className="text-red-500 text-xs mt-2 block">
              {errors.identifier.message as string}
            </span>
          )}

          <button
            type="submit"
            disabled={errors.identifier ? true : false}
            className="bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400 cursor-pointer text-white w-full rounded-lg py-2 mt-5 "
          >
            ورود
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-10">
          ورود شما به معنای پذیرش قوانین سایت است
        </p>
      </div>
    </div>
  );
}
