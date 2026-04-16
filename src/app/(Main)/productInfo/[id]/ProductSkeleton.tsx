export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-6 animate-pulse text-white" dir="ltr">
      {/* ستون راست - عکس محصول */}
      <div className="order-1 lg:order-3 col-span-12 lg:col-span-3 bg-[#1e293b] p-5 rounded-xl space-y-5">
        {/* عکس بزرگ */}
        <div className="h-72 w-full bg-gray-600 rounded-xl"></div>

        {/* تصاویر کوچک */}
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-600 rounded-xl"></div>
          ))}
        </div>
      </div>

      {/* ستون وسط - توضیحات */}
      <div className="order-2 col-span-12 lg:col-span-6 space-y-5 bg-[#1e293b] p-6 rounded-xl">
        {/* عنوان */}
        <div className="flex justify-end">
          <div className="h-6 w-3/4 bg-gray-600 rounded"></div>
        </div>
        <div className="flex justify-end">
          <div className="h-4 w-1/2 bg-gray-600 rounded"></div>
        </div>

        {/* رنگ */}
        <div className="flex items-center justify-end gap-4 mt-4">
          <div className="h-6 w-20 bg-gray-600 rounded"></div>
          <div className="h-6 w-6 bg-gray-600 rounded-full"></div>
        </div>

        {/* ویژگی‌ها */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 bg-[#0f172a] rounded-lg"></div>
          ))}
        </div>

        {/* دکمه بخش‌های پایین */}
        <div className="flex gap-4 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 flex-1 bg-[#0f172a] rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* ستون چپ - کارت خرید */}
      <div className="order-3 lg:order-1 col-span-12 lg:col-span-3 bg-[#1e293b] p-5 rounded-xl space-y-5">
        <div className="flex justify-end">
          <div className="h-6 w-32 bg-gray-600  rounded"></div>
        </div>

        <div className="flex items-center justify-between bg-[#0f172a] p-3 rounded-lg">
          <div className="h-6 w-6 bg-gray-600 rounded"></div>
          <div className="h-6 w-6 bg-gray-600 rounded"></div>
          <div className="h-6 w-6 bg-gray-600 rounded"></div>
        </div>

        <div className="h-10 w-full bg-gray-600 rounded"></div>
        <div className="h-10 w-full bg-blue-700 rounded"></div>
      </div>
    </div>
  );
}
