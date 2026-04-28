"use client";
import { useForm } from "react-hook-form";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import jalaali from "jalaali-js";
import { useState } from "react";
import SwalFire from "@/app/utils/swal";
import { BeatLoader } from "react-spinners";
export default function Information({
  email,
  id,
  name,
  phone,
  dateTime,
}: {
  email: string;
  id: string;
  name: string;
  phone: string;
  dateTime: string;
}) {
  const initDate = dateTime ? new Date(dateTime) : null;

  let defaultJalali = null;

  if (initDate && !isNaN(initDate.getTime())) {
    const j = jalaali.toJalaali(
      initDate.getFullYear(),
      initDate.getMonth() + 1,
      initDate.getDate(),
    );

    defaultJalali = {
      year: j.jy,
      month: j.jm,
      day: j.jd,
    };
  }

  const [selectedDay, setSelectedDay] = useState<any>(defaultJalali);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "all",
  });

  const editUser = async (data: any) => {
    try {
      setIsLoading(true);

      if (!selectedDay) {
        SwalFire(
          "لطفا تاریخ تولد را انتخاب کنید",
          "error",
          false,
          "",
          "باشه",
          "",
          "",
        );
        return;
      }
      const g = jalaali.toGregorian(
        selectedDay.year,
        selectedDay.month,
        selectedDay.day,
      );

      const iso = new Date(g.gy, g.gm - 1, g.gd).toISOString();

      const res = await fetch(`/api/profile/information?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, iso }),
      });
      if (res.ok) {
        SwalFire("با موفقعیت ویرایش شد", "success", false, "", "باشه", "", "");
        reset();
      }

      const datda = await res.json();
      console.log(datda);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" bg-white shadow-md dark:bg-gray-800 p-3 rounded-xl">
      <div>
        <h2>اطلاعات حساب کاربری</h2>
      </div>
      <form className="mt-5" onSubmit={handleSubmit(editUser)}>
        <div className=" grid grid-cols-2 gap-5">
          <div>
            <label className="text-sm">نام و نام خانوادگی</label>
            <input
              type="text"
              placeholder="بدون نام"
              defaultValue={name}
              {...register("name", {
                required: "نام خانوادگی الزام است",
                pattern: {
                  value: /^[\u0600-\u06FF\s]+$/,
                  message: "نام فقط باید شامل حروف فارسی باشد",
                },
              })}
              className="bg-gray-200  ss02 text-sm dark:bg-black/60 mt-2.5 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm">شماره موبایل</label>
            <input
              type="text"
              placeholder="09000000000"
              defaultValue={phone}
              {...register("phone", {
                required: "شماره موبایل الزامی است",
                pattern: {
                  value: /^(0|\+98|98)?9\d{9}$/,
                  message: "شماره موبایل معتبر نیست",
                },
              })}
              className="bg-gray-200  ss02 text-sm dark:bg-black/60 mt-2.5 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-2">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm">ایمیل</label>
            <input
              type="text"
              {...register("email", {
                required: "ایمیل خود را وارد کنید",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "ایمیل وارد شده معتبر نیست",
                },
              })}
              defaultValue={email}
              placeholder="ایمیل خود را وارد کنید"
              className="bg-gray-200  ss02 text-sm dark:bg-black/60 mt-2.5 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm">رمز عبور</label>
            <input
              type="password"
              placeholder="30"
              {...register("password", { required: "رمز عبور لازم است" })}
              className="bg-gray-200  ss02 text-sm dark:bg-black/60 mt-2.5 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">تاریخ تولد</label>
            <DatePicker
              value={selectedDay}
              onChange={setSelectedDay}
              locale="fa"
              inputClassName="bg-gray-200! dark:bg-black/60! outline-0! border-0! p-2! rounded-lg! w-full! text-center! focus:ring-2! focus:ring-blue-500!"
              shouldHighlightWeekends
            />
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded-xl text-sm cursor-pointer"
          >
            {isLoading ? <BeatLoader color="white" size={10} /> : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
}
