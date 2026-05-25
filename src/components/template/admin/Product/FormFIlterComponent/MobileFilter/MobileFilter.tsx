import React from "react";

export default function MobileFilter({ register, errors, control }: any) {
  return (
    <div className="col-span-12">
      <div className="p-6 bg-green-50 dark:bg-green-950 lg:col-span-3 font-danaMed rounded-xl border border-green-200">
        <h3 className="text-lg font-danaBold mb-4 text-green-400">
          مشخصات گوشی موبایل
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-sm mb-1">برند</label>
            <input
              {...register("brandMobile", { required: "برند الزامی است" })}
              type="text"
              placeholder="Samsung / Apple / Xiaomi"
              className="border-2 dark:border-gray-700 rounded-xl px-3 py-2 text-sm border-zinc-200 mt-2 focus:ring-2 focus:ring-green-500 outline-0 dark:bg-black/60"
            />
            {errors.brand && (
              <p className="text-red-500 text-xs mt-2">
                {errors.brand.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">مدل</label>
            <input
              {...register("model", { required: "مدل الزامی است" })}
              type="text"
              placeholder="Galaxy S23"
              className="border-2 dark:border-gray-700 rounded-xl px-3 py-2 text-sm border-zinc-200 mt-2 focus:ring-2 focus:ring-green-500 outline-0 dark:bg-black/60"
            />
            {errors.model && (
              <p className="text-red-500 text-xs mt-2">
                {errors.model.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">حافظه داخلی (GB)</label>
            <select
              {...register("storage", { required: "حافظه داخلی الزامی است" })}
              className="border-2 dark:border-gray-700 dark:bg-black/60 rounded-xl px-3 py-2 text-xs border-zinc-200 mt-2 focus:ring-2 focus:ring-green-500 outline-0"
            >
              <option value="">انتخاب حافظه</option>
              <option value="64">64</option>
              <option value="128">128</option>
              <option value="256">256</option>
              <option value="512">512</option>
              <option value="1024">1024</option>
            </select>
            {errors.storage && (
              <p className="text-red-500 text-xs mt-2">
                {errors.storage.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">رم (GB)</label>
            <select
              {...register("ram", { required: "رم الزامی است" })}
              className="border-2 dark:border-gray-700 dark:bg-black/60 rounded-xl px-3 py-2 text-xs border-zinc-200 mt-2 focus:ring-2 focus:ring-green-500 outline-0"
            >
              <option value="">انتخاب رم</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="16">16</option>
            </select>
            {errors.ram && (
              <p className="text-red-500 text-xs mt-2">{errors.ram.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">سایز صفحه‌نمایش (اینچ)</label>
            <input
              {...register("screenSize", {
                required: "سایز صفحه الزامی است",
              })}
              type="text"
              placeholder="6.7"
              className="border-2 dark:border-gray-700 dark:bg-black/60 rounded-xl px-3 py-2 text-sm border-zinc-200 mt-2 focus:ring-2 focus:ring-green-500 outline-0"
            />
            {errors.screenSize && (
              <p className="text-red-500 text-xs mt-2">
                {errors.screenSize.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">نرخ بروزرسانی صفحه (Hz)</label>
            <select
              {...register("refreshRate", {
                required: "نرخ بروزرسانی الزامی است",
              })}
              className="border-2 dark:border-gray-700 dark:bg-black/60 rounded-xl px-3 py-2 text-xs border-zinc-200 mt-2 focus:ring-2 focus:ring-green-500 outline-0"
            >
              <option value="">انتخاب نرخ</option>
              <option value="60">60Hz</option>
              <option value="90">90Hz</option>
              <option value="120">120Hz</option>
              <option value="144">144Hz</option>
              <option value="165">165Hz</option>
            </select>
            {errors.refreshRate && (
              <p className="text-red-500 text-xs mt-2">
                {errors.refreshRate.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">تعداد سیم‌کارت</label>
            <select
              {...register("simCount", {
                required: "تعداد سیم‌کارت الزامی است",
              })}
              className="border-2 dark:border-gray-700 dark:bg-black/60 rounded-xl px-3 py-2 text-xs border-zinc-200 mt-2 focus:ring-2 focus:ring-green-500 outline-0"
            >
              <option value="">انتخاب تعداد</option>
              <option value="1">تک سیم‌کارت</option>
              <option value="2">دو سیم‌کارت</option>
            </select>
            {errors.simCount && (
              <p className="text-red-500 text-xs mt-2">
                {errors.simCount.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">ظرفیت باتری (mAh)</label>
            <input
              {...register("battery", {
                required: "ظرفیت باتری الزامی است",
              })}
              type="number"
              placeholder="5000"
              className="border-2 dark:border-gray-700 rounded-xl px-3 py-2 text-sm border-zinc-200 mt-2 focus:ring-2 focus:ring-green-500 outline-0 dark:bg-black/60"
            />
            {errors.battery && (
              <p className="text-red-500 text-xs mt-2">
                {errors.battery.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">دوربین اصلی (MP)</label>
            <input
              {...register("camera", {
                required: "مشخصات دوربین الزامی است",
              })}
              type="text"
              placeholder="50 + 12 + 10"
              className="border-2 dark:border-gray-700 rounded-xl px-3 py-2 text-sm border-zinc-200 mt-2 focus:ring-2 focus:ring-green-500 outline-0 dark:bg-black/60"
            />
            {errors.camera && (
              <p className="text-red-500 text-xs mt-2">
                {errors.camera.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">سیستم‌عامل</label>
            <input
              {...register("os", {
                required: "سیستم‌عامل الزامی است",
              })}
              type="text"
              placeholder="Android 14 / iOS 17"
              className="border-2 dark:border-gray-700 rounded-xl px-3 py-2 text-sm border-zinc-200 mt-2 focus:ring-2 focus:ring-green-500 outline-0 dark:bg-black/60"
            />
            {errors.os && (
              <p className="text-red-500 text-xs mt-2">{errors.os.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">نوع شبکه</label>
            <input
              {...register("network", {
                required: "نوع شبکه الزامی است",
              })}
              type="text"
              placeholder="5G / 4G / 3G"
              className="border-2 dark:border-gray-700 rounded-xl px-3 py-2 text-sm border-zinc-200 mt-2 focus:ring-2 focus:ring-green-500 outline-0 dark:bg-black/60"
            />
            {errors.network && (
              <p className="text-red-500 text-xs mt-2">
                {errors.network.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
