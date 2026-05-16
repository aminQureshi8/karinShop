export default function SkeletonSwiperProduct({gridDynamic}) {
  return (
    <div className={`grid grid-cols-${gridDynamic} gap-5`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white shadow-xl p-4 overflow-hidden dark:bg-slate-800 rounded-xl font-danaMed animate-pulse"
        >
          <div className="relative flex justify-center">
            <div className="size-50 mt-9 bg-gray-300 dark:bg-slate-700 rounded-xl" />

            <div className="absolute right-0 top-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 dark:bg-slate-700 rounded-full" />
              <div className="w-8 h-8 bg-gray-300 dark:bg-slate-700 rounded-full" />
            </div>

            <div className="absolute top-0 -left-4 flex items-center gap-2">
              <div className="h-5 w-12 bg-gray-300 dark:bg-slate-700 rounded" />
              <div className="w-1.5 h-8 bg-gray-300 dark:bg-slate-700 rounded-r-md" />
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded" />
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-slate-700 rounded" />
          </div>

          <div className="border-t-2 border-gray-200 dark:border-gray-700 flex gap-1 items-center justify-end pt-3 mt-3">
            <div className="h-4 w-10 bg-gray-300 dark:bg-slate-700 rounded" />
            <div className="h-4 w-14 bg-gray-300 dark:bg-slate-700 rounded" />
            <div className="h-5 w-12 bg-gray-300 dark:bg-slate-700 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
