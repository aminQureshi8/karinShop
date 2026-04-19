export default function SkeletonOffSwiper() {
  return (
    <div className="mt-12 bg-blue-600 rounded-2xl font-danaMed p-4 h-[320px]">
      <div className="flex gap-4 h-full overflow-hidden animate-pulse">
        <div className="w-56 text-white flex flex-col justify-center gap-5 p-4">
          <div className="flex flex-col gap-2 items-center">
            <div className="w-20 h-4 bg-white/40 rounded"></div>
            <div className="w-16 h-4 bg-white/40 rounded"></div>
            <div className="w-14 h-4 bg-white/40 rounded"></div>
          </div>

          <div className="flex gap-2 justify-center">
            <div className="w-6 h-6 bg-white/40 rounded"></div>
            <div className="w-6 h-6 bg-white/40 rounded"></div>
            <div className="w-6 h-6 bg-white/40 rounded"></div>
          </div>

          <div className="flex justify-center">
            <div className="w-24 h-4 bg-white/40 rounded"></div>
          </div>
        </div>

        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-64 bg-white dark:bg-slate-800 rounded-xl p-3 flex flex-col justify-between"
          >
            <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded"></div>

            <div className="flex flex-col gap-2 mt-3">
              <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="w-3/4 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>

            <div className="mt-3 flex justify-between items-center border-t-2 pt-2 border-gray-200 dark:border-gray-700">
              <div className="w-10 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
