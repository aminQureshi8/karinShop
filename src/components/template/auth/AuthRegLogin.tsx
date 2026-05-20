"use client";

import ThemeChange from "@/components/module/Navbar/Buttons/ThemeChange";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import NProgress from "nprogress";
import { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
export default function AuthRegLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({ mode: "all" });

  useEffect(() => {
    const t = setTimeout(() => {
      setFocus("identifier");
    }, 100);

    return () => clearTimeout(t);
  }, [setFocus]);

  const onSubmit = async (data: any) => {
    NProgress.start();
    setIsLoading(true);
    const { identifier } = data;

    try {
      const res = await fetch("/api/auth/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier }),
      });

      const result = await res.json();

      const otpRes = await fetch("/api/auth/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier }),
      });

      console.log(otpRes);

      if (result.action === "login") {
        router.push(`/regLogin/otp?identifier=${identifier}`);
        reset();
      } else if (result.action === "register") {
        router.push(`/regLogin/otp?identifier=${identifier}`);
        reset();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-danaMed bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="container mx-auto min-h-screen flex items-center justify-center">
        <div className="rounded-2xl w-96 border border-white/20 bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(31,38,135,0.2)] hover:shadow-[0_8px_40px_rgba(31,38,135,0.3)] transition-all duration-300 flex flex-col justify-center py-5">
          <div className="flex justify-end pl-3">
            <ThemeChange />
          </div>

          <Link href="/" className="text-3xl mb-3 font-morabbaReg">
            <div className="flex justify-center gap-1">
              <span className="text-blue-500">کارین</span>
              <span className="dark:text-white">شاپ</span>
            </div>
          </Link>

          <p className="pr-8 text-gray-700 dark:text-gray-200">
            ورود | ثبت نام
          </p>

          <form className="px-8" onSubmit={handleSubmit(onSubmit)}>
            <label className="text-xs text-gray-600 dark:text-gray-300">
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
              className="bg-white/80 dark:bg-black/30 backdrop-blur-md text-sm mt-2 w-full rounded-xl p-3 border border-gray-300 dark:border-white/10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400/30 transition-all"
            />

            {errors.identifier && (
              <span className="text-red-500 text-xs mt-2 block">
                {errors.identifier.message as string}
              </span>
            )}

            <button
              type="submit"
              disabled={!!errors.identifier || isLoading}
              className="bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:cursor-not-allowed text-white w-full rounded-xl h-10 sm:h-12 mt-4 font-bold transition-all shadow-lg shadow-cyan-300/30 dark:shadow-cyan-900/20 active:scale-[0.98] flex items-center justify-center"
            >
              {isLoading ? <BeatLoader size={6} color="white" /> : "ورود"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 dark:text-gray-300 mt-10 px-5 leading-6">
            ورود شما به معنای پذیرش قوانین سایت است
          </p>
        </div>
      </div>
    </div>
  );
}
