"use client";

import ThemeChange from "@/components/module/Navbar/Buttons/ThemeChange";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { BeatLoader } from "react-spinners";
import NProgress from "nprogress";

export default function AuthPassword() {
  const router = useRouter();
  const params = useSearchParams();
  const identifier = params.get("identifier");

  const [serverError, setServerError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = async (data: any) => {
    NProgress.start();
    setIsLoading(true);

    const { password } = data;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "خطایی رخ داده است");
        return;
      }

      router.push("/");
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      NProgress.done();
    }
  };

  return (
    <div className="font-danaMed bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="container mx-auto min-h-screen flex items-center justify-center">
        <div className="rounded-3xl w-96 border border-white/20 bg-white/40 dark:bg-slate-800/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.2)] flex flex-col justify-center py-5 transition-all duration-300">
          <div className="flex justify-end pl-3">
            <ThemeChange />
          </div>

          <Link href="/" className="text-3xl mb-3 font-morabbaReg">
            <div className="flex justify-center gap-1">
              <span className="text-blue-500">کارین</span>
              <span className="dark:text-white">شاپ</span>
            </div>
          </Link>

          <p className="pr-8 text-gray-700 dark:text-gray-300">
            رمز عبور خود را وارد کنید
          </p>

          <form className="px-8 mt-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                autoFocus
                {...register("password", {
                  required: "رمز عبور الزامی است",
                  minLength: {
                    value: 6,
                    message: "رمز عبور حداقل باید ۶ حرف باشد",
                  },
                })}
                className="bg-white/80 dark:bg-black/30 backdrop-blur-md ss02 text-sm mt-2 w-full rounded-2xl p-3 border border-gray-300 dark:border-white/10 text-gray-800 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400/30 transition-all"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-3 top-8 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-all"
              >
                {showConfirmPassword ? (
                  <EyeClosed size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.password && (
              <span className="text-red-500 text-xs mt-2 block">
                {errors.password.message as string}
              </span>
            )}

            {serverError && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {serverError}
              </span>
            )}

            <button
              type="submit"
              disabled={!!errors.password || isLoading}
              className="bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:cursor-not-allowed text-white w-full rounded-xl h-10 sm:h-12 mt-4 font-bold transition-all shadow-lg shadow-cyan-300/30 dark:shadow-cyan-900/20 active:scale-[0.98] flex items-center justify-center"
            >
              {isLoading ? <BeatLoader size={6} color="white" /> : "تایید"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-10 px-5 leading-6">
            ورود شما به معنای پذیرش قوانین سایت است
          </p>
        </div>
      </div>
    </div>
  );
}
