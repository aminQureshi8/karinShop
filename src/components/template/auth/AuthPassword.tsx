"use client";

import ThemeChange from "@/components/module/Navbar/Buttons/ThemeChange";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AuthPassword() {
  const router = useRouter();
  const params = useSearchParams();
  const identifier = params.get("identifier"); 

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = async (data: any) => {
    const { password } = data;

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

   
    reset();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-danaMed">
      <div className="rounded-xl w-96 bg-white shadow-2xl dark:bg-slate-800 flex flex-col justify-center py-5">
        <div className="flex justify-end pl-3">
          <ThemeChange />
        </div>

        <Link href="/" className="text-3xl mb-3 font-morabbaReg">
          <div className="flex justify-center gap-1">
            <span className="text-blue-500">کارین</span>
            <span>شاپ</span>
          </div>
        </Link>

        <p className="pr-8">رمز عبور خود را وارد کنید</p>

        <form className="px-8" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-xs text-gray-400">
            لطفا رمز عبور خود را وارد کنید.
          </label>

          <input
            type="password"
            autoFocus
            {...register("password", {
              required: "رمز عبور الزامی است",
              minLength: {
                value: 6,
                message: "رمز عبور حداقل باید ۶ حرف باشد",
              },
            })}
            className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          
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
            disabled={!!errors.password}
            className="bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400 cursor-pointer text-white w-full rounded-lg py-2 mt-5 "
          >
            تایید
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-10">
          ورود شما به معنای پذیرش قوانین سایت است
        </p>
      </div>
    </div>
  );
}
