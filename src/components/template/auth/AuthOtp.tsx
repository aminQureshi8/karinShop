"use client";

import ThemeChange from "@/components/module/Navbar/Buttons/ThemeChange";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import NProgress from "nprogress";

export default function AuthOtp() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const searchParams = useSearchParams();
  const identifier = searchParams.get("identifier");

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      otp: Array(5).fill(""),
    },
    mode: "all",
  });

  const otpValues = watch("otp");

  useEffect(() => {
    reset({ otp: Array(5).fill("") });
    inputsRef.current.forEach((inp) => inp && (inp.value = ""));
    inputsRef.current[0]?.focus();
  }, [identifier]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    setValue(`otp.${index}`, value);

    if (value && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: any) => {
    NProgress.start();
    const otpCode = data.otp.join("");

    try {
      setIsLoading(true);

      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otpCode, identifier }),
      });

      const result = await res.json();

      if (result.action === "login") {
        router.replace(`/regLogin/password?identifier=${identifier}`);
      } else if (result.action === "register") {
        router.replace(`/regLogin/create-password?identifier=${identifier}`);
      }
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
        <div className="rounded-2xl w-96 border border-white/20 bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(31,38,135,0.2)] hover:shadow-[0_8px_40px_rgba(31,38,135,0.3)] transition-all duration-300 flex flex-col justify-center py-5">
          <div className="flex justify-end pl-3">
            <ThemeChange />
          </div>

          <h1 className="text-center text-3xl font-morabbaReg mb-2">
            <span className="text-blue-500">کارین</span>
            <span className="dark:text-white"> شاپ</span>
          </h1>

          <p className="text-center mb-6 text-gray-700 dark:text-gray-300">
            کد ارسال شده را وارد کنید
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="px-8" dir="ltr">
            <div className="flex justify-between gap-2 mb-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  autoComplete="off"
                  className="
                    w-12 h-12
                    ss02
                    text-center text-xl
                    rounded-xl
                    bg-white/80 dark:bg-black/30
                    backdrop-blur-md
                    border border-gray-300 dark:border-white/10
                    text-gray-800 dark:text-white
                    shadow-sm
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-400/30
                    outline-none
                    transition
                  "
                  {...register(`otp.${index}`, { required: true })}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={otpValues.join("").length !== 5}
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
