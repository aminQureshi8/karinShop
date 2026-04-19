export default function SkeletonTopCategory() {
  return (
    <div className="font-danaMed mt-8 flex items-start md:items-center justify-between animate-pulse">
      <div className="flex items-start max-md:justify-center w-full gap-3">
        <div className="shadow-md p-3 rounded-xl shrink-0 max-md:hidden">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="w-32 max-md:w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

          <div className="w-48 max-md:w-32 h-3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

          <div className="flex justify-center md:hidden">
            <div className="mt-2 w-24 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex">
        <div className="w-24 h-7 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
}
