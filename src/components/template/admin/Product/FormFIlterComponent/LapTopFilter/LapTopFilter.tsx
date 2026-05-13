export default function LapTopFilter({ register, errors, control }: any) {
  return (
    <div className="col-span-12">
      <div className="p-6 bg-green-50 dark:bg-blue-950 lg:col-span-3 font-danaMed rounded-xl border border-blue-200">
        <h3 className="text-lg font-danaBold mb-4 dark:text-white">مشخصات لب تاب</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-danaMed mb-1">رم (GB)</label>
            <select
              {...register("ramLap", {
                required: "مقدار رم الزامی است",
                pattern: {
                  value: /^(8|16|32|64)$/,
                  message: "رم باید یکی از مقادیر 8، 16، 32 یا 64 باشد",
                },
              })}
              className="border-2 dark:border-0 outline-0 transition-all bg-white dark:bg-black/60 focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-xs"
            >
              <option value="">انتخاب رم</option>
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value={32}>32</option>
              <option value={64}>64</option>
            </select>
            {errors.ramLap && (
              <p className="text-red-500 text-xs mt-2">
                {errors.ramLap.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-danaMed mb-1">حافظه</label>
            <select
              dir="rtl"
              {...register("storageLap", {
                required: "مقدار حافظه الزامی است",
                pattern: {
                  value: /^(256|512|1|2)$/,
                  message: "رم باید یکی از مقادیر 8، 16، 32 یا 64 باشد",
                },
              })}
              className="border-2 dark:border-0 outline-0 transition-all bg-white dark:bg-black/60 focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-xs"
            >
              <option value="">انتخاب حافظه</option>
              <option value={256}>256</option>
              <option value={512}>512</option>
              <option value={1}>1 TB</option>
              <option value={2}>2 TB</option>
            </select>
            {errors.storageLap && (
              <p className="text-red-500 text-xs mt-2">
                {errors.storageLap.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-danaMed mb-1">
              سایز صفحه (اینچ)
            </label>
            <input
              {...register("screenSize", {
                required: "سایز صفحه الزامی است",
                pattern: {
                  value: /^(?:\d{1,2}(?:\.\d{1,2})?)$/,
                  message:
                    "سایز صفحه باید عددی بین 10 تا 99 و حداکثر با دو رقم اعشار باشد",
                },
                validate: (value: any) => {
                  const num = parseFloat(value);
                  if (num < 10 || num > 99)
                    return "سایز صفحه باید بین 10 تا 99 اینچ باشد";
                  return true;
                },
              })}
              type="text"
              className="border-2 dark:border-0 outline-0 transition-all bg-white dark:bg-black/60 focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-xs"
              placeholder="15.6"
            />
            {errors.screenSize && (
              <p className="text-red-500 text-xs mt-2">
                {errors.screenSize.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-danaMed mb-1">CPU</label>
            <input
              {...register("cpu", {
                required: "پردازنده الزامی است",
                // pattern: {
                //   value:
                //     /^(?:(Intel\s*(Core\s*)?(i[3579]|Xeon)\s*[A-Za-z0-9\- ]{0,20})|(AMD\s*(Ryzen\s*\d?\s*[A-Za-z0-9\- ]{0,20}))|(Apple\s*)?(M\d(\s*(Pro|Max|Ultra))?)?)$/i,
                //   message:
                //     "فرمت CPU معتبر نیست (مثلاً Intel i7-13700H یا Ryzen 7 9800X3D)",
                // },
              })}
              type="text"
              className="border-2 dark:border-0 outline-0 transition-all bg-white dark:bg-black/60 focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-xs"
              placeholder="Intel i7-13700H"
            />
            {errors.cpu && (
              <p className="text-red-500 text-xs mt-2">{errors.cpu.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-danaMed mb-1">GPU</label>
            <input
              {...register("gpu", {
                required: "کارت گرافیک الزامی است",
                // pattern: {
                //   value:
                //     /^(?:(RTX|GTX|Radeon|intel)\s?[A-Za-z0-9\s\-]{2,30}|(Apple\s*)?M\d(\s*\(integrated\))?|Integrated\s*Graphics)$/i,
                //   message:
                //     "فرمت GPU معتبر نیست (مثلاً RTX 4060 یا Radeon RX 6800M)",
                // },
              })}
              type="text"
              placeholder="RTX 4060"
              className="border-2 dark:border-0 outline-0 transition-all bg-white dark:bg-black/60 focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-xs"
            />
            {errors.gpu && (
              <p className="text-red-500 text-xs mt-2">{errors.gpu.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-danaMed mb-1">وزن (کیلوگرم)</label>
            <input
              {...register("weight", {
                required: "وزن الزامی است",
                pattern: {
                  value: /^\d{1}(\.\d{1,2})?$/,
                  message: "وزن باید عددی معتبر باشد (مثلاً 1.8 یا 2)",
                },
                validate: (value: any) => {
                  const num = parseFloat(value);
                  if (num < 0.5)
                    return "وزن نمی‌تواند کمتر از ۰.۵ کیلوگرم باشد";
                  if (num > 5) return "وزن نمی‌تواند بیشتر از ۵ کیلوگرم باشد";
                  return true;
                },
              })}
              type="text"
              placeholder="مثلاً 1.8"
              className="border-2 dark:border-0 outline-0 transition-all bg-white dark:bg-black/60 focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-xs"
            />
            {errors.weight && (
              <p className="text-red-500 text-xs mt-2">
                {errors.weight.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
