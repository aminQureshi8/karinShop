export default function SkeletonSwiperBlogs() {
  return (
    <div className="grid grid-cols-3 gap-5 mb-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="bg-white shadow-xl p-4 overflow-hidden dark:bg-slate-800 rounded-xl font-danaMed animate-pulse">
          <div className="relative">
            <div className="w-full h-50 bg-gray-300 dark:bg-gray-700 rounded-r-4xl rounded-bl-4xl rounded-l-lg"></div>
          </div>

          <div className="mt-3">
            <div className="w-2/3 h-5 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>

          <div className="border-t flex items-center justify-between pt-3 mt-3">
            <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

            <div className="flex items-center gap-1">
              <div className="w-6 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
              <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}