"use client";

import ThemeChange from "@/components/module/Navbar/Buttons/ThemeChange";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeClosed, Check } from "lucide-react";
import { BeatLoader } from "react-spinners";
import NProgress from "nprogress";

export default function AuthCreateChangePass() {
  const router = useRouter();
  const params = useSearchParams();
  const identifier = params.get("identifier");

  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const passwordValue = watch("password", "");

  const validations = {
    length: passwordValue.length >= 8,
    hasNumber: /[0-9]/.test(passwordValue),
    hasUpper: /[A-Z]/.test(passwordValue),
  };

  const strengthScore = Object.values(validations).filter(Boolean).length;

  const onSubmit = async (data: any) => {
    NProgress.start();
    const { password } = data;

    setServerError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/create-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      reset();
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-danaMed select-none bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-all duration-300 px-4">
      <div className="rounded-3xl w-100 bg-white/40 dark:bg-slate-800/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.2)] border border-white/20 flex flex-col justify-center py-8 px-8">
        <div className="flex justify-between items-start mb-4">
          <ThemeChange />

          <Link href="/" className="text-3xl font-morabbaReg">
            <div className="flex justify-center gap-1">
              <span className="text-blue-500">کارین</span>
              <span className="dark:text-white">شاپ</span>
            </div>
          </Link>

          <div className="w-8"></div>
        </div>

        <div className="text-right mb-6">
          <h2 className="text-lg font-bold dark:text-white">تغییر رمز عبور</h2>

          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            رمز عبور باید حداقل ۸ حرفی باشد
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              autoFocus
              {...register("password", {
                required: "وارد کردن رمز عبور الزامی است",
                minLength: {
                  value: 8,
                  message: "حداقل ۸ کاراکتر",
                },
              })}
              className="bg-white/80 dark:bg-black/30 backdrop-blur-md ss02 text-sm mt-2 w-full rounded-2xl p-3 border border-gray-300 dark:border-white/10 text-gray-800 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400/30 transition-all"
              placeholder="رمز عبور"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-all"
            >
              {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex gap-2 px-1">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  index <= (strengthScore === 3 ? 4 : strengthScore)
                    ? strengthScore === 1
                      ? "bg-red-500"
                      : strengthScore === 2
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    : "bg-gray-200 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>

          <div className="space-y-2 pt-2 pr-1">
            <ValidationRule label="حداقل ۸ حرف" isMet={validations.length} />
            <ValidationRule label="شامل عدد" isMet={validations.hasNumber} />
            <ValidationRule
              label="شامل یک حرف بزرگ"
              isMet={validations.hasUpper}
            />
          </div>

          <div className="relative mt-6">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                validate: (value) =>
                  value === passwordValue || "رمز عبور مطابقت ندارد",
              })}
              className="bg-white/80 dark:bg-black/30 backdrop-blur-md ss02 text-sm mt-2 w-full rounded-2xl p-3 border border-gray-300 dark:border-white/10 text-gray-800 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400/30 transition-all"
              placeholder="تکرار رمز عبور"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-all"
            >
              {showConfirmPassword ? (
                <EyeClosed size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-red-500 text-[10px] pr-2">
              {errors.confirmPassword.message as string}
            </p>
          )}

          {serverError && (
            <p className="text-red-500 text-xs text-center font-bold bg-red-50 dark:bg-red-900/20 py-2 rounded-xl">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={
              strengthScore < 3 || !!errors.confirmPassword || isLoading
            }
            className="bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-blue-300 disabled:to-blue-900 disabled:cursor-not-allowed text-white w-full rounded-2xl py-3 mt-4 font-bold transition-all shadow-lg shadow-cyan-300/30 active:scale-[0.98] flex items-center justify-center"
          >
            {isLoading ? <BeatLoader size={20} color="#fff" /> : "تغییر رمز"}
          </button>
        </form>

        <p className="text-center text-[10px] text-gray-500 dark:text-gray-400 mt-8">
          ورود شما به معنای پذیرش{" "}
          <span className="text-blue-500 cursor-pointer">قوانین سایت</span> است
        </p>
      </div>
    </div>
  );
}

function ValidationRule({ label, isMet }: { label: string; isMet: boolean }) {
  return (
    <div
      className={`flex items-center justify-end gap-2 text-[11px] transition-colors duration-300 ${isMet ? "text-green-500 dark:text-green-400" : "text-gray-400 dark:text-gray-500"}`}
    >
      <span>{label}</span>

      <div
        className={`w-4 h-4 rounded-full flex items-center justify-center border ${isMet ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-gray-300 dark:border-gray-600"}`}
      >
        {isMet && <Check size={10} strokeWidth={4} />}
      </div>
    </div>
  );
}
