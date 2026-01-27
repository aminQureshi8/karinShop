"use client";

import ThemeChange from "@/components/module/Navbar/Buttons/ThemeChange";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRef } from "react";

export default function Page() {
  const router = useRouter();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const searchParams = useSearchParams();
  const identifier = searchParams.get("identifier");

  const { register, handleSubmit, setValue, watch } = useForm({
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

    const res = await fetch("/api/auth/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otpCode, identifier }),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-danaMed">
      <div className="rounded-xl w-96 bg-white shadow-2xl dark:bg-slate-800 flex flex-col py-5">
        <div className="flex justify-end pl-3">
          <ThemeChange />
        </div>

        <h1 className="text-center text-lg font-semibold mb-4">کارین شاپ</h1>
        <p className="text-center mb-6">کد ارسال شده را وارد کنید</p>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8" dir="ltr">
          <div className="flex justify-between gap-2 mb-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-lg rounded-lg bg-gray-100 dark:bg-black/60 border dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                {...register(`otp.${index}`, { required: true })}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={otpValues.join("").length !== 6}
            className="bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed text-white w-full rounded-lg py-2"
          >
            تایید کد
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-10">
          ورود شما به معنای پذیرش قوانین سایت است
        </p>
      </div>
    </div>
  );
}
