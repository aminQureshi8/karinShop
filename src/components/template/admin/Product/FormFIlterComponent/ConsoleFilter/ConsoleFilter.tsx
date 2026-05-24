export default function ConsoleFilter({ register, errors }: any) {
  return (
    <div className="col-span-12">
      <div className="p-6 bg-green-50 dark:bg-blue-950 lg:col-span-3 font-danaMed rounded-xl border border-blue-200">
        <h3 className="text-lg font-danaBold mb-4 dark:text-white">
          مشخصات کنسول
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-danaMed mb-1">برند</label>
            <input
              {...register("brand", {
                required: "برند الزامی است",
                minLength: { value: 2, message: "برند حداقل ۲ کاراکتر باشد" },
              })}
              type="text"
              placeholder="Sony / Microsoft / Nintendo"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.brand && (
              <p className="text-red-500 text-xs mt-2">
                {errors.brand.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-danaMed mb-1">مدل</label>
            <input
              {...register("model", {
                required: "مدل الزامی است",
                minLength: { value: 2, message: "مدل حداقل ۲ کاراکتر باشد" },
              })}
              type="text"
              placeholder="PS5 / Xbox Series X / Switch OLED"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.model && (
              <p className="text-red-500 text-xs mt-2">
                {errors.model.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-danaMed mb-1">حافظه داخلی</label>
            <select
              dir="rtl"
              {...register("storage", {
                required: "حافظه داخلی الزامی است",
              })}
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">انتخاب حافظه</option>
              <option value="512">512 GB</option>
              <option value="825">825 GB</option>
              <option value="1000">1 TB</option>
              <option value="2000">2 TB</option>
            </select>
            {errors.storage && (
              <p className="text-red-500 text-xs mt-2">
                {errors.storage.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-danaMed mb-1">پردازنده</label>
            <input
              {...register("cpu", {
                required: "پردازنده الزامی است",
              })}
              type="text"
              placeholder="AMD Zen 2 / Custom"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.cpu && (
              <p className="text-red-500 text-xs mt-2">{errors.cpu.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-danaMed mb-1">گرافیک</label>
            <input
              {...register("gpu", {
                required: "گرافیک الزامی است",
              })}
              type="text"
              placeholder="RDNA 2 / Custom"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.gpu && (
              <p className="text-red-500 text-xs mt-2">{errors.gpu.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-danaMed mb-1">رزولوشن</label>
            <select
              {...register("resolution", { required: "رزولوشن الزامی است" })}
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">انتخاب رزولوشن</option>
              <option value="1080p">1080p</option>
              <option value="1440p">1440p</option>
              <option value="4k">4K</option>
            </select>
            {errors.resolution && (
              <p className="text-red-500 text-xs mt-2">
                {errors.resolution.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-danaMed mb-1">حداکثر فریم‌ریت</label>
            <select
              {...register("fps", {
                required: "حداکثر فریم‌ریت الزامی است",
              })}
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">انتخاب فریم‌ریت</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="120">120</option>
            </select>
            {errors.fps && (
              <p className="text-red-500 text-xs mt-2">{errors.fps.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-danaMed mb-1">نوع دیسک</label>
            <select
              {...register("discType", {
                required: "نوع دیسک الزامی است",
              })}
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">انتخاب نوع دیسک</option>
              <option value="disc">دیسک‌خور</option>
              <option value="digital">دیجیتال</option>
              <option value="none">ندارد</option>
            </select>
            {errors.discType && (
              <p className="text-red-500 text-xs mt-2">
                {errors.discType.message}
              </p>
            )}
          </div>

          <div className="flex flex-col md:col-span-2 lg:col-span-3">
            <label className="text-sm font-danaMed mb-1">اقلام داخل جعبه</label>
            <input
              {...register("inBox", {
                required: "اقلام داخل جعبه الزامی است",
                minLength: { value: 3, message: "حداقل ۳ کاراکتر وارد کنید" },
              })}
              type="text"
              placeholder="Console + Controller + HDMI + Power Cable"
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.inBox && (
              <p className="text-red-500 text-xs mt-2">
                {errors.inBox.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
