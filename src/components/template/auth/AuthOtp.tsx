"use client";

import ThemeChange from "@/components/module/Navbar/Buttons/ThemeChange";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";

export default function AuthOtp() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const searchParams = useSearchParams();
  const identifier = searchParams.get("identifier");

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      otp: Array(6).fill(""),
    },
    mode: "all",
  });

  const otpValues = watch("otp");

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    setValue(`otp.${index}`, value);

    if (value && index < 5) {
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

      const data = await res.json();

      reset({ otp: Array(6).fill("") });

      if (data.action === "login") {
        router.push(`/regLogin/password?identifier=${identifier}`);
      } else if (data.action === "register") {
        router.push(`/regLogin/create-password?identifier=${identifier}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-danaMed bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 px-4">
      
      <div className="rounded-3xl w-96 border border-white/20 bg-white/40 dark:bg-slate-800/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.2)] flex flex-col py-5 transition-all duration-300">
        
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
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="
                  w-12 h-14
                  text-center text-xl ss02
                  rounded-2xl
                  bg-white/80 dark:bg-black/30
                  backdrop-blur-md
                  border border-gray-300 dark:border-white/10
                  text-gray-800 dark:text-white
                  shadow-sm
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-400/30
                  outline-none
                  transition-all
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
            disabled={otpValues.join("").length !== 6}
            className="
              bg-gradient-to-r
              from-blue-600 to-cyan-500
              hover:from-blue-700 hover:to-cyan-600
              disabled:from-blue-300 disabled:to-blue-300
              disabled:cursor-not-allowed
              text-white
              w-full
              rounded-2xl
              py-3.5
              mt-4
              font-bold
              transition-all
              shadow-lg shadow-cyan-300/30
              active:scale-[0.98]
            "
          >
            {isLoading ? (
              <BeatLoader size={8} color="white" />
            ) : (
              "تایید"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-10 px-5 leading-6">
          ورود شما به معنای پذیرش قوانین سایت است
        </p>
      </div>
    </div>
  );
}
