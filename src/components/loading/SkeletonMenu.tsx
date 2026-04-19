export default function MenuSkeleton() {
  return (
    <div className="container mx-auto">
      <div className="bg-black max-lg:hidden text-white dark:text-gray-300 dark:bg-slate-800 text-sm font-danaMed rounded-full mt-5 p-5">
        <div className="flex justify-between items-center animate-pulse">
          <ul className="flex items-center gap-5">
            <li className="h-4 w-16 bg-gray-600 rounded"></li>
            <li className="h-4 w-20 bg-gray-600 rounded"></li>
            <li className="h-4 w-14 bg-gray-600 rounded"></li>
            <li className="h-4 w-12 bg-gray-600 rounded"></li>
          </ul>

          <div className="flex items-center gap-x-2">
            <div className="h-5 w-5 bg-gray-600 rounded-full"></div>
            <div className="h-4 w-32 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
