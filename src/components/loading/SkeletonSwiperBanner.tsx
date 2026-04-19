export default function SkeletonSwiperBanner() {
  return (
    <div className="relative w-full animate-pulse">
      <div className="w-full h-87.5 max-sm:h-55 bg-gray-300 dark:bg-gray-700 rounded-4xl"></div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <div className="size-12 max-sm:size-8 bg-gray-300 dark:bg-gray-700 rounded-full shadow-lg"></div>
      </div>

      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <div className="size-12 max-sm:size-8 bg-gray-300 dark:bg-gray-700 rounded-full shadow-lg"></div>
      </div>
    </div>
  );
}
