export default function SkeletonSwiperBrands() {
  return (
    <div className="grid grid-cols-3 gap-5 mb-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="bg-white dark:bg-slate-800 rounded-xl px-4 py-3 animate-pulse">
          <div className="w-70 h-25 mx-auto bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
}
