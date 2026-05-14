"use client";

import { RootState } from "@/app/redux/store";
import SwalFire from "@/app/utils/swal";
import { provinces } from "@/lib/iranProvinces";
import { Truck } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

interface FormValues {
  firstName: string;
  lastName: string;
  province: string;
  city: string;
  address: string;
  zipCode: string;
  phone: string;
}

export default function CheckOutForm({
  id,
  post,
  setPost,
  setIsLoading,
}: {
  id: string;
}) {
  const [province, setProvince] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
  });

  const cart = useSelector((state: RootState) => state.cart);

  console.log("cart -->", cart);

  const orderSubmit = async (data: FormValues) => {
    setIsLoading(true);
    const products = cart.map((c: any) => ({
      id: c.id,
      quantity: c.count,
    }));

    const orderData = {
      userId: id,
      phone: data.phone,
      address: data.address,
      products,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        router.push("/payment/success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-8 bg-white shadow-md dark:bg-gray-800 p-3 rounded-xl">
        <form onSubmit={handleSubmit(orderSubmit)} id="checkout-form">
          <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                placeholder="نام*"
                {...register("firstName", {
                  required: "نام الزامی است",
                  minLength: { value: 2, message: "حداقل ۲ کاراکتر" },
                })}
                className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="نام خانوادگی*"
                {...register("lastName", {
                  required: "نام خانوادگی الزامی است",
                  minLength: { value: 2, message: "حداقل ۲ کاراکتر" },
                })}
                className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <select
                {...register("province", {
                  required: "استان را انتخاب کنید",
                })}
                onChange={(e) => setProvince(e.target.value)}
                className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">استان*</option>
                {provinces.map((p, i) => (
                  <option key={i} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>

              {errors.province && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.province.message}
                </p>
              )}
            </div>

            <div>
              <select
                {...register("city", {
                  required: "شهر را انتخاب کنید",
                })}
                className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">شهر*</option>

                {provinces
                  .find((p) => p.name === province)
                  ?.cities.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
              </select>

              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="آدرس*"
                {...register("address", {
                  required: "آدرس الزامی است",
                  minLength: { value: 10, message: "آدرس خیلی کوتاه است" },
                })}
                className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="کد پستی*"
                {...register("zipCode", {
                  required: "کد پستی الزامی است",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "کد پستی باید ۱۰ رقم باشد",
                  },
                })}
                className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.zipCode.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="شماره موبایل*"
                {...register("phone", {
                  required: "شماره موبایل الزامی است",
                  pattern: {
                    value: /^09\d{9}$/,
                    message: "شماره موبایل معتبر نیست (مثال: 09123456789)",
                  },
                })}
                className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="mt-5 bg-white shadow-md dark:bg-gray-800 p-3 max-sm:text-sm rounded-xl">
        <div className="flex items-center gap-2">
          <Truck />
          <h2>نوع ارسال</h2>
        </div>

        <div className="flex flex-col gap-5 mt-3">
          <div
            onClick={() => setPost({ name: "pishtaz", price: 70000 })}
            className={`border p-2 rounded-xl cursor-pointer ${
              post.name === "pishtaz" ? "bg-blue-500 text-white" : ""
            }`}
          >
            <h2>پست پیشتاز : ۷۰ هزار تومان</h2>
          </div>

          <div
            onClick={() => setPost({ name: "normal", price: 30000 })}
            className={`border p-2 rounded-xl cursor-pointer ${
              post.name === "normal" ? "bg-blue-500 text-white" : ""
            }`}
          >
            <h2>پست معمولی : ۳۰ هزار تومان</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
